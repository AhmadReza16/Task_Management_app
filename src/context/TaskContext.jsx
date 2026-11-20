import { useEffect, useMemo, useState } from "react";

import { tasks as initialTasks } from "../constants/tasks";

import { TaskContext } from "./task-context";

/* ---------------------------------
   Normalize Task
---------------------------------- */

const normalizeTask = (task) => {
  if (!task || typeof task !== "object") {
    return null;
  }

  let progress = Number(task.progress);

  if (!Number.isFinite(progress)) {
    progress = 0;
  }

  progress = Math.min(Math.max(progress, 0), 100);

  if (task.status === "Completed") {
    progress = 100;
  }

  if (task.status === "Pending") {
    progress = 0;
  }

  return {
    ...task,
    progress,
  };
};

/* ---------------------------------
   Load Tasks
---------------------------------- */

const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) {
      return initialTasks.map(normalizeTask).filter(Boolean);
    }

    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) {
      return initialTasks.map(normalizeTask).filter(Boolean);
    }

    return parsedTasks.map(normalizeTask).filter(Boolean);
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);

    return initialTasks.map(normalizeTask).filter(Boolean);
  }
};

/* ---------------------------------
   Provider
---------------------------------- */

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(loadTasks);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks]);

  const contextValue = useMemo(
    () => ({
      tasks,
      setTasks,
      searchTerm,
      setSearchTerm,
    }),
    [tasks, searchTerm],
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
