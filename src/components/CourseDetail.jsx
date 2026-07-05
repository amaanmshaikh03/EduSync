import PriorityBadge from "./PriorityBadge";
import SkillChip from "./SkillChip";
import SessionCard from "./SessionCard";
import ActivityRow from "./ActivityRow";
import { PRIORITY_STYLES } from "../mockData";

function PerformanceTable({ course }) {
  const style = PRIORITY_STYLES[course.priority];

  return (
    <div className="bg-surface border border-border rounded-2xl px-6 py-5 mb-5 shadow-sm">
      <p className="text-xs font-bold tracking-wide uppercase text-ink-400 mb-4">Past Performance</p>
      <table className="w-full">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-ink-400 font-semibold">
            <th className="pb-2">Activity</th>
            <th className="pb-2 w-[140px]">Score</th>
            <th className="pb-2">Level</th>
          </tr>
        </thead>
        <tbody>
          {course.performance.map((entry, i) => (
            <tr key={entry.activity} className={i === course.performance.length - 1 ? "" : "border-b border-border"}>
              <td className="py-3 text-sm font-semibold">{entry.activity}</td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tabular-nums w-9">{entry.grade}%</span>
                  <div className="flex-1 h-2 rounded bg-surface-alt overflow-hidden min-w-[60px]">
                    <div
                      className={`h-full rounded ${style.dot}`}
                      style={{ width: `${entry.grade}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="py-3 text-sm text-ink-600">{entry.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CourseDetail({ course, onBack, onOpenProposal, onSuggestOrBookAnother, onEditConfirmed }) {
  return (
    <div className="view max-w-[1180px] mx-auto px-10 pt-9 pb-16">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-brand-600 font-semibold text-sm mb-4 hover:underline">
        ← Back to Dashboard
      </button>

      <div className="flex items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="text-[27px] font-bold">{course.name}</h1>
          <p className="text-ink-400 text-sm mt-1">{course.code}</p>
        </div>
        <PriorityBadge priority={course.priority} size="lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-7 items-start">
        <section>
          <PerformanceTable course={course} />

          <div className="bg-surface border border-border rounded-2xl px-6 py-5 shadow-sm">
            <div className="flex items-baseline justify-between mb-4">
              <p className="text-xs font-bold tracking-wide uppercase text-ink-400">
                Skills to Focus On
              </p>
              <p className="text-xs text-ink-400">Hover a skill for details</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.recommendedSkills.map((skill, i) => (
                <SkillChip key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </section>

        <aside>
          <SessionCard
            course={course}
            onOpenProposal={onOpenProposal}
            onSuggestOrBookAnother={onSuggestOrBookAnother}
            onEditConfirmed={onEditConfirmed}
          />

          <div className="bg-surface border border-border rounded-2xl px-5 pt-4 pb-5 shadow-sm">
            <p className="text-xs font-bold tracking-wide uppercase text-ink-400 mb-3">
              Upcoming for this Course
            </p>
            <ul>
              {course.upcomingActivities.map((activity, i) => (
                <ActivityRow
                  key={activity.name}
                  activity={activity}
                  priority={course.priority}
                  isLast={i === course.upcomingActivities.length - 1}
                />
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
