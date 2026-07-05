import { RefreshCw, ChevronRight } from "lucide-react";

export default function ModifySessionModal({ course, onPick, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-ink-900/45 backdrop-blur-[2px] flex items-center justify-center p-6 z-50 animate-[backdrop-in_0.18s_ease]"
      onClick={onCancel}
    >
      <div
        className="bg-surface rounded-3xl shadow-[var(--shadow-modal)] w-full max-w-[440px] px-7 py-6 animate-[modal-in_0.2s_cubic-bezier(0.22,1,0.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-brand-100 text-brand-700 mb-3.5">
          <RefreshCw className="w-5 h-5" strokeWidth={2.25} />
        </span>
        <p className="text-xs font-bold uppercase tracking-wide text-brand-600 mb-2">Modify Session</p>
        <h2 className="font-display text-xl font-bold mb-1">Choose Another Time</h2>
        <p className="text-ink-400 text-sm mb-4">{course.name}</p>

        <div className="flex flex-col gap-2 mb-5">
          {course.alternateSlots.map((slot) => (
            <button
              key={`${slot.day}-${slot.time}`}
              type="button"
              onClick={() => onPick(slot)}
              className="group flex items-center justify-between border border-border rounded-2xl px-3.5 py-3 bg-surface text-left transition hover:border-brand-600 hover:bg-brand-100"
            >
              <div>
                <p className="font-bold text-sm">{slot.day}</p>
                <p className="text-ink-600 text-xs">{slot.time}</p>
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-brand-600">
                Select
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </div>

        <button type="button" onClick={onCancel} className="btn-ghost w-full">
          Cancel
        </button>
      </div>
    </div>
  );
}
