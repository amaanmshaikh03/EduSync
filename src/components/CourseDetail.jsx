import { useEffect, useState } from "react";
import { ArrowLeft, BarChart3, Target, ListChecks, TrendingUp, TrendingDown, Minus } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import SkillChip from "./SkillChip";
import SkillDetailPanel from "./SkillDetailPanel";
import SessionCard from "./SessionCard";
import ActivityRow from "./ActivityRow";
import { PRIORITY_STYLES, PRIORITY_ICONS } from "../mockData";

function SectionLabel({ icon: Icon, children, trailing }) {
  return (
    <div className="flex items-baseline justify-between mb-4">
      <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-ink-400">
        <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
        {children}
      </p>
      {trailing}
    </div>
  );
}

function TrendIndicator({ performance }) {
  const delta = performance[performance.length - 1].grade - performance[0].grade;
  const Icon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
  const tone = delta > 0 ? "text-excellent-text" : delta < 0 ? "text-urgent-text" : "text-ink-400";

  return (
    <p className={`inline-flex items-center gap-1 text-xs font-bold ${tone}`}>
      <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
      {delta === 0 ? "No change" : `${delta > 0 ? "+" : ""}${delta} pts since Assignment 1`}
    </p>
  );
}

function PerformanceTable({ course }) {
  const style = PRIORITY_STYLES[course.priority];

  return (
    <div className="bg-surface border border-border rounded-3xl px-6 py-5 mb-5 shadow-[var(--shadow-card)]">
      <SectionLabel icon={BarChart3} trailing={<TrendIndicator performance={course.performance} />}>
        Past Performance
      </SectionLabel>
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
            <tr
              key={entry.activity}
              className={`transition-colors hover:bg-surface-alt ${
                i === course.performance.length - 1 ? "" : "border-b border-border"
              }`}
            >
              <td className="py-3 pl-1 text-sm font-semibold rounded-l-lg">{entry.activity}</td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tabular-nums w-9">{entry.grade}%</span>
                  <div className="flex-1 h-2 rounded-full bg-surface-alt overflow-hidden min-w-[60px]">
                    <div
                      className={`h-full rounded-full ${style.dot}`}
                      style={{ width: `${entry.grade}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="py-3 pr-1 text-sm text-ink-600 rounded-r-lg">{entry.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CourseDetail({
  course,
  onBack,
  onOpenProposal,
  onSuggestOrBookAnother,
  onEditConfirmed,
  onDeleteConfirmed,
}) {
  const style = PRIORITY_STYLES[course.priority];
  const Icon = PRIORITY_ICONS[course.priority];
  const [openSkillIndex, setOpenSkillIndex] = useState(null);
  const selectedSkill = openSkillIndex !== null ? course.recommendedSkills[openSkillIndex] : null;

  useEffect(() => {
    if (openSkillIndex === null) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") setOpenSkillIndex(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openSkillIndex]);

  return (
    <div className="view max-w-[1180px] mx-auto px-10 pt-9 pb-16">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-brand-600 font-semibold text-sm mb-4 hover:gap-2 transition-all"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
        Back to Dashboard
      </button>

      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-[27px] font-bold">{course.name}</h1>
          <p className="text-ink-400 text-sm mt-1">{course.code}</p>
        </div>
        <PriorityBadge priority={course.priority} size="lg" />
      </div>

      <div className={`flex items-start gap-3 rounded-2xl px-[18px] py-3.5 mb-7 border ${style.bg} ${style.border}`}>
        <span className={`flex-shrink-0 mt-0.5 ${style.text}`}>
          <Icon className="w-4 h-4" strokeWidth={2.5} />
        </span>
        <p className={`text-sm leading-snug ${style.text}`}>{course.summary}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-7 items-start">
        <section>
          <PerformanceTable course={course} />

          <div className="bg-surface border border-border rounded-3xl px-6 py-5 shadow-[var(--shadow-card)]">
            <SectionLabel
              icon={Target}
              trailing={<p className="text-xs text-ink-400">Click a skill for details</p>}
            >
              Skills to Focus On
            </SectionLabel>
            <div className="flex flex-wrap gap-2">
              {course.recommendedSkills.map((skill, i) => (
                <SkillChip
                  key={skill.name}
                  skill={skill}
                  index={i}
                  isOpen={openSkillIndex === i}
                  onOpen={() => setOpenSkillIndex(i)}
                  onClose={() => setOpenSkillIndex(null)}
                />
              ))}
            </div>

            {selectedSkill && (
              <SkillDetailPanel
                key={selectedSkill.name}
                skill={selectedSkill}
                onClose={() => setOpenSkillIndex(null)}
              />
            )}
          </div>
        </section>

        <aside>
          <SessionCard
            course={course}
            onOpenProposal={onOpenProposal}
            onSuggestOrBookAnother={onSuggestOrBookAnother}
            onEditConfirmed={onEditConfirmed}
            onDeleteConfirmed={onDeleteConfirmed}
          />

          <div className="bg-surface border border-border rounded-3xl px-5 pt-4 pb-5 shadow-[var(--shadow-card)]">
            <SectionLabel icon={ListChecks}>Upcoming for this Course</SectionLabel>
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
