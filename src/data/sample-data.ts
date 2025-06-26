import { DemoDataSet } from '../types/demo-data';

export const sampleDataSet: DemoDataSet = {
  id: 'sample-dataset-1',
  name: 'Sample Educational Assessment Data',
  description: 'Sample data for demonstrating TBA3 API functionality',
  schools: [
    {
      id: 'school-1',
      name: 'Gymnasium Musterstadt',
      runs: [
        {
          id: 'run-2024-spring',
          name: 'Spring 2024 Assessment',
          start_date: '2024-03-01',
          end_date: '2024-03-15',
          course_ids: ['course-math-10a', 'course-math-10b', 'course-german-10a']
        }
      ]
    },
    {
      id: 'school-2',
      name: 'Realschule Beispielort',
      runs: [
        {
          id: 'run-2024-spring',
          name: 'Spring 2024 Assessment',
          start_date: '2024-03-01',
          end_date: '2024-03-15',
          course_ids: ['course-math-9a', 'course-german-9a']
        }
      ]
    }
  ],
  courses: [
    {
      id: 'course-math-10a',
      name: 'Mathematik 10a',
      school_id: 'school-1',
      competences: [
        {
          id: 'comp-algebra',
          name: 'Algebra',
          description: 'Algebraic problem solving',
          max_level: 5
        },
        {
          id: 'comp-geometry',
          name: 'Geometrie',
          description: 'Geometric reasoning and calculation',
          max_level: 5
        },
        {
          id: 'comp-analysis',
          name: 'Analysis',
          description: 'Functions and calculus basics',
          max_level: 5
        }
      ],
      tasks: [
        {
          id: 'task-algebra-1',
          name: 'Quadratische Gleichungen',
          competence_id: 'comp-algebra',
          max_points: 20,
          description: 'Solve quadratic equations'
        },
        {
          id: 'task-algebra-2',
          name: 'Lineare Funktionen',
          competence_id: 'comp-algebra',
          max_points: 15,
          description: 'Work with linear functions'
        },
        {
          id: 'task-geometry-1',
          name: 'Flächenberechnung',
          competence_id: 'comp-geometry',
          max_points: 18,
          description: 'Calculate areas of complex shapes'
        },
        {
          id: 'task-analysis-1',
          name: 'Funktionsanalyse',
          competence_id: 'comp-analysis',
          max_points: 25,
          description: 'Analyze function properties'
        }
      ],
      students: [
        {
          id: 'student-1',
          name: 'Anna M.',
          results: [
            {
              competence_id: 'comp-algebra',
              task_id: 'task-algebra-1',
              points_achieved: 18,
              points_possible: 20,
              level: 4,
              solution_approach: 'Faktorisierung'
            },
            {
              competence_id: 'comp-algebra',
              task_id: 'task-algebra-2',
              points_achieved: 14,
              points_possible: 15,
              level: 4,
              solution_approach: 'Graphische Methode'
            },
            {
              competence_id: 'comp-geometry',
              task_id: 'task-geometry-1',
              points_achieved: 16,
              points_possible: 18,
              level: 4,
              solution_approach: 'Zerlegung in Teilflächen'
            },
            {
              competence_id: 'comp-analysis',
              task_id: 'task-analysis-1',
              points_achieved: 20,
              points_possible: 25,
              level: 3,
              solution_approach: 'Ableitungsregeln'
            }
          ]
        },
        {
          id: 'student-2',
          name: 'Ben K.',
          results: [
            {
              competence_id: 'comp-algebra',
              task_id: 'task-algebra-1',
              points_achieved: 15,
              points_possible: 20,
              level: 3,
              solution_approach: 'Quadratische Formel'
            },
            {
              competence_id: 'comp-algebra',
              task_id: 'task-algebra-2',
              points_achieved: 12,
              points_possible: 15,
              level: 3,
              solution_approach: 'Algebraische Methode'
            },
            {
              competence_id: 'comp-geometry',
              task_id: 'task-geometry-1',
              points_achieved: 14,
              points_possible: 18,
              level: 3,
              solution_approach: 'Koordinatengeometrie'
            },
            {
              competence_id: 'comp-analysis',
              task_id: 'task-analysis-1',
              points_achieved: 18,
              points_possible: 25,
              level: 3,
              solution_approach: 'Grenzwertbetrachtung'
            }
          ]
        },
        {
          id: 'student-3',
          name: 'Clara S.',
          results: [
            {
              competence_id: 'comp-algebra',
              task_id: 'task-algebra-1',
              points_achieved: 19,
              points_possible: 20,
              level: 5,
              solution_approach: 'Faktorisierung'
            },
            {
              competence_id: 'comp-algebra',
              task_id: 'task-algebra-2',
              points_achieved: 15,
              points_possible: 15,
              level: 5,
              solution_approach: 'Graphische Methode'
            },
            {
              competence_id: 'comp-geometry',
              task_id: 'task-geometry-1',
              points_achieved: 18,
              points_possible: 18,
              level: 5,
              solution_approach: 'Integralrechnung'
            },
            {
              competence_id: 'comp-analysis',
              task_id: 'task-analysis-1',
              points_achieved: 23,
              points_possible: 25,
              level: 4,
              solution_approach: 'Differentialrechnung'
            }
          ]
        },
        {
          id: 'student-4',
          name: 'David L.',
          results: [
            {
              competence_id: 'comp-algebra',
              task_id: 'task-algebra-1',
              points_achieved: 12,
              points_possible: 20,
              level: 2,
              solution_approach: 'Probieren'
            },
            {
              competence_id: 'comp-algebra',
              task_id: 'task-algebra-2',
              points_achieved: 8,
              points_possible: 15,
              level: 2,
              solution_approach: 'Graphische Methode'
            },
            {
              competence_id: 'comp-geometry',
              task_id: 'task-geometry-1',
              points_achieved: 10,
              points_possible: 18,
              level: 2,
              solution_approach: 'Näherungsverfahren'
            },
            {
              competence_id: 'comp-analysis',
              task_id: 'task-analysis-1',
              points_achieved: 12,
              points_possible: 25,
              level: 2,
              solution_approach: 'Grundregeln'
            }
          ]
        }
      ]
    },
    {
      id: 'course-math-10b',
      name: 'Mathematik 10b',
      school_id: 'school-1',
      competences: [
        {
          id: 'comp-algebra',
          name: 'Algebra',
          description: 'Algebraic problem solving',
          max_level: 5
        },
        {
          id: 'comp-geometry',
          name: 'Geometrie',
          description: 'Geometric reasoning and calculation',
          max_level: 5
        }
      ],
      tasks: [
        {
          id: 'task-algebra-1',
          name: 'Quadratische Gleichungen',
          competence_id: 'comp-algebra',
          max_points: 20,
          description: 'Solve quadratic equations'
        },
        {
          id: 'task-geometry-1',
          name: 'Flächenberechnung',
          competence_id: 'comp-geometry',
          max_points: 18,
          description: 'Calculate areas of complex shapes'
        }
      ],
      students: [
        {
          id: 'student-5',
          name: 'Eva R.',
          results: [
            {
              competence_id: 'comp-algebra',
              task_id: 'task-algebra-1',
              points_achieved: 17,
              points_possible: 20,
              level: 4,
              solution_approach: 'Quadratische Formel'
            },
            {
              competence_id: 'comp-geometry',
              task_id: 'task-geometry-1',
              points_achieved: 15,
              points_possible: 18,
              level: 3,
              solution_approach: 'Zerlegung in Teilflächen'
            }
          ]
        },
        {
          id: 'student-6',
          name: 'Felix T.',
          results: [
            {
              competence_id: 'comp-algebra',
              task_id: 'task-algebra-1',
              points_achieved: 13,
              points_possible: 20,
              level: 3,
              solution_approach: 'Faktorisierung'
            },
            {
              competence_id: 'comp-geometry',
              task_id: 'task-geometry-1',
              points_achieved: 12,
              points_possible: 18,
              level: 2,
              solution_approach: 'Koordinatengeometrie'
            }
          ]
        }
      ]
    },
    {
      id: 'course-german-10a',
      name: 'Deutsch 10a',
      school_id: 'school-1',
      competences: [
        {
          id: 'comp-reading',
          name: 'Leseverstehen',
          description: 'Reading comprehension',
          max_level: 5
        },
        {
          id: 'comp-writing',
          name: 'Schreiben',
          description: 'Written expression',
          max_level: 5
        }
      ],
      tasks: [
        {
          id: 'task-reading-1',
          name: 'Textanalyse',
          competence_id: 'comp-reading',
          max_points: 30,
          description: 'Literary text analysis'
        },
        {
          id: 'task-writing-1',
          name: 'Erörterung',
          competence_id: 'comp-writing',
          max_points: 25,
          description: 'Argumentative essay'
        }
      ],
      students: [
        {
          id: 'student-7',
          name: 'Greta W.',
          results: [
            {
              competence_id: 'comp-reading',
              task_id: 'task-reading-1',
              points_achieved: 26,
              points_possible: 30,
              level: 4,
              solution_approach: 'Strukturierte Analyse'
            },
            {
              competence_id: 'comp-writing',
              task_id: 'task-writing-1',
              points_achieved: 22,
              points_possible: 25,
              level: 4,
              solution_approach: 'Argumentative Struktur'
            }
          ]
        }
      ]
    }
  ]
};

