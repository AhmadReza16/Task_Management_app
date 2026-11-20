import { useId } from "react";

const Input = ({
  label,
  error,
  helperText,
  required = false,
  className = "",
  id,
  disabled = false,
  ...props
}) => {
  const generatedId = useId();

  const inputId = id || props.name || generatedId;

  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="space-y-2">
      {/* Label */}

      {label && (
        <label
          htmlFor={inputId}
          className="
            block

            text-sm
            font-semibold

            text-gray-700
            dark:text-slate-300
          "
        >
          {label}

          {required && (
            <span aria-hidden="true" className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      {/* Input */}

      <input
        id={inputId}
        required={required}
        disabled={disabled}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        {...props}
        className={`
          w-full

          rounded-xl

          border

          bg-white
          dark:bg-slate-900

          px-4
          py-3

          text-gray-800
          dark:text-slate-100

          placeholder:text-gray-400
          dark:placeholder:text-slate-500

          shadow-sm

          transition-all
          duration-200

          focus:outline-none
          focus:ring-2

          ${
            disabled
              ? `
                cursor-not-allowed

                bg-gray-100
                dark:bg-slate-800

                text-gray-500
                dark:text-slate-500

                opacity-70
              `
              : ""
          }

          ${
            error
              ? `
                border-red-500

                focus:border-red-500
                focus:ring-red-500/10
              `
              : `
                border-gray-300
                dark:border-slate-700

                ${
                  !disabled
                    ? `
                      hover:border-gray-400
                      dark:hover:border-slate-600
                    `
                    : ""
                }

                focus:border-blue-500
                focus:ring-blue-500/10
              `
          }

          ${className}
        `}
      />

      {/* Helper Text */}

      {helperText && !error && (
        <p
          id={helperId}
          className="
            text-xs
            leading-5

            text-gray-500
            dark:text-slate-400
          "
        >
          {helperText}
        </p>
      )}

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

export default Input;
