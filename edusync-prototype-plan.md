# EduSync — High-Fidelity Interactive Prototype
### Implementation Plan & Requirements (Vibecode / GitHub / Vercel)


## 1. Purpose of This Prototype

This is a **high-fidelity, interactive, frontend-only prototype** for usability testing. It must let a real user carry out **two hardcoded tasks** in a browser, with no backend, login, or real data integration required.

**Non-goals (explicitly out of scope for this milestone):**
- No real Avenue to Learn integration
- No real login/signup/auth
- No real LLM calls for skill recommendations
- No real Outlook Calendar API or email sending
- No persistent database — all data is hardcoded/mocked in frontend state

Everything above is **faked** with hardcoded values, but the *interaction flow* must feel real and complete.

---

## 2. Source Requirements Recap (from proposal.pdf)

### Functional Requirements in scope for this prototype
| ID | Requirement | Prototype coverage |
|---|---|---|
| FR1 | Retrieve course details, outlines, performance | Hardcoded mock course + grade data |
| FR2 | Assign priority level (Urgent / Moderate / On Track / Excellent) | Hardcoded badges per course |
| FR3 | Display upcoming assignments/quizzes ranked by priority + due date | Hardcoded, pre-sorted activity list |
| FR4 | Generate skill/topic recommendations via LLM | Hardcoded skill/topic chips per course |
| FR5 | Schedule study sessions, block calendar, send reminder | Fake booking flow (accept/reject/modify) — no real calendar/email |

### Non-Functional Requirements relevant to prototype quality
- **NFR4 (Usability):** first-time user should understand priorities/deadlines/skills within 2 minutes without manual input → drives the Dashboard-first, zero-config design.
- **NFR5 (Usability):** priority levels must be visually distinguishable → drives color-coded badge system (see §5).

### Survey-informed adjustment (from Milestone #1 results.xlsx)
- Auto-scheduling received hesitant responses (3/5 said "Maybe" vs "Yes"). **Design decision:** booking is **suggest → accept/reject/modify → confirm**, never silently automatic. This must be visibly reflected in the prototype's interaction flow.

---

## 3. The Two Usability Test Tasks

These are the only two flows that must work end-to-end. Everything else can be static/decorative.

### Task 1 — Check course standing
> "Check how you're doing in one of your courses, and see what topics you should focus on."

**Flow:** Dashboard → click a course card → Course Detail page (shows performance + priority + recommended skills/topics)

### Task 2 — Book a study session
> "Book a study session for a course you're falling behind in."

**Flow:** Course Detail → click "Book Suggested Session" → Proposal modal (Accept / Reject / Modify) →
- Accept → Confirmed state (with Edit option)
- Modify → pick alternate time slot → Confirmed state
- Reject → "No session scheduled" state → can re-trigger a suggestion

Both tasks must be reachable from a single entry URL, with no login step.

---

## 4. Screens / Views Required

| # | View | Notes |
|---|---|---|
| 1 | **Dashboard** | Entry point. List of course cards (priority badges) + upcoming activities panel, sorted by priority/due date |
| 2 | **Course Detail** | Performance table, priority badge, recommended skills/topics chips, upcoming study session card, upcoming activities for that course |
| 3 | **Booking Proposal Modal** | Overlay: proposed time + Accept / Modify / Reject buttons |
| 4 | **Modify Session View** | Overlay: 2–3 alternate hardcoded time slots to pick from |
| 5 | **Confirmed Session State** | Course Detail variant: session shows "✅ Confirmed" + Edit link (reopens modal) |
| 6 | **No Session State** | Course Detail variant after Reject: "No session scheduled" + "Suggest again" button |

All 6 states can be implemented as **one Course Detail component with conditional rendering** based on a `sessionStatus` state variable (`suggested | confirmed | none`) — no need for separate routes/pages for states 3–6.

---

## 5. Visual Design Guidelines

