'use client';
import { useState } from 'react';
import { createRide, registerGuest, registerUser } from "../Reservation/service.js";
import DisplayVechile from "./DisplayVechile";
import FinalForm from "./FinalForm";
import Rideinfo from "./Rideinfo";

const ReservationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeTab, setActiveTab] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Initializing formData state
  const [formData, setFormData] = useState({
    serviceType: '',
    pickupDate: '',
    pickupTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    additionalStops: [''],
    passengerCount: '1',
    luggageCount: '0',
    numberOfHours: '',
    childSeat: false,
    flightNumber: false,
    flightNumberInput: '',
    auth: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
  });

  const vehicles = [
    {
      id: 1,
      name: 'Luxury Sedan',
      passengers: 3,
      luggage: 2,
      price: 85,
      image: '/sedan.jpg',
      popular: true,
    },
    {
      id: 2,
      name: 'Premium SUV',
      passengers: 5,
      luggage: 4,
      price: 120,
      image: '/suv.jpg',
      popular: false,
    },
    {
      id: 3,
      name: 'Executive Limousine',
      passengers: 8,
      luggage: 6,
      price: 175,
      image: '/limo.jpg',
      popular: false,
    },
  ];

  // Handles changes for all form inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('auth_')) {
      const authField = name.split('_')[1];
      setFormData((prev) => ({
        ...prev,
        auth: {
          ...prev.auth,
          [authField]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleStopChange = (index, value) => {
    setFormData((prev) => {
      const newStops = [...prev.additionalStops];
      newStops[index] = value;
      return { ...prev, additionalStops: newStops };
    });
  };

  const addStop = () => {
    setFormData((prev) => ({
      ...prev,
      additionalStops: [...prev.additionalStops, ''],
    }));
  };

  const removeStop = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalStops: prev.additionalStops.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const validateStep = (step) => {
    if (step === 1) {
      const requiredFields = ['serviceType', 'pickupDate', 'pickupTime', 'pickupLocation', 'dropoffLocation'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          alert(`Please fill the ${field} field.`);
          return false;
        }
      }
      if (formData.serviceType === 'hourly' && !formData.numberOfHours) {
        alert('Please specify the number of hours for hourly service.');
        return false;
      }
    }
    return true;
  };

  const selectVehicle = (vehicle) => setSelectedVehicle(vehicle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const ridePayload = {
        ...formData,
        additionalStops: formData.additionalStops.filter((stop) => stop.trim()),
        passengerCount: parseInt(formData.passengerCount, 10),
        luggageCount: parseInt(formData.luggageCount, 10),
        numberOfHours: formData.numberOfHours ? parseInt(formData.numberOfHours, 10) : null,
        vehicleId: selectedVehicle?.id,
      };

      const rideResponse = await createRide(ridePayload);
      console.log('Ride created:', rideResponse);

      if (activeTab === 'guest') {
        await registerGuest({
          ...formData.auth,
          rideId: rideResponse.id,
        });
      } else if (activeTab === 'register') {
        await registerUser({
          ...formData.auth,
          rideId: rideResponse.id,
        });
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'An error occurred during the reservation.');
      console.error('Reservation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Rideinfo
              currentStep={currentStep}
              formData={formData}
              handleInputChange={handleInputChange}
              handleStopChange={handleStopChange}
              addStop={addStop}
              removeStop={removeStop}
              nextStep={nextStep}
            />
            <DisplayVechile
              currentStep={currentStep}
              vehicles={vehicles}
              selectedVehicle={selectedVehicle}
              selectVehicle={selectVehicle}
              prevStep={prevStep}
              nextStep={nextStep}
            />
            <FinalForm
              currentStep={currentStep}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              prevStep={prevStep}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
