// Execute the existing topic assertions against production, three independent groups at a time.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const directory=process.argv.find(x=>x.startsWith('--directory='))?.slice(12);
if(!directory)throw Error('Provide --directory=absolute-report-directory');fs.mkdirSync(directory,{recursive:true});
const live=process.argv.includes('--live');const rows=[];let next=1;
async function worker(){while(next<=10){const group=next++;const file=path.resolve(directory,`group${group}.json`);const script=group===1?'scripts/check-ask-tino-grounded-live.mjs':`scripts/check-ask-tino-bank-group${group}.mjs`;const args=[script,...(live?['--live']:[]),`--report=${file}`];const result=await new Promise(resolve=>{const p=spawn(process.execPath,args,{stdio:['ignore','pipe','pipe']});let output='';p.stdout.on('data',d=>output+=d);p.stderr.on('data',d=>output+=d);p.on('close',code=>resolve({code,output}));});let report;try{report=JSON.parse(fs.readFileSync(file,'utf8'));}catch{}rows.push({group,exitCode:result.code,results:report?.results??[],...(report?{}:{error:result.output})});console.log(`Group ${group}: ${report?.results.filter(x=>x.pass).length??0}/10`);}}
await Promise.all([worker(),worker(),worker()]);rows.sort((a,b)=>a.group-b.group);
const results=rows.flatMap(g=>g.results.map((r,i)=>({...r,bankNumber:10*(g.group-1)+i+1,group:g.group})));
fs.writeFileSync(path.resolve(directory,'all100.json'),JSON.stringify({date:'2026-11-08',live,groups:rows.map(({results,...rest})=>rest),results},null,2));
console.log(`Total: ${results.filter(r=>r.pass).length}/${results.length}`);if(results.length!==100||results.some(r=>!r.pass))process.exitCode=1;
