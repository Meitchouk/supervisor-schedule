/**
 * Type definitions (JSDoc) for the scheduler module.
 */

/**
 * @typedef {Object} ScheduleState
 * @property {'UP'|'INDUCTION'|'DRILLING'|'DOWN'|'REST'|'EMPTY'} state
 * @property {number} supervisorId
 * @property {string} [notes]
 */

/**
 * @typedef {Object} ScheduleConfig
 * @property {number} workDays - Number of work days per cycle
 * @property {number} offDays - Number of off days per cycle
 * @property {number} inductionDays - Days required for induction (1–5)
 * @property {number} drillingDaysRequired - Total drilling operations needed
 */

/**
 * @typedef {Object} ScheduleResult
 * @property {ScheduleState[][]} days - 2D array of states by day and supervisor
 * @property {Object.<string, ScheduleState[]>} supervisors - States by supervisor ID
 * @property {number[]} drillingCountByDay - Drilling operations per day
 * @property {ScheduleIssue[]} issues - Validation issues found
 */

/**
 * @typedef {Object} ScheduleIssue
 * @property {'error'|'warning'|'info'} severity
 * @property {string} message
 * @property {string} [code]
 */

// This file is for type documentation only; no runtime code is executed.
