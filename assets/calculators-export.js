(function(){
 'use strict';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function collect(section){
  const fields=Array.from(section.querySelectorAll('input,select')).map(el=>{
   const label=el.labels?.[0]?.textContent?.replace(/\s+/g,' ').trim()||el.id;
   const clean=el.tagName==='SELECT'?(el.selectedOptions[0]?.textContent||el.value):el.type==='checkbox'?(el.checked?'Yes':'No'):el.value||'Not entered';
   // A wrapping select label includes every option; keep its own leading text.
   const name=el.tagName==='SELECT'?(el.labels?.[0]?.childNodes[0]?.textContent.trim()||label):label;
   return [name,clean];
  });
  const results=section.querySelector('.tool-results')?.innerText.trim()||'No calculated results available.';
  if(section.id==='investment-calculator'){
   fields.push(['Alternative annual insurance ($)',document.getElementById('inv-scenario-insurance').value]);
  }
  const scenario=section.id==='investment-calculator'?'\nInsurance scenario — change to annual cash flow: '+document.getElementById('inv-scenario-cashflow-change').textContent+'; adjusted cap rate: '+document.getElementById('inv-scenario-cap-rate').textContent:'';
  return {title:section.querySelector('h2').textContent,fields,results:results+scenario};
 }
 function print(data){
  const popup=window.open('','_blank');if(!popup){alert('Please allow pop-ups to open the printable report.');return;}
  const rows=data.fields.map(([k,v])=>'<tr><th>'+esc(k)+'</th><td>'+esc(v)+'</td></tr>').join('');
  const page='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>'+esc(data.title)+' — Florida Costiera</title><style>body{max-width:900px;margin:24px auto;padding:20px;font:14px Arial,sans-serif;color:#102b43}h1{font-size:25px}h2{font-size:18px;margin-top:26px}table{width:100%;border-collapse:collapse}th,td{text-align:left;border-bottom:1px solid #dbe4eb;padding:9px}th{width:65%}pre{font:inherit;white-space:pre-wrap;line-height:1.75;background:#f3f7fa;padding:20px}.note{font-size:11px;line-height:1.7;color:#526b7d}button{background:#102b43;color:white;border:0;border-radius:6px;padding:12px 18px;cursor:pointer}@media print{button{display:none}body{margin:0;padding:0}}</style></head><body><button onclick="window.print()">Print / Save PDF</button><h1>'+esc(data.title)+'</h1><p>Florida Costiera · '+esc(new Date().toLocaleDateString('en-US'))+'</p><h2>Entered Assumptions</h2><table>'+rows+'</table><h2>Estimated Results</h2><pre>'+esc(data.results)+'</pre><p class="note">Planning estimates based on your entries, not a quote, appraisal, loan approval, verified legal deadline or guarantee. Confirm property-specific costs, contract terms and professional advice as appropriate.</p><p class="note">Sabatino Campilii, Realtor® · LoKation® Real Estate · FL License #SL3363040 · (941) 270-4877 · sabatino@floridacostiera.com</p></body></html>';
  popup.document.open();popup.document.write(page);popup.document.close();popup.focus();
 }
 document.addEventListener('click',event=>{
  const button=event.target.closest?.('[data-calc-action]');if(!button)return;
  const section=button.closest('.tool-box');if(!section||section.id!==button.dataset.calcId)return;
  event.preventDefault();event.stopImmediatePropagation();
  const data=collect(section);
  if(button.dataset.calcAction==='pdf'){
   if(section.id==='investment-calculator'){document.getElementById('inv-investment-report-print').click();return;}
   print(data);return;
  }
  const body=data.title+'\nFlorida Costiera · '+new Date().toLocaleDateString('en-US')+'\n\nENTERED ASSUMPTIONS\n'+data.fields.map(([k,v])=>k+': '+v).join('\n')+'\n\nESTIMATED RESULTS\n'+data.results+'\n\nPlanning estimates only. Confirm property-specific costs and contract terms with the appropriate professional.\n\nSabatino Campilii, Realtor® · LoKation® Real Estate\n(941) 270-4877 · sabatino@floridacostiera.com\nhttps://floridacostiera.com/calculators#'+section.id;
  window.location.href='mailto:?subject='+encodeURIComponent(data.title+' — Florida Costiera')+'&body='+encodeURIComponent(body);
 },true);
})();
