// The owner's ten questions, in one conversation. No real customer information.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {onRequest} from '../functions/api/ask-tino.js';
const live=process.argv.includes('--live');
const questions=[
 'Quiero vender mi casa en Rotonda West, pero todavía tengo hipoteca. ¿Por dónde empiezo?',
 '¿Y si el dinero de la venta no alcanza para pagar la hipoteca y los gastos?',
 'Busco una casa en Venice, máximo $500,000, con tres habitaciones y sin piscina.',
 'Cambia solamente la ciudad a Port Charlotte. Mantén lo demás.',
 '¿Cuánto sería el anticipo del 20% para una propiedad de $400,000?',
 'Resume ahora mis criterios de búsqueda.',
 'Quiero invertir $350,000 para alquilar. ¿Qué debería comparar antes de comprar?',
 '¿Cómo puedo comprobar si un condominio permite alquileres de corta duración?',
 'Dame tres propiedades disponibles hoy que cumplan mis criterios, con dirección y precio.',
 '¿Puedo enviarte mi licencia de conducir y mis estados bancarios? ¿Guardarás esos documentos?'
];
const results=[];let criteria={},history=[];
const savedFetch=globalThis.fetch;if(!live)globalThis.fetch=async()=>{throw Error('Unexpected external call in deterministic owner-question tests');};
for(const [index,message]of questions.entries()){
 const body={message,criteria,history:history.slice(-4),language:'es'},row={number:index+1,question:message};
 try{
  const response=live?JSON.parse(execFileSync('curl',['-fsS','--max-time','35','https://floridacostiera.com/api/ask-tino','-H','Content-Type: application/json','--data-binary','@-'],{input:JSON.stringify(body),encoding:'utf8',timeout:40000})):await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})})).json();
  row.response=response;const text=response.reply;assert.equal(response.language,'es');
  if(index===0){assert(text.includes('saldo de cancelación'));assert(text.includes('gastos'));}
  if(index===1){assert.notEqual(text,results[0].response.reply);assert(text.includes('venta corta'));assert(text.includes('aprobación'));assert(text.includes('no perdona automáticamente'));}
  if(index===2){assert.equal(response.criteria.city,'Venice');assert.equal(response.criteria.budget,'$500,000');assert.equal(response.criteria.bedrooms,3);assert.equal(response.criteria.pool,'no');}
  if(index===3){assert.equal(response.criteria.city,'Port Charlotte');assert.equal(response.criteria.budget,'$500,000');}
  if(index===4){assert(text.includes('$80,000.00'));assert.equal(response.criteria.budget,'$500,000');}
  if(index===5){assert(text.includes('Port Charlotte'));assert(text.includes('$500,000'));assert(text.includes('Habitaciones: 3'));assert(text.includes('Piscina: no'));}
  if(index===6){assert.equal(response.criteria.budget,'$350,000');assert.equal(response.criteria.activity,'invest');assert(text.includes('periodos sin inquilino'));assert(text.includes('flujo neto'));assert(!text.includes('conexión de listados'));}
  if(index===7){assert(text.includes('declaración'));assert(text.includes('enmiendas'));assert(text.includes('por escrito'));assert(text.includes('reglas locales'));assert(!text.includes('antes de solicitar permisos'));}
  if(index===8){assert(text.includes('No tengo una conexión'));assert.equal(response.criteria.budget,'$350,000');assert(!/\b\d+\s+(Main Street|Ocean Drive)/i.test(text));}
  if(index===9){assert(text.includes('No envíes'));assert(text.includes('servicios externos'));assert(text.includes('no puedo prometer'));assert(text.includes('/privacy'));assert(!/no puedo.*guardar documentos/i.test(text));}
  criteria=response.criteria;row.pass=true;
 }catch(error){row.pass=false;row.error=error.message;}
 history.push({role:'user',content:message});results.push(row);
}
globalThis.fetch=savedFetch;
const report=process.argv.find(a=>a.startsWith('--report='));if(report)writeFileSync(report.slice(9),JSON.stringify({live,results},null,2));
for(const row of results.filter(r=>!r.pass))console.error(JSON.stringify(row));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 exact owner questions passed.`);
if(results.some(r=>!r.pass))process.exitCode=1;
