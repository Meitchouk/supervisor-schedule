/**
 * Schedule hash utilities for detecting duplicates
 */

/**
 * Generate a hash from schedule configuration
 * Used to detect duplicate schedules
 */
export function generateScheduleHash(config, scheduleResult) {
  if (!config || !scheduleResult) return null;

  // Create a signature from config and key schedule metrics
  const signature = {
    workDays: config.workDays,
    offDays: config.offDays,
    inductionDays: config.inductionDays,
    drillingDaysRequired: config.drillingDaysRequired,
    totalDays: scheduleResult.totalDays,
    drillingDaysCompleted: scheduleResult.drillingDaysCompleted,
  };

  // Simple hash function (not cryptographic, just for duplicate detection)
  return JSON.stringify(signature);
}

/**
 * Check if a schedule with this hash already exists
 */
export function isDuplicateSchedule(hash, historyItems) {
  if (!hash || !historyItems) return false;
  return historyItems.some((item) => item.hash === hash);
}
