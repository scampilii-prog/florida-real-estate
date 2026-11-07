import {CONTACT,cleanCriteria,updateCriteria,language,copy} from './ask-tino-core.js?v=20261107-clean1';

// Exactly one sender; page-local structured state, not a shrinking list of facts.
const state={criteria:{},history:[],lang:'en',busy:false};
const labels={en:['Explore buying options','Contact Sabatino','Selling information','Visit Florida Costiera','Call','Send email','Open contact form'],es:['Ver opciones de compra','Contactar a Sabatino','Información para vender','Visitar Florida Costiera','Llamar','Enviar correo','Abrir formulario'],it:['Esplora le opzioni di acquisto','Contatta Sabatino','Informazioni per vendere','Visita Florida Costiera','Chiama','Invia email','Apri modulo'],pt:['Ver opções de compra','Contatar Sabatino','Informações para vender','Visitar Florida Costiera','Ligar','Enviar email','Abrir formulário']};
function renderReply(bubble,text,lang){
 text=text.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,'$2');
 bubble.replaceChildren();bubble.style.whiteSpace='pre-wrap';
 const pattern=/https?:\/\/[^\s<>]+|\b(?:www\.)?floridacostiera\.com(?:\/[^\s<>]*)?|sabatino@floridacostiera\.com|\(941\)\s*270[-– ]4877/g;
 let offset=0;const names=labels[lang]||labels.en;
 for(const match of text.matchAll(pattern)){
  const value=match[0].replace(/[.,;!?]+$/,'');
  bubble.append(document.createTextNode(text.slice(offset,match.index)));
  const link=document.createElement('a');link.textContent=value;
  if(value===CONTACT.email)link.href='mailto:'+CONTACT.email;
  else if(value.startsWith('(941)'))link.href=CONTACT.tel;
  else {
   const url=new URL(value.startsWith('http')?value:'https://'+value);
   if(url.hostname.replace(/^www\./,'')==='floridacostiera.com'){
    url.pathname=url.pathname.replace(/\.html$/,'');
    const key=url.pathname.replace(/^\//,'').replace(/\/$/,'');
    if(['buy','contact','sell',''].includes(key))link.textContent=names[{buy:0,contact:1,sell:2,'':3}[key]];
   }
   link.href=url.href;
  }
  link.style.cssText='color:#153e59;text-decoration:underline;overflow-wrap:anywhere';
  bubble.append(link,document.createTextNode(match[0].slice(value.length)));offset=match.index+match[0].length;
 }
 bubble.append(document.createTextNode(text.slice(offset)));
 if(text.includes(CONTACT.email)){
  const actions=document.createElement('div');actions.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin-top:12px';
  [CONTACT.tel,'mailto:'+CONTACT.email,CONTACT.form].forEach((href,i)=>{const a=document.createElement('a');a.href=href;a.textContent=names[i+4];a.style.cssText='display:inline-flex;align-items:center;min-height:44px;padding:8px 12px;border:1px solid #c6a164;border-radius:10px;color:#102f43;background:white;text-decoration:none;font-weight:700;font-size:14px';actions.append(a);});bubble.append(actions);
 }
}
async function submit(event){
 event.preventDefault();
 const input=document.getElementById('tinoText'),messages=document.getElementById('tinoMessages');
 if(!input||!messages||state.busy)return;
 const message=input.value.trim();if(!message)return;
 state.busy=true;state.lang=language(message,state.lang);state.criteria=updateCriteria(state.criteria,message);
 const history=state.history.slice(-4);state.history.push({role:'user',content:message.slice(0,600)});state.history=state.history.slice(-4);
 const user=document.createElement('div');user.className='tino-bubble';user.textContent=message;user.style.background='#e8f3f0';messages.append(user);input.value='';
 const reply=document.createElement('div');reply.className='tino-bubble';reply.textContent='…';messages.append(reply);reply.scrollIntoView({behavior:'smooth',block:'end'});
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),28000);
 try{
  const response=await fetch('/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({message,criteria:state.criteria,history,language:state.lang})});
  const result=await response.json();if(!response.ok||typeof result.reply!=='string')throw Error('Request failed');
  state.criteria=cleanCriteria(result.criteria||state.criteria);renderReply(reply,result.reply,state.lang);
 }catch{renderReply(reply,copy(state.lang).error+CONTACT.form,state.lang);}
 finally{clearTimeout(timer);state.busy=false;reply.scrollIntoView({behavior:'smooth',block:'end'});}
}
// Capture prevents legacy inline handlers from issuing a second request.
document.addEventListener('submit',event=>{if(event.target.matches('form.tino-input')){event.stopImmediatePropagation();submit(event);}},true);
window.sendTino=submit;
window.fcAskTino={submit};
