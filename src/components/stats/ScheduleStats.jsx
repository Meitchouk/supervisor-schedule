import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, ChevronDown, ChevronUp, PieChart } from 'lucide-react';
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { STATE, STATE_COLORS } from '../../features/scheduler/constants';

/**
 * ScheduleStats component
 * Displays statistics and charts for the generated schedule
 */
export default function ScheduleStats({ scheduleResult }) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!scheduleResult || !scheduleResult.days) {
    return null;
  }

  const { days } = scheduleResult;

  // Calculate days by state
  const stateCounts = {
    [STATE.UP]: 0,
    [STATE.INDUCTION]: 0,
    [STATE.DRILLING]: 0,
    [STATE.DOWN]: 0,
    [STATE.REST]: 0,
    [STATE.EMPTY]: 0,
  };

  const supervisorStats = {
    S1: { work: 0, off: 0 },
    S2: { work: 0, off: 0 },
    S3: { work: 0, off: 0 },
  };

  days.forEach((day) => {
    [day.s1, day.s2, day.s3].forEach((state, idx) => {
      const supervisor = `S${idx + 1}`;
      stateCounts[state]++;

      if (state !== STATE.EMPTY && state !== STATE.REST) {
        supervisorStats[supervisor].work++;
      } else if (state === STATE.REST) {
        supervisorStats[supervisor].off++;
      }
    });
  });

  // Data for pie chart (days by state)
  const pieData = [
    {
      name: t('schedule.states.up'),
      value: stateCounts[STATE.UP],
      color: STATE_COLORS[STATE.UP],
    },
    {
      name: t('schedule.states.induction'),
      value: stateCounts[STATE.INDUCTION],
      color: STATE_COLORS[STATE.INDUCTION],
    },
    {
      name: t('schedule.states.drilling'),
      value: stateCounts[STATE.DRILLING],
      color: STATE_COLORS[STATE.DRILLING],
    },
    {
      name: t('schedule.states.down'),
      value: stateCounts[STATE.DOWN],
      color: STATE_COLORS[STATE.DOWN],
    },
    {
      name: t('schedule.states.rest'),
      value: stateCounts[STATE.REST],
      color: STATE_COLORS[STATE.REST],
    },
  ].filter((item) => item.value > 0);

  // Data for bar chart (work vs off by supervisor)
  const barData = [
    {
      name: 'S1',
      [t('stats.workDays')]: supervisorStats.S1.work,
      [t('stats.offDays')]: supervisorStats.S1.off,
    },
    {
      name: 'S2',
      [t('stats.workDays')]: supervisorStats.S2.work,
      [t('stats.offDays')]: supervisorStats.S2.off,
    },
    {
      name: 'S3',
      [t('stats.workDays')]: supervisorStats.S3.work,
      [t('stats.offDays')]: supervisorStats.S3.off,
    },
  ];

  // Calculate efficiency metrics
  const totalDays = days.length;
  const totalWorkDays =
    supervisorStats.S1.work + supervisorStats.S2.work + supervisorStats.S3.work;
  const utilizationRate = ((totalWorkDays / (totalDays * 3)) * 100).toFixed(1);
  const drillingEfficiency = (
    (stateCounts[STATE.DRILLING] / totalWorkDays) *
    100
  ).toFixed(1);

  return (
    <div className="card bg-base-100 shadow-xl" data-tour="stats">
      <div className="card-body">
        {/* Header with toggle */}
        <div className="flex items-center justify-between">
          <h3 className="card-title text-lg flex items-center gap-2">
            <BarChart size={20} />
            {t('stats.title')}
          </h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-ghost btn-sm gap-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} />
                <span className="hidden sm:inline">{t('stats.hideStats')}</span>
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                <span className="hidden sm:inline">{t('stats.showStats')}</span>
              </>
            )}
          </button>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="space-y-6 mt-4">
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title text-xs">{t('stats.totalDays')}</div>
                <div className="stat-value text-2xl">{totalDays}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title text-xs">
                  {t('stats.utilizationRate')}
                </div>
                <div className="stat-value text-2xl">{utilizationRate}%</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title text-xs">{t('stats.workDays')}</div>
                <div className="stat-value text-2xl">{totalWorkDays}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title text-xs">
                  {t('stats.drillingEfficiency')}
                </div>
                <div className="stat-value text-2xl">{drillingEfficiency}%</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart - Days by State */}
              <div className="bg-base-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <PieChart size={16} />
                  {t('stats.byState')}
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPie>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart - Work vs Off by Supervisor */}
              <div className="bg-base-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <BarChart size={16} />
                  {t('stats.bySupervisor')}
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsBar data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey={t('stats.workDays')}
                      fill={STATE_COLORS[STATE.DRILLING]}
                    />
                    <Bar
                      dataKey={t('stats.offDays')}
                      fill={STATE_COLORS[STATE.REST]}
                    />
                  </RechartsBar>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
