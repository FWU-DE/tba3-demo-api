import { DemoDataSet } from '../types/demo-data';
import { CourseStatistics, StudentPerformances, SchoolRunStatistics, MetricType, GroupByType } from '../types/api';
export declare class DataTransformer {
    private dataSet;
    constructor(dataSet: DemoDataSet);
    transformCourseStatistics(courseId: string, metric: MetricType, groupBy?: GroupByType, competenceFilter?: string, taskFilter?: string): CourseStatistics | null;
    transformStudentPerformances(courseId: string, competenceFilter?: string, taskFilter?: string): StudentPerformances | null;
    transformSchoolRunStatistics(schoolId: string, runId: string, metric: 'competence_levels' | 'course_comparisons', compareWithSimilar?: boolean): SchoolRunStatistics | null;
    private transformStudentPerformance;
    private generateCompetenceLevelStats;
    private generateSolutionFrequencyStats;
    private generateTaskPerformanceStats;
    private generateSchoolCompetenceLevelStats;
    private generateSchoolCourseComparisonStats;
    private generateComparisonData;
}
//# sourceMappingURL=data-transformer.d.ts.map