import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getBookById } from "@/app/actions/book-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, User, ArrowLeft } from "lucide-react"
import DeleteBookButton from "@/components/delete-book-button"

interface BookPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { book, error } = await getBookById(params.id)

  if (error || !book) {
    return {
      title: "Book Not Found | Book Library",
      description: "The requested book could not be found",
    }
  }

  return {
    title: `${book.title} | Book Library`,
    description: book.description || `View details about ${book.title}`,
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { book, error } = await getBookById(params.id)

  if (error || !book) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/books">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div>
          <Card>
            <CardHeader>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                {book.coverImage ? (
                  <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <span className="text-muted-foreground">No Cover</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Link href={`/books/${book.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <DeleteBookButton id={book.id} />
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{book.title}</CardTitle>
                  <CardDescription>
                    by{" "}
                    <Link href={`/authors/${book.author.id}`} className="hover:underline">
                      {book.author.name}
                    </Link>
                  </CardDescription>
                </div>
                {book.published && (
                  <div className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">Published</div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                {book.description ? (
                  <p className="whitespace-pre-line">{book.description}</p>
                ) : (
                  <p className="text-muted-foreground">No description available.</p>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Details</h3>
                <dl className="grid grid-cols-[100px_1fr] gap-2">
                  <dt className="text-muted-foreground">Status:</dt>
                  <dd>{book.published ? "Published" : "Draft"}</dd>

                  {book.published && book.publishedAt && (
                    <>
                      <dt className="text-muted-foreground">Published:</dt>
                      <dd>{new Date(book.publishedAt).toLocaleDateString()}</dd>
                    </>
                  )}

                  <dt className="text-muted-foreground">Created:</dt>
                  <dd>{new Date(book.createdAt).toLocaleDateString()}</dd>

                  <dt className="text-muted-foreground">Updated:</dt>
                  <dd>{new Date(book.updatedAt).toLocaleDateString()}</dd>
                </dl>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About the Author</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  {book.author.imageUrl ? (
                    <Image
                      src={book.author.imageUrl || "/placeholder.svg"}
                      alt={book.author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{book.author.name}</h3>
                  <Link href={`/authors/${book.author.id}`} className="text-sm text-primary hover:underline">
                    View profile
                  </Link>
                </div>
              </div>

              {book.author.bio && <p className="text-sm line-clamp-3">{book.author.bio}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
