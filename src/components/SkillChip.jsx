export default function SkillChip({ skill, index, isOpen, onOpen, onClose }) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls="skill-detail-panel"
      onClick={() => (isOpen ? onClose() : onOpen())}
      className={`inline-flex items-center gap-1.5 border px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
        isOpen
          ? "bg-brand-600 border-brand-600 text-white"
          : "bg-surface-alt border-border text-ink-900 hover:border-brand-600/50 hover:bg-brand-100"
      }`}
    >
      <span className={`font-display font-bold text-xs ${isOpen ? "text-white/80" : "text-brand-600"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      {skill.name}
    </button>
  );
}
