import { useContext, useEffect } from "react";

import { TaskContext } from "../../context/task-context";
import { NotificationContext } from "../../context/notification-context";

/* ---------------------------------
   Local Date Helper
---------------------------------- */

const getLocalDateString = (date) => {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* ---------------------------------
   Load Previously Shown Reminders
---------------------------------- */

const loadShownNotifications = () => {
  try {
    const saved = localStorage.getItem("shownNotifications");

    if (!saved) return {};

    const parsed = JSON.parse(saved);

    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch (error) {
    console.error("Failed to load shown notifications:", error);

    return {};
  }
};

/* ---------------------------------
   Save Reminder History
---------------------------------- */

const saveShownNotifications = (shown) => {
  try {
    localStorage.setItem("shownNotifications", JSON.stringify(shown));
  } catch (error) {
    console.error("Failed to save shown notifications:", error);
  }
};

/* ---------------------------------
   Notification Scheduler
---------------------------------- */

const NotificationScheduler = () => {
  const { tasks = [] } = useContext(TaskContext);

  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (!Array.isArray(tasks)) {
      return;
    }

    const today = new Date();

    const tomorrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    const todayString = getLocalDateString(today);

    const tomorrowString = getLocalDateString(tomorrow);

    const shown = loadShownNotifications();

    let hasChanges = false;

    /* -----------------------------
       Remove Old Reminder Records
    ------------------------------ */

    Object.keys(shown).forEach((key) => {
      const isStillRelevant = tasks.some((task) => {
        if (!task?.id) {
          return false;
        }

        return key.startsWith(`${task.id}-`);
      });

      if (!isStillRelevant) {
        delete shown[key];
        hasChanges = true;
      }
    });

    /* -----------------------------
       Check Task Deadlines
    ------------------------------ */

    tasks.forEach((task) => {
      if (!task || task.status === "Completed" || !task.dueDate) {
        return;
      }

      const taskId = task.id ?? task.title;

      if (!taskId) {
        return;
      }

      const taskTitle = task.title?.trim() || "Untitled Task";

      const dueDate = String(task.dueDate).split("T")[0];

      const todayKey = `${taskId}-${dueDate}-today`;

      const tomorrowKey = `${taskId}-${dueDate}-tomorrow`;

      /* Due Today */

      if (dueDate === todayString && !shown[todayKey]) {
        addNotification(
          "Task Due Today",
          `"${taskTitle}" is due today.`,
          "error",
        );

        shown[todayKey] = true;

        hasChanges = true;
      }

      /* Due Tomorrow */

      if (dueDate === tomorrowString && !shown[tomorrowKey]) {
        addNotification(
          "Task Due Tomorrow",
          `"${taskTitle}" is due tomorrow.`,
          "warning",
        );

        shown[tomorrowKey] = true;

        hasChanges = true;
      }
    });

    /* -----------------------------
       Persist Reminder History
    ------------------------------ */

    if (hasChanges) {
      saveShownNotifications(shown);
    }
  }, [tasks, addNotification]);

  return null;
};

export default NotificationScheduler;
