# Kickstart WordPress Theme

## Technology Stack & Tools Used

- **WordPress** – the core CMS platform (PHP + MySQL).
- **Custom WordPress Theme** (`kickstart-theme`) built with:
  - **HTML & PHP** – for templates, theme structure, and WordPress integration.
  - **CSS** – custom styles are defined in `style.css`. (Optionally Tailwind CSS can be added for utility‑first styling.)
  - **JavaScript** – lightweight `assets/main.js` provides smooth scrolling and basic interactivity for the contact form.
- **PHP Built‑in Server** (or **XAMPP**/Apache) – used for local development (`npm start` runs `php -S localhost:8000`).
- **MySQL / MariaDB** – database backend required by WordPress.
- **phpMyAdmin** – for easy database management (included with XAMPP).
- **npm** – only for the optional Tailwind CSS build pipeline and simple start script.
- **Optional Enhancements**:
  - **Tailwind CSS** – utility‑first CSS framework for rapid UI design.
  - **SEO Meta Tags** – injected via `functions.php` (title‑tag, description, Open‑Graph).
  - **Responsive Design** – mobile‑first layout using CSS flex/grid utilities.
  - **Performance** – cache‑busting versioning, lazy‑load images, and optional caching plugins (e.g., WP Super Cache).

## Project Structure (relevant parts)
```
Kickstart-Digital-web/
├─ wordpress/                # WordPress core files (downloaded from wordpress.org)
│   └─ wp‑content/
│       └─ themes/
│           └─ kickstart‑theme/   # Custom theme
│               ├─ style.css      # Theme header + base CSS
│               ├─ functions.php  # Enqueues assets, registers menu & SEO tags
│               ├─ header.php     # <head>, skip‑link, navigation
│               ├─ footer.php     # wp_footer & closing tags
│               ├─ index.php      # Loads header, template‑parts, footer
│               └─ template‑parts/
│                   ├─ section‑hero.php
│                   ├─ section‑services.php
│                   ├─ section‑why‑us.php
│                   ├─ section‑process.php
│                   ├─ section‑testimonials.php
│                   ├─ section‑cta.php
│                   └─ section‑contact.php
├─ package.json               # Minimal npm script to start PHP server
└─ README.md                  # This file
```

## Quick Start (local development)
1. Install **PHP** (or XAMPP) and **MySQL**.
2. Create a database `kickstart_wp`.
3. Download WordPress (`wordpress` folder) and place the `kickstart‑theme` inside it.
4. Run `npm start` (or `php -S localhost:8000 -t wordpress`) to launch the site.
5. Open `http://localhost:8000` (or `http://localhost/wordpress` with XAMPP) in a browser.
6. Activate the theme via **Appearance → Themes** in the WordPress admin.

---

*Feel free to customize the theme further, add Tailwind CSS, or integrate additional plugins as needed.*
