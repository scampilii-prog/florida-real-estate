// Synchronize the approved inquiry across every configured page.
// Run node scripts/sync-inquiry.mjs to update; add --check to verify without writing.
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const read=p=>readFileSync(path.join(root,p),'utf8');
const template=read('assets/inquiry-template.html').trim();
const config=JSON.parse(read('assets/inquiry-pages.json'));
const licenses=JSON.parse(read('images/photo-credits-20261018.json')).photos;
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const section=/<section\b[^>]*class="[^"]*\b(?:coast-inquiry|lead-intake)\b[^"]*"[^>]*>[\s\S]*?<\/section>/;
const scripts=/<script\b[^>]*id="(?:coast-inquiry-script|lead-intake-script)"[^>]*>[\s\S]*?<\/script>/g;
let changes=0;
for(const [file,data] of Object.entries(config)){
 const original=read(file);if(!section.test(original))throw Error('Missing inquiry: '+file);
 const photo=licenses.find(x=>x.local===data.image);if(!photo)throw Error('Missing photo license: '+data.image);
 const credit='<a href="'+esc(photo.source)+'">'+esc(photo.author)+'</a> · '+(photo.license_url?'<a href="'+esc(photo.license_url)+'">'+esc(photo.license)+'</a>':esc(photo.license));
 const values={...data,credit};
 const rendered=template.replace(/{{(\w+)}}/g,(_,key)=>key==='credit'?credit:esc(values[key]??''));
 let next=original.replace(section,rendered).replace(scripts,'');
 next=next.replace(/<link\b[^>]*href="assets\/(?:inquiry-form|inquiry-layout)\.css[^"]*"[^>]*>/g,'');
 next=next.replace(/<script\b[^>]*src="assets\/inquiry-form\.js[^"]*"[^>]*>[\s\S]*?<\/script>/g,'');
 next=next.replace('</head>','<link rel="stylesheet" href="assets/inquiry-form.css?v=20261018-unified2"><link rel="stylesheet" href="assets/inquiry-layout.css?v=20261018-unified2"></head>');
 next=next.replace('</body>','<script src="assets/inquiry-form.js?v=20261018-unified2" defer></script></body>');
 if(next!==original){changes++;if(!process.argv.includes('--check'))writeFileSync(path.join(root,file),next);}
}
if(process.argv.includes('--check')&&changes)throw Error(changes+' inquiry pages differ from the common template. Run node scripts/sync-inquiry.mjs.');
for(const file of readdirSync(root).filter(p=>p.endsWith('.html'))){
 const html=read(file);
 if(/<form\b[^>]*id=["']coast-lead-form["']/.test(html)||/<section\b[^>]*class="coast-inquiry"/.test(html))throw Error('Legacy inquiry remains: '+file);
 if((html.match(/<form\b[^>]*id=["']lead-form["']/g)||[]).length>1)throw Error('Duplicate inquiry: '+file);
}
console.log(Object.keys(config).length+' pages use the approved common inquiry; zero legacy inquiry forms remain.');
