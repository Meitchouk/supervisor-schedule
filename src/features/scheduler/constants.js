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

export { STATE, STATE_TO_LABEL, STATE_TO_COLOR_CLASS };
