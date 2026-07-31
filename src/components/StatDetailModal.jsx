import { X, BookOpen, AlertTriangle, CalendarCheck2, ListChecks, ChevronRight, Inbox } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import ActivityRow from "./ActivityRow";
import { PRIORITY_RANK } from "../mockData";

const KIND_META = {
  courses: { title: "All Courses", icon: BookOpen },
  urgent: { title: "Courses Needing Urgent Focus", icon: AlertTriangle },
  sessions: { title: "Confirmed Sessions Across Courses", icon: CalendarCheck2 },
  activities: { title: "Upcoming Activities", icon: ListChecks },
};

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-8">
      <Inbox className="w-6 h-6 text-ink-400" strokeWidth={2} />
      <p className="text-sm text-ink-600">{message}</p>
    </div>
  );
}

function CourseRow({ course, onSelectCourse }) {
  const average = Math.round(
    course.performance.reduce((sum, entry) => sum + entry.grade, 0) / course.performance.length
  );
  return (
    <button
      type="button"
      onClick={() => onSelectCourse(course.id)}
      className="group w-full flex items-center justify-between gap-3 border border-border rounded-xl px-3.5 py-3 text-left transition hover:border-brand-600 hover:bg-brand-100"
    >
      <div className="min-w-0">
        <p className="text-sm font-bold truncate">{course.name}</p>
        <p className="text-xs text-ink-400 mt-0.5">
          {course.code} · {average}% avg
        </p>
      </div>
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <PriorityBadge priority={course.priority} />
        <ChevronRight className="w-4 h-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
      </div>
    </button>
  );
}

export default function StatDetailModal({ kind, courses, onSelectCourse, onClose }) {
  const meta = KIND_META[kind];
  const Icon = meta.icon;

  const sortedCourses = [...courses].sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
  const urgentCourses = sortedCourses.filter((c) => c.priority === "Urgent");
  const allConfirmedSessions = courses.flatMap((course) =>
    course.confirmedSessions.map((session) => ({
      ...session,
      courseId: course.id,
      courseName: course.name,
    }))
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

  function handleSelect(courseId) {
    onSelectCourse(courseId);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-ink-900/45 backdrop-blur-[2px] flex items-center justify-center p-6 z-50 animate-[backdrop-in_0.18s_ease]"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-3xl shadow-[var(--shadow-modal)] w-full max-w-[480px] max-h-[80vh] flex flex-col px-7 py-6 animate-[modal-in_0.2s_cubic-bezier(0.22,1,0.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-brand-100 text-brand-700 flex-shrink-0">
            <Icon className="w-5 h-5" strokeWidth={2.25} />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-ink-400 hover:text-ink-900 transition-colors mt-1"
          >
            <X className="w-5 h-5" strokeWidth={2.25} />
          </button>
        </div>

        <h2 className="font-display text-xl font-bold mb-4">{meta.title}</h2>

        <div className="overflow-y-auto -mr-2 pr-2">
          {kind === "courses" && (
            <div className="flex flex-col gap-2">
              {sortedCourses.map((course) => (
                <CourseRow key={course.id} course={course} onSelectCourse={handleSelect} />
              ))}
            </div>
          )}

          {kind === "urgent" &&
            (urgentCourses.length === 0 ? (
              <EmptyState message="No courses need urgent focus right now." />
            ) : (
              <div className="flex flex-col gap-2">
                {urgentCourses.map((course) => (
                  <CourseRow key={course.id} course={course} onSelectCourse={handleSelect} />
                ))}
              </div>
            ))}

          {kind === "sessions" &&
            (allConfirmedSessions.length === 0 ? (
              <EmptyState message="No sessions confirmed yet — accept a proposed session on any course to see it here." />
            ) : (
              <ul className="flex flex-col gap-2">
                {allConfirmedSessions.map((session) => (
                  <li key={`${session.courseId}-${session.day}-${session.time}`}>
                    <button
                      type="button"
                      onClick={() => handleSelect(session.courseId)}
                      className="group w-full flex items-center justify-between gap-3 border border-border rounded-xl px-3.5 py-3 text-left transition hover:border-brand-600 hover:bg-brand-100"
                    >
                      <div>
                        <p className="text-sm font-bold">
                          {session.day} · {session.time}
                        </p>
                        <p className="text-xs text-ink-400 mt-0.5">
                          {session.courseName} — Focus: {session.focus}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-ink-400 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
                    </button>
                  </li>
                ))}
              </ul>
            ))}

          {kind === "activities" &&
            (allActivities.length === 0 ? (
              <EmptyState message="No upcoming activities." />
            ) : (
              <ul>
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
            ))}
        </div>
      </div>
    </div>
  );
}
