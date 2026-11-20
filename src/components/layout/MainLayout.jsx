import { useEffect, useRef, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mainRef = useRef(null);

  const location = useLocation();

  /* Close mobile sidebar with Escape */

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  /* Reset page scroll after navigation */

  useEffect(() => {
    mainRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return (
    <div
      className="
        h-screen
        min-h-screen

        overflow-hidden

        bg-slate-100
        dark:bg-slate-950

        text-gray-900
        dark:text-slate-100

        transition-colors
        duration-300
      "
    >
      {/* Sidebar */}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}

      <div
        className="
          flex
          h-screen
          min-w-0
          flex-col

          lg:ml-64
        "
      >
        {/* Navbar */}

        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}

        <main
          ref={mainRef}
          id="main-content"
          className="
            flex-1
            min-w-0

            overflow-x-hidden
            overflow-y-auto

            overscroll-contain

            scroll-smooth
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl

              px-4
              sm:px-6
              lg:px-8

              pt-5
              sm:pt-6

              pb-8
              sm:pb-10
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
