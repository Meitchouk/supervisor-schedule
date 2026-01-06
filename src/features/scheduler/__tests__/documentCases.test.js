import { describe, it, expect } from 'vitest';
import { generateSchedule } from '../generateSchedule.js';
import { validateSchedule } from '../validateSchedule.js';

describe('Technical Document - 5 Test Cases', () => {
  describe('CASE 1: 14x7, 5 induction, 30 drilling', () => {
    const config = {
      workDays: 14,
      offDays: 7,
      inductionDays: 5,
      drillingDaysRequired: 30,
    };

    it('should complete exactly 30 drilling days', () => {
      const result = generateSchedule(config);

      let drillingDays = 0;
      for (let count of result.drillingCountByDay) {
        if (count === 2) drillingDays++;
      }

      expect(drillingDays).toBe(30);
    });

    it('should pass all validations without errors', () => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });

  describe('CASE 2: 21x7, 3 induction, 30 drilling', () => {
    const config = {
      workDays: 21,
      offDays: 7,
      inductionDays: 3,
      drillingDaysRequired: 30,
    };

    it('should complete exactly 30 drilling days', () => {
      const result = generateSchedule(config);

      let drillingDays = 0;
      for (let count of result.drillingCountByDay) {
        if (count === 2) drillingDays++;
      }

      expect(drillingDays).toBe(30);
    });

    it('should pass all validations without errors', () => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });

  describe('CASE 3: 10x5, 2 induction, 30 drilling', () => {
    const config = {
      workDays: 10,
      offDays: 5,
      inductionDays: 2,
      drillingDaysRequired: 30,
    };

    it('should complete exactly 30 drilling days', () => {
      const result = generateSchedule(config);

      let drillingDays = 0;
      for (let count of result.drillingCountByDay) {
        if (count === 2) drillingDays++;
      }

      expect(drillingDays).toBe(30);
    });

    it('should pass all validations without errors', () => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });

  describe('CASE 4: 14x6, 4 induction, 30 drilling', () => {
    const config = {
      workDays: 14,
      offDays: 6,
      inductionDays: 4,
      drillingDaysRequired: 30,
    };

    it('should complete exactly 30 drilling days', () => {
      const result = generateSchedule(config);

      let drillingDays = 0;
      for (let count of result.drillingCountByDay) {
        if (count === 2) drillingDays++;
      }

      expect(drillingDays).toBe(30);
    });

    it('should pass all validations without errors', () => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });

  describe('CASE 5: 7x7, 1 induction, 30 drilling', () => {
    const config = {
      workDays: 7,
      offDays: 7,
      inductionDays: 1,
      drillingDaysRequired: 30,
    };

    it('should complete exactly 30 drilling days', () => {
      const result = generateSchedule(config);

      let drillingDays = 0;
      for (let count of result.drillingCountByDay) {
        if (count === 2) drillingDays++;
      }

      expect(drillingDays).toBe(30);
    });

    it('should pass all validations without errors', () => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });
});

describe('Critical Rules from Document', () => {
  it('NEVER should have 3 supervisors drilling', () => {
    const configs = [
      { workDays: 14, offDays: 7, inductionDays: 5, drillingDaysRequired: 30 },
      { workDays: 21, offDays: 7, inductionDays: 3, drillingDaysRequired: 30 },
      { workDays: 10, offDays: 5, inductionDays: 2, drillingDaysRequired: 30 },
      { workDays: 14, offDays: 6, inductionDays: 4, drillingDaysRequired: 30 },
      { workDays: 7, offDays: 7, inductionDays: 1, drillingDaysRequired: 30 },
    ];

    configs.forEach((config) => {
      const result = generateSchedule(config);

      for (let day = 0; day < result.drillingCountByDay.length; day++) {
        expect(result.drillingCountByDay[day]).toBeLessThanOrEqual(2);
      }
    });
  });

  it('Always 2 drilling after S3 enters', () => {
    const configs = [
      { workDays: 14, offDays: 7, inductionDays: 5, drillingDaysRequired: 30 },
      { workDays: 21, offDays: 7, inductionDays: 3, drillingDaysRequired: 30 },
      { workDays: 10, offDays: 5, inductionDays: 2, drillingDaysRequired: 30 },
      { workDays: 14, offDays: 6, inductionDays: 4, drillingDaysRequired: 30 },
      { workDays: 7, offDays: 7, inductionDays: 1, drillingDaysRequired: 30 },
    ];

    configs.forEach((config) => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });
});
