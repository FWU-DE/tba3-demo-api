import axios from 'axios';
import { dataSets } from '../data/sample-data';

const baseURL = 'http://localhost:3000';

interface EndpointResult {
  method: string;
  url: string;
  dataset: string;
  status: number;
  success: boolean;
  description: string;
}

const results: EndpointResult[] = [];

async function testEndpoint(endpoint: string, dataset: string, description: string): Promise<EndpointResult> {
  const url = `${baseURL}${endpoint}`;
  
  try {
    const response = await axios({
      method: 'GET',
      url,
      timeout: 5000
    });
    
    return {
      method: 'GET',
      url: endpoint,
      dataset,
      status: response.status,
      success: response.status >= 200 && response.status < 300,
      description
    };
  } catch (error: any) {
    return {
      method: 'GET',
      url: endpoint,
      dataset,
      status: error.response?.status || 0,
      success: false,
      description
    };
  }
}

async function generateEndpointList() {
  console.log('🔍 Generating comprehensive endpoint list...\n');
  
  const datasetNames = Object.keys(dataSets);
  
  for (const datasetName of datasetNames) {
    console.log(`📊 Testing dataset: ${datasetName}`);
    const dataset = dataSets[datasetName];
    
    // Test course endpoints
    for (const course of dataset.courses) {
      // Course statistics endpoints
      const courseStatsTests = [
        { metric: 'competence-levels', groupBy: 'students', desc: 'Course competence levels grouped by students' },
        { metric: 'competence-levels', groupBy: 'competences', desc: 'Course competence levels grouped by competences' },
        { metric: 'competence-levels', groupBy: 'tasks', desc: 'Course competence levels grouped by tasks' },
        { metric: 'solution-frequencies', groupBy: undefined, desc: 'Course solution frequencies' },
        { metric: 'task-performance', groupBy: undefined, desc: 'Course task performance' }
      ];
      
      for (const test of courseStatsTests) {
        const params = new URLSearchParams({
          dataset: datasetName,
          metric: test.metric,
          ...(test.groupBy && { groupBy: test.groupBy })
        });
        
        const endpoint = `/courses/${course.id}/statistics?${params.toString()}`;
        const result = await testEndpoint(endpoint, datasetName, test.desc);
        results.push(result);
      }
      
      // Course student endpoints
      const studentTests = [
        { metric: 'competence-levels', desc: 'Course student competence levels' },
        { metric: 'solution-frequencies', desc: 'Course student solution frequencies' },
        { metric: 'task-performance', desc: 'Course student task performance' }
      ];
      
      for (const test of studentTests) {
        const params = new URLSearchParams({
          dataset: datasetName,
          metric: test.metric
        });
        
        const endpoint = `/courses/${course.id}/students?${params.toString()}`;
        const result = await testEndpoint(endpoint, datasetName, test.desc);
        results.push(result);
      }
    }
    
    // Test school endpoints
    for (const school of dataset.schools) {
      for (const run of school.runs) {
        // School run statistics endpoints
        const schoolStatsTests = [
          { metric: 'competence-levels', includeComparison: false, desc: 'School run competence levels' },
          { metric: 'competence-levels', includeComparison: true, desc: 'School run competence levels with comparison' },
          { metric: 'course-comparison', includeComparison: false, desc: 'School run course comparison' }
        ];
        
        for (const test of schoolStatsTests) {
          const params = new URLSearchParams({
            dataset: datasetName,
            metric: test.metric,
            includeComparison: test.includeComparison.toString()
          });
          
          const endpoint = `/schools/${school.id}/runs/${run.id}/statistics?${params.toString()}`;
          const result = await testEndpoint(endpoint, datasetName, test.desc);
          results.push(result);
        }
        
        // School run courses endpoint
        const params = new URLSearchParams({
          dataset: datasetName,
          metric: 'competence-levels'
        });
        
        const endpoint = `/schools/${school.id}/runs/${run.id}/courses?${params.toString()}`;
        const result = await testEndpoint(endpoint, datasetName, 'School run courses');
        results.push(result);
      }
    }
  }
  
  return results;
}

