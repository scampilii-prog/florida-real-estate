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

// Every key page must retain four named languages and translation wiring.
for(const [name,page] of [['Home',home],['Buy',buy],['Sell',sell],['Contact',contact],['Calculators',calculators],['Site Map',sitemap],['Closing Costs',closing]]){
 for(const [code,label] of [['en','English'],['es','Español'],['it','Italiano'],['pt','Português']]){
  assert(new RegExp('<option\\b[^>]*value="'+code+'"[^>]*>'+label+'</option>').test(page),name+' missing language '+label);
 }
 assert(page.includes('googleTranslateElementInit') && page.includes('translate.google.com/translate_a/element.js'),name+' missing translation wiring');
 assert(page.includes('name="viewport"'),name+' missing responsive viewport');
}
for(const name of ['index.html','buy.html','sell.html','contact.html','calculators.html','investment-center.html']){
 const html=read(name);
 assert(html.includes('"/api/ask-tino"'),name+' must use the same-origin assistant endpoint');
 assert(!html.includes('https://ask-tino-ai.scampilii.workers.dev/'),name+' still calls the incompatible cross-origin endpoint');
}
assert(closing.includes('id="tinoPanel"')&&closing.includes('async function sendTino(event)'),'Closing Costs Ask Tino missing');
// Inquiry forms must be wired to a submit handler and use the official inbox.
for(const [name,page] of [['Contact',contact],['Calculators',calculators],['Seller Closing Costs',read('seller-closing-costs.html')]]){
 assert(page.includes('id="lead-form"'),name+' missing coastal inquiry form');
 assert(page.includes('assets/inquiry-form.js'),name+' missing coastal inquiry handler');
 assert(read('assets/inquiry-form.js').includes('mailto:sabatino@floridacostiera.com?subject='),name+' must use official inquiry address');
}
for(const id of ['mortgage','buyer-costs','seller-net','affordability','loans','dates']){
 assert(calculators.includes('id="'+id+'"'),'Missing calculator section '+id);
}

// Verify relative HTML destinations and same-document hash links without changing the site.
// Run on all production pages, excluding the offline worksheet and historical demo.
import {readdirSync} from 'node:fs';
const productionPages=readdirSync(new URL('../',import.meta.url))
 .filter(n=>n.endsWith('.html')&&!['Florida-Closing-Timeline-OFFLINE.html','calculators_seis_funcionales_footer_aprobado.html'].includes(n));
