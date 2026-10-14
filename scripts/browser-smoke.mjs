// Automated browser smoke checks for core Florida Costiera interactions.
// Runs against local repository HTML, not against Cloudflare production.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import {readdirSync} from 'node:fs';

const publicPages=readdirSync(new URL('../',import.meta.url)).filter(n=>n.endsWith('.html')&&!['Florida-Closing-Timeline-OFFLINE.html','calculators_seis_funcionales_footer_aprobado.html'].includes(n));
const browser = await chromium.launch({headless:true});
const base = 'http://127.0.0.1:8765';
const configurations = [
  {name:'desktop',width:1366,height:768},
  {name:'mobile',width:390,height:844}
];
try {
  for(const cfg of configurations){
    const page = await browser.newPage({viewport:{width:cfg.width,height:cfg.height}});
    await page.route('**/*',route=>{const url=new URL(route.request().url());return ['127.0.0.1','localhost'].includes(url.hostname)?route.continue():route.abort()});
    page.on('pageerror', error => console.log('JS ERROR '+cfg.name+': '+error.stack));
    await page.goto(base+'/questions.html',{waitUntil:'load',timeout:30000});
    await page.waitForSelector('#qaCategories .qa-filter');
    assert.equal(await page.locator('#qaCategories .qa-filter').count(),8);
    await page.locator('#qaCategories .qa-filter').first().click();
    assert.equal(await page.locator('#qaSubtopics .qa-chip').count(),3);
    assert.equal(await page.locator('#qaList details').count(),12);
    await page.locator('#qaMore').click();
    assert.equal(await page.locator('#qaList details').count(),24);
    await page.locator('#qaReset').click();
    await page.locator('#qaSearch').fill('Boca Grande');
    assert.equal(await page.locator('#qaCount').innerText().then(s=>s.includes('1,010')),true);
    console.log(cfg.name+' questions library: eight topics, subtopics, pagination and search OK');
    // Questions hamburger opens the approved Site Map page with navigation buttons.
    const card=await page.locator('#coast-inquiry .coast-wrap').evaluate(x=>({bg:getComputedStyle(x).backgroundColor,border:getComputedStyle(x).borderTopWidth}));
    assert.equal(card.bg,'rgb(255, 255, 255)');
    assert.notEqual(card.border,'0px');
    await page.locator('[data-oc-menu]').first().click();
    await page.waitForURL(url=>url.pathname==='/site-map' || url.pathname==='/site-map.html', {timeout:5000});
    await page.goto(base+'/questions.html',{waitUntil:'load'});
    await page.waitForSelector('#qaCategories .qa-filter');
    await page.locator('#qaCategories .qa-filter').first().hover();
    const hoverColors=await page.locator('#qaCategories .qa-filter').first().evaluate(x=>({
      title:getComputedStyle(x.querySelector('.qa-filter-words strong')).color,
      subtitle:getComputedStyle(x.querySelector('.qa-filter-words small')).color,
      background:getComputedStyle(x).backgroundColor
    }));
    assert.equal(hoverColors.title,'rgb(18, 54, 78)','Hovered category title must stay dark');
    assert.equal(hoverColors.subtitle,'rgb(82, 104, 117)','Hovered category subtitle must stay legible');
    console.log(cfg.name+' Questions hover text contrast OK');

    assert.equal(await page.locator('#ask-tino .qa-ask-link').count(),0,'Redundant Ask Tino CTA must not return');
    assert.equal(await page.locator('#ask-tino .qa-coast-link').count(),1,'Single coast inquiry CTA');
    const destination=page.locator('#coast-inquiry .coast-wrap');
    await page.locator('#ask-tino .qa-coast-link').click();
    await page.waitForFunction(()=>location.hash==='#coast-inquiry');
    await page.waitForTimeout(900);
    const position=await destination.evaluate(el=>({top:el.getBoundingClientRect().top,head:document.querySelector('header.fc-ready,header.site-header,.oc-top')?.getBoundingClientRect().height||76}));
    assert(Math.abs(position.top-position.head-14)<25,'Coast form card should align under the fixed header: '+JSON.stringify(position));
    console.log(cfg.name+' Questions coastal anchor and no duplicate Ask Tino OK');




    for(const path of publicPages){
      await page.goto(base+'/'+path,{waitUntil:'load',timeout:30000});
      const top=page.locator('#floatingLeftBackTop:visible, #fc-universal-backtop:visible, a.top.notranslate:visible, [aria-label="Back to top"]:visible').first();
      await top.waitFor({state:'visible',timeout:5000});
      await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
      await top.click();
      await page.waitForFunction(()=>window.scrollY<20,null,{timeout:5000});
      console.log(cfg.name+' '+path+' Back to Top OK');
      if(path==='site-map.html')continue; // Site Map has its own approved navigation popover.
      const nav=page.locator('header [data-oc-menu],header .menu-button').first();
      await nav.waitFor({state:'visible'});
      await nav.click();
      await page.waitForURL(url=>url.pathname==='/site-map' || url.pathname==='/site-map.html', {timeout:5000});
      console.log(cfg.name+' '+path+' hamburger to Site Map OK');
    }
    await page.close();
  }
}finally{
  await browser.close();
}
