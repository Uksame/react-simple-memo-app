// Fallback store used when the API can't be reached, so the app is still
// usable (and edits persist across navigation/reloads) without a backend running.
import { sampleNotes, sampleCategories } from "../Sample Data/sample";

const NOTES_KEY = "memoapp.localNotes";
const CATEGORIES_KEY = "memoapp.localCategories";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // e.g. private browsing storage quota — edits just won't persist
  }
  return value;
}

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

export function getLocalNotes() {
  return read(NOTES_KEY, sampleNotes);
}

export function getLocalCategories() {
  return read(CATEGORIES_KEY, sampleCategories);
}

function categoryRef(categoryId) {
  const category = getLocalCategories().find(
    (c) => String(c.id) === String(categoryId)
  );
  return category
    ? { id: category.id, name: category.name, accessType: category.accessType }
    : null;
}

export function addLocalNote({ title, content, category_id }) {
  const notes = getLocalNotes();
  const note = {
    id: nextId(notes),
    title,
    content,
    dateTime: new Date().toISOString(),
    category: categoryRef(category_id),
  };
  write(NOTES_KEY, [note, ...notes]);
  return note;
}

export function updateLocalNote({ id, title, content, category_id }) {
  const updated = getLocalNotes().map((n) =>
    n.id === id
      ? { ...n, title, content, category: categoryRef(category_id) }
      : n
  );
  write(NOTES_KEY, updated);
  return updated.find((n) => n.id === id);
}

export function deleteLocalNote(id) {
  write(NOTES_KEY, getLocalNotes().filter((n) => n.id !== id));
}

export function addLocalCategory(name, accessType) {
  const categories = getLocalCategories();
  const category = { id: nextId(categories), name, accessType, noteIds: [] };
  write(CATEGORIES_KEY, [...categories, category]);
  return category;
}

export function deleteLocalCategory(id) {
  write(CATEGORIES_KEY, getLocalCategories().filter((c) => c.id !== id));
  write(
    NOTES_KEY,
    getLocalNotes().map((n) =>
      n.category && n.category.id === id ? { ...n, category: null } : n
    )
  );
}
