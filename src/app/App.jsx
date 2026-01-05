import { useState } from 'react';

import AppShell from './layout/AppShell';
import ScheduleConfigForm from '../components/ScheduleConfigForm';
import ScheduleGrid from '../components/ScheduleGrid';
import Legend from '../components/Legend';
import ValidationSummary from '../components/ValidationSummary';

/**
 * Main application component.
 * Manages form state and schedule generation placeholder.
 */
export default function App() {
  const [config, setConfig] = useState({
    workDays: 5,
    offDays: 2,
    inductionDays: 1,
    drillingDaysRequired: 10,
  });

  const [scheduleResult, setScheduleResult] = useState(null);

  const handleConfigChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateSchedule = () => {
    // TODO: Implement schedule generation logic
    console.log('Generate schedule with config:', config);
    setScheduleResult(null);
  };

  return (
    <AppShell>
      <div className="app-container">
        <header className="app-header">
          <h1>Supervisor Schedule</h1>
          <p className="subtitle">Schedule generation and validation tool</p>
        </header>

        <div className="app-content">
          <aside className="config-panel">
            <ScheduleConfigForm
              config={config}
              onConfigChange={handleConfigChange}
              onGenerateSchedule={handleGenerateSchedule}
            />
          </aside>

          <main className="main-area">
            <section className="schedule-section">
              {scheduleResult ? (
                <>
                  <ScheduleGrid scheduleResult={scheduleResult} />
                  <Legend />
                </>
              ) : (
                <div className="empty-state">
                  <p>No schedule generated yet.</p>
                  <p className="empty-state-hint">
                    Configure parameters and click &quot;Generate Schedule&quot;
                    to begin.
                  </p>
                </div>
              )}
            </section>

            <section className="validation-section">
              <ValidationSummary scheduleResult={scheduleResult} />
            </section>
          </main>
        </div>
      </div>
    </AppShell>
  );
}
