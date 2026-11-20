const SettingSection = ({ title, description, children }) => {
  return (
    <section
      className="
        rounded-2xl

        border
        border-gray-200
        dark:border-slate-700

        bg-white
        dark:bg-slate-900

        p-5
        sm:p-6

        shadow-sm

        transition-shadow
        duration-300

        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="mb-5">
        <h2
          className="
            text-xl
            font-semibold

            text-gray-800
            dark:text-white
          "
        >
          {title}
        </h2>

        {description && (
          <p
            className="
              mt-1.5

              text-sm
              leading-6

              text-gray-500
              dark:text-slate-400
            "
          >
            {description}
          </p>
        )}
      </div>

      {/* Content */}

      <div className="space-y-4">{children}</div>
    </section>
  );
};

export default SettingSection;
