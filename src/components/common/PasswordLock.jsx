import React, { useState, useEffect } from 'react';
import { validatePassword, getAppLockConfig, hasExceededAttempts } from '../../utils/validators';
import { PASSWORD_HINTS } from '../../data/passwords';

export default function PasswordLock({ appId, appName, onUnlock, attemptLimiter }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);

  const config = getAppLockConfig(appId);
  const hint = PASSWORD_HINTS[appId === 'notes' ? 'NOTES_APP' : appId === 'gallery' ? 'GALLERY_APP' : appId === 'chat' ? 'CHAT_APP' : 'FILES_APP'];

  // Check lockout status
  useEffect(() => {
    const checkLockout = () => {
      if (attemptLimiter.isLocked(appId)) {
        setIsLocked(true);
        const remaining = Math.ceil(attemptLimiter.getTimeRemaining(appId) / 1000);
        setLockTimeRemaining(remaining);
      } else {
        setIsLocked(false);
        setLockTimeRemaining(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [appId, attemptLimiter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Locked. Try again in ${lockTimeRemaining}s`);
      return;
    }

    const validation = validatePassword(appId, password);

    if (validation.isValid) {
      setPassword('');
      setError('');
      onUnlock();
    } else {
      const attempt = attemptLimiter.recordAttempt(
        appId,
        config.maxAttempts,
        config.lockoutDuration
      );

      setError(validation.error);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);

      if (attempt.isLocked) {
        setIsLocked(true);
      }

      setPassword('');
    }
  };

  return (
    <div className="app-content">
      <div className="password-lock">
        <div className="lock-icon">🔐</div>
        <div className="lock-title">{appName} is locked</div>
        <div className="lock-hint-text">{hint}</div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="password"
            className={`password-input ${isShaking ? 'shake' : ''}`}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLocked}
          />
          <button
            type="submit"
            className="password-btn"
            disabled={isLocked || password.length === 0}
          >
            {isLocked ? `Locked (${lockTimeRemaining}s)` : 'Unlock'}
          </button>
        </form>

        {error && <div className="password-error">{error}</div>}
      </div>
    </div>
  );
}
