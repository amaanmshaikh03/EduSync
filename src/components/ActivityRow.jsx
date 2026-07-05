import { Calendar } from "lucide-react";
import { PRIORITY_STYLES } from "../mockData";

function formatDueDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ActivityRow({ activity, courseName, priority, isLast = false }) {
  const style = PRIORITY_STYLES[priority];

  return (
    <li
      className={`flex items-center gap-3 py-2.5 -mx-2 px-2 rounded-lg transition-colors hover:bg-surface-alt ${
        isLast ? "" : "border-b border-border"
      }`}
    >
      <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${style.bg} ${style.text}`}>
        <Calendar className="w-4 h-4" strokeWidth={2.25} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{activity.name}</p>
        {courseName && <p className="text-xs text-ink-400 mt-0.5 truncate">{courseName}</p>}
      </div>
      <div className="text-right flex-shrink-0">
        <strong className="block text-sm font-bold tabular-nums">{formatDueDate(activity.dueDate)}</strong>
        <span className="text-xs text-ink-600">Due</span>
      </div>
    </li>
  );
}
