import { Bell, ChevronDown, Menu, User } from "lucide-react";

import { useContext, useEffect, useRef, useState } from "react";

import { NotificationContext } from "../../context/notification-context";

import { SettingsContext } from "../../context/settings-context";

import NotificationDropdown from "../notifications/NotificationDropdown";
import ProfileMenu from "../navbar/ProfileMenu";

const Navbar = ({ onMenuClick }) => {
  const { unreadCount } = useContext(NotificationContext);

  const { displayName, role } = useContext(SettingsContext);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationRef = useRef(null);

  const profileRef = useRef(null);

  const profileName = displayName?.trim() || "TaskFlow User";

  const profileRole = role?.trim() || "TaskFlow Member";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsNotificationOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNotificationToggle = () => {
    setIsNotificationOpen((previous) => !previous);

    setIsProfileOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen((previous) => !previous);

    setIsNotificationOpen(false);
  };

  const notificationLabel =
    unreadCount > 0
      ? `Open notifications. ${unreadCount} unread.`
      : "Open notifications";

  return (
    <header
      className="
        sticky
        top-0
        z-30

        animate-slideDown

        border-b
        border-gray-200
        dark:border-slate-800

        bg-white/90
        dark:bg-slate-900/90

        backdrop-blur-md

        shadow-sm
      "
    >
      <div
        className="
          flex
          items-center

          px-4
          py-4

          sm:px-6
          lg:px-8
        "
      >
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-xl

            bg-gray-100
            dark:bg-slate-800

            text-gray-700
            dark:text-white

            lg:hidden
          "
        >
          <Menu size={22} />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}

          <div ref={notificationRef} className="relative">
            <button
              type="button"
              onClick={handleNotificationToggle}
              aria-label={notificationLabel}
              aria-expanded={isNotificationOpen}
              className="
                relative

                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-xl

                bg-gray-100
                dark:bg-slate-800

                text-gray-700
                dark:text-white
              "
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -right-1
                    -top-1

                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center

                    rounded-full

                    bg-red-500

                    px-1

                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            <NotificationDropdown
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>

          {/* Profile */}

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={handleProfileToggle}
              aria-label={`Open profile menu for ${profileName}`}
              aria-expanded={isProfileOpen}
              className="
                group

                flex
                items-center
                gap-3

                rounded-xl

                p-1.5

                hover:bg-gray-100
                dark:hover:bg-slate-800

                sm:px-3
                sm:py-2
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center

                  rounded-xl

                  bg-gradient-to-br
                  from-blue-600
                  to-cyan-500

                  text-white
                "
              >
                <User size={20} strokeWidth={2.2} />
              </div>

              <div
                className="
                  hidden
                  min-w-0
                  max-w-[180px]

                  md:block
                "
              >
                <p
                  className="
                    truncate

                    font-semibold

                    text-gray-800
                    dark:text-white
                  "
                >
                  {profileName}
                </p>

                <p
                  className="
                    truncate

                    text-sm

                    text-gray-500
                    dark:text-slate-400
                  "
                >
                  {profileRole}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`
                  hidden

                  text-gray-400
                  dark:text-slate-500

                  transition-transform

                  md:block

                  ${isProfileOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            <ProfileMenu
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
