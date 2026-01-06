import { createContext, useContext } from 'react';

const PresetsContext = createContext(null);

/**
 * Predefined schedule configurations
 */
export const PRESETS = [
  {
    id: 'preset-14x7',
    name: {
      es: 'Régimen 14x7',
      en: '14x7 Rotation',
    },
    description: {
      es: '14 días de trabajo, 7 libres',
      en: '14 work days, 7 off',
    },
    config: {
      workDays: 14,
      offDays: 7,
      inductionDays: 5,
      drillingDaysRequired: 90,
    },
  },
  {
    id: 'preset-21x7',
    name: {
      es: 'Régimen 21x7',
      en: '21x7 Rotation',
    },
    description: {
      es: '21 días de trabajo, 7 libres',
      en: '21 work days, 7 off',
    },
    config: {
      workDays: 21,
      offDays: 7,
      inductionDays: 3,
      drillingDaysRequired: 90,
    },
  },
  {
    id: 'preset-10x5',
    name: {
      es: 'Régimen 10x5',
      en: '10x5 Rotation',
    },
    description: {
      es: '10 días de trabajo, 5 libres',
      en: '10 work days, 5 off',
    },
    config: {
      workDays: 10,
      offDays: 5,
      inductionDays: 2,
      drillingDaysRequired: 90,
    },
  },
  {
    id: 'preset-14x6-extended',
    name: {
      es: 'Régimen 14x6 Extendido',
      en: '14x6 Extended Rotation',
    },
    description: {
      es: '14 días de trabajo, 6 libres, 950 días perforación',
      en: '14 work days, 6 off, 950 drilling days',
    },
    config: {
      workDays: 14,
      offDays: 6,
      inductionDays: 4,
      drillingDaysRequired: 950,
    },
  },
];

/**
 * PresetsProvider component
 */
export function PresetsProvider({ children }) {
  const getPresetById = (id) => {
    return PRESETS.find((preset) => preset.id === id);
  };

  const getPresetByConfig = (config) => {
    return PRESETS.find(
      (preset) =>
        preset.config.workDays === config.workDays &&
        preset.config.offDays === config.offDays &&
        preset.config.inductionDays === config.inductionDays &&
        preset.config.drillingDaysRequired === config.drillingDaysRequired,
    );
  };

  return (
    <PresetsContext.Provider
      value={{
        presets: PRESETS,
        getPresetById,
        getPresetByConfig,
      }}
    >
      {children}
    </PresetsContext.Provider>
  );
}

export function usePresets() {
  const context = useContext(PresetsContext);
  if (!context) {
    throw new Error('usePresets must be used within a PresetsProvider');
  }
  return context;
}