- **Priority color coding (NFR5):** must be immediately distinguishable, not just labeled text.
  - Urgent → red/crimson
  - Moderate → amber/orange
  - On Track → blue/teal
  - Excellent → green
- Keep the *tone* studious, calm, and low-anxiety despite the "urgent" language — the goal is clarity, not stress. Avoid harsh red-alert styling that feels punitive.
- Establish a clear type scale (one display/heading face, one body face) and a consistent 8px spacing system.
- Design mobile-responsive layout is a bonus, not required for this milestone — but don't let the desktop layout break on a laptop-sized browser window, since usability testers may resize.
- Avoid decorative animation for animation's sake; a subtle transition on modal open/close is enough.

---

## 6. Recommended Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React (Vite)** | Fast local dev, simple component state, easy Vercel deploy |
| Styling | **Tailwind CSS** | Fast to iterate, easy to keep consistent spacing/colors |
| State | React `useState` only | No backend, no real persistence needed — component state is enough |
| Icons | `lucide-react` | Free, consistent icon set |
| Hosting | **Vercel** (via GitHub integration) | One-click deploy from repo, free public URL |
| Repo | **GitHub** (public or unlisted-but-accessible) | Needed for Vercel's git integration |

No routing library is strictly required — conditional rendering (`currentView` state: `'dashboard' | 'courseDetail'`) is sufficient since there are only two real "pages."

---

## 7. Mock Data Structure

Define this once in a `mockData.js`/`.ts` file so all components pull from the same source:

```js
export const courses = [
  {
    id: "sfwrtech-3rq3",
    name: "SFWRTECH 3RQ3",
    priority: "Urgent", // Urgent | Moderate | On Track | Excellent
    performance: [
      { activity: "Assignment 1", grade: "62%", level: "Below Average" },
      { activity: "Quiz 1", grade: "70%", level: "Average" },
    ],
    recommendedSkills: ["Requirements Elicitation", "Use Case Modeling"],
    recommendedTopics: ["Task Analysis", "NFR Classification"],
    upcomingActivities: [
      { name: "Milestone 2", dueDate: "2026-07-12" },
    ],
    suggestedSession: { day: "Tue", time: "3:00–5:00 PM", focus: "Task Analysis" },
    sessionStatus: "suggested", // suggested | confirmed | none
  },
  // ...2-3 more courses with varied priorities
];

export const alternateTimeSlots = [
  { day: "Mon", time: "2:00–4:00 PM" },
  { day: "Wed", time: "5:00–7:00 PM" },
  { day: "Thu", time: "10:00 AM–12:00 PM" },
];
```

Hardcode 3–4 courses with varied priorities so the Dashboard looks realistic and not trivially uniform.

---

## 8. Component Breakdown

```
src/
  App.jsx                # holds currentView + selectedCourseId state
  mockData.js
  components/
    Dashboard.jsx
    CourseCard.jsx
    ActivityRow.jsx
    PriorityBadge.jsx
    CourseDetail.jsx
    SkillChip.jsx
    SessionCard.jsx           # renders suggested/confirmed/none variants
    BookingModal.jsx          # Accept/Reject/Modify
    ModifySessionModal.jsx
```

**State to manage in `App.jsx` (or lifted where needed):**
- `currentView`: `'dashboard' | 'courseDetail'`
- `selectedCourseId`
- `courses` (local copy of mock data, so session status changes persist during the session — use `useState(initialCourses)`, update via `setCourses` when Accept/Modify/Reject is clicked)
- `activeModal`: `null | 'proposal' | 'modify'`

---

## 9. Step-by-Step Implementation Plan

### Phase 1 — Project scaffold (15–20 min)
1. `npm create vite@latest edusync-prototype -- --template react`
2. `cd edusync-prototype && npm install`
3. Install Tailwind: follow Vite+Tailwind official setup (`npm install tailwindcss @tailwindcss/vite`, update `vite.config.js` and `index.css`)
4. `npm install lucide-react`
5. `npm run dev` — confirm blank app runs locally

