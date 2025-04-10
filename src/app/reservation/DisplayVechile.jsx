import React from 'react';

function DisplayVechile({ currentStep, vehicles, selectedVehicle, selectVehicle, prevStep, nextStep }) {
    return (
        <div className={`p-6 ${currentStep === 2 ? 'block' : 'hidden'}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Vehicle</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        className={`bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                            selectedVehicle?.id === vehicle.id
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-200'
                        }`}
                    >
                        <div className="relative">
                            <img
                                src={vehicle.image}
                                alt={vehicle.name}
                                className="w-full h-48 object-cover"
                                width={400}
                                height={250}
                            />
                            {vehicle.popular && (
                                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                                    MOST POPULAR
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{vehicle.name}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                                {/* Replace with actual icon components */}
                                <span className="mr-2">Icon</span>
                                <span className="text-sm">Up to {vehicle.passengers} passengers</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-4">
                                <span className="mr-2">Icon</span>
                                <span className="text-sm">Up to {vehicle.luggage} luggage</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-2xl font-bold text-gray-800">${vehicle.price.toFixed(2)}</span>
                                <span className="text-sm text-gray-500">per trip</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => selectVehicle(vehicle)}
                                className={`w-full px-4 py-2 rounded-md ${
                                    selectedVehicle?.id === vehicle.id
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {selectedVehicle?.id === vehicle.id ? 'Selected' : 'Select'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="prev-step px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={nextStep}
                    disabled={!selectedVehicle}
                    className={`px-6 py-2 text-white rounded-md ${
                        selectedVehicle ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Continue to Final Details
                </button>
            </div>
        </div>
    );
}

export default DisplayVechile;
