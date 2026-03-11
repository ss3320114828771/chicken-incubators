import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seeding...')

  // Hash password for admin
  const adminPassword = await bcrypt.hash('Admin@123', 10)

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'sajid.syed@gmail.com' },
    update: {},
    create: {
      email: 'sajid.syed@gmail.com',
      name: 'Hafiz Sajid Syed',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create sample products
  const products = [
    {
      name: 'Digital Egg Incubator 48 Eggs',
      description: 'Fully automatic digital egg incubator with temperature control and automatic egg turning. Perfect for hatching chicken, duck, and quail eggs.',
      price: 129.99,
      category: 'Incubators',
      stock: 15,
      images: ['/images/n1.jpeg', '/images/n1-2.jpeg'],
      rating: 4.8,
    },
    {
      name: 'Automatic Chicken Feeder',
      description: 'Large capacity automatic chicken feeder with timer control. Holds up to 50lbs of feed and dispenses at scheduled times.',
      price: 79.99,
      category: 'Feeders',
      stock: 25,
      images: ['/images/n2.jpeg', '/images/n2-2.jpeg'],
      rating: 4.6,
    },
    {
      name: 'Professional Brooder Box',
      description: 'Heated brooder box for chicks with temperature control, built-in thermometer, and easy-clean design. Holds up to 50 chicks.',
      price: 199.99,
      category: 'Brooders',
      stock: 10,
      images: ['/images/n3.jpeg', '/images/n3-2.jpeg'],
      rating: 4.9,
    },
    {
      name: 'Egg Candler Tester',
      description: 'Professional LED egg candler for checking fertility and embryo development. Bright LED light with comfortable grip.',
      price: 34.99,
      category: 'Accessories',
      stock: 50,
      images: ['/images/n4.jpeg', '/images/n4-2.jpeg'],
      rating: 4.7,
    },
    {
      name: 'Poultry Heat Lamp',
      description: '250W infrared heat lamp with adjustable height and safety guard. Perfect for keeping chicks warm.',
      price: 45.99,
      category: 'Heating',
      stock: 30,
      images: ['/images/n5.jpeg', '/images/n5-2.jpeg'],
      rating: 4.5,
    },
    {
      name: 'Automatic Egg Turner',
      description: 'Universal egg turner for incubators. Holds up to 48 eggs and turns automatically every 4 hours.',
      price: 89.99,
      category: 'Accessories',
      stock: 20,
      images: ['/images/n6.jpeg', '/images/n6-2.jpeg'],
      rating: 4.8,
    },
    {
      name: 'Digital Incubator 120 Eggs',
      description: 'Large capacity digital incubator with advanced humidity control, automatic egg turning, and LCD display. Ideal for commercial hatcheries.',
      price: 349.99,
      category: 'Incubators',
      stock: 8,
      images: ['/images/n1.jpeg', '/images/n1-2.jpeg'],
      rating: 4.9,
    },
    {
      name: 'Chicken Plucker Machine',
      description: 'Electric chicken plucker with stainless steel fingers. Removes feathers quickly and efficiently from chickens, ducks, and turkeys.',
      price: 399.99,
      category: 'Processing',
      stock: 5,
      images: ['/images/n2.jpeg', '/images/n2-2.jpeg'],
      rating: 4.7,
    },
    {
      name: 'Automatic Nesting Box',
      description: 'Self-cleaning automatic nesting box with roll-away eggs. Makes egg collection easy and keeps eggs clean.',
      price: 159.99,
      category: 'Housing',
      stock: 12,
      images: ['/images/n3.jpeg', '/images/n3-2.jpeg'],
      rating: 4.6,
    },
  ]

  console.log(`📦 Creating ${products.length} sample products...`)

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }
  
  console.log('✅ Sample products created')

  // Create sample addresses for admin
  const addresses = [
    {
      street: '123 Poultry Street',
      city: 'Farmville',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
      isDefault: true,
    },
    {
      street: '456 Chicken Road',
      city: 'Eggtown',
      state: 'TX',
      zipCode: '67890',
      country: 'USA',
      isDefault: false,
    },
  ]

  console.log('📍 Creating sample addresses...')

  for (const address of addresses) {
    await prisma.address.create({
      data: {
        ...address,
        userId: admin.id,
      },
    })
  }

  console.log('✅ Sample addresses created')
  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })