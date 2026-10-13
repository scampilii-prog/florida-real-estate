/* Single navigation handler for Home-structure headers on Site Map and Closing Costs. */
(function(){
function init(){
 var header=document.querySelector('header.site-header[data-fc-shared-special]');
 if(!header)return;
 var button=header.querySelector('.menu-button');
 if(!button)return;
 var panel=document.createElement('nav');
 panel.className='fc-header-menu-panel';panel.hidden=true;
 panel.id='fc-shared-header-navigation';panel.setAttribute('aria-label','Main website navigation');
 var links=[['Home','index.html'],['Search Properties','search-properties.html'],['Buy','buy.html'],['Sell','sell.html'],['Communities','communities.html'],['New Construction','new-construction.html'],['Calculators','calculators.html'],['Closing Costs','closing-costs.html'],['1,000 Questions & Answers','questions.html'],['About','about.html'],['Contact','contact.html#tell-us-your-plans'],['Site Map','site-map.html']];
 links.forEach(function(item){var a=document.createElement('a');a.href=item[1];a.textContent=item[0];panel.appendChild(a)});
 document.body.appendChild(panel);
 button.setAttribute('aria-expanded','false');
 button.setAttribute('aria-controls',panel.id);
 function close(){panel.hidden=true;button.setAttribute('aria-expanded','false')}
 button.addEventListener('click',function(){var open=panel.hidden;panel.hidden=!open;button.setAttribute('aria-expanded',String(open))});
 document.addEventListener('click',function(e){if(!header.contains(e.target)&&!panel.contains(e.target))close()});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
