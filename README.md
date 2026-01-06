# Supervisor Schedule - Rotation Management Tool

A modern web application for generating, validating, and managing rotation schedules for drilling supervisors. Designed to optimize human resource planning in offshore and onshore drilling operations.

[Read in Spanish](./README.es.md)

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Problem Solved](#problem-solved)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)

## Overview

**Supervisor Schedule** is a specialized tool that automates the generation of rotation schedules for drilling supervision teams. The app coordinates three supervisors with complex work cycles, ensuring continuous coverage of critical operations while respecting rest periods.

### What does this app do?

The application generates optimized schedules that:
- Coordinate the rotation of 3 supervisors (S1, S2, S3)
- Guarantee exactly 2 supervisors drilling at all times
- Support configurable work/rest cycles (e.g., 14x7, 21x7)
- Include induction periods for new personnel
- Manage transitions between states (travel up, induction, drilling, travel down, rest)
- Automatically validate compliance with operational rules

## Key Features

### Smart Schedule Generation

- **Flexible Configuration**: Define work days, off days, induction days, and required drilling days
- **Preset Regimes**: 4 common configurations ready to use (14x7, 21x7, 10x5, 14x6 Extended)
- **Real-Time Validation**: Instantly checks compliance with operational rules
- **Automatic Optimization**: Generates the best supervisor distribution for maximum efficiency

### Visualization & Analysis

- **Visual Schedule**: Interactive table with color-coded states (up, induction, drilling, down, rest)
- **Detailed Statistics**:
  - Charts of day distribution by state
  - Per-supervisor metrics (worked days, off days, drilling days)
  - Utilization rate and drilling efficiency
- **Comparison Mode**: Compare two configurations side by side with automatic metrics

### Data Management

- **Schedule History**: Automatically saves all generated schedules
- **Multi-Format Export**: Export to PDF, Excel, or CSV with professional formatting
- **Local Persistence**: Data is retained between browser sessions

### User Experience

- **Bilingual Interface**: Full support for English and Spanish
- **Light/Dark Themes**: UI adapts to user preferences
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Guided Tour**: Step-by-step interactive tutorial for new users
- **Toast Notifications**: Visual feedback for actions and errors

## Problem Solved

### Rotation Management Challenges

Drilling operations require:

1. **Continuous Coverage**: Two supervisors must be drilling at all times for safety and proper oversight
2. **Complex Cycles**: Supervisors work in cycles (e.g., 14 days on, 7 off) that must be synchronized without gaps
3. **Coordinated Transitions**: Shift changes include travel (up/down) and induction periods that must be planned
4. **Regulatory Compliance**: Strict operational rules for rest and valid transitions must be enforced

### Solution Provided

This application:

- **Automates** the generation of complex schedules that would take hours manually
- **Ensures** compliance with all operational rules via automatic validation
- **Optimizes** human resource utilization, maximizing productive days
- **Visualizes** complex rotation information clearly
- **Facilitates** scenario comparison for decision making
- **Documents** all schedules with professional export options

### Use Cases

- **Project Planning**: Determine the optimal rotation configuration for a new drilling project
- **Resource Optimization**: Compare regimes to maximize efficiency and reduce costs
- **Scenario Analysis**: Evaluate the impact of changes in work or induction days
- **Documentation**: Generate professional PDF/Excel reports for presentations or audits
- **Personnel Management**: Visualize individual supervisor workloads

## Tech Stack

### Frontend Core
- **React 18.2.0** - Modern UI library with hooks
- **Vite 7.3.0** - Ultra-fast build tool and dev server
- **React Hook Form + Zod** - Form management with validation

### Styles & UI
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **DaisyUI 5.5.14** - Pre-designed UI components
- **Lucide React** - Modern, consistent icons

### Functionality
- **Recharts** - Charts and statistics visualization
- **Driver.js** - Interactive guided tour
- **React Hot Toast** - Elegant notification system
- **i18next** - Internationalization (EN/ES)

### Export
- **jsPDF + Autotable** - PDF generation
- **ExcelJS** - Excel export with styles
- **File Saver** - Download generated files

### Testing
- **Vitest** - Fast testing framework
- **Testing Library** - React component testing

## Installation & Setup

### Prerequisites

- Node.js 20.19+ or 22.12+ (recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/Meitchouk/supervisor-schedule.git
cd supervisor-schedule
```

2. **Install dependencies**
```bash
npm install
```

3. **Run in development**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run check        # Run format + lint + build
npm run test         # Run tests with Vitest
```

## Usage Guide

### 1. Basic Configuration

**Option A: Use a Preset**
- Select one of the 4 predefined regimes in the "Quick Access" panel
- Values load automatically

**Option B: Manual Configuration**
- **Work Days (N)**: Consecutive days each supervisor works (1-31)
- **Off Days (M)**: Consecutive rest days (1-31)
- **Induction Days**: Days required for personnel induction (1-5)
- **Required Drilling Days**: Total operations to schedule (1-1000)

### 2. Generate Schedule

1. Click **"Generate Schedule"**
2. The app will automatically generate the optimal rotation
3. You will see:
  - **Validation Summary**: Confirms all rules are met
  - **Visual Schedule**: Table with the 3 supervisors' rotation
  - **Statistics**: Metrics and utilization charts
  - **History**: Schedule is saved automatically

### 3. Analyze Results

**Schedule**
- Each cell is colored by the supervisor's state that day
- Light green: Up | Blue: Induction | Purple: Drilling | Orange: Down | Gray: Rest

**Statistics**
- Click "Schedule Statistics" to expand
- Review day distribution by state
- Analyze per-supervisor metrics
- Check utilization and efficiency rates

### 4. Compare Configurations

1. Enable **Comparison Mode** from the top-right button
2. Configure a second rotation in the left panel
3. Generate both schedules
4. Review automatically calculated differences:
   - Total days, work days, off days
   - Drilling efficiency, utilization rate
   - Individual supervisor metrics

### 5. Export Results

- Click **"Export"** and select format:
  - **PDF**: Professional document with configuration and full schedule
  - **Excel**: Spreadsheet with colors and legend
  - **CSV**: Tabular data for external analysis

### 6. Guided Tour

- First time: The tour starts automatically
- To repeat: Click the help icon (?) in the top-right corner
- The tour adapts dynamically to available data

## Project Structure

```
supervisor-schedule/
├── src/
│   ├── app/                      # Main app components
│   │   ├── App.jsx              # Root component
│   │   └── layout/              # Layout components
│   ├── components/              # Reusable components
│   │   ├── comparison/          # Schedule comparison mode
│   │   ├── export/              # PDF/Excel/CSV export
│   │   ├── forms/               # Configuration forms
│   │   ├── history/             # Schedule history
│   │   ├── presets/             # Preset configurations
│   │   ├── schedule/            # Schedule visualization
│   │   ├── stats/               # Statistics and charts
│   │   ├── tour/                # Interactive guided tour
│   │   ├── ui/                  # Base UI components
│   │   └── validation/          # Validation summary
│   ├── context/                 # React Contexts
│   │   ├── ComparisonContext.jsx    # Comparison state
│   │   ├── LanguageContext.jsx      # Language (EN/ES)
│   │   ├── LoadingContext.jsx       # Loading state
│   │   ├── PresetsContext.jsx       # Available presets
│   │   ├── ScheduleContext.jsx      # Schedule state
│   │   ├── ScheduleHistoryContext.jsx # History
│   │   └── ThemeContext.jsx         # Light/dark theme
│   ├── features/                # Business logic
│   │   └── scheduler/           # Schedule generation engine
│   │       ├── constants.js     # States and colors
│   │       ├── generateSchedule.js  # Generation algorithm
│   │       ├── validateSchedule.js  # Validation rules
│   │       └── types.js         # JSDoc type definitions
│   ├── i18n/                    # Internationalization
│   │   ├── config.js            # i18next config
│   │   └── locales/             # EN/ES translations
│   ├── styles/                  # Global styles
│   │   └── globals.css          # Global CSS + Driver.js theme
│   ├── utils/                   # Utilities
│   │   ├── exportUtils.js       # Export functions
│   │   └── scheduleHash.js      # Duplicate detection hash
│   └── main.jsx                 # Entry point
├── public/                      # Static files
├── eslint.config.js            # ESLint config
├── tailwind.config.js          # Tailwind config
├── vite.config.js              # Vite config
├── vitest.config.js            # Vitest config
└── package.json                # Dependencies & scripts
```

### Key Components

- **generateSchedule.js**: Main algorithm coordinating the 3 supervisors' rotations
- **validateSchedule.js**: Validates compliance with operational rules (2 drilling, valid transitions, etc.)
- **ComparisonView**: Compare two configurations with automatic metrics
- **ScheduleStats**: Generates charts and metrics using Recharts
- **AppTour**: Guided tour with Driver.js, saves progress and adapts to user interactions

---

**Developed with React + Vite**

**Version**: 0.0.1  
**License**: MIT
