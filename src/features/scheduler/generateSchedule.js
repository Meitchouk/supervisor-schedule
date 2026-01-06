import { STATE } from './constants.js';

function clampInt(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

function canPartitionWorkWindow(workDays, offDays) {
  // Can we write workDays as a sum of integers in [3..offDays]?
  // Greedy with small remainder fix; if it fails, return false.
  let remaining = workDays;

  while (remaining > 0) {
    let len = Math.min(offDays, remaining);

    const rem = remaining - len;
    if (rem === 1) len -= 2; // leave 3
    if (rem === 2) len -= 1; // leave 3

    if (len < 3) return false;

    remaining -= len;
  }

  return true;
}

function assertConfig({ workDays, offDays, inductionDays }) {
  if (inductionDays < 1 || inductionDays > 5) {
    throw new Error('inductionDays must be between 1 and 5.');
  }
  if (offDays < 3) {
    throw new Error('offDays must be >= 3 (DOWN + at least 1 REST + UP).');
  }
  if (workDays < 3) {
    throw new Error('workDays must be >= 3 for a feasible rotation.');
  }
  if (workDays - inductionDays < 2) {
    throw new Error(
      'workDays - inductionDays must be >= 2 to avoid 1-day drilling blocks.',
    );
  }
  if (!canPartitionWorkWindow(workDays, offDays)) {
    throw new Error(
      'Invalid configuration: cannot partition workDays into valid OFFSITE blocks.',
    );
  }
}

function buildS1Schedule({ totalDays, workDays, offDays, inductionDays }) {
  const restDays = offDays - 2; // OFFSITE block is DOWN + REST + UP = offDays
  const schedule = new Array(totalDays).fill(STATE.EMPTY);

  let day = 0;
  let isFirstCycle = true;

  while (day < totalDays) {
    schedule[day++] = STATE.UP;

    if (isFirstCycle) {
      for (let i = 0; i < inductionDays && day < totalDays; i++) {
        schedule[day++] = STATE.INDUCTION;
      }
    }

    // Document model: first cycle drillingDays = workDays - inductionDays
    // Later cycles: drillingDays = workDays
    const drillingDays = isFirstCycle ? workDays - inductionDays : workDays;

    for (let i = 0; i < drillingDays && day < totalDays; i++) {
      schedule[day++] = STATE.DRILLING;
    }

    if (day >= totalDays) break;

    schedule[day++] = STATE.DOWN;

    for (let i = 0; i < restDays && day < totalDays; i++) {
      schedule[day++] = STATE.REST;
    }

    isFirstCycle = false;
  }

  return schedule;
}

/**
 * Partition `workDays` into an array of integers in [3..offDays] summing to workDays.
 * Greedy with small remainder handling.
 */
function partitionWorkWindow(workDays, offDays) {
  const blocks = [];
  let remaining = workDays;

  while (remaining > 0) {
    let len = Math.min(offDays, remaining);

    const rem = remaining - len;
    if (rem === 1) len -= 2;
    if (rem === 2) len -= 1;

    if (len < 3)
      throw new Error(
        `Cannot partition workDays=${workDays}, offDays=${offDays}`,
      );

    blocks.push(len);
    remaining -= len;
  }

  return blocks;
}

/**
 * S1 drilling windows (cycles >= 1): [cycleStart+1 .. cycleStart+workDays] inclusive.
 * We partition each window into blocks of length [3..offDays] and assign them alternating to S2/S3.
 * Returns arrays of {startDay, offsiteLength} for each supervisor.
 */
function computeRotationOffsiteBlocks({ totalDays, workDays, offDays }) {
  const cycleDays = workDays + offDays;
  const s2Blocks = [];
  const s3Blocks = [];

  let nextDownSupervisor = 'S2';

  for (let k = 1; ; k++) {
    const windowStart = 1 + k * cycleDays; // first drilling day of S1 in cycle k
    const windowEnd = workDays + k * cycleDays; // last drilling day of S1 in cycle k

    if (windowStart >= totalDays) break;

    const windowLength = windowEnd - windowStart + 1;
    const blockLengths = partitionWorkWindow(windowLength, offDays);

    let currentDay = windowStart;
    for (const offsiteLength of blockLengths) {
      if (currentDay >= totalDays) break;

      const block = { startDay: currentDay, offsiteLength };

      if (nextDownSupervisor === 'S2') s2Blocks.push(block);
      else s3Blocks.push(block);

      nextDownSupervisor = nextDownSupervisor === 'S2' ? 'S3' : 'S2';
      currentDay += offsiteLength;
    }
  }

  return { s2Blocks, s3Blocks };
}

function fillFlexibleSupervisor({
  schedule,
  totalDays,
  entryDay,
  inductionDays,
  offsiteBlocks,
}) {
  let day = entryDay;
  let blockIndex = 0;

  const nextBlock = () =>
    blockIndex < offsiteBlocks.length ? offsiteBlocks[blockIndex] : null;

  if (day < totalDays) schedule[day++] = STATE.UP;

  // Induction only once (first entry)
  for (let i = 0; i < inductionDays && day < totalDays; i++) {
    schedule[day++] = STATE.INDUCTION;
  }

  while (day < totalDays) {
    const block = nextBlock();
    const stopAt = block ? Math.min(block.startDay, totalDays) : totalDays;

    while (day < stopAt) {
      schedule[day++] = STATE.DRILLING;
    }

    if (day >= totalDays || !block) break;

    const { offsiteLength } = block;
    const restDays = offsiteLength - 2;

    schedule[day++] = STATE.DOWN;

    for (let i = 0; i < restDays && day < totalDays; i++) {
      schedule[day++] = STATE.REST;
    }

    if (day >= totalDays) break;

    schedule[day++] = STATE.UP;
    blockIndex++;
  }
}

/**
 * @param {import('./types').ScheduleConfig} config
 * @returns {import('./types').ScheduleResult}
 */
export function generateSchedule(config) {
  const workDays = clampInt(config.workDays, 2, 3650);
  const offDays = clampInt(config.offDays, 3, 3650);
  const inductionDays = clampInt(config.inductionDays, 1, 5);
  const drillingDaysRequired = clampInt(config.drillingDaysRequired, 1, 200000);

  assertConfig({ workDays, offDays, inductionDays });

  const cycleDays = workDays + offDays;

  // Small, safe horizon even for 950+ days
  const totalDays =
    drillingDaysRequired + cycleDays * 6 + (1 + inductionDays) + 60;

  console.log('[GENERATE] Config:', {
    workDays,
    offDays,
    inductionDays,
    drillingDaysRequired,
    cycleDays,
    totalDays,
  });

  const s1Schedule = buildS1Schedule({
    totalDays,
    workDays,
    offDays,
    inductionDays,
  });
  const s2Schedule = new Array(totalDays).fill(STATE.EMPTY);
  const s3Schedule = new Array(totalDays).fill(STATE.EMPTY);

  // Align S3 so it starts DRILLING exactly when S1 hits first DOWN
  const s1FirstDownDay = 1 + workDays;
  const s3EntryDay = Math.max(0, s1FirstDownDay - inductionDays - 1);

  console.log('[GENERATE] Timing:', { s1FirstDownDay, s3EntryDay });

  const { s2Blocks, s3Blocks } = computeRotationOffsiteBlocks({
    totalDays,
    workDays,
    offDays,
  });

  console.log('[GENERATE] Offsite blocks calculated:', { s2Blocks, s3Blocks });

  // S2 enters from day 0
  fillFlexibleSupervisor({
    schedule: s2Schedule,
    totalDays,
    entryDay: 0,
    inductionDays,
    offsiteBlocks: s2Blocks,
  });

  // S3 enters later
  fillFlexibleSupervisor({
    schedule: s3Schedule,
    totalDays,
    entryDay: s3EntryDay,
    inductionDays,
    offsiteBlocks: s3Blocks,
  });

  const days = [];
  const drillingCountByDay = [];

  let daysWithTwoDrilling = 0;
  let firstDrillingDay = -1;

  for (let day = 0; day < totalDays; day++) {
    let drillingCount = 0;
    if (s1Schedule[day] === STATE.DRILLING) drillingCount++;
    if (s2Schedule[day] === STATE.DRILLING) drillingCount++;
    if (s3Schedule[day] === STATE.DRILLING) drillingCount++;

    if (firstDrillingDay === -1 && drillingCount > 0) firstDrillingDay = day;

    drillingCountByDay.push(drillingCount);

    if (drillingCount === 2) daysWithTwoDrilling++;

    days.push({
      dayNumber: day,
      s1: s1Schedule[day],
      s2: s2Schedule[day],
      s3: s3Schedule[day],
      drillingCount,
    });

    if (daysWithTwoDrilling >= drillingDaysRequired) {
      const finalDayIndex = day + 1;

      console.log('[GENERATE] Schedule complete:', {
        finalDayIndex,
        daysWithTwoDrilling,
        firstDrillingDay,
        days3Drilling: drillingCountByDay.filter((c) => c === 3).length,
        days1Drilling: drillingCountByDay.filter((c) => c === 1).length,
      });

      return {
        days: days.slice(0, finalDayIndex),
        supervisors: {
          S1: s1Schedule.slice(0, finalDayIndex),
          S2: s2Schedule.slice(0, finalDayIndex),
          S3: s3Schedule.slice(0, finalDayIndex),
        },
        drillingCountByDay: drillingCountByDay.slice(0, finalDayIndex),
        issues: [],
        totalDays: finalDayIndex,
        drillingDaysCompleted: daysWithTwoDrilling,
        firstDrillingDay,
      };
    }
  }

  return {
    days,
    supervisors: { S1: s1Schedule, S2: s2Schedule, S3: s3Schedule },
    drillingCountByDay,
    issues: [],
    totalDays,
    drillingDaysCompleted: daysWithTwoDrilling,
    firstDrillingDay,
  };
}
