import PriorityBadge from "./PriorityBadge";
import { PRIORITY_STYLES } from "../mockData";

function GradeBars({ performance, priority }) {
  const style = PRIORITY_STYLES[priority];
  return (
    <div className="flex items-end gap-1 h-7">
      {performance.map((entry, i) => (
        <span
          key={i}
          className={`w-[7px] rounded-t-sm opacity-80 ${style.dot}`}
          style={{ height: `${Math.max(entry.grade, 12)}%` }}
        />
      ))}
    </div>
  );
}

export default function CourseCard({ course, onSelect }) {
  const style = PRIORITY_STYLES[course.priority];

  return (
    <button
      type="button"
      onClick={() => onSelect(course.id)}
      className="relative text-left w-full bg-surface border border-border rounded-2xl pl-5 pr-4 py-4 shadow-sm flex flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5"
    >
      <span className={`absolute left-0 top-3.5 bottom-3.5 w-1 rounded-full ${style.stripe}`} />

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-bold leading-tight">{course.name}</h3>
          <p className="text-xs text-ink-400 mt-0.5">{course.code}</p>
        </div>
        <PriorityBadge priority={course.priority} />
      </div>

      <p className="text-sm text-ink-600 leading-snug">{course.summary}</p>

      <div className="flex items-center justify-between mt-auto pt-1">
        <GradeBars performance={course.performance} priority={course.priority} />
        <span className="text-xs font-bold text-brand-600">View details →</span>
      </div>
    </button>
  );
}
