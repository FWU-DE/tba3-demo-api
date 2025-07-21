// New API types based on updated OpenAPI specification

export interface ResponseMeta {
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

export interface StatisticsResponse {
  data: Array<CompetenceLevelStatistic | SolutionFrequencyStatistic | TaskPerformanceStatistic>;
  meta: ResponseMeta;
}

export interface StudentPerformanceResponse {
  data: StudentPerformance[];
  meta: ResponseMeta;
}

export interface SchoolStatisticsResponse {
  data: SchoolStatistics;
  comparison?: ComparisonData;
  meta: ResponseMeta;
}

export interface CoursesStatisticsResponse {
  data: CourseStatistics[];
  meta: ResponseMeta;
}

export interface CompetenceLevelStatistic {
  competenceLevelId: number;
  competenceLevelCode: string;
  competenceLevelTitle?: string;
  studentCount: number;
  percentage: number;
  classification?: string;
}

export interface SolutionFrequencyStatistic {
  competenceId: number;
  competenceCode: string;
  competenceName?: string;
  averageRatio: number;
  studentCount: number;
}

export interface TaskPerformanceStatistic {
  taskId: number;
  taskName: string;
  taskPosition?: number;
  averageRatio: number;
  studentCount: number;
}

export interface StudentPerformance {
  studentId: number;
  vidisId?: string;
  studentName?: string;
  gender?: 'm' | 'f' | 'd';
  germanIsDominantLanguage?: boolean;
  specialEducationNeeds?: boolean;
  competenceLevel?: CompetenceLevel;
  performance?: CompetencePerformance | TaskPerformance;
}

export interface SchoolStatistics {
  schoolId: number;
  runId: number;
  subjects: SubjectStatistics[];
}

export interface SubjectStatistics {
  subjectId: number;
  subjectName: string;
  competenceLevels: CompetenceLevelStatistic[];
}

export interface CourseStatistics {
  courseId: number;
  courseName: string;
  subjectId: number;
  subjectName: string;
  statistics: CompetenceLevelStatistic[];
}

export interface ComparisonData {
  clusterType: string;
  similarSchools: SubjectStatistics[];
}

export interface CompetenceLevel {
  competenceLevelId: number;
  competenceLevelTitle?: string;
  competenceLevelCode: string;
  competenceLevelPosition?: number;
  description?: string;
  descriptionEasy?: string;
  classification?: string;
  subject?: Subject;
}

export interface Subject {
  subjectId: number;
  subjectName: string;
}

export interface CompetencePerformance {
  competenceId: number;
  averageRatio: number;
}

export interface TaskPerformance {
  taskId: number;
  solvedQuestionRatio: number;
}

export type NewMetricType = 'competence-levels' | 'solution-frequencies' | 'task-performance' | 'course-comparison';
export type NewGroupByType = 'students' | 'competences' | 'tasks';