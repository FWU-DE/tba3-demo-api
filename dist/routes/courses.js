"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const new_data_transformer_1 = require("../transformers/new-data-transformer");
const sample_data_1 = require("../data/sample-data");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// GET /courses/:courseId/statistics
router.get('/:courseId/statistics', (0, validation_1.validateResponse)('StatisticsResponse'), (req, res) => {
    try {
        const { courseId } = req.params;
        const { metric, groupBy, limit = '20', offset = '0', dataset = 'sample' } = req.query;
        // Validate required metric parameter
        if (!metric) {
            return res.status(400).json({
                code: 'INVALID_PARAMETER',
                message: 'Der Parameter \'metric\' ist erforderlich'
            });
        }
        // Validate metric values
        const validMetrics = ['competence-levels', 'solution-frequencies', 'task-performance'];
        if (!validMetrics.includes(metric)) {
            return res.status(400).json({
                code: 'INVALID_PARAMETER',
                message: `Invalid metric. Valid values: ${validMetrics.join(', ')}`
            });
        }
        const dataSet = sample_data_1.dataSets[dataset];
        if (!dataSet) {
            return res.status(400).json({
                code: 'INVALID_PARAMETER',
                message: 'Invalid dataset specified',
                details: { available_datasets: Object.keys(sample_data_1.dataSets) }
            });
        }
        const transformer = new new_data_transformer_1.NewDataTransformer(dataSet);
        const result = transformer.transformCourseStatistics(courseId, metric, groupBy, parseInt(limit), parseInt(offset));
        if (!result) {
            return res.status(404).json({
                code: 'RESOURCE_NOT_FOUND',
                message: `Kurs mit ID ${courseId} nicht gefunden`
            });
        }
        res.json(result);
    }
    catch (error) {
        console.error('Error in course statistics:', error);
        res.status(500).json({
            code: 'INTERNAL_ERROR',
            message: 'Ein unerwarteter Fehler ist aufgetreten'
        });
    }
});
// GET /courses/:courseId/students
router.get('/:courseId/students', (0, validation_1.validateResponse)('StudentPerformanceResponse'), (req, res) => {
    try {
        const { courseId } = req.params;
        const { metric, competenceId, taskId, limit = '20', offset = '0', dataset = 'sample' } = req.query;
        // Validate required metric parameter
        if (!metric) {
            return res.status(400).json({
                code: 'INVALID_PARAMETER',
                message: 'Der Parameter \'metric\' ist erforderlich'
            });
        }
        // Validate metric values
        const validMetrics = ['competence-levels', 'solution-frequencies', 'task-performance'];
        if (!validMetrics.includes(metric)) {
            return res.status(400).json({
                code: 'INVALID_PARAMETER',
                message: `Invalid metric. Valid values: ${validMetrics.join(', ')}`
            });
        }
        const dataSet = sample_data_1.dataSets[dataset];
        if (!dataSet) {
            return res.status(400).json({
                code: 'INVALID_PARAMETER',
                message: 'Invalid dataset specified',
                details: { available_datasets: Object.keys(sample_data_1.dataSets) }
            });
        }
        const transformer = new new_data_transformer_1.NewDataTransformer(dataSet);
        const result = transformer.transformStudentPerformances(courseId, metric, competenceId ? parseInt(competenceId) : undefined, taskId ? parseInt(taskId) : undefined, parseInt(limit), parseInt(offset));
        if (!result) {
            return res.status(404).json({
                code: 'RESOURCE_NOT_FOUND',
                message: `Kurs mit ID ${courseId} nicht gefunden`
            });
        }
        res.json(result);
    }
    catch (error) {
        console.error('Error in student performances:', error);
        res.status(500).json({
            code: 'INTERNAL_ERROR',
            message: 'Ein unerwarteter Fehler ist aufgetreten'
        });
    }
});
exports.default = router;
//# sourceMappingURL=courses.js.map