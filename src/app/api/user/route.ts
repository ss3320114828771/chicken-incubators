import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { z } from "zod"
import bcrypt from "bcryptjs"

// Validation schemas
const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  currentPassword: z.string().min(6).optional(),
  newPassword: z.string().min(6).optional(),
})

// GET /api/user - Get current user profile
export async function GET(req: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        addresses: true,
        orders: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { items: { include: { product: true } } }
        },
        wishlist: { include: { product: true } },
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { product: true }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // @ts-ignore - Add counts manually
    const userWithCounts = {
      ...user,
      _count: {
        orders: user.orders?.length || 0,
        wishlist: user.wishlist?.length || 0,
        reviews: user.reviews?.length || 0
      }
    }

    return NextResponse.json({ user: userWithCounts })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH /api/user - Update current user profile
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, email, currentPassword, newPassword } = body

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {}

    if (name) updateData.name = name

    if (email && email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({ where: { email } })
      if (existingUser) {
        return NextResponse.json({ error: "Email already in use" }, { status: 400 })
      }
      updateData.email = email
    }

    if (currentPassword && newPassword) {
      const isValid = await bcrypt.compare(currentPassword, currentUser.password || "")
      if (!isValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
      }
      updateData.password = await bcrypt.hash(newPassword, 10)
    }

    // @ts-ignore - Bypass TypeScript for Prisma update
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return NextResponse.json({ 
      message: "Profile updated successfully",
      user: updatedUser 
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/user - Delete current user account
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    await prisma.user.delete({
      where: { id: user.id },
    })

    return NextResponse.json({ message: "Account deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}