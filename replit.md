# VulnShield Labs - Auto-Vulcan

## Project Overview
Auto-Vulcan is VulnShield Labs' flagship platform for automated vulnerability mining in Java applications. It uses SIEGE (Simulated Exploit & Guided Emulation) technology to detect, validate, and help mitigate security vulnerabilities, especially in Open-Source Software (OSS) components.

## Project Status
**Last Updated**: December 6, 2025
- ✅ Frontend application running on Replit
- ✅ Vite dev server configured for port 5000
- ✅ All dependencies installed and working
- ✅ Bilingual support (English/Indonesian)
- ✅ Client-side authentication with route protection
- Frontend-only application (mock API in services/api.js)

## Tech Stack
- **Frontend Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite 6
- **Routing**: Vue Router 4
- **State Management**: Pinia with localStorage persistence
- **Styling**: Custom CSS with CSS variables
- **Node.js**: v20.19.3

## Project Structure
```
├── src/
│   ├── assets/          # CSS styles
│   ├── components/      # Vue components
│   │   ├── TeamCard.vue
│   │   ├── CodeInputPanel.vue
│   │   ├── ArtifactTable.vue
│   │   ├── ArtifactDetailModal.vue
│   │   └── CallGraphModal.vue
│   ├── composables/     # Vue composables
│   │   └── useI18n.js   # Translation helper
│   ├── i18n/            # Internationalization
│   │   ├── en.js        # English translations
│   │   ├── id.js        # Indonesian translations
│   │   └── index.js     # Translation exports
│   ├── views/           # Page components
│   │   ├── Landing.vue
│   │   ├── Dashboard.vue
│   │   ├── Features.vue
│   │   ├── Login.vue
│   │   └── Signup.vue
│   ├── router/          # Vue Router config (with auth guards)
│   ├── store/           # Pinia stores
│   │   ├── index.js     # Scan store
│   │   ├── auth.js      # Authentication store
│   │   └── language.js  # Language preference store
│   ├── services/        # API services (currently mock)
│   ├── App.vue
│   └── main.js
├── migrations/          # PostgreSQL migrations (for future backend)
├── docs/                # API documentation
├── public/              # Static assets
└── index.html
```

## Development
- **Dev Server**: `npm run dev` (already configured as workflow)
- **Port**: 5000 (bound to 0.0.0.0)
- **Proxy Support**: Enabled via `allowedHosts: true` in vite.config.js

## Available Routes
- `/` - Landing page with company info and feature overview
- `/login` - User login page
- `/signup` - User registration page
- `/dashboard` - Auto-Vulcan dashboard for running scans (protected)
- `/features` - Detailed feature documentation (protected)

## Authentication
- Client-side authentication using Pinia store with localStorage persistence
- Route guards protect Dashboard and Features pages
- Navigation displays different items based on auth state:
  - **Not logged in**: Home, Login
  - **Logged in**: Home, Features, Dashboard, Language Switcher, Logout

## Key Features
1. **Vulnerability Localization** - Pinpoints exact class, method, and line from CVE databases
2. **Call Graph & Control Flow** - Builds comprehensive graphs to map reachable paths
3. **Exploit Generation** - Uses genetic algorithms for exploitation scenarios
4. **Execution & Validation** - Runs exploits in controlled sandbox environments
5. **Evidence Reporting** - Provides execution traces, coverage metrics, and proof of exploitation

## Backend Integration
Currently uses mock API handlers. To connect a real backend:
1. Implement API endpoints described in `docs/API.md`
2. Update `src/services/api.js` to call real backend
3. PostgreSQL schema available in `migrations/001_init.sql`

## Recent Changes
- **Dec 6, 2025**:
  - Implemented client-side authentication system with Login/Signup pages
  - Added auth store with Pinia persistence (localStorage)
  - Added route guards protecting Dashboard and Features pages
  - Conditional navigation based on authentication state
  - Added auth-related translations for both EN and ID
  - Redesigned language switcher with globe icon
  - Modified Dashboard form: removed Commit Hash, added Target Method and Target Line fields
- **Dec 3, 2025**: 
  - Fixed Vite version compatibility (downgraded from 7.x to 6.x)
  - Configured workflow for Replit environment
  - Updated .gitignore for Vue/Vite projects
  - Verified application runs successfully
  - Added bilingual support (English/Indonesian) with language switcher
  - Created i18n translation files (src/i18n/en.js, src/i18n/id.js)
  - Implemented language store with Pinia persistence (localStorage)
  - Created useI18n composable for translation access
  - Added defensive language validation for unsupported codes

## Development Team
- Marcel Suandi Tambing - Team Leader & Frontend
- Steffany Harwella - Data Scientist & Core
- Marde Fasma'ul Aza - Full-stack Engineer (Backend)
