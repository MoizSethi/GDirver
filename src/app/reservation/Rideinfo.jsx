import React from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';

function Rideinfo({
  currentStep,
  formData = {}, // Default to an empty object to prevent undefined errors
  handleInputChange,
  handleStopChange,
  addStop,
  removeStop,
  nextStep,
}) {
  return (
    <div className={`p-6 ${currentStep === 1 ? 'block' : 'hidden'}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ride Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
            Service Type*
          </label>
          <select
            id="rideType"
            name="serviceType"
            value={formData.serviceType || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Service Type</option>
            <option value="hourly">Hourly Service</option>
            <option value="from_airport">From Airport</option>
            <option value="to_airport">To Airport</option>
            <option value="point_to_point">Point To Point</option>
            <option value="prom_tour">Prom Tour</option>
            <option value="round_trip">Round Trip</option>
          </select>
        </div>
        <div>
          <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
            Pick-Up Date*
          </label>
          <input
            type="date"
            id="pickupDateTime"
            name="pickupDate"
            value={formData.pickupDate || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
            Pick-Up Time*
          </label>
          <input
            type="time"
            id="pickupTime"
            name="pickupTime"
            value={formData.pickupTime || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {formData.serviceType === 'hourly' && (
          <div>
            <label htmlFor="numberOfHours" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Hours*
            </label>
            <input
              type="number"
              id="numberOfHours"
              name="numberOfHours"
              value={formData.numberOfHours || ''}
              onChange={handleInputChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        )}
        <div className="md:col-span-2">
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Pick-Up Location*
          </label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation || ''}
            onChange={handleInputChange}
            placeholder="Enter address, airport, or landmark"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Drop-Off Location*
          </label>
          <input
            type="text"
            id="dropoffLocation"
            name="dropoffLocation"
            value={formData.dropoffLocation || ''}
            onChange={handleInputChange}
            placeholder="Enter address, airport, or landmark"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Stops</label>
          <div className="space-y-2">
            {formData.additionalStops?.map((stop, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={stop}
                  onChange={(e) => handleStopChange(index, e.target.value)}
                  placeholder="Enter stop address"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeStop(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addStop}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            <FaPlus className="inline mr-2" />
            Add Stop
          </button>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="next-step px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Continue to Vehicles
        </button>
      </div>
    </div>
  );
}

export default Rideinfo;
