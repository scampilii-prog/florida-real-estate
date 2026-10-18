import {readFileSync,readdirSync} from 'node:fs';
import {strict as assert} from 'node:assert';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8');
const source=read('assets/language-dropdown.js');
const handler=source.slice(source.indexOf('/* One navigation action:'),source.indexOf('/* Florida Costiera: single accessible Back to Top'));
assert(handler.length>200);
let click,assigned;
vm.runInNewContext(handler,{window:{addEventListener:(name,fn,capture)=>{assert.equal(name,'click');assert.equal(capture,true);click=fn},location:{assign:url=>assigned=url}}});
function matches(tag,selector){
 const classes=(tag.match(/class="([^"]*)"/)?.[1]||'').split(/\s+/);
 return selector.split(',').some(s=>s==='[data-oc-menu]'?tag.includes('data-oc-menu'):s.startsWith('.')?classes.includes(s.slice(1)):s==='button[onclick*="openMenu"]'&&tag.startsWith('<button')&&tag.includes('openMenu'));
}
const pages=readdirSync(root).filter(n=>n.endsWith('.html')&&!/OFFLINE|calculators_seis/.test(n));
let count=0;
for(const page of pages){
 const html=read(page),header=html.match(/<header\b[\s\S]*?<\/header>/i)?.[0];
 assert(header,page+' missing header');
 const controls=[...header.matchAll(/<(?:a|button)\b[^>]*>/g)].map(m=>m[0]).filter(t=>/data-oc-menu|menu-button|sc-(?:sitemap-menu-button|cc-menu|legal-menu|booking-menu)|onclick="openMenu/.test(t));
 assert(controls.length,page+' has no Site Map control');
 assert(html.includes('language-dropdown.js?v=20261018-sitemap-menu'),page+' stale script');
 for(const tag of controls){
  assigned=undefined;let prevented=false,stopped=false;
  // Nested SVG/path targets delegate through closest to their owning control.
  click({target:{closest:selector=>matches(tag,selector)?{}:null},preventDefault:()=>prevented=true,stopImmediatePropagation:()=>stopped=true});
  assert.equal(assigned,'/site-map.html',page+' menu destination');
  assert(prevented&&stopped,page+' conflicting legacy handler allowed');count++;
 }
}
for(const tag of ['<button class="sc-sitemap-search-btn">','<select id="oc-lang-static">','<button data-oc-close>']){
 assigned=undefined;
 click({target:{closest:selector=>matches(tag,selector)?{}:null},preventDefault:()=>assert.fail('unrelated control intercepted'),stopImmediatePropagation:()=>{}});
 assert.equal(assigned,undefined);
}
assert(/<a class="sc-sitemap-menu-button" href="\/site-map.html"/.test(read('guides.html')),'Guides must retain a native fallback link');
console.log(`Site Map navigation: ${count} header controls across ${pages.length} public pages passed; search, language and close controls unaffected.`);
