import { lazy, Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

const Dashboard = lazy(() => import("../pages/Dashboard"));

const Board = lazy(() => import("../pages/Board"));

const Calendar = lazy(() => import("../pages/Calendar"));

const Analytics = lazy(() => import("../pages/Analytics"));

const Settings = lazy(() => import("../pages/Settings"));

const NotFound = lazy(() => import("../pages/NotFound"));

const PageLoader = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="
        min-h-screen

        flex
        flex-col
        items-center
        justify-center
        gap-4

        bg-slate-100
        dark:bg-slate-950

        text-gray-700
        dark:text-slate-300
      "
    >
      <div
        aria-hidden="true"
        className="
          h-11
          w-11

          rounded-full

          border-4
          border-gray-300
          dark:border-slate-700

          border-t-blue-600
          dark:border-t-blue-400

          animate-spin
        "
      />

      <p className="text-sm font-medium">Loading TaskFlow...</p>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main Application */}

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="board" element={<Board />} />

            <Route path="calendar" element={<Calendar />} />

            <Route path="analytics" element={<Analytics />} />

            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
