import { STATE } from './constants.js';

function findFirstDrillingDay(drillingCountByDay) {
  for (let i = 0; i < drillingCountByDay.length; i++) {
    if (drillingCountByDay[i] > 0) return i;
  }
  return -1;
}

function findS3EntryDay(days) {
  for (let i = 0; i < days.length; i++) {
    if (days[i].s3 !== STATE.EMPTY) return i;
  }
  return -1;
}

function findS3DrillingStartDay(days) {
  for (let i = 0; i < days.length; i++) {
    if (days[i].s3 === STATE.DRILLING) return i;
  }
  return -1;
}

/**
 * @param {import('./types').ScheduleResult} scheduleResult
 * @returns {{issues: import('./types').ScheduleIssue[], hasErrors: boolean}}
 */
export function validateSchedule(scheduleResult) {
  const issues = [];
  const { days, supervisors, drillingCountByDay } = scheduleResult;

  console.log('[VALIDATE] Starting validation for', days?.length, 'days');

  if (!days || days.length === 0) {
    return {
      issues: [
        {
          severity: 'error',
          message: 'No schedule generated',
          code: 'EMPTY_SCHEDULE',
        },
      ],
      hasErrors: true,
    };
  }

  const firstDrillingDay =
    Number.isInteger(scheduleResult.firstDrillingDay) &&
    scheduleResult.firstDrillingDay >= 0
      ? scheduleResult.firstDrillingDay
      : findFirstDrillingDay(drillingCountByDay);

  const s3EntryDay = findS3EntryDay(days);
  const s3DrillingStartDay = findS3DrillingStartDay(days);

  console.log('[VALIDATE] Key days:', {
    firstDrillingDay,
    s3EntryDay,
    s3DrillingStartDay,
  });

  // Rule 1: NEVER 3 drilling (always)
  const days3Drilling = [];
  for (let i = 0; i < drillingCountByDay.length; i++) {
    if (drillingCountByDay[i] > 2) {
      days3Drilling.push(i);
      issues.push({
        severity: 'error',
        message: `Day ${i}: ${drillingCountByDay[i]} supervisors drilling (must be exactly 2)`,
        code: 'THREE_DRILLING',
        day: i,
      });
    }
  }

  if (days3Drilling.length > 0) {
    console.log('[VALIDATE] Days with 3 drilling:', days3Drilling);
  } else {
    issues.push({
      severity: 'info',
      message: 'validation.rules.noThreeDrilling',
      code: 'RULE_NO_THREE_DRILLING_PASSED',
    });
  }

  // Rule 2: Once drilling starts, ALWAYS exactly 2 drilling
  let rule2Violations = 0;
  if (firstDrillingDay >= 0) {
    for (let i = firstDrillingDay; i < drillingCountByDay.length; i++) {
      if (drillingCountByDay[i] !== 2) {
        rule2Violations++;
        issues.push({
          severity: 'error',
          message: `Day ${i}: ${drillingCountByDay[i]} supervisors drilling (must be exactly 2)`,
          code: 'NOT_EXACTLY_TWO',
          day: i,
        });
      }
    }
  }

  if (rule2Violations === 0) {
    issues.push({
      severity: 'info',
      message: 'validation.rules.alwaysTwoDrilling',
      code: 'RULE_EXACTLY_TWO_PASSED',
    });
  }

  // Rule 3: After S3 entry, never allow only 1 drilling
  let rule3Violations = 0;
  if (s3EntryDay >= 0) {
    for (let i = s3EntryDay; i < drillingCountByDay.length; i++) {
      if (drillingCountByDay[i] === 1) {
        rule3Violations++;
        issues.push({
          severity: 'error',
          message: `Day ${i}: Only 1 supervisor drilling after S3 entry`,
          code: 'ONE_DRILLING_AFTER_S3_ENTRY',
          day: i,
        });
      }
    }
  }

  if (rule3Violations === 0 && s3EntryDay >= 0) {
    issues.push({
      severity: 'info',
      message: 'validation.rules.noOneDrillingAfterS3',
      code: 'RULE_NO_ONE_DRILLING_AFTER_S3_PASSED',
    });
  }

  // Transition validation (keep yours + add 2 missing invalid patterns)
  let transitionViolations = 0;
  ['S1', 'S2', 'S3'].forEach((supId) => {
    const schedule = supervisors[supId];
    if (!Array.isArray(schedule)) return;

    let seenNonEmpty = false;
    let inductionBlocks = 0;
    let inInduction = false;

    for (let i = 0; i < schedule.length - 1; i++) {
      const current = schedule[i];
      const next = schedule[i + 1];

      if (current !== STATE.EMPTY) seenNonEmpty = true;
      if (seenNonEmpty && next === STATE.EMPTY) {
        transitionViolations++;
        issues.push({
          severity: 'error',
          message: `${supId} Day ${i + 1}: Returned to EMPTY after being active`,
          code: 'INVALID_RETURN_TO_EMPTY',
          supervisor: supId,
          day: i + 1,
        });
      }

      // Track induction blocks (should happen at most once)
      if (current === STATE.INDUCTION && !inInduction) {
        inductionBlocks++;
        inInduction = true;
      }
      if (current !== STATE.INDUCTION && inInduction) {
        inInduction = false;
      }
      if (inductionBlocks > 1) {
        transitionViolations++;
        issues.push({
          severity: 'error',
          message: `${supId} Day ${i}: Induction appears more than once`,
          code: 'MULTIPLE_INDUCTION_BLOCKS',
          supervisor: supId,
          day: i,
        });
        inductionBlocks = 1; // prevent spamming
      }

      if (current === STATE.EMPTY) continue;

      // Invalid: UP -> UP
      if (current === STATE.UP && next === STATE.UP) {
        transitionViolations++;
        issues.push({
          severity: 'error',
          message: `${supId} Day ${i}-${i + 1}: Invalid UP -> UP transition`,
          code: 'INVALID_TRANSITION_UP_UP',
          supervisor: supId,
          day: i,
        });
      }

      // Invalid: UP -> DOWN (no work)
      if (current === STATE.UP && next === STATE.DOWN) {
        transitionViolations++;
        issues.push({
          severity: 'error',
          message: `${supId} Day ${i}-${i + 1}: Invalid UP -> DOWN transition (no work)`,
          code: 'INVALID_TRANSITION_UP_DOWN',
          supervisor: supId,
          day: i,
        });
      }

      // Invalid: UP -> REST (missing work)
      if (current === STATE.UP && next === STATE.REST) {
        transitionViolations++;
        issues.push({
          severity: 'error',
          message: `${supId} Day ${i}-${i + 1}: Invalid UP -> REST transition`,
          code: 'INVALID_TRANSITION_UP_REST',
          supervisor: supId,
          day: i,
        });
      }

      // Invalid: DOWN -> UP (no rest)
      if (current === STATE.DOWN && next === STATE.UP) {
        transitionViolations++;
        issues.push({
          severity: 'error',
          message: `${supId} Day ${i}-${i + 1}: DOWN -> UP without rest days`,
          code: 'NO_REST_PERIOD',
          supervisor: supId,
          day: i,
        });
      }

      // Invalid: DOWN -> DRILLING (no rest)
      if (current === STATE.DOWN && next === STATE.DRILLING) {
        transitionViolations++;
        issues.push({
          severity: 'error',
          message: `${supId} Day ${i}-${i + 1}: DOWN -> DRILLING without rest days`,
          code: 'DOWN_TO_DRILLING_NO_REST',
          supervisor: supId,
          day: i,
        });
      }

      // Warning: drilling block length = 1 day
      if (current === STATE.DRILLING && next === STATE.DOWN) {
        let drillingDays = 1;
        let checkDay = i - 1;
        while (checkDay >= 0 && schedule[checkDay] === STATE.DRILLING) {
          drillingDays++;
          checkDay--;
        }
        if (drillingDays === 1) {
          issues.push({
            severity: 'warning',
            message: `${supId} Day ${i}: Only 1 day of drilling before going down`,
            code: 'SHORT_DRILLING_CYCLE',
            supervisor: supId,
            day: i,
          });
        }
      }
    }
  });

  if (transitionViolations === 0) {
    issues.push({
      severity: 'info',
      message: 'validation.rules.validTransitions',
      code: 'RULE_VALID_TRANSITIONS_PASSED',
    });
  }

  // Info: days with exactly 2 drilling
  let totalTwoDrillingDays = 0;
  for (const count of drillingCountByDay) {
    if (count === 2) totalTwoDrillingDays++;
  }

  issues.push({
    severity: 'info',
    message: 'validation.rules.totalDrillingDays',
    code: 'TWO_DRILLING_DAYS_INFO',
    count: totalTwoDrillingDays,
  });

  const hasErrors = issues.some((issue) => issue.severity === 'error');

  console.log('[VALIDATE] Validation complete:', {
    totalIssues: issues.length,
    errors: issues.filter((i) => i.severity === 'error').length,
    warnings: issues.filter((i) => i.severity === 'warning').length,
    hasErrors,
  });

  return { issues, hasErrors };
}
