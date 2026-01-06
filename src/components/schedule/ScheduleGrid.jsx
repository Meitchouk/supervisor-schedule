import { useTranslation } from 'react-i18next';

/**
 * ScheduleGrid component.
 * Displays the generated schedule in a grid/table format using daisyUI.
 */
export default function ScheduleGrid({ scheduleResult }) {
  const { t } = useTranslation();

  const getStateBadgeVariant = (state) => {
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

  if (
    !scheduleResult ||
    !scheduleResult.days ||
    scheduleResult.days.length === 0
  ) {
    return null;
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{t('schedule.title')}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>{t('schedule.day')}</th>
                <th>{t('schedule.state')}</th>
              </tr>
            </thead>
            <tbody>
              {scheduleResult.days.map((day, index) => (
                <tr key={index}>
                  <td>{day.dayNumber}</td>
                  <td>
                    <span
                      className={`badge ${getStateBadgeVariant(day.state)}`}
                    >
                      {day.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
