import React, { useState } from 'react';
import { VOICE_RECORDINGS } from '../../data/content';

export default function VoiceRecorder({ onBack, onRecordingExpand }) {
  const [expanded, setExpanded] = useState(new Set());

  const toggleRecording = (id) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
    onRecordingExpand(id);
  };

  return (
    <div className="app-screen">
      <div className="app-header">
        <button className="app-back-btn" onClick={onBack}>←</button>
        <span className="app-header-title">Voice Recorder</span>
        <div style={{ width: '32px' }}></div>
      </div>
      <div className="app-content">
        {VOICE_RECORDINGS.map(rec => (
          <div
            key={rec.id}
            className={`recording-item ${expanded.has(rec.id) ? 'recording-expanded' : ''}`}
            onClick={() => toggleRecording(rec.id)}
          >
            <div className="recording-header">
              <div className="recording-title">🔊 {rec.title}</div>
              <div className="recording-duration">{rec.duration}</div>
            </div>
            <div className="recording-waveform">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="waveform-bar"></div>
              ))}
            </div>
            <div className="recording-transcript">{rec.transcript}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
