import {readFileSync,readdirSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8');
const pages=readdirSync(root).filter(n=>n.endsWith('.html')&&!/OFFLINE|calculators_seis/.test(n));
for(const page of pages){
 const html=read(page),header=html.match(/<header\b[\s\S]*?<\/header>/i)?.[0];
 assert(header,page+' missing header');
 const menu=header.match(/<a\b[^>]*class="fc-header-menu menu-button"[^>]*>/)?.[0];
 assert(menu?.includes('href="site-map.html"'),page+' missing native Site Map link');
 assert(!menu.includes('onclick'),page+' retains a conflicting menu handler');
 assert(header.includes('class="fc-header-search search-icon"'),page+' missing independent search');
 assert(header.includes('id="oc-lang-static"'),page+' missing language selector');
}
console.log('Site Map: native links present in '+pages.length+' initial HTML headers; no JavaScript redirect needed.');
