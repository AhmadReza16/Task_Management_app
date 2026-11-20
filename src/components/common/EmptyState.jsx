import Button from "./Button";

const EmptyState = ({
  icon = "📭",
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <section
      role="status"
      aria-live="polite"
      className="
        group

        flex
        flex-col
        items-center
        justify-center

        rounded-2xl

        border-2
        border-dashed
        border-gray-200
        dark:border-slate-700

        bg-gray-50
        dark:bg-slate-900

        px-5
        py-12

        text-center

        transition-all
        duration-300

        hover:border-blue-300
        hover:bg-blue-50/40

        dark:hover:border-blue-700
        dark:hover:bg-slate-800/60

        sm:px-6
        sm:py-16
      "
    >
      {/* Icon */}

      <div
        aria-hidden="true"
        className="
          mb-5

          text-5xl
          sm:text-6xl
          md:text-7xl

          transition-transform
          duration-300

          group-hover:scale-105
        "
      >
        {icon}
      </div>

      {/* Title */}

      <h3
        className="
          text-xl
          sm:text-2xl

          font-bold

          text-gray-800
          dark:text-white
        "
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className="
          mt-3

          max-w-md

          text-sm
          sm:text-base

          leading-7

          text-gray-500
          dark:text-slate-400
        "
      >
        {description}
      </p>

      {/* Optional Action */}

      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction} className="mt-7">
          {actionLabel}
        </Button>
      )}
    </section>
  );
};

export default EmptyState;
