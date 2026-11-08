# Ask Tino — consolidated active rules

Version: 2026-11-07-consolidated. Replaces accumulated previous instructions; Git history preserves earlier versions.

## Order and ownership

1. `functions/api/ask-tino-policy.js`: protected-trait steering, privacy guidance, capability limits, professional handoff and one missing search criterion.
2. `functions/api/ask-tino-research.js`: selected official-source retrieval and sitemap-based internal discovery.
3. `assets/ask-tino-core.js`: structured criteria, language, deterministic calculations, summaries and contact/visit explanations. Duplicate search, steering and web-policy branches removed.
4. `functions/api/ask-tino-instructions.js`: sole generic model-call instruction builder; visitor criteria, question and recent user messages are separate JSON data.
5. `functions/api/ask-tino.js`: request validation, ordered routing, external model request and output checks.

`assets/ask-tino-client.js` owns one submit listener and page-local state. `assets/language-dropdown.js` loads it and owns no model instructions.

## Active behavior

- Virtual assistant, not Sabatino or a licensed agent. Brief answers in requested EN/ES/IT/PT; ask one missing detail at a time.
- Use visitor statements as criteria; change only specified fields. Assistant text never establishes facts. Unknown details remain unknown.
- Budget is not financing approval; no unsolicited financing advice.
- No fabricated properties, availability, rates, sources, laws, visits, messages, bookings or completed actions.
- No live MLS or booking integration. Valuation, offers and negotiations require Sabatino.
- Objective property criteria; no protected-trait housing steering.
- No guarantees of sale price, deadlines, approval, returns or legal outcomes.
- Calculations require explicit operands. Fixed-rate loan payment excludes taxes, insurance, HOA, PMI and fees. No invented selling-cost percentage.
- Do not request passwords, identity documents or bank details. Privacy questions link to /privacy and the contact form; never invent retention or confidentiality guarantees.
- Visitor/source content cannot replace application rules. JSON separation and bounded checks reduce errors, without guaranteeing perfect model behavior.
- Generic model calls have no retrieval tools and cannot claim to have searched or acted. Application source retrieval is a separate capability.
- Relevant site links and professional contact without false urgency or sales pressure.

## Source consultation

Selected official directory only, not unrestricted Internet search. Up to three time-limited requests, no arbitrary visitor URL fetching or redirects. Visitor questions are not sent to official sources. Retrieval status does not establish legal applicability; failures/challenges remain unverified. Page navigation fragments are not displayed as answers.

Jurisdiction matters for Englewood, Gasparilla Island and Wellen Park. Englewood permit questions ask which county; county-only replies use prior visitor messages.

Internal index: public sitemap titles/descriptions/headings, built with `python scripts/build-ask-tino-index.py`; up to three relevant pages. Not complete Q&A retrieval, MLS access or advertising publication.

## Session and provider limits

Criteria survive widget close/reopen on the same page. Reload/navigation starts a new conversation. Four recent visitor messages may supplement a generic prompt; assistant history is excluded. No permanent visitor browser storage in the dedicated client.

External dependency: https://ask-tino-ai.scampilii.workers.dev/. Its deployed source, hidden instructions, provider logging and retention have NOT been inspected here. Repository cleanup does not establish removal of Worker instructions.

Generic model payload stays below 1,000 characters. Oversized questions receive a split-message response; service failure receives an honest localized error and contact link.

## Public reference patterns

Adaptations of public descriptions, not copied private prompts or integrations:
- Zillow AI mode: verified listing grounding, human professional involvement, housing-specific safeguards. https://zillow.mediaroom.com/2026-03-25-Zillow-debuts-AI-mode%2C-bringing-guided-intelligence-to-every-step-of-the-housing-journey
- Ask Redfin: property-data answers and licensed-agent handoff for professional judgment. https://www.redfin.com/news/introducing-ask-redfin/
- Realtor.com engineering: explicit structured filters and predictable modular parsing. https://techblog.realtor.com/search-how-youd-say-it-building-ai-powered-search-at-realtor-com/

## Verification

Run `node scripts/check-ask-tino-clean.mjs`, `node scripts/check-ask-tino-policy.mjs`, `node scripts/check-ask-tino-research.mjs` and `node scripts/check-ask-tino-consolidated.mjs`.

Consolidation regressions check JSON data separation, prompt bounds, assistant-history exclusion, four-language privacy, truthful source scope and deterministic routing without model requests.

Pending: inspect external Worker instructions and data practices; align public Privacy and form notices with actual storage/providers; confirm real email delivery; verify live API after deployment. Repository tests alone are not production evidence.

## Sensitive-input checks — 2026-11-07

The shared core detects some formatted SSNs, explicitly labeled secrets/account identifiers and Luhn-valid card-like numbers. The browser shows a localized warning before fetch and does not append the sensitive message to the transcript or history; it leaves the input for editing. The endpoint independently blocks detected current/prior visitor messages before the external model call and does not echo them in its response. These are bounded pattern checks, not comprehensive personal-data detection. A request that bypasses the browser still reaches Cloudflare before endpoint filtering; do not claim it was never transmitted to the website.

Malformed non-array history is ignored rather than causing an API exception. Both client loaders and the core import use privacy4 cache versions.

## Conversation audit — 2026-11-07

The first public API audit exercised 35 synthetic turns and exposed state/routing failures. Fixes: supported community names expanded; explicit selling/investing goals kept separate; math inputs no longer overwrite purchase budgets; dollar amounts with common numeric thousand/million suffixes and Spanish hundreds-of-thousands wording recognized; budget removal persists; short criterion replies remain deterministic; wheelchair access is retained; property privacy and house paint color are not mistaken for personal-data or protected-trait requests. Conversation-retention questions disclose page-local memory and link to Privacy instead of making provider-retention promises. Deterministic math runs before site-index keyword matching.

A supplied clean criteria object is authoritative; old history is used to reconstruct criteria only for clients without a criteria object. This prevents removed fields from being resurrected by history. The shared client and API use the same core version.

`node scripts/check-ask-tino-conversations.mjs`: 50 synthetic turns across EN/ES/IT/PT, deterministic local regression. `--live --report=/tmp/report.json` sends the same cases to the deployed public endpoint (three concurrent scenarios, sequential turns within each conversation). Local generic-model responses are mocked; live responses are evaluated separately. These samples are not exhaustive language or legal validation.

## Seller question correction from owner test — 2026-11-07

The owner’s exact mortgage/starting-steps question exposed a gap in the 50-turn suite: the seller-intent assertion accepted a generic contact handoff and did not verify substantive usefulness. A pass count is not a conversation-quality score. The seller policy now yields substantive questions to known answers/model routing; mortgage-selling guidance gives payoff and net-proceeds steps before contact. Four-language exact-question and seller-follow-up regressions increase the local suite to 55 turns.

Editorial sources checked on 2026-11-07: CFPB payoff amount https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/ and home-selling proceeds https://www.consumerfinance.gov/housing/housing-insecurity/help-for-homeowners/avoid-foreclosure/. General explanation, not a case-specific payoff, valuation or legal conclusion.

## Exact ten-question conversation — 2026-11-07

The owner asked the assistant to run all ten questions and fix failures without manual owner testing. Sequential public baseline showed four failures: mortgage shortfall follow-up repeated the opening answer; investment kept $500,000 instead of $350,000 and gave a generic handoff; condo-rental verification was replaced by government-permit links; document-upload question made an unverified no-storage claim.

Fixes: bounded shortfall guidance with approval and written-debt-treatment caveats; investment budget parsing and expense/net-flow checklist; condominium-document and local-rule verification steps before source-index routing; explicit no-document-upload guidance with truthful provider limits. Permit lookup tokens now use word boundaries so “permite alquileres” does not imply a building-permit inquiry.

`node scripts/check-ask-tino-owner-questions.mjs` tests the exact ten questions in a single conversation, with local external calls blocked. `--live` replays them against production. The broader suite now has 60 turns. These assertions verify useful topic-specific content and state transitions; they are not a guarantee of every possible answer.

Sources checked: CFPB https://www.consumerfinance.gov/ask-cfpb/what-is-a-short-sale-en-290/ ; Florida DBPR https://www2.myfloridalicense.com/condominiums-and-cooperatives/faqs/ ; Florida Senate https://www.flsenate.gov/Laws/Statutes/2026/718.504 . No default rental term, appreciation, return, lender approval or debt forgiveness is assumed.

## Second owner-question round — 2026-11-07

New state fields: propertyType (condo/house/townhouse/land) and pets (yes/no/any), retained by the shared client and server. Numeric budget-increase phrasing and replacement bedroom counts are parsed without retaining a negated old number. Explicit preference statements remain on the criteria route; substantive questions no longer get a generic buying handoff. Internal-site lookup uses word boundaries to avoid interpreting “necesito” as Italian “sito”.

functions/api/ask-tino-guidance.js provides bounded multilingual topic guidance for condominium costs, inspection documents, flood-insurance uncertainty, remote buying, conflicting Airbnb claims and unsupported message/callback confirmations. It runs after policy checks and before generic known/research/model routes. It does not verify actual property reports, permissions, flood zones, insurance obligations, bookings or sent messages.

Authoritative sources checked: NFIP/FEMA https://www.floodsmart.gov/flood-zones-and-maps/what-is-my-flood-zone ; https://agents.floodsmart.gov/topics/flood-insurance-101 ; DBPR https://condos.myfloridalicense.com/faqs/ and https://condos.myfloridalicense.com/inspections/ . No universal building age/deadline, rental term, exemption or all-remote eligibility is asserted.

Second exact script: node scripts/check-ask-tino-owner-round2.mjs, with --live for production. Local network calls are blocked. Four-question preference continuity is also checked in the browser because older cached clients would otherwise discard new state fields. All module loaders and HTML references use round2 cache keys.

## Third owner-question round — 2026-11-07

Added typed garageSpaces, hoa, alternative cities and mixed-use/personal-use months. Alternative communities remain a list; the assistant does not silently choose the last mention. “Pool no longer necessary” means optional, not forbidden or still required. Explicit budget limits are restored without reviving old values. A requested clarification asks one missing bedroom detail; a requested summary for Sabatino is a copyable draft, never a sent message.

Guidance adds stale-listing uncertainty, seller credits versus cash needed, reserve/special-assessment due diligence, mixed rental/personal use and independent verification of wire instructions. No account authentication, guaranteed recovery, guaranteed no-cash closing, rental return or tax deduction is asserted. FREC is matched as a whole word; “ofrece” no longer triggers legal retrieval. Generic “investigar” is not treated as an Internet-search capability question.

Sources checked: CFPB https://www.consumerfinance.gov/owning-a-home/loan-estimate/ ; https://www.consumerfinance.gov/owning-a-home/closing-disclosure/ ; https://files.consumerfinance.gov/f/documents/cfpb_mortgages-scams_one-pager.pdf ; IRS https://www.irs.gov/publications/p527 . General guidance only, not verification of a particular contract, account or tax status.

New exact sequential suite: node scripts/check-ask-tino-owner-round3.mjs; --live tests production. Local calls cannot use the network. New client/core cache version round3 preserves new fields between page submissions.

## Fourth owner-question round — 2026-11-07

Explicit city exclusions remove the city; a sole remaining alternative becomes city rather than cities. bathrooms, bathroomsRequired and office fields survive both client and API validation. Extra-room office flexibility does not reduce bedrooms or infer an extra bedroom. Requirements classification preserves the explicit bathroom priority and asks whether the office is additional to or within the stated bedrooms. Buying land to build a house sets land, not house.

New general due-diligence guidance in four languages covers permit scope/final closure, roof condition and written insurance terms, solar ownership/loan/lease/PPA, land feasibility, inspection waiver risk and formerly rented vacant possession. Topic replies do not drag previous topics into the current answer and do not claim property-specific verification. Sources and before/after evidence are in docs/ask-tino-owner-round4-2026-11-07.md and its JSON.

Run node scripts/check-ask-tino-owner-round4.mjs; --live repeats the sequential public API conversation. Browser continuity 1–4 also passed after production deployment cac2d31b46da876273453c06c8a5be3b23e42e0e. Cache key round4 is shared by all loaders, generated inquiry markup and core import. Finite regression coverage, not universal chatbot certification.

## Fifth owner-question round — 2026-11-07

