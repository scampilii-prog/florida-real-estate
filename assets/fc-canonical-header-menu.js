/* Home-structure header controls share the same Site Map destination. */
(function(){
 function init(){
  var button=document.querySelector('header.site-header[data-fc-shared-special] .menu-button');
  if(!button)return;
  button.setAttribute('aria-label','Open Site Map');
  button.removeAttribute('aria-expanded');
  button.removeAttribute('aria-controls');
  button.addEventListener('click',function(){window.location.assign('/site-map.html')});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
