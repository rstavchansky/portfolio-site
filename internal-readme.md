# Internal site documentation

## Architecture overview

The site is built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed to Netlify as a fully static site. There is no CMS — all content lives in Markdown files and JSON collections inside `src/`.

```
portfolio-site/
├── public/                        # Static files served as-is
│   ├── assets/
│   │   ├── images/portfolio/      # Portfolio item thumbnails
│   │   ├── images/team/           # Team/headshot images
│   │   ├── images/photo.png       # Profile photo
│   │   └── pdfs/                  # Downloadable PDF samples
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── css/main.css           # Tailwind entry point + custom CSS
│   │   └── js/main.js             # Dark mode toggle, sticky header, mobile menu
│   ├── collections/
│   │   └── menu.json              # Top navigation links
│   ├── components/
│   │   ├── home/                  # Components used only on the home page
│   │   │   ├── portfolio.astro    # Featured portfolio items section
│   │   │   ├── separator.astro    # Visual section divider
│   │   │   └── writings.astro     # Recent posts section
│   │   ├── button.astro           # Reusable CTA button
│   │   ├── footer.astro           # Site footer
│   │   ├── header.astro           # Site header with nav
│   │   ├── logo.astro             # Logo mark
│   │   ├── page-heading.astro     # Page title block
│   │   ├── portfolio-card.astro   # Card used in the portfolio grid
│   │   ├── posts-loop.astro       # Blog post list
│   │   ├── square.astro           # Decorative square element
│   │   ├── square-line.astro      # Decorative line element
│   │   └── square-lines.astro     # Grouped decorative lines
│   ├── content/
│   │   ├── config.js              # Content collection schemas
│   │   ├── portfolio/             # One .md file per portfolio item
│   │   └── post/                  # One .md file per blog post
│   ├── layouts/
│   │   ├── main.astro             # Outer shell: head, header, footer
│   │   └── post.astro             # Layout wrapper for blog posts
│   ├── pages/
│   │   ├── index.astro            # Home
│   │   ├── about.astro            # About
│   │   ├── portfolio.astro        # Portfolio grid (all items)
│   │   ├── portfolio/[slug].astro # Individual portfolio item pages
│   │   ├── posts.astro            # Writing index
│   │   └── post/[slug].astro      # Individual blog post pages
│   └── env.d.ts                   # Astro environment type declarations
├── astro.config.mjs
├── netlify.toml                   # Netlify build and redirect config
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

Pages are statically generated at build time from the content collections. Adding or editing a Markdown file is all that's needed to create or update a page — no code changes required.

---

## How to run the site locally

### Prerequisites

- Node.js v20 (see `.node-version`)
- pnpm (`volta install pnpm` if using Volta, otherwise `npm install -g pnpm`)

### Steps

```bash
# Install dependencies (first time only, or after package.json changes)
pnpm install

# Start the dev server
pnpm dev
```

The site will be available at `http://localhost:4321`. Changes to Markdown files and `.astro` components hot-reload automatically.

To preview a production build locally:

```bash
pnpm build
pnpm preview
```

---

## How to add a new portfolio item

### 1. Add the thumbnail image

Drop the thumbnail into `public/assets/images/portfolio/`. Use a descriptive filename, for example `new-item-title.png`. Recommended aspect ratio: 16:9.

### 2. Add the PDF (if applicable)

If there's a downloadable PDF sample, add it to `public/assets/pdfs/`.

### 3. Create the content file

Create a new Markdown file in `src/content/portfolio/`. The filename becomes the URL slug — for example, `my-new-item.md` produces the page `/portfolio/my-new-item`.

The file must include this frontmatter:

```markdown
---
title: Your item title
company: Company name
category: Documentation type
description: One or two sentences describing the work. This appears on the portfolio grid card.
thumbnail: /assets/images/portfolio/your-thumbnail.png
linkLabel: Label for the call-to-action button
linkUrl: /assets/pdfs/your-file.pdf
---

Body content goes here. This appears on the individual item page only.
Write a paragraph or two expanding on the work, process, or context.
```

For `linkUrl`, use either:
- A path to a PDF in `public/`: `/assets/pdfs/filename.pdf`
- An external URL: `https://example.com/article`

### 4. Done

The item will automatically appear on both the `/portfolio` grid and get its own page at `/portfolio/[slug]`. The home page shows the first three items returned by the collection — item order follows alphabetical slug order unless you add a sort field.

---

## How to add a new blog post

### 1. Create the content file

Create a new Markdown file in `src/content/post/`. The filename becomes the URL slug — for example, `my-first-post.md` produces `/post/my-first-post`.

The file must include this frontmatter:

```markdown
---
layout: ../../layouts/post.astro
title: Your post title
description: One sentence summary. Appears in post listings.
dateFormatted: May 13, 2025
---

Post body content goes here. Standard Markdown is supported.
```

Note the `layout` field — it must point to `../../layouts/post.astro` exactly (relative from `src/content/post/`). Without it, the post will render without the site header and footer.

The `dateFormatted` field controls sort order on the Writing page — newer dates appear first. Use the format `Mon DD, YYYY` (for example, `Jun 1, 2025`).

### 2. Done

The post will automatically appear on the `/posts` index and the home page writing preview (which shows the three most recent posts).
