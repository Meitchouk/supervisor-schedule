import { useTranslation } from 'react-i18next';
import {
  STATE_TO_LABEL,
  getStateBadgeClass,
} from '../../features/scheduler/constants';

/**
 * ScheduleGrid component.
 * Displays the generated schedule in a grid/table format using daisyUI.
 * Shows 3 supervisor rows + drilling count row.
 */
export default function ScheduleGrid({ scheduleResult }) {
  const { t } = useTranslation();

  if (
    !scheduleResult ||
    !scheduleResult.days ||
    scheduleResult.days.length === 0
  ) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{t('schedule.title')}</h2>
          <div className="empty-state">
            <p>{t('schedule.noData')}</p>
          </div>
        </div>
      </div>
    );
  }

  const { days, drillingCountByDay } = scheduleResult;

  // Find when S3 becomes active (for validation context)
  let s3ActiveDay = days.findIndex((d) => d.s3 !== 'EMPTY');

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{t('schedule.title')}</h2>

        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th className="bg-base-200">{t('schedule.supervisor')}</th>
                {days.map((day) => (
                  <th key={day.dayNumber} className="text-center">
                    {day.dayNumber}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Supervisor 1 Row */}
              <tr>
                <th className="bg-base-200">S1</th>
                {days.map((day) => (
                  <td key={`s1-${day.dayNumber}`} className="text-center p-1">
                    <span
                      className={`badge badge-sm ${getStateBadgeClass(day.s1)}`}
                    >
                      {STATE_TO_LABEL[day.s1]}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Supervisor 2 Row */}
              <tr>
                <th className="bg-base-200">S2</th>
                {days.map((day) => (
                  <td key={`s2-${day.dayNumber}`} className="text-center p-1">
                    <span
                      className={`badge badge-sm ${getStateBadgeClass(day.s2)}`}
                    >
                      {STATE_TO_LABEL[day.s2]}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Supervisor 3 Row */}
              <tr>
                <th className="bg-base-200">S3</th>
                {days.map((day) => (
                  <td key={`s3-${day.dayNumber}`} className="text-center p-1">
                    <span
                      className={`badge badge-sm ${getStateBadgeClass(day.s3)}`}
                    >
                      {STATE_TO_LABEL[day.s3]}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Drilling Count Row */}
              <tr className="font-bold">
                <th className="bg-base-200">#P</th>
                {drillingCountByDay.map((count, index) => {
                  const isError =
                    s3ActiveDay >= 0 && index >= s3ActiveDay && count !== 2;

                  return (
                    <td
                      key={`count-${index}`}
                      className={`text-center p-1 ${isError ? 'bg-error text-error-content' : ''}`}
                    >
                      {count}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
