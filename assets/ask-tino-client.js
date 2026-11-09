import {CONTACT,cleanCriteria,updateCriteria,language,copy,sensitiveInput,sensitiveReply} from './ask-tino-core.js?v=20261107-round6';

// Exactly one sender; page-local structured state, not a shrinking list of facts.
const state={criteria:{},history:[],lang:'en',busy:false};
const privacyCopy={
 en:['Messages are processed by this website and may be sent to an external AI service. Do not share identity documents, passwords or bank details. ','Privacy Policy'],
 es:['El sitio procesa tus mensajes y puede enviarlos a un servicio externo de IA. No compartas documentos de identidad, contraseñas ni datos bancarios. ','Política de privacidad'],
 it:['Il sito elabora i messaggi e può inviarli a un servizio AI esterno. Non condividere documenti di identità, password o dati bancari. ','Privacy'],
 pt:['O site processa suas mensagens e pode enviá-las a um serviço externo de IA. Não compartilhe documentos de identidade, senhas ou dados bancários. ','Política de privacidade']
};
function privacyNotice(lang='en'){
 const form=document.querySelector?.('form.tino-input');if(!form)return;
 let notice=form.parentNode.querySelector('.tino-data-notice');
 if(!notice){notice=document.createElement('p');notice.className='tino-data-notice notranslate';notice.setAttribute('translate','no');notice.style.cssText='margin:8px 12px;font-size:12px;line-height:1.5;color:#435b6c';form.before(notice);}
 const text=privacyCopy[lang]||privacyCopy.en,link=document.createElement('a');link.href='/privacy#ask-tino-privacy';link.textContent=text[1];link.style.cssText='color:#153e59;text-decoration:underline';
 notice.replaceChildren(document.createTextNode(text[0]),link);
}
privacyNotice(document.documentElement?.lang?.slice(0,2)||'en');
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
 if(sensitiveInput(message)){
  state.lang=language(message,state.lang);privacyNotice(state.lang);
  const warning=document.createElement('div');warning.className='tino-bubble';warning.textContent=sensitiveReply(state.lang);messages.append(warning);warning.scrollIntoView({behavior:'smooth',block:'end'});return;
 }
 state.busy=true;state.lang=language(message,state.lang);privacyNotice(state.lang);state.criteria=updateCriteria(state.criteria,message);
 const history=state.history.slice(-4);state.history.push({role:'user',content:message.slice(0,600)});state.history=state.history.slice(-4);
 const user=document.createElement('div');user.className='tino-bubble';user.textContent=message;user.style.background='#e8f3f0';messages.append(user);input.value='';
 const reply=document.createElement('div');reply.className='tino-bubble';reply.textContent=({es:'Estoy preparando tu respuesta y, si hace falta, consultando fuentes oficiales…',en:'Preparing your answer and consulting official sources if needed…',it:'Sto preparando la risposta e, se necessario, consultando fonti ufficiali…',pt:'Estou preparando a resposta e, se necessário, consultando fontes oficiais…'}[state.lang]||'…');messages.append(reply);reply.scrollIntoView({behavior:'smooth',block:'end'});
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
// Existing page buttons share this controller, including pages without inline UI code.
window.toggleTino=function(){
 const panel=document.getElementById('tinoPanel');if(!panel)return;
 const open=panel.classList.toggle('open'),launcher=document.querySelector('.tino-launcher');
 launcher?.setAttribute('aria-expanded',String(open));
 if(open)document.getElementById('tinoText')?.focus();else launcher?.focus();
};


// A shareable entry point opens the assistant without submitting a message.
if(window.location?.search && new URLSearchParams(window.location.search).get('ask')==='tino'){
 const panel=document.getElementById('tinoPanel');
 if(panel&&!panel.classList.contains('open'))window.toggleTino();
}
