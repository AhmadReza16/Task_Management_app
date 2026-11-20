import { useCallback, useEffect, useMemo, useState } from "react";

import { NotificationContext } from "./notification-context";

const MAX_NOTIFICATIONS = 50;

const ALLOWED_TYPES = ["success", "warning", "error", "info"];

const loadNotifications = () => {
  try {
    const savedNotifications = localStorage.getItem("notifications");

    if (!savedNotifications) {
      return [];
    }

    const parsedNotifications = JSON.parse(savedNotifications);

    if (!Array.isArray(parsedNotifications)) {
      return [];
    }

    return parsedNotifications
      .filter(
        (notification) =>
          notification &&
          typeof notification === "object" &&
          notification.id &&
          typeof notification.title === "string" &&
          typeof notification.message === "string",
      )
      .slice(0, MAX_NOTIFICATIONS);
  } catch (error) {
    console.error("Failed to load notifications:", error);

    return [];
  }
};

const createNotificationId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(loadNotifications);

  /* ---------------- Persistence ---------------- */

  useEffect(() => {
    try {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    } catch (error) {
      console.error("Failed to save notifications:", error);
    }
  }, [notifications]);

  /* ---------------- Add Notification ---------------- */

  const addNotification = useCallback(
    (titleOrNotification, message, type = "info") => {
      const notificationData =
        typeof titleOrNotification === "object" && titleOrNotification !== null
          ? titleOrNotification
          : {
              title: titleOrNotification,
              message,
              type,
            };

      const title =
        typeof notificationData.title === "string"
          ? notificationData.title.trim()
          : "";

      const notificationMessage =
        typeof notificationData.message === "string"
          ? notificationData.message.trim()
          : "";

      if (!title || !notificationMessage) {
        console.warn("A notification requires both a title and message.");

        return;
      }

      const notificationType = ALLOWED_TYPES.includes(notificationData.type)
        ? notificationData.type
        : "info";

      const newNotification = {
        id: createNotificationId(),
        title,
        message: notificationMessage,
        type: notificationType,
        read: false,
        createdAt: new Date().toISOString(),
      };

      setNotifications((previous) =>
        [newNotification, ...previous].slice(0, MAX_NOTIFICATIONS),
      );
    },
    [],
  );

  /* ---------------- Mark One Read ---------------- */

  const markAsRead = useCallback((id) => {
    if (!id) return;

    setNotifications((previous) =>
      previous.map((notification) => {
        if (notification.id !== id || notification.read) {
          return notification;
        }

        return {
          ...notification,
          read: true,
        };
      }),
    );
  }, []);

  /* ---------------- Mark All Read ---------------- */

  const markAllAsRead = useCallback(() => {
    setNotifications((previous) => {
      const hasUnread = previous.some((notification) => !notification.read);

      if (!hasUnread) {
        return previous;
      }

      return previous.map((notification) => ({
        ...notification,
        read: true,
      }));
    });
  }, []);

  /* ---------------- Clear ---------------- */

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /* ---------------- Unread Count ---------------- */

  const unreadCount = useMemo(
    () =>
      notifications.reduce(
        (count, notification) => (notification.read ? count : count + 1),
        0,
      ),
    [notifications],
  );

  /* ---------------- Context Value ---------------- */

  const contextValue = useMemo(
    () => ({
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
    }),
    [
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
    ],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
