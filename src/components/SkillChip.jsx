export default function SkillChip({ skill, index }) {
  return (
    <div className="relative group" tabIndex={0}>
      <span className="inline-flex items-center gap-1.5 bg-surface-alt border border-border text-ink-900 px-3.5 py-1.5 rounded-full text-sm font-semibold cursor-default">
        <span className="font-display font-bold text-xs text-brand-600">
          {String(index + 1).padStart(2, "0")}
        </span>
        {skill.name}
      </span>

      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 origin-bottom opacity-0 scale-95 transition duration-150 group-hover:opacity-100 group-hover:scale-100 group-focus:opacity-100 group-focus:scale-100 z-20">
        <div className="bg-ink-900 text-white text-xs leading-relaxed rounded-lg px-3.5 py-3 shadow-lg text-left">
          {skill.description}
        </div>
        <div className="w-2.5 h-2.5 bg-ink-900 rotate-45 mx-auto -mt-1.5" />
      </div>
    </div>
  );
}
