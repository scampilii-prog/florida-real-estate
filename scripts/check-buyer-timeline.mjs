import {readFileSync,readdirSync} from 'node:fs';
import {strict as assert} from 'node:assert';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8');
let count=0;
for(const name of readdirSync(root).filter(n=>n.endsWith('.html')&&!/OFFLINE|calculators_seis/.test(n))){
 for(const m of read(name).matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){
  if(/src=|application\/ld\+json|type="module"/.test(m[1]))continue;
  new vm.Script(m[2],{filename:name+' inline script'});count++;
 }
}
const source=read('assets/buyer-timeline.js');new vm.Script(source);
assert(!read('buy.html').includes('class="deadline-results"'));assert(read('buy.html').includes('id="timeline-step-dates" open'));assert(read('buy.html').includes('id="timeline-step-tasks"'));assert(read('buy.html').includes('id="timeline-step-share"'));
const html=read('buy.html');assert(html.includes('assets/buyer-timeline.js?v='));assert.equal((html.match(/src="assets\/inquiry-form\.js/g)||[]).length,1);
const nodes={};let downloaded,blob;
function node(id){return {value:id==='deadline-template'?'asis':id==='deadline-effective'?'2026-10-08':id==='deadline-closing'?'2026-11-04':'',hidden:true,style:{},innerHTML:'',textContent:'',events:{},addEventListener(k,v){this.events[k]=v},querySelectorAll(){return []},querySelector(){return this},focus(){this.focused=true},scrollIntoView(){this.scrolled=true},appendChild(){},setAttribute(){},click(){downloaded=this.download},remove(){}}}
const document={getElementById:id=>nodes[id]||(nodes[id]=node(id)),createElement:()=>node(''),body:node('body')};
const context={document,window:{location:{}},Blob,URL:{createObjectURL(b){blob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout(){},Intl,Date,TextEncoder,alert(){assert.fail('Unexpected alert')}};
vm.runInNewContext(source.replace('reset()})();','reset();globalThis.testTimeline={offsetDate,collect,downloadTimelineAttachment,show,getRows:()=>rows};})();'),context);
nodes['timeline-next-tasks'].events.click();assert.equal(nodes['timeline-step-dates'].open,false);assert.equal(nodes['timeline-step-tasks'].open,true);nodes['timeline-next-share'].events.click();assert.equal(nodes['timeline-step-tasks'].open,false);assert.equal(nodes['timeline-step-share'].open,true);
const api=context.testTimeline;assert.equal(api.getRows().length,7);assert.equal((nodes['deadline-editor-rows'].innerHTML.match(/<tr data-index=/g)||[]).length,7);
assert.equal(api.offsetDate('2026-10-09',1,'after','business'),'2026-10-12');assert.equal(api.offsetDate('2028-02-28',1,'after','calendar'),'2028-02-29');
api.getRows()[0].days='3';api.show();assert.equal(api.collect()[1].date,'2026-10-11');
api.downloadTimelineAttachment();assert.equal(downloaded,'Buyer-Closing-Timeline.html');const attachment=await blob.text();assert(attachment.includes('Buyer Closing Timeline'));assert(attachment.includes('<table'));assert(!attachment.includes('<script'));assert(attachment.endsWith('</body></html>'));
console.log(`PASS: ${count} inline scripts parse; buyer timeline initializes seven rows, computes dates, advances between collapsible steps, and downloads complete standalone HTML without scripts.`);
