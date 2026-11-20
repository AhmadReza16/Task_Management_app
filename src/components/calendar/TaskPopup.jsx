import { CalendarDays, CheckCircle2, Clock3, Flag, X } from "lucide-react";

const TaskPopup = ({ isOpen, onClose, selectedDate, tasks = [] }) => {
  if (!isOpen) return null;

  const formatDate = (date) => {
    if (!date) {
      return "Selected Date";
    }

    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "High":
        return `
          bg-red-50
          text-red-600

          dark:bg-red-900/20
          dark:text-red-400
        `;

      case "Medium":
        return `
          bg-yellow-50
          text-yellow-700

          dark:bg-yellow-900/20
          dark:text-yellow-400
        `;

      case "Low":
        return `
          bg-green-50
          text-green-600

          dark:bg-green-900/20
          dark:text-green-400
        `;

      default:
        return `
          bg-gray-100
          text-gray-600

          dark:bg-slate-800
          dark:text-slate-300
        `;
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed":
        return `
          bg-green-50
          text-green-600

          dark:bg-green-900/20
          dark:text-green-400
        `;

      case "In Progress":
        return `
          bg-blue-50
          text-blue-600

          dark:bg-blue-900/20
          dark:text-blue-400
        `;

      default:
        return `
          bg-orange-50
          text-orange-600

          dark:bg-orange-900/20
          dark:text-orange-400
        `;
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[70]

        flex
        items-center
        justify-center

        bg-black/50

        p-4

        backdrop-blur-sm

        sm:p-6
      "
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-task-popup-title"
        className="
          flex
          w-full
          max-w-lg
          flex-col

          overflow-hidden

          rounded-3xl

          border
          border-gray-200
          dark:border-slate-700

          bg-white
          dark:bg-slate-900

          shadow-2xl

          animate-pop

          max-h-[calc(100dvh-2rem)]

          sm:max-h-[calc(100dvh-3rem)]
        "
      >
        {/* Header */}

        <div
          className="
            relative
            shrink-0
            overflow-hidden

            bg-gradient-to-r
            from-blue-600
            to-cyan-500

            px-5
            py-5

            sm:px-6
            sm:py-6
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              -right-10
              -top-12

              h-32
              w-32

              rounded-full

              bg-white/10
            "
          />

          <div
            className="
              relative

              flex
              min-w-0
              items-start
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center

                rounded-xl

                bg-white/15

                backdrop-blur-sm
              "
            >
              <CalendarDays
                size={22}
                aria-hidden="true"
                className="text-white"
              />
            </div>

            <div
              className="
                min-w-0
                flex-1
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider

                  text-blue-100
                "
              >
                Tasks Scheduled
              </p>

              <h2
                id="calendar-task-popup-title"
                className="
                  mt-1

                  break-words

                  text-lg
                  font-bold

                  text-white

                  sm:text-xl
                "
              >
                {formatDate(selectedDate)}
              </h2>
            </div>

            {/* Close */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close task popup"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-xl

                bg-white/10

                text-white

                transition-all
                duration-200

                hover:bg-white/20

                active:scale-95
              "
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Task Count */}

        <div
          className="
            shrink-0

            border-b
            border-gray-200
            dark:border-slate-800

            px-5
            py-3

            sm:px-6
          "
        >
          <p
            className="
              text-sm

              text-gray-500
              dark:text-slate-400
            "
          >
            <span
              className="
                font-semibold

                text-gray-800
                dark:text-white
              "
            >
              {tasks.length}
            </span>{" "}
            task
            {tasks.length !== 1 ? "s" : ""} scheduled for this day
          </p>
        </div>

        {/* Scrollable Content */}

        <div
          className="
            min-h-0
            flex-1

            overflow-y-auto
            overscroll-contain

            p-4

            sm:p-5
          "
        >
          {tasks.length === 0 ? (
            <div
              className="
                flex
                min-h-[240px]
                flex-col
                items-center
                justify-center

                px-4
                py-10

                text-center
              "
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center

                  rounded-2xl

                  bg-blue-50
                  dark:bg-blue-900/20
                "
              >
                <CalendarDays
                  size={30}
                  aria-hidden="true"
                  className="
                    text-blue-500
                    dark:text-blue-400
                  "
                />
              </div>

              <h3
                className="
                  mt-4

                  font-semibold

                  text-gray-800
                  dark:text-white
                "
              >
                No tasks scheduled
              </h3>

              <p
                className="
                  mt-2
                  max-w-xs

                  text-sm
                  leading-6

                  text-gray-500
                  dark:text-slate-400
                "
              >
                There are no tasks scheduled for this date.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <article
                  key={task.id}
                  className="
                    min-w-0

                    rounded-2xl

                    border
                    border-gray-200
                    dark:border-slate-700

                    bg-gray-50/70
                    dark:bg-slate-800/60

                    p-4

                    transition-all
                    duration-200

                    hover:border-blue-200
                    hover:bg-blue-50/50
                    hover:shadow-sm

                    dark:hover:border-blue-900
                    dark:hover:bg-slate-800
                  "
                >
                  {/* Title */}

                  <div
                    className="
                      flex
                      min-w-0
                      items-start
                      justify-between
                      gap-3
                    "
                  >
                    <h3
                      className="
                        min-w-0
                        flex-1

                        break-words

                        font-semibold
                        leading-6

                        text-gray-800
                        dark:text-white
                      "
                    >
                      {task.title}
                    </h3>

                    {task.status === "Completed" && (
                      <CheckCircle2
                        size={19}
                        aria-label="Completed"
                        className="
                          mt-0.5
                          shrink-0

                          text-green-500
                        "
                      />
                    )}
                  </div>

                  {/* Description */}

                  {task.description && (
                    <p
                      className="
                        mt-2

                        break-words

                        text-sm
                        leading-6

                        text-gray-500
                        dark:text-slate-400
                      "
                    >
                      {task.description}
                    </p>
                  )}

                  {/* Metadata */}

                  <div
                    className="
                      mt-4

                      flex
                      flex-wrap
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1.5

                        rounded-full

                        px-2.5
                        py-1

                        text-xs
                        font-semibold

                        ${getPriorityStyles(task.priority)}
                      `}
                    >
                      <Flag size={12} aria-hidden="true" />

                      {task.priority}
                    </span>

                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1.5

                        rounded-full

                        px-2.5
                        py-1

                        text-xs
                        font-semibold

                        ${getStatusStyles(task.status)}
                      `}
                    >
                      <Clock3 size={12} aria-hidden="true" />

                      {task.status}
                    </span>

                    {task.category && (
                      <span
                        className="
                          inline-flex
                          max-w-full
                          items-center

                          rounded-full

                          bg-purple-50
                          dark:bg-purple-900/20

                          px-2.5
                          py-1

                          text-xs
                          font-semibold

                          text-purple-600
                          dark:text-purple-400
                        "
                      >
                        <span className="truncate">{task.category}</span>
                      </span>
                    )}
                  </div>

                  {/* Progress */}

                  <div className="mt-4">
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      <span
                        className="
                          text-xs
                          font-medium

                          text-gray-500
                          dark:text-slate-400
                        "
                      >
                        Progress
                      </span>

                      <span
                        className="
                          text-xs
                          font-bold

                          text-blue-600
                          dark:text-blue-400
                        "
                      >
                        {Number(task.progress) || 0}%
                      </span>
                    </div>

                    <div
                      className="
                        mt-2
                        h-2

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
                          from-blue-600
                          to-cyan-500

                          transition-[width]
                          duration-500
                        "
                        style={{
                          width: `${Math.min(
                            Math.max(Number(task.progress) || 0, 0),
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
