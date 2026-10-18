/* Shared website search; all results stay on Florida Costiera. */
(function(){
 'use strict';
 var controls='[data-oc-search],.search-icon,.sc-sitemap-search-btn,.sc-cc-search,.sc-legal-search,.sc-booking-search,[data-fc-site-search]';
 var panel,input,list,status,opener,indexPromise;
 function normalize(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
 function rank(pages,query){
  var aliases={casas:'homes',casa:'home',propiedades:'properties',playa:'beach',comprar:'buy',vender:'sell',costos:'costs',calculadora:'calculator',contacto:'contact',preguntas:'questions',construccion:'construction',nueva:'new',comunidades:'communities',hipoteca:'mortgage'};
  var terms=normalize(query).split(/\s+/).filter(Boolean).map(function(t){return aliases[t]||t});
  if(!terms.length)return [];
  return pages.map(function(p){var title=normalize(p.title),text=normalize(p.title+' '+p.description+' '+p.keywords);return {page:p,score:terms.every(function(t){return text.indexOf(t)!==-1})?terms.reduce(function(n,t){return n+(title.indexOf(t)!==-1?5:1)},0):0}}).filter(function(r){return r.score>0}).sort(function(a,b){return b.score-a.score||a.page.title.localeCompare(b.page.title)}).slice(0,12).map(function(r){return r.page});
 }
 function close(){if(panel&&panel.open)panel.close();if(opener){opener.setAttribute('aria-expanded','false');opener.focus()}}
 function render(){
  var query=input.value.trim();list.replaceChildren();
  if(!query){status.textContent='Search communities, guides, calculators and more.';return}
  status.textContent='Searching…';
  indexPromise.then(function(pages){if(input.value.trim()!==query)return;var found=rank(pages,query);status.textContent=found.length?found.length+' matching pages':'No matching pages. Try a city, topic or calculator.';
   found.forEach(function(p){var a=document.createElement('a');a.href=p.url;var title=document.createElement('strong');title.textContent=p.title;var desc=document.createElement('span');desc.textContent=p.description;a.append(title,desc);list.appendChild(a)});
  }).catch(function(){status.textContent='Please use the property search or Site Map below.'});
 }
 function open(button){
  opener=button;button.setAttribute('aria-expanded','true');
  if(!panel){
   var style=document.createElement('style');style.textContent='#fc-site-search{box-sizing:border-box;width:min(720px,calc(100vw - 28px));max-height:85dvh;margin:8vh auto auto;padding:28px;border:1px solid #ccb181;border-top:4px solid #c49a5b;border-radius:14px;background:#fffdf9;color:#102b43;box-shadow:0 24px 80px #071b2b55;font-family:Manrope,Arial,sans-serif;overflow:auto}#fc-site-search::backdrop{background:#071b2bb3}#fc-site-search h2{font:800 25px/1.3 Manrope,Arial,sans-serif;margin:0 40px 22px 0;color:#102b43}#fc-site-search-close{position:absolute;right:17px;top:15px;width:38px;height:38px;border:1px solid #c9d2d8;border-radius:50%;background:#fff;color:#102b43;font-size:26px;cursor:pointer}#fc-site-search label{display:block;font-size:12px;font-weight:800;margin-bottom:8px}#fc-site-search-input{box-sizing:border-box;width:100%;min-height:50px;padding:13px;border:1px solid #91a7b5;border-radius:7px;font:500 16px Manrope,Arial,sans-serif;background:#fff;color:#102b43}#fc-site-search-status{font-size:12px;color:#526b7b;margin:15px 0}#fc-site-search-results{display:grid;gap:9px}#fc-site-search-results a{display:grid;gap:5px;padding:15px;border:1px solid #d7e0e5;border-radius:7px;background:#fff;color:#102b43;text-decoration:none}#fc-site-search-results strong{font-size:14px}#fc-site-search-results span{font-size:12px;line-height:1.6;color:#526b7b}#fc-site-search-results a:hover{border-color:#af8242;background:#faf5eb}#fc-site-search nav{display:flex;gap:18px;flex-wrap:wrap;border-top:1px solid #dfd6c7;padding-top:17px;margin-top:20px}#fc-site-search nav a{font-size:12px;font-weight:800;color:#805b2c}#fc-site-search :focus-visible{outline:3px solid #b78d4c;outline-offset:3px}@media(max-width:600px){#fc-site-search{padding:22px 18px;margin-top:20px;max-height:calc(100dvh - 40px)}}';document.head.appendChild(style);
   panel=document.createElement('dialog');panel.id='fc-site-search';panel.setAttribute('aria-labelledby','fc-site-search-heading');
   panel.innerHTML='<button id="fc-site-search-close" type="button" aria-label="Close search">×</button><h2 id="fc-site-search-heading">Explore Florida Costiera</h2><label for="fc-site-search-input">What would you like to find?</label><input id="fc-site-search-input" type="search" placeholder="Try Venice, closing costs or new construction" autocomplete="off"><p id="fc-site-search-status" role="status" aria-live="polite"></p><div id="fc-site-search-results"></div><nav aria-label="Search shortcuts"><a href="/search-properties">Search properties →</a><a href="/site-map">View Site Map →</a></nav>';
   document.body.appendChild(panel);input=panel.querySelector('input');list=panel.querySelector('#fc-site-search-results');status=panel.querySelector('#fc-site-search-status');
   panel.querySelector('button').addEventListener('click',close);panel.addEventListener('cancel',function(e){e.preventDefault();close()});panel.addEventListener('click',function(e){if(e.target===panel){var r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}});input.addEventListener('input',render);
   indexPromise=fetch('/assets/site-search-index.json').then(function(r){if(!r.ok)throw Error('Search index unavailable');return r.json()});indexPromise.catch(function(){status.textContent='Please use the property search or Site Map below.'});
  }
  if(!panel.open)panel.showModal();render();input.focus();
 }
 function install(){
  document.querySelectorAll('header').forEach(function(header){
   var buttons=header.querySelectorAll(controls);
   if(!buttons.length){var nav=header.querySelector('nav,.header-tools,.oc-actions');if(nav){var b=document.createElement('button');b.type='button';b.dataset.fcSiteSearch='';b.className='sc-legal-search';b.style.cssText='display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border:0;background:transparent;color:white;cursor:pointer';b.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>';nav.prepend(b);buttons=header.querySelectorAll(controls)}}
   buttons.forEach(function(b){b.setAttribute('aria-label','Search website');b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls','fc-site-search');b.setAttribute('aria-expanded','false');b.removeAttribute('onclick');b.removeAttribute('onmouseenter')});
  });
 }
 window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest(controls);if(!b||!b.closest('header'))return;e.preventDefault();e.stopImmediatePropagation();open(b)},true);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
 window.FCWebsiteSearch={rank:rank};
})();
