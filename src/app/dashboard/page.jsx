import React from 'react';
import Sidebar from '../components/sidebar'; // Import the Sidebar component

function Page() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Total Rides */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800">Total Rides</h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">1,234</p>
            </div>

            {/* Card 2: Earnings */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800">Earnings</h2>
              <p className="text-3xl font-bold text-green-600 mt-2">$5,678</p>
            </div>

            {/* Card 3: Rating */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800">Rating</h2>
              <p className="text-3xl font-bold text-yellow-600 mt-2">4.8 ★</p>
            </div>
          </div>

          {/* Recent Rides Table */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Rides</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ride ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#12345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-01</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$25.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">Completed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#12346</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-02</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$30.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-semibold">In Progress</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;