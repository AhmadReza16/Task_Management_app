import { useContext } from "react";

import {
  CheckCircle,
  Clock3,
  ListTodo,
  LoaderCircle,
  TrendingUp,
  AlertTriangle,
  CalendarClock,
  Activity,
} from "lucide-react";

import PriorityChart from "../components/analytics/PriorityChart";
import CategoryChart from "../components/analytics/CategoryChart";
import UpcomingTasks from "../components/analytics/UpcomingTasks";
import StatsCard from "../components/analytics/StatsCard";

import FadeIn from "../components/animations/FadeIn";
import StaggerContainer from "../components/animations/StaggerContainer";
import StaggerItem from "../components/animations/StaggerItem";

import EmptyState from "../components/common/EmptyState";

import { TaskContext } from "../context/task-context";

const Analytics = () => {
  const { tasks } = useContext(TaskContext);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const getLocalDateString = (date = new Date()) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getLocalDateString();

  const dueToday = tasks.filter(
    (task) => task.status !== "Completed" && task.dueDate === today,
  ).length;

  const overdueTasks = tasks.filter((task) => {
    if (task.status === "Completed") {
      return false;
    }

    return task.dueDate && task.dueDate < today;
  }).length;

  const averageProgress =
    totalTasks === 0
      ? 0
      : Math.round(
          tasks.reduce((sum, task) => sum + (Number(task.progress) || 0), 0) /
            totalTasks,
        );

  const productivityScore = Math.round((completionRate + averageProgress) / 2);

  const getMessage = () => {
    if (completionRate >= 80) {
      return "Excellent! You're ahead of schedule.";
    }

    if (completionRate >= 60) {
      return "Great progress. Keep the momentum going.";
    }

    if (completionRate >= 30) {
      return "You're making steady progress.";
    }

    return "Let's get started and complete some tasks!";
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <FadeIn>
        <section
          className="
            flex
            flex-col
            gap-3
          "
        >
          <span
            className="
              inline-flex
              w-fit
              items-center

              rounded-full

              bg-blue-100
              dark:bg-blue-900/30

              px-4
              py-1

              text-sm
              font-semibold

              text-blue-700
              dark:text-blue-300
            "
          >
            📈 Productivity Insights
          </span>

          <h1
            className="
              text-4xl
              md:text-5xl

              font-bold
              tracking-tight

              text-gray-800
              dark:text-white
            "
          >
            Analytics
          </h1>

          <p
            className="
              max-w-2xl

              text-base
              md:text-lg

              leading-7

              text-gray-500
              dark:text-slate-400
            "
          >
            Measure productivity, monitor task progress, and understand how your
            work is moving over time.
          </p>
        </section>
      </FadeIn>

      {/* KPI Cards */}

      <FadeIn delay={0.1}>
        <StaggerContainer
          className="
            grid
            grid-cols-1

            gap-6

            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <StaggerItem>
            <StatsCard
              title="Total Tasks"
              value={totalTasks}
              color="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
              icon={<ListTodo size={26} />}
            />
          </StaggerItem>

          <StaggerItem>
            <StatsCard
              title="Completed"
              value={completedTasks}
              color="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
              icon={<CheckCircle size={26} />}
            />
          </StaggerItem>

          <StaggerItem>
            <StatsCard
              title="Pending"
              value={pendingTasks}
              color="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400"
              icon={<Clock3 size={26} />}
            />
          </StaggerItem>

          <StaggerItem>
            <StatsCard
              title="In Progress"
              value={inProgressTasks}
              color="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400"
              icon={<LoaderCircle size={26} />}
            />
          </StaggerItem>

          <StaggerItem>
            <StatsCard
              title="Due Today"
              value={dueToday}
              color="bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400"
              icon={<CalendarClock size={26} />}
            />
          </StaggerItem>

          <StaggerItem>
            <StatsCard
              title="Overdue"
              value={overdueTasks}
              color="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"
              icon={<AlertTriangle size={26} />}
            />
          </StaggerItem>

          <StaggerItem>
            <StatsCard
              title="Average Progress"
              value={`${averageProgress}%`}
              color="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
              icon={<TrendingUp size={26} />}
            />
          </StaggerItem>

          <StaggerItem>
            <StatsCard
              title="Productivity"
              value={`${productivityScore}/100`}
              color="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400"
              icon={<Activity size={26} />}
            />
          </StaggerItem>
        </StaggerContainer>
      </FadeIn>

      {/* Completion Rate */}

      <FadeIn delay={0.2}>
        <section
          className="
            rounded-2xl

            border
            border-gray-200
            dark:border-slate-700

            bg-white
            dark:bg-slate-900

            p-6
            md:p-8

            shadow-sm

            transition-shadow
            duration-300

            hover:shadow-lg
          "
        >
          <div
            className="
              mb-8

              flex
              flex-col
              gap-6

              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <div className="mb-2 flex items-center gap-3">
                <TrendingUp
                  size={24}
                  className="
                    text-blue-600
                    dark:text-blue-400
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-bold

                    text-gray-800
                    dark:text-white
                  "
                >
                  Completion Rate
                </h2>
              </div>

              <p
                className="
                  text-gray-500
                  dark:text-slate-400
                "
              >
                {getMessage()}
              </p>

              <p
                className="
                  mt-2

                  text-sm

                  text-gray-400
                  dark:text-slate-500
                "
              >
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>

            <div className="text-left md:text-right">
              <div
                className="
                  text-5xl
                  font-bold

                  text-blue-600
                  dark:text-blue-400
                "
              >
                {completionRate}%
              </div>

              <p
                className="
                  mt-1

                  text-sm

                  text-gray-500
                  dark:text-slate-400
                "
              >
                Overall Progress
              </p>
            </div>
          </div>

          <div
            role="progressbar"
            aria-label="Overall task completion rate"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={completionRate}
            className="
              h-4
              w-full

              overflow-hidden

              rounded-full

              bg-gray-200
              dark:bg-slate-700
            "
          >
            <div
              className="
                h-full

                rounded-full

                bg-gradient-to-r
                from-blue-500
                via-cyan-500
                to-blue-600

                transition-[width]
                duration-1000
                ease-out
              "
              style={{
                width: `${completionRate}%`,
              }}
            />
          </div>
        </section>
      </FadeIn>

      {/* Empty Analytics */}

      {totalTasks === 0 ? (
        <FadeIn delay={0.3}>
          <EmptyState
            icon="📊"
            title="No Analytics Available"
            description="Create a few tasks to unlock productivity insights, charts and performance tracking."
          />
        </FadeIn>
      ) : (
        <>
          {/* Charts */}

          <FadeIn delay={0.3}>
            <section
              className="
                grid
                grid-cols-1
                gap-6

                xl:grid-cols-2
              "
            >
              <PriorityChart />

              <CategoryChart />
            </section>
          </FadeIn>

          {/* Upcoming Tasks */}

          <FadeIn delay={0.45}>
            <section>
              <UpcomingTasks />
            </section>
          </FadeIn>
        </>
      )}
    </div>
  );
};

export default Analytics;
