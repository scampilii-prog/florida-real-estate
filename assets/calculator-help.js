(function(){
 'use strict';
 const help={
 'investment-calculator':'Compare rental income with operating expenses and financing. Start with your own assumptions, then review cash flow and the cash you need to invest. Sample figures are editable examples, not market quotes.',
 mortgage:'Estimate a monthly housing payment. Principal and interest are combined with the taxes, insurance, HOA and other costs you enter. This is not a lender quote.',
 'buyer-costs':'Build an estimate of the buyer’s costs and remaining cash needed at closing. Enter each charge once and account for credits, deposits and fees already paid.',
 'seller-net':'Estimate what may remain from the sale price after mortgage payoff, commissions, closing charges and other deductions. Confirm the final amount with the closing company.',
 affordability:'Explore a starting purchase-price estimate using income, existing debts, available down payment and housing-cost assumptions. The model uses illustrative ratios; it is not loan approval.',
 loans:'Compare three financing scenarios using loan amount, rate, term and points. Review both the monthly payment and interest costs over time; the lowest payment is not always the lowest overall cost.',
 dates:'Illustrate dates by adding the entered calendar days to the effective date. The tool does not interpret a signed contract, notice rules, holidays or legal deadlines.',
 'inv-price':'The assumed purchase price. It is used to estimate the down payment, loan amount and returns relative to the price.',
 'inv-down':'The percentage of the purchase price paid from your cash. A higher down payment reduces the modeled loan but increases initial cash invested.',
 'inv-rent':'Expected rent for one month before vacancy and operating expenses. Use a supported rent estimate for the actual property rather than treating the example as market data.',
 'inv-vacancy':'The share of scheduled rent set aside for vacancy or lost rental income. For example, 5% means the model collects 95% of the annual scheduled rent.',
 'inv-tax':'Estimated yearly property taxes. Check how an ownership change may affect the assessment; the seller’s current bill may not match the buyer’s future bill.',
 'inv-insurance':'Estimated yearly insurance cost used in the base scenario. Obtain property-specific quotes and consider homeowners, wind and flood coverage as applicable.',
 'inv-hoa':'Total annual HOA, condominium and CDD charges entered in the model. Convert monthly or quarterly charges to yearly amounts and avoid counting the same charge twice.',
 'inv-maintenance':'Annual allowance for routine upkeep and repairs. Major replacements and unexpected capital expenses may require additional reserves.',
 'inv-management':'The percentage of effective collected rent assigned to management. In this model, management expense is calculated after the vacancy allowance.',
 'inv-other':'Other annual operating costs not already included, such as owner-paid utilities or recurring services. Avoid duplicating costs entered elsewhere.',
 'inv-rate':'The annual mortgage interest rate assumed for the loan. It is used to calculate principal-and-interest payments; lender fees and APR are different concepts.',
 'inv-years':'The number of years used to repay the modeled loan. A longer term generally spreads repayment over more months.',
 'inv-closing':'Upfront purchase closing costs paid in cash. These increase initial cash invested; they are not annual operating expenses in this model.',
 'inv-repairs':'Cash reserved initially for repairs or reserves. This increases initial cash invested and is separate from the yearly maintenance allowance.',
 'inv-scenario-insurance':'Try an alternative annual premium without changing the main insurance entry. The comparison shows how the difference changes annual cash flow and cap rate.',
 mp:'The assumed purchase price of the home. The mortgage estimate subtracts your down payment to calculate the loan amount.',
 md:'The share of the home price paid as a down payment. It is synchronized with the dollar amount field.',
 mda:'Cash applied to the purchase price as a down payment. Editing this amount updates the percentage; it does not include closing costs.',
 mr:'The assumed annual mortgage interest rate, used to calculate principal and interest. This is not APR or a lender commitment.',
 mterm:'The repayment period in years. This model assumes regular monthly payments over the selected term.',
 mt:'An annual property-tax estimate expressed as a percentage of the entered price. The model converts it to a monthly cost; verify the property’s expected taxes separately.',
 mi:'The yearly homeowners-insurance premium. The model divides it by 12 for the monthly estimate. Enter flood insurance in its separate field.',
 mh:'Monthly association or condo charges added to the housing-payment estimate. Use the monthly equivalent if billed quarterly or annually.',
 mflood:'The annual flood-insurance premium. The model divides it by 12 and adds it to the monthly estimate.',
 mpmi:'Monthly mortgage-insurance cost, if applicable. Enter a lender estimate; the calculator does not automatically decide whether PMI is required.',
 bp:'The assumed purchase price. The buyer-cost model uses it with the entered loan amount to estimate the down payment and certain charges.',
 bl:'The amount borrowed for the purchase. Purchase price minus this amount is the modeled down payment; verify the actual loan structure with the lender.',
 bf:'Lender origination, underwriting and processing charges paid by the buyer. Exclude fees entered separately below so they are counted once.',
 bdp:'Upfront discount points expressed as a percentage of the loan amount. One point equals 1% of that amount. Confirm the rate and points offered by the lender.',
 brl:'Any initial fee actually charged to lock the mortgage rate. Enter zero if no separate fee applies.',
 bre:'Any lender fee for extending a rate lock. Enter it only if applicable and not already included in another charge.',
 bpi:'Interest collected at closing for the initial partial period before regular mortgage payments. Use the lender’s estimate.',
 bapp:'The appraisal fee actually paid by the buyer. If paid before closing, also record it under fees already paid to avoid paying it twice in the cash-to-close estimate.',
 bcred:'A buyer-paid charge for the lender’s credit report, if separately billed.',
 btitle:'Buyer-paid title-search and settlement charges. Exclude owner’s and lender’s policies and avoid duplicating separately entered administration fees.',
 brec:'Estimated charges to record the transaction documents in public records. Confirm the amount with the closing company.',
 bsur:'The buyer-paid survey cost, if required or chosen for this property.',
 binsp:'Buyer-paid inspections entered in the estimate. Inspection scope and cost depend on the property and selected professionals.',
 bins:'Insurance premiums prepaid at closing, including applicable home and flood coverage. Keep these separate from escrow reserves.',
 besc:'Initial deposits into the lender’s escrow account for future tax and insurance payments. These are separate from prepaid premiums.',
 bhoa:'Buyer-paid association or condominium charges due in connection with closing. Confirm what is required for the particular association.',
 bother:'Other buyer-paid closing charges not entered elsewhere. Check for duplicate charges before adding a total.',
 bltitle:'The lender’s title-insurance policy if paid by the buyer. It is separate from an owner’s policy.',
 bfloodcert:'A separately charged lender flood-determination or certification fee. This is not an insurance premium.',
 btaxservice:'A separately charged tax-service or monitoring fee associated with the loan.',
 badmin:'Additional escrow or closing administration charges only if they are not already included in settlement fees.',
 bfunding:'An upfront program or guarantee fee paid in cash at closing. Exclude an amount financed into the loan from this cash-paid field.',
 bprogram:'Select the financing program to display relevant seller-credit guidance. Confirm actual contribution limits and eligible costs with the lender.',
 boccupancy:'The intended use of the property for the conventional-loan credit illustration. This selection does not determine loan eligibility.',
 bscredit:'Seller contributions toward eligible buyer closing costs. The model subtracts them; the lender must confirm allowed amounts and uses.',
 blcredit:'Lender credits applied toward eligible closing costs. Review any tradeoff with the loan’s rate and other terms.',
 bdeposit:'Earnest money or purchase deposits already paid and credited to this closing. Enter only amounts that will actually be credited.',
 bpaid:'Closing charges already paid outside closing, such as an appraisal. The model subtracts these from remaining cash needed; count each paid charge once.',
 bprorowed:'A settlement reimbursement the buyer owes the seller for prepaid property items. It increases the remaining cash estimate.',
 bprorcredit:'A settlement credit to the buyer for property items owed by the seller. It reduces remaining cash needed.',
 bo:'Include an estimated owner’s title-insurance policy only when the buyer pays it. Confirm responsibility and the final premium with the closing company.',
 sp:'The assumed sale price before mortgage payoff and other seller deductions.',
 sm:'Estimated amount required to pay off the seller’s mortgage at closing. A lender payoff statement may include interest and charges beyond the statement balance.',
 sc:'The negotiated commission percentage entered for this transaction. There is no preset required commission in this calculator.',
 sd:'The assumed closing date used in the approximate property-tax proration. A date change can affect the estimate.',
 st:'Annual property taxes used for the approximate seller proration. The model does not know prior payments, credits, liens or special assessments.',
 sr:'Seller-paid repairs or negotiated concessions included as deductions. Avoid also entering the same amount as an additional seller credit.',
 shoa:'Estimated seller-paid association, condominium or estoppel charges associated with closing.',
 sclosing:'Estimated seller-paid title, settlement and recording charges, separate from the other listed deductions.',
 scredits:'Other seller credits not already included in repairs, concessions or closing fees.',
 so:'Include the model’s owner’s title-policy estimate as a seller deduction if the seller pays it. Confirm the contract allocation and final charge.',
 ai:'Annual income before taxes used in this affordability illustration. The model converts it to a monthly amount.',
 ad:'Existing monthly debt payments used to reduce the model’s available housing budget. Confirm which debts and income a lender will count.',
 ap:'Cash available for the down payment in this affordability model. Closing costs and emergency reserves may require additional funds.',
 ar:'The annual mortgage interest rate assumed for the affordability estimate.',
 at:'The repayment period in years used to estimate principal and interest.',
 ax:'Combined annual taxes and insurance expressed as a percentage of the modeled home price. This assumption may differ from actual address-specific costs.',
 ah:'Monthly association charges included in the housing budget.',
 aflood:'Annual flood-insurance premium, converted to a monthly cost for the affordability estimate.',
 apmi:'Monthly mortgage-insurance estimate included in the housing budget, if applicable.',
 de:'The starting date for this calendar-day illustration. Use the actual effective date when appropriate, but verify the signed contract’s counting rules separately.',
 di:'Calendar days added to the starting date to illustrate an inspection milestone. This does not determine a contractual inspection deadline.',
 dl:'Calendar days added to illustrate a loan-approval milestone. Confirm the signed financing provisions and notices separately.',
 dt:'Calendar days added to illustrate a title-review milestone. The actual review period may depend on document delivery and contract terms.',
 dc:'Calendar days added to illustrate a closing date. Confirm the agreed date and any signed extensions.',
 'loan-amount':'The amount borrowed in each comparison scenario. Compare the same loan amount if you want to isolate the effect of rates, terms and points.',
 'loan-rate':'The annual interest rate for the scenario. The comparison estimates principal and interest and does not include taxes or insurance.',
 'loan-term':'The repayment period in years for the scenario. It affects both the monthly payment and total interest.',
 'loan-points':'Discount points paid upfront as a percentage of the loan amount. Compare upfront cost with the time you expect to keep the loan.'
 };
 const results={
 'effective annual rental income':'Scheduled annual rent after the vacancy allowance. The model calculates monthly rent × 12 × the share expected to be collected.',
 'annual operating expenses':'The annual taxes, insurance, HOA/CDD, maintenance, other expenses and management entered in the model. Mortgage payments are excluded from this operating total.',
 'net operating income (noi)':'Effective rental income minus annual operating expenses, before mortgage payments. A positive NOI does not necessarily mean positive cash flow.',
 'capitalization rate (cap rate)':'Net operating income divided by purchase price, expressed as a percentage. It excludes financing and is different from cash-on-cash return.',
 'annual mortgage payments':'Twelve modeled monthly principal-and-interest payments. These payments reduce cash flow but are not operating expenses in NOI.',
 'estimated annual cash flow':'Net operating income minus annual mortgage payments. A negative value means the modeled income does not cover the entered operating costs and debt payments.',
 'initial cash invested':'Down payment plus purchase closing costs plus initial repairs/reserves entered in this model.',
 'cash-on-cash return':'Estimated annual cash flow divided by initial cash invested. It reflects financing and the cash committed; it excludes appreciation and potential tax benefits.',
 'loan amount':'Home price minus down payment in this mortgage illustration.',
 'principal & interest':'The monthly loan payment used to repay principal and interest. Taxes, insurance, HOA and other housing costs are shown separately.',
 'estimated total monthly payment':'The sum of modeled principal, interest, property taxes, homeowners insurance, flood insurance, PMI and HOA charges.',
 'total interest over loan':'The modeled principal-and-interest payments over the full term, less the initial principal. Actual interest can change if payments or loan terms change.',
 'estimated closing costs before credits':'The listed buyer charges added together before seller/lender credits, deposits and other cash-to-close adjustments.',
 'estimated remaining cash to close':'Modeled down payment plus charges and prorations, less eligible credits, deposits and already-paid charges. “Review inputs” means the entries need reconciliation.',
 'estimated net proceeds':'Sale price minus the payoff and seller deductions entered in the model. Verify the final proceeds on the settlement statement.',
 '28% housing guideline':'An illustrative housing budget equal to 28% of monthly gross income. It is a planning assumption, not a lender approval rule.',
 '36% less monthly debts':'An illustrative total-debt budget of 36% of gross monthly income, reduced by entered monthly debts.',
 'estimated monthly housing budget':'The lower of the model’s two income/debt guidelines, before the entered HOA, flood and PMI amounts are allocated.',
 'estimated maximum purchase price':'A modeled price that fits the entered income, debts, down payment, interest, term and carrying-cost assumptions. It is not an approved borrowing limit.',
 'inspection deadline':'A calendar-day illustration based on the entered starting date and inspection days. Verify the actual contract, counting rules, exact time and notices.',
 'loan approval deadline':'A calendar-day illustration based on the entered loan-approval days. It does not interpret financing contingencies or notice requirements.',
 'title review deadline':'A calendar-day illustration based on the entered title-review days. Confirm the actual period and any document-delivery trigger in the signed agreement.',
 'closing date':'A calendar-day illustration from the entered effective date and closing interval. The agreed contract date and amendments control.',
 'doc stamps on note':'The mortgage-note documentary-stamp charge estimated by this model. Confirm applicability and the final amount with the closing company.',
 'intangible tax on mortgage':'The mortgage-related intangible-tax estimate used in the buyer-cost model. Confirm the actual charge and any applicable exceptions with the closing company.',
 'deed documentary stamps':'The deed documentary-stamp estimate used in the seller model. The actual amount can depend on the transaction and location.',
 'estimated tax proration':'An approximate allocation of annual property taxes through the entered closing date. It does not account for all prior payments, credits or special assessments.'
 };
 const bubble=document.createElement('div');bubble.id='fc-calculator-explanation';bubble.className='fc-help-card';bubble.hidden=true;bubble.setAttribute('role','dialog');bubble.setAttribute('aria-label','Calculator explanation');
 bubble.innerHTML='<button type="button" class="fc-help-close" aria-label="Close explanation">×</button><strong id="fc-help-title"></strong><p id="fc-help-description"></p>';
 document.body.append(bubble);
 let active=null,pinned=false,timer,restoring=false;
 const title=bubble.querySelector('strong'),description=bubble.querySelector('p');
 function close(restore=false){clearTimeout(timer);const old=active;active=null;pinned=false;bubble.hidden=true;if(old){old.setAttribute('aria-expanded','false');old.removeAttribute('aria-describedby');}if(restore&&old?.isConnected){restoring=true;old.focus();restoring=false;}}
 function position(){if(!active?.isConnected){close();return;}const r=active.getBoundingClientRect(),w=bubble.offsetWidth,h=bubble.offsetHeight;const left=Math.max(12,Math.min(innerWidth-w-12,r.left+r.width/2-w/2));const top=r.bottom+h+12<innerHeight?r.bottom+9:Math.max(12,r.top-h-9);bubble.style.left=left+'px';bubble.style.top=top+'px';}
 function show(button,lock=false){clearTimeout(timer);if(active!==button){close();active=button;}pinned=lock||pinned;title.textContent=button.textContent.trim();description.textContent=button.dataset.explanation;bubble.hidden=false;button.setAttribute('aria-expanded','true');button.setAttribute('aria-describedby','fc-help-description');position();}
 function wrap(node,text){const button=document.createElement('button');button.type='button';button.className='fc-help-term';button.textContent=node.textContent;button.dataset.explanation=text;button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-expanded','false');node.replaceWith(button);return button;}
 function explainName(name,section){const key=name.trim().replace(/:$/,'').toLowerCase();if(results[key])return results[key];const ids=Array.from(section.querySelectorAll('input,select'));for(const el of ids){const label=el.labels?.[0]?.textContent||'';if(label.toLowerCase().startsWith(key)&&help[el.id])return help[el.id];}return 'This is the '+name.replace(/:$/,'').toLowerCase()+' used in this '+section.querySelector('h2').textContent.replace(/^\d+\s*·\s*/,'').toLowerCase()+' estimate. Review the entered assumptions and confirm transaction-specific charges or terms with the appropriate professional.';}
 for(const section of document.querySelectorAll('.tool-box')){
  for(const label of section.querySelectorAll('label')){
   const el=label.control||label.querySelector('input,select');if(!el||!help[el.id])continue;
   if(!label.htmlFor&&el.id)label.htmlFor=el.id;
   const text=Array.from(label.childNodes).find(n=>n.nodeType===3&&n.textContent.trim());if(text)wrap(text,help[el.id]);
  }
  for(const th of section.querySelectorAll('.loan-table tbody th')){
   const name=th.textContent.toLowerCase(),key=/amount/.test(name)?'loan-amount':/rate/.test(name)?'loan-rate':/term/.test(name)?'loan-term':'loan-points';
   const text=document.createTextNode(th.textContent);th.replaceChildren(text);wrap(text,help[key]);
  }
 }
 function resultTerms(section){const root=section.querySelector('.tool-results');if(!root)return;
  for(const label of root.querySelectorAll('.result>span')){if(label.querySelector('.fc-help-term'))continue;const text=document.createTextNode(label.textContent);label.replaceChildren(text);wrap(text,explainName(text.textContent,section));}
  for(const row of root.querySelectorAll(':scope>div')){
   if(row.classList.contains('result'))continue;
   for(const node of Array.from(row.childNodes)){
    if(node.nodeType!==3)continue;const match=node.textContent.match(/^(\s*[^:]{2,120}):(\s*)([\s\S]*)$/);if(!match)continue;
    const label=document.createTextNode(match[1]);node.replaceWith(label,document.createTextNode(':'+match[2]+match[3]));wrap(label,explainName(match[1],section));
   }
   const scenario=row.querySelector(':scope>strong');if(scenario&&/^Scenario [ABC]$/.test(scenario.textContent)){const text=document.createTextNode(scenario.textContent);scenario.replaceChildren(text);wrap(text,help.loans);}
  }
 }
 const sections=Array.from(document.querySelectorAll('.tool-box'));
 const observer=new MutationObserver(()=>{observer.disconnect();sections.forEach(resultTerms);if(active&&!active.isConnected)close();watch();});
 function watch(){for(const s of sections){const r=s.querySelector('.tool-results');if(r)observer.observe(r,{childList:true,subtree:true});}}
 sections.forEach(resultTerms);watch();
 document.addEventListener('pointerover',e=>{const b=e.target.closest('.fc-help-term');if(b&&!pinned)show(b);if(bubble.contains(e.target))clearTimeout(timer);});
 document.addEventListener('pointerout',e=>{if(pinned)return;if(e.target.closest('.fc-help-term')||bubble.contains(e.target)){clearTimeout(timer);timer=setTimeout(()=>close(),180);}});
 document.addEventListener('focusin',e=>{if(restoring)return;const b=e.target.closest('.fc-help-term');if(b)show(b);else if(!bubble.contains(e.target))close();});
 document.addEventListener('click',e=>{const b=e.target.closest('.fc-help-term');if(b){e.preventDefault();if(active===b&&pinned)close();else show(b,true);return;}if(!bubble.contains(e.target))close();});
 bubble.querySelector('button').addEventListener('click',()=>close(true));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!bubble.hidden){e.preventDefault();close(true);}});
 window.addEventListener('resize',()=>{if(!bubble.hidden)position();});
 window.addEventListener('scroll',()=>{if(!bubble.hidden){if(pinned)position();else close();}},true);
})();
