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
        <ul className="menu menu-compact">
          {states.map((state) => (
            <li key={state}>
              <div className="flex">
                <div className={`badge ${getBadgeVariant(state)} badge-lg`} />
                <span>
                  {STATE_TO_LABEL[state]} – {state}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
