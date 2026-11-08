import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {onRequest} from '../functions/api/ask-tino.js';
const questions=["La asociación dice que una reforma le permite aplazar el SIRS. ¿Qué condiciones debe cumplir y qué documentos debo pedir para comprobar que ese aplazamiento corresponde a este edificio?", "La asociación suspendió temporalmente las aportaciones a reservas para pagar reparaciones. ¿Qué aprobación necesita y cómo puedo saber cuánto aumentarán mis pagos cuando se reanuden?", "El edificio ya tenía una inspección de recertificación local. ¿Puede utilizarse para cumplir alguna parte del SIRS o todavía necesita estudios adicionales?", "El vendedor todavía no me ha entregado los documentos del condominio. ¿Cuáles debe proporcionar, cómo registro cuándo los recibí y qué derechos de revisión o cancelación podrían corresponderme?", "Voy a comprar directamente al desarrollador. ¿Son iguales los documentos y plazos de revisión que en una reventa entre particulares?", "¿Qué declaración sobre inundaciones debe entregarme el vendedor y cuándo debe hacerlo? ¿Incluye daños conocidos, reclamaciones de seguro y ayuda recibida de FEMA?", "El vendedor declara que nunca tuvo inundaciones. ¿Eso demuestra que la casa no tiene riesgo o debo revisar otros documentos antes de comprar?", "El techo tiene más de quince años. ¿La aseguradora puede exigir reemplazarlo únicamente por su edad o puedo presentar una inspección de vida útil restante?", "El techo tiene menos de quince años, pero presenta daños. ¿La protección legal relacionada con su edad garantiza que la aseguradora acepte la casa?", "Voy a comprar una casa con HOA. ¿Qué resumen de obligaciones debo recibir antes de firmar y qué documentos adicionales necesito para conocer cuotas, derramas y restricciones?"];
const checks=[[/dos ejercicios/,/fundamento/,/no es automático/],[/mayoría/,/2028/,/dos presupuestos/,/SIRS/],[/5 años/,/visual/,/no sustituye/],[/7 días/,/sábados/,/recepción/,/escrito/],[/15 días/,/7 días/,/desarrollador/,/reventa/],[/antes o al firmar/,/FEMA/,/reclamaciones/],[/no elimina/,/FEMA/,/seguro/],[/15 años/,/5 años/,/autorizado/,/únicamente/],[/no garantiza/,/daños/,/edad/],[/antes de firmar/,/720/,/reglamentos/,/derramas/]];
const live=process.argv.includes('--live'),baseline=process.argv.includes('--baseline');
let criteria={},history=[];const results=[];
const saved=globalThis.fetch;if(!live)globalThis.fetch=async()=>{throw Error('Unexpected external model request');};
for(const [i,message] of questions.entries()){
 const body={message,language:'es',criteria,history:history.slice(-4)};let response,error;
 try{response=live?JSON.parse(execFileSync('curl',['-fsS','--max-time','40','https://floridacostiera.com/api/ask-tino','-H','Content-Type: application/json','--data-binary','@-'],{input:JSON.stringify(body),encoding:'utf8',timeout:45000})):await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})})).json();
 assert.equal(response.language,'es');for(const pattern of checks[i])assert.match(response.reply,pattern);
 assert(!/he (verificado|consultado|revisado)/i.test(response.reply));
 }catch(e){error=e.message;}
 if(response?.criteria)criteria=response.criteria;history.push({role:'user',content:message});results.push({number:i+1,question:message,response,pass:!error,...(error?{error}:{})});
}
globalThis.fetch=saved;
if(!live){
 const {floridaLawGuidance}=await import('../functions/api/ask-tino-florida-laws.js');
 assert.match(floridaLawGuidance('¿Puede aplazarse el SIRS?','es'),/no es automático/);
 assert.match(floridaLawGuidance('¿La recertificación local sirve para la parte visual del SIRS?','es'),/no sustituye/);
 assert.match(floridaLawGuidance('¿La HOA debe dar documentos antes de firmar?','es'),/720/);
 assert.equal(floridaLawGuidance('¿Cuánto cuesta este techo?','es'),null);
 assert.equal(floridaLawGuidance('What are the roof insurance rules?','en'),null);
 const request=new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:'¿Puedo enviar estados bancarios para revisar mi seguro de techo de quince años?',language:'es'})});
 assert.match((await(await onRequest({request})).json()).reply,/No envíes aquí/);
}
const report=process.argv.find(x=>x.startsWith('--report='));if(report)writeFileSync(report.slice(9),JSON.stringify({date:'2026-11-07',live,results},null,2));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 Florida-law questions passed.`);
for(const r of results.filter(r=>!r.pass))console.log(`${r.number}: ${r.error}`);
if(!baseline&&results.some(r=>!r.pass))process.exitCode=1;
