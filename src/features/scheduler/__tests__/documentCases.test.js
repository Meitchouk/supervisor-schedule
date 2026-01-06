import { describe, it, expect } from 'vitest';
import { generateSchedule } from '../generateSchedule.js';
import { validateSchedule } from '../validateSchedule.js';

/**
 * Tests basados en el documento técnico - 5 casuísticas obligatorias
 */

describe('Documento Técnico - 5 Casuísticas', () => {
  /**
   * CASUÍSTICA 1: 14x7 con 5 días inducción, 30 días perforación
   */
  describe('CASE 1: 14x7, 5 inducción, 30 perforación', () => {
    const config = {
      workDays: 14,
      offDays: 7,
      inductionDays: 5,
      drillingDaysRequired: 30,
    };

    it('debe completar exactamente 30 días de perforación', () => {
      const result = generateSchedule(config);

      let drillingDays = 0;
      for (let count of result.drillingCountByDay) {
        if (count === 2) drillingDays++;
      }

      expect(drillingDays).toBe(30);
    });

    it('debe pasar todas las validaciones sin errores', () => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });

  /**
   * CASUÍSTICA 2: 21x7 con 3 días inducción, 30 días perforación
   */
  describe('CASE 2: 21x7, 3 inducción, 30 perforación', () => {
    const config = {
      workDays: 21,
      offDays: 7,
      inductionDays: 3,
      drillingDaysRequired: 30,
    };

    it('debe completar exactamente 30 días de perforación', () => {
      const result = generateSchedule(config);

      let drillingDays = 0;
      for (let count of result.drillingCountByDay) {
        if (count === 2) drillingDays++;
      }

      expect(drillingDays).toBe(30);
    });

    it('debe pasar todas las validaciones sin errores', () => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });

  /**
   * CASUÍSTICA 3: 10x5 con 2 días inducción, 30 días perforación
   */
  describe('CASE 3: 10x5, 2 inducción, 30 perforación', () => {
    const config = {
      workDays: 10,
      offDays: 5,
      inductionDays: 2,
      drillingDaysRequired: 30,
    };

    it('debe completar exactamente 30 días de perforación', () => {
      const result = generateSchedule(config);

      let drillingDays = 0;
      for (let count of result.drillingCountByDay) {
        if (count === 2) drillingDays++;
      }

      expect(drillingDays).toBe(30);
    });

    it('debe pasar todas las validaciones sin errores', () => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });

  /**
   * CASUÍSTICA 4: 14x6 con 4 días inducción, 30 días perforación
   */
  describe('CASE 4: 14x6, 4 inducción, 30 perforación', () => {
    const config = {
      workDays: 14,
      offDays: 6,
      inductionDays: 4,
      drillingDaysRequired: 30,
    };

    it('debe completar exactamente 30 días de perforación', () => {
      const result = generateSchedule(config);

      let drillingDays = 0;
      for (let count of result.drillingCountByDay) {
        if (count === 2) drillingDays++;
      }

      expect(drillingDays).toBe(30);
    });

    it('debe pasar todas las validaciones sin errores', () => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });

  /**
   * CASUÍSTICA 5: 7x7 con 1 día inducción, 30 días perforación
   */
  describe('CASE 5: 7x7, 1 inducción, 30 perforación', () => {
    const config = {
      workDays: 7,
      offDays: 7,
      inductionDays: 1,
      drillingDaysRequired: 30,
    };

    it('debe completar exactamente 30 días de perforación', () => {
      const result = generateSchedule(config);

      let drillingDays = 0;
      for (let count of result.drillingCountByDay) {
        if (count === 2) drillingDays++;
      }

      expect(drillingDays).toBe(30);
    });

    it('debe pasar todas las validaciones sin errores', () => {
      const result = generateSchedule(config);
      const validation = validateSchedule(result);

      expect(validation.hasErrors).toBe(false);
    });
  });
});

describe('Reglas Críticas del Documento', () => {
  /**
   * REGLA 1: NUNCA más de 2 perforando simultáneamente
   */
  it('NUNCA debe haber 3 supervisores perforando', () => {
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

  /**
   * REGLA 2: Siempre 2 perforando cuando S3 está activo
   */
  it('Siempre 2 perforando después de que S3 entra', () => {
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
