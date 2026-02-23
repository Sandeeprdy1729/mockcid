import React from 'react';

export default function HomeScreen({ onOpenApp, showSolveButton, onShowSolution, onResetGame }) {
  const apps = [
    { id: 'voiceRecorder', emoji: '🎙', label: 'Voice Recorder', locked: false },
    { id: 'maps', emoji: '🗺', label: 'Maps', locked: false },
    { id: 'notes', emoji: '📝', label: 'Notes', locked: true },
    { id: 'gallery', emoji: '🖼', label: 'Gallery', locked: true },
    { id: 'chat', emoji: '💬', label: 'Chat', locked: true },
    { id: 'files', emoji: '📁', label: 'Files', locked: true }
  ];

  return (
    <div className="home-screen">
      <div className="home-wallpaper"></div>
      <div className="home-content">
        <div className="app-grid">
          {apps.map(app => (
            <div
              key={app.id}
              className={`app-icon ${app.locked ? 'locked' : ''}`}
              onClick={() => onOpenApp(app.id)}
            >
              <div className="app-emoji">{app.emoji}</div>
              <div className="app-label">{app.label}</div>
            </div>
          ))}
        </div>
      </div>

      {showSolveButton && (
        <button className="solve-button visible" onClick={onShowSolution}>
          🔍
        </button>
      )}

      {/* Hidden reset button for demo (can be toggled with key combination) */}
      <button
        onClick={onResetGame}
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          padding: '8px 12px',
          fontSize: '12px',
          background: rgba(255, 255, 255, 0.1),
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#fff',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 40
        }}
      >
        Reset Game
      </button>
    </div>
  );
}
