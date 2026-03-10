import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const featuredProducts = [
    { id: 1, name: 'Digital Egg Incubator 48 Eggs', price: 129.99, image: '/n1.jpeg', rating: 4.8 },
    { id: 2, name: 'Automatic Chicken Feeder', price: 79.99, image: '/n2.jpeg', rating: 4.6 },
    { id: 3, name: 'Professional Brooder Box', price: 199.99, image: '/n3.jpeg', rating: 4.9 },
    { id: 4, name: 'Egg Candler Tester', price: 34.99, image: '/n4.jpeg', rating: 4.7 },
    { id: 5, name: 'Poultry Heat Lamp', price: 45.99, image: '/n5.jpeg', rating: 4.5 },
    { id: 6, name: 'Automatic Egg Turner', price: 89.99, image: '/n6.jpeg', rating: 4.8 },
  ]

  return (
    <div className="min-h-screen">
      {/* Bismillah */}
      <div className="bismillah pt-24">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      <Hero />

      {/* Featured Products Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient">
              Featured Products
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Nutritional Value Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-yellow-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Nutritional Benefits of Organic Chicken & Eggs
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">🥚 Egg Nutrition</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• High-quality protein (6-7g per egg)</li>
                  <li>• Rich in Vitamin D, B12, and selenium</li>
                  <li>• Contains choline for brain health</li>
                  <li>• Antioxidants like lutein and zeaxanthin</li>
                  <li>• Omega-3 fatty acids</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
                <h3 className="text-2xl font-bold text-pink-400 mb-4">🍗 Organic Chicken Benefits</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• Lean protein source (31g per 100g)</li>
                  <li>• No antibiotics or hormones</li>
                  <li>• Rich in B vitamins and iron</li>
                  <li>• Lower in saturated fat</li>
                  <li>• Better omega-3 to omega-6 ratio</li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden glow-border">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Nutritional Benefits"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Your Poultry Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of happy customers raising healthy chickens with our premium equipment.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 text-xl font-bold text-white rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 animate-gradient"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  )
}  