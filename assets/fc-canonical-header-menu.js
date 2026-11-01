/* Header behavior only. Geometry, logo and controls are authored before JavaScript. */
(function(){
 function init(){
  var header=document.querySelector('.fc-site-header');if(!header)return;
  var menu=header.querySelector('.fc-header-language'),select=header.querySelector('#oc-lang-static');
  var label=header.querySelector('[data-fc-language-label]');
  var names={en:'English',es:'Español',it:'Italiano',pt:'Português'};
  function refresh(){
   var language=names[select.value]?select.value:'en';label.textContent=names[language];
   header.querySelectorAll('[data-fc-language]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.fcLanguage===language))});
  }
  header.querySelectorAll('[data-fc-language]').forEach(function(button){button.addEventListener('click',function(){select.value=button.dataset.fcLanguage;select.dispatchEvent(new Event('change',{bubbles:true}));refresh();menu.open=false;menu.querySelector('summary').focus()})});
  select.addEventListener('change',refresh);
  document.addEventListener('click',function(event){if(!menu.contains(event.target))menu.open=false});
  menu.addEventListener('keydown',function(event){if(event.key==='Escape'){menu.open=false;menu.querySelector('summary').focus()}});
  refresh();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
