'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic
    console.log('Reset password for:', email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
      <div className="bismillah absolute top-24 left-0 right-0">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      <div className="max-w-md w-full">
        <div className="p-8 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
          <h1 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
              Reset Password
            </span>
          </h1>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-gray-300 text-center mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Send Reset Link
              </button>

              <p className="text-center">
                <Link
                  href="/login"
                  className="text-yellow-400 hover:text-pink-400 transition-colors duration-300"
                >
                  Back to Login
                </Link>
              </p>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">✉️</div>
              <p className="text-gray-300">
                Password reset link has been sent to{' '}
                <span className="text-yellow-400 font-bold">{email}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Please check your email and follow the instructions to reset your password.
              </p>
              <Link
                href="/login"
                className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Return to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}