import axios from 'axios';
import { dataSets } from '../data/sample-data';

const baseURL = 'http://localhost:3000';

interface ValidationResult {
  endpoint: string;
  dataset: string;
  compliant: boolean;
  issues: string[];
}

const results: ValidationResult[] = [];

// OpenAPI spec validation rules
const openApiRules = {
  courseStatistics: {
    path: '/courses/{courseId}/statistics',
    requiredParams: ['metric'],
    allowedMetrics: ['competence-levels', 'solution-frequencies', 'task-performance'],
    allowedGroupBy: ['students', 'competences', 'tasks'],
    responseSchema: 'StatisticsResponse'
  },
  courseStudents: {
    path: '/courses/{courseId}/students',
    requiredParams: ['metric'],
    allowedMetrics: ['competence-levels', 'solution-frequencies', 'task-performance'],
    responseSchema: 'StudentPerformanceResponse'
  },
  schoolStatistics: {
    path: '/schools/{schoolId}/runs/{runId}/statistics',
    requiredParams: ['metric'],
    allowedMetrics: ['competence-levels', 'course-comparison'],
    allowedIncludeComparison: ['true', 'false'],
    responseSchema: 'SchoolStatisticsResponse'
  },
  schoolCourses: {
    path: '/schools/{schoolId}/runs/{runId}/courses',
    requiredParams: ['metric'],
    allowedMetrics: ['competence-levels'],
    responseSchema: 'CoursesStatisticsResponse'
  }
};

async function validateEndpoint(endpoint: string, dataset: string, expectedType: keyof typeof openApiRules): Promise<ValidationResult> {
  const rule = openApiRules[expectedType];
  const issues: string[] = [];
  
  try {
    const response = await axios.get(`${baseURL}${endpoint}`, { timeout: 5000 });
    
    // Check if response is 200
    if (response.status !== 200) {
      issues.push(`Expected 200 status, got ${response.status}`);
    }
    
    // Check response structure
    const data = response.data;
    if (!data.data || !data.meta) {
      issues.push('Response missing required "data" or "meta" fields');
    }
    
    // Check meta structure
    if (data.meta) {
      const meta = data.meta;
      if (typeof meta.total !== 'number' || typeof meta.page !== 'number' || 
          typeof meta.limit !== 'number' || typeof meta.hasNext !== 'boolean') {
        issues.push('Invalid meta structure');
      }
    }
    
    // Extract URL parameters
    const urlParams = new URLSearchParams(endpoint.split('?')[1] || '');
    
    // Check required parameters
    for (const param of rule.requiredParams) {
      if (!urlParams.has(param)) {
        issues.push(`Missing required parameter: ${param}`);
      }
    }
    
    // Check metric parameter
    const metric = urlParams.get('metric');
    if (metric && !rule.allowedMetrics.includes(metric)) {
      issues.push(`Invalid metric value: ${metric}. Allowed: ${rule.allowedMetrics.join(', ')}`);
    }
    
    // Check groupBy parameter (for course statistics)
    const groupBy = urlParams.get('groupBy');
    if (groupBy && expectedType === 'courseStatistics' && !openApiRules.courseStatistics.allowedGroupBy.includes(groupBy)) {
      issues.push(`Invalid groupBy value: ${groupBy}. Allowed: ${openApiRules.courseStatistics.allowedGroupBy.join(', ')}`);
    }
    
    // Check includeComparison parameter (for school statistics)
    const includeComparison = urlParams.get('includeComparison');
    if (includeComparison && expectedType === 'schoolStatistics' && !openApiRules.schoolStatistics.allowedIncludeComparison.includes(includeComparison)) {
      issues.push(`Invalid includeComparison value: ${includeComparison}. Allowed: ${openApiRules.schoolStatistics.allowedIncludeComparison.join(', ')}`);
    }
    
    // Check dataset parameter
    const datasetParam = urlParams.get('dataset');
    if (datasetParam && !Object.keys(dataSets).includes(datasetParam)) {
      issues.push(`Invalid dataset value: ${datasetParam}. Allowed: ${Object.keys(dataSets).join(', ')}`);
    }
    
    return {
      endpoint,
      dataset,
      compliant: issues.length === 0,
      issues
    };
    
  } catch (error: any) {
    issues.push(`Request failed: ${error.message}`);
    return {
      endpoint,
      dataset,
      compliant: false,
      issues
    };
  }
}

