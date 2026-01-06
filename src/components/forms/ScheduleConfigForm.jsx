import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InfoTooltip } from '../../components/ui';
import { useLoading } from '../../context/LoadingContext';

export default function ScheduleConfigForm({
  config,
  onConfigChange,
  onGenerateSchedule,
}) {
  const { t } = useTranslation();
  const { isLoading } = useLoading();

  const schema = z.object({
    workDays: z
      .number({
        required_error: t('config.errors.required'),
        invalid_type_error: t('config.errors.mustBeInteger'),
      })
      .int(t('config.errors.mustBeInteger'))
      .min(1, t('config.errors.workDaysMin'))
      .max(31, t('config.errors.workDaysMax')),
    offDays: z
      .number({
        required_error: t('config.errors.required'),
        invalid_type_error: t('config.errors.mustBeInteger'),
      })
      .int(t('config.errors.mustBeInteger'))
      .min(1, t('config.errors.offDaysMin'))
      .max(31, t('config.errors.offDaysMax')),
    inductionDays: z
      .number({
        required_error: t('config.errors.required'),
        invalid_type_error: t('config.errors.mustBeInteger'),
      })
      .int(t('config.errors.mustBeInteger'))
      .min(1, t('config.errors.inductionDaysMin'))
      .max(5, t('config.errors.inductionDaysMax')),
    drillingDaysRequired: z
      .number({
        required_error: t('config.errors.required'),
        invalid_type_error: t('config.errors.mustBeInteger'),
      })
      .int(t('config.errors.mustBeInteger'))
      .min(1, t('config.errors.drillingDaysMin'))
      .max(1000, t('config.errors.drillingDaysMax')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: config,
    mode: 'onChange',
  });

  const handleInputChange = (field, value) => {
    if (value === '') {
      setValue(field, undefined, { shouldValidate: false });
      onConfigChange(field, '');
      return;
    }

    const numValue = parseInt(value, 10);
    if (!Number.isNaN(numValue)) {
      setValue(field, numValue, { shouldValidate: true });
      onConfigChange(field, numValue);
    }
  };

  const onSubmit = () => {
    onGenerateSchedule();
  };

  return (
    <form
      className="card bg-base-100 shadow-xl w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="card-body flex flex-col gap-4">
        <h2 className="card-title font-bold">{t('config.title')}</h2>

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
            {...register('workDays', { valueAsNumber: true })}
            value={config.workDays}
            onChange={(e) => handleInputChange('workDays', e.target.value)}
            className={`input text-right pr-10 w-full ${
              errors.workDays ? 'input-error' : ''
            }`}
            placeholder="1-31"
            title="Must be between 1 to 31"
            disabled={isLoading}
          />
          {errors.workDays && (
            <p className="text-error text-sm mt-1">{errors.workDays.message}</p>
          )}
        </fieldset>

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
            {...register('offDays', { valueAsNumber: true })}
            value={config.offDays}
            onChange={(e) => handleInputChange('offDays', e.target.value)}
            className={`input text-right pr-10 w-full ${
              errors.offDays ? 'input-error' : ''
            }`}
            placeholder="1-31"
            title="Must be between 1 to 31"
            disabled={isLoading}
          />
          {errors.offDays && (
            <p className="text-error text-sm mt-1">{errors.offDays.message}</p>
          )}
        </fieldset>

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
            {...register('inductionDays', { valueAsNumber: true })}
            value={config.inductionDays}
            onChange={(e) => handleInputChange('inductionDays', e.target.value)}
            className={`input text-right pr-10 w-full ${
              errors.inductionDays ? 'input-error' : ''
            }`}
            placeholder="1-5"
            title="Must be between 1 to 5"
            disabled={isLoading}
          />
          {errors.inductionDays && (
            <p className="text-error text-sm mt-1">
              {errors.inductionDays.message}
            </p>
          )}
        </fieldset>

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
            max="1000"
            {...register('drillingDaysRequired', { valueAsNumber: true })}
            value={config.drillingDaysRequired}
            onChange={(e) =>
              handleInputChange('drillingDaysRequired', e.target.value)
            }
            className={`input text-right pr-10 w-full ${
              errors.drillingDaysRequired ? 'input-error' : ''
            }`}
            placeholder="1-1000"
            title="Must be between 1 to 1000"
            disabled={isLoading}
          />
          {errors.drillingDaysRequired && (
            <p className="text-error text-sm mt-1">
              {errors.drillingDaysRequired.message}
            </p>
          )}
        </fieldset>

        <div className="card-actions align-middle mt-auto flex justify-center">
          <button
            type="submit"
            className="btn btn-primary w-auto px-5"
            disabled={isLoading || !isValid}
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
