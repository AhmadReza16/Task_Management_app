import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      className = "",
      type = "button",
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg",

      secondary: `
        border
        border-gray-300
        dark:border-slate-700

        bg-gray-100
        dark:bg-slate-800

        text-gray-800
        dark:text-slate-200

        hover:bg-gray-200
        dark:hover:bg-slate-700
      `,

      success:
        "bg-green-600 text-white shadow-md hover:bg-green-700 hover:shadow-lg",

      warning: `
        bg-amber-500
        text-white

        shadow-md

        hover:bg-amber-600
        hover:shadow-lg
      `,

      danger:
        "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg",

      outline: `
        border
        border-blue-600

        bg-white
        dark:bg-slate-900

        text-blue-600
        dark:text-blue-400

        hover:bg-blue-50
        dark:hover:bg-slate-800
      `,
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading ? true : undefined}
        className={`
          inline-flex
          items-center
          justify-center
          gap-2

          rounded-xl

          font-semibold

          select-none

          transition-all
          duration-200
          ease-out

          hover:-translate-y-0.5

          active:translate-y-0
          active:scale-95

          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:translate-y-0

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500/20
          focus-visible:ring-offset-2

          dark:focus-visible:ring-offset-slate-900

          ${sizes[size] || sizes.md}
          ${variants[variant] || variants.primary}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <svg
            aria-hidden="true"
            className="
              h-5
              w-5
              shrink-0
              animate-spin
            "
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.2"
            />

            <path
              d="M21 12a9 9 0 0 1-9 9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}

        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
