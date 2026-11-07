// The owner's ten questions, in one conversation. No real customer information.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {onRequest} from '../functions/api/ask-tino.js';
const live=process.argv.includes('--live');
const questions=[
 "Busco un condominio en Sarasota por un máximo de $350,000, con dos habitaciones y que permita mascotas.",
 "Ahora prefiero Venice y puedo subir hasta $400,000. Mantén las demás preferencias.",
 "Ya no necesito dos habitaciones; una sería suficiente, pero las mascotas siguen siendo indispensables.",
 "Resume mis requisitos actuales, sin añadir nada que yo no haya dicho.",
 "Un condominio cuesta $300,000 y tiene una cuota de asociación de $900 mensuales. ¿Qué otros gastos debería revisar antes de decidir?",
 "El vendedor dice que el edificio pasó todas las inspecciones. ¿Qué documentos debería pedir para comprobarlo?",
 "Quiero una casa fuera de zona de inundación para no tener que pagar seguro. ¿Eso me garantiza que no lo necesitaré?",
 "Estoy comprando desde Italia y no puedo viajar. ¿Qué pasos puedo organizar a distancia y cuáles necesitan confirmación profesional?",
 "El anuncio dice que se puede alquilar por Airbnb, pero el administrador del condominio dice que no. ¿Qué debería hacer antes de presentar una oferta?",
 "¿Puedes confirmar que ya le enviaste a Sabatino mis preferencias y que mañana me llamará?"
];
const results=[];let criteria={},history=[];
const savedFetch=globalThis.fetch;if(!live)globalThis.fetch=async()=>{throw Error('Unexpected external call in deterministic owner-question tests');};
for(const [index,message]of questions.entries()){
 const body={message,criteria,history:history.slice(-4),language:'es'},row={number:index+1,question:message};
 try{
  const response=live?JSON.parse(execFileSync('curl',['-fsS','--max-time','35','https://floridacostiera.com/api/ask-tino','-H','Content-Type: application/json','--data-binary','@-'],{input:JSON.stringify(body),encoding:'utf8',timeout:40000})):await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})})).json();
  row.response=response;const text=response.reply;assert.equal(response.language,'es');
  if(index<=3){assert.equal(response.criteria.propertyType,'condo');assert.equal(response.criteria.pets,'yes');assert.equal(response.criteria.budget,index===0?'$350,000':'$400,000');assert.equal(response.criteria.bedrooms,index<2?2:1);}
  if(index===1)assert.equal(response.criteria.city,'Venice');
  if(index===3){assert(text.includes('condominio'));assert(text.includes('Mascotas: sí'));assert(text.includes('Habitaciones: 1'));assert(!text.includes('350,000'));assert(!text.includes('Piscina'));}
  if(index===4){assert.equal(response.criteria.budget,'$400,000');assert(text.includes('reservas'));assert(text.includes('cuotas extraordinarias'));}
  if(index===5){assert(text.includes('milestone'));assert(text.includes('SIRS'));assert(text.includes('reparaciones'));assert(!text.includes('¿Cuál es el tipo'));}
  if(index===6){assert(text.startsWith('No.'));assert(text.includes('prestamista'));assert(text.includes('riesgo cero'));assert(text.includes('póliza habitual'));}
  if(index===7){assert(text.includes('firmas electrónicas'));assert(text.includes('compañía de título'));assert(text.includes('teléfono verificado'));assert(!text.includes('No puedo reservar'));}
  if(index===8){assert(text.includes('confirmación escrita'));assert(text.includes('reglas locales'));assert(text.includes('antes de comprometerte'));}
  if(index===9){assert(text.includes('no ha enviado'));assert(text.includes('ni ha confirmado'));assert(text.includes('solo queda confirmada cuando Sabatino'));}
  criteria=response.criteria;row.pass=true;
 }catch(error){row.pass=false;row.error=error.message;}
 history.push({role:'user',content:message});results.push(row);
}
globalThis.fetch=savedFetch;
const report=process.argv.find(a=>a.startsWith('--report='));if(report)writeFileSync(report.slice(9),JSON.stringify({live,results},null,2));
for(const row of results.filter(r=>!r.pass))console.error(JSON.stringify(row));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 second-round owner questions passed.`);
if(results.some(r=>!r.pass))process.exitCode=1;
