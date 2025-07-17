🔍 Generating comprehensive endpoint list...

📊 Testing dataset: sample
📊 Testing dataset: sample-en
📊 Testing dataset: vera3-math
📊 Testing dataset: jena-response
📊 Testing dataset: kompetenztest
📊 Testing dataset: zepf-assessment

📝 Generated Markdown Report:

# API Endpoint Test Results

This section contains all tested endpoints with their current status.

## Summary

- **Total Endpoints Tested**: 112
- **Successful**: 112 (100%)
- **Failed**: 0 (0%)

## Tested Endpoints by Dataset

### sample Dataset
**Status**: 40/40 endpoints working (100%)

#### Course Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/1-course-math-8a/statistics?dataset=sample&metric=competence-levels&groupBy=students` | ✅ 200 | Course competence levels grouped by students |
| GET | `http://localhost:3000/courses/1-course-math-8a/statistics?dataset=sample&metric=competence-levels&groupBy=competences` | ✅ 200 | Course competence levels grouped by competences |
| GET | `http://localhost:3000/courses/1-course-math-8a/statistics?dataset=sample&metric=competence-levels&groupBy=tasks` | ✅ 200 | Course competence levels grouped by tasks |
| GET | `http://localhost:3000/courses/1-course-math-8a/statistics?dataset=sample&metric=solution-frequencies` | ✅ 200 | Course solution frequencies |
| GET | `http://localhost:3000/courses/1-course-math-8a/statistics?dataset=sample&metric=task-performance` | ✅ 200 | Course task performance |
| GET | `http://localhost:3000/courses/1-course-math-8b/statistics?dataset=sample&metric=competence-levels&groupBy=students` | ✅ 200 | Course competence levels grouped by students |
| GET | `http://localhost:3000/courses/1-course-math-8b/statistics?dataset=sample&metric=competence-levels&groupBy=competences` | ✅ 200 | Course competence levels grouped by competences |
| GET | `http://localhost:3000/courses/1-course-math-8b/statistics?dataset=sample&metric=competence-levels&groupBy=tasks` | ✅ 200 | Course competence levels grouped by tasks |
| GET | `http://localhost:3000/courses/1-course-math-8b/statistics?dataset=sample&metric=solution-frequencies` | ✅ 200 | Course solution frequencies |
| GET | `http://localhost:3000/courses/1-course-math-8b/statistics?dataset=sample&metric=task-performance` | ✅ 200 | Course task performance |
| GET | `http://localhost:3000/courses/1-course-german-8a/statistics?dataset=sample&metric=competence-levels&groupBy=students` | ✅ 200 | Course competence levels grouped by students |
| GET | `http://localhost:3000/courses/1-course-german-8a/statistics?dataset=sample&metric=competence-levels&groupBy=competences` | ✅ 200 | Course competence levels grouped by competences |
| GET | `http://localhost:3000/courses/1-course-german-8a/statistics?dataset=sample&metric=competence-levels&groupBy=tasks` | ✅ 200 | Course competence levels grouped by tasks |
| GET | `http://localhost:3000/courses/1-course-german-8a/statistics?dataset=sample&metric=solution-frequencies` | ✅ 200 | Course solution frequencies |
| GET | `http://localhost:3000/courses/1-course-german-8a/statistics?dataset=sample&metric=task-performance` | ✅ 200 | Course task performance |
| GET | `http://localhost:3000/courses/2-course-math-8a/statistics?dataset=sample&metric=competence-levels&groupBy=students` | ✅ 200 | Course competence levels grouped by students |
| GET | `http://localhost:3000/courses/2-course-math-8a/statistics?dataset=sample&metric=competence-levels&groupBy=competences` | ✅ 200 | Course competence levels grouped by competences |
| GET | `http://localhost:3000/courses/2-course-math-8a/statistics?dataset=sample&metric=competence-levels&groupBy=tasks` | ✅ 200 | Course competence levels grouped by tasks |
| GET | `http://localhost:3000/courses/2-course-math-8a/statistics?dataset=sample&metric=solution-frequencies` | ✅ 200 | Course solution frequencies |
| GET | `http://localhost:3000/courses/2-course-math-8a/statistics?dataset=sample&metric=task-performance` | ✅ 200 | Course task performance |

