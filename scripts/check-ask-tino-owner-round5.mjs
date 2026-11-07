// The owner's ten questions, in one conversation. No real customer information.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {selectSources,researchReply} from '../functions/api/ask-tino-research.js';
import {guidanceReply} from '../functions/api/ask-tino-guidance.js';
import {onRequest} from '../functions/api/ask-tino.js';
const live=process.argv.includes('--live');
const questions=["Quiero vender mi casa en Rotonda West, pero todavía vive un inquilino. ¿Por dónde empiezo?", "El contrato de alquiler termina dentro de ocho meses. ¿Puedo vender antes sin obligarlo a salir?", "Prefiero vender con el inquilino dentro. Resume mi situación sin asumir que la casa estará vacía al cierre.", "¿Qué información debería preparar para Sabatino y qué datos personales del inquilino no debo compartir aquí?", "Recibí dos ofertas: una en efectivo más baja y otra financiada más alta. ¿Qué condiciones debo comparar además del precio?", "El comprador ofrece un depósito grande. ¿Eso garantiza que recibiré ese dinero si cancela?", "La tasación salió por debajo del precio acordado. ¿Qué opciones podríamos revisar?", "Quiero comprar otra casa antes de vender la actual. ¿Qué riesgos y alternativas debería evaluar?", "Soy propietario extranjero. ¿Cómo averiguo si FIRPTA afecta mi venta y cuánto podría retenerse, sin asumir que esa retención es mi impuesto final?", "Necesito quedarme quince días después del cierre. ¿Qué debería acordar por escrito antes de aceptar la oferta?"];
const results=[];let criteria={},history=[];
const savedFetch=globalThis.fetch;if(!live)globalThis.fetch=async()=>{throw Error('Unexpected external call in deterministic owner-question tests');};
for(const [index,message]of questions.entries()){
 const body={message,criteria,history:history.slice(-4),language:'es'},row={number:index+1,question:message};
 try{
  const response=live?JSON.parse(execFileSync('curl',['-fsS','--max-time','35','https://floridacostiera.com/api/ask-tino','-H','Content-Type: application/json','--data-binary','@-'],{input:JSON.stringify(body),encoding:'utf8',timeout:40000})):await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})})).json();
  row.response=response;const text=response.reply;assert.equal(response.language,'es');
  if(index<=6){assert.equal(response.criteria.city,'Rotonda West');assert.equal(response.criteria.activity,'sell');assert.equal(response.criteria.occupancy,'tenant');}
  if(index>=1)assert.equal(response.criteria.leaseRemainingMonths,8);
  if(index===0){assert(text.includes('contrato de alquiler'));assert(text.includes('no permite asumir'));assert(text.includes('visitas'));}
  if(index===1){assert(text.includes('8 meses'));assert(text.includes('no termina automáticamente'));assert(!text.includes('¿Cuál es el tipo'));}
  if(index>=2)assert.equal(response.criteria.salePossession,'tenant');
  if(index===2){assert(text.includes('Rotonda West'));assert(text.includes('8 meses'));assert(text.includes('Entrega prevista: con inquilino'));assert(text.includes('no se ha acordado entrega vacía'));}
  if(index===3){assert(text.includes('Para Sabatino'));assert(text.includes('vencimiento'));assert(text.includes('No compartas nombres'));assert(text.includes('SSN'));assert(text.includes('no subas aquí'));}
  if(index===4){assert(text.includes('neto'));assert(text.includes('prueba de fondos'));assert(text.includes('tasación'));assert(text.includes('no garantiza financiación'));}
  if(index===5){assert(text.startsWith('No.'));assert(text.includes('escrow'));assert(text.includes('Cancelación')||text.includes('Cancelar válidamente'));assert(text.includes('automáticamente'));assert(!text.includes('Boca Grande'));}
  if(index===6){assert(text.includes('reconsideración'));assert(text.includes('aporte'));assert(text.includes('contingencias'));assert(text.includes('no cancela por sí sola'));}
  if(index===7){assert.equal(response.criteria.activity,'buy-sell');assert(text.includes('dos viviendas'));assert(text.includes('más lenta'));assert(text.includes('puente'));assert(text.includes('plan alternativo'));}
  if(index===8){assert(text.includes('nacionalidad'));assert(text.includes('15% del importe realizado'));assert(text.includes('no es el impuesto final'));assert(text.includes('exenciones'));assert(text.includes('irs.gov'));assert(!text.includes('Página consultada ahora'));}
  if(index===9){assert(text.includes('fecha y hora'));assert(text.includes('escrow'));assert(text.includes('seguro'));assert(text.includes('préstamo'));assert(text.includes('retrasarse'));}
  criteria=response.criteria;row.pass=true;
 }catch(error){row.pass=false;row.error=error.message;}
 history.push({role:'user',content:message});results.push(row);
}
globalThis.fetch=savedFetch;
// Variants, validation and access/privacy guards beyond the exact conversation.
const {updateCriteria,cleanCriteria}=await import('../assets/ask-tino-core.js');
const {sellerGuidance}=await import('../functions/api/ask-tino-seller-guidance.js');
assert.equal(cleanCriteria({leaseRemainingMonths:999}).leaseRemainingMonths,undefined);
assert.equal(cleanCriteria({occupancy:'<script>'}).occupancy,undefined);
assert.deepEqual(updateCriteria({occupancy:'tenant',leaseRemainingMonths:8},'Ya no hay inquilino.'),{occupancy:'vacant'});
assert.equal(updateCriteria({},'The lease ends in eight months.').leaseRemainingMonths,8);
for(const [lang,prompt,expected]of [['en','Does a large deposit guarantee I keep it if the buyer cancels?','escrow'],['it','La perizia è bassa. Cosa fare?','finanziatore'],['pt','Quero ficar apos o fechamento. O que acertar?','seguro']])assert(sellerGuidance(prompt,{},lang).includes(expected));
const {policyReply}=await import('../functions/api/ask-tino-policy.js');
assert(policyReply('Quiero vender mi casa con inquilino en un barrio solo para cristianos',{},'es').includes('características personales protegidas'));
assert(policyReply('¿Puedo enviar pasaporte y estados bancarios del inquilino para vender?',{},'es').includes('No envíes aquí'));
const report=process.argv.find(a=>a.startsWith('--report='));if(report)writeFileSync(report.slice(9),JSON.stringify({live,results},null,2));
for(const row of results.filter(r=>!r.pass))console.error(JSON.stringify(row));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 fifth-round owner questions passed.`);
if(results.some(r=>!r.pass))process.exitCode=1;
