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
  var style=document.createElement('style');style.id='sc-custom-language-css';style.textContent=css;document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();