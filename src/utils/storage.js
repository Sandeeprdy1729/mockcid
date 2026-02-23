const STORAGE_KEY = 'MOCK_CID_STATE';

/**
 * Save game state to localStorage
 */
export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (e) {
    console.error('Failed to save state:', e);
    return false;
  }
};

/**
 * Load game state from localStorage
 */
export const loadState = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (e) {
    console.error('Failed to load state:', e);
    return null;
  }
};

/**
 * Clear game state
 */
export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Failed to clear state:', e);
    return false;
  }
};

/**
 * Check if state exists
 */
export const hasState = () => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};
