import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

// Load and parse the OpenAPI specification
const specPath = path.join(__dirname, '../../tba3_api_spec.yml');
const specContent = fs.readFileSync(specPath, 'utf8');
const apiSpec = yaml.load(specContent) as any;

// Initialize AJV with formats
const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

// Extract schemas from the OpenAPI spec
const schemas = apiSpec.components?.schemas || {};

// Add all schemas to AJV instance first
Object.keys(schemas).forEach(schemaName => {
  ajv.addSchema(schemas[schemaName], `#/components/schemas/${schemaName}`);
});

// Compile validators for each schema that exists
const validators: { [key: string]: any } = {};

// Only compile schemas that exist in the OpenAPI spec
const availableSchemas = ['StatisticsResponse', 'StudentPerformanceResponse', 'SchoolStatisticsResponse', 'CoursesStatisticsResponse', 'StudentPerformance', 'CourseStatistics', 'ComparisonData'];

availableSchemas.forEach(schemaName => {
  if (schemas[schemaName]) {
    validators[schemaName] = ajv.compile(schemas[schemaName]);
  }
});

// Validation middleware factory
export const validateResponse = (schemaName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    
    res.json = function(data: any) {
      // Don't validate error responses that have 'code' and 'message' properties
      // These are API error responses, not data responses
      if (data && typeof data === 'object' && data.code && data.message) {
        return originalJson.call(this, data);
      }
      
      // Don't validate generic error responses
      if (data && typeof data === 'object' && data.error) {
        return originalJson.call(this, data);
      }

      const validator = validators[schemaName];
      if (!validator) {
        console.error(`No validator found for schema: ${schemaName}`);
        return originalJson.call(this, data);
      }

      const valid = validator(data);
      if (!valid) {
        console.error(`Validation failed for ${schemaName}:`, validator.errors);
        console.error('Data that failed validation:', JSON.stringify(data, null, 2));
        
        // Return original error without recursion
        return originalJson.call(this, {
          error: 'Response validation failed',
          schema: schemaName,
          validation_errors: validator.errors
        });
      }

      return originalJson.call(this, data);
    };

    next();
  };
};

// Parameter validation middleware
export const validateQueryParams = (endpoint: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const endpointConfig = getEndpointConfig(endpoint);
    if (!endpointConfig) {
      return next();
    }

    const errors: string[] = [];
    
    // Validate query parameters
    for (const param of endpointConfig.parameters || []) {
      if (param.in === 'query') {
        const value = req.query[param.name];
        
        if (param.required && (value === undefined || value === '')) {
          errors.push(`Required query parameter '${param.name}' is missing`);
          continue;
        }

        if (value !== undefined && param.schema) {
          const paramValidator = ajv.compile(param.schema);
          if (!paramValidator(value)) {
            errors.push(`Invalid value for query parameter '${param.name}': ${paramValidator.errors?.map(e => e.message).join(', ')}`);
          }
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Parameter validation failed',
        validation_errors: errors
      });
    }

    next();
  };
};

// Path parameter validation middleware
export const validatePathParams = (endpoint: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const endpointConfig = getEndpointConfig(endpoint);
    if (!endpointConfig) {
      return next();
    }

    const errors: string[] = [];
    
    // Validate path parameters
    for (const param of endpointConfig.parameters || []) {
      if (param.in === 'path') {
        const value = req.params[param.name];
        
        if (param.required && !value) {
          errors.push(`Required path parameter '${param.name}' is missing`);
          continue;
        }

        if (value && param.schema) {
          const paramValidator = ajv.compile(param.schema);
          if (!paramValidator(value)) {
            errors.push(`Invalid value for path parameter '${param.name}': ${paramValidator.errors?.map(e => e.message).join(', ')}`);
          }
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Parameter validation failed',
        validation_errors: errors
      });
    }

    next();
  };
};

// Helper function to get endpoint configuration from OpenAPI spec
function getEndpointConfig(endpoint: string) {
  const paths = apiSpec.paths || {};
  const config = paths[endpoint];
  
  if (!config) {
    console.warn(`No configuration found for endpoint: ${endpoint}`);
    return null;
  }
  
  // Get the GET method configuration
  return config.get || null;
}

// Validation testing function
export const validateData = (data: any, schemaName: string): { valid: boolean; errors?: any[] } => {
  const validator = validators[schemaName];
  if (!validator) {
    return { valid: false, errors: [{ message: `No validator found for schema: ${schemaName}` }] };
  }

  const valid = validator(data);
  return {
    valid,
    errors: valid ? undefined : validator.errors || []
  };
};

export { validators };