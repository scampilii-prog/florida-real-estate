import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {onRequest} from '../functions/api/ask-tino.js';
const questions=["¿Qué inspecciones corresponden a este edificio de condominio y cuándo vencen? ¿Son a los 20, 30, 40 y 50 años?", "¿Se realizó la Milestone y se exigió una segunda fase? ¿Qué documentos debo pedir?", "¿Qué deficiencias se encontraron en el edificio y cuáles siguen pendientes? ¿Qué debo pedir?", "El vendedor dice que las reparaciones del edificio terminaron. ¿Cómo lo compruebo?", "¿Qué reparaciones importantes del condominio vienen próximamente y qué documentación debo pedir?", "¿Existe un SIRS actualizado y cómo se financiará? ¿Qué debo revisar antes de comprar?", "¿Hay derramas aprobadas, propuestas o discutidas? ¿Cómo averiguo cuánto pagaría después del cierre?", "El vendedor dice que la derrama ya está pagada. ¿Qué quedó pagado exactamente y cómo lo compruebo?", "¿Hay préstamos de la asociación o aumentos previstos de mantenimiento? ¿Qué documentos debo pedir?", "¿Existen litigios, problemas de seguro o restricciones de ocupación en el edificio? ¿Qué debo pedir?"];
const checks=[[/30/,/25/,/10/,/pisos habitables/,/ocupación/,/local/],[/fase 1/i,/fase 2/i,/sustancial/,/resumen/],[/ingenier/,/pendientes/,/autoridad/],[/permisos/,/finales/,/cierre/,/factura/],[/mantenimiento/,/contratos/,/actas/],[/reservas/,/saldo/,/financi/,/distint/],[/aprobadas/,/propuestas/,/actas/,/contrato/],[/estoppel/,/unidad/,/futuras/],[/préstamos/,/presupuesto/,/estados financieros/],[/litigios/,/deducibles/,/ocupación/,/prestamista/]];
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
// Broader wording and routing boundaries: building age versus resident age, no invented findings.
if(!live){
 const {buildingGuidance}=await import('../functions/api/ask-tino-building-guidance.js');
 assert.match(buildingGuidance('¿Cuándo vence la recertificación de un condominio de 40 años?','es'),/autoridad local/);
 assert.match(buildingGuidance('¿Qué documentación del vendedor necesito para comprar un condominio?','es'),/diligencia adicional/);
 assert.match(buildingGuidance('¿El SIRS demuestra que el edificio es seguro?','es'),/no certifica/);
 assert.match(buildingGuidance('¿Las obras del edificio ya terminaron?','es'),/No basta una factura/);
 assert.equal(buildingGuidance('¿Hay restricciones de ocupación por edad en este condominio 55+?','es'),null);
 assert.equal(buildingGuidance('What is a SIRS?','en'),null);
}

const report=process.argv.find(x=>x.startsWith('--report='));if(report)writeFileSync(report.slice(9),JSON.stringify({date:'2026-11-07',live,results},null,2));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 building-document questions passed.`);
for(const r of results.filter(r=>!r.pass))console.log(`${r.number}: ${r.error}`);
if(!baseline&&results.some(r=>!r.pass))process.exitCode=1;
