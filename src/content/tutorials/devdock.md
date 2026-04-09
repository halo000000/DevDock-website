---
title: How to use DevDock
description: "Install DevDock, sync services to C:\\DevDock, start NGINX and PHP, and use the main tabs—based on the project documentation."
videoEmbedUrl: https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ
---

## Install and first launch

Download the latest release from GitHub and run the Windows installer produced by the Tauri build (NSIS/WiX, depending on your bundle settings).

On first launch, DevDock ensures **`C:\DevDock`** exists and syncs bundled service binaries from the app into that runtime folder.

## Main tabs

The shell is organized around a few primary areas (see the in-app **Dashboard**):

### Services dashboard

Start, stop, and restart **NGINX**, **PHP**, **MySQL**, **Mailpit**, **phpMyAdmin**, **FTP**, and **sql-web** from one place. Open URLs, folders, and the config editor where supported—including **Controls** and **Metrics** sub-views.

### SQLite One-Click

Create a `.db` file under a project path you choose, with quick access to phpMyAdmin for management.

### HTTP Client

Send HTTP requests via the Rust backend (**reqwest**) so you can hit local APIs **without browser CORS** getting in the way.

### LogsConsole

Stream and filter log lines per service; logs also land on disk under `C:\DevDock\logs\`.

### Rust Workspace

Point at a root folder to discover and work with Rust/Cargo projects.

### DNS & HTTPS

Local DNS and HTTPS-related helpers (certificates, NGINX includes, Hickory DNS, etc.).

## Put your site online locally

Place **`index.php`**, **`index.html`**, and assets under **`C:\DevDock\nginx\html\`**.

Start **NGINX** and the **PHP** worker from the services list. Open **`http://localhost/`** — static files are served by NGINX; **`*.php`** is proxied to the PHP built-in server on **`127.0.0.1:9000`**.

## Configure services

Use each service’s **Config** action in the app to edit **`nginx.conf`**, **`php.ini`**, MySQL options, **`ftp.json`**, **`sql-web.json`**, and DNS/HTTPS JSON under **`C:\DevDock\config\`**. Saving may restart the service if it is already running.

## When something breaks

Use **LogsConsole** first, then inspect **`C:\DevDock\logs\`** and NGINX’s **`error.log`** under the NGINX log directory. If a service will not start, check the in-app banner for **missing binaries** and confirm the **`services-binares`** tree synced to **`C:\DevDock`**.
