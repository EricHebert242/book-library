"use client"

import { FormDescription } from "@/components/ui/form"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createBook, updateBook, type BookFormData } from "@/app/actions/book-actions"
import { getAuthors } from "@/app/actions/author-actions"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  authorId: z.string().min(1, "Author is required"),
})

interface BookFormProps {
  book?: {
    id: string
    title: string
    description?: string | null
    coverImage?: string | null
    published: boolean
    publishedAt?: Date | null
    authorId: string
  }
  isEditing?: boolean
}

export function BookForm({ book, isEditing = false }: BookFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([])
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book?.title || "",
      description: book?.description || "",
      coverImage: book?.coverImage || "",
      published: book?.published || false,
      authorId: book?.authorId || searchParams.get("authorId") || "",
    },
  })

  useEffect(() => {
    async function loadAuthors() {
      setIsLoadingAuthors(true)
      const { authors: authorsList, error } = await getAuthors()

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load authors",
        })
      } else if (authorsList) {
        setAuthors(authorsList.map((author) => ({ id: author.id, name: author.name })))
      }

      setIsLoadingAuthors(false)
    }

    loadAuthors()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // If published is true and we're creating a new book or changing from unpublished to published,
      // set the publishedAt date to now
      const formData: BookFormData = {
        ...values,
        publishedAt: values.published ? new Date() : null,
      }

      if (isEditing && book) {
        // If the book was already published, keep the original publishedAt date
        if (book.published && values.published) {
          formData.publishedAt = book.publishedAt || new Date()
        }

        const result = await updateBook(book.id, formData)

        if (result.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
          })
          return
        }

        toast({
          title: "Success",
          description: "Book updated successfully",
        })

        router.push(`/books/${book.id}`)
      } else {
        const result = await createBook(formData)

        if (result.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
          })
          return
        }

        toast({
          title: "Success",
          description: "Book created successfully",
        })

        router.push("/books")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Book" : "Add New Book"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Book description"
                      className="min-h-32"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/cover.jpg" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoadingAuthors}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                    <FormDescription>Make this book visible to readers</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Update Book" : "Create Book"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
