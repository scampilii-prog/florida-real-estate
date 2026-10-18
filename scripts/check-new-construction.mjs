import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('new-construction.html');
const base='https://www.showingnew.com/sabatinocampilii3';
const locations=JSON.parse(read('assets/new-construction-locations.json'));
assert(!/realtor\.com/i.test(html),'New-construction search must not send visitors to Realtor.com');
assert(!/<iframe\b/i.test(html),'Search must remain a native form');
assert.equal(locations.cities.length,9);assert.equal(locations.zipCodes.length,16);
for(const place of [...locations.cities,...locations.zipCodes]){
 const anchor=[...html.matchAll(/<a\b[^>]*>/g)].map(m=>m[0]).find(a=>a.includes('href="'+place.url+'"'));
 assert(anchor,place.url+' missing');assert(anchor.includes('target="_self"'));assert(anchor.includes('data-fc-same-tab'));
}
const form=html.match(/<form\b[^>]*id="nc-quick-form"[^>]*>/)?.[0];
assert(form?.includes('action="'+base+'/home/redirecttoresultspage"'));assert(form.includes('method="post"'));assert(form.includes('target="_self"'));
for(const name of ['SearchText','QuickMoveIn','PriceLow','PriceHigh','BedRooms','Bathrooms','SqFtLow'])assert(html.includes('name="'+name+'"'),'Missing provider field '+name);
assert(html.includes('language-dropdown.js?v=20261018-showingnew'));
// The advisory must respect an explicit same-tab target, including dynamically added links.
const shared=read('assets/language-dropdown.js');
const fn=shared.match(/function qualifies\(a\)\{[\s\S]*?return \/\^https\?:\$\/[\s\S]*?;\}/)?.[0];assert(fn);
const qualifies=vm.runInNewContext('('+fn+')',{location:{href:'https://floridacostiera.com/new-construction',hostname:'floridacostiera.com'},URL});
const anchor=(href,attributes={})=>({href,hasAttribute:k=>k in attributes,getAttribute:k=>attributes[k]??null});
assert.equal(qualifies(anchor(base,{target:'_self'})),false);
assert.equal(qualifies(anchor(base,{'data-fc-same-tab':''})),false);
assert.equal(qualifies(anchor('https://example.com/')),true);
// Valid searches retain the native submission and therefore native Back navigation.
const elements={};for(const id of ['nc-quick-form','nc-min-price','nc-max-price','nc-search-error'])elements[id]={value:'',hidden:true,listeners:{},addEventListener(name,fn){this.listeners[name]=fn},setCustomValidity(text){this.validationMessage=text},reportValidity(){this.reported=true}};
vm.runInNewContext(read('assets/new-construction-search.js'),{document:{getElementById:id=>elements[id]}});
let prevented=false;elements['nc-min-price'].value='700000';elements['nc-max-price'].value='300000';elements['nc-quick-form'].listeners.submit({preventDefault(){prevented=true}});assert(prevented);assert(!elements['nc-search-error'].hidden);
prevented=false;elements['nc-max-price'].value='900000';elements['nc-quick-form'].listeners.submit({preventDefault(){prevented=true}});assert(!prevented);assert(elements['nc-search-error'].hidden);assert.equal(elements['nc-quick-form'].target,'_self');
console.log('ShowingNew: 9 city and 16 ZIP links, native filtered search, same-tab navigation and price validation passed.');
