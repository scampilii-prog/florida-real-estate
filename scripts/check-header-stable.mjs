import {readFileSync,readdirSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8');
const template=read('assets/fc-header-template.html').trim();
const css=read('assets/fc-canonical-header.css'),shared=read('assets/language-dropdown.js'),behavior=read('assets/fc-canonical-header-menu.js');
let count=0;
for(const file of readdirSync(root).filter(f=>f.endsWith('.html')&&!/OFFLINE|calculators_seis|ask-tino-preview/.test(f))){
 const html=read(file),header=html.match(/<header\b[\s\S]*?<\/header><div class="fc-header-spacer"[^>]*><\/div>/)?.[0];
 assert.equal(header,template,file+' does not use the single initial header');
 assert.equal((html.match(/fc-canonical-header\.css\?v=20261104-controls2/g)||[]).length,1,file+' header stylesheet count');
 assert(html.indexOf('fc-canonical-header.css')<html.indexOf('</head>'),file+' header CSS loads too late');
 assert(!/<link[^>]*fc-canonical-header\.css[^>]*\b(?:defer|media="print")/.test(html),file+' header CSS must block first paint');
 for(const style of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g))assert(!/header\.fc-ready/.test(style[1]),file+' contains retired header CSS');
 assert(!/getElementById\(['"]lang['"]\)/.test(html),file+' uses retired translation selector');
 count++;
}
assert(css.includes('--fc-header-height:94px')&&css.includes('--fc-header-height:126px'),'Approved desktop/mobile heights missing');
assert(css.includes('scrollbar-gutter:stable'),'Scrollbar-induced horizontal shifts not prevented');
assert(!/setIdentity|fc-shared-header|fc-new-coastal-brand|fc-mobile-brand-readable/.test(shared),'Legacy header mutator remains');
assert(!/\.style|innerHTML|createElement|getBoundingClientRect|offsetWidth|resize/.test(behavior),'Header behavior must not rebuild or measure layout');
assert(!/<text\b/.test(template),'Brand must not depend on late font loading');
console.log('Stable header: '+count+' identical initial headers, one stylesheet, fixed outlined brand, static controls and no layout mutations.');
