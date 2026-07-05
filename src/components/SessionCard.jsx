export default function SessionCard({ course, onOpenProposal, onSuggestOrBookAnother, onEditConfirmed }) {
  const { pendingProposal, confirmedSessions } = course;
  const hasConfirmed = confirmedSessions.length > 0;

  return (
    <div className="mb-5 flex flex-col gap-3">
      {pendingProposal && (
        <div className="rounded-2xl border bg-brand-100 border-brand-600/30 px-6 py-5">
          <p className="text-xs font-bold tracking-wide uppercase text-brand-700 mb-2.5">
            Proposed Session
          </p>
          <p className="font-display text-xl font-bold">
            {pendingProposal.day} · {pendingProposal.time}
          </p>
          <p className="text-ink-600 text-sm mb-4">Focus: {pendingProposal.focus}</p>
          <button type="button" onClick={onOpenProposal} className="btn-primary">
            Review Proposed Session
          </button>
        </div>
      )}

      {hasConfirmed && (
        <div className="rounded-2xl border bg-excellent-bg border-excellent-border px-6 py-5">
          <p className="text-xs font-bold tracking-wide uppercase text-excellent-text mb-3">
            {confirmedSessions.length > 1 ? `${confirmedSessions.length} Confirmed Sessions` : "Study Session Confirmed"}
          </p>
          <ul className="flex flex-col gap-3">
            {confirmedSessions.map((session, i) => (
              <li
                key={`${session.day}-${session.time}`}
                className={`flex items-center justify-between gap-3 ${
                  i === confirmedSessions.length - 1 ? "" : "pb-3 border-b border-excellent-border"
                }`}
              >
                <div>
                  <p className="font-display text-base font-bold">
                    ✅ {session.day} · {session.time}
                  </p>
                  <p className="text-ink-600 text-xs mt-0.5">Focus: {session.focus}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onEditConfirmed(i)}
                  className="text-xs font-bold text-brand-600 hover:underline flex-shrink-0"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!pendingProposal && !hasConfirmed && (
        <div className="rounded-2xl border bg-surface-alt border-border px-6 py-5">
          <p className="text-xs font-bold tracking-wide uppercase text-ink-400 mb-2.5">Study Session</p>
          <p className="text-ink-600 text-sm mb-4">No session scheduled for this course right now.</p>
          <button type="button" onClick={onSuggestOrBookAnother} className="btn-primary">
            Suggest a Session
          </button>
        </div>
      )}

      {!pendingProposal && hasConfirmed && (
        <button type="button" onClick={onSuggestOrBookAnother} className="btn-secondary self-start">
          + Book Another Session
        </button>
      )}
    </div>
  );
}
