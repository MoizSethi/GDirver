'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const router = useRouter()
  const inputRefs = useRef([])

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6)
    if (isNaN(pasteData)) return

    const newOtp = [...otp]
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i]
    }
    setOtp(newOtp)
  }

  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const otpCode = otp.join('')
    if (otpCode.length !== 6) {
      setError('Please enter a 6-digit OTP code')
      setLoading(false)
      return
    }

    try {
      // Replace with your actual API call
      const response = await fetch('/api/drivers/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpCode }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed')
      }

      // Redirect to reset password page on success
      router.push('/driver/reset-password')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP
  const resendOTP = async () => {
    setLoading(true)
    setError('')
    setCountdown(60)
    setCanResend(false)

    try {
      // Replace with your actual API call
      const response = await fetch('/api/drivers/resend-otp', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Countdown timer
  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else {
      setCanResend(true)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.png"
          alt="Company Logo"
          width={48}
          height={48}
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify OTP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 text-center"
              >
                OTP Code
              </label>
              <div className="mt-2 flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <div className="text-center text-sm">
              {canResend ? (
                <button
                  type="button"
                  onClick={resendOTP}
                  disabled={loading}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Resend Code
                </button>
              ) : (
                <p className="text-gray-500">
                  Resend code in {countdown} seconds
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/Driver/login"
              className="font-medium text-blue-600 hover:text-blue-500 text-sm"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPVerification