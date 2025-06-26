import { Router, Request, Response } from 'express';
import { DataTransformer } from '../transformers/data-transformer';
import { dataSets } from '../data/sample-data';

const router = Router();

// GET /schools/:schoolId/runs/:runId/statistics
router.get('/:schoolId/runs/:runId/statistics', (req: Request, res: Response) => {
  try {
    const { schoolId, runId } = req.params;
    const { 
      metric = 'competence_levels',
      compare_with_similar = 'false',
      dataset = 'sample'
    } = req.query;

    const dataSet = dataSets[dataset as string];
    if (!dataSet) {
      return res.status(400).json({ 
        error: 'Invalid dataset specified',
        available_datasets: Object.keys(dataSets)
      });
    }

    // Validate metric parameter
    const validMetrics = ['competence_levels', 'course_comparisons'];
    if (!validMetrics.includes(metric as string)) {
      return res.status(400).json({ 
        error: 'Invalid metric specified',
        valid_metrics: validMetrics
      });
    }

    const transformer = new DataTransformer(dataSet);
    const result = transformer.transformSchoolRunStatistics(
      schoolId,
      runId,
      metric as 'competence_levels' | 'course_comparisons',
      compare_with_similar === 'true'
    );

    if (!result) {
      return res.status(404).json({ error: 'School or run not found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in school run statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;