import { useTranslation } from 'react-i18next';
import { GitCompare, X } from 'lucide-react';
import { ScheduleConfigForm } from '../forms';
import { ScheduleGrid, Legend } from '../schedule';
import { useComparison } from '../../context/ComparisonContext';
import { useSchedule } from '../../context/ScheduleContext';

/**
 * ComparisonView component
 * Side-by-side comparison of two schedule configurations
 */
export default function ComparisonView() {
  const { t } = useTranslation();
  const {
    config: currentConfig,
    scheduleResult: currentResult,
    handleConfigChange,
    handleGenerateSchedule,
  } = useSchedule();
  const {
    isComparisonMode,
    toggleComparisonMode,
    comparisonConfig,
    updateComparisonConfig,
    comparisonResult,
    setComparisonScheduleResult,
  } = useComparison();

  if (!isComparisonMode) {
    return null;
  }

  const handleComparisonConfigChange = (field, value) => {
    updateComparisonConfig(field, value);
  };

  const handleGenerateComparison = async () => {
    // Import and generate schedule for comparison config
    const { generateSchedule } =
      await import('../../features/scheduler/generateSchedule');
    try {
      const result = generateSchedule(comparisonConfig);
      setComparisonScheduleResult(result);
    } catch (error) {
      console.error('Failed to generate comparison schedule:', error);
    }
  };

  // Calculate differences
  const getDifferences = () => {
    if (!currentResult || !comparisonResult) return [];

    const diffs = [];

    // Calculate stats for both configurations
    const calculateStats = (result) => {
      const { days } = result;
      let workDays = 0;
      let offDays = 0;
      let inductionDays = 0;
      let drillingDays = 0;
      let upDays = 0;
      let downDays = 0;

      // Per-supervisor stats
      const supervisorStats = {
        S1: { work: 0, off: 0, drilling: 0 },
        S2: { work: 0, off: 0, drilling: 0 },
        S3: { work: 0, off: 0, drilling: 0 },
      };

      days.forEach((day) => {
        [day.s1, day.s2, day.s3].forEach((state, idx) => {
          const supervisor = `S${idx + 1}`;

          if (state !== 'EMPTY' && state !== 'REST') {
            workDays++;
            supervisorStats[supervisor].work++;

            if (state === 'INDUCTION') inductionDays++;
            else if (state === 'DRILLING') {
              drillingDays++;
              supervisorStats[supervisor].drilling++;
            }
            else if (state === 'UP') upDays++;
            else if (state === 'DOWN') downDays++;
          } else if (state === 'REST') {
            offDays++;
            supervisorStats[supervisor].off++;
          }
        });
      });

      const utilizationRate = ((workDays / (days.length * 3)) * 100).toFixed(1);
      const drillingEfficiency = ((drillingDays / workDays) * 100).toFixed(1);

      return {
        totalDays: days.length,
        workDays,
        offDays,
        inductionDays,
        drillingDays,
        upDays,
        downDays,
        utilizationRate: parseFloat(utilizationRate),
        drillingEfficiency: parseFloat(drillingEfficiency),
        supervisorStats,
      };
    };

    const currentStats = calculateStats(currentResult);
    const comparisonStats = calculateStats(comparisonResult);

    // Total Days
    if (currentStats.totalDays !== comparisonStats.totalDays) {
      diffs.push({
        field: t('stats.totalDays'),
        current: currentStats.totalDays,
        comparison: comparisonStats.totalDays,
        diff: comparisonStats.totalDays - currentStats.totalDays,
        unit: t('comparison.days'),
      });
    }

    // Work Days
    diffs.push({
      field: t('stats.workDays'),
      current: currentStats.workDays,
      comparison: comparisonStats.workDays,
      diff: comparisonStats.workDays - currentStats.workDays,
      unit: t('comparison.days'),
    });

    // Off Days
    diffs.push({
      field: t('stats.offDays'),
      current: currentStats.offDays,
      comparison: comparisonStats.offDays,
      diff: comparisonStats.offDays - currentStats.offDays,
      unit: t('comparison.days'),
    });

    // Utilization Rate
    diffs.push({
      field: t('stats.utilizationRate'),
      current: `${currentStats.utilizationRate}%`,
      comparison: `${comparisonStats.utilizationRate}%`,
      diff: (comparisonStats.utilizationRate - currentStats.utilizationRate).toFixed(1),
      unit: '%',
      isPercentage: true,
    });

    // Drilling Efficiency
    diffs.push({
      field: t('stats.drillingEfficiency'),
      current: `${currentStats.drillingEfficiency}%`,
      comparison: `${comparisonStats.drillingEfficiency}%`,
      diff: (comparisonStats.drillingEfficiency - currentStats.drillingEfficiency).toFixed(1),
      unit: '%',
      isPercentage: true,
    });

    // Drilling Days
    diffs.push({
      field: t('comparison.drillingDays'),
      current: currentStats.drillingDays,
      comparison: comparisonStats.drillingDays,
      diff: comparisonStats.drillingDays - currentStats.drillingDays,
      unit: t('comparison.days'),
    });

    // Induction Days
    diffs.push({
      field: t('comparison.inductionDays'),
      current: currentStats.inductionDays,
      comparison: comparisonStats.inductionDays,
      diff: comparisonStats.inductionDays - currentStats.inductionDays,
      unit: t('comparison.days'),
    });

    // Travel Days (Up + Down)
    const currentTravelDays = currentStats.upDays + currentStats.downDays;
    const comparisonTravelDays = comparisonStats.upDays + comparisonStats.downDays;
    diffs.push({
      field: t('comparison.travelDays'),
      current: currentTravelDays,
      comparison: comparisonTravelDays,
      diff: comparisonTravelDays - currentTravelDays,
      unit: t('comparison.days'),
    });

    // Per-supervisor comparisons
    ['S1', 'S2', 'S3'].forEach((supervisor) => {
      const currentSup = currentStats.supervisorStats[supervisor];
      const comparisonSup = comparisonStats.supervisorStats[supervisor];

      // Work days per supervisor
      diffs.push({
        field: `${supervisor} - ${t('stats.workDays')}`,
        current: currentSup.work,
        comparison: comparisonSup.work,
        diff: comparisonSup.work - currentSup.work,
        unit: t('comparison.days'),
        category: 'supervisor',
      });

      // Off days per supervisor
      diffs.push({
        field: `${supervisor} - ${t('stats.offDays')}`,
        current: currentSup.off,
        comparison: comparisonSup.off,
        diff: comparisonSup.off - currentSup.off,
        unit: t('comparison.days'),
        category: 'supervisor',
      });

      // Drilling days per supervisor
      diffs.push({
        field: `${supervisor} - ${t('comparison.drillingDays')}`,
        current: currentSup.drilling,
        comparison: comparisonSup.drilling,
        diff: comparisonSup.drilling - currentSup.drilling,
        unit: t('comparison.days'),
        category: 'supervisor',
      });
    });

    return diffs;
  };

  const differences = getDifferences();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GitCompare size={24} />
            {t('comparison.title')}
          </h2>
          <button
            onClick={toggleComparisonMode}
            className="btn btn-ghost btn-sm gap-2"
          >
            <X size={16} />
            {t('comparison.disable')}
          </button>
        </div>

        {/* Two-column layout for comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Configuration */}
          <div className="space-y-4">
            <div className="badge badge-primary">{t('comparison.current')}</div>
            <ScheduleConfigForm
              config={currentConfig}
              onConfigChange={handleConfigChange}
              onGenerateSchedule={handleGenerateSchedule}
            />
            {currentResult && (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <ScheduleGrid scheduleResult={currentResult} config={currentConfig} />
                  <Legend />
                </div>
              </div>
            )}
          </div>

          {/* Comparison Configuration */}
          <div className="space-y-4">
            <div className="badge badge-secondary">
              {t('comparison.compare')}
            </div>
            <ScheduleConfigForm
              config={comparisonConfig}
              onConfigChange={handleComparisonConfigChange}
              onGenerateSchedule={handleGenerateComparison}
            />
            {comparisonResult && (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <ScheduleGrid scheduleResult={comparisonResult} config={comparisonConfig} />
                  <Legend />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Differences Summary */}
        {differences.length > 0 && (
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <h3 className="card-title">{t('comparison.differences')}</h3>

              {/* General Metrics */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">{t('comparison.generalMetrics')}</h4>
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Métrica</th>
                        <th>Actual</th>
                        <th>Comparación</th>
                        <th>Diferencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {differences.filter(d => !d.category).map((diff, index) => (
                        <tr key={index}>
                          <td>{diff.field}</td>
                          <td className="font-mono">{diff.current}</td>
                          <td className="font-mono">{diff.comparison}</td>
                          <td
                            className={`font-mono font-semibold ${
                              diff.isPercentage || diff.field === t('stats.drillingEfficiency') || diff.field === t('stats.utilizationRate')
                                ? parseFloat(diff.diff) > 0 ? 'text-success' : 'text-error'
                                : diff.field === t('stats.totalDays') || diff.field === t('comparison.travelDays')
                                ? parseFloat(diff.diff) < 0 ? 'text-success' : 'text-error'
                                : parseFloat(diff.diff) > 0 ? 'text-success' : 'text-error'
                            }`}
                          >
                            {parseFloat(diff.diff) > 0 ? '+' : ''}
                            {diff.diff}
                            {diff.unit && !diff.isPercentage ? ` ${diff.unit}` : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Per-Supervisor Metrics */}
              <div>
                <h4 className="font-semibold text-sm mb-2">{t('comparison.supervisorMetrics')}</h4>
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Supervisor - Métrica</th>
                        <th>Actual</th>
                        <th>Comparación</th>
                        <th>Diferencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {differences.filter(d => d.category === 'supervisor').map((diff, index) => (
                        <tr key={index}>
                          <td className="text-sm">{diff.field}</td>
                          <td className="font-mono">{diff.current}</td>
                          <td className="font-mono">{diff.comparison}</td>
                          <td
                            className={`font-mono font-semibold ${
                              parseFloat(diff.diff) === 0
                                ? 'text-base-content/50'
                                : diff.field.includes(t('stats.workDays')) || diff.field.includes(t('comparison.drillingDays'))
                                ? parseFloat(diff.diff) > 0 ? 'text-success' : 'text-error'
                                : parseFloat(diff.diff) < 0 ? 'text-success' : 'text-error'
                            }`}
                          >
                            {parseFloat(diff.diff) > 0 ? '+' : ''}
                            {diff.diff}
                            {diff.unit ? ` ${diff.unit}` : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {differences.length === 0 && currentResult && comparisonResult && (
          <div className="alert alert-info mt-6">
            <span>{t('comparison.noDifferences')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
