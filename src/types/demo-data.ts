export interface DemoDataSet {
  id: string;
  name: string;
  description: string;
  courses: DemoCourse[];
  schools: DemoSchool[];
}

export interface DemoCourse {
  id: string;
  name: string;
  school_id: string;
  students: DemoStudent[];
  competences: DemoCompetence[];
  tasks: DemoTask[];
}

export interface DemoSchool {
  id: string;
  name: string;
  runs: DemoRun[];
}

export interface DemoRun {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  course_ids: string[];
}

export interface DemoStudent {
  id: string;
  name?: string;
  results: DemoStudentResult[];
}

export interface DemoStudentResult {
  competence_id: string;
  task_id: string;
  points_achieved: number;
  points_possible: number;
  level: number;
  solution_approach?: string;
}

export interface DemoCompetence {
  id: string;
  name: string;
  description?: string;
  max_level: number;
  hierarchy?: CompetenceHierarchy;
  prerequisites?: string[];
  progression_indicators?: string[];
}

export interface CompetenceHierarchy {
  levels: CompetenceLevel[];
  progression_pathway: string[];
}

export interface CompetenceLevel {
  level: number;
  name: string;
  description: string;
  skills: string[];
  examples: string[];
}

export interface DemoTask {
  id: string;
  name: string;
  competence_id: string;
  max_points: number;
  description?: string;
  difficulty_level?: 'easy' | 'medium' | 'hard';
  cognitive_level?: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
  time_limit_minutes?: number;
  scoring_rubric?: ScoringRubric;
  keywords?: string[];
}

export interface ScoringRubric {
  levels: RubricLevel[];
  criteria: string[];
}

export interface RubricLevel {
  level: number;
  name: string;
  description: string;
  point_range: {
    min: number;
    max: number;
  };
}