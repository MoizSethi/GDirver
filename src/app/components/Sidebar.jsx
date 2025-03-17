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
            <a href="/accounts" className="block p-2 hover:bg-gray-700 rounded">
              Accounts
            </a>
          </li>
          <li>
            <a href="/quotes" className="block p-2 hover:bg-gray-700 rounded">
              Quotes
            </a>
          </li>
          <li>
            <a href="/calender" className="block p-2 hover:bg-gray-700 rounded">
              Calender
            </a>
          </li>
          <li>
            <a href="/reservation" className="block p-2 hover:bg-gray-700 rounded">
            Reservation
            </a>
          </li>
          <li>
            <a href="/dispatch" className="block p-2 hover:bg-gray-700 rounded">
            Dispatch
            </a>
          </li>
          <li>
            <a href="/payable" className="block p-2 hover:bg-gray-700 rounded">
            Payable
            </a>
          </li>
          <li>
            <a href="/receivables" className="block p-2 hover:bg-gray-700 rounded">
            Receivables
            </a>
          </li>
          <li>
            <a href="/reports" className="block p-2 hover:bg-gray-700 rounded">
            Reports
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar