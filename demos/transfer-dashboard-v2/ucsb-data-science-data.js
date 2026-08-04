/*
  PLACEHOLDER — De Anza -> UCSB Data Science articulation.
  UCSB uses a "major preparation" pathway system rather than strict
  course-to-course articulation for every school. Check assist.org
  (De Anza -> UCSB -> Statistics & Data Science) for the current,
  official list before using this for real.
*/

const UCSB_REQUIREMENTS = [
  {
    category: "Programming",
    courses: [
      { ucsb: "CMPSC 8 – Intro to Computer Science I", deanza: "CIS 22A", satisfied: false },
      { ucsb: "CMPSC 16 – Problem Solving with Computers", deanza: "CIS 22B", satisfied: false },
    ],
  },
  {
    category: "Math Foundation",
    courses: [
      { ucsb: "MATH 3A – Calculus with Applications I", deanza: "MATH 1A", satisfied: false },
      { ucsb: "MATH 3B – Calculus with Applications II", deanza: "MATH 1B", satisfied: false },
      { ucsb: "MATH 4A – Linear Algebra w/ Applications", deanza: "MATH 2B", satisfied: false },
    ],
  },
  {
    category: "Statistics",
    courses: [
      { ucsb: "PSTAT 120A – Probability and Statistics", deanza: "MATH 10 (verify equivalence — not guaranteed)", satisfied: false },
    ],
  },
];
