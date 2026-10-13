/* Compact accessible language dropdown; keep original select as translation source. */
(function(){
  function init(){
    var select=document.querySelector('#oc-lang-static, #lang');
    if(!select || document.querySelector('.sc-language-widget'))return;
    var options=Array.from(select.options).filter(function(o){return o.value;});
    if(options.length<2)return;
    var widget=document.createElement('span');widget.className='sc-language-widget';
    var trigger=document.createElement('button');trigger.type='button';trigger.className='sc-language-trigger';
    trigger.setAttribute('aria-label','Choose language');trigger.setAttribute('aria-haspopup','listbox');
    trigger.setAttribute('aria-expanded','false');
    var label=document.createElement('span');label.className='sc-language-label';
    var arrow=document.createElement('span');arrow.className='sc-language-arrow';arrow.setAttribute('aria-hidden','true');
    trigger.append(label,arrow);
    var menu=document.createElement('div');menu.className='sc-language-options';menu.setAttribute('role','listbox');
    menu.setAttribute('aria-label','Choose language');menu.hidden=true;
    function refresh(){
      var found=options.find(function(o){return o.value===select.value;})||options[0];
      label.textContent=found.textContent.trim().replace(/^(EN|ES|IT|PT)\s*[—–-]\s*/i,'');
      Array.from(menu.children).forEach(function(el){el.setAttribute('aria-selected',String(el.dataset.lang===select.value));});
    }
    function close(){menu.hidden=true;trigger.setAttribute('aria-expanded','false');}
    function open(){menu.hidden=false;trigger.setAttribute('aria-expanded','true');}
    options.forEach(function(option){
      var item=document.createElement('button');item.type='button';item.className='sc-language-option';
      item.setAttribute('role','option');item.dataset.lang=option.value;
      item.textContent=option.textContent.trim().replace(/^(EN|ES|IT|PT)\s*[—–-]\s*/i,'');
      item.addEventListener('click',function(){
        select.value=option.value;
        select.dispatchEvent(new Event('change',{bubbles:true}));
        refresh();close();trigger.focus();
      });
      menu.appendChild(item);
    });
    trigger.addEventListener('click',function(){menu.hidden?open():close();});
    trigger.addEventListener('keydown',function(e){
      if(e.key==='Escape'){close();return;}
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){
        e.preventDefault();open();
        var items=Array.from(menu.children),idx=items.findIndex(function(el){return el.dataset.lang===select.value;});
        var next=items[(idx+(e.key==='ArrowDown'?1:items.length-1))%items.length];
        if(next)next.focus();
      }
    });
    menu.addEventListener('keydown',function(e){
      if(e.key==='Escape'){e.preventDefault();close();trigger.focus();}
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){
        e.preventDefault();var items=Array.from(menu.children),i=items.indexOf(document.activeElement);
        items[(i+(e.key==='ArrowDown'?1:items.length-1))%items.length].focus();
      }
    });
    document.addEventListener('click',function(e){if(!widget.contains(e.target))close();});
    select.parentNode.insertBefore(widget,select);
    widget.appendChild(select);widget.append(trigger,menu);
    select.style.setProperty('display','none','important');
    select.addEventListener('change',refresh);

    /* Footer is authored directly in HTML. Do not duplicate it. */
    refresh();
  }
  var css='.sc-language-widget{position:relative;display:inline-flex;flex:0 0 auto;align-items:center;z-index:1002;font-family:Manrope,Arial,sans-serif!important}'+
  '.sc-language-trigger{box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;justify-content:space-between!important;gap:7px!important;width:119px!important;min-width:119px!important;max-width:119px!important;height:42px!important;padding:0 9px!important;border:1px solid #8298ab!important;border-radius:8px!important;background:#102b43!important;color:#fff!important;font:500 12px Manrope,Arial,sans-serif!important;white-space:nowrap!important;cursor:pointer!important;line-height:1!important}'+
  '.sc-language-label{overflow:hidden;text-overflow:clip;white-space:nowrap!important}.sc-language-arrow{width:8px;height:8px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg) translateY(-2px);flex:0 0 8px}'+
  '.sc-language-options{position:absolute!important;top:calc(100% + 5px)!important;right:0!important;width:119px!important;min-width:119px!important;max-width:119px!important;box-sizing:border-box!important;background:#102b43!important;border:1px solid #8298ab!important;border-radius:9px!important;padding:4px!important;box-shadow:0 8px 20px #0004!important;z-index:99999!important}'+
  '.sc-language-options[hidden]{display:none!important}.sc-language-option{display:block!important;width:100%!important;text-align:left!important;background:transparent!important;border:0!important;color:#fff!important;padding:9px 6px!important;border-radius:5px!important;font:500 12px Manrope,Arial,sans-serif!important;cursor:pointer!important;white-space:nowrap!important}'+
  '.sc-language-option:hover,.sc-language-option:focus-visible,.sc-language-option[aria-selected=true]{background:#24455f!important;outline:none!important}'+
  '.sc-language-trigger:focus-visible{outline:2px solid #d8b66b!important;outline-offset:2px!important}'+
  '.sc-language-widget select{display:none!important}'+
  '.sc-language-widget::after,.oc-lang:has(.sc-language-widget)::after,.header-tools .language:has(.sc-language-widget)::after{display:none!important;content:none!important}'+
  '@media(max-width:390px){.sc-language-trigger{width:105px!important;min-width:105px!important;max-width:105px!important;padding:0 7px!important;gap:4px!important;font-size:11px!important}.sc-language-options{width:112px!important;min-width:112px!important;max-width:112px!important}.sc-language-option{font-size:11px!important;padding:9px 4px!important}}';
  css += '.sc-footer-language{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center;padding:24px 16px 30px;border-top:1px solid rgba(255,255,255,.18);background:#102b43;color:#fff;font-family:Manrope,Arial,sans-serif!important}'+
  '.sc-footer-language-caption{font-size:11px;font-weight:650;letter-spacing:.11em;color:#dfc48c}'+
  '.sc-footer-language-select{appearance:auto!important;min-width:160px!important;max-width:230px!important;background:#102b43!important;color:#fff!important;border:1px solid #b99b63!important;border-radius:7px!important;padding:10px 13px!important;font:600 13px Manrope,Arial,sans-serif!important;cursor:pointer!important}'+
  '.sc-footer-language-select option{background:#102b43!important;color:#fff!important}'+
  '.sc-footer-language-select:focus-visible{outline:2px solid #dfc48c!important;outline-offset:3px!important}';
  css += '.sc-legal-footer{background:#0b2134!important;color:#dce4ec!important;padding:26px clamp(16px,3vw,50px) 22px!important;font-family:Manrope,Arial,sans-serif!important}'+
  '.sc-legal-disclosure{max-width:1140px;margin:0 auto 25px;font-size:11px;line-height:1.8;color:#d1dbe3}.sc-legal-disclosure strong{font-size:12px;color:#fff;font-weight:650}.sc-legal-disclosure p{margin:9px 0 0;max-width:1100px}'+
  '.sc-legal-bottom{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:15px 28px;border-top:1px solid #ffffff24;padding-top:20px;font-size:11px;color:#d1dbe3}.sc-legal-bottom nav{display:flex;gap:18px;flex-wrap:wrap}'+
  '.sc-legal-bottom>span:last-child{margin-right:175px!important;white-space:nowrap!important}@media(max-width:700px){.sc-legal-bottom>span:last-child{margin-right:0!important;margin-bottom:100px!important}}'+
  '.sc-legal-bottom a{color:#f1f4f7!important;text-decoration:none!important}.sc-legal-bottom a:hover{text-decoration:underline!important;color:#e6c98c!important}.sc-acromatico span{color:#e8826b!important}'+
  '@media(max-width:700px){.sc-legal-bottom{justify-content:center;text-align:center}.sc-legal-disclosure{text-align:left}}';
  css += '.sc-legal-bottom{display:flex!important;align-items:center!important;justify-content:center!important;flex-wrap:wrap!important;column-gap:28px!important;row-gap:12px!important;max-width:1200px!important;margin:0 auto!important;padding:24px 190px 12px 20px!important;text-align:center!important}'+
  '.sc-legal-bottom>span,.sc-legal-bottom>a,.sc-legal-bottom>nav{margin:0!important;flex:0 0 auto!important;white-space:normal!important}'+
  '.sc-legal-bottom nav{justify-content:center!important;align-items:center!important;gap:22px!important}'+
  '.sc-legal-bottom>span:last-child{margin:0!important;white-space:nowrap!important}'+
  '.sc-legal-bottom>*+*::before{content:"·";display:inline-block;color:#c6a46d;margin-right:22px;font-weight:700}'+
  '@media(max-width:850px){.sc-legal-bottom{padding:22px 18px 110px!important;column-gap:16px!important;row-gap:16px!important}.sc-legal-bottom>*+*::before{display:none!important}.sc-legal-bottom>*{flex:1 1 100%!important}.sc-legal-bottom nav{flex-wrap:wrap!important}}';
  css += '.sc-legal-bottom{width:fit-content!important;max-width:calc(100% - 180px)!important;margin:0 auto!important;padding:20px 0 12px!important;display:flex!important;justify-content:center!important;align-items:center!important;flex-wrap:wrap!important;column-gap:12px!important;row-gap:10px!important;text-align:center!important}'+
  '.sc-legal-bottom>span,.sc-legal-bottom>a,.sc-legal-bottom>nav{margin:0!important;flex:0 0 auto!important}'+
  '.sc-legal-bottom nav{gap:12px!important}'+
  '.sc-legal-bottom>*+*::before{margin-right:12px!important}'+
  '@media(max-width:850px){.sc-legal-bottom{width:100%!important;max-width:100%!important;padding:22px 16px 110px!important;column-gap:12px!important}.sc-legal-bottom>*{flex:0 1 auto!important}.sc-legal-bottom>*+*::before{display:none!important}}';
  css += '.sc-legal-bottom a,.sc-legal-bottom a:visited{color:#f4d79b!important;text-decoration:underline!important;text-decoration-color:#c6a46d!important;text-underline-offset:4px!important;text-decoration-thickness:1px!important;font-weight:700!important;cursor:pointer!important}'+
  '.sc-legal-bottom a:hover,.sc-legal-bottom a:focus-visible{color:#fff!important;text-decoration-color:#fff!important;text-decoration-thickness:2px!important;outline-offset:4px!important}'+
  '.sc-legal-bottom>span{color:#c5d0d9!important;font-weight:400!important;cursor:default!important}'+
  '.sc-legal-bottom .sc-acromatico span{color:#e8826b!important}';
  css += '.sc-legal-bottom a,.sc-legal-bottom a:visited{color:#ffffff!important;text-decoration:none!important;font-weight:650!important;cursor:pointer!important}'+
  '.sc-legal-bottom>span{color:#aab9c6!important;font-weight:400!important;cursor:default!important}'+
  '.sc-legal-bottom a:hover,.sc-legal-bottom a:focus-visible{color:#e6c98c!important;text-decoration:none!important}'+
  '.sc-legal-bottom .sc-acromatico span{color:#e8826b!important}';
  css += '.sc-legal-footer{background:#0b2134!important;border-top:1px solid rgba(198,164,109,.26)!important}'+
  '.sc-legal-disclosure{max-width:980px!important;margin:0 auto 27px!important;text-align:center!important;padding:6px 12px 25px!important;border-bottom:1px solid rgba(198,164,109,.24)!important}'+
  '.sc-legal-identity{display:flex!important;flex-direction:column!important;align-items:center!important;gap:5px!important;margin-bottom:15px!important}'+
  '.sc-legal-identity strong{color:#dbe3e9!important;font:700 clamp(14px,1.3vw,17px) Manrope,Arial,sans-serif!important;letter-spacing:.025em!important}'+
  '.sc-legal-identity span{color:#aab9c5!important;font:500 12px/1.9 Manrope,Arial,sans-serif!important;letter-spacing:.012em!important}'+
  '.sc-legal-identity i{font-style:normal!important;color:#c6a46d!important;margin:0 8px!important}'+
  '.sc-legal-disclosure p{max-width:880px!important;margin:0 auto!important;color:#aebbc6!important;font:400 11px/1.95 Manrope,Arial,sans-serif!important;text-align:center!important}'+
  '.sc-legal-bottom{border-top:0!important;padding-top:0!important}'+
  '@media(max-width:620px){.sc-legal-disclosure{padding-left:4px!important;padding-right:4px!important}.sc-legal-identity span{line-height:2!important}.sc-legal-identity i{margin:0 4px!important}}';
  css += '.sc-footer-language{display:flex!important;align-items:center!important;justify-content:space-between!important;flex-wrap:wrap!important;gap:16px 28px!important;padding:22px clamp(22px,5vw,70px)!important;max-width:100%!important}'+
  '.sc-footer-language .sc-footer-copyright{flex:1 1 340px!important;margin:0!important;padding:0!important;border:0!important;text-align:left!important;background:transparent!important;color:#aebcc9!important;font:500 12px/1.6 Manrope,Arial,sans-serif!important}'+
  '.sc-footer-language-side{display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:14px!important;flex:0 1 auto!important}'+
  '.sc-footer-language-caption{font-size:11px!important;white-space:nowrap!important;letter-spacing:.08em!important}'+
  '.sc-footer-language-select{min-width:145px!important}'+
  '@media(max-width:800px){.sc-footer-language{justify-content:center!important;padding:22px 18px!important}.sc-footer-language .sc-footer-copyright{flex:1 1 100%!important;text-align:center!important}.sc-footer-language-side{justify-content:center!important;flex-wrap:wrap!important}}';
  css += 'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link{width:190px!important;max-width:190px!important;margin:22px 0 32px!important;padding:0!important;line-height:0!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>img.lokation-logo{width:190px!important;max-width:190px!important;height:auto!important;max-height:none!important;object-fit:contain!important}'+
  'html body footer.footer .footer-inner{padding-bottom:18px!important}'+
  '@media(max-width:480px){html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link,html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>img.lokation-logo{width:175px!important;max-width:175px!important}}';
  css += 'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link{display:flex!important;align-items:center!important;gap:8px!important;width:205px!important;max-width:205px!important;height:45px!important;margin:20px 0 34px!important;overflow:visible!important}'+
  '.sc-lokation-mark{display:block!important;flex:0 0 27px!important;width:27px!important;height:27px!important;background-repeat:no-repeat!important;background-position:left center!important;background-size:118px 27px!important}'+
  '.sc-lokation-word{display:block!important;position:relative!important;flex:0 0 170px!important;width:170px!important;height:43px!important;overflow:hidden!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link .sc-lokation-word>img.lokation-logo{position:absolute!important;left:-44px!important;top:0!important;width:214px!important;max-width:none!important;height:auto!important;max-height:none!important}'+
  '@media(max-width:480px){html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link{width:205px!important;max-width:205px!important}}';
  css += 'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:8px!important;width:215px!important;max-width:215px!important;height:44px!important;overflow:hidden!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>.sc-lokation-mark{display:block!important;flex:0 0 27px!important;width:27px!important;height:27px!important;align-self:center!important;background-size:118px 27px!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>.sc-lokation-word{display:block!important;position:relative!important;flex:0 0 170px!important;width:170px!important;height:43px!important;overflow:hidden!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>.sc-lokation-word>img.lokation-logo{position:absolute!important;left:-55px!important;top:0!important;width:214px!important;max-width:none!important;height:auto!important;margin:0!important}';
  css += 'html body #floatingLeftBackTop{background:#0b1016!important;color:#fff!important;-webkit-text-fill-color:#fff!important;border:2px solid #fff!important;box-shadow:0 5px 18px rgba(0,0,0,.22)!important;font-family:Manrope,Arial,sans-serif!important;font-weight:600!important;transition:background-color .2s ease,box-shadow .2s ease,opacity .2s ease,transform .2s ease!important}'+
  'html body #floatingLeftBackTop:hover,html body #floatingLeftBackTop:focus-visible{background:#172d40!important;color:#fff!important;-webkit-text-fill-color:#fff!important;box-shadow:0 6px 21px rgba(0,0,0,.3)!important}'+
  'html body #floatingLeftBackTop:active{background:#000!important;color:#fff!important}';
  css += 'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:8px!important;width:215px!important;max-width:215px!important;height:45px!important;overflow:visible!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>.sc-lokation-mark{display:block!important;flex:0 0 27px!important;width:27px!important;height:27px!important;background-position:left center!important;background-repeat:no-repeat!important;background-size:118px 27px!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>.sc-lokation-word{display:block!important;position:relative!important;flex:0 0 170px!important;width:170px!important;height:49px!important;overflow:hidden!important;background-size:214px 49px!important;background-position:-45px center!important;background-repeat:no-repeat!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>.sc-lokation-word>img{display:none!important}';
  css += 'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:7px!important;width:205px!important;max-width:205px!important;height:43px!important;overflow:visible!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>.sc-lokation-mark{display:block!important;flex:0 0 27px!important;width:27px!important;height:27px!important;background-size:118px 27px!important;background-position:0 0!important;background-repeat:no-repeat!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>.sc-lokation-word{display:block!important;flex:0 0 160px!important;width:160px!important;height:43px!important;background-size:214px 49px!important;background-position:-56px center!important;background-repeat:no-repeat!important;overflow:hidden!important}'+
  'html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link>img.lokation-logo{display:none!important}';
  css += 'html body footer.footer a.lokation-logo-link,html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link{display:none!important}';
  css += 'html body footer.footer a.lokation-logo-link,html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link{display:inline-flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:10px!important;width:auto!important;max-width:none!important;height:auto!important;min-height:46px!important;overflow:visible!important;text-decoration:none!important}'+
  'html body footer.footer a.lokation-logo-link .sc-lokation-icon-only{display:block!important;flex:0 0 40px!important;width:40px!important;height:40px!important;background-repeat:no-repeat!important;background-position:0 0!important;background-size:175px 40px!important}'+
  'html body footer.footer a.lokation-logo-link .sc-lokation-wordmark{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:0!important;color:white!important;line-height:1!important;white-space:nowrap!important}'+
  'html body footer.footer a.lokation-logo-link .sc-lokation-wordmark strong{display:block!important;font:700 23px/1.05 Manrope,Arial,sans-serif!important;letter-spacing:.20em!important;color:#fff!important}'+
  'html body footer.footer a.lokation-logo-link .sc-lokation-wordmark small{display:block!important;font:600 10px/1.3 Manrope,Arial,sans-serif!important;letter-spacing:.19em!important;color:#fff!important;margin-top:3px!important}'+
  'html body footer.footer a.lokation-logo-link img.lokation-logo,html body footer.footer a.lokation-logo-link .sc-lokation-mark,html body footer.footer a.lokation-logo-link .sc-lokation-word{display:none!important}';
  /* Approved global visual system: navy headings, muted supporting text, gold primary CTAs, outlined secondary CTAs. */
  css += 'html body footer.footer a.lokation-logo-link .sc-lokation-icon-only{display:none!important}'+
  'html body footer.footer a.lokation-logo-link,html body footer.footer .footer-inner>div:first-child>a.lokation-logo-link{display:inline-flex!important;align-items:center!important;justify-content:flex-start!important;min-height:42px!important;width:auto!important;max-width:none!important;height:auto!important;gap:0!important;overflow:visible!important}'+
  'html body footer.footer a.lokation-logo-link .sc-lokation-wordmark{display:flex!important;flex-direction:column!important;align-items:center!important;color:#fff!important}'+
  'html body footer.footer a.lokation-logo-link .sc-lokation-wordmark strong{font:700 25px/1.08 Manrope,Arial,sans-serif!important;letter-spacing:.18em!important;color:#fff!important}'+
  'html body footer.footer a.lokation-logo-link .sc-lokation-wordmark small{font:600 10px/1.35 Manrope,Arial,sans-serif!important;letter-spacing:.20em!important;color:#fff!important}';
  var page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  var image='';
  if(/rotonda|golf/.test(page))image='images/florida-golf-course.webp';
  else if(/waterfront|boca-grande|cape-haze|punta-gorda|condos/.test(page))image='images/florida-waterfront-homes.webp';
  else if(/venice|englewood|siesta|nokomis|wellen|communities/.test(page))image='images/florida-gulf-coast-beach.webp';
  else if(/calculat|mortgage|closing-cost|financing|offers|title|inspections|preparation|questions/.test(page))image='questions_real_estate_consultation.jpg';
  else image='about-gulf-coast-hero.jpg';
  if(page!=='index.html' && page!=='about.html' && page!=='privacy.html' && page!=='terms.html'){
    css += 'html body section.hero:not(.contact-feature-hero){background:linear-gradient(90deg,rgba(248,251,253,.97),rgba(248,251,253,.84) 51%,rgba(248,251,253,.17)),url("'+image+'") center/cover no-repeat!important;color:#102b43!important;min-height:300px!important;padding-top:65px!important;padding-bottom:65px!important}'+
    'html body section.hero:not(.contact-feature-hero) h1,html body section.hero:not(.contact-feature-hero) h1 *{color:#102b43!important;text-shadow:none!important}'+
    'html body section.hero:not(.contact-feature-hero) p,html body section.hero:not(.contact-feature-hero) .subtitle,html body section.hero:not(.contact-feature-hero) #lead{color:#435a70!important;text-shadow:none!important}'+
    'html body section.hero:not(.contact-feature-hero) .eyebrow,html body section.hero:not(.contact-feature-hero) small{color:#ad8039!important}';
  }
  css += 'html body footer.footer .sc-footer-language{display:grid!important;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)!important;align-items:center!important;column-gap:24px!important;row-gap:12px!important}'+
  'html body footer.footer .sc-footer-language>.sc-footer-copyright{grid-column:1!important;justify-self:start!important}'+
  'html body footer.footer .sc-footer-language>.sc-footer-bottom-logo{grid-column:2!important;justify-self:center!important;margin:0!important;padding:0!important;min-height:34px!important}'+
  'html body footer.footer .sc-footer-language>.sc-footer-language-side{grid-column:3!important;justify-self:end!important}'+
  'html body footer.footer .sc-footer-language>.sc-footer-bottom-logo .sc-lokation-wordmark strong{font-size:20px!important;letter-spacing:.16em!important}'+
  'html body footer.footer .sc-footer-language>.sc-footer-bottom-logo .sc-lokation-wordmark small{font-size:8px!important}'+
  '@media(max-width:850px){html body footer.footer .sc-footer-language{grid-template-columns:1fr!important;justify-items:center!important;text-align:center!important}html body footer.footer .sc-footer-language>.sc-footer-copyright,html body footer.footer .sc-footer-language>.sc-footer-bottom-logo,html body footer.footer .sc-footer-language>.sc-footer-language-side{grid-column:1!important;justify-self:center!important}}';
  css += 'html body footer.footer .sc-legal-bottom nav a.sc-send-inquiry{color:#e0be7b!important;font-weight:750!important;text-decoration:none!important;white-space:nowrap!important}html body footer.footer .sc-legal-bottom nav a.sc-send-inquiry:hover{text-decoration:underline!important;text-underline-offset:4px!important}';
  css += 'html body footer.footer .footer-inner a.sc-inquiry-footer-link{display:block!important;color:#e0be7b!important;font-weight:750!important;text-decoration:none!important;margin-top:9px!important}html body footer.footer .footer-inner a.sc-inquiry-footer-link:hover{text-decoration:underline!important;text-underline-offset:4px!important}';

  function installFullScreenMenu(){
    // Questions retains its approved compact slide-out menu; do not replace it with the site-wide editorial megamenu.
    if(document.querySelector('header.site-header[data-fc-shared-special]'))return;
    var menu=document.querySelector('.oc-shell .oc-menu');
    if(!menu){
      var toggle=document.querySelector('.menu-button,button[onclick*="openMenu"]');
      if(toggle){
        document.body.classList.add('oc-shell');
        menu=document.createElement('nav');menu.className='oc-menu';menu.hidden=true;menu.setAttribute('aria-label','Explore the website');document.body.appendChild(menu);
        toggle.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));document.body.style.overflow=menu.hidden?'':'hidden';},true);
      }
    }
    if(!menu||menu.dataset.scFullMenu)return;
    // Existing oc-shell headers already contain a hidden menu. Attach their toggle
    // before decorating it; retired inline controls may no longer be present.
    var existingToggle=document.querySelector('.oc-shell [data-oc-menu]');
    if(existingToggle&&!existingToggle.dataset.fcFullMenuBound){
      existingToggle.dataset.fcFullMenuBound='1';
      existingToggle.addEventListener('click',function(e){
        e.preventDefault();e.stopImmediatePropagation();
        menu.hidden=!menu.hidden;
        existingToggle.setAttribute('aria-expanded',String(!menu.hidden));
        document.body.style.overflow=menu.hidden?'':'hidden';
      },true);
    }
    menu.dataset.scFullMenu='1';
    var groups=[
      {title:'Find Your Property',intro:'Explore homes along the coast',items:[['Search All Properties','search-properties.html'],['Homes for Sale','florida-gulf-coast-homes-for-sale.html'],['Condos for Sale','florida-gulf-coast-condos-for-sale.html'],['Waterfront Living','waterfront.html'],['New Construction','new-construction.html']]},
      {title:'Discover Communities',intro:'Nine destinations, one beautiful coast',items:[['All Communities','communities.html'],['Boca Grande','boca-grande-florida-real-estate.html'],['Cape Haze & Placida','cape-haze-placida-florida-real-estate.html'],['Englewood & Manasota Key','englewood-manasota-key-florida-real-estate.html'],['Rotonda West','rotonda-west.html'],['Venice','venice-florida-real-estate.html'],['Wellen Park','wellen-park-florida-real-estate.html'],['Nokomis & Casey Key','nokomis-casey-key-florida-real-estate.html'],['Punta Gorda Isles','punta-gorda-isles-florida-real-estate.html'],['Siesta Key & Longboat Key','siesta-key-longboat-key-florida-real-estate.html']]},
      {title:'Buying a Home',intro:'From your first search to closing',items:[['Buying Overview','buy.html'],['Complete Buyers Guide','buyers-guide.html'],['Getting Ready to Buy','buyer-preparation.html'],['Finding the Right Property','buyer-property-search.html'],['Financing & Pre-Approval','buyer-financing-preapproval.html'],['Making an Offer','buyer-offers-contracts.html'],['Inspections & Appraisals','buyer-inspections-appraisals.html'],['Title & Financing','buyer-title-financing.html']]},
      {title:'Selling a Home',intro:'Plan your sale with confidence',items:[['Selling Overview','sell.html'],['Complete Sellers Guide','sellers-guide.html'],['Home Valuation','home-valuation.html'],['Seller Closing Costs','seller-closing-costs.html']]},
      {title:'Calculators & Answers',intro:'Helpful numbers and clear explanations',items:[['All Calculators','calculators.html'],['Mortgage Calculator','mortgage-calculator.html'],['Buyer Closing Costs','buyer-closing-costs.html'],['Seller Closing Costs','seller-closing-costs.html'],['1,000 Questions & Answers','questions.html']]},
      {title:'Meet & Connect',intro:'Personal guidance, your way',items:[['About Sabatino','about.html'],['Contact','contact.html'],['Send an Inquiry','contact.html#tell-us-your-plans']]}
    ];
    var shortcuts=[
      ['First-Time Buyer','questions.html?q=before%20looking%20at%20homes','Start with the essentials'],
      ['Pre-Approval & Financing','buyer-financing-preapproval.html','Know your buying power'],
      ['Buying a Waterfront Home','waterfront.html','Explore coastal living'],
      ['New Construction','new-construction.html','Find newly built homes'],
      ['What Is My Home Worth?','home-valuation.html','Plan a smart sale'],
      ['Closing Costs','calculators.html','Estimate your expenses'],
      ['Home Inspections','buyer-inspections-appraisals.html','Know what to check'],
      ['Ask a Real Estate Question','questions.html','Explore the answers']
    ];
    function link(label,url,klass){var el=document.createElement('a');el.href=url;el.textContent=label;if(klass)el.className=klass;return el;}
    menu.replaceChildren();
    var wrap=document.createElement('div');wrap.className='sc-editorial';
    var head=document.createElement('header');head.className='sc-editorial-head';
    var headcopy=document.createElement('div');headcopy.innerHTML='<small>SABATINO CAMPILII · FLORIDA GULF COAST</small><h2>Discover your Florida</h2><p>Explore homes, communities and expert guidance, all in one place.</p>';
    var close=document.createElement('button');close.type='button';close.setAttribute('data-oc-close','');close.setAttribute('aria-label','Close menu');close.textContent='×';head.append(headcopy,close);wrap.appendChild(head);
    // Force the same editorial heading on pages with legacy global header rules.
    function force(el,props){Object.keys(props).forEach(function(k){el.style.setProperty(k,props[k],'important');});}
    force(head,{'display':'flex','flex-direction':'row','align-items':'flex-start','justify-content':'space-between','background':'transparent','background-image':'none','color':'#102b43','width':'100%','height':'auto','min-height':'0','max-height':'none','padding':'0','margin':'0 0 24px','border':'0','box-shadow':'none','position':'relative','overflow':'visible','text-align':'left'});
    force(headcopy,{'display':'block','visibility':'visible','opacity':'1','background':'transparent','width':'auto','height':'auto','padding':'0','margin':'0','color':'#102b43','text-align':'left'});
    force(headcopy.querySelector('small'),{'display':'block','visibility':'visible','opacity':'1','color':'#ae8346','font-size':'10px','font-weight':'700','line-height':'1.5','letter-spacing':'.17em','margin':'0'});
    force(headcopy.querySelector('h2'),{'display':'block','visibility':'visible','opacity':'1','color':'#102b43','font-family':'Manrope,Arial,sans-serif','font-size':'clamp(30px,4vw,52px)','font-weight':'700','line-height':'1.2','letter-spacing':'-.035em','margin':'9px 0 6px','text-align':'left','background':'none','-webkit-text-fill-color':'#102b43'});
    force(headcopy.querySelector('p'),{'display':'block','visibility':'visible','opacity':'1','color':'#617587','font-family':'Manrope,Arial,sans-serif','font-size':'14px','font-weight':'400','line-height':'1.6','margin':'0','text-align':'left'});
    force(close,{'position':'static','display':'block','visibility':'visible','opacity':'1','width':'46px','height':'46px','min-width':'46px','flex':'0 0 46px','background':'#eae5db','color':'#102b43','border':'0','border-radius':'50%','font-size':'30px','line-height':'1','cursor':'pointer'});
    var main=document.createElement('nav');main.className='sc-editorial-main';main.setAttribute('aria-label','Main pages');
    [['Home','/index.html'],['Search Properties','/search-properties.html'],['Buy','/buy.html'],['Sell','/sell.html'],['Communities','/communities.html'],['About','/about.html'],['Contact','/contact.html']].forEach(function(it){main.appendChild(link(it[0],it[1]));});
    wrap.appendChild(main);
    var feature=document.createElement('div');feature.className='sc-editorial-feature';feature.innerHTML='<span>COASTAL LIVING · PERSONAL GUIDANCE</span><strong>Find a place that feels like home.</strong>';wrap.appendChild(feature);
    var nav=document.createElement('div');nav.className='sc-editorial-grid';
    groups.forEach(function(g){var section=document.createElement('section');section.className='sc-editorial-category';var h=document.createElement('h3');h.textContent=g.title;var intro=document.createElement('p');intro.textContent=g.intro;section.append(h,intro);var links=document.createElement('div');links.className='sc-editorial-links';g.items.forEach(function(it){links.appendChild(link(it[0],it[1],it[0]==='Send an Inquiry'?'sc-editorial-gold':''));});section.appendChild(links);nav.appendChild(section);});
    wrap.appendChild(nav);
    var quick=document.createElement('section');quick.className='sc-editorial-quick';quick.innerHTML='<small>QUICK ANSWERS & NEXT STEPS</small><h3>What can we help you with?</h3><p>Go straight to the information you need.</p>';
    var tiles=document.createElement('div');tiles.className='sc-editorial-tiles';shortcuts.forEach(function(it){var a=link(it[0],it[1]);var sub=document.createElement('span');sub.textContent=it[2];a.appendChild(sub);tiles.appendChild(a);});quick.appendChild(tiles);wrap.appendChild(quick);
    var bottom=document.createElement('div');bottom.className='sc-editorial-bottom';var prompt=document.createElement('div');prompt.innerHTML='<strong>Ready to make your move?</strong><span>Let’s talk about your plans on Florida’s Gulf Coast.</span>';bottom.append(prompt,link('Send an Inquiry ↗','contact.html#tell-us-your-plans'));wrap.appendChild(bottom);
    menu.appendChild(wrap);
    var toTop=document.createElement('button');toTop.type='button';toTop.className='sc-editorial-top';toTop.setAttribute('aria-label','Back to top of menu');toTop.title='Back to top · Close with ×';toTop.textContent='↑';menu.appendChild(toTop);
    toTop.addEventListener('click',function(){menu.scrollTo({top:0,behavior:'smooth'});});
    menu.addEventListener('scroll',function(){toTop.hidden=menu.scrollTop<260;},{passive:true});toTop.hidden=true;
    function shut(){menu.hidden=true;document.body.style.overflow='';var t=document.querySelector('[data-oc-menu],.menu-button');if(t){t.setAttribute('aria-expanded','false');t.focus();}}
    close.addEventListener('click',shut);
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden)shut();});
    menu.addEventListener('click',function(e){if(e.target===menu)shut();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installFullScreenMenu);else installFullScreenMenu();

  css += '.oc-shell .oc-menu[data-sc-full-menu="1"]{position:fixed!important;inset:0!important;width:100vw!important;max-width:none!important;height:100dvh!important;max-height:none!important;overflow-y:auto!important;overflow-x:hidden!important;box-sizing:border-box!important;background:linear-gradient(130deg,#102b43,#0b2032 70%)!important;color:#f7f8fa!important;padding:0!important;z-index:99999!important;border:0!important;border-radius:0!important;box-shadow:none!important;font-family:Manrope,Arial,sans-serif!important}'+
  '.oc-shell .oc-menu[data-sc-full-menu="1"][hidden]{display:none!important}'+
  '.oc-shell .oc-menu .sc-mega-head{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:20px!important;max-width:1450px!important;margin:auto!important;padding:32px clamp(24px,5vw,75px) 20px!important;border-bottom:1px solid #ffffff2a!important}'+
  '.oc-shell .oc-menu .sc-mega-head small{display:block!important;color:#c6a46d!important;font-size:10px!important;letter-spacing:.21em!important;margin-bottom:8px!important}'+
  '.oc-shell .oc-menu .sc-mega-head strong{display:block!important;font-size:clamp(22px,3vw,37px)!important;font-weight:700!important;color:#fff!important}'+
  '.oc-shell .oc-menu .sc-mega-head button{background:transparent!important;border:1px solid #ffffff55!important;border-radius:50%!important;width:46px!important;height:46px!important;min-width:46px!important;color:white!important;font-size:31px!important;cursor:pointer!important}'+
  '.oc-shell .oc-menu .sc-mega-body{display:grid!important;grid-template-columns:minmax(220px,.85fr) minmax(0,1.6fr)!important;gap:clamp(30px,5vw,95px)!important;max-width:1450px!important;margin:0 auto!important;padding:32px clamp(24px,5vw,75px) 42px!important}'+
  '.oc-shell .oc-menu .sc-mega-primary{display:flex!important;flex-direction:column!important;gap:0!important}'+
  '.oc-shell .oc-menu .sc-mega-primary a{display:flex!important;align-items:center!important;gap:19px!important;padding:11px 0!important;border-bottom:1px solid #ffffff29!important;color:#fff!important;text-decoration:none!important;font-size:clamp(18px,2.2vw,30px)!important;line-height:1.3!important;font-weight:500!important}'+
  '.oc-shell .oc-menu .sc-mega-primary a span{font-size:10px!important;letter-spacing:.1em!important;color:#c6a46d!important;min-width:22px!important}'+
  '.oc-shell .oc-menu .sc-mega-groups{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:30px 42px!important;align-content:start!important}'+
  '.oc-shell .oc-menu .sc-mega-groups section{display:flex!important;flex-direction:column!important;min-width:0!important}'+
  '.oc-shell .oc-menu .sc-mega-groups h2{color:#c6a46d!important;font:700 11px/1.5 Manrope,Arial,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;margin:0 0 12px!important}'+
  '.oc-shell .oc-menu .sc-mega-groups a{display:block!important;color:#e3ebf0!important;font:500 12px/1.5 Manrope,Arial,sans-serif!important;text-decoration:none!important;padding:7px 0!important;border-bottom:1px solid #ffffff1d!important}'+
  '.oc-shell .oc-menu a:hover,.oc-shell .oc-menu a:focus-visible{color:#e7c583!important}'+
  '.oc-shell .oc-menu .sc-mega-groups a.sc-mega-inquiry{color:#e7c583!important;font-weight:800!important}'+
  '.oc-shell .oc-menu .sc-mega-foot{text-align:center!important;color:#ffffff75!important;font-size:10px!important;letter-spacing:.12em!important;padding:18px!important;border-top:1px solid #ffffff21!important}'+
  '@media(max-width:750px){.oc-shell .oc-menu .sc-mega-body{grid-template-columns:1fr!important;gap:30px!important}.oc-shell .oc-menu .sc-mega-primary a{font-size:21px!important;padding:10px 0!important}.oc-shell .oc-menu .sc-mega-groups{grid-template-columns:1fr 1fr!important;gap:24px!important}}'+
  '@media(max-width:420px){.oc-shell .oc-menu .sc-mega-groups{grid-template-columns:1fr!important}}';
  css += '.oc-shell .oc-menu[data-sc-full-menu="1"]{background:#f7f5f0!important;color:#102b43!important;font-family:Manrope,Arial,sans-serif!important}'+
  '.oc-shell .oc-menu[data-sc-full-menu="1"] .sc-editorial{max-width:1370px!important;margin:0 auto!important;padding:35px clamp(20px,5vw,72px) 50px!important}'+
  '.oc-shell .oc-menu .sc-editorial-head{display:flex!important;justify-content:space-between!important;align-items:flex-start!important;gap:20px!important;margin-bottom:24px!important}'+
  '.oc-shell .oc-menu .sc-editorial-head small,.oc-shell .oc-menu .sc-editorial-quick>small{display:block!important;font:700 10px/1.5 Manrope,Arial,sans-serif!important;letter-spacing:.17em!important;color:#ae8346!important}'+
  '.oc-shell .oc-menu .sc-editorial-head h2{font:700 clamp(30px,4vw,52px)/1.2 Manrope,Arial,sans-serif!important;color:#102b43!important;letter-spacing:-.035em!important;margin:9px 0 6px!important}'+
  '.oc-shell .oc-menu .sc-editorial-head p,.oc-shell .oc-menu .sc-editorial-quick>p{font:400 14px/1.6 Manrope,Arial,sans-serif!important;color:#617587!important;margin:0!important}'+
  '.oc-shell .oc-menu .sc-editorial-head button{position:static!important;flex:0 0 46px!important;width:46px!important;height:46px!important;border:0!important;border-radius:50%!important;background:#eae5db!important;color:#102b43!important;font-size:30px!important;cursor:pointer!important}'+
  '.oc-shell .oc-menu .sc-editorial-feature{display:flex!important;flex-direction:column!important;justify-content:end!important;min-height:155px!important;padding:24px 32px!important;border-radius:13px!important;background:linear-gradient(90deg,rgba(16,43,67,.79),rgba(16,43,67,.04)),url("images/florida-gulf-coast-beach.webp") center 52%/cover no-repeat!important;margin-bottom:38px!important}'+
  '.oc-shell .oc-menu .sc-editorial-feature span{color:#f1d49e!important;font-size:10px!important;letter-spacing:.18em!important;font-weight:700!important}'+
  '.oc-shell .oc-menu .sc-editorial-feature strong{color:#fff!important;font-size:clamp(19px,2.6vw,33px)!important;line-height:1.3!important;margin-top:9px!important}'+
  '.oc-shell .oc-menu .sc-editorial-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:36px 52px!important}'+
  '.oc-shell .oc-menu .sc-editorial-category h3{color:#102b43!important;font:700 23px/1.3 Manrope,Arial,sans-serif!important;letter-spacing:-.025em!important;margin:0 0 6px!important}'+
  '.oc-shell .oc-menu .sc-editorial-category p{color:#7b8891!important;font:400 12px/1.5 Manrope,Arial,sans-serif!important;margin:0 0 17px!important}'+
  '.oc-shell .oc-menu .sc-editorial-links{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:10px!important}'+
  '.oc-shell .oc-menu .sc-editorial-links a{display:block!important;color:#29455b!important;font:500 13px/1.5 Manrope,Arial,sans-serif!important;text-decoration:none!important;border:0!important;padding:0!important}'+
  '.oc-shell .oc-menu .sc-editorial-links a.sc-editorial-gold{color:#a4793e!important;font-weight:800!important}'+
  '.oc-shell .oc-menu .sc-editorial-quick{margin-top:48px!important;padding:30px!important;border-radius:15px!important;background:#eee9df!important}'+
  '.oc-shell .oc-menu .sc-editorial-quick h3{color:#102b43!important;font:700 clamp(23px,3vw,34px)/1.25 Manrope,Arial,sans-serif!important;margin:8px 0!important}'+
  '.oc-shell .oc-menu .sc-editorial-tiles{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important;margin-top:24px!important}'+
  '.oc-shell .oc-menu .sc-editorial-tiles a{display:flex!important;flex-direction:column!important;gap:5px!important;padding:17px!important;border-radius:10px!important;background:#fff!important;color:#102b43!important;text-decoration:none!important;font:700 13px/1.35 Manrope,Arial,sans-serif!important;min-height:76px!important}'+
  '.oc-shell .oc-menu .sc-editorial-tiles a span{font:400 11px/1.5 Manrope,Arial,sans-serif!important;color:#708092!important}'+
  '.oc-shell .oc-menu .sc-editorial-bottom{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:20px!important;background:#e7dfd1!important;border-radius:12px!important;padding:25px 30px!important;margin-top:25px!important}'+
  '.oc-shell .oc-menu .sc-editorial-bottom strong,.oc-shell .oc-menu .sc-editorial-bottom span{display:block!important;color:#102b43!important}'+
  '.oc-shell .oc-menu .sc-editorial-bottom strong{font-size:17px!important}.oc-shell .oc-menu .sc-editorial-bottom span{font-size:12px!important;margin-top:5px!important}'+
  '.oc-shell .oc-menu .sc-editorial-bottom>a{display:inline-block!important;background:#102b43!important;color:#fff!important;border-radius:7px!important;padding:14px 20px!important;font-size:13px!important;font-weight:700!important;text-decoration:none!important;white-space:nowrap!important}'+
  '.oc-shell .oc-menu .sc-editorial a:hover,.oc-shell .oc-menu .sc-editorial a:focus-visible{color:#b18a4d!important;text-decoration:underline!important;text-underline-offset:4px!important}'+
  '.oc-shell .oc-menu .sc-editorial-bottom>a:hover{color:#fff!important;background:#244963!important}'+
  '@media(max-width:850px){.oc-shell .oc-menu .sc-editorial-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:30px!important}.oc-shell .oc-menu .sc-editorial-tiles{grid-template-columns:repeat(2,minmax(0,1fr))!important}}'+
  '@media(max-width:550px){.oc-shell .oc-menu .sc-editorial-grid{grid-template-columns:1fr!important}.oc-shell .oc-menu .sc-editorial-feature{min-height:115px!important;padding:20px!important}.oc-shell .oc-menu .sc-editorial-quick{padding:20px!important}.oc-shell .oc-menu .sc-editorial-bottom{flex-direction:column!important;align-items:stretch!important}.oc-shell .oc-menu .sc-editorial-tiles{grid-template-columns:1fr 1fr!important}.oc-shell .oc-menu .sc-editorial-head h2{font-size:30px!important}}';
  css += '.oc-shell .oc-menu .sc-editorial-main{display:flex!important;flex-wrap:wrap!important;gap:9px 21px!important;align-items:center!important;margin:0 0 24px!important;padding:0!important;border:0!important}'+
  '.oc-shell .oc-menu .sc-editorial-main a{font:700 13px/1.5 Manrope,Arial,sans-serif!important;color:#102b43!important;text-decoration:none!important;padding:7px 0!important;border:0!important;white-space:nowrap!important}'+
  '.oc-shell .oc-menu .sc-editorial-main a:first-child{color:#a4793e!important}'+
  '@media(max-width:550px){.oc-shell .oc-menu .sc-editorial-main{gap:7px 15px!important}.oc-shell .oc-menu .sc-editorial-main a{font-size:12px!important}}';
  css += '.oc-shell .oc-menu .sc-editorial-top{position:fixed!important;right:clamp(16px,3vw,44px)!important;bottom:24px!important;width:49px!important;height:49px!important;z-index:100002!important;border:1px solid #c6a46d!important;border-radius:50%!important;background:#102b43!important;color:#fff!important;font-size:25px!important;cursor:pointer!important;box-shadow:0 6px 20px #102b432c!important}'+
  '.oc-shell .oc-menu .sc-editorial-top[hidden]{display:none!important}'+
  '.oc-shell .oc-menu .sc-editorial-head button{cursor:pointer!important}';

  function installContextNavigation(){
    if(document.querySelector('.sc-context-nav'))return;
    var main=document.querySelector('main');
    if(!main)return;
    var hero=main.querySelector('section[class*="hero"],header[class*="hero"],section[class*="banner"]');
    if(!hero)hero=document.querySelector('main + section[class*="hero"]');
    if(!hero)return;
    var path=location.pathname.split('/').pop()||'index.html';
    var names={'index.html':'Home','about.html':'About','contact.html':'Contact','buy.html':'Buy','sell.html':'Sell','search-properties.html':'Search Properties','communities.html':'Communities','questions.html':'1,000 Q&A','calculators.html':'Calculators','buyers-guide.html':'Buyers Guide','sellers-guide.html':'Sellers Guide','new-construction.html':'New Construction','waterfront.html':'Waterfront Homes'};
    var title=names[path]||document.title.split(/[|–—]/)[0].trim().replace(/\\s*[-]\\s*Florida.*/i,'');
    var bar=document.createElement('nav');bar.className='sc-context-nav';bar.setAttribute('aria-label','Page navigation');
    var inner=document.createElement('div');inner.className='sc-context-inner';
    var back=document.createElement('a');back.href='/index.html';back.className='sc-context-back';back.textContent='← Back';
    try{if(document.referrer&&new URL(document.referrer).origin===location.origin&&new URL(document.referrer).pathname!==location.pathname){back.href=document.referrer;back.textContent='← Previous page';}}catch(e){}
    inner.appendChild(back);
    var trail=document.createElement('span');trail.className='sc-context-trail';trail.appendChild(document.createTextNode('You are here: '));
    var home=document.createElement('a');home.href='/index.html';home.textContent='Home';trail.appendChild(home);
    if(path!=='index.html'){trail.appendChild(document.createTextNode(' / '+title));}
    inner.appendChild(trail);
    var links=document.createElement('div');links.className='sc-context-links';
    [['Home','/index.html'],['Search Properties','/search-properties.html'],['Buy','/buy.html'],['Sell','/sell.html'],['Communities','/communities.html'],['About','/about.html'],['Contact','/contact.html']].forEach(function(item){var a=document.createElement('a');a.href=item[1];a.textContent=item[0];if((path==='index.html'&&item[0]==='Home')||item[1]==='/'+path){a.setAttribute('aria-current','page');}links.appendChild(a);});
    inner.appendChild(links);bar.appendChild(inner);
    hero.insertAdjacentElement('afterend',bar);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installContextNavigation);else installContextNavigation();
  css += '.sc-context-nav{background:#f8f6f1!important;color:#102b43!important;border:0!important;font-family:Manrope,Arial,sans-serif!important;position:relative!important;z-index:3!important}'+
  '.sc-context-inner{max-width:1320px!important;margin:auto!important;padding:17px clamp(20px,4vw,56px)!important;display:flex!important;align-items:center!important;flex-wrap:wrap!important;column-gap:28px!important;row-gap:13px!important}'+
  '.sc-context-back{font-size:12px!important;font-weight:700!important;color:#aa8046!important;text-decoration:none!important;white-space:nowrap!important}'+
  '.sc-context-trail{font-size:11px!important;color:#74818b!important;white-space:normal!important}'+
  '.sc-context-trail a{color:#aa8046!important;text-decoration:none!important}'+
  '.sc-context-links{display:flex!important;align-items:center!important;justify-content:center!important;flex-wrap:wrap!important;gap:12px 24px!important;flex:1 1 100%!important}'+
  '.sc-context-links a{color:#102b43!important;font-size:clamp(12px,1.15vw,15px)!important;font-weight:700!important;text-decoration:none!important;white-space:nowrap!important}'+
  '.sc-context-links a[aria-current="page"]{color:#aa8046!important}'+
  '.sc-context-links a:hover,.sc-context-back:hover{text-decoration:underline!important;text-underline-offset:5px!important}'+
  '@media(max-width:600px){.sc-context-inner{padding:14px 17px!important}.sc-context-links{justify-content:flex-start!important;gap:10px 17px!important}.sc-context-links a{font-size:12px!important}}';
  css += '.oc-shell .oc-menu .sc-editorial-top{left:clamp(16px,3vw,44px)!important;right:auto!important}'+
  'html body .tino-launcher{z-index:100010!important}'+
  'html body .tino-panel{z-index:100011!important}'+
  'html body .oc-menu[data-sc-full-menu="1"] .sc-editorial-head{background:transparent!important;background-image:none!important;box-shadow:none!important;border:0!important;height:auto!important;min-height:0!important;max-height:none!important;padding:0!important;display:flex!important;flex-direction:row!important;align-items:flex-start!important;justify-content:space-between!important}'+
  'html body .oc-menu[data-sc-full-menu="1"] .sc-editorial-head h2{display:block!important;visibility:visible!important;opacity:1!important;color:#102b43!important;-webkit-text-fill-color:#102b43!important}';
  css += '.sc-legal-bottom a.sc-acromatico,.sc-legal-bottom a.sc-acromatico:visited{color:#c6a46d!important;-webkit-text-fill-color:#c6a46d!important}.sc-legal-bottom a.sc-acromatico:hover,.sc-legal-bottom a.sc-acromatico:focus-visible{color:#e6c98c!important;-webkit-text-fill-color:#e6c98c!important}.sc-legal-bottom a.sc-acromatico span{-webkit-text-fill-color:#e8826b!important;color:#e8826b!important}';
  var style=document.createElement('style');style.id='sc-custom-language-css';style.textContent=css;document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

/* Shared Gulf Coast inquiry: language parity and relevant area preselection. */
(function(){
 var dict={
 es:{eyebrow:"TU COSTA DEL GOLFO DE FLORIDA",title:"¿Qué zona de la costa te gustaría llamar hogar?",lead:"Elige una comunidad y cuéntame qué es lo más importante para ti. Te ayudaré a explorar tus opciones.",legend:"Elige tu zona preferida",decide:"Ayúdame a decidir",interest:"Me interesa",intent:["Comprar una casa","Vender una propiedad","Explorar comunidades","Construcción nueva"],name:"Tu nombre",namePh:"Nombre completo",email:"Tu correo electrónico",phone:"Teléfono (opcional)",phonePh:"Mejor número para contactarte",message:"¿Qué estás buscando?",messagePh:"Presupuesto, habitaciones, fechas, preferencias de costa o cualquier pregunta...",send:"Contactar a Sabatino",note:"Se abrirá tu aplicación de correo con la información lista. No se enviará nada hasta que lo confirmes."},
 it:{eyebrow:"LA TUA COSTA DEL GOLFO IN FLORIDA",title:"Quale zona della costa vorresti chiamare casa?",lead:"Scegli una comunità e raccontami cosa conta di più per te. Ti aiuterò a valutare le possibilità.",legend:"Scegli la zona che preferisci",decide:"Aiutami a decidere",interest:"Mi interessa",intent:["Acquistare una casa","Vendere un immobile","Esplorare le comunità","Nuove costruzioni"],name:"Il tuo nome",namePh:"Nome e cognome",email:"La tua email",phone:"Telefono (facoltativo)",phonePh:"Numero migliore per contattarti",message:"Che cosa stai cercando?",messagePh:"Budget, camere, tempistiche, preferenze sul lungomare o domande...",send:"Contatta Sabatino",note:"Si aprirà l'app email con le tue scelte pronte. Nessun messaggio verrà inviato senza la tua conferma."},
 pt:{eyebrow:"SUA COSTA DO GOLFO DA FLÓRIDA",title:"Qual trecho do litoral você gostaria de chamar de lar?",lead:"Escolha uma comunidade e conte o que é mais importante. Vou ajudar você a explorar suas opções.",legend:"Escolha sua região preferida",decide:"Ajude-me a decidir",interest:"Tenho interesse em",intent:["Comprar uma casa","Vender um imóvel","Conhecer comunidades","Construção nova"],name:"Seu nome",namePh:"Nome completo",email:"Seu e-mail",phone:"Telefone (opcional)",phonePh:"Melhor número para contato",message:"O que você está procurando?",messagePh:"Orçamento, quartos, prazo, preferências à beira-mar ou dúvidas...",send:"Fale com Sabatino",note:"Seu aplicativo de e-mail será aberto com as informações prontas. Nada será enviado até você confirmar."}
 };
 var en={eyebrow:"YOUR FLORIDA GULF COAST",title:"Which stretch of coast feels like home?",lead:"Select a community and tell me what matters most. I'll help you explore your next step.",legend:"Choose your preferred area",decide:"Help me decide",interest:"I'm interested in",intent:["Buying a home","Selling a property","Exploring communities","New construction"],name:"Your name",namePh:"Full name",email:"Your email",phone:"Phone (optional)",phonePh:"Best number to reach you",message:"What are you looking for?",messagePh:"Budget, bedrooms, timeline, waterfront preferences, or any questions...",send:"Contact Sabatino",note:"Opens your email app with your selections ready to send. No message is sent until you confirm it."};
 function setText(el,value){if(el)el.textContent=value;}
 function render(){
  var form=document.getElementById('coast-lead-form');if(!form)return;
  var selector=document.querySelector('#oc-lang-static,#lang');
  var language=(selector&&selector.value||document.documentElement.lang||'en').toLowerCase().slice(0,2);
  var t=dict[language]||en,root=form.closest('.coast-inquiry');if(!root)return;
  setText(root.querySelector('.coast-eyebrow'),t.eyebrow);setText(root.querySelector('#coast-title'),t.title);setText(root.querySelector('.coast-lead'),t.lead);
  setText(root.querySelector('legend'),t.legend);
  var labels=root.querySelectorAll('.coast-form-fields>label');
  if(labels.length>=5){
   labels[0].firstChild.textContent=t.interest+' ';
   labels[1].firstChild.textContent=t.name+' ';
   labels[2].firstChild.textContent=t.email+' ';
   labels[3].firstChild.textContent=t.phone+' ';
   labels[4].firstChild.textContent=t.message+' ';
  }
  var options=form.querySelectorAll('select[name="intent"] option');options.forEach(function(o,i){if(t.intent[i])o.textContent=t.intent[i]});
  var name=form.querySelector('[name="name"]'),phone=form.querySelector('[name="phone"]'),msg=form.querySelector('[name="message"]');
  if(name)name.placeholder=t.namePh;if(phone)phone.placeholder=t.phonePh;if(msg)msg.placeholder=t.messagePh;
  setText(form.querySelector('input[value="Help me decide"]+span'),t.decide);
  var send=form.querySelector('.coast-actions button');if(send)send.innerHTML=t.send+' <span aria-hidden="true">→</span>';
  setText(form.querySelector('.coast-actions p'),t.note);
 }
 function preselect(){
  var form=document.getElementById('coast-lead-form');if(!form)return;
  var file=(location.pathname.split('/').pop()||'').toLowerCase();
  var areas={'boca-grande.html':'Boca Grande','cape-haze.html':'Cape Haze','englewood.html':'Englewood','rotonda-west.html':'Rotonda West','venice.html':'Venice','nokomis-casey-key.html':'Nokomis & Casey Key','punta-gorda-isles.html':'Punta Gorda Isles'};
  var chosen=areas[file];if(chosen){var radio=Array.from(form.querySelectorAll('input[name="coastArea"]')).find(function(x){return x.value===chosen});if(radio)radio.checked=true}
 }
 function init(){
  preselect();render();
  var selector=document.querySelector('#oc-lang-static,#lang');if(selector)selector.addEventListener('change',function(){render();setTimeout(render,80)});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

/* Site Map is a real page; intercept legacy menu overlays sitewide. */
(function(){
 function wire(){
  // Preserve each page's native hamburger menu. Site Map remains linked in the footer.
  document.querySelectorAll('footer').forEach(function(f){if(f.querySelector('.sc-site-map-footer'))return;var a=document.createElement('a');a.className='sc-site-map-footer';a.href='site-map.html';a.textContent='Site Map';a.style.cssText='display:inline-block;margin:12px 18px;color:inherit;text-decoration:underline;text-underline-offset:3px';f.appendChild(a);});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
})();

/* Consistent, high-contrast Ask Tino outline on light and dark backgrounds. */
(function(){
  function styleAskTino(){
    if(document.getElementById('sc-ask-tino-outline'))return;
    var style=document.createElement('style');
    style.id='sc-ask-tino-outline';
    style.textContent='html body .tino-launcher{border:3px solid #fff!important;box-shadow:0 4px 18px rgba(0,0,0,.38),0 0 0 1px rgba(10,28,44,.16)!important;box-sizing:border-box!important}html body .tino-launcher:hover{box-shadow:0 6px 24px rgba(0,0,0,.45),0 0 0 1px rgba(10,28,44,.20)!important}';
    document.head.appendChild(style);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',styleAskTino);else styleAskTino();
})();


/* 2026-10: compact header language selector on all viewport sizes, retaining Português and mobile icons. */
(function(){function apply(){if(document.getElementById('sc-compact-header-language'))return;var el=document.createElement('style');el.id='sc-compact-header-language';el.textContent='html body .sc-language-widget{width:auto!important;min-width:0!important;max-width:none!important}html body .sc-language-widget .sc-language-trigger{box-sizing:border-box!important;width:100px!important;min-width:100px!important;max-width:100px!important;padding:0 7px!important;gap:3px!important;font-size:11px!important}html body .sc-language-widget .sc-language-options{box-sizing:border-box!important;left:0!important;right:auto!important;width:100px!important;min-width:100px!important;max-width:100px!important;padding:3px!important}html body .sc-language-widget .sc-language-option{box-sizing:border-box!important;width:100%!important;padding:8px 4px!important;font-size:11px!important}html body .sc-language-widget .sc-language-label{white-space:nowrap!important;overflow:visible!important}html body .oc-actions,html body .header-tools{min-width:0!important}';document.head.appendChild(el)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply()})();

/* Legacy global menu-to-sitemap redirect removed: menu buttons retain their local navigation behavior. */

/* Florida Costiera premium shared brand, 2026-10-11. Preserves all current controls. */
(function(){function init(){var h=document.querySelector('header.oc-top,header.site-header,header.sc-sitemap-header,header.sc-cc-header,header.sc-booking-header,header.sc-legal-header');if(!h||h.classList.contains('fc-ready'))return;var a=h.querySelector('a.oc-brand,a.brand,a.sc-sitemap-brand,a.sc-cc-brand,a.sc-booking-brand,a.sc-legal-brand');if(!a)return;h.classList.add('fc-ready');a.classList.add('fc-brand');a.setAttribute('aria-label','Florida Costiera, Sabatino Campilii REALTOR, LoKation Real Estate');a.innerHTML='<span class="fc-mark" aria-hidden="true"><svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M49 10C35 3 19 11 15 25c-5 16 5 30 18 33" fill="none" stroke="#ddba7b" stroke-width="1.6"/><path d="M20 46V18h21M20 31h16" fill="none" stroke="#f5f1e9" stroke-width="2.3"/><path d="M51 22c-15-12-27 2-27 13 0 15 15 19 27 10" fill="none" stroke="#ddba7b" stroke-width="2.5"/><path d="M9 51c11-6 21-5 29 0 7 3 15 2 19-2" fill="none" stroke="#ddba7b" stroke-width="1.5"/></svg></span><span class="fc-identity"><span class="fc-name">FLORIDA <strong>COSTIERA</strong></span><span class="fc-area">SOUTHWEST FLORIDA GULF COAST REAL ESTATE</span></span>';var s=document.createElement('style');s.id='fc-shared-header';s.textContent="\nhtml body header.fc-ready{height:94.3px!important;max-height:94.3px!important;background-color:#102b43!important;background-image:linear-gradient(90deg,rgba(12,34,51,.96) 0%,rgba(12,34,51,.87) 28%,rgba(12,34,51,.35) 52%,rgba(12,34,51,.08) 72%,rgba(12,34,51,0) 100%),url('assets/florida-costiera-header-sunset.webp')!important;background-size:100% 100%!important;background-position:center center!important;background-repeat:no-repeat!important;border-bottom:1px solid #d3ac7650!important;box-shadow:0 2px 9px #0002!important;backdrop-filter:none!important}\nhtml body header.fc-ready .header-inner{max-width:none!important;width:100%!important;padding:0 clamp(10px,2.5vw,38px)!important;gap:10px!important}\nhtml body header.fc-ready.oc-top,html body header.fc-ready.sc-sitemap-header,html body header.fc-ready.sc-cc-header,html body header.fc-ready.sc-booking-header,html body header.fc-ready.sc-legal-header{padding:0 clamp(10px,2.5vw,38px)!important;gap:10px!important}\nhtml body header.fc-ready .fc-brand{display:flex!important;flex-direction:row!important;align-items:center!important;flex:0 1 auto!important;min-width:0!important;max-width:min(55vw,580px)!important;text-decoration:none!important;color:#fff!important;gap:9px!important;padding:0!important;white-space:normal!important}\nhtml body header.fc-ready .fc-mark{display:flex!important;align-items:center!important;justify-content:center!important;flex:0 0 52px!important;width:52px!important;height:56px!important;border-right:1px solid #c9a56c80!important;padding-right:8px!important}\nhtml body header.fc-ready .fc-mark svg{width:43px!important;height:50px!important;display:block!important}\nhtml body header.fc-ready .fc-identity{display:flex!important;min-width:0!important;flex-direction:column!important;align-items:flex-start!important;justify-content:center!important;gap:4px!important}\nhtml body header.fc-ready .fc-name{display:block!important;white-space:nowrap!important;color:white!important;letter-spacing:.055em!important;font:400 clamp(15px,1.65vw,23px)/1.14 Georgia,serif!important}\nhtml body header.fc-ready .fc-name strong{font-size:inherit!important;font-family:inherit!important;line-height:inherit!important;letter-spacing:inherit!important;font-weight:600!important;color:#e5c895!important}\nhtml body header.fc-ready .fc-area{display:block!important;font:500 clamp(7px,.67vw,9px)/1.4 Manrope,Arial,sans-serif!important;letter-spacing:.075em!important;color:#e9dfca!important;white-space:nowrap!important}\nhtml body header.fc-ready .fc-broker{display:block!important;font:500 clamp(7px,.77vw,10px)/1.4 Manrope,Arial,sans-serif!important;white-space:nowrap!important;color:#fff!important}\nhtml body header.fc-ready .fc-broker b{font-weight:700!important;color:#e5c895!important}\nhtml body header.fc-ready .fc-sep{color:#baa681!important;margin:0 3px!important}\nhtml body header.fc-ready .header-tools,html body header.fc-ready .oc-actions,html body header.fc-ready .sc-sitemap-tools{flex:0 0 auto!important;margin-left:auto!important;gap:clamp(6px,1.2vw,18px)!important}\n@media(max-width:860px){html body header.fc-ready{height:82.8px!important;max-height:82.8px!important}html body header.fc-ready .fc-brand{max-width:calc(100% - 168px)!important;gap:5px!important}html body header.fc-ready .fc-mark{flex-basis:36px!important;width:36px!important;padding-right:4px!important}html body header.fc-ready .fc-name{font-size:clamp(11px,2.2vw,19px)!important;letter-spacing:.015em!important}html body header.fc-ready .fc-area{font-size:7px!important;letter-spacing:.015em!important}html body header.fc-ready .fc-broker{font-size:7px!important}}\n@media(max-width:620px){html body header.fc-ready .fc-mark{display:none!important}html body header.fc-ready .fc-brand{max-width:calc(100% - 151px)!important}html body header.fc-ready .fc-name{font-size:clamp(11px,3.1vw,16px)!important}html body header.fc-ready .fc-area{font-size:clamp(5.5px,1.45vw,7px)!important;letter-spacing:0!important;white-space:normal!important}html body header.fc-ready .fc-broker{font-size:clamp(6px,1.45vw,7px)!important;white-space:normal!important}html body header.fc-ready .header-tools,html body header.fc-ready .oc-actions,html body header.fc-ready .sc-sitemap-tools{gap:4px!important}}\n";document.head.appendChild(s)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();

/* Approved slightly lighter slate-navy for language control, 2026-10-11. */
(function(){function apply(){if(document.getElementById('fc-slate-navy-language'))return;var st=document.createElement('style');st.id='fc-slate-navy-language';st.textContent='html body .sc-language-widget .sc-language-trigger,html body .sc-language-widget .sc-language-options{background:#24445e!important;border-color:#90a4b4!important}html body .sc-language-widget .sc-language-option:hover,html body .sc-language-widget .sc-language-option:focus-visible,html body .sc-language-widget .sc-language-option[aria-selected=true]{background:#365973!important}';document.head.appendChild(st)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply()})();


/* Florida Costiera — stable translated header and multilingual Back to Top, 2026-10-12. */
(function(){
  function install(){
    if(document.getElementById('fc-translate-layout-fix'))return;
    var style=document.createElement('style');
    style.id='fc-translate-layout-fix';
    style.textContent='html body{top:0!important}html.translated-ltr body,html.translated-rtl body{top:0!important}html body .goog-te-banner-frame,html body iframe.goog-te-banner-frame,html body iframe.skiptranslate[src*="translate.google"]{display:none!important}html body header.fc-ready,html body .sc-sitemap-header{top:0!important}html body #floatingLeftBackTop .fc-top-label{white-space:nowrap!important}';
    document.head.appendChild(style);
    var dict={en:'Back to Top',es:'Volver arriba',it:'Torna su',pt:'Voltar ao topo'};
    var labels={en:'Back to top',es:'Volver arriba',it:'Torna su',pt:'Voltar ao topo'};
    function current(){
      var sel=document.querySelector('#oc-lang-static, #lang');
      if(sel&&dict[sel.value])return sel.value;
      try{var stored=localStorage.getItem('sc_site_language');if(dict[stored])return stored;}catch(e){}
      var lang=document.documentElement.lang.split('-')[0];return dict[lang]?lang:'en';
    }
    function sync(){
      var b=document.getElementById('floatingLeftBackTop');if(!b)return;
      var lang=current(),label=b.querySelector('.fc-top-label');
      if(!label)return;
      b.classList.add('notranslate');b.setAttribute('translate','no');
      label.classList.add('notranslate');label.setAttribute('translate','no');
      if(label.textContent!==dict[lang])label.textContent=dict[lang];
      b.setAttribute('aria-label',labels[lang]);b.title=labels[lang];
    }
    document.addEventListener('change',function(e){if(e.target.matches('#oc-lang-static, #lang')){sync();setTimeout(sync,100);setTimeout(sync,850);}},true);
    document.addEventListener('click',function(e){if(e.target.closest('.sc-language-option')){setTimeout(sync,0);setTimeout(sync,350);}},true);
    window.addEventListener('pageshow',sync);
    new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang','class']});
    sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();


/* Align the left Back to Top pill to the top edge of Ask Tino on desktop/mobile. */
(function(){
 function apply(){
  if(document.getElementById('fc-top-align-with-tino'))return;
  var st=document.createElement('style');st.id='fc-top-align-with-tino';
  st.textContent='html body #floatingLeftBackTop,html body a.top{bottom:54px!important}@media(max-width:600px){html body #floatingLeftBackTop,html body a.top{bottom:49px!important}}';
  document.head.appendChild(st);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();


/* Hide Google's intrusive translation toolbar without moving site content.
   Google may inject both a top-positioned iframe and a body top offset. */
(function(){
  function fix(){
    if(!/^\/site-map(?:\.html)?\/?$/.test(location.pathname))return;
    if(!document.getElementById('fc-google-banner-layout')){
      var st=document.createElement('style');st.id='fc-google-banner-layout';
      st.textContent='html,html body{top:0!important;margin-top:0!important}body.translated-ltr,body.translated-rtl{top:0!important}iframe.goog-te-banner-frame,iframe.goog-te-banner-frame.skiptranslate,.goog-te-banner-frame,.goog-te-banner-frame.skiptranslate,body>iframe.skiptranslate,body>.skiptranslate.goog-te-banner-frame{display:none!important;height:0!important;visibility:hidden!important}html body header.fc-ready,html body .sc-sitemap-header{top:0!important}';
      document.head.appendChild(st);
    }
    if(document.body&&document.body.style.top&&document.body.style.top!=='0px')document.body.style.setProperty('top','0px','important');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix();
  window.addEventListener('load',fix);
  window.addEventListener('pageshow',fix);
  document.addEventListener('change',function(e){if(e.target.matches('#oc-lang-static,#lang')){fix();setTimeout(fix,250);setTimeout(fix,1200)}},true);
})();


/* Footer navigation: one Site Map link, centered above the legal details. */
(function(){
 function placeSiteMap(){
  var footer=document.querySelector('footer.sc-unified-footer');
  if(!footer||footer.querySelector('.fc-footer-sitemap-center'))return;
  var legal=footer.querySelector('.sc-uf-legal');if(!legal)return;
  var links=Array.from(footer.querySelectorAll('a[href]')).filter(function(a){return /(?:^|\/)site-map(?:\.html)?(?:[?#].*)?$/.test(a.getAttribute('href')||'');});
  if(!links.length)return;
  links.forEach(function(a){a.remove()});
  var wrap=document.createElement('div');wrap.className='fc-footer-sitemap-center';
  var link=document.createElement('a');link.href='site-map.html';link.textContent='Site Map';wrap.appendChild(link);
  legal.appendChild(wrap);
  var st=document.createElement('style');st.id='fc-footer-sitemap-center-style';
  st.textContent='html body footer.sc-unified-footer .fc-footer-sitemap-center{text-align:center!important;margin:22px auto 0!important;padding:17px 12px 0!important;border-top:1px solid rgba(230,197,140,.25)!important}html body footer.sc-unified-footer .fc-footer-sitemap-center a{display:inline-block!important;color:#e6c58c!important;text-decoration:underline!important;text-underline-offset:5px!important;font:700 13px/1.4 Manrope,Arial,sans-serif!important;letter-spacing:.02em!important;margin:0!important}html body footer.sc-unified-footer .fc-footer-sitemap-center a:hover{color:#fff!important}';
  document.head.appendChild(st);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',placeSiteMap);else placeSiteMap();
})();


/* Florida Costiera refined five-column footer and understated lighter bottom zone. */
(function(){
 function install(){
  if(document.getElementById('fc-refined-footer-20261012'))return;
  var st=document.createElement('style');st.id='fc-refined-footer-20261012';
  st.textContent=`
  html body footer.sc-unified-footer{background:#102b43!important;padding:66px 0 0!important;overflow:hidden!important}
  html body footer.sc-unified-footer .sc-uf-grid{max-width:1320px!important;padding:0 clamp(22px,4vw,52px) 50px!important;grid-template-columns:minmax(220px,1.33fr) repeat(4,minmax(135px,1fr))!important;gap:clamp(22px,2.8vw,42px)!important}
  html body footer.sc-unified-footer .sc-uf-grid h3{font-size:11px!important;letter-spacing:.14em!important;margin-bottom:19px!important;color:#e3c38b!important}
  html body footer.sc-unified-footer .sc-uf-grid nav a{line-height:1.6!important;margin-bottom:12px!important;transition:color .18s ease!important}
  html body footer.sc-unified-footer .sc-uf-grid nav{min-width:0!important}
  html body footer.sc-unified-footer .sc-uf-legal{max-width:none!important;margin:0!important;padding:27px clamp(22px,5vw,62px) 28px!important;background:#1a3b52!important;border-top:1px solid rgba(222,192,137,.42)!important;text-align:center!important}
  html body footer.sc-unified-footer .sc-uf-legal .fc-footer-sitemap-center{padding:0!important;margin:0 auto 24px!important;border:0!important}
  html body footer.sc-unified-footer .sc-uf-legal .fc-footer-sitemap-center a{font-size:13px!important;font-weight:800!important;color:#f0d5a6!important;text-decoration:none!important;border-bottom:1px solid rgba(240,213,166,.72)!important;padding:0 2px 5px!important}
  html body footer.sc-unified-footer .sc-uf-legal .sc-uf-policies{gap:13px 27px!important;justify-content:center!important;align-items:center!important}
  html body footer.sc-unified-footer .sc-uf-legal .sc-uf-policies>*+*{position:relative}
  html body footer.sc-unified-footer .sc-uf-legal .sc-uf-policies>*+*::before{content:"";position:absolute;left:-14px;top:50%;height:13px;width:1px;background:rgba(220,230,237,.35);transform:translateY(-50%)}
  html body footer.sc-unified-footer .sc-uf-legal p{max-width:960px!important;margin:14px auto!important;color:#d0dce5!important;line-height:1.8!important}
  html body footer.sc-unified-footer .sc-uf-legal p:last-child{margin-bottom:0!important}
  @media(max-width:1060px){html body footer.sc-unified-footer .sc-uf-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:35px!important}html body footer.sc-unified-footer .sc-uf-brand{grid-column:1/-1!important}}
  @media(max-width:600px){html body footer.sc-unified-footer{padding-top:44px!important}html body footer.sc-unified-footer .sc-uf-grid{grid-template-columns:1fr!important;padding:0 25px 32px!important;gap:24px!important}html body footer.sc-unified-footer .sc-uf-brand{grid-column:auto!important}html body footer.sc-unified-footer .sc-uf-legal{padding:28px 23px 33px!important}html body footer.sc-unified-footer .sc-uf-legal .sc-uf-policies{gap:9px 16px!important}html body footer.sc-unified-footer .sc-uf-legal .sc-uf-policies>*+*::before{display:none!important}}
  `;
  document.head.appendChild(st);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();


/* Match the standalone Closing Costs footer to the approved refined design. */
(function(){
 function apply(){
  var foot=document.querySelector('footer.sc-cc-footer');
  if(!foot||document.getElementById('fc-closing-footer-refined'))return;
  var legal=foot.querySelector('.sc-cc-legal');if(!legal)return;
  var links=Array.from(foot.querySelectorAll('a[href="site-map.html"]'));links.forEach(function(a){a.remove()});
  var wrap=document.createElement('div');wrap.className='fc-cc-site-map-center';
  var link=document.createElement('a');link.href='site-map.html';link.textContent='Site Map';wrap.appendChild(link);legal.insertBefore(wrap,legal.firstChild);
  var st=document.createElement('style');st.id='fc-closing-footer-refined';
  st.textContent='html body footer.sc-cc-footer{background:#102b43!important;color:#eaf0f5!important;padding:66px 0 0!important;overflow:hidden!important}html body footer.sc-cc-footer .sc-cc-footer-grid{max-width:1320px!important;margin:0 auto!important;padding:0 clamp(22px,4vw,52px) 50px!important;display:grid!important;grid-template-columns:minmax(220px,1.33fr) repeat(4,minmax(135px,1fr))!important;gap:clamp(22px,2.8vw,42px)!important}html body footer.sc-cc-footer .sc-cc-footer-grid h3{color:#e3c38b!important;letter-spacing:.14em!important}html body footer.sc-cc-footer .sc-cc-legal{max-width:none!important;margin:0!important;padding:27px clamp(22px,5vw,62px) 28px!important;background:#1a3b52!important;border-top:1px solid rgba(222,192,137,.42)!important;text-align:center!important}html body footer.sc-cc-footer .sc-cc-legal p{text-align:center!important;max-width:960px!important;margin:14px auto!important}html body footer.sc-cc-footer .fc-cc-site-map-center{text-align:center!important;margin:0 auto 24px!important}html body footer.sc-cc-footer .fc-cc-site-map-center a{color:#f0d5a6!important;text-decoration:none!important;border-bottom:1px solid rgba(240,213,166,.72)!important;padding:0 2px 5px!important;font:800 13px/1.4 Manrope,Arial,sans-serif!important}@media(max-width:1060px){html body footer.sc-cc-footer .sc-cc-footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}html body footer.sc-cc-footer .sc-cc-footer-grid>section:first-child{grid-column:1/-1!important}}@media(max-width:600px){html body footer.sc-cc-footer .sc-cc-footer-grid{grid-template-columns:1fr!important;padding:0 25px 32px!important}html body footer.sc-cc-footer .sc-cc-footer-grid>section:first-child{grid-column:auto!important}html body footer.sc-cc-footer .sc-cc-legal{padding:28px 23px 33px!important}}';
  document.head.appendChild(st);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();


/* Florida Costiera business telephone — shared site contact, 2026-10-12.
   Add contact information without changing the approved five-column footer. */
(function(){
 function install(){
  if(document.getElementById('fc-business-phone-style'))return;
  var style=document.createElement('style');
  style.id='fc-business-phone-style';
  style.textContent='html body .fc-business-phone{margin:12px 0 14px!important;font:650 13px/1.6 Manrope,Arial,sans-serif!important}html body .fc-business-phone a{color:#ead09b!important;text-decoration:underline!important;text-underline-offset:3px!important;font-weight:800!important;white-space:nowrap!important}html body .fc-business-phone a:hover{color:#fff!important}html body .fc-business-phone small{display:block;color:#c5d1db;font-size:11px}';
  document.head.appendChild(style);
  var f=document.querySelector('footer.sc-unified-footer,footer.sc-cc-footer');
  if(!f)return;
  var brand=f.querySelector('.sc-uf-brand')||(f.querySelector('.sc-cc-footer-grid')&&f.querySelector('.sc-cc-footer-grid > section:first-child'));
  if(!brand||brand.querySelector('.fc-business-phone'))return;
  var p=document.createElement('p');p.className='fc-business-phone notranslate';
  p.setAttribute('translate','no');
  var a=document.createElement('a');a.href='tel:+19412704877';a.textContent='(941) 270-4877';a.setAttribute('aria-label','Call Florida Costiera at 941 270 4877');
  var hint=document.createElement('small');hint.textContent='Florida Costiera · Direct phone';
  p.appendChild(hint);p.appendChild(a);
  var logo=brand.querySelector('.sc-uf-logo, a:has(img)');
  if(logo)brand.insertBefore(p,logo);else brand.appendChild(p);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();


/* Telephone beside header search; compact touch-to-call icon on phones.
   No change to Site Map's independently approved header. */
(function(){
 function install(){
  var header=document.querySelector('header.site-header,header.oc-top');
  if(!header||header.querySelector('.fc-header-phone'))return;
  var actions=header.querySelector('.header-tools,.oc-actions');
  if(!actions)return;
  var search=actions.querySelector('.search-icon,.oc-icon[data-oc-search],button[aria-label*="Search"],button[aria-label*="search"]');
  if(!search)return;
  var style=document.createElement('style');style.id='fc-header-phone-css';
  style.textContent='html body header .fc-header-phone{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;flex:0 0 auto!important;min-height:34px!important;padding:5px 8px!important;background:#24445e!important;color:#fff!important;border:1px solid #90a4b4!important;border-radius:20px!important;text-decoration:none!important;font:900 14px/1.2 Manrope,Arial,sans-serif!important;letter-spacing:.05px!important;text-shadow:0 2px 4px rgba(0,0,0,.85)!important;white-space:nowrap!important}html body header .fc-header-phone svg{display:block;width:20px;height:20px;flex:none;filter:drop-shadow(0 1px 2px rgba(0,0,0,.55))}html body header .fc-header-phone:hover{background:#365973!important;color:#fff!important}@media(max-width:1050px){html body header .fc-header-phone{padding:5px!important;min-width:30px!important;width:30px!important;height:34px!important}html body header .fc-header-phone-label{display:none!important}}@media(max-width:620px){html body header .fc-header-phone{border:1px solid #90a4b4!important;border-radius:7px!important;width:30px!important;min-width:30px!important;height:34px!important;min-height:34px!important;padding:4px!important}html body header .fc-header-phone svg{width:21px;height:21px}html body header .header-tools,html body header .oc-actions{gap:3px!important}}';
  document.head.appendChild(style);
  var a=document.createElement('a');a.className='fc-header-phone notranslate';a.href='tel:+19412704877';
  a.title='Call Florida Costiera: (941) 270-4877';a.setAttribute('aria-label','Call Florida Costiera at 941 270 4877');a.setAttribute('translate','no');
  a.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.09 5.18 2 2 0 0 1 5.09 3h3a2 2 0 0 1 2 1.72c.12.96.34 1.91.66 2.82a2 2 0 0 1-.45 2.11L9.03 10.9a16 16 0 0 0 4.07 4.07l1.25-1.27a2 2 0 0 1 2.11-.45c.91.32 1.86.54 2.82.66A2 2 0 0 1 22 16.92Z"/></svg><span class="fc-header-phone-label">(941) 270-4877</span>';
  search.insertAdjacentElement('afterend',a);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();

/* One refined slate-navy frame for language, search, phone and menu.
   Keep existing controls independent and fully usable on narrow screens. */
(function(){
 function install(){
  if(document.getElementById('fc-unified-header-tools-style'))return;
  var header=document.querySelector('header.site-header,header.oc-top');
  if(!header)return;
  var group=header.querySelector('.header-tools,.oc-actions');
  if(!group)return;
  group.classList.add('fc-unified-header-tools');
  var style=document.createElement('style');style.id='fc-unified-header-tools-style';
  style.textContent=[
   'html body header .fc-unified-header-tools{display:flex!important;align-items:center!important;flex-wrap:nowrap!important;gap:5px!important;min-width:0!important;padding:3px 7px!important;border:0!important;border-radius:11px!important;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important;text-shadow:0 2px 4px rgba(0,0,0,.76),0 0 9px rgba(0,0,0,.38)!important}',
   'html body header .fc-unified-header-tools .sc-language-trigger,html body header .fc-unified-header-tools .fc-header-phone{background:transparent!important;color:white!important;border:0!important;box-shadow:none!important}',
   'html body header .fc-unified-header-tools .fc-header-phone{border-radius:6px!important;padding:5px 7px!important}',
   'html body header .fc-unified-header-tools .sc-language-trigger:hover,html body header .fc-unified-header-tools .fc-header-phone:hover{background:rgba(14,37,58,.24)!important}',
   'html body header .fc-unified-header-tools .sc-language-trigger{min-height:36px!important;height:36px!important}',
   'html body header .fc-unified-header-tools .search-icon,html body header .fc-unified-header-tools .menu-button,html body header .fc-unified-header-tools .oc-icon{color:white!important}',
   'html body header .fc-unified-header-tools .search-icon:hover,html body header .fc-unified-header-tools .menu-button:hover,html body header .fc-unified-header-tools .oc-icon:hover{color:#efd49b!important}',
   '@media(max-width:620px){html body header .fc-unified-header-tools{gap:2px!important;padding:2px 4px!important;border-radius:9px!important}html body header .fc-unified-header-tools .fc-header-phone{width:27px!important;min-width:27px!important;height:34px!important}html body header .fc-unified-header-tools .sc-language-trigger{height:34px!important;min-height:34px!important}}',
   '@media(max-width:390px){html body header .fc-unified-header-tools{gap:1px!important;padding:2px 3px!important}}'
  ].join('');
  document.head.appendChild(style);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();

/* Clean phone control and fast accessible desktop hint. */
(function(){
 function ready(){
  var a=document.querySelector('header .fc-header-phone');
  if(!a||document.getElementById('fc-phone-hover-polish'))return;
  a.setAttribute('data-fc-phone-tip','Speak directly with Sabatino · (941) 270-4877');
  var st=document.createElement('style');st.id='fc-phone-hover-polish';
  st.textContent='html body header .fc-unified-header-tools a.fc-header-phone{background:transparent!important;border:0!important;box-shadow:none!important;color:#fff!important;position:relative!important;outline-offset:2px!important}html body header .fc-unified-header-tools a.fc-header-phone:hover,html body header .fc-unified-header-tools a.fc-header-phone:focus-visible{background:rgba(14,37,58,.28)!important}html body header .fc-unified-header-tools a.fc-header-phone::after{content:attr(data-fc-phone-tip);position:absolute;z-index:9999;top:calc(100% + 14px);right:0;padding:11px 15px;border:1px solid rgba(225,196,143,.7);border-radius:8px;background:#152e42;color:white;font:650 12px/1.4 Manrope,Arial,sans-serif;white-space:nowrap;box-shadow:0 8px 20px #0004;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .12s ease,visibility .12s ease}html body header .fc-unified-header-tools a.fc-header-phone:hover::after,html body header .fc-unified-header-tools a.fc-header-phone:focus-visible::after{opacity:1;visibility:visible}@media(hover:none),(max-width:620px){html body header .fc-unified-header-tools a.fc-header-phone::after{display:none!important}}';
  document.head.appendChild(st);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();

/* Larger readable language names without expanding the 100px selector. */
(function(){
 function add(){
  if(document.getElementById('fc-language-readable-compact'))return;
  var st=document.createElement('style');st.id='fc-language-readable-compact';
  st.textContent='html body header .sc-language-widget .sc-language-trigger{width:100px!important;min-width:100px!important;max-width:100px!important;padding:0 3px!important;gap:2px!important;font-size:14px!important;font-weight:800!important;letter-spacing:-.55px!important}html body header .sc-language-widget .sc-language-label{min-width:0!important;overflow:visible!important;font-weight:800!important;letter-spacing:-.35px!important}html body header .sc-language-widget .sc-language-arrow{width:7px!important;height:7px!important;flex:0 0 7px!important;border-width:2px!important}html body header .sc-language-widget .sc-language-options{width:100px!important;min-width:100px!important;max-width:100px!important}html body header .sc-language-widget .sc-language-option{font-size:14.5px!important;font-weight:400!important;letter-spacing:-.45px!important;padding:8px 2px!important}@media(max-width:390px){html body header .sc-language-widget .sc-language-trigger{font-size:13.5px!important}html body header .sc-language-widget .sc-language-option{font-size:14px!important}}';
  document.head.appendChild(st);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add,{once:true});else add();
})();

/* Approved FloridaCostiera brand refresh, Oct 12: icon to the left, no ornaments. */
(function(){
 function apply(){
  var h=document.querySelector('header.fc-ready');
  if(!h || h.querySelector('.fc-name.fc-wordmark-new'))return;
  var label=h.querySelector('.fc-name');
  if(label){label.classList.add('fc-wordmark-new');label.innerHTML='<span class="fc-florida">Florida</span><strong class="fc-costiera">Costiera</strong>';}
  var iconLink=document.querySelector('link[rel="icon"]');
  if(!iconLink){iconLink=document.createElement('link');iconLink.rel='icon';document.head.appendChild(iconLink);}
  iconLink.type='image/svg+xml';iconLink.href='/assets/florida-costiera-coastal-mark.svg?v=20261012';
  var st=document.createElement('style');st.id='fc-new-coastal-brand';
  st.textContent='html body header.fc-ready .fc-mark{border-right:1px solid #d4ab6c70!important;flex-basis:62px!important;width:62px!important;height:57px!important;padding-right:10px!important;background:url("/assets/florida-costiera-coastal-mark.svg?v=20261012") center left / 51px 51px no-repeat!important}html body header.fc-ready .fc-mark svg{display:none!important}html body header.fc-ready .fc-wordmark-new{font-family:"Bodoni Moda",Georgia,serif!important;font-size:clamp(19px,2.05vw,29px)!important;font-weight:500!important;letter-spacing:-.045em!important;line-height:1.12!important;text-transform:none!important}html body header.fc-ready .fc-wordmark-new .fc-florida{color:#fff9ef!important}html body header.fc-ready .fc-wordmark-new .fc-costiera{color:#e9bf78!important;font:inherit!important;font-weight:500!important;letter-spacing:inherit!important}@media(max-width:860px){html body header.fc-ready .fc-mark{flex-basis:41px!important;width:41px!important;background-size:33px 33px!important;padding-right:4px!important}html body header.fc-ready .fc-wordmark-new{font-size:clamp(13px,2.7vw,20px)!important}}@media(max-width:620px){html body header.fc-ready .fc-mark{display:none!important}html body header.fc-ready .fc-wordmark-new{font-size:clamp(11px,3.1vw,16px)!important;letter-spacing:-.06em!important}}';
  document.head.appendChild(st);
 }
 if(!document.getElementById('fc-bodoni-font')){var l=document.createElement('link');l.id='fc-bodoni-font';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;500;600&display=swap';document.head.appendChild(l);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();

/* Site Map only — retain the approved custom header and its Google Translate guard.
   Restore a reliable call control beside search after the shared brand is mounted. */
(function(){
 function restoreSiteMapPhone(){
  var header=document.querySelector('header.sc-sitemap-header');
  if(!header)return;
  var tools=header.querySelector('.sc-sitemap-tools');
  var search=tools&&tools.querySelector('.sc-sitemap-search-btn');
  if(!tools||!search)return;
  var phone=tools.querySelector('.fc-sitemap-phone');
  if(!phone){
   phone=document.createElement('a');
   phone.className='fc-sitemap-phone notranslate';
   search.insertAdjacentElement('afterend',phone);
  }
  phone.href='tel:+19412704877';
  phone.title='Call Florida Costiera: (941) 270-4877';
  phone.setAttribute('aria-label','Call Florida Costiera at 941 270 4877');
  phone.setAttribute('translate','no');
  phone.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L9 10.9a16 16 0 0 0 4.1 4.1l1.2-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.8.6a2 2 0 0 1 1.8 2.1Z"/></svg><span class="fc-sitemap-phone-label">(941) 270-4877</span>';
  if(phone.previousElementSibling!==search)search.insertAdjacentElement('afterend',phone);
  if(!document.getElementById('fc-sitemap-phone-restored-css')){
   var css=document.createElement('style');
   css.id='fc-sitemap-phone-restored-css';
   css.textContent='html body header.sc-sitemap-header .sc-sitemap-tools a.fc-sitemap-phone{display:inline-flex!important;align-items:center!important;gap:7px!important;width:auto!important;min-width:0!important;max-width:none!important;padding:0 2px!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;white-space:nowrap!important;font:800 16px/1.2 Manrope,Arial,sans-serif!important}html body header.sc-sitemap-header a.fc-sitemap-phone svg{display:block!important;width:21px!important;height:21px!important;flex:0 0 21px!important}html body header.sc-sitemap-header a.fc-sitemap-phone .fc-sitemap-phone-label{display:inline!important;font:800 16px/1.2 Manrope,Arial,sans-serif!important}';
   document.head.appendChild(css);
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',restoreSiteMapPhone,{once:true});else restoreSiteMapPhone();
})();

/* FloridaCostiera: slightly larger subtitle, restrained across breakpoints. */
(function(){
 function apply(){
  if(document.getElementById('fc-brand-subtitle-readable'))return;
  var s=document.createElement('style');s.id='fc-brand-subtitle-readable';
  s.textContent='html body header.fc-ready .fc-area{font-size:clamp(10px,.9vw,12px)!important;font-weight:600!important;letter-spacing:.055em!important;line-height:1.35!important}@media(max-width:860px){html body header.fc-ready .fc-area{font-size:clamp(8px,1.12vw,10px)!important;letter-spacing:.025em!important}}@media(max-width:620px){html body header.fc-ready .fc-area{font-size:clamp(7px,1.8vw,8px)!important;letter-spacing:0!important;line-height:1.25!important}}';
  document.head.appendChild(s);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();

/* Shared approved Back to Top style, October 2026 */
(function(){function run(){if(!document.getElementById('fc-approved-backtop-v10')){var st=document.createElement('style');st.id='fc-approved-backtop-v10';st.textContent="html body #floatingLeftBackTop,html body a.top{box-sizing:border-box!important;background:#0b1119!important;border:3px solid #fff!important;border-radius:999px!important;color:#fff!important;box-shadow:0 9px 26px rgba(0,0,0,.22)!important;font-family:Manrope,Arial,sans-serif!important;font-weight:750!important;letter-spacing:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:13px!important;min-height:52px!important;height:auto!important;padding:6px 19px 6px 8px!important;text-decoration:none!important;line-height:1.2!important;white-space:nowrap!important}html body #floatingLeftBackTop .fc-top-arrow,html body a.top .fc-top-arrow{box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;width:43px!important;height:43px!important;min-width:43px!important;flex:0 0 43px!important;background:#eccb83!important;border-radius:50%!important;color:#101010!important;font-size:0!important}html body #floatingLeftBackTop .fc-top-arrow svg,html body a.top .fc-top-arrow svg{display:block!important;width:21px!important;height:21px!important;fill:none!important;stroke:#101010!important}html body #floatingLeftBackTop:hover,html body a.top:hover{background:#162637!important}@media(max-width:600px){html body #floatingLeftBackTop,html body a.top{padding:5px 14px 5px 6px!important;gap:9px!important;min-height:45px!important}html body #floatingLeftBackTop .fc-top-arrow,html body a.top .fc-top-arrow{width:36px!important;height:36px!important;min-width:36px!important;flex-basis:36px!important}}";document.head.appendChild(st)}document.querySelectorAll('#floatingLeftBackTop,a.top').forEach(function(b){var a=b.querySelector('.fc-top-arrow');if(!a){a=document.createElement('span');a.className='fc-top-arrow';b.prepend(a)}a.innerHTML="<svg viewBox=\"0 0 24 24\" width=\"21\" height=\"21\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 20V4M5 11l7-7 7 7\" stroke=\"#101010\" stroke-width=\"3.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/></svg>";a.setAttribute('aria-hidden','true');if(b.id==='floatingLeftBackTop'){var label=b.querySelector('.fc-top-label');if(label)label.textContent='Back to Top';b.setAttribute('aria-label','Back to top');b.title='Back to top'}})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run()})();

/* Florida Costiera professional email directory. OceanFL is independent. */
(function(){function add(){document.querySelectorAll('footer.sc-unified-footer,footer.sc-cc-footer').forEach(function(footer){if(footer.querySelector('.fc-email-directory'))return;var section=document.createElement('div');section.className='fc-email-directory';section.setAttribute('aria-label','Florida Costiera email contacts');section.innerHTML='<strong>CONTACT FLORIDA COSTIERA</strong><a href="mailto:info@floridacostiera.com">General inquiries · info@floridacostiera.com</a><a href="mailto:sabatino@floridacostiera.com">Contact Sabatino · sabatino@floridacostiera.com</a><a href="mailto:italo@floridacostiera.com">Contact Italo · Technical support, advertising &amp; photography · italo@floridacostiera.com</a>';var grid=footer.querySelector('.sc-uf-grid,.sc-cc-footer-grid');if(grid)grid.insertAdjacentElement('afterend',section);else footer.prepend(section)});if(!document.getElementById('fc-email-directory-styles')){var st=document.createElement('style');st.id='fc-email-directory-styles';st.textContent='.fc-email-directory{max-width:1220px;margin:0 auto;padding:18px clamp(20px,4vw,48px) 24px;border-top:1px solid rgba(230,197,140,.26);display:flex;flex-wrap:wrap;gap:9px 22px;align-items:baseline;color:#f1f5f7!important;font:500 12px/1.65 Manrope,Arial,sans-serif}.fc-email-directory strong{color:#e6c58c;font-size:10px;letter-spacing:.12em;margin-right:12px}.fc-email-directory a{color:#f1f5f7!important;text-decoration:none!important;overflow-wrap:anywhere}.fc-email-directory a:hover,.fc-email-directory a:focus-visible{color:#e6c58c!important;text-decoration:underline!important}@media(max-width:680px){.fc-email-directory{flex-direction:column;align-items:flex-start;gap:9px}}';document.head.appendChild(st)}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add()})();

/* Refined, high-visibility email directory in every footer. */
(function(){function render(){document.querySelectorAll('footer .fc-email-directory').forEach(function(el){el.setAttribute('role','group');el.setAttribute('aria-label','Email Florida Costiera');el.innerHTML='<div class="fc-mail-heading">GET IN TOUCH <span>Choose the right contact</span></div><div class="fc-mail-grid"><a href="mailto:info@floridacostiera.com"><b>GENERAL INQUIRIES</b><span>info@floridacostiera.com</span></a><a href="mailto:sabatino@floridacostiera.com"><b>CONTACT SABATINO</b><span>Real estate guidance</span><span>sabatino@floridacostiera.com</span></a><a href="mailto:italo@floridacostiera.com"><b>CONTACT ITALO</b><span>Technical support · Advertising · Photography</span><span>italo@floridacostiera.com</span></a></div>'});if(!document.getElementById('fc-mail-cards-final')){var st=document.createElement('style');st.id='fc-mail-cards-final';st.textContent='html body footer .fc-email-directory{max-width:1240px!important;width:calc(100% - 48px)!important;display:block!important;margin:14px auto 25px!important;padding:25px 0 0!important;border-top:1px solid rgba(230,197,140,.34)!important;color:#fff!important}.fc-mail-heading{display:flex;align-items:baseline;gap:14px;color:#e6c58c;font:800 11px Manrope,Arial,sans-serif;letter-spacing:.14em;margin-bottom:17px}.fc-mail-heading span{color:#cfdae2;font-weight:500;letter-spacing:0;text-transform:none;font-size:12px}.fc-mail-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.fc-mail-grid a{display:flex!important;flex-direction:column;gap:5px;border:1px solid rgba(234,240,245,.24);background:rgba(255,255,255,.055);padding:17px 18px;border-radius:12px;color:#fff!important;text-decoration:none!important;font:600 13px/1.5 Manrope,Arial,sans-serif;overflow-wrap:anywhere}.fc-mail-grid a b{color:#e6c58c;font-size:10px;letter-spacing:.10em}.fc-mail-grid a span:nth-child(2){color:#f6f8f9}.fc-mail-grid a span:nth-child(3){font-size:12px;color:#d7e4ed}.fc-mail-grid a:hover,.fc-mail-grid a:focus-visible{border-color:#e6c58c;background:rgba(230,197,140,.12);outline-offset:3px}@media(max-width:750px){.fc-mail-grid{grid-template-columns:1fr}.fc-mail-heading{display:block}.fc-mail-heading span{display:block;margin-top:6px}}';document.head.appendChild(st)}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render()})();

/* Lift Site Map above the contact cards, leaving the existing five-column footer untouched. */
(function(){function apply(){document.querySelectorAll('footer.sc-unified-footer,footer.sc-cc-footer').forEach(function(footer){var directory=footer.querySelector('.fc-email-directory');if(!directory)return;var old=footer.querySelectorAll('.fc-footer-sitemap-center,.fc-cc-site-map-center');old.forEach(function(node){node.remove()});footer.querySelectorAll('nav a[href="site-map.html"]').forEach(function(a){a.remove()});var bar=footer.querySelector('.fc-sitemap-prominent');if(!bar){bar=document.createElement('div');bar.className='fc-sitemap-prominent';bar.innerHTML='<a href="site-map.html" aria-label="Explore the Florida Costiera site map">Explore Our Site Map <span aria-hidden="true">↗</span></a>';}directory.insertAdjacentElement('beforebegin',bar)});if(!document.getElementById('fc-sitemap-prominent-css')){var st=document.createElement('style');st.id='fc-sitemap-prominent-css';st.textContent='html body footer .fc-sitemap-prominent{max-width:1240px;margin:0 auto!important;padding:0 24px 8px;text-align:center}html body footer .fc-sitemap-prominent a{display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(230,197,140,.65);border-radius:999px;background:rgba(230,197,140,.08);padding:12px 24px;color:#f5d69c!important;text-decoration:none!important;font:800 13px/1.3 Manrope,Arial,sans-serif;letter-spacing:.025em;box-shadow:0 5px 18px #0617261f}html body footer .fc-sitemap-prominent a:hover,html body footer .fc-sitemap-prominent a:focus-visible{background:rgba(230,197,140,.18);border-color:#f5d69c;outline-offset:3px}@media(max-width:650px){html body footer .fc-sitemap-prominent{padding:0 18px 14px}}';document.head.appendChild(st)}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply()})();

/* Florida Costiera: consistent tasteful Acromatico credit on shared footers. */
(function(){
 function apply(){
  document.querySelectorAll('footer a[href*="acromatico.com"]').forEach(function(a){
   if(!/Created with\s*[♥❤]\s*by Acromatico/i.test(a.textContent||''))return;
   a.classList.add('fc-acromatico-credit');
   a.innerHTML='Created with <span class="fc-acromatico-heart" aria-label="love">♥</span> by Acromatico';
  });
  if(!document.getElementById('fc-acromatico-credit-style')){
   var style=document.createElement('style');
   style.id='fc-acromatico-credit-style';
   style.textContent='html body footer a.fc-acromatico-credit{font-family:Manrope,Arial,sans-serif!important;font-size:14px!important;font-weight:650!important;line-height:1.5!important;color:#e6c58c!important;text-decoration:underline;text-underline-offset:4px}html body footer .fc-acromatico-heart{color:#ed4149!important;font-size:1.08em!important;text-shadow:none}';
   document.head.appendChild(style);
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();

/* Florida Costiera header controls consistency — 2026-10-13 */
(function(){
 function apply(){
  if(document.getElementById('fc-consistent-header-controls-20261013'))return;
  var css=[
   'html body header .oc-lang select#oc-lang-static,html body header.sc-cc-header .oc-lang select#oc-lang-static{box-sizing:border-box!important;width:105px!important;min-width:105px!important;max-width:105px!important;height:35px!important;min-height:35px!important;padding:0 22px 0 8px!important;font:700 12px/1.2 Manrope,Arial,sans-serif!important;border-radius:6px!important}',
   'html body header .fc-unified-header-tools .sc-language-trigger{min-height:35px!important;height:35px!important;font-size:12px!important}',
   'html body header .fc-unified-header-tools a.fc-header-phone{height:35px!important;min-height:35px!important;box-sizing:border-box!important;padding:5px 8px!important;border-radius:7px!important}',
   'html body header.sc-cc-header .sc-cc-call{height:35px!important;min-height:35px!important;box-sizing:border-box!important;font-size:12px!important;padding:5px 10px!important;border-radius:7px!important}',
   'html body header .oc-actions,html body header .header-tools{gap:clamp(8px,1.15vw,16px)!important}',
   'html body header .fc-unified-header-tools{gap:clamp(8px,1.15vw,16px)!important}',
   '@media(max-width:650px){html body header .oc-lang select#oc-lang-static{width:100px!important;min-width:100px!important;max-width:100px!important}html body header.sc-cc-header .sc-cc-call{padding:5px 8px!important}}'
  ].join('');
  var style=document.createElement('style');style.id='fc-consistent-header-controls-20261013';style.textContent=css;document.head.appendChild(style);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();

/* Florida Costiera special-page header alignment — 2026-10-13 */
(function(){
function init(){
 if(document.getElementById('fc-special-header-alignment'))return;
 var headers=document.querySelectorAll('header.sc-cc-header,header.sc-sitemap-header,header.sc-booking-header,header.sc-legal-header');
 if(!headers.length)return;
 var st=document.createElement('style');st.id='fc-special-header-alignment';
 st.textContent=[
 'html body header.sc-booking-header,html body header.sc-legal-header{box-sizing:border-box!important;min-height:76px!important;height:76px!important;max-height:76px!important;padding:7px clamp(16px,3vw,44px)!important;align-items:center!important;gap:clamp(8px,1.4vw,20px)!important}',
 'html body header.sc-cc-header .sc-cc-brand,html body header.sc-sitemap-header .sc-sitemap-brand{min-width:0!important;flex:0 1 auto!important}',
 'html body header.sc-cc-header .oc-lang,html body header.sc-sitemap-header .sc-language-widget,html body header.sc-booking-header .oc-lang,html body header.sc-legal-header .oc-lang{flex:0 0 auto!important}',
 'html body header.sc-cc-header .sc-cc-nav,html body header.sc-sitemap-header .sc-sitemap-tools{align-items:center!important;gap:clamp(8px,1vw,14px)!important}',
 'html body header.sc-cc-header .sc-language-widget,html body header.sc-sitemap-header .sc-language-widget{width:105px!important;min-width:105px!important;max-width:105px!important}',
 'html body header.sc-cc-header .sc-language-trigger,html body header.sc-sitemap-header .sc-language-trigger{box-sizing:border-box!important;width:105px!important;min-width:105px!important;max-width:105px!important;height:35px!important;min-height:35px!important;font:700 12px/1.3 Manrope,Arial,sans-serif!important;padding:0 10px!important;border-radius:6px!important}',
 'html body header.sc-cc-header .sc-language-options,html body header.sc-sitemap-header .sc-language-options{width:105px!important;min-width:105px!important;max-width:105px!important}',
 'html body header.sc-cc-header .sc-cc-call,html body header.sc-sitemap-header .fc-sitemap-phone{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;height:35px!important;min-height:35px!important;padding:5px 10px!important;border-radius:7px!important;font:700 12px Manrope,Arial,sans-serif!important;background:#21445f!important;border:1px solid #91a7b8!important;color:#fff!important;white-space:nowrap!important;text-decoration:none!important}',
 'html body header.sc-cc-header .sc-cc-menu,html body header.sc-sitemap-header .sc-sitemap-menu-button{display:inline-flex!important;justify-content:center!important;align-items:center!important;width:35px!important;height:35px!important;padding:4px!important;flex:0 0 35px!important;background:transparent!important;color:#fff!important;border:0!important;border-radius:6px!important;font-size:22px!important;text-decoration:none!important}',
 'html body header.sc-sitemap-header .sc-sitemap-search-btn{height:35px!important;width:35px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}',
 '@media(max-width:740px){html body header.sc-cc-header,html body header.sc-sitemap-header{padding:7px 12px!important;gap:5px!important}html body header.sc-cc-header .sc-cc-brand-text small{display:none!important}html body header.sc-cc-header .sc-cc-call span,html body header.sc-sitemap-header .fc-sitemap-phone b{display:none!important}html body header.sc-cc-header .sc-cc-call,html body header.sc-sitemap-header .fc-sitemap-phone{width:35px!important;min-width:35px!important;padding:5px!important}html body header.sc-cc-header .sc-language-widget,html body header.sc-sitemap-header .sc-language-widget,html body header.sc-cc-header .sc-language-trigger,html body header.sc-sitemap-header .sc-language-trigger{width:99px!important;min-width:99px!important;max-width:99px!important}html body header.sc-cc-header .sc-language-options,html body header.sc-sitemap-header .sc-language-options{width:99px!important;min-width:99px!important;max-width:99px!important}}'
 ].join('');
 document.head.appendChild(st);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
/* Unified special-template header identity, 2026-10-13 */
(function(){
function apply(){
 var special=document.querySelector('header.sc-cc-header,header.sc-sitemap-header,header.sc-booking-header,header.sc-legal-header');
 if(!special||special.classList.contains('fc-ready')||special.dataset.fcUnifiedIdentity==='yes')return;
 special.dataset.fcUnifiedIdentity='yes';
 var brand=special.querySelector('.sc-cc-brand,.sc-sitemap-brand,.sc-booking-brand,.sc-legal-brand');
 if(brand){
  brand.classList.add('fc-special-brand');
  brand.innerHTML='<img class="fc-special-mark" src="assets/florida-costiera-coastal-mark.svg" width="43" height="43" alt=""><span class="fc-special-wordmark"><strong><span>Florida</span><em>Costiera</em></strong><small>SOUTHWEST FLORIDA GULF COAST REAL ESTATE</small></span>';
 }
 if(document.getElementById('fc-special-identity-20261013'))return;
 var css=document.createElement('style');css.id='fc-special-identity-20261013';
 css.textContent='html body header .fc-special-brand{display:inline-flex!important;align-items:center!important;flex-direction:row!important;gap:10px!important;min-width:0!important;color:#fff!important;text-decoration:none!important;white-space:nowrap!important}html body header .fc-special-mark{display:block!important;width:43px!important;height:43px!important;flex:0 0 43px!important}html body header .fc-special-wordmark{display:flex!important;flex-direction:column!important;gap:3px!important}html body header .fc-special-wordmark strong{font:600 clamp(19px,1.75vw,25px)/1.05 Georgia,serif!important;letter-spacing:-.035em!important}html body header .fc-special-wordmark strong span{color:#fff9ef!important}html body header .fc-special-wordmark strong em{font-style:normal!important;color:#e9bf78!important}html body header .fc-special-wordmark small{display:block!important;font:600 clamp(7px,.65vw,9px)/1.2 Manrope,Arial,sans-serif!important;letter-spacing:.025em!important;color:#fff!important}@media(max-width:720px){html body header .fc-special-mark{width:35px!important;height:35px!important;flex-basis:35px!important}html body header .fc-special-wordmark strong{font-size:17px!important}html body header .fc-special-wordmark small{display:none!important}}';
 document.head.appendChild(css);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();

/* Final special page controls polish 20261013 */
(function(){function apply(){
 if(document.getElementById('fc-special-controls-final'))return;
 var style=document.createElement('style');style.id='fc-special-controls-final';
 style.textContent=[
 'html body header:is(.sc-cc-header,.sc-sitemap-header,.sc-legal-header,.sc-booking-header) .sc-language-widget{display:inline-flex!important;align-items:center!important;width:108px!important;min-width:108px!important;max-width:108px!important;flex:0 0 108px!important;position:relative!important}',
 'html body header:is(.sc-cc-header,.sc-sitemap-header,.sc-legal-header,.sc-booking-header) .sc-language-trigger{width:108px!important;min-width:108px!important;max-width:108px!important;height:36px!important;min-height:36px!important;box-sizing:border-box!important;padding:0 10px!important;display:flex!important;justify-content:space-between!important;align-items:center!important;background:#21445f!important;border:1px solid #9db2c0!important;border-radius:7px!important;color:white!important;font:700 12px Manrope,Arial,sans-serif!important;white-space:nowrap!important}',
 'html body header:is(.sc-cc-header,.sc-sitemap-header,.sc-legal-header,.sc-booking-header) .sc-language-options{box-sizing:border-box!important;width:108px!important;min-width:108px!important;max-width:108px!important;left:0!important;right:auto!important}',
 'html body header:is(.sc-cc-header,.sc-sitemap-header,.sc-legal-header,.sc-booking-header) .sc-language-label{display:inline-block!important;white-space:nowrap!important;font-size:12px!important}',
 'html body header.sc-cc-header .sc-cc-call,html body header.sc-sitemap-header a.fc-sitemap-phone{height:36px!important;min-height:36px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;padding:5px 10px!important;border:1px solid #9db2c0!important;border-radius:7px!important;background:#21445f!important;color:#fff!important;font:700 12px Manrope,Arial,sans-serif!important;box-sizing:border-box!important;white-space:nowrap!important}',
 'html body header:is(.sc-cc-header,.sc-sitemap-header,.sc-legal-header,.sc-booking-header) :is(.sc-cc-search,.sc-sitemap-search-btn,.sc-cc-menu,.sc-sitemap-menu-button){height:36px!important;min-height:36px!important;width:36px!important;min-width:36px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;color:white!important;box-sizing:border-box!important}',
 '@media(max-width:720px){html body header:is(.sc-cc-header,.sc-sitemap-header,.sc-legal-header,.sc-booking-header) .sc-language-widget,html body header:is(.sc-cc-header,.sc-sitemap-header,.sc-legal-header,.sc-booking-header) .sc-language-trigger,html body header:is(.sc-cc-header,.sc-sitemap-header,.sc-legal-header,.sc-booking-header) .sc-language-options{width:108px!important;min-width:108px!important;max-width:108px!important}html body header.sc-cc-header .sc-cc-call span,html body header.sc-sitemap-header .fc-sitemap-phone b{display:none!important}html body header.sc-cc-header .sc-cc-call,html body header.sc-sitemap-header a.fc-sitemap-phone{width:36px!important;min-width:36px!important;padding:5px!important}}'
 ].join('');document.head.appendChild(style);
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply()})();

/* Restore approved unboxed Home header controls, Oct 13 2026 */
(function(){
function apply(){
 if(document.getElementById('fc-home-control-reference-final'))return;
 var css=document.createElement('style');css.id='fc-home-control-reference-final';
 css.textContent=[
 'html body header :is(.sc-language-trigger,.fc-header-phone,.sc-cc-call,.fc-sitemap-phone){background:transparent!important;background-color:transparent!important;border:0!important;border-color:transparent!important;box-shadow:none!important;border-radius:0!important;outline-offset:3px!important;color:#fff!important;-webkit-text-fill-color:#fff!important;text-shadow:0 1px 3px rgba(0,0,0,.65)!important;font-family:Manrope,Arial,sans-serif!important;font-weight:800!important}',
 'html body header .sc-language-widget{background:transparent!important;border:0!important;box-shadow:none!important}',
 'html body header .sc-language-trigger{display:inline-flex!important;justify-content:space-between!important;align-items:center!important;height:35px!important;min-height:35px!important;padding:0 3px!important;font-size:12px!important}',
 'html body header .sc-language-label{font-weight:800!important;font-size:12px!important;color:#fff!important;-webkit-text-fill-color:#fff!important}',
 'html body header :is(.fc-header-phone,.sc-cc-call,.fc-sitemap-phone){display:inline-flex!important;align-items:center!important;gap:6px!important;justify-content:center!important;font-size:12px!important;font-weight:800!important;height:35px!important;min-height:35px!important;padding:0 3px!important}',
 'html body header .fc-header-phone-label,html body header .sc-cc-call span,html body header .fc-sitemap-phone b{font-weight:800!important;color:#fff!important;-webkit-text-fill-color:#fff!important}',
 'html body header .sc-language-options{border:1px solid #c4a06b!important;border-radius:7px!important;background:#19384f!important}',
 'html body header :is(.sc-language-trigger,.fc-header-phone,.sc-cc-call,.fc-sitemap-phone):hover{background:rgba(10,30,46,.17)!important}',
 '@media(max-width:720px){html body header .sc-cc-call span,html body header .fc-sitemap-phone b{display:none!important}}'
 ].join('');
 document.head.appendChild(css);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
/* Selected language label only — 20261013 */
(function(){function run(){if(document.getElementById('fc-active-language-weight-20261013'))return;var st=document.createElement('style');st.id='fc-active-language-weight-20261013';st.textContent='html body header .sc-language-trigger .sc-language-label{font-family:Manrope,Arial,sans-serif!important;font-size:16px!important;font-weight:800!important;line-height:1.2!important;color:#fff!important;-webkit-text-fill-color:#fff!important;white-space:nowrap!important}';document.head.appendChild(st)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run()})();

/* Readable dropdown and bold telephone 20261013 */
(function(){function run(){if(document.getElementById('fc-dropdown-phone-readable'))return;var st=document.createElement('style');st.id='fc-dropdown-phone-readable';st.textContent=[
'html body header .sc-language-options .sc-language-option{font-family:Manrope,Arial,sans-serif!important;font-size:16px!important;line-height:1.4!important;font-weight:600!important;padding:12px 10px!important}',
'html body header .sc-language-options{box-sizing:border-box!important;min-width:190px!important;width:190px!important;max-width:190px!important}',
'html body header :is(.fc-header-phone,.sc-cc-call,.fc-sitemap-phone),html body header :is(.fc-header-phone-label,.sc-cc-call span,.fc-sitemap-phone b){font-family:Manrope,Arial,sans-serif!important;font-size:16px!important;font-weight:800!important;line-height:1.2!important;color:#fff!important;-webkit-text-fill-color:#fff!important;background:transparent!important;border-color:transparent!important;box-shadow:none!important}',
'html body header :is(.fc-header-phone,.sc-cc-call,.fc-sitemap-phone){width:auto!important;max-width:none!important;padding:0 4px!important;gap:7px!important}',
'@media(max-width:750px){html body header :is(.fc-header-phone,.sc-cc-call,.fc-sitemap-phone){min-width:35px!important;width:35px!important}html body header :is(.fc-header-phone-label,.sc-cc-call span,.fc-sitemap-phone b){display:none!important}}'
].join('');document.head.appendChild(st)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run()})();

/* Compact language option spacing 20261013 */
(function(){function apply(){if(document.getElementById('fc-compact-language-options'))return;var el=document.createElement('style');el.id='fc-compact-language-options';el.textContent='html body .sc-language-options .sc-language-option{padding-top:7px!important;padding-bottom:7px!important;line-height:1.25!important;margin-top:0!important;margin-bottom:0!important}html body .sc-language-options{padding-top:4px!important;padding-bottom:4px!important;row-gap:0!important}';document.head.appendChild(el)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply()})();

/* FINAL uniform transparent header controls 20261013 */
(function(){function apply(){if(document.getElementById('fc-transparent-controls-20261013'))return;var el=document.createElement('style');el.id='fc-transparent-controls-20261013';el.textContent=[
'html body header :is(.sc-language-widget,.sc-language-trigger,.fc-header-phone,.sc-cc-call,.fc-sitemap-phone){background:transparent!important;background-color:transparent!important;background-image:none!important;border:0!important;box-shadow:none!important;outline-offset:3px!important;border-radius:0!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}',
'html body header :is(.sc-language-trigger,.fc-header-phone,.sc-cc-call,.fc-sitemap-phone){color:#fff!important;-webkit-text-fill-color:#fff!important;text-shadow:0 2px 4px #0009!important;font:800 16px/1.2 Manrope,Arial,sans-serif!important}',
'html body header .sc-language-trigger .sc-language-label{font:800 16px/1.2 Manrope,Arial,sans-serif!important;color:#fff!important;-webkit-text-fill-color:#fff!important}',
'html body header :is(.fc-header-phone-label,.sc-cc-call span,.fc-sitemap-phone b){font:800 16px/1.2 Manrope,Arial,sans-serif!important;color:#fff!important;-webkit-text-fill-color:#fff!important}',
'html body header .sc-language-options{background:#24445e!important;border:1px solid #9aabb7!important;border-radius:12px!important;box-shadow:0 12px 24px #0004!important}',
'html body header .sc-language-options .sc-language-option{font-size:16px!important;line-height:1.25!important;padding:7px 10px!important}',
'html body header :is(.fc-header-phone,.sc-cc-call,.fc-sitemap-phone):hover,html body header .sc-language-trigger:hover{background:transparent!important;border:0!important;box-shadow:none!important}',
'@media(max-width:720px){html body header :is(.fc-header-phone-label,.sc-cc-call span,.fc-sitemap-phone b){display:none!important}}'
].join('');document.head.appendChild(el)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply()})();

/* External website link advisory - Florida Costiera */
(function(){
 function install(){
  if(document.getElementById('fc-external-link-advisory'))return;
  var style=document.createElement('style');
  style.id='fc-external-link-advisory';
  style.textContent='.fc-external-link-tip{position:fixed;z-index:2147483600;max-width:min(290px,calc(100vw - 24px));padding:10px 14px;background:#102b43;color:#fff;border:1px solid #d5b47b;border-radius:8px;box-shadow:0 8px 25px #0004;font:700 12px/1.5 Manrope,Arial,sans-serif;pointer-events:none;visibility:hidden;opacity:0;transition:opacity .12s ease}.fc-external-link-tip[data-open="true"]{visibility:visible;opacity:1}@media(hover:none){.fc-external-link-tip{display:none}}';
  document.head.appendChild(style);
  var tip=document.createElement('div');tip.className='fc-external-link-tip';tip.id='fc-external-link-tip';tip.setAttribute('role','tooltip');tip.textContent='External website — opens in a new tab';document.body.appendChild(tip);
  function qualifies(a){if(!a||a.hasAttribute('download'))return false;var u;try{u=new URL(a.href,location.href)}catch(e){return false}return /^https?:$/.test(u.protocol)&&u.hostname!==location.hostname&&!/^(www\.)?floridacostiera\.com$/i.test(u.hostname);}
  document.querySelectorAll('a[href]').forEach(function(a){if(!qualifies(a))return;a.target='_blank';a.rel='noopener noreferrer';a.dataset.fcExternal='true';a.setAttribute('aria-description','External website; opens in a new tab');});
  function position(a){var b=a.getBoundingClientRect(),width=tip.offsetWidth||275,left=Math.min(Math.max(12,b.left),innerWidth-width-12);tip.style.left=left+'px';var y=b.bottom+10;if(y+tip.offsetHeight>innerHeight-8)y=Math.max(8,b.top-tip.offsetHeight-10);tip.style.top=y+'px'}
  var current=null;
  document.addEventListener('pointerover',function(e){var a=e.target.closest&&e.target.closest('a[data-fc-external]');if(!a||e.pointerType==='touch')return;current=a;tip.dataset.open='true';position(a)});
  document.addEventListener('pointerout',function(e){if(current&&(!e.relatedTarget||!current.contains(e.relatedTarget))){tip.dataset.open='false';current=null}});
  document.addEventListener('focusin',function(e){var a=e.target.closest&&e.target.closest('a[data-fc-external]');if(!a)return;current=a;tip.dataset.open='true';position(a)});
  document.addEventListener('focusout',function(){tip.dataset.open='false';current=null});
  new MutationObserver(function(mutations){mutations.forEach(function(m){m.addedNodes.forEach(function(node){if(node.nodeType!==1)return;var links=node.matches&&node.matches('a[href]')?[node]:Array.from(node.querySelectorAll?node.querySelectorAll('a[href]'):[]);links.forEach(function(a){if(qualifies(a)){a.target='_blank';a.rel='noopener noreferrer';a.dataset.fcExternal='true';a.setAttribute('aria-description','External website; opens in a new tab')}})})})}).observe(document.body,{childList:true,subtree:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();


/* Florida Costiera — discreet footer brand mark, 2026-10-13 */
(function(){
  function installFooterMark(){
    var footer=document.querySelector('footer.sc-unified-footer');
    if(!footer || footer.querySelector('.fc-footer-coastal-mark'))return;
    var legal=footer.querySelector('.sc-uf-legal');
    if(!legal)return;
    var link=document.createElement('a');
    link.className='fc-footer-coastal-mark';
    link.href='index.html';
    link.setAttribute('aria-label','Florida Costiera — Back to Home');
    link.title='Florida Costiera · Home';
    var mark=document.createElement('img');
    mark.src='/assets/florida-costiera-coastal-mark.svg';
    mark.alt='Florida Costiera coastal emblem';
    mark.width=58;mark.height=58;
    mark.loading='lazy';
    link.appendChild(mark);
    legal.insertBefore(link,legal.firstChild);
    if(!document.getElementById('fc-footer-mark-style')){
      var style=document.createElement('style');
      style.id='fc-footer-mark-style';
      style.textContent='footer.sc-unified-footer .sc-uf-legal>.fc-footer-coastal-mark{display:flex;align-items:center;justify-content:center;width:72px;height:72px;margin:0 auto 20px;border-radius:15px;text-decoration:none;transition:transform .18s ease,filter .18s ease}footer.sc-unified-footer .sc-uf-legal>.fc-footer-coastal-mark img{display:block;width:58px;height:58px;object-fit:contain;filter:drop-shadow(0 3px 8px rgba(0,0,0,.16))}footer.sc-unified-footer .sc-uf-legal>.fc-footer-coastal-mark:hover{transform:translateY(-2px);filter:brightness(1.1)}footer.sc-unified-footer .sc-uf-legal>.fc-footer-coastal-mark:focus-visible{outline:2px solid #e7b75c;outline-offset:4px}@media(prefers-reduced-motion:reduce){footer.sc-unified-footer .sc-uf-legal>.fc-footer-coastal-mark{transition:none}}';
      document.head.appendChild(style);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installFooterMark,{once:true});else installFooterMark();
})();

/* 2026-10-13: Final override for dynamically generated special-page header controls. */
(function(){function apply(){if(document.getElementById('fc-special-transparent-dynamic-final'))return;var el=document.createElement('style');el.id='fc-special-transparent-dynamic-final';el.textContent=[
'html body header:is(.sc-sitemap-header,.sc-cc-header) .sc-language-widget,html body header:is(.sc-sitemap-header,.sc-cc-header) .sc-language-trigger,html body header.sc-sitemap-header .fc-sitemap-phone,html body header.sc-cc-header .sc-cc-call{background:transparent!important;background-color:transparent!important;background-image:none!important;border:0!important;border-radius:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}',
'html body header:is(.sc-sitemap-header,.sc-cc-header) .sc-language-trigger,html body header:is(.sc-sitemap-header,.sc-cc-header) .sc-language-label,html body header.sc-sitemap-header .fc-sitemap-phone,html body header.sc-sitemap-header .fc-sitemap-phone b,html body header.sc-cc-header .sc-cc-call,html body header.sc-cc-header .sc-cc-call span{color:#fff!important;-webkit-text-fill-color:#fff!important;font-weight:800!important;text-shadow:0 1px 3px #0008}',
'html body header:is(.sc-sitemap-header,.sc-cc-header) .sc-language-trigger{padding:0 4px!important;outline-offset:3px!important}',
'html body header:is(.sc-sitemap-header,.sc-cc-header) .sc-language-trigger:focus-visible{outline:2px solid #eac58b!important}'
].join('');document.head.appendChild(el)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply()})();

/* Site Map phone: final style for the SVG and span inserted by shared JavaScript. */
(function(){function fix(){if(document.getElementById('fc-sitemap-actual-phone-final'))return;var st=document.createElement('style');st.id='fc-sitemap-actual-phone-final';st.textContent='html body header.sc-sitemap-header .sc-sitemap-tools a.fc-sitemap-phone{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 auto!important;width:auto!important;max-width:none!important;height:36px!important;min-height:0!important;gap:6px!important;margin:0!important;padding:0 2px!important;background:transparent!important;background-color:transparent!important;background-image:none!important;border:0!important;border-radius:0!important;box-shadow:none!important;white-space:nowrap!important;color:#fff!important;font:800 14px/1.2 Manrope,Arial,sans-serif!important}html body header.sc-sitemap-header .sc-sitemap-tools a.fc-sitemap-phone svg{display:block!important;flex:0 0 16px!important;width:16px!important;height:16px!important;stroke:#fff!important}html body header.sc-sitemap-header .sc-sitemap-tools a.fc-sitemap-phone .fc-sitemap-phone-label{display:inline!important;font:800 14px/1.2 Manrope,Arial,sans-serif!important;color:#fff!important;white-space:nowrap!important;-webkit-text-fill-color:#fff!important}@media(max-width:720px){html body header.sc-sitemap-header .sc-sitemap-tools a.fc-sitemap-phone .fc-sitemap-phone-label{display:none!important}}';document.head.appendChild(st)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix()})();

/* Site Map: align final DOM-generated header controls with Home (no fixed small pill). */
(function(){function apply(){var id='fc-sitemap-home-parity-20261013';if(document.getElementById(id))return;var css=document.createElement('style');css.id=id;css.textContent=[
'html body header.sc-sitemap-header{height:94px!important;min-height:94px!important;max-height:94px!important;padding-left:clamp(16px,2vw,32px)!important;padding-right:clamp(16px,2vw,32px)!important}',
'html body header.sc-sitemap-header .sc-sitemap-tools{margin-left:auto!important;display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important;justify-content:flex-end!important;gap:17px!important;width:auto!important;min-width:0!important}',
'html body header.sc-sitemap-header .sc-sitemap-tools .sc-language-widget{width:auto!important;min-width:96px!important;max-width:none!important;flex:0 0 auto!important}',
'html body header.sc-sitemap-header .sc-sitemap-tools .sc-language-trigger{width:auto!important;min-width:96px!important;max-width:none!important;height:40px!important;padding:0 4px!important;font:800 16px/1.2 Manrope,Arial,sans-serif!important}',
'html body header.sc-sitemap-header .sc-sitemap-tools .sc-language-trigger .sc-language-label{font:800 16px/1.2 Manrope,Arial,sans-serif!important}',
'html body header.sc-sitemap-header .sc-sitemap-tools a.fc-sitemap-phone{height:40px!important;min-height:40px!important;width:auto!important;min-width:0!important;max-width:none!important;padding:0 2px!important;gap:7px!important;display:inline-flex!important;flex:0 0 auto!important;align-items:center!important;justify-content:center!important;font:800 16px/1.2 Manrope,Arial,sans-serif!important;background:none!important;border:0!important;border-radius:0!important;box-shadow:none!important}',
'html body header.sc-sitemap-header .sc-sitemap-tools a.fc-sitemap-phone .fc-sitemap-phone-label{display:inline-block!important;font:800 16px/1.2 Manrope,Arial,sans-serif!important;color:#fff!important;white-space:nowrap!important}',
'html body header.sc-sitemap-header .sc-sitemap-tools a.fc-sitemap-phone svg{width:21px!important;height:21px!important;flex:0 0 21px!important}',
'html body header.sc-sitemap-header .sc-sitemap-tools .sc-sitemap-search-btn,html body header.sc-sitemap-header .sc-sitemap-tools .sc-sitemap-menu-button{width:40px!important;min-width:40px!important;height:40px!important;min-height:40px!important;padding:6px!important}',
'html body header.sc-sitemap-header .sc-sitemap-tools .sc-sitemap-search-btn svg,html body header.sc-sitemap-header .sc-sitemap-tools .sc-sitemap-menu-button svg{width:26px!important;height:26px!important}',
'@media(max-width:860px){html body header.sc-sitemap-header .sc-sitemap-tools{gap:7px!important}html body header.sc-sitemap-header .sc-sitemap-tools a.fc-sitemap-phone .fc-sitemap-phone-label{display:none!important}html body header.sc-sitemap-header .sc-sitemap-tools .sc-language-widget{min-width:88px!important}}'
].join('');document.head.appendChild(css)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply()})();



