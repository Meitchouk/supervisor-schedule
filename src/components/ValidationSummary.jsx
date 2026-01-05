/**
 * ValidationSummary component.
 * Displays validation results and any issues with the schedule.
 */
export default function ValidationSummary({ scheduleResult }) {
  const hasIssues = scheduleResult?.issues && scheduleResult.issues.length > 0;

  return (
    <div className="validation-summary">
      <h3>Validation Summary</h3>

      {!scheduleResult ? (
        <p className="validation-placeholder">
          Validation results will appear here after generating a schedule.
        </p>
      ) : hasIssues ? (
        <div className="validation-issues">
          <p className="validation-title">Issues Found:</p>
          <ul>
            {scheduleResult.issues.map((issue, index) => (
              <li key={index} className={`issue issue-${issue.severity}`}>
                {issue.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="validation-success">✓ Schedule is valid</p>
      )}
    </div>
  );
}
