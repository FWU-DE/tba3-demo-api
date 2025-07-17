import { Request, Response, NextFunction } from 'express';
import { validateData } from './validation';

// Simple response validation middleware
export const validateResponseSimple = (schemaName: 'CourseStatistics' | 'StudentPerformances' | 'SchoolRunStatistics') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    
    res.json = function(data: any) {
      // Skip validation for error responses
      if (res.statusCode >= 400) {
        return originalJson.call(this, data);
      }

      const validation = validateData(data, schemaName);
      if (!validation.valid) {
        console.error(`Validation failed for ${schemaName}:`, validation.errors);
        console.error('Data that failed validation:', JSON.stringify(data, null, 2));
        
        if (process.env.NODE_ENV === 'development') {
          return this.status(500).json({
            error: 'Response validation failed',
            schema: schemaName,
            validation_errors: validation.errors,
            data
          });
        } else {
          return this.status(500).json({
            error: 'Internal server error - response validation failed'
          });
        }
      }

      return originalJson.call(this, data);
    };

    next();
  };
};

// Simple parameter validation
export const validateCourseParams = (req: Request, res: Response, next: NextFunction) => {
  const { metric, group_by } = req.query;
  const errors: string[] = [];

  if (metric && !['competence_levels', 'solution_frequencies', 'task_performance'].includes(metric as string)) {
    errors.push(`Invalid metric parameter. Valid values: competence_levels, solution_frequencies, task_performance`);
  }

  if (group_by && !['students', 'competences', 'tasks'].includes(group_by as string)) {
    errors.push(`Invalid group_by parameter. Valid values: students, competences, tasks`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Parameter validation failed',
      validation_errors: errors
    });
  }

  next();
};

export const validateSchoolParams = (req: Request, res: Response, next: NextFunction) => {
  const { metric, compare_with_similar } = req.query;
  const errors: string[] = [];

  if (metric && !['competence_levels', 'course_comparisons'].includes(metric as string)) {
    errors.push(`Invalid metric parameter. Valid values: competence_levels, course_comparisons`);
  }

  if (compare_with_similar && !['true', 'false'].includes(compare_with_similar as string)) {
    errors.push(`Invalid compare_with_similar parameter. Valid values: true, false`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Parameter validation failed',
      validation_errors: errors
    });
  }

  next();
};