#### Course Student Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/1-course-math-8a/students?dataset=sample&metric=competence-levels` | ✅ 200 | Course student competence levels |
| GET | `http://localhost:3000/courses/1-course-math-8a/students?dataset=sample&metric=solution-frequencies` | ✅ 200 | Course student solution frequencies |
| GET | `http://localhost:3000/courses/1-course-math-8a/students?dataset=sample&metric=task-performance` | ✅ 200 | Course student task performance |
| GET | `http://localhost:3000/courses/1-course-math-8b/students?dataset=sample&metric=competence-levels` | ✅ 200 | Course student competence levels |
| GET | `http://localhost:3000/courses/1-course-math-8b/students?dataset=sample&metric=solution-frequencies` | ✅ 200 | Course student solution frequencies |
| GET | `http://localhost:3000/courses/1-course-math-8b/students?dataset=sample&metric=task-performance` | ✅ 200 | Course student task performance |
| GET | `http://localhost:3000/courses/1-course-german-8a/students?dataset=sample&metric=competence-levels` | ✅ 200 | Course student competence levels |
| GET | `http://localhost:3000/courses/1-course-german-8a/students?dataset=sample&metric=solution-frequencies` | ✅ 200 | Course student solution frequencies |
| GET | `http://localhost:3000/courses/1-course-german-8a/students?dataset=sample&metric=task-performance` | ✅ 200 | Course student task performance |
| GET | `http://localhost:3000/courses/2-course-math-8a/students?dataset=sample&metric=competence-levels` | ✅ 200 | Course student competence levels |
| GET | `http://localhost:3000/courses/2-course-math-8a/students?dataset=sample&metric=solution-frequencies` | ✅ 200 | Course student solution frequencies |
| GET | `http://localhost:3000/courses/2-course-math-8a/students?dataset=sample&metric=task-performance` | ✅ 200 | Course student task performance |

#### School Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-1/runs/run-2024-spring/statistics?dataset=sample&metric=competence-levels&includeComparison=false` | ✅ 200 | School run competence levels |
| GET | `http://localhost:3000/schools/school-1/runs/run-2024-spring/statistics?dataset=sample&metric=competence-levels&includeComparison=true` | ✅ 200 | School run competence levels with comparison |
| GET | `http://localhost:3000/schools/school-1/runs/run-2024-spring/statistics?dataset=sample&metric=course-comparison&includeComparison=false` | ✅ 200 | School run course comparison |
| GET | `http://localhost:3000/schools/school-2/runs/run-2024-spring/statistics?dataset=sample&metric=competence-levels&includeComparison=false` | ✅ 200 | School run competence levels |
| GET | `http://localhost:3000/schools/school-2/runs/run-2024-spring/statistics?dataset=sample&metric=competence-levels&includeComparison=true` | ✅ 200 | School run competence levels with comparison |
| GET | `http://localhost:3000/schools/school-2/runs/run-2024-spring/statistics?dataset=sample&metric=course-comparison&includeComparison=false` | ✅ 200 | School run course comparison |

#### School Course Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-1/runs/run-2024-spring/courses?dataset=sample&metric=competence-levels` | ✅ 200 | School run courses |
| GET | `http://localhost:3000/schools/school-2/runs/run-2024-spring/courses?dataset=sample&metric=competence-levels` | ✅ 200 | School run courses |

### sample-en Dataset
**Status**: 16/16 endpoints working (100%)

#### Course Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/1-course-math-8a/statistics?dataset=sample-en&metric=competence-levels&groupBy=students` | ✅ 200 | Course competence levels grouped by students |
| GET | `http://localhost:3000/courses/1-course-math-8a/statistics?dataset=sample-en&metric=competence-levels&groupBy=competences` | ✅ 200 | Course competence levels grouped by competences |
| GET | `http://localhost:3000/courses/1-course-math-8a/statistics?dataset=sample-en&metric=competence-levels&groupBy=tasks` | ✅ 200 | Course competence levels grouped by tasks |
| GET | `http://localhost:3000/courses/1-course-math-8a/statistics?dataset=sample-en&metric=solution-frequencies` | ✅ 200 | Course solution frequencies |
| GET | `http://localhost:3000/courses/1-course-math-8a/statistics?dataset=sample-en&metric=task-performance` | ✅ 200 | Course task performance |

