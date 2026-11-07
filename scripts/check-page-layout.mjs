// Guard the single width owner and initial HTML coverage across the public sitemap.
import {readFileSync,readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8');
const pages=readdirSync(root).filter(p=>p.endsWith('.html')&&!/OFFLINE|calculators_seis|ask-tino-preview/.test(p));
for(const page of pages){const html=read(page);assert.equal((html.match(/assets\/page-layout\.css\?v=20261101-align2/g)||[]).length,1,page+' shared layout');assert(/<main\b[^>]*class="[^"]*fc-page-(?:container|flow)\b/.test(html),page+' main frame');assert(html.indexOf('assets/page-layout.css')<html.indexOf('</head>'),page+' render-blocking geometry');}
const css=read('assets/page-layout.css');assert(css.includes('--fc-page-max:1220px'));assert(css.includes('.fc-header-inner'));assert(css.includes('--fc-page-gutter:14px'));assert(!/!important/.test(css),'No override patch stack');
assert(!/inline-size:|margin-inline:|\bwidth:/.test(read('assets/fc-canonical-header.css').match(/\.fc-header-inner\{[^}]*\}/g).join('')),'Header width belongs only to page-layout.css');
console.log('Shared layout: '+pages.length+' public pages, one 1220px width owner, matching header frame and responsive gutters.');
