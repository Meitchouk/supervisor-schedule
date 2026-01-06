import { useTranslation } from 'react-i18next';

/**
 * ValidationSummarySkeleton component.
 * Skeleton loader for ValidationSummary while generating the schedule.
 */
export default function ValidationSummarySkeleton() {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-lg">{t('validation.title')}</h3>

        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="skeleton h-5 w-5 rounded flex-shrink-0"></div>
              <div className="skeleton h-4 w-full max-w-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
