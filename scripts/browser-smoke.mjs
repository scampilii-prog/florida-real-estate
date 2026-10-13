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
    for(const path of ['index.html','site-map.html','closing-costs.html']){
      await page.goto(base+'/'+path,{waitUntil:'load',timeout:30000});
      await page.locator('.menu-button').first().waitFor({state:'visible'});
      console.log('Page context',JSON.stringify(await page.evaluate(()=>({url:location.href,title:document.title,readyState:document.readyState,scriptTags:document.scripts.length,bodyLength:document.body.innerHTML.length,menuButtons:document.querySelectorAll('header .menu-button').length,openMenu:typeof window.openMenu,hasOriginalHandler:document.documentElement.outerHTML.includes('function openMenu()')}))));
      const button=page.locator('header .menu-button').first();
      console.log('Testing '+cfg.name+' '+path+' menu');
      await button.click();
      const state=await page.evaluate(() => ({expanded:document.querySelector('header .menu-button')?.getAttribute('aria-expanded'),homeOpen:document.getElementById('sideMenu')?.classList.contains('open'),specialPanel:document.getElementById('fc-shared-header-navigation')?.hidden,openFunction:typeof window.openMenu,url:location.href,ready:document.readyState}));
      console.log('Menu after click',JSON.stringify(state));
      await page.waitForFunction(() => document.querySelector('header .menu-button')?.getAttribute('aria-expanded')==='true',null,{timeout:5000});
      if(path==='index.html'){
        assert.equal(await page.locator('.oc-menu[data-sc-full-menu="1"]').isVisible(),true,'Home editorial menu must open');
      }else{
        assert.equal(await page.locator('#fc-shared-header-navigation').isVisible(),true);
      }
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => document.querySelector('header .menu-button')?.getAttribute('aria-expanded')==='false');
      assert.equal(await button.evaluate(x=>document.activeElement===x),true,'Escape returns menu focus to trigger on '+path);
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
