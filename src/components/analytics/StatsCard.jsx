import { useEffect, useState } from "react";

const StatsCard = ({ title, value, color, icon }) => {
  const [displayValue, setDisplayValue] = useState(0);

  const parseValue = (input) => {
    if (typeof input === "number") {
      return {
        target: input,
        suffix: "",
      };
    }

    const stringValue = String(input);

    const match = stringValue.match(/^(-?\d+(?:\.\d+)?)(.*)$/);

    if (!match) {
      return {
        target: 0,
        suffix: stringValue,
      };
    }

    return {
      target: Number(match[1]),
      suffix: match[2],
    };
  };

  const { target, suffix } = parseValue(value);

  useEffect(() => {
    let animationFrame;
    let startTime = null;

    const duration = 700;

    const safeTarget = Math.max(target, 0);

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.round(safeTarget * easedProgress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [target]);

  return (
    <article
      className="
        group
        relative

        h-full

        overflow-hidden

        rounded-3xl

        border
        border-gray-200
        dark:border-slate-700

        bg-white
        dark:bg-slate-900

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-blue-300
        hover:shadow-xl

        dark:hover:border-blue-700
      "
    >
      <div
        aria-hidden="true"
        className="
          h-1
          w-full

          bg-linear-to-r
          from-blue-500
          via-cyan-400
          to-blue-500
        "
      />

      <div className="p-5 sm:p-6">
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
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
                sm:text-4xl

                font-bold
                tabular-nums

                text-gray-800
                dark:text-white
              "
            >
              {displayValue}
              {suffix}
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

              shadow-sm

              transition-transform
              duration-300

              group-hover:scale-110

              sm:h-16
              sm:w-16

              ${color}
            `}
          >
            {icon}
          </div>
        </div>
      </div>
    </article>
  );
};

export default StatsCard;
