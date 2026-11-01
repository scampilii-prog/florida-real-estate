// Reject accidentally saved tool output and incomplete public Q&A data.
import {readFileSync,readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
for(const file of readdirSync(root).filter(f=>f.endsWith('.html')&&!/OFFLINE|calculators_seis/.test(f))){const s=readFileSync(new URL(file,root),'utf8');assert(/^\s*<!doctype html>/i.test(s),file+' must start with its HTML document');assert(!/Warning: truncated output|\d+ tokens truncated|Total output lines: \d+/.test(s),file+' contains saved tool output');}
const questions=readFileSync(new URL('questions.html',root),'utf8');const data=questions.match(/const data=(\[\[[\s\S]*?\]\]);/);assert(data,'Questions data missing');assert.equal(JSON.parse(data[1]).length,1010,'All 1,010 approved questions must be present');
console.log('Source integrity: clean HTML documents and all 1,010 approved questions.');
