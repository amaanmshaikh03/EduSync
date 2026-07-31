import { useState } from "react";
import { BookOpen, AlertTriangle, CalendarCheck2, ListChecks } from "lucide-react";
import CourseCard from "./CourseCard";
import ActivityRow from "./ActivityRow";
import StatDetailModal from "./StatDetailModal";
import { PRIORITY_RANK, student } from "../mockData";

function StatTile({ icon: Icon, tone, value, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 bg-surface border border-border rounded-2xl px-4 py-3.5 shadow-[var(--shadow-card)] text-left transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
    >
      <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tone}`}>
        <Icon className="w-[18px] h-[18px]" strokeWidth={2.25} />
      </span>
      <div className="leading-tight">
        <p className="font-display text-xl font-bold tabular-nums">{value}</p>
        <p className="text-xs text-ink-600">{label}</p>
      </div>
    </button>
  );
}

export default function Dashboard({ courses, onSelectCourse }) {
  const [activeStatModal, setActiveStatModal] = useState(null); // null | 'courses' | 'urgent' | 'sessions' | 'activities'

  const sortedCourses = [...courses].sort(
    (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
  );

  const allActivities = courses
    .flatMap((course) =>
      course.upcomingActivities.map((activity) => ({
        ...activity,
        courseName: course.name,
        priority: course.priority,
      }))
    )
    .sort((a, b) => {
      const rankDiff = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      if (rankDiff !== 0) return rankDiff;
      return a.dueDate.localeCompare(b.dueDate);
    });

  const urgentCount = courses.filter((c) => c.priority === "Urgent").length;
  const confirmedCount = courses.reduce((sum, c) => sum + c.confirmedSessions.length, 0);

  return (
    <div className="view max-w-[1180px] mx-auto px-10 pt-9 pb-16">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-wide uppercase text-brand-600 mb-1.5">Dashboard</p>
        <h1 className="text-3xl font-bold">Welcome back, {student.name.split(" ")[0]}</h1>
        <p className="text-ink-600 mt-1.5 text-sm max-w-[60ch]">
          Here's where things stand across your courses — click any course to see your performance
          breakdown and recommended focus areas.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        <StatTile
          icon={BookOpen}
          tone="bg-brand-100 text-brand-700"
          value={courses.length}
          label="Courses"
          onClick={() => setActiveStatModal("courses")}
        />
        <StatTile
          icon={AlertTriangle}
          tone="bg-urgent-bg text-urgent-text"
          value={urgentCount}
          label={urgentCount === 1 ? "Needs Urgent Focus" : "Need Urgent Focus"}
          onClick={() => setActiveStatModal("urgent")}
        />
        <StatTile
          icon={CalendarCheck2}
          tone="bg-excellent-bg text-excellent-text"
          value={confirmedCount}
          label={confirmedCount === 1 ? "Session Booked" : "Sessions Booked"}
          onClick={() => setActiveStatModal("sessions")}
        />
        <StatTile
          icon={ListChecks}
          tone="bg-ontrack-bg text-ontrack-text"
          value={allActivities.length}
          label="Upcoming Activities"
          onClick={() => setActiveStatModal("activities")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-7 items-start">
        <section>
          <p className="text-xs font-bold tracking-wide uppercase text-ink-400 mb-3.5">Your Courses</p>
          <div className="flex flex-col gap-3">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} onSelect={onSelectCourse} />
            ))}
          </div>
        </section>

        <aside className="bg-surface border border-border rounded-3xl px-5 pt-4 pb-5 shadow-[var(--shadow-card)] lg:sticky lg:top-20">
          <p className="text-xs font-bold tracking-wide uppercase text-ink-400 mb-3">
            Upcoming Activities
          </p>
          <ul className="max-h-[460px] overflow-y-auto -mr-2 pr-2">
            {allActivities.map((activity, i) => (
              <ActivityRow
                key={`${activity.courseName}-${activity.name}`}
                activity={activity}
                courseName={activity.courseName}
                priority={activity.priority}
                isLast={i === allActivities.length - 1}
              />
            ))}
          </ul>
        </aside>
      </div>

      {activeStatModal && (
        <StatDetailModal
          kind={activeStatModal}
          courses={courses}
          onSelectCourse={onSelectCourse}
          onClose={() => setActiveStatModal(null)}
        />
      )}
    </div>
  );
}
