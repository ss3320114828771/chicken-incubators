import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="bismillah">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient">
            About Us
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Welcome to Hatchery Express
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Founded by Hafiz Sajid Syed, Hatchery Express has been providing premium quality 
              incubators and poultry equipment to breeders worldwide. With years of experience 
              in the poultry industry, we understand the needs of both professional breeders 
              and hobbyists.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to make poultry farming accessible, efficient, and profitable for 
              everyone. We offer state-of-the-art equipment that ensures the highest hatch rates 
              and healthy bird development.
            </p>
            
            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Administrator</h3>
              <p className="text-white">Hafiz Sajid Syed</p>
              <p className="text-gray-400">Email: sajid.syed@gmail.com</p>
            </div>
          </div>

          <div className="relative h-[400px] rounded-2xl overflow-hidden glow-border">
            <Image
              src="/n1.jpeg"
              alt="About Hatchery Express"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Years Experience', value: '10+' },
            { label: 'Happy Customers', value: '5000+' },
            { label: 'Products', value: '100+' },
            { label: 'Countries', value: '25+' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 text-center rounded-xl bg-white/10 backdrop-blur-lg glow-border transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
                {stat.value}
              </div>
              <div className="text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Quality First',
              description: 'We source only the highest quality equipment to ensure your success.',
              icon: '✨',
            },
            {
              title: 'Expert Support',
              description: 'Our team of poultry experts is always ready to help you.',
              icon: '🤝',
            },
            {
              title: 'Innovation',
              description: 'We constantly update our products with the latest technology.',
              icon: '💡',
            },
          ].map((value) => (
            <div
              key={value.title}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-lg glow-border text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:animate-bounce">{value.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}