// VERA-3 Mathematics Demo Dataset based on ISQ data
export const vera3MathDataSet: DemoDataSet = {
  id: 'vera3-math-2024',
  name: 'VERA-3 Mathematics Assessment 2024',
  description: 'Real-world VERA-3 mathematics assessment data based on ISQ format',
  schools: [
    {
      id: 'school-000031',
      name: 'Grundschule Beispielstraße',
      runs: [
        {
          id: 'vera3-spring-2024',
          name: 'VERA-3 Frühjahr 2024',
          start_date: '2024-03-01',
          end_date: '2024-03-15',
          course_ids: ['course-math-3b']
        }
      ]
    }
  ],
  courses: [
    {
      id: 'course-math-3b',
      name: 'Mathematik 3b',
      school_id: 'school-000031',
      competences: [
        {
          id: 'comp-numbers-operations',
          name: 'Zahlen und Operationen',
          description: 'Zahlbegriff und Rechenoperationen',
          max_level: 5
        },
        {
          id: 'comp-space-form',
          name: 'Raum und Form',
          description: 'Geometrische Grundlagen',
          max_level: 5
        },
        {
          id: 'comp-data-chance',
          name: 'Daten und Zufall',
          description: 'Statistische Grundlagen',
          max_level: 5
        }
      ],
      tasks: [
        {
          id: 'MV2310001',
          name: 'Zahlenverständnis',
          competence_id: 'comp-numbers-operations',
          max_points: 1,
          description: 'Grundlegendes Zahlenverständnis'
        },
        {
          id: 'MV1508401',
          name: 'Addition',
          competence_id: 'comp-numbers-operations',
          max_points: 1,
          description: 'Additionsaufgaben'
        },
        {
          id: 'MV2162701',
          name: 'Geometrische Formen',
          competence_id: 'comp-space-form',
          max_points: 2,
          description: 'Erkennen geometrischer Formen'
        },
        {
          id: 'MV2325101',
          name: 'Datenanalyse',
          competence_id: 'comp-data-chance',
          max_points: 2,
          description: 'Einfache Dateninterpretation'
        }
      ],
      students: [
        {
          id: 'student-vera3-1',
          name: 'Schüler 1',
          results: [
            {
              competence_id: 'comp-numbers-operations',
              task_id: 'MV2310001',
              points_achieved: 1,
              points_possible: 1,
              level: 4,
              solution_approach: 'Systematisches Vorgehen'
            },
            {
              competence_id: 'comp-numbers-operations',
              task_id: 'MV1508401',
              points_achieved: 0,
              points_possible: 1,
              level: 2,
              solution_approach: 'Rechenfehler'
            },
            {
              competence_id: 'comp-space-form',
              task_id: 'MV2162701',
              points_achieved: 1,
              points_possible: 2,
              level: 3,
              solution_approach: 'Teilweise richtig'
            },
            {
              competence_id: 'comp-data-chance',
              task_id: 'MV2325101',
              points_achieved: 2,
              points_possible: 2,
              level: 5,
              solution_approach: 'Vollständig richtig'
            }
          ]
        },
        {
          id: 'student-vera3-2',
          name: 'Schüler 2',
          results: [
            {
              competence_id: 'comp-numbers-operations',
              task_id: 'MV2310001',
              points_achieved: 1,
              points_possible: 1,
              level: 4,
              solution_approach: 'Systematisches Vorgehen'
            },
            {
              competence_id: 'comp-numbers-operations',
              task_id: 'MV1508401',
              points_achieved: 1,
              points_possible: 1,
              level: 4,
              solution_approach: 'Korrekte Berechnung'
            },
            {
              competence_id: 'comp-space-form',
              task_id: 'MV2162701',
              points_achieved: 1,
              points_possible: 2,
              level: 3,
              solution_approach: 'Teilweise richtig'
            },
            {
              competence_id: 'comp-data-chance',
              task_id: 'MV2325101',
              points_achieved: 0,
              points_possible: 2,
              level: 1,
              solution_approach: 'Keine Bearbeitung'
            }
          ]
        }
      ]
    }
  ]
};

