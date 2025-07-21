import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import coursesRouter from './routes/courses';
import schoolsRouter from './routes/schools';
import datasetsRouter from './routes/datasets';
import explorerRouter from './routes/explorer';

const app = express();

// Load OpenAPI spec for Swagger UI
const swaggerDocument = YAML.load(path.join(__dirname, '../tba3_api_spec.yml'));

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'"], // Allow inline scripts for explorer
      "script-src-attr": ["'unsafe-inline'"], // Allow inline event handlers
    },
  },
}));

// CORS middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Landing page
app.get('/', (req, res) => {
  try {
    const landingPath = path.join(__dirname, './views/landing.html');
    const htmlContent = require('fs').readFileSync(landingPath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
  } catch (error) {
    console.error('Error serving landing page:', error);
    res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: 'Failed to load landing page'
    });
  }
});

// API information endpoint
app.get('/api-info', (req, res) => {
  res.json({
    name: 'TBA3 Demo API',
    description: 'API for serving demo data in TBA3 format',
    version: '1.0.0',
    endpoints: {
      datasets: '/datasets',
      course_statistics: '/courses/{courseId}/statistics',
      student_performances: '/courses/{courseId}/students',
      school_run_statistics: '/schools/{schoolId}/runs/{runId}/statistics'
    },
    documentation: {
      swagger_ui: '/api-docs',
      openapi_spec: '/api-spec',
      api_explorer: '/explore',
      query_parameters: {
        dataset: 'Specify which dataset to use (default: sample)',
        metric: 'Type of metric to retrieve',
        group_by: 'How to group the statistics',
        competence: 'Filter by specific competence',
        task: 'Filter by specific task',
        compare_with_similar: 'Include comparison with similar schools (true/false)'
      }
    }
  });
});

// Serve the OpenAPI specification
app.get('/api-spec', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const specPath = path.join(__dirname, '../tba3_api_spec.yml');
    const spec = fs.readFileSync(specPath, 'utf8');
    
    res.setHeader('Content-Type', 'application/x-yaml');
    res.send(spec);
  } catch (error) {
    res.status(500).json({ error: 'Could not load API specification' });
  }
});

// Route handlers
app.use('/datasets', datasetsRouter);
app.use('/courses', coursesRouter);
app.use('/schools', schoolsRouter);
app.use('/explore', explorerRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
    available_endpoints: [
      'GET /',
      'GET /health',
      'GET /api-docs',
      'GET /api-spec',
      'GET /explore',
      'GET /datasets',
      'GET /datasets/{datasetId}',
      'GET /courses/{courseId}/statistics',
      'GET /courses/{courseId}/students',
      'GET /schools/{schoolId}/runs/{runId}/statistics'
    ]
  });
});

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

export default app;