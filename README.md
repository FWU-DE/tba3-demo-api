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

## Available Demo Datasets

The API includes several comprehensive demo datasets based on real educational assessment formats:

### 1. Sample Dataset (`sample`)
- **Description**: Basic sample data for API demonstration
- **Access**: `http://localhost:3000/datasets/sample`
- **Courses**: 
  - `course-math-10a` - Mathematik 10a (Algebra, Geometry, Analysis)
  - `course-math-10b` - Mathematik 10b (Algebra, Geometry)
  - `course-german-10a` - Deutsch 10a (Reading, Writing)

### 2. VERA-3 Mathematics (`vera3-math`)
- **Description**: VERA-3 Mathematics Assessment 2024 based on ISQ format
- **Access**: `http://localhost:3000/datasets/vera3-math`
- **School**: `school-000031` (Grundschule Beispielstraße)
- **Course**: `course-math-3b` - Mathematik 3b
- **Tasks**: Authentic VERA task IDs (MV2310001, MV1508401, MV2162701, MV2325101)
- **Competences**: Zahlen und Operationen, Raum und Form, Daten und Zufall

### 3. Jena Digital Reading (`jena-response`)
- **Description**: Digital reading assessment from Jena platform
- **Access**: `http://localhost:3000/datasets/jena-response`
- **School**: `school-00X30` (Testschule Digital)
- **Course**: `course-reading-8a` - Digital Reading 8a
- **Tasks**: Digital assessment IDs (iDO10001, iDO12401, iDO13001)
- **Competences**: Digitales Lesen, Textverständnis

### 4. Kompetenztest Brandenburg (`kompetenztest`)
- **Description**: Brandenburg state competency test for Grade 8
- **Access**: `http://localhost:3000/datasets/kompetenztest`
- **School**: `school-brandenburg-1` (Oberschule Brandenburg)
- **Courses**: 
  - `course-math-8` - Mathematik Klasse 8 (Algebra, Functions)
  - `course-german-8` - Deutsch Klasse 8 (Reading Comprehension)

### 5. ZEPF Assessment (`zepf-assessment`)
- **Description**: ZEPF educational assessment with comprehensive feedback
- **Access**: `http://localhost:3000/datasets/zepf-assessment`
- **School**: `school-zepf-1` (ZEPF Partnerschule)
- **Course**: `course-zepf-math-3` - ZEPF Mathematik Klasse 3
- **Competences**: Zahlen und Operationen, Größen und Messen

## Dataset-Specific Examples

### VERA-3 Mathematics Examples
```bash
# Get VERA-3 dataset details
curl http://localhost:3000/datasets/vera3-math

# Get course statistics for VERA-3 math
curl "http://localhost:3000/courses/course-math-3b/statistics?metric=competence_levels&dataset=vera3-math"

# Get student performances in VERA-3 math
curl "http://localhost:3000/courses/course-math-3b/students?dataset=vera3-math"
```

### Jena Digital Reading Examples
```bash
# Get Jena dataset details
curl http://localhost:3000/datasets/jena-response

# Get digital reading course statistics
curl "http://localhost:3000/courses/course-reading-8a/statistics?metric=task_performance&dataset=jena-response"
```

### Kompetenztest Examples
```bash
# Get Kompetenztest dataset details
curl http://localhost:3000/datasets/kompetenztest

# Get Grade 8 math statistics
curl "http://localhost:3000/courses/course-math-8/statistics?metric=competence_levels&dataset=kompetenztest"

# Get Grade 8 German reading statistics
curl "http://localhost:3000/courses/course-german-8/statistics?metric=solution_frequencies&dataset=kompetenztest"
```

### ZEPF Assessment Examples
```bash
# Get ZEPF dataset details
curl http://localhost:3000/datasets/zepf-assessment

# Get ZEPF math course statistics
curl "http://localhost:3000/courses/course-zepf-math-3/statistics?metric=competence_levels&dataset=zepf-assessment"
```

