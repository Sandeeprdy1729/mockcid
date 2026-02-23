import React, { useState } from 'react';
import { NOTES_DATA } from '../../data/content';
import PasswordLock from '../common/PasswordLock';

export default function NotesApp({ onBack, isLocked, onUnlock, attemptLimiter, appId }) {
  const [expanded, setExpanded] = useState(new Set());

  if (isLocked) {
    return (
      <div className="app-screen">
        <div className="app-header">
          <button className="app-back-btn" onClick={onBack}>←</button>
          <span className="app-header-title">Notes</span>
          <div style={{ width: '32px' }}></div>
        </div>
        <PasswordLock
          appId={appId}
          appName="Notes"
          onUnlock={onUnlock}
          attemptLimiter={attemptLimiter}
        />
      </div>
    );
  }

  const toggleNote = (id) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  return (
    <div className="app-screen">
      <div className="app-header">
        <button className="app-back-btn" onClick={onBack}>←</button>
        <span className="app-header-title">Notes</span>
        <div style={{ width: '32px' }}></div>
      </div>
      <div className="app-content">
        <div className="notes-list">
          {NOTES_DATA.map(note => (
            <div
              key={note.id}
              className={`note-item ${expanded.has(note.id) ? 'expanded' : ''}`}
              onClick={() => toggleNote(note.id)}
            >
              <div className="note-title">{note.title}</div>
              <div className="note-content">
                {note.id === 'n4' ? (
                  <>
                    {note.content.split(' ').map((word, idx) => (
                      (idx + 1) % 4 === 0 ? (
                        <span key={idx} className="highlight">{word}</span>
                      ) : (
                        <span key={idx}>{word}</span>
                      )
                    )).map((el, i) => <React.Fragment key={i}>{el} </React.Fragment>)}
                  </>
                ) : (
                  note.content
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
