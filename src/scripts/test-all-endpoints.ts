import axios from 'axios';
import { dataSets } from '../data/sample-data';

const baseURL = 'http://localhost:3000';

interface TestResult {
  endpoint: string;
  dataset: string;
  method: string;
  status: number;
  success: boolean;
  error?: string;
  responseValid?: boolean;
}

const results: TestResult[] = [];

async function testEndpoint(endpoint: string, dataset: string, method: string = 'GET'): Promise<TestResult> {
  const url = `${baseURL}${endpoint}`;
  
  try {
    const response = await axios({
      method,
      url,
      timeout: 5000
    });
    
    const result: TestResult = {
      endpoint,
      dataset,
      method,
      status: response.status,
      success: response.status >= 200 && response.status < 300,
      responseValid: isValidResponse(response.data)
    };
    
    return result;
  } catch (error: any) {
    const result: TestResult = {
      endpoint,
      dataset,
      method,
      status: error.response?.status || 0,
      success: false,
      error: error.response?.data?.message || error.message,
      responseValid: false
    };
    
    return result;
  }
}

function isValidResponse(data: any): boolean {
  // Check if response has the expected structure
  if (!data) return false;
  
  // Check for new API structure
  if (data.data && data.meta) {
    const meta = data.meta;
    return typeof meta.total === 'number' && 
           typeof meta.page === 'number' && 
           typeof meta.limit === 'number' && 
           typeof meta.hasNext === 'boolean';
  }
  
  // Check for error structure
  if (data.code && data.message) {
    return true;
  }
  
  return false;
}

async function testAllEndpoints() {
  console.log('🧪 Testing all endpoints on all datasets...\n');
  
  const datasetNames = Object.keys(dataSets);
  
  for (const datasetName of datasetNames) {
    console.log(`📊 Testing dataset: ${datasetName}`);
    const dataset = dataSets[datasetName];
    
    // Test course endpoints
    for (const course of dataset.courses) {
      // Test course statistics
      const courseStatsTests = [
        { metric: 'competence-levels', groupBy: 'students' },
        { metric: 'competence-levels', groupBy: 'competences' },
        { metric: 'competence-levels', groupBy: 'tasks' },
        { metric: 'solution-frequencies' },
        { metric: 'task-performance' }
      ];
      
      for (const test of courseStatsTests) {
        const params = new URLSearchParams({
          dataset: datasetName,
          metric: test.metric,
          ...(test.groupBy && { groupBy: test.groupBy })
        });
        
        const result = await testEndpoint(
          `/courses/${course.id}/statistics?${params.toString()}`,
          datasetName
        );
        results.push(result);
      }
      
      // Test student performances
      const studentTests = [
        { metric: 'competence-levels' },
        { metric: 'solution-frequencies' },
        { metric: 'task-performance' }
      ];
      
      for (const test of studentTests) {
        const params = new URLSearchParams({
          dataset: datasetName,
          metric: test.metric
        });
        
        const result = await testEndpoint(
          `/courses/${course.id}/students?${params.toString()}`,
          datasetName
        );
        results.push(result);
      }
    }
    
    // Test school endpoints
    for (const school of dataset.schools) {
      for (const run of school.runs) {
        // Test school run statistics
        const schoolStatsTests = [
          { metric: 'competence-levels', includeComparison: false },
          { metric: 'competence-levels', includeComparison: true },
          { metric: 'course-comparison', includeComparison: false }
        ];
        
        for (const test of schoolStatsTests) {
          const params = new URLSearchParams({
            dataset: datasetName,
            metric: test.metric,
            includeComparison: test.includeComparison.toString()
          });
          
          const result = await testEndpoint(
            `/schools/${school.id}/runs/${run.id}/statistics?${params.toString()}`,
            datasetName
          );
          results.push(result);
        }
        
        // Test school run courses
        const params = new URLSearchParams({
          dataset: datasetName,
          metric: 'competence-levels'
        });
        
        const result = await testEndpoint(
          `/schools/${school.id}/runs/${run.id}/courses?${params.toString()}`,
          datasetName
        );
        results.push(result);
      }
    }
    
    console.log(`✅ Completed testing dataset: ${datasetName}`);
  }
  
  // Generate summary report
  generateReport();
}

function generateReport() {
  console.log('\n📋 Test Results Summary\n');
  
  const totalTests = results.length;
  const successfulTests = results.filter(r => r.success).length;
  const failedTests = results.filter(r => !r.success).length;
  const validResponses = results.filter(r => r.responseValid).length;
  
  console.log(`Total tests: ${totalTests}`);
  console.log(`Successful: ${successfulTests} (${Math.round(successfulTests/totalTests*100)}%)`);
  console.log(`Failed: ${failedTests} (${Math.round(failedTests/totalTests*100)}%)`);
  console.log(`Valid responses: ${validResponses} (${Math.round(validResponses/totalTests*100)}%)`);
  
  // Group by dataset
  const datasetGroups = results.reduce((acc, result) => {
    if (!acc[result.dataset]) {
      acc[result.dataset] = [];
    }
    acc[result.dataset].push(result);
    return acc;
  }, {} as { [key: string]: TestResult[] });
  
  console.log('\n📊 Results by Dataset:\n');
  
  for (const [dataset, datasetResults] of Object.entries(datasetGroups)) {
    const datasetSuccess = datasetResults.filter(r => r.success).length;
    const datasetTotal = datasetResults.length;
    const datasetValid = datasetResults.filter(r => r.responseValid).length;
    
    console.log(`${dataset}:`);
    console.log(`  Success: ${datasetSuccess}/${datasetTotal} (${Math.round(datasetSuccess/datasetTotal*100)}%)`);
    console.log(`  Valid: ${datasetValid}/${datasetTotal} (${Math.round(datasetValid/datasetTotal*100)}%)`);
    
    // Show failures
    const failures = datasetResults.filter(r => !r.success);
    if (failures.length > 0) {
      console.log(`  Failures:`);
      failures.forEach(failure => {
        console.log(`    ❌ ${failure.endpoint} - ${failure.status} - ${failure.error}`);
      });
    }
    
    console.log('');
  }
  
  // Show status code breakdown
  const statusCodes = results.reduce((acc, result) => {
    acc[result.status] = (acc[result.status] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });
  
  console.log('📊 Status Code Distribution:\n');
  Object.entries(statusCodes)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .forEach(([status, count]) => {
      console.log(`  ${status}: ${count} requests`);
    });
  
  // Show endpoint patterns
  console.log('\n🔍 Endpoint Patterns:\n');
  const endpointPatterns = results.reduce((acc, result) => {
    const pattern = result.endpoint.replace(/\/[^/]+/g, '/{id}');
    const key = `${result.method} ${pattern}`;
    if (!acc[key]) {
      acc[key] = { success: 0, total: 0 };
    }
    acc[key].total++;
    if (result.success) {
      acc[key].success++;
    }
    return acc;
  }, {} as { [key: string]: { success: number; total: number } });
  
  Object.entries(endpointPatterns).forEach(([pattern, stats]) => {
    const successRate = Math.round(stats.success / stats.total * 100);
    console.log(`  ${pattern}: ${stats.success}/${stats.total} (${successRate}%)`);
  });
}

if (require.main === module) {
  testAllEndpoints().catch(console.error);
}

export { testAllEndpoints };