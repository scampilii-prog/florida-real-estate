import {policyReply,validateModelReply} from './ask-tino-policy.js';
import {researchReply} from './ask-tino-research.js';
import {upstreamPrompt} from './ask-tino-instructions.js';
import siteIndex from './ask-tino-index.js';
import {CONTACT,language,updateCriteria,cleanCriteria,copy,knownReply} from '../../assets/ask-tino-core.js';
const UPSTREAM='https://ask-tino-ai.scampilii.workers.dev/';
function json(body,status=200,extra={}){return new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...extra}});}
export async function onRequest({request}){
 if(request.method!=='POST')return json({error:'Use POST.'},405,{Allow:'POST'});
 const origin=request.headers.get('Origin');if(origin&&origin!==new URL(request.url).origin)return json({error:'Use the website chat.'},403);
 if(!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json'))return json({error:'Send JSON.'},415);
 let body;try{const text=await request.text();if(text.length>16000)return json({error:'Request too large.'},413);body=JSON.parse(text);}catch{return json({error:'Invalid JSON.'},400);}
 const message=typeof body?.message==='string'?body.message.trim():'';
 if(!message||message.length>2000)return json({error:'Enter 1–2,000 characters.'},400);
 const lang=language(message,body.language);
 let previous={};
 // Visitor history supplies criteria only; assistant text is never a fact.
 if(Array.isArray(body.history))for(const item of body.history.slice(-8))if(item?.role==='user'&&typeof item.content==='string')previous=updateCriteria(previous,item.content.slice(0,600));
 const criteria=updateCriteria({...previous,...cleanCriteria(body.criteria)},message);
 const respond=reply=>json({reply,criteria,language:lang});
 const policy=policyReply(message,criteria,lang);if(policy)return respond(policy);
 const researchMessage=/^(?:charlotte|sarasota)(?:\s+county)?[.!]?$/i.test(message.trim()) && body.history?.some(x=>x?.role==='user'&&/englewood/i.test(x.content||'')&&/permit|permis|piscina|pool|zon/i.test(x.content||'')) ? 'Englewood permisos '+message : message;
 const researched=await researchReply(researchMessage,lang,siteIndex);if(researched)return respond(researched);
 const known=knownReply(message,criteria,lang);if(known)return respond(known);
 const prompt=upstreamPrompt(message,criteria,lang,Array.isArray(body.history)?body.history:[]);if(!prompt)return respond(copy(lang).long);
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),24000);
 try{
  const response=await fetch(UPSTREAM,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:prompt}),signal:controller.signal});
  if(!response.ok)throw Error('Upstream unavailable');
  let data=await response.json(),reply=data?.reply??data;
  for(let depth=0;depth<4;depth++){
   if(typeof reply==='string'&&reply.trim().startsWith('{')){try{reply=JSON.parse(reply);}catch{break;}}
   if(reply&&typeof reply==='object')reply=reply.reply??reply.choices?.[0]?.message?.content??'';else break;
  }
  if(typeof reply!=='string'||!reply.trim())throw Error('Empty reply');
  return respond(validateModelReply(reply.trim().replace(/\\n/g,'\n').replace(/\*\*/g,''),lang));
 }catch{return respond(copy(lang).error+CONTACT.form);}
 finally{clearTimeout(timer);}
}

