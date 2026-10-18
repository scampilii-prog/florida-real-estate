import {strict as assert} from 'node:assert';
const {onRequest}=await import(new URL('../functions/api/ask-tino.js',import.meta.url));
const base='https://floridacostiera.com/api/ask-tino';
const req=(message,headers={})=>new Request(base,{method:'POST',headers:{'Content-Type':'application/json','Origin':'https://floridacostiera.com',...headers},body:JSON.stringify({message})});
let calls=0;
globalThis.fetch=async(url,options)=>{calls++;assert.equal(url,'https://ask-tino-ai.scampilii.workers.dev/');assert(JSON.parse(options.body).message.includes('Verified Florida Costiera'));return new Response(JSON.stringify({reply:'You can explore communities and contact Sabatino for personal guidance.'}),{headers:{'Content-Type':'application/json'}})};
for(const message of ['How can I contact Sabatino?','¿Cuál es su teléfono?','Come posso contattare Sabatino?','Qual é o telefone?']){
 const response=await onRequest({request:req(message)}),data=await response.json();assert.equal(response.status,200);assert(data.reply.includes('(941) 270-4877'));assert(data.reply.includes('sabatino@floridacostiera.com'));
}
assert.equal(calls,0,'Contact answers must never depend on the model');
let response=await onRequest({request:req('What should I consider when buying a waterfront home?')});assert.equal(response.status,200);assert((await response.json()).reply.includes('communities'));assert.equal(calls,1);
assert.equal((await onRequest({request:req('Hello',{'Origin':'https://other.example'})})).status,403);
assert.equal((await onRequest({request:req('')})).status,400);
assert.equal((await onRequest({request:req('x'.repeat(2001))})).status,400);
assert.equal((await onRequest({request:new Request(base)})).status,405);
globalThis.fetch=async()=>new Response('not json');assert.equal((await onRequest({request:req('Hello')})).status,502);
globalThis.fetch=async()=>new Response(JSON.stringify({error:'private upstream error'}),{status:500});response=await onRequest({request:req('Hello')});assert.equal(response.status,502);assert(!(await response.text()).includes('private upstream'));
console.log('PASS: same-origin relay, verified contact answers, 4-language requests, request validation, foreign-origin rejection, and upstream failures.');
