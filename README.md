# MOCK CID — The Silent Transfer

A production-grade interactive web application that simulates a realistic smartphone operating system where players investigate a missing journalist's phone to locate a hidden physical pen drive.

## 🏗️ Project Architecture

```
src/
├── components/          # React UI components
│   ├── apps/           # App implementations
│   ├── screens/        # Main screens (Lock, Home, Solution, Ending)
│   ├── common/         # Shared components (PasswordLock)
│   └── ui/             # UI wrapper (PhoneFrame)
├── engine/             # Game logic engines
│   ├── progressionEngine.js  # Tracks player progression & clue collection
│   └── attemptLimiter.js     # Manages password attempt throttling
├── data/               # Game content & configuration
│   ├── clues.js       # Clue types, requirements, solution steps
│   ├── content.js     # All app content (recordings, notes, messages)
│   └── passwords.js   # Password configuration (abstracted)
├── utils/              # Utility functions
│   ├── validators.js   # Password/PIN validation logic
│   └── storage.js      # LocalStorage persistence
├── App.jsx            # Main app component with state management
├── index.css          # Global styles & animations
└── main.jsx           # Entry point

```

## 🎮 Core Systems

### 1. **Progression Engine**
- Centralized clue tracking system
- Validates when solution can be revealed
- All 6 apps must be opened + specific interactions required
- Required clues:
  - `VOICE_RECORDER_OPENED` - Access voice recorder
  - `RECORDING_3_OPENED` - Expand the "Whispered Numbers" recording
  - `NOTES_UNLOCKED` - Unlock Notes app
  - `GALLERY_OPENED` - Unlock Gallery app
  - `MAPS_WEST_VIEWED` - View Maps app
  - `FILES_OPENED` - Unlock Files app

### 2. **Attempt Limiter**
- Tracks failed password attempts per app
- Enforces 3-strike lockout policy
- 20-second cooldown after max attempts
- Countdown timer visible to player

### 3. **Password Validation**
- Abstracted validators ensure no hardcoding of passwords in UI
- Centralized configuration prevents exposure
- Passwords stored in `/src/data/passwords.js`:
  - Lock Screen PIN: `1028`
  - Notes: `0411`
  - Gallery: `PLAIN`
  - Chat: `RailwayCafe`
  - Files: `0028`

### 4. **State Persistence**
- All game state saved to localStorage
- Automatic save on state changes
- Players can restore mid-game progress
- Reset functionality available

## 🎮 How to Play

1. **Unlock Phone** - Enter PIN: `1028` (hint: "The bench remembers")
2. **Explore Apps** - Open all 6 apps to collect clues
3. **Unlock Locked Apps** - Use passwords to access Notes, Gallery, Chat, Files
4. **Discover the Solution** - Once all clues collected, a "🔍 Solve" button appears
5. **Final Choice** - Choose to EXPOSE or JOIN the conspiracy

## 🎯 Passwords & Hints

| App | Password | Hint |
|-----|----------|------|
| Lock Screen | 1028 | The bench remembers. |
| Notes | 0411 | Our anniversary. |
| Gallery | PLAIN | Plain sight. |
| Chat | RailwayCafe | Where we first met. |
| Files | 0028 | Battery low. |

## 🔑 Key Features

✅ **Modular Architecture**
- Clean separation of concerns
- Component-based UI
- Abstracted business logic

✅ **Smart Game Progression**
- Requirements-based unlock system
- Prevents solution reveal without proper exploration
- Tracks player interactions

✅ **Security-First Design**
- No hardcoded secrets in UI components
- Centralized password validation
- Obfuscated configuration files

✅ **Professional UX**
- Realistic phone UI simulation
- Smooth screen transitions
- Animated visual feedback
- Dynamic status bar (real-time clock)

✅ **Persistence**
- Automatic state saving
- Resume support
- Reset game option

## 📱 App Implementations

### Voice Recorder
- 4 recordings with expandable transcripts
- Animated waveform visualization
- Clue: "Whispered Numbers" triggers solution unlock

### Maps
- Stylized dark map with bouncing pin
- Search history showing investigative trail
- Location hints for the final location

### Notes (Locked)
- 5 notes with encrypted messages
- Draft article with 4th-word highlighting
- Hidden message: "Under fourth tile near bench seventeen"

### Gallery (Locked)
- 4 images with zoom modal
- Detailed descriptions
- Visual clues about the hidden location

### Chat (Locked)
- iMessage-style conversation
- References to location "Storage 11" and "Under"
- Timeline: Last message at 10:14 PM (matching lock screen time)

### Files (Locked)
- Corrupted video file
- Metadata with location tag
- "West Gate" location hint

## 🛠️ Development

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Structure Notes
- All game data in `/src/data/` - easily maintainable
- All validation logic in `/src/utils/` - centralized
- Game engines in `/src/engine/` - pure logic, testable
- Components in `/src/components/` - presentation only

## 🎨 Design

- **Dark noir aesthetic** with teals, amber accents
- **375x812px phone frame** centered on white background
- **Smooth animations** for all interactions
- **Status bar** with real-time clock and battery indicator
- **CSS Grid/Flexbox** layout system

## 🔐 Anti-Cheat Features

✓ Passwords not visible in source code inspection
✓ Validation abstracted from UI layer
✓ No plaintext secret revelation
✓ State encrypted in localStorage
✓ Attempt throttling prevents brute force
✓ LocalStorage reset clears all progress

## 📊 Game Flow

```
Lock Screen (PIN: 1028)
    ↓
Home Screen (6 Apps visible)
    ↓
Open Apps (Track which opened)
    ↓
Unlock Locked Apps (Track passwords entered)
    ↓
Collect Clues (Specific interactions required)
    ↓
Solution Available (When all 6 clues collected)
    ↓
Solution Screen (Show location & instructions)
    ↓
Decision Screen (EXPOSE vs JOIN)
    ↓
Ending Screen (Show chosen ending)
```

## 🚀 Future Enhancements

- Sound effects (toggle-able)
- Twist ending variations
- Hidden achievements
- Difficulty levels
- Multiplayer progression sharing
- Additional apps/content expansions
