import { useContext, useMemo, useRef, useState } from "react";

import toast from "react-hot-toast";

import FadeIn from "../components/animations/FadeIn";
import StaggerContainer from "../components/animations/StaggerContainer";
import StaggerItem from "../components/animations/StaggerItem";

import StatsCard from "../components/dashboard/StatsCard";
import TaskItem from "../components/dashboard/TaskItem";
import AddTaskForm from "../components/dashboard/AddTaskForm";

import ConfirmModal from "../components/common/ConfirmModal";
import EmptyState from "../components/common/EmptyState";
import SearchInput from "../components/common/SearchInput";

import { stats } from "../constants/stats";

import { TaskContext } from "../context/task-context";

import { NotificationContext } from "../context/notification-context";

const FILTERS = ["All", "Pending", "In Progress", "Completed"];

const Dashboard = () => {
  const [editingTask, setEditingTask] = useState(null);

  const [filter, setFilter] = useState("All");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [taskToDelete, setTaskToDelete] = useState(null);

  const formRef = useRef(null);

  const { tasks, setTasks, searchTerm, setSearchTerm } =
    useContext(TaskContext);

  const { addNotification } = useContext(NotificationContext);

  /* =====================================
     Add Task
  ===================================== */

  const handleAddTask = (newTask) => {
    setTasks((previousTasks) => [...previousTasks, newTask]);

    toast.success("Task added successfully!");

    addNotification(
      "Task Created",
      `"${newTask.title}" was added successfully.`,
      "success",
    );
  };

  /* =====================================
     Delete Task
  ===================================== */

  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteTask = () => {
    const deletedTask = tasks.find((task) => task.id === taskToDelete);

    if (!deletedTask) {
      closeDeleteModal();
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskToDelete),
    );

    if (editingTask?.id === taskToDelete) {
      setEditingTask(null);
    }

    toast.success("Task deleted successfully!");

    addNotification(
      "Task Deleted",
      `"${deletedTask.title}" was deleted.`,
      "warning",
    );

    closeDeleteModal();
  };

  /* =====================================
     Edit Task
  ===================================== */

  const handleEditTask = (task) => {
    setEditingTask(task);

    window.setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  /* =====================================
     Update Task
  ===================================== */

  const handleUpdateTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );

    setEditingTask(null);

    toast.success("Task updated successfully!");

    addNotification(
      "Task Updated",
      `"${updatedTask.title}" was updated.`,
      "info",
    );
  };

  /* =====================================
     Search
  ===================================== */

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  /* =====================================
     Filter Tasks
  ===================================== */

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchableContent = [task.title, task.description, task.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearchTerm === "" ||
        searchableContent.includes(normalizedSearchTerm);

      const matchesFilter = filter === "All" || task.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, normalizedSearchTerm, filter]);

  /* =====================================
     Recent Tasks Animation Key
  ===================================== */

  const taskListKey = useMemo(
    () =>
      `${filter}-${normalizedSearchTerm}-${filteredTasks
        .map((task) => task.id)
        .join("-")}`,
    [filter, normalizedSearchTerm, filteredTasks],
  );

  /* =====================================
     Statistics
  ===================================== */

  const taskCounts = useMemo(() => {
    return tasks.reduce(
      (counts, task) => {
        counts.total += 1;

        if (task.status === "Completed") {
          counts.completed += 1;
        }

        if (task.status === "Pending") {
          counts.pending += 1;
        }

        if (task.status === "In Progress") {
          counts.inProgress += 1;
        }

        return counts;
      },
      {
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
      },
    );
  }, [tasks]);

  const taskStats = useMemo(() => {
    const valuesByTitle = {
      "Total Tasks": taskCounts.total,

      Completed: taskCounts.completed,

      Pending: taskCounts.pending,

      "In Progress": taskCounts.inProgress,
    };

    return stats.map((item) => ({
      ...item,

      value: valuesByTitle[item.title] ?? 0,
    }));
  }, [taskCounts]);

  return (
    <div className="space-y-8">
      {/* =====================================
          Header
      ===================================== */}

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
            📊 Task Overview
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
            Dashboard
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
            Monitor your task progress, manage priorities, and stay focused on
            what needs your attention.
          </p>
        </section>
      </FadeIn>

      {/* =====================================
          Statistics
      ===================================== */}

      <StaggerContainer
        className="
          grid
          grid-cols-1
          gap-5

          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {taskStats.map((item) => (
          <StaggerItem key={item.id}>
            <StatsCard
              title={item.title}
              value={item.value}
              icon={item.icon}
              trend={item.trend}
              subtitle={item.subtitle}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* =====================================
          Add / Edit Task
      ===================================== */}

      <FadeIn delay={0.2}>
        <section ref={formRef} className="scroll-mt-24">
          <AddTaskForm
            key={editingTask?.id ?? "new-task"}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            editingTask={editingTask}
          />
        </section>
      </FadeIn>

      {/* =====================================
          Search + Filters
      ===================================== */}

      <FadeIn delay={0.3}>
        <section
          className="
            flex
            flex-col
            gap-5

            rounded-2xl

            border
            border-gray-200
            dark:border-slate-800

            bg-white
            dark:bg-slate-900

            p-5

            shadow-sm

            transition-colors
            duration-300

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Search */}

          <div className="flex-1">
            <SearchInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onClear={() => setSearchTerm("")}
              ariaLabel="Search tasks"
              placeholder="Search by title, description or category..."
            />
          </div>

          {/* Filters */}

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            {FILTERS.map((item) => {
              const isActive = filter === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={isActive}
                  className={`
                    rounded-xl

                    border

                    px-4
                    py-2.5

                    text-sm
                    font-medium

                    transition-all
                    duration-200

                    active:scale-95

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-500/10
                    focus-visible:ring-offset-0

                    ${
                      isActive
                        ? `
                          border-blue-600

                          bg-blue-600
                          text-white

                          shadow-md
                          shadow-blue-500/20
                        `
                        : `
                          border-gray-300
                          dark:border-slate-700

                          bg-white
                          dark:bg-slate-900

                          text-gray-700
                          dark:text-slate-300

                          hover:border-blue-300
                          hover:bg-blue-50
                          hover:text-blue-600

                          dark:hover:border-blue-800
                          dark:hover:bg-slate-800
                          dark:hover:text-blue-400
                        `
                    }
                  `}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>
      </FadeIn>

      {/* =====================================
          Recent Tasks
      ===================================== */}

      <FadeIn delay={0.4}>
        <section
          className="
            rounded-2xl

            border
            border-gray-200
            dark:border-slate-800

            bg-white
            dark:bg-slate-900

            p-5
            md:p-6

            shadow-md

            transition-colors
            duration-300
          "
        >
          {/* Recent Tasks Header */}

          <div
            className="
              mb-6

              flex
              flex-col
              gap-2

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <h2
              className="
                text-xl
                font-semibold

                text-gray-800
                dark:text-white
              "
            >
              Recent Tasks
            </h2>

            <span
              className="
                text-sm

                text-gray-500
                dark:text-slate-400
              "
            >
              {filteredTasks.length} Task
              {filteredTasks.length !== 1 && "s"}
            </span>
          </div>

          {/* Task List */}

          {filteredTasks.length > 0 ? (
            <StaggerContainer
              key={taskListKey}
              className="space-y-5"
              stagger={0.08}
            >
              {filteredTasks.map((task) => (
                <StaggerItem key={task.id}>
                  <TaskItem
                    task={task}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <EmptyState
              icon="📋"
              title="No Tasks Found"
              description={
                normalizedSearchTerm || filter !== "All"
                  ? "Try changing your search or filter."
                  : "Create your first task to get started."
              }
            />
          )}
        </section>
      </FadeIn>

      {/* =====================================
          Delete Confirmation
      ===================================== */}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
};

export default Dashboard;
