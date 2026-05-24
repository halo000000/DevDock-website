# DevDock

This repository contains the **marketing website** for **DevDock**, but this README is written primarily for people who want to understand **what DevDock is as a product** and how it helps users. A shorter section at the end describes the website itself and how to run or deploy it.

---

## What is DevDock?

**DevDock** is a **Windows desktop application** that helps you run a **local web development environment** from one place. Instead of juggling many separate installers and tools, you use a single app to start and stop services, open the right URLs, read logs, and adjust configuration when needed.

DevDock is aimed at developers and technical users who want a **predictable local stack** on Windows for building and testing websites and web apps.

---

## What problem does DevDock solve?

Local web development often means:

- Installing and updating several components by hand
- Remembering which ports and folders belong to which tool
- Debugging failures across scattered logs and config files

DevDock reduces that friction by giving you **one dashboard** for common local services and helpers, with a **single root folder** (`C:\DevDock`) where service files, logs, and configs are kept organized.

---

## Who is DevDock for?

DevDock is a good fit if you:

- Build **PHP** or **static** sites and want a simple local server workflow
- Need **MySQL** locally and optionally a **database UI** (phpMyAdmin)
- Want to **test email** without sending real mail (Mailpit)
- Sometimes need **FTP** for integration testing
- Prefer **one app** to orchestrate services instead of many disconnected utilities

DevDock is **Windows-first**. Paths and workflows assume a Windows machine.

---

## What can you do with DevDock?

At a high level, DevDock helps you:

1. **Start and stop services** from one dashboard (for example web server, PHP, database, mail testing).
2. **Open the right place quickly** (browser URLs, folders, logs) from the same UI.
3. **See logs in one place** so troubleshooting is faster when something fails.
4. **Edit configuration** where supported, then restart services so changes take effect.
5. Use **built-in helpers** for common tasks (for example HTTP testing, SQLite creation, DNS and HTTPS helpers for local development).

Exact capabilities depend on your build and configuration. The authoritative **end-user guide** for the installed app is `Appliction.md` in this repository.

---

## Core concepts

### One root folder: `C:\DevDock`

DevDock keeps a consistent layout under **`C:\DevDock`**, including:

- **Web root** for your site files (for example `C:\DevDock\nginx\html\`)
- **Service files** for the bundled components you enable
- **Logs** so you can trace errors and startup issues
- **Configuration files** you can open from DevDock when supported

You do not need to memorize every path to get started. The guide explains the important locations and workflows.

### Services (typical)

DevDock can help you run and manage common local services, including:

- **NGINX** (local web server)
- **PHP** (run `.php` pages)
- **MySQL** (local database)
- **phpMyAdmin** (manage MySQL in the browser)
- **Mailpit** (capture and view test email locally)
- **FTP** (local FTP for upload and integration testing)

For step-by-step usage, recommended start order, and troubleshooting, see **`Appliction.md`**.

---

## Getting started (DevDock app)

1. **Download** the latest Windows installer from your DevDock releases page (the website buttons point to GitHub Releases; update the URL in `src/config/site.ts` for your real repo).
2. **Install** DevDock on Windows.
3. **Launch** DevDock.
4. Open the **service list** and start what your project needs (for example MySQL, PHP, NGINX).
5. Put your site files in the **web root** under `C:\DevDock` as described in `Appliction.md`.
6. Open **`http://localhost/`** in your browser when the web server is running.

If you are new to DevDock, read **`Appliction.md`** top to bottom. It is written as a user guide for the installed application.

---

## Documentation in this repo

| Document | Purpose |
| --- | --- |
| **`Appliction.md`** | Primary user guide for the **DevDock desktop app**: quick start, paths, services, tabs, configuration workflow, troubleshooting. |
| **`src/content/tutorials/devdock.md`** | Content for the website **How to use** page (mini documentation). Keep it aligned with the real app behavior. |

---

## Support and contact

Support channels depend on how you ship DevDock (GitHub Issues, email, Discord, and so on). Update this section with your real links.

If you report a problem, include:

- Which service you started
- What you clicked (Start, Stop, Config, Open)
- What you expected versus what happened
- Relevant log output

---

## About this website (secondary)

This folder is the **DevDock marketing site**, built with **Astro 6** and deployed as **static HTML** (`npm run build` outputs to `dist/`).

### Tech stack

- **Astro** for pages and layouts
- **Tailwind CSS** available via the Vite plugin in `astro.config.mjs` (see `src/styles/global.css` if you want utility classes globally)
- **GSAP** for scroll animations (`src/scripts/site-animations.ts`)
- **Lucide** icons (`@lucide/astro`)

### Important files

| Path | Role |
| --- | --- |
| `src/config/site.ts` | Site name and **GitHub Releases URL** for download buttons. |
| `src/pages/index.astro` | Home page. |
| `src/pages/about.astro` | About page. |
| `src/pages/how-to-use.astro` | Renders the tutorial from content collections. |
| `src/pages/privacy.astro` | Privacy policy page. |
| `src/content/tutorials/devdock.md` | Tutorial markdown for `/how-to-use`. |
| `src/content.config.ts` | Astro content collections config. |
| `public/` | Static assets (images, icons, fonts). |
| `.cursor/DESIGN.md` | Design notes for the Apple-inspired visual direction. |

### Commands

From the project root:

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies (Node **>= 22.12.0** per `package.json`). |
| `npm run dev` | Start the dev server (default Astro port). |
| `npm run build` | Production build to `dist/`. |
| `npm run preview` | Preview the production build locally. |

`predev` and `prebuild` run `scripts/remove-legacy-content-config.cjs` to avoid legacy content config conflicts.

### Before you publish

1. Set **`GITHUB_RELEASES_URL`** in `src/config/site.ts` to your real releases URL.
2. Replace placeholder **developer contact** details on the About page if you used placeholders.
3. Review **`privacy.astro`** and fill in real contact emails and any product-specific data practices.
4. Swap marketing images under `public/images/` as needed.

---

## License

Add a `LICENSE` file for this website repository if you open source it. Licensing for **bundled third-party binaries** inside the DevDock app itself is governed by the app project and upstream licenses, not by this website repo alone.
