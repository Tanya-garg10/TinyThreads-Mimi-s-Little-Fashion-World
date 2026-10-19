# 🐰 TinyThreads — Mimi's Little Fashion World

> *"Little outfits. Big little adventures."*

A whimsical, character-driven baby fashion boutique and interactive atelier where Mimi the bunny designs dreamy outfits for little adventurers.

---

## 🏆 Project Architecture & Feature Status Report

### ✅ A. All Tier 1 Requirements (100% Complete & Tested)
1. **Cursor-Reactive Mimi**: Mimi's eyes track the mouse pointer smoothly on desktop with subtle head tilt (`-3.5°` to `+3.5°`). On touch devices, tapping Mimi triggers an adorable wink and floating heart blush. Respects `prefers-reduced-motion`.
2. **Scroll-Driven Story**: Visual scenes that progress smoothly across chapters with dedicated vignettes, background changes, and handwritten callouts.
3. **Day/Night Mood Toggle**: Complete theme switch between sunny cream daylight (`#FFF8F1`) and dreamy starry bedtime night (`#1B1222`, `#281B34`). Preference is persisted in `localStorage`.
4. **Responsive Design**: Tested and optimized for 360px, 390px, 768px, 1024px, and 1440px viewports without clipped cards, broken layouts, or horizontal scrolling.
5. **Hidden Easter Egg**: Discover Mimi’s golden needle in the hero or the hidden star on the navbar logo to open **Mimi's Secret Sewing Box** with celebratory confetti and a 15% discount code (`TINYMAGIC15`). Keyboard and mobile accessible.

### ✅ B. Tier 2 Features (80% Complete & Tested)
6. **Mimi's Lullaby Music Box**: Synthesized with the Web Audio API without external audio files. Plays an original, gentle lullaby sequence with a visible winding key, play/pause controls, and volume mute. Never autoplays.
7. **Interactive Storybook ("Mimi and the Little Cloud")**: A 4-page illustrated picture book featuring Mimi and a shivering little cloud. Includes next/prev controls, page indicator dots, touch support, and keyboard arrow key navigation.
8. **Flashlight/Nightlight Cursor**: In night mode, a radial gradient follows the cursor, illuminating the dark dream layers like a flashlight. Disabled on touch devices.
9. **Dream Delivery Map Animation**: SVG path motion synced with scroll showing Mimi delivering dreams across the night sky from her atelier to baby's nursery.
10. ~~**Catch the Dreams Mini-Game**~~: Removed by user request

### ✅ C. Tier 3 Features (100% Complete)
8. **Mimi Remembers You**: Uses `localStorage` to detect returning visitors and greets them with a warm welcome banner ("You’re back, little dreamer! Mimi saved a little magic for you ♡ (Visit #X)") with dismiss functionality.
9. **Talk to Mimi (Character Chat Widget)**: Interactive rule-based companion in the bottom corner with predefined answers, question chips, and keyword matching. Chat messages are persisted via Firebase Firestore for multi-device sync. Fully transparent and delightful without pretending to be a paid AI API.
10. **Performance & Code Quality**: Zero broken links, modular TypeScript components, pure CSS/SVG vector art, and 0 lint/compile errors.
11. **Live Dream Guestbook**: "Leave Mimi a Little Note" wall where visitors can submit their name, message, and choice of sticker (🐰, 🎀, ☁️, ⭐, 🧵). Persists in `localStorage` and includes an entry removal button for the user's note.
12. **3D WebGL / Three.js Model**: Interactive 3D Mimi character with Three.js - toggle between 2D illustration and 3D model in Meet Mimi section. Features mouse tracking, floating animation, and sparkle particles.
13. **High Lighthouse Scores (90+)**: Performance optimizations including code splitting, lazy loading for heavy components, terser minification, preconnect hints for external resources, and modern browser targeting.

### ✅ D. Four Official Side Quests (All 4 Implemented: +11 Bonus Points)
12. **Sparkle Cursor Trail (+2)**: Subtle desktop sparkle trail on pointer movement, disabled on touch, respecting reduced-motion preferences.
13. **Visitor Hit Counter (+1)**: Retro odometer counter showing dreamers visited with clearly labeled browser-local count distinction.
14. **Click Sounds + Mute (+3)**: Synthesized gentle UI click sounds using the Web Audio API with a persistent mute switch. Starts muted by default.
15. **Responsive Chaos Mode (+5)**: Opt-in "Tiny Chaos Mode ⚡" featuring early-web animated stickers ("BEST OF WEB 2002", "100% PINCH-FREE SEAMS", "Under Construction 🚧"), rainbow animated thread border, and instant one-click toggle off.

### ✅ E. Multi-Page Architecture & Authentication
- **Multi-Page & Landing Page Modes**:
  - `home`: All-in-one unified Landing Page with smooth anchor links.
  - `collections`: Dedicated Collections Page.
  - `tailor`: Dedicated Tiny Tailor Studio Page.
  - `storybook`: Dedicated Story & Interactive Storybook Page.
  - `atelier`: Dedicated Atelier & Crafting Process Page.
  - `guestbook`: Dedicated Guestbook Page.
  - `login`: Dedicated Login / Passport Page.
