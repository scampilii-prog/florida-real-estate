import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const code=readFileSync(new URL('../assets/inquiry-form.js',import.meta.url),'utf8');
function element(){
 const classes=new Set();
 return {dataset:{},hidden:false,value:'',textContent:'',firstChild:{textContent:''},listeners:{},classList:{toggle(k,on){on?classes.add(k):classes.delete(k)},remove(k){classes.delete(k)}},addEventListener(k,f){this.listeners[k]=f},setAttribute(k,v){this[k]=v},scrollIntoView(){},focus(){this.focused=true},reportValidity(){return true}};
}
for(const type of ['Buying a home','Investing','Selling a property']){
 const form=element();form.hidden=true;
 const choices=element(),selected=element(),back=element(),budget=element(),other=element(),area=element();
 const buttons=['Buying a home','Investing','Selling a property'].map(type=>{const b=element();b.dataset.leadType=type;return b});
 choices.querySelectorAll=()=>buttons;choices.querySelector=()=>buttons[0];
 const nodes={'lead-form':form,'lead-choices':choices,'lead-selected':selected,'lead-back':back,'lead-budget-label':budget,'fc-other-area':other};
 const fields={area:'Siesta Key',budget:'$500,000–$750,000',timeline:'Within 3 months',name:'Test Visitor',email:'test@example.com',phone:'',notes:'Please discuss my plans.',contactLanguage:'English',reach:'Email'};
 class FormData{get(k){return fields[k]??''}}
 const location={search:'',href:''};const document={getElementById:k=>nodes[k],querySelector:()=>area};
 const context={document,window:{location},location,FormData,URLSearchParams,encodeURIComponent};
 vm.runInNewContext(code,context);
 const button=buttons.find(b=>b.dataset.leadType===type);button.listeners.click();
 assert.equal(form.hidden,false);assert.equal(selected.textContent,type);assert.equal(button['aria-pressed'],'true');
 form.listeners.submit({preventDefault(){}});
 assert(location.href.startsWith('mailto:sabatino@floridacostiera.com?subject='));
 const mail=new URLSearchParams(location.href.split('?')[1]);
 assert(mail.get('subject').includes(type));assert(mail.get('body').includes('Siesta Key'));assert(mail.get('body').includes('test@example.com'));
 back.listeners.click();assert.equal(form.hidden,true);assert.equal(buttons[0].focused,true);
 area.value='Other';area.listeners.change();assert.equal(other.hidden,false);
 area.value='Venice';area.listeners.change();assert.equal(other.hidden,true);
 // Initialization is safe if the shared script is loaded twice.
 const handler=form.listeners.submit;vm.runInNewContext(code,context);assert.equal(form.listeners.submit,handler);
 console.log(type+': selection, prepared email, reset and custom area OK');
}
