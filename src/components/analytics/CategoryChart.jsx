import { useContext } from "react";
import { FolderKanban } from "lucide-react";

import { TaskContext } from "../../context/task-context";

const CategoryChart = () => {
  const { tasks } = useContext(TaskContext);

  const categoryCounts = tasks.reduce((acc, task) => {
    const category = task.category || "Uncategorized";

    acc[category] = (acc[category] || 0) + 1;

    return acc;
  }, {});

  const totalTasks = tasks.length;

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

            bg-indigo-100
            dark:bg-indigo-900/30
          "
        >
          <FolderKanban
            size={20}
            aria-hidden="true"
            className="
              text-indigo-600
              dark:text-indigo-400
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
            Category Distribution
          </h2>

          <p
            className="
              mt-0.5

              text-sm

              text-gray-500
              dark:text-slate-400
            "
          >
            Tasks grouped by category
          </p>
        </div>
      </div>

      {/* Content */}

      {totalTasks === 0 ? (
        <div
          className="
            flex
            min-h-[220px]
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
          No task data available.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(categoryCounts).map(([category, count]) => {
            const percentage = Math.round((count / totalTasks) * 100);

            return (
              <div key={category}>
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
                    {category}
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
                      {count} Task
                      {count !== 1 && "s"}
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
                  aria-label={`${category} category tasks`}
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
                    className="
                        h-full

                        rounded-full

                        bg-gradient-to-r
                        from-indigo-400
                        to-indigo-600

                        transition-[width]
                        duration-700
                        ease-out
                      "
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

export default CategoryChart;
