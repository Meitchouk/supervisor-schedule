import { useTranslation } from 'react-i18next';

/**
 * ScheduleGridSkeleton component.
 * Skeleton loader for ScheduleGrid while generating the schedule.
 */
export default function ScheduleGridSkeleton() {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{t('schedule.title')}</h2>

        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th className="bg-base-200">
                  <div className="skeleton h-4 w-20"></div>
                </th>
                {[...Array(15)].map((_, i) => (
                  <th key={i} className="text-center">
                    <div className="skeleton h-4 w-8 mx-auto"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Supervisor rows skeleton */}
              {['S1', 'S2', 'S3'].map((supervisor) => (
                <tr key={supervisor}>
                  <td className="font-bold bg-base-200">
                    <div className="skeleton h-4 w-8"></div>
                  </td>
                  {[...Array(15)].map((_, i) => (
                    <td key={i} className="text-center p-1">
                      <div className="skeleton h-8 w-12 mx-auto rounded-badge"></div>
                    </td>
                  ))}
                </tr>
              ))}
              {/* Drilling count row skeleton */}
              <tr className="border-t-2 border-base-300">
                <td className="font-bold bg-base-200">
                  <div className="skeleton h-4 w-16"></div>
                </td>
                {[...Array(15)].map((_, i) => (
                  <td key={i} className="text-center">
                    <div className="skeleton h-6 w-6 mx-auto rounded-full"></div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
