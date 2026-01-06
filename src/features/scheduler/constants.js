/**
 * Schedule state constants and mappings.
 */

/**
 * Schedule state types.
 */
const STATE = {
  UP: 'UP',
  INDUCTION: 'INDUCTION',
  DRILLING: 'DRILLING',
  DOWN: 'DOWN',
  REST: 'REST',
  EMPTY: 'EMPTY',
};

/**
 * Map state to short label displayed in the schedule.
 */
const STATE_TO_LABEL = {
  [STATE.UP]: 'S',
  [STATE.INDUCTION]: 'I',
  [STATE.DRILLING]: 'P',
  [STATE.DOWN]: 'B',
  [STATE.REST]: 'D',
  [STATE.EMPTY]: '-',
};

/**
 * Map state to CSS class for styling.
 */
const STATE_TO_COLOR_CLASS = {
  [STATE.UP]: 'state-up',
  [STATE.INDUCTION]: 'state-induction',
  [STATE.DRILLING]: 'state-drilling',
  [STATE.DOWN]: 'state-down',
  [STATE.REST]: 'state-rest',
  [STATE.EMPTY]: 'state-empty',
};

/**
 * Map state to daisyUI badge class for styling.
 */
const STATE_TO_BADGE_CLASS = {
  [STATE.UP]: 'badge-info', // Blue - Travel Up
  [STATE.INDUCTION]: 'badge-warning', // Yellow - Induction
  [STATE.DRILLING]: 'badge-success', // Green - Drilling
  [STATE.DOWN]: 'badge-error', // Red - Travel Down
  [STATE.REST]: 'badge-ghost', // Gray - Rest
  [STATE.EMPTY]: 'badge-outline', // White - Empty
};

/**
 * Get badge class for a state.
 * @param {string} state
 * @returns {string}
 */
export function getStateBadgeClass(state) {
  return STATE_TO_BADGE_CLASS[state] || 'badge-neutral';
}

export { STATE, STATE_TO_LABEL, STATE_TO_COLOR_CLASS, STATE_TO_BADGE_CLASS };
