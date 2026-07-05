import CourseCard from "./CourseCard";
import ActivityRow from "./ActivityRow";
import { PRIORITY_RANK, student } from "../mockData";

export default function Dashboard({ courses, onSelectCourse }) {
  const sortedCourses = [...courses].sort(
    (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
  );

  const allActivities = courses
    .flatMap((course) =>
      course.upcomingActivities.map((activity) => ({
        ...activity,
        courseName: course.name,
        priority: course.priority,
      }))
    )
    .sort((a, b) => {
      const rankDiff = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      if (rankDiff !== 0) return rankDiff;
      return a.dueDate.localeCompare(b.dueDate);
    });

  return (
    <div className="view max-w-[1180px] mx-auto px-10 pt-9 pb-16">
      <div className="mb-7">
        <p className="text-xs font-semibold tracking-wide uppercase text-brand-600 mb-1.5">Dashboard</p>
        <h1 className="text-3xl font-bold">Welcome back, {student.name.split(" ")[0]}</h1>
        <p className="text-ink-600 mt-1.5 text-sm max-w-[60ch]">
          Here's where things stand across your courses — click any course to see your performance
          breakdown and recommended focus areas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-7 items-start">
        <section>
          <p className="text-xs font-bold tracking-wide uppercase text-ink-400 mb-3.5">Your Courses</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} onSelect={onSelectCourse} />
            ))}
          </div>
        </section>

        <aside className="bg-surface border border-border rounded-2xl px-5 pt-4 pb-5 shadow-sm">
          <p className="text-xs font-bold tracking-wide uppercase text-ink-400 mb-3">
            Upcoming Activities
          </p>
          <ul>
            {allActivities.map((activity, i) => (
              <ActivityRow
                key={`${activity.courseName}-${activity.name}`}
                activity={activity}
                courseName={activity.courseName}
                priority={activity.priority}
                isLast={i === allActivities.length - 1}
              />
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
