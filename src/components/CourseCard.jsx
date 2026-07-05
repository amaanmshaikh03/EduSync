import { ChevronRight } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import { PRIORITY_STYLES } from "../mockData";

function GradeBars({ performance, priority }) {
  const style = PRIORITY_STYLES[priority];
  const average = Math.round(
    performance.reduce((sum, entry) => sum + entry.grade, 0) / performance.length
  );

  return (
    <div className="flex flex-col items-end gap-1.5">
      <span className={`text-sm font-bold tabular-nums ${style.text}`}>{average}%</span>
      <div className="flex items-end gap-1 h-5">
        {performance.map((entry, i) => (
          <span
            key={i}
            className={`w-[5px] rounded-full opacity-80 ${style.dot}`}
            style={{ height: `${Math.max(entry.grade, 20)}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function CourseCard({ course, onSelect }) {
  const style = PRIORITY_STYLES[course.priority];

  return (
    <button
      type="button"
      onClick={() => onSelect(course.id)}
      className="group relative w-full text-left flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 bg-surface border border-border rounded-3xl pl-6 pr-5 py-4 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] focus-visible:-translate-y-0.5"
    >
      <span className={`absolute left-0 top-4 bottom-4 w-1 rounded-full ${style.stripe}`} />

      <div className="flex-shrink-0 sm:w-[230px]">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg font-bold leading-tight">{course.name}</h3>
        </div>
        <p className="text-xs text-ink-400 mt-0.5">{course.code}</p>
      </div>

      <p className="flex-1 min-w-0 text-sm text-ink-600 leading-snug">{course.summary}</p>

      <div className="flex items-center gap-5 flex-shrink-0 pt-1 sm:pt-0">
        <PriorityBadge priority={course.priority} />
        <GradeBars performance={course.performance} priority={course.priority} />
        <ChevronRight className="w-4 h-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
      </div>
    </button>
  );
}
