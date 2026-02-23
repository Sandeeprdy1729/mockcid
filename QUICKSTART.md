# MOCK CID — Installation & Running Guide

## 🎯 Quick Start

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

### Installation (2 minutes)

```bash
# Navigate to project directory
cd /Users/sandeepreddy/mockcid

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will open at **http://localhost:3000** automatically.

---

## 🎮 Game Navigation

### Lock Screen
- **PIN Code:** `1028`
- **Hint:** "The bench remembers."
- Use the on-screen keypad to enter PIN

### Home Screen
Apps arranged in 2x3 grid:
- ✅ 🎙 Voice Recorder (Unlocked)
- ✅ 🗺 Maps (Unlocked)
- 🔒 📝 Notes (Locked)
- 🔒 🖼 Gallery (Locked)
- 🔒 💬 Chat (Locked)
- 🔒 📁 Files (Locked)

### Passwords for Locked Apps

| App | Password | Hint |
|-----|----------|------|
| **Notes** | `0411` | "Our anniversary." |
| **Gallery** | `PLAIN` | "Plain sight." |
| **Chat** | `RailwayCafe` | "Where we first met." |
| **Files** | `0028` | "Battery low." |

### How to Unlock Each App
1. Tap the locked app icon
2. A password prompt appears
3. Enter the password (see table above)
4. Unlock triggers clue collection automatically

### Reaching the Solution
The 🔍 **Solve Button** appears after:
1. Opening all 6 apps
2. Unlocking at least 4 locked apps
3. Expanding specific recordings
4. Viewing Maps location

Tap the solve button to see the complete solution.

---

## 🏗️ Project Structure

```
/Users/sandeepreddy/mockcid/
├── src/
│   ├── components/          # React components (UI)
│   ├── engine/             # Game logic (Progression, Attempts)
│   ├── data/               # Game content & config
│   ├── utils/              # Validation & storage
│   ├── App.jsx             # Main app
│   ├── index.css           # Styles
│   └── main.jsx            # Entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
├── README.md              # Full documentation
└── setup.sh               # Setup script
```

---

## 📦 Available Scripts

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🔑 Understanding the Game

### The Mystery
A journalist's phone was found at Lakeview Public Garden. You must unlock the phone and discover where a hidden pen drive is hidden.

### The Clues Are Everywhere
- **Voice Recorder:** Contains cryptic audio recordings
- **Notes:** Encrypted notes with hidden messages
- **Gallery:** Photos with visual clues
- **Maps:** Search history and pinned locations
- **Chat:** Conversation revealing the location
- **Files:** Corrupted video with metadata

### The Solution
The solution reveals:
- **Location:** Lakeview Public Garden
- **Landmark:** Bench #17 on the west side
- **Instructions:** 
  - Take 4 steps left
  - Count 11 pavement tiles
  - Lift the 4th tile
  - Find the pen drive underneath

### The Twist
After solving, you make a choice:
- **EXPOSE** - Reveal the corruption
- **JOIN** - Become part of the network

Each choice leads to a different ending.

---

## 🎨 Features

### Technical Excellence
- ✓ React component  architecture
- ✓ Centralized state management
- ✓ Password validation abstraction
- ✓ localStorage persistence
- ✓ Attempt throttling (3 strikes, 20s lockout)
- ✓ Smooth animations & transitions

### Gameplay Features
- ✓ Realistic phone UI
- ✓ Dynamic clock in status bar
- ✓ Animated waveforms
- ✓ Modal galleries
- ✓ iMessage-style chat
- ✓ Auto-save progress

---

## ⚙️ Configuration

### Changing Passwords
Edit `/src/data/passwords.js`:
```javascript
export const PASSWORDS = {
  LOCK_SCREEN: '1028',
  NOTES_APP: '0411', // Change here
  GALLERY_APP: 'PLAIN',
  CHAT_APP: 'RailwayCafe',
  FILES_APP: '0028'
};
```

### Changing Clue Requirements
Edit `/src/data/clues.js` to modify which interactions unlock the solution.

### Changing Game Content
All content (recordings, notes, messages) is in `/src/data/content.js` - easily customizable.

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
npm run dev -- --port 3001
```

### Dependencies Won't Install
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles Not Loading
```bash
# Clear browser cache (Ctrl+Shift+Delete)
# Or use incognito/private mode
```

### LocalStorage Issues
```javascript
// In browser console to reset saved progress:
localStorage.removeItem('MOCK_CID_STATE');
sessionStorage.removeItem('endingChoice');
```

---

## 📱 Testing on Mobile

### Local Network Access
1. Get your machine's IP: `ipconfig getifaddr en0` (Mac)
2. Run dev server: `npm run dev`
3. On mobile, navigate to: `http://YOUR_IP:3000`
4. Phone UI scales perfectly for testing

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Deploy to Services
- **Vercel:** `npm i -g vercel && vercel deploy`
- **Netlify:** Connect GitHub repo
- **GitHub Pages:** Configure vite.config.js with `base`

---

## 🎓 Learning Resources

- React docs: https://react.dev
- Vite docs: https://vitejs.dev
- localStorage guide: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

---

## 📞 Support

For issues or questions:
1. Check the README.md for architecture details
2. Review error messages in browser console
3. Verify all dependencies installed correctly
4. Clear localStorage if state corrupted

---

**Enjoy the mystery! 🔍**
