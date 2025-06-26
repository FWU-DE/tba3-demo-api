import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import coursesRouter from './routes/courses';
import schoolsRouter from './routes/schools';
import datasetsRouter from './routes/datasets';

const app = express();

// Security middleware
app.use(helmet());

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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API information endpoint
app.get('/', (req, res) => {
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
      openapi_spec: '/api-spec',
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

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
    available_endpoints: [
      'GET /',
      'GET /health',
      'GET /api-spec',
      'GET /datasets',
      'GET /datasets/{datasetId}',
      'POST /datasets/{datasetId}',
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