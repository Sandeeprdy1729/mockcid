import React, { useState, useEffect } from 'react';
import { ENDINGS } from '../../data/clues';

export default function EndingScreen({ onRestart }) {
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    // Get choice from sessionStorage (set by parent component showing solution)
    const savedChoice = sessionStorage.getItem('endingChoice');
    setChoice(savedChoice || 'EXPOSED');
  }, []);

  if (!choice) {
    return <div>Loading...</div>;
  }

  const ending = ENDINGS[choice];

  return (
    <div className="ending-screen">
      <div className="ending-large-text">{ending.title}</div>
      <div className="ending-text">{ending.text}</div>
      <button
        onClick={onRestart}
        style={{
          padding: '12px 28px',
          background: '#4a9eff',
          border: 'none',
          color: '#fff',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 600,
          marginTop: '20px'
        }}
      >
        Play Again
      </button>
    </div>
  );
}
