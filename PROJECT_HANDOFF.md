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


## Grupo 4 — SEO y revisión previa a publicación (2026-10-12)
- Audited all 47 production HTML pages for SEO metadata. All have a description and a canonical link; added missing canonical declarations; added missing descriptions to closing-costs.html and request-appointment.html; aligned Home canonical to https://florida-real-estate.pages.dev/.
- Created sitemap.xml enumerating 47 public pages, deliberately excluding offline worksheet and calculator backup HTML. Created robots.txt allowing normal indexing and pointing to the sitemap. Both files were fetched again from GitHub after creation.
- Checked src/href local static asset targets across all 47 production HTML files against the actual repository tree; no missing referenced image, JS or CSS files in these src/href attributes. This is source-level verification, not confirmation that image backgrounds, remotely hosted resources or dynamic requests always load.
- Confirmed the new dark navy/gold left-side Back to Top button with visible text was committed across participating pages; no second right-side floating link remained in calculators.html. A few short/legal/booking pages have no such control by design; don't claim it was added to every single page.
- Cannot independently access the Cloudflare Pages live site with the available web retrieval tool (the homepage, calculators, robots.txt, sitemap.xml requests returned inaccessible). No interactive desktop/iPhone/iPad browser or end-to-end functional test has been completed. Do NOT claim Cloudflare deployment, mobile presentation, website speed/Core Web Vitals, OneHome searches, SimplyBook booking, Ask Tino backend responses, contact mailto sending, or numeric calculator/date calculations were live-verified.
- Group 4's repository SEO/source work is complete; browser-only validation remains a real outstanding gate. Do not switch floridacostiera.com or claim final website publication readiness until those gates are checked in a browser. Twilio (Group 5) remains separate and not started.


## NUEVO WEBSITE 8 — ACTUALIZACIÓN PRIORITARIA DEL 12 OCTUBRE 2026
El usuario confirmó expresamente que el defecto del encabezado al traducir ocurre SOLAMENTE en site-map.html. En español Google Translate muestra su barra superior y tapa parte de la cabecera. Prioridad: solución exclusiva para site-map.html; NO aplicar más parches globales indiscriminados a páginas que funcionan. La evidencia es el screenshot de las 9:10 AM de 12 Oct 2026. El último intento todavía no está validado visualmente.
site-map.html incluye integración Google Translate externa y encabezado especial .sc-sitemap-header. Antes de editar, leer código actual y últimos commits; la página referencia assets/language-dropdown.js?v=20261012-sitemap-banner-only cuando se hizo esta comprobación. Diferenciar barra propia de Google Translate y el desplazamiento del body; no anunciar corrección visual sin probarla.
Back to Top: el usuario aprobó un único botón navy/negro-dorado con flecha y texto a la izquierda, compacto en móvil; etiquetas English Back to Top, Español Volver arriba, Italiano Torna su, Português Voltar ao topo. Alinear altura de borde superior con Ask Tino. Site Map usa a.top en vez de floatingLeftBackTop; se adaptó. Comprobar visualmente.
Grupos 1, 2, 3 terminados en código (Grupo 2: 129 preguntas únicas, no afirmar 1000), Grupo 4 SEO de código realizado (sitemap.xml con 47 páginas; robots.txt; canónicos y descripciones; referencias a assets comprobadas), pero QA visual/funcional real pendiente: traducciones, navegador iPhone/iPad/escritorio, menú, calculadoras y fechas, OneHome, SimplyBook, Ask Tino, mailto. No declarar Grupo 4 terminado hasta resolver pruebas reales. Twilio Grupo 5 NO iniciado; empezar solo al recibir orden.
Identidad definitiva: FLORIDA COSTIERA, SOUTHWEST FLORIDA GULF COAST REAL ESTATE, Sabatino Campilii REALTOR, LoKation Real Estate, SL3363040; URL temporal florida-real-estate.pages.dev, dominio comprado floridacostiera.com pendiente de conectar. OceanFL.com separado, NUNCA modificar. Manrope, azul marino y dorado, footer 5 columnas, selector English/Español/Italiano/Português, icono assets/florida-costiera-final-favicon.png?v=3; Home foto florida-gulf-coast-luxury-waterfront-home..jpg con doble punto.
El usuario no quiere código, ZIP, instrucciones técnicas ni commits explicados; desea que se haga y guarde todo directamente en GitHub y solo ver el resultado visual y breve resumen. Leer todo PROJECT_HANDOFF.md y GitHub antes de hacer cambios; prioridades más recientes prevalecen.