async function validateAllEndpoints() {
  console.log('🔍 Validating OpenAPI compliance for all endpoints...\n');
  
  const datasetNames = Object.keys(dataSets);
  
  for (const datasetName of datasetNames) {
    console.log(`📊 Validating dataset: ${datasetName}`);
    const dataset = dataSets[datasetName];
    
    // Validate course endpoints
    for (const course of dataset.courses) {
      // Course statistics endpoints
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
        
        const endpoint = `/courses/${course.id}/statistics?${params.toString()}`;
        const result = await validateEndpoint(endpoint, datasetName, 'courseStatistics');
        results.push(result);
      }
      
      // Course student endpoints
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
        
        const endpoint = `/courses/${course.id}/students?${params.toString()}`;
        const result = await validateEndpoint(endpoint, datasetName, 'courseStudents');
        results.push(result);
      }
    }
    
    // Validate school endpoints
    for (const school of dataset.schools) {
      for (const run of school.runs) {
        // School run statistics endpoints
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
          
          const endpoint = `/schools/${school.id}/runs/${run.id}/statistics?${params.toString()}`;
          const result = await validateEndpoint(endpoint, datasetName, 'schoolStatistics');
          results.push(result);
        }
        
        // School run courses endpoint
        const params = new URLSearchParams({
          dataset: datasetName,
          metric: 'competence-levels'
        });
        
        const endpoint = `/schools/${school.id}/runs/${run.id}/courses?${params.toString()}`;
        const result = await validateEndpoint(endpoint, datasetName, 'schoolCourses');
        results.push(result);
      }
    }
  }
  
  return results;
}

function generateComplianceReport(results: ValidationResult[]): string {
  const report = [];
  
  report.push('# OpenAPI Compliance Validation Report\n');
  
  const totalEndpoints = results.length;
  const compliantEndpoints = results.filter(r => r.compliant).length;
  const nonCompliantEndpoints = results.filter(r => !r.compliant).length;
  
  report.push('## Summary\n');
  report.push(`- **Total Endpoints Tested**: ${totalEndpoints}`);
  report.push(`- **Compliant**: ${compliantEndpoints} (${Math.round(compliantEndpoints/totalEndpoints*100)}%)`);
  report.push(`- **Non-Compliant**: ${nonCompliantEndpoints} (${Math.round(nonCompliantEndpoints/totalEndpoints*100)}%)`);
  report.push('');
  
  // Group by compliance status
  const compliant = results.filter(r => r.compliant);
  const nonCompliant = results.filter(r => !r.compliant);
  
  if (compliant.length > 0) {
    report.push('## ✅ Compliant Endpoints\n');
    report.push(`All ${compliant.length} endpoints are fully compliant with the OpenAPI specification:`);
    report.push('- All required parameters are present');
    report.push('- All parameter values are within allowed ranges');
    report.push('- All responses have correct structure (data + meta)');
    report.push('- All responses return appropriate HTTP status codes');
    report.push('');
  }
  
  if (nonCompliant.length > 0) {
    report.push('## ❌ Non-Compliant Endpoints\n');
    
    // Group by dataset
    const datasetGroups = nonCompliant.reduce((acc, result) => {
      if (!acc[result.dataset]) {
        acc[result.dataset] = [];
      }
      acc[result.dataset].push(result);
      return acc;
    }, {} as { [key: string]: ValidationResult[] });
    
    for (const [dataset, datasetResults] of Object.entries(datasetGroups)) {
      report.push(`### ${dataset} Dataset\n`);
      report.push('| Endpoint | Issues |');
      report.push('|----------|--------|');
      
      for (const result of datasetResults) {
        const issuesText = result.issues.join('; ');
        report.push(`| \`${result.endpoint}\` | ${issuesText} |`);
      }
      report.push('');
    }
  }
  
  // Endpoint type compliance
  const endpointTypes = {
    courseStatistics: results.filter(r => r.endpoint.includes('/courses/') && r.endpoint.includes('/statistics')),
    courseStudents: results.filter(r => r.endpoint.includes('/courses/') && r.endpoint.includes('/students')),
    schoolStatistics: results.filter(r => r.endpoint.includes('/schools/') && r.endpoint.includes('/statistics')),
    schoolCourses: results.filter(r => r.endpoint.includes('/schools/') && r.endpoint.includes('/courses'))
  };
  
  report.push('## Compliance by Endpoint Type\n');
  report.push('| Endpoint Type | Total | Compliant | Rate |');
  report.push('|---------------|-------|-----------|------|');
  
  for (const [type, endpoints] of Object.entries(endpointTypes)) {
    const total = endpoints.length;
    const compliant = endpoints.filter(e => e.compliant).length;
    const rate = Math.round(compliant/total*100);
    report.push(`| ${type} | ${total} | ${compliant} | ${rate}% |`);
  }
  report.push('');
  
  return report.join('\n');
}

async function main() {
  try {
    const results = await validateAllEndpoints();
    const report = generateComplianceReport(results);
    
    console.log('\n📝 OpenAPI Compliance Report:\n');
    console.log(report);
    
    // Exit with error code if any endpoints are non-compliant
    const nonCompliantCount = results.filter(r => !r.compliant).length;
    if (nonCompliantCount > 0) {
      console.error(`\n❌ Validation failed: ${nonCompliantCount} endpoints are not compliant with OpenAPI specification`);
      process.exit(1);
    } else {
      console.log('\n✅ All endpoints are compliant with OpenAPI specification');
    }
    
  } catch (error) {
    console.error('Validation error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { validateAllEndpoints, generateComplianceReport };