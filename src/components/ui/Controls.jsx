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
    <div className="flex gap-3 items-end">
      {/* Language Select */}
      <div className="form-control">
        <label htmlFor="language-select" className="label">
          <span className="label-text font-semibold flex items-center gap-2">
            <Languages size={18} />
            {t('controls.language')}
          </span>
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="select select-bordered min-w-[140px]"
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
        className={clsx('btn btn-square btn-ghost')}
        title={t('controls.toggleTheme', {
          mode: theme === 'dark' ? t('theme.light') : t('theme.dark'),
        })}
        aria-label={t('controls.toggleTheme', {
          mode: theme === 'dark' ? t('theme.light') : t('theme.dark'),
        })}
        disabled={isLoading}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
