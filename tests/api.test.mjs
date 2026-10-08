import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
// No real vendor requests are made by the automated suite.
process.env.GEMINI_API_KEY='';
const app=require('../server.js');
const server=app.listen(0,'127.0.0.1');
await new Promise(resolve=>server.once('listening',resolve));
const url=`http://127.0.0.1:${server.address().port}`;
test.after(()=>new Promise(resolve=>server.close(resolve)));
test('public pages, root and a chapter 7 quiz are served',async()=>{for(const path of ['/','/module7.html','/quiz7.html','/articles/ton-trong-khac-biet.html']){const r=await fetch(url+path);assert.equal(r.status,200);assert.match(await r.text(),/CNXH/);}});
test('internal project files are not publicly accessible',async()=>{for(const path of ['/server.js','/.env','/package.json','/HUONG_CHINH_SUA_CNXHKH.md','/.git/config'])assert.equal((await fetch(url+path)).status,404,path);});
test('PDF supports direct loading and byte-range navigation',async()=>{const r=await fetch(url+'/assets/docs/cnxh-khoa-hoc-2021.pdf',{headers:{Range:'bytes=0-4'}});assert.equal(r.status,206);assert.equal(await r.text(),'%PDF-');});
test('health and missing-key lookup have truthful modes and grounded sources',async()=>{const health=await(await fetch(url+'/api/health')).json();assert.equal(health.aiConfigured,false);const r=await fetch(url+'/api/ask-gemini',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:'chức năng gia đình'})});assert.equal(r.status,200);const value=await r.json();assert.equal(value.mode,'lookup');assert.equal(value.sources[0].chapterId,7);assert.equal(value.sources[0].lessonId,'7-1');assert.ok(value.answer.includes('Gia đình'));});
test('invalid inputs and unsupported topics are handled without model requests',async()=>{for(const question of ['',123,'x'.repeat(2001)]){const r=await fetch(url+'/api/ask-gemini',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question})});assert.equal(r.status,400);}const r=await fetch(url+'/api/ask-gemini',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:'weather forecast tomorrow bitcoin price'})});assert.deepEqual((await r.json()).sources,[]);});
