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
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">
              {t('header.title')}
            </h1>
            <p className="text-lg text-base-content/70">
              {t('header.subtitle')}
            </p>
          </div>
          <Controls />
        </div>
      </div>
      <LoadingBar />
    </header>
  );
}
