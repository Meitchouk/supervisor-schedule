
[Read in English](./README.md)

# Cronograma de Supervisores - Herramienta de Gestión de Rotaciones

Una aplicación web moderna para la generación, validación y gestión de cronogramas de rotación para supervisores de perforación. Diseñada para optimizar la planificación de recursos humanos en operaciones de perforación offshore y onshore.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Problema que Resuelve](#problema-que-resuelve)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso de la Aplicación](#uso-de-la-aplicación)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Descripción General

**Supervisor Schedule** es una herramienta especializada que automatiza la generación de cronogramas de rotación para equipos de supervisión en operaciones de perforación. La aplicación maneja la coordinación de tres supervisores con ciclos de trabajo complejos, asegurando cobertura continua de operaciones críticas mientras respeta los períodos de descanso del personal.

### ¿Qué hace esta aplicación?

La aplicación genera cronogramas optimizados que:
- Coordinan la rotación de 3 supervisores (S1, S2, S3)
- Garantizan exactamente 2 supervisores perforando simultáneamente en todo momento
- Respetan ciclos de trabajo/descanso configurables (ej: 14x7, 21x7)
- Incluyen períodos de inducción para nuevo personal
- Manejan transiciones entre estados (subida, perforación, bajada, descanso)
- Validan automáticamente el cumplimiento de reglas operativas

## Características Principales

### Generación Inteligente de Cronogramas

- **Configuración Flexible**: Define días de trabajo, días libres, días de inducción y días totales de perforación
- **Presets Predefinidos**: 4 configuraciones comunes listas para usar (14x7, 21x7, 10x5, 14x6 Extendido)
- **Validación en Tiempo Real**: Verifica automáticamente el cumplimiento de reglas operativas
- **Optimización Automática**: Genera la mejor distribución de supervisores para maximizar eficiencia

### Visualización y Análisis

- **Cronograma Visual**: Tabla interactiva con código de colores por estado (subida, inducción, perforación, bajada, descanso)
- **Estadísticas Detalladas**: 
  - Gráficos de distribución de días por estado
  - Métricas por supervisor (días trabajados, días libres, días de perforación)
  - Tasa de utilización y eficiencia de perforación
- **Modo Comparación**: Compara dos configuraciones lado a lado con análisis de diferencias

### Gestión de Datos

- **Historial de Cronogramas**: Guarda automáticamente todos los cronogramas generados
- **Exportación Múltiple**: Exporta a PDF, Excel o CSV con formato profesional
- **Persistencia Local**: Los datos se mantienen entre sesiones del navegador

### Experiencia de Usuario

- **Interfaz Bilingüe**: Soporte completo para Español e Inglés
- **Temas Claro/Oscuro**: Interfaz adaptable a preferencias del usuario
- **Diseño Responsivo**: Funciona perfectamente en desktop, tablet y móvil
- **Tour Guiado**: Tutorial interactivo paso a paso para nuevos usuarios
- **Notificaciones Toast**: Feedback visual de acciones exitosas o errores

## Problema que Resuelve

### Desafíos en la Gestión de Rotaciones

Las operaciones de perforación requieren:

1. **Cobertura Continua**: Dos supervisores deben estar perforando en todo momento para garantizar seguridad y supervisión adecuada
2. **Ciclos Complejos**: Los supervisores trabajan en ciclos (ej: 14 días de trabajo, 7 de descanso) que deben sincronizarse sin dejar brechas
3. **Transiciones Coordinadas**: Los cambios de turno incluyen períodos de viaje (subida/bajada) e inducción que deben planificarse
4. **Cumplimiento Normativo**: Se deben respetar reglas operativas estrictas sobre descansos y transiciones válidas

### Solución Propuesta

Esta aplicación:

- **Automatiza** la generación de cronogramas complejos que manualmente tomarían horas
- **Garantiza** el cumplimiento de todas las reglas operativas mediante validación automática
- **Optimiza** la utilización de recursos humanos maximizando días productivos
- **Visualiza** de forma clara la información compleja de rotaciones
- **Facilita** la comparación de diferentes escenarios para toma de decisiones
- **Documenta** todos los cronogramas con opciones de exportación profesional

### Casos de Uso

- **Planificación de Proyectos**: Determinar la configuración óptima de rotación para un nuevo proyecto de perforación
- **Optimización de Recursos**: Comparar diferentes regímenes para maximizar eficiencia y reducir costos
- **Análisis de Escenarios**: Evaluar el impacto de cambios en días de trabajo o días de inducción
- **Documentación**: Generar reportes profesionales en PDF/Excel para presentaciones o auditorías
- **Gestión de Personal**: Visualizar la carga de trabajo individual de cada supervisor

## Tecnologías Utilizadas

### Frontend Core
- **React 18.2.0** - Biblioteca UI con hooks modernos
- **Vite 7.3.0** - Build tool y dev server ultra-rápido
- **React Hook Form + Zod** - Gestión de formularios con validación

### Estilos y UI
- **Tailwind CSS 3.4.19** - Framework CSS utility-first
- **DaisyUI 5.5.14** - Componentes UI pre-diseñados
- **Lucide React** - Iconos modernos y consistentes

### Funcionalidades
- **Recharts** - Visualización de gráficos y estadísticas
- **Driver.js** - Tour guiado interactivo
- **React Hot Toast** - Sistema de notificaciones elegante
- **i18next** - Internacionalización (ES/EN)

### Exportación
- **jsPDF + Autotable** - Generación de PDFs
- **ExcelJS** - Exportación a Excel con estilos
- **File Saver** - Descarga de archivos generados

### Testing
- **Vitest** - Framework de testing rápido
- **Testing Library** - Testing de componentes React

## Instalación y Configuración

### Prerrequisitos

- Node.js 20.19+ o 22.12+ (recomendado)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Meitchouk/supervisor-schedule.git
cd supervisor-schedule
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Compila para producción
npm run preview      # Previsualiza build de producción
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier
npm run check        # Ejecuta format + lint + build
npm run test         # Ejecuta tests con Vitest
```

## Uso de la Aplicación

### 1. Configuración Básica

**Opción A: Usar un Preset**
- Selecciona uno de los 4 regímenes predefinidos en el panel de "Acceso Rápido"
- Los valores se cargan automáticamente

**Opción B: Configuración Manual**
- **Días de Trabajo (N)**: Días consecutivos que trabaja cada supervisor (1-31)
- **Días Libres (M)**: Días consecutivos de descanso (1-31)
- **Días de Inducción**: Días requeridos para inducción de personal (1-5)
- **Días de Perforación Requeridos**: Total de operaciones a programar (1-1000)

### 2. Generar Cronograma

1. Haz clic en **"Generar Cronograma"**
2. La aplicación generará automáticamente la rotación óptima
3. Verás:
  - **Resumen de Validación**: Confirma que se cumplen todas las reglas
  - **Cronograma Visual**: Tabla con la rotación de los 3 supervisores
  - **Estadísticas**: Métricas y gráficos de utilización
  - **Historial**: El cronograma se guarda automáticamente

### 3. Analizar Resultados

**Cronograma**
- Cada celda está coloreada según el estado del supervisor ese día
- Verde claro: Subida | Azul: Inducción | Morado: Perforación | Naranja: Bajada | Gris: Descanso

**Estadísticas**
- Haz clic en "Estadísticas del Cronograma" para expandir
- Revisa la distribución de días por estado
- Analiza métricas por supervisor
- Verifica tasa de utilización y eficiencia

### 4. Comparar Configuraciones

1. Activa el **Modo Comparación** desde el botón en la esquina superior derecha
2. Configura una segunda rotación en el panel izquierdo
3. Genera ambos cronogramas
4. Revisa las diferencias calculadas automáticamente:
   - Días totales, días de trabajo, días libres
   - Eficiencia de perforación, tasa de utilización
   - Métricas individuales por supervisor

### 5. Exportar Resultados

- Haz clic en **"Exportar"** y selecciona el formato:
  - **PDF**: Documento profesional con configuración y cronograma completo
  - **Excel**: Hoja de cálculo con colores y leyenda
  - **CSV**: Datos tabulares para análisis externo

### 6. Tour Guiado

- Primera vez: El tour se inicia automáticamente
- Para repetir: Haz clic en el ícono de ayuda (?) en la esquina superior derecha
- El tour se adapta dinámicamente según los datos disponibles

## Estructura del Proyecto

```
supervisor-schedule/
├── src/
│   ├── app/                      # Componentes de aplicación principal
│   │   ├── App.jsx              # Componente raíz
│   │   └── layout/              # Componentes de layout
│   ├── components/              # Componentes reutilizables
│   │   ├── comparison/          # Modo comparación de cronogramas
│   │   ├── export/              # Exportación a PDF/Excel/CSV
│   │   ├── forms/               # Formularios de configuración
│   │   ├── history/             # Historial de cronogramas
│   │   ├── presets/             # Configuraciones predefinidas
│   │   ├── schedule/            # Visualización de cronograma
│   │   ├── stats/               # Estadísticas y gráficos
│   │   ├── tour/                # Tour guiado interactivo
│   │   ├── ui/                  # Componentes UI base
│   │   └── validation/          # Resumen de validación
│   ├── context/                 # React Contexts
│   │   ├── ComparisonContext.jsx    # Estado de comparación
│   │   ├── LanguageContext.jsx      # Idioma (ES/EN)
│   │   ├── LoadingContext.jsx       # Estado de carga
│   │   ├── PresetsContext.jsx       # Presets disponibles
│   │   ├── ScheduleContext.jsx      # Estado de cronograma
│   │   ├── ScheduleHistoryContext.jsx # Historial
│   │   └── ThemeContext.jsx         # Tema claro/oscuro
│   ├── features/                # Lógica de negocio
│   │   └── scheduler/           # Motor de generación de cronogramas
│   │       ├── constants.js     # Estados y colores
│   │       ├── generateSchedule.js  # Algoritmo de generación
│   │       ├── validateSchedule.js  # Reglas de validación
│   │       └── types.js         # Definiciones de tipos JSDoc
│   ├── i18n/                    # Internacionalización
│   │   ├── config.js            # Configuración i18next
│   │   └── locales/             # Traducciones ES/EN
│   ├── styles/                  # Estilos globales
│   │   └── globals.css          # CSS global + tema Driver.js
│   ├── utils/                   # Utilidades
│   │   ├── exportUtils.js       # Funciones de exportación
│   │   └── scheduleHash.js      # Hash para detección de duplicados
│   └── main.jsx                 # Punto de entrada
├── public/                      # Archivos estáticos
├── eslint.config.js            # Configuración ESLint
├── tailwind.config.js          # Configuración Tailwind
├── vite.config.js              # Configuración Vite
├── vitest.config.js            # Configuración Vitest
└── package.json                # Dependencias y scripts
```

### Componentes Clave

- **generateSchedule.js**: Algoritmo principal que coordina las rotaciones de los 3 supervisores
- **validateSchedule.js**: Valida cumplimiento de reglas operativas (2 supervisores perforando, transiciones válidas, etc.)
- **ComparisonView**: Permite comparar dos configuraciones con métricas calculadas automáticamente
- **ScheduleStats**: Genera gráficos y métricas usando Recharts
- **AppTour**: Tour guiado con Driver.js que guarda progreso y se adapta a interacciones del usuario

---

**Desarrollado con React + Vite**

**Versión**: 0.0.1  
**Licencia**: MIT

