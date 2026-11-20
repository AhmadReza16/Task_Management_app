const StatsCard = ({ title, value, icon: Icon, trend, subtitle }) => {
  const getTrendStyle = () => {
    switch (title) {
      case "Completed":
        return `
          bg-green-100
          text-green-700

          dark:bg-green-900/30
          dark:text-green-400
        `;

      case "Pending":
        return `
          bg-yellow-100
          text-yellow-700

          dark:bg-yellow-900/30
          dark:text-yellow-400
        `;

      case "In Progress":
        return `
          bg-blue-100
          text-blue-700

          dark:bg-blue-900/30
          dark:text-blue-400
        `;

      default:
        return `
          bg-slate-100
          text-slate-700

          dark:bg-slate-800
          dark:text-slate-300
        `;
    }
  };

  const getIconStyle = () => {
    switch (title) {
      case "Completed":
        return `
          bg-green-50
          text-green-600

          dark:bg-green-900/20
          dark:text-green-400

          group-hover:bg-green-100
          dark:group-hover:bg-green-900/30
        `;

      case "Pending":
        return `
          bg-yellow-50
          text-yellow-600

          dark:bg-yellow-900/20
          dark:text-yellow-400

          group-hover:bg-yellow-100
          dark:group-hover:bg-yellow-900/30
        `;

      case "In Progress":
        return `
          bg-blue-50
          text-blue-600

          dark:bg-blue-900/20
          dark:text-blue-400

          group-hover:bg-blue-100
          dark:group-hover:bg-blue-900/30
        `;

      default:
        return `
          bg-indigo-50
          text-indigo-600

          dark:bg-indigo-900/20
          dark:text-indigo-400

          group-hover:bg-indigo-100
          dark:group-hover:bg-indigo-900/30
        `;
    }
  };

  return (
    <article
      className="
        group
        h-full

        rounded-2xl

        border
        border-gray-200
        dark:border-slate-800

        bg-white
        dark:bg-slate-900

        p-5

        shadow-sm

        transition-all
        duration-300
        ease-out

        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
        hover:shadow-blue-500/5

        dark:hover:border-blue-900
      "
    >
      {/* Top */}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className="
              text-sm
              font-medium

              text-gray-500
              dark:text-slate-400
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-3

              text-3xl
              font-bold
              tabular-nums

              text-gray-800
              dark:text-white

              sm:text-4xl
            "
          >
            {value}
          </h2>
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center

            rounded-2xl

            transition-all
            duration-300

            group-hover:scale-110

            ${getIconStyle()}
          `}
        >
          <Icon size={28} aria-hidden="true" />
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
          mt-6

          flex
          items-end
          justify-between
          gap-3
        "
      >
        <p
          className="
            min-w-0
            text-xs
            leading-5

            text-gray-500
            dark:text-slate-400
          "
        >
          {subtitle}
        </p>

        {trend && (
          <span
            className={`
              shrink-0

              rounded-full

              px-3
              py-1

              text-xs
              font-semibold

              ${getTrendStyle()}
            `}
          >
            {trend}
          </span>
        )}
      </div>
    </article>
  );
};

export default StatsCard;
