import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {onRequest} from '../functions/api/ask-tino.js';
const questions=JSON.parse(fs.readFileSync(new URL('../docs/ask-tino-question-bank-100.json',import.meta.url),'utf8')).groups[2].questions.map(q=>q.question);
const checks=[[/neto/,/gastos/,/no garantiza/],[/contingencias/,/deposito|depósito/,/riesgo/],[/escalamiento/,/oferta competidora/,/abogado/],[/fecha efectiva/i,/comunicacion|comunicación/,/cierre/],[/formulario/,/version|versión/,/FR\/Bar/,/CRSP/],[/feriado/,/contrato/,/no asumas/i],[/escrito/,/firmas/,/plazos/],[/venta/,/plazo/,/no asegura/i],[/backup/,/primario/,/deposito|depósito/],[/firma electronica|firma electrónica/,/notarizacion|notarización/,/pais|país/]];
const live=process.argv.includes('--live'),baseline=process.argv.includes('--baseline');
let criteria={},history=[];const results=[];
const saved=globalThis.fetch;if(!live)globalThis.fetch=async()=>{throw Error('Unexpected external model request');};
for(const [i,message] of questions.entries()){
 const body={message,language:'es',criteria,history:history.slice(-4)};let response,error;
 try{response=live?JSON.parse(execFileSync('curl',['-fsS','--max-time','40','https://floridacostiera.com/api/ask-tino','-H','Content-Type: application/json','--data-binary','@-'],{input:JSON.stringify(body),encoding:'utf8',timeout:45000})):await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})})).json();
 assert.equal(response.language,'es');for(const pattern of checks[i])assert.match(response.reply,pattern);
 assert(!/he (verificado|consultado|revisado)/i.test(response.reply));
 if(i===5)assert(!/No te bases solo en el anuncio/.test(response.reply));
 if(i===8)assert(!/garantizo|puedes cancelar automáticamente/.test(response.reply));
 }catch(e){error=e.message;}
 if(response?.criteria)criteria=response.criteria;history.push({role:'user',content:message});results.push({number:i+1,question:message,response,pass:!error,...(error?{error}:{})});
}
globalThis.fetch=saved;
if(!live){
 const {contractGuidance}=await import('../functions/api/ask-tino-contracts.js');
 assert.match(contractGuidance('¿CRSP se cuenta en días hábiles o días calendario?','es'),/2026/);
 assert(!contractGuidance('¿CRSP se cuenta en días hábiles o días calendario?','es').includes('siempre hábiles'));
 assert.match(contractGuidance('¿Tienes acceso a todos los contratos de Florida Realtors, MIAMI REALTORS y Stellar?','es'),/no tengo acceso autenticado/);
 assert.match(contractGuidance('Dame el texto exacto del párrafo 9 del FR\/Bar','es'),/fragmento anonimizado/);
 assert.equal(contractGuidance('¿Qué documentos de permisos pide Miami?','es'),null);
 assert.equal(contractGuidance('What is my effective date?','en'),null);
 const privacy=await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:'¿Puedo enviar estados bancarios con el contrato FR/Bar?',language:'es'})})})).json();assert.match(privacy.reply,/No envíes aquí/);
 const forms=await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:'¿Tienes acceso a todos los contratos de Florida Realtors y Stellar?',language:'es'})})})).json();assert.match(forms.reply,/no tengo acceso autenticado/);
}
const report=process.argv.find(x=>x.startsWith('--report='));if(report)writeFileSync(report.slice(9),JSON.stringify({date:'2026-11-07',live,results},null,2));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 contract group 3 questions passed.`);
for(const r of results.filter(r=>!r.pass))console.log(`${r.number}: ${r.error}`);
if(!baseline&&results.some(r=>!r.pass))process.exitCode=1;
