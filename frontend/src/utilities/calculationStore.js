// Frontend store for calculations / leads, backed by localStorage.
// Structured so a future admin panel or backend can read/search by calculation ID.

const STORE_KEY = 'rg_calculations';

const readStore = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
};

const writeStore = (store) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    // localStorage may be unavailable (private mode / quota) - fail silently
  }
};

// Generate a short, human-friendly calculation ID like "RG-48271".
// Avoids collisions with existing records in the store.
export const generateCalculationId = () => {
  const store = readStore();
  let id;
  do {
    id = 'RG-' + Math.floor(10000 + Math.random() * 90000);
  } while (store[id]);
  return id;
};

// Save (create) a full calculation record keyed by its id.
export const saveCalculation = (record) => {
  if (!record || !record.id) return;
  const store = readStore();
  store[record.id] = record;
  writeStore(store);
};

// Shallow-merge a partial update into an existing record (status, whatsappMessage, etc.).
export const updateCalculation = (id, partial) => {
  if (!id) return;
  const store = readStore();
  if (!store[id]) return;
  store[id] = { ...store[id], ...partial };
  writeStore(store);
};

// Retrieve a full calculation by id (ready for a future admin search).
export const getCalculation = (id) => {
  const store = readStore();
  return store[id] || null;
};

// Retrieve all calculations (for a future admin list).
export const getAllCalculations = () => readStore();
