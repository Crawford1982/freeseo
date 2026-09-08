# Growth checklist (post-implementation scan)

Last reviewed with codebase changes: GA4 events, canonical fixes, blog GA parity, tighter homepage meta, `analytics-events.js`, redirect documentation, Organization + WebApplication schema, `.nojekyll`, `_redirects` for Netlify-compatible hosts.

## September 2026 — Weeks 1–6 Growth Plan Implementation

**Context**: James green-lit implementing weeks 1–6 of the growth plan. This iteration deepens the top 3 trade guides with UK-specific content (not boilerplate), polishes the 3 hub pages to be crawl-worthy, improves the lead loop with better expectation-setting, and updates the sitemap.

**Shipped 8 September 2026**:
- [x] **Deepened top 3 trade guides** with 400–700 words of unique UK/trade content each:
  - Plumbing guide: Added UK-specific content on Checkatrade/Yell NAP consistency, Gas Safe registration visibility, GBP category specificity, emergency callout messaging, and authentic job photos vs stock images
  - Electrician guide: Added UK-specific content on NICEIC/Part P registration visibility, emergency/24-7 GBP optimization, Checkatrade/Yell NAP consistency, service-area pages for hyper-local ranking, and authentic electrical work photos
  - Restaurant guide: Added UK-specific content on TripAdvisor NAP consistency, delivery platform (Deliveroo/Uber Eats) conflicts, HTML menu vs PDF issues, Google Reserve booking integration, authentic food/interior photos vs stock, and Restaurant schema vs generic LocalBusiness
- [x] **Mid-page CTAs added** to all 3 trade guides: "Run the free audit" primary CTA linking to homepage, secondary "Get a quote from £499" mailto with relevant subject line
- [x] **Title/meta tightened** for all 3 guides for better UK-focused CTR (pain query targeting: "why isn't my [trade] showing on Google UK")
- [x] **Updated dates** to September 2026 (dateModified in schema + visible "Updated" date)
- [x] **Polished 3 hub pages** to be crawl-worthy:
  - website-audit-for-trades: Added internal links to plumbing/electrician/builder/roofer guides, £499 quote CTA in success section
  - google-business-profile-audit: Added internal link to NAP consistency guide, £499 quote CTA
  - local-seo-falkirk: Added context for Falkirk/Grangemouth/surrounding areas, internal links to blog guides, £499 quote CTA
- [x] **Lead loop improvements**:
  - Homepage email capture success message now sets expectation: "You'll get the action plan and can reply for a free quote (websites from £499)"
  - Created `LEAD-REPLY-TEMPLATE.md` in repo root: 3–5 line template James can use as Formspree auto-responder or manual reply (thanks, top fixes, £499 offer, no obligation)
- [x] **Sitemap updated**: lastmod → 2026-09-08 for homepage, plumbing/electrician/restaurant guides, and all 3 hub pages
- [x] **GROWTH-CHECKLIST.md updated** with this section

**Expected Impact**: Deeper trade guides with unique UK content should improve dwell time and social sharing. Mid-page CTAs reduce friction to audit and £499 quote. Hub pages now have clear crawl paths from blog + homepage. Lead loop sets better expectations and makes £499 offer clearer upfront.

## September 2026 — CTR & Monetization Improvements

**Context**: Search Console showed 0.3% CTR with avg position 22.8. Goal was to improve SERP click-through and make the £499 monetization path clearer without breaking the free tool.

**Shipped**:
- [x] **SERP Title**: Changed from "Free Local SEO Audit for UK Small Businesses" to "Why Is My Site Not Showing on Google? Free UK SEO Audit" — directly addresses #1 search intent
- [x] **Meta Description**: More action-oriented: "Find out why your business isn't appearing on Google or Maps. Free 30-second site audit for UK small businesses. No signup required."
- [x] **H1**: Now "Why Isn't My Business Showing on Google?" — matches user query intent
- [x] **Hero Subhead**: Enhanced clarity about what users get and UK focus
- [x] **Monetization CTAs Strengthened**: 
  - Main CTA headline: "Get a Fast, SEO-Optimised Website — From £499"
  - Button: "Get Your Free Quote →" (was "Ask me to fix this")
  - All 3 score-tier CTAs rewritten to emphasize outcomes: "fixes issues and gets you showing on Google"
  - Clearer value prop and next steps
- [x] **Open Graph**: Updated title/description for social sharing CTR
- [x] **Sitemap**: Homepage lastmod → 2026-09-07 to signal fresh content

**Expected Impact**: Higher SERP CTR from pain-point title, lower friction to £499 quote via clearer outcome promises.

## Done in previous passes

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
