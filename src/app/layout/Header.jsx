import { useTranslation } from 'react-i18next';
import LoadingBar from '../../components/ui/LoadingBar';

/**
 * Header component.
 * Displays the application title, subtitle, controls, and loading bar.
 * Spans full width with centered content.
 */
export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="w-full bg-base-100">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">
            {t('header.title')}
          </h1>
          <p className="text-sm md:text-lg text-base-content/70">
            {t('header.subtitle')}
          </p>
        </div>
      </div>
      <LoadingBar />
    </header>
  );
}
