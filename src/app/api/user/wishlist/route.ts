import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

// GET /api/user/wishlist - Get user's wishlist
export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ wishlist: [] })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        wishlist: {
          include: {
            product: true,
          },
        },
      },
    })

    return NextResponse.json({ 
      wishlist: user?.wishlist || [] 
    })
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return NextResponse.json({ wishlist: [] })
  }
}

// POST /api/user/wishlist - Add item to wishlist
export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { productId } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Check if already in wishlist
    const existing = await prisma.wishlistItem.findFirst({
      where: {
        userId: user.id,
        productId,
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Item already in wishlist" },
        { status: 400 }
      )
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: user.id,
        productId,
      },
    })

    return NextResponse.json({ wishlistItem })
  } catch (error) {
    console.error("Error adding to wishlist:", error)
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 }
    )
  }
}

// DELETE /api/user/wishlist - Remove item from wishlist
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { productId } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Remove from wishlist
    await prisma.wishlistItem.deleteMany({
      where: {
        userId: user.id,
        productId,
      },
    })

    return NextResponse.json({ 
      message: "Item removed from wishlist" 
    })
  } catch (error) {
    console.error("Error removing from wishlist:", error)
    return NextResponse.json(
      { error: "Failed to remove from wishlist" },
      { status: 500 }
    )
  }
}