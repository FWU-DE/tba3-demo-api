"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const new_data_transformer_1 = require("../transformers/new-data-transformer");
const sample_data_1 = require("../data/sample-data");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// GET /schools/:schoolId/runs/:runId/statistics
router.get('/:schoolId/runs/:runId/statistics', (0, validation_1.validateResponse)('SchoolStatisticsResponse'), (req, res) => {
    try {
        const { schoolId, runId } = req.params;
        const { metric, includeComparison = 'false', subjectId, limit = '20', offset = '0', dataset = 'sample' } = req.query;
        // Validate required metric parameter
        if (!metric) {
            return res.status(400).json({
                code: 'INVALID_PARAMETER',
                message: 'Der Parameter \'metric\' ist erforderlich'
            });
        }
        // Validate metric parameter
        const validMetrics = ['competence-levels', 'course-comparison'];
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
        const result = transformer.transformSchoolRunStatistics(schoolId, runId, metric, includeComparison === 'true', subjectId ? parseInt(subjectId) : undefined, parseInt(limit), parseInt(offset));
        if (!result) {
            return res.status(404).json({
                code: 'RESOURCE_NOT_FOUND',
                message: `Schule mit ID ${schoolId} oder Durchlauf mit ID ${runId} nicht gefunden`
            });
        }
        res.json(result);
    }
    catch (error) {
        console.error('Error in school run statistics:', error);
        res.status(500).json({
            code: 'INTERNAL_ERROR',
            message: 'Ein unerwarteter Fehler ist aufgetreten'
        });
    }
});
// GET /schools/:schoolId/runs/:runId/courses
router.get('/:schoolId/runs/:runId/courses', (0, validation_1.validateResponse)('CoursesStatisticsResponse'), (req, res) => {
    try {
        const { schoolId, runId } = req.params;
        const { metric, limit = '20', offset = '0', dataset = 'sample' } = req.query;
        // Validate required metric parameter
        if (!metric) {
            return res.status(400).json({
                code: 'INVALID_PARAMETER',
                message: 'Der Parameter \'metric\' ist erforderlich'
            });
        }
        // Validate metric parameter
        const validMetrics = ['competence-levels'];
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
        const result = transformer.transformSchoolRunCourses(schoolId, runId, metric, parseInt(limit), parseInt(offset));
        if (!result) {
            return res.status(404).json({
                code: 'RESOURCE_NOT_FOUND',
                message: `Schule mit ID ${schoolId} oder Durchlauf mit ID ${runId} nicht gefunden`
            });
        }
        res.json(result);
    }
    catch (error) {
        console.error('Error in school run courses:', error);
        res.status(500).json({
            code: 'INTERNAL_ERROR',
            message: 'Ein unerwarteter Fehler ist aufgetreten'
        });
    }
});
exports.default = router;
//# sourceMappingURL=schools.js.map