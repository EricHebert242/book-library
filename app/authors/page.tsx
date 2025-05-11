import Link from "next/link"
import { getAuthors } from "@/app/actions/author-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Book } from "lucide-react"

export const metadata = {
  title: "Authors | Book Library",
  description: "Browse all authors in our library",
}

export default async function AuthorsPage() {
  const { authors, error } = await getAuthors()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Authors</h1>
        <Link href="/authors/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Author
          </Button>
        </Link>
      </div>

      {error ? (
        <p className="text-destructive">{error}</p>
      ) : authors && authors.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <Card key={author.id}>
              <CardHeader>
                <CardTitle>{author.name}</CardTitle>
                <CardDescription>
                  {author.books.length} {author.books.length === 1 ? "book" : "books"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {author.bio ? (
                  <p className="line-clamp-3 text-sm text-muted-foreground">{author.bio}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">No bio available</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/authors/${author.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                <Link href={`/books?authorId=${author.id}`}>
                  <Button variant="outline">
                    <Book className="mr-2 h-4 w-4" />
                    Books
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
          <h2 className="text-xl font-semibold">No authors found</h2>
          <p className="text-muted-foreground">Get started by adding a new author.</p>
          <Link href="/authors/new" className="mt-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Author
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}