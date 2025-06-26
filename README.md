# TBA3 Demo API

A TypeScript-based API server that provides demo data transformed to match the TBA3 API specification for educational assessment data.

## Features

- **No Authentication Required**: Simplified API for demo purposes
- **Multiple Demo Datasets**: Support for different demo data sets
- **TBA3 API Compliance**: Implements the full TBA3 API specification
- **TypeScript**: Fully typed implementation
- **Flexible Data Transformation**: Transform your demo data into TBA3 format

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Core Endpoints

- `GET /` - API information and documentation
- `GET /health` - Health check
- `GET /api-spec` - OpenAPI specification (YAML)

### Dataset Management

- `GET /datasets` - List available datasets
- `GET /datasets/{datasetId}` - Get dataset details
- `POST /datasets/{datasetId}` - Create or update a dataset

### TBA3 API Endpoints

- `GET /courses/{courseId}/statistics` - Course statistics
- `GET /courses/{courseId}/students` - Student performances in a course
- `GET /schools/{schoolId}/runs/{runId}/statistics` - School run statistics

## Query Parameters

### Common Parameters

- `dataset` - Specify which dataset to use (default: `sample`)

### Course Statistics Parameters

- `metric` - Type of metric (`competence_levels`, `solution_frequencies`, `task_performance`)
- `group_by` - Grouping criterion (`students`, `competences`, `tasks`)
- `competence` - Filter by specific competence ID
- `task` - Filter by specific task ID

### School Statistics Parameters

- `metric` - Type of metric (`competence_levels`, `course_comparisons`)
- `compare_with_similar` - Include comparison with similar schools (`true`/`false`)

## Example Usage

### Get available datasets
```bash
curl http://localhost:3000/datasets
```

### Get course statistics
```bash
curl "http://localhost:3000/courses/course-math-10a/statistics?metric=competence_levels&dataset=sample"
```

### Get student performances
```bash
curl "http://localhost:3000/courses/course-math-10a/students?dataset=sample"
```

### Get school run statistics with comparison
```bash
curl "http://localhost:3000/schools/school-1/runs/run-2024-spring/statistics?metric=competence_levels&compare_with_similar=true&dataset=sample"
```

## Adding Your Own Data

To add your own demo dataset, you can either:

1. **Add to code**: Edit `src/data/sample-data.ts` and add your dataset to the `dataSets` object
2. **POST via API**: Send a POST request to `/datasets/{your-dataset-id}` with your data

### Data Format

Your dataset should follow this structure:

```typescript
{
  "name": "Your Dataset Name",
  "description": "Description of your dataset",
  "schools": [
    {
      "id": "school-1",
      "name": "School Name",
      "runs": [
        {
          "id": "run-1",
          "name": "Assessment Run",
          "start_date": "2024-01-01",
          "end_date": "2024-01-15",
          "course_ids": ["course-1"]
        }
      ]
    }
  ],
  "courses": [
    {
      "id": "course-1",
      "name": "Course Name",
      "school_id": "school-1",
      "competences": [...],
      "tasks": [...],
      "students": [...]
    }
  ]
}
```

## Project Structure

```
src/
├── types/           # TypeScript type definitions
├── data/            # Demo datasets
├── transformers/    # Data transformation logic
├── routes/          # Express route handlers
├── app.ts          # Express application setup
└── server.ts       # Server startup
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: localhost)
- `NODE_ENV` - Environment (development/production)
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)

## Development

The API includes comprehensive error handling, logging, and validation. All endpoints return appropriate HTTP status codes and error messages.

## API Specification

The complete OpenAPI specification is available at `/api-spec` when the server is running, or you can view the YAML file at `tba3_api_spec.yml` in the project root.