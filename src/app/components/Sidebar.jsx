"use client"; // Mark as a Client Component

import { useEffect } from "react";

export default function Sidebar({ isOpen, closeSidebar }) {
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeSidebar]);

  return (
    <>
      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar bg-gray-800 text-white fixed top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* Close Button */}
          <button
            onClick={closeSidebar}
            className="text-gray-400 hover:text-white focus:outline-none absolute top-2 right-2"
            aria-label="Close Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-xl font-semibold">Menu</h2>
          <nav className="mt-4">
            <ul>
              <li className="mb-2">
                <a
                  href="/dashboard"
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={closeSidebar}
                >
                  Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/accounts"
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={closeSidebar}
                >
                  Accounts
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/calendar"
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={closeSidebar}
                >
                  Calender
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/dispatch"
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={closeSidebar}
                >
                  Dispatch
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/payable"
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={closeSidebar}
                >
                  Payable
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/quotes"
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={closeSidebar}
                >
                  Quotes
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/recievables"
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={closeSidebar}
                >
                  Recievables
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/reports"
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={closeSidebar}
                >
                  Reports
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/settings"
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={closeSidebar}
                >
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}