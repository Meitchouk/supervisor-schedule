import { ScheduleConfigForm } from '../../components/forms';
import {
  ScheduleGrid,
  Legend,
  EmptySchedule,
  ScheduleGridSkeleton,
  LegendSkeleton,
} from '../../components/schedule';
import {
  ValidationSummary,
  ValidationSummarySkeleton,
} from '../../components/validation';
import { ExportButton } from '../../components/export';
import { ScheduleHistory } from '../../components/history';
import { useSchedule } from '../../context/ScheduleContext';
import { useLoading } from '../../context/LoadingContext';
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
  const { isLoading } = useLoading();

  return (
    <main className="flex-1 flex">
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
              {/* Export button - only shows when schedule exists */}
              {scheduleResult && !isLoading && (
                <div className="flex justify-end">
                  <ExportButton />
                </div>
              )}

              {isLoading ? (
                <>
                  <ScheduleGridSkeleton />
                  <LegendSkeleton />
                </>
              ) : scheduleResult ? (
                <>
                  <ScheduleGrid scheduleResult={scheduleResult} />
                  <Legend />
                </>
              ) : (
                <EmptySchedule />
              )}

              {isLoading ? (
                <ValidationSummarySkeleton />
              ) : (
                <ValidationSummary scheduleResult={scheduleResult} />
              )}

              {/* Schedule History */}
              <ScheduleHistory />
            </StackLayout>
          }
        />
      </ContentContainer>
    </main>
  );
}
