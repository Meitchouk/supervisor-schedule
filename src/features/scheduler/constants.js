/**
 * Schedule state constants and mappings.
 */

const STATE = {
  UP: 'UP',
  INDUCTION: 'INDUCTION',
  DRILLING: 'DRILLING',
  DOWN: 'DOWN',
  REST: 'REST',
  EMPTY: 'EMPTY',
};

const STATE_TO_LABEL = {
  [STATE.UP]: 'S',
  [STATE.INDUCTION]: 'I',
  [STATE.DRILLING]: 'P',
  [STATE.DOWN]: 'B',
  [STATE.REST]: 'D',
  [STATE.EMPTY]: '-',
};

const STATE_TO_COLOR_CLASS = {
  [STATE.UP]: 'state-up',
  [STATE.INDUCTION]: 'state-induction',
  [STATE.DRILLING]: 'state-drilling',
  [STATE.DOWN]: 'state-down',
  [STATE.REST]: 'state-rest',
  [STATE.EMPTY]: 'state-empty',
};

const STATE_TO_BADGE_CLASS = {
  [STATE.UP]: 'badge-info', // Azul - Travel Up
  [STATE.INDUCTION]: 'badge-warning', // Naranja/Amarillo - Induction
  [STATE.DRILLING]: 'badge-success', // Verde - Drilling
  [STATE.DOWN]: 'badge-error', // Rojo - Travel Down
  [STATE.REST]: 'badge-ghost', // Gris - Rest
  [STATE.EMPTY]:
    'badge-neutral bg-white text-neutral-content border border-base-300', // Blanco - Empty
};

// Color mapping for charts
const STATE_COLORS = {
  [STATE.UP]: '#3b82f6', // Azul - Travel Up
  [STATE.INDUCTION]: '#f59e0b', // Naranja - Induction
  [STATE.DRILLING]: '#10b981', // Verde - Drilling
  [STATE.DOWN]: '#ef4444', // Rojo - Travel Down
  [STATE.REST]: '#6b7280', // Gris - Rest
  [STATE.EMPTY]: '#e5e7eb', // Gris claro - Empty
};

export function getStateBadgeClass(state) {
  return STATE_TO_BADGE_CLASS[state] || 'badge-neutral';
}

export {
  STATE,
  STATE_TO_LABEL,
  STATE_TO_COLOR_CLASS,
  STATE_TO_BADGE_CLASS,
  STATE_COLORS,
};
