const r2 = require('./round2_medium.js');
const r3 = require('./round3_hard.js');
const { execSync } = require('child_process');
const fs = require('fs');

console.log('=== TESTING ROUND 2 (PYTHON) ===');
r2.forEach((prob) => {
  fs.writeFileSync('temp_test.py', prob.implementations.PYTHON.referenceSolution, 'utf8');
  prob.testCases.forEach((tc, tcIdx) => {
    try {
      const output = execSync('python temp_test.py', { input: tc.stdin, encoding: 'utf8', timeout: 4000 }).trim();
      const expected = tc.expectedStdout.trim();
      if (output !== expected) {
        console.error(`FAIL R2 Set ${prob.setNumber} TC ${tcIdx}: expected "${expected}" got "${output}"`);
      } else {
        console.log(`PASS R2 Set ${prob.setNumber} TC ${tcIdx}`);
      }
    } catch (e) {
      console.error(`ERROR R2 Set ${prob.setNumber} TC ${tcIdx}:`, e.message);
    }
  });
});

console.log('\n=== TESTING ROUND 3 (PYTHON) ===');
r3.forEach((prob) => {
  fs.writeFileSync('temp_test.py', prob.implementations.PYTHON.referenceSolution, 'utf8');
  prob.testCases.forEach((tc, tcIdx) => {
    try {
      const output = execSync('python temp_test.py', { input: tc.stdin, encoding: 'utf8', timeout: 4000 }).trim();
      const expected = tc.expectedStdout.trim();
      if (output !== expected) {
        console.error(`FAIL R3 Set ${prob.setNumber} TC ${tcIdx}: expected "${expected}" got "${output}"`);
      } else {
        console.log(`PASS R3 Set ${prob.setNumber} TC ${tcIdx}`);
      }
    } catch (e) {
      console.error(`ERROR R3 Set ${prob.setNumber} TC ${tcIdx}:`, e.message);
    }
  });
});

if (fs.existsSync('temp_test.py')) fs.unlinkSync('temp_test.py');
