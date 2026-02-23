// ARCHITECTURE OVERVIEW

/*
  MOCK CID — The Silent Transfer
  Production-Grade Interactive Mystery Game
  
  Built with: React 18 + Vite
  State: Centralized in App.jsx + Engines
  Persistence: localStorage + sessionStorage
  Architecture: Component-Based + Modular
*/

// ============================================
// COMPONENT HIERARCHY
// ============================================

PhoneFrame
  └─ StatusBar (Real-time clock, battery)
  └─ Screen
      ├─ LockScreen
      │   └─ PinPad (9 buttons + 0 + delete)
      │
      ├─ HomeScreen
      │   ├─ WallpaperImage
      │   ├─ AppGrid (6 icons)
      │   ├─ SolveButton (conditional)
      │   └─ ResetButton
      │
      ├─ AppsContainer
      │   ├─ VoiceRecorder (App)
      │   │   ├─ AppHeader
      │   │   └─ RecordingsList
      │   │       └─ RecordingItem (expandable)
      │   │
      │   ├─ MapsApp
      │   │   ├─ MapContainer
      │   │   └─ SearchHistory
      │   │
      │   ├─ NotesApp
      │   │   ├─ PasswordLock (if locked)
      │   │   └─ NotesList
      │   │       └─ NoteItem (expandable)
      │   │
      │   ├─ GalleryApp
      │   │   ├─ PasswordLock (if locked)
      │   │   ├─ GalleryGrid
      │   │   │   └─ GalleryItem
      │   │   └─ GalleryModal (zoom view)
      │   │
      │   ├─ ChatApp
      │   │   ├─ PasswordLock (if locked)
      │   │   ├─ ChatMessages
      │   │   │   └─ Message (sent/received)
      │   │   └─ ChatStatus
      │   │
      │   └─ FilesApp
      │       ├─ PasswordLock (if locked)
      │       ├─ FileItem
      │       └─ FileExpanded (details)
      │
      ├─ SolutionScreen
      │   ├─ SolutionTitle
      │   ├─ SolutionSteps (animated)
      │   ├─ TwistMessage
      │   └─ EndingButtons (EXPOSE/JOIN)
      │
      └─ EndingScreen
          ├─ EndingTitle
          ├─ EndingNarrative
          └─ PlayAgainButton


// ============================================
// STATE MANAGEMENT ARCHITECTURE
// ============================================

App.jsx (Root State)
├─ currentScreen: 'lock' | 'home' | 'app' | 'solution' | 'ending'
├─ activeApp: 'voiceRecorder' | 'maps' | 'notes' | 'gallery' | 'chat' | 'files'
├─ progression: ProgressionEngine
│   ├── collectedClues: Set<CLUE_TYPE>
│   └── canShowSolution(): boolean
├─ attemptLimiter: AttemptLimiter
│   ├── attempts: { appId: { count, lockedUntil } }
│   └── isLocked(appId): boolean
└─ lockedApps: { notes, gallery, chat, files }


// ============================================
// DATA FLOW DIAGRAM
// ============================================

User Interaction
     ↓
Component Event Handler
     ↓
Validation/Engine Check
     ↓
State Update
     ↓
useEffect Auto-Save
     ↓
localStorage Write
     ↓
Component Re-render
     ↓
UI Update

Example: Wrong Password Entry
─────────────────────────────

Wrong Password Input
     ↓
PasswordLock.handleSubmit()
     ↓
validatePassword(appId, password)
Returns: { isValid: false, error: 'Incorrect password' }
     ↓
attemptLimiter.recordAttempt(appId)
Returns: { count, isLocked, lockedUntil }
     ↓
Set Error State
     ↓
Add Shake Animation
     ↓
Clear Input
     ↓
If count >= maxAttempts: Set Locked = true
     ↓
Re-render with Error Message
     ↓
Auto-save to localStorage


// ============================================
// GAME PROGRESSION ENGINE
// ============================================

