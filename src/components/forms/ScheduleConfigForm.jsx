import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const handleInputChange = (field, value) => {
    const numValue = parseInt(value, 10);
    if (!Number.isNaN(numValue)) {
      onConfigChange(field, numValue);
    }
  };

  return (
    <form className="config-form" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>{t('config.title')}</legend>

        <div className="form-group">
          <label htmlFor="workDays">{t('config.workDays')}</label>
          <input
            id="workDays"
            type="number"
            min="1"
            max="31"
            value={config.workDays}
            onChange={(e) => handleInputChange('workDays', e.target.value)}
            className="form-input"
          />
          <small>{t('config.workDaysHint')}</small>
        </div>

        <div className="form-group">
          <label htmlFor="offDays">{t('config.offDays')}</label>
          <input
            id="offDays"
            type="number"
            min="1"
            max="31"
            value={config.offDays}
            onChange={(e) => handleInputChange('offDays', e.target.value)}
            className="form-input"
          />
          <small>{t('config.offDaysHint')}</small>
        </div>

        <div className="form-group">
          <label htmlFor="inductionDays">{t('config.inductionDays')}</label>
          <input
            id="inductionDays"
            type="number"
            min="1"
            max="5"
            value={config.inductionDays}
            onChange={(e) => handleInputChange('inductionDays', e.target.value)}
            className="form-input"
          />
          <small>{t('config.inductionDaysHint')}</small>
        </div>

        <div className="form-group">
          <label htmlFor="drillingDaysRequired">
            {t('config.drillingDaysRequired')}
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
          <small>{t('config.drillingDaysHint')}</small>
        </div>

        <button
          type="button"
          onClick={onGenerateSchedule}
          className={clsx('btn', 'btn-primary')}
        >
          {t('config.generateButton')}
        </button>
      </fieldset>
    </form>
  );
}
