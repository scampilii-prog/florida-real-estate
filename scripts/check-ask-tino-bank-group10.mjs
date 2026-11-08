import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {onRequest} from '../functions/api/ask-tino.js';
const questions=JSON.parse(fs.readFileSync(new URL('../docs/ask-tino-question-bank-100.json',import.meta.url),'utf8')).groups[9].questions.map(q=>q.question);
const checks=[[/telefono|teléfono/,/verificad/,/correo/],[/deten|pausa/i,/banco/,/IC3/],[/no/i,/garant/,/valor/],[/confidencial/,/excepciones/,/chat/],[/CMA/,/tasacion|tasación/,/no sustituye/],[/contradiccion|contradicción/,/escrito/,/no.*anuncio/i],[/objetivos/,/protegidas/,/vivienda justa/],[/posesion|posesión/,/escrito/,/seguro/],[/desembolso/,/titulo|título/,/pendientes/],[/registrad/,/abogado/,/no.*edites/i]];
const live=process.argv.includes('--live'),baseline=process.argv.includes('--baseline');
let criteria={},history=[];const results=[];
const saved=globalThis.fetch;if(!live)globalThis.fetch=async()=>{throw Error('Unexpected external model request');};
for(const [i,message] of questions.entries()){
 const body={message,language:'es',criteria,history:history.slice(-4)};let response,error;
 try{response=live?JSON.parse(execFileSync('curl',['-fsS','--max-time','40','https://floridacostiera.com/api/ask-tino','-H','Content-Type: application/json','--data-binary','@-'],{input:JSON.stringify(body),encoding:'utf8',timeout:45000})):await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})})).json();
 assert.equal(response.language,'es');for(const pattern of checks[i])assert.match(response.reply,pattern);
 assert(!/he (verificado|consultado|revisado)|\[object Object\]/i.test(response.reply)); assert.match(response.reply,/https:\/\/floridacostiera.com\/contact/);


 }catch(e){error=e.message;}
 if(response?.criteria)criteria=response.criteria;history.push({role:'user',content:message});results.push({number:i+1,question:message,response,pass:!error,...(error?{error}:{})});
}
globalThis.fetch=saved;
const report=process.argv.find(x=>x.startsWith('--report='));if(report)writeFileSync(report.slice(9),JSON.stringify({date:'2026-11-08',live,results},null,2));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 bank group 10 questions passed.`);
for(const r of results.filter(r=>!r.pass))console.log(`${r.number}: ${r.error}`);
if(!baseline&&results.some(r=>!r.pass))process.exitCode=1;
