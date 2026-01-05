import { useTranslation } from 'react-i18next';
import { Controls } from '../../components/ui';

/**
 * Header component.
 * Displays the application title, subtitle, and controls.
 */
export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="app-header-wrapper">
      <div className="app-header">
        <h1>{t('header.title')}</h1>
        <p className="subtitle">{t('header.subtitle')}</p>
      </div>
      <Controls />
    </header>
  );
}
