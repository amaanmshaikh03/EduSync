// EduSync — hardcoded prototype data. No backend; everything here is mock content.

import { AlertTriangle, TrendingUp, Target, Sparkles } from "lucide-react";

export const student = {
  name: "Amaan Shaikh",
  initials: "AS",
  term: "Summer 2026",
};

// Lower rank = needs more urgent attention. Used to sort cards/activities.
export const PRIORITY_RANK = { Urgent: 0, Moderate: 1, "On Track": 2, Excellent: 3 };

// Tailwind class tokens per priority, kept in one place so every component
// (badge, card stripe, session card, mini bars) stays visually consistent.
export const PRIORITY_STYLES = {
  Urgent: {
    text: "text-urgent-text",
    dot: "bg-urgent-dot",
    bg: "bg-urgent-bg",
    border: "border-urgent-border",
    stripe: "bg-urgent-dot",
  },
  Moderate: {
    text: "text-moderate-text",
    dot: "bg-moderate-dot",
    bg: "bg-moderate-bg",
    border: "border-moderate-border",
    stripe: "bg-moderate-dot",
  },
  "On Track": {
    text: "text-ontrack-text",
    dot: "bg-ontrack-dot",
    bg: "bg-ontrack-bg",
    border: "border-ontrack-border",
    stripe: "bg-ontrack-dot",
  },
  Excellent: {
    text: "text-excellent-text",
    dot: "bg-excellent-dot",
    bg: "bg-excellent-bg",
    border: "border-excellent-border",
    stripe: "bg-excellent-dot",
  },
};

// Icon shown alongside each priority badge/banner throughout the app.
export const PRIORITY_ICONS = {
  Urgent: AlertTriangle,
  Moderate: TrendingUp,
  "On Track": Target,
  Excellent: Sparkles,
};

