import { useTranslation } from 'react-i18next';

import { Sun, Moon, Languages, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLoading } from '../../context/LoadingContext';
import InfoTooltip from './InfoTooltip';

/**
 * Minimalist sticky controls for language and theme switching.
 * Desktop: Two icon buttons with dropdown menus
 * Mobile: Single settings button with combined menu
 */
export default function Controls() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isLoading } = useLoading();

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Desktop: Two separate buttons */}
      <div className="hidden md:flex gap-2">
        {/* Language Menu */}
        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label={t('controls.selectLanguage')}
            disabled={isLoading}
          >
            <Languages size={20} />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-box w-40 mt-2"
          >
            <li>
              <button
                onClick={() => changeLanguage('en')}
                className={clsx(language === 'en' && 'active')}
              >
                {t('controls.languages.english')}
              </button>
            </li>
            <li>
              <button
                onClick={() => changeLanguage('es')}
                className={clsx(language === 'es' && 'active')}
              >
                {t('controls.languages.spanish')}
              </button>
            </li>
          </ul>
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="btn btn-ghost btn-sm btn-circle"
          aria-label={t('controls.toggleTheme', {
            mode: theme === 'dark' ? t('theme.light') : t('theme.dark'),
          })}
          disabled={isLoading}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile: Settings dropdown with toggles */}
      <div className="md:hidden">
        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label={t('controls.settings')}
            disabled={isLoading}
          >
            <Settings size={20} />
          </button>
          <div
            tabIndex={0}
            className="dropdown-content bg-base-200 rounded-box p-4 shadow-lg w-64 mt-2"
          >
            {/* Language Toggle */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Languages size={16} className="text-base-content/70" />
                <span className="text-sm font-medium">{t('controls.language')}</span>
                <InfoTooltip tooltipKey="controls.languageTooltip" position="bottom" />
              </div>
              <label className="label cursor-pointer justify-between gap-3 w-36">
                <span className="label-text font-medium">ES</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  checked={language === 'en'}
                  onChange={() => changeLanguage(language === 'en' ? 'es' : 'en')}
                  disabled={isLoading}
                />
                <span className="label-text font-medium">EN</span>
              </label>
            </div>

            <div className="divider my-2"></div>

            {/* Theme Toggle */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {theme === 'dark' ? <Moon size={16} className="text-base-content/70" /> : <Sun size={16} className="text-base-content/70" />}
                <span className="text-sm font-medium">{t('controls.theme')}</span>
                <InfoTooltip tooltipKey="controls.themeTooltip" position="bottom" />
              </div>
              <label className="label cursor-pointer justify-between gap-3 w-36">
                <Moon size={16} />
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  checked={theme === 'light'}
                  onChange={toggleTheme}
                  disabled={isLoading}
                />
                <Sun size={16} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
