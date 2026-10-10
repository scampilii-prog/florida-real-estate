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
    if(!menu){
      var toggle=document.querySelector('.menu-button,button[onclick*="openMenu"]');
      if(toggle){
        document.body.classList.add('oc-shell');
        menu=document.createElement('nav');menu.className='oc-menu';menu.hidden=true;menu.setAttribute('aria-label','Explore the website');document.body.appendChild(menu);
        toggle.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));document.body.style.overflow=menu.hidden?'':'hidden';},true);
      }
    }
    if(!menu||menu.dataset.scFullMenu)return;
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
  document.addEventListener('click',function(e){
   var btn=e.target.closest&&e.target.closest('[data-oc-menu],.menu-button');
   if(!btn)return;
   e.preventDefault();e.stopImmediatePropagation();
   if(location.pathname.endsWith('/site-map')||location.pathname.endsWith('/site-map.html'))return;
   location.assign('site-map.html');
  },true);
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

/* Unified compact footer: primary destinations plus full Site Map. */
(function(){
 function compactFooter(){
  if(!document.getElementById('sc-compact-footer-style')){
   var st=document.createElement('style');st.id='sc-compact-footer-style';
   st.textContent='html body footer.footer{padding:31px 24px 14px!important}html body footer.footer .footer-inner{max-width:1160px!important;margin:auto!important;display:grid!important;grid-template-columns:minmax(220px,1.4fr) minmax(270px,1.5fr) minmax(160px,.8fr)!important;gap:24px!important;align-items:start!important}html body footer.footer .sc-footer-brand .brand{font-size:19px!important;line-height:1.3!important;margin-bottom:7px!important}html body footer.footer .sc-footer-brand p{margin:5px 0!important;font-size:12px!important;line-height:1.65!important}html body footer.footer .sc-footer-brand .tag{opacity:.78!important}html body footer.footer .sc-footer-brand .lokation-logo{max-width:125px!important;max-height:34px!important;object-fit:contain!important;margin-top:8px!important}html body footer.footer .sc-footer-heading{color:#d5b47e!important;font-size:12px!important;letter-spacing:.09em!important;text-transform:uppercase!important;margin:2px 0 12px!important;font-weight:800!important}html body footer.footer .sc-footer-links{display:flex!important;flex-wrap:wrap!important;column-gap:18px!important;row-gap:9px!important}html body footer.footer .sc-footer-links a,html body footer.footer .sc-footer-contact a{display:inline-block!important;color:#eaf1f6!important;font-size:12px!important;line-height:1.6!important;text-decoration:none!important;margin:0!important}html body footer.footer .sc-footer-links a:hover,html body footer.footer .sc-footer-contact a:hover{color:#e6c18c!important;text-decoration:underline!important;text-underline-offset:4px!important}html body footer.footer .sc-footer-links a[href$="site-map.html"]{color:#f0c78a!important;font-weight:800!important}html body footer.footer .sc-footer-contact{display:flex!important;flex-direction:column!important;gap:9px!important}html body footer.footer .footnote{max-width:1160px!important;margin:22px auto 0!important;padding:14px 0 5px!important;border-top:1px solid #ffffff30!important;font-size:11px!important;line-height:1.5!important;opacity:.75!important;text-align:center!important}@media(max-width:760px){html body footer.footer .footer-inner{grid-template-columns:1fr 1fr!important;gap:22px!important}html body footer.footer .sc-footer-brand{grid-column:1/-1!important}}@media(max-width:480px){html body footer.footer{padding:26px 18px 14px!important}html body footer.footer .footer-inner{grid-template-columns:1fr!important;gap:20px!important}html body footer.footer .sc-footer-brand{grid-column:auto!important}html body footer.footer .sc-footer-links{column-gap:15px!important}}';
   document.head.appendChild(st);
  }
  document.querySelectorAll('footer.footer').forEach(function(footer){
   if(footer.dataset.scCompactFooter)return;
   var inner=footer.querySelector('.footer-inner');if(!inner)return;
   footer.dataset.scCompactFooter='1';
   inner.innerHTML='<div class="sc-footer-brand"><div class="brand">Sabatino Campilii</div><p>Realtor® · LoKation® Real Estate<br>Florida License #SL3363040</p><p class="tag" data-footer-key="tag">Your guide to real estate on Florida’s Gulf Coast.</p><a class="lokation-logo-link" aria-label="LoKation Real Estate" href="https://www.lokationre.com/"><img class="lokation-logo" alt="LoKation Real Estate" loading="lazy" src="lokation-logo-horizontal-blanco.png"></a></div><nav aria-label="Footer navigation"><h3 class="sc-footer-heading">Explore</h3><div class="sc-footer-links"><a href="search-properties.html" data-footer-key="Search Properties">Search Properties</a><a href="buy.html" data-footer-key="Buy">Buy</a><a href="sell.html" data-footer-key="Sell">Sell</a><a href="communities.html" data-footer-key="Communities">Communities</a><a href="calculators.html" data-footer-key="Calculators">Calculators</a><a href="questions.html" data-footer-key="1,000 Q&amp;A">1,000 Q&amp;A</a><a href="site-map.html">Site Map</a></div></nav><div><h3 class="sc-footer-heading">Connect</h3><div class="sc-footer-contact"><a href="about.html" data-footer-key="About">About</a><a href="contact.html" data-footer-key="Contact">Contact</a></div></div>';
   var note=footer.querySelector('.footnote');if(note){note.innerHTML='<div class="sc-footer-legal-links"><a href="contact.html#tell-us-your-plans">Send an Inquiry ↗</a><a href="terms.html">Terms of Use</a><a href="privacy.html">Privacy Policy</a><span>Equal Housing Opportunity</span></div><div class="sc-footer-copyright">© 2026 Sabatino Campilii · LoKation® Real Estate · Florida License #SL3363040</div><div class="sc-footer-credit"><a href="https://acromatico.com/" target="_blank" rel="noopener noreferrer">Created with ♥ by Acromatico</a></div>';}
  });
 }
 if(!document.getElementById('sc-footer-legal-style')){var legalStyle=document.createElement('style');legalStyle.id='sc-footer-legal-style';legalStyle.textContent='html body footer.footer .sc-footer-legal-links{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:9px 22px;margin-bottom:12px}html body footer.footer .sc-footer-legal-links a,html body footer.footer .sc-footer-legal-links span,html body footer.footer .sc-footer-credit a{font-size:11px!important;color:#dce7ee!important;text-decoration:none!important}html body footer.footer .sc-footer-legal-links a:hover,html body footer.footer .sc-footer-credit a:hover{color:#e6c18c!important;text-decoration:underline!important;text-underline-offset:3px!important}html body footer.footer .sc-footer-copyright{font-size:11px!important}html body footer.footer .sc-footer-credit{margin-top:8px!important}html body footer.footer .sc-footer-credit a{color:#d5b47e!important}@media(max-width:480px){html body footer.footer .sc-footer-legal-links{gap:9px 15px}}';document.head.appendChild(legalStyle)}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',compactFooter);else compactFooter();
})();