#### Course Student Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/1-course-math-8a/students?dataset=sample-en&metric=competence-levels` | ✅ 200 | Course student competence levels |
| GET | `http://localhost:3000/courses/1-course-math-8a/students?dataset=sample-en&metric=solution-frequencies` | ✅ 200 | Course student solution frequencies |
| GET | `http://localhost:3000/courses/1-course-math-8a/students?dataset=sample-en&metric=task-performance` | ✅ 200 | Course student task performance |

#### School Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-1/runs/run-2024-spring/statistics?dataset=sample-en&metric=competence-levels&includeComparison=false` | ✅ 200 | School run competence levels |
| GET | `http://localhost:3000/schools/school-1/runs/run-2024-spring/statistics?dataset=sample-en&metric=competence-levels&includeComparison=true` | ✅ 200 | School run competence levels with comparison |
| GET | `http://localhost:3000/schools/school-1/runs/run-2024-spring/statistics?dataset=sample-en&metric=course-comparison&includeComparison=false` | ✅ 200 | School run course comparison |
| GET | `http://localhost:3000/schools/school-2/runs/run-2024-spring/statistics?dataset=sample-en&metric=competence-levels&includeComparison=false` | ✅ 200 | School run competence levels |
| GET | `http://localhost:3000/schools/school-2/runs/run-2024-spring/statistics?dataset=sample-en&metric=competence-levels&includeComparison=true` | ✅ 200 | School run competence levels with comparison |
| GET | `http://localhost:3000/schools/school-2/runs/run-2024-spring/statistics?dataset=sample-en&metric=course-comparison&includeComparison=false` | ✅ 200 | School run course comparison |

#### School Course Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-1/runs/run-2024-spring/courses?dataset=sample-en&metric=competence-levels` | ✅ 200 | School run courses |
| GET | `http://localhost:3000/schools/school-2/runs/run-2024-spring/courses?dataset=sample-en&metric=competence-levels` | ✅ 200 | School run courses |

### vera3-math Dataset
**Status**: 12/12 endpoints working (100%)

#### Course Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/course-math-3b/statistics?dataset=vera3-math&metric=competence-levels&groupBy=students` | ✅ 200 | Course competence levels grouped by students |
| GET | `http://localhost:3000/courses/course-math-3b/statistics?dataset=vera3-math&metric=competence-levels&groupBy=competences` | ✅ 200 | Course competence levels grouped by competences |
| GET | `http://localhost:3000/courses/course-math-3b/statistics?dataset=vera3-math&metric=competence-levels&groupBy=tasks` | ✅ 200 | Course competence levels grouped by tasks |
| GET | `http://localhost:3000/courses/course-math-3b/statistics?dataset=vera3-math&metric=solution-frequencies` | ✅ 200 | Course solution frequencies |
| GET | `http://localhost:3000/courses/course-math-3b/statistics?dataset=vera3-math&metric=task-performance` | ✅ 200 | Course task performance |

#### Course Student Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/course-math-3b/students?dataset=vera3-math&metric=competence-levels` | ✅ 200 | Course student competence levels |
| GET | `http://localhost:3000/courses/course-math-3b/students?dataset=vera3-math&metric=solution-frequencies` | ✅ 200 | Course student solution frequencies |
| GET | `http://localhost:3000/courses/course-math-3b/students?dataset=vera3-math&metric=task-performance` | ✅ 200 | Course student task performance |

#### School Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-000031/runs/vera3-spring-2024/statistics?dataset=vera3-math&metric=competence-levels&includeComparison=false` | ✅ 200 | School run competence levels |
| GET | `http://localhost:3000/schools/school-000031/runs/vera3-spring-2024/statistics?dataset=vera3-math&metric=competence-levels&includeComparison=true` | ✅ 200 | School run competence levels with comparison |
| GET | `http://localhost:3000/schools/school-000031/runs/vera3-spring-2024/statistics?dataset=vera3-math&metric=course-comparison&includeComparison=false` | ✅ 200 | School run course comparison |