## Dataset Transformation Quality Analysis

The following table evaluates how well the original demo data was transformed into the TBA3 API format:

| Dataset | Source Format | Transformation Quality | Completeness | Authenticity | Issues/Gaps |
|---------|---------------|----------------------|--------------|--------------|-------------|
| **Sample** | Manual Creation | ⭐⭐⭐⭐⭐ Excellent | 100% | ⭐⭐⭐ Good | None - designed for API demonstration |
| **VERA-3 Math** | ISQ JSON | ⭐⭐⭐⭐ Very Good | 80% | ⭐⭐⭐⭐⭐ Excellent | Missing: full student roster, task metadata |
| **Jena Response** | JSON Platform Export | ⭐⭐⭐ Good | 60% | ⭐⭐⭐⭐ Very Good | Missing: complete competence mapping, more students |
| **Kompetenztest** | Excel Files (unread) | ⭐⭐ Fair | 40% | ⭐⭐⭐ Good | Missing: actual Excel parsing, real task data |
| **ZEPF Assessment** | PDF/ZIP Documentation | ⭐⭐ Fair | 50% | ⭐⭐⭐ Good | Missing: detailed task structures, assessment criteria |

### Detailed Analysis

#### ✅ **Successful Transformations**

**VERA-3 Mathematics (`vera3-math`)**
- ✅ Authentic task IDs preserved (MV2310001, MV1508401, etc.)
- ✅ Real competence structure from German education system
- ✅ Proper BISTA scoring integration
- ✅ Grade-appropriate content (Class 3)
- ⚠️ Limited to 2 students (original had 8 students)

**Jena Digital Reading (`jena-response`)**
- ✅ Platform-specific task IDs (iDO10001, iDO12401, etc.)
- ✅ Digital assessment context preserved
- ✅ Login/session metadata concepts included
- ⚠️ Only 1 student transformed (original had complete class data)

#### ⚠️ **Partial Transformations**

**Kompetenztest Brandenburg (`kompetenztest`)**
- ✅ Educational context and grade levels correct
- ✅ Subject structure (Math/German) preserved
- ❌ Excel files not parsed - used inferred structure
- ❌ Missing real task performance data
- 🔄 **Action Required**: Parse Excel files for authentic data

**ZEPF Assessment (`zepf-assessment`)**
- ✅ Assessment framework context preserved
- ✅ Multi-grade structure maintained
- ❌ PDF documentation not fully analyzed
- ❌ Missing detailed feedback structures
- 🔄 **Action Required**: Extract more detailed assessment criteria

#### 📊 **Data Coverage Summary**

| Metric | Sample | VERA-3 | Jena | Kompetenztest | ZEPF |
|--------|--------|--------|------|---------------|------|
| Schools | 2 | 1 | 1 | 1 | 1 |
| Courses | 3 | 1 | 1 | 2 | 1 |
| Students | 7 | 2 | 1 | 2 | 1 |
| Tasks | 8 | 4 | 3 | 2 | 2 |
| Competences | 6 | 3 | 2 | 3 | 2 |

### 🔧 **Improvement Roadmap**

#### High Priority
1. **Parse Excel Files**: Extract real Kompetenztest data from `deutsch3lesen.xlsx` and `mathe8.xlsx`
2. **Expand Jena Dataset**: Add more students and complete task coverage from JSON export
3. **VERA-3 Enhancement**: Include all 8 students from original ISQ data

#### Medium Priority
4. **ZEPF Documentation Analysis**: Extract detailed assessment criteria from PDF files
5. **Task Metadata**: Add more descriptive task information and scoring rubrics
6. **Competence Hierarchies**: Implement proper competence level progressions

#### Low Priority
7. **Multi-language Support**: Add English translations for international demos
8. **Historical Data**: Include time-series data for progress tracking
9. **Comparison Baselines**: Add state/national average comparison data

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