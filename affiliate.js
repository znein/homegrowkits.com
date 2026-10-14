// Turns every <a data-aff href="https://store/..."> into a tracked affiliate link.
// The plain href stays in the HTML as a fallback if this script never runs.
(function () {
  var cfg = window.AFFILIATE || {};
  var params = new URLSearchParams();
  try { params = new URL(cfg.link).searchParams; } catch (e) {}

  document.querySelectorAll("a[data-aff]").forEach(function (a) {
    var url = new URL(a.getAttribute("href"), cfg.store);
    if (cfg.deepLinkTemplate) {
      a.href = cfg.deepLinkTemplate.replace("{url}", encodeURIComponent(url.toString()));
    } else {
      params.forEach(function (v, k) { url.searchParams.set(k, v); });
      a.href = url.toString();
    }
    a.target = "_blank";
    a.rel = "sponsored nofollow noopener";
  });
})();
