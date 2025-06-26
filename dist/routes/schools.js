"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_transformer_1 = require("../transformers/data-transformer");
const sample_data_1 = require("../data/sample-data");
const router = (0, express_1.Router)();
// GET /schools/:schoolId/runs/:runId/statistics
router.get('/:schoolId/runs/:runId/statistics', (req, res) => {
    try {
        const { schoolId, runId } = req.params;
        const { metric = 'competence_levels', compare_with_similar = 'false', dataset = 'sample' } = req.query;
        const dataSet = sample_data_1.dataSets[dataset];
        if (!dataSet) {
            return res.status(400).json({
                error: 'Invalid dataset specified',
                available_datasets: Object.keys(sample_data_1.dataSets)
            });
        }
        // Validate metric parameter
        const validMetrics = ['competence_levels', 'course_comparisons'];
        if (!validMetrics.includes(metric)) {
            return res.status(400).json({
                error: 'Invalid metric specified',
                valid_metrics: validMetrics
            });
        }
        const transformer = new data_transformer_1.DataTransformer(dataSet);
        const result = transformer.transformSchoolRunStatistics(schoolId, runId, metric, compare_with_similar === 'true');
        if (!result) {
            return res.status(404).json({ error: 'School or run not found' });
        }
        res.json(result);
    }
    catch (error) {
        console.error('Error in school run statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=schools.js.map