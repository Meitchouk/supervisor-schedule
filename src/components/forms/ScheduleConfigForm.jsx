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
      className="card bg-base-100 shadow-xl h-auto w-auto inline-block"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="card-body flex flex-col gap-4">
        <h2 className="card-title font-bold">{t('config.title')}</h2>

        {/* MARK: Work Days */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            <InfoTooltip tooltipKey="config.workDaysTooltip">
              <span>{t('config.workDays')}</span>
            </InfoTooltip>
          </legend>
          <input
            id="workDays"
            type="number"
            min="1"
            max="31"
            value={config.workDays}
            onChange={(e) => handleInputChange('workDays', e.target.value)}
            className="input"
            disabled={isLoading}
            required
          />
        </fieldset>

        {/* MARK: Off Days */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            <InfoTooltip tooltipKey="config.offDaysTooltip">
              <span>{t('config.offDays')}</span>
            </InfoTooltip>
          </legend>
          <input
            id="offDays"
            type="number"
            min="1"
            max="31"
            value={config.offDays}
            onChange={(e) => handleInputChange('offDays', e.target.value)}
            className="input"
            disabled={isLoading}
            required
          />
        </fieldset>

        {/* MARK: Induction Days */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            <InfoTooltip tooltipKey="config.inductionDaysTooltip">
              <span>{t('config.inductionDays')}</span>
            </InfoTooltip>
          </legend>
          <input
            id="inductionDays"
            type="number"
            min="1"
            max="5"
            value={config.inductionDays}
            onChange={(e) => handleInputChange('inductionDays', e.target.value)}
            className="input"
            disabled={isLoading}
            required
          />
        </fieldset>

        {/* MARK: Drilling Days Required */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            <InfoTooltip tooltipKey="config.drillingDaysRequiredTooltip">
              <span>{t('config.drillingDaysRequired')}</span>
            </InfoTooltip>
          </legend>
          <input
            id="drillingDaysRequired"
            type="number"
            min="1"
            max="365"
            value={config.drillingDaysRequired}
            onChange={(e) =>
              handleInputChange('drillingDaysRequired', e.target.value)
            }
            className="input"
            disabled={isLoading}
            required
          />
        </fieldset>

        {/* MARK: Generate Schedule Button */}
        <div className="card-actions align-middle mt-auto flex justify-center">
          <button
            type="button"
            onClick={onGenerateSchedule}
            className="btn btn-primary w-auto px-5"
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
