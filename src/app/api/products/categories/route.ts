import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get all products
    const products = await prisma.product.findMany({
      select: { category: true }
    })
    
    // Count categories (simple approach)
    const counts: Record<string, number> = {}
    
    for (const p of products) {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1
      }
    }
    
    // Convert to array
    const categories = Object.entries(counts).map(([name, count]) => ({
      name,
      count
    }))
    
    return NextResponse.json({ categories })
  } catch {
    return NextResponse.json({ categories: [] })
  }
}