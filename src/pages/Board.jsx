import { DragDropContext } from "@hello-pangea/dnd";

import { useContext } from "react";
import toast from "react-hot-toast";

import { TaskContext } from "../context/task-context";
import { SettingsContext } from "../context/settings-context";

import KanbanColumn from "../components/board/KanbanColumn";

import FadeIn from "../components/animations/FadeIn";

import EmptyState from "../components/common/EmptyState";

const Board = () => {
  const { tasks, setTasks } = useContext(TaskContext);

  const { showCompleted } = useContext(SettingsContext);

  const visibleTasks = showCompleted
    ? tasks
    : tasks.filter((task) => task.status !== "Completed");

  const columns = {
    Pending: visibleTasks.filter((task) => task.status === "Pending"),

    "In Progress": visibleTasks.filter((task) => task.status === "In Progress"),

    Completed: visibleTasks.filter((task) => task.status === "Completed"),
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = [...tasks];

    const sourceTasks = updatedTasks.filter(
      (task) => task.status === source.droppableId,
    );

    const movedTask = sourceTasks[source.index];

    if (!movedTask) return;

    let updatedProgress = Number(movedTask.progress);

    if (destination.droppableId === "Completed") {
      updatedProgress = 100;
    }

    if (destination.droppableId === "In Progress") {
      updatedProgress =
        Number(movedTask.progress) > 0 && Number(movedTask.progress) < 100
          ? Number(movedTask.progress)
          : 50;
    }

    if (destination.droppableId === "Pending") {
      updatedProgress = 0;
    }

    const updatedMovedTask = {
      ...movedTask,
      status: destination.droppableId,
      progress: updatedProgress,
    };

    if (source.droppableId !== destination.droppableId) {
      toast.success(`Task moved to ${destination.droppableId}`);
    }

    const remainingTasks = updatedTasks.filter(
      (task) => task.id !== movedTask.id,
    );

    const destinationTasks = remainingTasks.filter(
      (task) => task.status === destination.droppableId,
    );

    destinationTasks.splice(destination.index, 0, updatedMovedTask);

    const otherTasks = remainingTasks.filter(
      (task) => task.status !== destination.droppableId,
    );

    setTasks([...otherTasks, ...destinationTasks]);
  };

  return (
    <div className="space-y-10">
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
            📌 Workflow Board
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
            management Board
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
            Manage your projects efficiently, stay on top of deadlines, and
            track every task from start to completion.
          </p>
        </section>
      </FadeIn>

      {/* Board */}

      {visibleTasks.length === 0 ? (
        <FadeIn delay={0.2}>
          <EmptyState
            icon="📌"
            title="No Tasks on the Board"
            description="Create your first task to start organizing your workflow."
          />
        </FadeIn>
      ) : (
        <div className="animate-fadeIn">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div
              className="
                flex

                gap-6

                overflow-x-auto

                pb-4

                snap-x

                lg:grid
                lg:grid-cols-3

                lg:overflow-visible
              "
            >
              {[
                {
                  id: "Pending",
                  color: "bg-yellow-500",
                },

                {
                  id: "In Progress",
                  color: "bg-blue-500",
                },

                ...(showCompleted
                  ? [
                      {
                        id: "Completed",
                        color: "bg-green-500",
                      },
                    ]
                  : []),
              ].map((column) => (
                <div
                  key={column.id}
                  className="
                    min-w-[320px]

                    sm:min-w-[360px]

                    lg:min-w-0

                    snap-start

                    flex-shrink-0
                  "
                >
                  <KanbanColumn
                    id={column.id}
                    title={column.id}
                    tasks={columns[column.id]}
                    headerColor={column.color}
                  />
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default Board;
