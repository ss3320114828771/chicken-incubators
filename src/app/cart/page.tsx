'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiTrash2, FiShoppingBag } from 'react-icons/fi'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Digital Egg Incubator 48 Eggs', price: 129.99, quantity: 1, image: '/n1.jpeg' },
    { id: 2, name: 'Automatic Chicken Feeder', price: 79.99, quantity: 2, image: '/n2.jpeg' },
    { id: 3, name: 'Egg Candler Tester', price: 34.99, quantity: 1, image: '/n4.jpeg' },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10.00
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="bismillah">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
            Shopping Cart
          </span>
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-white/10 backdrop-blur-lg glow-border flex gap-4"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="text-lg font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-500 transition-all duration-300">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-2xl font-bold text-yellow-400 mt-1">
                      ${item.price}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border border-white/20 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-white hover:bg-white/10 rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-white border-x border-white/20">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-white hover:bg-white/10 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <div className="flex justify-between text-white font-bold text-xl">
                      <span>Total</span>
                      <span className="text-yellow-400">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Proceed to Checkout
                </button>

                <Link
                  href="/products"
                  className="block text-center mt-4 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <FiShoppingBag className="text-6xl text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}