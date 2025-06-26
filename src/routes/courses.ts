import { Router, Request, Response } from 'express';
import { DataTransformer } from '../transformers/data-transformer';
import { dataSets } from '../data/sample-data';
import { MetricType, GroupByType } from '../types/api';

const router = Router();

// GET /courses/:courseId/statistics
router.get('/:courseId/statistics', (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { 
      metric = 'competence_levels', 
      group_by, 
      competence, 
      task,
      dataset = 'sample'
    } = req.query;

    const dataSet = dataSets[dataset as string];
    if (!dataSet) {
      return res.status(400).json({ 
        error: 'Invalid dataset specified',
        available_datasets: Object.keys(dataSets)
      });
    }

    const transformer = new DataTransformer(dataSet);
    const result = transformer.transformCourseStatistics(
      courseId,
      metric as MetricType,
      group_by as GroupByType,
      competence as string,
      task as string
    );

    if (!result) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in course statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /courses/:courseId/students
router.get('/:courseId/students', (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { 
      competence, 
      task,
      dataset = 'sample'
    } = req.query;

    const dataSet = dataSets[dataset as string];
    if (!dataSet) {
      return res.status(400).json({ 
        error: 'Invalid dataset specified',
        available_datasets: Object.keys(dataSets)
      });
    }

    const transformer = new DataTransformer(dataSet);
    const result = transformer.transformStudentPerformances(
      courseId,
      competence as string,
      task as string
    );

    if (!result) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in student performances:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;