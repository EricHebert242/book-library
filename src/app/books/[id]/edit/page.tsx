import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBookById } from "@/app/actions/book-actions"
import { BookForm } from "@/components/book-form"

interface EditBookPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EditBookPageProps): Promise<Metadata> {
  const { book, error } = await getBookById(params.id)

  if (error || !book) {
    return {
      title: "Book Not Found | Book Library",
      description: "The requested book could not be found",
    }
  }

  return {
    title: `Edit ${book.title} | Book Library`,
    description: `Edit details for ${book.title}`,
  }
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { book, error } = await getBookById(params.id)

  if (error || !book) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
      <BookForm book={book} isEditing />
    </div>
  )
}
