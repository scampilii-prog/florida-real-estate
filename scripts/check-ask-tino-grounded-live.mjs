import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {topics} from '../functions/api/ask-tino-grounded.js';
import {onRequest} from '../functions/api/ask-tino.js';
const questions=JSON.parse(fs.readFileSync(new URL('../docs/ask-tino-question-bank-100.json',import.meta.url),'utf8')).groups[0].questions;
const live=process.argv.includes('--live'),results=[];let criteria={},history=[];
const saved=globalThis.fetch;if(!live)globalThis.fetch=async()=>{throw Error('offline simulation');};
for(const [i,row]of questions.entries()){
 const body={message:row.question,criteria,history:history.slice(-4),language:'es'};let response,error;
 try{
 response=live?JSON.parse(execFileSync('curl',['-fsS','--max-time','40','https://floridacostiera.com/api/ask-tino','-H','Content-Type: application/json','--data-binary','@-'],{input:JSON.stringify(body),encoding:'utf8',timeout:45000})):await(await onRequest({request:new Request('https://floridacostiera.com/api/ask-tino',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})})).json();
 assert.equal(response.language,'es');assert(response.reply.includes(topics[i].url));assert(response.reply.includes('#tell-us-your-plans'));assert(response.reply.length>150);assert(response.reply.includes(topics[i].answer));
 assert(/Página recuperada ahora|No pude recuperar la página ahora/.test(response.reply));
 assert(!/he verificado|garantizo|busqué en todo internet/i.test(response.reply));
 criteria=response.criteria;
 }catch(e){error=e.message;}
 history.push({role:'user',content:row.question});results.push({...row,response,pass:!error,...(error?{error}:{})});
}
globalThis.fetch=saved;
const report=process.argv.find(a=>a.startsWith('--report='));if(report)fs.writeFileSync(report.slice(9),JSON.stringify({date:'2026-11-08',live,results},null,2));
console.log(`${live?'LIVE':'LOCAL'}: ${results.filter(r=>r.pass).length}/10 grounded-source questions passed.`);
for(const r of results.filter(r=>!r.pass))console.log(JSON.stringify(r));if(results.some(r=>!r.pass))process.exitCode=1;
