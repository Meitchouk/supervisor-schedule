import { useTranslation } from 'react-i18next';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * ValidationSummary component.
 * Displays validation results and any issues with the schedule using daisyUI alerts.
 */
export default function ValidationSummary({ scheduleResult }) {
  const { t } = useTranslation();
  const hasIssues = scheduleResult?.issues && scheduleResult.issues.length > 0;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">{t('validation.title')}</h3>

        {!scheduleResult ? (
          <div role="alert" className="alert alert-info">
            <Info className="h-6 w-6" />
            <span>{t('validation.placeholder')}</span>
          </div>
        ) : hasIssues ? (
          <div role="alert" className={clsx('alert alert-warning')}>
            <AlertCircle className="h-6 w-6" />
            <div>
              <h4 className="font-bold">{t('validation.issuesFound')}</h4>
              <ul className="mt-2 space-y-1">
                {scheduleResult.issues.map((issue, index) => (
                  <li key={index} className="text-sm">
                    • {issue.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div role="alert" className="alert alert-success">
            <CheckCircle2 className="h-6 w-6" />
            <span>{t('validation.success')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
