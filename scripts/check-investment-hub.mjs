import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('calculators.html'),elements={};
for(const m of html.matchAll(/id="(inv-[^"]+)"/g))elements[m[1]]={value:'',textContent:'',style:{},events:{},addEventListener(type,fn){(this.events[type]??=[]).push(fn)}};
for(const m of html.matchAll(/<input[^>]*id="(inv-[^"]+)"[^>]*>/g))elements[m[1]].value=m[0].match(/value="([^"]+)"/)?.[1]||'';
let printed='';const popup={document:{open(){},write(t){printed=t},close(){}},focus(){}};
const scope={document:{getElementById:id=>{assert(elements[id],'Missing '+id);return elements[id]}},Intl,window:{open(){return popup}},alert(){throw Error('Unexpected popup failure')}};
vm.runInNewContext(read('assets/investment-calculator-hub.js'),scope);
vm.runInNewContext(read('assets/investment-hub-extras.js'),scope);
assert.equal(elements['inv-income'].textContent,'$31,920');assert.equal(elements['inv-gross-yield'].textContent,'9.60%');assert.equal(elements['inv-net-yield'].textContent,'4.96%');
assert.equal(elements['inv-scenario-cashflow-change'].textContent,'−$1,400');
elements['inv-scenario-insurance'].value='3600';elements['inv-scenario-insurance'].events.input.forEach(fn=>fn());assert.equal(elements['inv-scenario-cashflow-change'].textContent,'+$0');
elements['inv-investment-report-print'].events.click.forEach(fn=>fn());assert(printed.includes('$17,366')&&printed.includes('Entered Assumptions')&&printed.includes('Scenario annual cash flow'),'Report must include estimates and scenario');
elements['inv-rate'].value='0';elements['inv-rate'].events.input.forEach(fn=>fn());assert.equal(elements['inv-debt'].textContent,'$8,750');
elements['inv-down'].value='100';elements['inv-down'].events.input.forEach(fn=>fn());assert.equal(elements['inv-debt'].textContent,'$0');
for(const alias of ['/investment-center','/investment-center.html','/investment-center/'])assert(read('_redirects').includes(alias+' /calculators#investment-calculator 301'));
assert.equal((html.match(/class="tool-box"/g)||[]).length,7);
assert.equal((html.match(/class="fc-invest-detail"/g)||[]).length,3);
console.log('Investment hub: yields, insurance scenario, printable report, zero-interest/cash cases and legacy redirects passed.');
// Export behavior: capture a real click handler with synthetic data, without opening mail.
let exportClick,reportHtml='',delegated=false;
const field={id:'sample',tagName:'INPUT',type:'number',value:'123',labels:[{textContent:'Sample & input'}]};
const sections={};
for(const id of ['investment-calculator','mortgage','buyer-costs','seller-net','affordability','loans','dates'])sections[id]={id,querySelectorAll(){return [field]},querySelector(selector){return selector==='h2'?{textContent:'Report <'+id+'>'}:{innerText:'Estimated result: $123.45 <example>'}}};
const exportScope={document:{addEventListener(type,fn){if(type==='click')exportClick=fn},getElementById(id){if(sections[id])return sections[id];if(id==='inv-investment-report-print')return {click(){delegated=true}};return elements[id]}},window:{location:{href:''},open(){return {document:{open(){},write(s){reportHtml=s},close(){}},focus(){}}}},alert(){throw Error('Unexpected blocked popup')}};
vm.runInNewContext(read('assets/calculators-export.js'),exportScope);
for(const id of Object.keys(sections)){
 assert(html.includes('data-calc-action="pdf" data-calc-id="'+id+'"'));
 assert(html.includes('data-calc-action="email" data-calc-id="'+id+'"'));
 exportClick({target:{closest(){return {dataset:{calcAction:'email',calcId:id}}}}});
 const email=new URL(exportScope.window.location.href);assert.equal(email.protocol,'mailto:');assert(email.searchParams.get('body').includes('Estimated result: $123.45 <example>'));assert(email.searchParams.get('body').includes('Sample & input: 123'));
 exportClick({target:{closest(){return {dataset:{calcAction:'pdf',calcId:id}}}}});
 if(id!=='investment-calculator')assert(reportHtml.includes('Sample &amp; input')&&reportHtml.includes('&lt;example&gt;'),'PDF data must be escaped');
}
assert(delegated,'Investment PDF must retain its detailed scenario report');
console.log('All seven PDF/email controls: snapshots, mail draft content and escaped reports passed.');
