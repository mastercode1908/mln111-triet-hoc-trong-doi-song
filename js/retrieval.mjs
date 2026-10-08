import { normalize } from './state.mjs';
const STOP = new Set('toi ban hay gi nhu nao cac mot nhung cua va la cho trong ve co voi duoc khong nay the tai khi vi sao giua sau len de ra o se da can tu tren hoc hoi xin muon biet'.split(' '));
export function retrieve(chapters, question, limit = 4) {
  const query = normalize(question);
  const terms = [...new Set(query.split(/[^a-z0-9]+/).filter(t => t.length > 1 && !STOP.has(t)))];
  if (!terms.length) return [];
  const matches = chapters.flatMap(c => c.lessons.map(l => {
    const title = normalize(l.title), titleWords = new Set(title.split(/[^a-z0-9]+/));
    const chapterWords = new Set(normalize(c.title).split(/[^a-z0-9]+/));
    const sectionWords = new Set(normalize((l.sections||[]).map(s=>s.title).join(' ')).split(/[^a-z0-9]+/));
    const paragraphs = [...l.paragraphs,...(l.sections||[]).flatMap(s=>[s.title,...s.paragraphs])];
    const words = new Set(normalize(paragraphs.join(' ') + ' ' + l.bullets.join(' ')).split(/[^a-z0-9]+/));
    const hits = terms.filter(term => titleWords.has(term) || chapterWords.has(term) || words.has(term));
    const score = hits.reduce((sum,t) => sum + (titleWords.has(t) ? 5 : chapterWords.has(t) ? 3 : sectionWords.has(t) ? 2 : 1), 0) + (query.includes(title) ? 12 : 0);
    return { chapterId: c.id, lessonId: l.id, title: l.title, pages: l.pages, paragraphs, bullets: l.bullets, score, hits: hits.length };
  })).filter(x => x.hits >= Math.min(2, terms.length) && x.score >= 2);
  return matches.sort((a,b) => b.score - a.score || a.lessonId.localeCompare(b.lessonId)).slice(0, limit);
}
export function sourceOf(record) { return { chapterId: record.chapterId, lessonId: record.lessonId, title: record.title, pages: record.pages }; }
