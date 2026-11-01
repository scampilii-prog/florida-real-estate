/* Reserve space for Google's visible translation toolbar; never rebuild the header. */
(function(){
 'use strict';
 var root=document.documentElement,queued=false,last=-1,watched=new WeakSet();
 var selector='iframe.goog-te-banner-frame,iframe.VIpgJd-ZVi9od-ORHb-OEVmcd,.skiptranslate>iframe';
 var resize=typeof ResizeObserver==='function'?new ResizeObserver(schedule):null;
 function schedule(){if(queued)return;queued=true;requestAnimationFrame(measure)}
 function measure(){
  queued=false;var offset=0;
  document.querySelectorAll(selector).forEach(function(frame){
   if(!watched.has(frame)){watched.add(frame);frame.addEventListener('load',schedule);if(resize){resize.observe(frame);if(frame.parentElement)resize.observe(frame.parentElement)}}
   var box=frame.getBoundingClientRect(),style=getComputedStyle(frame);
   if(style.display!=='none'&&style.visibility!=='hidden'&&box.height>=20&&box.height<=100&&box.width>=root.clientWidth*.7&&box.top<=1&&box.bottom>0)offset=Math.max(offset,Math.ceil(box.bottom));
  });
  if(offset!==last){last=offset;root.style.setProperty('--fc-translate-offset',offset+'px')}
 }
 new MutationObserver(schedule).observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['style','class','hidden']});
 window.addEventListener('resize',schedule);window.addEventListener('pageshow',schedule);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',measure,{once:true});else measure();
})();
