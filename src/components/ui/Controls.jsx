import { useTranslation } from 'react-i18next';
import { Sun, Moon, Languages } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLoading } from '../../context/LoadingContext';

/**
 * Language and theme switcher component using daisyUI.
 * Uses custom hooks to manage language and theme state from context.
 * Disables during loading.
 */
export default function Controls() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isLoading } = useLoading();

  return (
    <div className="flex gap-2 md:gap-3 items-end flex-wrap justify-center md:justify-start">
      {/* Language Select */}
      <div className="form-control">
        <label htmlFor="language-select" className="label">
          <span className="label-text text-xs md:text-sm font-semibold flex items-center gap-1 md:gap-2">
            <Languages size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="hidden md:inline">{t('controls.language')}</span>
          </span>
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="select select-bordered select-sm md:select-md min-w-[100px] md:min-w-[140px]"
          aria-label={t('controls.selectLanguage')}
          disabled={isLoading}
        >
          <option value="en">{t('controls.languages.english')}</option>
          <option value="es">{t('controls.languages.spanish')}</option>
        </select>
      </div>

      {/* Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        className={clsx('btn btn-square btn-ghost btn-sm md:btn-md')}
        title={t('controls.toggleTheme', {
          mode: theme === 'dark' ? t('theme.light') : t('theme.dark'),
        })}
        aria-label={t('controls.toggleTheme', {
          mode: theme === 'dark' ? t('theme.light') : t('theme.dark'),
        })}
        disabled={isLoading}
      >
        {theme === 'dark' ? (
          <Sun size={18} className="md:w-5 md:h-5" />
        ) : (
          <Moon size={18} className="md:w-5 md:h-5" />
        )}
      </button>
    </div>
  );
}
