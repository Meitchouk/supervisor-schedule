import { useTranslation } from 'react-i18next';

import { Sun, Moon, Languages, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLoading } from '../../context/LoadingContext';

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
    <div className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="container mx-auto px-4 py-2">
        {/* Desktop: Two separate buttons */}
        <div className="hidden md:flex gap-2 justify-end">
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
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-box w-40 mt-2">
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

        {/* Mobile: Combined settings menu */}
        <div className="md:hidden flex justify-end">
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
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-box w-52 mt-2">
              {/* Language Section */}
              <li className="menu-title">
                <span className="flex items-center gap-2">
                  <Languages size={16} />
                  {t('controls.language')}
                </span>
              </li>
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

              <div className="divider my-1"></div>

              {/* Theme Section */}
              <li className="menu-title">
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  {t('controls.theme')}
                </span>
              </li>
              <li>
                <button onClick={toggleTheme}>
                  {theme === 'dark' ? t('theme.light') : t('theme.dark')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
