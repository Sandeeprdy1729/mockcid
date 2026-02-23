import React from 'react';
import VoiceRecorder from './VoiceRecorder';
import MapsApp from './MapsApp';
import NotesApp from './NotesApp';
import GalleryApp from './GalleryApp';
import ChatApp from './ChatApp';
import FilesApp from './FilesApp';

export default function AppsContainer({
  appName,
  onBack,
  lockedApps,
  onAppUnlock,
  attemptLimiter,
  onRecordingExpand
}) {
  const appConfig = {
    voiceRecorder: VoiceRecorder,
    maps: MapsApp,
    notes: NotesApp,
    gallery: GalleryApp,
    chat: ChatApp,
    files: FilesApp
  };

  const AppComponent = appConfig[appName];

  if (!AppComponent) {
    return <div>App not found</div>;
  }

  return (
    <AppComponent
      onBack={onBack}
      isLocked={lockedApps[appName]}
      onUnlock={() => onAppUnlock(appName)}
      attemptLimiter={attemptLimiter}
      appId={appName}
      onRecordingExpand={onRecordingExpand}
    />
  );
}
