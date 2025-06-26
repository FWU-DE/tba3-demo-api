"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sample_data_1 = require("../data/sample-data");
const router = (0, express_1.Router)();
// GET /datasets - List available datasets
router.get('/', (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const datasets = Object.keys(sample_data_1.dataSets).map(key => {
            const dataset = sample_data_1.dataSets[key];
            return {
                id: key,
                name: dataset.name,
                description: dataset.description,
                schools_count: dataset.schools.length,
                courses_count: dataset.courses.length,
                links: {
                    self: `${baseUrl}/datasets/${key}`,
                    schools: dataset.schools.map(school => ({
                        id: school.id,
                        name: school.name,
                        runs: school.runs.map(run => ({
                            id: run.id,
                            name: run.name,
                            statistics: `${baseUrl}/schools/${school.id}/runs/${run.id}/statistics`
                        }))
                    })),
                    courses: dataset.courses.map(course => ({
                        id: course.id,
                        name: course.name,
                        statistics: `${baseUrl}/courses/${course.id}/statistics`,
                        students: `${baseUrl}/courses/${course.id}/students`
                    }))
                }
            };
        });
        res.json({
            datasets,
            total_count: datasets.length,
            links: {
                self: `${baseUrl}/datasets`
            }
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
exports.default = router;
//# sourceMappingURL=datasets.js.map