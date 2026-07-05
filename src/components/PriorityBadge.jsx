import { PRIORITY_STYLES, PRIORITY_ICONS } from "../mockData";

export default function PriorityBadge({ priority, size = "md" }) {
  const style = PRIORITY_STYLES[priority];
  const Icon = PRIORITY_ICONS[priority];
  const sizeClasses =
    size === "lg" ? "px-3.5 py-1.5 text-sm gap-1.5" : "px-2.5 py-1 text-xs gap-1";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-bold whitespace-nowrap ${sizeClasses} ${style.text} ${style.bg} ${style.border}`}
    >
      <Icon className={size === "lg" ? "w-3.5 h-3.5" : "w-3 h-3"} strokeWidth={2.5} />
      {priority}
    </span>
  );
}
