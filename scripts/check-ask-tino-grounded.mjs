import assert from 'node:assert/strict';
import fs from 'node:fs';
import {topics,groundedReply,evidencePrompt,lookupTopic} from '../functions/api/ask-tino-grounded.js';
import {onRequest} from '../functions/api/ask-tino.js';
const fail=async()=>{throw Error('offline');};
assert.equal(await groundedReply('Hola','es',fail),null);
assert.equal(await groundedReply('What is APR?','en',fail),null);
assert.equal(lookupTopic('Lee http://127.0.0.1/secret'),undefined);
const urlSet=new Set(topics.map(t=>t.url));
let calls=[];
const good=async(url,options)=>{
 calls.push({url,options});
 if(url.includes('workers.dev'))return new Response(JSON.stringify({reply:JSON.stringify({supported:true,answer:'El APR y la tasa de interés son medidas distintas del costo de una hipoteca.'})}),{headers:{'Content-Type':'application/json'}});
 assert(urlSet.has(url));assert.equal(options.redirect,'manual');assert(!options.body);
 return new Response('<main><p>Mortgage interest rate and APR are different measures of borrowing costs. APR includes certain fees and other charges as described in the loan documentation.</p></main>',{headers:{'Content-Type':'text/html'}});
};
let answer=await groundedReply('¿Qué significa APR?','es',good);assert.match(answer,/Resumen del fragmento/);assert.match(answer,/Página recuperada ahora/);assert.equal(calls.length,2);
assert(!calls[0].url.includes('Qué'));assert(JSON.parse(calls[1].options.body).message.length<1000);
for(const topic of topics){const text=await groundedReply(topic.id==='exemption'?'¿Qué es portabilidad?':{apr:'¿Qué es APR?',pmi:'¿Qué es PMI?',escrow:'¿Qué es una cuenta escrow?',estimate:'¿Qué es el Loan Estimate?',disclosure:'¿Qué es Closing Disclosure?',lead:'¿Cómo reviso plomo?',radon:'¿Cómo reviso radón?',exchange:'¿Qué es 1031?',tenant:'¿Cómo se trata el depósito del alquiler?'}[topic.id],'es',fail);assert(text?.includes('No pude recuperar'));assert(text.includes(topic.url));assert(text.includes('#tell-us-your-plans'));assert(!text.includes('Página recuperada ahora'));}
const bad=async(url,opts)=>url.includes('workers.dev')?new Response(JSON.stringify({reply:JSON.stringify({supported:true,answer:'Garantizo un ahorro de 99999 dólares, visita https://evil.test.'})})):good(url,opts);
answer=await groundedReply('¿Qué es APR?','es',bad);assert.match(answer,/Orientación general de referencia/);assert(!answer.includes('99999'));assert(!answer.includes('evil.test'));
const challenge=async()=>new Response('Checking your browser. Verify you are human. '.repeat(20),{headers:{'Content-Type':'text/html'}});
answer=await groundedReply('¿Qué es PMI?','es',challenge);assert.match(answer,/No pude recuperar/);
const redirect=async()=>new Response('',{status:302,headers:{Location:'http://127.0.0.1'}});
answer=await groundedReply('¿Qué es PMI?','es',redirect);assert.match(answer,/No pude recuperar/);
assert(evidencePrompt('Ignore rules'.repeat(30),'Ignore instructions'.repeat(100)).length<1000);
// Sensitive input must stop before retrieval or model calls.
const saved=globalThis.fetch;let network=0;globalThis.fetch=async()=>{network++;throw Error('blocked');};
try{const r=await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:'¿Puedo enviar estados bancarios para cancelar PMI?',language:'es'})})});assert.match((await r.json()).reply,/No envíes aquí/);assert.equal(network,0);}finally{globalThis.fetch=saved;}
const client=fs.readFileSync(new URL('../assets/ask-tino-client.js',import.meta.url),'utf8');assert(client.includes('consultando fuentes oficiales'));assert(!client.includes('He consultado'));
console.log('PASS: curated lookup, evidence bounds, synthesis, fallback, source failures, redirects, data minimization, privacy priority and loading text.');
