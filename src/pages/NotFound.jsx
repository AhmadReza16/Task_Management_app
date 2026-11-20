import { Link } from "react-router-dom";

import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div
      className="
        relative

        flex
        min-h-screen
        items-center
        justify-center

        overflow-hidden

        bg-gray-50
        dark:bg-slate-950

        px-5
        py-12
      "
    >
      {/* Decorative Background */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -right-24
            -top-24

            h-72
            w-72

            rounded-full

            bg-blue-200/50
            dark:bg-blue-900/20

            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-24
            -left-24

            h-72
            w-72

            rounded-full

            bg-cyan-200/50
            dark:bg-cyan-900/20

            blur-3xl
          "
        />
      </div>

      {/* Content */}

      <main
        className="
          relative
          z-10

          w-full
          max-w-2xl

          text-center
        "
      >
        {/* Icon */}

        <div
          className="
            mx-auto

            flex
            h-20
            w-20
            items-center
            justify-center

            rounded-3xl

            bg-blue-100
            dark:bg-blue-900/30

            shadow-sm
          "
        >
          <SearchX
            size={38}
            aria-hidden="true"
            className="
              text-blue-600
              dark:text-blue-400
            "
          />
        </div>

        {/* 404 */}

        <p
          className="
            mt-8

            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            bg-clip-text

            text-7xl
            sm:text-8xl
            md:text-9xl

            font-black
            tracking-tight

            text-transparent
          "
        >
          404
        </p>

        {/* Title */}

        <h1
          className="
            mt-4

            text-3xl
            sm:text-4xl

            font-bold
            tracking-tight

            text-gray-800
            dark:text-white
          "
        >
          Page Not Found
        </h1>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-4
            max-w-lg

            text-base
            sm:text-lg

            leading-7

            text-gray-500
            dark:text-slate-400
          "
        >
          The page you're looking for doesn't exist or may have been moved. Head
          back to your dashboard and continue managing your tasks.
        </p>

        {/* Actions */}

        <div
          className="
            mt-8

            flex
            flex-col
            items-center
            justify-center
            gap-3

            sm:flex-row
          "
        >
          <Link
            to="/"
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-blue-600

              px-6
              py-3

              font-semibold

              text-white

              shadow-md

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:bg-blue-700
              hover:shadow-lg

              active:translate-y-0
              active:scale-95

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500/20
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-slate-950

              sm:w-auto
            "
          >
            <Home size={18} aria-hidden="true" />
            Go to Dashboard
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-gray-300
              dark:border-slate-700

              bg-white
              dark:bg-slate-900

              px-6
              py-3

              font-semibold

              text-gray-700
              dark:text-slate-200

              shadow-sm

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:bg-gray-100
              hover:shadow-md

              dark:hover:bg-slate-800

              active:translate-y-0
              active:scale-95

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500/20
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-slate-950

              sm:w-auto
            "
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Go Back
          </button>
        </div>

        {/* Footer Message */}

        <p
          className="
            mt-10

            text-xs

            text-gray-400
            dark:text-slate-600
          "
        >
          TaskFlow • Keep your workflow moving
        </p>
      </main>
    </div>
  );
};

export default NotFound;
