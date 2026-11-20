import { useState } from "react";

import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarGrid from "../components/calendar/CalendarGrid";
import TaskPopup from "../components/calendar/TaskPopup";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedTasks, setSelectedTasks] = useState([]);

  /* =====================================
     Close Task Popup
  ===================================== */

  const closeTaskPopup = () => {
    setSelectedDate(null);
    setSelectedTasks([]);
  };

  return (
    <div
      className="
        w-full
        min-w-0

        overflow-x-hidden

        space-y-7
        sm:space-y-8

        animate-fadeIn
      "
    >
      {/* =====================================
          Page Header
      ===================================== */}

      <section
        className="
          flex
          min-w-0
          flex-col
          gap-3
        "
      >
        <span
          className="
            inline-flex
            w-fit
            max-w-full
            items-center

            rounded-full

            bg-blue-100
            dark:bg-blue-900/30

            px-3
            py-1

            text-xs
            font-semibold

            text-blue-700
            dark:text-blue-300

            sm:px-4
            sm:text-sm
          "
        >
          📅 Calendar Planner
        </span>

        <h1
          className="
            break-words

            text-3xl
            sm:text-4xl
            md:text-5xl

            font-bold
            tracking-tight

            text-gray-800
            dark:text-white
          "
        >
          Calendar
        </h1>

        <p
          className="
            max-w-2xl

            text-sm
            sm:text-base
            md:text-lg

            leading-6
            sm:leading-7

            text-gray-500
            dark:text-slate-400
          "
        >
          Stay ahead of deadlines by viewing your entire task schedule in one
          place. Quickly identify upcoming work, overdue items, and daily
          priorities.
        </p>
      </section>

      {/* =====================================
          Calendar Card
      ===================================== */}

      <section
        className="
          relative

          w-full
          min-w-0

          overflow-hidden

          rounded-2xl
          sm:rounded-3xl

          border
          border-gray-200
          dark:border-slate-700

          bg-white/90
          dark:bg-slate-900/90

          backdrop-blur-md

          shadow-sm

          transition-shadow
          duration-300

          hover:shadow-xl
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

            opacity-30
            dark:opacity-10
          "
        >
          <div
            className="
              absolute

              -right-20
              -top-20

              h-48
              w-48

              rounded-full

              bg-blue-200

              blur-3xl

              sm:h-60
              sm:w-60
            "
          />

          <div
            className="
              absolute

              -bottom-24
              -left-20

              h-48
              w-48

              rounded-full

              bg-cyan-200

              blur-3xl

              sm:h-60
              sm:w-60
            "
          />
        </div>

        {/* Calendar Content */}

        <div
          className="
            relative
            z-10

            w-full
            min-w-0
          "
        >
          <CalendarHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />

          <CalendarGrid
            currentDate={currentDate}
            setSelectedDate={setSelectedDate}
            setSelectedTasks={setSelectedTasks}
          />
        </div>
      </section>

      {/* =====================================
          Task Popup
      ===================================== */}

      <TaskPopup
        isOpen={Boolean(selectedDate)}
        selectedDate={selectedDate}
        tasks={selectedTasks}
        onClose={closeTaskPopup}
      />
    </div>
  );
};

export default Calendar;
