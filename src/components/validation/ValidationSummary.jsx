import { useTranslation } from 'react-i18next';
import { AlertCircle, CheckCircle2, Info, CheckCheck } from 'lucide-react';

/**
 * ValidationSummary component.
 * Displays validation results and any issues with the schedule using daisyUI alerts.
 */
export default function ValidationSummary({ scheduleResult }) {
  const { t } = useTranslation();

  const errors =
    scheduleResult?.issues?.filter((issue) => issue.severity === 'error') || [];
  const warnings =
    scheduleResult?.issues?.filter((issue) => issue.severity === 'warning') ||
    [];
  const infos =
    scheduleResult?.issues?.filter((issue) => issue.severity === 'info') || [];

  const hasErrors = errors.length > 0;
  const hasWarnings = warnings.length > 0;
  const hasInfos = infos.length > 0;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">{t('validation.title')}</h3>

        {!scheduleResult ? (
          <div role="alert" className="alert alert-info">
            <Info />
            <span>{t('validation.placeholder')}</span>
          </div>
        ) : hasErrors || hasWarnings ? (
          <div role="alert" className="alert alert-warning">
            <AlertCircle />
            <div>
              <div className="font-bold">{t('validation.issuesFound')}</div>
              <ul className="menu menu-compact">
                {errors.map((issue, index) => (
                  <li key={`error-${index}`}>
                    <span className="text-error">{issue.message}</span>
                  </li>
                ))}
                {warnings.map((issue, index) => (
                  <li key={`warning-${index}`}>
                    <span className="text-warning">{issue.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div role="alert" className="alert alert-success">
            <CheckCircle2 />
            <div>
              <div className="font-bold">{t('validation.success')}</div>
              {hasInfos && (
                <ul className="menu menu-compact mt-2">
                  {infos.map((issue, index) => (
                    <li
                      key={`info-${index}`}
                      className="flex flex-row items-center gap-2"
                    >
                      <CheckCheck className="w-4 h-4 text-success" />
                      <span className="text-sm opacity-80">
                        {issue.count !== undefined
                          ? t(issue.message, { count: issue.count })
                          : t(issue.message)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
