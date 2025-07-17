import { DataTransformer } from '../transformers/data-transformer';
import { dataSets } from '../data/sample-data';
import { validateData } from '../middleware/validation';

async function validateAllDatasets() {
  console.log('🔍 Validating all datasets against API schema...\n');
  
  const datasets = Object.keys(dataSets);
  let totalErrors = 0;
  
  for (const datasetName of datasets) {
    console.log(`📊 Testing dataset: ${datasetName}`);
    const dataSet = dataSets[datasetName];
    const transformer = new DataTransformer(dataSet);
    
    // Test all courses in the dataset
    const courseErrors: string[] = [];
    
    for (const course of dataSet.courses) {
      const courseId = course.id;
      
      // Test course statistics with different metrics
      const metrics = ['competence_levels', 'solution_frequencies', 'task_performance'];
      const groupBys = ['students', 'competences', 'tasks'];
      
      for (const metric of metrics) {
        try {
          const stats = transformer.transformCourseStatistics(courseId, metric as any);
          if (stats) {
            const validation = validateData(stats, 'CourseStatistics');
            if (!validation.valid) {
              courseErrors.push(`❌ CourseStatistics validation failed for course ${courseId}, metric ${metric}:`);
              validation.errors?.forEach(err => {
                courseErrors.push(`   - ${err.instancePath || 'root'}: ${err.message}`);
              });
            }
          }
        } catch (error) {
          courseErrors.push(`❌ Error generating CourseStatistics for course ${courseId}, metric ${metric}: ${error}`);
        }
      }
      
      // Test student performances
      try {
        const students = transformer.transformStudentPerformances(courseId);
        if (students) {
          const validation = validateData(students, 'StudentPerformances');
          if (!validation.valid) {
            courseErrors.push(`❌ StudentPerformances validation failed for course ${courseId}:`);
            validation.errors?.forEach(err => {
              courseErrors.push(`   - ${err.instancePath || 'root'}: ${err.message}`);
            });
          }
        }
      } catch (error) {
        courseErrors.push(`❌ Error generating StudentPerformances for course ${courseId}: ${error}`);
      }
    }
    
    // Test school run statistics
    const schoolErrors: string[] = [];
    for (const school of dataSet.schools) {
      for (const run of school.runs) {
        const schoolId = school.id;
        const runId = run.id;
        
        const metrics = ['competence_levels', 'course_comparisons'];
        
        for (const metric of metrics) {
          try {
            const stats = transformer.transformSchoolRunStatistics(schoolId, runId, metric as any);
            if (stats) {
              const validation = validateData(stats, 'SchoolRunStatistics');
              if (!validation.valid) {
                schoolErrors.push(`❌ SchoolRunStatistics validation failed for school ${schoolId}, run ${runId}, metric ${metric}:`);
                validation.errors?.forEach(err => {
                  schoolErrors.push(`   - ${err.instancePath || 'root'}: ${err.message}`);
                });
              }
            }
          } catch (error) {
            schoolErrors.push(`❌ Error generating SchoolRunStatistics for school ${schoolId}, run ${runId}, metric ${metric}: ${error}`);
          }
        }
      }
    }
    
    const datasetErrors = courseErrors.length + schoolErrors.length;
    totalErrors += datasetErrors;
    
    if (datasetErrors === 0) {
      console.log(`✅ Dataset ${datasetName}: All validations passed!`);
    } else {
      console.log(`❌ Dataset ${datasetName}: ${datasetErrors} validation errors found`);
      courseErrors.forEach(err => console.log(`  ${err}`));
      schoolErrors.forEach(err => console.log(`  ${err}`));
    }
    
    console.log('');
  }
  
  console.log(`\n📋 Summary:`);
  console.log(`- Datasets tested: ${datasets.length}`);
  console.log(`- Total validation errors: ${totalErrors}`);
  
  if (totalErrors === 0) {
    console.log('🎉 All datasets pass API schema validation!');
  } else {
    console.log('⚠️  Some datasets have validation issues that need to be fixed.');
  }
  
  return totalErrors;
}

// Test individual components
async function testIndividualComponents() {
  console.log('\n🔬 Testing individual schema components...\n');
  
  const dataset = dataSets.sample;
  const transformer = new DataTransformer(dataset);
  
  // Test StatisticItem
  const sampleStatItem = {
    label: 'Test Label',
    value: 42.5,
    percentage: 85.2,
    count: 12
  };
  
  const statItemValidation = validateData(sampleStatItem, 'StatisticItem');
  console.log(`StatisticItem validation: ${statItemValidation.valid ? '✅ PASS' : '❌ FAIL'}`);
  if (!statItemValidation.valid) {
    statItemValidation.errors?.forEach(err => console.log(`  - ${err.message}`));
  }
  
  // Test CompetenceResult
  const sampleCompetence = {
    competence_id: 'comp1',
    competence_name: 'Test Competence',
    level: 3,
    score: 75.5
  };
  
  const compValidation = validateData(sampleCompetence, 'CompetenceResult');
  console.log(`CompetenceResult validation: ${compValidation.valid ? '✅ PASS' : '❌ FAIL'}`);
  if (!compValidation.valid) {
    compValidation.errors?.forEach(err => console.log(`  - ${err.message}`));
  }
  
  // Test TaskResult
  const sampleTask = {
    task_id: 'task1',
    task_name: 'Test Task',
    points_achieved: 8,
    points_possible: 10,
    percentage: 80,
    solution_approach: 'Test approach'
  };
  
  const taskValidation = validateData(sampleTask, 'TaskResult');
  console.log(`TaskResult validation: ${taskValidation.valid ? '✅ PASS' : '❌ FAIL'}`);
  if (!taskValidation.valid) {
    taskValidation.errors?.forEach(err => console.log(`  - ${err.message}`));
  }
}

// Run the validation
if (require.main === module) {
  (async () => {
    await testIndividualComponents();
    const errors = await validateAllDatasets();
    process.exit(errors > 0 ? 1 : 0);
  })();
}

export { validateAllDatasets, testIndividualComponents };