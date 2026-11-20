import { useContext } from "react";
import { Flag } from "lucide-react";

import { TaskContext } from "../../context/task-context";

const PriorityChart = () => {
  const { tasks } = useContext(TaskContext);

  const high = tasks.filter((task) => task.priority === "High").length;

  const medium = tasks.filter((task) => task.priority === "Medium").length;

  const low = tasks.filter((task) => task.priority === "Low").length;

  const total = tasks.length;

  const priorities = [
    {
      label: "High",
      value: high,
      color: "from-red-400 to-red-600",
    },
    {
      label: "Medium",
      value: medium,
      color: "from-yellow-400 to-yellow-500",
    },
    {
      label: "Low",
      value: low,
      color: "from-green-400 to-green-600",
    },
  ];

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
            dark:bg-blue-900/30
          "
        >
          <Flag
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
            Priority Distribution
          </h2>

          <p
            className="
              mt-0.5

              text-sm

              text-gray-500
              dark:text-slate-400
            "
          >
            Breakdown of task priorities
          </p>
        </div>
      </div>

      {/* Content */}

      {total === 0 ? (
        <div
          className="
            flex
            min-h-55
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

            text-center
            text-sm

            text-gray-500
            dark:text-slate-400
          "
        >
          No tasks available.
        </div>
      ) : (
        <div className="space-y-6">
          {priorities.map((priority) => {
            const percentage = Math.round((priority.value / total) * 100);

            return (
              <div key={priority.label}>
                <div
                  className="
                      mb-2

                      flex
                      flex-col
                      gap-1.5

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                >
                  <span
                    className="
                        font-semibold

                        text-gray-700
                        dark:text-slate-200
                      "
                  >
                    {priority.label}
                  </span>

                  <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4

                        sm:justify-end
                      "
                  >
                    <span
                      className="
                          text-sm

                          text-gray-600
                          dark:text-slate-300
                        "
                    >
                      {priority.value} Task
                      {priority.value !== 1 && "s"}
                    </span>

                    <span
                      className="
                          w-11
                          text-right

                          font-bold
                          tabular-nums

                          text-gray-700
                          dark:text-slate-200
                        "
                    >
                      {percentage}%
                    </span>
                  </div>
                </div>

                <div
                  role="progressbar"
                  aria-label={`${priority.label} priority tasks`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percentage}
                  className="
                      h-3

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

                        bg-linear-to-r

                        transition-[width]
                        duration-700
                        ease-out

                        ${priority.color}
                      `}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PriorityChart;
