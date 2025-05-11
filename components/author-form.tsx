"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { createAuthor, updateAuthor, type AuthorFormData } from "@/app/actions/author-actions"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
})

interface AuthorFormProps {
  author?: {
    id: string
    name: string
    bio?: string | null
    imageUrl?: string | null
  }
  isEditing?: boolean
}

export function AuthorForm({ author, isEditing = false }: AuthorFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: author?.name || "",
      bio: author?.bio || "",
      imageUrl: author?.imageUrl || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      if (isEditing && author) {
        const result = await updateAuthor(author.id, values as AuthorFormData)

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
          description: "Author updated successfully",
        })

        router.push(`/authors/${author.id}`)
      } else {
        const result = await createAuthor(values as AuthorFormData)

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
          description: "Author created successfully",
        })

        router.push("/authors")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Author" : "Add New Author"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Author biography"
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Update Author" : "Create Author"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
