# Florida Costiera — Google launch checklist (13 October 2026)

## Verified from GitHub source
- Domain: https://floridacostiera.com/
- robots.txt explicitly allows crawling and advertises https://floridacostiera.com/sitemap.xml.
- sitemap.xml lists the home page and the public HTML URLs.
- Sample pages inspected (Home, Questions, Buy, Sell, Communities, Site Map, Boca Grande and Venice URL pairs) contain unique page titles, descriptions, and canonical URLs on the official domain; none in this sample declares noindex.
- Some communities have two distinct indexed URLs, e.g. boca-grande.html and boca-grande-florida-real-estate.html. These have differentiated titles and individual canonicals. Before consolidating or changing canonicals, inspect substantive content differences and internal linking. Do not delete or redirect pages blindly.

## Not yet verified — do not claim success
1. Public HTTP 200/redirect responses, sitemap.xml fetch from Google's servers and robots.txt served by Cloudflare.
2. Domain property and sitemap submission are already complete (13 Oct 2026). Google subsequently reported "Couldn't fetch — Sitemap could not be read — General HTTP error"; investigate the actual HTTP response and Googlebot access. URL Inspection and indexing results remain unverified.
3. Canonicals, description and H1 audits for **every** live page and redirect consistency between /questions and /questions.html; www to apex.
4. Google Business Profile ownership, contact details, address visibility, brokerage disclosure, and referral to website.
5. Real Google Analytics installation and consent/privacy alignment.
6. Browser QA workflow must be launched manually after a batch; latest browser run has not been confirmed. Structural checks passed separately, but cannot replace interactive QA.
7. Ask Tino Worker behavior, actual email receipt, Google Translate, property search links, booking and physical mobile QA.

## Order
1. Verify live robots/sitemap and redirect/canonical alignment; resolve only confirmed issues.
2. Preserve the existing Cloudflare TXT verification record for Google Search Console; do not repeat domain verification.
3. Investigate Search Console's General HTTP error for the already-submitted https://floridacostiera.com/sitemap.xml. A blocked Googlebot request for '/' under Cloudflare rule BOBA-199 was observed, but does not prove the cause of the sitemap error. Do not disable broad security controls without specific evidence. Inspect Home, Questions, and three community pages when access is available. Indexing is Google's decision and can take time.
4. Check Search Console reports over following days; fix substantive crawl and indexing issues based on real evidence.
5. Configure Analytics and Google Business Profile afterward, ensuring consistent owner/broker information and no unsupported claims.

As of 13 October 2026, the user verified floridacostiera.com as a Domain property using Cloudflare DNS TXT and submitted its 48-URL sitemap in Google Search Console. The subsequent General HTTP error is unresolved, and successful Google fetch/indexing must not be claimed. GSC Wizard is connected in read-only mode but had not yet listed Florida Costiera immediately after property verification. Do not confuse repository source, structural QA, or submission with deployment and indexing.
