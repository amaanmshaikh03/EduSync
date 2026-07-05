import { PRIORITY_STYLES } from "../mockData";

function formatDueDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ActivityRow({ activity, courseName, priority, isLast = false }) {
  const style = PRIORITY_STYLES[priority];

  return (
    <li className={`flex items-center gap-3 py-2.5 ${isLast ? "" : "border-b border-border"}`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
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
