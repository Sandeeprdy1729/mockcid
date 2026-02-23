import React, { useState } from 'react';
import { FILE_INFO } from '../../data/content';
import PasswordLock from '../common/PasswordLock';

export default function FilesApp({ onBack, isLocked, onUnlock, attemptLimiter, appId }) {
  const [expanded, setExpanded] = useState(false);

  if (isLocked) {
    return (
      <div className="app-screen">
        <div className="app-header">
          <button className="app-back-btn" onClick={onBack}>←</button>
          <span className="app-header-title">Files</span>
          <div style={{ width: '32px' }}></div>
        </div>
        <PasswordLock
          appId={appId}
          appName="Files"
          onUnlock={onUnlock}
          attemptLimiter={attemptLimiter}
        />
      </div>
    );
  }

  return (
    <div className="app-screen">
      <div className="app-header">
        <button className="app-back-btn" onClick={onBack}>←</button>
        <span className="app-header-title">Files</span>
        <div style={{ width: '32px' }}></div>
      </div>
      <div className="app-content">
        <div className="file-item" onClick={() => setExpanded(!expanded)}>
          <div className="file-icon">📹</div>
          <div className="file-info">
            <div className="file-name">
              {FILE_INFO.name}<span className="file-badge">⚠️ {FILE_INFO.status}</span>
            </div>
            <div className="file-meta">{FILE_INFO.created}</div>
            <div className="file-meta">{FILE_INFO.size}</div>
          </div>
        </div>
        {expanded && (
          <div className="file-expanded">
            {FILE_INFO.message}
            <div className="file-location">{FILE_INFO.location}</div>
          </div>
        )}
      </div>
    </div>
  );
}
