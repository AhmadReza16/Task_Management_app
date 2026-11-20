import { useContext } from "react";

import { TaskContext } from "../../context/task-context";

import { SettingsContext } from "../../context/settings-context";

import CalendarDay from "./CalendarDay";

const CalendarGrid = ({ currentDate, setSelectedDate, setSelectedTasks }) => {
  const year = currentDate.getFullYear();

  const month = currentDate.getMonth();

  const { tasks } = useContext(TaskContext);

  const { showCompleted } = useContext(SettingsContext);

  /* =====================================
     Calendar Information
  ===================================== */

  const totalDays = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const prevMonthDays = new Date(year, month, 0).getDate();

  const weekDays = [
    {
      short: "S",
      full: "Sun",
    },
    {
      short: "M",
      full: "Mon",
    },
    {
      short: "T",
      full: "Tue",
    },
    {
      short: "W",
      full: "Wed",
    },
    {
      short: "T",
      full: "Thu",
    },
    {
      short: "F",
      full: "Fri",
    },
    {
      short: "S",
      full: "Sat",
    },
  ];

  /* =====================================
     Previous Month Days
  ===================================== */

  const previousDays = Array.from(
    {
      length: firstDay,
    },
    (_, index) => ({
      day: prevMonthDays - firstDay + index + 1,

      currentMonth: false,
    }),
  );

  /* =====================================
     Current Month Days
  ===================================== */

  const currentDays = Array.from(
    {
      length: totalDays,
    },
    (_, index) => ({
      day: index + 1,
      currentMonth: true,
    }),
  );

  /* =====================================
     Next Month Days
  ===================================== */

  const totalCells = 42;

  const remainingCells = totalCells - previousDays.length - currentDays.length;

  const nextDays = Array.from(
    {
      length: remainingCells,
    },
    (_, index) => ({
      day: index + 1,
      currentMonth: false,
    }),
  );

  const calendarDays = [...previousDays, ...currentDays, ...nextDays];

  return (
    <div
      className="
        w-full
        min-w-0

        overflow-hidden

        rounded-b-3xl

        bg-white
        dark:bg-slate-900
      "
    >
      {/* =====================================
          Week Header
      ===================================== */}

      <div
        className="
          grid
          min-w-0
          grid-cols-7

          border-b
          border-gray-200
          dark:border-slate-700

          bg-gradient-to-r
          from-slate-50
          via-white
          to-slate-50

          dark:from-slate-800
          dark:via-slate-900
          dark:to-slate-800
        "
      >
        {weekDays.map((day) => (
          <div
            key={day.full}
            className="
              min-w-0

              overflow-hidden

              px-1
              py-3

              text-center

              text-[10px]
              font-bold

              uppercase
              tracking-wide

              text-gray-500
              dark:text-slate-400

              sm:py-4
              sm:text-sm
              sm:tracking-wider
            "
          >
            {/* Mobile */}

            <span className="sm:hidden">{day.short}</span>

            {/* Tablet / Desktop */}

            <span className="hidden sm:inline">{day.full}</span>
          </div>
        ))}
      </div>

      {/* =====================================
          Calendar Grid
      ===================================== */}

      <div
        className="
          grid
          w-full
          min-w-0
          grid-cols-7

          gap-px

          overflow-hidden

          bg-gray-200
          dark:bg-slate-800
        "
      >
        {calendarDays.map((item, index) => {
          const dayTasks = tasks.filter((task) => {
            if (!showCompleted && task.status === "Completed") {
              return false;
            }

            if (!item.currentMonth) {
              return false;
            }

            const dueDate = new Date(task.dueDate);

            return (
              dueDate.getDate() === item.day &&
              dueDate.getMonth() === month &&
              dueDate.getFullYear() === year
            );
          });

          return (
            <div
              key={`${year}-${month}-${index}`}
              className="
                  min-w-0
                  overflow-hidden
                "
            >
              <CalendarDay
                day={item.day}
                currentMonth={item.currentMonth}
                tasks={dayTasks}
                onClick={() => {
                  if (!item.currentMonth) {
                    return;
                  }

                  setSelectedDate(new Date(year, month, item.day));

                  setSelectedTasks(dayTasks);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