#### School Course Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-000031/runs/vera3-spring-2024/courses?dataset=vera3-math&metric=competence-levels` | ✅ 200 | School run courses |

### jena-response Dataset
**Status**: 12/12 endpoints working (100%)

#### Course Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/course-reading-8a/statistics?dataset=jena-response&metric=competence-levels&groupBy=students` | ✅ 200 | Course competence levels grouped by students |
| GET | `http://localhost:3000/courses/course-reading-8a/statistics?dataset=jena-response&metric=competence-levels&groupBy=competences` | ✅ 200 | Course competence levels grouped by competences |
| GET | `http://localhost:3000/courses/course-reading-8a/statistics?dataset=jena-response&metric=competence-levels&groupBy=tasks` | ✅ 200 | Course competence levels grouped by tasks |
| GET | `http://localhost:3000/courses/course-reading-8a/statistics?dataset=jena-response&metric=solution-frequencies` | ✅ 200 | Course solution frequencies |
| GET | `http://localhost:3000/courses/course-reading-8a/statistics?dataset=jena-response&metric=task-performance` | ✅ 200 | Course task performance |

#### Course Student Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/course-reading-8a/students?dataset=jena-response&metric=competence-levels` | ✅ 200 | Course student competence levels |
| GET | `http://localhost:3000/courses/course-reading-8a/students?dataset=jena-response&metric=solution-frequencies` | ✅ 200 | Course student solution frequencies |
| GET | `http://localhost:3000/courses/course-reading-8a/students?dataset=jena-response&metric=task-performance` | ✅ 200 | Course student task performance |

#### School Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-00X30/runs/digital-reading-2024/statistics?dataset=jena-response&metric=competence-levels&includeComparison=false` | ✅ 200 | School run competence levels |
| GET | `http://localhost:3000/schools/school-00X30/runs/digital-reading-2024/statistics?dataset=jena-response&metric=competence-levels&includeComparison=true` | ✅ 200 | School run competence levels with comparison |
| GET | `http://localhost:3000/schools/school-00X30/runs/digital-reading-2024/statistics?dataset=jena-response&metric=course-comparison&includeComparison=false` | ✅ 200 | School run course comparison |

#### School Course Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-00X30/runs/digital-reading-2024/courses?dataset=jena-response&metric=competence-levels` | ✅ 200 | School run courses |

### kompetenztest Dataset
**Status**: 20/20 endpoints working (100%)

#### Course Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/course-math-8/statistics?dataset=kompetenztest&metric=competence-levels&groupBy=students` | ✅ 200 | Course competence levels grouped by students |
| GET | `http://localhost:3000/courses/course-math-8/statistics?dataset=kompetenztest&metric=competence-levels&groupBy=competences` | ✅ 200 | Course competence levels grouped by competences |
| GET | `http://localhost:3000/courses/course-math-8/statistics?dataset=kompetenztest&metric=competence-levels&groupBy=tasks` | ✅ 200 | Course competence levels grouped by tasks |
| GET | `http://localhost:3000/courses/course-math-8/statistics?dataset=kompetenztest&metric=solution-frequencies` | ✅ 200 | Course solution frequencies |
| GET | `http://localhost:3000/courses/course-math-8/statistics?dataset=kompetenztest&metric=task-performance` | ✅ 200 | Course task performance |
| GET | `http://localhost:3000/courses/course-german-8/statistics?dataset=kompetenztest&metric=competence-levels&groupBy=students` | ✅ 200 | Course competence levels grouped by students |
| GET | `http://localhost:3000/courses/course-german-8/statistics?dataset=kompetenztest&metric=competence-levels&groupBy=competences` | ✅ 200 | Course competence levels grouped by competences |
| GET | `http://localhost:3000/courses/course-german-8/statistics?dataset=kompetenztest&metric=competence-levels&groupBy=tasks` | ✅ 200 | Course competence levels grouped by tasks |
| GET | `http://localhost:3000/courses/course-german-8/statistics?dataset=kompetenztest&metric=solution-frequencies` | ✅ 200 | Course solution frequencies |
| GET | `http://localhost:3000/courses/course-german-8/statistics?dataset=kompetenztest&metric=task-performance` | ✅ 200 | Course task performance |

