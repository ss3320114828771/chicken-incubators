'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic
    console.log('Signup:', formData)
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
              Create Account
            </span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                required
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="rounded bg-white/10 border-white/20"
                required
              />
              <span className="text-gray-300">
                I agree to the{' '}
                <Link href="/terms" className="text-yellow-400 hover:text-pink-400">
                  Terms & Conditions
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </button>

            <p className="text-center text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-yellow-400 hover:text-pink-400 transition-colors duration-300"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}