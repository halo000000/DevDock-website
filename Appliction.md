# DevDock

**DevDock** is a Windows-focused **local development suite** that bundles common backend services (web server, PHP, database, mail testing, and more) behind a single **desktop application** built with **[Tauri 2](https://v2.tauri.app/)** (Rust) and **[React](https://react.dev/)** + **[Vite](https://vitejs.dev/)**.

Instead of juggling XAMPP-style installs by hand, DevDock **syncs bundled service binaries** into a fixed runtime folder, **starts and stops processes** from the UI, exposes **structured logs**, and provides extra tools (HTTP client, Rust workspace helpers, local DNS/HTTPS experiments).

---

## Table of contents

- [What DevDock does](#what-devdock-does)
- [How it works (high level)](#how-it-works-high-level)
- [Main UI tabs](#main-ui-tabs)
- [Services overview](#services-overview)
- [Runtime layout (`C:\DevDock`)](#runtime-layout-cdevdock)
- [PHP: where to put files and how requests flow](#php-where-to-put-files-and-how-requests-flow)
- [Configuring each service](#configuring-each-service)
- [Official documentation (external)](#official-documentation-external)
- [Repository structure](#repository-structure)
- [Development](#development)
- [Production build](#production-build)
- [Debugging when something goes wrong](#debugging-when-something-goes-wrong)
- [Contact](#contact)
- [License](#license)

---

## What DevDock does

- **Orchestrates** local daemons/exes (NGINX, PHP worker, MySQL, Mailpit, phpMyAdmin, embedded FTP, sql-web) from the UI.
- **Copies** the shipped `services-binares` tree into a predictable Windows path on startup (see [Runtime layout](#runtime-layout-cdevdock)).
- **Surfaces logs** per service in the **LogsConsole** tab and on-disk under `C:\DevDock\logs\`.
- **Edits config files** through a built-in editor (UI + raw code) where supported.
- Provides **HTTP Client** (Rust/`reqwest`) to call local APIs **without browser CORS**.
- Optional **Rust workspace** scanning and **local DNS / HTTPS** tooling (see tabs below).

---

## How it works (high level)

1. On launch, the app ensures **`C:\DevDock`** exists and syncs bundled binaries from the app resources (or dev `services-binares` / pruned copy, depending on build).
2. The **frontend** (React) talks to the **Rust backend** via Tauri **commands** (`invoke`) to start/stop services, read logs, load/save config documents, etc.
3. **NGINX** serves static files from `C:\DevDock\nginx\html`. **PHP** for the main site is handled by a **PHP built-in server** bound to `127.0.0.1:9000`, and NGINX **proxies** `*.php` requests to that server (so `.php` files execute instead of downloading).
4. **phpMyAdmin** runs as a separate PHP built-in server on **port 8080** (not the same process as the NGINX PHP worker).

---

## Main UI tabs

These are the primary tabs in the application shell (see `src/pages/Dashboard.tsx`).

| Tab | Purpose |
| --- | --- |
| **List of all the service** | Main service dashboard: start/stop/restart each service, open URLs or folders, and open the config editor where available. Includes nested sub-tabs **Controls** (cards) and **Metrics** (resource usage). |
| **SQLite One-Click** | Create a `.db` file under a chosen project path; quick link to phpMyAdmin for management. |
| **HTTP Client** | Send HTTP requests from Rust (no CORS); useful for testing local APIs. |
| **LogsConsole** | Aggregated log lines from services with a per-service filter. |
| **Rust Workspace** | Discover and work with Rust/Cargo projects from a chosen root. |
| **DNS & HTTPS** | Local DNS and HTTPS-related helpers (Hickory DNS, certificates, NGINX includes, etc.). |

---

## Services overview

| Service | Role | Typical ports / paths |
| --- | --- | --- |
| **NGINX** | HTTP server / static + proxy to PHP worker | `http://localhost` (port **80**), config `C:\DevDock\nginx\conf\nginx.conf` |
| **PHP** | Built-in PHP server for NGINX document root (`*.php` via proxy) | Listens **`127.0.0.1:9000`**, doc root `C:\DevDock\nginx\html`, logs `C:\DevDock\logs\php.log`, config `C:\DevDock\php\php.ini` |
| **MySQL** | Database server | **3306**, data under `C:\DevDock\mysql\data` |
| **Mailpit** | Fake SMTP + web UI for captured mail | SMTP **1025**, UI **8025** |
| **phpMyAdmin** | Web DB admin (PHP) | **`http://127.0.0.1:8080`**, tree under `C:\DevDock\phpmyadmin` |
| **FTP** | Embedded FTP server | Config `C:\DevDock\config\ftp.json` |
| **SQL Web** | External **sql-web** DB workbench binary | Port from `C:\DevDock\config\sql-web.json` (default **8090**) |

**Note:** Starting **NGINX** can automatically start the **PHP** worker when `# devdock:auto_start_php=on` is present in `nginx.conf` (configurable from the NGINX editor UI). Stopping NGINX can stop PHP when that option is enabled.

---

## Runtime layout (`C:\DevDock`)

All runtime state is under **`C:\DevDock`** (see `src-tauri/src/paths.rs`).

| Path | Contents |
| --- | --- |
| `C:\DevDock\nginx\` | NGINX prefix: `nginx.exe`, `conf\nginx.conf`, `html\` (web root), `logs\`, temp folders |
| `C:\DevDock\nginx\html\` | **Put your site here** — HTML, PHP, assets |
| `C:\DevDock\php\` | `php.exe`, `php.ini`, and related DLLs as shipped |
| `C:\DevDock\mysql\` | MySQL/MariaDB binaries and `data\` |
| `C:\DevDock\mailpit\` | Mailpit binary |
| `C:\DevDock\phpmyadmin\` | phpMyAdmin PHP application tree |
| `C:\DevDock\ftp\` | FTP roots / runtime (see `ftp.json`) |
| `C:\DevDock\sql-web` or `C:\DevDock\SQLWEB` | sql-web binary + `static\` assets |
| `C:\DevDock\config\` | JSON configs (`sql-web.json`, `ftp.json`, `local-dns.json`, etc.) |
| `C:\DevDock\logs\` | Per-service log files (e.g. `nginx.log`, `php.log`, `mysql.log`) |
| `C:\DevDock\templates\` | Default templates copied when missing |
| `C:\DevDock\sqlite\` | Default location for SQLite one-click DBs |

**Bundled sources in the repo:** `services-binares/` (full) and `services-binares-pruned/` (pruned for packaging). The production bundle maps pruned resources into `services-binares/` inside the app (see `src-tauri/tauri.conf.json`).

---

## PHP: where to put files and how requests flow

1. Place your **`index.php`**, **`index.html`**, and other public files under:
   - **`C:\DevDock\nginx\html\`**
2. Ensure **NGINX** and **PHP** (worker) services are **Running** in DevDock.
3. Open **`http://localhost/`** (or **`http://localhost/yourfile.php`**).

**Request path:**

- Static files → served by NGINX from `html\`.
- `*.php` → NGINX proxies to the PHP built-in server on **`127.0.0.1:9000`**, which executes scripts under the same document root.

**PHP configuration:** edit **`C:\DevDock\php\php.ini`** (from the app: **PHP** → **Config**, or **phpMyAdmin** → **Config** — both edit the same `php.ini` used by bundled PHP).

---

## Configuring each service

| Service | Editable from app | On-disk location (typical) |
| --- | --- | --- |
| **NGINX** | Yes — **Config** → UI or code editor | `C:\DevDock\nginx\conf\nginx.conf` |
| **PHP (`php.ini`)** | Yes — **PHP** or **phpMyAdmin** → Config | `C:\DevDock\php\php.ini` |
| **MySQL** | Yes — **Config** | `C:\DevDock\mysql\my.ini` or `my.cnf` (see app) |
| **FTP** | Yes — **Config** | `C:\DevDock\config\ftp.json` |
| **SQL Web** | Yes — **Config** | `C:\DevDock\config\sql-web.json` |
| **Mailpit** | Config button shown as **disabled** (no editable file in UI yet) | — |
| **Local DNS / HTTPS** | **DNS & HTTPS** tab | `C:\DevDock\config\local-dns.json`, cert paths under `C:\DevDock\ssl\` |

Saving a config may **restart** the related service if it is already running (see Rust `maybe_restart_if_running` in `src-tauri/src/lib.rs`).

---

## Official documentation (external)

Use these references when editing raw configs or understanding ports and directives.

| Topic | Documentation |
| --- | --- |
| **Tauri 2** | [https://v2.tauri.app/](https://v2.tauri.app/) |
| **NGINX** | [https://nginx.org/en/docs/](https://nginx.org/en/docs/) |
| **PHP** (INI, language) | [https://www.php.net/manual/en/](https://www.php.net/manual/en/) |
| **MySQL / MariaDB** | [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/) · [https://mariadb.com/kb/en/documentation/](https://mariadb.com/kb/en/documentation/) |
| **Mailpit** | [https://mailpit.axllent.org/docs/](https://mailpit.axllent.org/docs/) |
| **phpMyAdmin** | [https://docs.phpmyadmin.net/en/latest/](https://docs.phpmyadmin.net/en/latest/) |
| **sql-web** (crate) | [https://crates.io/crates/sql-web](https://crates.io/crates/sql-web) |
| **Rust** | [https://doc.rust-lang.org/](https://doc.rust-lang.org/) |

---

## Repository structure

```
DevDock/
├── src/                    # React + Vite frontend (UI, tabs, state)
├── src-tauri/              # Rust crate: Tauri app, service orchestration, IPC commands
│   ├── capabilities/       # Tauri v2 ACL capabilities (permissions for plugins)
│   ├── src/                # Rust modules (orchestrator, paths, services, FTP, DNS, …)
│   └── tauri.conf.json     # Tauri bundle, resources, build hooks
├── services-binares/       # Full service binary tree used in dev / staging
├── services-binares-pruned/# Smaller tree for release bundling (see tauri.conf.json)
├── scripts/                # prune/stage helpers for services
├── templates/              # Default config snippets (e.g. phpMyAdmin)
├── public/                 # Vite static assets
├── package.json            # npm scripts
└── README.md               # This file
```

---

## Development

**Prerequisites:** Node.js, Rust toolchain, Windows (paths and services are Windows-oriented).

```powershell
cd path\to\DevDock
npm install
npm run tauri dev
```

- Frontend dev server: Vite (see `devUrl` in `src-tauri/tauri.conf.json`).
- Rust: `cargo run` via Tauri CLI.

Other useful scripts:

| Command | Description |
| --- | --- |
| `npm run dev` | Vite only (web UI) |
| `npm run build` | Typecheck + production Vite build |
| `npm run prune:services` | Prune services bundle (see `scripts/prune-services.mjs`) |
| `npm run stage:services` | Stage services (see `scripts/stage-services.mjs`) |

**UX note:** In production builds, the app disables the browser-style **right-click context menu** on the webview (`src/main.tsx`) so the app feels more native.

---

## Production build

```powershell
npm run tauri build
```

Artifacts appear under `src-tauri/target/release/` and installer output per Tauri bundle settings (NSIS/WiX on Windows).

The build pipeline runs `prune:services`, `stage:services`, and `npm run build` before compiling Rust (see `beforeBuildCommand` in `tauri.conf.json`).

---

## Debugging when something goes wrong

1. **LogsConsole tab** — Filter by service; lines come from `C:\DevDock\logs\<service>.log`.
2. **On-disk logs** — Open `C:\DevDock\logs\` and read the relevant `.log` file (e.g. `nginx.log`, `php.log`, `mysql.log`).
3. **NGINX errors** — `C:\DevDock\nginx\logs\error.log` (NGINX’s own log directory).
4. **Service won’t start** — Check the red banner for **missing binaries**; ensure `services-binares` synced to `C:\DevDock` (restart app or run bootstrap).
5. **PHP pages don’t run** — Confirm **PHP** service is running and port **9000** is not blocked; check `php.log` and NGINX `error.log`.
6. **Tauri / Rust build errors** — Run `cargo build` in `src-tauri/`; clear `src-tauri/target` if build scripts get stuck.
7. **Frontend-only issues** — `npm run build` to surface TypeScript errors.

---

## Contact

- **Issues & contributions:** use your repository’s issue tracker (e.g. GitHub **Issues**) if this project is published there.
- For **private forks**, document maintainer email or team chat in this section as appropriate.

---

## License

This repository does **not** currently include a `LICENSE` file at the project root. **All rights reserved** unless you add a license. To make the project open source, add a `LICENSE` file (e.g. MIT, Apache-2.0) and update this section accordingly.

Third-party binaries (NGINX, PHP, MySQL, Mailpit, etc.) are subject to **their respective upstream licenses**; redistribute only in compliance with those terms.
