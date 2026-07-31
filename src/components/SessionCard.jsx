import { useState } from "react";
import { CalendarClock, CheckCircle2, CalendarPlus, Edit3, Trash2 } from "lucide-react";

export default function SessionCard({ course, onOpenProposal, onSuggestOrBookAnother, onEditConfirmed, onDeleteConfirmed }) {
  const { pendingProposal, confirmedSessions } = course;
  const hasConfirmed = confirmedSessions.length > 0;
  const [confirmingIndex, setConfirmingIndex] = useState(null);

  return (
    <div className="mb-5 flex flex-col gap-3">
      {pendingProposal && (
        <div className="rounded-3xl border bg-brand-100 border-brand-600/30 px-6 py-5 shadow-[var(--shadow-card)]">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-brand-700 mb-3">
            <CalendarClock className="w-3.5 h-3.5" strokeWidth={2.5} />
            Proposed Session
          </p>
          <p className="font-display text-xl font-bold">
            {pendingProposal.day} · {pendingProposal.time}
          </p>
          <p className="text-ink-600 text-sm mb-4">Focus: {pendingProposal.focus}</p>
          <button type="button" onClick={onOpenProposal} className="btn-primary w-full">
            Review Proposed Session
          </button>
        </div>
      )}

      {hasConfirmed && (
        <div className="rounded-3xl border bg-excellent-bg border-excellent-border px-6 py-5 shadow-[var(--shadow-card)]">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-excellent-text mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
            {confirmedSessions.length > 1 ? `${confirmedSessions.length} Confirmed Sessions` : "Study Session Confirmed"}
          </p>
          <ul className="flex flex-col gap-3">
            {confirmedSessions.map((session, i) => (
              <li
                key={`${session.day}-${session.time}`}
                className={`${i === confirmedSessions.length - 1 ? "" : "pb-3 border-b border-excellent-border"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-bold">
                      {session.day} · {session.time}
                    </p>
                    <p className="text-ink-600 text-xs mt-0.5">Focus: {session.focus}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => onEditConfirmed(i)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline"
                    >
                      <Edit3 className="w-3 h-3" strokeWidth={2.5} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmingIndex(i)}
                      aria-label={`Delete session ${session.day} ${session.time}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-urgent-text hover:underline"
                    >
                      <Trash2 className="w-3 h-3" strokeWidth={2.5} />
                      Delete
                    </button>
                  </div>
                </div>

                {confirmingIndex === i && (
                  <div className="mt-2.5 flex items-center justify-between gap-3 bg-urgent-bg border border-urgent-border rounded-xl px-3.5 py-2.5">
                    <p className="text-xs font-semibold text-urgent-text">Remove this session?</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setConfirmingIndex(null)}
                        className="text-xs font-bold text-ink-600 hover:underline"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteConfirmed(i);
                          setConfirmingIndex(null);
                        }}
                        className="text-xs font-bold text-white bg-urgent-dot rounded-lg px-2.5 py-1 hover:brightness-110"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!pendingProposal && !hasConfirmed && (
        <div className="rounded-3xl border bg-surface-alt border-border px-6 py-5 shadow-[var(--shadow-card)]">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-ink-400 mb-2.5">
            <CalendarClock className="w-3.5 h-3.5" strokeWidth={2.5} />
            Study Session
          </p>
          <p className="text-ink-600 text-sm mb-4">No session scheduled for this course right now.</p>
          <button type="button" onClick={onSuggestOrBookAnother} className="btn-primary w-full">
            Suggest a Session
          </button>
        </div>
      )}

      {!pendingProposal && hasConfirmed && (
        <button type="button" onClick={onSuggestOrBookAnother} className="btn-secondary self-start">
          <CalendarPlus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Book Another Session
        </button>
      )}
    </div>
  );
}
