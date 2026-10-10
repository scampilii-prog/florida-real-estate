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
