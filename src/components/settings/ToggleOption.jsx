const ToggleOption = ({ title, description, enabled, onToggle, icon }) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4

        rounded-xl

        border
        border-gray-200
        dark:border-slate-700

        bg-gray-50
        dark:bg-slate-800

        p-4
        sm:p-5

        transition-colors
        duration-300
      "
    >
      {/* Left */}

      <div
        className="
          flex
          min-w-0
          items-start
          gap-3
        "
      >
        {/* Icon */}

        {icon && (
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              bg-blue-100
              dark:bg-blue-900/30

              text-blue-600
              dark:text-blue-400
            "
          >
            {icon}
          </div>
        )}

        {/* Text */}

        <div className="min-w-0">
          <h3
            className="
              font-medium

              text-gray-800
              dark:text-white

              transition-colors
              duration-300
            "
          >
            {title}
          </h3>

          {description && (
            <p
              className="
                mt-1

                text-sm
                leading-5

                text-gray-500
                dark:text-slate-400

                transition-colors
                duration-300
              "
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Toggle */}

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={title}
        onClick={onToggle}
        className={`
          relative

          h-7
          w-14
          shrink-0

          rounded-full

          transition-colors
          duration-300

          focus:outline-none
          focus:ring-4
          focus:ring-blue-500/15

          ${enabled ? "bg-blue-600" : "bg-gray-300 dark:bg-slate-700"}
        `}
      >
        <span
          className={`
            absolute
            left-1
            top-1

            h-5
            w-5

            rounded-full

            bg-white

            shadow-md

            transition-transform
            duration-300

            ${enabled ? "translate-x-7" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleOption;