ProgressionEngine {
  
  collectClue(clueType) {
    // Add clue to collected set
  }
  
  canShowSolution() {
    // Check: All 6 required clues collected?
    // VOICE_RECORDER_OPENED ✓
    // NOTES_UNLOCKED ✓
    // GALLERY_OPENED ✓
    // MAPS_WEST_VIEWED ✓
    // FILES_OPENED ✓
    // RECORDING_3_OPENED ✓
    return CLUE_REQUIREMENTS.every(req => 
      collectedClues.has(req)
    )
  }
  
  getProgress() // 0-100
  getMissingClues() // Array
  reset() // Clear all clues
  getState() / restoreState() // Persistence
}


// ============================================
// ATTEMPT LIMITER ENGINE
// ============================================

AttemptLimiter {
  
  recordAttempt(appId, maxAttempts, lockoutDuration) {
    // Increment attempt count
    // If count >= maxAttempts: Lock until (now + lockoutDuration)
    return { count, isLocked, lockedUntil }
  }
  
  isLocked(appId) {
    // Check if pastyblock time expired
    // If expired and locked: auto-unlock, reset count
    return lockedUntil && Date.now() < lockedUntil
  }
  
  getTimeRemaining(appId) // milliseconds
  getAttemptCount(appId) // number
  reset(appId) / resetAll() // Clear attempts
}


// ============================================
// AUTHENTICATION FLOW
// ============================================

LOCK SCREEN
───────────
Input PIN (1028)
     ↓
validatePin(pin)
     ↓
Pin Correct?
├─ YES: Transition to Home
└─ NO: Shake animation, clear input

LOCKED APP UNLOCK
─────────────────
Input Password
     ↓
validatePassword(appId, password)
     ↓
Stored Password === Input?
├─ YES: 
│    ├─ Set lockedApps[appId] = false
│    ├─ Collect appropriate clue
│    ├─ Re-render app content
│    └─ Check if solution ready
│
└─ NO:
     ├─ attemptLimiter.recordAttempt()
     ├─ Show error message
     ├─ Animate shake
     ├─ Clear input
     ├─ If locked: Show countdown
     └─ Auto-save state


// ============================================
// CLUE COLLECTION SEQUENCE
// ============================================

Opening Apps Collects Clues:
───────────────────────────

1. Open Voice Recorder
   → progression.collectClue(VOICE_RECORDER_OPENED)

2. Open Maps
   → progression.collectClue(MAPS_WEST_VIEWED)

3. Unlock Notes (pwd: 0411)
   → progression.collectClue(NOTES_UNLOCKED)

4. Unlock Gallery (pwd: PLAIN)
   → progression.collectClue(GALLERY_OPENED)

5. Unlock Chat (pwd: RailwayCafe)
   → progression.collectClue(CHAT_UNLOCKED)
   Actually: Listed as Gallery already

6. Unlock Files (pwd: 0028)
   → progression.collectClue(FILES_OPENED)

7. Expand Recording 3 ("Whispered Numbers")
   → progression.collectClue(RECORDING_3_OPENED)

Once ALL 6 clues collected:
→ progression.canShowSolution() returns true
→ Solve button appears on home screen


// ============================================
// PERSISTENCE ARCHITECTURE
// ============================================

localStorage Keys:
──────────────────
"MOCK_CID_STATE" : {
  progression: ['rec1', 'notes', 'gallery', ...],
  attempts: {
    notes: { count: 2, lockedUntil: null },
    gallery: { count: 0, lockedUntil: null },
    ...
  },
  lockedApps: {
    notes: false,
    gallery: true,
    chat: false,
    files: true
  }
}

sessionStorage Keys:
────────────────────
"endingChoice" : "EXPOSED" | "JOINED"

Auto-Save Trigger:
──────────────
useEffect(() => {
  if (progression && attemptLimiter) {
    saveState({ progression, attempts, lockedApps })
  }
}, [progression, attemptLimiter, lockedApps])

