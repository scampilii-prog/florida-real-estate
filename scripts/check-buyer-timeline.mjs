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
const nodes={};let downloaded,blob;const drawn=[];
const imageData='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jB1kAAAAASUVORK5CYII=';
const ctx={measureText(t){return {width:String(t).length*13}},fillRect(){},strokeRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fillText(t){drawn.push(t)}};
const canvas={getContext(){return ctx},toDataURL(){return imageData}};
function node(id){return {value:id==='deadline-template'?'asis':id==='deadline-effective'?'2026-10-08':id==='deadline-closing'?'2026-11-04':'',hidden:true,style:{},innerHTML:'',textContent:'',events:{},addEventListener(k,v){this.events[k]=v},querySelectorAll(){return []},querySelector(){return this},focus(){this.focused=true},scrollIntoView(){this.scrolled=true},appendChild(){},setAttribute(){},click(){downloaded=this.download},remove(){}}}
const document={getElementById:id=>nodes[id]||(nodes[id]=node(id)),querySelectorAll:()=>[nodes.start||(nodes.start=node('start'))],createElement:tag=>tag==='canvas'?canvas:node(''),body:node('body')};
const context={document,window:{location:{}},Blob,URL:{createObjectURL(b){blob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout(){},Intl,Date,TextEncoder,btoa:s=>Buffer.from(s,'binary').toString('base64'),alert(){assert.fail('Unexpected alert')}};
vm.runInNewContext(source.replace('reset()})();','reset();globalThis.testTimeline={offsetDate,collect,downloadTimelineAttachment,timelinePicture,exportFormattedEmail,show,getRows:()=>rows};})();'),context);
nodes['timeline-next-tasks'].events.click();assert.equal(nodes['timeline-step-dates'].open,false);assert.equal(nodes['timeline-step-tasks'].open,true);nodes['timeline-next-share'].events.click();assert.equal(nodes['timeline-step-tasks'].open,false);assert.equal(nodes['timeline-step-share'].open,true);
const api=context.testTimeline;assert.equal(api.getRows().length,7);assert.equal((nodes['deadline-editor-rows'].innerHTML.match(/<tr data-index=/g)||[]).length,7);
assert.equal(api.offsetDate('2026-10-09',1,'after','business'),'2026-10-12');assert.equal(api.offsetDate('2028-02-28',1,'after','calendar'),'2028-02-29');
api.getRows()[0].days='3';nodes.start.events.click({preventDefault(){}});assert.equal(api.getRows()[0].days,'3');assert.equal(nodes['timeline-step-dates'].open,true);assert.equal(nodes['timeline-step-share'].open,false);assert(nodes['contract-deadline-planner'].scrolled);api.show();assert.equal(api.collect()[1].date,'2026-10-11');
api.downloadTimelineAttachment();assert.equal(downloaded,'Buyer-Closing-Timeline.html');const attachment=await blob.text();assert(attachment.includes('Buyer Closing Timeline'));assert(attachment.includes('<table'));assert(!attachment.includes('<script'));assert(attachment.endsWith('</body></html>'));
api.timelinePicture();assert.equal(canvas.width,1264);assert(canvas.height>500);assert(drawn.includes('Buyer Closing Timeline'));assert(drawn.includes('10/11/26'));
api.exportFormattedEmail();assert.equal(downloaded,'Buyer-Email-with-Inline-Timeline.eml');const eml=await blob.text();assert(eml.includes('Content-Type: image/png'));assert(eml.includes('Content-Disposition: inline;'));assert(eml.replace(/\s/g,'').includes(imageData.split(',')[1]));
const cid=eml.match(/Content-ID: <([^>]+)>/)[1];const htmlPart=eml.match(/Content-Type: text\/html; charset="UTF-8"\r\nContent-Transfer-Encoding: base64\r\n\r\n([\s\S]*?)\r\n--/)[1];const body=Buffer.from(htmlPart.replace(/\s/g,''),'base64').toString('utf8');assert(body.includes('src="cid:'+cid+'"'));assert(body.includes('Below is our'));assert(!body.includes('src="data:'));
console.log(`PASS: ${count} inline scripts parse; buyer timeline initializes seven rows, computes dates, advances between collapsible steps, and downloads standalone HTML and an email with the framed PNG embedded through a matching CID.`);
