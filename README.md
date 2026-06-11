# Bhumika N - Professional E-Portfolio Website

A premium, highly-interactive, responsive single-page portfolio website designed for Bhumika N, Computer Science & AIML student at REVA University (class of 2025).

## 🚀 Live Demo & Visual Elements
This website is built using modern front-end web design principles (glassmorphism, CSS grid/flex layouts, custom transitions) and features:
- **Interactive Neural Network Background**: A custom HTML5 Canvas animation mapping interactive nodes that link and follow mouse interactions, reflecting the student's AIML focus.
- **Dynamic Typing Subtitle**: An animated terminal-like typing effect highlighting core competencies.
- **Scroll Reveal System**: Smooth fade-in and slide-up animations as sections enter the screen viewport.
- **Project Filtration System**: Interactive buttons permitting visitors to filter projects dynamically between "All", "AI/ML", and "Software & Web".
- **Glassmorphic Contact Form**: A styled form with real-time status feedback.

---

## 📁 File Structure
- [index.html](file:///c:/Users/bhumii/AIFI/AIFI/index.html) - Structural semantic markup, font inclusions, metadata for search engine optimization, and icons.
- [styles.css](file:///c:/Users/bhumii/AIFI/AIFI/styles.css) - Core design system, customized scrollbars, typography variables, cards, responsive queries, and keyframe animations.
- [app.js](file:///c:/Users/bhumii/AIFI/AIFI/app.js) - JavaScript engine driving canvas node math, typing loop, navigation updates, filter toggles, and form action overrides.
- [Profile.pdf](file:///c:/Users/bhumii/AIFI/AIFI/Profile.pdf) - Original student profile source.

---

## 💻 Running Locally

To run this website locally on your system, you can use any local static web server.

### Option A: Using Visual Studio Code Live Server
1. Open this workspace in **VS Code**.
2. If you have the **Live Server** extension installed, click **"Go Live"** in the bottom-right status bar.
3. Your browser will automatically open the website at `http://127.5.0.1:5500/index.html`.

### Option B: Using Node.js (npx)
If you have Node.js installed, execute the following command in the workspace directory:
```bash
npx http-server .
```
Open `http://localhost:8080` in your web browser.

### Option C: Direct File Opening
Double-click [index.html](file:///c:/Users/bhumii/AIFI/AIFI/index.html) to run it locally in your default web browser (Note: Canvas animations function, but some browser security policies might restrict module loads if added in future expansions; a local server is recommended).
