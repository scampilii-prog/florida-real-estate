// The owner's ten questions, in one conversation. No real customer information.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {selectSources,researchReply} from '../functions/api/ask-tino-research.js';
import {guidanceReply} from '../functions/api/ask-tino-guidance.js';
import {onRequest} from '../functions/api/ask-tino.js';
const live=process.argv.includes('--live');
const questions=["Busco una casa en Venice o Nokomis por hasta $600,000, con tres habitaciones, dos baños y espacio para una oficina.", "Descarta Venice y deja solamente Nokomis. El presupuesto sigue igual.", "Los dos baños son indispensables, pero la oficina puede ser una habitación adicional.", "Dime qué requisitos son indispensables, cuáles son flexibles y qué información todavía falta.", "Encontré una casa remodelada. ¿Cómo compruebo que las obras tienen los permisos necesarios y que están cerrados?", "El techo tiene 18 años, pero el vendedor dice que el seguro no será un problema. ¿Qué debería verificar antes de comprar?", "La casa tiene paneles solares. ¿Cómo averiguo si son propios, financiados o alquilados y qué obligaciones asumiría?", "Quiero comprar un terreno para construir. ¿Qué debería revisar antes de dar por hecho que puedo edificar la casa que quiero?", "El vendedor me ofrece un descuento si renuncio a la inspección. ¿Qué riesgos debería considerar?", "Una propiedad estuvo alquilada y ahora está vacía. ¿Qué documentos y condiciones debería comprobar antes del cierre?"];
const results=[];let criteria={},history=[];
const savedFetch=globalThis.fetch;if(!live)globalThis.fetch=async()=>{throw Error('Unexpected external call in deterministic owner-question tests');};
for(const [index,message]of questions.entries()){
 const body={message,criteria,history:history.slice(-4),language:'es'},row={number:index+1,question:message};
 try{
  const response=live?JSON.parse(execFileSync('curl',['-fsS','--max-time','35','https://floridacostiera.com/api/ask-tino','-H','Content-Type: application/json','--data-binary','@-'],{input:JSON.stringify(body),encoding:'utf8',timeout:40000})):await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})})).json();
  row.response=response;const text=response.reply;assert.equal(response.language,'es');
  if(index<=3){assert.equal(response.criteria.budget,'$600,000');assert.equal(response.criteria.bedrooms,3);assert.equal(response.criteria.bathrooms,2);assert(text.includes('2'));}
  if(index===0){assert.deepEqual(response.criteria.cities,['Venice','Nokomis']);assert.equal(response.criteria.office,'space');}
  if(index>=1){assert.equal(response.criteria.city,'Nokomis');assert.equal(response.criteria.cities,undefined);}
  if(index===2||index===3){assert.equal(response.criteria.bathroomsRequired,true);assert.equal(response.criteria.office,'extra-room');}
  if(index===3){assert(text.includes('Indispensable confirmado: 2 baños'));assert(text.includes('no has dicho que sea opcional'));assert(text.includes('adicional a las habitaciones'));assert(!text.includes('Venice'));}
  if(index===4){assert(text.includes('jurisdicción'));assert(text.includes('inspecciones finales'));assert(text.includes('estado cerrado'));assert(text.includes('no sustituye'));}
  if(index===5){assert(text.includes('no confirma'));assert(text.includes('vida útil'));assert(text.includes('por escrito'));assert(text.includes('cuatro puntos'));}
  if(index===6){assert(text.includes('PPA'));assert(text.includes('saldo de cancelación'));assert(text.includes('gravámenes'));assert(text.includes('automáticamente'));}
  if(index===7){assert.equal(response.criteria.propertyType,'land');assert(text.includes('servidumbres'));assert(text.includes('séptico'));assert(text.includes('humedales'));assert(!text.includes('paneles'));}
  if(index===8){assert(text.includes('defectos ocultos'));assert(text.includes('contrato'));assert(text.includes('no sustituyen'));assert(!text.includes('terreno'));}
  if(index===9){assert(text.includes('posesión'));assert(text.includes('depósitos'));assert(text.includes('recorrido final'));assert(text.includes('derechos'));assert(!text.includes('Venice'));}
  criteria=response.criteria;row.pass=true;
 }catch(error){row.pass=false;row.error=error.message;}
 history.push({role:'user',content:message});results.push(row);
}
globalThis.fetch=savedFetch;
// Alternate wording and input-boundary coverage beyond the exact ten prompts.
const {updateCriteria,cleanCriteria}=await import('../assets/ask-tino-core.js');
assert.deepEqual(updateCriteria({cities:['Venice','Nokomis']},'Descarta Venice.'),{city:'Nokomis'});
assert.equal(updateCriteria({bedrooms:3},'La oficina puede ser una habitación adicional.').bedrooms,3);
assert.equal(updateCriteria({},'Busco un terreno para construir una casa.').propertyType,'land');
assert.equal(cleanCriteria({bathrooms:2.5}).bathrooms,2.5);
assert.equal(cleanCriteria({bathrooms:2.2}).bathrooms,undefined);
for(const [lang,prompt,expected]of [['en','Solar panels are leased. What obligations transfer?','transfer'],['it','Il tetto è vecchio. Posso avere assicurazione?','condizioni'],['pt','Terreno para construir, o que verificar?','zoneamento']])assert(guidanceReply(prompt,lang).includes(expected));
const report=process.argv.find(a=>a.startsWith('--report='));if(report)writeFileSync(report.slice(9),JSON.stringify({live,results},null,2));
for(const row of results.filter(r=>!r.pass))console.error(JSON.stringify(row));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 fourth-round owner questions passed.`);
if(results.some(r=>!r.pass))process.exitCode=1;
