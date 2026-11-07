// The owner's ten questions, in one conversation. No real customer information.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {selectSources,researchReply} from '../functions/api/ask-tino-research.js';
import {guidanceReply} from '../functions/api/ask-tino-guidance.js';
import {onRequest} from '../functions/api/ask-tino.js';
const live=process.argv.includes('--live');
const questions=[
 "Busco una casa en Englewood por $450,000, con piscina, garaje para dos carros y sin asociación.",
 "Puedo subir hasta $475,000, pero la piscina ya no es necesaria. El garaje sigue siendo indispensable.",
 "Prefiero conservar el límite de $450,000 y considerar también Port Charlotte.",
 "Resume mis requisitos y dime si hay algo que necesites aclarar, sin escoger una ciudad por mí.",
 "Vi una casa anunciada hace tres meses. ¿Puedes asegurarme que todavía está disponible al mismo precio?",
 "El vendedor ofrece pagar todos los gastos de cierre. ¿Eso significa que no necesitaré dinero para comprar?",
 "La asociación tiene reservas bajas y anuncia una cuota extraordinaria. ¿Qué debería investigar antes de presentar una oferta?",
 "Quiero comprar una propiedad para alquilarla y usarla personalmente dos meses al año. ¿Qué restricciones y costos debería comparar?",
 "Me enviaron por correo nuevas instrucciones para transferir el depósito. ¿Cómo verifico que sean auténticas?",
 "Mi inglés es limitado. ¿Puedes continuar en español y preparar un resumen para que yo se lo envíe a Sabatino, sin enviarlo tú?"
];
const results=[];let criteria={},history=[];
const savedFetch=globalThis.fetch;if(!live)globalThis.fetch=async()=>{throw Error('Unexpected external call in deterministic owner-question tests');};
for(const [index,message]of questions.entries()){
 const body={message,criteria,history:history.slice(-4),language:'es'},row={number:index+1,question:message};
 try{
  const response=live?JSON.parse(execFileSync('curl',['-fsS','--max-time','35','https://floridacostiera.com/api/ask-tino','-H','Content-Type: application/json','--data-binary','@-'],{input:JSON.stringify(body),encoding:'utf8',timeout:40000})):await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})})).json();
  row.response=response;const text=response.reply;assert.equal(response.language,'es');
  if(index<=3){assert.equal(response.criteria.garageSpaces,2);assert.equal(response.criteria.hoa,'no');assert.equal(response.criteria.pool,index===0?'yes':'any');assert.equal(response.criteria.budget,index===1?'$475,000':'$450,000');}
  if(index===0)assert.equal(response.criteria.city,'Englewood');
  if(index===2||index===3){assert.deepEqual(response.criteria.cities,['Englewood','Port Charlotte']);assert.equal(response.criteria.city,undefined);}
  if(index===3){assert(text.includes('Englewood'));assert(text.includes('Port Charlotte'));assert(text.includes('Garaje para carros: 2'));assert(text.includes('Asociación: no'));assert(text.includes('Piscina: sin preferencia'));assert(text.includes('¿Cuántas habitaciones'));assert.equal(response.criteria.bedrooms,undefined);}
  if(index===4){assert(text.includes('No puedo asegurar'));assert(text.includes('precio'));assert(text.includes('no he verificado'));}
  if(index===5){assert(text.startsWith('No necesariamente'));assert(text.includes('anticipo'));assert(text.includes('Cash to Close'));assert(text.includes('estimación escrita'));}
  if(index===6){assert(text.includes('reservas'));assert(text.includes('importe'));assert(text.includes('vencimientos'));assert(text.includes('comprador y vendedor'));}
  if(index===7){assert.equal(response.criteria.use,'mixed');assert.equal(response.criteria.personalUseMonths,2);assert(text.includes('uso personal'));assert(text.includes('días alquilados'));assert(text.includes('tributario'));}
  if(index===8){assert(text.includes('No transfieras'));assert(text.includes('previamente verificado'));assert(text.includes('no el que venga'));assert(text.includes('inmediatamente a tu banco'));}
  if(index===9){assert(text.startsWith('Borrador'));assert(text.includes('Hola, Sabatino'));assert(text.includes('no lo he enviado'));assert(text.includes('$450,000'));assert(text.includes('Englewood'));assert(text.includes('Port Charlotte'));assert(text.includes('2 meses de uso personal'));}
  criteria=response.criteria;row.pass=true;
 }catch(error){row.pass=false;row.error=error.message;}
 history.push({role:'user',content:message});results.push(row);
}
globalThis.fetch=savedFetch;
assert.equal(selectSources('El vendedor ofrece pagar los gastos de cierre').length,0);
assert.equal(await researchReply('¿Qué debería investigar antes de presentar una oferta?','es',[],()=>{throw Error('Unexpected lookup');}),null);
assert(!guidanceReply('Un condominio tiene $1,200 mensuales. ¿Qué otros gastos reviso?','es').includes('$900'));
assert(!guidanceReply('Compro a distancia desde Canada. ¿Qué pasos organizo?','es').includes('desde Italia'));
assert(!guidanceReply('¿Confirmas que ya enviaste mis preferencias ayer?','es').includes('mañana'));
const report=process.argv.find(a=>a.startsWith('--report='));if(report)writeFileSync(report.slice(9),JSON.stringify({live,results},null,2));
for(const row of results.filter(r=>!r.pass))console.error(JSON.stringify(row));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 third-round owner questions passed.`);
if(results.some(r=>!r.pass))process.exitCode=1;
