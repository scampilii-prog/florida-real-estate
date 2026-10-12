# Gulf Coast Estates — Project handoff (2026-10-10)

## Identity and safety
- Live website: https://florida-real-estate.pages.dev
- GitHub: scampilii-prog/florida-real-estate
- OceanFL (https://oceanfl.com) is a COMPLETELY INDEPENDENT website: NEVER edit it. Use as reference only.
- Keep all approved pages/functions and avoid unnecessary duplicates. Commit targeted updates and check actual contents before changing.

## Approved global design
- Google Manrope, elegant deep navy and gold.
- Official Home header: Sabatino Campilii / Florida Gulf Coast Real Estate, language selector with only English, Español, Italiano, Português (no abbreviations), search and always-visible hamburger on iPhone.
- Official five-column footer: Sabatino/LoKation, Main Pages, Personal Guidance, Homes & Helpful Tools, Invest & Discover. Legal links gold and underlined. Separate line: "No agency relationship is created solely by using this website."
- Ask Tino floating assistant, OneHome search links, same-tab internal navigation, responsive.
- Booking page request-appointment.html uses SimplyBook.me.
- NEVER overwrite approved sections indiscriminately.

## Buyer content already committed
- buy.html: international/out-of-state buyers section #international-buyers, four-step preparation #get-prepared, agent-versus-lender section #working-together with cash-buyer note.
- index.html: small international-buyer introduction linking to Buy.
- buyer-financing-preapproval.html: financing-level comparison #financing-levels.
- buyers-guide.html: seven-step linked guide and other practical buyer content.
- questions.html: searchable Q&A and Ask Tino assistant.
- investment-center.html: interactive rental investment calculator, gross-yield/cap-rate bars, Florida risks; header copied/adapted from Home and approved footer.
- Contact intake section in contact.html is #tell-us-your-plans. Link directly using contact.html#tell-us-your-plans (Cloudflare may also resolve /contact#tell-us-your-plans).

## Contact links audit
- On 2026-10-10, re-fetched ALL 46 primary HTML pages in three batches. No literal href="contact.html" remains; contact links point to contact.html#tell-us-your-plans.
- Questions page has a specific "Ask Tino" CTA opening the assistant via toggleTino().
- Keep appointments, mailto, property searches and other purpose-specific links unchanged.
- This was a source-code href audit, NOT full live-browser functional or responsive testing. Other URL variants, buttons and JS navigation may need further checks.

## Suggested next work, in order
1. Review Buy and Buyers Guide for duplicated content and accuracy, adding only genuinely useful buyer guidance from OceanFL screenshots (agent value, transaction steps, coastal due diligence, financing and FAQs). Do not copy OceanFL word-for-word.
2. Verify Financing & Pre-Approval distinctions (prequalification, preapproval, DU/LPA findings are conditional, not guarantees) and clear licensed-agent/not-lender disclaimer.
3. Review FAQ coverage: flood/elevation, wind mitigation/insurance, HOA/condo milestone and reserves, homestead, seawalls, canal vs Gulf-front, compensation, closing.
4. Check Ask Tino on all pages; note investment-center.html may not yet include the actual floating assistant despite header correction.
5. Check Investment Center footer anchor investment-center.html#investment-calculator exists and works; fix if absent.
6. Full live browser/mobile QA: header, footer, all internal links and target sections, four languages, iPhone search and hamburger, OneHome and appointment. Confirm Cloudflare deployment.
7. Optionally improve navigation and maintain a single source of truth for shared header/footer instead of duplicated markup.

## Communication
- User speaks Spanish, prefers concise, clear progress and real GitHub edits rather than promises.
- When a new ZIP is necessary, specify each filename, whether new/replaced, repository destination, and upload/commit steps.
- Never say fully verified when only source code has been inspected.


---

# CONTINUATION NOTE — HEADER / HERO REDESIGN PLAN (approved for future work, 2026-10-10)

## MOST IMPORTANT: status
- User explicitly asked to **save this entire plan and continue in a new chat**. This note is a written handoff, not implementation.
- **Do not claim hero/header redesign completed.** The planned new imagery and hero layouts have NOT been uploaded, modified, or deployed.
- Start next chat by opening this file and verifying the latest GitHub contents; do not ask user to restate agreed requirements.
- User wants **all website pages** reviewed, with sky/soft clouds and clear overlaid headline like current Home screenshot. Professional and cohesive, not giant empty hero spaces.
- Preserve Home as reference; maintain approved site features, forms, calculators, links, language dropdown, mobile hamburger, footer and Ask Tino; use targeted, verifiable commits, group small batches and validate.
- Reference screenshot shows Home at https://florida-real-estate.pages.dev/ with navy fixed navigation, waterfront pool image, dark blue overlay, small uppercase gold eyebrow, large left-aligned white H1 "Find Your Place on Florida’s Gulf Coast", short text and buttons.
- Avoid reusing a single generic unrelated photo across every community. Photograph and locale must match context. Any new assets should be licensed/permitted for site publishing; save them into repo with stable paths, responsive sizes and accessible alt text. Don't use remote temporary image-search URLs as long-lived website assets.
- Do not modify OceanFL (oceanfl.com), which is **separate**. Do not rename website/brand yet: prior domain brainstorming is undecided. User is a REALTOR® with LoKation Real Estate, NOT an independent broker; preserve clear brokerage disclosure.

## Three hero types
1. **A · Main hero (480–550 px)** — Home only, existing photo/position as visual template; panoramic coastal property, blue sky/soft clouds, dark navy gradient, small gold eyebrow, large heading, concise subheading, 1–2 CTAs.
2. **B · Medium hero (270–340 px)** — Buy, Sell, Search Properties, Communities, About, Investment Center, New Construction, waterfront, listing pages, guides, and community pages. Subject-appropriate real photography with some sky/clouds, dark gradient and heading, normally one CTA.
3. **C · Compact hero (150–210 px)** — Calculators, title/financing/contract pages, forms, closing timelines, FAQ, legal, contact/appointment, valuation. Restrained soft sky/cloud background or neutral gradient; navy text unless dark overlay; show actual working form/tool immediately below, avoid large whitespace.

## Main pages — exact draft English hero copy; still proposals, not yet installed
- index.html — A, KEEP CURRENT: "Find Your Place on Florida’s Gulf Coast"; Search Properties / Explore Communities.
- buy.html — B, coastal house under blue/cloud sky: "Find the Right Home, With Confidence"; CTA Search Properties. The internal #buyer-contract-timeline needs compact header, NOT another large photographic hero.
- sell.html — B, elegantly presented Florida home and sky: "Sell Your Property With a Clear Plan"; CTA Request a Home Valuation.
- search-properties.html — B, coastal residential aerial: "Explore Homes on Florida’s Gulf Coast"; CTA Search Properties.
- communities.html — B, broad authentic Florida coast panorama: "Explore the Communities We Call Home"; CTA Explore Communities.
- about.html — B, tasteful coast/marina scene; preserve existing personal portraits lower on page: "Local Knowledge. Personal Guidance."; CTA Meet Sabatino.
- contact.html — C, subtle soft sky: "Tell Me About Your Real Estate Plans"; CTA anchor #tell-us-your-plans.
- investment-center.html — B, professional waterfront/marina: "Invest With Better Information"; CTA #investment-calculator.
- new-construction.html — B, Florida new build + sky: "Discover New Construction in Southwest Florida"; CTA Explore New Homes (must point to a real existing destination).
- waterfront.html — B, canal-side/waterfront home: "Find Your Place on the Water"; CTA Explore Waterfront Properties.
- florida-gulf-coast-homes-for-sale.html — B, elegant house and garden: "Explore Gulf Coast Homes for Sale"; CTA Search Homes.
- florida-gulf-coast-condos-for-sale.html — B, tasteful coastal condominium: "Discover Coastal Condo Living"; CTA Search Condos.
- questions.html — C, subtle sky: "1,000 Questions. Honest Answers."; CTA Explore Answers.
- request-appointment.html — C, sky: "Let's Talk About Your Next Move"; SimplyBook.me form must appear immediately below; complimentary 30 min consultations; do not break booking widget.
- site-map.html — C, restrained soft background: "Explore Our Website"; preserve recently approved high-visibility cream-and-gold link buttons.

## Buyer guide and utilities — proposed copy
- buyers-guide.html — B: "Your Guide to Buying in Florida" / "From planning to closing".
- buyer-preparation.html — C: "Prepare to Buy With Confidence" / "Start with the essentials".
- buyer-property-search.html — B: "Find a Home That Fits Your Life" / "Compare locations and properties".
- buyer-financing-preapproval.html — C: "Understand Your Buying Power" / "Financing and pre-approval".
- buyer-offers-contracts.html — C: "Make an Offer With Confidence" / "Understand the important terms".
- buyer-inspections-appraisals.html — C: "Know What You're Buying" / "Inspections and appraisals".
- buyer-title-financing.html — C: "From Contract to Closing" / "Title, financing and final steps".
- buyer-closing-costs.html — C: "Understand Your Buying Costs" / "Plan beyond the purchase price".
- buy.html#buyer-contract-timeline — separate C-style internal intro, preserving JS table and email export, not a second hero photo.

## Sellers, calculators and legal — proposed copy
- sellers-guide.html — B: "Your Guide to Selling With Confidence" / "From pricing to closing".
- home-valuation.html — C: "What Is Your Home Worth?" / "Understand your property's market value".
- seller-closing-costs.html — C: "Know Your Costs Before You Sell" / "Estimate your net proceeds".
- calculators.html — C: "Plan Your Next Move With Confidence" / "Helpful real estate calculators".
- mortgage-calculator.html — C: "Understand Your Monthly Payment" / "Explore mortgage scenarios".
- privacy.html — C neutral "Privacy Policy".
- terms.html — C neutral "Terms of Use".
- seller contract overview is embedded in sell.html; keep compact, no giant header.

## Communities: visually match each place, B type, with recognizable genuine coastal photography
- boca-grande.html and boca-grande-florida-real-estate.html — island, historic buildings, beach — "Discover Boca Grande".
- cape-haze.html and cape-haze-placida-florida-real-estate.html — canals/coast — "Explore Cape Haze & Placida".
- englewood.html and englewood-manasota-key-florida-real-estate.html — Manasota beach/neighborhood — "Discover Englewood & Manasota Key".
- rotonda-west.html — golf/residential greenery — "Explore Rotonda West".
- venice.html and venice-florida-real-estate.html — downtown/coast — "Discover Venice, Florida".
- wellen-park-florida-real-estate.html — new homes and landscape — "Explore Wellen Park".
- nokomis-casey-key.html and nokomis-casey-key-florida-real-estate.html — Nokomis and Casey Key coast — "Discover Nokomis & Casey Key".
- punta-gorda-isles.html and punta-gorda-isles-florida-real-estate.html — boating/canals — "Explore Punta Gorda Isles".
- sarasota.html — bay/skyline — "Discover Sarasota".
- siesta-key-longboat-key-florida-real-estate.html — white-sand beaches — "Explore Siesta Key & Longboat Key".
- Review duplicate/alternate community URL pairs for content/SEO, but DO NOT delete pages or break existing URLs.

## Repository images EXISTING as of 2026-10-10
about-gulf-coast-hero.jpg, about-italo-photo.jpg, about-sabatino-photo.jpg, assets/search-properties-hero.webp, search-properties-hero.webp, florida-gulf-coast-luxury-waterfront-home..jpg, images/florida-golf-course.webp, images/florida-gulf-coast-beach.webp, images/florida-waterfront-homes.webp, pexels-kelly-3845102.jpg, calculators_person_using_calculator.jpg, questions_real_estate_consultation.jpg, sabatino-campilii-i.jpg; LoKation logo images. Inspect actual image subject/copyright/quality before reusing; a photo filename alone does not prove suitability. Need to source/create additional community-specific licensed images before deployment.

## Recently COMPLETED (not part of pending hero redesign)
- source audit: all 46 public pages' footer HTML matched the approved five-column footer after removing duplicated "Invest & Discover" on site-map.html, sell.html, seller-closing-costs.html, sellers-guide.html and siesta-key-longboat-key-florida-real-estate.html.
- Site Map has a direct buyer timeline link, 30-minute Request an Appointment link in "Meet & Connect", and larger gold/cream prominent main navigation buttons.
- Buy empty "Choose where to begin" section removed; timeline spacing tightened, JS render guarded.
- Sell sections reorganized 04 Marketing → 05 Offers → 06 Closing and whitespace reduced. Seller contact copy adapted.
- Investment Center gained alternative insurance scenario, printable report button and due diligence guidance.
- Offline standalone buyer timeline created as Florida-Closing-Timeline-OFFLINE.html (actual working macOS file downloaded to user's Documents and moved to Real Estate - Buyers folder). Offline worksheet does not persist entries automatically.
- These were GitHub source verifications. Live responsive browser QA across all 46 is still outstanding; do not claim otherwise.
- Appointment form: https://florida-real-estate.pages.dev/request-appointment. Uses SimplyBook.me (https://gulfcoastestates.simplybook.me), 30-minute consultation and published Mon–Fri 9–5 Florida time; preserve calendar.

## Immediate execution order for next chat
1. Fetch live GitHub files, enumerate all 46 production .html pages (exclude backup/offline/demo "calculators_seis_funcionales_footer_aprobado.html" and Florida-Closing-Timeline-OFFLINE.html), map actual current hero/header structure & background asset references. Verify presence of existing H1 and section anchors.
2. Implement Home-inspired **reusable styling** using scoped selectors, without overriding working header/footer components. Start 5–6 high-impact pages in a batch (Buy/Sell/Search Properties/Communities/About/Contact), check syntax and links, avoid giant gaps.
3. Add only valid/verified local photo assets to repo; use subject-appropriate images with cloud sky. Obtain new generated/source images if appropriate, otherwise ask before committing mismatched placeholders. Check rights.
4. Then do Investment Center, Guides, category listings, calculators/legal, and every community/alternate URL. Document each commit and QA.
5. Check anchors, mobile menu, four languages, header/footer, OneHome, calculators, forms, Ask Tino and booking; do not break anything. Provide concise summary and URLs. If cannot test live deployment, say exactly what is verified.
6. Do NOT interpret this handoff as permission to change brand/name/domain; user has NOT selected one yet.


---

# CRITICAL NEW-CHAT UPDATE — 2026-10-10 8:36 PM Eastern (LATEST PRIORITY)

USER explicitly asked for everything saved and a new-chat starter. This section supersedes older conflicting plans. The user is understandably upset after several visual regressions. Be direct, fix bugs in GitHub, verify rendered outcomes, and do not promise success merely because a commit succeeded.

## FIRST PRIORITY: BUY PAGE BROKEN IN LAST SCREENSHOT
- At 8:36 PM, screenshot of https://florida-real-estate.pages.dev/buy shows hero/photo and white content constrained to approximately HALF the browser width, leaving large blank white region to right; hero heading and subtitle are nearly invisible DARK TEXT over dark navy overlay. User only wanted white hero text; regression is NOT approved. Fix full-width layout AND WHITE hero heading, kicker and subtitle BEFORE any other design work.
- Preserve the approved modern angular WHITE HOUSE WITH POOL hero photograph from original Buy design and full-width tall banner. User chose this over a Florida marina photo and over the earlier Home pool image. Headline reasonably SMALLER and LEFT-ALIGNED; left third photo subtly shaded dark navy; WHITE texts visible, on desktops and phones. No duplicate photo, no photo above title, no half-width page. No other content changes.
- At last GitHub fetch, buy.html includes CSS style IDs gce-buy-left-title-20261010 and gce-buy-white-text-only-20261010. Hero overrides target .hero.sc-standard-photo with ::before image coming from --sc-hero-photo and ::after gradient. Script assets/hero-photos.js?v=20261010-buy-modern-restored injects .sc-standard-photo and styling. assets/language-dropdown.js is also global with substantial CSS and menu changes. Audit style collisions, parent widths, responsive handling, translation-specific styling, caching and JS before applying targeted correction. Repeated appending of !important rules caused regressions; simplify instead.
- Original screenshot at ~7:55 PM of modern white house was tall and wide but duplicated above title; at ~8:14 PM marina image smaller and pale, unwanted; at ~8:31 PM photo duplicated top, wanted modern house but in ONE banner; at ~8:33 PM dark left overlay and title was DARK unreadable; at ~8:36 PM half-width page with dark letters. Use user's latest screenshot as evidence of failure, not confirmation of success.
- Do actual rendered QA if possible; GitHub file verification alone does NOT prove browser view; report what was tested honestly.

## HEADER LANGUAGE AND MENU
- On ALL pages, language dropdown options exactly English, Español, Italiano, Português, WITHOUT EN/ES/IT/PT prefixes. Button upper width minimum for Português plus arrow; dropdown SAME WIDTH and exact same left/right edges. Current shared assets/language-dropdown.js recently configured 100px. Check label does not clip.
- Keep 3-line menu and magnifier visible on iPhone. At ~8:29 PM hamburger did not work. Root cause: capture click interception to site-map.html in assets/language-dropdown.js was removed in commit c299ff693e100b8a6be55f9cf6a0bb9884543f49. But native menu/overlay STILL needs visual functional QA. The script is large ~60 KB; inspect closely before modifications.

## HOME PHOTOS AND ANIMATION
- DO NOT DELETE/REPLACE the ORIGINAL Home photo file florida-gulf-coast-luxury-waterfront-home..jpg (two periods before jpg) in repo root; 3.74 MB, blob SHA verified earlier 44029ff2529fa812706084e5355da30937744f57. User loves photo of luxury house and pool, asked to keep EXACT image. Different from modern WHITE HOUSE photo preferred for Buy.
- User liked moving original Home photo to another page and new SeaGlass-style gentle zoom Home hero with generated sunset coastal villa photo. BUT subsequently asked NOT TO PUBLISH new image on Home without preview and approval, concerned photo might be lost. Respect this later approval condition. Current index.html has a zoom animation with fallback to original image; references new assets/luxury-coastal-villa-at-sunset.webp, not yet verified present in GitHub. Generated WebP exists in earlier local session and ChatGPT Library root /luxury-coastal-villa-at-sunset.webp, but NOT in GitHub as of last check. Do not claim published.
- IMPORTANT newer user decision: Buy must show its prior MODERN WHITE HOUSE photo, not original Home house/pool. Original Home photograph can be kept on Home pending approval and eventually reused on another suitable page. Never substitute an AI-edited screenshot for original image file.

## WEBSITE AND PRIOR APPROVALS
- Read the ENTIRE earlier PROJECT_HANDOFF.md; all existing previous detailed page-by-page hero/photo/title/CTA matrix still applies except where superseded above.
- Repo scampilii-prog/florida-real-estate; live https://florida-real-estate.pages.dev/. OceanFL/oceanfl.com is a completely separate site and MUST NOT BE MODIFIED.
- BRAND NAME/DOMAIN UNDECIDED: WestGulfCoast.com, CheersToHome.com etc were discussed; no approved rename/domain transition. User is Sabatino Campilii, REALTOR® affiliated with LoKation Real Estate, not independent broker. LoKation identity required.
- Manrope font, navy and gold brand, consistent header, identical 5-column footer across ~46 public pages, four languages, functional links and OneHome, same-tab internal navigation, proper anchors, Site Map, Search, Ask Tino, mobile hamburger.
- Keep complete Buy AS-IS contract timeline with editable rows/email/export and offline Florida-Closing-Timeline-OFFLINE.html; seller step 04/05/06; Investment Center calculator/insurance sensitivity/print report; site-map approved cream/navy main buttons; request-appointment SimplyBook.me; all existing forms and QA content.
- New header project across all public pages (A large Home, B medium commercial/community, C short tools/forms) previously planned but NOT deployed throughout; see prior handoff matrix. Fix Buy regression BEFORE pursuing broad redesign.
- Perform changes directly via GitHub connector, not asking user to edit HTML or CSS. Confirm source fetch after commits and rendered page when possible. Do NOT say a page is fixed if still visually broken.


## Grupo 1 — Diseño general y fotografías (2026-10-12)
- Unified main header brand FLORIDA COSTIERA (navy/gold) across ten previously missed property/area landing pages: florida-gulf-coast-homes-for-sale, florida-gulf-coast-condos-for-sale, boca-grande-florida-real-estate, cape-haze-placida-florida-real-estate, englewood-manasota-key-florida-real-estate, venice-florida-real-estate, wellen-park-florida-real-estate, siesta-key-longboat-key-florida-real-estate, nokomis-casey-key-florida-real-estate, punta-gorda-isles-florida-real-estate.
- Standardized clean English/Español/Italiano/Português option labels on nine buyer/seller guide pages.
- Added a four-language header selector and existing shared language script (where previously absent) to privacy.html, terms.html, closing-costs.html and request-appointment.html.
- Home: removed reference to uncommitted/unapproved assets/luxury-coastal-villa-at-sunset.webp; original florida-gulf-coast-luxury-waterfront-home..jpg is now the sole configured hero image. Preserved cinematic movement and overlay, no image replacement without owner approval.
- Source checked: primary page headers, menu/search presence, existing five-column footer blocks, original hero image repo existence, and language selector fields. Responsive/live browser visual checks and language translations still require actual browser QA; source checks are not proof of visual functionality.
- Follow-ups in Grupo 4: browser QA on desktop/iPhone/tablet, photo licensing/source and hero layouts; avoid claiming live rendering verified.


## Grupo 2 — Contenido y páginas (2026-10-12)
- Audited top-level content structure of Home, Buy, Sell, Communities, About, Contact, New Construction, financing/buyer and seller guides, Questions and Investment Center. Existing content was preserved; no approved hero or page structure replaced.
- Added short substantive guidance sections to buyer-financing-preapproval.html (DU/LPA not final approval and secure verification), buyers-guide.html (Florida flood/wind, waterfront and condo due diligence), new-construction.html (builder contract/incentive due diligence), sellers-guide.html (offer terms, financing and lawful screening), investment-center.html (ownership expenses, rentals, insurance, yield caveats).
- questions.html: added 10 factual, educational questions and answers with existing category names; parsed FAQ database now contains 129 unique questions. Public marketing tagline “1,000 Questions. Honest Answers.” remains aspirational; do not claim 1,000 indexed answers. Prior count was 119.
- Verified the modified pages' inline JavaScript syntax, ignoring schema.org application/ld+json metadata (which is valid JSON not executable JS). Questions data JSON parses without error and entries are unique. Live translation, browser interaction and responsive rendering still require QA in Group 4.
- Website visitor destinations/forms/calculators are separate Group 3; SEO, visuals and publication are Group 4. Never claim full multilingual content translation without testing it.


## Grupo 3 — Enlaces, formularios y herramientas (2026-10-12)
- Revisited all 47 production HTML pages and source-audited literal internal page href targets against actual repository filenames. No unresolved internal HTML-page destinations were found.
- Source-audited local fragment links on all 47 pages; no missing same-page ID targets found.
- Confirmed Ask Tino widget markup appears on most content pages, including Investment Center. It is absent from request-appointment, closing-costs, privacy and terms. Do not claim it is present everywhere.
- Confirmed the main Contact lead form is mailto-based: it opens the visitor's mail app to review and send, not an automatic server-side submission. UI wording already states that. Other property-preference form is also mailto-based. Do not call email sent unless independently confirmed.
- Confirmed the SimplyBook.me booking page embeds a widget and contains an external calendar fallback. Booking and real-time confirmation were not tested.
- Confirmed Search Properties contains OneHome share links. Their live validity/login requirements and individual searches were NOT independently confirmed.
- Confirmed six calculator disclosure labels appear in calculators.html, and the Investment Center calculator target #investment-calculator exists. Actual calculations, date logic and mobile interaction require live functional test.
- Fixed obsolete visible 'Gulf Coast Estates' name in Investment Center title/eyebrow to FLORIDA COSTIERA; preserved #investment-calculator.
- Status: **code-based Group 3 review completed, but live end-to-end functional verification NOT completed**. Explicit outstanding tests must carry to Group 4: live Cloudflare/browser tests for all OneHome shares, SimplyBook scheduling, Ask Tino backend responses, mailto workflows, six calculator numerical cases including date rules, all form submission behaviors, mobile menus and 4-language translations. Do not equate HTML structure or source checks with functional success.
