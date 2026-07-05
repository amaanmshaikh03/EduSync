import { CalendarClock, CheckCircle2, RefreshCw, XCircle } from "lucide-react";

export default function BookingModal({ course, onAccept, onModify, onReject, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-ink-900/45 backdrop-blur-[2px] flex items-center justify-center p-6 z-50 animate-[backdrop-in_0.18s_ease]"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-3xl shadow-[var(--shadow-modal)] w-full max-w-[440px] px-7 py-6 animate-[modal-in_0.2s_cubic-bezier(0.22,1,0.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-brand-100 text-brand-700 mb-3.5">
          <CalendarClock className="w-5 h-5" strokeWidth={2.25} />
        </span>
        <p className="text-xs font-bold uppercase tracking-wide text-brand-600 mb-2">Proposed Session</p>
        <h2 className="font-display text-xl font-bold mb-1">Book a Study Session</h2>
        <p className="text-ink-400 text-sm mb-4">{course.name}</p>

        <div className="bg-surface-alt rounded-2xl px-4 py-4 mb-5">
          <p className="font-display text-lg font-bold">
            {course.pendingProposal.day} · {course.pendingProposal.time}
          </p>
          <p className="text-ink-600 text-sm mt-1">Focus: {course.pendingProposal.focus}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button type="button" onClick={onAccept} className="btn-primary w-full">
            <CheckCircle2 className="w-4 h-4" strokeWidth={2.25} />
            Accept Session
          </button>
          <div className="flex gap-2">
            <button type="button" onClick={onModify} className="btn-secondary flex-1">
              <RefreshCw className="w-3.5 h-3.5" strokeWidth={2.25} />
              Modify Time
            </button>
            <button type="button" onClick={onReject} className="btn-danger flex-1">
              <XCircle className="w-3.5 h-3.5" strokeWidth={2.25} />
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
