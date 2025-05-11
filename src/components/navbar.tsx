import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6" />
          <span>Book Library</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/books">
            <Button variant="ghost">Books</Button>
          </Link>
          <Link href="/authors">
            <Button variant="ghost">Authors</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
