// The owner's ten questions, in one conversation. No real customer information.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {selectSources,researchReply} from '../functions/api/ask-tino-research.js';
import {guidanceReply} from '../functions/api/ask-tino-guidance.js';
import {onRequest} from '../functions/api/ask-tino.js';
const live=process.argv.includes('--live');
const questions=["Busco un condominio en Punta Gorda por hasta $350,000, con ascensor y que permita un perro grande.", "Descarta los edificios sin ascensor, aunque el apartamento esté en planta baja.", "Puedo subir a $375,000, pero solamente si tiene dos estacionamientos asignados.", "Resume mis requisitos y distingue qué condiciones todavía necesitan verificarse con la asociación.", "El anuncio dice “sin restricciones de edad”. ¿Cómo compruebo si la comunidad tiene requisitos de ocupación por edad?", "El vendedor dice que una cuota extraordinaria ya está pagada. ¿Qué comprobantes debería pedir antes del cierre?", "El condominio está en litigio. ¿Qué debería investigar sobre sus posibles efectos en gastos, seguro y financiación?", "Quiero poner la propiedad a nombre de una LLC. ¿Qué debería revisar antes de decidirlo?", "Estoy casado, pero la escritura está solamente a mi nombre. ¿Qué debería comprobar antes de firmar para vender?", "Un comprador quiere que acepte una oferta sin entregar todavía la prueba de fondos. ¿Cómo debería evaluar ese riesgo?"];
const results=[];let criteria={},history=[];
const savedFetch=globalThis.fetch;if(!live)globalThis.fetch=async()=>{throw Error('Unexpected external call in deterministic owner-question tests');};
for(const [index,message]of questions.entries()){
 const body={message,criteria,history:history.slice(-4),language:'es'},row={number:index+1,question:message};
 try{
  const response=live?JSON.parse(execFileSync('curl',['-fsS','--max-time','35','https://floridacostiera.com/api/ask-tino','-H','Content-Type: application/json','--data-binary','@-'],{input:JSON.stringify(body),encoding:'utf8',timeout:40000})):await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})})).json();
  row.response=response;const text=response.reply;assert.equal(response.language,'es');
  assert.equal(response.criteria.city,'Punta Gorda');assert.equal(response.criteria.propertyType,'condo');
  assert.equal(response.criteria.budget,'$350,000');assert.equal(response.criteria.elevator,'yes');assert.equal(response.criteria.pets,'yes');assert.equal(response.criteria.petType,'dog');assert.equal(response.criteria.petSize,'large');
  if(index>=1)assert.equal(response.criteria.elevatorRequired,true);
  if(index>=2){assert.deepEqual(response.criteria.conditionalBudget,{amount:'$375,000',assignedParkingSpaces:2});assert.equal(response.criteria.assignedParkingSpaces,undefined);assert.equal(response.criteria.garageSpaces,undefined);}
  if(index===0){assert(text.includes('Ascensor: sí'));assert(text.includes('perro grande'));}
  if(index===1){assert(text.includes('indispensable incluso en planta baja'));assert(text.includes('perro grande'));}
  if(index===2){assert(text.includes('Presupuesto base: $350,000'));assert(text.includes('$375,000 solamente con 2 estacionamientos asignados'));}
  if(index===3){assert(text.includes('no características verificadas'));assert(text.includes('límites de peso'));assert(text.includes('naturaleza jurídica'));assert(text.includes('No he verificado'));assert(text.includes('$350,000'));assert(text.includes('$375,000'));}
  if(index===4){assert(text.includes('política de ocupación por edad'));assert(text.includes('propietario y poder ocupar'));assert(text.includes('documentos discrepan'));assert(!text.startsWith('Contenido de'));}
  if(index===5){assert(text.includes('estoppel actualizado'));assert(text.includes('aplicado a esa unidad'));assert(text.includes('plazos futuros'));assert(!text.includes('por qué las reservas son bajas'));}
  if(index===6){assert(text.includes('litigio'));assert(text.includes('gastos de defensa'));assert(text.includes('deducibles'));assert(text.includes('no toda demanda'));}
  if(index===7){assert(text.includes('homestead'));assert(text.includes('cláusulas de transferencia'));assert(text.includes('no garantiza anonimato'));assert(text.includes('no pasa automáticamente'));}
  if(index===8){assert(text.includes('No asumas que puedes firmar solo'));assert(text.includes('homestead'));assert(text.includes('cónyuge'));assert(!text.includes('LLC'));}
  if(index===9){assert(text.includes('evidencia reciente'));assert(text.includes('fondos líquidos'));assert(text.includes('plazo escrito'));assert(text.includes('no puedo autenticar'));}
  criteria=response.criteria;row.pass=true;
 }catch(error){row.pass=false;row.error=error.message;}
 history.push({role:'user',content:message});results.push(row);
}
globalThis.fetch=savedFetch;
// Test state invariants, alternative wording and privacy guards, not just keywords.
const {updateCriteria,cleanCriteria}=await import('../assets/ask-tino-core.js');
const {condoGuidance}=await import('../functions/api/ask-tino-condo-guidance.js');
const initial={city:'Venice',budget:'$420,000'};
const conditional=updateCriteria(initial,'I can raise my budget to $460,000 only if it has three assigned parking spaces.');
assert.equal(conditional.budget,'$420,000');assert.deepEqual(conditional.conditionalBudget,{amount:'$460,000',assignedParkingSpaces:3});
assert.deepEqual(updateCriteria(conditional,'I can raise my budget to $460,000 only if it has three assigned parking spaces.'),conditional);
assert.equal(updateCriteria(conditional,'My budget is $430,000.').conditionalBudget,undefined);
assert.equal(cleanCriteria({budget:'$350,000',conditionalBudget:{amount:'<script>',assignedParkingSpaces:2}}).conditionalBudget,undefined);
assert.equal(cleanCriteria({elevator:'<script>'}).elevator,undefined);
assert.equal(updateCriteria({pets:'yes',petType:'dog',petSize:'large'},'No pets.').petType,undefined);
for(const [lang,prompt,expected]of [['en','The special assessment was paid. What proof should I ask for?','estoppel'],['it','Il condominio è in litigio. Cosa verificare?','finanziatore'],['pt','Quero uma LLC. O que revisar?','homestead']])assert(condoGuidance(prompt,{},lang).includes(expected));
const {policyReply}=await import('../functions/api/ask-tino-policy.js');
assert(policyReply('Busco un condominio en barrio sin familias con niños',{},'es').includes('características personales protegidas'));
assert(policyReply('¿Puedo enviar estados bancarios para probar fondos?',{},'es').includes('No envíes aquí'));
const report=process.argv.find(a=>a.startsWith('--report='));if(report)writeFileSync(report.slice(9),JSON.stringify({live,results},null,2));
for(const row of results.filter(r=>!r.pass))console.error(JSON.stringify(row));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 sixth-round owner questions passed.`);
if(results.some(r=>!r.pass))process.exitCode=1;
