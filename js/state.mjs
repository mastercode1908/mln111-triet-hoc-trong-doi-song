export const STORAGE_KEY = 'cnxhkh.learning.v1';
export const CHAT_KEY = 'cnxhkh.chat.v1';
export function emptyState() { return { completed: [], quizzes: {}, essays: {}, lastLesson: null, games: {} }; }
export function sanitizeState(value) {
  const result = emptyState();
  if (!value || typeof value !== 'object') return result;
  result.completed = [...new Set((Array.isArray(value.completed) ? value.completed : []).filter(x => /^[1-7]-[1-4]$/.test(x)))];
  for (const key of ['quizzes', 'essays', 'games']) if (value[key] && typeof value[key] === 'object' && !Array.isArray(value[key])) result[key] = value[key];
  result.lastLesson = /^[1-7]-[1-4]$/.test(value.lastLesson) ? value.lastLesson : null;
  return result;
}
export function readState(storage) { try { return sanitizeState(JSON.parse(storage.getItem(STORAGE_KEY))); } catch { return emptyState(); } }
export function writeState(storage, state) { try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; } catch { return false; } }
export function chapterProgress(chapter, state) { const done = chapter.lessons.filter(l => state.completed.includes(l.id)).length; return { done, total: chapter.lessons.length, percent: Math.round(done / chapter.lessons.length * 100) }; }
export function toggleLesson(state, id) { if (!/^[1-7]-[1-4]$/.test(id)) return state; state.completed = state.completed.includes(id) ? state.completed.filter(x => x !== id) : [...state.completed, id]; state.lastLesson = id; return state; }
export function recordQuiz(state, key, correct, total) { if (!total || correct < 0 || correct > total) return state; const percent = Math.round(correct / total * 100); const old = state.quizzes[key]; state.quizzes[key] = { correct, total, percent, best: Math.max(Number(old?.best) || 0, percent), at: new Date().toISOString() }; return state; }
export function normalize(text) { return String(text ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); }
export function shuffled(items, random = Math.random) { const result = [...items]; for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; } return result; }