const validPages=new Set(productionPages);
let linkCount=0;
for(const pageName of productionPages){
 const page=read(pageName);
 const ids=new Set([...page.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]));
 for(const match of page.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)){
  const value=match[1].replace(/&amp;/g,'&');
  if(/^(https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(value))continue;
  const [rawPath,fragment]=value.split('#');
  const filePath=rawPath.split('?')[0];
  if(filePath && !filePath.startsWith('/') && filePath.endsWith('.html')){
   assert(validPages.has(filePath),pageName+' links to missing file '+filePath);
   linkCount++;
  }
  if(fragment && (!filePath||filePath===pageName) && fragment!=='top'){
   assert(ids.has(decodeURIComponent(fragment)),pageName+' links to missing section #'+fragment);
  }
 }
}
// Check that external links opening a new tab declare an explicit rel attribute.
for(const pageName of productionPages){
 const page=read(pageName);
 for(const match of page.matchAll(/<a\b[^>]*>/gi)){
  if(/\btarget\s*=\s*["']_blank["']/i.test(match[0])){
   assert(/\brel\s*=/.test(match[0]),pageName+' external new-tab link missing rel');
  }
 }
}
console.log('Verified relative HTML link targets across '+productionPages.length+' pages ('+linkCount+' links).');


// Website 15: ensure approved Questions navigation, contrast, form destination and 1,010 records survive future revisions.
const questions=read('questions.html'), sharedNav=read('assets/language-dropdown.js');
assert(questions.includes('id="qaCategories"')&&questions.includes('id="qaSubtopics"'),'Questions topic navigation absent');
assert(questions.includes('href="#coast-inquiry"')&&questions.includes('id="coast-inquiry"'),'Questions form same-page link or target missing');
assert(questions.includes('id="fc-qa-hover-contrast-fix-20261013"'),'Questions hover contrast fix absent');
assert(questions.includes('id="fc-questions-inquiry-card-20261013"'),'Questions white/gold inquiry card absent');
assert(questions.includes('id="fc-inquiry-anchor-alignment-20261013"'),'Questions exact form anchor alignment absent');
assert(sharedNav.includes('function installFullScreenMenu()') && sharedNav.includes('menu.dataset.scFullMenu'), 'Shared Home editorial menu missing');
assert(questions.includes('Search all 1,010 questions'),'Questions collection headline absent');
console.log('Website 15 Questions navigation and form safeguards present.');


// Google launch guard: sitemap lists every public page once, excludes offline/demo pages.
const sitemapXml=read('sitemap.xml');
const listed=[...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const expectedPublic=productionPages.filter(n=>n!=='index.html').map(n=>'https://floridacostiera.com/'+n.replace(/\.html$/,''));
expectedPublic.push('https://floridacostiera.com/');
assert.equal(new Set(listed).size,listed.length,'Duplicate sitemap locations');
for(const u of expectedPublic)assert(listed.includes(u),'Missing sitemap URL: '+u);
assert.equal(listed.length,expectedPublic.length,'Unexpected sitemap entries');
const robotsTxt=read('robots.txt');
assert(robotsTxt.includes('Sitemap: https://floridacostiera.com/sitemap.xml'),'robots.txt missing official sitemap');
// Prevent accidental future blocking or malformed Google sitemap changes.
assert(/^User-agent:\s*\*\s*$/m.test(robotsTxt),'robots.txt missing general crawler group');
assert(/^Allow:\s*\/\s*$/m.test(robotsTxt),'robots.txt no longer permits general crawling');
assert(!/^Disallow:\s*\/\s*$/m.test(robotsTxt),'robots.txt blocks the entire site');
assert(sitemapXml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'),'Sitemap XML namespace missing');
assert(sitemapXml.trimEnd().endsWith('</urlset>'),'Sitemap XML closing element missing');
for(const url of listed){
 assert(url==='https://floridacostiera.com/' || /^https:\/\/floridacostiera\.com\/[a-z0-9-]+$/.test(url),'Noncanonical or malformed sitemap URL: '+url);
}

for(const page of productionPages){
 const html=read(page), expected='https://floridacostiera.com/'+(page==='index.html'?'':page.replace(/\.html$/,''));
 const canonicals=[...html.matchAll(/<link\b[^>]*\brel="canonical"[^>]*>/g)];
 assert.equal(canonicals.length,1,page+' must have one canonical');
 assert(canonicals[0][0].includes('href="'+expected+'"'),page+' canonical must match its final Cloudflare URL');
 assert(listed.includes(expected),page+' canonical missing from sitemap');
}
console.log('Google launch sitemap: '+listed.length+' valid public URLs represented.');


// Global Back to Top is installed by the existing shared navigation script on all public pages.
const shared=read('assets/language-dropdown.js');
assert(shared.includes('fc-universal-backtop') && shared.includes('scrollTo({top:0,left:0,behavior:'),'Shared Back to Top installer missing');
for(const page of productionPages){
 const source=read(page);
 assert(!/<aside\b[^>]*id="sideMenu"/.test(source),page+' retains the retired duplicate side menu');
 assert(source.includes('assets/language-dropdown.js'),page+' lacks shared navigation and Back to Top');
}
console.log('Global Back to Top is included by all '+productionPages.length+' public pages.');
for(const page of productionPages){
 const html=read(page);
 assert(/assets\/language-dropdown\.js\?v=[^"']+/.test(html),page+' uses stale shared JS cache key');
}
console.log('All public pages include versioned shared navigation assets.');

import {execFileSync} from 'node:child_process';
execFileSync(process.execPath,[new URL('./sync-inquiry.mjs',import.meta.url).pathname,'--check'],{stdio:'inherit'});
execFileSync(process.execPath,[new URL('./check-inquiry.mjs',import.meta.url).pathname],{stdio:'inherit'});
execFileSync(process.execPath,[new URL('./check-site-map-menu.mjs',import.meta.url).pathname],{stdio:'inherit'});
execFileSync(process.execPath,[new URL('./check-ask-tino.mjs',import.meta.url).pathname],{stdio:'inherit'});
console.log('Structural regression and common inquiry checks passed. Browser visual QA remains required.');

