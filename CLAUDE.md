# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Run
- `npm run build` - Compile TypeScript to JavaScript in `dist/` directory
- `npm run dev` - Run development server with hot reload using nodemon and ts-node
- `npm start` - Run production server from compiled JavaScript
- `npm run clean` - Remove the `dist/` directory

### Testing
- `npm test` - Currently returns success (no tests implemented yet)

## Project Architecture

This is a TypeScript-based Express.js API server that provides educational assessment data in TBA3 format. The application transforms various demo datasets into a standardized API format for educational institutions.

### Core Architecture Components

**Entry Points:**
- `src/server.ts` - Server startup with graceful shutdown handling
- `src/app.ts` - Express application setup with middleware configuration

**Data Layer:**
- `src/data/sample-data.ts` - Contains multiple demo datasets (VERA-3, Jena Digital Reading, Kompetenztest, ZEPF, etc.)
- `src/transformers/data-transformer.ts` - Transforms demo data into TBA3 API format
- `src/types/demo-data.ts` - TypeScript definitions for internal demo data structures
- `src/types/api.ts` - TypeScript definitions for TBA3 API response formats

**API Routes:**
- `src/routes/datasets.ts` - Dataset listing and details endpoints
- `src/routes/courses.ts` - Course statistics and student performance endpoints  
- `src/routes/schools.ts` - School-level statistics and comparisons

### Key Features

**Multi-Dataset Support:**
The application serves 5 different educational assessment datasets:
- `sample` - Basic demonstration data
- `vera3-math` - VERA-3 Mathematics (Grade 3)
- `jena-response` - Digital reading assessments
- `kompetenztest` - Brandenburg state competency tests
- `zepf-assessment` - ZEPF educational assessments

**API Compliance:**
- Implements TBA3 API specification (`tba3_api_spec.yml`)
- Provides OpenAPI spec at `/api-spec` endpoint
- Full CORS and security middleware (helmet, morgan logging)

**Data Transformation Pipeline:**
The `DataTransformer` class converts internal demo data structures into standardized TBA3 API responses, supporting various metrics (competence_levels, solution_frequencies, task_performance) and grouping options.

### TypeScript Configuration

- Target: ES2020 with CommonJS modules
- Strict mode enabled with source maps and declarations
- Output directory: `dist/`

### Environment Variables

- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: localhost)  
- `NODE_ENV` - Environment mode
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)

### Error Handling

The application includes comprehensive error handling:
- Global error middleware with development/production message filtering
- 404 handler with available endpoint listing
- Try-catch blocks in route handlers with appropriate HTTP status codes

### Data Structure

Demo datasets follow a consistent schema with schools, runs, courses, competences, tasks, and student results. The transformer converts this into the TBA3 format with statistics aggregation and comparison capabilities.