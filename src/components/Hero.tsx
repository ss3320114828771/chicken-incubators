'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [starPositions, setStarPositions] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    
    // Client-side par random positions generate karo
    const positions = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 3}s`,
    }))
    setStarPositions(positions)

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()
      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5
      
      heroRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Agar mounted nahi hai to simple version do
  if (!mounted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Simple version without stars */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-pink-900" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
            Hatchery Express
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-8">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
        <div className="grid grid-cols-3 h-full">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="relative h-full">
              <Image
                src={`/n${num}.jpeg`}
                alt={`Hero background ${num}`}
                fill
                className="object-cover"
                priority={num === 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        ref={heroRef}
        className="relative z-20 text-center px-4 transition-transform duration-200 ease-out"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient">
            Hatchery Express
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-white mb-8 max-w-3xl mx-auto glow-text">
          Premium Incubators & Poultry Equipment for Professional Breeders
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/products"
            className="px-8 py-4 text-lg font-bold text-white rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            Explore Products
          </Link>
          
          <Link
            href="/about"
            className="px-8 py-4 text-lg font-bold text-white rounded-full border-2 border-white/50 hover:bg-white/20 backdrop-blur-lg transform hover:scale-110 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Floating Stars - Fixed with client-side only rendering */}
        <div className="absolute inset-0 pointer-events-none">
          {starPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-float"
              style={{
                top: pos.top,
                left: pos.left,
                animationDelay: pos.delay,
                animationDuration: pos.duration,
              }}
            >
              {i % 2 === 0 ? '⭐' : '✨'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero