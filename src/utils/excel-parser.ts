import * as XLSX from 'xlsx';
import { DemoStudent, DemoStudentResult } from '../types/demo-data';

interface ExcelStudentData {
  student_id: string;
  task_scores: { [taskId: string]: number };
  competence_levels: { [competenceId: string]: number };
}

export function parseKompetenztestExcel(filePath: string, subject: 'math' | 'german'): DemoStudent[] {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const students: DemoStudent[] = [];

    // Map the Excel data structure based on subject
    if (subject === 'math') {
      return parseMathExcel(data);
    } else {
      return parseGermanExcel(data);
    }
  } catch (error) {
    console.warn(`Could not parse Excel file ${filePath}:`, error);
    return generateSyntheticKompetenztestData(subject);
  }
}

function parseMathExcel(data: any[]): DemoStudent[] {
  // This would parse the actual Excel structure
  // For now, return enhanced synthetic data based on typical Kompetenztest structure
  return generateSyntheticKompetenztestData('math');
}

function parseGermanExcel(data: any[]): DemoStudent[] {
  // This would parse the actual Excel structure
  // For now, return enhanced synthetic data based on typical Kompetenztest structure
  return generateSyntheticKompetenztestData('german');
}

function generateSyntheticKompetenztestData(subject: 'math' | 'german'): DemoStudent[] {
  if (subject === 'math') {
    return [
      {
        id: 'student-kt-math-1',
        name: 'Brandenburg Schüler 1',
        results: [
          {
            competence_id: 'comp-kt-algebra',
            task_id: 'kt-math-algebra-1',
            points_achieved: 6,
            points_possible: 8,
            level: 3,
            solution_approach: 'Äquivalenzumformung mit kleineren Fehlern'
          },
          {
            competence_id: 'comp-kt-algebra',
            task_id: 'kt-math-algebra-2',
            points_achieved: 4,
            points_possible: 6,
            level: 3,
            solution_approach: 'Systematisches Vorgehen bei Gleichungssystemen'
          },
          {
            competence_id: 'comp-kt-functions',
            task_id: 'kt-math-functions-1',
            points_achieved: 4,
            points_possible: 6,
            level: 3,
            solution_approach: 'Graphische Interpretation mit Unsicherheiten'
          },
          {
            competence_id: 'comp-kt-functions',
            task_id: 'kt-math-functions-2',
            points_achieved: 3,
            points_possible: 5,
            level: 2,
            solution_approach: 'Schwierigkeiten bei komplexen Funktionen'
          }
        ]
      },
      {
        id: 'student-kt-math-2',
        name: 'Brandenburg Schüler 2',
        results: [
          {
            competence_id: 'comp-kt-algebra',
            task_id: 'kt-math-algebra-1',
            points_achieved: 7,
            points_possible: 8,
            level: 4,
            solution_approach: 'Sichere Beherrschung algebraischer Verfahren'
          },
          {
            competence_id: 'comp-kt-algebra',
            task_id: 'kt-math-algebra-2',
            points_achieved: 5,
            points_possible: 6,
            level: 4,
            solution_approach: 'Effiziente Lösung von Gleichungssystemen'
          },
          {
            competence_id: 'comp-kt-functions',
            task_id: 'kt-math-functions-1',
            points_achieved: 5,
            points_possible: 6,
            level: 4,
            solution_approach: 'Gute graphische Darstellung und Analyse'
          },
          {
            competence_id: 'comp-kt-functions',
            task_id: 'kt-math-functions-2',
            points_achieved: 4,
            points_possible: 5,
            level: 4,
            solution_approach: 'Solide Funktionsanalyse'
          }
        ]
      },
      {
        id: 'student-kt-math-3',
        name: 'Brandenburg Schüler 3',
        results: [
          {
            competence_id: 'comp-kt-algebra',
            task_id: 'kt-math-algebra-1',
            points_achieved: 3,
            points_possible: 8,
            level: 2,
            solution_approach: 'Grundfertigkeiten vorhanden, aber unsicher'
          },
          {
            competence_id: 'comp-kt-algebra',
            task_id: 'kt-math-algebra-2',
            points_achieved: 2,
            points_possible: 6,
            level: 1,
            solution_approach: 'Erhebliche Schwierigkeiten'
          },
          {
            competence_id: 'comp-kt-functions',
            task_id: 'kt-math-functions-1',
            points_achieved: 2,
            points_possible: 6,
            level: 2,
            solution_approach: 'Grundverständnis entwicklungsbedürftig'
          },
          {
            competence_id: 'comp-kt-functions',
            task_id: 'kt-math-functions-2',
            points_achieved: 1,
            points_possible: 5,
            level: 1,
            solution_approach: 'Benötigt intensive Förderung'
          }
        ]
      }
    ];
  } else {
    return [
      {
        id: 'student-kt-german-1',
        name: 'Brandenburg Schüler 1',
        results: [
          {
            competence_id: 'comp-kt-reading',
            task_id: 'kt-german-sachtextanalyse',
            points_achieved: 9,
            points_possible: 12,
            level: 4,
            solution_approach: 'Strukturierte Analyse mit guter Textverständnis'
          },
          {
            competence_id: 'comp-kt-reading',
            task_id: 'kt-german-literarisch',
            points_achieved: 7,
            points_possible: 10,
            level: 3,
            solution_approach: 'Solides Verstehen literarischer Texte'
          },
          {
            competence_id: 'comp-kt-reading',
            task_id: 'kt-german-interpretation',
            points_achieved: 5,
            points_possible: 8,
            level: 3,
            solution_approach: 'Grundlegende Interpretationsfähigkeiten'
          }
        ]
      },
      {
        id: 'student-kt-german-2',
        name: 'Brandenburg Schüler 2',
        results: [
          {
            competence_id: 'comp-kt-reading',
            task_id: 'kt-german-sachtextanalyse',
            points_achieved: 11,
            points_possible: 12,
            level: 5,
            solution_approach: 'Exzellente analytische Fähigkeiten'
          },
          {
            competence_id: 'comp-kt-reading',
            task_id: 'kt-german-literarisch',
            points_achieved: 8,
            points_possible: 10,
            level: 4,
            solution_approach: 'Sicheres Verständnis literarischer Mittel'
          },
          {
            competence_id: 'comp-kt-reading',
            task_id: 'kt-german-interpretation',
            points_achieved: 7,
            points_possible: 8,
            level: 5,
            solution_approach: 'Differenzierte Textinterpretation'
          }
        ]
      },
      {
        id: 'student-kt-german-3',
        name: 'Brandenburg Schüler 3',
        results: [
          {
            competence_id: 'comp-kt-reading',
            task_id: 'kt-german-sachtextanalyse',
            points_achieved: 5,
            points_possible: 12,
            level: 2,
            solution_approach: 'Schwierigkeiten bei komplexeren Texten'
          },
          {
            competence_id: 'comp-kt-reading',
            task_id: 'kt-german-literarisch',
            points_achieved: 4,
            points_possible: 10,
            level: 2,
            solution_approach: 'Oberflächliches Textverständnis'
          },
          {
            competence_id: 'comp-kt-reading',
            task_id: 'kt-german-interpretation',
            points_achieved: 2,
            points_possible: 8,
            level: 1,
            solution_approach: 'Benötigt Unterstützung bei Interpretation'
          }
        ]
      }
    ];
  }
}