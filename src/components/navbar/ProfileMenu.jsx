import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Settings,
  User,
} from "lucide-react";

import { useContext, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import { TaskContext } from "../../context/task-context";

import { SettingsContext } from "../../context/settings-context";

const ProfileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const { tasks = [] } = useContext(TaskContext);

  const { displayName, role } = useContext(SettingsContext);

  const profileName = displayName?.trim() || "TaskFlow User";

  const profileRole = role?.trim() || "TaskFlow Member";

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "Completed").length,
    [tasks],
  );

  const completionRate = useMemo(() => {
    if (tasks.length === 0) {
      return 0;
    }

    return Math.round((completedTasks / tasks.length) * 100);
  }, [completedTasks, tasks.length]);

  if (!isOpen) return null;

  const handleSettings = () => {
    onClose?.();
    navigate("/settings");
  };

  return (
    <div
      role="menu"
      aria-label={`${profileName} profile menu`}
      className="
        fixed
        left-4
        right-4
        top-20
        z-50

        flex
        max-h-[calc(100dvh-6rem)]
        flex-col

        overflow-hidden

        rounded-3xl

        border
        border-gray-200
        dark:border-slate-700

        bg-white
        dark:bg-slate-900

        shadow-[0_24px_70px_rgba(15,23,42,0.20)]

        animate-pop

        sm:absolute
        sm:left-auto
        sm:right-0
        sm:top-14
        sm:w-[380px]
        sm:max-h-[calc(100dvh-5rem)]
      "
    >
      {/* Profile Header */}

      <div
        className="
          relative
          shrink-0
          overflow-hidden

          bg-gradient-to-br
          from-blue-600
          via-blue-500
          to-cyan-500

          px-5
          py-6

          sm:px-6
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            -right-16
            -top-16

            h-44
            w-44

            rounded-full

            bg-white/10

            blur-xl
          "
        />

        <div
          className="
            relative

            flex
            items-center
            gap-4
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center

              rounded-2xl

              border
              border-white/30

              bg-white/15

              shadow-lg
            "
          >
            <User size={30} strokeWidth={2.2} className="text-white" />
          </div>

          <div className="min-w-0">
            <h3
              className="
                truncate

                text-xl
                font-bold

                text-white

                sm:text-2xl
              "
            >
              {profileName}
            </h3>

            <p
              className="
                mt-1.5

                truncate

                text-sm
                font-medium

                text-blue-100

                sm:text-base
              "
            >
              {profileRole}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}

      <div
        className="
          min-h-0
          flex-1

          overflow-y-auto
          overscroll-contain
        "
      >
        {/* Statistics */}

        <div
          className="
            grid
            grid-cols-2

            border-b
            border-gray-200
            dark:border-slate-800
          "
        >
          <div
            className="
              border-r
              border-gray-200
              dark:border-slate-800

              px-4
              py-4

              sm:px-5
            "
          >
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-xl

                  bg-blue-50
                  dark:bg-blue-900/30
                "
              >
                <CalendarDays
                  size={18}
                  className="
                    text-blue-600
                    dark:text-blue-400
                  "
                />
              </div>

              <span
                className="
                  text-xs
                  font-semibold

                  text-gray-500
                  dark:text-slate-400

                  sm:text-sm
                "
              >
                Total Tasks
              </span>
            </div>

            <p
              className="
                mt-2

                text-2xl
                font-bold

                text-gray-800
                dark:text-white
              "
            >
              {tasks.length}
            </p>
          </div>

          <div
            className="
              px-4
              py-4

              sm:px-5
            "
          >
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-xl

                  bg-green-50
                  dark:bg-green-900/30
                "
              >
                <CheckCircle2
                  size={18}
                  className="
                    text-green-600
                    dark:text-green-400
                  "
                />
              </div>

              <span
                className="
                  text-xs
                  font-semibold

                  text-gray-500
                  dark:text-slate-400

                  sm:text-sm
                "
              >
                Completion
              </span>
            </div>

            <p
              className="
                mt-2

                text-2xl
                font-bold

                text-gray-800
                dark:text-white
              "
            >
              {completionRate}%
            </p>
          </div>
        </div>

        {/* Progress */}

        <div
          className="
            border-b
            border-gray-200
            dark:border-slate-800

            px-5
            py-4
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <span
              className="
                text-sm
                font-semibold

                text-gray-700
                dark:text-slate-200
              "
            >
              Workspace progress
            </span>

            <span
              className="
                text-xs
                font-bold

                text-blue-600
                dark:text-blue-400
              "
            >
              {completedTasks}/{tasks.length}
            </span>
          </div>

          <div
            className="
              mt-3
              h-2

              overflow-hidden

              rounded-full

              bg-gray-100
              dark:bg-slate-800
            "
          >
            <div
              className="
                h-full

                rounded-full

                bg-gradient-to-r
                from-blue-600
                to-cyan-500

                transition-[width]
                duration-500
              "
              style={{
                width: `${completionRate}%`,
              }}
            />
          </div>
        </div>

        {/* Settings */}

        <div className="p-4">
          <button
            type="button"
            role="menuitem"
            onClick={handleSettings}
            className="
              group

              flex
              w-full
              items-center
              gap-3

              rounded-2xl

              px-3
              py-3

              text-left

              hover:bg-gray-50
              dark:hover:bg-slate-800

              transition-all
              duration-200
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center

                rounded-xl

                bg-gray-100
                dark:bg-slate-800
              "
            >
              <Settings
                size={20}
                className="
                  text-gray-600
                  dark:text-slate-300
                "
              />
            </div>

            <div
              className="
                min-w-0
                flex-1
              "
            >
              <p
                className="
                  text-sm
                  font-semibold

                  text-gray-800
                  dark:text-white
                "
              >
                Profile & Settings
              </p>

              <p
                className="
                  mt-0.5

                  text-xs

                  text-gray-500
                  dark:text-slate-400
                "
              >
                Manage profile and application preferences
              </p>
            </div>

            <ChevronRight
              size={18}
              className="
                shrink-0

                text-gray-400
                dark:text-slate-500

                transition-transform

                group-hover:translate-x-1
              "
            />
          </button>
        </div>

        {/* Footer */}

        <div
          className="
            border-t
            border-gray-100
            dark:border-slate-800

            bg-gray-50/70
            dark:bg-slate-950/40

            px-5
            py-3
          "
        >
          <p
            className="
              text-center

              text-xs

              text-gray-400
              dark:text-slate-500
            "
          >
            TaskFlow • Organize Smarter
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