#### Course Student Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/course-math-8/students?dataset=kompetenztest&metric=competence-levels` | ✅ 200 | Course student competence levels |
| GET | `http://localhost:3000/courses/course-math-8/students?dataset=kompetenztest&metric=solution-frequencies` | ✅ 200 | Course student solution frequencies |
| GET | `http://localhost:3000/courses/course-math-8/students?dataset=kompetenztest&metric=task-performance` | ✅ 200 | Course student task performance |
| GET | `http://localhost:3000/courses/course-german-8/students?dataset=kompetenztest&metric=competence-levels` | ✅ 200 | Course student competence levels |
| GET | `http://localhost:3000/courses/course-german-8/students?dataset=kompetenztest&metric=solution-frequencies` | ✅ 200 | Course student solution frequencies |
| GET | `http://localhost:3000/courses/course-german-8/students?dataset=kompetenztest&metric=task-performance` | ✅ 200 | Course student task performance |

#### School Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-brandenburg-1/runs/kompetenztest-2024/statistics?dataset=kompetenztest&metric=competence-levels&includeComparison=false` | ✅ 200 | School run competence levels |
| GET | `http://localhost:3000/schools/school-brandenburg-1/runs/kompetenztest-2024/statistics?dataset=kompetenztest&metric=competence-levels&includeComparison=true` | ✅ 200 | School run competence levels with comparison |
| GET | `http://localhost:3000/schools/school-brandenburg-1/runs/kompetenztest-2024/statistics?dataset=kompetenztest&metric=course-comparison&includeComparison=false` | ✅ 200 | School run course comparison |

#### School Course Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-brandenburg-1/runs/kompetenztest-2024/courses?dataset=kompetenztest&metric=competence-levels` | ✅ 200 | School run courses |

### zepf-assessment Dataset
**Status**: 12/12 endpoints working (100%)

#### Course Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/course-zepf-math-3/statistics?dataset=zepf-assessment&metric=competence-levels&groupBy=students` | ✅ 200 | Course competence levels grouped by students |
| GET | `http://localhost:3000/courses/course-zepf-math-3/statistics?dataset=zepf-assessment&metric=competence-levels&groupBy=competences` | ✅ 200 | Course competence levels grouped by competences |
| GET | `http://localhost:3000/courses/course-zepf-math-3/statistics?dataset=zepf-assessment&metric=competence-levels&groupBy=tasks` | ✅ 200 | Course competence levels grouped by tasks |
| GET | `http://localhost:3000/courses/course-zepf-math-3/statistics?dataset=zepf-assessment&metric=solution-frequencies` | ✅ 200 | Course solution frequencies |
| GET | `http://localhost:3000/courses/course-zepf-math-3/statistics?dataset=zepf-assessment&metric=task-performance` | ✅ 200 | Course task performance |

#### Course Student Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/courses/course-zepf-math-3/students?dataset=zepf-assessment&metric=competence-levels` | ✅ 200 | Course student competence levels |
| GET | `http://localhost:3000/courses/course-zepf-math-3/students?dataset=zepf-assessment&metric=solution-frequencies` | ✅ 200 | Course student solution frequencies |
| GET | `http://localhost:3000/courses/course-zepf-math-3/students?dataset=zepf-assessment&metric=task-performance` | ✅ 200 | Course student task performance |

#### School Statistics Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-zepf-1/runs/zepf-vera-2024/statistics?dataset=zepf-assessment&metric=competence-levels&includeComparison=false` | ✅ 200 | School run competence levels |
| GET | `http://localhost:3000/schools/school-zepf-1/runs/zepf-vera-2024/statistics?dataset=zepf-assessment&metric=competence-levels&includeComparison=true` | ✅ 200 | School run competence levels with comparison |
| GET | `http://localhost:3000/schools/school-zepf-1/runs/zepf-vera-2024/statistics?dataset=zepf-assessment&metric=course-comparison&includeComparison=false` | ✅ 200 | School run course comparison |

#### School Course Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `http://localhost:3000/schools/school-zepf-1/runs/zepf-vera-2024/courses?dataset=zepf-assessment&metric=competence-levels` | ✅ 200 | School run courses |

