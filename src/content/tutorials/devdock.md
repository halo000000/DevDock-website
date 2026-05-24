---
title: How to use DevDock
description: "Install DevDock, start the services you need, configure them, and troubleshoot common issues."
videoEmbedUrl: https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ
---

## Install

1. Download the latest installer from the DevDock download page.
2. Run the installer.
3. Launch DevDock from your desktop or Start menu.

## First launch

DevDock keeps your local environment in a single folder so it stays easy to find:

- **Main folder:** `C:\DevDock`

Inside that folder you will find service files, logs, and configuration files.

## Start your local site

### 1. Put your files in the web root

Copy your site files into:

- `C:\DevDock\nginx\html\`

If you have a homepage, name it `index.html` or `index.php`.

### 2. Start the services you need

A common start order:

1. **MySQL** (only if your project needs a database)
2. **PHP** (only if your site uses PHP)
3. **NGINX**
4. Optional: **Mailpit**, **phpMyAdmin**, **FTP**

### 3. Open your site

Click **Open** on the web service in DevDock, or open `http://localhost/` in your browser.

## What each service is for

### NGINX

- **What it does:** Serves your local site at `http://localhost/`.
- **When to run it:** When you want to view your project in a browser.
- **What to know:** Your site files live in `C:\DevDock\nginx\html\`.

### PHP

- **What it does:** Lets `.php` pages run.
- **When to run it:** Only when your project needs PHP.
- **What to know:** If PHP is not running, PHP pages will not work.

### MySQL

- **What it does:** Provides a local database.
- **When to run it:** Only when your project needs MySQL.
- **What to know:** Start MySQL before using phpMyAdmin.

### phpMyAdmin

- **What it does:** Web based database manager for MySQL.
- **When to run it:** When you need to create databases, browse tables, import SQL, or run queries.
- **What to know:** If it cannot connect, start MySQL first.

### Mailpit

- **What it does:** Captures emails locally so you can test mail without sending real messages.
- **When to run it:** When your app sends emails and you want to test locally.
- **What to know:** Configure your app to send SMTP mail to Mailpit while testing.

### FTP

- **What it does:** A local FTP server for testing uploads and integrations.
- **When to run it:** Only if your project needs FTP.

## Configuration guide

### Where configs live

Most configuration files are inside `C:\DevDock`. You can open them from DevDock using each service's **Config** button.

Typical locations include:

- Web root: `C:\DevDock\nginx\html\`
- Logs: `C:\DevDock\logs\`
- Service specific configs inside each service folder

### Safe workflow for changes

1. Open the service **Config**.
2. Make one change at a time.
3. Save.
4. Restart the service if DevDock prompts you, or if behavior does not change.
5. If something breaks, undo the last change and restart again.

## Usage examples

### Example: static website

1. Copy your site into `C:\DevDock\nginx\html\`.
2. Start **NGINX**.
3. Open `http://localhost/`.

### Example: PHP website

1. Copy your site into `C:\DevDock\nginx\html\`.
2. Start **PHP**.
3. Start **NGINX**.
4. Open `http://localhost/`.

### Example: app with database

1. Start **MySQL**.
2. Start your web service.
3. Optional: start **phpMyAdmin** to manage the database.

## Troubleshooting

### My site does not load

- Confirm the web service is running.
- Confirm you have an `index.html` or `index.php` in the web root.
- Open logs for the web service and look for the first error.

### A service will not start

- Look for a message in DevDock about what failed.
- Check logs for that service.
- Common causes include a port conflict or a config change that introduced an error.

### phpMyAdmin cannot connect

- Start **MySQL** first.
- Restart phpMyAdmin after MySQL is running.

## Getting help

When asking for support, include:

- Which service you started
- What you expected to happen
- What you saw instead
- A screenshot of the error and the relevant log output
