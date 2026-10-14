// The only file you need to edit to start earning on this site.
//
// The Bud Grower's affiliate program runs on Awin (advertiser 82211). Every buy link goes
// through Awin's tracker, which credits publisher 2085789 and forwards to the exact product page.
//
// link: for programs that credit a query parameter on the store itself (?ref=abc).
//   Unused here because deepLinkTemplate is set.
// deepLinkTemplate: networks with their own tracking domain. {url} = the URL-encoded
//   destination page. When set, it is used instead of `link`.
window.AFFILIATE = {
  store: "https://thebudgrower.com",
  link: "",
  deepLinkTemplate: "https://www.awin1.com/cread.php?awinmid=82211&awinaffid=2085789&ued={url}"
};
