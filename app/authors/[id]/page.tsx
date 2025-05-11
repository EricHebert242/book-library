import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getAuthorById } from "@/app/actions/author-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Book, ArrowLeft, Plus } from "lucide-react"
import DeleteAuthorButton from "@/components/delete-author-button"

interface AuthorPageProps {
  params: {
    id: string
  }
}

// Fix the generateMetadata function
export async function generateMetadata({ params }: AuthorPageProps) {
  const params1 = await params
  const { author, error } = await getAuthorById(params1.id)

  if (error || !author) {
    return {
      title: "Author Not Found | Book Library",
      description: "The requested author could not be found",
    }
  }

  return {
    title: `${author.name} | Book Library`,
    description: author.bio || `View details about ${author.name}`,
  }
}

// Fix the AuthorPage function
export default async function AuthorPage({ params }: AuthorPageProps) {
  const params1 = await params
  const { author, error } = await getAuthorById(params1.id)

  if (error || !author) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/authors">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Authors
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div>
          <Card>
            <CardHeader>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                {author.imageUrl ? (
                  <Image src={author.imageUrl || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <span className="text-4xl font-bold text-muted-foreground">{author.name.charAt(0)}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Link href={`/authors/${author.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <DeleteAuthorButton id={author.id} />
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{author.name}</CardTitle>
              <CardDescription>Added on {new Date(author.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              {author.bio ? (
                <p className="whitespace-pre-line">{author.bio}</p>
              ) : (
                <p className="text-muted-foreground">No biography available.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Books</CardTitle>
                <Link href={`/books/new?authorId=${author.id}`}>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Book
                  </Button>
                </Link>
              </div>
              <CardDescription>
                {author.books.length} {author.books.length === 1 ? "book" : "books"} by this author
              </CardDescription>
            </CardHeader>
            <CardContent>
              {author.books.length > 0 ? (
                <ul className="space-y-2">
                  {author.books.map((book) => (
                    <li key={book.id}>
                      <Link href={`/books/${book.id}`} className="hover:underline">
                        {book.title}
                      </Link>
                      {book.published && (
                        <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                          Published
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6">
                  <Book className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No books yet</p>
                  <Link href={`/books/new?authorId=${author.id}`} className="mt-4 inline-block">
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Book
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}