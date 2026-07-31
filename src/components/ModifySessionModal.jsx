import { useState } from "react";
import { RefreshCw, ChevronRight, CalendarPlus } from "lucide-react";

function formatTime12(value) {
  const [h, m] = value.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return { label: `${hour12}:${String(m).padStart(2, "0")}`, period };
}

function formatTimeRange(start, end) {
  const s = formatTime12(start);
  const e = formatTime12(end);
  return s.period === e.period ? `${s.label} – ${e.label} ${e.period}` : `${s.label} ${s.period} – ${e.label} ${e.period}`;
}

function formatDayLabel(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function ModifySessionModal({ course, onPick, onCancel }) {
  const [showCustom, setShowCustom] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const todayIso = new Date().toISOString().slice(0, 10);
  const hasTimeRange = customStart && customEnd;
  const timeRangeInvalid = hasTimeRange && customEnd <= customStart;
  const isCustomValid = customDate && hasTimeRange && !timeRangeInvalid;

  function handleUseCustomTime() {
    if (!isCustomValid) return;
    onPick({ day: formatDayLabel(customDate), time: formatTimeRange(customStart, customEnd) });
  }

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
        <h2 className="font-display text-xl font-bold mb-1">Choose a Different Time</h2>
        <p className="text-ink-400 text-sm mb-4">{course.name}</p>

        <p className="text-xs font-bold uppercase tracking-wide text-ink-400 mb-2">Suggested Times</p>
        <div className="flex flex-col gap-2 mb-4">
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

        {!showCustom && (
          <button
            type="button"
            onClick={() => setShowCustom(true)}
            className="w-full flex items-center justify-center gap-1.5 border border-dashed border-border rounded-2xl px-3.5 py-3 text-sm font-bold text-brand-600 transition hover:border-brand-600 hover:bg-brand-100 mb-5"
          >
            <CalendarPlus className="w-4 h-4" strokeWidth={2.25} />
            Choose a Custom Time
          </button>
        )}

        {showCustom && (
          <div className="border border-border rounded-2xl px-3.5 py-3.5 mb-5">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-400 mb-3">Custom Time</p>

            <label className="block mb-2.5">
              <span className="block text-xs font-semibold text-ink-600 mb-1">Date</span>
              <input
                type="date"
                value={customDate}
                min={todayIso}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface focus-visible:outline-2 focus-visible:outline-brand-600"
              />
            </label>

            <div className="flex gap-2 mb-1.5">
              <label className="flex-1">
                <span className="block text-xs font-semibold text-ink-600 mb-1">Start</span>
                <input
                  type="time"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface focus-visible:outline-2 focus-visible:outline-brand-600"
                />
              </label>
              <label className="flex-1">
                <span className="block text-xs font-semibold text-ink-600 mb-1">End</span>
                <input
                  type="time"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface focus-visible:outline-2 focus-visible:outline-brand-600"
                />
              </label>
            </div>

            {timeRangeInvalid && (
              <p className="text-xs font-semibold text-urgent-text mb-2">End time must be after start time.</p>
            )}

            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={() => {
                  setShowCustom(false);
                  setCustomDate("");
                  setCustomStart("");
                  setCustomEnd("");
                }}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUseCustomTime}
                disabled={!isCustomValid}
                className="btn-primary flex-1 disabled:opacity-40 disabled:pointer-events-none"
              >
                Use This Time
              </button>
            </div>
          </div>
        )}

        <button type="button" onClick={onCancel} className="btn-ghost w-full">
          Cancel
        </button>
      </div>
    </div>
  );
}
