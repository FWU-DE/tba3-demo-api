import { Router, Request, Response } from 'express';
import { NewDataTransformer } from '../transformers/new-data-transformer';
import { dataSets } from '../data/sample-data';
import { NewMetricType, NewGroupByType } from '../types/new-api';
import { validateResponse } from '../middleware/validation';

const router = Router();

// GET /courses/:courseId/statistics
router.get('/:courseId/statistics', 
  validateResponse('StatisticsResponse'),
  (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { 
      metric,
      groupBy,
      limit = '20',
      offset = '0',
      dataset = 'sample'
    } = req.query;

    // Validate required metric parameter
    if (!metric) {
      return res.status(400).json({ 
        code: 'INVALID_PARAMETER',
        message: 'Der Parameter \'metric\' ist erforderlich'
      });
    }

    // Validate metric values
    const validMetrics = ['competence-levels', 'solution-frequencies', 'task-performance'];
    if (!validMetrics.includes(metric as string)) {
      return res.status(400).json({ 
        code: 'INVALID_PARAMETER',
        message: `Invalid metric. Valid values: ${validMetrics.join(', ')}`
      });
    }

    const dataSet = dataSets[dataset as string];
    if (!dataSet) {
      return res.status(400).json({ 
        code: 'INVALID_PARAMETER',
        message: 'Invalid dataset specified',
        details: { available_datasets: Object.keys(dataSets) }
      });
    }

    const transformer = new NewDataTransformer(dataSet);
    const result = transformer.transformCourseStatistics(
      courseId,
      metric as NewMetricType,
      groupBy as NewGroupByType,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    if (!result) {
      return res.status(404).json({ 
        code: 'RESOURCE_NOT_FOUND',
        message: `Kurs mit ID ${courseId} nicht gefunden`
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in course statistics:', error);
    res.status(500).json({ 
      code: 'INTERNAL_ERROR',
      message: 'Ein unerwarteter Fehler ist aufgetreten'
    });
  }
});

// GET /courses/:courseId/students
router.get('/:courseId/students',
  validateResponse('StudentPerformanceResponse'),
  (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { 
      metric,
      competenceId,
      taskId,
      limit = '20',
      offset = '0',
      dataset = 'sample'
    } = req.query;

    // Validate required metric parameter
    if (!metric) {
      return res.status(400).json({ 
        code: 'INVALID_PARAMETER',
        message: 'Der Parameter \'metric\' ist erforderlich'
      });
    }

    // Validate metric values
    const validMetrics = ['competence-levels', 'solution-frequencies', 'task-performance'];
    if (!validMetrics.includes(metric as string)) {
      return res.status(400).json({ 
        code: 'INVALID_PARAMETER',
        message: `Invalid metric. Valid values: ${validMetrics.join(', ')}`
      });
    }

    const dataSet = dataSets[dataset as string];
    if (!dataSet) {
      return res.status(400).json({ 
        code: 'INVALID_PARAMETER',
        message: 'Invalid dataset specified',
        details: { available_datasets: Object.keys(dataSets) }
      });
    }

    const transformer = new NewDataTransformer(dataSet);
    const result = transformer.transformStudentPerformances(
      courseId,
      metric as NewMetricType,
      competenceId ? parseInt(competenceId as string) : undefined,
      taskId ? parseInt(taskId as string) : undefined,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    if (!result) {
      return res.status(404).json({ 
        code: 'RESOURCE_NOT_FOUND',
        message: `Kurs mit ID ${courseId} nicht gefunden`
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in student performances:', error);
    res.status(500).json({ 
      code: 'INTERNAL_ERROR',
      message: 'Ein unerwarteter Fehler ist aufgetreten'
    });
  }
});

export default router;