/**
 * LocalPulse — Cloudflare Worker Proxy
 * ─────────────────────────────────────
 * Deploy this at: https://workers.cloudflare.com
 * Free tier: 100,000 requests/day
 *
 * This worker fetches external URLs on behalf of the
 * browser, bypassing CORS restrictions.
 *
 * DEPLOY STEPS:
 * 1. Go to workers.cloudflare.com and sign up free
 * 2. Create a new Worker
 * 3. Paste this entire file
 * 4. Deploy
 * 5. Copy the worker URL (e.g. https://localpulse-proxy.yourname.workers.dev)
 * 6. Paste it into index.html as the PROXY_URL value
 */

// Allowed origins — update with your GitHub Pages domain
const ALLOWED_ORIGINS = [
  'https://yourusername.github.io',   // ← update this
  'http://localhost',
  'http://127.0.0.1',
  'null', // local file:// testing
];

export default {
  async fetch(request, env, ctx) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return corsResponse(null, 204);
    }

    // Only allow GET
    if (request.method !== 'GET') {
      return corsResponse('Method not allowed', 405);
    }

    // Check origin (optional — remove if causing issues locally)
    // const origin = request.headers.get('Origin') || '';
    // if (!ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
    //   return corsResponse('Forbidden', 403);
    // }

    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    const action = url.searchParams.get('action');

    // ─── PageSpeed API proxy (key stays on server, never in frontend) ───
    if (action === 'pagespeed') {
      if (!targetUrl) return corsResponse(JSON.stringify({ error: 'Missing url parameter' }), 400, 'application/json');
      const psiKey = env.PSI_API_KEY;
      if (!psiKey) return corsResponse(JSON.stringify({ error: 'PageSpeed API not configured' }), 503, 'application/json');
      try {
        const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile&category=performance&category=seo&category=accessibility&key=${psiKey}`;
        const psiRes = await fetch(psiUrl, { signal: AbortSignal.timeout(15000) });
        const data = await psiRes.json();
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=300',
          },
        });
      } catch (e) {
        return corsResponse(JSON.stringify({ error: e.name === 'TimeoutError' ? 'Request timed out' : 'PageSpeed request failed' }), 502, 'application/json');
      }
    }

    if (!targetUrl) {
      return corsResponse(JSON.stringify({ error: 'Missing url parameter' }), 400, 'application/json');
    }

    // Validate URL
    let parsedTarget;
    try {
      parsedTarget = new URL(targetUrl);
    } catch (e) {
      return corsResponse(JSON.stringify({ error: 'Invalid URL' }), 400, 'application/json');
    }

    // Only allow http/https
    if (!['http:', 'https:'].includes(parsedTarget.protocol)) {
      return corsResponse(JSON.stringify({ error: 'Protocol not allowed' }), 400, 'application/json');
    }

    // Block private/internal IPs
    const host = parsedTarget.hostname;
    if (
      host === 'localhost' ||
      host.startsWith('127.') ||
      host.startsWith('192.168.') ||
      host.startsWith('10.') ||
      host === '0.0.0.0'
    ) {
      return corsResponse(JSON.stringify({ error: 'Private addresses not allowed' }), 403, 'application/json');
    }

    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'LocalPulse-SEO-Audit/1.0 (https://localpulse.co.uk)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.5',
        },
        redirect: 'follow',
        // Timeout via signal
        signal: AbortSignal.timeout(10000),
      });

      const contentType = response.headers.get('content-type') || 'text/html';

      // Only return text content
      if (!contentType.includes('text') && !contentType.includes('json') && !contentType.includes('xml')) {
        return corsResponse(JSON.stringify({ error: 'Non-text content' }), 400, 'application/json');
      }

      const body = await response.text();

      return new Response(body, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Cache-Control': 'public, max-age=300', // Cache for 5 min
          'X-Proxied-By': 'LocalPulse-Worker',
        },
      });

    } catch (error) {
      const isTimeout = error.name === 'TimeoutError';
      return corsResponse(
        JSON.stringify({
          error: isTimeout ? 'Request timed out' : 'Failed to fetch URL',
          detail: error.message
        }),
        isTimeout ? 408 : 502,
        'application/json'
      );
    }
  }
};

function corsResponse(body, status = 200, contentType = 'text/plain') {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
