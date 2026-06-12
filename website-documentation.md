# AAYUNEX Innovations Website Documentation

## Overview
This document summarizes what was updated and improved across the AAYUNEX Innovations website, including design fixes, theme behavior, SEO enhancements, and page-level content structure.

## What Was Done

### UI/UX & Theme
- Set the default website theme to the blue/light theme on all pages.
- Updated active theme button states so the `Light` theme appears selected by default in both desktop and mobile theme selectors.
- Fixed About page footer social icon alignment by centering `.footer-social` in `css/main.css`.
- Added a console credit message in `js/main.js`: `Designed and developed by Harish Kumar Dwivedi`.

### SEO & Metadata Improvements
- Updated page-level metadata for all HTML pages:
  - `title`
  - `description`
  - `keywords`
  - `author`
  - `robots`
  - `canonical`
  - Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`)
  - Twitter card metadata (`twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`)
- Added structured organization schema markup (`application/ld+json`) on all pages with brand, logo, location, and social links.
- Included geographic metadata on all pages:
  - `geo.region=IN-CT`
  - `geo.placename=Raipur`
  - `geo.position=21.2514;81.6296`
  - `ICBM=21.2514, 81.6296`
- Reinforced local startup and incubation keywords for Raipur, OPJU Innovation Center, CSVTU FORTE, and fuel theft/fleet monitoring.
- Redesigned meta descriptions and titles to clearly target the product, startup credentials, and enterprise fuel intelligence market.

## Pages and Section Breakdown

### `index.html`
- Title: Fuel Guard X - AI-Powered Fuel Intelligence & Theft Detection System
- Sections: 6
- Images: 10
- Key sections:
  - `#hero`: Homepage hero with headline, subtext, CTA buttons, and a logo.
  - `#trusted-by`: Partner/trusted-by logo section showing Startup India, MSME, CSVTU FORTE, OPJU, DPIIT.
  - `#problem`: Industry problem section describing fuel theft, inefficient audits, and visibility gaps.
  - `#solution`: Solution section presenting Fuel Guard X capabilities and enterprise verification value.
  - `#features-preview`: Feature preview with summary of AI analytics, smart alerts, and ERP-style fleet intelligence.
  - `#achievements-preview`: Achievement preview showing selected awards and press coverage images.

### `about.html`
- Title: About Us - AAYUNEX Innovations | Fuel Guard X
- Sections: 6
- Images: 9
- Key sections:
  - `#about-hero`: Company story hero describing AAYUNEX mission and deep-tech focus.
  - `#about-problem`: Problem deep-dive showing why fuel theft and operational leakage are critical.
  - `#mission`: Mission section describing the startup's goals and innovation model.
  - `#about-team`: Team section with three member portraits:
    - `assets/team/aayush_pic.jpeg` (Ayush Joshi)
    - `assets/team/gitesh pic.png` (Gitesh Khilari)
    - `assets/team/vasu_pic.png` (Vasu Sahu)
  - `#partners`: Partner logos for OPJU Innovation Center, Startup India, MSME, CSVTU FORTE.
  - `#about-cta`: Call-to-action section with logo and demo prompt.

### `product.html`
- Title: Fuel Guard X Product - AI Fuel Intelligence Ecosystem | AAYUNEX
- Sections: 5
- Images: 3
- Key sections:
  - `#product-hero`: Product hero section with headline and a device image (`assets/device pic.jpeg`).
  - `#ecosystem`: Product ecosystem section describing X-Core Hardware, Guard Mobile, and Insight Cloud.
  - `#tech-capabilities`: Technical capability section listing hardware reliability and platform depth.
  - `#insight-cloud`: Cloud intelligence section describing AI analytics and fleet management.
  - `#product-cta`: CTA section encouraging demo requests and live preview.

### `features.html`
- Title: Features - Fuel Guard X Complete Capabilities | AAYUNEX
- Sections: 7
- Images: 2
- Key sections:
  - `#features-hero`: Features hero with headline and product capability positioning.
  - `#monitoring-features`: Monitoring capabilities section with live fuel monitoring, cloud data monitoring, and GPS/GSM tracking.
  - `#detection-features`: Detection section with theft detection, short-fuelling detection, and solenoid lock system.
  - `#intelligence-features`: Intelligence section with AI analytics, smart alerts, and predictive maintenance.
  - `#management-features`: Management section with fleet control, reports, and access.
  - `#why-fgx`: Benefit section describing why Fuel Guard X is the right solution.
  - Footer and logo imagery.

### `achievements.html`
- Title: Achievements - Awards, Recognition & Media | AAYUNEX Innovations
- Sections: 5
- Images: 26
- Key sections:
  - `#achievements-hero`: Achievements hero with headline and credibility message.
  - `#achievements-all`: Awards grid showing multiple winning certificates and prize recognition.
  - `#media-coverage`: Media coverage section with news clippings and press screenshots.
  - `#incubation-partners`: Incubation partner logos for Startup India, MSME, CSVTU FORTE, OPJU, DPIIT, DST.
  - `#achievements-cta`: Call-to-action section driving future engagement.

### `dashboard.html`
- Title: Dashboard - Fleet Command Center | Fuel Guard X by AAYUNEX
- Sections: 5
- Images: 2
- Key sections:
  - `#dashboard-hero`: Dashboard hero describing fleet command capabilities.
  - `#dashboard-full`: Full dashboard preview with mock analytics, vehicle list, fuel metrics, and map placeholder.
  - `#dashboard-features`: Dashboard capability cards for analytics, GPS tracking, smart alerts, and reports.
  - `#mobile-app`: Mobile app section describing app access and mobile control.
  - Footer/logo section.

### `contact.html`
- Title: Contact Us & Request a Demo - Fuel Guard X | AAYUNEX Innovations
- Sections: 4
- Images: 2
- Key sections:
  - `#contact-hero`: Contact hero section with headline and outreach messaging.
  - `#contact-forms`: Contact form section with message form, demo request fields, and confirmation state.
  - `#contact-info`: Contact info section with email support and headquarters location.
  - `#social`: Social section and footer logos.

### `privacy.html`
- Title: Privacy Policy - AAYUNEX Innovations
- Sections: 2
- Images: 2
- Key sections:
  - `#privacy-hero`: Privacy hero section with policy headline.
  - `#privacy-content`: Full privacy policy content, including introduction, data collection, usage, security, sharing, retention, rights, cookies, and terms.

## SEO Topics Covered
- Local targeting: Raipur, Chhattisgarh, OPJU Innovation Center, CSVTU FORTE, Raigarh.
- Product-focused keywords: Fuel Guard X, fuel monitoring, fuel theft detection, fleet management, ERP, AI analytics, smart alerts, vehicle tracking.
- Startup and incubation signals: startup incubation, deep tech startup, business incubator, national recognition, incubation partners.
- Trust & credibility: awards, media coverage, partners, EDM, compliance.
- Social and brand identity: AAYUNEX Innovations, Fuel Guard X, AAYUNEX brand.

## Notes for the Client
- The website is now configured to launch in the blue/light default theme and show that choice consistently across desktop and mobile.
- Every page includes consistent social preview metadata and a canonical URL.
- The About, Product, Features, Achievements, Dashboard, Contact, and Privacy pages all have enhanced metadata for improved SEO and social sharing.
- The site uses structured JSON-LD organization data for the business identity and social profiles.

## File Created
- `website-documentation.md`
