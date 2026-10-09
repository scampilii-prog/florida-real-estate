/* Central site identity. Change only this file after selecting a .com domain. */
(function(){
  "use strict";
  var config={
    siteName:"Florida Gulf Coast Real Estate",
    domain:"", // Example after launch: "https://your-new-domain.com"
    agentName:"Sabatino Campilii",
    agentDisplay:"SABATINO CAMPILII",
    brokerage:"LoKation® Real Estate"
  };
  window.FLORIDA_SITE_CONFIG=config;
  function apply(){
    var brandSelectors=['.brand-name','.brand-subtitle','.oc-brand strong','.oc-brand small'];
    document.querySelectorAll('.brand-name,.oc-brand strong').forEach(function(el){el.textContent=config.agentDisplay});
    document.querySelectorAll('.brand-subtitle,.oc-brand small').forEach(function(el){el.textContent=config.siteName});
    document.querySelectorAll('meta[property="og:site_name"]').forEach(function(el){el.setAttribute('content',config.siteName)});
    if(config.domain){
      var base=config.domain.replace(/\/$/,'');
      var path=location.pathname||'/';
      var canonical=document.querySelector('link[rel="canonical"]');
      if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}
      canonical.href=base+path;
      document.querySelectorAll('meta[property="og:url"]').forEach(function(el){el.content=base+path});
    }
    var title=document.querySelector('title');
    if(title){
      var current=title.textContent;
      if(current.includes('Florida Gulf Coast Real Estate')&&config.siteName!=='Florida Gulf Coast Real Estate'){
        title.textContent=current.replace(/Florida Gulf Coast Real Estate/g,config.siteName);
      }
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();