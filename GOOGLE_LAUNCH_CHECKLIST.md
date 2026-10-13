# Florida Costiera — Google launch checklist (13 October 2026)

## Verified from GitHub source
- Domain: https://floridacostiera.com/
- robots.txt explicitly allows crawling and advertises https://floridacostiera.com/sitemap.xml.
- sitemap.xml lists the home page and the public HTML URLs.
- Sample pages inspected (Home, Questions, Buy, Sell, Communities, Site Map, Boca Grande and Venice URL pairs) contain unique page titles, descriptions, and canonical URLs on the official domain; none in this sample declares noindex.
- Some communities have two distinct indexed URLs, e.g. boca-grande.html and boca-grande-florida-real-estate.html. These have differentiated titles and individual canonicals. Before consolidating or changing canonicals, inspect substantive content differences and internal linking. Do not delete or redirect pages blindly.

## Not yet verified — do not claim success
1. Public HTTP 200/redirect responses, sitemap.xml fetch from Google's servers and robots.txt served by Cloudflare.
2. Google Search Console property verification, sitemap submission, inspection of home/Questions/community pages, Coverage and indexing results.
3. Canonicals, description and H1 audits for **every** live page and redirect consistency between /questions and /questions.html; www to apex.
4. Google Business Profile ownership, contact details, address visibility, brokerage disclosure, and referral to website.
5. Real Google Analytics installation and consent/privacy alignment.
6. Browser QA workflow must be launched manually after a batch; last post-fix run not verified.
7. Ask Tino Worker behavior, actual email receipt, Google Translate, property search links, booking and physical mobile QA.

## Order
1. Verify live robots/sitemap and redirect/canonical alignment; resolve only confirmed issues.
2. Verify floridacostiera.com as a Google Search Console Domain property if user can access DNS, otherwise URL-prefix property using Google's offered method.
3. Submit https://floridacostiera.com/sitemap.xml and inspect the home page, /questions, and three important community pages. Indexing is Google's decision and can take time.
4. Check Search Console reports over following days; fix substantive crawl and indexing issues based on real evidence.
5. Configure Analytics and Google Business Profile afterward, ensuring consistent owner/broker information and no unsupported claims.

No Google account configuration or Search Console submission has been performed as of this note. Do not confuse repository source with deployment and verified indexing.
