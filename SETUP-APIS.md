# APIs & services to connect

You only need **two** things for the audit to work end-to-end.

---

## 1. Google PageSpeed Insights API (required for speed + SEO scores)

**What it does:** Powers the performance, SEO, and accessibility scores and some of the “issues” (e.g. LCP, title tag, meta description).

**Steps:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project (or pick an existing one).
3. Enable **PageSpeed Insights API**:  
   APIs & Services → Library → search “PageSpeed Insights API” → Enable.
4. Create an API key:  
   APIs & Services → Credentials → Create credentials → API key.  
   (Optional: restrict the key to “PageSpeed Insights API” and to your site’s domain for security.)
5. In your Cloudflare Worker settings, add your PageSpeed API key as a secret called `PSI_API_KEY` (Settings → Variables and Secrets). **Do not** hardcode the key in `cloudflare-worker.js`, especially if this repo is public.

**Cost:** Free. Google allows a high quota for PageSpeed Insights; typical usage of this tool stays within it.

**If you don’t set it:** The audit still runs but won’t have real speed/SEO data; it will show a generic “Speed data unavailable” message and use fallbacks where possible.

---

## 2. Cloudflare Worker (required for full audit – HTML/schema + PageSpeed)

**What it does:** Fetches the user’s website HTML on the server so the tool can check H1, phone, address, schema, Open Graph, etc. Without it, the browser can’t read other sites (CORS), so those checks are skipped.

**Steps:**

1. Sign up at [workers.cloudflare.com](https://workers.cloudflare.com) (free).
2. Create a new Worker.
3. Paste the full contents of **cloudflare-worker.js** from this project.
4. Deploy.
5. Copy the Worker URL (e.g. `https://mysiteaudit-proxy.yourname.workers.dev`).
6. In **index.html**, find `const PROXY_URL = 'https://YOUR-WORKER.workers.dev';` and replace with your Worker URL.

**Cost:** Free tier is generous (e.g. 100k requests/day).

**If you don’t set it:** The audit still runs and uses PageSpeed data, but it won’t do the HTML-based checks (H1, phone, address, schema, sitemap, etc.).

---

## 3. Formspree (optional — “Email me this report” after an audit)

**What it does:** Sends the visitor’s email plus business name, URL, and audit score to your inbox when they use **Email me this report** on the results screen.

**Steps:**

1. Sign up at [formspree.io](https://formspree.io) (free tier is enough to start).
2. Create a **new form** and note the endpoint URL (looks like `https://formspree.io/f/xxxxxxxx`).
3. In **`index.html`**, set `FORMSPREE_ENDPOINT` to that exact URL (search for `FORMSPREE_ENDPOINT` near the top of the main `<script>` block).
4. In Formspree: **Form settings → Restrict to domain** — add `https://mysiteaudit.co.uk` and, if you test locally, `http://localhost:3000` or your dev URL (Formspree blocks cross-origin posts from unknown domains otherwise).

**Cost:** Free tier has limits; upgrade if you get a lot of submissions.

**If you don’t set it:** Change `FORMSPREE_ENDPOINT` to a placeholder or remove the email block — the rest of the audit still works.

---

## Summary

| What              | Where to get it                    | Where to put it                    |
|-------------------|------------------------------------|------------------------------------|
| PSI API key       | Google Cloud Console                    | As Worker secret `PSI_API_KEY` in Cloudflare |
| Worker URL        | workers.cloudflare.com → paste Worker code → Deploy → copy URL | `index.html` → `PROXY_URL`         |
| Formspree form URL | formspree.io → copy form endpoint | `index.html` → `FORMSPREE_ENDPOINT` |

After setting the Worker + PSI key, run an audit for full speed + on-page + local checks. Add Formspree when you want email capture from the results screen.

---

## 4. GA4 custom events (measurement)

**What it does:** The site fires named events so you can see funnel behaviour, not just pageviews.

**Events fired from the homepage (`index.html`):**

| Event | When |
|--------|------|
| `audit_started` | User submitted the audit form with a valid URL |
| `audit_completed` | Report rendered (includes `score`, `issue_count`) |
| `audit_failed` | Uncaught error during the audit |
| `email_report_submitted` | Formspree accepted the email capture |
| `contact_click` | `mailto:` link (footer vs results CTA via `location`) |
| `share_results_click` | X, LinkedIn, or copy link (`method`) |
| `affiliate_outbound_click` | Sponsored resource links (`link_url`, `link_domain`) |
| `blog_cta_click` | Any internal link starting with `/blog` |

**Events from blog/guide pages (`analytics-events.js`):**

| Event | When |
|--------|------|
| `blog_cta_click` | “Free Audit” style links to homepage (`nav-cta`, `btn-cta`) |
| `blog_internal_navigation` | Link to another `/blog/...` URL |
| `affiliate_outbound_click` | Same as homepage for `rel="sponsored"` |
| `contact_click` | `mailto:` from a guide page |

**In GA4:** Admin → Events → mark as **Key events**: `audit_completed`, `email_report_submitted`, `contact_click` (adjust to taste). Optionally link **Search Console** to GA4 for query reporting.

---

## 5. URL redirects (optional — kill duplicate blog URLs)

GitHub Pages alone cannot 301 `/blog` → `/blog/`. If you use **Cloudflare** in front of the site, add **Redirect Rules** (or bulk redirects):

- `https://mysiteaudit.co.uk/blog` → `https://mysiteaudit.co.uk/blog/` (301)  
- `https://mysiteaudit.co.uk/blog.html` → `https://mysiteaudit.co.uk/blog/` (301)

The repo includes **`blog.html`** with `noindex`, canonical, and `location.replace` to `/blog/` as a fallback for old links.
