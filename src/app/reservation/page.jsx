'use client'
import { useState, useEffect } from 'react'
import { FaTimes, FaPlus, FaUsers, FaSuitcase } from 'react-icons/fa'

const ReservationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [activeTab, setActiveTab] = useState('login')
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
  })

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
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleStopChange = (index, value) => {
    const newStops = [...formData.additionalStops]
    newStops[index] = value
    setFormData({
      ...formData,
      additionalStops: newStops,
    })
  }

  const addStop = () => {
    setFormData({
      ...formData,
      additionalStops: [...formData.additionalStops, ''],
    })
  }

  const removeStop = (index) => {
    const newStops = formData.additionalStops.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      additionalStops: newStops,
    })
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const validateStep = (step) => {
    if (step === 1) {
      if (
        !formData.serviceType ||
        !formData.pickupDate ||
        !formData.pickupTime ||
        !formData.pickupLocation ||
        !formData.dropoffLocation
      ) {
        alert('Please fill all required fields')
        return false
      }

      if (formData.serviceType === 'hourly' && !formData.numberOfHours) {
        alert('Please enter number of hours for hourly service')
        return false
      }
    }
    return true
  }

  const selectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { ...formData, selectedVehicle })
    alert('Reservation submitted successfully!')
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10"
              width={150}
              height={50}
            />
          </div>
          <div className="hidden md:flex space-x-4">
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Home
            </button>
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Services
            </button>
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Fleet
            </button>
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Contact
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setCurrentStep(3)
                setActiveTab('login')
              }}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => {
                setCurrentStep(3)
                setActiveTab('register')
              }}
              className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10"
            style={{
              width: `${((currentStep - 1) / 2) * 100}%`,
            }}
          ></div>

          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="step flex flex-col items-center relative"
              onClick={() => step < currentStep && setCurrentStep(step)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              <span
                className={`text-sm font-medium ${
                  step <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step === 1
                  ? 'Ride Information'
                  : step === 2
                  ? 'Select Vehicle'
                  : 'Final Details'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Step 1: Ride Information */}
            <div
              className={`p-6 ${currentStep === 1 ? 'block' : 'hidden'}`}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Ride Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Type */}
                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Type*
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
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

                {/* Pick-Up Date */}
                <div>
                  <label
                    htmlFor="pickupDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pick-Up Date*
                  </label>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Pick-Up Time */}
                <div>
                  <label
                    htmlFor="pickupTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pick-Up Time*
                  </label>
                  <input
                    type="time"
                    id="pickupTime"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Number of Hours (only shows for Hourly Service) */}
                {formData.serviceType === 'hourly' && (
                  <div>
                    <label
                      htmlFor="numberOfHours"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Number of Hours*
                    </label>
                    <input
                      type="number"
                      id="numberOfHours"
                      name="numberOfHours"
                      value={formData.numberOfHours}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required={formData.serviceType === 'hourly'}
                    />
                  </div>
                )}

                {/* Pick-Up Location */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="pickupLocation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pick-Up Location*
                  </label>
                  <input
                    type="text"
                    id="pickupLocation"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="Enter address, airport, or landmark"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Drop-Off Location */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="dropoffLocation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Drop-Off Location*
                  </label>
                  <input
                    type="text"
                    id="dropoffLocation"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleInputChange}
                    placeholder="Enter address, airport, or landmark"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Additional Stops */}
                <div className="md:col-span-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Stops
                    </label>
                    <div className="space-y-2">
                      {formData.additionalStops.map((stop, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={stop}
                            onChange={(e) =>
                              handleStopChange(index, e.target.value)
                            }
                            placeholder="Enter stop address"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeStop(index)}
                              className="removeStop px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
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

                {/* Passenger and Luggage */}
                <div>
                  <label
                    htmlFor="passengerCount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Passengers*
                  </label>
                  <select
                    id="passengerCount"
                    name="passengerCount"
                    value={formData.passengerCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8+</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="luggageCount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Luggage*
                  </label>
                  <select
                    id="luggageCount"
                    name="luggageCount"
                    value={formData.luggageCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="md:col-span-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="childSeat"
                      name="childSeat"
                      checked={formData.childSeat}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="childSeat"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Add child seat (+$15)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="flightNumber"
                      name="flightNumber"
                      checked={formData.flightNumber}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="flightNumber"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Add flight number
                    </label>
                  </div>
                </div>

                {/* Flight Number (hidden by default) */}
                {formData.flightNumber && (
                  <div className="md:col-span-2">
                    <label
                      htmlFor="flightNumberInput"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Flight Number
                    </label>
                    <input
                      type="text"
                      id="flightNumberInput"
                      name="flightNumberInput"
                      value={formData.flightNumberInput}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
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

            {/* Step 2: Select Vehicle */}
            <div
              className={`p-6 ${currentStep === 2 ? 'block' : 'hidden'}`}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Select Your Vehicle
              </h2>

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
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {vehicle.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaUsers className="mr-2" />
                        <span className="text-sm">
                          Up to {vehicle.passengers} passengers
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaSuitcase className="mr-2" />
                        <span className="text-sm">
                          Up to {vehicle.luggage} luggage
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-gray-800">
                          ${vehicle.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                          per trip
                        </span>
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
                        {selectedVehicle?.id === vehicle.id
                          ? 'Selected'
                          : 'Select'}
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
                    selectedVehicle
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue to Final Details
                </button>
              </div>
            </div>

            {/* Step 3: Final Details */}
            <div
              className={`p-6 ${currentStep === 3 ? 'block' : 'hidden'}`}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Final Details
              </h2>

              {/* Login/Register Tabs */}
              <div className="mb-6 border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px" id="authTabs">
                  {['login', 'register', 'guest'].map((tab) => (
                    <li key={tab} className="mr-2" role="presentation">
                      <button
                        className={`inline-block py-2 px-4 text-sm font-medium text-center border-b-2 ${
                          activeTab === tab
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab === 'login'
                          ? 'Login'
                          : tab === 'register'
                          ? 'Register'
                          : 'Continue as Guest'}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Login Form */}
              <div
                className={`max-w-md mx-auto ${
                  activeTab === 'login' ? 'block' : 'hidden'
                }`}
              >
                <div className="mb-4">
                  <label
                    htmlFor="loginEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="loginPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password*
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-4"
                >
                  Login
                </button>
                <p className="text-sm text-center text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Register Now
                  </button>
                </p>
              </div>

              {/* Register Form */}
              <div
                className={`max-w-md mx-auto ${
                  activeTab === 'register' ? 'block' : 'hidden'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="registerEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="registerEmail"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="registerPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password*
                    </label>
                    <input
                      type="password"
                      id="registerPassword"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password*
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="receiveNotifications"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="receiveNotifications"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I want to receive auto notifications
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-4"
                >
                  Register Now
                </button>
                <p className="text-sm text-center text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Log in Now
                  </button>
                </p>
              </div>

              {/* Guest Form */}
              <div
                className={`max-w-md mx-auto ${
                  activeTab === 'guest' ? 'block' : 'hidden'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="guestFirstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="guestFirstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guestLastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="guestLastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="guestEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="guestEmail"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="guestPhone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="guestPhone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Continue to Payment
                </button>
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
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Complete Reservation
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReservationForm