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
