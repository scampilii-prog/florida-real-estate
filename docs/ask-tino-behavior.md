# Ask Tino — clean engine

## Files and ownership
- `assets/ask-tino-core.js`: shared criteria validation/update, language, deterministic answers and formulas, capability limits.
- `assets/ask-tino-client.js`: single submit listener, in-page state, safe text/link rendering. No permanent visitor storage.
- `functions/api/ask-tino.js`: same-origin JSON validation and bounded connection to the existing AI Worker.
- `assets/language-dropdown.js`: loads the dedicated client only. No chat rules or state there.
- The old inline AI send functions have been removed from the root HTML pages; toggle and navigation UI are preserved.

## Truth and capability rules
1. Use visitor statements as criteria. A change updates only specified fields. Do not infer facts from assistant responses.
2. Unknown details stay unknown. Never invent available properties, addresses, prices, personal biographies, current rates, sources or page visits.
3. A budget is a preference, not evidence that financing is approved. Do not add unsolicited financing advice.
4. Never confirm a booking, sent message, property verification or web investigation that did not happen.
5. There is NO live web-search integration. Legal/tax/current-rule questions explicitly disclose that limitation and link to official sources. Do not claim the linked sources were consulted by the live assistant.
6. General AI explanations are not verified legal or financial conclusions. No price, deadline, approval or investment guarantee.
7. Use the visitor's requested language. Summaries report only stored criteria.
8. Do not discriminate or steer by protected personal traits. Use objective property criteria.
9. Deterministic calculations use stated operands only. No default selling-cost percentage. Missing loan inputs prompt a question. Monthly loan calculation assumes a fixed annual interest rate and excludes tax, insurance, HOA, PMI and fees.
10. AI-service payload stays below 1,000 characters. Oversized questions receive a request to shorten them. Service errors receive an honest localized response.

## Session limits
The structured criteria persist while the page remains open, including closing/reopening the widget. Reloading or navigating to a new page starts a new conversation. Four recent visitor messages may supplement the general-answer prompt within the external service's size limit. Criteria do not depend on that rolling window.

## Official reference links
Checked for this implementation on 2026-11-07, without asserting permanent legal currency:
- Florida DBPR/FREC statutes and rules: https://www2.myfloridalicense.com/real-estate-commission/statutes-and-rules/
- IRS FIRPTA: https://www.irs.gov/individuals/international-taxpayers/firpta-withholding
- HUD Fair Housing: https://www.hud.gov/fairhousing

## Validation
`scripts/check-ask-tino-clean.mjs` exercises shared logic, API validation, simulated browser submission/state, language changes, missing information, negotiated expenses, service failure and strict size bounds.
The existing AI Worker remains an external dependency. Rules and tests reduce known errors; they cannot guarantee zero model errors or permanent upstream availability.

## Official-source lookup (2026-11-07)
The API now routes government/legal queries to a curated public official-source directory, with up to three parallel, time-limited requests. It never fetches arbitrary user URLs, follows redirects, or sends visitor questions to those sources. It displays the actual consultation date and at most 24 words of a relevant page excerpt; failures and challenges are explicitly unverified. A consulted page is not a legal conclusion or completeness/current-law guarantee. Jurisdiction needs an exact parcel address, especially Englewood, Gasparilla Island and Wellen Park. This is bounded source retrieval, NOT unrestricted search-engine access.

The internal index is generated from the 48 public sitemap pages' titles, descriptions and headings using `python scripts/build-ask-tino-index.py`. It recommends up to three relevant pages and an inquiry link. It does not claim MLS/live inventory access, full Q&A search, or paid-ad publication.
