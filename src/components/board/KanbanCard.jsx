import { Draggable } from "@hello-pangea/dnd";

import { CalendarDays, Flag, CheckCircle } from "lucide-react";

const KanbanCard = ({ task, index }) => {
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

  const getBorderColor = () => {
    switch (task.priority) {
      case "High":
        return "border-red-500";

      case "Medium":
        return "border-yellow-500";

      case "Low":
        return "border-green-500";

      default:
        return "border-gray-300 dark:border-slate-700";
    }
  };

  const getProgressColor = () => {
    if (task.progress <= 30) {
      return "bg-red-500";
    }

    if (task.progress <= 70) {
      return "bg-yellow-500";
    }

    return "bg-green-500";
  };

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          className={`
            group
            relative
            overflow-hidden

            rounded-2xl

            border
            border-l-4
            ${getBorderColor()}

            bg-white/95
            dark:bg-slate-900/95

            backdrop-blur-md

            transition-[box-shadow,border-color,background-color]
            duration-300

            select-none

            ${
              snapshot.isDragging
                ? `
                    shadow-2xl

                    ring-2
                    ring-blue-400

                    cursor-grabbing

                    z-50
                  `
                : `
                    shadow-sm

                    hover:shadow-xl

                    cursor-grab
                  `
            }
          `}
        >
          {/* Top Gradient */}

          <div
            className="
              absolute
              inset-x-0
              top-0

              h-1

              bg-gradient-to-r
              from-blue-500
              to-cyan-400
            "
          />

          <div className="p-5">
            {/* Header */}

            <div className="flex items-start justify-between">
              <h3
                className="
                  text-lg
                  font-bold
                  leading-6

                  text-gray-800
                  dark:text-white
                "
              >
                {task.title}
              </h3>
            </div>

            {/* Description */}

            <p
              className="
                mt-3

                text-sm
                leading-6

                text-gray-500
                dark:text-slate-400

                line-clamp-3
              "
            >
              {task.description}
            </p>

            {/* Tags */}

            <div className="mt-5 flex flex-wrap gap-2">
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

                  ${getPriorityStyle()}
                `}
              >
                <Flag size={12} className={getPriorityIconColor()} />

                {task.priority}
              </span>
            </div>

            {/* Divider */}

            <div className="my-5 border-t border-gray-100 dark:border-slate-700" />

            {/* Footer */}

            <div
              className="
                flex
                items-center
                justify-between

                text-sm
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2

                  text-gray-500
                  dark:text-slate-400
                "
              >
                <CalendarDays size={15} />

                <span>{task.dueDate}</span>
              </div>

              <span className="font-semibold text-gray-700 dark:text-slate-300">
                {task.progress}%
              </span>
            </div>

            {/* Progress */}

            <div className="mt-4">
              <div
                className="
                  h-2.5

                  overflow-hidden

                  rounded-full

                  bg-gray-200
                  dark:bg-slate-700
                "
              >
                <div
                  className={`
                    relative

                    h-full

                    rounded-full

                    ${getProgressColor()}

                    transition-all
                    duration-700
                  `}
                  style={{
                    width: `${task.progress}%`,
                  }}
                >
                  <div
                    className="
                      absolute
                      inset-0

                      bg-gradient-to-r
                      from-transparent
                      via-white/40
                      to-transparent

                      -translate-x-full

                      group-hover:translate-x-full

                      transition-transform
                      duration-1000
                    "
                  />
                </div>
              </div>
            </div>

            {/* Completed Badge */}

            {task.progress === 100 && (
              <div
                className="
                  mt-4

                  flex
                  items-center
                  gap-2

                  text-sm
                  font-medium

                  text-green-600
                  dark:text-green-400
                "
              >
                <CheckCircle size={16} />
                Task Completed
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
