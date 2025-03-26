"use client"; // Mark as a Client Component

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section: Logo and Toggle Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle Sidebar"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="text-xl font-semibold text-gray-800">CRM Dashboard</span>
        </div>

        {/* Right Section: User Profile */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">John Doe</span>
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}