import * as fs from 'fs';
import * as path from 'path';

interface EndpointData {
  method: string;
  url: string;
  path: string;
  status: string;
  description: string;
  dataset: string;
  category: string;
  class: string;
  metric: string;
  routeType: string;
}

function parseEndpointsFromMarkdown(): EndpointData[] {
  const filePath = path.join(__dirname, '../../endpoint-results.md');
  const content = fs.readFileSync(filePath, 'utf8');
  
  const endpoints: EndpointData[] = [];
  const lines = content.split('\n');
  
  let currentDataset = '';
  let currentCategory = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Extract dataset name
    if (line.startsWith('### ') && line.includes('Dataset')) {
      currentDataset = line.replace('### ', '').replace(' Dataset', '');
      continue;
    }
    
    // Extract category
    if (line.startsWith('#### ') && line.includes('Endpoints')) {
      currentCategory = line.replace('#### ', '').replace(' Endpoints', '');
      continue;
    }
    
    // Parse endpoint table rows
    if (line.startsWith('| GET |')) {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 5) {
        const method = parts[1];
        const fullUrl = parts[2].replace(/`/g, '');
        const status = parts[3];
        const description = parts[4];
        
        // Extract path from full URL
        const urlObj = new URL(fullUrl);
        const path = urlObj.pathname + urlObj.search;
        
        // Extract additional tags
        const extractTags = (path: string) => {
          const searchParams = new URLSearchParams(urlObj.search);
          
          // Extract class (courses, schools, datasets)
          let extractedClass = 'other';
          if (path.includes('/courses/')) extractedClass = 'courses';
          else if (path.includes('/schools/')) extractedClass = 'schools';
          else if (path.includes('/datasets')) extractedClass = 'datasets';
          
          // Extract metric from query params
          const metric = searchParams.get('metric') || 'none';
          
          // Extract route type
          let routeType = 'other';
          if (path.includes('/statistics')) routeType = 'statistics';
          else if (path.includes('/students')) routeType = 'students';
          else if (path.includes('/comparison')) routeType = 'comparison';
          else if (path === '/datasets' || path.startsWith('/datasets?')) routeType = 'list';
          
          return { class: extractedClass, metric, routeType };
        };
        
        const { class: extractedClass, metric, routeType } = extractTags(path);
        
        endpoints.push({
          method,
          url: fullUrl,
          path,
          status,
          description,
          dataset: currentDataset,
          category: currentCategory,
          class: extractedClass,
          metric,
          routeType
        });
      }
    }
  }
  
  return endpoints;
}

export { parseEndpointsFromMarkdown, EndpointData };