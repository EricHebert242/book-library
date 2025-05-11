import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getPublishedBooks } from "@/app/actions/book-actions"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Library } from "lucide-react"

export const metadata: Metadata = {
  title: "Book Library - Discover Great Books",
  description: "Browse our collection of books from various authors",
}

export default async function HomePage() {
  const { books, error } = await getPublishedBooks()

  return (
    <div className="space-y-12">
      <section className="py-12 md:py-24 bg-muted/40 -mx-4 px-4">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Discover Your Next Favorite Book
          </h1>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
            Browse our collection of books from various authors and find your next great read.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/books">
              <Button size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Books
              </Button>
            </Link>
            <Link href="/authors">
              <Button size="lg" variant="outline">
                <Library className="mr-2 h-5 w-5" />
                View Authors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Featured Books</h2>
          <Link href="/books">
            <Button variant="ghost">View all books</Button>
          </Link>
        </div>

        {error ? (
          <p className="text-destructive">{error}</p>
        ) : books && books.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.slice(0, 4).map((book) => (
              <Card key={book.id} className="overflow-hidden">
                <div className="aspect-[3/4] relative">
                  {book.coverImage ? (
                    <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No Cover</span>
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
            <h3 className="text-xl font-semibold">No published books yet</h3>
            <p className="text-muted-foreground">Check back later for new releases.</p>
          </div>
        )}
      </section>
    </div>
  )
}
