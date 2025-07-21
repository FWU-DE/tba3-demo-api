import { DemoDataSet, DemoCourse, DemoStudent } from '../types/demo-data';
import {
  StatisticsResponse,
  StudentPerformanceResponse,
  SchoolStatisticsResponse,
  CoursesStatisticsResponse,
  CompetenceLevelStatistic,
  SolutionFrequencyStatistic,
  TaskPerformanceStatistic,
  StudentPerformance,
  SchoolStatistics,
  SubjectStatistics,
  CourseStatistics,
  ComparisonData,
  ResponseMeta,
  NewMetricType,
  NewGroupByType
} from '../types/new-api';

export class NewDataTransformer {
  constructor(private dataSet: DemoDataSet) {}

  private createMeta(total: number, page: number = 1, limit: number = 20): ResponseMeta {
    return {
      total,
      page,
      limit,
      hasNext: (page * limit) < total
    };
  }

  private courseIdToNumber(courseId: string): number {
    // Convert string course ID to number for API compatibility
    // Create a consistent hash from string ID
    let hash = 0;
    for (let i = 0; i < courseId.length; i++) {
      const char = courseId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % 1000000 + 1; // Ensure positive number between 1-1000000
  }

  private schoolIdToNumber(schoolId: string): number {
    // Convert string school ID to number for API compatibility
    let hash = 0;
    for (let i = 0; i < schoolId.length; i++) {
      const char = schoolId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % 1000000 + 1;
  }

  private runIdToNumber(runId: string): number {
    // Convert string run ID to number for API compatibility
    let hash = 0;
    for (let i = 0; i < runId.length; i++) {
      const char = runId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % 1000000 + 1;
  }

  private taskIdToNumber(taskId: string): number {
    // Convert string task ID to number for API compatibility
    let hash = 0;
    for (let i = 0; i < taskId.length; i++) {
      const char = taskId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % 1000000 + 1;
  }

  private competenceIdToNumber(competenceId: string): number {
    // Convert string competence ID to number for API compatibility
    let hash = 0;
    for (let i = 0; i < competenceId.length; i++) {
      const char = competenceId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % 1000000 + 1;
  }

  transformCourseStatistics(
    courseId: string,
    metric: NewMetricType,
    groupBy?: NewGroupByType,
    limit: number = 20,
    offset: number = 0
  ): StatisticsResponse | null {
    const course = this.dataSet.courses.find(c => c.id === courseId);
    if (!course) return null;

    let data: Array<CompetenceLevelStatistic | SolutionFrequencyStatistic | TaskPerformanceStatistic> = [];

    switch (metric) {
      case 'competence-levels':
        data = this.generateCompetenceLevelStats(course);
        break;
      case 'solution-frequencies':
        data = this.generateSolutionFrequencyStats(course);
        break;
      case 'task-performance':
        data = this.generateTaskPerformanceStats(course);
        break;
    }

    // Apply pagination
    const total = data.length;
    const paginatedData = data.slice(offset, offset + limit);
    const page = Math.floor(offset / limit) + 1;

    return {
      data: paginatedData,
      meta: this.createMeta(total, page, limit)
    };
  }

  transformStudentPerformances(
    courseId: string,
    metric: NewMetricType,
    competenceId?: number,
    taskId?: number,
    limit: number = 20,
    offset: number = 0
  ): StudentPerformanceResponse | null {
    const course = this.dataSet.courses.find(c => c.id === courseId);
    if (!course) return null;

    const students = course.students.map((student, index) => ({
      studentId: index + 1,
      vidisId: `vidis-${index + 1}`,
      studentName: student.name || `Student ${index + 1}`,
      gender: 'm' as const,
      germanIsDominantLanguage: true,
      specialEducationNeeds: false,
      competenceLevel: {
        competenceLevelId: 1,
        competenceLevelCode: 'A1',
        competenceLevelPosition: 1
      },
      performance: metric === 'task-performance' ? {
        taskId: taskId || 1,
        solvedQuestionRatio: 0.75
      } : {
        competenceId: competenceId || 1,
        averageRatio: 0.75
      }
    }));

    // Apply pagination
    const total = students.length;
    const paginatedStudents = students.slice(offset, offset + limit);
    const page = Math.floor(offset / limit) + 1;

    return {
      data: paginatedStudents,
      meta: this.createMeta(total, page, limit)
    };
  }

  transformSchoolRunStatistics(
    schoolId: string,
    runId: string,
    metric: NewMetricType,
    includeComparison: boolean = false,
    subjectId?: number,
    limit: number = 20,
    offset: number = 0
  ): SchoolStatisticsResponse | null {
    const school = this.dataSet.schools.find(s => s.id === schoolId);
    if (!school) return null;

    const run = school.runs.find(r => r.id === runId);
    if (!run) return null;

    const courses = this.dataSet.courses.filter(c => 
      run.course_ids.includes(c.id) && c.school_id === schoolId
    );

    const subjects: SubjectStatistics[] = [];
    const subjectMap = new Map<string, SubjectStatistics>();

    courses.forEach(course => {
      const subjectKey = 'Mathematics'; // Default subject
      if (!subjectMap.has(subjectKey)) {
        subjectMap.set(subjectKey, {
          subjectId: 1,
          subjectName: subjectKey,
          competenceLevels: []
        });
      }

      const subject = subjectMap.get(subjectKey)!;
      subject.competenceLevels.push(...this.generateCompetenceLevelStats(course));
    });

    subjects.push(...Array.from(subjectMap.values()));

    const data: SchoolStatistics = {
      schoolId: this.schoolIdToNumber(schoolId),
      runId: this.runIdToNumber(runId),
      subjects
    };

    const comparison = includeComparison ? {
      clusterType: 'similar_schools',
      similarSchools: subjects
    } : undefined;

    return {
      data,
      comparison,
      meta: this.createMeta(courses.length, 1, limit)
    };
  }

  transformSchoolRunCourses(
    schoolId: string,
    runId: string,
    metric: NewMetricType,
    limit: number = 20,
    offset: number = 0
  ): CoursesStatisticsResponse | null {
    const school = this.dataSet.schools.find(s => s.id === schoolId);
    if (!school) return null;

    const run = school.runs.find(r => r.id === runId);
    if (!run) return null;

    const courses = this.dataSet.courses.filter(c => 
      run.course_ids.includes(c.id) && c.school_id === schoolId
    );

    const data: CourseStatistics[] = courses.map(course => ({
      courseId: this.courseIdToNumber(course.id),
      courseName: course.name,
      subjectId: 1,
      subjectName: 'Mathematics',
      statistics: this.generateCompetenceLevelStats(course)
    }));

    // Apply pagination
    const total = data.length;
    const paginatedData = data.slice(offset, offset + limit);
    const page = Math.floor(offset / limit) + 1;

    return {
      data: paginatedData,
      meta: this.createMeta(total, page, limit)
    };
  }

  private generateCompetenceLevelStats(course: DemoCourse): CompetenceLevelStatistic[] {
    const stats: CompetenceLevelStatistic[] = [];
    
    course.competences.forEach((competence, compIndex) => {
      for (let level = 1; level <= 5; level++) {
        const studentsAtLevel = course.students.filter(student => {
          const results = student.results.filter(r => r.competence_id === competence.id);
          if (results.length === 0) return false;
          return results.some(r => r.level === level);
        });

        stats.push({
          competenceLevelId: compIndex * 10 + level,
          competenceLevelCode: `${competence.name.charAt(0)}${level}`,
          competenceLevelTitle: `${competence.name} - Level ${level}`,
          studentCount: studentsAtLevel.length,
          percentage: course.students.length > 0 ? studentsAtLevel.length / course.students.length : 0,
          classification: level <= 2 ? 'unter Mindeststandard' : level <= 3 ? 'Mindeststandard' : level <= 4 ? 'Regelstandard' : 'Optimalstandard'
        });
      }
    });

    return stats;
  }

  private generateSolutionFrequencyStats(course: DemoCourse): SolutionFrequencyStatistic[] {
    return course.competences.map((competence, index) => {
      const competenceResults = course.students.flatMap(student => 
        student.results.filter(r => r.competence_id === competence.id)
      );

      const averageRatio = competenceResults.length > 0 
        ? competenceResults.reduce((sum, result) => sum + (result.points_achieved / result.points_possible), 0) / competenceResults.length
        : 0;

      return {
        competenceId: this.competenceIdToNumber(competence.id),
        competenceCode: competence.name.charAt(0),
        competenceName: competence.name,
        averageRatio,
        studentCount: course.students.length
      };
    });
  }

  private generateTaskPerformanceStats(course: DemoCourse): TaskPerformanceStatistic[] {
    return course.tasks.map((task, index) => {
      const taskResults = course.students.flatMap(student => 
        student.results.filter(r => r.task_id === task.id)
      );

      const averageRatio = taskResults.length > 0 
        ? taskResults.reduce((sum, result) => sum + (result.points_achieved / result.points_possible), 0) / taskResults.length
        : 0;

      return {
        taskId: this.taskIdToNumber(task.id),
        taskName: task.name,
        taskPosition: index + 1,
        averageRatio,
        studentCount: course.students.length
      };
    });
  }
}