### Phase 2 — Static Dashboard (45–60 min)
1. Build `mockData.js` with 3–4 courses.
2. Build `PriorityBadge`, `CourseCard`, `ActivityRow` components.
3. Assemble `Dashboard.jsx` with two-column layout (courses left, activities right), pulling from mock data.
4. Sort activities by priority then due date before rendering (FR3).

### Phase 3 — Static Course Detail (45–60 min)
1. Build `SkillChip`, `SessionCard` (suggested variant only for now).
2. Assemble `CourseDetail.jsx`: header (name + badge), performance table, skill chips, session card, filtered activity list for that course.
3. Wire click on `CourseCard` → sets `selectedCourseId` + `currentView = 'courseDetail'`.
4. Add a "Back to Dashboard" link/button on Course Detail.

**Checkpoint: Task 1 should now be fully functional.**

### Phase 4 — Booking flow (60–90 min)
1. Build `BookingModal.jsx` (Accept / Modify / Reject buttons), rendered as a fixed-position overlay with a semi-transparent backdrop.
2. Wire "Book Suggested Session" button on `SessionCard` → `activeModal = 'proposal'`.
3. Wire Accept → update that course's `sessionStatus = 'confirmed'`, close modal.
4. Wire Reject → update `sessionStatus = 'none'`, close modal.
5. Wire Modify → `activeModal = 'modify'`.
6. Build `ModifySessionModal.jsx` listing `alternateTimeSlots`; clicking one sets `sessionStatus = 'confirmed'` with that chosen time, closes modal.
7. Update `SessionCard` to render 3 variants based on `sessionStatus`:
   - `suggested`: shows proposed time + "Book Session" button
   - `confirmed`: shows "✅ Confirmed [time]" + "Edit" link (reopens `BookingModal`)
   - `none`: shows "No session scheduled" + "Suggest again" button (resets to `suggested`)

**Checkpoint: Task 2 should now be fully functional, including Edit-after-confirm.**

### Phase 5 — Visual polish (60–90 min)
1. Apply consistent Tailwind spacing/typography across all components.
2. Add subtle modal open/close transition (`transition-opacity`, `scale` on enter).
3. Responsive check at ~1024px and ~1280px widths.
4. Add empty/loading-state copy where relevant (e.g., "No session scheduled" should read like a real UI, not a placeholder).

### Phase 6 — Push to GitHub (10 min)
```bash
git init
git add .
git commit -m "EduSync interactive prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/edusync-prototype.git
git push -u origin main
```

### Phase 7 — Deploy to Vercel (10–15 min)
1. Go to vercel.com → sign in with GitHub.
2. **"Add New Project"** → import `edusync-prototype` repo.
3. Framework preset should auto-detect **Vite** — leave build command/output defaults.
4. Click **Deploy**.
5. Once deployed, copy the public `.vercel.app` URL.

### Phase 8 — Verify public accessibility (5 min)
1. Open the Vercel URL in an **incognito Chrome window** (simulates a first-time visitor).
2. Confirm the app loads directly with **zero clicks required to activate** — it should just work on page load. This exceeds the assignment's "≤2 actions" bar, since no activation step is needed at all for a deployed web app.
3. Manually complete both Task 1 and Task 2 flows exactly as a usability test participant would.

---

## 10. Definition of Done Checklist

- [ ] Dashboard shows 3–4 courses with distinguishable priority badges (NFR5)
- [ ] Activities panel sorted by priority + due date (FR3)
- [ ] Course Detail shows performance, skills/topics, and session status (FR1, FR2, FR4)
- [ ] Task 1 fully clickable end-to-end
- [ ] Booking modal supports Accept, Reject, and Modify (reflecting survey-driven design decision — no silent auto-booking)
- [ ] Confirmed state includes working Edit option
- [ ] Task 2 fully clickable end-to-end, including all three modal branches
- [ ] Deployed to Vercel with a public URL
- [ ] Verified working in incognito Chrome with no install/login step
- [ ] Repo pushed to GitHub

---
