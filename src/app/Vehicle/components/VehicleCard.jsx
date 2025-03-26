'use client'
import { FaUsers, FaSuitcase, FaCheck, FaTimes } from 'react-icons/fa'

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-48 bg-gray-200">
        {vehicle.images && vehicle.images.length > 0 ? (
          <img
            src={vehicle.images[0]}
            alt={vehicle.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image Available
          </div>
        )}
        <div className="absolute top-2 right-2 px-2 py-1 bg-white bg-opacity-90 rounded-full text-xs font-semibold">
          {vehicle.available ? (
            <span className="text-green-600 flex items-center">
              <FaCheck className="mr-1" /> Available
            </span>
          ) : (
            <span className="text-red-600 flex items-center">
              <FaTimes className="mr-1" /> Not Available
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{vehicle.name}</h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
            {vehicle.type}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <FaUsers className="mr-2" />
          <span className="text-sm">
            {vehicle.passengers} passengers
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <FaSuitcase className="mr-2" />
          <span className="text-sm">
            {vehicle.luggage} luggage
          </span>
        </div>
        
        <div className="mt-auto">
          <span className="text-xl font-bold text-gray-800">
            ${parseFloat(vehicle.flat_rate).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VehicleCard