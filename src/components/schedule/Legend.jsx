import { useTranslation } from 'react-i18next';
import { STATE_TO_LABEL } from '../../features/scheduler/constants';

/**
 * Legend component.
 * Displays color coding and abbreviations for schedule states using daisyUI.
 */
export default function Legend() {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-lg">{t('schedule.legend')}</h3>
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-info badge-sm">
            [ {STATE_TO_LABEL['UP']} ] - {t('schedule.states.up')}
          </span>
          <span className="badge badge-warning badge-sm">
            [ {STATE_TO_LABEL['INDUCTION']} ] - {t('schedule.states.induction')}
          </span>
          <span className="badge badge-success badge-sm">
            [ {STATE_TO_LABEL['DRILLING']} ] - {t('schedule.states.drilling')}
          </span>
          <span className="badge badge-error badge-sm">
            [ {STATE_TO_LABEL['DOWN']} ] - {t('schedule.states.down')}
          </span>
          <span className="badge badge-ghost badge-sm">
            [ {STATE_TO_LABEL['REST']} ] - {t('schedule.states.rest')}
          </span>
          <span className="badge badge-sm bg-white text-neutral-content border border-base-300">
            [ {STATE_TO_LABEL['EMPTY']} ] - {t('schedule.states.empty')}
          </span>
        </div>
      </div>
    </div>
  );
}
