# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS (no framework, no build step), as in the existing export in `site/`. Hosted on Hostinger; the content of `site/` is uploaded to `public_html`. The request form posts to `site/api/request.php` (PHP 8.0+, PHP `mail()`), configured as described in `INSTALLATION-FORMULAIRE.txt`. Confirmed by the owner: keep plain static HTML on Hostinger.

## Users

Primary: people who want to come for a drink at Le Calbar, a cocktail bar in Paris 12e near Gare de Lyon. Their job on the site is to see the menu, the address and opening hours, and to request a table. Bar reservations are the owner's top priority.

Secondary audiences served by the same site (confirmed present in the content, lower priority):
- Groups booking a cocktail workshop or EVJF (4 to 10 people).
- Private clients and companies wanting an event or private hire ("L'Évent by Le Calbar").
- Bar and hospitality professionals looking for consulting and training ("Agency by Le Calbar").

## Product Purpose

The single website of Le Calbar, replacing the current site at lecalbarcocktail.com. It presents the bar, its drinks and food menus, its workshops, events and consulting offers, and collects requests (table, workshop, event) by email. Success means more table requests from visitors who discovered the bar online.

## Positioning

Two things no other cocktail bar can truthfully claim together:
- The bartenders serve in boxer shorts and a bow tie: this is the identity behind the name "Calbar" (from "calbar", French slang for boxer shorts).
- Advanced cocktail techniques used on the menu: clear milk punch (clarification with milk), fat wash, agar-agar clarification.

## Operating Context

- Bar open Tuesday to Saturday, 18:00 to 01:30; closed Monday and Sunday.
- Workshops: Tuesday to Saturday, slots 15–16, 16–17, 17–18; 55 € per person, 1 hour, 2 signature cocktails, 4 to 10 people, bar privatised.
- No reservation is confirmed automatically: every request is sent by email and confirmed after an exchange with the team.
- Requests go to Thierry@lecalbarcocktail.com, sent from info@lecalbarcocktail.com.

## Capabilities and Constraints

- Pages: `index.html` (home, all sections), `cocktails.html` and `food.html` (menus, embedded in the home page via iframes), `mentions-legales.html`, `confidentialite.html`.
- Request form with three types (table, atelier, événement), CSRF token, honeypot, 3-second delay, rate limit of 5 requests per hour per IP, server-side date rules (no Monday/Sunday, workshop group size 4–10).
- No analytics or advertising tools; no database. This must stay true unless the owner decides otherwise.
- The site covers Paris only. The former home page let visitors choose between Le Calbar Paris and Le Calbar Genève; that choice is gone, so links to `lecalbarcocktail.com/paris.html` are obsolete and must be removed.
- Retention policy for unanswered requests (12 months) is proposed, not yet validated by Le Calbar.

## Brand Commitments

- Name: Le Calbar. Sub-brands: "L'Évent by Le Calbar" (events), "Agency by Le Calbar" (consulting). Footer signature: "L'Évent & Agency by Le Calbar".
- Logo: `site/assets/calbar-logo.svg`.
- Language: French. Voice: premium and confident ("Exigez l'excellence, vivez l'exception", "L'art du cocktail. L'émotion en plus.").
- Instagram: @lecalbar.

## Evidence on Hand

- Full drinks menu with prices (`site/cocktails.html`) and food menu (`site/food.html`).
- Media in `site/assets/`: hero video `hero-background.mp4` and poster, photos `pour.jpg`, `coupe.jpg`, `finish.jpg`, `preparation.jpg` (currently unused), technique photos `tech-*.png`, cocktail illustrations in `illustrations/`.
- Missing: `assets/atelier-cocktails.webp`, referenced by the workshop section but not supplied.
- Facts: in business since 2012; address 82 rue de Charenton, 75012 Paris; phone 01 84 06 18 90; legal entity LE CALBAR SARL, RCS Paris 751 021 114.
- No testimonials, reviews, press or client logos are on hand. Do not invent any.

## Product Principles

1. Getting a table comes first: menu, address, hours and the table request must be reachable in one step from anywhere.
2. The boxer-shorts-and-bow-tie identity is the bar's signature; show it with confidence, never hide it behind generic "luxury bar" language.
3. Technique is proof of quality: the clarification and fat-wash know-how backs the premium claims.
4. Be truthful about the booking process: a request is not a confirmed reservation.
5. Respect visitors' privacy: no tracking added without the owner's decision.
