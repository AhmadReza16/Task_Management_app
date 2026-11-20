import { useContext, useEffect } from "react";

import { NavLink } from "react-router-dom";

import { ClipboardCheck, X } from "lucide-react";

import { TaskContext } from "../../context/task-context";
import { navigation } from "../../constants/navigation";

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const { tasks } = useContext(TaskContext);

  const totalTasks = tasks.length;

  const recommendedLimit = 100;

  const usagePercentage = Math.min((totalTasks / recommendedLimit) * 100, 100);

  /* Prevent background scrolling on mobile */

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Overlay */}

      <div
        aria-hidden="true"
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40

          bg-black/40
          backdrop-blur-sm

          transition-all
          duration-300
          ease-in-out

          lg:hidden

          ${
            isOpen
              ? `
                visible
                pointer-events-auto
                opacity-100
              `
              : `
                invisible
                pointer-events-none
                opacity-0
              `
          }
        `}
      />

      {/* Sidebar */}

      <aside
        aria-label="Main navigation"
        className={`
          fixed
          inset-y-0
          left-0
          z-50

          flex
          w-64
          flex-col

          border-r
          border-gray-200
          dark:border-slate-800

          bg-white
          dark:bg-slate-900

          shadow-2xl
          lg:shadow-sm

          transform-gpu

          transition-[transform,opacity]
          duration-300
          ease-in-out

          ${
            isOpen
              ? `
                translate-x-0
                opacity-100
              `
              : `
                -translate-x-full
                opacity-0
              `
          }

          lg:translate-x-0
          lg:opacity-100
        `}
      >
        {/* Logo */}

        <div
          className="
            shrink-0

            border-b
            border-gray-200
            dark:border-slate-800

            px-6
            py-6
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-13
                  w-13
                  shrink-0
                  items-center
                  justify-center

                  rounded-xl

                  bg-gradient-to-br
                  from-blue-600
                  to-cyan-500

                  shadow-lg
                "
              >
                <ClipboardCheck
                  size={28}
                  aria-hidden="true"
                  className="text-white"
                />
              </div>

              <div>
                <h1
                  className="
                    text-2xl
                    font-bold

                    text-gray-800
                    dark:text-white
                  "
                >
                  TaskFlow
                </h1>

                <p
                  className="
                    text-sm

                    text-gray-500
                    dark:text-slate-400
                  "
                >
                  Organize Smarter
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-lg

                text-gray-700
                dark:text-slate-300

                transition-all
                duration-200

                hover:bg-gray-100
                dark:hover:bg-slate-800

                active:scale-95

                lg:hidden
              "
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Navigation */}

        <nav
          className="
            sidebar-scroll

            flex-1

            overflow-y-auto
            overscroll-contain

            px-4
            py-5
          "
        >
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) => `
                  group

                  mb-3

                  flex
                  items-center
                  gap-4

                  rounded-2xl

                  px-5
                  py-3

                  font-semibold

                  transition-all
                  duration-300
                  ease-out

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-blue-600
                        to-blue-500

                        text-white

                        shadow-xl
                        shadow-blue-500/25
                      `
                      : `
                        text-gray-700
                        dark:text-slate-300

                        hover:translate-x-1
                        hover:bg-blue-50
                        hover:text-blue-600

                        dark:hover:bg-slate-800
                        dark:hover:text-blue-400
                      `
                  }
                `}
              >
                <Icon size={22} aria-hidden="true" className="shrink-0" />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}

        <div
          className="
            shrink-0

            border-t
            border-gray-200
            dark:border-slate-800

            p-6
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-sm
                font-semibold

                text-gray-700
                dark:text-slate-300
              "
            >
              Tasks Stored
            </span>

            <span
              className="
                text-sm
                font-bold

                text-blue-600
                dark:text-blue-400
              "
            >
              {totalTasks}
            </span>
          </div>

          <div
            className="
              mt-3
              h-3

              overflow-hidden

              rounded-full

              bg-gray-200
              dark:bg-slate-700
            "
          >
            <div
              role="progressbar"
              aria-label="Task storage usage"
              aria-valuemin={0}
              aria-valuemax={recommendedLimit}
              aria-valuenow={Math.min(totalTasks, recommendedLimit)}
              className="
                h-full

                rounded-full

                bg-gradient-to-r
                from-blue-600
                to-cyan-500

                transition-[width]
                duration-700
                ease-out
              "
              style={{
                width: `${usagePercentage}%`,
              }}
            />
          </div>

          <p
            className="
              mt-3

              text-xs

              text-gray-500
              dark:text-slate-400
            "
          >
            {totalTasks} of {recommendedLimit} recommended tasks
          </p>

          <div
            className="
              mt-8
              text-center
            "
          >
            <p
              className="
                text-xs

                text-gray-400
                dark:text-slate-500
              "
            >
              TaskFlow v1.0
            </p>

            <p
              className="
                mt-1

                text-xs

                text-gray-300
                dark:text-slate-600
              "
            >
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
