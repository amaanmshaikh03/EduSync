import { CheckCircle2 } from "lucide-react";

export default function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-[toast-in_0.2s_cubic-bezier(0.22,1,0.36,1)]">
      <div className="flex items-center gap-2.5 bg-ink-900 text-white rounded-full pl-3.5 pr-5 py-2.5 shadow-[var(--shadow-modal)]">
        <CheckCircle2 className="w-4 h-4 text-excellent-dot flex-shrink-0" strokeWidth={2.25} />
        <p className="text-sm font-semibold">{message}</p>
      </div>
    </div>
  );
}
