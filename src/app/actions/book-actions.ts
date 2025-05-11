"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { z } from "zod"

// Validation schema for book data
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  publishedAt: z.date().optional().nullable(),
  authorId: z.string().min(1, "Author is required"),
})

export type BookFormData = z.infer<typeof bookSchema>

// Get all books
export async function getBooks() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return { books }
  } catch (error) {
    return { error: "Failed to fetch books" }
  }
}

// Get book by ID
export async function getBookById(id: string) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
      },
    })

    if (!book) {
      return { error: "Book not found" }
    }

    return { book }
  } catch (error) {
    return { error: "Failed to fetch book" }
  }
}

// Create a new book
export async function createBook(data: BookFormData) {
  try {
    const validatedData = bookSchema.parse(data)

    const book = await prisma.book.create({
      data: validatedData,
    })

    revalidatePath("/books")
    return { book }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors.map((e) => e.message).join(", ") }
    }
    return { error: "Failed to create book" }
  }
}

// Update a book
export async function updateBook(id: string, data: BookFormData) {
  try {
    const validatedData = bookSchema.parse(data)

    const book = await prisma.book.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath("/books")
    revalidatePath(`/books/${id}`)
    return { book }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors.map((e) => e.message).join(", ") }
    }
    return { error: "Failed to update book" }
  }
}

// Delete a book
export async function deleteBook(id: string) {
  try {
    await prisma.book.delete({
      where: { id },
    })

    revalidatePath("/books")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete book" }
  }
}

// Get published books
export async function getPublishedBooks() {
  try {
    const books = await prisma.book.findMany({
      where: {
        published: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return { books }
  } catch (error) {
    return { error: "Failed to fetch published books" }
  }
}
