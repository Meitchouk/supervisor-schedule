import { useTranslation } from 'react-i18next';

/**
 * EmptySchedule component.
 * Displays when no schedule has been generated yet.
 */
export default function EmptySchedule() {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body min-h-[400px] flex items-center justify-center">
        <div className="empty-state">
          <p>{t('schedule.empty')}</p>
          <p className="empty-state-hint">{t('schedule.emptyHint')}</p>
        </div>
      </div>
    </div>
  );
}
