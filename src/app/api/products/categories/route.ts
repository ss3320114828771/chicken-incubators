import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
// Product type import hata diya kyunke use nahi ho raha

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

type CategoryCount = {
  name: string
  count: number
}

export async function GET() {
  try {
    // Get all products
    const products = await prisma.product.findMany({
      select: {
        category: true
      }
    })

    // Count categories
    const categoryCounts = new Map<string, number>()
    
    products.forEach((product: { category: string | null }) => {
      const category = product.category
      
      if (typeof category === 'string' && category.trim().length > 0) {
        const trimmedCategory = category.trim()
        const currentCount = categoryCounts.get(trimmedCategory) || 0
        categoryCounts.set(trimmedCategory, currentCount + 1)
      }
    })

    const formattedCategories: CategoryCount[] = Array.from(categoryCounts.entries()).map(([name, count]) => ({
      name,
      count
    }))

    return NextResponse.json({ 
      success: true,
      categories: formattedCategories 
    })
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    console.error("Categories API Error:", errorMessage)
    
    return NextResponse.json({ 
      success: false,
      categories: [] 
    })
  }
}