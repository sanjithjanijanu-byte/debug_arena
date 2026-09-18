import { PrismaClient, Language } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMoreRound2And3Questions() {
  console.log('🚀 Seeding additional questions for Round 2 and Round 3...');

  const round2 = await prisma.round.findUnique({ where: { number: 2 } });
  const round3 = await prisma.round.findUnique({ where: { number: 3 } });

  if (!round2 || !round3) {
    throw new Error('Rounds 2 and 3 must exist.');
  }

  const extraQuestions = [
    // ==========================================
    // PYTHON - ROUND 2 (MEDIUM - 20 PTS)
    // ==========================================
    {
      roundId: round2.id,
      language: Language.PYTHON,
      title: 'Product of Array Except Self',
      statement: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The algorithm should run in O(n) time without using the division operator.',
      buggyCode: `import sys

def product_except_self(nums):
    n = len(nums)
    res = [1] * n
    # BUG: Prefix running product starts with off-by-one multiplication
    curr = 1
    for i in range(1, n):
        curr *= nums[i]
        res[i] = curr
    
    curr = 1
    for i in range(n - 1, -1, -1):
        res[i] *= curr
        curr *= nums[i]
    return res

if __name__ == '__main__':
    nums = list(map(int, sys.stdin.read().split()))
    print(" ".join(map(str, product_except_self(nums))))
`,
      referenceSolution: `import sys

def product_except_self(nums):
    n = len(nums)
    res = [1] * n
    curr = 1
    for i in range(n):
        res[i] = curr
        curr *= nums[i]
    curr = 1
    for i in range(n - 1, -1, -1):
        res[i] *= curr
        curr *= nums[i]
    return res

if __name__ == '__main__':
    nums = list(map(int, sys.stdin.read().split()))
    print(" ".join(map(str, product_except_self(nums))))
`,
      points: 20,
      testCases: [
        { stdin: '1 2 3 4', expectedStdout: '24 12 8 6', isHidden: false, weight: 1 },
        { stdin: '-1 1 0 -3 3', expectedStdout: '0 0 9 0 0', isHidden: false, weight: 1 },
        { stdin: '2 3 4 5', expectedStdout: '60 40 30 24', isHidden: true, weight: 2 },
        { stdin: '1 1 1 1', expectedStdout: '1 1 1 1', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.PYTHON,
      title: 'Container With Most Water',
      statement: 'Given an array of integers representing vertical lines, find two lines that together with the x-axis form a container that stores the most water. Output the maximum water volume.',
      buggyCode: `import sys

def max_area(height):
    left = 0
    right = len(height) - 1
    max_water = 0
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        # BUG: Moves the larger height pointer instead of the shorter one
        if height[left] > height[right]:
            left += 1
        else:
            right -= 1
    return max_water

if __name__ == '__main__':
    heights = list(map(int, sys.stdin.read().split()))
    print(max_area(heights))
`,
      referenceSolution: `import sys

def max_area(height):
    left = 0
    right = len(height) - 1
    max_water = 0
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water

if __name__ == '__main__':
    heights = list(map(int, sys.stdin.read().split()))
    print(max_area(heights))
`,
      points: 20,
      testCases: [
        { stdin: '1 8 6 2 5 4 8 3 7', expectedStdout: '49', isHidden: false, weight: 1 },
        { stdin: '1 1', expectedStdout: '1', isHidden: false, weight: 1 },
        { stdin: '4 3 2 1 4', expectedStdout: '16', isHidden: true, weight: 2 },
        { stdin: '1 2 1', expectedStdout: '2', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.PYTHON,
      title: 'Maximum Subarray with At Most K Distinct Elements',
      statement: 'Given an array of n integers and an integer k, find the maximum sum of a contiguous subarray that contains at most k distinct elements.',
      buggyCode: `import sys
from collections import defaultdict

def solve():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    k = int(data[1])
    arr = [int(x) for x in data[2:2+n]]
    
    freq = defaultdict(int)
    left = 0
    window_sum = 0
    max_sum = float('-inf')
    
    for right in range(n):
        freq[arr[right]] += 1
        window_sum += arr[right]
        
        while len(freq) > k:
            freq[arr[left]] -= 1
            if freq[arr[left]] == 0:
                del freq[arr[left]]
            left += 1
            # BUG: Subtracts arr[left] after left is incremented
            window_sum -= arr[left]
        
        if window_sum > max_sum:
            max_sum = window_sum
            
    print(max_sum)

solve()
`,
      referenceSolution: `import sys
from collections import defaultdict

def solve():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    k = int(data[1])
    arr = [int(x) for x in data[2:2+n]]
    
    freq = defaultdict(int)
    left = 0
    window_sum = 0
    max_sum = float('-inf')
    
    for right in range(n):
        freq[arr[right]] += 1
        window_sum += arr[right]
        
        while len(freq) > k:
            window_sum -= arr[left]
            freq[arr[left]] -= 1
            if freq[arr[left]] == 0:
                del freq[arr[left]]
            left += 1
        
        if window_sum > max_sum:
            max_sum = window_sum
            
    print(max_sum)

solve()
`,
      points: 20,
      testCases: [
        { stdin: '7 2\n1 2 1 2 3 4 5', expectedStdout: '6', isHidden: false, weight: 1 },
        { stdin: '5 1\n3 3 3 3 3', expectedStdout: '15', isHidden: false, weight: 1 },
        { stdin: '5 3\n-1 -2 -3 -4 -5', expectedStdout: '-1', isHidden: true, weight: 2 },
        { stdin: '6 2\n5 1 2 1 2 5', expectedStdout: '6', isHidden: true, weight: 2 },
      ],
    },
    {
      roundId: round2.id,
      language: Language.PYTHON,
      title: 'Longest Consecutive Elements Sequence',
      statement: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence in O(n) time.',
      buggyCode: `import sys

def longest_consecutive(nums):
    if not nums: return 0
    s = set(nums)
    longest = 0
    for num in s:
        # BUG: Checks num + 1 instead of num - 1 to start streak
        if num + 1 not in s:
            curr = num
            streak = 1
            while curr + 1 in s:
                curr += 1
                streak += 1
            longest = max(longest, streak)
    return longest

if __name__ == '__main__':
    nums = list(map(int, sys.stdin.read().split()))
    print(longest_consecutive(nums))
`,
      referenceSolution: `import sys

def longest_consecutive(nums):
    if not nums: return 0
    s = set(nums)
    longest = 0
    for num in s:
        if num - 1 not in s:
            curr = num
            streak = 1
            while curr + 1 in s:
                curr += 1
                streak += 1
            longest = max(longest, streak)
    return longest

if __name__ == '__main__':
    nums = list(map(int, sys.stdin.read().split()))
    print(longest_consecutive(nums))
`,
      points: 20,
      testCases: [
        { stdin: '100 4 200 1 3 2', expectedStdout: '4', isHidden: false, weight: 1 },
        { stdin: '0 3 7 2 5 8 4 6 0 1', expectedStdout: '9', isHidden: false, weight: 1 },
        { stdin: '1 2 0 1', expectedStdout: '3', isHidden: true, weight: 2 },
        { stdin: '9', expectedStdout: '1', isHidden: true, weight: 2 },
      ],
    },

    // ==========================================
    // JAVA - ROUND 2 (MEDIUM - 20 PTS)
    // ==========================================
    {
      roundId: round2.id,
      language: Language.JAVA,
      title: 'Container With Most Water',
      statement: 'Given n non-negative integers representing heights of vertical lines, compute the maximum area of water a container can hold between two lines.',
      buggyCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) { System.out.println(0); return; }
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        
        int left = 0, right = n - 1, maxArea = 0;
        while (left < right) {
            int width = right - left;
            int height = Math.min(h[left], h[right]);
            maxArea = Math.max(maxArea, width * height);
            // BUG: Moves wrong pointer
            if (h[left] > h[right]) left++;
            else right--;
        }
        System.out.println(maxArea);
    }
}
`,
      referenceSolution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) { System.out.println(0); return; }
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        
        int left = 0, right = n - 1, maxArea = 0;
        while (left < right) {
            int width = right - left;
            int height = Math.min(h[left], h[right]);
            maxArea = Math.max(maxArea, width * height);
            if (h[left] < h[right]) left++;
            else right--;
        }
        System.out.println(maxArea);
    }
}
`,
      points: 20,
      testCases: [
        { stdin: '9\n1 8 6 2 5 4 8 3 7', expectedStdout: '49', isHidden: false, weight: 1 },
        { stdin: '2\n1 1', expectedStdout: '1', isHidden: false, weight: 1 },
        { stdin: '5\n4 3 2 1 4', expectedStdout: '16', isHidden: true, weight: 2 },
      ],
    },

    // ==========================================
    // C++ - ROUND 2 (MEDIUM - 20 PTS)
    // ==========================================
    {
      roundId: round2.id,
      language: Language.CPP,
      title: 'Container With Most Water',
      statement: 'Given n non-negative integers representing heights of vertical lines, compute the maximum area of water a container can hold between two lines.',
      buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    
    int left = 0, right = n - 1, maxArea = 0;
    while (left < right) {
        int width = right - left;
        int height = min(h[left], h[right]);
        maxArea = max(maxArea, width * height);
        // BUG: Moves wrong pointer
        if (h[left] > h[right]) left++;
        else right--;
    }
    cout << maxArea << endl;
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
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    
    int left = 0, right = n - 1, maxArea = 0;
    while (left < right) {
        int width = right - left;
        int height = min(h[left], h[right]);
        maxArea = max(maxArea, width * height);
        if (h[left] < h[right]) left++;
        else right--;
    }
    cout << maxArea << endl;
    return 0;
}
`,
      points: 20,
      testCases: [
        { stdin: '9\n1 8 6 2 5 4 8 3 7', expectedStdout: '49', isHidden: false, weight: 1 },
        { stdin: '2\n1 1', expectedStdout: '1', isHidden: false, weight: 1 },
        { stdin: '5\n4 3 2 1 4', expectedStdout: '16', isHidden: true, weight: 2 },
      ],
    },
  ];

  for (const q of extraQuestions) {
    const existing = await prisma.question.findFirst({
      where: {
        roundId: q.roundId,
        language: q.language,
        title: q.title,
      },
    });

    if (existing) {
      console.log(`Question already exists: ${q.title}`);
      continue;
    }

    const created = await prisma.question.create({
      data: {
        roundId: q.roundId,
        language: q.language,
        title: q.title,
        statement: q.statement,
        buggyCode: q.buggyCode,
        referenceSolution: q.referenceSolution,
        points: q.points,
        testCases: {
          create: q.testCases,
        },
      },
    });
    console.log(`✅ Created: [${q.language}] ${created.title}`);
  }

  console.log('Seeding complete!');
}

if (require.main === module) {
  seedMoreRound2And3Questions()
    .catch((err) => {
      console.error('Seed error:', err);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
