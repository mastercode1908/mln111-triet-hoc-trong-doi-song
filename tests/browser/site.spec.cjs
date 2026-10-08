const { test, expect } = require('@playwright/test');
const fs=require('node:fs');
const routes=require('../../data/routes.json');
const questions=require('../../data/questions.json');
async function ready(page,path){await page.goto(path);await expect(page.locator('body')).toHaveClass(/ready/);}
test('all 47 pages render without JS errors, video or broken internal links',async({page,request})=>{
  test.setTimeout(120000);const errors=[];page.on('pageerror',error=>errors.push(error.message));const links=new Set();
  for(const route of routes){await ready(page,'/'+route.file);await expect(page.locator('main h1')).toBeVisible();await expect(page.locator('video, iframe, [src*="youtube"]')).toHaveCount(0);await page.locator('main img').evaluateAll(async nodes=>{await Promise.all(nodes.map(img=>{img.loading='eager';return img.decode();}));});const hrefs=await page.locator('a[href^="/"]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href').split('#')[0]));hrefs.forEach(h=>links.add(h));}
  for(const href of links){const r=await request.get(href,{headers:href.endsWith('.pdf')?{Range:'bytes=0-4'}:{}});expect([200,206]).toContain(r.status());}
  expect(errors).toEqual([]);
});
test('reading progress, essays and accent-insensitive search survive reload',async({page})=>{
  await ready(page,'/module2.html');await page.locator('[data-complete="2-1"]').click();await page.reload();await expect(page.locator('[data-complete="2-1"]')).toHaveAttribute('aria-pressed','true');
  await page.locator('#essay-text-2').fill('Phân tích phương thức lao động và quan hệ sản xuất.');await page.locator('[data-save-essay="2"]').click();await page.reload();await expect(page.locator('#essay-text-2')).toHaveValue('Phân tích phương thức lao động và quan hệ sản xuất.');
  await page.locator('#open-search').click();await page.locator('#global-search').fill('gia dinh');await expect(page.locator('#search-results')).toContainText('gia đình');await page.keyboard.press('Escape');await expect(page.locator('#search-dialog')).not.toBeVisible();
  await ready(page,'/Overview.html');await page.locator('[data-filter="learning"]').click();await expect(page.locator('.roadmap-row')).toHaveCount(1);await expect(page.locator('.roadmap-row')).toContainText('giai cấp công nhân');
});
test('quiz scores explanations and saves result without double-counting',async({page})=>{
  await ready(page,'/quiz7.html');
  for(let i=0;i<6;i++){const text=await page.locator('#question-text').textContent();const q=questions.find(q=>q.question===text);await page.locator(`input[name="answer"][value="${q.correct}"]`).check();await page.locator('#quiz-action').click();await expect(page.locator('#question-feedback')).toContainText('Chính xác');await page.locator('#quiz-action').click();}
  await expect(page.locator('.score-number')).toHaveText('6/6');await ready(page,'/practice.html');await expect(page.locator('#practice-content')).toContainText('100%');
});
test('all matching pairs can be solved and scenario game reaches feedback',async({page})=>{
  await ready(page,'/game.html?mode=match');for(let i=0;i<4;i++){await page.locator(`[data-term="${i}"]`).click();await page.locator(`[data-definition="${i}"]`).click();}await expect(page.locator('#match-score')).toHaveText('4/4');await expect(page.locator('#match-feedback')).toContainText('Hoàn thành');
  await ready(page,'/game.html?mode=situations');await page.locator('input[name="choice"]').first().check();await page.locator('#situation-next').click();await expect(page.locator('#situation-feedback')).not.toBeEmpty();await page.locator('#situation-next').click();await expect(page.locator('.game-header')).toContainText('2/7');
});
test('local assistant lookup renders sources, handles out of scope and clears history',async({page})=>{
  await ready(page,'/ai-assistants.html');await expect(page.locator('#use-ai')).toBeDisabled();await page.locator('#chat-input').fill('chức năng gia đình');await page.locator('#send-chat').click();await expect(page.locator('.message.assistant').last()).toContainText('Gia đình');await expect(page.locator('.answer-sources a').first()).toBeVisible();await page.locator('#chat-input').fill('weather forecast tomorrow bitcoin price');await page.locator('#send-chat').click();await expect(page.locator('.message.assistant').last()).toContainText('Chưa tìm thấy');await page.locator('#clear-chat').click();await expect(page.locator('.message')).toHaveCount(0);
});
test('mobile pages fit the screen and menu works; capture desktop and mobile previews',async({page})=>{
  test.setTimeout(120000);await page.setViewportSize({width:390,height:844});
  for(const path of ['/home.html','/Overview.html','/module6.html','/practice.html','/quiz1.html','/games.html','/game.html?mode=match','/cases.html?case=viec-nha','/articles.html','/articles/chia-se-viec-nha.html','/ai-assistants.html','/resources.html','/progress.html']){await ready(page,path);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),path).toBeTruthy();}
  await ready(page,'/home.html');await page.locator('#toggle-nav').click();await expect(page.locator('#main-nav')).toBeVisible();await page.locator('#main-nav').getByText('Lộ trình',{exact:true}).click();await expect(page).toHaveURL(/Overview/);
  fs.mkdirSync('output/site-preview',{recursive:true});await ready(page,'/home.html');await page.locator('main img').evaluateAll(async nodes=>{await Promise.all(nodes.map(img=>{img.loading='eager';return img.decode();}));});await page.screenshot({path:'output/site-preview/home-mobile.png',fullPage:true});await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'output/site-preview/home-desktop.png',fullPage:true});await ready(page,'/module2.html');await page.screenshot({path:'output/site-preview/chapter-2-desktop.png',fullPage:true});
});
