import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { parseEndpointsFromMarkdown } from '../scripts/parse-endpoints';

const router = Router();

// GET /explore - API Explorer
router.get('/', (req: Request, res: Response) => {
  try {
    // Parse endpoints from markdown file
    const endpoints = parseEndpointsFromMarkdown();
    
    // Read HTML template
    const templatePath = path.join(__dirname, '../views/explorer.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholder with actual endpoints data
    const endpointsJson = JSON.stringify(endpoints);
    htmlContent = htmlContent.replace('{{ENDPOINTS_DATA}}', endpointsJson);
    
    // Set content type and send HTML
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
    
  } catch (error) {
    console.error('Error serving API explorer:', error);
    res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: 'Failed to load API explorer'
    });
  }
});

export default router;