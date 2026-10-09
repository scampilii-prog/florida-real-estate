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
      foot.append(caption,footSelect);footer.appendChild(foot);syncFooter();
    }
    /* Sitewide legal footer: central source for existing and future pages. */
    var legalFooter=document.querySelector('footer.footer,footer');
    if(legalFooter && !legalFooter.querySelector('.sc-legal-footer')){
      var legal=document.createElement('div');legal.className='sc-legal-footer';
      legal.innerHTML='<div class="sc-legal-disclosure"><strong>Florida Gulf Coast Real Estate · Sabatino Campilii, Realtor® · LoKation® Real Estate · Florida License #SL3363040</strong><p>Real estate information is for general informational purposes only and is not legal, tax, financial, lending, insurance, or appraisal advice. Listings, prices, availability, property details and estimates may change and should be independently verified. Equal Housing Opportunity. No agency relationship is created solely by using this website.</p></div><div class="sc-legal-bottom"><span>© 2026 Sabatino Campilii · LoKation® Real Estate</span><nav aria-label="Legal links"><a href="terms.html">Terms of Use</a><a href="privacy.html">Privacy Policy</a></nav><a class="sc-acromatico" href="https://acromatico.com/" target="_blank" rel="noopener noreferrer">Created with <span aria-label="love">♥</span> by Acromatico</a><span>Equal Housing Opportunity</span></div>';
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
  var style=document.createElement('style');style.id='sc-custom-language-css';style.textContent=css;document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();