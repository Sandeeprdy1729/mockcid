/**
 * Attempt Limiter
 * Manages password attempt counts and lockout timers
 */
export class AttemptLimiter {
  constructor() {
    this.attempts = {}; // appId -> { count, lockedUntil }
  }

  /**
   * Record a failed attempt
   */
  recordAttempt(appId, maxAttempts = 3, lockoutDuration = 20000) {
    if (!this.attempts[appId]) {
      this.attempts[appId] = { count: 0, lockedUntil: null };
    }

    this.attempts[appId].count += 1;

    // Lock if max attempts reached
    if (this.attempts[appId].count >= maxAttempts) {
      this.attempts[appId].lockedUntil = Date.now() + lockoutDuration;
    }

    return {
      count: this.attempts[appId].count,
      isLocked: this.isLocked(appId),
      lockedUntil: this.attempts[appId].lockedUntil
    };
  }

  /**
   * Check if app is currently locked
   */
  isLocked(appId) {
    if (!this.attempts[appId]) {
      return false;
    }

    const { lockedUntil } = this.attempts[appId];
    if (!lockedUntil) {
      return false;
    }

    if (Date.now() > lockedUntil) {
      // Unlock
      this.reset(appId);
      return false;
    }

    return true;
  }

  /**
   * Get time remaining in lockout (in ms)
   */
  getTimeRemaining(appId) {
    if (!this.attempts[appId] || !this.attempts[appId].lockedUntil) {
      return 0;
    }

    const remaining = this.attempts[appId].lockedUntil - Date.now();
    return Math.max(0, remaining);
  }

  /**
   * Get attempt count
   */
  getAttemptCount(appId) {
    return this.attempts[appId]?.count || 0;
  }

  /**
   * Reset attempts for app
   */
  reset(appId) {
    if (this.attempts[appId]) {
      this.attempts[appId] = { count: 0, lockedUntil: null };
    }
  }

  /**
   * Reset all attempts
   */
  resetAll() {
    this.attempts = {};
  }

  /**
   * Get state for persistence
   */
  getState() {
    return JSON.parse(JSON.stringify(this.attempts));
  }

  /**
   * Restore state
   */
  restoreState(state) {
    this.attempts = state || {};
  }
}

export const createAttemptLimiter = () => new AttemptLimiter();
