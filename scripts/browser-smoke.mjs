// Automated browser smoke checks for core Florida Costiera interactions.
// Runs against local repository HTML, not against Cloudflare production.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';

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
    await page.waitForURL(/site-map(?:\\.html)?$/, {timeout:5000});
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



    for(const path of ['index.html','site-map.html','closing-costs.html']){
      await page.goto(base+'/'+path,{waitUntil:'load',timeout:30000});
      await page.locator('.menu-button').first().waitFor({state:'visible'});
      console.log('Page context',JSON.stringify(await page.evaluate(()=>({url:location.href,title:document.title,readyState:document.readyState,scriptTags:document.scripts.length,bodyLength:document.body.innerHTML.length,menuButtons:document.querySelectorAll('header .menu-button').length,openMenu:typeof window.openMenu,hasOriginalHandler:document.documentElement.outerHTML.includes('function openMenu()')}))));
      const button=page.locator('header .menu-button').first();
      console.log('Testing '+cfg.name+' '+path+' menu');
      await button.click();
      const state=await page.evaluate(() => ({expanded:document.querySelector('header .menu-button')?.getAttribute('aria-expanded'),homeOpen:document.getElementById('sideMenu')?.classList.contains('open'),specialPanel:document.getElementById('fc-shared-header-navigation')?.hidden,openFunction:typeof window.openMenu,url:location.href,ready:document.readyState}));
      console.log('Menu after click',JSON.stringify(state));
      if(path==='index.html'){
        await page.waitForURL(/site-map(?:\\.html)?$/, {timeout:5000});
        await page.goto(base+'/index.html',{waitUntil:'load'});
      }else{
        await page.waitForFunction(() => document.querySelector('header .menu-button')?.getAttribute('aria-expanded')==='true',null,{timeout:5000});
        assert.equal(await page.locator('#fc-shared-header-navigation').isVisible(),true);
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => document.querySelector('header .menu-button')?.getAttribute('aria-expanded')==='false');
      }
      const language=page.locator('#oc-lang-static');
      assert.deepEqual(await language.locator('option').evaluateAll(a=>a.map(x=>x.value)),['en','es','it','pt']);
      const ask=page.locator('.tino-launcher').first();
      await ask.click();
      assert.equal(await page.locator('#tinoPanel').evaluate(x=>x.classList.contains('open')),true);
      await ask.click();
      assert.equal(await page.locator('#tinoPanel').evaluate(x=>x.classList.contains('open')),false);
      console.log(cfg.name+' '+path+' menu, four languages and Ask Tino panel OK');
    }
    for(const path of ['buy.html','sell.html','contact.html','calculators.html']){
      await page.goto(base+'/'+path,{waitUntil:'load',timeout:30000});
      const trigger=page.locator('header [data-oc-menu]').first();
      await trigger.waitFor({state:'visible'});
      const options=await page.locator('select#lang,select#oc-lang-static').first().locator('option').evaluateAll(a=>a.map(x=>x.value));
      assert.deepEqual(options,['en','es','it','pt'],'Languages on '+path);
      await trigger.click();
      const menu=page.locator('.oc-menu').first();
      assert.equal(await menu.isVisible(),true,'Navigation menu should open on '+path);
      await page.keyboard.press('Escape');
      assert.equal(await menu.isVisible(),false,'Escape should close menu on '+path);
      const ask=page.locator('.tino-launcher').first();
      await ask.click();
      assert.equal(await page.locator('#tinoPanel').evaluate(x=>x.classList.contains('open')),true);
      await ask.click();
      assert.equal(await page.locator('#tinoPanel').evaluate(x=>x.classList.contains('open')),false);
      console.log(cfg.name+' '+path+' menu, languages and Ask Tino OK');
    }
    await page.close();
  }
}finally{
  await browser.close();
}
