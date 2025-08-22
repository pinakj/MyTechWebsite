/*
 * animations.js — page transitions with safe Back/Forward handling
 * Drop-in replacement.
 *
 * What this does:
 * - Adds a smooth overlay fade/scale transition when navigating via in-site links.
 * - Ensures that when you press the browser Back/Forward button, any leftover
 *   overlay elements are removed so you never see a blank/white screen.
 *
 * How to use:
 * - Include this script on your pages (ideally before </body>).
 * - By default, it automatically handles clicks on same-origin <a> links.
 * - To skip transition on a specific link, add:  data-no-transition
 * - To force a transition on a custom element, call:  window.PageTransition.start('/path')
 */

(function () {
  // ---------------- Settings ----------------
  var TRANSITION_DURATION_MS = 500; // total duration of overlay fade (ms)
  var OVERLAY_BG = '#ffffff';       // overlay color while transitioning (white)

  // -------------- Helper Utilities ----------
  function isModifiedClick(e) {
    return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
  }

  function isSameOrigin(href) {
    try {
      var url = new URL(href, window.location.href);
      return url.origin === window.location.origin;
    } catch (e) {
      return false;
    }
  }

  function clearTransitionArtifacts() {
    document
      .querySelectorAll(
        '.page-transition-overlay, .page-transition-circle, .page-transition-content-fade'
      )
      .forEach(function (el) { el.remove(); });

    document.body.style.overflow = '';
  }

  // Remove artifacts on load and when restored from back/forward cache
  document.addEventListener('DOMContentLoaded', clearTransitionArtifacts);
  window.addEventListener('pageshow', function () {
    // pageshow fires on normal load and bfcache restores
    clearTransitionArtifacts();
  });

  // -------------- Transition Elements -------
  function createOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      background: OVERLAY_BG,
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity ' + TRANSITION_DURATION_MS + 'ms ease',
      zIndex: '999999'
    });
    return overlay;
  }

  function createContentFade() {
    var fade = document.createElement('div');
    fade.className = 'page-transition-content-fade';
    Object.assign(fade.style, {
      position: 'fixed',
      inset: '0',
      background: OVERLAY_BG,
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity ' + TRANSITION_DURATION_MS + 'ms ease',
      zIndex: '999998'
    });
    return fade;
  }

  function startOverlayAnimation() {
    // Ensure any prior overlays are gone
    clearTransitionArtifacts();

    var overlay = createOverlay();
    var fade = createContentFade();
    document.body.appendChild(fade);
    document.body.appendChild(overlay);

    // Slight async to allow CSS transition to take effect
    requestAnimationFrame(function () {
      // First, fade the page content under a subtle veil
      fade.style.opacity = '0.3';
      // Then, bring the overlay fully opaque
      overlay.style.opacity = '1';
    });

    // Prevent scroll jumps during transition
    document.body.style.overflow = 'hidden';
  }

  function navigateWithTransition(url) {
    startOverlayAnimation();
    // Navigate after the overlay finishes
    setTimeout(function () {
      window.location.href = url;
    }, TRANSITION_DURATION_MS);
  }

  // -------------- Click Interception --------
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;

    // Respect opt-out
    if (a.hasAttribute('data-no-transition')) return;

    // Only handle left-click, same-origin navigations without target=_blank
    if (isModifiedClick(e)) return;
    if (a.target && a.target.toLowerCase() === '_blank') return;
    var href = a.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (!isSameOrigin(href)) return;

    // If link would not cause navigation (same path/hash only), skip
    var dest = new URL(href, window.location.href);
    if (dest.href === window.location.href) return;

    // Everything looks good — do our transition
    e.preventDefault();
    navigateWithTransition(dest.href);
  }, { capture: true });

  // -------------- Public API ----------------
  window.PageTransition = {
    start: function (url) {
      if (!url) return;
      navigateWithTransition(url);
    },
    clear: clearTransitionArtifacts
  };
})();
