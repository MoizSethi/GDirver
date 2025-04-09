"use client";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaCar, FaSuitcase, FaUsers, FaDollarSign } from "react-icons/fa";
import { getAllVehicles } from "@/services/vehicleService";

const DisplayVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getAllVehicles();
        if (data.success) {
          setVehicles(data.vehicles);
        } else {
          throw new Error('Failed to load vehicles data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <div className="text-center py-10">Loading vehicles...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!vehicles.length) return <div className="text-center py-10">No vehicles available</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

const VehicleCard = ({ vehicle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === (vehicle.images?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? (vehicle.images?.length || 0) - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Slider */}
      <div className="relative h-48 bg-gray-200">
        {vehicle.images?.length > 0 ? (
          <>
            <img 
              src={vehicle.images[currentImageIndex]} 
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
            {vehicle.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
                >
                  <FaChevronRight />
                </button>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                  {vehicle.images.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-2 w-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <FaCar size={48} />
          </div>
        )}
      </div>

      {/* Vehicle Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
        <p className="text-gray-600 mb-3 flex items-center">
          <FaCar className="mr-2 text-blue-500" />
          Type: {vehicle.type}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center">
            <FaUsers className="mr-2 text-blue-500" />
            <span>{vehicle.passengers} Passengers</span>
          </div>
          <div className="flex items-center">
            <FaSuitcase className="mr-2 text-blue-500" />
            <span>{vehicle.luggage} Luggage</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold flex items-center">
            <FaDollarSign className="mr-1 text-green-500" />
            {vehicle.flat_rate.toFixed(2)}/day
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            onClick={() => alert(`Booking ${vehicle.name}`)}
          >
            Book Now
          </button>
        </div>

        {!vehicle.available && (
          <div className="mt-2 text-sm text-red-500">Currently unavailable</div>
        )}
      </div>
    </div>
  );
};

export default DisplayVehicle;