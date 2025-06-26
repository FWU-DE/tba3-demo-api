"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_transformer_1 = require("../transformers/data-transformer");
const sample_data_1 = require("../data/sample-data");
const router = (0, express_1.Router)();
// GET /courses/:courseId/statistics
router.get('/:courseId/statistics', (req, res) => {
    try {
        const { courseId } = req.params;
        const { metric = 'competence_levels', group_by, competence, task, dataset = 'sample' } = req.query;
        const dataSet = sample_data_1.dataSets[dataset];
        if (!dataSet) {
            return res.status(400).json({
                error: 'Invalid dataset specified',
                available_datasets: Object.keys(sample_data_1.dataSets)
            });
        }
        const transformer = new data_transformer_1.DataTransformer(dataSet);
        const result = transformer.transformCourseStatistics(courseId, metric, group_by, competence, task);
        if (!result) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(result);
    }
    catch (error) {
        console.error('Error in course statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /courses/:courseId/students
router.get('/:courseId/students', (req, res) => {
    try {
        const { courseId } = req.params;
        const { competence, task, dataset = 'sample' } = req.query;
        const dataSet = sample_data_1.dataSets[dataset];
        if (!dataSet) {
            return res.status(400).json({
                error: 'Invalid dataset specified',
                available_datasets: Object.keys(sample_data_1.dataSets)
            });
        }
        const transformer = new data_transformer_1.DataTransformer(dataSet);
        const result = transformer.transformStudentPerformances(courseId, competence, task);
        if (!result) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(result);
    }
    catch (error) {
        console.error('Error in student performances:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=courses.js.map