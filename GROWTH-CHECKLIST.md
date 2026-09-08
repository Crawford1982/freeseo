# Growth checklist (post-implementation scan)

Last reviewed with codebase changes: GA4 events, canonical fixes, blog GA parity, tighter homepage meta, `analytics-events.js`, redirect documentation, Organization + WebApplication schema, `.nojekyll`, `_redirects` for Netlify-compatible hosts.

## September 2026 — GSC CTR Optimization & GA4 Event Fixes

**Context**: Real Google Search Console data (10 Aug–6 Sep 2026) showed 2 clicks, 3.17k impressions, 0.1% CTR, avg position 55.5. Top pages with high impressions but low CTR needed title/meta optimization. GA4 custom events (audit_completed, email_report_submitted, contact_click) weren't appearing—event naming mismatch found and fixed.

**GSC Snapshot (10 Aug–6 Sep 2026)**:
- **Totals**: 2 clicks, 3,170 impressions, 0.1% CTR, avg position 55.5
- **Top pages by impression**:
  - `/blog/what-is-nap-consistency/` — 484 impr, 1 click, 0.2% CTR, pos 50.5
  - `/blog/why-isnt-my-estate-agency-on-google/` — 105 impr, 1 click, 1% CTR, pos 23.3
  - `/` (homepage) — 1,651 impr, 0 clicks, 0% CTR, pos 80.9
  - `/blog/why-isnt-my-restaurant-showing-on-google/` — 297 impr, 0 clicks, 0% CTR, **pos 11.4** ⭐
  - `/blog/why-isnt-my-plumbing-business-on-google/` — 167 impr, 0 clicks, 0% CTR, **pos 12.2** ⭐
  - `/blog/why-isnt-my-hair-salon-on-google/` — 152 impr, 0 clicks, 0% CTR, **pos 12.0** ⭐
  - building (140 impr, pos 28), dental (118, pos 23), accountancy (55, pos 25)
- **Top queries** (all 0 clicks): site audit (553 impr pos 86), nap seo (157), site audits (130), nap listings (86), website audit lichfield (86), audit my site (85), nap information (72), site audit services (66), plus city audits, estate agents not on rightmove (31 impr pos 25.8)
- **GA4 issue**: Custom events audit_completed, email_report_submitted, contact_click not appearing—only first_visit, page_view, session_start, user_engagement showing.

**Shipped 8 September 2026**:
- [x] **CTR title/meta optimization** for high-impression low-CTR pages:
  - Restaurant guide: "Why Isn't My Restaurant Showing on Google? 6 UK Fixes" (was "Restaurant Not on Google Maps? 6 UK Fixes...")
  - Plumbing guide: "Why Isn't My Plumbing Business on Google? 7 UK Fixes" (was "Plumber Not Showing on Google? 7 UK Fixes...")
  - Hair salon guide: "Why Isn't My Hair Salon Showing on Google? 7 UK Fixes"
  - NAP guide: "What Is NAP Consistency? (And Why It's Killing Your Google Rankings)"
  - Estate agency guide: "Why Isn't My Estate Agency on Google? 7 UK Fixes"
  - Homepage: "Why Isn't My Business on Google? Free UK Site Audit"
  - All meta descriptions shortened to ~120 chars, query-focused ("not on Google Maps", "not showing", "proven UK fixes")
- [x] **GA4 event fix**: Changed `lead_submitted` to `email_report_submitted` in homepage Formspree handler (line ~2007) so GA4 receives the correct event name matching the comment and GA4 Admin setup
- [x] **Internal links from homepage**: Added contextual paragraph in "What we check" section linking to restaurant, plumbing, and hair salon guides (the three with positions 11-12 per GSC) to consolidate topical relevance
- [x] **Sitemap lastmods** updated to 2026-09-08 for: homepage, restaurant, plumbing, hair salon, NAP, estate agency guides

**Expected Impact**: 
- CTR should improve for pages ranking 11-14 (restaurant, plumbing, hair salon) with query-matching titles
- GA4 events will now appear correctly in reports and can be marked as conversions in GA4 Admin
- Internal links from homepage to top-ranking guides should pass authority and improve click depth

**Next check**: Wait 2-4 weeks then compare GSC CTR and average position for the six optimized pages.

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
