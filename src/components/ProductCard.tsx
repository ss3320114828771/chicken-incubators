'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
}

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="gradient-border">
        <div className="bg-black p-6 rounded-lg">
          {/* Image Container */}
          <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} />
            
            {/* Quick Actions */}
            <div className={`absolute bottom-4 left-4 right-4 flex justify-center gap-4 transition-all duration-500 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <button className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white hover:shadow-lg transform hover:scale-110 transition-all duration-300">
                <FiShoppingCart className="text-xl" />
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isLiked
                    ? 'bg-red-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <FiHeart className="text-xl" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <Link href={`/products/${product.id}`}>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-pink-500 transition-all duration-300">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </span>
            ))}
            <span className="text-gray-400 ml-2">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
              ${product.price}
            </span>
            <span className="text-green-400 text-sm">In Stock</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard