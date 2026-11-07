import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {upstreamPrompt} from '../functions/api/ask-tino-instructions.js';
import {policyReply} from '../functions/api/ask-tino-policy.js';
import * as core from '../assets/ask-tino-core.js';
import {onRequest} from '../functions/api/ask-tino.js';
let checks=0;function check(fn){fn();checks++;}
let criteria=core.updateCriteria({},'Busco una casa en Englewood, máximo $500,000, con tres habitaciones y sin piscina.');
check(()=>assert.deepEqual(criteria,{city:'Englewood',budget:'$500,000',bedrooms:3,propertyType:'house',pool:'no'}));
check(()=>assert.equal(core.knownReply('Can you summarize my search criteria in English?',criteria,'en'),'Current criteria: Property: house. City: Englewood. Budget: $500,000. Bedrooms: 3. Pool: no.'));
criteria=core.updateCriteria(criteria,'Cambio solo la città: preferisco Venice. Mantieni il budget e la piscina.');
check(()=>assert.equal(criteria.city,'Venice'));check(()=>assert.equal(criteria.budget,'$500,000'));check(()=>assert.equal(criteria.pool,'no'));
criteria=core.updateCriteria(criteria,'Voglio di nuovo la piscina.');check(()=>assert.equal(criteria.pool,'yes'));
criteria=core.updateCriteria(criteria,'Non voglio più la piscina.');check(()=>assert.equal(criteria.pool,'no'));
criteria=core.updateCriteria(criteria,'Cambio il budget a $550.000.');check(()=>assert.equal(criteria.budget,'$550.000'));
criteria=core.updateCriteria(criteria,'Cambio a cuatro habitaciones.');check(()=>assert.equal(criteria.bedrooms,4));
for(let i=0;i<20;i++)criteria=core.updateCriteria(criteria,'Ricordi tutti i miei criteri?');check(()=>assert.equal(criteria.budget,'$550.000'));
for(const [question,lang]of[['Can you summarize in English?','en'],['Riassumi in italiano','it'],['Resume en español','es'],['Resuma em português','pt']])check(()=>assert.equal(core.language(question,'it'),lang));
check(()=>assert.match(core.criteriaText({},'it'),/Non ho ancora/));
check(()=>assert.deepEqual(core.cleanCriteria({city:'Miami and Venice',budget:'invented',bedrooms:-1,pool:'maybe'}),{}));
check(()=>assert.equal(core.money('$600.000'),600000));check(()=>assert.equal(core.money('$600,000'),600000));
check(()=>assert.match(core.knownReply('Si vendo por $450,000 y debo $180,000 de hipoteca, cuánto queda?',{},'es'),/270,000/));
check(()=>assert.match(core.knownReply('Vendo por $150,000 y debo $180,000 de hipoteca',{},'es'),/no cubriría/));
check(()=>assert(!core.knownReply('Quiero vender con hipoteca',{},'es').includes('%')));
check(()=>assert.match(core.knownReply('¿Puedes garantizar vender en 30 días?',{},'es'),/No puedo garantizar/));
check(()=>assert.match(core.knownReply('Puoi prenotare una visita virtuale domani?',{},'it'),/Non posso prenotare/));
check(()=>assert.equal(core.knownReply('Investiga la ley FIRPTA vigente',{},'es'),null));
check(()=>assert.equal(core.knownReply('Investiga en internet',{},'es'),null));
check(()=>assert(!policyReply('Cerco casa a Venice con piscina, budget $600.000.',criteria,'it').includes('mutuo')));
check(()=>assert.match(core.knownReply('¿Cómo contacto a Sabatino?',{},'es'),/sabatino@floridacostiera.com/));
check(()=>assert.equal(upstreamPrompt('x'.repeat(2000),{},'es'),null));
let calls=0,payload='';const realFetch=globalThis.fetch;
globalThis.fetch=async(url,opts)=>{calls++;payload=JSON.parse(opts.body).message;return new Response(JSON.stringify({reply:'General answer'}));};
async function ask(message,criteria={},extras={}){const r=await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,criteria,...extras})})});return{status:r.status,data:await r.json()};}
let result=await ask('Can you summarize my search criteria in English?',criteria);check(()=>assert.equal(calls,0));check(()=>assert.match(result.data.reply,/550.000/));
result=await ask('Tell me about coastal living');check(()=>assert.equal(calls,1));check(()=>assert(payload.length<1000));
globalThis.fetch=async()=>{throw Error('Disconnected');};result=await ask('What is a lanai?');check(()=>assert.match(result.data.reply,/temporarily unavailable/));
const invalid=await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json','Origin':'https://attacker.example'},body:'{}'})});check(()=>assert.equal(invalid.status,403));
// Browser sender simulation: same state object survives many submits and language switches.
class Element{constructor(tag){this.tag=tag;this.style={};this.children=[];this.value='';this.textContent='';}append(...nodes){this.children.push(...nodes)}replaceChildren(){this.children=[]}scrollIntoView(){}matches(selector){return selector==='form.tino-input'} }
const input=new Element('input'),messages=new Element('div'),document={getElementById:id=>id==='tinoText'?input:messages,createElement:t=>new Element(t),createTextNode:t=>({textContent:t}),addEventListener(){}};
let clientRequests=0;const window={};
const client=fs.readFileSync(new URL('../assets/ask-tino-client.js',import.meta.url),'utf8').replace(/^import[^\n]+\n/,'');
globalThis.fetch=realFetch;
vm.runInNewContext(client,{...core,window,document,URL,AbortController,setTimeout,clearTimeout,fetch:async(url,options)=>{clientRequests++;const body=JSON.parse(options.body);return{ok:true,json:async()=>({criteria:body.criteria,reply:core.criteriaText(body.criteria,body.language)})}}});
for(const message of ['Busco casa en Englewood con tres habitaciones, sin piscina, máximo $500,000.','Cambio il budget a $550.000.','Cambio solo la città: Venice.',...Array(15).fill('Ricordi tutti i miei criteri?'),'Can you summarize my search criteria in English?']){input.value=message;await window.fcAskTino.submit({preventDefault(){}});}
check(()=>assert.equal(clientRequests,19));const final=messages.children.at(-1);check(()=>assert(JSON.stringify(final).includes('$550.000')));check(()=>assert(JSON.stringify(final).includes('Bedrooms: 3')));check(()=>assert(JSON.stringify(final).includes('Pool: no')));
check(()=>assert(Math.abs(core.monthlyPrincipalInterest(300000,6,30)-1798.65)<.01));
check(()=>assert.equal(core.monthlyPrincipalInterest(120000,0,10),1000));
check(()=>assert.equal(core.monthlyPrincipalInterest(120000,-1,10),null));
check(()=>assert(core.knownReply('Calcula el anticipo del 20% para $600,000',{},'es').includes('$120,000.00')));
check(()=>assert(core.knownReply('Calcula la cuota mensual de un préstamo de $300,000 al 6% a 30 años',{},'es').includes('$1,798.65')));
check(()=>assert(core.knownReply('Calcula la cuota mensual de mi préstamo',{},'es').includes('Indica')));
console.log('PASS:',checks,'checks: criteria, language, calculations, limits, errors, API validation and browser sender.');

