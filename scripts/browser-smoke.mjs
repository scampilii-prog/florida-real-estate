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
    for(const path of ['index.html','site-map.html','closing-costs.html']){
      await page.goto(base+'/'+path,{waitUntil:'domcontentloaded',timeout:30000});
      await page.locator('.menu-button').first().waitFor({state:'visible'});
      const button=page.locator('header .menu-button').first();
      await button.click();
      await page.waitForFunction(() => document.querySelector('header .menu-button')?.getAttribute('aria-expanded')==='true');
      if(path==='index.html'){
        assert.equal(await page.locator('#sideMenu').evaluate(x=>x.classList.contains('open')),true);
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
    await page.close();
  }
}finally{
  await browser.close();
}
