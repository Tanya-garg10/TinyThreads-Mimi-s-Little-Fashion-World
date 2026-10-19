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

### ✅ B. Tier 2 Features (100% Complete & Tested)
6. **Mimi's Lullaby Music Box**: Synthesized with the Web Audio API without external audio files. Plays an original, gentle lullaby sequence with a visible winding key, play/pause controls, and volume mute. Never autoplays.
7. **Interactive Storybook ("Mimi and the Little Cloud")**: A 4-page illustrated picture book featuring Mimi and a shivering little cloud. Includes next/prev controls, page indicator dots, touch support, and keyboard arrow key navigation.

### ✅ C. Tier 3 Features (100% Complete & Tested)
8. **Mimi Remembers You**: Uses `localStorage` to detect returning visitors and greets them with a warm welcome banner ("You’re back, little dreamer! Mimi saved a little magic for you ♡ (Visit #X)") with dismiss functionality.
9. **Talk to Mimi (Character Chat Widget)**: Interactive rule-based companion in the bottom corner with predefined answers, question chips, and keyword matching. Fully transparent and delightful without pretending to be a paid AI API.
10. **Performance & Code Quality**: Zero broken links, modular TypeScript components, pure CSS/SVG vector art, and 0 lint/compile errors.

### ✅ D. Five Official Side Quests (All 5 Implemented: +13 Bonus Points)
11. **Guestbook (+2)**: "Leave Mimi a Little Note" wall where visitors can submit their name, message, and choice of sticker (🐰, 🎀, ☁️, ⭐, 🧵). Persists in `localStorage` and includes an entry removal button for the user's note.
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

---

## 🚀 Running the App Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server (Port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Check TypeScript types
npm run lint
```
