import Link from "next/link"
import Image from "next/image"
import { getBooks } from "@/app/actions/book-actions"
import { getAuthorById } from "@/app/actions/author-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Books | Book Library",
  description: "Browse all books in our library",
}

export default async function BooksPage({ searchParams }: { searchParams: { authorId?: string } }) {
  const { books, error } = await getBooks()

  // Filter books by author if authorId is provided
  let filteredBooks = books || []
  let authorName = null
  const searchParams1 = await searchParams
  if (searchParams1.authorId) {
    const { author } = await getAuthorById(searchParams1.authorId)
    if (author) {
      authorName = author.name
      filteredBooks = filteredBooks.filter((book) => book.author.id === searchParams1.authorId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{authorName ? `Books by ${authorName}` : "Books"}</h1>
          {authorName && (
            <Link href="/books">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Books
              </Button>
            </Link>
          )}
        </div>
        <Link href="/books/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Book
          </Button>
        </Link>
      </div>

      {error ? (
        <p className="text-destructive">{error}</p>
      ) : filteredBooks.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <div className="aspect-[3/4] relative">
                {book.coverImage ? (
                  <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No Cover</span>
                  </div>
                )}
                {book.published && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Published
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  by{" "}
                  <Link href={`/authors/${book.author.id}`} className="hover:underline">
                    {book.author.name}
                  </Link>
                </p>
              </CardHeader>
              <CardContent>
                {book.description ? (
                  <p className="line-clamp-3 text-sm text-muted-foreground">{book.description}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">No description available</p>
                )}
              </CardContent>
              <CardFooter>
                <Link href={`/books/${book.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
          <h2 className="text-xl font-semibold">
            {authorName ? `No books found for ${authorName}` : "No books found"}
          </h2>
          <p className="text-muted-foreground">Get started by adding a new book.</p>
          <Link
            href={searchParams.authorId ? `/books/new?authorId=${searchParams.authorId}` : "/books/new"}
            className="mt-4"
          >
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}