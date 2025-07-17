import { dataSets } from '../data/sample-data';

const baseURL = 'http://localhost:3000';

async function testAllEndpoints() {
  console.log('🧪 Testing all endpoints on all datasets...\n');
  
  const datasetNames = Object.keys(dataSets);
  let totalTests = 0;
  let passedTests = 0;
  
  for (const datasetName of datasetNames) {
    console.log(`📊 Testing dataset: ${datasetName}`);
    const dataset = dataSets[datasetName];
    
    // Test a sample of endpoints for each dataset
    for (const course of dataset.courses.slice(0, 1)) { // Test first course only
      // Test course statistics
      const metricsToTest = ['competence-levels', 'solution-frequencies', 'task-performance'];
      
      for (const metric of metricsToTest) {
        const url = `${baseURL}/courses/${course.id}/statistics?dataset=${datasetName}&metric=${metric}`;
        
        try {
          const response = await fetch(url);
          totalTests++;
          
          if (response.ok) {
            const data = await response.json() as any;
            if (data.data && data.meta) {
              console.log(`  ✅ ${metric} statistics: ${data.data.length} items`);
              passedTests++;
            } else {
              console.log(`  ❌ ${metric} statistics: Invalid response structure`);
            }
          } else {
            console.log(`  ❌ ${metric} statistics: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.log(`  ❌ ${metric} statistics: Error - ${error}`);
          totalTests++;
        }
      }
      
      // Test student performances
      const studentMetrics = ['competence-levels', 'solution-frequencies', 'task-performance'];
      
      for (const metric of studentMetrics) {
        const url = `${baseURL}/courses/${course.id}/students?dataset=${datasetName}&metric=${metric}`;
        
        try {
          const response = await fetch(url);
          totalTests++;
          
          if (response.ok) {
            const data = await response.json() as any;
            if (data.data && data.meta) {
              console.log(`  ✅ ${metric} students: ${data.data.length} students`);
              passedTests++;
            } else {
              console.log(`  ❌ ${metric} students: Invalid response structure`);
            }
          } else {
            console.log(`  ❌ ${metric} students: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.log(`  ❌ ${metric} students: Error - ${error}`);
          totalTests++;
        }
      }
    }
    
    // Test school endpoints
    for (const school of dataset.schools.slice(0, 1)) { // Test first school only
      for (const run of school.runs.slice(0, 1)) { // Test first run only
        // Test school statistics
        const schoolMetrics = ['competence-levels', 'course-comparison'];
        
        for (const metric of schoolMetrics) {
          const url = `${baseURL}/schools/${school.id}/runs/${run.id}/statistics?dataset=${datasetName}&metric=${metric}`;
          
          try {
            const response = await fetch(url);
            totalTests++;
            
            if (response.ok) {
              const data = await response.json() as any;
              if (data.data && data.meta) {
                console.log(`  ✅ ${metric} school stats: OK`);
                passedTests++;
              } else {
                console.log(`  ❌ ${metric} school stats: Invalid response structure`);
              }
            } else {
              console.log(`  ❌ ${metric} school stats: ${response.status} ${response.statusText}`);
            }
          } catch (error) {
            console.log(`  ❌ ${metric} school stats: Error - ${error}`);
            totalTests++;
          }
        }
        
        // Test school courses
        const url = `${baseURL}/schools/${school.id}/runs/${run.id}/courses?dataset=${datasetName}&metric=competence-levels`;
        
        try {
          const response = await fetch(url);
          totalTests++;
          
          if (response.ok) {
            const data = await response.json() as any;
            if (data.data && data.meta) {
              console.log(`  ✅ school courses: ${data.data.length} courses`);
              passedTests++;
            } else {
              console.log(`  ❌ school courses: Invalid response structure`);
            }
          } else {
            console.log(`  ❌ school courses: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.log(`  ❌ school courses: Error - ${error}`);
          totalTests++;
        }
      }
    }
    
    console.log('');
  }
  
  console.log(`📋 Summary: ${passedTests}/${totalTests} tests passed (${Math.round(passedTests/totalTests*100)}%)`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! API is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Check the results above.');
  }
}

if (require.main === module) {
  testAllEndpoints().catch(console.error);
}

export { testAllEndpoints };