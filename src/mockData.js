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
      { name: "Requirements Elicitation", description: "Techniques for drawing out real needs from stakeholders through interviews, workshops, and observation." },
      { name: "Use Case Modeling", description: "Describing how users interact with a system to capture functional requirements clearly." },
      { name: "Stakeholder Analysis", description: "Identifying who is affected by a project and understanding their priorities and influence." },
      { name: "Non-Functional Requirement Classification", description: "Sorting requirements like performance, security, and usability apart from core features." },
      { name: "Traceability Matrices", description: "Mapping requirements to design, code, and tests so nothing gets lost along the way." },
    ],
    upcomingActivities: [
      { name: "Milestone 2 Report", dueDate: "2026-07-10" },
      { name: "Peer Review Quiz", dueDate: "2026-07-14" },
    ],
    suggestedSession: { day: "Tue, Jul 8", time: "3:00 – 6:00 PM", focus: "Use Case Modeling" },
    alternateSlots: [
      { day: "Mon, Jul 7", time: "2:00 – 5:00 PM" },
      { day: "Wed, Jul 9", time: "5:00 – 8:00 PM" },
      { day: "Thu, Jul 10", time: "10:00 AM – 1:00 PM" },
    ],
    pendingProposal: { day: "Tue, Jul 8", time: "3:00 – 6:00 PM", focus: "Use Case Modeling" },
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
      { name: "Recursion Optimization", description: "Rewriting recursive solutions to avoid redundant work and stack overflows." },
      { name: "Advanced Data Structures", description: "Trees, graphs, and heaps — choosing the right structure for the problem at hand." },
      { name: "Algorithm Complexity Analysis", description: "Reasoning about Big-O time and space trade-offs before you write the code." },
      { name: "Object-Oriented Design Patterns", description: "Reusable solutions like Factory and Observer for common design problems." },
      { name: "Unit Testing Practices", description: "Writing small, isolated tests that catch regressions before they ship." },
    ],
    upcomingActivities: [
      { name: "Assignment 3", dueDate: "2026-07-18" },
      { name: "Lab Quiz 2", dueDate: "2026-07-21" },
    ],
    suggestedSession: { day: "Wed, Jul 9", time: "1:00 – 2:30 PM", focus: "Design Patterns" },
    alternateSlots: [
      { day: "Tue, Jul 8", time: "9:00 – 10:30 AM" },
      { day: "Thu, Jul 10", time: "3:00 – 4:30 PM" },
      { day: "Fri, Jul 11", time: "11:00 AM – 12:30 PM" },
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
      { name: "Network Security Fundamentals", description: "Core concepts like firewalls, VPNs, and segmentation that keep networks safe." },
      { name: "Cryptography Basics", description: "How encryption, hashing, and keys protect data in transit and at rest." },
      { name: "Threat Modeling", description: "Systematically identifying what could go wrong before an attacker finds it first." },
      { name: "Penetration Testing Concepts", description: "Ethical hacking techniques used to probe systems for exploitable weaknesses." },
      { name: "Security Policy Design", description: "Writing the rules and procedures that guide an organization's security posture." },
    ],
    upcomingActivities: [
      { name: "Lab 4: Firewall Configuration", dueDate: "2026-07-11" },
      { name: "Quiz 2", dueDate: "2026-07-16" },
    ],
    suggestedSession: { day: "Thu, Jul 10", time: "11:00 AM – 1:00 PM", focus: "Cryptography Basics" },
    alternateSlots: [
      { day: "Mon, Jul 7", time: "6:00 – 8:00 PM" },
      { day: "Wed, Jul 9", time: "9:00 – 11:00 AM" },
      { day: "Fri, Jul 11", time: "1:00 – 3:00 PM" },
    ],
    pendingProposal: { day: "Thu, Jul 10", time: "11:00 AM – 1:00 PM", focus: "Cryptography Basics" },
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
      { name: "Multivariable Calculus", description: "Extending derivatives and integrals to functions of several variables." },
      { name: "Linear Transformations", description: "Functions between vector spaces that preserve addition and scalar multiplication." },
      { name: "Eigenvalues & Eigenvectors", description: "Special scalars and vectors that reveal how a transformation stretches space." },
      { name: "Proof Techniques", description: "Induction, contradiction, and direct proof — the toolkit for rigorous argument." },
      { name: "Series Convergence Tests", description: "Methods like the ratio and comparison tests to determine if a series converges." },
    ],
    upcomingActivities: [
      { name: "Problem Set 5", dueDate: "2026-07-12" },
      { name: "Quiz 3", dueDate: "2026-07-19" },
    ],
    suggestedSession: { day: "Mon, Jul 7", time: "4:00 – 5:30 PM", focus: "Eigenvalues & Eigenvectors" },
    alternateSlots: [
      { day: "Tue, Jul 8", time: "12:00 – 1:30 PM" },
      { day: "Wed, Jul 9", time: "3:00 – 4:30 PM" },
      { day: "Fri, Jul 11", time: "9:00 – 10:30 AM" },
    ],
    pendingProposal: { day: "Mon, Jul 7", time: "4:00 – 5:30 PM", focus: "Eigenvalues & Eigenvectors" },
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
