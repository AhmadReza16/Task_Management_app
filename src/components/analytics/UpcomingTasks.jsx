import { useContext } from "react";

import { CalendarDays, Clock3, AlertTriangle } from "lucide-react";

import { TaskContext } from "../../context/task-context";

const UpcomingTasks = () => {
  const { tasks } = useContext(TaskContext);

  const today = new Date();

  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const parseLocalDate = (dateString) => {
    if (!dateString) return null;

    const [year, month, day] = dateString.split("-").map(Number);

    if (!year || !month || !day) {
      return null;
    }

    return new Date(year, month - 1, day);
  };

  const upcomingTasks = tasks
    .filter((task) => task.status !== "Completed")
    .sort((a, b) => {
      const dateA = parseLocalDate(a.dueDate);

      const dateB = parseLocalDate(b.dueDate);

      if (!dateA && !dateB) {
        return 0;
      }

      if (!dateA) return 1;

      if (!dateB) return -1;

      return dateA - dateB;
    })
    .slice(0, 5);

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";

      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  const getDueStatus = (dueDate) => {
    const due = parseLocalDate(dueDate);

    if (!due) {
      return {
        text: "No due date",
        color: "text-gray-500 dark:text-slate-400",
      };
    }

    const diff = Math.round((due - todayStart) / (1000 * 60 * 60 * 24));

    if (diff < 0) {
      return {
        text: "Overdue",
        color: "text-red-600 dark:text-red-400",
      };
    }

    if (diff === 0) {
      return {
        text: "Due Today",
        color: "text-orange-600 dark:text-orange-400",
      };
    }

    if (diff === 1) {
      return {
        text: "Due Tomorrow",
        color: "text-blue-600 dark:text-blue-400",
      };
    }

    return {
      text: `${diff} days left`,
      color: "text-gray-500 dark:text-slate-400",
    };
  };

  const getProgressColor = (progress) => {
    if (progress <= 30) {
      return "bg-red-500";
    }

    if (progress <= 70) {
      return "bg-yellow-500";
    }

    return "bg-green-500";
  };

  return (
    <section
      className="
        rounded-2xl

        border
        border-gray-200
        dark:border-slate-800

        bg-white
        dark:bg-slate-900

        p-5
        sm:p-6
        md:p-7

        shadow-sm

        transition-shadow
        duration-300

        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-xl

            bg-blue-100
            dark:bg-blue-900/40
          "
        >
          <Clock3
            size={20}
            aria-hidden="true"
            className="
              text-blue-600
              dark:text-blue-400
            "
          />
        </div>

        <div className="min-w-0">
          <h2
            className="
              text-lg
              font-bold

              text-gray-800
              dark:text-white
            "
          >
            Deadline Overview
          </h2>

          <p
            className="
              mt-0.5

              text-sm

              text-gray-500
              dark:text-slate-400
            "
          >
            Monitor overdue and upcoming tasks
          </p>
        </div>
      </div>

      {/* Content */}

      {upcomingTasks.length === 0 ? (
        <div
          className="
            flex
            min-h-60
            flex-col
            items-center
            justify-center

            rounded-xl

            border
            border-dashed
            border-gray-200
            dark:border-slate-700

            bg-gray-50
            dark:bg-slate-950

            px-6
            py-12

            text-center
          "
        >
          <div className="text-5xl">🎉</div>

          <h3
            className="
              mt-5

              text-lg
              font-semibold

              text-gray-700
              dark:text-slate-200
            "
          >
            All caught up!
          </h3>

          <p
            className="
              mt-2

              text-sm

              text-gray-500
              dark:text-slate-400
            "
          >
            No active deadlines.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingTasks.map((task) => {
            const due = getDueStatus(task.dueDate);

            const progress = Math.min(
              Math.max(Number(task.progress) || 0, 0),
              100,
            );

            return (
              <article
                key={task.id}
                className="
                    rounded-2xl

                    border
                    border-gray-200
                    dark:border-slate-700

                    bg-white
                    dark:bg-slate-800

                    p-4
                    sm:p-5

                    shadow-sm

                    transition-shadow
                    duration-200

                    hover:shadow-lg
                  "
              >
                {/* Top */}

                <div
                  className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                >
                  <div className="min-w-0 flex-1">
                    <h3
                      className="
                          truncate

                          font-bold

                          text-gray-800
                          dark:text-white
                        "
                    >
                      {task.title}
                    </h3>

                    <p
                      className="
                          mt-2

                          text-sm

                          text-gray-500
                          dark:text-slate-400
                        "
                    >
                      {task.category}
                    </p>
                  </div>

                  <span
                    className={`
                        shrink-0

                        rounded-full

                        px-3
                        py-1

                        text-xs
                        font-semibold

                        ${getPriorityStyle(task.priority)}
                      `}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* Due Date */}

                <div
                  className="
                      mt-5

                      flex
                      flex-col
                      gap-2

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                >
                  <div
                    className="
                        flex
                        items-center
                        gap-2

                        text-sm
                      "
                  >
                    <CalendarDays
                      size={16}
                      aria-hidden="true"
                      className="
                          shrink-0

                          text-blue-600
                          dark:text-blue-400
                        "
                    />

                    <span
                      className="
                          text-gray-500
                          dark:text-slate-400
                        "
                    >
                      {task.dueDate || "No due date"}
                    </span>
                  </div>

                  <span
                    className={`
                        text-sm
                        font-semibold

                        ${due.color}
                      `}
                  >
                    {due.text}
                  </span>
                </div>

                {/* Progress */}

                <div className="mt-4">
                  <div
                    className="
                        mb-2

                        flex
                        justify-between

                        text-xs
                      "
                  >
                    <span
                      className="
                          text-gray-500
                          dark:text-slate-400
                        "
                    >
                      Progress
                    </span>

                    <span
                      className="
                          font-semibold
                          tabular-nums

                          text-gray-700
                          dark:text-slate-200
                        "
                    >
                      {progress}%
                    </span>
                  </div>

                  <div
                    role="progressbar"
                    aria-label={`${task.title} progress`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                    className="
                        h-2

                        overflow-hidden

                        rounded-full

                        bg-gray-200
                        dark:bg-slate-700
                      "
                  >
                    <div
                      className={`
                          h-full

                          rounded-full

                          transition-[width]
                          duration-700
                          ease-out

                          ${getProgressColor(progress)}
                        `}
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Overdue */}

                {due.text === "Overdue" && (
                  <div
                    className="
                        mt-4

                        flex
                        items-center
                        gap-2

                        text-sm
                        font-medium

                        text-red-600
                        dark:text-red-400
                      "
                  >
                    <AlertTriangle size={16} aria-hidden="true" />
                    This task is overdue.
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default UpcomingTasks;
