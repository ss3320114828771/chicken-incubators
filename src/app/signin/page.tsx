'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi'

export default function SignInPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Auth check error:', error)
      }
    }
    checkAuth()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Validate form
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields')
      }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Call signin API
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Invalid email or password')
      }

      // Set success message
      setSuccess('Login successful! Redirecting...')

      // Store user data if remember me is checked
      if (formData.rememberMe && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      // Redirect based on user role
      setTimeout(() => {
        if (data.user?.role === 'ADMIN') {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
      }, 1500)

    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignIn = (provider: string) => {
    setLoading(true)
    setError('')
    
    // In a real app, you would redirect to OAuth provider
    // window.location.href = `/api/auth/${provider}`
    
    // For demo purposes
    setTimeout(() => {
      setError(`${provider} authentication coming soon!`)
      setLoading(false)
    }, 1000)
  }

  const handleGuestSignIn = async () => {
    setFormData({
      email: 'guest@example.com',
      password: 'guest123',
      rememberMe: false,
    })
    
    // Auto submit after setting guest credentials
    setTimeout(() => {
      const form = document.getElementById('signin-form') as HTMLFormElement
      if (form) form.requestSubmit()
    }, 100)
  }

  return (
    <div className="min-h-screen pt-24 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Bismillah */}
      <div className="bismillah absolute top-24 left-0 right-0 z-20">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              opacity: 0.3,
            }}
          >
            {i % 3 === 0 ? '⭐' : i % 3 === 1 ? '✨' : '🌟'}
          </div>
        ))}
      </div>

      {/* Sign In Card */}
      <div className="max-w-md w-full relative z-10">
        <div className="gradient-border">
          <div className="bg-black/80 backdrop-blur-xl p-8 rounded-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block p-4 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mb-4">
                <FiLock className="text-3xl text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
                  Welcome Back
                </span>
              </h1>
              <p className="text-gray-400">
                Sign in to access your account and manage your orders
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 flex items-start gap-3 animate-pulse">
                <FiAlertCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-500 text-center animate-pulse">
                {success}
              </div>
            )}

            {/* Sign In Form */}
            <form id="signin-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded bg-white/10 border-white/20 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0 focus:ring-2"
                  />
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300 text-sm">
                    Remember me
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-yellow-400 hover:text-pink-400 transition-colors duration-300"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient"></div>
              </button>
            </form>

            {/* Guest Sign In */}
            <div className="mt-4">
              <button
                onClick={handleGuestSignIn}
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
              >
                Continue as Guest
              </button>
            </div>

            {/* Social Sign In */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { provider: 'Google', icon: 'G', color: 'hover:bg-red-500/20' },
                  { provider: 'Facebook', icon: 'f', color: 'hover:bg-blue-500/20' },
                  { provider: 'Twitter', icon: 'X', color: 'hover:bg-sky-500/20' },
                ].map((social) => (
                  <button
                    key={social.provider}
                    onClick={() => handleSocialSignIn(social.provider)}
                    disabled={loading}
                    className={`flex items-center justify-center px-4 py-3 rounded-lg bg-white/10 text-white font-bold ${social.color} hover:bg-white/20 transition-all duration-300 disabled:opacity-50`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-gray-400">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-yellow-400 hover:text-pink-400 font-semibold transition-colors duration-300"
              >
                Sign Up
              </Link>
            </p>

            {/* Admin Info */}
            <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-gray-400 text-center">
                <span className="text-yellow-400 font-bold">Admin:</span> sajid.syed@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}