## Footer refinado — 12 Oct 2026
- Usuario aprobó reorganización elegante del footer, con cinco columnas sobre azul marino y franja legal inferior en tono azul ligeramente más claro (#1a3b52). El enlace Site Map debe quedar centrado dentro de esa franja y separado del botón flotante izquierdo Back to Top. Se aplicó vía assets/language-dropdown.js y se actualizaron referencias de script en las 47 páginas HTML. Closing Costs era la excepción (footer .sc-cc-footer) y recibió tratamiento de diseño equivalente en el script compartido y referencia renovada en closing-costs.html.
- Auditoría en GitHub confirmó referencias de versión refinada en 47 páginas; 46 cuentan con .sc-unified-footer y Closing Costs tiene .sc-cc-footer por diseño. Validación visual en navegador real aún pendiente, así como los tests end-to-end del Grupo 4. Evitar volver a retocar sin petición o evidencia visual.


## Grupo 4 — cierre de trabajo en GitHub, 12 Oct 2026
- El propietario confirmó visualmente el footer renovado y el enlace Site Map centrado; pidió avanzar al Grupo 5.
- Última revisión de GitHub: calculadoras, formulario de Contact, enlaces OneHome de Search Properties y widget/enlace SimplyBook presentes en HTML; las comprobaciones de código de enlaces locales/SEO de las 47 páginas ya están registradas arriba.
- `robots.txt` y `sitemap.xml` recuperados de GitHub: 47 URLs únicas, Home raíz incluida, referencia del sitemap correcta.
- El sitio vivo florida-real-estate.pages.dev no es accesible mediante la herramienta de consulta web disponible (Home, Site Map y sitemap.xml rechazados). Por tanto NO están certificadas mediante navegación real las pruebas end-to-end de calculadoras, OneHome, reservas, Ask Tino, formularios y visuales móviles; NO afirmar que se hayan probado. El trabajo verificable en repositorio del Grupo 4 queda cerrado, con QA en navegador real explícitamente pendiente y documentado.
- La próxima fase autorizada es Grupo 5: teléfono empresarial/Twilio. Antes de contratar, adquirir números o generar cargos, confirmar con el propietario servicio, presupuesto, disponibilidad, identidad y destino de llamadas; consultar herramientas actuales. No confundir avance al Grupo 5 con aprobación para pagar o comprar automáticamente.


## Grupo 5 — Florida Costiera Google Voice telephone, 12 Oct 2026 (latest)
- User chose existing Google Voice number **(941) 270-4877** for Florida Costiera. Identity verification completed through Google Payments, and user confirmed a successful normal telephone conversation after disabling Google Voice Screen calls. User reports number functioning. It is a personal Google Voice account, apparently no monthly plan charge; suitability as a durable business number and any relevant Google terms still require consideration.
- Existing OceanFL Twilio toll-free number **844-623-2630** is owned/managed in Italo's Twilio primary account. NEVER alter OceanFL or any other Twilio number; user opted to avoid buying a new Twilio number for Florida Costiera. Twilio compliance-profile step was not completed; no purchase made.
- Added a gold clickable `tel:+19412704877` phone link to the shared five-column site footer via `assets/language-dropdown.js` (for 46 standard pages and special Closing Costs footer); added a direct phone link in `contact.html` near inquiry introduction. Busted shared JS cache version on Home, Buy, Sell, About, Search Properties, Contact, Request Appointment. Other pages will receive shared script change on normal cache refresh; consider a full static-asset version bump carefully if necessary, without modifying approved visual design.
- Actual live website https://florida-real-estate.pages.dev/contact should be visually confirmed, especially mobile tap-to-call. Do not claim live-browser confirmation from GitHub edits alone.
- Permanent purchased domain **floridacostiera.com** is NOT yet connected to Cloudflare Pages; DNS/domain connection requires the owner's authenticated Cloudflare and registrar access. Do not claim domain published. Preserve existing SEO canonical links until domain is actually configured and working; only then migrate canonicals/sitemap and confirm redirects.
- User requests finishing website, preserving Home photo and approved layout, 5-column footer, Site Map, all pages; do not start a redesign or modify OceanFL.


## 12 Oct 2026 — Domain activation and email / SEO (Nuevo Website 8)
- Owner confirmed Cloudflare Pages custom domains `floridacostiera.com` and `www.floridacostiera.com` both Active, SSL enabled, in screenshots. GoDaddy nameservers set to `gail.ns.cloudflare.com` / `guy.ns.cloudflare.com`; domain registrar remains GoDaddy. DNSSEC in GoDaddy off. Live browser verification pending; web tool cannot open the URLs.
- Cloudflare Email Routing activated. Destination `scampilii@gmail.com` Verified. Active rules `info@floridacostiera.com` and `sabatino@floridacostiera.com` forward there; delivery test pending. Destination `italo@acromatico.com` Pending verification; do not create `italo@floridacostiera.com` forwarding until Italo confirms. Routing only, NO outbound send-as mailbox.
- Official URL transition: replaced `https://florida-real-estate.pages.dev` with `https://floridacostiera.com` in sitemap.xml, robots.txt, and listed HTML pages of sitemap, preserving layout and content. Need audit remaining pages if any and verify actual live deployment.
- Remaining: configure 301 redirect of www to non-www via Cloudflare Redirect Rule (not yet done), functional site/browser QA, test receipt of email before publicly showing addresses, validate canonical/SEO and sitemap, assess business disclosure/branding for FL real estate compliance. Do not declare complete until verified.


## 12 Oct 2026 — Approved coastal brand refresh (Nuevo Website 8)
- User selected gold rounded-square house-and-wave emblem, always LEFT of wordmark, no decorative marks on 'i'. Wordmark is `FloridaCostiera` (capital F/C, touching words), `Florida` ivory-white, `Costiera` muted gold, with small uppercase subtitle. OceanFL remains independent and unchanged.
- Created vector asset `assets/florida-costiera-coastal-mark.svg` for header brand and favicon. It is a deliberately simplified SVG interpretation of the approved concept for small-size legibility, not the exact photorealistic raster rendering.
- Extended `assets/language-dropdown.js` shared header script with `fc-new-coastal-brand` styles and Google Fonts Bodoni Moda wordmark; sunset header background, existing language/search/phone/menu controls kept. Updated HTML script version to `20261012-coastal-brand` and favicon tags to coastal SVG across sitemap-listed pages. All GitHub changes made directly. Need live desktop/mobile visual testing and user approval of adaptation; DO NOT claim visual QA verified, web fetch to domain unavailable.
- Need complete redirect rule www -> apex and functional website/email tests before claiming final launch. Destination `italo@acromatico.com` requires Italo verification before routing.


## NUEVO WEBSITE 9 — 12 Oct 2026 — restauración del teléfono Site Map
- User prioritized missing header phone on `/site-map` after latest coastal wordmark update. Repo inspection confirmed Site Map uses `header.sc-sitemap-header`, whereas shared phone injection had only targeted `header.site-header,header.oc-top`. Site Map contained a phone anchor in raw markup but its stable position/appearance could not be confirmed after dynamic branding.
- Commit `653f1600c71bb66b114a997bad3401f2c2bf524b` appended a Site Map-only call-control restoration in `assets/language-dropdown.js`: `tel:+19412704877`, accessible SVG handset and white bold number on desktop, icon-only at widths <=1050px, inserted directly after search, mobile sizing and guarded CSS. Existing menu, brand and Google Translate logic were not modified. Existing phone injection for standard headers remains intact.
- Commit `7b9f285389ae7ff62ecd94206e3f1bb33d0a27e3` cache-busted `site-map.html` to `language-dropdown.js?v=20261012-sitemap-phone-restored`. Re-fetched both files: patch present, script ref updated, translation guard remains present.
- SEO source recheck: `robots.txt` points to `https://floridacostiera.com/sitemap.xml`; sitemap enumerates 47 URLs with no old pages.dev domain. The new coastal SVG favicon exists.
- Remaining mandatory external confirmations: live desktop/mobile rendering and tap-to-call; check standard headers in browser; www → apex 301 redirect in Cloudflare; delivery tests for info/sabatino routing, Italo destination verification before activation; end-to-end forms, booking, Ask Tino, calculators, language UI, exact canonical response and all professional brokerage disclosures. The web URL fetch tool returned DisabledError/inaccessible for floridacostiera.com, so none of these external behaviors was claimed tested. Cloudflare DNS/routing settings cannot be changed through GitHub. Preserve approved design and do not touch OceanFL.

## Nuevo Website 9 — subtitle legibility (12 Oct 2026)
- Owner requested slightly larger text underneath FloridaCostiera wordmark, without modifying icon or main wordmark.
- Shared CSS patch committed as `612ad362`: .fc-area subtitle now 10–12 px desktop, 8–10 px medium, 7–8 px mobile, with proportionate spacing. Site Map and Home script cache references bumped in `5674bd6` and `ab52c7b`; other pages retain previous cache URL until normal cache refresh or future coordinated bump.
- Source change only; visual browser QA remains outstanding. Preserve approved header, sitemap-specific translation guard and phone controls.


## NUEVO WEBSITE 9 — Q&A expansion phase, 12 Oct 2026
- User explicitly reiterated: DO NOT FORGET **1,000 Q&A** and continue completing Florida Costiera. Treat as substantive target: 1,000 distinct, useful answers, not misleading headline count.
- Commit `926165c7541e0d9853d9471e4b75455d4c394328`: added **37 new distinct** professionally cautious English Q&A items to the existing 129, now **166 questions, 19 topics**. Questions cover buying, financing, selling, contracts, inspections, insurance, HOA/condo, waterfront, closing, taxes, new construction, investment, rental, relocation, ownership, disclosures, budgeting, moving.
- Re-read questions.html from GitHub; parsed data successfully as JSON array: **166 entries; 166 unique question titles; zero blank entries**, 19 populated categories. Kept category/search and Ask Tino integration. Source validation only; interactive browser behavior and translations not live-verified.
- Still **834 genuinely new questions and answers** required to complete 1,000. Avoid low-quality filler, duplicates, invented laws, unsourced market figures or claiming 1,000 answers are live. Existing headline `1,000 Questions. Honest Answers.` is a project tagline, not current factual answer count. Page description already says the resource grows.
- Final website QA remains outstanding: header mobile/desktop, Google Translate, canonicals, www redirect, routing delivery, calculators, appointment, Ask Tino, real phone click-to-call and property links. Email routing to Italo needs destination verification first. Do not touch oceanfl.com or its telephone systems.

## Nuevo Website 9 — 1010 Q&A migration authorized (12 Oct 2026)
- User explicitly authorized adding **all 1,010** Q&A published at https://oceanfl.com/questions/ to floridacostiera.com, keeping oceanfl.com untouched. The public page reports 1,010 across 19 topics and exposes expanded answer text to web reader.
- Located existing Library PDF `1,000 Gulf-Coast Real Estate Questions _ OceanFL.pdf` (75 pages, Oct 11 2026). It contains question titles from printed collapsed accordions, NOT all answer text, and therefore is not a complete standalone import source.
- Repo has `.github/workflows/extract-oceanfl-qa.yml`, a gated GitHub Actions workflow that downloads live source, parses HTML `<details>` question/answer pairs, requires exactly 1,010 across 19 topics, and commits ONLY verified `assets/oceanfl-qa-1010.json`. It was triggered by commit `ad0cc1423fe764a3bc27b598efc1f0ba98b146c6` on 12 Oct. At last check output JSON was NOT YET present; don't claim success. Need check workflow results, debug parser if required, then wire real data to `questions.html` and validate live search categories and full answer content.
- Existing `questions.html` remains at 166 completed standalone Q&As; do not replace until complete source data is validated. Preserve brand/header, phone and Ask Tino, and avoid cross-site OceanFL links or phone in copied content. No external browser/mobile QA has occurred.

## Nuevo Website 9 — follow-on execution checkpoint, 12 Oct 2026
- Confirmed via public web fetch OceanFL `/questions/` displays 1,010 full responses across 19 topics. Verified Florida Costiera `questions.html` still contains 166 records; `assets/oceanfl-qa-1010.json` does NOT exist after the previous workflow trigger. Do not report full migration done.
- Updated `.github/workflows/extract-oceanfl-qa.yml` in commits `f1e1a31` and `9984e9a` to extract original question/answer pairs, strictly validate 1,010 distinct entries, and only then update `questions.html` data within its existing page markup; corrected Python regular expression escaping. Workflow triggers on pushes modifying its YAML. Existing page remains untouched until successful validation. Must confirm actual Actions execution/status and new JSON/page data before claiming success; currently no returned run information or produced artifact.
- Public web fetch of `https://floridacostiera.com/questions` and `https://www.floridacostiera.com/` returned inaccessible, preventing live verification. Cloudflare redirect/email routing not exposed by available GitHub tool. Remaining 47-page browser QA, DNS www redirect, email test and operational tests remain outstanding.

## Nuevo Website 9 — 12 Oct 2026 header cache rollout
- Continued targeted `assets/language-dropdown.js?v=20261012-fc-v9` version refresh across sitemap pages to make latest approved logo, more readable subtitle and Site Map phone fix visible after cache refresh. All changes confined to script query reference; no photo/hero/footer replacements.
- Partial earlier batch execution had already updated guide and calculators pages before hitting code tool limit; later batches completed remaining pages. **Exception:** `buy.html` remains on `?v=20261012-coastal-brand` because GitHub edit to its large source was blocked by safety controls; do not claim full 47/47 update. Other 46 pages should be checked by refetch and live rendering before claiming certified. No live browser tests performed.
- `assets/oceanfl-qa-1010.json` still absent; public Q&A import workflow has not generated verified 1010 dataset; source currently 166 Q&A. Do not claim completion, and do not replace with question titles from PDF lacking answers.
- Cloudflare DNS redirect www → apex, email delivery, Italo verification, live functional QA remain external gates. OceanFL untouched.

# VERIFIED CURRENT STATUS — Nuevo Website 9, 12 October 2026 (newest section supersedes outdated historical notes)
- Q&A COMPLETE in GitHub source: questions.html has 1,010 populated answers in 19 categories. assets/oceanfl-qa-1010.json exists with all 1,010 records. There are 1,005 distinct question headings because five appear in multiple topics; kept all 1,010 source entries as requested. Browser behavior and live deployment still unverified. Older references to 166 are historical and obsolete.
- Buy shared-header cache exception corrected in commit b178efd1b8a9a78aa59a4afed4d17ab9ff2ddc1c. buy.html now loads language-dropdown.js?v=20261012-fc-v9 without changing Buy content, hero or layout.
- Source inspected Home, Buy, Site Map: canonical links are on official domain, coastal icon referenced, latest shared script cache; Site Map has explicit tap-to-call link. Standard headers have a JavaScript-injected phone which still requires actual mobile/browser functional testing.
- Live web retrieval cannot open floridacostiera.com/questions, www.floridacostiera.com or robots.txt. This prevents certifying public deployment and www to apex redirect; inaccessible through this tool is not proof of outage.
- Outstanding tasks from Nuevo Website 1–8: real desktop/iPhone/iPad visual and functional QA for 47 pages; four-language Google Translate including Site Map banner behavior; Google Voice phone control; OneHome searches; six calculators and contract dates; mailto forms; SimplyBook appointments; Ask Tino service; Cloudflare redirect and indexing; incoming forwarding tests for info@ and sabatino@, destination verification before creating italo@; brokerage legal disclosures. Preserve existing approved design and never modify OceanFL.

## 12 Oct 2026 — APPROVED GLOBAL Back to Top design (latest)
- User approved FIRST screenshot exclusively as permanent site-wide Back to Top style: almost-black navy #0b1119 button, visible thick white/ivory outline, softly elevated shadow, warm gold circle #eccb83 with BLACK upward SVG arrow, white text. Reject old bright navy with gold outer border.
- Implemented centrally in assets/language-dropdown.js (commit 06fc7f84) using scoped button overrides for #floatingLeftBackTop and a.top (Site Map), with SVG arrow replacing text glyph, and retained each button's existing go-to-top behavior. All 47 sitemap pages' shared script cache references have been advanced to ?v=20261012-backtop-approved through per-page commits; one no-op page already carried the new ref. No unrelated content or photos changed.
- Checked sample sources Home, Q&A, and Site Map for new version. Full live cross-device visual and functionality QA still pending; avoid claiming browser verification. OceanFL untouched.

## 12 Oct 2026 — photo hero titles / SEO sweep (latest)
- User screenshot of Sell showed large short photo hero with empty heading; title was placed far down in body. Inspected all 47 sitemap pages' source `<h1>` patterns in batches. Most pages already have nonempty static H1; detected empty `<h1 id="title"></h1>` in Sell, Buy, Seller Guide, Home Valuation, Buyer Preparation, Buyer Closing Costs, Financing/Preapproval, Inspections/Appraisals, Offers/Contracts, Property Search, Title/Financing, Buyers Guide, Mortgage Calculator, New Construction, Seller Closing Costs and Waterfront.
- Patched all 16 of these pages with a meaningful static H1 inside the existing photo hero (using page's body heading or descriptive title) and a compact responsive hero CSS style: desktop minimum 270px, mobile 220px, visible left-aligned dark navy heading and subordinate text, preserving existing photographs and page tools. Source-code inspection confirmed the Sell/Buy/Waterfront/Mortgage titles exist. Other pages examined already had H1. Existing body H1 may remain as a second heading; if optimizing semantic outline later preserve existing styles/functionality.
- No live visual browser testing of these 16 pages yet, and Google indexing/ranking cannot be guaranteed merely by adding headings. Ensure text/photo contrast with real device screenshots before marking visual QA done. Do not touch OceanFL.


## NUEVO WEBSITE 10 — 12 Oct 2026 — hero height conflict correction
- Verified repository `main` has 47 sitemap URLs and latest 16 static hero-H1 fixes from prior chat. Did not redo those commits.
- Inspected `sell.html`, `buy.html`, `sellers-guide.html`, `home-valuation.html`, `buyer-preparation.html` and `assets/hero-photos.js`. Shared `hero-photos.js` imposed `min-height:430px!important` plus very large padding on photo heroes, contrary to compact hero goal and existing inline 270px hero styling.
- Commit `f54c4b0b3431b2f4ed045393adab4cfae785aba2` adds narrowly scoped responsive style for `section.hero.sc-standard-photo` with immediate static H1: 270px desktop, 220px mobile, with reduced padding. Preserves selected photo and other photo-hero types. This is source-code correction, NOT visual/browser certification. Cached `?v=20261009a` references may require coordinated cache version bump after QA.
- Identified duplicate semantic H1 on Sell and Home Valuation (photo and body); follow up cautiously by changing secondary body H1 to H2 while preserving CSS design, after checking dependencies.
- External live fetch of `/sell` returned DisabledError, `/sitemap.xml` inaccessible; therefore not verified public deployment, www redirect, actual responsive appearance or end-to-end links. Remaining tasks include full 47-page source and mobile/browser QA, translations, menus, email delivery, tools and Cloudflare rules. Do not declare complete, change photographs, or edit OceanFL.


## Nuevo Website 10 — 12 Oct 2026 — GitHub Actions notification flood corrected
- User received many automated GitHub emails about failed `.github/workflows/extract-oceanfl-qa.yml` runs, some reporting `No jobs were run`.
- Direct repo inspection revealed malformed duplicated YAML with stray content following the valid steps, causing parse/run failures. Original Q&A data had already been imported successfully (1010 entries recorded above).
- Replaced the obsolete import workflow in commit `b4d9337b20cd132f839dd4bc28abda70df16f04e` with a minimal valid manual-only archived action (`workflow_dispatch`, one echo job). No push or scheduled triggers. This avoids future automatic failed-run notifications from this workflow, without changing questions.html or Q&A JSON.
- Existing queued notifications may still arrive; other workflows, if present, need separate investigation. The fix is confirmed in GitHub source, not a confirmation of users' email inbox state.


## Nuevo Website 10 — 12 Oct 2026 — continuation of Group 1 hero SEO repairs
- Direct GitHub changes: Sell (`84e548e`), Home Valuation (`25de37a`), Buyer Preparation (`bc1c534`), Buy (`cc50a14`) converted duplicate content-level H1 into H2, while retaining static hero H1; updated `.oc-real-content` CSS selector to keep size/visual style. Buy still contains a separate H1 inside its closing timeline report; assess context before changing.
- Earlier shared `assets/hero-photos.js` compact-photo patch `f54c4b0` now cache-busted on Sell (`f9bf814`), Home Valuation (`dc870ad`), Buyer Preparation (`629025c`), Sellers Guide (`999d26c`), by using `?v=20261012-compact-h1`. Remaining pages referencing old script cache may require measured updating after verification; Buy skips shared photo injector.
- Attempted public fetch for `/sell` and `/buy`; both inaccessible through web tool (DisabledError or unavailable), so no visual/cross-device/deployment certification. Do not claim successful rendering solely from GitHub commits. Full 47-page practical QA remains, while preserving approved photographs, logo, and layout.


## Nuevo Website 10 — Buy timeline table visual polish (12 Oct 2026)
- Updated `buy.html` directly, commit `b1f6075953d977d0b960ad1f6343d9a10538e433`: adds scoped presentation-only `<style id="fc-deadline-editor-polish-20261012">` for `#contract-deadline-planner .deadline-editor`. Dark navy header with gold accent, deadline/status column emphasis, subtle row zebra/hover, improved controls, keyboard focus, and mobile horizontal scrolling. Existing timeline JS, date arithmetic, input IDs, row creation, summary and email/export untouched.
- Re-fetched GitHub source: style and `deadline-editor-rows`/`deadline-results-rows` targets present. Actual browser visual/functionality regression QA is NOT verified. No HTML/photo/brand redesign.


## Nuevo Website 10 — 12 October 2026: 47-page structural SEO audit & heading fixes
- Fetched and inspected all 47 sitemap-listed HTML pages from GitHub in batches. Each has at least one nonempty static H1, a meta description, and a canonical link in the source. This is source inspection, not live rendering, and does not validate correctness of canonical targets or metadata quality in detail.
- Corrected duplicated page-level H1s by turning the secondary body heading into a styled H2 in 22 pages: buyer-closing-costs, buyer-financing-preapproval, buyer-inspections-appraisals, buyer-offers-contracts, buyer-property-search, buyer-title-financing, boca-grande, cape-haze, englewood, nokomis-casey-key, punta-gorda-isles, sarasota, venice, waterfront, seller-closing-costs, new-construction, florida-gulf-coast-condos-for-sale, florida-gulf-coast-homes-for-sale, calculators, communities, contact, investment-center. Scoped secondary-heading styles added to retain visual scale without touching existing hero photos, forms, tools, or scripts. Previously fixed Buy, Sell, Home Valuation, Buyer Preparation duplicates remain.
- Buy still has an extra H1 specifically for its generated/printable Contract Milestones Complete Report; preserve until report markup reviewed in context, avoiding accidental changes to export.
- Buy editor table received scoped CSS-only visual refinement commit `b1f6075` in the same chat; editor/results IDs remain present and JS wasn't changed. Actual interaction QA still pending.
- Remaining external QA (NOT VERIFIED): desktop/iPad/iPhone appearance, headings visibility/contrast after JS/CSS, Google Translate four languages and controls, back-to-top operation, real OneHome/SimplyBook links, email forwards, Cloudflare www-to-apex redirects, actual deploy. Cloudflare settings not accessible through GitHub. Do not claim full website completion.


## Nuevo Website 10 — final code recheck (12 October 2026)
- Re-fetched current `buy.html`, `robots.txt`, `sitemap.xml` and spot-checked Buy, Sell, Questions, Contact, Site Map, Closing Costs. Sitemap and robots do not reference obsolete pages.dev domain; selected six pages have canonical URLs on https://floridacostiera.com. All selected pages still load shared language-dropdown.js?v=20261012-backtop-approved. Buy's polished deadline editor CSS remains committed.
- Source alone cannot certify the live Cloudflare deployment, www 301 redirect, real email forwarding, Google indexing, language dropdown behavior, cross-device rendering or interactive timeline calculations. These remain launch acceptance checks, not claimed done. The user has requested complete finishing; next capable environment should conduct actual browser-based live test and Cloudflare-account checks rather than more repetitive source-only claims.
- Do not alter the independent OceanFL website, do not replace approved photographs, and do not mark any unverified item as completed. Cloudflare domain/email settings must be handled with authenticated Cloudflare access; a successful GitHub commit cannot prove them.


## Nuevo Website 10 — Buy quick navigation complete in source, 12 Oct 2026
- User asked to place section links directly below Buy photo so visitors discover resources and jump to 'Track Your Purchase from Contract to Closing'. Commit `23089e0e18159da6af50a8331dbeba069185d77b` adds elegant ivory quick-navigation row beneath Buy hero; pill links to Buyers Guide, Search Properties, Homes & Condos, Financing & Pre-Approval, Buyer Closing Costs, a highlighted in-page `#contract-deadline-planner` link, and Ask Tino button calling the existing `toggleTino()`.
- The target anchor and Ask Tino function are present in buy.html. Responsive wrap, clear focus indication and sticky-header scroll offset included. No timeline calculations or photos changed.
- Re-fetched GitHub source confirms nav, six links and Ask Tino button. Live browser rendering and actual clicks still require external QA; do not claim tested deployment.


## Nuevo Website 10 — Buy link refinement and final source checkpoint (12 Oct 2026)
- Corrected a misleading Buy quick navigation item: previously `Homes & Condos` linked only to homes. Commit `36dd2285d4aca89605065be38e3df26783948a9e` replaces it with distinct `Homes for Sale` and `Condos for Sale` links to their respective existing pages. Buy quick navigation now has seven anchors plus the Ask Tino button; prominent contract timeline jump targets existing `#contract-deadline-planner`.
- Re-fetched buy.html and confirmed quick nav targets, CSS and Ask Tino invocation remain present. No photo, calculation, timeline script or shared global components changed.
- Final acceptance remains limited by unavailable live-browser testing and absent authenticated Cloudflare controls. Must test actual layout, mobile languages, appointment, email forwarding and www redirect before declaring website fully complete. Do not call untested behavior verified.


## Nuevo Website 10 — critical hero script syntax repair, 12 Oct 2026
- Direct inspection found malformed literal concatenation in `assets/hero-photos.js` after the earlier 270/220px compact hero patch: a stray `'+` following a comment broke the JavaScript expression. Corrected source in commit `a6b1cd5720f7a92cf5166aa5902622863a6149c7`, preserving the image mapping and styling.
- Cache-busted repaired asset on Sell, Sellers Guide, Home Valuation, Buyer Preparation, Questions and Waterfront with `?v=20261012-js-repaired` so their scripts reload. Other pages that reference the shared asset may still require a coordinated cache refresh; verify before claiming all deployments.
- GitHub source recheck confirms the malformed fragment is gone and compact CSS rules persist. Interactive browser/mobile verification is still unavailable and cannot be asserted.


## Nuevo Website 10 — staged finalization / Etapa 1 started (12 Oct 2026)
- User explicitly requested five complete, user-sequenced phases, with brief description of each and no piecemeal authorizations: (1) visual design/hero/footer/table, (2) content/navigation across 47 pages, (3) tools/contact, (4) languages/SEO, (5) live deployment/Cloudflare/mobile/email acceptance. Do not advance between phases without user's next phase cue.
- Etapa 1: found shared `assets/hero-photos.js` compact CSS 220px mobile rule was overridden by a later 340px mobile media rule with important declarations; fixed cascade with a final, more-specific 220px style in commit `e7df56b7d4886a1609cd025c4c1c22231052e3fc`. Shared syntax error fixed in preceding commit a6b1cd5. Approved images and content unchanged. Live device rendering still not certified.


## ETAPA 1 — 12 Oct 2026 — 47-page source design review completed
- User-approved 5-stage plan. Stage 1 covers all pages, not only those previously mentioned; Stage 2 will add tailored intra-page and cross-page jump navigation to Sell and other relevant pages.
- Inspected all 47 sitemap-listed HTML source files in six batches: all contain a nonempty static H1. Most pages have floating Back to Top markup; Closing Costs, Investment Center, Privacy, Appointment, Site Map, Terms use varied special templates or script-injected navigation, so source substring absence must not be interpreted as broken live UI.
- Repair chain for `assets/hero-photos.js`: prior malformed JS string corrected (`a6b1cd5`); CSS order conflict causing compact headings to become 340px on mobile corrected (`e7df56b`). Updated cached `hero-photos.js` references to `?v=20261012-stage1-fixed` on all sitemap HTML pages that include that asset. Individual pages with no photo loader (Buy, Closing Costs, Investment Center, Privacy, Appointment, Site Map, Terms) left unmodified; approved Home/Buy hero images preserved. Follow-up fetches confirmed Questions and Seller Closing Costs also carry updated reference even though a batch returned a safety-check notice.
- Existing Buy quick nav and editor table refinement preserved. No new photograph assets, sitewide logo redesign, or global footer change. SEO source H1 and earlier semantic hierarchy fixes preserved.
- Stage 1 is complete at source-review and targeted-change level only. Real browser-based cross-device screenshot comparisons, interactions, loading of remote photographs, footer/back-top behavior and published Cloudflare deployment are NOT independently verified. Do not claim live QA; carry browser acceptance tests to Stage 5.
- Await user cue `Etapa 2` before changing navigation or content. OceanFL untouched.


## ETAPA 2 — navigation and content pass, 12 October 2026
- Approved plan: Stage 2 adds useful visible quick navigation without changing approved images, calculator logic or OceanFL.com (owned by Italo; never modify).
- Added hero-adjacent, mobile-responsive, accessible pill navigation links to Sell, Sellers Guide, Home Valuation, Investment Center, Buyers Guide, Buyer Preparation, Financing/Pre-Approval, Buyer Property Search, Buyer Offers/Contracts, Inspections/Appraisals, Buyer Title/Financing, Buyer Closing Costs, Communities, Waterfront, and New Construction. Existing Buy quick nav from earlier phase retained. Highlights pertinent links, targets existing internal anchors and known public pages, includes Contact when relevant.
- Sell navigation specifically links Seller's Guide, Home Valuation, pricing evidence, preparation, offer review, closing milestones, costs, contact. Anchor presence verified in GitHub source before inserting.
- Did not indiscriminately insert another navigation row on 47/47 pages: individual community and legal pages retain existing link cards/footers; avoid clutter and disruption to approved layouts. No edits to OceanFL or Q&A 1010 dataset.
- GitHub source updated and targeted items checked. Real user interaction, mobile rendering, JavaScript behavior and actual published availability still require Stage 5 live browser QA; do not call these browser-verified.


## 12 Oct 2026 — Business email contacts (approved by owner)
- Owner confirmed Italo provides technical support, advertising, photography and marketing assistance to Sabatino, but does not act as REALTOR®. OceanFL.com belongs to Italo and MUST NEVER be modified. Approved business emails for Florida Costiera: `info@floridacostiera.com` (general inquiries), `sabatino@floridacostiera.com` (REALTOR® real estate inquiries), `italo@floridacostiera.com` (Contact Italo, technical/creative services).
- Owner screenshot from Cloudflare Email Routing shows all three rules Active: info/sabatino forward to scampilii@gmail.com, Italo forwards to italo@acromatico.com. **This does NOT constitute an end-to-end delivery test or guarantee recipient verified**; confirm by sending test mail before certifying.
- Direct GitHub commit `801f7f7` added DOM-ready, accessible `fc-email-directory` to existing `footer.sc-unified-footer` and special `footer.sc-cc-footer`, three clickable mailto links, understated styling, mobile wrap. Updated shared `language-dropdown.js` cache reference to `?v=20261012-email-directory` across all **47** sitemap HTML pages to activate footer changes on cache refresh; source checked representative Home, Contact, About, Questions, Closing Costs.
- Added three purpose-specific, visible mailto contact cards on `contact.html` (commit `bf1e25e`) and `about.html` (`2f8c930`) with suitable role separation and mobile styles. Kept Sabatino as exclusively identified REALTOR® for licensed activities, Italo as technical/advertising/photography support.
- Replaced remaining direct Gmail `mailto:` for inquiry forms in Home, Contact and Questions with `mailto:sabatino@floridacostiera.com?subject=` (and About already adjusted). Note that the user's mail program must still complete sending; mailto is not a server-side web submission.
- No modification to OceanFL; no authenticated Cloudflare settings changed. Live browser and email delivery confirmation remains pending.


## 12 Oct 2026 — Refined contact presentation requested from screenshots
- Owner showed live footer where emails were too small and crammed together. Corrected centrally in assets/language-dropdown.js, commit `c972edc67`, by rendering a legible, elegant three-card contact directory (general inquiries, Sabatino as REALTOR®, Italo for technical support/advertising/photography) with navy/gold compatible styling and mobile one-column layout. No OceanFL edits.
- Added an explicit, elegant three-card contact directory on Site Map, commit `bfeb4124`. Existing dedicated contact cards on Contact and About remain.
- Bumped shared script cache on Home, About, Contact, Site Map, Buy, Sell and Closing Costs to `v=20261012-contact-cards`. Remaining pages may load revised shared asset after previous cache version expires; further coordinated bump possible if needed.
- Source changes confirmed in GitHub; screenshots / interactive live validation pending. Email forwarding routing is configured in user's screenshot, but end-to-end delivery still not independently verified.


## Nuevo Website 10 — 12 Oct 2026 — Site Map raised above email contacts
- User approved recent three-card navy/gold footer contact directory but requested Site Map elegantly higher rather than down in legal bottom strip, and useful direct email links where relevant. OceanFL.com belongs to Italo, is NOT ours, and must never be edited.
- Commit `4e7c358695ae932f0f24b40c22361b4083ac2c7f` adds footer shared DOM logic in `assets/language-dropdown.js`, relocating Site Map from lower legal section to a centered, elegant pill/link above the email card directory on all unified and special Closing Costs footers, while removing redundant Site Map links inside those footers. Legal disclosure/footer columns remain unchanged. This is runtime JS; live browser visual verification outstanding.
- Added concise context-aware mailto email links in `request-appointment.html` (`9a42f49b`) and `new-construction.html` (`b5eae3d`) for Sabatino real estate, general inquiries and Italo technical/marketing support. About and Contact already have prominent dedicated cards; shared footer carries all three emails on every page.
- Refreshed `assets/language-dropdown.js?v=20261012-sitemap-up` in all 47 sitemap HTML files to request updated shared script on deploy; sample files re-fetched to confirm. No OceanFL edit; all real-estate representation remains exclusively Sabatino Campilii, REALTOR®, LoKation® Real Estate. Cloudflare email delivery and final visual rendering remain separately unverified.


## Nuevo Website 11 — 12 Oct 2026 — Audit of duplicate standalone photos
- User supplied live screenshot of `florida-gulf-coast-homes-for-sale.html` displaying an untitled standalone image directly below the shared header, followed by the real photo hero with H1 and OneHome CTA. The first image was redundant. Removed only the matching `<div class="site-photo-wrap"><img ...></div>` from that page, commit `1204b785e976e537eb196cc8f6831ec52e04a0fd`. Re-fetched source: duplicate gone, H1 and OneHome link preserved.
- Reviewed all 47 sitemap HTML files via GitHub source fetch for `site-photo-wrap`, `site-topic-photo` and literal H1 tags. Another identical standalone-before-hero pattern was found in `florida-gulf-coast-condos-for-sale.html`; removed only that redundant block, commit `8003aba21592e8aa314a5824dfd33d9c5ca90ece`.
- Other pages with `.site-topic-photo` mostly put it inside main content following a separate page header, not in the duplicated header pattern. Do not remove those without visual context. `buy.html` has 2 H1 opening tags in source and merits a semantic follow-up review; other sitemap pages checked had 1 literal H1 each. H1 presence in markup is NOT confirmation of its visibility or position in live browser.
- These checks are static source audits, not browser visual verification; real rendered desktop/iPad/iPhone QA and public deployment checks are still necessary. Preserve approved images, global footer, OneHome, and OceanFL separation.


## Nuevo Website 11 — 12 Oct 2026 — Guides hub and Site Map updates
- Created original `guides.html` (commit `e4d561da8d2e1458f0f27a48a1e64518a885d59a`) using Florida Costiera's existing Site Map chrome, with introductory guidance cards for nine geographic communities, practical due-diligence topics, and links to each established community page. Content is newly written and is not a copy of OceanFL. OceanFL `https://oceanfl.com/guides/` and the Boca Grande causeway article were consulted as subject-matter inspiration only; DO NOT edit OceanFL.
- Added **New Construction** and **Guides** buttons to Site Map's prominent top navigation; added Community Guides in the area column (commit `ee42574cb85e16e11cc12e8a832f3efbb9286544`).
- Added `https://floridacostiera.com/guides.html` to `sitemap.xml` (commit `d4cc4254817407c644fdd5d0e7db9e4c0556cf4a`); now 48 listed URLs.
- These are code commits; live mobile/browser tests and Cloudflare deployment remain separate. New guides page is an original hub with community summaries, not yet a full independent collection of 63 long-form OceanFL-equivalent guides. Future development should prioritize well-sourced, fact-checked in-depth guides, not assume OceanFL facts automatically apply to Florida Costiera.


## Nuevo Website 11 — 12 Oct 2026 — Original community-guide content derived from public topic research
- User asked to copy OceanFL Guides to Florida Costiera and each community. OceanFL is a distinct website owned by Italo: only its public guides listing and representative Boca Grande causeway article were consulted as editorial/topic references. Do not copy the 72 source articles verbatim or imply transfer of ownership. Original Florida Costiera content is the appropriate implementation.
- Added bespoke original three-topic buyer guide sections (27 short articles across nine community pages), each marked `#fc-community-guides`, linking back to guides.html and to Sabatino's Contact page. Updated: boca-grande-florida-real-estate.html, cape-haze-placida-florida-real-estate.html, englewood-manasota-key-florida-real-estate.html, rotonda-west.html, venice-florida-real-estate.html, wellen-park-florida-real-estate.html, nokomis-casey-key-florida-real-estate.html, punta-gorda-isles-florida-real-estate.html, siesta-key-longboat-key-florida-real-estate.html. Commits: 5a9fd85, ce6306b, 535d9a5, 524cf6f, 06a01a3, 5251187, 140ed1c, 29a39de, a6981af.
- Updated guides.html to link each of its nine community cards directly to the correct `#fc-community-guides` anchor (commit b0e6a6e).
- Community content covers island access, bridge toll verification, flood/wind/condo due diligence, canal/navigation restrictions, builder contracts, comparisons of neighboring communities and typical buyer checkpoints. No changing toll price has been hardcoded. Check authoritative sources for current rates and rules.
- These are source commits, NOT evidence of deployed browser rendering. Nine community topics sets are live in source; this does NOT recreate the full 72-article OceanFL catalog. Any later deeper article expansion must use independent, fact-checked original writing and preserve site styling.


## 12 Oct 2026 — Follow-up: essential practical guidance from OceanFL topic review
- Reviewed OceanFL's public Guides index and representative community articles on Boca Grande access, Cape Haze ownership formats, Englewood vs North Port, Rotonda West vs Punta Gorda Isles, Wellen Park vs Venice, Nokomis/Casey Key vs Siesta Key and Punta Gorda canals. Used topic concepts, not verbatim copyrighted passages. OceanFL itself remains untouched.
- Expanded all NINE original Florida Costiera community-guide sections with an additional original `fc-guide-essential` buyer checklist. Covered access and GIBA toll verification; condo/HOA reserves, documents and carrying costs; mainland vs island comparisons; new-build incentives and CDD charges; permits, dock/seawall maintenance, navigable depth and actual vessel suitability; wind/flood/association due diligence. Do not hardcode changing toll figures or insurance premiums without primary-source checks.
- GitHub code for all nine pages was re-fetched and `fc-guide-essential` was present. The Punta Gorda Isles update was separately committed as `fb03a4d` after initially being absent. These remain static code checks, not live visual or device tests. No other site's content or source files were edited.


## Nuevo Website 11 — Guides discoverability fix
- User said they could not see the promised guidance in each community. Confirmed GitHub source had the `#fc-community-guides` section on nine pages, but it was placed deep in the page, and `guides.html` had summary cards only.
- Expanded `guides.html` to present the full nine community topic cards and essential buyer checklists directly on the Guides page, below the index cards. The nine index cards now link to the respective `#guide-detail-N` sections within Guides, where visitors can also open the full community page. Commit `9bb0aaf`.
- Added highly visible `Read This Community’s Essential Guide` and `Explore All Guides` quick links above `<main>` on the nine target community pages, pointing to the existing section/Guides directory. Target uses `scroll-margin-top` to prevent header overlap. Nine further GitHub commits made.
- Code implementation verified by commit results. Still requires live published and responsive checks; a change to GitHub is not proof that Cloudflare deploy and caching reflect it immediately.


## Nuevo Website 11 — Critical clarification: Guides content gap
- User correctly reports that Florida Costiera did NOT carry over the substantial article content of OceanFL's 72-guide library. Previous work comprised short original topical cards/checklists, not full detailed articles. Never claim that all OceanFL guides were migrated.
- Consulted the public OceanFL Guides index and the complete Boca Grande causeway article. Added a newly written, fact-oriented Boca Grande causeway guide inside `guides.html` with GIBA-published toll figures (dated to checked source), swing-bridge implications, seasonal-owner considerations, ownership checklist and a primary-authority link. Commit `5924439`. Linked the Boca Grande index card to this detailed article: `aea3eab`.
- Still outstanding: research and write similarly thorough original content for remaining relevant community articles, with verified primary sources where available, organized clearly and accessible directly from Guides. Do not copy OceanFL word for word or edit it. Clearly disclose that this is a partial start, not a finished migration. Cloudflare visual QA pending.


## 12 Oct 2026 — Community guides simplified per owner request
- Owner explicitly asked for only essential/logical information on each individual community page, without unnecessary length. Replaced verbose sections on all nine community URLs (Boca Grande, Cape Haze, Englewood, Rotonda West, Venice, Wellen Park, Nokomis/Casey Key, Punta Gorda Isles, Siesta Key/Longboat Key) with exactly THREE short community-specific buyer essentials, each one concise sentence or two. Preserved section anchor `#fc-community-guides`, existing community page property content, and links to Guides and Contact. Commit results verified.
- Longer explanatory material remains accessible through `guides.html`, which is separate from concise community pages. Do not reintroduce lengthy guides into the individual community pages without explicit owner approval.
- Live page/device validation outstanding; changes confirmed in GitHub source.


## Nuevo Website 11 — 12 Oct 2026 — Buyer-attraction lifestyle enhancements
- Owner clarified that concise risk/checklist information alone does not help a relocating buyer picture life in a community. Researched tourism and community sources including Visit Florida, Visit Sarasota, Venice MainStreet, Wellen Park and relevant local references.
- Added concise, original and property-neutral `#fc-community-lifestyle` section to EACH of nine official community pages above the existing three-point essentials, organized as: Why buyers love this area; life beyond the front door (attractions and amenities); who may feel at home here; and a visitor information reference link.
- Content highlights Boca Grande old-Florida village, biking and fishing; Cape Haze peninsula/island access; Englewood beach, Lemon Bay and Dearborn Street; Rotonda golf/residential character; Venice downtown, beach, Legacy Trail; Wellen Park downtown/Grand Lake/CoolToday Park; Nokomis Beach and North Jetty; Punta Gorda Isles canals/Harborwalk/Fishermen's Village; and Siesta Key vs Longboat Key lifestyles.
- All 9 commits confirmed in GitHub, existing photos and short due-diligence essentials preserved. No artificial market returns, exact commute promises, or statements of community demographic preference included. Live visual/Cloudflare browser verification outstanding.


## 12 Oct 2026 — Critical community URL mismatch fixed
- User could not see newly written lifestyle sections because `communities.html` links to shorter URLs (`boca-grande.html`, `cape-haze.html`, `englewood.html`, `venice.html`, `nokomis-casey-key.html`, `punta-gorda-isles.html`) while previous edits were made on the parallel `*-florida-real-estate.html` URLs. This mismatch was directly confirmed from actual href attributes in communities.html.
- Moved the lifestyle feature immediately below the main header/at the start of `<main>` on all nine extended community pages to improve visibility, without changing community photos or real estate links.
- Also copied the approved original buyer lifestyle feature to all six shorter community pages actually linked by Communities, retaining the original information and rest of each page. All 15 edits committed directly to GitHub. The other three destinations already pointed to the enriched pages.
- This corrects the source-level cause of content not being visible when navigating Communities. Public Cloudflare deployment and live visual testing still unverified.


## 12 Oct 2026 — Community-specific FAQ project COMPLETE in source
- Owner approved the OceanFL-inspired Q&A format: four concise, community-specific questions and original answers near top of EACH community page, focusing on lifestyle, relocation comparisons, costs/access, and buying due diligence. Do not literally copy OceanFL article text.
- Added `#fc-community-qa` with 4 Q&A cards and responsive two-column styling to 15 pages: boca-grande.html + boca-grande-florida-real-estate.html; cape-haze.html + cape-haze-placida-florida-real-estate.html; englewood.html + englewood-manasota-key-florida-real-estate.html; rotonda-west.html; venice.html + venice-florida-real-estate.html; wellen-park-florida-real-estate.html; nokomis-casey-key.html + nokomis-casey-key-florida-real-estate.html; punta-gorda-isles.html + punta-gorda-isles-florida-real-estate.html; siesta-key-longboat-key-florida-real-estate.html. Ten commits completed in preceding script before tool budget interruption and five remaining commits a3ce9dc, 470b18b, 3eda3a1, ce9734a, bb08cab completed afterward.
- Prior `#fc-community-lifestyle` features remain; FAQs follow those near the beginning of main page. All commits returned GitHub success. Live deployment/render QA not verified. Future changes should edit exact visitor-facing destination pages, not only the parallel detailed URL variants.


## 12 October 2026 — Community Q&A accordion completed
- User supplied screenshot of `questions` page showing closed question cards with a gold plus icon; requested the SAME accordion interaction on all nine community pages: tap question to expand its answer underneath.
- Converted each community-specific four-card `#fc-community-qa` section from always-visible `<article><h3><p>` to native accessible `<details class="fc-qa-item"><summary>question + gold plus/minus</summary><div class="fc-qa-answer"><p>answer</p></div></details>`, retaining original nine-community-specific question/answer content and 2-column desktop / 1-column mobile layout. Gold plus becomes minus when opened, focus-visible styling included, no JavaScript required.
- Updated FIFTEEN real and alternate URL files: boca-grande.html, boca-grande-florida-real-estate.html, cape-haze.html, cape-haze-placida-florida-real-estate.html, englewood.html, englewood-manasota-key-florida-real-estate.html, rotonda-west.html, venice.html, venice-florida-real-estate.html, wellen-park-florida-real-estate.html, nokomis-casey-key.html, nokomis-casey-key-florida-real-estate.html, punta-gorda-isles.html, punta-gorda-isles-florida-real-estate.html, siesta-key-longboat-key-florida-real-estate.html.
- All modifications committed to GitHub. Published Cloudflare behavior and responsive browser tests must still be verified; do not conflate source commit with deployment.


## 12 Oct 2026 — Expanded community relocation FAQ / OceanFL Guides reference
- User asked for many more concise expandable Q&As inspired by the public OceanFL Guides, especially schools, colleges, golf, older-adult recreation, hospitals, beaches, and facilities that buyers use to decide where to relocate.
- Each of NINE community areas now has 15 native expandable `<details class="fc-qa-item">` questions (4 previously present + 6 new local lifestyle and purchase Q&A in `#fc-community-qa-more` + 5 on education/medical/golf/beaches/recreation in `#fc-community-qa-services`). Consistent gold plus/minus accordion design, source-page wording is original, no verbatim OceanFL copying. Across 15 actual and alternate community URLs; all 15 verified by GitHub read to contain all three section IDs and 15 details cards (verification performed on 12 Oct 2026).
- Categories include county-school attendance zones (Sarasota/Charlotte, and Sarasota/Manatee for Longboat Key), nearby colleges (research geographically), current hospital/service accessibility, golf/pickleball, beach and recreation opportunities, community social/recreation programs for older adults. Avoid claiming school zones, insurance networks, exact travel time, memberships or availability without address and current-source confirmation.
- Authoritative supporting research included Sarasota County Parks and Recreation's facility listings (Englewood Sports Complex, Nokomis Community Park, Venice Community Center), Sarasota Memorial Hospital-Venice, and Senior Friendship Centers; OceanFL used for topic selection only.
- Each distinct community page now has 15 QAs; 9 x 15 = 135 distinct geographic QAs (15 URLs because some have alternate routes). Existing photos, OneHome links, Ask Tino, and site's long 1,010 Questions database preserved. Cloudflare live/browser/device QA still not confirmed.


## 12 Oct 2026 — Local amenities with named providers and cautious population figures
- User approved 8–12 more local amenities Q&A per community, naming schools, hospitals, sports, shopping, beaches, senior activities, and community population accurately. Added nine new native accessible expandable questions to EACH of nine distinct community areas, on ALL FIFTEEN actual and alternate URL pages. Anchor: `#fc-local-names`, sharing prior gold plus/minus Q&A CSS. Nine question/answer cards per URL verified by re-fetching all 15 files from GitHub.
- Facts are regionally grounded and include official or provider links within responses. Examples: Sarasota Memorial Hospital-Venice at 2600 Laurel Rd E; HCA Englewood Hospital at 700 Medical Blvd; Venice High School at 1 Indian Ave; Wellen Park High School; Charlotte County and Sarasota County public-school resources; Venice Avenue; Fishermen's Village; downtown Wellen; Lake Venice Golf Club; Rotonda golf; Englewood Sports Complex; Nokomis Community Park; senior Friendship Centers; park services. Existing 15 Q&A per community preserved: each now has 24 expandable questions, i.e. 216 distinct questions across nine communities. Do not confuse 15 URLs with 15 communities.
- Population examples only for defensible boundaries: Venice city Census 2020 25,463 / 2025 estimate 30,477; Englewood CDP 2020 20,800; Rotonda CDP 2020 10,114; Siesta Key CDP 2020 5,454. For Boca Grande, Cape Haze/Placida, Wellen Park, Nokomis/Casey Key and Punta Gorda Isles avoid guessed stand-alone figures. For Punta Gorda Isles, citywide Punta Gorda counts must not be misrepresented as neighborhood counts.
- User requested no overly long prose; answers are brief, names specific, sources linked. Official-source destinations should periodically be reviewed; external links are reference resources, and school assignment/provider coverage/actual access must be verified by property address and date. Existing OneHome, headers, photos, Ask Tino unaffected. Published Cloudflare and device visual QA not independently confirmed.


## 12 Oct 2026 — Final community page route audit and Sarasota completion
- Re-fetched actual `communities.html` and found nine real card destinations: Boca Grande, Cape Haze, Englewood, Rotonda West, Venice, Wellen Park, Nokomis & Casey Key, Punta Gorda Isles, and **Sarasota**. Earlier series of 24 FAQ sections had covered Siesta Key/Longboat Key but accidentally omitted the actual ninth Communities card Sarasota; this was a routing/content completeness gap.
- Added TWENTY accessible and responsive native `<details>` Q&A items to `sarasota.html` (`#fc-community-qa` and `#fc-local-names`) about Sarasota lifestyle, Ringling and cultural institutions, education, Sarasota Memorial Hospital campus, parks, golf, beaches, UTC/St Armands, senior programs, housing due diligence and city-versus-county population boundaries. Commit `ffec1aad`.
- Updated nine `oc-real-card` destinations in `communities.html` to point to `#fc-community-qa` on their actual community URL, commit `14c3420`. All prior community detail Q&As, existing photos/OneHome contacts etc kept unchanged.
- Source inspection established 24 accordion entries on each of the first 8 communities, and Siesta Key/Longboat Key page also has 24; Sarasota has 20. The public Communities page now links to nine completed accordion-enabled community pages, while Siesta Key/Longboat Key remains separately accessible.
- Live public website through web fetch was NOT accessible from the research tool; Cloudflare deployment and visual browser verification cannot be claimed. Where user still does not see changes, deployment/caching must be inspected directly via Work/browser or Cloudflare deployment status, rather than telling them GitHub means live published.


## 12 Oct 2026 — Consolidation of duplicated community Q&A headings and content
- User screenshot of Punta Gorda Isles identified overlap between generic 'Schools, healthcare, beaches & recreation' Q&A and later 'Local schools, hospitals, shopping and activities' Q&A. Reviewed all communities: those sections covered the same themes, not merely duplicated titles.
- On 15 main/alternate community pages, removed generic `#fc-community-qa-services` block (five redundant answers) and kept the more helpful named local-amenities block `#fc-local-names`, renamed **Local directory: schools, healthcare, shopping & recreation**. Retained gold expandable accordions, original `#fc-community-qa` and `#fc-community-qa-more` questions, population-context Q&A, and provider resource links. Removed extra duplicated population-reference cards where applicable, but kept primary population explanation.
- Re-fetched all 15 files in GitHub: removed redundant section in each, all have renamed directory and 18 or 19 expandable Q&A total (depending on population deduplication). Sarasota's independently organized 20 questions remain unchanged. Do NOT claim old 24-Q&A counts; the number was deliberately reduced to improve clarity. Confirm public Cloudflare rendering separately.


## 12 Oct 2026 — Individual source audit of community pages and link limitations
- At user's request, inspected each of SIXTEEN community HTML files individually (15 prior target and alternate URL pages plus Sarasota). Confirmed existing native expandable accordion markup: 18–19 Q&A on the 15 previously edited pages and 20 Q&A in Sarasota; confirmed unique `#fc-local-names` sections and absence of old `#fc-community-qa-services` block on the 15 pages. Inspected external reference hrefs and internal navigation hrefs in their HTML.
- Found missing provider links in Sarasota Q&A; updated Sarasota with 9 resource links to educational, hospital, golf, museum, senior programs, and shopping organizations, commit `532f2ef`.
- Public site `floridacostiera.com` and `communities.html` are inaccessible through current web retrieval, so live deployment, browser layout and every external link click could NOT be verified. Some upstream provider links including the Wellen Park High School, Sarasota Memorial Hospital Venice, and Venice Census pages loaded publicly; others including rotondagolf.com and islandschool.org failed in browser retrieval (status unresolved, NOT proof that links are broken). Do not claim every URL is valid/operational, nor deployment is confirmed. A genuine browser check in Work or user-supplied screenshots would be needed.


## 12 Oct 2026 — Retry live link verification
- Retried public access to https://floridacostiera.com/communities.html and /punta-gorda-isles.html via web tool: both remain inaccessible to the retrieval environment, so **live Cloudflare deploy/render and all clickable interactions remain unverified**. Do not claim these pages failed for ordinary visitors.
- Retried previously inaccessible external resource URLs. Verified up-to-date official home for The Island School is `https://www.islandschoolbocagrande.com/` (older `https://www.islandschool.org/` is wrong/unavailable in the retrieval tool). Fixed in `boca-grande.html` and `boca-grande-florida-real-estate.html` (commits 1d20a81, c3bc760). Verified official Rotonda Golf is `https://rotondagolf.com/` (without www), replacing `https://www.rotondagolf.com/` in rotonda-west.html (commit da97033). Sarasota Memorial Hospital–Venice contact page `https://www.smhvenice.com/Home/Contact-Us` loaded successfully and confirms 2600 Laurel Rd E, North Venice / 941-261-9000.
- Further external links were inspected in source previously; do not interpret absence of a web tool rendering result as proof a page is broken. Keep honest distinction between updated GitHub and actual Cloudflare/browser validation.


## 12 Oct 2026 — Official links recheck, ten community destinations
- User requested immediate verification of remaining official external links in community Q&A. Re-fetched actual GitHub link inventories for 10 primary pages (Boca Grande, Cape Haze, Englewood, Rotonda West, Venice, Wellen Park, Nokomis/Casey Key, Punta Gorda Isles, Siesta/Longboat, Sarasota). Re-opened individual links with public web: confirmed The Island School, Rotonda Golf, Sarasota Memorial Venice, Wellen Park school, Venice High, Charlotte County Schools, HCA Englewood Hospital, FSW, SCF, Fishermen's Village, GIBA, Charlotte County Community Services, Senior Friendship Centers, Sarasota County Schools, Wellen Park, CoolToday Park, multiple Visit Florida destinations and Venice/Englewood Census QuickFacts pages. External rendering of some government/parks pages (venicegov.com, floridastateparks.org, ci.punta-gorda.fl.us, sarasotacountyparks.com, ringling.org) returned internal errors; this is INCONCLUSIVE, not proof of broken links.
- Fixed specific cross-site reference destinations: Punta Gorda Isles and its `-florida-real-estate` alternate now use direct official FloridaHealthFinder facility search `https://quality.healthfinder.fl.gov/Facility-Search/FacilityLocateSearch?handler=AdvancedSearch` instead of generic root; Cape Haze and its alternate replace generic Visit Florida home page with relevant verified Englewood destination page. Four successful GitHub updates.
- Did not simulate every click in a live browser, and Cloudflare render remains unverified in this tool environment. Other links to source homepages are legitimate but may be improved with deeper destination research. Avoid saying 100% of external links verified when source site blocks the retrieval environment.


## PRÓXIMOS OBJETIVOS Y ETAPAS PENDIENTES — FLORIDA COSTIERA (actualizado 12 oct 2026)

**Regla de cierre:** no marcar una etapa como terminada por el solo hecho de haber hecho un commit. Separar siempre (a) comprobación de código en GitHub, (b) respuesta del enlace oficial de destino, (c) publicación en Cloudflare y (d) prueba visual/funcional del sitio publicado. Conservar las decisiones aprobadas, enlaces OneHome, Q&A, fotos, cuatro idiomas y elementos existentes. No modificar OceanFL.

### Etapa 1 — Verificación exhaustiva de enlaces oficiales de comunidades [EN PROCESO]
- Abrir y comprobar **uno por uno** los enlaces de escuelas, distritos educativos, universidades, hospitales, centros médicos, campos de golf, playas, parques, centros comerciales, actividades para adultos mayores, turismo, censos y gobierno contenidos en las 10 páginas principales (incluida Sarasota y Siesta/Longboat) y sus rutas alternativas (16 archivos de comunidades en total).
- Para cada enlace registrar: archivo, pregunta donde aparece, URL actual, destino esperado, resultado verificable, fecha, fuente oficial y acción realizada. Confirmar que el enlace llega a la institución o información concreta mencionada; evitar portales genéricos cuando exista una página oficial adecuada.
- Arreglar redirecciones antiguas, errores reales, nombres, direcciones y fuentes incongruentes. Verificar año y límites de cualquier cifra de población; no confundir ciudad, condado, CDP y urbanización. Escuela asignada, matrícula, red hospitalaria, horarios, membresías y precios siempre sujetos a dirección y confirmación vigente.
- Algunos dominios oficiales bloquean la herramienta o no muestran su página: registrar **NO VERIFICABLE DESDE ESTA HERRAMIENTA**; nunca etiquetar “roto” sin evidencia. Probar con navegador compatible cuando sea posible. Ya corregidos: The Island School, Rotonda Golf, referencia FloridaHealthFinder en Punta Gorda Isles y referencias Visit Florida en Cape Haze. Continuar con los demás.

### Etapa 2 — Rutas y funcionamiento internos [PENDIENTE DE PRUEBA EN VIVO]
- Revisar Communities → comunidad correcta → Q&A y directorio local → guías → contacto, incluyendo cada alias .html y anchors #fc-community-qa, #fc-local-names, #fc-community-lifestyle. Probar enlaces a OneHome, Search Properties, Ask Tino, Contact Sabatino, reserva SimplyBook, formularios, back-to-top y sitemap.
- Detectar y resolver destinos inconsistentes, 404, anclas tapadas por encabezados y navegación que abandone innecesariamente el sitio.

### Etapa 3 — Cloudflare y dispositivos [PENDIENTE]
- Confirmar que el último commit esté desplegado en Cloudflare y sea visible en floridacostiera.com, no solo en GitHub; revisar dominio, redirects, HTTPS, cache y versión publicada. Si una herramienta web no puede abrir el sitio, usar verificación desde navegador/Work o capturas del usuario y registrar la limitación con precisión.
- Verificar visual y funcionalmente en escritorio, iPad y móvil: encabezado, fotos, distribución, tipografía, Q&A desplegables (+/−), teléfono, selector de cuatro idiomas, menú móvil, footer y mapa del sitio. Corregir regresiones sin modificar elementos ya aprobados.

### Etapa 4 — Calidad editorial y SEO [PENDIENTE]
- Revisar todas las comunidades sin duplicar preguntas: textos persuasivos pero concisos, nombres reales cuando estén validados, información útil para compradores, enlaces a fuentes fiables y avisos de verificación solo donde correspondan.
- Confirmar títulos H1/H2, metadescripciones, canonicals, sitemap.xml, vínculos internos y páginas indexables. Evitar copiar literalmente OceanFL; contenido original basado en temas públicos y fuentes oficiales.
- Revisar traducciones visibles y experiencias en EN/ES/IT/PT, y accesibilidad de formularios y acordiones desde teclado y móvil.

### Etapa 5 — Auditoría final y entrega [PENDIENTE]
- Revisar página por página, documentar qué se comprobó realmente y guardar pendientes no verificables en PROJECT_HANDOFF.md. Solo entonces informar que la fase está cerrada. No pedir al dueño instalar HTML ni cambiar archivos manualmente: aplicar correcciones directamente mediante GitHub cuando estén soportadas.
- Lista de aceptación mínima: enlaces oficiales comprobados o claramente marcados como no verificables; rutas principales funcionales; despliegue confirmado; Q&A y estilos visualmente revisados; contenido y metadatos coherentes; sin regresiones en OneHome, Ask Tino, SimplyBook, footer o idiomas.


## ETAPA 1 — CIERRE DE LA REVISIÓN AUTOMATIZADA (12 oct 2026)
- Se inventariaron las preguntas y URL oficiales del bloque de directorio local de las diez comunidades principales (Boca Grande, Cape Haze, Englewood, Rotonda West, Venice, Wellen Park, Nokomis/Casey Key, Punta Gorda Isles, Siesta/Longboat y Sarasota), más sus páginas alternativas previamente auditadas. Cada página y sus contenidos de acordeón constan en GitHub; no confundir esto con prueba de publicación en Cloudflare.
- VERIFICADOS MEDIANTE APERTURA WEB ACTUAL: The Island School Boca Grande, Rotonda Golf, Sarasota Memorial Venice, Charlotte County Public Schools, Sarasota County Schools y escuelas Wellen Park/Venice, FloridaHealthFinder búsqueda directa, Fishermen's Village, FSW, State College of Florida, Visit Florida Boca Grande/Englewood/Venice/Nokomis/Punta Gorda/Longboat, GIBA, Gasparilla Inn, Friendship Centers, MLB CoolToday Park, Wellen Park, Charlotte County Community Services, Census QuickFacts Englewood/Venice, New College of Florida, Ringling College, Bobby Jones Golf Club, St Armands Circle y Sarasota Memorial general.
- URL NO VERIFICABLE por esta herramienta (bloqueo 403 o fallo de obtención), **sin prueba de que esté roto**: HCA Florida Englewood Hospital (su página de información en español sí apareció en la búsqueda), parques de FloridaStateParks (Gasparilla Island, Don Pedro Island y Stump Pass), SarasotaCountyParks.com, gobierno City of Venice Parks, City of Punta Gorda, The Ringling y sitios afines. Prueba manual de navegador queda como excepción declarada para Etapa 3.
- CORRECCIÓN CRÍTICA DE CONTENIDO EN SARASOTA: la sede USF Sarasota-Manatee cambió a teach-out desde 1 julio 2026 y no admite nuevos alumnos; respuesta universitaria actualizada en sarasota.html y enlace a aviso USF, commit 4df91fa. Fuente oficial https://www.usf.edu/orientation/ftic/sarasota-manatee.aspx.
- Otros arreglos recientes de URLs oficiales: Island School y Rotonda Golf, FloridaHealthFinder Punta Gorda y páginas Visit Florida de Cape Haze, registrados arriba. NO afirmar que todos los enlaces puedan abrirse en el entorno de consulta ni que se haya ejecutado cada clic en Cloudflare.
- ESTADO: inventario, apertura de los principales dominios y correcciones confirmadas en origen. Etapa 1 **completada hasta el límite de verificación automatizada**; los enlaces bloqueados quedan para comprobación con navegador real en Etapa 3. No arrastrar esto como una afirmación de validación al 100%.
- PRÓXIMA ETAPA ACTIVA: Etapa 2 — rutas internas y funcionamiento (Communities, Guides, OneHome, contacto, reservas, Q&A, Ask Tino, back-to-top, anchors y sitemap).


## 12 Oct 2026 — Etapa 2, auditoría de código de rutas y anclas (Nuevo Website 12)
- Se enumeraron **48 páginas HTML de producción** en la rama main, excluyendo los archivos de prueba y offline. Se leyeron directamente páginas principales, las diez comunidades y sus aliases, guías, compradores, vendedores, calculadoras, búsqueda, contacto, reservas, sitemap y legales.
- En las páginas examinadas no se detectaron destinos `href="#..."` sin un `id` correspondiente dentro del propio HTML. En el lote principal tampoco se encontraron rutas locales `.html` a archivos ausentes del inventario. Esta comprobación cubre enlaces HTML estáticos; no acredita rutas construidas dinámicamente con JavaScript ni pruebas con clics reales.
- Se comprobó en código que `communities.html` enlaza a nueve destinos reales con `#fc-community-qa`; las páginas de comunidad y sus alternativas contienen `#fc-community-qa`, y las nueve rutas enlazadas desde `guides.html` contienen `#fc-community-guides`. El directorio local `#fc-local-names` está presente en los destinos revisados.
- Se confirmó la existencia en origen de `contact.html#tell-us-your-plans`, `contact.html#property-preferences`, `buy.html#buyer-contract-timeline`, `buy.html#international-buyers`, `calculators.html#buyer-costs`, `investment-center.html#investment-calculator`. Las páginas de búsqueda contienen enlaces OneHome y Request Appointment conserva el enlace a SimplyBook. `communities.html` tiene función `toggleTino()` y botón Back to Top asociado a `window.scrollTo({top:0,behavior:'smooth'})`.
- Reintento de acceso público a `https://floridacostiera.com/communities.html` y `/contact.html`: la herramienta web no pudo obtener las páginas. Eso NO equivale a páginas rotas; imposibilita afirmar funcionamiento publicado o ejecución de clics/JS. Tampoco se confirmó conectividad final a servicios OneHome, Ask Tino o SimplyBook.
- **No se realizaron cambios de diseño o navegación sin errores comprobados.** Estado: examen de rutas y anclas estáticas realizado; **Etapa 2 sigue abierta** para pruebas funcionales de JavaScript, destinos externos y navegador real. Etapa 3 conserva sus pruebas de Cloudflare y dispositivos.


## NOTA DE SEGUIMIENTO — Verificación del website publicado (Etapas 3–5, 12 oct 2026)
- **Etapa 3 — PRIORIDAD:** volver a intentar acceder desde un navegador real a https://floridacostiera.com/ y a sus páginas Communities, Contact, Site Map y rutas comunitarias; si es posible, utilizar el navegador de ChatGPT Work. Comprobar también el dominio previo https://florida-real-estate.pages.dev/ para diferenciar problemas de dominio, despliegue, redirección y caché. En intentos anteriores las herramientas de consulta no lograron obtener esas páginas; **esto NO demuestra una caída del website**.
- En la misma Etapa 3, comprobar visualmente y con clics reales los menús de escritorio y móvil, idiomas EN/ES/IT/PT, botones, enlaces a OneHome, acordeones (+/−), Ask Tino, SimplyBook, formularios, footer, Site Map y Back to Top. Registrar fecha, URL probada, resultado y si se verificó desde navegador o solo desde código GitHub.
- **Etapa 4 — SEO:** cuando se recupere acceso al website público, confirmar respuestas HTTP, redirecciones, URL canónicas, sitemap.xml e indexabilidad del dominio final. No afirmar que estas pruebas están terminadas basándose solamente en archivos de GitHub.
- **Etapa 5 — CRITERIO DE CIERRE:** no declarar el proyecto totalmente probado hasta contrastar el último commit con la versión publicada en Cloudflare y finalizar la auditoría funcional y visual; si el navegador continúa inaccesible, documentar expresamente las comprobaciones pendientes en vez de atribuir sin pruebas el fallo a Cloudflare o al propio sitio.


## 12 Oct 2026 — Etapa 2: comportamiento de formularios y JavaScript
- Examinados directamente `index.html`, `communities.html`, `contact.html`, `questions.html`, `request-appointment.html`, `assets/language-dropdown.js` y `assets/site.js`.
- En Home, Communities, Contact y Questions está presente el panel Ask Tino y una función `toggleTino()` que alterna `open`; también figura un botón Back to Top con manejador `window.scrollTo({top:0,behavior:'smooth'})`. La presencia de código NO confirma que sus controles funcionen tras cargar el sitio, especialmente en móvil o con otras capas de JavaScript.
- **Hallazgo funcional que requiere atención:** los formularios HTML de Home y Contact inspeccionados interceptan `submit` y abren URLs `mailto:` con el texto preparado. Esto depende del cliente de correo configurado por el visitante y no demuestra entrega automática al destinatario ni almacenamiento en un servidor. No convertirlos a otro sistema sin seleccionar/probar un proveedor seguro; evitar que el sitio afirme erróneamente “mensaje enviado” por abrir `mailto:`.
- La página `request-appointment.html` contiene el script y configuración de widget SimplyBook y un enlace alternativo para abrir su calendario. No se ha comprobado que el widget cargue públicamente o admita reservas reales.
- `assets/language-dropdown.js` contiene lógica de menú móvil y controles de traducción y navegación; su tamaño y múltiples overrides requieren prueba en navegador antes de tocar código aprobado. No se aplicaron cambios de apariencia sin una regresión demostrada.
- Reintento de abrir `https://floridacostiera.com/contact.html` y `/communities.html` mediante herramienta web: inaccesibles a esta herramienta, no prueba de falla para visitantes. Mantener Etapa 2 **abierta** para pruebas de acciones reales y recepción de formularios, enlazadas a Etapa 3 para navegador, Cloudflare y móvil.


## 13 Oct 2026 — Etapa 2: contacto y acceso público
- Retomada la Etapa 2 desde el último commit. Inspeccionados los tres formularios de `contact.html` y el de `index.html`: ya incluyen avisos explícitos de que abren la aplicación de correo y no envían automáticamente. NO duplicar esos avisos ni anunciar envío automático. La evaluación de una integración de recepción directa queda pendiente de proveedor probado.
- Detectado un enlace directo de contacto en `contact.html` que seguía dirigiendo a la dirección particular `scampilii@gmail.com`. Cambiado exclusivamente ese enlace visible **Email Sabatino** a `mailto:sabatino@floridacostiera.com`, conservando formularios, aspecto y demás contenido. Commit `a5871a9`. Relectura de GitHub confirma el nuevo destino: SÍ.
- Reintento con consulta web a dominio principal, Contact y dominio de Cloudflare Pages: la herramienta devolvió DisabledError o fallo de accesibilidad. No equivale a sitio caído. Las pruebas de clics reales continúan pendientes para la Etapa 3.
- SEO/objetivo de marketing: priorizar marca Florida Costiera, navegación útil, información original de comunidades y posicionamiento orgánico legítimo en Etapa 4; **no se puede garantizar la primera página de Google**.


## 13 Oct 2026 — Etapa 2: diseño de formularios y cierre de revisión en origen
- Aplicado tratamiento visual coherente y acotado a `section.coast-inquiry` en `index.html`, `communities.html` y `contact.html`. Contenedor marfil, borde dorado, sombra, títulos navy, tarjetas de comunidad con estados hover/selección/foco, campos con foco visible y CTA navy. CSS identificado como `fc-inquiry-premium-20261013` agregado al final de cada página para limitar colisiones con reglas anteriores. Commits: Home `ee9013b`, Communities `340e2c7`, Contact `5207e4d`.
- Tras actualizar, se volvieron a obtener los tres archivos desde GitHub y se verificó en código la presencia de estilo nuevo, formulario `coast-lead-form` y script `coast-inquiry-script`; el funcionamiento de las acciones, accesibilidad final y maquetación no se han probado con navegador real.
- **Etapa 2: auditoría de rutas estáticas y correcciones en origen COMPLETADAS dentro de las herramientas disponibles**. Funciones interactivas, envíos reales, menú móvil, servicios externos, render responsive y coincidencia con Cloudflare quedan expresamente **SIN VERIFICACIÓN FUNCIONAL EN VIVO**, trasladados como requisitos obligatorios a Etapa 3. No afirmar que la Etapa 2 superó QA funcional de navegador ni que los formularios envían automáticamente.
- No se modificaron OceanFL, OneHome, SimplyBook, Ask Tino ni los contenidos de comunidades.


## 13 Oct 2026 — Aclaración de Closing Costs tras captura
- Usuario compartió captura de `/closing-costs` con dos tarjetas y preguntó por los cálculos aparentemente desaparecidos. Revisión del código: `closing-costs.html` es deliberadamente página de selección Buyer/Seller, según la decisión documentada el 11 octubre (no calculadora embebida). Su botón Buyer va a `calculators.html#buyer-costs` y Seller a `seller-closing-costs.html`.
- Verificado en código que `calculators.html` contiene 86 controles `input`, seis secciones (hipoteca, costos comprador, neto vendedor, affordability, préstamo comparativo y fechas) y el ancla `#buyer-costs`; `seller-closing-costs.html` contiene los controles de cálculo propios. Los archivos siguen en GitHub y el código original no está perdido.
- No alterar ni eliminar las calculadoras existentes para resolver una confusión de navegación; la experiencia pública de clics y resultados sigue pendiente de navegador en Etapa 3. Si se decide integrar calculadoras dentro de la misma página, debe hacerse sin iframes torpes ni duplicar código indiscriminadamente, y conservar enlaces actuales.


## 13 Oct 2026 — Corrección de controles del encabezado
- Capturas del usuario mostraron tamaño desigual del selector de idioma y del teléfono en cabeceras de distintas páginas, frente al aspecto compacto de Site Map. Encontradas reglas antiguas en `communities.html` que forzaban selector de 176px x 51px; otras páginas usan variantes de encabezado.
- Se añadió una única capa de ajuste visual al script compartido `assets/language-dropdown.js`: alturas compactas de 35px, selector 105px (100px en móviles), teléfono compacto, separaciones controladas, sin modificar los enlaces ni la lógica de los idiomas, búsqueda o menú. Commit `6cbcf3a`.
- Relectura de GitHub: ajuste presente SÍ. Verificación del tamaño en el sitio publicado, caché y dispositivos PENDIENTE para Etapa 3; la presencia de CSS no demuestra render correcto.


## 13 Oct 2026 — Closing Costs restored and shared header cache version updated
- User reported no visible update to header and Closing Costs. Root cause of non-visible header update could include unchanged asset URL `assets/language-dropdown.js?v=20261012-sitemap-up` remaining on pages; updated old references across the production pages to `?v=20261013-controls` to request the new shared JS from browsers/CDNs, without altering approved individual page layouts.
- Restored immediate interactive quick estimates directly to `closing-costs.html`: buyer purchase price, down-payment percentage, estimated additional closing costs, cash needed; seller sale price, mortgage payoff, negotiated commission, other estimated expenses, net proceeds. Retained links to full buyer and seller calculators, with approximate-figure disclosures. Commit `3b6be4c`.
- Re-read GitHub files and confirmed both new inline calculator forms and fresh header script references on Closing Costs, Site Map and Communities. This is **code verification** only: Cloudflare deployment, JavaScript execution and rendered styles await live browser QA; do not claim visible deployment without checking.
- Note: Closing Costs quick calculator is deliberately less detailed than existing `calculators.html#buyer-costs` and `seller-closing-costs.html`; it does not replace either detailed tool. Plan subsequent reconciliation of estimated line items before declaring financial calculator accuracy final.


## 13 Oct 2026 — Corrección de regresión no aprobada en Closing Costs
- Usuario rechazó con captura el agregado del 13 octubre de calculadoras rápidas Buyer/Seller en `closing-costs.html`, porque no corresponden a los cálculos detallados aprobados y generaron repetición y estimaciones sin suficiente desglose. Se eliminaron completamente el HTML, CSS y JavaScript del bloque `fc-close-live` añadido previamente; se restituyó exactamente el cuerpo previo de la página selectora, conservando el ajuste de versión del JS compartido para el encabezado. Commit `2ec6e35`.
- Se identificó en `site-map.html` un duplicado real de enlaces consecutivos 'Buyer Closing Costs' y 'Seller Closing Costs' dentro de 'Calculators & Answers'. Se eliminó solamente la segunda pareja, dejando los enlaces funcionales a `calculators.html#buyer-costs` y `seller-closing-costs.html`. Commit `a8091b2`.
- Confirmado en código tras cambios: los dos botones de `closing-costs.html` permanecen, el bloque rápido improvisado ya no existe, y las herramientas detalladas todavía están en `calculators.html` y `seller-closing-costs.html`. El comportamiento real en Cloudflare requiere comprobación independiente.
- **Pendiente:** estudiar con usuario la presentación exactamente aprobada de Closing Costs durante Websites 9–11, sin asumir autorización para añadir nuevas fórmulas ni duplicar las calculadoras. Prioridad de calidad: cálculos precisos y suficientemente desglosados, no estimaciones genéricas.


## 13 Oct 2026 — Encabezados especiales Closing Costs y Site Map
- Captura del usuario muestra que Closing Costs mantiene una cabecera heredada diferente de páginas principales; Site Map y páginas legales/cita tienen plantillas de encabezado especiales. Su estructura HTML no coincide con Home/Communities, lo que explica tamaños, controles y alineación inconsistentes. La corrección de solo 105x35 en selector no podía igualarlas por completo.
- Se añadió estilo acotado en `assets/language-dropdown.js` (`fc-special-header-alignment`) para armonizar alto de 76px, selector de idiomas y su menú del mismo ancho, teléfono compacto, espaciado y control de menú en Closing Costs y Site Map sin modificar contenido de calculadoras ni Site Map. Commit `99d4033`.
- Se actualizó la URL con versión nueva `?v=20261013-special-header` en Closing Costs, Site Map, Privacy, Terms y Request Appointment para no recuperar desde caché el script anterior; se añadió en Closing Costs el control de búsqueda visible que enlaza a `search-properties.html`, commit `cf0567f`.
- Relectura del código confirma: Closing Costs conserva el enlace a calculadora Buyer y Seller y añade búsqueda, Site Map conserva navegación. **PRUEBA REAL de rendering y funcionamiento de idiomas, menú, teléfono y búsqueda sigue pendiente en navegador/Cloudflare**. No afirmar uniformidad visual perfecta hasta verificarla.


## 13 Oct 2026 — Unificación adicional del encabezado y guía Closing Costs
- El usuario exigió un único tratamiento visual del encabezado en todas las páginas y contenido sustantivo en Closing Costs, sin duplicaciones. La lógica global existente para Home y páginas `oc-top` se conserva; se agregó adaptación de imagen y nombre Florida Costiera para plantillas especiales `sc-cc-header`, `sc-sitemap-header`, `sc-booking-header`, `sc-legal-header`, mediante `assets/language-dropdown.js`, commit `90c6b9e`. Las cinco páginas de plantillas especiales tienen un nuevo identificador de caché para el script, sin reemplazar las funciones de la página.
- `closing-costs.html` recibió guía original con desglose conceptual de gastos de compradores y vendedores, cinco preguntas frecuentes sobre distribución de gastos, compras en efectivo, seguros costeros y documentación final, y vínculos a guías; no se añadieron fórmulas simplificadas ni se replicaron las calculadoras detalladas. Commit `35293c1`.
- Verificación estática: hay contenido nuevo en Closing Costs, el CSS/JS de identidad compartida existe y el bloque improvisado `fc-close-buyer` NO existe. Confirmación visual efectiva en Cloudflare y pruebas reales de controles siguen sin verificarse desde este entorno. No afirmar que todas las páginas se vean idénticas sin prueba de navegador.


## 13 Oct 2026 — Ajuste final de iconos y controles del encabezado
- Unificados específicamente el selector English/Español/Italiano/Português y los controles de teléfono, búsqueda y menú de las plantillas especiales Closing Costs, Site Map, Privacy, Terms y Request Appointment. Se aplica el mismo alto de 36px, fondo navy, borde fino, radio discreto, ancho del idioma de 108px (incluido desplegable) y teléfono compacto en móvil. CSS compartido `fc-special-controls-final` agregado a `assets/language-dropdown.js`, commit `3966fe6`.
- Actualizadas las cinco páginas a `assets/language-dropdown.js?v=20261013-final-controls` para invalidación de caché. Relectura de GitHub confirma referencias nuevas en Closing Costs y Site Map. La comprobación visual de Cloudflare y de cada dispositivo continúa pendiente; no afirmar visualización en vivo.


## 13 Oct 2026 — New Construction: selector de ZIP ya no envía a Contact
- El selector principal de `new-construction.html` estaba configurado intencionalmente para dirigir TODOS los ZIP y ciudades a `contact.html#tell-us-your-plans` mediante JavaScript y sessionStorage, en vez de buscar listados. Se cambió para abrir resultados de viviendas de construcción nueva por ciudad/ZIP en Realtor.com, y se corrigió la descripción del buscador para informar que sale a un proveedor externo. Se conservan por ahora los enlaces de las tarjetas de comunidades hacia el formulario para consultas personales. Commit `8700772`.
- Comprobado el cambio en el código de GitHub; la compatibilidad de cada URL de ciudad y ZIP de Realtor.com, así como la disponibilidad actual de viviendas y la navegación efectiva, requieren prueba manual en navegador. El filtro `shw-nc` existe en rutas públicas del portal pero no se obtuvo una respuesta automatizada concluyente para el ZIP 33920. No afirmar que se han comprobado todos los resultados.


## 13 Oct 2026 — New Construction: tarjetas y ZIP individuales
- Capturas del usuario revelaron que, aunque el buscador superior se cambió, TODAS las tarjetas por localidad y los 17 enlaces ZIP seguían dirigiendo a Contact con idéntico formulario. Se han sustituido esas rutas: 15 tarjetas de comunidades y 17 enlaces ZIP pasan a URLs de búsqueda de obra nueva por ubicación en Realtor.com (formato `/realestateandhomes-search/<ciudad-o-ZIP>/shw-nc`). Texto visible ahora indica "View new homes" en vez de "Ask about new homes". Commit `4eb432b`.
- Verificación en código: 15 tarjetas externas y 0 accesos ZIP externos. No duplicar Contact como resultado de buscar vivienda; Contact permanece en la navegación para asesoramiento personalizado.
- **Importante:** aún no se han verificado en navegador los 32 destinos externos ni si los filtros producen inventario real; no declarar sus resultados correctos hasta las pruebas en vivo de Etapa 3. Mantener posibilidad de sustituir el proveedor por búsqueda MLS/OneHome específica de obra nueva si se obtiene una URL verificable por ubicación.


## 13 Oct 2026 — Encabezado transparente definitivo en todas las páginas
- Referencia aprobada: segunda captura de las 9:05 AM. El idioma seleccionado y el teléfono deben verse en blanco, negrita y SIN pastillas/recuadros azules; la búsqueda y el menú permanecen blancos y alineados. El menú DESPLEGADO sí mantiene fondo azul. Regla de acabado compartida `fc-transparent-controls-20261013`, commit `c2184a8`.
- Se actualizó el parámetro de versión del script compartido a `?v=20261013-transparent-global` en las 48 páginas HTML de producción, incluidas comunidades, guías, herramientas y páginas especiales. Confirmación por relectura de muestra: Home, Site Map, Closing Costs, Communities, New Construction y Questions. No modificar el diseño sin evidencia.
- Pruebas visuales de Cloudflare e iPhone siguen pendientes: GitHub y actualización del parámetro de caché no acreditan por sí solos que todos los navegadores hayan recibido el despliegue.


## 13 Oct 2026 — Inicio Etapa 4: SEO y accesibilidad
- Etapa 3 conserva la validación visual pendiente en Cloudflare: en particular el encabezado derecho aprobado (idioma/teléfono blancos en negrita sin recuadros) en todos los dispositivos. Las herramientas actuales no certifican funcionamiento público.
- Inicio de Etapa 4: inspección de `robots.txt`, `sitemap.xml`, Home, About, Buy, Sell, Search Properties, Communities, Guides, Site Map, Contact, Calculators y New Construction. `robots.txt` anuncia `https://floridacostiera.com/sitemap.xml`, y el sitemap contiene 47 rutas HTML sin rutas repetidas. Las diez páginas principales examinadas tienen title, descripción y canonical. Las variantes de comunidad vistas usan canonical autorreferencial; antes de consolidar alguna, comparar contenido y rutas para evitar eliminar páginas útiles.
- Error verificado: `buy.html` contenía dos etiquetas H1 (Buy a Home y Buyer Contract Milestones — Complete Report). El encabezado del informe se cambió a H2, conservando texto y funcionalidad. Commit `9d88075`; relectura de GitHub: 0 H1.
- Etapa 4 permanece en proceso para el resto de páginas: estructura H1/H2, duplicidad semántica, traducciones EN/ES/IT/PT, accesibilidad y comprobación de publicación/indexación real; sin prometer clasificación en Google.


## 13 Oct 2026 — Aviso global de enlaces externos
- A petición del usuario se creó un aviso en los enlaces HTTP(S) hacia dominios externos a Florida Costiera: al pasar el cursor o acceder mediante teclado, aparece un tooltip navy con borde dorado que advierte que se abrirá un website externo en pestaña nueva. Los enlaces externos llevan `target=_blank` y `rel=noopener noreferrer`; no se alteran enlaces internos, `tel:` o `mailto:`. Incluye enlace añadido dinámicamente mediante MutationObserver. Script compartido en `assets/language-dropdown.js`, commit `6367812`.
- Se actualizó la versión del script a `?v=20261013-external-notice` en **48 páginas HTML de producción**; incluidas 10 comunidades y páginas alternativas, guías, herramientas, Contact y Site Map. El usuario confirmó visualmente que el aviso se ve bonito en su navegador. Verificación automática integral de 48 navegaciones y accesibilidad real en móviles sigue pendiente en Etapa 3.
- Etapa 3 sigue abierta para comprobar consistencia visual del header derecho, menús/idiomas/teléfono, formularios y Cloudflare. Proseguir trabajos de contenido/SEO sin confundirlos con pruebas publicadas.


## 13 Oct 2026 — Etapa 3: auditoría de formularios
- Inspeccionados Home, Contact, Buy y Sell. Los formularios `lead-form`, `private-list-form` y `coast-lead-form` tienen manejadores `submit` que elaboran un enlace `mailto:`; no transmiten datos a un servidor ni garantizan envío automático. Se agrega aviso junto a cada formulario pertinente para que el visitante sepa que debe completar el envío desde su aplicación de correo. Commits: Contact `8d58255`, Home `e27d1ce`, Buy `0833da5`, Sell `8b55036`.
- Los anclajes `#tell-us-your-plans` y `#property-preferences` sí existen en Contact. No se ha verificado el funcionamiento del correo externo ni la apariencia en Cloudflare; quedan pendientes pruebas en navegador y auditoría integral de enlaces.


## 13 Oct 2026 — Etapa 3: revisión adicional de navegación
- Auditados `href` internos de Home, Contact, Buy, Sell, Site Map, Closing Costs y Search Properties. Se verificó en GitHub que los destinos HTML de las rutas antiguas y principales inspeccionadas existen: Boca Grande, Cape Haze, Englewood, Venice, Nokomis, Punta Gorda Isles, Buyer Closing Costs, Buyer Property Search, Siesta Key/Longboat Key y Gulf Coast Homes for Sale.
- Confirmados los ID de los destinos con `#` de los enlaces relevantes de Sell, Buy, Sellers Guide, Home Valuation, Seller Closing Costs, Calculators e Investment Center. En Site Map `href="#"` de Back to Top es navegación deliberada, no ruta rota.
- Esta auditoría solo comprueba fuente y rutas seleccionadas, NO implica comprobación exhaustiva de todos los enlaces ni funcionamiento en vivo Cloudflare. Etapa 3 todavía abierta para navegación efectiva y formularios en navegador.


## 13 Oct 2026 — Etapa 3: botón de menú Site Map
- Detectado error concreto en `site-map.html`: el botón de tres rayas tenía `onclick` para volver al elemento `#top` (encabezado de contenido), en vez de mostrar navegación; desde arriba no hacía nada útil. Ahora al pulsarlo se desplaza suavemente a `nav.primary`, donde se encuentran los enlaces de navegación del mapa del sitio. Commit `5dcebdc`.
- Revisadas estructuras de encabezado de Home, Site Map y Closing Costs; Closing Costs enlaza su menú a `site-map.html`. La comprobación de interacción real en Cloudflare y móviles continúa pendiente.


## 13 Oct 2026 — Etapa 3: navegación móvil y accesibilidad
- Se verificaron los controles de menú de las páginas especiales Privacy, Terms, Request Appointment, Site Map y Closing Costs. En las primeras tres y Closing Costs, el menú enlaza al Site Map. En Site Map se verificó el destino `nav.primary` existente con diseño responsivo de 4, 3 y 2 columnas.
- Mejora real: el botón de menú del Site Map ahora enfoca la navegación para teclado/lectores de pantalla y respeta `prefers-reduced-motion`. Commit `3151681`.
- Pendiente: prueba visual/publicada en iPhone, iPad y Cloudflare; ningún test de código demuestra por sí solo funcionamiento visual.


## 2026-10-13 — Sitewide canonical header consolidation

- Canonical runtime header source: `assets/language-dropdown.js`, block `Florida Costiera canonical header` (`fc-one-header`). It replaces the rendered header on pages using `site-header`, `oc-top`, `sc-sitemap-header`, `sc-cc-header`, `sc-booking-header`, or `sc-legal-header`. This is one rendered component, one layout/typography/background/menu implementation and one clickable language/search/phone/menu rail.
- All 48 HTML pages named in `sitemap.xml` were checked for the cache-busted `language-dropdown.js?v=20261013-single-header-final` reference and a recognized source header; all passed source checks. Source HTML still contains legacy header markup as a bootstrap/mount target; old structural markup is replaced at runtime. Do not add page-specific header overrides.
- Desktop target 94 px high, mobile 82 px, sunset image, Home-style logo/font, white right controls. Menu panel has global links; search links to search-properties; phone tel:+19412704877; existing language widget is transplanted.
- Live browser/Cloudflare visual and interaction verification remains NOT DONE, including tablet/mobile, language dropdown, search, menu and source page layout. Avoid describing as visually verified until confirmed. Check `buy.html` body/hero column width separately: screenshot previously showed only half-width content and grey blank area; it is not necessarily a header problem.
- Previous layering of header CSS caused regressions. Consolidate/remove unused legacy markup and CSS in a separate tested phase rather than reintroducing global style overrides.


## Nuevo Website 14 — 13 Oct 2026 — diagnóstico y corrección acotada del logotipo
- Se confirmó por lectura de GitHub que el logo Home se generaba con el bloque `fc-shared-header` dentro de `assets/language-dropdown.js`, pero Site Map recibía después un segundo reemplazo `fc-special-identity-20261013`; Closing Costs también recibía esa identidad especial con marca de 43 px y tipografía distinta. Son dos implementaciones que compiten.
- Commit `14a0d7f`: ampliado el encabezado visual compartido `fc-ready` a `sc-cc-header`, `sc-booking-header`, `sc-legal-header`, además de Home, Buy/Sell y Site Map. El reemplazo posterior especial se omite cuando ese encabezado ya está inicializado. Se conserva markup de herramientas originales, footer y contenido de páginas. Se comparte ahora el SVG, tipografía de marca y dimensiones CSS del encabezado principal; NO se reinstaló `fc-one-header` retirado.
- Confirmado estáticamente en el repositorio que ambas modificaciones están presentes. **Sin comprobación visual real** de Cloudflare, iPhone, iPad, idiomas o distribución final. No afirmar que el logo o todos los controles se ven correctos hasta la prueba publicada. Persisten reglas CSS históricas potencialmente contradictorias.
- Últimos commits del mismo día previos a la intervención incluyeron `d3972c4` (Buy width), `e853426` y `ff32fd2` (espacios superiores Buy/Sell). Son cambios existentes; no se alteraron aquí. Verificar todavía Buy y Sell publicados, especialmente anchura de contenido.
- Intento de lectura pública por web de `/site-map`, `/closing-costs` y `/buy` no accesible por la herramienta de navegación; no es prueba de sitio caído.
- Siguiente: comprobar cabecera y marca en Home, Site Map, Closing Costs, Buy y Sell en navegador real; después eliminar estilos de header redundantes en etapas, con pruebas y reversión.


## Nuevo Website 14 — 13 Oct 2026 — sustitución REAL del HTML de Site Map y Closing Costs
- Usuario confirmó con capturas del sitio que ambas páginas mantenían logos/tipografías distintas de Home; la anterior modificación a CSS/JS compartido no había unificado la estructura. Esta vez se reemplazó físicamente el elemento <header> en `site-map.html` y `closing-costs.html` por el esqueleto `site-header > header-inner > brand + header-tools` tomado de `index.html`.
- Ambas páginas contienen exactamente la misma estructura y contenido de encabezado, con la marca, selector de idiomas `oc-lang-static`, enlace a Search Properties y botón de menú; el script global `assets/language-dropdown.js` continúa encargándose del logo de Florida Costiera y la inyección del teléfono para `site-header`.
- Nuevos recursos: `assets/fc-canonical-header.css` para dimensionamiento del layout compartido de las dos páginas; `assets/fc-canonical-header-menu.js` para abrir/cerrar menú con enlaces reales, Escape, clic fuera y atributo aria-expanded. Esto evita que las reglas antiguas dirigidas a `sc-sitemap-header` o `sc-cc-header` afecten el encabezado nuevo.
- Commits CSS `4d7924a`, menú `1ae880a`, Site Map `2e943b6`, Closing Costs `896bbf3`. Verificación estática posterior: ambas cabeceras HTML idénticas, una selección `oc-lang-static` por página; se mantienen las secciones inferiores. No se han cambiado las calculadoras, fotografía de Closing Costs, ni la cuadrícula de Site Map.
- El Home no se modificó. **Importante:** la hoja CSS compartida nueva se utiliza en ambas páginas especiales, Home usa todavía sus propios estilos de layout. Por tanto esto unifica el HTML de las dos páginas y reutiliza el render del logo de Home, pero todavía NO es una arquitectura de un único archivo HTML de encabezado para todas las páginas del sitio. No declararlo así.
- Falta prueba REAL de renderizado en Cloudflare, teléfono/idiomas y menú desde computador/iPhone/iPad. Los commits GitHub no garantizan despliegue ni apariencia, y podrían existir scripts heredados de Site Map con dependencias sobre los botones viejos; deben comprobarse. Una vez verificado el resultado, depurar estilos heredados no usados sin afectar contenido.


## Website 14 — comprobación estructural Buy/Sell, 13 octubre 2026
- Se revisaron los HTML actuales de Buy y Sell tras las correcciones de anchura y desplazamiento superior. Buy mantiene `fc-buy-viewport-repair-20261013`, la regla de ancho completo del hero y navegación, un único `<main>` y un footer; Sell mantiene un único `<main>` y footer. Ambos contienen compensación del encabezado fijo (94 px escritorio, 82 px móvil).
- Se verificó directamente en archivos del repositorio que las cabeceras actuales de Site Map y Closing Costs contienen HTML idéntico y sus recursos comunes. Home no fue alterado.
- Se añadió `scripts/check-website14.mjs`, revisión estructural ejecutable con Node para prevenir regresiones de encabezados, contenido de Buy/Sell y recursos compartidos. Commit `a36cfdba`. Se comprobaron sus invariantes principales contra el contenido GitHub; **NO se ha ejecutado el archivo Node en un runner ni una prueba de navegador**.
- Pendiente crítico: comprobación visual real de ancho Buy/Sell, espaciados, idioma, menús y dispositivos. Evitar nuevos cambios de layout sin evidencia, dado el historial de regresiones.


## Website 14 — cinta de localidades en Communities (13 Oct 2026)
- A petición del usuario se reutilizó exactamente el mismo marcado de la cinta automática de localidades aprobado en Home en `communities.html`, debajo del hero y antes de `fc-section-navigation`.
- Color navy/dorado, secuencia de 9 localidades y desplazamiento lineal continuo de 60 s; se incluye respeto a `prefers-reduced-motion`. Estilos específicos `fc-communities-coast-ribbon`; no se modificó Home ni su cinta/carrusel.
- Commit `cf7d229a`. Relectura posterior GitHub verificó una única cinta en cada página, HTML de cinta idéntico y posición en Communities. Pendiente verificar movimiento y responsive en navegador/Cloudflare (inspección de código no es QA visual).
- Próximas tareas por orden: revisión de navegación/enlaces e idiomas; comprobación de formularios, calculadoras y Ask Tino; SEO/accesibilidad; validación visual móvil de páginas principales y comunidades.


## Website 14 — revisión de idioma y navegación, 13 Oct 2026
- Auditoría del código fuente de Home, Communities, Buy, Sell, Contact, Site Map y Closing Costs: las siete páginas ofrecen English, Español, Italiano y Português y cargan el script de identidad/selector compartido.
- Error comprobado: Closing Costs mostraba selector EN/ES/IT/PT pero no incluía Google Translate ni controlador de cambio, a diferencia de Site Map. Se conectó el selector a Google Translate conservando preferencia local y cookie de idioma, sin cambiar encabezado ni calculadoras. Commit `0131d98`.
- Verificación estática: Closing Costs conserva encabezado compartido, enlace a las dos calculadoras y nuevo inicializador de idioma. Traducción real y menús de todas las páginas requieren prueba en navegador (servicio externo y despliegue Cloudflare no verificados).


## Website 14 — auditoría parcial de formularios, calculadoras y Ask Tino (13 Oct 2026)
- Comprobados por lectura de código Home, Buy, Sell, Contact, Calculators, Seller Closing Costs, Investment Center y script global de idiomas. Los manejadores de Ask Tino (`toggleTino`, `sendTino`) y su panel existen en las seis páginas principales examinadas; esto no certifica respuesta del servicio externo.
- Verificada existencia de los destinos `calculators.html#buyer-costs` e `investment-center.html#investment-calculator`. Los formularios de contacto previamente documentados utilizan `mailto:` y requieren una aplicación de correo; no se representan como envíos automáticos a un servidor.
- Se amplió `scripts/check-website14.mjs` para vigilar ambos destinos de calculadoras y la estructura de Ask Tino en seis páginas. Commit `ab88c3d`. Validación estática de condiciones comprobada por relectura de archivos; la ejecución mediante Node y las pruebas funcionales reales aún están pendientes.
- No se modificaron fórmulas, interfaces, fotografías ni formularios. Pendiente revisión de cálculos reales, correo, conectividad de Ask Tino y verificación en Cloudflare y móviles.


## Website 14 — SEO y accesibilidad, 13 Oct 2026
- Auditado el código fuente de once páginas principales: Home, Buy, Sell, Communities, Contact, Site Map, Closing Costs, Calculators, Investment Center, New Construction y About. Cada una tiene un H1, título, descripción meta y canonical; las etiquetas img examinadas tienen atributo alt. Las cinco descripciones que inicialmente parecían faltar tienen orden de atributos `content` antes de `name`, por lo que NO estaban ausentes.
- Mejoradas únicamente las descripciones SEO excesivamente genéricas en Buy, Sell y Communities con información específica sobre áreas y servicios. Commits: Buy `8f828fd`, Sell `bcccb39`, Communities `e0fe17b`. No se alteró HTML visual, encabezados, fotos ni herramientas.
- Site Map contiene un enlace `href="#"` correspondiente a Back to Top; no se considera automáticamente roto. Faltan revisión integral de destinos y prueba funcional en navegador, accesibilidad de teclado/idiomas, validación SEO publicada e indexación real de Google.


## Website 14 — auditoría de enlaces y accesibilidad (13 Oct 2026)
- Se revisaron mediante lectura de GitHub 12 páginas: Home, Buy, Sell, Communities, Site Map, Closing Costs, Boca Grande, Cape Haze, Englewood, Rotonda West, Venice y Sarasota. No se detectaron referencias a archivos HTML inexistentes en los enlaces internos relativos examinados. También se analizaron las referencias `#sección` dentro de esas páginas sin detectar destinos ausentes en esta muestra.
- Incorporada al archivo `scripts/check-website14.mjs` una comprobación de todos los HTML de producción para verificar enlaces relativos a `.html` y anclas de la misma página; excluye la hoja offline y la página de demostración. Commit `807ecf4`. **El script no ha sido ejecutado en Node/CI**, por lo que su resultado integral aún no está validado; los enlaces externos, la navegación JS y el funcionamiento del navegador tampoco están comprobados.
- No se alteró el diseño, contenido ni el encabezado aprobado. Próximo: ejecutar pruebas automáticas en CI o entorno Node, resolver fallos concretos si los hubiera y validar navegación con navegador real y dispositivos móviles.


## Website 14 — comunidades y enlaces, continuación 13 Oct 2026
- Se leyeron directamente 16 páginas de comunidades y variantes (Boca Grande, Cape Haze/Placida, Englewood/Manasota Key, Rotonda West, Venice, Wellen Park, Nokomis/Casey Key, Punta Gorda Isles, Sarasota y Siesta/Longboat). Se cotejaron 945 enlaces HTML relativos contra los nombres reales de los archivos de producción; **no se encontraron destinos `.html` ausentes**. Tampoco se detectaron anclas rotas de la misma página en esa muestra.
- Se examinaron enlaces externos de una segunda muestra de ocho comunidades, con 35 dominios distintos; son principalmente Visit Florida, Census, escuelas, hospitales, parques, instituciones locales, OneHome, LoKation y Acromatico. Esta cuenta no confirma que todas las URLs externas respondan ni que cada contenido siga vigente.
- No se modificó diseño ni contenidos porque no se detectó una rotura local verificable. Pendiente: verificar externamente los URLs críticos uno por uno, navegación JavaScript, Chrome/Safari en escritorio y móvil y despliegue Cloudflare. Continuar luego con pruebas reales de formularios y herramientas antes de dar sitio por completado.


## Website 14 — comprobación directa parcial de enlaces externos (13 Oct 2026)
- Se intentó abrir directamente una primera tanda de diez destinos externos presentes en las páginas de comunidades: Visit Florida Boca Grande, Gasparilla Island State Park, The Island School, HCA Englewood Hospital, City of Punta Gorda, Census data, City of Venice, Wellen Park, Charlotte County y Sarasota County Schools.
- Cargaron y mostraron contenido correspondiente: Visit Florida Boca Grande, The Island School, Wellen Park, Charlotte County y Sarasota County Schools. Census data mostró página que requiere JavaScript: dominio accesible pero contenido no comprobable en el navegador textual.
- El acceso automatizado no pudo confirmar Gasparilla Island State Park, HCA Englewood Hospital y City of Punta Gorda (error de lectura), ni City of Venice (403 a la herramienta). Estos resultados **no prueban que los enlaces sean inválidos**, y no justifican sustituir URLs oficiales. Se mantienen los enlaces actuales.
- No se modificó contenido o diseño; pendiente prueba en Chrome/Safari real de los destinos no comprobados y funcionamiento de menús, formularios, calculadoras, Ask Tino y navegación móvil. Esta etapa es una verificación parcial, no una auditoría completa de los 35 dominios.


## Website 14 — enlaces oficiales, segundo intento de verificación (13 Oct 2026)
- La búsqueda web localizó la ficha oficial publicada de Gasparilla Island State Park (`floridastateparks.org/parks-and-trails/gasparilla-island-state-park`), páginas oficiales de HCA Florida Englewood Hospital bajo `hcafloridahealthcare.com/locations/englewood-hospital/` y la sección oficial del gobierno de Punta Gorda `ci.punta-gorda.fl.us/government`. No se sustituyen los enlaces del sitio, porque la evidencia disponible no confirma que las direcciones originales sean incorrectas.
- La apertura directa de algunas webs sigue devolviendo 403 al acceso automatizado, aunque motores de búsqueda muestran contenido indexado. Distinguir entre bloqueo de rastreo y enlace roto.
- La revisión visual funcional de Cloudflare, móviles, formularios y calculadoras sigue pendiente y no puede darse por completada con esta comprobación de fuentes.


## Website 14 — GitHub Actions structural QA (13 Oct 2026)
- Se creó `.github/workflows/florida-costiera-qa.yml` (commit `dd54070`) para ejecutar `node scripts/check-website14.mjs` automáticamente al modificar HTML, el script o el workflow en la rama main, y admitir `workflow_dispatch`.
- Incluye verificación estática de estructura de cabeceras, anclas, rutas HTML relativas y wiring de Ask Tino; no prueba cálculo numérico, integraciones externas, diseño visual ni comportamiento móvil.
- **Pendiente:** confirmar que GitHub Actions tenga permisos/habilitación y que el primer workflow pase. La consulta de ejecuciones no estuvo disponible mediante la conexión, por lo que no se afirma resultado positivo. Si falla, corregir el script o enlaces rotos reales sin alterar diseño aprobado.


## Website 14 — QA reforzado (13 Oct 2026)
- Se consultó la ejecución asociada al commit creador de GitHub Actions, pero el conector solo permite recuperar carreras de tipo pull request; devolvió cero registros y NO prueba que la ejecución `push` haya funcionado o fallado.
- Se releyeron ocho páginas representativas (Home, Buy, Sell, Communities, Contact, Site Map, Closing Costs y Calculators): ningún enlace `target=_blank` sin atributo `rel` y ningún botón vacío sin nombre accesible aparente en esa muestra. Se verificaron condiciones estructurales de cabeceras y cuerpo previamente usadas por el script.
- El archivo `scripts/check-website14.mjs` ahora revisa también que enlaces abiertos en nueva pestaña tengan atributo `rel` (commit final `e3e117d`). No sustituye la comprobación HTTP de URLs externas ni prueba visual/funcional. No se alteró el sitio visible.
- Sigue pendiente verificar el estado real del workflow en GitHub Actions y ejecutar las pruebas de navegación, idiomas, calculadoras, formularios y Ask Tino en navegador.


## Website 14 — revisión de formularios y calculadoras, 13 Oct 2026
- Revisión de `calculators.html`, `seller-closing-costs.html`, `contact.html`: estructura de formularios, funciones JS de calculadora, envío de Ask Tino y destinos `mailto:`. Se comprobó que las herramientas del sitio están conectadas en el código, pero NO se realizaron pruebas con navegador de cálculo o entrega de mensajes.
- Hallazgo concreto corregido: formulario general `coast-lead-form` de `calculators.html` apuntaba a `scampilii@gmail.com`, mientras que Contact utiliza el correo oficial `sabatino@floridacostiera.com`. Ahora Calculators usa el destino oficial. Commit `121aaeba`. No se alteraron fórmulas, campos ni diseño.
- Ojo: los formularios `mailto:` ABREN la aplicación de correo del visitante; no entregan mensajes automáticamente. No prometer confirmación de envío desde la web sin servicio backend.
- Confirmados en Calculators los seis anclajes de herramientas: mortgage, buyer-costs, seller-net, affordability, loans, dates. Pendiente ejecutar pruebas numéricas y de navegación con navegador real, y verificar respuesta de Ask Tino externamente.


## Website 14 — comprobación numérica inicial de la hipoteca (13 Oct 2026)
- Se revisó el algoritmo de mensualidad hipotecaria en `calculators.html`: el cálculo `p*m/(1-(1+m)^(-N))` podía producir `Infinity` si el plazo introducido era cero y la tasa mayor que cero (N=0). Se añadió protección para capital <=0 o plazo <=0, devolviendo cero en ese caso; se mantuvo fórmula normal y rama de tasa cero. Commit `8ca6546`.
- Se verificó la aritmética de la nueva función con: capital 300000, APR 6.5 %, plazo 30 años = $1,896.20/mes; capital 120000, APR 0 %, plazo 30 años = $333.33/mes; plazo cero y principal cero = 0 (sin división por cero). Son pruebas matemáticas aisladas de la función, NO pruebas en navegador de todos los campos, impuestos o gastos de cierre.
- **Pendiente:** impedir que un plazo inválido se interprete visualmente como una mensualidad normal, si el campo permite cero; comprobar cálculos de cierre, proraciones y validación real de formularios en navegador. Mantener estilo aprobado.


## Website 14 — prorrata fiscal resistente a cambio horario (13 Oct 2026)
- Se corrigió el cálculo de prorrata estimada de impuestos del vendedor en `calculators.html`, que antes restaba fechas locales y podía contar un día menos cuando intervenía un cambio de horario de verano. Ahora cuenta días calendario con `Date.UTC` y determina correctamente 365/366 días, con verificación de fechas. Commit `0336f78`.
- Pruebas aritméticas aisladas con impuesto anual $4,500: 2026-01-01 = 1/365 ($12.33); 2026-10-13 = 286/365 ($3,526.03); 2026-12-31 = 365/365 ($4,500); 2024-02-29 = 60/366 ($737.70). Fecha inválida no causa NaN en prorrata.
- No se cambiaron estética, campos, otras fórmulas ni política de ajuste fiscal; las prorratas reales dependen de contrato, impuestos efectivamente pagados y cierre. Todavía hacen falta pruebas de navegador y revisión de los demás cálculos de cierre.


## Website 14 — corrección impuesto documental vendedor (13 Oct 2026)
- Revisión cruzada `seller-closing-costs.html` vs. `calculators.html` detectó inconsistencia: la página exclusiva del vendedor usaba `price*.007` para deed documentary stamp tax, mientras Calculators ya redondeaba a unidades completas de $100 mediante `Math.ceil(price/100)*.70`.
- Corregido `seller-closing-costs.html` a `Math.ceil(price/100)*.70` (commit `ffd16df`); cálculos coinciden en ambas páginas. Pruebas matemáticas: $400,000 → $2,800.00; $400,050 → $2,800.70 (antes $2,800.35); $152,500 → $1,067.50. No se modificaron diseño ni otros costos.
- Próximo: revisar diferencias restantes entre calculadoras, requisitos de validación de formularios y confirmar las operaciones en navegador publicado. Esta es revisión del código y aritmética aislada, no una prueba de UI o de los importes finales de cierre.


## Website 14 — comparación de validación del vendedor, 13 Oct 2026
- Se compararon `seller-closing-costs.html` y `calculators.html`: ambos usan impuesto documental redondeado, precio/hipoteca y comisiones pactadas. La calculadora específica limitaba internamente comisiones a 100%; la general mostraba campo con `max=100` pero no aplicaba el límite al cálculo al introducir valores fuera de rango mediante el teclado o código. Se corrigió `comm=sp*Math.min(100,n('sc'))/100` en `calculators.html` (commit `6bf83f7`), sin cambios de interfaz.
- Formulario de Contact tiene tres formularios de consultas y panel Ask Tino; el formulario general y otros formularios utilizan `reportValidity()` y enlaces `mailto:`. Los controles tipo email tienen tipo correcto y required donde procede; no es comprobación real de entrega de mensajes.
- Mantener pendiente pruebas en navegador: valores numéricos, validaciones, programas de correo, integración Ask Tino y dispositivos móviles. No se tocaron los diseños aprobados.


## Website 14 — QA de formularios y seis calculadoras (13 Oct 2026)
- Revisión estática de Contact, Calculators y Seller Closing Costs: `coast-lead-form` está presente en las tres, tiene controlador `submit` y genera `mailto:` al correo oficial `sabatino@floridacostiera.com`. Los campos de correo utilizan `type=email`; hay validación nativa `required` en entradas principales. Ask Tino contiene cuadro de texto y controlador `sendTino`.
- Se ampliaron las regresiones en `scripts/check-website14.mjs` para revisar los tres formularios generales, el correo de destino y los seis identificadores de herramientas de Calculators. Commit `ad00f9d`. Relectura de los tres archivos confirmó estas condiciones; ejecución Node/GitHub Actions sigue sin certificarse.
- Sin cambios visuales o de fórmulas en esta etapa. `mailto:` sigue dependiendo de un cliente de correo instalado; no equivale a envío backend. Pendientes: navegador real, Google Translate, Workers de Ask Tino y móviles.

- Hallazgo tras ejecutar manualmente las nuevas condiciones contra los archivos: Seller Closing Costs todavía apuntaba a `scampilii@gmail.com`; se corrigió a `sabatino@floridacostiera.com` (commit `5ffc1ab`). Ahora los tres formularios generales cumplen la misma comprobación de destino. **No afirmar ejecución completa del workflow**.


## Website 14 — Ask Tino en Closing Costs (13 Oct 2026)
- Auditoría de siete páginas principales confirmó que Home, Buy, Sell, Contact, Calculators y Site Map tenían Ask Tino conectado al Worker `ask-tino-ai.scampilii.workers.dev`, pero `closing-costs.html` no incluía ni botón ni panel.
- Se copió exactamente el bloque de estilos, botón, panel y manejadores JS de Ask Tino desde `site-map.html` a `closing-costs.html`; commit `302d5e2`. No se cambió la calculadora ni el encabezado aprobado.
- Relectura GitHub: un panel `tinoPanel`, un botón `tino-launcher`, función `sendTino`, URL Worker, selector/función de idioma y cabecera compartida presentes. Respuesta del Worker, apertura y responsive requieren prueba real en navegador.


## Website 14 — cobertura de idiomas y controles móviles (13 Oct 2026)
- Inspección estática en nueve páginas (Home, Buy, Sell, Communities, Contact, Site Map, Closing Costs, Calculators, Investment Center): selectores con las cuatro opciones English/Español/Italiano/Português, función `googleTranslateElementInit`, y enlace de carga de Google Translate presentes. Home/Buy/Sell/Site Map/Closing Costs contienen botón de menú y meta viewport responsive.
- Añadidas pruebas de regresión en `scripts/check-website14.mjs` para cuatro idiomas, inicializador/cargador, meta viewport de siete páginas y panel de Ask Tino en Closing Costs. Commits `f975bac` y ajuste de expresión regular `96e4f64`.
- Sin modificación de diseño visual. Prueba aún pendiente en navegador real: traducción visible de contenido, persistencia al navegar, navegación de tres rayas en móvil y diseño responsivo en iPhone/iPad. La presencia de código no confirma funcionamiento dinámico; ejecución GitHub Actions sigue sin verificarse.


## Website 14 — cierre de accesibilidad del menú Home (13 Oct 2026)
- Intento de abrir sitio publicado desde herramienta web no accesible: no afirmar QA móvil/visual completada.
- Auditoría de encabezados principales detectó que el botón hamburger en Home tenía `aria-label` pero no informaba `aria-expanded` ni su panel `aria-controls`; se agregaron estos atributos y actualización de `aria-expanded` en `openMenu()`/`closeMenu()`, sin alterar estilos o flujo. Commit `5e2b4ed`.
- Siguen pendientes revisión visual y pruebas reales de navegación en iPhone/iPad/desktop, traducción, correos y Ask Tino. No interpretar pruebas de código como confirmación de despliegue Cloudflare.


## Website 14 — navegación teclado en Site Map / Closing Costs (13 Oct 2026)
- Revisado `assets/fc-canonical-header-menu.js`, el manejador compartido de menú para los dos encabezados especiales. Ya disponía de `aria-expanded`, `aria-controls`, cierre al hacer clic fuera y cierre con Escape.
- Mejora de accesibilidad: al cerrar el menú con tecla Escape, devuelve foco al botón que lo abrió. Commit `fa93a05`; únicamente lógica JavaScript, sin cambios visuales a las páginas o header.
- Prueba funcional en navegador, dispositivos móviles y verificación del despliegue Cloudflare siguen pendientes; revisión de fuente no equivale a prueba real.


## Website 14 — navegación y QA final, 13 Oct 2026
- Comprobado de nuevo que Site Map y Closing Costs tienen exactamente el mismo HTML de encabezado (1087 caracteres cada uno).
- En Home se agregó cierre del menú lateral con tecla Escape, con retorno de foco al botón de menú y actualización de su estado accesible ya existente. Commit `30b1b07`. No se alteró el diseño ni las funciones existentes del botón.
- GitHub workflow de comprobación estructural continúa sin resultado verificable por el conector disponible, que solo devuelve ejecuciones de pull request para búsquedas por commit; el repositorio se actualiza por push. No afirmar pruebas pasadas.
- Pendiente prueba real de navegador/Cloudflare en escritorio y móvil, idiomas, Ask Tino y correo, además de ejecutar la comprobación integral.


## Website 14 — GitHub Actions ahora confirmado (13 Oct 2026)
- Se consultó el endpoint público autorizado `/actions/runs?per_page=5` y se confirmó ejecución `38451113344`, workflow `Florida Costiera structural QA`, rama `main`, commit `30b1b0751542a1bcaa7afd8602d63c051763d217`, evento `push`, `status=completed`, `conclusion=success`, terminado 2026-10-13 18:58:48 UTC. URL: https://github.com/scampilii-prog/florida-real-estate/actions/runs/38451113344.
- Por tanto **sí existe una ejecución completa aprobada** del script estructural; las notas anteriores de estado no verificable quedan superadas por esta consulta. La ejecución no confirma despliegue Cloudflare ni pruebas visuales, móviles, entrega real de email o disponibilidad del Worker de Ask Tino.


## Website 14 — navegador automatizado (13 Oct 2026)
- Se creó `scripts/browser-smoke.mjs` commit `06ca916` con pruebas Chromium sobre servidor HTTP local, en tamaño desktop (1366x768) y móvil (390x844), para Home, Site Map y Closing Costs: abrir/cerrar menú con Escape, retorno de foco, opciones EN/ES/IT/PT y apertura/cierre de Ask Tino.
- Se creó workflow `.github/workflows/florida-costiera-browser-qa.yml` commit `ee7196c`, con Node 22, Playwright y Chromium en GitHub Actions. Ejecución inicial: https://github.com/scampilii-prog/florida-real-estate/actions/runs/38451778989; **in_progress al último chequeo, no afirmar éxito hasta comprobar conclusión**.
- La prueba utiliza los archivos GitHub servidos localmente en el runner, no acredita que Cloudflare haya desplegado o que el Worker/Google Translate/servidor de correo respondan. En caso de fallo, leer jobs/logs antes de modificar código de producción.


## Website 14 — primer Chromium browser QA aprobado (13 Oct 2026)
- Primer browser smoke run `38451778989` FAILED. Logs de Playwright revelaron que botón menú Home navegaba incorrectamente a `site-map.html`: la causa era un event listener en captura en `assets/language-dropdown.js` que interceptaba `[data-oc-menu], .menu-button, .sc-sitemap-menu-btn` y ejecutaba `window.location.assign('/site-map.html')` indiscriminadamente. Se eliminó ese redireccionamiento obsoleto (commit `b8f66c3`).
- La siguiente prueba encontró que Home utiliza menú editorial full-screen `.oc-menu[data-sc-full-menu=1]`, distinto del panel lateral legado; se actualizó `scripts/browser-smoke.mjs` para verificar el menú realmente aprobado. Además, `installFullScreenMenu()` ahora evita ejecutarse en encabezados especiales `header.site-header[data-fc-shared-special]`, para no interceptar sus propios menús (commit `bec759f`); script de prueba corregido commit `2e16f6c`.
- **Resultado confirmado:** GitHub Actions run `38453276741`, `Florida Costiera browser QA`, `status=completed`, `conclusion=success`, desktop 1366x768 y mobile 390x844. URL https://github.com/scampilii-prog/florida-real-estate/actions/runs/38453276741. Comprobó menús con Escape/foco, cuatro opciones de idiomas y apertura/cierre del panel Ask Tino en Home, Site Map y Closing Costs, sobre servidor local.
- NO se han probado aún interacciones de traducción externa real, respuesta de Worker Ask Tino, delivery de correo o páginas publicadas en Cloudflare; tampoco pruebas reales iPhone/iPad/Safari. Seguir ampliar browser QA a Buy, Sell, Contact, Calculators y comprobación del despliegue sin afirmar lo que no se ha medido.


## Website 14 — navegador ampliado a 7 páginas, 13 Oct 2026
- Browser smoke ampliado a Buy, Sell, Contact y Calculators (commits `214053e`, workflow paths `0ef92a7`); ya cubre 7 páginas en desktop 1366×768 y mobile 390×844, verificando apertura/cierre de menú, cuatro opciones de idioma y apertura/cierre de panel Ask Tino.
- **Resultado confirmado GitHub Actions run `38453968377`: completed/success**: https://github.com/scampilii-prog/florida-real-estate/actions/runs/38453968377. Los logs enumeran los siete archivos en ambas resoluciones como OK.
- IMPORTANTE: los logs también reportan errores JavaScript no bloqueantes: `Unexpected identifier 'lead'` en Buy y `Cannot read properties of null (reading 'addEventListener')` en Buy/Sell/Contact/Calculators. Aunque el smoke test es verde, esos errores no están resueltos; investigar orígenes y corregir antes de afirmar sitio sin errores. También sigue pendiente verificación del dominio Cloudflare, traducción efectiva, envío de formularios, respuesta del Worker y dispositivos físicos.


## Website 14 — rediseño Questions (13 Oct 2026)
- A petición del propietario, reemplazado el tablero de 19 categorías por biblioteca de 8 áreas principales (Buying, Selling, Financing, Contracts, Coastal Living, Communities, Investing, Owning/Moving). Las 19 categorías originales quedan conservadas como subtemas seleccionables, así como el array íntegro de **1,010 preguntas y respuestas**. Cambios solo en `questions.html` (commit `3f47f707`); búsqueda por texto sobre el universo completo, tarjetas de 2 columnas (1 en móvil), resultados inicialmente 12 y botón `Show more` que muestra 12 adicionales. Reset de filtros y contador; nombres de áreas traducibles en ES/IT/PT.
- Ampliado `scripts/browser-smoke.mjs` para comprobar 8 temas, 3 subtemas de Buying, paginación 12 a 24 y búsqueda; workflow observa `questions.html` desde commit `babac634`. Browser run `38455170913` registró explícitamente `desktop questions library: eight topics, subtopics, pagination and search OK`; ejecución global terminó failure por **problema separado de menú Buy**. Aún no certificado mobile de biblioteca porque runner se detuvo antes de llegar a esa parte.
- Preservado resto de la página, elementos de header/footer y formularios. Pendiente comprobar publicación Cloudflare y prueba móvil específica. No afirmar workflow completo verde.


## Website 14 — menus y Questions QA aprobados, 13 Oct 2026
- La prueba ampliada fallaba en Buy porque el menú `.oc-menu` existente no tenía controlador activo tras desactivar lógica obsoleta. En `assets/language-dropdown.js` se añadió un listener seguro para `[data-oc-menu]` de encabezados `oc-shell` que abre/cierra el menú existente y actualiza `aria-expanded`; commit `61b4d080`. No se modificaron estilos.
- **GitHub Actions browser QA run `38455868725`: completed/success**. https://github.com/scampilii-prog/florida-real-estate/actions/runs/38455868725. Logs confirman escritorio y móvil para biblioteca Questions (8 grupos, subtemas, búsqueda, paginación) y páginas Home, Site Map, Closing Costs, Buy, Sell, Contact, Calculators (menús, cuatro opciones idiomas y apertura de Ask Tino).
- **Todavía hay errores `Cannot read properties of null (reading 'addEventListener')` en logs**; no declarar sitio libre de errores. Pendientes Cloudflare y servicios externos, revisión visual física iPad/iPhone, correo, Google Translate y respuesta del Worker.


## Website 14 — errores JS restantes resueltos (13 Oct 2026)
- Se activaron trazas completas en `scripts/browser-smoke.mjs` commit `49591dc`. Los errores surgían de manejadores heredados en `questions.html`, `sell.html`, `contact.html` y `calculators.html` que llamaban `picker.addEventListener()` sobre `#language`, elemento inexistente en los encabezados vigentes. Se añadieron guardas que preservan los selectores nuevos (commits `d51c148`, `b4d8563`, `a01739f`, `8e74af3`). En Questions había además un controlador de menú/Tino heredado con referencias inexistentes; se protegió (commit `df0fc64`). Sin cambios de diseño.
- **Resultado confirmado:** workflow estructural `38456470984` `completed/success`; browser QA `38456471084` `completed/success` y **cero líneas `JS ERROR` en los logs**, validando siete páginas, Questions library desktop/mobile, menús e interacciones locales verificadas. URL https://github.com/scampilii-prog/florida-real-estate/actions/runs/38456471084.
- Sigue pendiente verificar el despliegue de Cloudflare, traducción efectiva, emails reales, respuesta de Ask Tino Worker y pruebas en iPhone/iPad/Safari reales. No confundir cobertura local con publicación comprobada.


## Website 14 — Questions refinamiento visual y Ask Tino CTA (13 Oct 2026)
- Por screenshots del sitio publicado, se solicitó elevar elegantemente el hover, mantener textos totalmente legibles, quitar CTA amarillo redundante Ask Tino en la franja intermedia (ya hay botón flotante), y cautela con preguntas inciertas.
- `questions.html` commit `8d6608b`: tarjetas de temas y preguntas con elevación de 3px, borde dorado y sombra suave; texto y colores de contraste protegidos, soporte `focus-visible` y `prefers-reduced-motion`. Eliminado enlace amarillo CTA que duplicaba Ask Tino; franja ahora solo título y guía para usar asistente flotante y contactar Sabatino si pregunta específica/incierta. No se modificó Worker backend ni se prometió cambio de modelo/guardrails.
- Verificado GitHub Actions structural run `38457048745` success y browser QA run `38457048738` success. Continúa pendiente validación visual física y de servicios publicados.


## Website 15 — 13 Oct 2026 — Questions Group 1 follow-up
- New current-turn inspection of main found the 1,010 Q&A library with eight main areas and 19 subtopics already present. Prior commits 8d6608b and 45a285e had already completed the card hover contrast/elevation and removed the duplicate yellow Ask Tino CTA; do not reimplement those changes.
- Commit 0a8a361 restored a centered white, gold-outline, rounded card around the existing #coast-inquiry form using scoped CSS in questions.html; fields, action and mailto unchanged.
- Commit e1847fb adjusted assets/language-dropdown.js so installFullScreenMenu skips the Questions pathname, retaining that page's original compact slide-out navigation instead of the fullscreen "Discover your Florida" editorial menu. Other pages' editorial menus remain untouched.
- Commit 6be0270 added browser-smoke assertions for Questions compact menu plus white inquiry container (desktop and 390px mobile). Check a *new* GitHub Actions run and its logs before declaring this new test passed. Earlier passing runs predate these edits.
- Worker URL ask-tino-ai.scampilii.workers.dev remains external. No authenticated access to Cloudflare Worker source/configuration has been established through GitHub. Do not claim backend accuracy safeguards changed. Current explanatory Questions CTA advises escalation to Sabatino where details are uncertain; this front-end prose does not itself enforce reliable AI answers.
- Continue verification of the new Actions run, public Cloudflare deploy and actual iPhone/Safari appearance. Do not edit OceanFL.


## Website 15 — cierre parcial de Groups 1–4, 13 Oct 2026 (último registro)
- Screenshots reales en Chrome del dominio floridacostiera.com/questions confirmaron: la estructura de 8 grupos y tarjetas publicada, error de letras blancas sobre hover crema, formulario enmarcado y un exceso de espacio en salto a #coast-inquiry. Ya se aplicaron correcciones dirigidas en GitHub, pero verificar su última publicación antes de declarar visualmente cerrado.
- Commits 72f63236 (contraste hover), bb104d8f (invitación centrada y enlace interno), a41709cb (alinear tarjeta debajo del header), 1c6ea5f (cerrar menú antes de hover test). Mantener fotos, tema y las 1,010 respuestas.
- Análisis de logs de browser QA run 38458286250 encontró fallo concreto «Questions compact navigation opens»: el controlador inline de Questions abortaba porque exigía un panel .oc-tino-panel que la página ya no contiene. Commit 5ccabd4 incorpora controlador *solo* para menú compacto de Questions en assets/language-dropdown.js, independiente del panel obsoleto; cierre y Escape/restauración foco incluidos. Aún falta un nuevo Chromium run que lo valide.
- Commit e3f2f4 cambió Florida Costiera browser QA a workflow_dispatch manual para no enviar notificaciones repetidas por cada push. Conserva pruebas, pero ya NO se disparan con cambios automáticos; las últimas fallas de QA anteriores no acreditan estado presente. Para activar nueva ejecución se necesita workflow_dispatch desde GitHub Actions, acción no expuesta en el conector actual. No afirmar test de navegador completado.
- Commit 36d6ede agregó nuevos checks estructurales para el destino del formulario, estilos hover, contenedor blanco y controlador de menú. Última ejecución estructural asociada: 38459268344, estado queued al consultar; revisar conclusión.
- Prueba pública mediante herramienta web no accesible; las capturas de usuario sí muestran despliegue de etapas previas, no certifican los últimos commits. Servicios externos pendientes: Worker Ask Tino y veracidad, Cloudflare deployment/redirect, entrega de correo, Google Translate real, navegador físico iPhone/iPad, propiedades OneHome, reserva SimplyBook.
- Los controles del formulario Questions usan mailto; no afirmar envío automático ni recepción del correo. No modificar OceanFL.


## Website 15 — auditoría de cierre, 13 Oct 2026
- GitHub main verificado. Última QA estructural del commit 2b099792 terminó success. El controlador específico del menú Questions (5ccabd4), prueba estructural ampliada (36d6ede) y últimas correcciones de diseño están en el repositorio.
- El usuario aprobó el marco dorado del formulario; luego solicitó evitar un segundo botón Ask Tino y la navegación forzada al refrescar. Commit 2b099792 conserva una sola CTA Explore your ideal coast y eliminó el desplazamiento automático JS durante load. Si #coast-inquiry permanece en URL, el navegador aún puede aplicar navegación nativa al hash.
- Commit c5c3519: browser-smoke ampliado para probar botón único, destino de la tarjeta y alineación bajo el header en escritorio y móvil. Aún NO ejecutado: browser QA es workflow_dispatch manual, sin ejecución nueva desde el arreglo del menú.
- Consultado árbol completo repo (98 elementos): no hay código ni configuración del Cloudflare Worker ask-tino-ai. La interfaz web apunta a ese servicio; no pueden auditarse prompts ni exactitud interna sin permiso al Worker.
- Comprobación del dominio mediante herramienta web devolvió inaccesible a esa herramienta, no prueba de caída. Las capturas Chrome aportadas por el usuario prueban que versiones anteriores del sitio sí se cargaron, pero no paridad última con main.
- Pendientes antes de certificación completa: nueva browser QA manual; paridad de publicación Cloudflare; traducción externa EN/ES/IT/PT; entrega de correo real; SimplyBook, OneHome y Worker; pruebas físicas Safari/iPad/iPhone. No presentar como 100% listo hasta verificar.
- Mantener browser QA solo manual para evitar aluvión de emails; structural QA sigue automático.


## Website 15 — continuación final: caché Questions (13 octubre 2026)
- Se verificaron runs estructurales completados/success 38459830227 (2b099792), 38459462239 y 38459268344. El browser smoke sigue manual; la última ejecución anterior (38458286250) falló antes de corregir el menú y no se debe interpretar como estado de producción actual.
- Se corrigió en commit 390cbf9 el versionado de carga de assets/language-dropdown.js en questions.html, pasando a ?v=20261013-questions-compact-menu, para evitar reutilizar un JS cacheado anterior a la reparación de menú.
- Sin navegador externo disponible para ejecutar Chromium ni acción autorizada para disparar workflow_dispatch desde esta conexión. Continuar verificando producción y Worker por medios compatibles; no certificar sin evidencia.


## Nuevo Website 15 — Preparación para Google (13 Oct 2026)
- Se leyó el árbol actual: robots.txt permite rastreo y anuncia el sitemap en dominio oficial; sitemap.xml existe y contiene enlaces https://floridacostiera.com/ con 49 registros URL aproximadamente. No se alteró el sitemap sin motivo.
- Verificados directamente en GitHub Home, Questions, Buy, Sell, Communities, Site Map, Boca Grande (dos rutas) y Venice (dos rutas): tienen title, meta description y canonical en dominio oficial; en esa muestra no hay noindex. Las rutas duplicadas de comunidades son páginas con títulos distintos, revisar contenido antes de indicar canonicalización/redirects.
- Intentos de abrir /robots.txt y /sitemap.xml publicados mediante web fueron inaccesibles en esta herramienta; no significa sitio caído ni garantiza que Google pueda acceder.
- Commit 5a480723 creó GOOGLE_LAUNCH_CHECKLIST.md, con orden de Search Console, verificación real de despliegue, dominios/redirects, sitemap, Analytics y Business Profile. No se accedió a cuenta Google ni se envió sitemap.
- El próximo paso de Google requiere verificación de Search Console y propiedad del dominio, una vez haya acceso permitido a esa cuenta; hasta entonces hacer los cambios técnicos verificables de GitHub sin prometer indexación.


## Website 15 — 13 Oct 2026: navegación Home vs Questions
- El usuario mostró capturas reales de Home: menú editorial de pantalla completa «Discover your Florida», con banner fotográfico y enlaces en seis secciones, mientras Questions venía usando menú lateral antiguo «Explore» y después una redirección a site-map.html. Son tres comportamientos distintos. Se adopta el menú editorial de Home en Questions, conservando site-map.html como página independiente con botones.
- Commit a118d04 elimina la excepción de Questions en installFullScreenMenu() de assets/language-dropdown.js, de modo que reutiliza el mismo componente editorial que Home. Commit bf97570 actualiza versión del script en Questions para evitar caché anterior.
- Commits d02e378 y 1d25c55 actualizan las pruebas estructurales y del navegador a la navegación editorial común; browser QA es manual y debe ejecutarse antes de certificar el resultado visual. No se modificó el diseño de Site Map ni Home.


## Nuevo Website 15 — avance SEO y Google (13 Oct 2026)
- Inspección directa del árbol GitHub: 50 archivos .html, de los que 48 son páginas públicas. sitemap.xml tiene exactamente 48 loc únicos, sin archivos inexistentes. Los dos excluidos son Florida-Closing-Timeline-OFFLINE.html y calculators_seis_funcionales_footer_aprobado.html.
- robots.txt anuncia el sitemap oficial y permite rastreo.
- Commit 18387893: añadido control permanente en scripts/check-website14.mjs para exigir correspondencia exacta entre las 48 páginas públicas y sitemap.xml, sin duplicados, y anuncio correcto en robots.txt. GitHub Actions structural QA run 38463504778 completed/success.
- Las URL públicas de Cloudflare aún resultan inaccesibles a la herramienta web en esta sesión; no inferir caída ni declarar verificación Google. No se envió sitemap a Search Console. GSC Wizard fue ofrecido como posibilidad para conectar Search Console y GA4 cuando el propietario tenga acceso. Es opcional y aún no conectado.


## Website 15 — Back to Top global, 13 octubre 2026
- El usuario reportó ausencia de «Back to Top» al final de /closing-costs. Commit d0b9b3a añade controlador común a assets/language-dropdown.js: reutiliza controles ya visibles, o crea botón flotante con círculo dorado y flecha negra, desplazamiento suave a top=0; evita duplicados.
- Commit 02caf341 añade auditoría en scripts/check-website14.mjs de inclusión del archivo compartido para todas las 48 páginas públicas. Structural QA run 38481149985 completado con success.
- Commit 13e40875 actualiza el identificador de caché del JS compartido específicamente en closing-costs.html, para que se descargue el cambio. Último run de ese commit aún estaba en progreso al revisarlo.
- IMPORTANTE: la prueba estructural valida presencia del script, no visualización efectiva en cada navegador. Las páginas con referencias cacheadas antiguas podrían necesitar versionado actualizado. No declarar revisión visual completa de las 48 sin browser QA.


## Website 15 — 13 Oct 2026: actualización global Back to Top y navegación
- Se actualizaron las 48 páginas HTML públicas para cargar assets/language-dropdown.js?v=20261013-global-navigation-backtop. Se conservaron estructuras, fotografías, textos y botones existentes.
- El archivo compartido contiene controlador de Back to Top: reutilizar uno existente o insertar botón flotante si no hay ninguno, con desplazamiento hacia top=0. El mismo archivo dirige los botones hamburguesa fuera de Site Map hacia /site-map.html y ha desactivado el overlay editorial antiguo. Site Map conserva su menú propio.
- Commit 60b545c3 amplía scripts/check-website14.mjs para exigir en las 48 páginas la versión actual del archivo compartido. GitHub Actions run 38500478434 completed/success.
- No se ha ejecutado la prueba visual de navegador desde estas últimas actualizaciones. Debe verificarse en Cloudflare Pages que se despliegan, así como Back to Top, anclas y menús en escritorio y móvil. Evitar anunciar 100% visualmente comprobado hasta evidencia.
- Search Console confirmó verificación de dominio y aceptación inicial del sitemap el 13 oct; después Google reportó General HTTP error. Cloudflare Security Events mostró bloqueo de solicitud de un Googlebot a / por la regla BOBA-199; AI Crawl Control tenía Googlebot bloqueado, pero el toggle se muestra administrado por políticas generales. Ajustes vistos: Search Allow, Agent Allow, Training Block. No se modificaron reglas de seguridad por falta de confirmación precisa, y error de sitemap sigue pendiente.


## Website 15 — Browser QA ampliado para todas las páginas (13 Oct 2026)
- Commit bdc79121 amplía scripts/browser-smoke.mjs para recorrer las 48 páginas HTML públicas en escritorio (1366×768) y móvil (390×844), verificando visibilidad y función Back to Top y navegación de hamburguesa a Site Map; Site Map conserva su menú propio.
- Browser QA está diseñado con workflow_dispatch manual. Sin acción de dispatch disponible en esta conexión; la modificación del script en GitHub NO significa que haya corrido la prueba. No activar push automático, pues produjo inundación de avisos por correo anteriormente.
- La QA estructural más reciente terminada fue success (60b545c3). Pendiente ejecutar browser QA manual y corregir resultados sin alterar diseño aprobado.


## Website 16 — 13 Oct 2026 — reanudación y comprobaciones
- Releído el handoff completo, GOOGLE_LAUNCH_CHECKLIST.md, el navegador smoke script y los últimos commits en main. El repositorio tiene permisos de escritura.
- Commit 80d9824 actualiza GOOGLE_LAUNCH_CHECKLIST.md: propiedad de dominio GSC y envío del sitemap ya hechos el 13 Oct; el error posterior `Couldn't fetch / General HTTP error` sigue sin resolverse. No repetir verificación ni envío indiscriminado. Mantener Cloudflare TXT de verificación.
- El smoke test local en scripts/browser-smoke.mjs recorre 48 páginas a dos anchos (desktop/mobile) para Back to Top y menú al Site Map, más Questions. **No se ha ejecutado mediante workflow_dispatch**; el conector de GitHub actual no expone disparo de workflow. No confundir código del test con resultado aprobado.
- Consulta HTTP independiente de https://floridacostiera.com/, /robots.txt y /sitemap.xml: el lector web externo devolvió `not accessible via this tool` para las tres rutas. No demuestra caída, fallo HTTP de producción ni bloqueo real de Googlebot. No se modificó Cloudflare por falta de evidencia del bloqueo específico del sitemap.
- Pendientes: ejecutar navegador QA manual desde acceso habilitado; revisar sus logs y corregir defectos concretos; comprobar publicación Cloudflare y servicios Worker, OneHome, SimplyBook, mailto y traducción; URL Inspection/GSC; revisar Google Business Profile y Analytics según permisos. No tocar OceanFL.


## Website 16 — revisión posterior (13 Oct 2026)
- Auditados `assets/language-dropdown.js`, `scripts/browser-smoke.mjs` y `scripts/check-website14.mjs` en main. El script compartido ya contiene navegación a `/site-map.html` y Back to Top universal; no se han rediseñado páginas.
- Se identificó un defecto concreto en el test: la lista de localizadores de Back to Top omitía `#fc-universal-backtop` y clases alternativas, aunque el script compartido puede crear ese botón. Corregido en commit `0da255a0`; ahora el test cubre tanto controles existentes como el universal. No presentar la corrección del test como prueba de comportamiento en navegador.
- Consultados de nuevo en herramienta web `/`, `/robots.txt` y `/sitemap.xml`: los tres siguen inaccesibles a esa herramienta; no inferir disponibilidad o fallo HTTP real de producción.
- GSC Wizard `list_sites` sigue mostrando `https://oceanfl.com/`, `https://www.casasfl.com/` y `sc-domain:casasfl.com`; Florida Costiera todavía no aparece en GSC Wizard, aunque el usuario la verificó directamente en Google Search Console el 13 Oct. No alterar ni borrar esas propiedades sin instrucción específica.
- Faltan la ejecución real de QA manual (dispatch no disponible por conector), evidencia de Cloudflare/Googlebot y los demás servicios externos. No declarar Grupo 1 ni Grupo 3 concluidos.


## Website 16 — Google, 13 Oct 2026
- Revisados directamente `sitemap.xml` (48 URLs oficiales) y `robots.txt` (`User-agent: *`, `Allow: /`, sitemap oficial). Ninguno de esos dos archivos fuente contiene prohibición general de rastreo.
- Consultas públicas independientes a Home, `/sitemap.xml` y `/robots.txt` mediante la herramienta web devolvieron inaccesible; intento de `curl` del entorno devolvió `Could not resolve host` (limitación DNS de la herramienta). Esto NO confirma un fallo DNS del dominio público ni reproduce el error que Googlebot observó.
- Commit `b2c38767` amplió `scripts/check-website14.mjs` con protecciones para formato básico XML del sitemap, host/HTTPS/caminos canónicos y ausencia de `Disallow: /` en robots.txt; es una salvaguarda de código, NO reparación probada del problema HTTP de Google Search Console.
- Sigue pendiente evidencia del HTTP servido por Cloudflare a Google para `/sitemap.xml`, revisión del evento correspondiente en Cloudflare Security Events y nueva lectura/indexación en Search Console. No apagar reglas generales BOBA-199 sin identificar bloqueo del sitemap.


## 14 Oct 2026 — Google and dual-brand operational plan
- Owner elected to keep OceanFL.com active alongside FloridaCostiera.com. OceanFL and its Twilio telephone 844-623-2630 must remain untouched, as well as their existing GBP profile; its automated phone answer has NOT been functionally tested.
- Florida Costiera primary controllable site: 941-270-4877 (Google Voice, previously reported functional). Preserve license SL3363040 and brokerage LoKation Real Estate.
- Google Search Console: Cloudflare Security Events showed Googlebot GET /sitemap.xml blocked with HTTP 403 under BOBA-199 on Oct 13. Owner changed general AI bot policies Training Block to Disallow while Search and Agent Allow; LIVE Google URL tests for Home on Oct 13 and Questions on Oct 14 reported URL available to Google; user clicked Request Indexing for both and received confirmation. Still NOT evidence of indexed search results. Sitemap report as of Oct 14 ~5 PM still displayed last read Oct 13 / Couldn't fetch / 0 discovered; await re-read before claiming success.
- Google Business Profile screenshots: verified profiles OceanFL and Sabatino Campilii, with 4 reviews on personal profile. Personal profile name Sabatino Campilii, real estate agent primary category, phone 954-778-0263, site oceanfl.com, OceanFL social links and description. Owner wants OceanFL independently preserved and personal profile to primarily direct to Florida Costiera after appropriate review of Google practitioner/duplicate guidelines. GBP listing updates cannot be executed via available current tools; use user-approved UI actions and do not claim a change until confirmed. Do not invent third GBP or alter OceanFL.
- Public web retrieval shows OceanFL content and 844-623-2630 disclosed, Pearl automated concierge interface exists; that does NOT prove live telephone AI forwarding or successful reception. Avoid promising either service works until tested.
