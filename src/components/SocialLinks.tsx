'use client'

import { FiFacebook, FiTwitter, FiInstagram, FiGithub, FiYoutube } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { SiVercel } from 'react-icons/si' // Vercel icon from Simple Icons

const SocialLinks = () => {
  const socialLinks = [
    { icon: FiFacebook, href: 'https://facebook.com', color: 'hover:text-blue-500', label: 'Facebook' },
    { icon: FiTwitter, href: 'https://twitter.com', color: 'hover:text-blue-400', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://instagram.com', color: 'hover:text-pink-500', label: 'Instagram' },
    { icon: FaWhatsapp, href: 'https://whatsapp.com', color: 'hover:text-green-500', label: 'WhatsApp' },
    { icon: FiYoutube, href: 'https://youtube.com', color: 'hover:text-red-500', label: 'YouTube' },
    { icon: FiGithub, href: 'https://github.com', color: 'hover:text-gray-400', label: 'GitHub' },
    { icon: SiVercel, href: 'https://vercel.com', color: 'hover:text-white', label: 'Vercel' },
  ]

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-4">
        {socialLinks.map((link, index) => {
          const IconComponent = link.icon
          return (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`p-3 rounded-full bg-black/50 backdrop-blur-lg border border-white/10 text-white transform hover:scale-125 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 ${link.color}`}
            >
              <IconComponent className="text-xl" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default SocialLinks