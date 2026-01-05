import { useTranslation } from 'react-i18next';
import { ScheduleConfigForm } from '../../components/forms';
import { ScheduleGrid, Legend } from '../../components/schedule';
import { ValidationSummary } from '../../components/validation';

/**
 * Body component.
 * Main content area with schedule configuration and display.
 */
export default function Body({
  config,
  onConfigChange,
  scheduleResult,
  onGenerateSchedule,
}) {
  const { t } = useTranslation();

  return (
    <main className="app-body">
      <div className="app-content">
        <aside className="config-panel">
          <ScheduleConfigForm
            config={config}
            onConfigChange={onConfigChange}
            onGenerateSchedule={onGenerateSchedule}
          />
        </aside>

        <section className="main-area">
          <section className="schedule-section">
            {scheduleResult ? (
              <>
                <ScheduleGrid scheduleResult={scheduleResult} />
                <Legend />
              </>
            ) : (
              <div className="empty-state">
                <p>{t('schedule.empty')}</p>
                <p className="empty-state-hint">{t('schedule.emptyHint')}</p>
              </div>
            )}
          </section>

          <section className="validation-section">
            <ValidationSummary scheduleResult={scheduleResult} />
          </section>
        </section>
      </div>
    </main>
  );
}