export const initialCourses = [
  {
    id: "requirements-gathering",
    name: "Requirements Gathering",
    code: "SFWRTECH 3RQ3",
    priority: "Urgent",
    summary: "Two consecutive below-average results — this course needs focused attention this week.",
    performance: [
      { activity: "Assignment 1", grade: 58, level: "Below Average" },
      { activity: "Quiz 1", grade: 54, level: "Below Average" },
      { activity: "Midterm Exam", grade: 61, level: "Below Average" },
    ],
    recommendedSkills: [
      {
        name: "Requirements Elicitation",
        description: "Techniques for drawing out real needs from stakeholders through interviews, workshops, and observation.",
        references: [
          { type: "reading", label: "Lecture 3 Slides — Elicitation Techniques" },
          { type: "practice", label: "Worksheet: Stakeholder Interview Questions" },
        ],
      },
      {
        name: "Use Case Modeling",
        description: "Describing how users interact with a system to capture functional requirements clearly.",
        references: [
          { type: "reading", label: "Textbook Ch. 4 — Use Case Diagrams" },
          { type: "video", label: "Video Walkthrough: Actors & Use Cases" },
        ],
      },
      {
        name: "Stakeholder Analysis",
        description: "Identifying who is affected by a project and understanding their priorities and influence.",
        references: [
          { type: "reading", label: "Lecture 5 Notes — Power/Interest Grids" },
          { type: "practice", label: "Practice Set: Mapping Project Stakeholders" },
        ],
      },
      {
        name: "Non-Functional Requirement Classification",
        description: "Sorting requirements like performance, security, and usability apart from core features.",
        references: [
          { type: "reading", label: "Textbook Ch. 6 — Quality Attributes" },
          { type: "practice", label: "Worksheet: Sorting FR vs NFR Examples" },
        ],
      },
      {
        name: "Traceability Matrices",
        description: "Mapping requirements to design, code, and tests so nothing gets lost along the way.",
        references: [
          { type: "reading", label: "Lecture 7 Slides — Requirements Traceability" },
          { type: "video", label: "Video: Building a Traceability Matrix" },
        ],
      },
    ],
    upcomingActivities: [
      { name: "Milestone 2 Report", dueDate: "2026-08-05" },
      { name: "Peer Review Quiz", dueDate: "2026-08-07" },
    ],
    suggestedSession: { day: "Tue, Aug 4", time: "3:00 – 6:00 PM", focus: "Use Case Modeling" },
    alternateSlots: [
      { day: "Mon, Aug 3", time: "2:00 – 5:00 PM" },
      { day: "Wed, Aug 5", time: "5:00 – 8:00 PM" },
      { day: "Thu, Aug 6", time: "10:00 AM – 1:00 PM" },
    ],
    pendingProposal: { day: "Tue, Aug 4", time: "3:00 – 6:00 PM", focus: "Use Case Modeling" },
    confirmedSessions: [],
  },
  {
    id: "intro-programming",
    name: "Introduction to Programming",
    code: "COMPSCI 1JC3",
    priority: "Excellent",
    summary: "Strong, consistent scores across every assessment so far — keep this pace.",
    performance: [
      { activity: "Assignment 1", grade: 96, level: "Excellent" },
      { activity: "Quiz 1", grade: 92, level: "Excellent" },
      { activity: "Midterm Exam", grade: 94, level: "Excellent" },
    ],
    recommendedSkills: [
      {
        name: "Recursion Optimization",
        description: "Rewriting recursive solutions to avoid redundant work and stack overflows.",
        references: [
          { type: "reading", label: "Textbook Ch. 8 — Recursion & Memoization" },
          { type: "practice", label: "Practice Set: Rewriting Loops as Recursion" },
        ],
      },
      {
        name: "Advanced Data Structures",
        description: "Trees, graphs, and heaps — choosing the right structure for the problem at hand.",
        references: [
          { type: "reading", label: "Lecture 9 Notes — Trees & Heaps" },
          { type: "video", label: "Video: Graph Traversal Basics" },
        ],
      },
      {
        name: "Algorithm Complexity Analysis",
        description: "Reasoning about Big-O time and space trade-offs before you write the code.",
        references: [
          { type: "reading", label: "Textbook Ch. 10 — Big-O Notation" },
          { type: "practice", label: "Worksheet: Analyzing Runtime Complexity" },
        ],
      },
      {
        name: "Object-Oriented Design Patterns",
        description: "Reusable solutions like Factory and Observer for common design problems.",
        references: [
          { type: "reading", label: "Lecture 11 Slides — Factory & Observer Patterns" },
          { type: "video", label: "Video Walkthrough: Refactoring to Patterns" },
        ],
      },
      {
        name: "Unit Testing Practices",
        description: "Writing small, isolated tests that catch regressions before they ship.",
        references: [
          { type: "reading", label: "Textbook Ch. 12 — Writing Testable Code" },
          { type: "practice", label: "Practice Set: Writing Your First Unit Tests" },
        ],
      },
    ],
    upcomingActivities: [
      { name: "Assignment 3", dueDate: "2026-08-20" },
      { name: "Lab Quiz 2", dueDate: "2026-08-25" },
    ],
    suggestedSession: { day: "Wed, Aug 19", time: "1:00 – 2:30 PM", focus: "Design Patterns" },
    alternateSlots: [
      { day: "Mon, Aug 17", time: "3:00 – 4:30 PM" },
      { day: "Tue, Aug 18", time: "9:00 – 10:30 AM" },
      { day: "Fri, Aug 21", time: "11:00 AM – 12:30 PM" },
    ],
    pendingProposal: null,
    confirmedSessions: [],
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    code: "SFWRTECH 4C03",
    priority: "Moderate",
    summary: "Steady but average results — a bit more practice would move this into strong standing.",
    performance: [
      { activity: "Assignment 1", grade: 74, level: "Average" },
      { activity: "Quiz 1", grade: 70, level: "Average" },
      { activity: "Midterm Exam", grade: 76, level: "Average" },
    ],
    recommendedSkills: [
      {
        name: "Network Security Fundamentals",
        description: "Core concepts like firewalls, VPNs, and segmentation that keep networks safe.",
        references: [
          { type: "reading", label: "Lecture 2 Slides — Firewalls & Segmentation" },
          { type: "practice", label: "Lab Notes: Configuring a Basic Firewall" },
        ],
      },
      {
        name: "Cryptography Basics",
        description: "How encryption, hashing, and keys protect data in transit and at rest.",
        references: [
          { type: "reading", label: "Textbook Ch. 5 — Symmetric vs Asymmetric Encryption" },
          { type: "video", label: "Video: How Hashing Protects Passwords" },
        ],
      },
      {
        name: "Threat Modeling",
        description: "Systematically identifying what could go wrong before an attacker finds it first.",
        references: [
          { type: "reading", label: "Lecture 6 Notes — STRIDE Framework" },
          { type: "practice", label: "Worksheet: Modeling Threats for a Login System" },
        ],
      },
      {
        name: "Penetration Testing Concepts",
        description: "Ethical hacking techniques used to probe systems for exploitable weaknesses.",
        references: [
          { type: "reading", label: "Textbook Ch. 9 — Ethical Hacking Fundamentals" },
          { type: "video", label: "Video Walkthrough: A Basic Pen Test Workflow" },
        ],
      },
      {
        name: "Security Policy Design",
        description: "Writing the rules and procedures that guide an organization's security posture.",
        references: [
          { type: "reading", label: "Lecture 10 Slides — Writing Security Policies" },
          { type: "practice", label: "Practice Set: Drafting an Access Control Policy" },
        ],
      },
    ],
    upcomingActivities: [
      { name: "Lab 4: Firewall Configuration", dueDate: "2026-08-10" },
      { name: "Quiz 2", dueDate: "2026-08-13" },
    ],
    suggestedSession: { day: "Fri, Aug 7", time: "11:00 AM – 1:00 PM", focus: "Cryptography Basics" },
    alternateSlots: [
      { day: "Tue, Aug 4", time: "6:00 – 8:00 PM" },
      { day: "Wed, Aug 5", time: "9:00 – 11:00 AM" },
      { day: "Thu, Aug 6", time: "6:00 – 8:00 PM" },
    ],
    pendingProposal: { day: "Fri, Aug 7", time: "11:00 AM – 1:00 PM", focus: "Cryptography Basics" },
    confirmedSessions: [],
  },
  {
    id: "advanced-math",
    name: "Advanced Math",
    code: "MATH 2C03",
    priority: "On Track",
    summary: "Solid, above-average performance — a confirmed session will help lock in the harder topics.",
    performance: [
      { activity: "Assignment 1", grade: 82, level: "Good" },
      { activity: "Quiz 1", grade: 79, level: "Good" },
      { activity: "Midterm Exam", grade: 84, level: "Good" },
    ],
    recommendedSkills: [
      {
        name: "Multivariable Calculus",
        description: "Extending derivatives and integrals to functions of several variables.",
        references: [
          { type: "reading", label: "Textbook Ch. 14 — Partial Derivatives" },
          { type: "practice", label: "Problem Set: Gradient & Directional Derivatives" },
        ],
      },
      {
        name: "Linear Transformations",
        description: "Functions between vector spaces that preserve addition and scalar multiplication.",
        references: [
          { type: "reading", label: "Lecture 8 Notes — Matrix Representations" },
          { type: "video", label: "Video: Visualizing Linear Transformations" },
        ],
      },
      {
        name: "Eigenvalues & Eigenvectors",
        description: "Special scalars and vectors that reveal how a transformation stretches space.",
        references: [
          { type: "reading", label: "Textbook Ch. 16 — Diagonalization" },
          { type: "practice", label: "Worksheet: Finding Eigenvalues by Hand" },
        ],
      },
      {
        name: "Proof Techniques",
        description: "Induction, contradiction, and direct proof — the toolkit for rigorous argument.",
        references: [
          { type: "reading", label: "Lecture 4 Slides — Induction & Contradiction" },
          { type: "practice", label: "Practice Set: Writing Formal Proofs" },
        ],
      },
      {
        name: "Series Convergence Tests",
        description: "Methods like the ratio and comparison tests to determine if a series converges.",
        references: [
          { type: "reading", label: "Textbook Ch. 18 — Ratio & Comparison Tests" },
          { type: "video", label: "Video Walkthrough: Choosing the Right Test" },
        ],
      },
    ],
    upcomingActivities: [
      { name: "Problem Set 5", dueDate: "2026-08-14" },
      { name: "Quiz 3", dueDate: "2026-08-19" },
    ],
    suggestedSession: { day: "Mon, Aug 10", time: "4:00 – 5:30 PM", focus: "Eigenvalues & Eigenvectors" },
    alternateSlots: [
      { day: "Tue, Aug 11", time: "12:00 – 1:30 PM" },
      { day: "Wed, Aug 12", time: "3:00 – 4:30 PM" },
      { day: "Thu, Aug 13", time: "9:00 – 10:30 AM" },
    ],
    pendingProposal: { day: "Mon, Aug 10", time: "4:00 – 5:30 PM", focus: "Eigenvalues & Eigenvectors" },
    confirmedSessions: [],
  },
];

// Picks the next available proposal for a course: the original suggested
// slot first, then alternates, skipping any time already confirmed.
export function pickNextProposal(course) {
  const used = new Set(course.confirmedSessions.map((s) => `${s.day}|${s.time}`));
  const candidates = [
    course.suggestedSession,
    ...course.alternateSlots.map((slot) => ({ ...slot, focus: course.suggestedSession.focus })),
  ];
  return candidates.find((c) => !used.has(`${c.day}|${c.time}`)) ?? course.suggestedSession;
}
