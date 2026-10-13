// Florida Costiera — source-level regression checks. Run: node scripts/check-website14.mjs
// These checks do not replace browser/Cloudflare/mobile visual testing.
import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home=read('index.html'), sitemap=read('site-map.html'), closing=read('closing-costs.html');
const buy=read('buy.html'), sell=read('sell.html');
const header=(s)=>s.match(/<header\b[\s\S]*?<\/header>/i)?.[0];
assert(header(home),'Home header must exist');
for(const [name,page] of [['Site Map',sitemap],['Closing Costs',closing]]){
 const h=header(page);
 assert(h?.includes('class="site-header"'),name+' must use Home header skeleton');
 assert(h.includes('class="header-inner"') && h.includes('class="header-tools"'),name+' missing shared layout');
 assert(h.includes('id="oc-lang-static"'),name+' missing language selector');
 assert(page.includes('assets/fc-canonical-header.css'),name+' missing canonical stylesheet');
 assert(page.includes('assets/fc-canonical-header-menu.js'),name+' missing menu behavior');
 assert(page.includes('assets/language-dropdown.js'),name+' missing shared branding and languages');
 assert(!/<header\b[^>]*class="(?:sc-sitemap-header|sc-cc-header)"/.test(page),name+' has legacy HTML header');
}
assert.equal(header(sitemap),header(closing),'Site Map and Closing Costs header markup diverged');
for(const [name,page] of [['Buy',buy],['Sell',sell]]){
 assert(page.includes('id="fc-oc-header-position-repair"'),name+' fixed header positioning missing');
 assert(page.includes('padding-top:94px!important'),name+' desktop header clearance missing');
 assert(page.includes('padding-top:82px!important'),name+' mobile header clearance missing');
 assert.equal((page.match(/<main\b/g)||[]).length,1,name+' main count');
 assert.equal((page.match(/<footer\b/g)||[]).length,1,name+' footer count');
}
assert(buy.includes('id="fc-buy-viewport-repair-20261013"'),'Buy full-width repair missing');
const calculators=read('calculators.html'), investment=read('investment-center.html');
const contact=read('contact.html');
for(const [name,page,anchor] of [['Buyer Closing Costs',calculators,'buyer-costs'],['Investment Calculator',investment,'investment-calculator']]){
 assert(page.includes('id="'+anchor+'"'),name+' destination anchor missing');
}
for(const [name,page] of [['Home',home],['Buy',buy],['Sell',sell],['Contact',contact],['Calculators',calculators],['Investment Center',investment]]){
 assert(page.includes('function toggleTino()'),name+' missing Ask Tino open handler');
 assert(page.includes('async function sendTino(event)'),name+' missing Ask Tino submission handler');
 assert(page.includes('id="tinoPanel"'),name+' missing Ask Tino panel');
}
console.log('Website 14 structural regression checks passed. Browser visual QA remains required.');
