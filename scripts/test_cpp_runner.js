const r2 = require('./round2_medium.js');
const r3 = require('./round3_hard.js');
const { execSync } = require('child_process');
const fs = require('fs');

console.log('=== TESTING ROUND 2 (C++) ===');
r2.forEach((prob) => {
  fs.writeFileSync('temp_test.cpp', prob.implementations.CPP.referenceSolution, 'utf8');
  execSync('g++ -O2 temp_test.cpp -o temp_test.exe');
  prob.testCases.forEach((tc, tcIdx) => {
    try {
      const output = execSync('temp_test.exe', { input: tc.stdin, encoding: 'utf8', timeout: 4000 }).trim();
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

console.log('\n=== TESTING ROUND 3 (C++) ===');
r3.forEach((prob) => {
  fs.writeFileSync('temp_test.cpp', prob.implementations.CPP.referenceSolution, 'utf8');
  execSync('g++ -O2 temp_test.cpp -o temp_test.exe');
  prob.testCases.forEach((tc, tcIdx) => {
    try {
      const output = execSync('temp_test.exe', { input: tc.stdin, encoding: 'utf8', timeout: 4000 }).trim();
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

if (fs.existsSync('temp_test.cpp')) fs.unlinkSync('temp_test.cpp');
if (fs.existsSync('temp_test.exe')) fs.unlinkSync('temp_test.exe');
