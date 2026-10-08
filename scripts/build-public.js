const fs = require('node:fs');
const path = require('node:path');
require('./build-pages');
const root = path.resolve(__dirname,'..');
const publicRoot = path.join(root,'public');
fs.mkdirSync(publicRoot,{recursive:true});
function copy(file) { const source=path.join(root,file);const target=path.join(publicRoot,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(source,target); }
const routes = JSON.parse(fs.readFileSync(path.join(root,'data','routes.json'),'utf8'));
routes.forEach(route=>copy(route.file));
for (const file of ['css/site.css','js/app.js','js/state.mjs','js/retrieval.mjs','assets/illustrations/society.svg','assets/illustrations/favicon.svg','assets/docs/cnxh-khoa-hoc-2021.pdf','header.html','footer.html']) copy(file);
for (const file of fs.readdirSync(path.join(root,'assets/illustrations/generated'))) if(file.endsWith('.webp')) copy(`assets/illustrations/generated/${file}`);
for (const file of fs.readdirSync(path.join(root,'data'))) if(file.endsWith('.json'))copy(`data/${file}`);
console.log('Public website built. Internal files and legacy scripts are not served.');