// Jena Response Format Demo Dataset
export const jenaResponseDataSet: DemoDataSet = {
  id: 'jena-response-2024',
  name: 'Jena Digital Reading Assessment 2024',
  description: 'Digital reading assessment data from Jena platform',
  schools: [
    {
      id: 'school-00X30',
      name: 'Testschule Digital',
      runs: [
        {
          id: 'digital-reading-2024',
          name: 'Digital Reading Test 2024',
          start_date: '2024-02-21',
          end_date: '2024-02-21',
          course_ids: ['course-reading-8a']
        }
      ]
    }
  ],
  courses: [
    {
      id: 'course-reading-8a',
      name: 'Digital Reading 8a',
      school_id: 'school-00X30',
      competences: [
        {
          id: 'comp-digital-reading',
          name: 'Digitales Lesen',
          description: 'Lesekompetenz in digitalen Medien',
          max_level: 5
        },
        {
          id: 'comp-text-comprehension',
          name: 'Textverständnis',
          description: 'Verstehen und Interpretieren von Texten',
          max_level: 5
        }
      ],
      tasks: [
        {
          id: 'iDO10001',
          name: 'Textverständnis 1',
          competence_id: 'comp-text-comprehension',
          max_points: 1,
          description: 'Grundlegendes Textverständnis'
        },
        {
          id: 'iDO12401',
          name: 'Informationsentnahme',
          competence_id: 'comp-digital-reading',
          max_points: 1,
          description: 'Informationen aus Text extrahieren'
        },
        {
          id: 'iDO13001',
          name: 'Textanalyse',
          competence_id: 'comp-text-comprehension',
          max_points: 1,
          description: 'Analyse von Textstrukturen'
        }
      ],
      students: [
        {
          id: 'student-jena-1',
          name: 'Digital Learner 1',
          results: [
            {
              competence_id: 'comp-text-comprehension',
              task_id: 'iDO10001',
              points_achieved: 1,
              points_possible: 1,
              level: 4,
              solution_approach: 'Digitale Navigation'
            },
            {
              competence_id: 'comp-digital-reading',
              task_id: 'iDO12401',
              points_achieved: 1,
              points_possible: 1,
              level: 4,
              solution_approach: 'Systematische Suche'
            },
            {
              competence_id: 'comp-text-comprehension',
              task_id: 'iDO13001',
              points_achieved: 1,
              points_possible: 1,
              level: 5,
              solution_approach: 'Strukturierte Analyse'
            }
          ]
        }
      ]
    }
  ]
};

