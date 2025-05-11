import { AuthorForm } from "@/components/author-form"

export const metadata = {
  title: "Add New Author | Book Library",
  description: "Add a new author to the library",
}

export default function NewAuthorPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Author</h1>
      <AuthorForm />
    </div>
  )
}
