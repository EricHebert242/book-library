# Book Library

A full-stack Next.js application with Tailwind CSS, shadcn/ui, Prisma and Postgresql to manage a library of books and authors.

## Features

- Author management (create, read, update, delete)
- Book management (create, read, update, delete)
- Server-side rendering for better SEO
- Responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`
3. Create a `.env` file with your database connection string:
   \`\`\`
   DATABASE_URL="postgresql://username:password@hostname:port/database?schema=public"
   \`\`\`
4. Generate the Prisma client:
   \`\`\`bash
   npx prisma generate
   \`\`\`
5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL

# Creating a Next.js Project with Tailwind, shadcn/ui, Prisma and connect to Neon Postgresql

## Step 1: Create a New Next.js Project

First, let's create a new Next.js project with TypeScript and Tailwind CSS :

```shellscript
npx create-next-app@latest my-book-library
```

When prompted, select the following options:

- Use TypeScript: Yes
- Use ESLint: Yes
- Use Tailwind CSS: Yes
- Use `src/` directory: No (optional, but recommended)
- Use App Router: Yes
- Customize import alias: Yes (use default @/\*)

Navigate to your project directory:

```shellscript
cd my-book-library
```

## Step 2: Set Up shadcn/ui

Let's add shadcn/ui components to our project:

```shellscript
npx shadcn@latest init
```

When prompted, select the following options:

- Style: Default
- Base color: Slate
- Global CSS file: src/app/globals.css
- CSS variables: Yes
- Tailwind CSS config: tailwind.config.ts
- Components directory: @/components
- Utility functions: @/lib/utils
- React Server Components: Yes
- Import alias: @/\*

Now let's install some common components we'll need:

```shellscript
npx shadcn@latest add button card form input select table toast dialog
```

## Step 3: Set Up Prisma with PostgreSQL

Install Prisma:

```shellscript
npm install prisma @prisma/client
```

Initialize Prisma:

```shellscript
npx prisma init
```

This creates a `prisma` directory with a `schema.prisma` file and a `.env` file.

## Step 4: Configure Prisma for Your Database

Update your `.env` file with your PostgreSQL connection string:

```plaintext
DATABASE_URL="postgresql://username:password@hostname:port/database?schema=public"
```

Replace the placeholder values with your actual database credentials.

## Step 5: Create the Database Schema

Let's define our schema for authors and books. Update your `prisma/schema.prisma` file:

```typescriptreact project="book-library"
...
```

## Step 6: Push the Schema to Your Database

Now, let's push this schema to your database:

```shellscript
npx prisma db push
```

This will create the tables in your database based on your schema.

## Step 7: Generate Prisma Client

Generate the Prisma client:

```shellscript
npx prisma generate
```

## Step 8: Create a Prisma Client Instance

Let's create a singleton instance of the Prisma client to use throughout our application:

```typescriptreact project="book-library"
...
```

## Step 9: Create API Routes for CRUD Operations

Let's create server actions for our CRUD operations. First, let's create actions for authors:

```typescriptreact project="book-library"
...
```

Now, let's create actions for books:

```typescriptreact project="book-library"
...
```

## Step 10: Create UI Components

Let's create the UI components for our application. First, let's create a layout:

```typescriptreact project="book-library"
...
```

Now, let's create a navbar component:

```typescriptreact project="book-library"
...
```

## Step 11: Create Pages for Authors

Let's create the pages for authors:

```typescriptreact project="book-library"
...
```

Now, let's create a form for adding/editing authors:

```typescriptreact project="book-library"
...
```

Let's create the new author page:

```typescriptreact project="book-library"
...
```

Let's create the author detail page:

```typescriptreact project="book-library"
...
```

Let's create a delete author button component:

```typescriptreact project="book-library"
...
```

Let's create the edit author page:

```typescriptreact project="book-library"
...
```

## Step 12: Create Pages for Books

Let's create the pages for books:

```typescriptreact project="book-library"
...
```

Now, let's create a form for adding/editing books:

```typescriptreact project="book-library"
...
```

Let's create the new book page:

```typescriptreact project="book-library"
...
```

Let's create the book detail page:

```typescriptreact project="book-library"
...
```

Let's create a delete book button component:

```typescriptreact project="book-library"
...
```

Let's create the edit book page:

```typescriptreact project="book-library"
...
```

## Step 13: Create the Home Page

Let's create a home page that showcases published books:

```typescriptreact project="book-library"
...
```

## Step 14: Create a Dashboard Page

Let's create a simple dashboard page:

```typescriptreact project="book-library"
...
```

## Step 16: Add Missing Components

Let's add the missing FormDescription component:

```typescriptreact project="book-library"
...
```

Let's add the Textarea component:

```typescriptreact project="book-library"
...
```

Let's add the Switch component:

```typescriptreact project="book-library"
...
```

Let's add the Label component:

```typescriptreact project="book-library"
...
```

## Step 17: Update package.json with Required Dependencies

Make sure your package.json includes all the necessary dependencies:

```shellscript
npm install @hookform/resolvers zod react-hook-form
```

## Step 18: Run the Application

Now you can run your application:

```shellscript
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application in action.

## Summary

You've successfully created a full-stack Next.js application with:

1. **Next.js App Router** for server-side rendering and improved SEO
2. **Tailwind CSS** for styling
3. **shadcn/ui** for UI components
4. **Prisma** as the ORM for database access
5. **PostgreSQL** as the database
6. **TypeScript** for type safety
7. **Server Actions** for CRUD operations

The application includes:

- Author management (create, read, update, delete)
- Book management (create, read, update, delete)
- Dashboard with statistics
- SEO optimization with metadata
- Responsive design

This project follows best practices for:

- Server-side rendering for better SEO
- Type safety with TypeScript and Zod validation
- Database schema design with relationships
- UI component architecture
- Form handling and validation
- Error handling and user feedback

You can extend this application by adding:

1. Authentication
2. Image uploads for book covers and author photos
3. Search functionality
4. Pagination for large datasets
5. Categories and tags for books
6. User reviews and ratings
