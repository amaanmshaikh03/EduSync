import { student } from "../mockData";

export default function Header({ onGoHome }) {
  return (
    <header className="flex items-center justify-between px-10 py-4 border-b border-border bg-surface">
      <button type="button" onClick={onGoHome} className="flex items-center gap-2.5">
        <span className="w-[34px] h-[34px] rounded-[9px] bg-brand-600 text-white flex items-center justify-center font-display font-bold text-base">
          E
        </span>
        <span className="font-display text-lg font-bold tracking-tight">EduSync</span>
      </button>

      <div className="flex items-center gap-2.5">
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold">{student.name}</p>
          <p className="text-xs text-ink-400">{student.term}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 border border-brand-600/30 flex items-center justify-center font-bold text-xs">
          {student.initials}
        </div>
      </div>
    </header>
  );
}
