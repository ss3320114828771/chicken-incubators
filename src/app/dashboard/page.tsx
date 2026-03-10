import Link from 'next/link'
import { FiPackage, FiHeart, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'

export default function DashboardPage() {
  const orders = [
    { id: 1, date: '2024-01-15', total: 259.99, status: 'Delivered' },
    { id: 2, date: '2024-01-20', total: 129.99, status: 'Processing' },
    { id: 3, date: '2024-01-25', total: 89.99, status: 'Shipped' },
  ]

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="bismillah">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
            My Dashboard
          </span>
        </h1>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-white">👤</span>
                </div>
                <h2 className="text-xl font-bold text-white">John Doe</h2>
                <p className="text-gray-400">john@example.com</p>
              </div>

              <nav className="space-y-2">
                {[
                  { icon: FiUser, label: 'Profile', href: '#' },
                  { icon: FiPackage, label: 'Orders', href: '#' },
                  { icon: FiHeart, label: 'Wishlist', href: '#' },
                  { icon: FiSettings, label: 'Settings', href: '#' },
                  { icon: FiLogOut, label: 'Logout', href: '/login' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Orders', value: '15', color: 'from-yellow-400 to-yellow-500' },
                { label: 'Wishlist', value: '8', color: 'from-pink-400 to-pink-500' },
                { label: 'Reviews', value: '12', color: 'from-purple-400 to-purple-500' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`p-6 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-20 backdrop-blur-lg`}
                >
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-200">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
              <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-gray-400">Order ID</th>
                      <th className="text-left py-3 text-gray-400">Date</th>
                      <th className="text-left py-3 text-gray-400">Total</th>
                      <th className="text-left py-3 text-gray-400">Status</th>
                      <th className="text-left py-3 text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/10">
                        <td className="py-3 text-white">#{order.id}</td>
                        <td className="py-3 text-gray-300">{order.date}</td>
                        <td className="py-3 text-white">${order.total}</td>
                        <td className="py-3">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <Link
                            href={`/orders/${order.id}`}
                            className="text-yellow-400 hover:text-pink-400 transition-colors duration-300"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}