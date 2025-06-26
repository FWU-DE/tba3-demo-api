export interface StatisticItem {
  label: string;
  value: number;
  percentage?: number;
  count?: number;
}

export interface CourseStatistics {
  course_id: string;
  metric: MetricType;
  group_by?: 'students' | 'competences' | 'tasks';
  data: StatisticItem[];
  total_participants: number;
  generated_at: string;
}

export interface CompetenceResult {
  competence_id: string;
  competence_name: string;
  level: number; // 1-5
  score: number; // 0-100
}

export interface TaskResult {
  task_id: string;
  task_name: string;
  points_achieved: number;
  points_possible: number;
  percentage: number; // 0-100
  solution_approach?: string;
}

export interface StudentPerformance {
  student_id: string;
  competences: CompetenceResult[];
  tasks: TaskResult[];
  overall_score: number; // 0-100
}

export interface StudentPerformances {
  course_id: string;
  students: StudentPerformance[];
  total_students: number;
  generated_at: string;
}

export interface ComparisonData {
  comparison_group: string;
  our_school: StatisticItem;
  similar_schools_average: StatisticItem;
  percentile_rank: number; // 1-100
}

export interface SchoolRunStatistics {
  school_id: string;
  run_id: string;
  metric: 'competence_levels' | 'course_comparisons';
  data: StatisticItem[];
  comparison_data?: ComparisonData[];
  total_courses: number;
  generated_at: string;
}

export type MetricType = 'competence_levels' | 'solution_frequencies' | 'task_performance' | 'course_comparisons';
export type GroupByType = 'students' | 'competences' | 'tasks';