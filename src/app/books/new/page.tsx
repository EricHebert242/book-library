import type { Metadata } from "next"
import { BookForm } from "@/components/book-form"

export const metadata: Metadata = {
  title: "Add New Book | Book Library",
  description: "Add a new book to the library",
}

export default function NewBookPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <BookForm />
    </div>
  )
}
