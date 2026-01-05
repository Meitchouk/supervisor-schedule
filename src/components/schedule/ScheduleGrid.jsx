import { useTranslation } from 'react-i18next';

/**
 * ScheduleGrid component.
 * Displays the generated schedule in a grid/table format using daisyUI.
 */
export default function ScheduleGrid({ scheduleResult }) {
  const { t } = useTranslation();

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
                      className={`badge ${
                        day.state === 'WORKING'
                          ? 'badge-success'
                          : day.state === 'OFF'
                            ? 'badge-error'
                            : 'badge-warning'
                      }`}
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
