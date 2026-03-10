import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
              Hatchery Express
            </h3>
            <p className="text-gray-400">
              Premium quality incubators and poultry equipment for professional breeders and hobbyists.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Administrator: Hafiz Sajid Syed
              <br />
              Email: sajid.syed@gmail.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Contact', 'Directions', 'Information'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-500 transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {['Incubators', 'Feeders', 'Brooders', 'Accessories'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products?category=${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-500 transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe for latest products and offers</p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
              />
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2024 Hatchery Express. All rights reserved. | Designed with ❤️ by Hafiz Sajid Syed</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer