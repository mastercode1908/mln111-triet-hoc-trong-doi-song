import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { emptyState, sanitizeState, readState, writeState, chapterProgress, toggleLesson, recordQuiz, normalize, shuffled } from '../js/state.mjs';
import { retrieve } from '../js/retrieval.mjs';
const json = name => JSON.parse(fs.readFileSync(new URL(`../data/${name}.json`,import.meta.url),'utf8'));
const chapters=json('chapters'), questions=json('questions');
test('7 chapters cover the source PDF in order and all relationships resolve',()=>{
  assert.deepEqual(chapters.map(x=>x.id),[1,2,3,4,5,6,7]);
  let next=8;const ids=new Set();
  for(const c of chapters){assert.equal(c.pages[0],next);next=c.pages[1]+1;assert.equal(c.lessons.length,4);assert.ok(c.objectives.length>=3);assert.ok(c.essay.rubric.length>=4);for(const l of c.lessons){assert.ok(!ids.has(l.id));ids.add(l.id);assert.ok(l.pages[0]>=c.pages[0]&&l.pages[1]<=c.pages[1]&&l.pages[1]>=l.pages[0]);assert.ok(l.paragraphs.every(p=>p.length>100));}}
  assert.equal(next,267);
  for(const name of ['questions','glossary','cases','articles'])for(const item of json(name)){assert.ok(ids.has(item.lessonId),`${name}: ${item.lessonId}`);assert.equal(Number(item.lessonId.split('-')[0]),item.chapterId);}
  for(const c of chapters)assert.ok(json('cases').find(x=>x.id===c.caseId));
});
test('42 questions each have valid answers, explanation and source',()=>{
  assert.equal(questions.length,42);assert.equal(new Set(questions.map(q=>q.id)).size,42);
  for(const c of chapters)assert.equal(questions.filter(q=>q.chapterId===c.id).length,6);
  for(const q of questions){assert.equal(q.options.length,4);assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<4);assert.ok(q.explanation.length>50);const c=chapters[q.chapterId-1];assert.ok(q.pages[0]>=c.pages[0]&&q.pages[1]<=c.pages[1]);}
});

test('all lessons include detailed, cited sections and review prompts',()=>{
  let count=0;
  for(const c of chapters)for(const l of c.lessons){
    assert.equal(l.sections.length,3,l.id);
    assert.ok(l.review.length>80,l.id);
    for(const section of l.sections){
      count++;
      assert.ok(section.title.length>12);
      assert.equal(section.paragraphs.length,2);
      assert.ok(section.paragraphs.every(p=>p.length>100));
      assert.deepEqual(section.pages,l.pages);
    }
  }
  assert.equal(count,84);
});
test('progress survives reload, toggles without duplicates and handles corrupt storage',()=>{
  const memory=new Map();const storage={getItem:k=>memory.get(k),setItem:(k,v)=>memory.set(k,v)};
  const state=emptyState();toggleLesson(state,'2-1');toggleLesson(state,'2-2');assert.equal(writeState(storage,state),true);const read=readState(storage);assert.equal(chapterProgress(chapters[1],read).percent,50);toggleLesson(read,'2-1');assert.deepEqual(read.completed,['2-2']);
  assert.deepEqual(readState({getItem:()=>'{corrupt'}),emptyState());assert.equal(writeState({setItem:()=>{throw new Error();}},state),false);
  assert.deepEqual(sanitizeState({completed:['1-1','1-1','999','1-9'],essays:[],lastLesson:'xxx'}).completed,['1-1']);
});
test('quiz best score is preserved after a worse result',()=>{const state=emptyState();recordQuiz(state,'1',5,6);recordQuiz(state,'1',2,6);assert.equal(state.quizzes['1'].best,83);assert.equal(state.quizzes['1'].percent,33);recordQuiz(state,'2',9,6);assert.equal(state.quizzes['2'],undefined);});
test('search normalization handles Vietnamese and shuffle does not mutate source',()=>{assert.equal(normalize('Dân tộc và Gia đình'),'dan toc va gia dinh');const a=[1,2,3,4];const b=shuffled(a,()=>0);assert.deepEqual(a,[1,2,3,4]);assert.deepEqual([...b].sort(),a);assert.notDeepEqual(b,a);});
test('retrieval locates representative material in all 7 chapters and abstains outside scope',()=>{
  for(const [question,expected] of [['ba phát kiến của Mác',1],['ba nội dung sứ mệnh lịch sử',2],['bỏ qua chế độ tư bản chủ nghĩa',3],['dân chủ trực tiếp gián tiếp',4],['cơ cấu xã hội giai cấp',5],['tôn giáo tín ngưỡng',6],['chức năng gia đình',7]])assert.equal(retrieve(chapters,question)[0].chapterId,expected,question);
  assert.deepEqual(retrieve(chapters,'weather forecast tomorrow bitcoin price'),[]);
  assert.deepEqual(retrieve(chapters,'???'),[]);
});
test('published HTML and scripts contain no video player or old course assets',()=>{
  const routes=json('routes');assert.ok(routes.length>=40);
  for(const {file}of routes){const text=fs.readFileSync(new URL(`../public/${file}`,import.meta.url),'utf8');assert.ok(!/<video|youtube|<iframe/i.test(text),file);assert.match(text,/data-page=/);}
  assert.ok(!fs.existsSync(new URL('../public/server.js',import.meta.url)));
  assert.ok(!fs.existsSync(new URL('../public/.env',import.meta.url)));
  assert.ok(!fs.existsSync(new URL('../public/js/quiz-data.js',import.meta.url)));
  assert.equal(fs.readFileSync(new URL('../assets/docs/cnxh-khoa-hoc-2021.pdf',import.meta.url),'utf8').slice(0,5),'%PDF-');
});
