import React from 'react';

function FinalForm({ currentStep, activeTab, setActiveTab, prevStep }) {
    return (
        <div className={`p-6 ${currentStep === 3 ? 'block' : 'hidden'}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Final Details</h2>

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
  {activeTab === 'login' && (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="loginEmail"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address*
        </label>
        <input
          type="email"
          name="L_email"
          id="email"
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
          id="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
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
  )}

  {/* Register Form */}
  {activeTab === 'register' && (
    <div className="max-w-md mx-auto">
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
            name="r_first_name"
            id="first_name"
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
            name="r_last_name"
            id="last_name"
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
          name="r_email"
          id="email"
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
          name="r_phone"
          id="phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="userPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password*
        </label>
        <input
          type="password"
          name="r_pass"
          id="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          name="receiveNotifications"
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
  )}

  {/* Guest Form */}
  {activeTab === 'guest' && (
    <div className="max-w-md mx-auto">
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
            name="g_first_name"
            id="g_first_name"
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
            name="g_last_name"
            id="g_last_name"
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
          name="g_email"
          id="g_email"
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
          name="g_phone"
          id="g_phone"
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
  )}

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
    );
  }
  
  export default FinalForm;