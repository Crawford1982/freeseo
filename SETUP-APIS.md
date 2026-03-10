# APIs & services to connect

You only need **two** things for the audit to work end-to-end. **API keys never go in the repo** — the PageSpeed key lives in the Worker as a secret.

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
5. **Do not put the key in index.html.** Add it as a **Worker secret** (see section 2).

**Cost:** Free. Google allows a high quota for PageSpeed Insights; typical usage of this tool stays within it.

**If you don’t set it:** The audit still runs but won’t have real speed/SEO data; it will show a generic “Speed data unavailable” message and use fallbacks where possible.

---

## 2. Cloudflare Worker (required for full audit – HTML/schema + PageSpeed)

**What it does:** Fetches the user’s website HTML on the server so the tool can check H1, phone, address, schema, Open Graph, etc. Without it, the browser can’t read other sites (CORS), so those checks are skipped.

**Steps:**

1. Sign up at [workers.cloudflare.com](https://workers.cloudflare.com) (free).
2. Create a new Worker.
3. Replace the default script with the contents of **cloudflare-worker.js** in this project.
4. **Add your PageSpeed API key as a secret:** Worker → **Settings** → **Variables and Secrets** → **Add** → Secret: name `PSI_API_KEY`, value = your Google API key. Or via CLI: `npx wrangler secret put PSI_API_KEY`.
5. Save and Deploy.
6. Copy the Worker URL (e.g. `https://localpulse-proxy.yourname.workers.dev`).
7. In **index.html**, find `const PROXY_URL = 'https://YOUR-WORKER.workers.dev';` and replace with your Worker URL (no path needed).

**Cost:** Free tier is generous (e.g. 100k requests/day).

**If you don’t set it:** The audit still runs and uses PageSpeed data, but it won’t do the HTML-based checks (H1, phone, address, schema, sitemap, etc.).

---

## Summary

| What              | Where to get it                    | Where to put it                    |
|-------------------|------------------------------------|------------------------------------|
| PSI API key       | Google Cloud Console → PageSpeed Insights API → API key | **Cloudflare Worker** → Secrets → `PSI_API_KEY` (never in repo) |
| Worker URL        | workers.cloudflare.com → deploy Worker → copy URL        | `index.html` → `PROXY_URL`         |

No other APIs or keys are required. After setting these two, run an audit and you should get full speed + on-page + local checks.
