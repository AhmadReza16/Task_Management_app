import { AlertTriangle, CheckCircle, Info } from "lucide-react";

const NotificationItem = ({ notification, onRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return (
          <CheckCircle
            size={18}
            aria-hidden="true"
            className="
              text-green-600
              dark:text-green-400
            "
          />
        );

      case "warning":
        return (
          <AlertTriangle
            size={18}
            aria-hidden="true"
            className="
              text-yellow-600
              dark:text-yellow-400
            "
          />
        );

      case "error":
        return (
          <AlertTriangle
            size={18}
            aria-hidden="true"
            className="
              text-red-600
              dark:text-red-400
            "
          />
        );

      default:
        return (
          <Info
            size={18}
            aria-hidden="true"
            className="
              text-blue-600
              dark:text-blue-400
            "
          />
        );
    }
  };

  const getIconBackground = () => {
    switch (notification.type) {
      case "success":
        return `
          bg-green-100
          dark:bg-green-900/30
        `;

      case "warning":
        return `
          bg-yellow-100
          dark:bg-yellow-900/30
        `;

      case "error":
        return `
          bg-red-100
          dark:bg-red-900/30
        `;

      default:
        return `
          bg-blue-100
          dark:bg-blue-900/30
        `;
    }
  };

  const formatTime = () => {
    const created = new Date(notification.createdAt);

    if (Number.isNaN(created.getTime())) {
      return "Unknown time";
    }

    return created.toLocaleString([], {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const handleRead = () => {
    if (!notification.read) {
      onRead?.(notification.id);
    }
  };

  return (
    <button
      type="button"
      onClick={handleRead}
      aria-label={`
        ${notification.title}.
        ${notification.read ? "Read notification" : "Unread notification"}
      `}
      className={`
        w-full

        flex
        items-start
        gap-4

        border-b
        border-gray-100
        dark:border-slate-800

        px-5
        py-4

        text-left

        transition-colors
        duration-200

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-blue-500

        ${
          notification.read
            ? `
              bg-white
              dark:bg-slate-900

              hover:bg-gray-50
              dark:hover:bg-slate-800
            `
            : `
              bg-blue-50
              dark:bg-blue-900/20

              hover:bg-blue-100
              dark:hover:bg-blue-900/30
            `
        }
      `}
    >
      {/* Icon */}

      <div
        className={`
          mt-1

          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center

          rounded-xl

          ${getIconBackground()}
        `}
      >
        {getIcon()}
      </div>

      {/* Content */}

      <div className="min-w-0 flex-1">
        {/* Title */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <h4
            className={`
              font-semibold
              leading-5

              ${
                notification.read
                  ? `
                    text-gray-700
                    dark:text-slate-200
                  `
                  : `
                    text-gray-900
                    dark:text-white
                  `
              }
            `}
          >
            {notification.title}
          </h4>

          {/* Unread Indicator */}

          {!notification.read && (
            <span
              aria-hidden="true"
              className="
                mt-1

                h-2.5
                w-2.5
                shrink-0

                rounded-full

                bg-blue-600

                animate-pulse
              "
            />
          )}
        </div>

        {/* Message */}

        <p
          className="
            mt-1.5

            text-sm
            leading-6

            text-gray-500
            dark:text-slate-400
          "
        >
          {notification.message}
        </p>

        {/* Time */}

        <p
          className="
            mt-3

            text-xs

            text-gray-400
            dark:text-slate-500
          "
        >
          {formatTime()}
        </p>
      </div>
    </button>
  );
};

export default NotificationItem;
