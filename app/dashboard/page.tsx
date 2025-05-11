import Link from "next/link"
import { getBooks } from "@/app/actions/book-actions"
import { getAuthors } from "@/app/actions/author-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, BookMarked, BookX } from "lucide-react"

export const metadata = {
  title: "Dashboard | Book Library",
  description: "View statistics and manage your book library",
}

export default async function DashboardPage() {
  const { books } = await getBooks()
  const { authors } = await getAuthors()

  // Calculate statistics
  const totalBooks = books?.length || 0
  const publishedBooks = books?.filter((book) => book.published).length || 0
  const unpublishedBooks = totalBooks - publishedBooks
  const totalAuthors = authors?.length || 0

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
            <p className="text-xs text-muted-foreground">Books in your library</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Books</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedBooks}</div>
            <p className="text-xs text-muted-foreground">Books available to readers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unpublished Books</CardTitle>
            <BookX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unpublishedBooks}</div>
            <p className="text-xs text-muted-foreground">Books in draft mode</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Authors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAuthors}</div>
            <p className="text-xs text-muted-foreground">Authors in your library</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Books</CardTitle>
            <CardDescription>Recently added books in your library</CardDescription>
          </CardHeader>
          <CardContent>
            {books && books.length > 0 ? (
              <div className="space-y-4">
                {books.slice(0, 5).map((book) => (
                  <div key={book.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">by {book.author.name}</p>
                    </div>
                    <Link href={`/books/${book.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No books found</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your book library</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Link href="/books/new">
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add New Book
                </Button>
              </Link>
              <Link href="/authors/new">
                <Button className="w-full" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Add New Author
                </Button>
              </Link>
              <Link href="/books">
                <Button className="w-full" variant="outline">
                  <BookMarked className="mr-2 h-4 w-4" />
                  Manage Books
                </Button>
              </Link>
              <Link href="/authors">
                <Button className="w-full" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Authors
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}