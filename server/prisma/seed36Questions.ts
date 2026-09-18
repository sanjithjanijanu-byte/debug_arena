import { PrismaClient, Language, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAll36Questions() {
  console.log('📚 Seeding complete Question Bank: 36 questions (12 per language)...');

  const round1 = await prisma.round.findUnique({ where: { number: 1 } });
  const round2 = await prisma.round.findUnique({ where: { number: 2 } });
  const round3 = await prisma.round.findUnique({ where: { number: 3 } });

  if (!round1 || !round2 || !round3) {
    throw new Error('Rounds 1, 2, and 3 must exist before seeding questions.');
  }

  // Clear existing questions and test cases
  await prisma.testCase.deleteMany({});
  await prisma.draft.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.question.deleteMany({});

  const questionsData = [
    // ==========================================
    // PYTHON - ROUND 1 (EASY - 10 PTS)
    // ==========================================
    {
      roundId: round1.id,
      language: Language.PYTHON,
      title: 'Fix the Palindrome Checker',
      statement: 'Given a string on stdin, print "true" if it is a palindrome ignoring casing and non-alphanumeric characters, else "false". The current program fails on punctuation and casing.',
      buggyCode: `import sys

def is_palindrome(s):
    # BUG: Does not strip non-alphanumeric chars or normalize case
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
    clean = [c.lower() for c in s if c.isalnum()]
    return clean == clean[::-1]

if __name__ == '__main__':
    line = sys.stdin.read().strip()
    if is_palindrome(line):
        print("true")
    else:
        print("false")
`,
      points: 10,
      testCases: [
        { stdin: 'racecar', expectedStdout: 'true', isHidden: false, weight: 1 },
        { stdin: 'hello', expectedStdout: 'false', isHidden: false, weight: 1 },
        { stdin: 'A man, a plan, a canal: Panama', expectedStdout: 'true', isHidden: true, weight: 2 },
        { stdin: 'Was it a car or a cat I saw?', expectedStdout: 'true', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round1.id,
      language: Language.PYTHON,
      title: 'Off-By-One Fibonacci Number',
      statement: 'Read integer N (0-indexed). Print the N-th Fibonacci number where F(0)=0, F(1)=1, F(2)=1, F(3)=2, etc. The buggy program has an off-by-one loop limit.',
      buggyCode: `import sys

def fib(n):
    if n <= 0: return 0
    if n == 1: return 1
    a, b = 0, 1
    # BUG: Loop runs n+1 times instead of n-1 times
    for _ in range(n + 1):
        a, b = b, a + b
    return a

if __name__ == '__main__':
    n = int(sys.stdin.read().strip())
    print(fib(n))
`,
      referenceSolution: `import sys

def fib(n):
    if n <= 0: return 0
    if n == 1: return 1
    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

if __name__ == '__main__':
    n = int(sys.stdin.read().strip())
    print(fib(n))
`,
      points: 10,
      testCases: [
        { stdin: '0', expectedStdout: '0', isHidden: false, weight: 1 },
        { stdin: '1', expectedStdout: '1', isHidden: false, weight: 1 },
        { stdin: '6', expectedStdout: '8', isHidden: true, weight: 2 },
        { stdin: '10', expectedStdout: '55', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round1.id,
      language: Language.PYTHON,
      title: 'Reverse Words in a Sentence',
      statement: 'Read a line of text. Reverse the order of the words while keeping characters inside each word in original order. Eliminate multiple spaces.',
      buggyCode: `import sys

line = sys.stdin.read().strip()
# BUG: Reverses characters rather than words
print(line[::-1])
`,
      referenceSolution: `import sys

line = sys.stdin.read().strip()
words = line.split()
print(" ".join(reversed(words)))
`,
      points: 10,
      testCases: [
        { stdin: 'the sky is blue', expectedStdout: 'blue is sky the', isHidden: false, weight: 1 },
        { stdin: '  hello world  ', expectedStdout: 'world hello', isHidden: false, weight: 1 },
        { stdin: 'a good   example', expectedStdout: 'example good a', isHidden: true, weight: 2 },
        { stdin: 'single', expectedStdout: 'single', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round1.id,
      language: Language.PYTHON,
      title: 'Find the Missing Number in Range',
      statement: 'Given N, followed by N distinct integers in range [0, N], find the one missing number. The buggy program has an accumulator arithmetic flaw.',
      buggyCode: `import sys

tokens = list(map(int, sys.stdin.read().split()))
if not tokens:
    print(0)
    sys.exit(0)

n = tokens[0]
nums = tokens[1:]
# BUG: Formula computes n*(n-1)//2 instead of n*(n+1)//2
expected_sum = (n * (n - 1)) // 2
actual_sum = sum(nums)
print(expected_sum - actual_sum)
`,
      referenceSolution: `import sys

tokens = list(map(int, sys.stdin.read().split()))
if not tokens:
    print(0)
    sys.exit(0)

n = tokens[0]
nums = tokens[1:]
expected_sum = (n * (n + 1)) // 2
actual_sum = sum(nums)
print(expected_sum - actual_sum)
`,
      points: 10,
      testCases: [
        { stdin: '3 3 0 1', expectedStdout: '2', isHidden: false, weight: 1 },
        { stdin: '2 0 1', expectedStdout: '2', isHidden: false, weight: 1 },
        { stdin: '9 9 6 4 2 3 5 7 0 1', expectedStdout: '8', isHidden: true, weight: 2 },
        { stdin: '1 0', expectedStdout: '1', isHidden: true, weight: 2 },
      ],
    },

    // ==========================================
    // PYTHON - ROUND 2 (MEDIUM - 20 PTS)
    // ==========================================
    {
      roundId: round2.id,
      language: Language.PYTHON,
      title: 'Valid Parentheses & Bracket Matching',
      statement: 'Given a string containing only brackets "()[]{}", determine if the input string is valid. Open brackets must be closed in the correct order.',
      buggyCode: `import sys

def is_valid(s):
    stack = []
    # BUG: mapping key/value inverted and closing logic incorrect
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            stack.append(char)
        else:
            if not stack: return False
            stack.pop()
    return len(stack) == 0

s = sys.stdin.read().strip()
print("true" if is_valid(s) else "false")
`,
      referenceSolution: `import sys

def is_valid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack

s = sys.stdin.read().strip()
print("true" if is_valid(s) else "false")
`,
      points: 20,
      testCases: [
        { stdin: '()[]{}', expectedStdout: 'true', isHidden: false, weight: 1 },
        { stdin: '(]', expectedStdout: 'false', isHidden: false, weight: 1 },
        { stdin: '([{}])', expectedStdout: 'true', isHidden: true, weight: 2 },
        { stdin: '((((((((', expectedStdout: 'false', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.PYTHON,
      title: 'Two Sum Target Index Pair',
      statement: 'Given a target sum T and an array of integers, print the 0-based indices of the two numbers that add up to T. Print smaller index first.',
      buggyCode: `import sys

tokens = list(map(int, sys.stdin.read().split()))
target = tokens[0]
nums = tokens[1:]

# BUG: Does not guard against using the exact same element index twice
seen = {val: i for i, val in enumerate(nums)}
for i, num in enumerate(nums):
    diff = target - num
    if diff in seen:
        print(f"{i} {seen[diff]}")
        break
`,
      referenceSolution: `import sys

tokens = list(map(int, sys.stdin.read().split()))
if not tokens:
    sys.exit(0)
target = tokens[0]
nums = tokens[1:]

seen = {}
for i, num in enumerate(nums):
    diff = target - num
    if diff in seen:
        print(f"{seen[diff]} {i}")
        break
    seen[num] = i
`,
      points: 20,
      testCases: [
        { stdin: '9 2 7 11 15', expectedStdout: '0 1', isHidden: false, weight: 1 },
        { stdin: '6 3 2 4', expectedStdout: '1 2', isHidden: false, weight: 1 },
        { stdin: '6 3 3', expectedStdout: '0 1', isHidden: true, weight: 2 },
        { stdin: '10 1 2 3 4 5 5', expectedStdout: '4 5', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.PYTHON,
      title: 'Longest Substring Without Repeating Characters',
      statement: 'Find the length of the longest substring without duplicate characters.',
      buggyCode: `import sys

s = sys.stdin.read().strip()
max_len = 0
left = 0
seen = set()

for right in range(len(s)):
    # BUG: Sets left pointer unconditionally without removing evicted items from seen
    if s[right] in seen:
        left = right
        seen.clear()
    seen.add(s[right])
    max_len = max(max_len, right - left + 1)

print(max_len)
`,
      referenceSolution: `import sys

s = sys.stdin.read().strip()
seen = {}
max_len = 0
left = 0

for right, char in enumerate(s):
    if char in seen and seen[char] >= left:
        left = seen[char] + 1
    seen[char] = right
    max_len = max(max_len, right - left + 1)

print(max_len)
`,
      points: 20,
      testCases: [
        { stdin: 'abcabcbb', expectedStdout: '3', isHidden: false, weight: 1 },
        { stdin: 'bbbbb', expectedStdout: '1', isHidden: false, weight: 1 },
        { stdin: 'pwwkew', expectedStdout: '3', isHidden: true, weight: 2 },
        { stdin: 'dvdf', expectedStdout: '3', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.PYTHON,
      title: 'Merge Overlapping Intervals',
      statement: 'Given N intervals [start, end], merge all overlapping intervals and print each merged interval.',
      buggyCode: `import sys

tokens = list(map(int, sys.stdin.read().split()))
if not tokens: sys.exit(0)
n = tokens[0]
raw = tokens[1:]
intervals = []
for i in range(0, 2*n, 2):
    intervals.append([raw[i], raw[i+1]])

# BUG: Does not sort intervals prior to merging
merged = [intervals[0]]
for current in intervals[1:]:
    prev = merged[-1]
    if current[0] <= prev[1]:
        prev[1] = max(prev[1], current[1])
    else:
        merged.append(current)

for interval in merged:
    print(f"{interval[0]} {interval[1]}")
`,
      referenceSolution: `import sys

tokens = list(map(int, sys.stdin.read().split()))
if not tokens: sys.exit(0)
n = tokens[0]
raw = tokens[1:]
intervals = []
for i in range(0, 2*n, 2):
    intervals.append([raw[i], raw[i+1]])

intervals.sort(key=lambda x: x[0])
merged = [intervals[0]]
for current in intervals[1:]:
    prev = merged[-1]
    if current[0] <= prev[1]:
        prev[1] = max(prev[1], current[1])
    else:
        merged.append(current)

for interval in merged:
    print(f"{interval[0]} {interval[1]}")
`,
      points: 20,
      testCases: [
        { stdin: '4 1 3 2 6 8 10 15 18', expectedStdout: '1 6\n8 10\n15 18', isHidden: false, weight: 1 },
        { stdin: '2 1 4 4 5', expectedStdout: '1 5', isHidden: false, weight: 1 },
        { stdin: '3 6 8 1 9 2 4', expectedStdout: '1 9', isHidden: true, weight: 2 },
        { stdin: '1 1 4', expectedStdout: '1 4', isHidden: true, weight: 2 },
      ],
    },

    // ==========================================
    // PYTHON - ROUND 3 (HARD - 32.5 PTS)
    // ==========================================
    {
      roundId: round3.id,
      language: Language.PYTHON,
      title: 'Trapping Rain Water Calculation',
      statement: 'Given N elevation map heights, compute how much water it can trap after raining.',
      buggyCode: `import sys

tokens = list(map(int, sys.stdin.read().split()))
if len(tokens) <= 2:
    print(0)
    sys.exit(0)

# BUG: Two-pointer boundary advancement checks the wrong side
height = tokens
left, right = 0, len(height) - 1
left_max, right_max = height[left], height[right]
water = 0

while left < right:
    if left_max > right_max:
        left += 1
        left_max = max(left_max, height[left])
        water += max(0, left_max - height[left])
    else:
        right -= 1
        right_max = max(right_max, height[right])
        water += max(0, right_max - height[right])

print(water)
`,
      referenceSolution: `import sys

tokens = list(map(int, sys.stdin.read().split()))
if len(tokens) <= 2:
    print(0)
    sys.exit(0)

height = tokens
left, right = 0, len(height) - 1
left_max, right_max = height[left], height[right]
water = 0

while left < right:
    if left_max < right_max:
        left += 1
        left_max = max(left_max, height[left])
        water += max(0, left_max - height[left])
    else:
        right -= 1
        right_max = max(right_max, height[right])
        water += max(0, right_max - height[right])

print(water)
`,
      points: 32.5,
      testCases: [
        { stdin: '0 1 0 2 1 0 1 3 2 1 2 1', expectedStdout: '6', isHidden: false, weight: 1 },
        { stdin: '4 2 0 3 2 5', expectedStdout: '9', isHidden: false, weight: 1 },
        { stdin: '1 2 3 4 5', expectedStdout: '0', isHidden: true, weight: 2 },
        { stdin: '5 4 1 2', expectedStdout: '1', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round3.id,
      language: Language.PYTHON,
      title: 'LRU Cache Access Simulator',
      statement: 'Implement an LRU cache with capacity C. Commands: PUT k v, GET k. Output values for GET or -1 if absent.',
      buggyCode: `import sys
from collections import OrderedDict

lines = sys.stdin.read().strip().splitlines()
if not lines: sys.exit(0)

capacity = int(lines[0])
cache = OrderedDict()

for line in lines[1:]:
    parts = line.split()
    if parts[0] == 'PUT':
        k, v = int(parts[1]), int(parts[2])
        # BUG: Does not move existing key to end on update or pop properly
        if len(cache) >= capacity and k not in cache:
            cache.popitem(last=True) # Popping wrong end!
        cache[k] = v
    elif parts[0] == 'GET':
        k = int(parts[1])
        if k in cache:
            print(cache[k])
        else:
            print(-1)
`,
      referenceSolution: `import sys
from collections import OrderedDict

lines = sys.stdin.read().strip().splitlines()
if not lines: sys.exit(0)

capacity = int(lines[0])
cache = OrderedDict()

for line in lines[1:]:
    parts = line.split()
    if parts[0] == 'PUT':
        k, v = int(parts[1]), int(parts[2])
        if k in cache:
            cache.move_to_end(k)
        cache[k] = v
        if len(cache) > capacity:
            cache.popitem(last=False)
    elif parts[0] == 'GET':
        k = int(parts[1])
        if k in cache:
            cache.move_to_end(k)
            print(cache[k])
        else:
            print(-1)
`,
      points: 32.5,
      testCases: [
        { stdin: '2\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3', expectedStdout: '1\n-1\n3', isHidden: false, weight: 1 },
        { stdin: '1\nPUT 2 1\nGET 2\nPUT 3 2\nGET 2\nGET 3', expectedStdout: '1\n-1\n2', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round3.id,
      language: Language.PYTHON,
      title: 'Minimum Path Sum in a Grid',
      statement: 'Given an M x N grid with non-negative integers, find a path from top-left to bottom-right minimizing the sum of values along its path.',
      buggyCode: `import sys

tokens = list(map(int, sys.stdin.read().split()))
if not tokens: sys.exit(0)
m, n = tokens[0], tokens[1]
grid = []
idx = 2
for _ in range(m):
    grid.append(tokens[idx:idx+n])
    idx += n

dp = [[0]*n for _ in range(m)]
dp[0][0] = grid[0][0]

# BUG: Fails to accumulate values along boundaries
for i in range(1, m):
    dp[i][0] = grid[i][0]
for j in range(1, n):
    dp[0][j] = grid[0][j]

for i in range(1, m):
    for j in range(1, n):
        dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])

print(dp[m-1][n-1])
`,
      referenceSolution: `import sys

tokens = list(map(int, sys.stdin.read().split()))
if not tokens: sys.exit(0)
m, n = tokens[0], tokens[1]
grid = []
idx = 2
for _ in range(m):
    grid.append(tokens[idx:idx+n])
    idx += n

dp = [[0]*n for _ in range(m)]
dp[0][0] = grid[0][0]

for i in range(1, m):
    dp[i][0] = dp[i-1][0] + grid[i][0]
for j in range(1, n):
    dp[0][j] = dp[0][j-1] + grid[0][j]

for i in range(1, m):
    for j in range(1, n):
        dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])

print(dp[m-1][n-1])
`,
      points: 32.5,
      testCases: [
        { stdin: '3 3\n1 3 1\n1 5 1\n4 2 1', expectedStdout: '7', isHidden: false, weight: 1 },
        { stdin: '2 3\n1 2 3\n4 5 6', expectedStdout: '12', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round3.id,
      language: Language.PYTHON,
      title: 'Sliding Window Maximum Deque',
      statement: 'Given an array of integers and a sliding window of size K, output the maximum value in each window from left to right.',
      buggyCode: `import sys
from collections import deque

tokens = list(map(int, sys.stdin.read().split()))
if not tokens: sys.exit(0)
k = tokens[0]
nums = tokens[1:]

dq = deque()
res = []

for i, x in enumerate(nums):
    # BUG: Compares index instead of value when popping from back
    while dq and dq[-1] < x:
        dq.pop()
    dq.append(x)
    if i >= k - 1:
        res.append(dq[0])

print(" ".join(map(str, res)))
`,
      referenceSolution: `import sys
from collections import deque

tokens = list(map(int, sys.stdin.read().split()))
if not tokens: sys.exit(0)
k = tokens[0]
nums = tokens[1:]

dq = deque() # Stores indices
res = []

for i in range(len(nums)):
    while dq and dq[0] < i - k + 1:
        dq.popleft()
    while dq and nums[dq[-1]] < nums[i]:
        dq.pop()
    dq.append(i)
    if i >= k - 1:
        res.append(nums[dq[0]])

print(" ".join(map(str, res)))
`,
      points: 32.5,
      testCases: [
        { stdin: '3 1 3 -1 -3 5 3 6 7', expectedStdout: '3 3 5 5 6 7', isHidden: false, weight: 1 },
        { stdin: '1 1', expectedStdout: '1', isHidden: true, weight: 2 },
      ],
    },

    // ==========================================
    // JAVA - ROUND 1 (EASY - 10 PTS)
    // ==========================================
    {
      roundId: round1.id,
      language: Language.JAVA,
      title: 'String Tokenizer Word Count',
      statement: 'Given a sentence on stdin, print the total number of words separated by spaces.',
      buggyCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) {
            System.out.println(0);
            return;
        }
        String line = sc.nextLine();
        // BUG: split on single space gives empty tokens for extra spaces
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
      testCases: [
        { stdin: 'The quick brown fox', expectedStdout: '4', isHidden: false, weight: 1 },
        { stdin: '  multiple   spaces  between  words  ', expectedStdout: '4', isHidden: false, weight: 1 },
        { stdin: '', expectedStdout: '0', isHidden: true, weight: 2 },
        { stdin: 'SingleWord', expectedStdout: '1', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round1.id,
      language: Language.JAVA,
      title: 'Array Prefix Sums Accumulator',
      statement: 'Read integer N, then N integers. Output the running prefix sum array.',
      buggyCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // BUG: Prefix addition index starts at 0 causing out of bounds
        for (int i = 0; i < n; i++) {
            arr[i] = arr[i] + arr[i - 1];
        }

        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + (i == n - 1 ? "" : " "));
        }
        System.out.println();
    }
}
`,
      referenceSolution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        for (int i = 1; i < n; i++) {
            arr[i] = arr[i] + arr[i - 1];
        }

        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + (i == n - 1 ? "" : " "));
        }
        System.out.println();
    }
}
`,
      points: 10,
      testCases: [
        { stdin: '4 1 2 3 4', expectedStdout: '1 3 6 10', isHidden: false, weight: 1 },
        { stdin: '5 1 1 1 1 1', expectedStdout: '1 2 3 4 5', isHidden: false, weight: 1 },
        { stdin: '1 42', expectedStdout: '42', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round1.id,
      language: Language.JAVA,
      title: 'Anagram String Verifier',
      statement: 'Read two strings S1 and S2 on separate lines. Print "true" if S1 and S2 are anagrams (same characters with same frequency), else "false".',
      buggyCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s1 = sc.hasNext() ? sc.next() : "";
        String s2 = sc.hasNext() ? sc.next() : "";

        // BUG: Compares string length only without checking letter frequencies
        if (s1.length() == s2.length()) {
            System.out.println("true");
        } else {
            System.out.println("false");
        }
    }
}
`,
      referenceSolution: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s1 = sc.hasNext() ? sc.next() : "";
        String s2 = sc.hasNext() ? sc.next() : "";

        if (s1.length() != s2.length()) {
            System.out.println("false");
            return;
        }

        char[] a1 = s1.toCharArray();
        char[] a2 = s2.toCharArray();
        Arrays.sort(a1);
        Arrays.sort(a2);

        System.out.println(Arrays.equals(a1, a2) ? "true" : "false");
    }
}
`,
      points: 10,
      testCases: [
        { stdin: 'anagram nagaram', expectedStdout: 'true', isHidden: false, weight: 1 },
        { stdin: 'rat car', expectedStdout: 'false', isHidden: false, weight: 1 },
        { stdin: 'listen silent', expectedStdout: 'true', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round1.id,
      language: Language.JAVA,
      title: 'Prime Number Verifier',
      statement: 'Given an integer N, print "true" if N is prime, else "false". Numbers <= 1 are not prime.',
      buggyCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        // BUG: Does not check <= 1 and starts loop at 1
        boolean isPrime = true;
        for (int i = 2; i < n; i++) {
            if (n % i == 0) {
                isPrime = false;
                break;
            }
        }
        System.out.println(isPrime ? "true" : "false");
    }
}
`,
      referenceSolution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        if (n <= 1) {
            System.out.println("false");
            return;
        }
        boolean isPrime = true;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                isPrime = false;
                break;
            }
        }
        System.out.println(isPrime ? "true" : "false");
    }
}
`,
      points: 10,
      testCases: [
        { stdin: '1', expectedStdout: 'false', isHidden: false, weight: 1 },
        { stdin: '2', expectedStdout: 'true', isHidden: false, weight: 1 },
        { stdin: '13', expectedStdout: 'true', isHidden: true, weight: 2 },
        { stdin: '25', expectedStdout: 'false', isHidden: true, weight: 2 },
      ],
    },

    // ==========================================
    // JAVA - ROUND 2 (MEDIUM - 20 PTS)
    // ==========================================
    {
      roundId: round2.id,
      language: Language.JAVA,
      title: 'Rotate Array by K Steps',
      statement: 'Given N and K, followed by N integers, rotate the array to the right by K steps.',
      buggyCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // BUG: Does not reduce k modulo n causing array out of bounds if k > n
        int[] rotated = new int[n];
        for (int i = 0; i < n; i++) {
            rotated[(i + k)] = arr[i];
        }

        for (int i = 0; i < n; i++) System.out.print(rotated[i] + (i == n - 1 ? "" : " "));
        System.out.println();
    }
}
`,
      referenceSolution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        k = k % n;
        int[] rotated = new int[n];
        for (int i = 0; i < n; i++) {
            rotated[(i + k) % n] = arr[i];
        }

        for (int i = 0; i < n; i++) System.out.print(rotated[i] + (i == n - 1 ? "" : " "));
        System.out.println();
    }
}
`,
      points: 20,
      testCases: [
        { stdin: '7 3\n1 2 3 4 5 6 7', expectedStdout: '5 6 7 1 2 3 4', isHidden: false, weight: 1 },
        { stdin: '4 2\n-1 -100 3 99', expectedStdout: '3 99 -1 -100', isHidden: false, weight: 1 },
        { stdin: '3 5\n1 2 3', expectedStdout: '2 3 1', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.JAVA,
      title: 'Subarray Sum Equals K Counter',
      statement: 'Given N integers and an integer K, return the total number of continuous subarrays whose sum equals K.',
      buggyCode: `import java.util.Scanner;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        // BUG: HashMap not seeded with (0, 1) base prefix
        HashMap<Integer, Integer> map = new HashMap<>();
        int count = 0, sum = 0;
        for (int x : nums) {
            sum += x;
            if (map.containsKey(sum - k)) {
                count += map.get(sum - k);
            }
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        System.out.println(count);
    }
}
`,
      referenceSolution: `import java.util.Scanner;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        HashMap<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int count = 0, sum = 0;
        for (int x : nums) {
            sum += x;
            if (map.containsKey(sum - k)) {
                count += map.get(sum - k);
            }
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        System.out.println(count);
    }
}
`,
      points: 20,
      testCases: [
        { stdin: '3 2\n1 1 1', expectedStdout: '2', isHidden: false, weight: 1 },
        { stdin: '3 3\n1 2 3', expectedStdout: '2', isHidden: false, weight: 1 },
        { stdin: '5 0\n0 0 0 0 0', expectedStdout: '15', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.JAVA,
      title: 'Binary Search in Rotated Sorted Array',
      statement: 'Given N integers sorted in ascending order and rotated at an unknown pivot, find the index of target value. Return -1 if absent.',
      buggyCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int target = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        int l = 0, r = n - 1;
        int ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) { ans = mid; break; }
            // BUG: Misjudges which half of the array is uniformly sorted
            if (nums[l] < nums[mid]) {
                if (target >= nums[l] && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        System.out.println(ans);
    }
}
`,
      referenceSolution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int target = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        int l = 0, r = n - 1;
        int ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) { ans = mid; break; }
            if (nums[l] <= nums[mid]) {
                if (target >= nums[l] && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        System.out.println(ans);
    }
}
`,
      points: 20,
      testCases: [
        { stdin: '7 0\n4 5 6 7 0 1 2', expectedStdout: '4', isHidden: false, weight: 1 },
        { stdin: '7 3\n4 5 6 7 0 1 2', expectedStdout: '-1', isHidden: false, weight: 1 },
        { stdin: '1 0\n1', expectedStdout: '-1', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.JAVA,
      title: 'Group Anagrams Array',
      statement: 'Read N strings. Group the anagrams together and output the number of distinct anagram groups.',
      buggyCode: `import java.util.Scanner;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        // BUG: Uses simple length as hash causing words of same length to group together
        HashSet<Integer> lengths = new HashSet<>();
        for (int i = 0; i < n; i++) {
            String s = sc.next();
            lengths.add(s.length());
        }
        System.out.println(lengths.size());
    }
}
`,
      referenceSolution: `import java.util.Scanner;
import java.util.HashSet;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        HashSet<String> groups = new HashSet<>();
        for (int i = 0; i < n; i++) {
            char[] chars = sc.next().toCharArray();
            Arrays.sort(chars);
            groups.add(new String(chars));
        }
        System.out.println(groups.size());
    }
}
`,
      points: 20,
      testCases: [
        { stdin: '6 eat tea tan ate nat bat', expectedStdout: '3', isHidden: false, weight: 1 },
        { stdin: '1 a', expectedStdout: '1', isHidden: false, weight: 1 },
        { stdin: '3 ab cd ef', expectedStdout: '3', isHidden: true, weight: 2 },
      ],
    },

    // ==========================================
    // JAVA - ROUND 3 (HARD - 32.5 PTS)
    // ==========================================
    {
      roundId: round3.id,
      language: Language.JAVA,
      title: 'Coin Change Minimum Coins',
      statement: 'Given coin denominations and an amount, find the fewest coins needed to make up that amount. Return -1 if not possible.',
      buggyCode: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int amount = sc.nextInt();
        int[] coins = new int[n];
        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();

        int[] dp = new int[amount + 1];
        // BUG: Initialized to Integer.MAX_VALUE causing integer overflow on + 1
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        System.out.println(dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount]);
    }
}
`,
      referenceSolution: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int amount = sc.nextInt();
        int[] coins = new int[n];
        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();

        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        System.out.println(dp[amount] > amount ? -1 : dp[amount]);
    }
}
`,
      points: 32.5,
      testCases: [
        { stdin: '3 11\n1 2 5', expectedStdout: '3', isHidden: false, weight: 1 },
        { stdin: '1 3\n2', expectedStdout: '-1', isHidden: false, weight: 1 },
        { stdin: '1 0\n1', expectedStdout: '0', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round3.id,
      language: Language.JAVA,
      title: 'Word Break Segmentation Check',
      statement: 'Given a target string S and a dictionary of N words, print "true" if S can be segmented into a space-separated sequence of dictionary words.',
      buggyCode: `import java.util.Scanner;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        int n = sc.nextInt();
        HashSet<String> dict = new HashSet<>();
        for (int i = 0; i < n; i++) dict.add(sc.next());

        boolean[] dp = new boolean[s.length() + 1];
        // BUG: Base condition dp[0] not set to true
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        System.out.println(dp[s.length()] ? "true" : "false");
    }
}
`,
      referenceSolution: `import java.util.Scanner;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        int n = sc.nextInt();
        HashSet<String> dict = new HashSet<>();
        for (int i = 0; i < n; i++) dict.add(sc.next());

        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        System.out.println(dp[s.length()] ? "true" : "false");
    }
}
`,
      points: 32.5,
      testCases: [
        { stdin: 'leetcode 2\nleet code', expectedStdout: 'true', isHidden: false, weight: 1 },
        { stdin: 'applepenapple 2\napple pen', expectedStdout: 'true', isHidden: false, weight: 1 },
        { stdin: 'catsandog 5\ncats dog sand and cat', expectedStdout: 'false', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round3.id,
      language: Language.JAVA,
      title: 'Course Schedule Cycle Detection',
      statement: 'There are N courses labeled 0 to N-1 with prerequisites [a, b]. Print "true" if you can finish all courses without cyclic dependencies, else "false".',
      buggyCode: `import java.util.Scanner;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int numCourses = sc.nextInt();
        int p = sc.nextInt();
        int[] inDegree = new int[numCourses];
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());

        for (int i = 0; i < p; i++) {
            int dest = sc.nextInt();
            int src = sc.nextInt();
            adj.get(src).add(dest);
            // BUG: inDegree increments on source instead of destination
            inDegree[src]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }

        int count = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            count++;
            for (int next : adj.get(curr)) {
                if (--inDegree[next] == 0) q.offer(next);
            }
        }
        System.out.println(count == numCourses ? "true" : "false");
    }
}
`,
      referenceSolution: `import java.util.Scanner;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int numCourses = sc.nextInt();
        int p = sc.nextInt();
        int[] inDegree = new int[numCourses];
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());

        for (int i = 0; i < p; i++) {
            int dest = sc.nextInt();
            int src = sc.nextInt();
            adj.get(src).add(dest);
            inDegree[dest]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }

        int count = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            count++;
            for (int next : adj.get(curr)) {
                if (--inDegree[next] == 0) q.offer(next);
            }
        }
        System.out.println(count == numCourses ? "true" : "false");
    }
}
`,
      points: 32.5,
      testCases: [
        { stdin: '2 1\n1 0', expectedStdout: 'true', isHidden: false, weight: 1 },
        { stdin: '2 2\n1 0\n0 1', expectedStdout: 'false', isHidden: false, weight: 1 },
      ],
    },
    {
      roundId: round3.id,
      language: Language.JAVA,
      title: 'Median of Two Sorted Arrays',
      statement: 'Given two sorted arrays of size M and N, return the median formatted with one decimal place.',
      buggyCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[] nums1 = new int[m];
        for (int i = 0; i < m; i++) nums1[i] = sc.nextInt();
        int[] nums2 = new int[n];
        for (int i = 0; i < n; i++) nums2[i] = sc.nextInt();

        int[] merged = new int[m + n];
        int i = 0, j = 0, k = 0;
        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) merged[k++] = nums1[i++];
            else merged[k++] = nums2[j++];
        }
        while (i < m) merged[k++] = nums1[i++];
        while (j < n) merged[k++] = nums2[j++];

        int total = m + n;
        // BUG: Integer division truncates decimals
        if (total % 2 == 1) {
            System.out.printf("%.1f\\n", (double)merged[total / 2]);
        } else {
            System.out.printf("%.1f\\n", (double)((merged[total / 2 - 1] + merged[total / 2]) / 2));
        }
    }
}
`,
      referenceSolution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[] nums1 = new int[m];
        for (int i = 0; i < m; i++) nums1[i] = sc.nextInt();
        int[] nums2 = new int[n];
        for (int i = 0; i < n; i++) nums2[i] = sc.nextInt();

        int[] merged = new int[m + n];
        int i = 0, j = 0, k = 0;
        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) merged[k++] = nums1[i++];
            else merged[k++] = nums2[j++];
        }
        while (i < m) merged[k++] = nums1[i++];
        while (j < n) merged[k++] = nums2[j++];

        int total = m + n;
        if (total % 2 == 1) {
            System.out.printf("%.1f\\n", (double)merged[total / 2]);
        } else {
            System.out.printf("%.1f\\n", (merged[total / 2 - 1] + merged[total / 2]) / 2.0);
        }
    }
}
`,
      points: 32.5,
      testCases: [
        { stdin: '2 1\n1 3\n2', expectedStdout: '2.0', isHidden: false, weight: 1 },
        { stdin: '2 2\n1 2\n3 4', expectedStdout: '2.5', isHidden: false, weight: 1 },
      ],
    },

    // ==========================================
    // C++ - ROUND 1 (EASY - 10 PTS)
    // ==========================================
    {
      roundId: round1.id,
      language: Language.CPP,
      title: 'Off-By-One Array Sum',
      statement: 'Read an integer N, followed by N integers. Print their sum.',
      buggyCode: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    // BUG: reading up to <= n causing buffer overflow
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
      testCases: [
        { stdin: '5\n1 2 3 4 5', expectedStdout: '15', isHidden: false, weight: 1 },
        { stdin: '3\n10 20 30', expectedStdout: '60', isHidden: false, weight: 1 },
        { stdin: '1\n999', expectedStdout: '999', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round1.id,
      language: Language.CPP,
      title: 'Two Pointer String Reversal',
      statement: 'Read a string and print it reversed.',
      buggyCode: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    int l = 0, r = s.length() - 1;
    // BUG: condition l <= r causes middle char swap with self or termination error
    while (l < r) {
        swap(s[l], s[r]);
        l++;
        // BUG: Missing r-- decrement leading to infinite loop
    }
    cout << s << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    int l = 0, r = s.length() - 1;
    while (l < r) {
        swap(s[l], s[r]);
        l++;
        r--;
    }
    cout << s << endl;
    return 0;
}
`,
      points: 10,
      testCases: [
        { stdin: 'hello', expectedStdout: 'olleh', isHidden: false, weight: 1 },
        { stdin: 'code', expectedStdout: 'edoc', isHidden: false, weight: 1 },
      ],
    },
    {
      roundId: round1.id,
      language: Language.CPP,
      title: 'Maximum Element in Array',
      statement: 'Given N integers, find and output the maximum element.',
      buggyCode: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    // BUG: Initialized to 0 which fails if all elements are negative
    int maxVal = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x > maxVal) maxVal = x;
    }
    cout << maxVal << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <vector>
#include <climits>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    int maxVal = INT_MIN;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x > maxVal) maxVal = x;
    }
    cout << maxVal << endl;
    return 0;
}
`,
      points: 10,
      testCases: [
        { stdin: '4\n-10 -5 -20 -1', expectedStdout: '-1', isHidden: false, weight: 1 },
        { stdin: '3\n10 50 30', expectedStdout: '50', isHidden: false, weight: 1 },
      ],
    },
    {
      roundId: round1.id,
      language: Language.CPP,
      title: 'Count Vowels in String',
      statement: 'Read a word. Output the total number of vowels (a, e, i, o, u, case-insensitive).',
      buggyCode: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    int count = 0;
    for (char c : s) {
        char ch = tolower(c);
        // BUG: missing break statements in switch causing duplicate counting
        switch(ch) {
            case 'a': count++;
            case 'e': count++;
            case 'i': count++;
            case 'o': count++;
            case 'u': count++; break;
        }
    }
    cout << count << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    int count = 0;
    for (char c : s) {
        char ch = tolower(c);
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            count++;
        }
    }
    cout << count << endl;
    return 0;
}
`,
      points: 10,
      testCases: [
        { stdin: 'apple', expectedStdout: '2', isHidden: false, weight: 1 },
        { stdin: 'rhythm', expectedStdout: '0', isHidden: false, weight: 1 },
      ],
    },

    // ==========================================
    // C++ - ROUND 2 (MEDIUM - 20 PTS)
    // ==========================================
    {
      roundId: round2.id,
      language: Language.CPP,
      title: 'Kadane Maximum Subarray',
      statement: 'Given an array of N integers, find the contiguous subarray with the largest sum and print its sum.',
      buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // BUG: max_so_far initialized to 0 fails on all-negative array
    int max_so_far = 0;
    int curr_max = 0;
    for (int x : a) {
        curr_max = max(x, curr_max + x);
        max_so_far = max(max_so_far, curr_max);
    }
    cout << max_so_far << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    int max_so_far = a[0];
    int curr_max = a[0];
    for (size_t i = 1; i < a.size(); i++) {
        curr_max = max(a[i], curr_max + a[i]);
        max_so_far = max(max_so_far, curr_max);
    }
    cout << max_so_far << endl;
    return 0;
}
`,
      points: 20,
      testCases: [
        { stdin: '9\n-2 1 -3 4 -1 2 1 -5 4', expectedStdout: '6', isHidden: false, weight: 1 },
        { stdin: '5\n-1 -2 -3 -4 -5', expectedStdout: '-1', isHidden: false, weight: 1 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.CPP,
      title: 'Binary Search Lower Bound Index',
      statement: 'Given a sorted array of N elements and a target X, print the 0-based index of the first element >= X. Print N if no such element.',
      buggyCode: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n, x;
    if (!(cin >> n >> x)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    int l = 0, r = n - 1, ans = n;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        // BUG: Uses strict > instead of >=
        if (arr[mid] > x) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    cout << ans << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n, x;
    if (!(cin >> n >> x)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    int l = 0, r = n - 1, ans = n;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] >= x) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    cout << ans << endl;
    return 0;
}
`,
      points: 20,
      testCases: [
        { stdin: '5 3\n1 2 3 4 5', expectedStdout: '2', isHidden: false, weight: 1 },
        { stdin: '4 6\n1 2 3 4', expectedStdout: '4', isHidden: false, weight: 1 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.CPP,
      title: 'Remove Duplicates from Sorted Array',
      statement: 'Given sorted N integers, remove duplicates in-place and print the new length followed by the unique elements.',
      buggyCode: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // BUG: Index update out of sync
    int k = 1;
    for (int i = 1; i < n; i++) {
        if (arr[i] != arr[i - 1]) {
            arr[k++] = arr[i];
        }
    }
    cout << k << "\\n";
    for (int i = 0; i < k; i++) cout << arr[i] << (i == k - 1 ? "" : " ");
    cout << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    if (n == 0) { cout << 0 << endl; return 0; }
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    int k = 1;
    for (int i = 1; i < n; i++) {
        if (arr[i] != arr[i - 1]) {
            arr[k++] = arr[i];
        }
    }
    cout << k << "\\n";
    for (int i = 0; i < k; i++) cout << arr[i] << (i == k - 1 ? "" : " ");
    cout << endl;
    return 0;
}
`,
      points: 20,
      testCases: [
        { stdin: '5\n1 1 2 2 3', expectedStdout: '3\n1 2 3', isHidden: false, weight: 1 },
        { stdin: '1\n10', expectedStdout: '1\n10', isHidden: false, weight: 1 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.CPP,
      title: '3Sum Zero Triplets Count',
      statement: 'Given N integers, return the count of unique triplets [a, b, c] such that a + b + c = 0.',
      buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    sort(nums.begin(), nums.end());
    int count = 0;

    for (int i = 0; i < n - 2; i++) {
        // BUG: Does not skip duplicate values of nums[i]
        int l = i + 1, r = n - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                count++;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    cout << count << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    sort(nums.begin(), nums.end());
    int count = 0;

    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = n - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                count++;
                while (l < r && nums[l] == nums[l + 1]) l++;
                while (l < r && nums[r] == nums[r - 1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    cout << count << endl;
    return 0;
}
`,
      points: 20,
      testCases: [
        { stdin: '6\n-1 0 1 2 -1 -4', expectedStdout: '2', isHidden: false, weight: 1 },
        { stdin: '3\n0 1 1', expectedStdout: '0', isHidden: false, weight: 1 },
      ],
    },

    // ==========================================
    // C++ - ROUND 3 (HARD - 32.5 PTS)
    // ==========================================
    {
      roundId: round3.id,
      language: Language.CPP,
      title: 'Dijkstra Shortest Path Single Source',
      statement: 'Given V vertices and E weighted edges, output shortest distance from node 0 to node V-1.',
      buggyCode: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    int v, e;
    if (!(cin >> v >> e)) return 0;
    vector<vector<pair<int, int>>> adj(v);
    for (int i = 0; i < e; i++) {
        int u, w, weight;
        cin >> u >> w >> weight;
        adj[u].push_back({w, weight});
        adj[w].push_back({u, weight});
    }

    // BUG: priority_queue defaults to max-heap instead of min-heap
    priority_queue<pair<int, int>> pq;
    vector<int> dist(v, 1e9);
    dist[0] = 0;
    pq.push({0, 0});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& [nxt, w] : adj[u]) {
            if (dist[u] + w < dist[nxt]) {
                dist[nxt] = dist[u] + w;
                pq.push({dist[nxt], nxt});
            }
        }
    }
    cout << (dist[v - 1] >= 1e9 ? -1 : dist[v - 1]) << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    int v, e;
    if (!(cin >> v >> e)) return 0;
    vector<vector<pair<int, int>>> adj(v);
    for (int i = 0; i < e; i++) {
        int u, w, weight;
        cin >> u >> w >> weight;
        adj[u].push_back({w, weight});
        adj[w].push_back({u, weight});
    }

    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(v, 1e9);
    dist[0] = 0;
    pq.push({0, 0});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& [nxt, w] : adj[u]) {
            if (dist[u] + w < dist[nxt]) {
                dist[nxt] = dist[u] + w;
                pq.push({dist[nxt], nxt});
            }
        }
    }
    cout << (dist[v - 1] >= 1e9 ? -1 : dist[v - 1]) << endl;
    return 0;
}
`,
      points: 32.5,
      testCases: [
        { stdin: '4 4\n0 1 1\n1 2 2\n2 3 3\n0 3 10', expectedStdout: '6', isHidden: false, weight: 1 },
        { stdin: '3 1\n0 1 5', expectedStdout: '-1', isHidden: false, weight: 1 },
      ],
    },
    {
      roundId: round3.id,
      language: Language.CPP,
      title: 'Longest Increasing Subsequence Length',
      statement: 'Given N integers, find the length of the longest strictly increasing subsequence in O(N log N) time.',
      buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    vector<int> tails;
    for (int x : a) {
        // BUG: uses upper_bound which allows non-decreasing instead of strictly increasing
        auto it = upper_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    vector<int> tails;
    for (int x : a) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << endl;
    return 0;
}
`,
      points: 32.5,
      testCases: [
        { stdin: '8\n10 9 2 5 3 7 101 18', expectedStdout: '4', isHidden: false, weight: 1 },
        { stdin: '6\n0 1 0 3 2 3', expectedStdout: '4', isHidden: false, weight: 1 },
      ],
    },
    {
      roundId: round3.id,
      language: Language.CPP,
      title: 'Maximum Product Subarray',
      statement: 'Given N integers, find a contiguous non-empty subarray with the largest product, and print its product.',
      buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // BUG: Does not track min_prod; multiplying negative numbers can create large positives
    long long max_prod = a[0], ans = a[0];
    for (size_t i = 1; i < a.size(); i++) {
        max_prod = max(a[i], max_prod * a[i]);
        ans = max(ans, max_prod);
    }
    cout << ans << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    long long max_prod = a[0], min_prod = a[0], ans = a[0];
    for (size_t i = 1; i < a.size(); i++) {
        if (a[i] < 0) swap(max_prod, min_prod);
        max_prod = max(a[i], max_prod * a[i]);
        min_prod = min(a[i], min_prod * a[i]);
        ans = max(ans, max_prod);
    }
    cout << ans << endl;
    return 0;
}
`,
      points: 32.5,
      testCases: [
        { stdin: '4\n2 3 -2 4', expectedStdout: '6', isHidden: false, weight: 1 },
        { stdin: '3\n-2 0 -1', expectedStdout: '0', isHidden: false, weight: 1 },
        { stdin: '4\n-2 3 -4 -1', expectedStdout: '24', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round3.id,
      language: Language.CPP,
      title: 'Minimum Window Substring Length',
      statement: 'Given string S and string T, find the length of the minimum window substring of S containing all characters in T. Print 0 if impossible.',
      buggyCode: `#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;
    unordered_map<char, int> need, window;
    for (char c : t) need[c]++;

    int match = 0, l = 0, minLen = 1e9;
    for (int r = 0; r < (int)s.size(); r++) {
        char c = s[r];
        if (need.count(c)) {
            window[c]++;
            if (window[c] == need[c]) match++;
        }
        // BUG: Does not correctly shrink left pointer window
        if (match == (int)need.size()) {
            minLen = min(minLen, r - l + 1);
        }
    }
    cout << (minLen > 1e8 ? 0 : minLen) << endl;
    return 0;
}
`,
      referenceSolution: `#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;
    unordered_map<char, int> need, window;
    for (char c : t) need[c]++;

    int match = 0, l = 0, minLen = 1e9;
    for (int r = 0; r < (int)s.size(); r++) {
        char c = s[r];
        if (need.count(c)) {
            window[c]++;
            if (window[c] == need[c]) match++;
        }
        while (match == (int)need.size()) {
            minLen = min(minLen, r - l + 1);
            char d = s[l];
            l++;
            if (need.count(d)) {
                if (window[d] == need[d]) match--;
                window[d]--;
            }
        }
    }
    cout << (minLen > 1e8 ? 0 : minLen) << endl;
    return 0;
}
`,
      points: 32.5,
      testCases: [
        { stdin: 'ADOBECODEBANC ABC', expectedStdout: '4', isHidden: false, weight: 1 },
        { stdin: 'a a', expectedStdout: '1', isHidden: false, weight: 1 },
        { stdin: 'a aa', expectedStdout: '0', isHidden: true, weight: 2 },
      ],
    },
  ];

  for (const q of questionsData) {
    const created = await prisma.question.create({
      data: {
        roundId: q.roundId,
        language: q.language,
        title: q.title,
        statement: q.statement,
        buggyCode: q.buggyCode,
        referenceSolution: q.referenceSolution,
        points: q.points,
        timeLimitMs: 2500,
        memoryLimitMb: 256,
        testCases: {
          create: q.testCases.map((tc) => ({
            stdin: tc.stdin,
            expectedStdout: tc.expectedStdout,
            isHidden: tc.isHidden,
            weight: tc.weight,
          })),
        },
      },
    });
    console.log(`  ➕ Question added [${q.language}]: ${created.title} (${q.points} pts)`);
  }

  console.log(`✅ Successfully seeded all ${questionsData.length} questions across rounds and languages!`);
}

if (require.main === module) {
  seedAll36Questions()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