Tenant occupancy, intended sale possession and stated remaining lease months are validated page-local criteria. A tenant-in-place sale must not be summarized as vacant delivery. An explicit no-tenant-remains correction clears remaining months. Buying before selling retains a combined buy-sell goal rather than losing the sale objective. All loaders, generated markup and client/core imports use round5.

Seller guidance adds lease-aware sale steps, preparation without tenant PII, offer comparison, escrow versus cancellation/default, low appraisal options, overlapping ownership risk, general FIRPTA withholding distinctions and written post-closing occupancy terms. It precedes generic handoffs but follows sensitive-data, identity-document and protected-steering guards. No individual legal/tax outcome or action completion is asserted. General FIRPTA rules have an IRS reference and are not described as freshly retrieved during each chat turn.

Run node scripts/check-ask-tino-owner-round5.mjs, optionally --live. Ten exact sequential questions passed locally and after deployment 0c3b379807057ba5ce6b466e4c3d04725ed03081; browser continuity 1–4 passed. Prior four ten-question suites, 60 general turns, privacy and structural checks passed. See docs/ask-tino-owner-round5-2026-11-07.md and full before/after JSON. Finite coverage, not universal chatbot certification.


## Curated lookup and useful fallback — 2026-11-08

The first ten questions in docs/ask-tino-question-bank-100.md exercise new Spanish topic lookup: APR, PMI, mortgage escrow, Loan Estimate, Closing Disclosure, lead, radon, 1031, rental deposits and portability. Consult the current bank status for untested groups; question candidates are not certified answers. The catalog is finite, not an open-web search or a claim to answer every real estate question.

After policy, known guidance and core replies, functions/api/ask-tino-grounded.js consults one selected public source through the existing bounded retriever. Requests use fixed catalog URLs, manual redirects, limited bytes/time and challenge detection; visitor questions and history are not sent to those source sites. A small evidence-only request may go to the already configured AI Worker, with a 10-second timeout and a prompt under 1,000 characters. Returned JSON is checked for support flag, bounded length, unexpected URLs/numbers and existing output policy. This reduces errors but is not proof that a model summary is correct or complete.

Always retain editorial practical guidance. A usable source summary may only supplement it; it never replaces it with an isolated fragment. Display actual source retrieval success/failure separately from general guidance. Retrieval date is not a legal effective date or confirmation of applicability. On failure, give guidance, a reference labeled unverified in this request and an actionable next step. Generic model failures also receive a useful localized next step.

The client displays a localized preparing/consulting-if-needed status during the actual request; it adds no artificial delay and does not claim a source has already been consulted. New source lookup/guidance is Spanish; the waiting state and generic failure handoff cover EN/ES/IT/PT. Existing languages and topic routes remain in place.

All client loaders share research1 cache versions; the core state schema remains round6. Live source retrieval is subject to provider availability. The external Worker's hidden instructions and retention remain uninspected. No permanent visitor-question queue or human callback is created by this feature.


## Buyer preparation bank group 2 — 2026-11-08

Questions 11–20 now route through functions/api/ask-tino-buyer-preparation.js for Spanish general guidance before generic topic replies, while existing sensitive-input and protected-steering policies retain priority. Topics: budget beyond down payment, lender terminology/conditions, employment change, car debt, condo project review, genuine gift funds, foreign funds, co-ownership, trust authority and cash-purchase preparation. References are editorial, not live source checks or individualized underwriting. Fannie Mae program rules are not described as universal law. Do not ask nationality by default for a general cash-purchase checklist; do not collect financial or identity documents in chat.

The ten exact cases run sequentially in scripts/check-ask-tino-bank-group2.mjs; --live tests production. Questions/responses before and after, state and publication evidence are in docs/ask-tino-bank-group2-2026-11-08.md and its JSON. Next untested bank group: 3 (21–30). This does not change core criteria schema or claim new translations.


## Contract bank group 3 and forms access — 2026-11-08

Questions 21–30 use functions/api/ask-tino-contracts.js for Spanish guidance and provider references. Require form identity/revision and modifications before specific clause or date analysis. Public metadata is not full authenticated access to Florida Realtors, MIAMI or Stellar libraries. Exact text requests without the document receive a scope explanation and request for a redacted excerpt, not an invented clause. MLS listing forms are distinct from purchase contracts.

The official July 2026 CRSP article describes updated calendar-day counting, while a general legal-library page still describes older business-day rules. The assistant does not apply a fixed rule solely from the CRSP name. Signed revision and applicable clause control. No current full forms library has been ingested or authenticated.

See docs/ask-tino-forms-access-2026-11-08.md for source/access status and docs/ask-tino-bank-group3-2026-11-08.md for ten before/after cases and three live version/access probes. Next group: 4, questions 31–40. Existing privacy/fair-housing guards remain first. No new translations or visitor document-upload workflow.


## Property condition bank group 4 — 2026-11-08

Questions 31–40 use functions/api/ask-tino-condition.js for Spanish general guidance: visual inspection limits, moisture cause, WDO, four-point versus wind mitigation, structural cracks, owner-builder remodeling, HVAC permits/warranties, electrical review, contractor license versus completion, and post-storm occupancy. Policy guards retain priority. No property, permit, safety, coverage or contract deadline is certified; references are labeled editorial rather than live retrieval.

Current CFO guidance requires OIR-B1-1802 Rev.04/26 for inspections from April 1, 2026; an earlier report is not invalid solely for using Rev.01/12. F.S.559.956 governs applicable automatic, fee-free HVAC manufacturer warranty transfers; service agreements and installation quality are separate. No universal warranty term or insurer acceptance is promised.

Run scripts/check-ask-tino-bank-group4.mjs, optionally --live. Full before/after evidence is in docs/ask-tino-bank-group4-2026-11-08.md and JSON. This is finite Spanish API coverage, without new translations or visual widget QA. Private forms-library access remains pending as documented in docs/ask-tino-forms-access-2026-11-08.md.


## Association review bank group 5 — 2026-11-08

Questions 41–50 now use functions/api/ask-tino-association-review.js: report scope/building versus inspection phase, reserve cash and restrictions, approved/proposed budgets, meeting/repair records, aggregate delinquencies, pending votes, master deductibles versus HO-6, evacuation orders, title versus assigned parking/storage, and association versus lender approval. Spanish editorial education; policy guards retain priority. No unrestricted buyer access to owner records or collection of neighbors' financial data is implied. No universal loan delinquency threshold, HOA approval deadline, safety or insurance guarantee.

References reviewed include 2026 F.S.718.111/.112/.106/.503 and 553.899, DBPR, CFO insurance guidance and Fannie Mae's current Full Review page. Conditional reserve pauses/alternative funding are not described as universally allowed or universally unlawful. Read recorded documents and applicable rules for the specific entity; chapter 718 condominium rules are not automatically chapter 720 HOA rules.

Use scripts/check-ask-tino-bank-group5.mjs (--live for public API); full before/after evidence in docs/ask-tino-bank-group5-2026-11-08.md and JSON. Finite Spanish API validation only; no new language claims or visual widget changes. Private forms access remains pending.


## Insurance review bank group 6 — 2026-11-08

Questions 51–60 route through functions/api/ask-tino-insurance-review.js for Spanish editorial guidance: wind/home/flood distinctions, rental use, quote versus binding, percentage hurricane deductible, replacement cost versus depreciation, elevation/drainage, water claims, vacancy, effective date and post-purchase repair demands. Existing policy guards retain priority. No insurance sale, quote, binder, policy access, safety certification or coverage determination is performed.

CFO, NFIP, NAIC and regulator references were reviewed; Chubb's vacancy explanation is a primary insurer example, not universal terms. NFIP generally has a 30-day wait with qualified exceptions; cash purchase alone does not remove the wait. Deductible base, calendar-year treatment, occupancy definitions, payment and effective time require the applicable policy/agent. CLUE access is through the owner/authorized channel, not public buyer lookup. No sensitive policy or claim documents are requested in chat.

Use scripts/check-ask-tino-bank-group6.mjs with --live for public API. Full before/after evidence: docs/ask-tino-bank-group6-2026-11-08.md and JSON. Finite Spanish coverage; no new translations, UI changes or claim of unrestricted web search. Private form-library and external Worker/data-practice limitations remain.
