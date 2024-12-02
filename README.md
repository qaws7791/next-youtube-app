# Next.js + TailwindCSS + YouTube API

Static Site Generator for YouTube Playlist

- framework:[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#)(SSG)
- styling:[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
- api: [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](#)
- hosting:[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=Cloudflare&logoColor=white)](#)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

First, run the development server:

```bash
pnpm dev
```

## Build

1. Build the project

```bash
pnpm build
```

generated static files are in `out` directory.

2. Preview the build

```bash
npx serve@latest out
```

to preview the build locally, you can use `serve` package rather than `next start`.
