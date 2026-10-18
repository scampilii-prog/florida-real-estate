import {readFileSync,readdirSync} from 'node:fs';
import {strict as assert} from 'node:assert';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8');
let count=0;
for(const name of readdirSync(root).filter(n=>n.endsWith('.html')&&!/OFFLINE|calculators_seis/.test(n))){for(const m of read(name).matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){if(/src=|application\/ld\+json|type="module"/.test(m[1]))continue;new vm.Script(m[2],{filename:name+' inline script'});count++}}
const source=read('assets/buyer-timeline.js');new vm.Script(source);
const html=read('buy.html');assert(html.includes('class="deadline-planner fc-timeline fc-simple-timeline"'));assert(html.includes('id="timeline-live-list"'));assert(!html.includes('class="deadline-results"'));assert(!html.includes('id="timeline-step-dates"'));assert(!html.includes('id="closing-email-preview"'));assert.equal((html.match(/src="assets\/inquiry-form\.js/g)||[]).length,1);
const nodes={},drawn=[];let downloaded,blob;
const imageData='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jB1kAAAAASUVORK5CYII=';
const ctx={measureText(t){return {width:String(t).length*13}},fillRect(){},strokeRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fillText(t){drawn.push(t)}};
const canvas={getContext(){return ctx},toDataURL(){return imageData}};
function node(id){return {value:id==='deadline-template'?'asis':id==='deadline-effective'?'2026-10-08':id==='deadline-closing'?'2026-11-04':'',hidden:true,style:{},innerHTML:'',textContent:'',events:{},addEventListener(k,v){this.events[k]=v},querySelectorAll(){return []},querySelector(){return this},showModal(){this.open=true},close(){this.open=false},focus(){this.focused=true},scrollIntoView(){this.scrolled=true},appendChild(){},setAttribute(){},click(){downloaded=this.download},remove(){}}}
const document={getElementById:id=>nodes[id]||(nodes[id]=node(id)),querySelectorAll:()=>[nodes.start||(nodes.start=node('start'))],createElement:tag=>tag==='canvas'?canvas:node(''),body:node('body')};
const windowEvents={};let backCount=0;const browserWindow={location:{href:'https://floridacostiera.com/buy'},addEventListener(k,fn){windowEvents[k]=fn},history:{state:null,pushState(state){this.state=state},back(){backCount++;this.state=null;windowEvents.popstate()}}};
const context={document,window:browserWindow,Blob,URL:{createObjectURL(b){blob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout(){},Intl,Date,TextEncoder,btoa:s=>Buffer.from(s,'binary').toString('base64'),alert(){assert.fail('Unexpected alert')}};
vm.runInNewContext(source.replace('reset()})();','reset();globalThis.testTimeline={offsetDate,collect,timelinePicture,exportFormattedEmail,viewEmailPreview,openTimelineModal,closeTimelineModal,show,getRows:()=>rows};})();'),context);
const api=context.testTimeline;assert.equal(api.getRows().length,3);assert.equal((nodes['deadline-editor-rows'].innerHTML.match(/<article class="fc-simple-task"/g)||[]).length,3);assert(nodes['timeline-live-list'].innerHTML.includes('Buyer inspection deadline'));
assert.equal(api.offsetDate('2026-10-09',1,'after','business'),'2026-10-12');assert.equal(api.offsetDate('2028-02-28',1,'after','calendar'),'2028-02-29');
api.getRows()[0].days='3';api.show();assert.equal(api.collect()[1].date,'2026-10-11');assert(nodes['timeline-live-list'].innerHTML.includes('10/11/26'));
nodes['deadline-effective'].value='2026-10-10';nodes['deadline-effective'].events.input();assert(nodes['timeline-live-list'].innerHTML.includes('10/13/26'));
nodes.start.events.click({preventDefault(){}});assert.equal(api.getRows()[0].days,'3');assert(nodes['contract-deadline-planner'].scrolled);
api.timelinePicture();assert.equal(canvas.width,1264);assert(canvas.height>500);assert(drawn.includes('Buyer Contract Milestones'));assert(drawn.includes('5 total · 0 completed'));assert(drawn.includes('10/13/26'));
api.exportFormattedEmail();assert.equal(downloaded,'Buyer-Email-with-Inline-Timeline.eml');const eml=await blob.text();assert(eml.includes('Content-Type: image/png'));assert(eml.includes('Content-Disposition: inline;'));assert(eml.replace(/\s/g,'').includes(imageData.split(',')[1]));
const cid=eml.match(/Content-ID: <([^>]+)>/)[1],htmlPart=eml.match(/Content-Type: text\/html; charset="UTF-8"\r\nContent-Transfer-Encoding: base64\r\n\r\n([\s\S]*?)\r\n--/)[1];const body=Buffer.from(htmlPart.replace(/\s/g,''),'base64').toString('utf8');assert(body.includes('src="cid:'+cid+'"'));assert(body.includes('width="440"'));
const modal=node('test-modal');modal.id='test-modal';api.openTimelineModal(modal);assert(modal.open);assert.equal(browserWindow.history.state.fcTimelineModal,'test-modal');browserWindow.history.back();assert.equal(modal.open,false);api.openTimelineModal(modal);api.closeTimelineModal();assert.equal(modal.open,false);assert.equal(backCount,2);
api.viewEmailPreview();assert(nodes['timeline-email-dialog'].open);assert(nodes['timeline-email-dialog'].innerHTML.includes('width="440"'));assert(nodes['timeline-email-dialog'].innerHTML.includes('Dear Buyer'));browserWindow.history.back();assert.equal(nodes['timeline-email-dialog'].open,false);
console.log(`PASS: ${count} inline scripts parse; compact editor starts with three tasks, updates the visible timeline on input, preserves work, embeds the report in email, shows its compact email preview, and closes modal views with browser Back.`);
