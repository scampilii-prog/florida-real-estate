import {readFileSync,readdirSync} from 'node:fs';
import {strict as assert} from 'node:assert';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const entries=JSON.parse(readFileSync(new URL('assets/photo-ownership-20261021.json',root),'utf8'));
const owners=new Map(),sources=new Set(),bytes=new Set();
for(const entry of entries){
 assert(!owners.has(entry.file),'Photo reused: '+entry.file+' in '+owners.get(entry.file)+' and '+entry.page);
 owners.set(entry.file,entry.page);
 const html=readFileSync(new URL(entry.page,root),'utf8');
 assert(html.includes(entry.file),'Photo allocation missing from '+entry.page);
 if(entry.retained)continue;
 assert(!sources.has(entry.source),'Source photograph reused: '+entry.source);sources.add(entry.source);
 const buffer=readFileSync(new URL(entry.file,root));
 assert.equal(buffer.subarray(0,4).toString(),'RIFF');assert.equal(buffer.subarray(8,12).toString(),'WEBP');
 const hash=createHash('sha256').update(buffer).digest('hex');assert(!bytes.has(hash),'Identical photograph under another filename');bytes.add(hash);
 assert(entry.author&&entry.license&&entry.source,'Missing source or license');
}
const visible=new Map();
for(const page of readdirSync(root).filter(p=>p.endsWith('.html')&&!/OFFLINE|calculators_seis/.test(p))){
 const html=readFileSync(new URL(page,root),'utf8');
 for(const match of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)){
  const src=match[1];if(/logo|sabatino|italo|lokation/i.test(src))continue;
  assert(!visible.has(src),'Content image reused: '+src+' in '+visible.get(src)+' and '+page);visible.set(src,page);
 }
}
console.log(entries.length+' photo placements registered; '+visible.size+' content images unique across public pages; source, license and WebP checks passed.');
