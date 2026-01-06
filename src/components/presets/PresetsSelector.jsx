import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Zap } from 'lucide-react';
import { usePresets } from '../../context/PresetsContext';
import { useLanguage } from '../../context/LanguageContext';

/**
 * PresetsSelector component
 * Quick access buttons for predefined configurations
 */
export default function PresetsSelector({ currentConfig, onLoadPreset }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { presets, getPresetByConfig } = usePresets();

  const currentPreset = getPresetByConfig(currentConfig);

  const handleSelectPreset = (preset) => {
    onLoadPreset(preset.config);
    toast.success(
      t('presets.loaded', { name: preset.name[language] || preset.name.es }),
    );
  };

  return (
    <div className="space-y-3" data-tour="presets">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Zap size={16} />
        <span>{t('presets.title')}</span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {presets.map((preset) => {
          const isActive = currentPreset?.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className={`btn btn-sm h-auto py-3 flex flex-col items-start gap-1 ${
                isActive ? 'btn-primary' : 'btn-outline'
              }`}
            >
              <span className="font-semibold text-xs">
                {preset.name[language] || preset.name.es}
              </span>
              <span className="text-xs opacity-70 whitespace-normal text-left">
                {preset.description[language] || preset.description.es}
              </span>
              <div className="text-xs font-mono opacity-60 flex gap-2 mt-1">
                <span>T:{preset.config.workDays}</span>
                <span>L:{preset.config.offDays}</span>
                <span>I:{preset.config.inductionDays}</span>
                <span>P:{preset.config.drillingDaysRequired}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
