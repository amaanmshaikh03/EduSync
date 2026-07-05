import { GraduationCap } from "lucide-react";
import { student } from "../mockData";

export default function Header({ onGoHome }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-10 py-3.5 border-b border-border bg-surface/85 backdrop-blur-md shadow-[0_1px_0_rgba(36,32,46,0.03)]">
      <button
        type="button"
        onClick={onGoHome}
        className="flex items-center gap-2.5 rounded-lg py-1 pr-2 transition hover:opacity-80"
      >
        <span className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-brand-600 to-brand-700 text-white flex items-center justify-center shadow-[0_4px_10px_-2px_rgba(87,75,144,0.55)]">
          <GraduationCap className="w-[19px] h-[19px]" strokeWidth={2.25} />
        </span>
        <span className="font-display text-lg font-bold tracking-tight">EduSync</span>
      </button>

      <div className="flex items-center gap-3">
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
