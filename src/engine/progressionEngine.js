import { CLUE_REQUIREMENTS, CLUE_TYPES } from '../data/clues';

/**
 * Game Progression Engine
 * Tracks player progress and validates when solution can be revealed
 */
export class ProgressionEngine {
  constructor() {
    this.collectedClues = new Set();
  }

  /**
   * Register a clue as collected
   */
  collectClue(clueType) {
    if (Object.values(CLUE_TYPES).includes(clueType)) {
      this.collectedClues.add(clueType);
      return true;
    }
    return false;
  }

  /**
   * Check if all requirements are met to show solution
   */
  canShowSolution() {
    return CLUE_REQUIREMENTS.every(requirement =>
      this.collectedClues.has(requirement)
    );
  }

  /**
   * Get progress percentage (0-100)
   */
  getProgress() {
    const collected = this.collectedClues.size;
    const total = CLUE_REQUIREMENTS.length;
    return Math.round((collected / total) * 100);
  }

  /**
   * Get missing clues
   */
  getMissingClues() {
    return CLUE_REQUIREMENTS.filter(req => !this.collectedClues.has(req));
  }

  /**
   * Reset progression
   */
  reset() {
    this.collectedClues.clear();
  }

  /**
   * Get clue collection state
   */
  getState() {
    return Array.from(this.collectedClues);
  }

  /**
   * Restore clue collection state
   */
  restoreState(clues) {
    this.collectedClues.clear();
    if (Array.isArray(clues)) {
      clues.forEach(clue => this.collectClue(clue));
    }
  }
}

export const createProgressionEngine = () => new ProgressionEngine();
