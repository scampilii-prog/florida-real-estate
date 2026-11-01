// Author the shared header in assets/fc-header-template.html, then synchronize static pages.
// The header remains present without JavaScript; runtime code never builds the layout.
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
const root=new URL('../',import.meta.url),template=readFileSync(new URL('assets/fc-header-template.html',root),'utf8').trim();
const block=/<header\b[\s\S]*?<\/header>(?:<div class="fc-header-spacer"[^>]*><\/div>)?/;
let changed=0;
for(const page of readdirSync(root).filter(p=>p.endsWith('.html')&&!/OFFLINE|calculators_seis/.test(p))){
 const url=new URL(page,root),html=readFileSync(url,'utf8');
 if(!block.test(html))throw Error('Header missing: '+page);
 const next=html.replace(block,()=>template);
 if(next!==html){changed++;if(!process.argv.includes('--check'))writeFileSync(url,next)}
}
if(changed&&process.argv.includes('--check'))throw Error(changed+' pages differ from the canonical header; run node scripts/sync-header.mjs');
console.log('Canonical header synchronized across public pages; '+changed+' updates.');
