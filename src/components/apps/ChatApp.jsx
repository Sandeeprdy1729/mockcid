import React from 'react';
import { CHAT_MESSAGES } from '../../data/content';
import PasswordLock from '../common/PasswordLock';

export default function ChatApp({ onBack, isLocked, onUnlock, attemptLimiter, appId }) {
  if (isLocked) {
    return (
      <div className="app-screen">
        <div className="app-header">
          <button className="app-back-btn" onClick={onBack}>←</button>
          <span className="app-header-title">Chat</span>
          <div style={{ width: '32px' }}></div>
        </div>
        <PasswordLock
          appId={appId}
          appName="Chat with Riya Railways"
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
        <span className="app-header-title">Chat</span>
        <div style={{ width: '32px' }}></div>
      </div>
      <div className="app-content">
        <div className="chat-messages">
          {CHAT_MESSAGES.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-status">Last seen: Oct 28, 10:14 PM</div>
      </div>
    </div>
  );
}
