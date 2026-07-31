import { X, BookOpen, PlayCircle, PenTool } from "lucide-react";

const REFERENCE_ICONS = {
  reading: BookOpen,
  video: PlayCircle,
  practice: PenTool,
};

export default function SkillDetailPanel({ skill, onClose }) {
  return (
    <div
      id="skill-detail-panel"
      role="region"
      aria-label={`${skill.name} details`}
      className="mt-4 rounded-2xl border border-brand-600/30 bg-brand-100 px-5 py-4 animate-[view-fade-in_0.18s_ease]"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-display text-lg font-bold text-brand-700">{skill.name}</h4>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close skill details"
          className="text-brand-700/60 hover:text-brand-700 transition-colors flex-shrink-0 mt-0.5"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>

      <p className="text-sm text-ink-600 leading-relaxed mb-4">{skill.description}</p>

      <p className="text-xs font-bold uppercase tracking-wide text-brand-700 mb-2">Reference Notes</p>
      <ul className="flex flex-col gap-2">
        {skill.references.map((ref) => {
          const Icon = REFERENCE_ICONS[ref.type];
          return (
            <li
              key={ref.label}
              className="flex items-center gap-2.5 bg-surface border border-border rounded-xl px-3.5 py-2.5"
            >
              <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
              </span>
              <span className="text-sm font-medium text-ink-900">{ref.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
