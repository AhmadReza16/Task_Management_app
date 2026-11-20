import { useId } from "react";
import { Search, X } from "lucide-react";

const SearchInput = ({
  id,
  value = "",
  onChange,
  onClear,
  placeholder = "Search...",
  ariaLabel = "Search",
  className = "",
  disabled = false,
  ...props
}) => {
  const generatedId = useId();

  const searchId = id || generatedId;

  const handleClear = () => {
    if (onClear) {
      onClear();
      return;
    }

    onChange?.({
      target: {
        value: "",
      },
    });
  };

  return (
    <div
      className={`
        flex
        w-full
        items-center

        rounded-xl

        border
        border-gray-300
        dark:border-slate-700

        bg-white
        dark:bg-slate-900

        px-4
        py-3

        shadow-sm

        transition-all
        duration-200

        ${
          !disabled
            ? `
              hover:border-gray-400
              dark:hover:border-slate-600

              focus-within:border-blue-500
              focus-within:ring-2
              focus-within:ring-blue-500/10
            `
            : `
              cursor-not-allowed

              bg-gray-100
              dark:bg-slate-800

              opacity-60
            `
        }

        ${className}
      `}
    >
      {/* Search Icon */}

      <Search
        size={20}
        aria-hidden="true"
        className="
          shrink-0

          text-gray-500
          dark:text-slate-400
        "
      />

      {/* Search Input */}

      <input
        id={searchId}
        type="search"
        role="searchbox"
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
        className="
          ml-3

          min-w-0
          w-full

          appearance-none

          border-0
          bg-transparent

          p-0

          text-gray-800
          dark:text-slate-100

          placeholder:text-gray-400
          dark:placeholder:text-slate-500

          outline-none
          ring-0

          focus:border-0
          focus:outline-none
          focus:ring-0

          focus-visible:outline-none
          focus-visible:ring-0

          disabled:cursor-not-allowed

          [&::-webkit-search-cancel-button]:appearance-none
          [&::-webkit-search-decoration]:appearance-none
        "
      />

      {/* Clear Button */}

      {value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          title="Clear search"
          className="
            ml-2

            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center

            rounded-lg

            text-gray-500
            dark:text-slate-400

            transition-all
            duration-200

            hover:bg-gray-100
            hover:text-gray-800

            dark:hover:bg-slate-800
            dark:hover:text-white

            active:scale-95
          "
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
