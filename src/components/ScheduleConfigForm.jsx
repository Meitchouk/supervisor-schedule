import clsx from 'clsx';

/**
 * ScheduleConfigForm component.
 * Form for configuring schedule generation parameters.
 */
export default function ScheduleConfigForm({
  config,
  onConfigChange,
  onGenerateSchedule,
}) {
  const handleInputChange = (field, value) => {
    const numValue = parseInt(value, 10);
    if (!Number.isNaN(numValue)) {
      onConfigChange(field, numValue);
    }
  };

  return (
    <form className="config-form" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>Schedule Configuration</legend>

        <div className="form-group">
          <label htmlFor="workDays">Work Days (N)</label>
          <input
            id="workDays"
            type="number"
            min="1"
            max="31"
            value={config.workDays}
            onChange={(e) => handleInputChange('workDays', e.target.value)}
            className="form-input"
          />
          <small>Number of days per work cycle</small>
        </div>

        <div className="form-group">
          <label htmlFor="offDays">Off Days (M)</label>
          <input
            id="offDays"
            type="number"
            min="1"
            max="31"
            value={config.offDays}
            onChange={(e) => handleInputChange('offDays', e.target.value)}
            className="form-input"
          />
          <small>Number of off days per cycle</small>
        </div>

        <div className="form-group">
          <label htmlFor="inductionDays">Induction Days</label>
          <input
            id="inductionDays"
            type="number"
            min="1"
            max="5"
            value={config.inductionDays}
            onChange={(e) => handleInputChange('inductionDays', e.target.value)}
            className="form-input"
          />
          <small>Days required for induction (1–5)</small>
        </div>

        <div className="form-group">
          <label htmlFor="drillingDaysRequired">
            Total Drilling Days Required
          </label>
          <input
            id="drillingDaysRequired"
            type="number"
            min="1"
            max="365"
            value={config.drillingDaysRequired}
            onChange={(e) =>
              handleInputChange('drillingDaysRequired', e.target.value)
            }
            className="form-input"
          />
          <small>Total drilling operations needed</small>
        </div>

        <button
          type="button"
          onClick={onGenerateSchedule}
          className={clsx('btn', 'btn-primary')}
        >
          Generate Schedule
        </button>
      </fieldset>
    </form>
  );
}
