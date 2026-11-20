import { useId } from "react";

const RangeSlider = ({
  id,
  label,
  value,
  error,
  className = "",
  disabled = false,
  min = 0,
  max = 100,
  step = 1,
  ...props
}) => {
  const generatedId = useId();

  const sliderId = id || props.name || generatedId;

  const errorId = `${sliderId}-error`;

  const numericMin = Number(min) || 0;

  const numericMax = Number(max) || 100;

  const numericValue = Number(value) || 0;

  const safeValue = Math.min(Math.max(numericValue, numericMin), numericMax);

  return (
    <div className="space-y-3">
      {/* Label */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {label && (
          <label
            htmlFor={sliderId}
            className="
              text-sm
              font-semibold

              text-gray-700
              dark:text-slate-300
            "
          >
            {label}
          </label>
        )}

        <span
          className="
            shrink-0

            rounded-full

            bg-blue-100
            dark:bg-blue-900/30

            px-3
            py-1

            text-sm
            font-bold
            tabular-nums

            text-blue-600
            dark:text-blue-400
          "
        >
          {safeValue}%
        </span>
      </div>

      {/* Slider */}

      <input
        id={sliderId}
        type="range"
        min={numericMin}
        max={numericMax}
        step={step}
        value={safeValue}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
        className={`
          w-full

          accent-blue-600
          dark:accent-blue-500

          transition-all
          duration-200

          ${
            disabled
              ? `
                cursor-not-allowed
                opacity-50
              `
              : `
                cursor-pointer
              `
          }

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500/10
          focus-visible:ring-offset-2

          dark:focus-visible:ring-offset-slate-900

          ${className}
        `}
      />

      {/* Min / Max */}

      <div
        className="
          flex
          justify-between

          text-xs

          text-gray-400
          dark:text-slate-500
        "
      >
        <span>{numericMin}%</span>
        <span>{numericMax}%</span>
      </div>

      {/* Error */}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="
            text-sm
            leading-5

            text-red-500
            dark:text-red-400
          "
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default RangeSlider;
