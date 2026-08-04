/*
  Source: San José State University's official De Anza articulation page
  https://info.sjsu.edu/web-dbgen/artic/DEANZA/course-to-course.html
  Pulled July 2026. Articulation agreements change year to year —
  always double-check on assist.org or with a counselor before you register.
*/

const REQUIREMENTS = [
  {
    category: "Programming Core",
    courses: [
      {
        sjsu: "CS 46A – Intro to Programming",
        deanza: "CIS 35A (Java) or the C++ sequence — check with a counselor, must be completed at De Anza",
        satisfied: false,
      },
      {
        sjsu: "CS 46B – Intro to Data Structures",
        deanza: "CIS 22C (or CIS 22CH, honors)",
        satisfied: false,
      },
      {
        sjsu: "CS 47 – Intro to Computer Systems",
        deanza: "CIS 21JA",
        satisfied: false,
      },
      {
        sjsu: "CS 49C – Programming in C",
        deanza: "CIS 26A, or the C++ sequence",
        satisfied: false,
      },
      {
        sjsu: "CS 49J – Programming in Java",
        deanza: "CIS 35A",
        satisfied: false,
      },
    ],
  },
  {
    category: "Python Track",
    courses: [
      {
        sjsu: "CS 22A – Python for Everyone",
        deanza: "CIS 40 or CIS 41A",
        satisfied: false,
      },
      {
        sjsu: "CS 22B – Python Programming for Data Analysis",
        deanza: "CIS 41B",
        satisfied: false,
      },
    ],
  },
  {
    category: "Math Foundation",
    courses: [
      {
        sjsu: "MATH 30 – Calculus I",
        deanza: "MATH 1A (or MATH 1AH, honors)",
        satisfied: false,
      },
      {
        sjsu: "MATH 31 – Calculus II",
        deanza: "Calculus II/III sequence — must be completed at De Anza",
        satisfied: false,
      },
      {
        sjsu: "MATH 32 – Calculus III",
        deanza: "Calculus III/IV sequence — must be completed at De Anza",
        satisfied: false,
      },
      {
        sjsu: "MATH 39 – Linear Algebra I",
        deanza: "MATH 2B (or MATH 2BH, honors)",
        satisfied: false,
      },
      {
        sjsu: "MATH 42 – Discrete Mathematics",
        deanza: "MATH 22 (or MATH 22H, honors)",
        satisfied: false,
      },
    ],
  },
  {
    category: "Physics",
    courses: [
      {
        sjsu: "PHYS 50 – Mechanics",
        deanza: "PHYS 4A",
        satisfied: false,
      },
      {
        sjsu: "PHYS 51 – Electricity and Magnetism",
        deanza: "PHYS 4B",
        satisfied: false,
      },
      {
        sjsu: "PHYS 52 – Waves, Light, Heat",
        deanza: "PHYS 4C",
        satisfied: false,
      },
    ],
  },
];
