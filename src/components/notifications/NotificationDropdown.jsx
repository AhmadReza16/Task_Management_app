import { useContext } from "react";
import { Bell } from "lucide-react";

import { NotificationContext } from "../../context/notification-context";

import NotificationItem from "./NotificationItem";

const NotificationDropdown = ({ isOpen, onClose }) => {
  const {
    notifications = [],
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useContext(NotificationContext);

  if (!isOpen) return null;

  const handleClearNotifications = () => {
    clearNotifications();

    onClose?.();
  };

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      className="
        fixed
        left-4
        right-4
        top-20
        z-50

        flex
        max-h-[calc(100vh-6rem)]
        flex-col

        overflow-hidden

        rounded-2xl

        border
        border-gray-200
        dark:border-slate-700

        bg-white/95
        dark:bg-slate-900/95

        backdrop-blur-xl

        shadow-[0_20px_60px_rgba(0,0,0,0.25)]

        animate-pop

        sm:absolute
        sm:left-auto
        sm:right-0
        sm:top-14

        sm:w-96
        sm:max-w-[calc(100vw-2rem)]
      "
    >
      {/* =====================================
          Header
      ===================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          gap-4

          border-b
          border-gray-200
          dark:border-slate-700

          bg-white/95
          dark:bg-slate-900/95

          px-4
          py-4

          backdrop-blur-md

          sm:px-5
        "
      >
        <div className="min-w-0">
          <h3
            className="
              font-bold

              text-gray-800
              dark:text-white
            "
          >
            Notifications
          </h3>

          {notifications.length > 0 && (
            <p
              className="
                mt-0.5

                text-xs

                text-gray-500
                dark:text-slate-400
              "
            >
              {unreadCount} unread
            </p>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="
              shrink-0

              rounded-lg

              px-1
              py-1

              text-sm
              font-medium

              text-blue-600
              dark:text-blue-400

              transition-colors
              duration-200

              hover:text-blue-700
              hover:underline

              dark:hover:text-blue-300

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500/20
            "
          >
            Mark all read
          </button>
        )}
      </div>

      {/* =====================================
          Scrollable Notification List
      ===================================== */}

      <div
        className="
          min-h-0
          flex-1

          overflow-y-auto
          overscroll-contain
        "
      >
        {notifications.length === 0 ? (
          <div
            className="
              flex
              min-h-[260px]
              flex-col
              items-center
              justify-center

              px-6
              py-10

              text-center

              sm:min-h-[280px]
              sm:py-12
            "
          >
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center

                rounded-full

                bg-gray-100
                dark:bg-slate-800
              "
            >
              <Bell
                size={38}
                aria-hidden="true"
                className="
                  text-gray-300
                  dark:text-slate-600
                "
              />
            </div>

            <h4
              className="
                mt-5

                font-semibold

                text-gray-700
                dark:text-white
              "
            >
              No Notifications
            </h4>

            <p
              className="
                mt-2

                text-sm

                text-gray-500
                dark:text-slate-400
              "
            >
              You&apos;re all caught up.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={markAsRead}
            />
          ))
        )}
      </div>

      {/* =====================================
          Footer
      ===================================== */}

      {notifications.length > 0 && (
        <div
          className="
            shrink-0

            border-t
            border-gray-200
            dark:border-slate-700

            bg-white/95
            dark:bg-slate-900/95

            p-3

            backdrop-blur-md
          "
        >
          <button
            type="button"
            onClick={handleClearNotifications}
            className="
              w-full

              rounded-xl

              py-2.5

              font-medium

              text-red-600
              dark:text-red-400

              transition-all
              duration-200

              hover:bg-red-50

              active:scale-95

              dark:hover:bg-red-900/20

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500/20
            "
          >
            Clear All Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
