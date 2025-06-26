import {
  DemoDataSet,
  DemoCourse,
  DemoStudent,
  DemoStudentResult
} from '../types/demo-data';
import {
  CourseStatistics,
  StudentPerformances,
  SchoolRunStatistics,
  StatisticItem,
  StudentPerformance,
  CompetenceResult,
  TaskResult,
  ComparisonData,
  MetricType,
  GroupByType
} from '../types/api';

export class DataTransformer {
  constructor(private dataSet: DemoDataSet) {}

  transformCourseStatistics(
    courseId: string,
    metric: MetricType,
    groupBy?: GroupByType,
    competenceFilter?: string,
    taskFilter?: string
  ): CourseStatistics | null {
    const course = this.dataSet.courses.find(c => c.id === courseId);
    if (!course) return null;

    let data: StatisticItem[] = [];

    switch (metric) {
      case 'competence_levels':
        data = this.generateCompetenceLevelStats(course, groupBy, competenceFilter);
        break;
      case 'solution_frequencies':
        data = this.generateSolutionFrequencyStats(course, groupBy, taskFilter);
        break;
      case 'task_performance':
        data = this.generateTaskPerformanceStats(course, groupBy, taskFilter);
        break;
      case 'course_comparisons':
        // Course comparisons are not applicable at course level, return empty data
        data = [];
        break;
    }

    return {
      course_id: courseId,
      metric,
      group_by: groupBy,
      data,
      total_participants: course.students.length,
      generated_at: new Date().toISOString()
    };
  }

  transformStudentPerformances(
    courseId: string,
    competenceFilter?: string,
    taskFilter?: string
  ): StudentPerformances | null {
    const course = this.dataSet.courses.find(c => c.id === courseId);
    if (!course) return null;

    const students = course.students.map(student => 
      this.transformStudentPerformance(student, course, competenceFilter, taskFilter)
    );

    return {
      course_id: courseId,
      students,
      total_students: students.length,
      generated_at: new Date().toISOString()
    };
  }

  transformSchoolRunStatistics(
    schoolId: string,
    runId: string,
    metric: 'competence_levels' | 'course_comparisons',
    compareWithSimilar = false
  ): SchoolRunStatistics | null {
    const school = this.dataSet.schools.find(s => s.id === schoolId);
    if (!school) return null;

    const run = school.runs.find(r => r.id === runId);
    if (!run) return null;

    const courses = this.dataSet.courses.filter(c => 
      run.course_ids.includes(c.id) && c.school_id === schoolId
    );

    let data: StatisticItem[] = [];
    let comparison_data: ComparisonData[] | undefined;

    switch (metric) {
      case 'competence_levels':
        data = this.generateSchoolCompetenceLevelStats(courses);
        break;
      case 'course_comparisons':
        data = this.generateSchoolCourseComparisonStats(courses);
        break;
    }

    if (compareWithSimilar) {
      comparison_data = this.generateComparisonData(data);
    }

    return {
      school_id: schoolId,
      run_id: runId,
      metric,
      data,
      comparison_data,
      total_courses: courses.length,
      generated_at: new Date().toISOString()
    };
  }

  private transformStudentPerformance(
    student: DemoStudent,
    course: DemoCourse,
    competenceFilter?: string,
    taskFilter?: string
  ): StudentPerformance {
    let competences: CompetenceResult[] = [];
    let tasks: TaskResult[] = [];

    for (const competence of course.competences) {
      if (competenceFilter && competence.id !== competenceFilter) continue;

      const competenceResults = student.results.filter(r => r.competence_id === competence.id);
      if (competenceResults.length === 0) continue;

      const avgScore = competenceResults.reduce((sum, r) => 
        sum + (r.points_achieved / r.points_possible * 100), 0
      ) / competenceResults.length;

      const avgLevel = Math.round(competenceResults.reduce((sum, r) => 
        sum + r.level, 0
      ) / competenceResults.length);

      competences.push({
        competence_id: competence.id,
        competence_name: competence.name,
        level: Math.max(1, Math.min(5, avgLevel)),
        score: Math.max(0, Math.min(100, avgScore))
      });
    }

    for (const task of course.tasks) {
      if (taskFilter && task.id !== taskFilter) continue;

      const taskResult = student.results.find(r => r.task_id === task.id);
      if (!taskResult) continue;

      tasks.push({
        task_id: task.id,
        task_name: task.name,
        points_achieved: taskResult.points_achieved,
        points_possible: taskResult.points_possible,
        percentage: (taskResult.points_achieved / taskResult.points_possible) * 100,
        solution_approach: taskResult.solution_approach
      });
    }

    const overall_score = tasks.length > 0 
      ? tasks.reduce((sum, t) => sum + t.percentage, 0) / tasks.length
      : 0;

    return {
      student_id: student.id,
      competences,
      tasks,
      overall_score: Math.max(0, Math.min(100, overall_score))
    };
  }