- **Authentication**:
  - **1-Click Instant Demo Accounts**: Aria & Baby Oliver (Caregiver), Little Explorer Leo (Dreamer), and Pip the Squirrel (Junior Tailor).
  - **Google / Firebase Sign-In**: Connected via `AuthContext` with graceful profile synchronization.
  - **Member Passport**: Displays user role, active status, saved outfits count, and sign out controls.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4 with custom pastel theme variables
- **Sound**: Native Web Audio API (zero external mp3 assets)
- **Icons**: Lucide React
- **Confetti**: Canvas Confetti
- **State & Storage**: React Context + LocalStorage persistence
- **Backend**: Firebase (Authentication, Firestore for chat persistence)

---

## 🚀 Running the App Locally

```bash
# 1. Install dependencies (Bun is recommended for faster installs)
bun install
# or npm install

# 2. Run development server (Port 3000)
bun run dev
# or npm run dev

# 3. Build for production
bun run build
# or npm run build

# 4. Check TypeScript types
bun run lint
# or npm run lint
```

---

## 🌟 Key Features

### Interactive Character
- **Mimi the Bunny**: A cursor-reactive character that follows your mouse with smooth eye tracking
- **Touch Interactions**: Tap Mimi on mobile for a wink and heart animation
- **Character Chat**: Talk to Mimi through an interactive widget with fun responses (persisted via Firebase)

### Immersive Experience
- **Day/Night Theme**: Toggle between sunny cream and dreamy starry night modes
- **Music Box**: Synthesized lullaby player with Web Audio API (no external files)
- **Storybook**: Interactive 4-page picture book "Mimi and the Little Cloud" with page flip animation
- **Sparkle Cursor**: Delightful sparkle trail on desktop (respects motion preferences)
- **Flashlight Cursor**: Night mode flashlight effect illuminating dark layers
- **Dream Delivery Map**: SVG path animation synced with scroll

### E-Commerce Features
- **Collections**: Browse curated fashion collections for little ones
- **Outfit Builder**: Mix and match pieces to create custom outfits
- **Shopping Bag**: Add items to your cart with a smooth drawer interface
- **Quick View**: Fast product previews with detailed information

### Community & Fun
- **Guestbook**: Leave a note for Mimi with cute stickers
- **Easter Egg**: Find the hidden golden needle for a surprise discount
- **Chaos Mode**: A fun retro "early web" animated mode
- **Visitor Counter**: Track how many dreamers have visited

### Authentication
- **Demo Accounts**: Quick access with pre-configured demo accounts
- **Google Sign-In**: Firebase authentication integration
- **Member Passport**: View your profile and saved outfits

---

## 📱 Responsive Design

Optimized for all screen sizes:
- 📱 Mobile: 360px, 390px
- 📱 Tablet: 768px
- 💻 Desktop: 1024px, 1440px

---

## 🎨 Customization

### Environment Variables
Create a `.env` file based on `.env.example`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note**: Firebase is required for:
- User authentication (Google Sign-In, demo accounts)
- Chat message persistence (sync across devices)
- If Firebase is not configured, the app will use localStorage as a fallback

---

## 📦 Project Structure

```
tinythreads/
├── src/
│   ├── components/
│   │   ├── atelier/          # Atelier & crafting section
│   │   ├── audio/            # Music box player
│   │   ├── auth/             # Login/Authentication
│   │   ├── cart/             # Shopping bag drawer
│   │   ├── chaos/            # Chaos mode overlay
│   │   ├── character/        # Mimi illustrations
│   │   ├── chat/             # Talk to Mimi widget
│   │   ├── collections/      # Product collections
│   │   ├── common/           # Shared components (Navbar, Footer, FlashlightCursor, etc.)
│   │   ├── easter-egg/       # Secret sewing box
│   │   ├── guestbook/        # Visitor notes
│   │   ├── hero/             # Hero section
│   │   ├── mimi/             # Meet Mimi section
│   │   ├── newsletter/       # Newsletter signup
│   │   ├── outfit-builder/   # Custom outfit creator
│   │   ├── story/            # Story journey (includes Dream Delivery Map)
│   │   ├── storybook/        # Interactive storybook
│   │   └── testimonials/     # Customer reviews
│   ├── context/              # React contexts (Auth, etc.)
│   ├── data/                 # Static data (fashion items)
│   ├── services/             # Firebase (auth, chat) & API services
│   ├── utils/                # Audio manager & utilities
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
└── tailwind.config.js        # Tailwind CSS config
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Deploy dist/ folder to Netlify
```

### GitHub Pages
```bash
# Build
npm run build

# Deploy using gh-pages
npm install -D gh-pages
npx gh-pages -d dist
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Port 3000 already in use
**Solution**: Change the port in `package.json` or run `bun run dev --port=3001`

**Issue**: Firebase authentication not working
**Solution**: Ensure your `.env` file has valid Firebase credentials

**Issue**: Tailwind classes not applying
**Solution**: Run `bun install` to ensure all dependencies are installed

**Issue**: Chat messages not syncing across devices
**Solution**: Ensure Firebase is properly configured with Firestore enabled. If not configured, the app will use localStorage fallback.

---

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the maintainers.

---

Made with ♡ by Mimi and the TinyThreads team
