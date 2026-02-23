import { PASSWORD_CONFIG } from '../data/passwords';

/**
 * Validate a password against stored configuration
 * Returns an object with isValid and error message
 */
export const validatePassword = (appId, password) => {
  const config = PASSWORD_CONFIG[appId];
  
  if (!config) {
    return {
      isValid: false,
      error: 'App not found'
    };
  }

  if (password === config.password) {
    return {
      isValid: true,
      error: null
    };
  }

  return {
    isValid: false,
    error: 'Incorrect password'
  };
};

/**
 * Validate PIN code for phone unlock
 */
export const validatePin = (pin) => {
  return pin === '1028';
};

/**
 * Check if app is locked and get password config
 */
export const getAppLockConfig = (appId) => {
  return PASSWORD_CONFIG[appId] || null;
};

/**
 * Clamp attempt count to max attempts
 */
export const hasExceededAttempts = (appId, attempts) => {
  const config = PASSWORD_CONFIG[appId];
  return config && attempts >= config.maxAttempts;
};
