"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sample_data_1 = require("../data/sample-data");
const router = (0, express_1.Router)();
// GET /datasets - List available datasets
router.get('/', (req, res) => {
    try {
        const datasets = Object.keys(sample_data_1.dataSets).map(key => ({
            id: key,
            name: sample_data_1.dataSets[key].name,
            description: sample_data_1.dataSets[key].description,
            schools_count: sample_data_1.dataSets[key].schools.length,
            courses_count: sample_data_1.dataSets[key].courses.length
        }));
        res.json({
            datasets,
            total_count: datasets.length
        });
    }
    catch (error) {
        console.error('Error listing datasets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /datasets/:datasetId - Get dataset details
router.get('/:datasetId', (req, res) => {
    try {
        const { datasetId } = req.params;
        const dataset = sample_data_1.dataSets[datasetId];
        if (!dataset) {
            return res.status(404).json({
                error: 'Dataset not found',
                available_datasets: Object.keys(sample_data_1.dataSets)
            });
        }
        res.json({
            id: datasetId,
            name: dataset.name,
            description: dataset.description,
            schools: dataset.schools.map(school => ({
                id: school.id,
                name: school.name,
                runs: school.runs.map(run => ({
                    id: run.id,
                    name: run.name,
                    start_date: run.start_date,
                    end_date: run.end_date,
                    courses_count: run.course_ids.length
                }))
            })),
            courses: dataset.courses.map(course => ({
                id: course.id,
                name: course.name,
                school_id: course.school_id,
                students_count: course.students.length,
                competences: course.competences.map(comp => ({
                    id: comp.id,
                    name: comp.name,
                    description: comp.description
                })),
                tasks: course.tasks.map(task => ({
                    id: task.id,
                    name: task.name,
                    competence_id: task.competence_id,
                    max_points: task.max_points
                }))
            }))
        });
    }
    catch (error) {
        console.error('Error getting dataset details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// POST /datasets/:datasetId - Add or update a dataset (for future use when user provides data)
router.post('/:datasetId', (req, res) => {
    try {
        const { datasetId } = req.params;
        const datasetData = req.body;
        // Basic validation
        if (!datasetData.name || !datasetData.description || !datasetData.schools || !datasetData.courses) {
            return res.status(400).json({
                error: 'Invalid dataset format. Required fields: name, description, schools, courses'
            });
        }
        // Store the dataset
        sample_data_1.dataSets[datasetId] = {
            id: datasetId,
            ...datasetData
        };
        res.status(201).json({
            message: 'Dataset created/updated successfully',
            dataset_id: datasetId
        });
    }
    catch (error) {
        console.error('Error creating/updating dataset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=datasets.js.map