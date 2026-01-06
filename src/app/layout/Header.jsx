import { useTranslation } from 'react-i18next';
import { Controls } from '../../components/ui';
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-5">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">
              {t('header.title')}
            </h1>
            <p className="text-sm md:text-lg text-base-content/70">
              {t('header.subtitle')}
            </p>
          </div>
          <div className="self-center md:self-start">
            <Controls />
          </div>
        </div>
      </div>
      <LoadingBar />
    </header>
  );
}
