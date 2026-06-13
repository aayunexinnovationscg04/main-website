# AAYUNEX Innovations - Website Documentation
**Product:** Fuel Guard X | AI-Powered Fuel Intelligence Platform
**Domain:** https://aayunexinnovations.com
**Hosting:** Hostinger Shared Hosting
**Type:** Static HTML/CSS/JS (no framework, no backend)
**Built by:** Harish Kumar Dwivedi
**Last Updated:** 2026-06-13

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [Pages - Sections & Content](#3-pages---sections--content)
4. [Image Assets](#4-image-assets)
5. [CSS Architecture](#5-css-architecture)
6. [JavaScript](#6-javascript)
7. [SEO Implementation](#7-seo-implementation)
8. [Security Implementation](#8-security-implementation)
9. [Google Search Console](#9-google-search-console)
10. [Hostinger Deployment](#10-hostinger-deployment)
11. [All Changes Made This Session](#11-all-changes-made-this-session)

---

## 1. Project Overview

AAYUNEX Innovations OPC Pvt Ltd is a deep-tech startup based in Raipur, Chhattisgarh, India. Their flagship product is **Fuel Guard X** - an end-to-end AI + IoT fuel monitoring and theft detection system for commercial vehicle fleets.

**Company addresses:**
- OPJU Innovation Center, Raigarh, Chhattisgarh
- Recognized by: DPIIT, Startup India, MSME, CSVTU FORTE

**Awards:** 5+ national awards including IIT Guwahati (1st Prize 2023), Shark Tank BITD 2.0 (1st Runner Up 2025), IIM Sambalpur IDE Bootcamp (3rd Prize 2024), IIC Regional Meet AMIT University Jaipur (3rd Prize 2025), OPJU Technorollix 2025 (1st Prize), OPJU National Innovation Fest 2.0 (1st Prize 2023), Techno Aim Biation OPJU 2026 (Best Startup Award), IGNITION GRANT from CSVTU FORTE 2026.

**Contact:** contact@aayunexinnovations.com

---

## 2. File Structure

```
main_website/
|-- index.html              # Homepage
|-- product.html            # Product (Fuel Guard X hardware + software)
|-- features.html           # Detailed feature breakdown
|-- achievements.html       # Awards, media coverage
|-- about.html              # Team, mission, partners
|-- contact.html            # Contact form + info
|-- dashboard.html          # Live demo dashboard mockup
|-- privacy.html            # Privacy Policy
|-- 404.html                # Custom 404 page
|-- 403.html                # Custom 403 page
|-- 500.html                # Custom 500 page
|-- sitemap.xml             # XML sitemap (all 8 pages)
|-- robots.txt              # Crawler rules
|-- .htaccess               # Apache config: redirects, security headers, CSP
|
|-- css/
|   |-- main.css            # Design system: CSS variables, reset, navbar, footer, utilities
|   |-- home.css            # Hero, Deep Tech, proof numbers, problem, features preview
|   |-- product.css         # Product hero, hardware specs, ecosystem, how-it-works
|   |-- features.css        # Feature detail cards, comparison table
|   |-- achievements.css    # Awards grid, media coverage cards
|   |-- about.css           # Team grid, mission, partners
|   |-- contact.css         # Contact form panel, info cards
|   |-- dashboard.css       # Live dashboard demo styling
|   |-- privacy.css         # Privacy policy layout
|
|-- js/
|   |-- main.js             # Shared: navbar, theme, scroll reveal, counters, smooth scroll
|   |-- home.js             # Homepage-specific: chart animation, floating badges
|   |-- contact.js          # Contact form: Formspree submission, validation, feedback
|
|-- assets/
|   |-- logo/
|   |   |-- removed_bg_logo.png          # Main logo (transparent bg) - used in navbar + OG image
|   |   |-- Aayunex Logo .png            # Original logo with background
|   |
|   |-- wins/               # Award certificate images
|   |   |-- IDE BOOTCAMP IIM SAMBALPUR 2024 3rd Prize Organised by AICTE & MIC.jpeg
|   |   |-- SHARK TANK BITD 2.0 1st Runner Up 3100 Rs.Cash Prize 2025.jpeg
|   |   |-- OP Jindal University Raigarh Technorollix 2025 NexGen startup & Tech Lab 1st Prize 19,000 Rs.Cash Prize.jpeg
|   |   |-- IIC REGIONAL MEET AMIT UNIVERSITY JAIPUR 2025 3rd Prize Organised by AICTE & MoE.jpeg
|   |   |-- IGNITION GRANT FROM CSVTU FORTE 2026.jpeg
|   |   |-- ATL MARATHON 22-23.jpeg
|   |   |-- IDE BOOTCAMP IIT GUWAHATI 1ST PRIZE 2023 Organised by AICTE & MIC MoE.jpeg
|   |   |-- Techno aim biation op Jindal University Raigarh 2026 best startup Award & App making & ideation Cash Prize.jpeg
|   |   |-- National Innovation Fest 2.0 op Jindal University 1st prize 15,000 rs cash prize 2023.jpeg
|   |
|   |-- newspaper/          # Media coverage screenshots
|   |   |-- WhatsApp Image 2026-06-05 at 1.29.02 PM.jpeg
|   |   |-- WhatsApp Image 2026-06-05 at 1.29.03 PM.jpeg
|   |   |-- WhatsApp Image 2026-06-05 at 1.29.03 PM (1).jpeg
|   |   |-- WhatsApp Image 2026-06-05 at 1.29.25 PM.jpeg
|   |   |-- WhatsApp Image 2026-06-05 at 1.29.26 PM.jpeg
|   |   |-- Screenshot_20260605-124256.png
|   |   |-- Screenshot_20260605-124321.png
|   |   |-- Screenshot_20260605-124325.png
|   |   |-- Screenshot_20260605-124330.png
|   |
|   |-- partners/           # Partner/institution logos
|   |   |-- Startup_Logo_Colour_PNG.png
|   |   |-- msme-micro-small-medium-enterprises-logo-png_seeklogo-259373.png
|   |   |-- CSVTU FORTE LOGO.jpeg
|   |   |-- OIC-Letterhead Logo.png
|   |   |-- DST LOGO.jpeg
|   |   |-- dpiit logo.jpeg
|   |
|   |-- team/               # Founder photos
|   |   |-- aayush_pic.jpeg       # Aayush (co-founder)
|   |   |-- gitesh pic.png        # Gitesh (co-founder)
|   |   |-- vasu_pic.png          # Vasu (co-founder)
|   |   |-- device pic.jpeg       # Device photo (also in assets root)
|   |
|   |-- device pic.jpeg     # Fuel Guard X hardware device photo
```

---

## 3. Pages - Sections & Content

### index.html - Homepage
**Title:** Fuel Guard X | AI-Powered Fuel Intelligence Platform
**Description:** Real-time fuel monitoring, theft detection, and fleet intelligence platform for commercial vehicles. AI-powered fuel security by AAYUNEX Innovations.

**Sections (top to bottom):**
1. **Navbar** - Logo, links (Home / Product / Features / Achievements / About), theme switcher (dark/light), "Contact Us" CTA button, hamburger mobile menu
2. **Hero Section** (`#hero`) - Two-column: left = headline "Stop Fuel Theft. Gain Full Control." + stats (5+ Awards / 3 Govt Recognitions / AI Deep Tech Core) + CTAs (Request Demo / View Product); right = animated dashboard mockup with topbar, sidebar icons, KPI tiles (Fuel Level 78.4L, Efficiency 4.2k/L, Alerts 0), bar chart, floating badges ("System Active", "Theft Blocked")
3. **Trusted By** (`#trusted-by`) - Logo strip: Startup India, MSME, CSVTU FORTE, OPJU Innovation Center, DPIIT
4. **Proof Numbers** (`#numbers`) - 4 stats: 5+ National Awards, 3 Govt Recognitions, 100% Hardware-Software Integration, Real-Time Telemetry
5. **Problem Section** (`#problem`) - "The Invisible Leak in Your Operations" - 3 problem items: Undetected Fuel Theft, Short-Fuelling Fraud, No Visibility into Loss
6. **Deep Tech Core - AI + IoT** (`#deep-tech`) - Two pillars side by side with X connector: AI Pillar (brain-circuit icon, anomaly detection / pattern learning / theft scoring / predictive alerts, stack: TensorFlow/Edge ML/Python/Neural Nets) + IoT Pillar (cpu icon, +/-0.5% sensors / GPS fusion / tamper detection / 4G MQTT, stack: MQTT/4G LTE/ARM MCU/AES-256). Below: Data Pipeline bar (Sensor Reads -> Edge Process -> AI Analysis -> Instant Alert -> Dashboard)
7. **Features Preview** - 3-card grid: Real-Time Monitoring, AI Anomaly Detection, Instant Alerts - each linking to features.html
8. **Solution CTA** - "Ready to Secure Your Fleet?" banner linking to contact and product pages
9. **Footer** - Brand column (logo + description + social links: LinkedIn/Instagram/Facebook), 3 link columns (Product / Company / Legal), copyright

**JSON-LD schemas:** Organization, WebSite + SearchAction, BreadcrumbList

---

### product.html - Product Page
**Title:** Fuel Guard X - Hardware & Software Platform | AAYUNEX Innovations
**Sections:**
1. **Navbar** (shared)
2. **Product Hero** - Two-column: left = "Fuel Guard X - Built Different" headline + key callouts; right = device image (`assets/device pic.jpeg`)
3. **Hardware Specs** - Specs table / cards: Ultrasonic Sensor (+/-0.5% accuracy), GPS Module (real-time tracking), ARM MCU (edge processing), 4G LTE (MQTT telemetry), AES-256 encryption, IP67 rated enclosure
4. **Software Platform** - Features of the cloud dashboard: live telemetry, AI anomaly engine, alert system, ERP integration
5. **Ecosystem Cards** - Partner integrations / ecosystem components
6. **How It Works** - Step-by-step flow: Sensor reads fuel -> Edge processor computes -> 4G transmits -> Cloud AI analyzes -> Alert sent -> Dashboard updated
7. **Footer** (shared)

**JSON-LD schemas:** Organization, WebSite + SearchAction, BreadcrumbList, FAQPage (4 Q&As about Fuel Guard X)

---

### features.html - Features Page
**Title:** Features - AI Fuel Monitoring & Fleet Intelligence | Fuel Guard X
**Sections:**
1. **Navbar** (shared)
2. **Features Hero** - Headline + subtext
3. **Feature Detail Cards** - Detailed cards for each feature: Real-Time Fuel Monitoring, AI Anomaly Detection, GPS + Location Intelligence, Instant Theft Alerts, ERP/Fleet Integration, Historical Analytics, Multi-Vehicle Dashboard, Tamper Detection
4. **Comparison Table** - Fuel Guard X vs Traditional Methods vs Competitors
5. **Footer** (shared)

**JSON-LD schemas:** Organization, WebSite + SearchAction, BreadcrumbList, FAQPage (3 Q&As about features)

---

### achievements.html - Achievements Page
**Title:** Awards & Recognition | AAYUNEX Innovations - Fuel Guard X
**Sections:**
1. **Navbar** (shared)
2. **Achievements Hero** - Headline "5+ National Awards & Counting"
3. **Awards Grid** - Cards for each award (image + title + description):
   - IDE Bootcamp IIT Guwahati 2023 - 1st Prize (AICTE & MIC MoE)
   - National Innovation Fest 2.0 OPJU 2023 - 1st Prize (Rs. 15,000)
   - ATL Marathon 22-23
   - IDE Bootcamp IIM Sambalpur 2024 - 3rd Prize (AICTE & MIC)
   - Shark Tank BITD 2.0 2025 - 1st Runner Up (Rs. 3,100 cash prize)
   - OPJU Technorollix 2025 NexGen - 1st Prize (Rs. 19,000 cash prize)
   - IIC Regional Meet AMIT University Jaipur 2025 - 3rd Prize (AICTE & MoE)
   - Techno Aim Biation OPJU 2026 - Best Startup Award + App Making & Ideation Cash Prize
   - IGNITION GRANT from CSVTU FORTE 2026
4. **Media Coverage** - Cards with newspaper/media screenshots (9 images from assets/newspaper/)
5. **Footer** (shared)

**JSON-LD schemas:** Organization (with award array), WebSite + SearchAction, BreadcrumbList

---

### about.html - About Page
**Title:** About AAYUNEX Innovations | Team, Mission & Deep Tech Vision
**Sections:**
1. **Navbar** (shared)
2. **About Hero** - Mission statement headline
3. **Mission & Vision** - Cards: Mission (eliminate fuel theft), Vision (10,000 vehicles monitored), Values (Innovation / Integrity / Impact)
4. **Problem Cards** (`about-problem-card`) - The problems driving the company
5. **Team Grid** - 3 founder cards:
   - **Aayush** - Co-Founder (image: `assets/team/aayush_pic.jpeg`)
   - **Gitesh** - Co-Founder (image: `assets/team/gitesh pic.png`)
   - **Vasu** - Co-Founder (image: `assets/team/vasu_pic.png`)
6. **Partners/Institutions** - Logo grid: Startup India (`Startup_Logo_Colour_PNG.png`), MSME (`msme-micro-small-medium-enterprises-logo-png_seeklogo-259373.png`), CSVTU FORTE (`CSVTU FORTE LOGO.jpeg`), OPJU Innovation Center (`OIC-Letterhead Logo.png`), DPIIT (`dpiit logo.jpeg`), DST (`DST LOGO.jpeg`)
7. **Footer** (shared)

**JSON-LD schemas:** Organization (with founders array - 3 Person entries), WebSite + SearchAction, BreadcrumbList

---

### contact.html - Contact Page
**Title:** Contact AAYUNEX Innovations | Request a Demo or Partnership
**Sections:**
1. **Navbar** (shared)
2. **Contact Hero** - "Get In Touch" headline
3. **Two-column layout:**
   - Left: **Contact Form Panel** (`contact-form-panel`) - Name / Email / Company / Message fields, submit via Formspree
   - Right: **Contact Info Cards** (`contact-info-card`) - Email (contact@aayunexinnovations.com), Phone, Address (OPJU Innovation Center, Raipur), Social links
4. **Map / Location** (optional section)
5. **Footer** (shared)

**JSON-LD schemas:** Organization, LocalBusiness (with contactPoint), WebSite + SearchAction, BreadcrumbList

---

### dashboard.html - Dashboard Demo Page
**Title:** Live Dashboard Demo | Fuel Guard X Fleet Intelligence
**Sections:**
1. **Navbar** (shared)
2. **Full-screen interactive dashboard mockup:**
   - Sidebar nav with icon buttons
   - Header with live status
   - Fleet map view with vehicle dots (`dfm-vehicle-dot`)
   - KPI tiles: Fuel Level, Efficiency, Active Alerts, Vehicles Online
   - Chart area: fuel consumption over time
   - Alert log panel
   - Vehicle list table
3. **Footer** (shared)

**Fonts:** Google Fonts - Plus Jakarta Sans + Inter (preconnect + stylesheet added)
**JSON-LD schemas:** Organization, WebSite + SearchAction, BreadcrumbList

---

### privacy.html - Privacy Policy
**Title:** Privacy Policy | AAYUNEX Innovations
**Content:** Standard privacy policy covering data collection, usage, cookies, third-party services, user rights, contact for data requests.
**JSON-LD schemas:** Organization, WebSite + SearchAction, BreadcrumbList

---

### 404.html / 403.html / 500.html - Error Pages
Custom branded error pages matching site design. Linked from .htaccess.

---

## 4. Image Assets

| File | Used In | Purpose |
|------|---------|---------|
| `assets/logo/removed_bg_logo.png` | All pages navbar, OG image | Main brand logo (transparent) |
| `assets/logo/Aayunex Logo .png` | (reference) | Original logo with background |
| `assets/device pic.jpeg` | product.html | Fuel Guard X hardware device photo |
| `assets/team/aayush_pic.jpeg` | about.html | Aayush co-founder headshot |
| `assets/team/gitesh pic.png` | about.html | Gitesh co-founder headshot |
| `assets/team/vasu_pic.png` | about.html | Vasu co-founder headshot |
| `assets/team/device pic.jpeg` | (duplicate) | Same device photo |
| `assets/partners/Startup_Logo_Colour_PNG.png` | index.html, about.html | Startup India logo |
| `assets/partners/msme-micro-small-medium-enterprises-logo-png_seeklogo-259373.png` | index.html, about.html | MSME logo |
| `assets/partners/CSVTU FORTE LOGO.jpeg` | index.html, about.html | CSVTU FORTE incubator logo |
| `assets/partners/OIC-Letterhead Logo.png` | index.html, about.html | OPJU Innovation Center logo |
| `assets/partners/dpiit logo.jpeg` | index.html, about.html | DPIIT (Dept. for Promotion of Industry) logo |
| `assets/partners/DST LOGO.jpeg` | about.html | Department of Science & Technology logo |
| `assets/wins/*.jpeg` | achievements.html | 9 award certificate images |
| `assets/newspaper/*.jpeg / *.png` | achievements.html | 9 media coverage screenshots |

---

## 5. CSS Architecture

### Design System (`css/main.css`)
CSS custom properties (variables) for complete theme switching:

**Color Tokens:**
- `--orange` / `--orange-soft` / `--orange-light` / `--orange-glow` - primary brand orange (#F57320)
- `--blue` / `--blue-soft` / `--blue-glow` - secondary brand blue (#2B5EE8)
- `--color-success` (#22C55E), `--color-warning` (#F59E0B), `--color-error` (#EF4444)

**Dark Mode Background Scale:**
- `--bg-primary: #0F1824` (page background)
- `--bg-secondary: #141F2E` (section alt background)
- `--bg-card: #1A2840` (cards)
- `--bg-card-hover: #1F304A`
- `--bg-elevated: #243854` (inputs, elevated surfaces)

**Light Mode:** All variables remapped to light equivalents under `[data-theme="light"]`

**Typography:**
- Heading font: Plus Jakarta Sans (500/600/700/800)
- Body font: Inter (300/400/500/600/700)
- Loaded via Google Fonts CDN

**Utilities:** Container (max 1280px), section padding (6rem), border radius scale, shadow scale, transition scale, z-index scale, reveal animation classes

---

## 6. JavaScript

### `js/main.js` - Shared (loaded on all pages)
- `initThemeSwitcher()` - Dark/light toggle, persists to localStorage
- `initNavbar()` - Scroll compact effect, mobile hamburger open/close with backdrop and body scroll-lock
- `initScrollReveal()` - IntersectionObserver for `.reveal` / `.reveal-left` / `.reveal-right` / `.reveal-scale` elements
- `initScrollProgress()` - Thin orange-to-blue progress bar at top of page
- `initSmoothScroll()` - Smooth scroll for all `a[href^="#"]` anchor links
- `initActiveNavLink()` - Highlights current page nav link
- `initButtonRipple()` - Ripple click effect on all `.btn` elements
- `animateCounters()` - Animated number counting for `[data-count]` elements

### `js/home.js` - Homepage only
- Animated bar chart in hero mockup
- Floating badge animations

### `js/contact.js` - Contact page only
- Form field validation
- Formspree API submission (async fetch)
- Success/error state feedback

---

## 7. SEO Implementation

### Meta Tags (all pages)
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Unique `<title>` per page
- Unique `<meta name="description">` per page (removed duplicates)
- `<meta name="keywords">` (broad + brand keywords)
- `<meta name="author" content="AAYUNEX Innovations OPC Pvt Ltd">`
- `<meta name="robots" content="index, follow">`
- `<link rel="canonical">` pointing to exact URL per page

### Open Graph (Social Sharing)
Every page has:
- `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:locale` (en_IN)
- `og:image` / `og:image:width` / `og:image:height` / `og:image:alt`

### Twitter Card
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`

### Geo Tags (index.html)
- `geo.region: IN-CT` (Chhattisgarh)
- `geo.placename: Raipur`
- `geo.position: 21.2514;81.6296`
- `ICBM: 21.2514, 81.6296`

### Structured Data (JSON-LD)

| Schema Type | Pages |
|-------------|-------|
| `Organization` | All pages (name, url, logo, sameAs social links, address, foundingLocation) |
| `Organization` with `founders` | about.html (3 Person entries: Aayush, Gitesh, Vasu) |
| `Organization` with `award` | achievements.html (award array with 5+ entries) |
| `Organization` with `contactPoint` | contact.html |
| `WebSite` + `SearchAction` | All pages |
| `BreadcrumbList` | All pages (2-level: Home > Page Name) |
| `FAQPage` | product.html (4 Q&As), features.html (3 Q&As) |
| `LocalBusiness` | contact.html (address, phone, email, opening hours) |

### Sitemap (`sitemap.xml`)
All 8 pages listed with `<loc>`, `<lastmod>` (2026-06-13), `<changefreq>`, `<priority>`:
- Homepage: priority 1.0
- Product: 0.9
- Features: 0.8
- Contact: 0.8
- Achievements / About: 0.7
- Dashboard: 0.6
- Privacy: 0.3

### Performance / Core Web Vitals
- `<link rel="preload">` for main CSS files
- `<link rel="preconnect">` for Google Fonts (all pages)
- `loading="lazy"` on all partner/team/award images
- `width` and `height` on all images (prevents CLS)
- Google Fonts: only needed weights loaded (500/600/700/800 for headings, 300/400/500/600/700 for body)
- Lucide icons: loaded from CDN with `defer`

---

## 8. Security Implementation

### `.htaccess` Configuration
Apache config for Hostinger shared hosting:

**HTTPS redirect:** All HTTP traffic redirected to HTTPS via `RewriteRule`.

**Security Headers** (using `Header always set`):
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-XSS-Protection: 1; mode=block` - Legacy XSS filter
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (HSTS)

**Content Security Policy (CSP):**
```
default-src 'self';
script-src 'self' 'unsafe-inline' https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' https://formspree.io https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
frame-ancestors 'self';
base-uri 'self';
form-action 'self' https://formspree.io;
```
- Removed `unsafe-eval` (no dynamic code evaluation needed)
- Removed `blob:` (not needed)
- All sources scoped to known domains only

**Custom Error Pages:**
- `ErrorDocument 404 /404.html`
- `ErrorDocument 403 /403.html`
- `ErrorDocument 500 /500.html`

**GZIP compression** enabled via `mod_deflate` for HTML/CSS/JS/fonts.
**Cache-Control headers** set per file type (CSS/JS: 1 year, images: 6 months, HTML: 1 day).

---

## 9. Google Search Console

**Status:** Website submitted and verified on Google Search Console.

**What was done:**
1. `sitemap.xml` submitted to Google Search Console at: `https://aayunexinnovations.com/sitemap.xml`
2. All 8 URLs indexed and tracked
3. GA4 tracking ID active: `G-K6VLQJJ01R` (on all pages via Google Tag Manager script)
4. Canonical URLs set on every page to prevent duplicate content issues
5. `robots.txt` allows all crawlers to index all pages
6. JSON-LD structured data submitted - eligible for rich results in Google Search:
   - FAQ rich results (product + features pages)
   - Organization Knowledge Panel (logo, sameAs social profiles)
   - Local Business listing (contact page)
   - Breadcrumb trails in search results (all pages)
7. `og:image` set as 1200x630 for proper social previews when shared on LinkedIn, WhatsApp, Twitter

**Next steps for GSC:**
- Monitor Core Web Vitals report (aim for all green LCP/FID/CLS)
- Check Coverage report for any crawl errors
- Request indexing for any newly added pages
- Monitor Search Performance for keyword rankings (target: "fuel theft detection India", "fuel monitoring system fleet", "AAYUNEX Innovations")

---

## 10. Hostinger Deployment

**Hosting type:** Shared hosting (Hostinger hPanel)
**Domain:** aayunexinnovations.com
**Document root:** public_html/

**Deployment process:**
1. Files are maintained in Git repository: `https://github.com/aayunexinnovationscg04/main-website`
2. Files uploaded to Hostinger public_html via:
   - FTP/SFTP (FileZilla or hPanel File Manager), or
   - Git deployment (if configured in hPanel)
3. `.htaccess` is active and handles:
   - HTTPS redirect (no mixed content)
   - Security headers
   - CSP
   - GZIP compression
   - Cache-Control
   - Custom error pages

**Things verified for Hostinger production:**
- No broken internal links (all href values checked)
- All image paths are relative (work from any directory)
- Email corrected to `contact@aayunexinnovations.com` across all pages
- `mailto:` links do NOT have `target="_blank"` (prevents new tab for email clients)
- No JavaScript errors that would break functionality
- Google Fonts loaded via CDN (no local hosting needed)
- Lucide icons loaded via unpkg CDN with `defer`
- Formspree contact form works on static hosting (no server-side code required)
- `dashboard.html` had Google Fonts preconnect added (was missing, causing font flash)
- Duplicate `<meta name="description">` removed from all pages
- Duplicate security headers in `.htaccess` removed

---

## 11. All Changes Made This Session

### Dark Mode Fixes
All hardcoded `#fff` / `#f5f5f5` / `#f8f9fa` / `#f8f8f8` backgrounds replaced with CSS variables:

| File | Element | Old Value | New Value |
|------|---------|-----------|-----------|
| `css/main.css` | `.section-light .feature-card` | `background: #fff` | `background: var(--bg-card)` |
| `css/main.css` | `.section-light .form-input` | `background-color: #fff` | `background-color: var(--bg-elevated)` |
| `css/about.css` | `.about-problem-card` | `background-color: #fff` | `background: var(--bg-card)` |
| `css/achievements.css` | `.ach-card-image` | `background-color: #f5f5f5` | `background-color: var(--bg-elevated)` |
| `css/achievements.css` | `.media-card` | `background-color: #fff` | `background-color: var(--bg-card)` |
| `css/achievements.css` | `.media-card-image` | `background-color: #f8f9fa` | `background-color: var(--bg-elevated)` |
| `css/contact.css` | `.contact-form-panel` | `background-color: #fff` | `background-color: var(--bg-card)` |
| `css/contact.css` | `.contact-info-card` | `background-color: #fff` | `background-color: var(--bg-card)` |
| `css/contact.css` | form inputs | `background-color: #f8f8f8` | `background-color: var(--bg-elevated)` |
| `css/contact.css` | form focus | `background-color: #fff` | `background-color: var(--bg-card)` |
| `css/features.css` | `.feature-detail-card` | `background-color: #fff` | `background-color: var(--bg-card)` |
| `css/product.css` | `.ecosystem-card` | `background-color: #fff` | `background-color: var(--bg-card)` |
| `css/home.css` | `.hero` | `background: #050A14` | `background: var(--bg-primary)` |

### Dark Mode Color Lift (was too dark)
Dark theme background tokens raised from near-black to navy-slate:

| Variable | Before | After |
|----------|--------|-------|
| `--bg-primary` | `#050A14` | `#0F1824` |
| `--bg-secondary` | `#070E1C` | `#141F2E` |
| `--bg-card` | `#0A1422` | `#1A2840` |
| `--bg-elevated` | `#132233` | `#243854` |

Border opacities also slightly increased for better visibility in dark mode.

### Mobile Hero Order Fix
Problem: Dashboard mockup was showing ABOVE the company intro text on mobile.
Cause: `order: -1` on `.hero-visual` at 1024px breakpoint.
Fix: Removed `order: -1` from `.hero-visual` (home.css) and `.product-hero-visual` (product.css).

### Mobile Footer Layout Fix
Problem: Footer columns were stacking individually (full-width each) on mobile.
Fix: CSS Grid layout - brand spans full width (`grid-column: 1 / -1`), 3 link columns sit side by side (`repeat(3, 1fr)`) on mobile.
- At 480px: brand area switches to single column layout
- Footer social icons + description properly arranged within brand column

### Mobile Sidebar "Always Open" Bug Fix
Problem: Mobile nav sidebar appeared permanently open.
Cause: `.dt-pipe-step span { white-space: nowrap }` inside `.dt-pipeline` (non-wrapping flex row with 9 items) caused the page to be wider than the viewport. The off-screen nav sidebar (position: fixed; right: 0; transform: translateX(100%)) was visible when users scrolled right.
Fix (3 parts):
1. Changed `white-space: nowrap` to `white-space: normal; word-break: break-word` on `.dt-pipe-step span`
2. Added `flex-wrap: wrap`, hidden arrows, 3-per-row steps at **1024px** breakpoint (was only at 768px)
3. Added `overflow-x: hidden` to `html` element (was only on `body`)

### Deep Tech Core Section Added (index.html + home.css)
New section between Problem and Features Preview sections:

**HTML structure:**
- Section: `#deep-tech.deep-tech-section`
- Circuit-grid background via CSS `::before` pseudo-element
- Two pillars in CSS Grid (1fr 48px 1fr):
  - AI Pillar: brain-circuit icon, "Active" badge, 4 capability items, tech stack chips
  - X Connector: gradient lines + x node
  - IoT Pillar: cpu icon, "Live" badge, 4 capability items, tech stack chips
- Data Pipeline bar (5 steps + 4 arrows, wraps on mobile)

**CSS added to home.css:** ~250 lines including circuit-grid background, pillar cards, connector, badges, capability lists, tech stack chips, pipeline steps, responsive breakpoints.

### SEO Additions
| Page | Schema Added |
|------|-------------|
| All pages | `BreadcrumbList` JSON-LD |
| All pages | `WebSite` + `SearchAction` JSON-LD |
| about.html | `Organization.founders` (3 Person entries) |
| achievements.html | `Organization.award` (array of 5+ awards) |
| product.html | `FAQPage` (4 Q&As) |
| features.html | `FAQPage` (3 Q&As) |
| contact.html | `LocalBusiness` schema + `Organization.contactPoint` |

Other SEO fixes:
- Duplicate `<meta name="description">` removed from all 8 pages
- Wrong email `contact@aayunex.com` corrected to `contact@aayunexinnovations.com` across all files
- `target="_blank"` removed from all `mailto:` links
- Partner logo images given explicit `width`/`height`/`loading="lazy"` (prevents CLS)
- `dashboard.html` given Google Fonts preconnect + stylesheet (was missing, caused FOUT)

### Security Fixes (.htaccess)
- Duplicate security headers removed (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection appeared twice)
- All `Header set` changed to `Header always set` (ensures headers sent on error responses too)
- CSP rewritten: removed `unsafe-eval` and `blob:`, scoped to known domains only

### Code Quality
- All em dashes (`-`) replaced with hyphens (`-`) in all CSS, HTML, and JS files
- Status colors hardcoded as hex replaced with CSS variables (`var(--color-success)`, `var(--color-warning)`)
- Team grid and partners grid given proper mobile breakpoints (2-col to 540px, then 1-col)

### Git Commits This Session
| Commit | Message |
|--------|---------|
| `bd1f8dc` | revamp website |
| `d74817b` | seo, security and code quality improvements |
| `889449e` | add deep tech core section (AI + IoT) to homepage |
| `3d9c0f9` | fix mobile layout: prevent horizontal overflow from deep tech pipeline |
| (current) | replace em dashes with hyphens sitewide |

---

*Documentation prepared 2026-06-13. Contact: contact@aayunexinnovations.com*
