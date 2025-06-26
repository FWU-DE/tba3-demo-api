"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const courses_1 = __importDefault(require("./routes/courses"));
const schools_1 = __importDefault(require("./routes/schools"));
const datasets_1 = __importDefault(require("./routes/datasets"));
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// CORS middleware
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true
}));
// Logging middleware
app.use((0, morgan_1.default)('combined'));
// Body parsing middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
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
    }
    catch (error) {
        res.status(500).json({ error: 'Could not load API specification' });
    }
});
// Route handlers
app.use('/datasets', datasets_1.default);
app.use('/courses', courses_1.default);
app.use('/schools', schools_1.default);
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
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map