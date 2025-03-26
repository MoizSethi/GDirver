import axios from 'axios'
import { toast } from 'react-toastify'

// Configure axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
})

/**
 * Fetches all vehicles from the API
 * @returns {Promise<Array>} Array of vehicles
 */
export const getVehicles = async () => {
  try {
    const response = await api.get('/api/vehicle/all')
    
    console.debug('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    })
    
    if (response.data.success) {
      return response.data.vehicles
    }
    throw new Error(response.data.message || 'Failed to fetch vehicles')
  } catch (error) {
    const errorDetails = {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      } : null,
      stack: error.stack
    }
    
    console.error('GET Vehicles Error:', errorDetails)
    
    toast.error(
      error.response?.data?.message || 
      error.message || 
      'Failed to load vehicles. Please try again later.'
    )
    
    throw error
  }
}

/**
 * Adds a new vehicle to the system
 * @param {Object} vehicleData - Vehicle data to be added
 * @returns {Promise<Object>} The added vehicle data
 */
export const addVehicle = async (vehicleData) => {
  try {
    console.debug('Attempting to add vehicle with data:', vehicleData)
    
    // Optional: Validate data before sending
    // validateVehicleData(vehicleData)
    
    const response = await api.post('/api/vehicle/add', vehicleData)
    
    console.debug('Add Vehicle Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    })
    
    if (response.data.success) {
      toast.success(response.data.message || 'Vehicle added successfully')
      return response.data.vehicle
    }
    
    throw new Error(response.data.message || 'Failed to add vehicle')
  } catch (error) {
    const errorDetails = {
      message: error.message,
      request: {
        method: error.config?.method,
        url: error.config?.url,
        data: error.config?.data,
        headers: error.config?.headers
      },
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      } : null,
      stack: error.stack
    }
    
    console.error('Add Vehicle Error Details:', errorDetails)
    
    // More specific error messages based on status code
    let userMessage = 'Failed to add vehicle'
    if (error.response) {
      if (error.response.status === 400) {
        userMessage = 'Invalid vehicle data. Please check your inputs.'
      } else if (error.response.status === 401) {
        userMessage = 'Authentication required. Please login again.'
      } else if (error.response.status === 500) {
        userMessage = 'Server error. Please try again later.'
      }
      
      // Use server-provided message if available
      if (error.response.data?.message) {
        userMessage = error.response.data.message
      }
    } else if (error.message.includes('timeout')) {
      userMessage = 'Request timed out. Please check your connection.'
    } else if (error.message.includes('Network Error')) {
      userMessage = 'Network error. Please check your internet connection.'
    }
    
    toast.error(userMessage)
    
    throw error
  }
}

/**
 * Utility function to validate vehicle data before sending
 * @param {Object} data - Vehicle data to validate
 * @throws {Error} If validation fails
 */
const validateVehicleData = (data) => {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    throw new Error('Vehicle name is required and must be a non-empty string')
  }
  
  if (!data.type || typeof data.type !== 'string') {
    throw new Error('Vehicle type is required')
  }
  
  if (isNaN(data.passengers)) {
    throw new Error('Passenger count must be a number')
  }
  
  if (isNaN(data.luggage)) {
    throw new Error('Luggage count must be a number')
  }
  
  if (isNaN(data.flat_rate)) {
    throw new Error('Flat rate must be a number')
  }
}