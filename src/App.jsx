import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createProgressionEngine } from './engine/progressionEngine';
import { createAttemptLimiter } from './engine/attemptLimiter';
import { saveState, loadState, clearState } from './utils/storage';
import { CLUE_TYPES } from './data/clues';

import LockScreen from './components/screens/LockScreen';
import HomeScreen from './components/screens/HomeScreen';
import AppsContainer from './components/apps/AppsContainer';
import SolutionScreen from './components/screens/SolutionScreen';
import EndingScreen from './components/screens/EndingScreen';
import PhoneFrame from './components/ui/PhoneFrame';

const APP_SCREENS = {
  LOCK: 'lock',
  HOME: 'home',
  APP: 'app',
  SOLUTION: 'solution',
  ENDING: 'ending'
};

function App() {
  // Screen state
  const [currentScreen, setCurrentScreen] = useState(APP_SCREENS.LOCK);
  const [activeApp, setActiveApp] = useState(null);

  // Game state
  const [progression, setProgression] = useState(null);
  const [attemptLimiter, setAttemptLimiter] = useState(null);
  const [lockedApps, setLockedApps] = useState({
    notes: true,
    gallery: true,
    chat: true,
    files: true
  });

  // Force update counter
  const [, setUpdateCounter] = useState(0);

  const forceUpdate = useCallback(() => {
    setUpdateCounter(c => c + 1);
  }, []);

  // Initialization
  useEffect(() => {
    // Initialize engines
    const prog = createProgressionEngine();
    const limiter = createAttemptLimiter();

    // Try to load saved state
    const savedState = loadState();
    if (savedState) {
      prog.restoreState(savedState.progression);
      limiter.restoreState(savedState.attempts);
      setLockedApps(savedState.lockedApps);
    }

    setProgression(prog);
    setAttemptLimiter(limiter);
  }, []);

  // Auto-save state whenever it changes
  useEffect(() => {
    if (progression && attemptLimiter) {
      saveState({
        progression: progression.getState(),
        attempts: attemptLimiter.getState(),
        lockedApps
      });
    }
  }, [progression, attemptLimiter, lockedApps]);

  const handleUnlock = useCallback(() => {
    setCurrentScreen(APP_SCREENS.HOME);
  }, []);

  const handleOpenApp = useCallback((appName) => {
    // Collect clues for opening apps
    if (progression) {
      if (appName === 'voiceRecorder') {
        progression.collectClue(CLUE_TYPES.VOICE_RECORDER_OPENED);
      } else if (appName === 'maps') {
        progression.collectClue(CLUE_TYPES.MAPS_WEST_VIEWED);
      } else if (appName === 'gallery') {
        progression.collectClue(CLUE_TYPES.GALLERY_OPENED);
      } else if (appName === 'files') {
        progression.collectClue(CLUE_TYPES.FILES_OPENED);
      }
      forceUpdate();
    }

    setActiveApp(appName);
    setCurrentScreen(APP_SCREENS.APP);
  }, [progression, forceUpdate]);

  const handleBackToHome = useCallback(() => {
    setCurrentScreen(APP_SCREENS.HOME);
    setActiveApp(null);
  }, []);

  const handleAppUnlock = useCallback((appId) => {
    setLockedApps(prev => ({
      ...prev,
      [appId]: false
    }));

    // Register clues
    if (progression && appId === 'notes') {
      progression.collectClue(CLUE_TYPES.NOTES_UNLOCKED);
    } else if (progression && appId === 'gallery') {
      progression.collectClue(CLUE_TYPES.GALLERY_OPENED);
    }

    if (progression) {
      forceUpdate();
    }
  }, [progression, forceUpdate]);

  const handleRecordingExpand = useCallback((recordingId) => {
    if (progression && recordingId === 'rec3') {
      progression.collectClue(CLUE_TYPES.RECORDING_3_OPENED);
      forceUpdate();
    }
  }, [progression, forceUpdate]);

  const handleShowSolution = useCallback(() => {
    setCurrentScreen(APP_SCREENS.SOLUTION);
  }, []);

  const handleShowEnding = useCallback((choice) => {
    sessionStorage.setItem('endingChoice', choice);
    setCurrentScreen(APP_SCREENS.ENDING);
  }, []);

  const handleResetGame = useCallback(() => {
    if (progression) {
      progression.reset();
      forceUpdate();
    }
    if (attemptLimiter) {
      attemptLimiter.resetAll();
      forceUpdate();
    }
    setLockedApps({
      notes: true,
      gallery: true,
      chat: true,
      files: true
    });
    setCurrentScreen(APP_SCREENS.LOCK);
    setActiveApp(null);
    clearState();
  }, [progression, attemptLimiter, forceUpdate]);

  if (!progression || !attemptLimiter) {
    return <div style={{ color: '#fff', textAlign: 'center', paddingTop: '50px' }}>Loading...</div>;
  }

  return (
    <PhoneFrame>
      {currentScreen === APP_SCREENS.LOCK && (
        <LockScreen onUnlock={handleUnlock} />
      )}

      {currentScreen === APP_SCREENS.HOME && (
        <HomeScreen
          onOpenApp={handleOpenApp}
          showSolveButton={progression.canShowSolution()}
          onShowSolution={handleShowSolution}
          onResetGame={handleResetGame}
        />
      )}

      {currentScreen === APP_SCREENS.APP && (
        <AppsContainer
          appName={activeApp}
          onBack={handleBackToHome}
          lockedApps={lockedApps}
          onAppUnlock={handleAppUnlock}
          attemptLimiter={attemptLimiter}
          onRecordingExpand={handleRecordingExpand}
        />
      )}

      {currentScreen === APP_SCREENS.SOLUTION && (
        <SolutionScreen onChoice={handleShowEnding} />
      )}

      {currentScreen === APP_SCREENS.ENDING && (
        <EndingScreen onRestart={handleResetGame} />
      )}
    </PhoneFrame>
  );
}

export default App;
