import { useContext, useRef, useState } from "react";

import {
  CalendarDays,
  CheckSquare,
  Download,
  Moon,
  RotateCcw,
  Save,
  Trash2,
  Upload,
  User,
} from "lucide-react";

import toast from "react-hot-toast";

import { TaskContext } from "../context/task-context";

import { SettingsContext } from "../context/settings-context";

import SettingSection from "../components/settings/SettingSection";
import ToggleOption from "../components/settings/ToggleOption";
import ActionButton from "../components/settings/ActionButton";
import ConfirmModal from "../components/common/ConfirmModal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import FadeIn from "../components/animations/FadeIn";

import { parseTaskBackup } from "../utils/taskBackup";

const DEFAULT_DISPLAY_NAME = "TaskFlow User";

const DEFAULT_ROLE = "TaskFlow Member";

const Settings = () => {
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  const { tasks, setTasks } = useContext(TaskContext);

  const {
    darkMode,
    setDarkMode,

    showCompleted,
    setShowCompleted,

    highlightToday,
    setHighlightToday,

    displayName,
    setDisplayName,

    role,
    setRole,
  } = useContext(SettingsContext);

  /* Profile */

  const [profileName, setProfileName] = useState(displayName);

  const [profileRole, setProfileRole] = useState(role);

  const saveProfile = () => {
    const normalizedName = profileName.trim();

    const normalizedRole = profileRole.trim();

    if (!normalizedName) {
      toast.error("Display name is required.");

      return;
    }

    if (!normalizedRole) {
      toast.error("Role is required.");

      return;
    }

    setDisplayName(normalizedName);

    setRole(normalizedRole);

    setProfileName(normalizedName);

    setProfileRole(normalizedRole);

    toast.success("Profile updated successfully.");
  };

  /* Statistics */

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const storageSize = (new Blob([JSON.stringify(tasks)]).size / 1024).toFixed(
    2,
  );

  /* Export */

  const exportTasks = () => {
    const data = JSON.stringify(tasks, null, 2);

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "taskflow-backup.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("Tasks exported successfully.");
  };

  /* Import */

  const importTasks = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const importedTasks = parseTaskBackup(event.target.result);

        setTasks(importedTasks);

        toast.success("Tasks imported successfully.");
      } catch {
        toast.error("Invalid backup file.");
      }
    };

    reader.onerror = () => {
      toast.error("Unable to read backup file.");
    };

    reader.readAsText(file);

    event.target.value = "";
  };

  /* Clear */

  const clearTasks = () => {
    setIsClearModalOpen(true);
  };

  const confirmClearTasks = () => {
    setTasks([]);

    localStorage.removeItem("tasks");

    toast.success("All tasks deleted.");

    setIsClearModalOpen(false);
  };

  /* Reset */

  const resetSettings = () => {
    setDarkMode(false);

    setShowCompleted(true);

    setHighlightToday(true);

    setDisplayName(DEFAULT_DISPLAY_NAME);

    setRole(DEFAULT_ROLE);

    setProfileName(DEFAULT_DISPLAY_NAME);

    setProfileRole(DEFAULT_ROLE);

    toast.success("Settings restored.");
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <FadeIn>
        <section className="flex flex-col gap-3">
          <span
            className="
              inline-flex
              w-fit
              items-center

              rounded-full

              bg-blue-100
              dark:bg-blue-900/30

              px-4
              py-1

              text-sm
              font-semibold

              text-blue-700
              dark:text-blue-300
            "
          >
            ⚙️ Workspace Preferences
          </span>

          <h1
            className="
              text-4xl
              md:text-5xl

              font-bold
              tracking-tight

              text-gray-800
              dark:text-white
            "
          >
            Settings
          </h1>

          <p
            className="
              max-w-2xl

              text-base
              md:text-lg

              leading-7

              text-gray-500
              dark:text-slate-400
            "
          >
            Customize your workspace, manage your data, and control how your
            tasks, board, and calendar behave.
          </p>
        </section>
      </FadeIn>

      {/* Profile Preferences */}

      <SettingSection
        title="Profile Preferences"
        description="Customize the name and role shown in your TaskFlow profile."
      >
        <div
          className="
            grid
            gap-6

            xl:grid-cols-[1fr_320px]
          "
        >
          {/* Form */}

          <div
            className="
              rounded-2xl

              border
              border-gray-200
              dark:border-slate-700

              bg-gray-50
              dark:bg-slate-800/50

              p-5
              sm:p-6
            "
          >
            <div
              className="
                grid
                gap-5

                md:grid-cols-2
              "
            >
              <Input
                label="Name"
                name="displayName"
                value={profileName}
                onChange={(event) => setProfileName(event.target.value)}
                placeholder="Enter your name"
                maxLength={50}
                autoComplete="name"
              />

              <Input
                label="Role"
                name="profileRole"
                value={profileRole}
                onChange={(event) => setProfileRole(event.target.value)}
                placeholder="e.g. Full Stack Developer"
                maxLength={60}
                autoComplete="organization-title"
              />
            </div>

            <p
              className="
                mt-4

                text-sm
                leading-6

                text-gray-500
                dark:text-slate-400
              "
            >
              Your profile information is stored locally in this browser.
            </p>

            <div
              className="
                mt-6
                flex
                justify-end
              "
            >
              <Button
                type="button"
                variant="primary"
                onClick={saveProfile}
                className="
                  w-full

                  sm:w-auto
                  sm:px-6
                "
              >
                <Save size={17} aria-hidden="true" />
                Save Profile
              </Button>
            </div>
          </div>

          {/* Preview */}

          <div
            className="
              relative

              flex
              items-center

              overflow-hidden

              rounded-2xl

              bg-gradient-to-br
              from-blue-600
              to-cyan-500

              p-6

              shadow-lg
              shadow-blue-500/10
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute
                -right-10
                -top-10

                h-32
                w-32

                rounded-full

                bg-white/10
              "
            />

            <div
              className="
                relative

                flex
                min-w-0
                items-center
                gap-4
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center

                  rounded-2xl

                  border
                  border-white/25

                  bg-white/15
                "
              >
                <User
                  size={27}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className="text-white"
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    mb-1

                    text-xs
                    font-medium

                    text-blue-100
                  "
                >
                  Profile Preview
                </p>

                <h3
                  className="
                    truncate

                    text-lg
                    font-bold

                    text-white
                  "
                >
                  {profileName.trim() || DEFAULT_DISPLAY_NAME}
                </h3>

                <p
                  className="
                    mt-1
                    truncate

                    text-sm

                    text-blue-100
                  "
                >
                  {profileRole.trim() || DEFAULT_ROLE}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SettingSection>

      {/* Appearance */}

      <SettingSection
        title="Appearance"
        description="Customize your application theme."
      >
        <ToggleOption
          title="Dark Mode"
          description="Switch between light and dark theme."
          enabled={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
          icon={<Moon size={18} />}
        />
      </SettingSection>

      {/* Board */}

      <SettingSection
        title="Board Preferences"
        description="Customize your Kanban board."
      >
        <ToggleOption
          title="Show Completed Tasks"
          description="Display completed tasks inside the board."
          enabled={showCompleted}
          onToggle={() => setShowCompleted(!showCompleted)}
          icon={<CheckSquare size={18} />}
        />
      </SettingSection>

      {/* Calendar */}

      <SettingSection
        title="Calendar"
        description="Customize calendar behavior."
      >
        <ToggleOption
          title="Highlight Today's Date"
          description="Highlight today's date inside the calendar."
          enabled={highlightToday}
          onToggle={() => setHighlightToday(!highlightToday)}
          icon={<CalendarDays size={18} />}
        />
      </SettingSection>

      {/* Data Management */}

      <SettingSection
        title="Data Management"
        description="Backup, restore and manage your tasks."
      >
        <div
          className="
            grid
            gap-4

            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <ActionButton
            label="Export Tasks"
            color="green"
            icon={<Download size={18} />}
            onClick={exportTasks}
          />

          <ActionButton
            label="Import Tasks"
            color="blue"
            icon={<Upload size={18} />}
            onClick={importTasks}
          />

          <ActionButton
            label="Reset Settings"
            color="yellow"
            icon={<RotateCcw size={18} />}
            onClick={resetSettings}
          />

          <ActionButton
            label="Clear All"
            color="red"
            icon={<Trash2 size={18} />}
            onClick={clearTasks}
          />
        </div>
      </SettingSection>

      {/* Workspace Statistics */}

      <SettingSection
        title="Workspace Statistics"
        description="Overview of your current TaskFlow workspace."
      >
        <div
          className="
            grid
            gap-5

            md:grid-cols-3
          "
        >
          <div
            className="
              rounded-2xl

              border
              border-gray-200
              dark:border-slate-700

              bg-white
              dark:bg-slate-800

              p-6

              shadow-sm
              hover:shadow-lg

              transition-shadow
              duration-300
            "
          >
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Total Tasks
            </p>

            <h3
              className="
                mt-3

                text-4xl
                font-bold
                tabular-nums

                text-gray-800
                dark:text-white
              "
            >
              {tasks.length}
            </h3>

            <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
              All created tasks
            </p>
          </div>

          <div
            className="
              rounded-2xl

              border
              border-gray-200
              dark:border-slate-700

              bg-white
              dark:bg-slate-800

              p-6

              shadow-sm
              hover:shadow-lg

              transition-shadow
              duration-300
            "
          >
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Completed
            </p>

            <h3
              className="
                mt-3

                text-4xl
                font-bold
                tabular-nums

                text-green-600
                dark:text-green-400
              "
            >
              {completedTasks}
            </h3>

            <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
              Finished successfully
            </p>
          </div>

          <div
            className="
              rounded-2xl

              border
              border-gray-200
              dark:border-slate-700

              bg-white
              dark:bg-slate-800

              p-6

              shadow-sm
              hover:shadow-lg

              transition-shadow
              duration-300
            "
          >
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Storage Used
            </p>

            <h3
              className="
                mt-3

                text-4xl
                font-bold
                tabular-nums

                text-blue-600
                dark:text-blue-400
              "
            >
              {storageSize} KB
            </h3>

            <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
              Browser Local Storage
            </p>
          </div>
        </div>
      </SettingSection>

      {/* About */}

      <SettingSection
        title="About TaskFlow"
        description="Application information and technology stack."
      >
        <div className="space-y-8">
          <div
            className="
              grid
              gap-6

              md:grid-cols-2
            "
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Version
              </p>

              <h3 className="mt-2 font-semibold text-gray-800 dark:text-white">
                v1.0.0
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Last Updated
              </p>

              <h3 className="mt-2 font-semibold text-gray-800 dark:text-white">
                November 2026
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Developer
              </p>

              <h3 className="mt-2 font-semibold text-gray-800 dark:text-white">
                AhmadReza16
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Storage
              </p>

              <h3 className="mt-2 font-semibold text-gray-800 dark:text-white">
                Local Storage
              </h3>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-700 dark:text-slate-200">
              Built With
            </h3>

            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Vite",
                "Tailwind CSS",
                "React Router",
                "Context API",
                "Local Storage",
                "React Hot Toast",
                "Hello Pangea DnD",
                "Lucide React",
              ].map((technology) => (
                <span
                  key={technology}
                  className="
                      rounded-full

                      bg-blue-100
                      dark:bg-blue-900/30

                      px-4
                      py-2

                      text-sm
                      font-medium

                      text-blue-700
                      dark:text-blue-300

                      hover:scale-105

                      transition-transform
                      duration-200
                    "
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SettingSection>

      <ConfirmModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={confirmClearTasks}
        title="Clear All Tasks"
        message="This action will permanently delete every task from TaskFlow. This cannot be undone."
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileImport}
        className="hidden"
      />
    </div>
  );
};

export default Settings;
