import { ScheduleConfigForm } from '../../components/forms';
import { ScheduleGrid, Legend, EmptySchedule } from '../../components/schedule';
import { ValidationSummary } from '../../components/validation';
import { useSchedule } from '../../context/ScheduleContext';
import ContentContainer from './ContentContainer';
import TwoColumnLayout from './TwoColumnLayout';
import StackLayout from './StackLayout';

/**
 * Body component.
 * Main content area composed with predefined layouts.
 * Components adapt to the layout structure.
 */
export default function Body() {
  const { config, scheduleResult, handleConfigChange, handleGenerateSchedule } =
    useSchedule();

  return (
    <main className="flex-1">
      <ContentContainer>
        <TwoColumnLayout
          sidebar={
            <ScheduleConfigForm
              config={config}
              onConfigChange={handleConfigChange}
              onGenerateSchedule={handleGenerateSchedule}
            />
          }
          main={
            <StackLayout>
              {scheduleResult ? (
                <>
                  <ScheduleGrid scheduleResult={scheduleResult} />
                  <Legend />
                </>
              ) : (
                <EmptySchedule />
              )}

              <ValidationSummary scheduleResult={scheduleResult} />
            </StackLayout>
          }
        />
      </ContentContainer>
    </main>
  );
}
