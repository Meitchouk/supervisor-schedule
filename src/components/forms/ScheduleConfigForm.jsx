import { useTranslation } from 'react-i18next';
import { InfoTooltip } from '../../components/ui';
import { useLoading } from '../../context/LoadingContext';

/**
 * ScheduleConfigForm component.
 * Form for configuring schedule generation parameters using daisyUI.
 * Disables all inputs during loading.
 */
export default function ScheduleConfigForm({
  config,
  onConfigChange,
  onGenerateSchedule,
}) {
  const { t } = useTranslation();
  const { isLoading } = useLoading();

  const handleInputChange = (field, value) => {
    const numValue = parseInt(value, 10);
    if (!Number.isNaN(numValue)) {
      onConfigChange(field, numValue);
    }
  };

  return (
    <form
      className="card bg-base-100 shadow-xl h-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="card-body h-full flex flex-col gap-4">
        <h2 className="card-title">{t('config.title')}</h2>

        <div className="form-control w-full">
          <label htmlFor="workDays" className="label">
            <InfoTooltip tooltipKey="config.workDaysTooltip">
              <span className="label-text">{t('config.workDays')}</span>
            </InfoTooltip>
          </label>
          <input
            id="workDays"
            type="number"
            min="1"
            max="31"
            value={config.workDays}
            onChange={(e) => handleInputChange('workDays', e.target.value)}
            className="input input-bordered w-full"
            disabled={isLoading}
          />
        </div>

        <div className="form-control w-full">
          <label htmlFor="offDays" className="label">
            <InfoTooltip tooltipKey="config.offDaysTooltip">
              <span className="label-text">{t('config.offDays')}</span>
            </InfoTooltip>
          </label>
          <input
            id="offDays"
            type="number"
            min="1"
            max="31"
            value={config.offDays}
            onChange={(e) => handleInputChange('offDays', e.target.value)}
            className="input input-bordered w-full"
            disabled={isLoading}
          />
        </div>

        <div className="form-control w-full">
          <label htmlFor="inductionDays" className="label">
            <InfoTooltip tooltipKey="config.inductionDaysTooltip">
              <span className="label-text">{t('config.inductionDays')}</span>
            </InfoTooltip>
          </label>
          <input
            id="inductionDays"
            type="number"
            min="1"
            max="5"
            value={config.inductionDays}
            onChange={(e) => handleInputChange('inductionDays', e.target.value)}
            className="input input-bordered w-full"
            disabled={isLoading}
          />
        </div>

        <div className="form-control w-full">
          <label htmlFor="drillingDaysRequired" className="label">
            <InfoTooltip tooltipKey="config.drillingDaysRequiredTooltip">
              <span className="label-text">
                {t('config.drillingDaysRequired')}
              </span>
            </InfoTooltip>
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
            className="input input-bordered w-full"
            disabled={isLoading}
          />
        </div>

        <div className="card-actions justify-end mt-auto">
          <button
            type="button"
            onClick={onGenerateSchedule}
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : null}
            {t('config.generateButton')}
          </button>
        </div>
      </div>
    </form>
  );
}
