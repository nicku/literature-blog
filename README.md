# Literature Blog

A bilingual (English & Hebrew) blog for literature essays, built with Next.js. **Hebrew is the default language.**

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to `/he` (Hebrew). Use the language switcher in the sidebar to switch to English (`/en`). All pages—Home, About, Essays, Books, Contact—are available in both languages.

---

## Adding a New Essay

Each essay is a **Markdown file** with YAML frontmatter. You need **one file per language** (e.g. one for English, one for Hebrew).

### 1. Create the Markdown file(s)

- **Location:** `src/content/essays/`
- **Naming:** `{slug}-en.md` and/or `{slug}-he.md`  
  Examples: `my-essay-en.md`, `my-essay-he.md`

### 2. Frontmatter (required)

At the top of each file, between `---` lines:

```yaml
---
title: "Your Essay Title"
language: "en"   # or "he" for Hebrew
category: ["Category Name 1", "Category Name 2"]   # Can be a single string or array for multiple categories
date: "YYYY-MM-DD"
slug: "my-essay"   # same for both en/he versions of the same essay
image: "/essays/my-essay-en.jpg"   # optional; see "Adding an image" below
---
```

**Note:** The `category` field supports both single categories and multiple categories:
- Single category: `category: "German Literature"`
- Multiple categories: `category: ["German Literature", "Russian Literature"]`

Then write your essay body in Markdown below the second `---`.

### 3. Optional: Add an image

- **Where to put the image:** `public/essays/`
- **Suggested name:** Match the file slug and language, e.g. `my-essay-en.jpg`, `my-essay-he.jpg`
- **What to put in frontmatter:**  
  `image: "/essays/my-essay-en.jpg"`  
  (path starts with `/essays/` and matches the file name in `public/essays/`)

If you omit `image`, the site uses a placeholder image. Supported formats: JPG, PNG, WebP, SVG.

### Summary: Files to create or edit

| What you’re doing              | Files to create/edit                                      |
|--------------------------------|-----------------------------------------------------------|
| New English essay              | `src/content/essays/{slug}-en.md`                         |
| New Hebrew essay               | `src/content/essays/{slug}-he.md`                         |
| Essay image                    | Put image in `public/essays/`, set `image` in frontmatter |

No code changes are needed; new files in `src/content/essays/` are picked up automatically.

---

## Archiving and Restoring Essays

Essays can be temporarily hidden by moving them to `src/content/essays-archive/`. The site only reads from `src/content/essays/`, so archived essays won't appear.

### Currently archived

| Essay | Files |
|-------|-------|
| Big Data (Vonnegut's *Galápagos*) | `BigData-en.md`, `BigData-he.md` |
| Hertzel's Utopia (Herzl's *Altneuland*) | `altnoiland-en.md`, `altnoiland-he.md` |

### Archive an essay (hide from site)

```bash
mv src/content/essays/MyEssay-en.md src/content/essays-archive/
mv src/content/essays/MyEssay-he.md src/content/essays-archive/
```

### Restore an essay (bring back)

```bash
# Big Data
cp src/content/essays-archive/BigData-en.md src/content/essays/
cp src/content/essays-archive/BigData-he.md src/content/essays/

# Hertzel's Utopia
cp src/content/essays-archive/altnoiland-en.md src/content/essays/
cp src/content/essays-archive/altnoiland-he.md src/content/essays/
```

Restored files are picked up automatically; no code changes needed.

---

## Editing Contact Information

The Contact page displays your email and other contact details.

### Files to edit:
- **`src/content/contact-en.md`** (English)
- **`src/content/contact-he.md`** (Hebrew)

Edit these Markdown files to add:
- Your email address
- Social media links (Twitter, LinkedIn, etc.)
- Any other contact information

You can use **markdown** for formatting. The page will automatically update when you save the file.

---

## Editing Published Books

The Published Books page displays your published works with purchase links.

### Files to edit:
- **`src/content/books-en.md`** (English)
- **`src/content/books-he.md`** (Hebrew)

Edit these Markdown files to add:
- Book titles
- Author name
- Publisher information
- Publication year
- Book descriptions
- Purchase links (Amazon, Bookshop, etc.)

Use markdown links for purchase URLs:
```markdown
[Buy on Amazon](https://amazon.com/your-book-link) | [Buy on Bookshop](https://bookshop.org/your-book-link)
```

You can add multiple books separated by `---` (horizontal rule). The page will automatically update when you save the file.

---

## Adding Published Articles

The Published Articles page displays articles you've written that were published elsewhere, each with a title, description, publication name, link, and optional date.

### Files to edit:
- **`src/content/articles-en.md`** (English)
- **`src/content/articles-he.md`** (Hebrew)

Each file uses **YAML frontmatter only** (no markdown body). Add entries to the `articles` list:

```yaml
---
title: Published Articles
articles:
  - title: "Article Title"
    description: "A short description of what the article is about."
    publication: "Publication Name"
    url: "https://example.com/your-article"
    date: "2024-03"   # optional
  - title: "Another Article"
    description: "Description of the second article."
    publication: "Another Publication"
    url: "https://example.com/another-article"
---
```

The page will automatically update when you save the file. No code changes are needed.

---

## Editing About Page

The About page displays information about yourself.

### Files to edit:
- **`src/content/about-en.md`** (English)
- **`src/content/about-he.md`** (Hebrew)

Edit these Markdown files to add your bio, background, or any information about yourself. You can use **markdown** for formatting.

---

## Summary: All Content Files

| What you're editing              | File to edit                                      |
|----------------------------------|---------------------------------------------------|
| New English essay                | `src/content/essays/{slug}-en.md`                 |
| New Hebrew essay                 | `src/content/essays/{slug}-he.md`                 |
| Essay image                      | Put image in `public/essays/`, set `image` in frontmatter |
| Contact (English)                | `src/content/contact-en.md`                       |
| Contact (Hebrew)                 | `src/content/contact-he.md`                       |
| Published books (English)        | `src/content/books-en.md`                         |
| Published books (Hebrew)         | `src/content/books-he.md`                         |
| Published articles (English)     | `src/content/articles-en.md`                      |
| Published articles (Hebrew)      | `src/content/articles-he.md`                      |
| About (English)                  | `src/content/about-en.md`                         |
| About (Hebrew)                   | `src/content/about-he.md`                         |

All content files use **Markdown** format. No code changes are needed; edits are picked up automatically.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Deploy on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)
