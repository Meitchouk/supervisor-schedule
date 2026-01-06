import { generateSchedule } from './src/features/scheduler/generateSchedule.js';

const config = {
  workDays: 14,
  offDays: 6,
  inductionDays: 4,
  drillingDaysRequired: 30,
};

const result = generateSchedule(config);

console.log('\n=== CASE 4: 14x6, 4 induction, 30 drilling ===\n');
console.log('First 40 days:\n');
console.log('Day | S1 | S2 | S3 | #D');
console.log('----|----|----|----|----|');

for (let i = 0; i < Math.min(50, result.days.length); i++) {
  const day = result.days[i];
  const s1 = day.s1 === 'EMPTY' ? '-' : day.s1[0];
  const s2 = day.s2 === 'EMPTY' ? '-' : day.s2[0];
  const s3 = day.s3 === 'EMPTY' ? '-' : day.s3[0];

  const marker = day.drillingCount !== 2 && i >= 6 ? ' ← PROBLEM' : '';
  console.log(
    ` ${i.toString().padStart(2)} |  ${s1} |  ${s2} |  ${s3} |  ${day.drillingCount} |${marker}`,
  );
}

console.log(`\nTotal days with 2 drilling: ${result.drillingDaysCompleted}`);
console.log(`Total days in schedule: ${result.totalDays}`);
