import { useContext } from "react";

import { SettingsContext } from "../../context/settings-context";

const CalendarDay = ({ day, currentMonth, tasks, onClick }) => {
  const { highlightToday } = useContext(SettingsContext);

  const today = new Date();

  const isToday = currentMonth && day === today.getDate();

  /* =====================================
     Task States
  ===================================== */

  const hasOverdueTask = tasks.some((task) => {
    if (task.status === "Completed") {
      return false;
    }

    const due = new Date(task.dueDate);

    return due < today && !isToday;
  });

  const hasDueToday = tasks.some(
    (task) => task.status !== "Completed" && isToday,
  );

  /* =====================================
     Priority Color
  ===================================== */

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";

      case "Medium":
        return "bg-yellow-500";

      case "Low":
        return "bg-green-500";

      default:
        return "bg-gray-400";
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!currentMonth}
      aria-label={
        currentMonth
          ? `${day}, ${tasks.length} task${tasks.length === 1 ? "" : "s"}`
          : undefined
      }
      className={`
        relative

        flex
        w-full
        min-w-0
        flex-col

        overflow-hidden

        bg-white
        dark:bg-slate-900

        p-1.5

        text-left

        transition-all
        duration-300

        min-h-[68px]

        sm:min-h-[105px]
        sm:p-2.5

        lg:min-h-[125px]
        lg:p-3

        ${
          currentMonth
            ? `
              cursor-pointer

              hover:bg-blue-50
              dark:hover:bg-slate-800

              sm:hover:-translate-y-0.5
              sm:hover:shadow-md
            `
            : `
              cursor-default

              bg-gray-50
              dark:bg-slate-950

              text-gray-400
              dark:text-slate-600
            `
        }

        ${
          highlightToday && isToday
            ? `
              bg-blue-50
              ring-2
              ring-inset
              ring-blue-500

              dark:bg-blue-900/20
            `
            : ""
        }

        ${
          hasOverdueTask
            ? `
              ring-1
              ring-inset
              ring-red-400
            `
            : ""
        }
      `}
    >
      {/* =====================================
          Day Header
      ===================================== */}

      <div
        className="
          flex
          w-full
          min-w-0
          items-center
          justify-between
          gap-1
        "
      >
        {/* Day Number */}

        <span
          className={`
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center

            rounded-full

            text-[11px]
            font-bold

            sm:h-8
            sm:w-8
            sm:text-sm

            ${
              highlightToday && isToday
                ? `
                  bg-blue-600
                  text-white
                `
                : currentMonth
                  ? `
                    text-gray-800
                    dark:text-white
                  `
                  : `
                    text-gray-400
                    dark:text-slate-600
                  `
            }
          `}
        >
          {day}
        </span>

        {/* Due Today Label */}

        {hasDueToday && (
          <span
            className="
              hidden

              text-[9px]
              font-semibold

              text-red-600
              dark:text-red-400

              sm:inline
            "
          >
            TODAY
          </span>
        )}
      </div>

      {/* =====================================
          Mobile Task Indicators
      ===================================== */}

      {currentMonth && tasks.length > 0 && (
        <div
          className="
              mt-auto

              flex
              min-w-0
              items-center
              gap-1

              pt-1

              sm:hidden
            "
        >
          {tasks.slice(0, 3).map((task) => (
            <span
              key={task.id}
              aria-hidden="true"
              className={`
                    h-1.5
                    w-1.5
                    shrink-0

                    rounded-full

                    ${getPriorityColor(task.priority)}
                  `}
            />
          ))}

          {tasks.length > 3 && (
            <span
              className="
                  truncate

                  text-[9px]
                  font-semibold

                  text-gray-500
                  dark:text-slate-400
                "
            >
              +{tasks.length - 3}
            </span>
          )}
        </div>
      )}

      {/* =====================================
          Tablet / Desktop Task Preview
      ===================================== */}

      {tasks.length > 0 && (
        <div
          className="
            mt-auto
            hidden

            min-w-0

            space-y-1.5

            pt-2

            sm:block
          "
        >
          {tasks.slice(0, 2).map((task) => (
            <div
              key={task.id}
              className="
                  flex
                  min-w-0
                  items-center
                  gap-2

                  overflow-hidden

                  rounded-lg

                  bg-gray-100
                  dark:bg-slate-700

                  px-2
                  py-1
                "
            >
              <span
                aria-hidden="true"
                className={`
                    h-2
                    w-2
                    shrink-0

                    rounded-full

                    ${getPriorityColor(task.priority)}
                  `}
              />

              <span
                className="
                    min-w-0
                    flex-1

                    truncate

                    text-[10px]
                    font-medium

                    text-gray-700
                    dark:text-slate-200

                    lg:text-xs
                  "
              >
                {task.title}
              </span>
            </div>
          ))}

          {tasks.length > 2 && (
            <div
              className="
                inline-flex
                w-fit

                items-center
                justify-center

                rounded-full

                bg-blue-100
                dark:bg-blue-900/40

                px-2
                py-0.5

                text-[10px]
                font-semibold

                text-blue-700
                dark:text-blue-300
              "
            >
              +{tasks.length - 2} more
            </div>
          )}
        </div>
      )}
    </button>
  );
};

export default CalendarDay;
