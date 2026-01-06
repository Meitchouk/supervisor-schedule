import { useTranslation } from 'react-i18next';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

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
            <Info />
            <span>{t('validation.placeholder')}</span>
          </div>
        ) : hasIssues ? (
          <div role="alert" className="alert alert-warning">
            <AlertCircle />
            <div>
              <div className="font-bold">{t('validation.issuesFound')}</div>
              <ul className="menu menu-compact">
                {scheduleResult.issues.map((issue, index) => (
                  <li key={index}>
                    <span>{issue.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div role="alert" className="alert alert-success">
            <CheckCircle2 />
            <span>{t('validation.success')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
