# DevDock — User Guide

DevDock is a local development suite for Windows that helps you run common developer services (web server, PHP, database, mail testing, etc.) from one desktop app.

This guide explains **how to use the installed app** (not how to compile it).

---

## Quick start

- **Open DevDock**
- Go to **List of all the service → Controls**
- Click **Start** on the services you need (recommended order below)
- Click **Open** to open the service in your browser (or open its folder/log where applicable)

### Recommended start order (most common)

- **MySQL** (if you need a database)
- **PHP** (needed for PHP pages through NGINX)
- **NGINX** (web server on `http://localhost/`)
- **Mailpit** (if you want a local mail inbox)
- **phpMyAdmin** (if you want a database UI)

---

## Where your files, configs, and logs are stored

DevDock uses a single runtime folder on your machine:

- **Root folder:** `C:\DevDock`

Common locations:

- **Web root (put your site here):** `C:\DevDock\nginx\html\`
- **NGINX config:** `C:\DevDock\nginx\conf\nginx.conf`
- **PHP config (php.ini):** `C:\DevDock\php\php.ini`
- **App/service logs:** `C:\DevDock\logs\`
- **NGINX own logs:** `C:\DevDock\nginx\logs\`
- **MySQL data folder:** `C:\DevDock\mysql\data\`

If you ever want to “reset” a service’s behavior, the easiest safe place to start is usually the relevant config file and the logs folder.

---

## Running your PHP website / app

### Put your files in the web root

Copy your project’s public files into:

- `C:\DevDock\nginx\html\`

Common entry files:

- `index.php` (recommended if you want PHP)
- `index.html` (static site)

### Start the required services

- Start **PHP** (so PHP can execute)
- Start **NGINX**

Then open:

- `http://localhost/`

### Notes

- If `index.php` exists, it will be used as the default homepage.
- If PHP isn’t running, NGINX can’t execute `.php` files (you’ll see an error page and the NGINX error log will explain why).

---

## Services: what each one is for (and how to use it)

### NGINX

- **Purpose:** Local web server for `http://localhost/`
- **Use it for:** Serving static sites and PHP apps from `C:\DevDock\nginx\html\`
- **Common actions:**
  - **Start/Stop/Restart** from the NGINX card
  - **Open Nginx** opens `http://localhost/`
  - **Config** opens `nginx.conf` editor

### PHP

- **Purpose:** Runs PHP so `.php` pages execute
- **Use it for:** Anything that requires PHP (WordPress-style apps, custom PHP pages, admin tools, etc.)
- **Common actions:**
  - **Start/Stop/Restart** from the PHP card
  - **Config** opens `php.ini` editor
  - **Open PHP Log** opens the PHP log (and may also open the PHP config for convenience)

### MySQL

- **Purpose:** Local database server
- **Use it for:** Projects that need MySQL/MariaDB
- **Common actions:**
  - **Start MySQL** before phpMyAdmin
  - **Open Data Folder** opens the MySQL data directory
  - **Config** opens MySQL config editor (if available for your install)

### phpMyAdmin

- **Purpose:** Web UI to manage MySQL databases (tables, users, queries)
- **Use it for:** Browsing databases, importing/exporting SQL, running queries
- **How to use:**
  - Start **MySQL** first
  - Start **phpMyAdmin**
  - Click **Open phpMyAdmin** → opens `http://127.0.0.1:8080`
  - Use it to connect to the local MySQL service

### Mailpit

- **Purpose:** Local SMTP capture + inbox viewer
- **Use it for:** Testing emails without sending real mail to the internet
- **How to use:**
  - Start **Mailpit**
  - Click **Open Mailpit** → opens `http://127.0.0.1:8025`
  - Point your app’s SMTP settings to **127.0.0.1:1025**

### FTP

- **Purpose:** Simple local FTP server for testing uploads/downloads
- **Use it for:** Apps that need FTP integration tests
- **How to use:**
  - Start **FTP**
  - Use the built-in FTP helper (if available) or connect with an external client
  - **Config** lets you adjust bind address/ports/root directory

### SQL Web

- **Purpose:** Browser-based DB workbench (separate from phpMyAdmin)
- **Use it for:** A lightweight SQL UI that can connect to MySQL/SQLite (depending on your config)
- **How to use:**
  - Start **SQL Web**
  - Click **Open SQL Web**
  - Use **Config** to set connection settings (host/port/connection string)

---

## Tabs: what each tab is for

### List of all the service

This is the main dashboard.

- **Controls:** Start/Stop/Restart services, open them, edit configs
- **Metrics:** CPU and memory overview per running service (useful to spot “what is heavy”)

### SQLite One-Click

- **Purpose:** Quickly create a new `.db` file
- **Typical use:** Create a SQLite database for a project with one click, then manage it with your preferred tools

### HTTP Client

- **Purpose:** Send HTTP requests from inside DevDock
- **Use it for:** Testing local endpoints and APIs quickly (especially useful when browsers block requests due to CORS)

### LogsConsole

- **Purpose:** View recent log output from services
- **Use it for:** Debugging startup failures, port issues, config mistakes, or runtime errors

### Rust Workspace

- **Purpose:** Helpers for Rust projects
- **Use it for:** Discovering projects and running Rust-related workflows supported by the app

### DNS & HTTPS

- **Purpose:** Local development networking helpers
- **Use it for:** Local domain testing, certificates, and HTTPS-related configuration

---

## Changing service configuration (safe workflow)

1. Open the service’s **Config** button (when available).
2. Prefer the **UI Editor** for simple changes (ports, root, index, handler).
3. Use the **Code Editor** only if you know what you’re changing.
4. Save.
5. If a service is already running, restart it so changes take effect.

---

## Troubleshooting (common problems)

### “403 Forbidden” on `http://localhost/`

Usually means there is **no index file** available in the web root.

- Ensure `C:\DevDock\nginx\html\index.php` (or `index.html`) exists
- Check NGINX config has `index index.php index.html ...;`
- Check `C:\DevDock\nginx\logs\error.log` for the exact reason

### PHP page shows an error page / PHP doesn’t execute

- Make sure the **PHP service is Running**
- Check `C:\DevDock\logs\php.log`
- Check `C:\DevDock\nginx\logs\error.log`

### phpMyAdmin can’t connect to MySQL

- Start **MySQL** first, then start **phpMyAdmin**
- If it still fails, check `C:\DevDock\logs\mysql.log` and the phpMyAdmin screen error message

### Something “worked yesterday” but not now

- Restart the affected service(s)
- Check for port conflicts (another app using the same port)
- Review logs in `C:\DevDock\logs\` and `C:\DevDock\nginx\logs\`

---

## Getting help

If you need support, include:

- Which service/tab you were using
- What you clicked (Start/Stop/Config/Open)
- The relevant log files from `C:\DevDock\logs\` (and `C:\DevDock\nginx\logs\error.log` for NGINX issues)

