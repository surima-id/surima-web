# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS deployed via GitHub Pages (custom domain surima.id). No backend, auth, or build step for the main site.

## Users

Primary users are people in Surabaya who are new to Riichi Mahjong: they visit to understand what Riichi is, whether SURIMA is a safe/non-gambling community, where and when gatherings happen, and how to join their first session. Secondary users are existing community members checking events, resources, apps, and merchandise.

## Product Purpose

Surabaya Riichi Mahjong (SURIMA) community presence: a calm, beginner-friendly, non-gambling gateway that gets a curious newcomer to a first safe gathering and keeps members connected to community resources, browser-based training/league tools, and merchandise. Success means clearer onboarding and trust rather than conversion pressure.

## Positioning

A community-run Riichi Mahjong presence distinguished by beginner-focused workshops, explicit non-gambling framing, an inclusive local (Surabaya) identity, and a set of free browser-based training/scoring/league tools built for the community. Competitors could imitate the pages; the actual member community and recurring workshops cannot be copied from the website alone.

## Operating Context

Content is in Indonesian. The site links to subdomain apps (learn.surima.id, defend.surima.id, league.surima.id, compass.surima.id). Merchandise uses a print-order workflow documented elsewhere in the workspace. Events/workshops are run offline in Surabaya.

## Capabilities and Constraints

Confirmed functionality: 7 public marketing/information pages (home, about, riichi, community, resources, gallery, merch, contact); nav + mobile menu; external app links; merchandise ordering info. Confirmed constraints: static hosting, no account/auth, no runtime backend, preserved non-gambling statement, preserved app subdomain links, preserved content in Indonesian. Visual system is an incumbent implementation and may be replaced in redesign; product truth, content, functions, and constraints remain.

## Brand Commitments

Name: SURIMA (Surabaya Riichi Mahjong). Tagline: "Reach Beyond the Wall." Tri-color palette (green/gold/red) with neutrals cream/ink as canonical in `css/styles.css`. Existing emblem/wordmark logos (assets/logo). Voice: warm, inclusive, beginner-friendly, non-gambling, community-led. Claims must stay factual (no invented testimonials, member counts, or revenue figures).

## Evidence on Hand

Public pages: index.html, about.html, riichi.html, community.html, resources.html, gallery.html, merch.html, contact.html. Shared stylesheet `css/styles.css`, JS `js/main.js`, assets under `assets/` (logos, yaku image). GitHub Pages custom domain (`CNAME`: surima.id). Some imagery and gallery photos are gitignored (`galleries/`).

## Product Principles

1. Beginner-first: a new visitor should understand Riichi and feel welcome before being asked to act.
2. Non-gambling clarity: gambling-free framing stays explicit and non-defensive.
3. Community truth: only real events, assets, and tools are shown; nothing is fabricated.
4. Static simplicity: keep the stack lightweight and maintainable for volunteers.
5. Local warmth: Indonesian language and Surabaya identity are part of the experience.

## Accessibility & Inclusion

No product-specific accessibility standard was confirmed. Existing site targets mobile and desktop with responsive breakpoints. Redesign should preserve reasonable keyboard/focus and contrast expectations pending an audit.