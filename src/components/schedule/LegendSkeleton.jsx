import { useTranslation } from 'react-i18next';

/**
 * LegendSkeleton component.
 * Skeleton loader for Legend while generating the schedule.
 */
export default function LegendSkeleton() {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-lg">{t('schedule.legend')}</h3>
        <div className="flex flex-wrap gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="skeleton h-6 w-12 rounded-badge"></div>
              <div className="skeleton h-4 w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
