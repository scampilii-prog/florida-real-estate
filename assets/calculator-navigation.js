(function(){
 'use strict';
 const nav=document.querySelector('.tool-nav');if(!nav)return;
 nav.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');if(!link||!nav.contains(link))return;
  const id=link.getAttribute('href').slice(1),section=document.getElementById(id);
  if(!section?.classList.contains('tool-box'))return;
  event.preventDefault();event.stopImmediatePropagation();
  if(location.hash!=='#'+id)history.pushState(null,'','#'+id);
  const header=document.querySelector('.fc-site-header');
  const offset=Math.max(0,header?.getBoundingClientRect().bottom||98)+14;
  section.setAttribute('tabindex','-1');section.focus({preventScroll:true});
  window.scrollTo({top:Math.max(0,window.scrollY+section.getBoundingClientRect().top-offset),behavior:'instant'});
 },true);
})();
