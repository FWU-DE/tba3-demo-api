import { Router, Request, Response } from 'express';
import { NewDataTransformer } from '../transformers/new-data-transformer';
import { dataSets } from '../data/sample-data';
import { NewMetricType } from '../types/new-api';
import { validateResponse } from '../middleware/validation';

const router = Router();

// GET /schools/:schoolId/runs/:runId/statistics
router.get('/:schoolId/runs/:runId/statistics',
  validateResponse('SchoolStatisticsResponse'),
  (req: Request, res: Response) => {
  try {
    const { schoolId, runId } = req.params;
    const { 
      metric,
      includeComparison = 'false',
      subjectId,
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

    // Validate metric parameter
    const validMetrics = ['competence-levels', 'course-comparison'];
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
    const result = transformer.transformSchoolRunStatistics(
      schoolId,
      runId,
      metric as NewMetricType,
      includeComparison === 'true',
      subjectId ? parseInt(subjectId as string) : undefined,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    if (!result) {
      return res.status(404).json({ 
        code: 'RESOURCE_NOT_FOUND',
        message: `Schule mit ID ${schoolId} oder Durchlauf mit ID ${runId} nicht gefunden`
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in school run statistics:', error);
    res.status(500).json({ 
      code: 'INTERNAL_ERROR',
      message: 'Ein unerwarteter Fehler ist aufgetreten'
    });
  }
});

// GET /schools/:schoolId/runs/:runId/courses
router.get('/:schoolId/runs/:runId/courses',
  validateResponse('CoursesStatisticsResponse'),
  (req: Request, res: Response) => {
  try {
    const { schoolId, runId } = req.params;
    const { 
      metric,
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

    // Validate metric parameter
    const validMetrics = ['competence-levels'];
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
    const result = transformer.transformSchoolRunCourses(
      schoolId,
      runId,
      metric as NewMetricType,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    if (!result) {
      return res.status(404).json({ 
        code: 'RESOURCE_NOT_FOUND',
        message: `Schule mit ID ${schoolId} oder Durchlauf mit ID ${runId} nicht gefunden`
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in school run courses:', error);
    res.status(500).json({ 
      code: 'INTERNAL_ERROR',
      message: 'Ein unerwarteter Fehler ist aufgetreten'
    });
  }
});

export default router;