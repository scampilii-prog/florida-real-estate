import {policyReply,validateModelReply} from './ask-tino-policy.js';
import {researchReply} from './ask-tino-research.js';
import {upstreamPrompt} from './ask-tino-instructions.js';
import siteIndex from './ask-tino-index.js';
import {CONTACT,language,updateCriteria,cleanCriteria,copy,knownReply,sensitiveInput,sensitiveReply} from '../../assets/ask-tino-core.js';
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
 const history=Array.isArray(body.history)?body.history:[];
 if(sensitiveInput(message)||history.some(item=>item?.role==='user'&&sensitiveInput(item.content)))return json({reply:sensitiveReply(lang),criteria:{},language:lang});
 let previous={};
 // Visitor history supplies criteria only; assistant text is never a fact.
 for(const item of history.slice(-8))if(item?.role==='user'&&typeof item.content==='string')previous=updateCriteria(previous,item.content.slice(0,600));
 const supplied=body.criteria&&typeof body.criteria==='object'&&!Array.isArray(body.criteria);
 const criteria=updateCriteria(supplied?cleanCriteria(body.criteria):previous,message);
 const respond=reply=>json({reply,criteria,language:lang});
 const policy=policyReply(message,criteria,lang);if(policy)return respond(policy);
 const researchMessage=/^(?:charlotte|sarasota)(?:\s+county)?[.!]?$/i.test(message.trim()) && history.some(x=>x?.role==='user'&&/englewood/i.test(x.content||'')&&/permit|permis|piscina|pool|zon/i.test(x.content||'')) ? 'Englewood permisos '+message : message;
 const known=knownReply(message,criteria,lang);if(known)return respond(known);
 const researched=await researchReply(researchMessage,lang,siteIndex);if(researched)return respond(researched);
 const prompt=upstreamPrompt(message,criteria,lang,history);if(!prompt)return respond(copy(lang).long);
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

