import { Suspense } from "react"
import { BookForm } from "@/components/book-form"

export const metadata = {
  title: "Add New Book | Book Library",
  description: "Add a new book to the library",
}

// This component will extract the authorId from searchParams and pass it to BookForm
function BookFormWrapper({ searchParams }: { searchParams: { authorId?: string } }) {
  return <BookForm defaultAuthorId={searchParams.authorId || ""} />
}

export default function NewBookPage({ searchParams }: { searchParams: { authorId?: string } }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <Suspense fallback={<div>Loading form...</div>}>
        <BookFormWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  )
}