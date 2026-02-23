import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../../data/content';
import PasswordLock from '../common/PasswordLock';

export default function GalleryApp({ onBack, isLocked, onUnlock, attemptLimiter, appId }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (isLocked) {
    return (
      <div className="app-screen">
        <div className="app-header">
          <button className="app-back-btn" onClick={onBack}>←</button>
          <span className="app-header-title">Gallery</span>
          <div style={{ width: '32px' }}></div>
        </div>
        <PasswordLock
          appId={appId}
          appName="Gallery"
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
        <span className="app-header-title">Gallery</span>
        <div style={{ width: '32px' }}></div>
      </div>
      <div className="app-content">
        <div className="gallery-grid">
          {GALLERY_IMAGES.map(img => (
            <div
              key={img.id}
              className="gallery-item"
              onClick={() => setSelectedImage(img)}
            >
              <div className="gallery-label">{img.filename}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="gallery-modal visible" onClick={() => setSelectedImage(null)}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-modal-title">{selectedImage.filename}</div>
            <div className="gallery-modal-image">{selectedImage.emoji}</div>
            <div className="gallery-modal-description">{selectedImage.description}</div>
            <button
              className="gallery-modal-closeBtn"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
