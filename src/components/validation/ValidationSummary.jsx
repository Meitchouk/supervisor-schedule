import { useTranslation } from 'react-i18next';

/**
 * ValidationSummary component.
 * Displays validation results and any issues with the schedule.
 */
export default function ValidationSummary({ scheduleResult }) {
  const { t } = useTranslation();
  const hasIssues = scheduleResult?.issues && scheduleResult.issues.length > 0;

  return (
    <div className="validation-summary">
      <h3>{t('validation.title')}</h3>

      {!scheduleResult ? (
        <p className="validation-placeholder">{t('validation.placeholder')}</p>
      ) : hasIssues ? (
        <div className="validation-issues">
          <p className="validation-title">{t('validation.issuesFound')}</p>
          <ul>
            {scheduleResult.issues.map((issue, index) => (
              <li key={index} className={`issue issue-${issue.severity}`}>
                {issue.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="validation-success">{t('validation.success')}</p>
      )}
    </div>
  );
}