// Kompetenztest Demo Dataset
export const kompetenztestDataSet: DemoDataSet = {
  id: 'kompetenztest-2024',
  name: 'Kompetenztest Brandenburg 2024',
  description: 'Kompetenztest data for Grade 8 Mathematics and German Reading',
  schools: [
    {
      id: 'school-brandenburg-1',
      name: 'Oberschule Brandenburg',
      runs: [
        {
          id: 'kompetenztest-2024',
          name: 'Kompetenztest 2024',
          start_date: '2024-05-01',
          end_date: '2024-05-15',
          course_ids: ['course-math-8', 'course-german-8']
        }
      ]
    }
  ],
  courses: [
    {
      id: 'course-math-8',
      name: 'Mathematik Klasse 8',
      school_id: 'school-brandenburg-1',
      competences: [
        {
          id: 'comp-kt-algebra',
          name: 'Algebra',
          description: 'Algebraische Strukturen und Operationen',
          max_level: 5
        },
        {
          id: 'comp-kt-functions',
          name: 'Funktionen',
          description: 'Funktionale Zusammenhänge',
          max_level: 5
        }
      ],
      tasks: [
        {
          id: 'kt-math-1',
          name: 'Gleichungen lösen',
          competence_id: 'comp-kt-algebra',
          max_points: 8,
          description: 'Lineare Gleichungen'
        },
        {
          id: 'kt-math-2',
          name: 'Funktionsgraphen',
          competence_id: 'comp-kt-functions',
          max_points: 6,
          description: 'Interpretieren von Graphen'
        }
      ],
      students: [
        {
          id: 'student-kt-1',
          name: 'Brandenburg Schüler 1',
          results: [
            {
              competence_id: 'comp-kt-algebra',
              task_id: 'kt-math-1',
              points_achieved: 6,
              points_possible: 8,
              level: 3,
              solution_approach: 'Äquivalenzumformung'
            },
            {
              competence_id: 'comp-kt-functions',
              task_id: 'kt-math-2',
              points_achieved: 4,
              points_possible: 6,
              level: 3,
              solution_approach: 'Graphische Interpretation'
            }
          ]
        }
      ]
    },
    {
      id: 'course-german-8',
      name: 'Deutsch Klasse 8',
      school_id: 'school-brandenburg-1',
      competences: [
        {
          id: 'comp-kt-reading',
          name: 'Leseverstehen',
          description: 'Verstehen und Interpretieren von literarischen und Sachtexten',
          max_level: 5
        }
      ],
      tasks: [
        {
          id: 'kt-german-1',
          name: 'Sachtextanalyse',
          competence_id: 'comp-kt-reading',
          max_points: 12,
          description: 'Analyse eines Sachtextes'
        }
      ],
      students: [
        {
          id: 'student-kt-2',
          name: 'Brandenburg Schüler 2',
          results: [
            {
              competence_id: 'comp-kt-reading',
              task_id: 'kt-german-1',
              points_achieved: 9,
              points_possible: 12,
              level: 4,
              solution_approach: 'Strukturierte Textanalyse'
            }
          ]
        }
      ]
    }
  ]
};