Load on Init:
──────────
useEffect(() => {
  const saved = loadState()
  if (saved) {
    progression.restoreState(saved.progression)
    attemptLimiter.restoreState(saved.attempts)
    setLockedApps(saved.lockedApps)
  }
}, [])


// ============================================
// PASSWORD CONFIGURATION (ABSTRACTED)
// ============================================

src/data/passwords.js
─────────────────────

PASSWORDS = {
  LOCK_SCREEN: '1028',
  NOTES_APP: '0411',
  GALLERY_APP: 'PLAIN',
  CHAT_APP: 'RailwayCafe',
  FILES_APP: '0028'
}

PASSWORD_HINTS = {
  LOCK_SCREEN: 'The bench remembers.',
  NOTES_APP: 'Our anniversary.',
  GALLERY_APP: 'Plain sight.',
  CHAT_APP: 'Where we first met.',
  FILES_APP: 'Battery low.'
}

PASSWORD_CONFIG = {
  notes: {
    password: '0411',
    hint: 'Our anniversary.',
    maxAttempts: 3,
    lockoutDuration: 20000
  },
  ...
}

Usage (from PasswordLock component):
────────────────────────────────────
import { PASSWORD_CONFIG } from '../../data/passwords'

const config = PASSWORD_CONFIG[appId]
// Passwords never exposed in component code


// ============================================
// SOLUTION REVEAL CONDITIONS
// ============================================

Show Solve Button When:
───────────────────────
✓ progression.canShowSolution() === true
  = All 6 clues collected

Click Solve Button:
──────────────────
→ Transition to Solution Screen
→ Display 6 solution steps (animated)
→ Show dramatic twist message
→ Display EXPOSE / JOIN buttons

Choose EXPOSE:
──────────────
→ sessionStorage.setItem('endingChoice', 'EXPOSED')
→ Transition to Ending Screen
→ Display: "THE TRUTH EMERGED"
→ Show ending narrative
→ Show "Play Again" button

Choose JOIN:
────────────
→ sessionStorage.setItem('endingChoice', 'JOINED')
→ Transition to Ending Screen
→ Display: "POWER CORRUPTS"
→ Show ending narrative
→ Show "Play Again" button


// ============================================
// FILE SIZE ESTIMATES
// ============================================

Breakdown:
──────────
src/components/    ≈ 1200 lines (JSX)
src/engine/        ≈  340 lines (Logic)
src/data/          ≈  200 lines (Content)
src/utils/         ≈  150 lines (Helpers)
src/index.css      ≈  800 lines (Styles)
src/App.jsx        ≈  180 lines (Main)

Total:             ≈ 2870 lines


// ============================================
// SCALABILITY & EXTENSIBILITY
// ============================================

Add New App:
────────────
1. Create src/components/apps/NewApp.jsx
2. Add to AppsContainer.jsx appConfig
3. Add content to src/data/content.js
4. Add password (if locked) to passwords.js
5. Add clue type to CLUE_TYPES in clues.js
6. Done!

Change Password:
────────────────
→ Edit src/data/passwords.js
→ No UI changes needed.

Add New Game Mechanic:
──────────────────────
1. Extend ProgressionEngine or AttemptLimiter
2. Expose method to App.jsx
3. Call from component logic
4. Auto-saves via existing storage system

Multiple Story Branches:
────────────────────────
→ Extend solution paths logic
→ Add more endings to ENDINGS object
→ Create branching progression rules
→ Maintain central state management


// ============================================
// DEPLOYMENT PATHS
// ============================================

Development:
────────────
npm run dev
→ http://localhost:3000
→ Hot reload enabled
→ Full debugging

Production Build:
─────────────────
npm run build
→ dist/ folder created
→ Optimized bundles
→ Ready to deploy

Deployment Targets:
───────────────────
✓ Vercel (best for React)
✓ Netlify (drag-drop or Git)
✓ GitHub Pages
✓ Any static host
✓ Docker container


END OF ARCHITECTURE DOCUMENT
*/
