import { describe, it, expect } from 'vitest';
import { generateSchedule } from '../generateSchedule.js';
import { STATE } from '../constants.js';

describe('Schedule Generation Algorithm', () => {
  describe('Basic Schedule Structure', () => {
    it('should generate schedule with valid config', () => {
      const config = {
        workDays: 14,
        offDays: 7,
        inductionDays: 5,
        drillingDaysRequired: 30,
      };

      const result = generateSchedule(config);

      expect(result).toBeDefined();
      expect(result.days.length).toBeGreaterThan(0);
      expect(result.supervisors.S1.length).toBeGreaterThan(0);
      expect(result.supervisors.S2.length).toBeGreaterThan(0);
      expect(result.supervisors.S3.length).toBeGreaterThan(0);
      expect(result.drillingCountByDay.length).toBe(result.days.length);
    });
  });

  describe('State Transition Validation', () => {
    it('should not have UP followed by DOWN (no work)', () => {
      const config = {
        workDays: 14,
        offDays: 7,
        inductionDays: 5,
        drillingDaysRequired: 30,
      };

      const result = generateSchedule(config);

      ['S1', 'S2', 'S3'].forEach((sup) => {
        const schedule = result.supervisors[sup];
        for (let i = 0; i < schedule.length - 1; i++) {
          if (schedule[i] === STATE.UP) {
            expect(schedule[i + 1]).not.toBe(STATE.DOWN);
          }
        }
      });
    });

    it('should not have DOWN followed by UP (no rest)', () => {
      const config = {
        workDays: 14,
        offDays: 7,
        inductionDays: 5,
        drillingDaysRequired: 30,
      };

      const result = generateSchedule(config);

      ['S1', 'S2', 'S3'].forEach((sup) => {
        const schedule = result.supervisors[sup];
        for (let i = 0; i < schedule.length - 1; i++) {
          if (schedule[i] === STATE.DOWN) {
            expect(schedule[i + 1]).not.toBe(STATE.UP);
          }
        }
      });
    });
  });
});
