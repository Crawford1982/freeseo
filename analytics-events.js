/**
 * Shared GA4 events for blog/guide pages (homepage handles audit funnel in index.html).
 * Requires gtag + config G-F64SZ9XW3X loaded first.
 */
(function () {
  function track(name, params) {
    if (typeof gtag !== 'function') return;
    gtag('event', name, params || {});
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href') || '';

      if (href.indexOf('mailto:') === 0) {
        track('contact_click', { location: 'blog_page' });
        return;
      }

      if (href === '/' || href === '/index.html') {
        if (a.classList.contains('nav-cta') || a.classList.contains('btn-cta')) {
          track('blog_cta_click', { destination: 'homepage_audit', link_text: (a.textContent || '').trim().slice(0, 80) });
        }
      }

      var rel = a.getAttribute('rel') || '';
      if (rel.indexOf('sponsored') !== -1 && /^https?:\/\//i.test(a.href)) {
        try {
          var host = new URL(a.href).hostname.replace(/^www\./, '');
          track('affiliate_outbound_click', { link_url: a.href, link_domain: host });
        } catch (_) {}
      }

      if (href.indexOf('/blog') === 0 && href.length > 5) {
        track('blog_internal_navigation', { link_url: a.href });
      }
    });
  });
})();
