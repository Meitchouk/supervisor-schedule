# Supervisor Schedule

A React + Vite application for generating and validating supervisor schedules based on a constraint-based scheduling algorithm.

## Overview

This project is a boilerplate for a supervisor scheduling tool. It provides a clean, professional interface for:

- Configuring scheduling parameters (work days, off days, induction days, drilling days)
- Generating optimized schedules
- Validating results
- Exporting and reviewing schedules

The scheduling algorithm implementation is planned for future development.

## Requirements

- **Node.js** 18.x or higher
- **npm** 9.x or higher

## Setup

### 1. Clone or download the repository

```bash
cd supervisor-schedule
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

### Development

- `npm run dev` – Start the Vite development server
- `npm run preview` – Build and preview the production bundle locally

### Production

- `npm run build` – Build the application for production (generates `dist/` folder)

### Code Quality

- `npm run lint` – Run ESLint on source files
- `npm run format` – Format code with Prettier

### Deployment

- `npm run deploy` – Deploy to GitHub Pages
  - Requires `npm run build` to run automatically first
  - Publishes contents of `dist/` to GitHub Pages

## Project Structure

```
supervisor-schedule/
├─ public/
│  └─ 404.html                 # SPA fallback for GitHub Pages
├─ src/
│  ├─ app/
│  │  ├─ App.jsx               # Main application component
│  │  └─ layout/
│  │     └─ AppShell.jsx       # Layout wrapper
│  ├─ components/
│  │  ├─ ScheduleConfigForm.jsx # Configuration form
│  │  ├─ ScheduleGrid.jsx       # Schedule display grid
│  │  ├─ Legend.jsx             # State legend
│  │  └─ ValidationSummary.jsx  # Validation results
│  ├─ features/
│  │  └─ scheduler/
│  │     ├─ constants.js        # Schedule state constants
│  │     ├─ generateSchedule.js # Schedule generation (stub)
│  │     ├─ validateSchedule.js # Schedule validation (stub)
│  │     └─ types.js            # JSDoc type definitions
│  ├─ styles/
│  │  ├─ globals.css            # Global styles
│  │  └─ schedule.css           # Schedule-specific styles
│  └─ main.jsx                  # React entry point
├─ .editorconfig               # Editor configuration
├─ .eslintrc.js                # ESLint configuration
├─ .gitignore                  # Git ignore patterns
├─ .prettierrc                 # Prettier configuration
├─ .prettierignore             # Prettier ignore patterns
├─ eslint.config.js            # ESLint flat config
├─ vite.config.js              # Vite configuration
├─ package.json                # Dependencies and scripts
└─ README.md                   # This file
```

## Configuration

### Vite Base Path (GitHub Pages)

The project is configured to deploy to GitHub Pages under the repository name `supervisor-schedule`. If you change the repository name, update the `base` property in `vite.config.js`:

```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

### ESLint & Prettier

Code quality tools are pre-configured:

- **ESLint** enforces JavaScript best practices
- **Prettier** formats code consistently

Run lint checks and auto-format before committing:

```bash
npm run lint   # Check for issues
npm run format # Auto-fix formatting
```

## GitHub Pages Deployment

### Prerequisites

1. Repository is on GitHub
2. GitHub Pages is enabled in repository settings (should use `gh-pages` branch)

### Deploy Steps

1. **Update the repository URL in `package.json`** (if not already set):

   ```json
   {
     "homepage": "https://your-username.github.io/supervisor-schedule"
   }
   ```

2. **Build and deploy**:

   ```bash
   npm run deploy
   ```

   This runs:
   - `npm run build` (creates production build)
   - `gh-pages -d dist` (deploys `dist/` folder to `gh-pages` branch)

3. **Verify deployment**: Visit `https://your-username.github.io/supervisor-schedule`

### Single Page Application (SPA) Routing

The `public/404.html` file ensures that client-side routing works correctly on GitHub Pages. If a user navigates directly to a nested route, they're redirected through the index page, allowing React Router (or manual routing) to take over.

## Development Workflow

1. **Feature development**

   ```bash
   npm run dev
   ```

2. **Code formatting**

   ```bash
   npm run format
   ```

3. **Lint check**

   ```bash
   npm run lint
   ```

4. **Build and test production**

   ```bash
   npm run build
   npm run preview
   ```

5. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## Code Style

- **Language**: English (all naming, comments, documentation)
- **Formatting**: Prettier (automatic, enforced by git hooks recommended)
- **Linting**: ESLint with React plugins
- **CSS**: Plain CSS (no external frameworks)
- **Components**: Functional React with hooks

## Next Steps (Not Implemented)

The following features are planned for future development:

1. **Schedule Generation Algorithm**
   - Constraint-based scheduling logic
   - State machine for supervisor transitions
   - Optimization for drilling day distribution

2. **Validation Rules**
   - Work/off cycle enforcement
   - Induction requirement checks
   - Drilling day count verification
   - Conflict detection

3. **Export & Reporting**
   - CSV export
   - PDF report generation
   - Schedule analytics

4. **Testing**
   - Unit tests (Jest)
   - Component tests (React Testing Library)
   - Algorithm validation tests

## License

ISC
