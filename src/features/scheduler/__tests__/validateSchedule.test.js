import { describe, it, expect } from 'vitest';
import { validateSchedule } from '../validateSchedule.js';
import { generateSchedule } from '../generateSchedule.js';
import { STATE } from '../constants.js';

describe('Schedule Validation Logic', () => {
  describe('Valid Schedule Validation', () => {
    it('should validate generated schedules correctly', () => {
      const configs = [
        {
          workDays: 14,
          offDays: 7,
          inductionDays: 5,
          drillingDaysRequired: 30,
        },
        {
          workDays: 21,
          offDays: 7,
          inductionDays: 3,
          drillingDaysRequired: 30,
        },
        {
          workDays: 10,
          offDays: 5,
          inductionDays: 2,
          drillingDaysRequired: 30,
        },
      ];

      configs.forEach((config) => {
        const schedule = generateSchedule(config);
        const validation = validateSchedule(schedule);

        expect(validation.hasErrors).toBe(false);
      });
    });
  });

  describe('Critical Rule - Never 3 Drilling', () => {
    it('should detect THREE_DRILLING error', () => {
      const invalidSchedule = {
        days: [
          {
            day: 0,
            s1: STATE.DRILLING,
            s2: STATE.DRILLING,
            s3: STATE.DRILLING,
          },
        ],
        supervisors: {
          S1: [STATE.DRILLING],
          S2: [STATE.DRILLING],
          S3: [STATE.DRILLING],
        },
        drillingCountByDay: [3],
        totalDays: 1,
        drillingDaysCompleted: 1,
      };

      const validation = validateSchedule(invalidSchedule);

      expect(validation.hasErrors).toBe(true);

      const threeError = validation.issues.find(
        (issue) => issue.code === 'THREE_DRILLING',
      );
      expect(threeError).toBeDefined();
      expect(threeError.severity).toBe('error');
    });
  });

  describe('Invalid Transition Detection', () => {
    it('should detect UP->DOWN invalid transition', () => {
      const invalidSchedule = {
        days: [
          { day: 0, s1: STATE.UP, s2: STATE.EMPTY, s3: STATE.EMPTY },
          { day: 1, s1: STATE.DOWN, s2: STATE.EMPTY, s3: STATE.EMPTY },
        ],
        supervisors: {
          S1: [STATE.UP, STATE.DOWN],
          S2: [STATE.EMPTY, STATE.EMPTY],
          S3: [STATE.EMPTY, STATE.EMPTY],
        },
        drillingCountByDay: [0, 0],
        totalDays: 2,
        drillingDaysCompleted: 0,
      };

      const validation = validateSchedule(invalidSchedule);

      expect(validation.hasErrors).toBe(true);

      const transitionError = validation.issues.find(
        (issue) => issue.code && issue.code.includes('TRANSITION'),
      );
      expect(transitionError).toBeDefined();
    });

    it('should detect DOWN->UP invalid transition (no rest)', () => {
      const invalidSchedule = {
        days: [
          { day: 0, s1: STATE.DOWN, s2: STATE.EMPTY, s3: STATE.EMPTY },
          { day: 1, s1: STATE.UP, s2: STATE.EMPTY, s3: STATE.EMPTY },
        ],
        supervisors: {
          S1: [STATE.DOWN, STATE.UP],
          S2: [STATE.EMPTY, STATE.EMPTY],
          S3: [STATE.EMPTY, STATE.EMPTY],
        },
        drillingCountByDay: [0, 0],
        totalDays: 2,
        drillingDaysCompleted: 0,
      };

      const validation = validateSchedule(invalidSchedule);

      expect(validation.hasErrors).toBe(true);

      const transitionError = validation.issues.find(
        (issue) => issue.code && issue.code.includes('NO_REST'),
      );
      expect(transitionError).toBeDefined();
    });
  });
});
