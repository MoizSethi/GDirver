import React from 'react'

function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Driver App</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/profile" className="block p-2 hover:bg-gray-700 rounded">
              Profile
            </a>
          </li>
          <li>
            <a href="/settings" className="block p-2 hover:bg-gray-700 rounded">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar