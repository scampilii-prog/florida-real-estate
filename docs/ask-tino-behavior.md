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
