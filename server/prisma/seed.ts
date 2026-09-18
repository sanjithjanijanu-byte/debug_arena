import { PrismaClient, Language, Difficulty, TeamStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean existing records in reverse dependency order
  await prisma.submission.deleteMany({});
  await prisma.draft.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.testCase.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.violation.deleteMany({});
  await prisma.disqualificationLog.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.participant.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.round.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.eventSettings.deleteMany({});

  // 2. Seed Default Event Settings
  await prisma.eventSettings.create({
    data: {
      eventStatus: 'NOT_STARTED',
      tabSwitchEnabled: true,
      tabSwitchThreshold: 3,
      fullscreenExitEnabled: true,
      fullscreenExitThreshold: 3,
      tabCloseEnabled: true,
      tabCloseThreshold: 1,
      disconnectGraceSecs: 60,
      dualLoginEnabled: true,
      scoringMode: 'PARTIAL',
      runRateLimitSecs: 5,
    },
  });
  console.log('✅ Event settings seeded');

  // 3. Seed Admin
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword123';
  const adminPasswordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.admin.create({
    data: {
      username: adminUsername,
      passwordHash: adminPasswordHash,
    },
  });
  console.log(`✅ Admin seeded: ${admin.username}`);

  // 4. Seed Rounds
  const round1 = await prisma.round.create({
    data: {
      number: 1,
      name: 'Bug Hunt',
      durationMinutes: 20,
      difficulty: Difficulty.EASY,
      status: 'LOCKED',
    },
  });

  const round2 = await prisma.round.create({
    data: {
      number: 2,
      name: 'Logic Hunt',
      durationMinutes: 35,
      difficulty: Difficulty.MEDIUM,
      status: 'LOCKED',
    },
  });

  const round3 = await prisma.round.create({
    data: {
      number: 3,
      name: 'Debugging Showdown',
      durationMinutes: 35,
      difficulty: Difficulty.HARD,
      status: 'LOCKED',
    },
  });
  console.log('✅ Rounds 1, 2, and 3 seeded');

  // 5. Seed Teams & Participants
  const defaultTeamPassHash = await bcrypt.hash('team123', 12);
  const sampleTeamsData = [
    { name: 'Team Alpha', code: 'TEAM-1001', participants: [{ name: 'Alice Smith', roll: 'CS202601' }, { name: 'Bob Jones', roll: 'CS202602' }] },
    { name: 'Team Beta', code: 'TEAM-1002', participants: [{ name: 'Charlie Brown', roll: 'CS202603' }, { name: 'Diana Prince', roll: 'CS202604' }] },
    { name: 'Team Gamma', code: 'TEAM-1003', participants: [{ name: 'Evan Wright', roll: 'CS202605' }, { name: 'Fiona Gallagher', roll: 'CS202606' }] },
    { name: 'Team Delta', code: 'TEAM-1004', participants: [{ name: 'George Clark', roll: 'CS202607' }, { name: 'Hannah Abbott', roll: 'CS202608' }] },
    { name: 'Team Epsilon', code: 'TEAM-1005', participants: [{ name: 'Ian Malcolm', roll: 'CS202609' }, { name: 'Julia Roberts', roll: 'CS202610' }] },
  ];

  for (const t of sampleTeamsData) {
    const team = await prisma.team.create({
      data: {
        name: t.name,
        teamCode: t.code,
        passwordHash: defaultTeamPassHash,
        initialPassword: 'team123',
        status: TeamStatus.NOT_LOGGED_IN,
        score: 0,
      },
    });

    for (const p of t.participants) {
      await prisma.participant.create({
        data: {
          name: p.name,
          rollNo: p.roll,
          email: `${p.name.toLowerCase().replace(' ', '.')}@college.edu`,
          phone: '+1 555-0199',
          teamId: team.id,
        },
      });
    }
  }
  console.log(`✅ 5 Demo Teams & 10 Participants seeded (Default password: team123)`);

  // 6. Seed Sample Questions for Round 1 (C++, Java, Python)
  // Python Round 1 Q1
  const pyQ1 = await prisma.question.create({
    data: {
      roundId: round1.id,
      language: Language.PYTHON,
      title: 'Fix the Palindrome Checker',
      statement: 'Given a string S from stdin, print "true" if S is a palindrome (ignoring casing and non-alphanumeric chars), else "false". The current program fails on mixed casing and punctuation.',
      buggyCode: `import sys

def is_palindrome(s):
    # BUG: Doesn't sanitize string or handle case
    return s == s[::-1]

if __name__ == '__main__':
    line = sys.stdin.read().strip()
    if is_palindrome(line):
        print("true")
    else:
        print("false")
`,
      referenceSolution: `import sys

def is_palindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]

if __name__ == '__main__':
    line = sys.stdin.read().strip()
    if is_palindrome(line):
        print("true")
    else:
        print("false")
`,
      points: 10,
      timeLimitMs: 2000,
      memoryLimitMb: 128,
    },
  });

  await prisma.testCase.createMany({
    data: [
      { questionId: pyQ1.id, stdin: 'racecar', expectedStdout: 'true', isHidden: false, weight: 1.0 },
      { questionId: pyQ1.id, stdin: 'hello', expectedStdout: 'false', isHidden: false, weight: 1.0 },
      { questionId: pyQ1.id, stdin: 'A man, a plan, a canal: Panama', expectedStdout: 'true', isHidden: true, weight: 2.0 },
      { questionId: pyQ1.id, stdin: 'No lemon, no melon!', expectedStdout: 'true', isHidden: true, weight: 2.0 },
    ],
  });

  // C++ Round 1 Q1
  const cppQ1 = await prisma.question.create({
    data: {
      roundId: round1.id,
      language: Language.CPP,
      title: 'Off-By-One Array Sum',
      statement: 'Read an integer N, followed by N integers. Print their sum. The buggy code has an off-by-one error reading inputs and calculating sum.',
      buggyCode: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    // BUG: reading up to <= n causing buffer overflow / out of bounds
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
    }
    long long sum = 0;
    for (int i = 0; i < n - 1; i++) {
        sum += arr[i];
    }
    cout << sum << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    cout << sum << endl;
    return 0;
}
`,
      points: 10,
      timeLimitMs: 2000,
      memoryLimitMb: 128,
    },
  });

  await prisma.testCase.createMany({
    data: [
      { questionId: cppQ1.id, stdin: '5\n1 2 3 4 5', expectedStdout: '15', isHidden: false, weight: 1.0 },
      { questionId: cppQ1.id, stdin: '3\n10 20 30', expectedStdout: '60', isHidden: false, weight: 1.0 },
      { questionId: cppQ1.id, stdin: '1\n999', expectedStdout: '999', isHidden: true, weight: 2.0 },
      { questionId: cppQ1.id, stdin: '4\n-5 5 -10 10', expectedStdout: '0', isHidden: true, weight: 2.0 },
    ],
  });

  // Java Round 1 Q1
  const javaQ1 = await prisma.question.create({
    data: {
      roundId: round1.id,
      language: Language.JAVA,
      title: 'String Tokenizer Word Count',
      statement: 'Given a sentence on stdin, print the total number of words separated by spaces. Empty input or multiple consecutive spaces should be handled cleanly.',
      buggyCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) {
            System.out.println(0);
            return;
        }
        String line = sc.nextLine();
        // BUG: split on single space gives empty tokens for extra spaces or empty string
        String[] words = line.split(" ");
        System.out.println(words.length);
    }
}
`,
      referenceSolution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) {
            System.out.println(0);
            return;
        }
        String line = sc.nextLine().trim();
        if (line.isEmpty()) {
            System.out.println(0);
            return;
        }
        String[] words = line.split("\\\\s+");
        System.out.println(words.length);
    }
}
`,
      points: 10,
      timeLimitMs: 3000,
      memoryLimitMb: 256,
    },
  });

  await prisma.testCase.createMany({
    data: [
      { questionId: javaQ1.id, stdin: 'The quick brown fox', expectedStdout: '4', isHidden: false, weight: 1.0 },
      { questionId: javaQ1.id, stdin: '  multiple   spaces  between  words  ', expectedStdout: '4', isHidden: false, weight: 1.0 },
      { questionId: javaQ1.id, stdin: '', expectedStdout: '0', isHidden: true, weight: 2.0 },
      { questionId: javaQ1.id, stdin: 'SingleWord', expectedStdout: '1', isHidden: true, weight: 2.0 },
    ],
  });

  console.log('✅ Sample Questions & Test Cases for C++, Java, and Python seeded');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
