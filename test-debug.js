import { generateSchedule } from './src/features/scheduler/generateSchedule.js';

// CASE 4: El que está fallando
const config = {
  workDays: 14,
  offDays: 6, // ← Cambio: offDays = 6
  inductionDays: 4,
  drillingDaysRequired: 30,
};

const result = generateSchedule(config);

console.log('\n=== CASE 4: 14x6, 4 inducción, 30 perforación ===\n');
console.log('Primeros 40 días:\n');
console.log('Día | S1 | S2 | S3 | #P');
console.log('----|----|----|----|----|');

for (let i = 0; i < Math.min(50, result.days.length); i++) {
  const day = result.days[i];
  const s1 = day.s1 === 'EMPTY' ? '-' : day.s1[0];
  const s2 = day.s2 === 'EMPTY' ? '-' : day.s2[0];
  const s3 = day.s3 === 'EMPTY' ? '-' : day.s3[0];

  const marker = day.drillingCount !== 2 && i >= 6 ? ' ← PROBLEMA' : '';
  console.log(` ${i.toString().padStart(2)} |  ${s1} |  ${s2} |  ${s3} |  ${day.drillingCount} |${marker}`);
}

console.log(`\nTotal días con 2 perforando: ${result.drillingDaysCompleted}`);
console.log(`Total días en cronograma: ${result.totalDays}`);
