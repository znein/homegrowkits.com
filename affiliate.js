// Turns every <a data-aff href="https://store/..."> into a tracked affiliate link.
// The plain href stays in the HTML as a fallback if this script never runs.
//
// With a deepLinkTemplate containing {clickref}, each link also gets a sub-ID label -
// <site>-<section>-<kind>-<product>, e.g. "bestsupersoil-picks-btn-starter-kit" - so the
// network's reports show which site, section and button earned each click and sale.
(function () {
  var cfg = window.AFFILIATE || {};
  var params = new URLSearchParams();
  try { params = new URL(cfg.link).searchParams; } catch (e) {}

  function kindOf(a) {
    if (a.classList.contains("card-img-link")) return "img";
    if (a.classList.contains("cat")) return "cat";
    if (a.closest(".card")) return "btn";
    return "cta";
  }

  function clean(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  // Awin allows 50 characters. Long product slugs keep their END - that's where set numbers and
  // variants live ("...-saturn-v-92176"), so similar products stay distinguishable.
  function clickref(a, url) {
    var section = (a.closest("section[id]") || {}).id || "page";
    var prefix = clean([cfg.site, section, kindOf(a)].filter(Boolean).join("-"));
    var slug = clean(decodeURIComponent(url.pathname).split("/").filter(Boolean).pop() || "home");
    var room = 50 - prefix.length - 1;
    if (slug.length > room) slug = slug.slice(slug.length - room).replace(/^-/, "");
    return prefix + "-" + slug;
  }

  document.querySelectorAll("a[data-aff]").forEach(function (a) {
    var url = new URL(a.getAttribute("href"), cfg.store);
    if (cfg.deepLinkTemplate) {
      a.href = cfg.deepLinkTemplate
        .replace("{clickref}", encodeURIComponent(clickref(a, url)))
        .replace("{url}", encodeURIComponent(url.toString()));
    } else {
      params.forEach(function (v, k) { url.searchParams.set(k, v); });
      a.href = url.toString();
    }
    a.target = "_blank";
    a.rel = "sponsored nofollow noopener";
  });
})();
