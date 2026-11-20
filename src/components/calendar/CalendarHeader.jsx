import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const CalendarHeader = ({ currentDate, setCurrentDate }) => {
  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div
      className="
        relative

        flex
        flex-col

        gap-5

        border-b
        border-gray-200
        dark:border-slate-700

        bg-gradient-to-r
        from-slate-50
        via-white
        to-slate-50

        px-4
        py-5

        dark:from-slate-900
        dark:via-slate-900
        dark:to-slate-900

        sm:px-6
        sm:py-6

        lg:flex-row
        lg:items-center
        lg:justify-between
        lg:px-8
        lg:py-7
      "
    >
      {/* =====================================
          Mobile / Tablet Month
      ===================================== */}

      <div
        className="
          flex
          min-w-0
          items-center
          justify-center
          gap-3

          lg:absolute
          lg:left-1/2
          lg:-translate-x-1/2
        "
      >
        <div
          className="
            hidden
            h-11
            w-11
            shrink-0
            items-center
            justify-center

            rounded-2xl

            bg-blue-100
            dark:bg-blue-900/30

            sm:flex

            lg:h-12
            lg:w-12
          "
        >
          <CalendarDays
            size={23}
            aria-hidden="true"
            className="
              text-blue-600
              dark:text-blue-400
            "
          />
        </div>

        <div
          className="
            min-w-0
            text-center
          "
        >
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]

              text-gray-400
              dark:text-slate-500

              sm:text-xs
            "
          >
            Current Month
          </p>

          <h2
            className="
              mt-1

              truncate

              text-xl
              font-bold
              tracking-tight

              text-gray-800
              dark:text-white

              sm:text-2xl
              md:text-3xl
            "
          >
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
      </div>

      {/* =====================================
          Navigation Controls
      ===================================== */}

      <div
        className="
          flex
          w-full
          items-center
          justify-between
          gap-3

          lg:w-auto
          lg:justify-start
        "
      >
        {/* Previous */}

        <button
          type="button"
          onClick={previousMonth}
          aria-label="Previous month"
          className="
            group

            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center

            rounded-xl

            border
            border-gray-200
            dark:border-slate-700

            bg-white
            dark:bg-slate-800

            text-gray-700
            dark:text-slate-200

            shadow-sm

            transition-all
            duration-200

            hover:border-blue-300
            hover:bg-blue-50
            hover:text-blue-600
            hover:shadow-md

            dark:hover:border-blue-700
            dark:hover:bg-slate-700
            dark:hover:text-blue-400

            active:scale-95
          "
        >
          <ChevronLeft
            size={20}
            aria-hidden="true"
            className="
              transition-transform
              duration-200

              group-hover:-translate-x-0.5
            "
          />
        </button>

        {/* Today */}

        <button
          type="button"
          onClick={goToToday}
          className="
            group

            inline-flex
            min-w-0
            flex-1
            items-center
            justify-center
            gap-2

            rounded-xl

            bg-gradient-to-r
            from-blue-600
            to-cyan-500

            px-4
            py-2.5

            text-sm
            font-semibold

            text-white

            shadow-md

            transition-all
            duration-200

            hover:shadow-lg

            active:scale-[0.98]

            sm:flex-none
            sm:px-6
            sm:py-3

            lg:order-3
            lg:absolute
            lg:right-8
          "
        >
          <CalendarDays
            size={17}
            aria-hidden="true"
            className="
              shrink-0

              transition-transform
              duration-200

              group-hover:rotate-12
            "
          />

          <span>Today</span>
        </button>

        {/* Next */}

        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="
            group

            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center

            rounded-xl

            border
            border-gray-200
            dark:border-slate-700

            bg-white
            dark:bg-slate-800

            text-gray-700
            dark:text-slate-200

            shadow-sm

            transition-all
            duration-200

            hover:border-blue-300
            hover:bg-blue-50
            hover:text-blue-600
            hover:shadow-md

            dark:hover:border-blue-700
            dark:hover:bg-slate-700
            dark:hover:text-blue-400

            active:scale-95
          "
        >
          <ChevronRight
            size={20}
            aria-hidden="true"
            className="
              transition-transform
              duration-200

              group-hover:translate-x-0.5
            "
          />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
