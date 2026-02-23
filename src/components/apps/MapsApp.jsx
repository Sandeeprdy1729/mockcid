import React from 'react';
import { SEARCH_HISTORY } from '../../data/content';

export default function MapsApp({ onBack }) {
  return (
    <div className="app-screen">
      <div className="app-header">
        <button className="app-back-btn" onClick={onBack}>←</button>
        <span className="app-header-title">Maps</span>
        <div style={{ width: '32px' }}></div>
      </div>
      <div className="app-content">
        <div className="map-container">
          <div className="map-view">
            <div className="map-pin">📍</div>
          </div>
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
          Search History:
        </div>
        <div className="search-history">
          {SEARCH_HISTORY.map((item, idx) => (
            <div key={idx} className="search-item">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
