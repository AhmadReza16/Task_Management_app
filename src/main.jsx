import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import SettingsProvider from "./context/SettingsContext";
import TaskProvider from "./context/TaskContext";

import { NotificationProvider } from "./context/NotificationContext.jsx";

import NotificationScheduler from "./components/notifications/NotificationScheduler";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <TaskProvider>
        <NotificationProvider>
          <NotificationScheduler />

          <App />
        </NotificationProvider>
      </TaskProvider>
    </SettingsProvider>
  </StrictMode>,
);
