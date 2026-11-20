import { CalendarDays, Flag, Pencil, Trash2 } from "lucide-react";

const TaskItem = ({ task, onDelete, onEdit }) => {
  const progress = Math.min(Math.max(Number(task.progress) || 0, 0), 100);

  const getStatusStyle = () => {
    switch (task.status) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

      case "In Progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  const getPriorityStyle = () => {
    switch (task.priority) {
      case "High":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  const getPriorityIconColor = () => {
    switch (task.priority) {
      case "High":
        return "text-red-500";

      case "Medium":
        return "text-yellow-500";

      case "Low":
        return "text-green-500";

      default:
        return "text-gray-500";
    }
  };

  const getProgressColor = () => {
    if (progress <= 30) {
      return "bg-red-500";
    }

    if (progress <= 70) {
      return "bg-yellow-500";
    }

    return "bg-green-500";
  };

  const getLocalDateString = (date) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const todayString = getLocalDateString(new Date());

  const isCompleted = task.status === "Completed";

  const isDueToday = !isCompleted && task.dueDate === todayString;

  const isOverdue =
    !isCompleted && Boolean(task.dueDate) && task.dueDate < todayString;

  const getDueDateStyle = () => {
    if (isOverdue) {
      return "text-red-600 dark:text-red-400";
    }

    if (isDueToday) {
      return "text-orange-600 dark:text-orange-400";
    }

    return "text-gray-500 dark:text-slate-400";
  };

  const formatDueDate = () => {
    if (!task.dueDate) {
      return "No due date";
    }

    const date = new Date(`${task.dueDate}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return task.dueDate;
    }

    return date.toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <article
      className="
        group

        rounded-2xl

        border
        border-gray-200
        dark:border-slate-800

        bg-white
        dark:bg-slate-900

        p-5

        shadow-sm

        transform-gpu

        transition-all
        duration-300
        ease-out

        hover:-translate-y-1
        hover:scale-[1.01]
        hover:border-blue-200
        hover:shadow-2xl
        hover:shadow-blue-500/10

        dark:hover:border-blue-800
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5

          lg:flex-row
          lg:justify-between
        "
      >
        {/* Content */}

        <div className="min-w-0 flex-1">
          <h3
            className="
              text-xl
              font-bold
              tracking-tight

              text-gray-800
              dark:text-white

              transition-colors
              duration-300

              group-hover:text-blue-600
              dark:group-hover:text-blue-400
            "
          >
            {task.title}
          </h3>

          <p
            className="
              mt-2

              leading-7

              text-gray-500
              dark:text-slate-400
            "
          >
            {task.description || "No description provided."}
          </p>

          {/* Tags */}

          <div
            className="
              mt-5

              flex
              flex-wrap
              gap-2
            "
          >
            <span
              className="
                rounded-full

                bg-blue-100
                dark:bg-blue-900/30

                px-3
                py-1

                text-xs
                font-semibold

                text-blue-700
                dark:text-blue-400

                transition-transform
                duration-300

                group-hover:scale-105
              "
            >
              {task.category}
            </span>

            <span
              className={`
                flex
                items-center
                gap-1

                rounded-full

                px-3
                py-1

                text-xs
                font-semibold

                transition-transform
                duration-300

                group-hover:scale-105

                ${getPriorityStyle()}
              `}
            >
              <Flag
                size={12}
                aria-hidden="true"
                className={getPriorityIconColor()}
              />

              {task.priority}
            </span>

            <span
              className={`
                rounded-full

                px-3
                py-1

                text-xs
                font-semibold

                transition-transform
                duration-300

                group-hover:scale-105

                ${getStatusStyle()}
              `}
            >
              {task.status}
            </span>
          </div>

          {/* Due Date */}

          <div
            className={`
              mt-5

              flex
              items-center
              gap-2

              text-sm
              font-medium

              ${getDueDateStyle()}
            `}
          >
            <CalendarDays
              size={16}
              aria-hidden="true"
              className="
                transition-transform
                duration-300

                group-hover:rotate-12
              "
            />

            <span>{formatDueDate()}</span>

            {isDueToday && (
              <span
                className="
                  rounded-full

                  bg-orange-100
                  dark:bg-orange-900/30

                  px-2
                  py-0.5

                  text-[10px]
                  font-bold
                  uppercase
                "
              >
                Due today
              </span>
            )}

            {isOverdue && (
              <span
                className="
                  rounded-full

                  bg-red-100
                  dark:bg-red-900/30

                  px-2
                  py-0.5

                  text-[10px]
                  font-bold
                  uppercase
                "
              >
                Overdue
              </span>
            )}
          </div>

          {/* Progress */}

          <div className="mt-6">
            <div
              className="
                mb-2

                flex
                justify-between

                text-sm

                text-gray-700
                dark:text-slate-300
              "
            >
              <span className="font-medium">Progress</span>

              <span className="font-semibold tabular-nums">{progress}%</span>
            </div>

            <div
              role="progressbar"
              aria-label={`${task.title} progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
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

                  transition-[width]
                  duration-1000
                  ease-out

                  ${getProgressColor()}
                `}
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-3

            lg:flex-col
            lg:items-end
          "
        >
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            title="Edit Task"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              bg-amber-50
              dark:bg-amber-900/30

              text-amber-600
              dark:text-amber-400

              transition-all
              duration-200

              hover:-translate-y-1
              hover:scale-110
              hover:bg-amber-100

              active:scale-95

              dark:hover:bg-amber-900/50
            "
          >
            <Pencil size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            title="Delete Task"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              bg-red-50
              dark:bg-red-900/30

              text-red-600
              dark:text-red-400

              transition-all
              duration-200

              hover:-translate-y-1
              hover:scale-110
              hover:bg-red-100

              active:scale-95

              dark:hover:bg-red-900/50
            "
          >
            <Trash2 size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskItem;
