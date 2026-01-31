# Literature Blog

A bilingual (English & Hebrew) blog for literature essays, built with Next.js.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the language switcher and search to browse essays.

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
category: "Category Name"
date: "YYYY-MM-DD"
slug: "my-essay"   # same for both en/he versions of the same essay
image: "/essays/my-essay-en.jpg"   # optional; see "Adding an image" below
---
```

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

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Deploy on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)
