import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as core from '../assets/ask-tino-core.js';
class Element{
 constructor(){this.children=[];this.style={};this.value='';const classes=new Set();this.classList={toggle(c){if(classes.has(c)){classes.delete(c);return false;}classes.add(c);return true;}};}
 focus(){this.focused=true}
 append(...nodes){this.children.push(...nodes)}
 replaceChildren(...nodes){this.children=nodes}
 setAttribute(k,v){this[k]=v}
 scrollIntoView(){}
 before(node){notices.push(node)}
}
const notices=[],form=new Element(),input=new Element(),messages=new Element(),panel=new Element(),launcher=new Element();
form.parentNode={querySelector:()=>notices[0]};
const document={documentElement:{lang:'en'},querySelector:selector=>selector==='.tino-launcher'?launcher:form,getElementById:id=>id==='tinoPanel'?panel:id==='tinoText'?input:messages,createElement:()=>new Element(),createTextNode:text=>({textContent:text}),addEventListener(){}};
const window={};let calls=0;
const code=fs.readFileSync(new URL('../assets/ask-tino-client.js',import.meta.url),'utf8').replace(/^import[^\n]+\n/,'');
vm.runInNewContext(code,{...core,document,window,URL,AbortController,setTimeout,clearTimeout,fetch:async()=>{calls++;return{ok:true,json:async()=>({reply:'OK'})}}});
assert.equal(calls,0);assert.equal(notices.length,1);
window.toggleTino();assert.equal(launcher['aria-expanded'],'true');assert(input.focused);
window.toggleTino();assert.equal(launcher['aria-expanded'],'false');assert(launcher.focused);
for(const [question,expected]of [['Resume en español','Política de privacidad'],['Riassumi in italiano','Privacy'],['Resuma em português','Política de privacidade'],['Summarize in English','Privacy Policy']]){
 input.value=question;await window.fcAskTino.submit({preventDefault(){}});
 assert.equal(notices.length,1);
 const link=notices[0].children[1];assert.equal(link.href,'/privacy#ask-tino-privacy');assert.equal(link.textContent,expected);
}
const page=fs.readFileSync(new URL('../privacy.html',import.meta.url),'utf8');
assert(page.includes('id="ask-tino-privacy"'));
assert(page.includes('Provider retention periods and model-training settings have not been verified'));
assert(page.includes('does not automatically email Sabatino'));
console.log('PASS: visible chat notice before first send, four languages, no duplicate notices, privacy anchor and accurate provider limits.');
