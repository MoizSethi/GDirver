'use client'
import { useState, useRef, useEffect } from 'react'
import { FaUpload, FaTimes, FaSpinner } from 'react-icons/fa'
import { addVehicle } from '../services/vehicleService'

const VehicleForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'SUV',
    luggage: '2',
    passengers: '4',
    flat_rate: '50.00',
    available: 'true'
  })
  const [images, setImages] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  const vehicleTypes = [
    { value: 'Sedan', label: 'Sedan' },
    { value: 'SUV', label: 'SUV' },
    { value: 'Van', label: 'Van' },
    { value: 'Limousine', label: 'Limousine' },
    { value: 'Bus', label: 'Bus' }
  ]

  // Clean up object URLs
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview))
    }
  }, [images])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vehicle name is required'
    }

    if (isNaN(formData.luggage) || parseInt(formData.luggage) <= 0) {
      newErrors.luggage = 'Please enter a valid luggage capacity'
    }

    if (isNaN(formData.passengers) || parseInt(formData.passengers) <= 0) {
      newErrors.passengers = 'Please enter a valid passenger capacity'
    }

    if (isNaN(formData.flat_rate) || parseFloat(formData.flat_rate) <= 0) {
      newErrors.flat_rate = 'Please enter a valid flat rate'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setUploading(true)
    
    // Validate files
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      const maxSize = 5 * 1024 * 1024 // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize
    })

    if (validFiles.length !== files.length) {
      alert('Only JPG, PNG, or WEBP images under 5MB are allowed')
    }

    const newImages = validFiles.slice(0, 3 - images.length).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setImages(prev => [...prev, ...newImages])
    setUploading(false)
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index].preview)
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setSubmitting(true)

    try {
      const formPayload = new FormData()

      formPayload.append('name', formData.name)
      formPayload.append('type', formData.type)
      formPayload.append('luggage', parseInt(formData.luggage))
      formPayload.append('passengers', parseInt(formData.passengers))
      formPayload.append('flat_rate', parseFloat(formData.flat_rate))
      formPayload.append('available', formData.available === 'true')

      images.forEach((image) => {
        formPayload.append('images', image.file)
      })

      const newVehicle = await addVehicle(formPayload)
      onSuccess(newVehicle)
      
      // Reset form
      setFormData({
        name: '',
        type: 'SUV',
        luggage: '2',
        passengers: '4',
        flat_rate: '50.00',
        available: 'true'
      })
      setImages([])
      
    } catch (error) {
      console.error('Form submission error:', error)
      alert(`Error: ${error.message || 'Failed to add vehicle'}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Vehicle</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vehicle Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Vehicle Type */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Type*
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {vehicleTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Luggage Capacity */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Luggage Capacity*
            </label>
            <input
              type="number"
              name="luggage"
              min="1"
              value={formData.luggage}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.luggage ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.luggage && (
              <p className="text-red-500 text-xs mt-1">{errors.luggage}</p>
            )}
          </div>

          {/* Passenger Capacity */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Passenger Capacity*
            </label>
            <input
              type="number"
              name="passengers"
              min="1"
              value={formData.passengers}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.passengers ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.passengers && (
              <p className="text-red-500 text-xs mt-1">{errors.passengers}</p>
            )}
          </div>

          {/* Flat Rate */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Flat Rate ($)*
            </label>
            <input
              type="number"
              name="flat_rate"
              min="0.01"
              step="0.01"
              value={formData.flat_rate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.flat_rate ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.flat_rate && (
              <p className="text-red-500 text-xs mt-1">{errors.flat_rate}</p>
            )}
          </div>

          {/* Availability */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <select
              name="available"
              value={formData.available}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Images (Max 3)
          </label>
          
          {/* Image Preview Grid */}
          <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            multiple
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
            disabled={images.length >= 3 || uploading}
          />
          
          {/* Upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            disabled={images.length >= 3 || uploading}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              images.length >= 3 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {uploading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <FaUpload className="mr-2" />
                {images.length >= 3 ? 'Maximum 3 images' : 'Upload Images'}
              </>
            )}
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center min-w-24"
            disabled={submitting}
          >
            {submitting ? (
              <FaSpinner className="animate-spin" />
            ) : (
              'Add Vehicle'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default VehicleForm