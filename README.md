# ONYX Portfolio

Premium developer portfolio built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, and the GitHub API.

## Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Lint and format

```bash
npm run lint
npm run format
```

## Edit content

All copy, links, and labels live in `src/content/profile.ts`.

- Update name, role, tagline, and bio
- Set GitHub username for repo fetching
- Adjust pinned projects and overrides
- Update navigation, buttons, and section headings
- Place your images at `public/images/profile.png` and `public/images/memoji.png`, or update the paths in `src/content/profile.ts`
- Fallback placeholders live in `public/images/profile-placeholder.png` and `public/images/memoji-placeholder.svg`

## GitHub integration

Repos are fetched from:

`https://api.github.com/users/{username}/repos?per_page=100&sort=updated`

- Username is set in `src/content/profile.ts`
- Results are cached in memory
- If rate limited, the UI falls back to `sampleProjects` from config

## Contact form email

The contact form submits to Web3Forms and requires a public access key.

1. Create an access key at Web3Forms and link it to `michael@firix.no`.
2. Add an environment variable:

```bash
VITE_WEB3FORMS_KEY=your_access_key_here
```

3. For GitHub Pages, add the same key as a repo secret named `VITE_WEB3FORMS_KEY`.
4. Rebuild and redeploy so the key is included in the build.

## Deploy

Vercel:

- Import the repo
- Set build command to `npm run build`
- Set output directory to `dist`

Netlify:

- Build command: `npm run build`
- Publish directory: `dist`

## GitHub Pages

This project is configured to deploy to GitHub Pages using GitHub Actions.

1. Push to a GitHub repo (default branch should be `main`).
2. In the repo settings, enable Pages:
   - Source: **GitHub Actions**
3. The workflow is in `.github/workflows/deploy.yml`.

Notes:
- Routing uses `HashRouter` to work on GitHub Pages.
- Build base path is set automatically in the workflow using the repo name.

## Folder structure

- `src/components` UI + layout
- `src/pages` route pages
- `src/lib` GitHub client and helpers
- `src/content/profile.ts` single source of truth for content
