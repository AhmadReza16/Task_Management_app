import { useEffect, useMemo, useState } from "react";

import { SettingsContext } from "./settings-context";

const DEFAULT_DISPLAY_NAME = "TaskFlow User";

const DEFAULT_ROLE = "TaskFlow Member";

const getStoredBoolean = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return defaultValue;
    }

    const parsedValue = JSON.parse(storedValue);

    return typeof parsedValue === "boolean" ? parsedValue : defaultValue;
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage:`, error);

    return defaultValue;
  }
};

const getStoredString = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return defaultValue;
    }

    const parsedValue = JSON.parse(storedValue);

    return typeof parsedValue === "string" && parsedValue.trim()
      ? parsedValue
      : defaultValue;
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage:`, error);

    return defaultValue;
  }
};

const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() =>
    getStoredBoolean("darkMode", false),
  );

  const [showCompleted, setShowCompleted] = useState(() =>
    getStoredBoolean("showCompleted", true),
  );

  const [highlightToday, setHighlightToday] = useState(() =>
    getStoredBoolean("highlightToday", true),
  );

  const [displayName, setDisplayName] = useState(() =>
    getStoredString("displayName", DEFAULT_DISPLAY_NAME),
  );

  const [role, setRole] = useState(() =>
    getStoredString("profileRole", DEFAULT_ROLE),
  );

  /* Dark Mode */

  useEffect(() => {
    try {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    } catch (error) {
      console.error("Failed to save dark mode:", error);
    }

    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /* Board Preference */

  useEffect(() => {
    try {
      localStorage.setItem("showCompleted", JSON.stringify(showCompleted));
    } catch (error) {
      console.error("Failed to save board preference:", error);
    }
  }, [showCompleted]);

  /* Calendar Preference */

  useEffect(() => {
    try {
      localStorage.setItem("highlightToday", JSON.stringify(highlightToday));
    } catch (error) {
      console.error("Failed to save calendar preference:", error);
    }
  }, [highlightToday]);

  /* Profile Name */

  useEffect(() => {
    try {
      localStorage.setItem("displayName", JSON.stringify(displayName));
    } catch (error) {
      console.error("Failed to save display name:", error);
    }
  }, [displayName]);

  /* Profile Role */

  useEffect(() => {
    try {
      localStorage.setItem("profileRole", JSON.stringify(role));
    } catch (error) {
      console.error("Failed to save profile role:", error);
    }
  }, [role]);

  const contextValue = useMemo(
    () => ({
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
    }),
    [darkMode, showCompleted, highlightToday, displayName, role],
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