function generateMarkdownReport(results: EndpointResult[]): string {
  const markdown = [];
  
  markdown.push('# API Endpoint Test Results\n');
  markdown.push('This section contains all tested endpoints with their current status.\n');
  
  // Summary
  const totalTests = results.length;
  const successfulTests = results.filter(r => r.success).length;
  const failedTests = results.filter(r => !r.success).length;
  
  markdown.push('## Summary\n');
  markdown.push(`- **Total Endpoints Tested**: ${totalTests}`);
  markdown.push(`- **Successful**: ${successfulTests} (${Math.round(successfulTests/totalTests*100)}%)`);
  markdown.push(`- **Failed**: ${failedTests} (${Math.round(failedTests/totalTests*100)}%)`);
  markdown.push('');
  
  // Group by dataset
  const datasetGroups = results.reduce((acc, result) => {
    if (!acc[result.dataset]) {
      acc[result.dataset] = [];
    }
    acc[result.dataset].push(result);
    return acc;
  }, {} as { [key: string]: EndpointResult[] });
  
  markdown.push('## Tested Endpoints by Dataset\n');
  
  for (const [dataset, datasetResults] of Object.entries(datasetGroups)) {
    const datasetSuccess = datasetResults.filter(r => r.success).length;
    const datasetTotal = datasetResults.length;
    
    markdown.push(`### ${dataset} Dataset`);
    markdown.push(`**Status**: ${datasetSuccess}/${datasetTotal} endpoints working (${Math.round(datasetSuccess/datasetTotal*100)}%)\n`);
    
    // Group by endpoint type
    const courseStats = datasetResults.filter(r => r.url.includes('/courses/') && r.url.includes('/statistics'));
    const courseStudents = datasetResults.filter(r => r.url.includes('/courses/') && r.url.includes('/students'));
    const schoolStats = datasetResults.filter(r => r.url.includes('/schools/') && r.url.includes('/statistics'));
    const schoolCourses = datasetResults.filter(r => r.url.includes('/schools/') && r.url.includes('/courses'));
    
    if (courseStats.length > 0) {
      markdown.push('#### Course Statistics Endpoints\n');
      markdown.push('| Method | Endpoint | Status | Description |');
      markdown.push('|--------|----------|--------|-------------|');
      
      for (const result of courseStats) {
        const statusIcon = result.success ? '✅' : '❌';
        const fullUrl = `http://localhost:3000${result.url}`;
        markdown.push(`| ${result.method} | \`${fullUrl}\` | ${statusIcon} ${result.status} | ${result.description} |`);
      }
      markdown.push('');
    }
    
    if (courseStudents.length > 0) {
      markdown.push('#### Course Student Endpoints\n');
      markdown.push('| Method | Endpoint | Status | Description |');
      markdown.push('|--------|----------|--------|-------------|');
      
      for (const result of courseStudents) {
        const statusIcon = result.success ? '✅' : '❌';
        const fullUrl = `http://localhost:3000${result.url}`;
        markdown.push(`| ${result.method} | \`${fullUrl}\` | ${statusIcon} ${result.status} | ${result.description} |`);
      }
      markdown.push('');
    }
    
    if (schoolStats.length > 0) {
      markdown.push('#### School Statistics Endpoints\n');
      markdown.push('| Method | Endpoint | Status | Description |');
      markdown.push('|--------|----------|--------|-------------|');
      
      for (const result of schoolStats) {
        const statusIcon = result.success ? '✅' : '❌';
        const fullUrl = `http://localhost:3000${result.url}`;
        markdown.push(`| ${result.method} | \`${fullUrl}\` | ${statusIcon} ${result.status} | ${result.description} |`);
      }
      markdown.push('');
    }
    
    if (schoolCourses.length > 0) {
      markdown.push('#### School Course Endpoints\n');
      markdown.push('| Method | Endpoint | Status | Description |');
      markdown.push('|--------|----------|--------|-------------|');
      
      for (const result of schoolCourses) {
        const statusIcon = result.success ? '✅' : '❌';
        const fullUrl = `http://localhost:3000${result.url}`;
        markdown.push(`| ${result.method} | \`${fullUrl}\` | ${statusIcon} ${result.status} | ${result.description} |`);
      }
      markdown.push('');
    }
  }
  
  return markdown.join('\n');
}

async function main() {
  try {
    const results = await generateEndpointList();
    const markdown = generateMarkdownReport(results);
    console.log('\n📝 Generated Markdown Report:\n');
    console.log(markdown);
  } catch (error) {
    console.error('Error generating endpoint list:', error);
  }
}

if (require.main === module) {
  main();
}

export { generateEndpointList, generateMarkdownReport };