// ZEPF Demo Dataset
export const zepfDataSet: DemoDataSet = {
  id: 'zepf-assessment-2024',
  name: 'ZEPF Educational Assessment 2024',
  description: 'ZEPF-based assessment data with comprehensive feedback structure',
  schools: [
    {
      id: 'school-zepf-1',
      name: 'ZEPF Partnerschule',
      runs: [
        {
          id: 'zepf-vera-2024',
          name: 'ZEPF VERA Assessment 2024',
          start_date: '2024-04-01',
          end_date: '2024-04-30',
          course_ids: ['course-zepf-math-3', 'course-zepf-math-8']
        }
      ]
    }
  ],
  courses: [
    {
      id: 'course-zepf-math-3',
      name: 'ZEPF Mathematik Klasse 3',
      school_id: 'school-zepf-1',
      competences: [
        {
          id: 'comp-zepf-numbers',
          name: 'Zahlen und Operationen',
          description: 'Grundlagen der Arithmetik',
          max_level: 5
        },
        {
          id: 'comp-zepf-measurement',
          name: 'Größen und Messen',
          description: 'Umgang mit Maßeinheiten',
          max_level: 5
        }
      ],
      tasks: [
        {
          id: 'zepf-task-1',
          name: 'Grundrechenarten',
          competence_id: 'comp-zepf-numbers',
          max_points: 15,
          description: 'Addition und Subtraktion im Zahlenraum bis 1000'
        },
        {
          id: 'zepf-task-2',
          name: 'Längen messen',
          competence_id: 'comp-zepf-measurement',
          max_points: 10,
          description: 'Messen und Vergleichen von Längen'
        }
      ],
      students: [
        {
          id: 'student-zepf-1',
          name: 'ZEPF Schüler 1',
          results: [
            {
              competence_id: 'comp-zepf-numbers',
              task_id: 'zepf-task-1',
              points_achieved: 12,
              points_possible: 15,
              level: 4,
              solution_approach: 'Stellenwertverständnis'
            },
            {
              competence_id: 'comp-zepf-measurement',
              task_id: 'zepf-task-2',
              points_achieved: 8,
              points_possible: 10,
              level: 3,
              solution_approach: 'Praktisches Messen'
            }
          ]
        }
      ]
    }
  ]
};

export const dataSets: { [key: string]: DemoDataSet } = {
  'sample': sampleDataSet,
  'vera3-math': vera3MathDataSet,
  'jena-response': jenaResponseDataSet,
  'kompetenztest': kompetenztestDataSet,
  'zepf-assessment': zepfDataSet
};