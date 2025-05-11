import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAuthorById } from "@/app/actions/author-actions"
import { AuthorForm } from "@/components/author-form"

interface EditAuthorPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EditAuthorPageProps): Promise<Metadata> {
  const { author, error } = await getAuthorById(params.id)

  if (error || !author) {
    return {
      title: "Author Not Found | Book Library",
      description: "The requested author could not be found",
    }
  }

  return {
    title: `Edit ${author.name} | Book Library`,
    description: `Edit details for ${author.name}`,
  }
}

export default async function EditAuthorPage({ params }: EditAuthorPageProps) {
  const { author, error } = await getAuthorById(params.id)

  if (error || !author) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Author</h1>
      <AuthorForm author={author} isEditing />
    </div>
  )
}
