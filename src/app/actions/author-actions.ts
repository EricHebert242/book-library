"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { z } from "zod"

// Validation schema for author data
const authorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
})

export type AuthorFormData = z.infer<typeof authorSchema>

// Get all authors
export async function getAuthors() {
  try {
    const authors = await prisma.author.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        books: {
          select: {
            id: true,
          },
        },
      },
    })

    return { authors }
  } catch (error) {
    return { error: "Failed to fetch authors" }
  }
}

// Get author by ID
export async function getAuthorById(id: string) {
  try {
    const author = await prisma.author.findUnique({
      where: { id },
      include: {
        books: true,
      },
    })

    if (!author) {
      return { error: "Author not found" }
    }

    return { author }
  } catch (error) {
    return { error: "Failed to fetch author" }
  }
}

// Create a new author
export async function createAuthor(data: AuthorFormData) {
  try {
    const validatedData = authorSchema.parse(data)

    const author = await prisma.author.create({
      data: validatedData,
    })

    revalidatePath("/authors")
    return { author }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors.map((e) => e.message).join(", ") }
    }
    return { error: "Failed to create author" }
  }
}

// Update an author
export async function updateAuthor(id: string, data: AuthorFormData) {
  try {
    const validatedData = authorSchema.parse(data)

    const author = await prisma.author.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath("/authors")
    revalidatePath(`/authors/${id}`)
    return { author }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors.map((e) => e.message).join(", ") }
    }
    return { error: "Failed to update author" }
  }
}

// Delete an author
export async function deleteAuthor(id: string) {
  try {
    await prisma.author.delete({
      where: { id },
    })

    revalidatePath("/authors")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete author" }
  }
}
