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

    /* Accessible LoKation lettering, no icon or duplicate graphic. */
    document.querySelectorAll('footer.footer a.lokation-logo-link').forEach(function(link){
      link.querySelectorAll('img,.sc-lokation-icon-only,.sc-lokation-mark,.sc-lokation-word,.sc-lokation-wordmark').forEach(function(el){el.remove();});
      var lettering=document.createElement('span');lettering.className='sc-lokation-wordmark';lettering.innerHTML='<strong>LOKATION</strong><small>REAL ESTATE</small>';
      link.appendChild(lettering);
    });
    /* Mirror the header language control in the footer, using the same real translator. */
    var footer=document.querySelector('footer.footer, footer');
    if(footer && !footer.querySelector('.sc-footer-language')){
      var foot=document.createElement('div');foot.className='sc-footer-language';
      var caption=document.createElement('span');caption.className='sc-footer-language-caption';
      caption.textContent='LANGUAGE / IDIOMA / LINGUA / IDIOMA';
      var footSelect=document.createElement('select');footSelect.className='sc-footer-language-select';
      footSelect.setAttribute('aria-label','Change website language');
      options.forEach(function(o){var copy=document.createElement('option');copy.value=o.value;copy.textContent=o.textContent.trim();footSelect.appendChild(copy);});
      function syncFooter(){footSelect.value=select.value;}
      footSelect.addEventListener('change',function(){select.value=footSelect.value;select.dispatchEvent(new Event('change',{bubbles:true}));refresh();});
      select.addEventListener('change',syncFooter);
      var footnote=footer.querySelector('.footnote');
      var languageSide=document.createElement('div');languageSide.className='sc-footer-language-side';
      languageSide.append(caption,footSelect);
      if(footnote){footnote.classList.add('sc-footer-copyright');foot.appendChild(footnote);}
      foot.appendChild(languageSide);footer.appendChild(foot);syncFooter();
      /* Keep brokerage wordmark in the slim bottom row, between the copyright and language selector. */
      var wordmark=footer.querySelector('a.lokation-logo-link');
      if(wordmark){wordmark.classList.add('sc-footer-bottom-logo');foot.insertBefore(wordmark,languageSide);}
    }
    /* Prominent inquiry link in Connect column, also on pages with older footer HTML. */
    document.querySelectorAll('footer.footer .footer-inner>div').forEach(function(column){
      var heading=column.querySelector('h3');
      if(heading && heading.textContent.trim().toLowerCase()==='connect' && !column.querySelector('.sc-inquiry-footer-link')){
        var inquiry=document.createElement('a');inquiry.className='sc-inquiry-footer-link';inquiry.href='/contact#tell-us-your-plans';inquiry.textContent='Send an Inquiry ↗';column.appendChild(inquiry);
      }
    });
    /* Sitewide legal footer: central source for existing and future pages. */
    var legalFooter=document.querySelector('footer.footer,footer');
    if(legalFooter && !legalFooter.querySelector('.sc-legal-footer')){
      var legal=document.createElement('div');legal.className='sc-legal-footer';
      legal.innerHTML='<div class="sc-legal-disclosure"><div class="sc-legal-identity"><strong>Florida Gulf Coast Real Estate</strong><span>Sabatino Campilii, Realtor® <i aria-hidden="true">·</i> LoKation® Real Estate <i aria-hidden="true">·</i> Florida License #SL3363040</span></div><p>Real estate information is for general informational purposes only and is not legal, tax, financial, lending, insurance, or appraisal advice. Listings, prices, availability, property details and estimates may change and should be independently verified. No agency relationship is created solely by using this website.</p></div><div class="sc-legal-bottom"><span>© 2026 Sabatino Campilii · LoKation® Real Estate</span><nav aria-label="Legal links"><a class="sc-send-inquiry" href="/contact#tell-us-your-plans">Send an Inquiry ↗</a><a href="terms.html">Terms of Use</a><a href="privacy.html">Privacy Policy</a></nav><a class="sc-acromatico" href="https://acromatico.com/" target="_blank" rel="noopener noreferrer">Created with <span aria-label="love">♥</span> by Acromatico</a><span>Equal Housing Opportunity</span></div>';
      legalFooter.appendChild(legal);
    }
    refresh();
  }
  var css='.sc-language-widget{position:relative;display:inline-flex;flex:0 0 auto;align-items:center;z-index:1002;font-family:Manrope,Arial,sans-serif!important}'+
  '.sc-language-trigger{box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;justify-content:space-between!important;gap:7px!important;width:119px!important;min-width:119px!important;max-width:119px!important;height:42px!important;padding:0 9px!important;border:1px solid #8298ab!important;border-radius:8px!important;background:transparent!important;color:#fff!important;font:500 12px Manrope,Arial,sans-serif!important;white-space:nowrap!important;cursor:pointer!important;line-height:1!important}'+
  '.sc-language-label{overflow:hidden;text-overflow:clip;white-space:nowrap!important}.sc-language-arrow{width:8px;height:8px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg) translateY(-2px);flex:0 0 8px}'+
  '.sc-language-options{position:absolute!important;top:calc(100% + 5px)!important;right:0!important;width:119px!important;min-width:119px!important;max-width:119px!important;box-sizing:border-box!important;background:#102b43!important;border:1px solid #8298ab!important;border-radius:9px!important;padding:4px!important;box-shadow:0 8px 20px #0004!important;z-index:99999!important}'+
  '.sc-language-options[hidden]{display:none!important}.sc-language-option{display:block!important;width:100%!important;text-align:left!important;background:transparent!important;border:0!important;color:#fff!important;padding:9px 6px!important;border-radius:5px!important;font:500 12px Manrope,Arial,sans-serif!important;cursor:pointer!important;white-space:nowrap!important}'+
  '.sc-language-option:hover,.sc-language-option:focus-visible,.sc-language-option[aria-selected=true]{background:#24455f!important;outline:none!important}'+
  '.sc-language-trigger:focus-visible{outline:2px solid #d8b66b!important;outline-offset:2px!important}'+
  '.sc-language-widget select{display:none!important}'+
  '.sc-language-widget::after,.oc-lang:has(.sc-language-widget)::after,.header-tools .language:has(.sc-language-widget)::after{display:none!important;content:none!important}'+
  '@media(max-width:390px){.sc-language-trigger{width:112px!important;min-width:112px!important;max-width:112px!important;padding:0 6px!important;font-size:11px!important}.sc-language-options{width:112px!important;min-width:112px!important;max-width:112px!important}.sc-language-option{font-size:11px!important;padding:9px 4px!important}}';
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
    var menu=document.querySelector('.oc-shell .oc-menu');
    if(!menu || menu.dataset.scFullMenu)return;
    menu.dataset.scFullMenu='1';
    var groups=[
      {title:'Properties',items:[['Search Properties','search-properties.html'],['Homes for Sale','florida-gulf-coast-homes-for-sale.html'],['Condos for Sale','florida-gulf-coast-condos-for-sale.html'],['Waterfront','waterfront.html'],['New Construction','new-construction.html']]},
      {title:'Communities',items:[['Rotonda West','rotonda-west.html'],['Boca Grande','boca-grande-florida-real-estate.html'],['Cape Haze & Placida','cape-haze-placida-florida-real-estate.html'],['Englewood & Manasota Key','englewood-manasota-key-florida-real-estate.html'],['Venice','venice-florida-real-estate.html'],['Wellen Park','wellen-park-florida-real-estate.html'],['Nokomis & Casey Key','nokomis-casey-key-florida-real-estate.html'],['Punta Gorda Isles','punta-gorda-isles-florida-real-estate.html'],['Siesta Key & Longboat Key','siesta-key-longboat-key-florida-real-estate.html']]},
      {title:'Buying',items:[['Buy a Home','buy.html'],['Buyers Guide','buyers-guide.html'],['Preparing to Buy','buyer-preparation.html'],['Property Search','buyer-property-search.html'],['Financing & Pre-Approval','buyer-financing-preapproval.html'],['Offers & Contracts','buyer-offers-contracts.html'],['Inspections & Appraisals','buyer-inspections-appraisals.html'],['Title & Financing','buyer-title-financing.html']]},
      {title:'Selling',items:[['Sell Your Property','sell.html'],['Sellers Guide','sellers-guide.html'],['Home Valuation','home-valuation.html'],['Seller Closing Costs','seller-closing-costs.html']]},
      {title:'Calculators & Resources',items:[['All Calculators','calculators.html'],['Mortgage Calculator','mortgage-calculator.html'],['Buyer Closing Costs','buyer-closing-costs.html'],['Seller Closing Costs','seller-closing-costs.html'],['1,000 Q&A','questions.html']]},
      {title:'About & Contact',items:[['About Sabatino','about.html'],['Contact','contact.html'],['Send an Inquiry','contact.html#tell-us-your-plans']]}
    ];
    function link(label,url,klass){var a=document.createElement('a');a.href=url;a.textContent=label;if(klass)a.className=klass;return a;}
    menu.replaceChildren();
    var header=document.createElement('div');header.className='sc-mega-head';
    var heading=document.createElement('div');heading.innerHTML='<small>FLORIDA GULF COAST REAL ESTATE</small><strong>Explore the coast</strong>';
    var close=document.createElement('button');close.type='button';close.setAttribute('data-oc-close','');close.setAttribute('aria-label','Close menu');close.textContent='×';
    header.append(heading,close);menu.appendChild(header);
    var body=document.createElement('div');body.className='sc-mega-body';
    var primary=document.createElement('div');primary.className='sc-mega-primary';
    [['01','Home','index.html'],['02','Search Properties','search-properties.html'],['03','Buy','buy.html'],['04','Sell','sell.html'],['05','Communities','communities.html'],['06','New Construction','new-construction.html'],['07','Calculators','calculators.html'],['08','Guides','buyers-guide.html'],['09','1,000 Q&A','questions.html'],['10','About','about.html'],['11','Contact','contact.html']].forEach(function(item){var a=link(item[1],item[2]);var num=document.createElement('span');num.textContent=item[0];a.prepend(num);primary.appendChild(a);});
    var details=document.createElement('div');details.className='sc-mega-groups';
    groups.forEach(function(group){var section=document.createElement('section');var h=document.createElement('h2');h.textContent=group.title;section.appendChild(h);group.items.forEach(function(item){section.appendChild(link(item[0],item[1],item[0]==='Send an Inquiry'?'sc-mega-inquiry':''));});details.appendChild(section);});
    body.append(primary,details);menu.appendChild(body);
    var foot=document.createElement('div');foot.className='sc-mega-foot';foot.textContent='SABATINO CAMPILII  ·  REALTOR®  ·  LOKATION® REAL ESTATE';menu.appendChild(foot);
    close.addEventListener('click',function(){menu.hidden=true;var toggle=document.querySelector('[data-oc-menu]');if(toggle){toggle.setAttribute('aria-expanded','false');toggle.focus();}});
    menu.addEventListener('click',function(e){if(e.target===menu)close.click();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden)close.click();});
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
  var style=document.createElement('style');style.id='sc-custom-language-css';style.textContent=css;document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();