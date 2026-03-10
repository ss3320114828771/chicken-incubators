import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

// GET /api/products - Get all products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    
    // Build query
    let query: any = {
      include: { reviews: true },
      orderBy: { createdAt: 'desc' }
    }
    
    if (category && category !== 'all') {
      query.where = { category: category }
    }
    
    const products = await prisma.product.findMany(query)

    // Process products
    const productsWithRating = products.map((product: any) => {
      const reviews = product.reviews || []
      const avgRating = reviews.length > 0
        ? reviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0) / reviews.length
        : product.rating || 0
      
      return {
        ...product,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length,
      }
    })
    
    return NextResponse.json({ products: productsWithRating })
  } catch (error) {
    console.error("GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

// POST /api/products - Create product (Admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    
    // Validate
    if (!body.name || !body.description || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        category: body.category,
        stock: Number(body.stock) || 0,
        images: body.images || [],
        rating: Number(body.rating) || 0,
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error("POST error:", error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}

// DELETE /api/products - Delete products (Admin only)
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const ids = searchParams.get('ids')?.split(',') || []

    if (ids.length === 0) {
      return NextResponse.json(
        { error: "No product IDs provided" },
        { status: 400 }
      )
    }

    await prisma.product.deleteMany({
      where: { id: { in: ids } },
    })

    return NextResponse.json({ message: `Deleted ${ids.length} products` })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json(
      { error: "Failed to delete products" },
      { status: 500 }
    )
  }
}