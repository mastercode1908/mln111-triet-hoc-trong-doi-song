const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const chapters = require('../data/chapters.json');
const articles = require('../data/articles.json');
const routes = [
  ['index.html','home','Trang chủ'],['home.html','home','Trang chủ'],['Overview.html','overview','Lộ trình 7 chương'],
  ['practice.html','practice','Luyện tập'],['quiz.html','quiz','Ôn tập tổng hợp'],['games.html','games','Trò chơi'],
  ['game.html','game','Hoạt động tương tác'],['articles.html','articles','Bài viết'],['cases.html','cases','Tình huống đời sống'],
  ['ai-assistants.html','ai','Trợ lý học tập'],['resources.html','resources','Giáo trình và tài nguyên'],['progress.html','progress','Tiến độ của tôi'],
  ...chapters.flatMap(c => [[`module${c.id}.html`,'chapter',c.title,`data-chapter="${c.id}"`],[`quiz${c.id}.html`,'quiz',`Trắc nghiệm chương ${c.id}`,`data-chapter="${c.id}"`]]),
  ...articles.map(a => [`articles/${a.slug}.html`,'article',a.title,`data-article="${a.id}"`]),
  ['worldview-game.html','game','Chọn cách phân tích','data-mode="situations"'],
  ['philosopher-match-game.html','game','Ghép khái niệm','data-mode="match"'],
  ['philosophy-game.html','game','Phân loại và phân biệt','data-mode="classify"'],
  ['philosophy-game-enhanced.html','game','Chọn cách phân tích','data-mode="situations"'],
  ['cafef.html','articles','Bài viết'],
];
const aliases = {
  '5-thoi-quen-thay-doi-doi-nguoi.html':'cham-soc', 'ap-luc-hoc-tap.html':'doc-xa-hoi',
  'dao-tao-dai-hoc-thuc-tien.html':'chuoi-gia-tri', 'giai-phong-con-nguoi-mac.html':'cong-nghe',
  'khai-niem-tha-hoa.html':'cong-nghe', 'song-mon-nguoi-tre-tu-hai-minh.html':'qua-do',
  'stress-nguyen-nhan-va-cach-dieu-tri.html':'cham-soc', 'toi-la-ai-kham-pha-ban-than.html':'ton-trong',
  'top-7-cau-noi-truyen-cam-hung.html':'tham-gia',
};
for (const [file,id] of Object.entries(aliases)) { const a=articles.find(x=>x.id===id); routes.push([`articles/${file}`,'article',a.title,`data-article="${id}"`]); }
function escape(text) { return text.replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x])); }
for (const [file,page,title,attributes=''] of routes) {
  const document = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#2377de"><meta name="description" content="${escape(title)} — Học Chủ nghĩa xã hội khoa học theo giáo trình 2021, qua tình huống và bài luyện tập có nguồn."><title>${escape(title)} | CNXH · Đời sống</title><link rel="icon" type="image/svg+xml" href="/assets/illustrations/favicon.svg"><link rel="stylesheet" href="/css/site.css"><script type="module" src="/js/app.js"></script></head>
<body data-page="${page}" ${attributes}><a class="skip-link" href="#main">Đến nội dung chính</a><header class="site-header" id="site-header"></header><main id="main" tabindex="-1"><div class="loading" role="status">Đang mở học liệu…</div></main><footer class="site-footer" id="site-footer"></footer><noscript><p>Website cần JavaScript để hiển thị bài học và lưu tiến độ. Bạn vẫn có thể <a href="/assets/docs/cnxh-khoa-hoc-2021.pdf">đọc giáo trình PDF</a>.</p></noscript></body></html>
`;
  fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),document);
}
fs.writeFileSync(path.join(root,'header.html'),'<nav aria-label="Điều hướng chính"><a href="/home.html">CNXH · Đời sống</a><a href="/Overview.html">Lộ trình 7 chương</a><a href="/practice.html">Luyện tập</a><a href="/games.html">Trò chơi</a><a href="/articles.html">Bài viết</a><a href="/ai-assistants.html">Trợ lý học tập</a></nav>\n');
fs.writeFileSync(path.join(root,'footer.html'),'<footer>Bộ Giáo dục và Đào tạo · Giáo trình Chủ nghĩa xã hội khoa học · Nhà xuất bản Chính trị quốc gia Sự thật, 2021. <a href="/resources.html">Nguồn và tài nguyên</a></footer>\n');
const routesPath = path.join(root,'data','routes.json');
const routesContent = JSON.stringify(routes.map(([file,page,title])=>({file,page,title})),null,2)+'\n';
if (!fs.existsSync(routesPath) || fs.readFileSync(routesPath,'utf8') !== routesContent) fs.writeFileSync(routesPath,routesContent);
console.log(`Built ${routes.length} pages, including 7 chapters and 7 chapter quizzes.`);
