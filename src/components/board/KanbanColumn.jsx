import { Droppable } from "@hello-pangea/dnd";
import KanbanCard from "./KanbanCard";

const KanbanColumn = ({ id, title, tasks, headerColor }) => {
  return (
    <div
      className="
        group

        flex
        flex-col

        h-[calc(100vh-240px)]
        min-h-[650px]

        rounded-3xl

        bg-white
        dark:bg-slate-900

        border
        border-gray-200
        dark:border-slate-800

        shadow-sm

        hover:shadow-xl

        transition-all
        duration-300

        animate-in
        fade-in
        slide-in-from-bottom-4
      "
    >
      {/* Header */}

      <div
        className="
          sticky
          top-0
          z-10

          rounded-t-3xl

          bg-white/95
          dark:bg-slate-900/95

          backdrop-blur-md

          border-b
          border-gray-200
          dark:border-slate-800

          px-5
          py-4
        "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`
                w-3
                h-3

                rounded-full

                shadow-md

                ${headerColor}
              `}
            />

            <h2
              className="
                text-lg
                font-bold

                text-gray-800
                dark:text-white
              "
            >
              {title}
            </h2>
          </div>

          <span
            className="
              min-w-[36px]
              h-9

              px-3

              flex
              items-center
              justify-center

              rounded-full

              bg-gray-100
              dark:bg-slate-800

              text-sm
              font-bold

              text-gray-700
              dark:text-slate-300

              transition-transform
              duration-300

              group-hover:scale-110
            "
          >
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Cards */}

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1

              overflow-y-auto

              p-4

              sidebar-scroll

              transition-all
              duration-300

              ${
                snapshot.isDraggingOver
                  ? `
                    bg-blue-50
                    dark:bg-blue-950/20

                    ring-2
                    ring-blue-300
                    dark:ring-blue-700
                  `
                  : `
                    bg-gray-50
                    dark:bg-slate-950
                  `
              }
            `}
          >
            {tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <KanbanCard key={task.id} task={task} index={index} />
                ))}
              </div>
            ) : (
              <div
                className="
                  flex
                  flex-col

                  items-center
                  justify-center

                  h-full

                  text-center

                  animate-pulse
                "
              >
                <div
                  className="
                    w-20
                    h-20

                    rounded-full

                    bg-gray-100
                    dark:bg-slate-800

                    flex
                    items-center
                    justify-center

                    text-4xl

                    mb-5
                  "
                >
                  📂
                </div>

                <h3
                  className="
                    text-lg
                    font-semibold

                    text-gray-700
                    dark:text-slate-200
                  "
                >
                  No Tasks
                </h3>

                <p
                  className="
                    mt-2

                    max-w-[220px]

                    text-sm

                    text-gray-500
                    dark:text-slate-500
                  "
                >
                  Drag a task here or create one.
                </p>
              </div>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