  private generateCompetenceLevelStats(
    course: DemoCourse,
    groupBy?: GroupByType,
    competenceFilter?: string
  ): StatisticItem[] {
    const stats: StatisticItem[] = [];
    const competences = competenceFilter 
      ? course.competences.filter(c => c.id === competenceFilter)
      : course.competences;

    for (const competence of competences) {
      const levelCounts: { [key: number]: number } = {};
      
      for (const student of course.students) {
        const results = student.results.filter(r => r.competence_id === competence.id);
        if (results.length === 0) continue;

        const avgLevel = Math.round(results.reduce((sum, r) => sum + r.level, 0) / results.length);
        levelCounts[avgLevel] = (levelCounts[avgLevel] || 0) + 1;
      }

      const totalStudents = Object.values(levelCounts).reduce((sum, count) => sum + count, 0);

      for (let level = 1; level <= 5; level++) {
        const count = levelCounts[level] || 0;
        stats.push({
          label: `${competence.name} - Level ${level}`,
          value: level,
          count,
          percentage: totalStudents > 0 ? (count / totalStudents) * 100 : 0
        });
      }
    }

    return stats;
  }

  private generateSolutionFrequencyStats(
    course: DemoCourse,
    groupBy?: GroupByType,
    taskFilter?: string
  ): StatisticItem[] {
    const stats: StatisticItem[] = [];
    const approaches: { [key: string]: number } = {};

    for (const student of course.students) {
      for (const result of student.results) {
        if (taskFilter && result.task_id !== taskFilter) continue;
        if (!result.solution_approach) continue;

        approaches[result.solution_approach] = (approaches[result.solution_approach] || 0) + 1;
      }
    }

    const total = Object.values(approaches).reduce((sum, count) => sum + count, 0);

    for (const [approach, count] of Object.entries(approaches)) {
      stats.push({
        label: approach,
        value: count,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0
      });
    }

    return stats.sort((a, b) => b.count! - a.count!);
  }

  private generateTaskPerformanceStats(
    course: DemoCourse,
    groupBy?: GroupByType,
    taskFilter?: string
  ): StatisticItem[] {
    const stats: StatisticItem[] = [];
    const tasks = taskFilter 
      ? course.tasks.filter(t => t.id === taskFilter)
      : course.tasks;

    for (const task of tasks) {
      const taskResults = [];
      
      for (const student of course.students) {
        const result = student.results.find(r => r.task_id === task.id);
        if (result) {
          taskResults.push((result.points_achieved / result.points_possible) * 100);
        }
      }

      if (taskResults.length > 0) {
        const avgPerformance = taskResults.reduce((sum, perf) => sum + perf, 0) / taskResults.length;
        
        stats.push({
          label: task.name,
          value: avgPerformance,
          count: taskResults.length,
          percentage: avgPerformance
        });
      }
    }

    return stats.sort((a, b) => b.value - a.value);
  }

  private generateSchoolCompetenceLevelStats(courses: DemoCourse[]): StatisticItem[] {
    const stats: StatisticItem[] = [];
    const levelCounts: { [key: string]: { [key: number]: number } } = {};

    for (const course of courses) {
      for (const competence of course.competences) {
        if (!levelCounts[competence.name]) {
          levelCounts[competence.name] = {};
        }

        for (const student of course.students) {
          const results = student.results.filter(r => r.competence_id === competence.id);
          if (results.length === 0) continue;

          const avgLevel = Math.round(results.reduce((sum, r) => sum + r.level, 0) / results.length);
          levelCounts[competence.name][avgLevel] = (levelCounts[competence.name][avgLevel] || 0) + 1;
        }
      }
    }

    for (const [competenceName, levels] of Object.entries(levelCounts)) {
      const totalStudents = Object.values(levels).reduce((sum, count) => sum + count, 0);
      const avgLevel = Object.entries(levels).reduce((sum, [level, count]) => 
        sum + (parseInt(level) * count), 0
      ) / totalStudents;

      stats.push({
        label: competenceName,
        value: avgLevel,
        count: totalStudents,
        percentage: (avgLevel / 5) * 100
      });
    }

    return stats.sort((a, b) => b.value - a.value);
  }

  private generateSchoolCourseComparisonStats(courses: DemoCourse[]): StatisticItem[] {
    const stats: StatisticItem[] = [];

    for (const course of courses) {
      let totalScore = 0;
      let studentCount = 0;

      for (const student of course.students) {
        let studentScore = 0;
        let taskCount = 0;

        for (const result of student.results) {
          studentScore += (result.points_achieved / result.points_possible) * 100;
          taskCount++;
        }

        if (taskCount > 0) {
          totalScore += studentScore / taskCount;
          studentCount++;
        }
      }

      if (studentCount > 0) {
        const avgScore = totalScore / studentCount;
        stats.push({
          label: course.name,
          value: avgScore,
          count: studentCount,
          percentage: avgScore
        });
      }
    }

    return stats.sort((a, b) => b.value - a.value);
  }

  private generateComparisonData(data: StatisticItem[]): ComparisonData[] {
    return data.map(item => ({
      comparison_group: item.label,
      our_school: item,
      similar_schools_average: {
        label: `${item.label} (Similar Schools Avg)`,
        value: item.value * (0.9 + Math.random() * 0.2), // Generate similar but different values
        count: Math.floor(item.count! * (2 + Math.random() * 3)),
        percentage: item.percentage! * (0.9 + Math.random() * 0.2)
      },
      percentile_rank: Math.floor(40 + Math.random() * 40) // Random percentile between 40-80
    }));
  }
}