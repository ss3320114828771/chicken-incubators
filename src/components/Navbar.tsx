'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Information', path: '/information' },
    { name: 'Directions', path: '/directions' },
    { name: 'Cart', path: '/cart', icon: FiShoppingCart },
    { name: 'Login', path: '/login', icon: FiUser },
    { name: 'Sign Up', path: '/signup' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Admin', path: '/admin' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient">
              Hatchery Express
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                      isActive
                        ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <item.icon className="text-lg" />}
                      {item.name}
                    </span>
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none transition-colors duration-300"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="px-4 pt-2 pb-4 space-y-2 bg-gradient-to-b from-black/95 to-purple-900/95 backdrop-blur-lg">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {item.icon && <item.icon />}
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 via-pink-500 via-purple-500 to-transparent animate-gradient" />
    </nav>
  )
}

export default Navbar