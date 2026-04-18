# Growth checklist (post-implementation scan)

Last reviewed with codebase changes: GA4 events, canonical fixes, blog GA parity, tighter homepage meta, `analytics-events.js`, redirect documentation, Organization + WebApplication schema, `.nojekyll`, `_redirects` for Netlify-compatible hosts.

## Done in this pass

- [x] GA4: `audit_started`, `audit_completed`, `audit_failed`, `email_report_submitted`, `contact_click`, `share_results_click`, `affiliate_outbound_click`, `blog_cta_click`
- [x] Blog pages: shared `analytics-events.js` (`blog_cta_click`, `blog_internal_navigation`, `contact_click`, `affiliate_outbound_click`)
- [x] GA4 loaded on NAP, plumbing, restaurant, and blog hub (were missing before)
- [x] Canonical + `og:url` + schema `@id` trailing-slash alignment (NAP, plumbing)
- [x] Visible “Updated” dates (NAP, plumbing, restaurant → April 2026)
- [x] Homepage title/meta tightened slightly for SERP length
- [x] `SETUP-APIS.md`: GA4 event table + Cloudflare redirect guidance
- [x] `blog.html`: already uses `noindex` + JS redirect to `/blog/`

## Still worth doing (growth)

### Measurement (high priority)

1. **GA4 Admin** — Mark key events: `audit_completed`, `email_report_submitted`, `contact_click`.
2. **Link GSC → GA4** — Query/landing reporting in one place.
3. **Verify events** — DebugView + real device test (audit run, email form, mailto, share, affiliate link).

### Technical SEO

4. **Cloudflare 301s** — `/blog` and `/blog.html` → `/blog/` (see `SETUP-APIS.md`). Removes duplicate/thin URL variants.
5. **Monthly** — Bump `lastmod` in `sitemap.xml` when you materially change pages (signals recrawl).

### Content & CTR

6. **GSC quarterly** — For URLs with impressions &lt; 2% CTR, test new title/meta (especially homepage + restaurant guide).
7. **Depth** — Strongest guides (restaurant, accountancy, NAP) benefit from 300–800 words more *unique* detail per vertical (not boilerplate).
8. **New queries** — One dedicated page or section targeting “Google Business Profile audit” / “local SEO audit UK” if you want non-tool informational traffic.

### Authority & distribution

9. **Backlinks** — Directory listings, local UK SME newsletters, one guest post; tool URL as signature.
10. **Social proof** — When you have users, add 1–2 short quotes or mini case lines on the homepage (even “Used by X businesses” once true).

### Product

11. **Email capture follow-up** — Confirm Formspree delivers; optional auto-reply with checklist PDF later.

---

## Quick health commands (local / deploy)

- Confirm `analytics-events.js` and `blog/**` return `200` after deploy.
- Spot-check: run audit → GA4 DebugView shows `audit_completed`.
