# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Core Directories & Files

### `src/components/`
Reusable UI components (buttons, cards, navbars, dropdowns, etc.).

### `src/pages/`
Route-based components (Home, Login, Register, Profile, Dashboard, etc.).

### `src/contexts/`
Providers for maintaining global state (Theme, User Auth).

### `src/layout/`
Common layout structures wrapping around pages (General, Auth, Dashboard, etc.).

### `src/portected/`
Contains `ProtectedRoute.jsx` and `RouteAuth.jsx` for handling protected and authenticated routes.

### `src/i18n/`
Internationalization configuration and locale files.

---

## How Routing Works

1. `src/routes.jsx` defines your application's routes.
2. Page components live in `src/pages/`.
3. Layouts from `src/layout/` are used to wrap corresponding pages.

---

## Authentication & Protected Routes

Protected routes are managed via custom components in `src/portected/`, ensuring only authenticated users can access certain pages.

---

## Theming & Global State

Theme and user-related global state are provided by React context providers (`src/contexts/`), making state easily accessible across the app.

---

## Internationalization (i18n)

- Languages supported: Check `src/i18n/locales/` (currently Arabic and English).
- Main i18n setup: `src/i18n/I18n.jsx`.

---

frontend-final/
│
├── public/               # Static assets (images, icons, etc.)
├── src/                  # Main source code
│   ├── components/       # Reusable React components
│   ├── contexts/         # React Context Providers for state management
│   ├── i18n/             # Internationalization (i18n) setup and translations
│   ├── layout/           # Layout components for pages
│   ├── pages/            # Full page components, each representing a route
│   ├── portected/        # Protected route/auth utilities (possibly typo: "protected")
│   ├── utils/            # Utility/helper functions
│   ├── index.css         # Main stylesheet
│   ├── main.jsx          # App entry point
│   ├── routes.jsx        # Route definitions
│   └── App.jsx           # Root app component
├── package.json          # Project dependencies & scripts
├── tailwind.config.js    # Tailwind CSS config
└── vite.config.js        # Vite bundler config

## Scripts (from `package.json`)

- `dev`: Start development server.
- `build`: Build for production.
- `serve`: Preview production build.

---

   npm install
   ```
   

2. **Start Development Server**
   ```sh
   npm run dev
   ```

3. **Build for Production**
   ```sh
   npm run build
   ```
---

login

username: admin
password: admin123

username: user
password: @User123