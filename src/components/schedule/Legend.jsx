import { useTranslation } from 'react-i18next';
import { STATE_TO_LABEL } from '../../features/scheduler/constants';

/**
 * Legend component.
 * Displays color coding and abbreviations for schedule states using daisyUI.
 */
export default function Legend() {
  const { t } = useTranslation();
  const states = Object.keys(STATE_TO_LABEL);

  const getBadgeVariant = (state) => {
    switch (state) {
      case 'WORKING':
        return 'badge-success';
      case 'OFF':
        return 'badge-error';
      case 'INDUCTION':
        return 'badge-warning';
      default:
        return 'badge-neutral';
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">{t('legend.title')}</h3>
        <div className="flex flex-col gap-2">
          {states.map((state) => (
            <div
              key={state}
              className="flex items-center gap-3 p-2 rounded hover:bg-base-200 transition"
            >
              <div className={`badge ${getBadgeVariant(state)} badge-lg`} />
              <span className="text-sm font-medium">
                {STATE_TO_LABEL[state]} – {state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
