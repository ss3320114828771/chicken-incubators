import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ==================== TAILWIND UTILS ====================

/**
 * Merge Tailwind CSS classes conditionally
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ==================== FORMATTING UTILS ====================

/**
 * Format price to currency
 */
export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'PKR'
    notation?: Intl.NumberFormatOptions['notation']
    locale?: string
  } = {}
) {
  const { currency = 'USD', notation = 'standard', locale = 'en-US' } = options
  
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}

/**
 * Format number with commas
 */
export function formatNumber(
  number: number | string,
  options: {
    decimals?: number
    locale?: string
  } = {}
) {
  const { decimals = 0, locale = 'en-US' } = options
  const numericNumber = typeof number === 'string' ? parseFloat(number) : number
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numericNumber)
}

/**
 * Format date to readable string
 */
export function formatDate(
  date: Date | string | number,
  options: {
    format?: 'short' | 'long' | 'full' | 'relative'
    locale?: string
  } = {}
) {
  const { format = 'long', locale = 'en-US' } = options
  const dateObj = date instanceof Date ? date : new Date(date)

  if (format === 'relative') {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
    const now = new Date()
    const diffTime = dateObj.getTime() - now.getTime()
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.round(diffTime / (1000 * 60 * 60))
    const diffMinutes = Math.round(diffTime / (1000 * 60))
    const diffSeconds = Math.round(diffTime / 1000)

    if (Math.abs(diffSeconds) < 60) return rtf.format(diffSeconds, 'second')
    if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, 'minute')
    if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour')
    if (Math.abs(diffDays) < 30) return rtf.format(diffDays, 'day')
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: format === 'short' ? 'short' : format === 'long' ? 'long' : 'full',
  }).format(dateObj)
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number, decimals: number = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string, country: 'US' | 'PK' = 'US') {
  const cleaned = phone.replace(/\D/g, '')
  
  if (country === 'US') {
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
  } else if (country === 'PK') {
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3]
    }
  }
  
  return phone
}

// ==================== STRING UTILS ====================

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number, ending: string = '...') {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending
  }
  return str
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Capitalize each word
 */
export function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Slugify string
 */
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Validate email
 */
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Extract initials from name
 */
export function getInitials(name: string, max: number = 2) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, max)
}

// ==================== NUMBER UTILS ====================

/**
 * Calculate discount percentage
 */
export function calculateDiscount(original: number, discounted: number) {
  return Math.round(((original - discounted) / original) * 100)
}

/**
 * Calculate average rating
 */
export function calculateRating(rating: number) {
  return Math.round(rating * 10) / 10
}

/**
 * Generate star rating array
 */
export function getStarRating(rating: number) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push('full')
    } else if (i - 0.5 <= rating) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }
  return stars
}

/**
 * Clamp number between min and max
 */
export function clamp(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max)
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number) {
  if (total === 0) return 0
  return (value / total) * 100
}

// ==================== ARRAY UTILS ====================

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T) {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

/**
 * Chunk array into smaller arrays
 */
export function chunkArray<T>(array: T[], size: number) {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

/**
 * Remove duplicates from array
 */
export function uniqueArray<T>(array: T[]) {
  return [...new Set(array)]
}

/**
 * Sort array by key
 */
export function sortByKey<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc') {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1
    } else {
      return a[key] < b[key] ? 1 : -1
    }
  })
}

// ==================== OBJECT UTILS ====================

/**
 * Remove falsy values from object
 */
export function removeFalsy<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => Boolean(value))
  ) as Partial<T>
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Pick specific keys from object
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
    return result
  }, {} as Pick<T, K>)
}

/**
 * Omit specific keys from object
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>
}

// ==================== STORAGE UTILS ====================

/**
 * Set item in localStorage with expiration
 */
export function setStorageItem(key: string, value: any, ttl: number = 3600) {
  const now = new Date()
  const item = {
    value,
    expiry: now.getTime() + ttl * 1000,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

/**
 * Get item from localStorage with expiration check
 */
export function getStorageItem(key: string) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) return null

  const item = JSON.parse(itemStr)
  const now = new Date()

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }

  return item.value
}

/**
 * Clear all storage items with prefix
 */
export function clearStorageByPrefix(prefix: string) {
  const keys = Object.keys(localStorage)
  keys.forEach((key) => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key)
    }
  })
}

// ==================== COLOR UTILS ====================

/**
 * Generate random color
 */
export function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

/**
 * Convert hex to rgba
 */
export function hexToRgba(hex: string, alpha: number = 1) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Lighten or darken color
 */
export function adjustColor(hex: string, percent: number) {
  let R = parseInt(hex.substring(1, 3), 16)
  let G = parseInt(hex.substring(3, 5), 16)
  let B = parseInt(hex.substring(5, 7), 16)

  R = Math.floor(R * (100 + percent) / 100)
  G = Math.floor(G * (100 + percent) / 100)
  B = Math.floor(B * (100 + percent) / 100)

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  const RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16)
  const GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16)
  const BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}

// ==================== VALIDATION UTILS ====================

/**
 * Validate password strength
 */
export function validatePassword(password: string) {
  const checks = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const score = Object.values(checks).filter(Boolean).length
  
  return {
    isValid: score >= 3,
    checks,
    score,
    strength: score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong',
  }
}

/**
 * Validate URL
 */
export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// ==================== DEBOUNCE & THROTTLE ====================

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ==================== PRODUCT SPECIFIC UTILS ====================

/**
 * Calculate hatch rate
 */
export function calculateHatchRate(fertile: number, hatched: number) {
  if (fertile === 0) return 0
  return Math.round((hatched / fertile) * 100)
}

/**
 * Calculate egg incubation day
 */
export function getIncubationDay(startDate: Date | string) {
  const start = new Date(startDate)
  const now = new Date()
  const diffTime = now.getTime() - start.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.min(Math.max(diffDays, 0), 21) // Chicken eggs take 21 days
}

/**
 * Get incubation stage description
 */
export function getIncubationStage(day: number) {
  if (day <= 0) return 'Not Started'
  if (day <= 7) return 'Early Development'
  if (day <= 14) return 'Mid Development'
  if (day <= 20) return 'Late Development'
  if (day === 21) return 'Hatching Day'
  return 'Completed'
}

// ==================== EXPORT ALL ====================

export default {
  cn,
  formatPrice,
  formatNumber,
  formatDate,
  formatFileSize,
  formatPhoneNumber,
  truncate,
  capitalize,
  capitalizeWords,
  slugify,
  generateRandomString,
  isValidEmail,
  getInitials,
  calculateDiscount,
  calculateRating,
  getStarRating,
  clamp,
  calculatePercentage,
  groupBy,
  chunkArray,
  uniqueArray,
  sortByKey,
  removeFalsy,
  deepClone,
  pick,
  omit,
  setStorageItem,
  getStorageItem,
  clearStorageByPrefix,
  getRandomColor,
  hexToRgba,
  adjustColor,
  validatePassword,
  isValidUrl,
  debounce,
  throttle,
  calculateHatchRate,
  getIncubationDay,
  getIncubationStage,
}