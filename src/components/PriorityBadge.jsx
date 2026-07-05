import { PRIORITY_STYLES } from "../mockData";

export default function PriorityBadge({ priority, size = "md" }) {
  const style = PRIORITY_STYLES[priority];
  const sizeClasses =
    size === "lg" ? "px-3.5 py-1.5 text-sm gap-2" : "px-2.5 py-1 text-xs gap-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-bold whitespace-nowrap ${sizeClasses} ${style.text} ${style.bg} ${style.border}`}
    >
      <span className={`rounded-full flex-shrink-0 ${size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5"} ${style.dot}`} />
      {priority}
    </span>
  );
}
