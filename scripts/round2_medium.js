// Round 2 — 7 Distinct Medium Debugging Problems (1 per Set)
// Each problem is implemented in CPP, JAVA, and PYTHON with buggyCode, referenceSolution, statement, and testCases.

module.exports = [
  // =========================================================================
  // SET 1: Maximum Subarray Sum with At Most K Distinct Elements
  // =========================================================================
  {
    setNumber: 1,
    title: 'Maximum Subarray Sum with At Most K Distinct Elements',
    statement: `Given an array of n integers and an integer k, find the maximum sum of a contiguous subarray such that the subarray contains at most k distinct elements.

Input Format:
- First line: Two integers n and k (1 <= n <= 10^5, 1 <= k <= n)
- Second line: n space-separated integers arr[0] ... arr[n-1] (-10^4 <= arr[i] <= 10^4)

Output Format:
- A single integer: maximum sum of a contiguous subarray with at most k distinct elements.

Example 1:
Input:
7 2
1 2 1 2 3 4 5
Output:
6
Explanation: Subarray [1, 2, 1, 2] has sum 6 and contains 2 distinct elements.

Example 2:
Input:
5 3
-1 -2 -3 -4 -5
Output:
-1`,
    rootCause: 'In the sliding window loop, left is incremented before arr[left] is subtracted from windowSum, which subtracts the element at the new left position instead of the element being removed.',
    fixDescription: 'Subtract arr[left] from windowSum BEFORE advancing the left pointer.',
    points: 20,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '7 2\n1 2 1 2 3 4 5', expectedStdout: '6', isHidden: false, weight: 1 },
      { stdin: '5 1\n3 3 3 3 3', expectedStdout: '15', isHidden: false, weight: 1 },
      { stdin: '5 3\n-1 -2 -3 -4 -5', expectedStdout: '-1', isHidden: false, weight: 1 },
      { stdin: '6 2\n10 -5 10 10 -5 20', expectedStdout: '35', isHidden: true, weight: 2 },
      { stdin: '4 2\n1 2 3 4', expectedStdout: '7', isHidden: true, weight: 2 },
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <climits>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    unordered_map<int, int> freq;
    int left = 0;
    long long windowSum = 0;
    long long maxSum = LLONG_MIN;

    for (int right = 0; right < n; right++) {
        freq[arr[right]]++;
        windowSum += arr[right];

        while (freq.size() > (size_t)k) {
            freq[arr[left]]--;
            if (freq[arr[left]] == 0) freq.erase(arr[left]);
            // BUG: left incremented before subtracting arr[left]
            left++;
            windowSum -= arr[left];
        }

        if (windowSum > maxSum) maxSum = windowSum;
    }

    cout << maxSum << endl;
    return 0;
}`,
        referenceSolution: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <climits>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    unordered_map<int, int> freq;
    int left = 0;
    long long windowSum = 0;
    long long maxSum = LLONG_MIN;

    for (int right = 0; right < n; right++) {
        freq[arr[right]]++;
        windowSum += arr[right];

        while (freq.size() > (size_t)k) {
            freq[arr[left]]--;
            if (freq[arr[left]] == 0) freq.erase(arr[left]);
            windowSum -= arr[left];
            left++;
        }

        if (windowSum > maxSum) maxSum = windowSum;
    }

    cout << maxSum << endl;
    return 0;
}`,
      },
      JAVA: {
        buggyCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0;
        long windowSum = 0;
        long maxSum = Long.MIN_VALUE;

        for (int right = 0; right < n; right++) {
            freq.merge(arr[right], 1, Integer::sum);
            windowSum += arr[right];

            while (freq.size() > k) {
                freq.merge(arr[left], -1, Integer::sum);
                if (freq.get(arr[left]) == 0) freq.remove(arr[left]);
                // BUG: left incremented before subtracting arr[left]
                left++;
                windowSum -= arr[left];
            }

            if (windowSum > maxSum) maxSum = windowSum;
        }

        System.out.println(maxSum);
    }
}`,
        referenceSolution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0;
        long windowSum = 0;
        long maxSum = Long.MIN_VALUE;

        for (int right = 0; right < n; right++) {
            freq.merge(arr[right], 1, Integer::sum);
            windowSum += arr[right];

            while (freq.size() > k) {
                freq.merge(arr[left], -1, Integer::sum);
                if (freq.get(arr[left]) == 0) freq.remove(arr[left]);
                windowSum -= arr[left];
                left++;
            }

            if (windowSum > maxSum) maxSum = windowSum;
        }

        System.out.println(maxSum);
    }
}`,
      },
      PYTHON: {
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
            # BUG: left incremented before subtracting arr[left]
            left += 1
            window_sum -= arr[left]

        if window_sum > max_sum:
            max_sum = window_sum

    print(max_sum)

if __name__ == '__main__':
    solve()`,
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
            freq[arr[left]] -= 1
            if freq[arr[left]] == 0:
                del freq[arr[left]]
            window_sum -= arr[left]
            left += 1

        if window_sum > max_sum:
            max_sum = window_sum

    print(max_sum)

if __name__ == '__main__':
    solve()`,
      },
    },
  },

  // =========================================================================
  // SET 2: Container With Most Water
  // =========================================================================
  {
    setNumber: 2,
    title: 'Container With Most Water',
    statement: `Given n non-negative integers representing heights of vertical lines on the x-axis, find two lines that together with the x-axis form a container that stores the maximum water volume.

Input Format:
- First line: Single integer n (2 <= n <= 10^5)
- Second line: n space-separated non-negative integers representing heights.

Output Format:
- Single integer representing maximum water container volume.

Example 1:
Input:
9
1 8 6 2 5 4 8 3 7
Output:
49
Explanation: The lines at index 1 (height 8) and index 8 (height 7) have width 7. Water = min(8, 7) * 7 = 49.

Example 2:
Input:
2
1 1
Output:
1`,
    rootCause: 'The two-pointer approach compares heights but advances the pointer with the LARGER height instead of the shorter height.',
    fixDescription: 'Advance the pointer with the smaller height (left++ if height[left] < height[right], else right--).',
    points: 20,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '9\n1 8 6 2 5 4 8 3 7', expectedStdout: '49', isHidden: false, weight: 1 },
      { stdin: '2\n1 1', expectedStdout: '1', isHidden: false, weight: 1 },
      { stdin: '5\n4 3 2 1 4', expectedStdout: '16', isHidden: true, weight: 2 },
      { stdin: '4\n1 2 4 3', expectedStdout: '4', isHidden: true, weight: 2 },
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];

    long long left = 0, right = n - 1;
    long long maxWater = 0;

    while (left < right) {
        long long width = right - left;
        long long height = min(h[left], h[right]);
        maxWater = max(maxWater, width * height);

        // BUG: Moves the larger pointer instead of the shorter
        if (h[left] > h[right]) {
            left++;
        } else {
            right--;
        }
    }

    cout << maxWater << endl;
    return 0;
}`,
        referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];

    long long left = 0, right = n - 1;
    long long maxWater = 0;

    while (left < right) {
        long long width = right - left;
        long long height = min(h[left], h[right]);
        maxWater = max(maxWater, width * height);

        if (h[left] < h[right]) {
            left++;
        } else {
            right--;
        }
    }

    cout << maxWater << endl;
    return 0;
}`,
      },
      JAVA: {
        buggyCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        long[] h = new long[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextLong();

        int left = 0, right = n - 1;
        long maxWater = 0;

        while (left < right) {
            long width = right - left;
            long height = Math.min(h[left], h[right]);
            maxWater = Math.max(maxWater, width * height);

            // BUG: Moves the taller pointer
            if (h[left] > h[right]) {
                left++;
            } else {
                right--;
            }
        }

        System.out.println(maxWater);
    }
}`,
        referenceSolution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        long[] h = new long[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextLong();

        int left = 0, right = n - 1;
        long maxWater = 0;

        while (left < right) {
            long width = right - left;
            long height = Math.min(h[left], h[right]);
            maxWater = Math.max(maxWater, width * height);

            if (h[left] < h[right]) {
                left++;
            } else {
                right--;
            }
        }

        System.out.println(maxWater);
    }
}`,
      },
      PYTHON: {
        buggyCode: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    h = [int(x) for x in data[1:1+n]]

    left = 0
    right = n - 1
    max_water = 0

    while left < right:
        width = right - left
        height = min(h[left], h[right])
        max_water = max(max_water, width * height)

        # BUG: Advances the taller pointer
        if h[left] > h[right]:
            left += 1
        else:
            right -= 1

    print(max_water)

if __name__ == '__main__':
    solve()`,
        referenceSolution: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    h = [int(x) for x in data[1:1+n]]

    left = 0
    right = n - 1
    max_water = 0

    while left < right:
        width = right - left
        height = min(h[left], h[right])
        max_water = max(max_water, width * height)

        if h[left] < h[right]:
            left += 1
        else:
            right -= 1

    print(max_water)

if __name__ == '__main__':
    solve()`,
      },
    },
  },

  // =========================================================================
  // SET 3: Longest Substring Without Repeating Characters
  // =========================================================================
  {
    setNumber: 3,
    title: 'Longest Substring Without Repeating Characters',
    statement: `Given a string s on stdin, find the length of the longest substring without duplicate characters.

Input Format:
- Single line containing string s (0 <= length(s) <= 10^5)

Output Format:
- Single integer representing the length of the longest substring without repeating characters.

Example 1:
Input:
abcabcbb
Output:
3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input:
bbbbb
Output:
1
Explanation: The answer is "b", with length 1.

Example 3:
Input:
pwwkew
Output:
3
Explanation: The answer is "wke", with length 3.`,
    rootCause: 'When a repeated character is encountered, the left pointer is updated directly to lastSeen[c] + 1 without taking max(left, lastSeen[c] + 1), which causes the window to mistakenly move backwards.',
    fixDescription: 'Use left = max(left, lastSeen[c] + 1) to ensure left pointer never moves backward.',
    points: 20,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: 'abcabcbb', expectedStdout: '3', isHidden: false, weight: 1 },
      { stdin: 'bbbbb', expectedStdout: '1', isHidden: false, weight: 1 },
      { stdin: 'pwwkew', expectedStdout: '3', isHidden: false, weight: 1 },
      { stdin: 'abba', expectedStdout: '2', isHidden: true, weight: 2 },
      { stdin: 'tmmzuxt', expectedStdout: '5', isHidden: true, weight: 2 },
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    string s;
    if (!getline(cin, s)) {
        cout << 0 << endl;
        return 0;
    }

    unordered_map<char, int> lastSeen;
    int left = 0;
    int maxLen = 0;

    for (int right = 0; right < (int)s.length(); right++) {
        char c = s[right];
        if (lastSeen.find(c) != lastSeen.end()) {
            // BUG: Moves left backwards if lastSeen[c] is before left
            left = lastSeen[c] + 1;
        }
        lastSeen[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }

    cout << maxLen << endl;
    return 0;
}`,
        referenceSolution: `#include <iostream>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    string s;
    if (!getline(cin, s)) {
        cout << 0 << endl;
        return 0;
    }

    unordered_map<char, int> lastSeen;
    int left = 0;
    int maxLen = 0;

    for (int right = 0; right < (int)s.length(); right++) {
        char c = s[right];
        if (lastSeen.find(c) != lastSeen.end()) {
            left = max(left, lastSeen[c] + 1);
        }
        lastSeen[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }

    cout << maxLen << endl;
    return 0;
}`,
      },
      JAVA: {
        buggyCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";

        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c)) {
                // BUG: does not clamp left
                left = lastSeen.get(c) + 1;
            }
            lastSeen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }

        System.out.println(maxLen);
    }
}`,
        referenceSolution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";

        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c)) {
                left = Math.max(left, lastSeen.get(c) + 1);
            }
            lastSeen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }

        System.out.println(maxLen);
    }
}`,
      },
      PYTHON: {
        buggyCode: `import sys

def solve():
    s = sys.stdin.read().rstrip('\r\n')
    last_seen = {}
    left = 0
    max_len = 0

    for right, c in enumerate(s):
        if c in last_seen:
            # BUG: moves left backwards
            left = last_seen[c] + 1
        last_seen[c] = right
        max_len = max(max_len, right - left + 1)

    print(max_len)

if __name__ == '__main__':
    solve()`,
        referenceSolution: `import sys

def solve():
    s = sys.stdin.read().rstrip('\r\n')
    last_seen = {}
    left = 0
    max_len = 0

    for right, c in enumerate(s):
        if c in last_seen:
            left = max(left, last_seen[c] + 1)
        last_seen[c] = right
        max_len = max(max_len, right - left + 1)

    print(max_len)

if __name__ == '__main__':
    solve()`,
      },
    },
  },

  // =========================================================================
  // SET 4: Product of Array Except Self
  // =========================================================================
  {
    setNumber: 4,
    title: 'Product of Array Except Self Without Division',
    statement: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
The algorithm must run in O(n) time without using the division operator.

Input Format:
- Space-separated integers representing the array nums (2 <= n <= 10^5, -30 <= nums[i] <= 30)

Output Format:
- Space-separated integers representing answer array.

Example 1:
Input:
1 2 3 4
Output:
24 12 8 6

Example 2:
Input:
-1 1 0 -3 3
Output:
0 0 9 0 0`,
    rootCause: 'The running prefix product array updates curr *= nums[i] before setting res[i], multiplying by the current element instead of holding the product of all elements to its left.',
    fixDescription: 'Store res[i] = curr FIRST, then update curr *= nums[i].',
    points: 20,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '1 2 3 4', expectedStdout: '24 12 8 6', isHidden: false, weight: 1 },
      { stdin: '-1 1 0 -3 3', expectedStdout: '0 0 9 0 0', isHidden: false, weight: 1 },
      { stdin: '2 3 4 5', expectedStdout: '60 40 30 24', isHidden: true, weight: 2 },
      { stdin: '1 1 1 1', expectedStdout: '1 1 1 1', isHidden: true, weight: 2 },
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<long long> nums;
    long long val;
    while (cin >> val) nums.push_back(val);
    if (nums.empty()) return 0;

    int n = nums.size();
    vector<long long> res(n, 1);

    long long curr = 1;
    for (int i = 0; i < n; i++) {
        // BUG: multiplies before assigning
        curr *= nums[i];
        res[i] = curr;
    }

    curr = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= curr;
        curr *= nums[i];
    }

    for (int i = 0; i < n; i++) {
        cout << res[i] << (i == n - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
        referenceSolution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<long long> nums;
    long long val;
    while (cin >> val) nums.push_back(val);
    if (nums.empty()) return 0;

    int n = nums.size();
    vector<long long> res(n, 1);

    long long curr = 1;
    for (int i = 0; i < n; i++) {
        res[i] = curr;
        curr *= nums[i];
    }

    curr = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= curr;
        curr *= nums[i];
    }

    for (int i = 0; i < n; i++) {
        cout << res[i] << (i == n - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      },
      JAVA: {
        buggyCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Long> list = new ArrayList<>();
        while (sc.hasNextLong()) list.add(sc.nextLong());
        if (list.isEmpty()) return;

        int n = list.size();
        long[] res = new long[n];
        long curr = 1;

        for (int i = 0; i < n; i++) {
            // BUG: multiplies before setting prefix
            curr *= list.get(i);
            res[i] = curr;
        }

        curr = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= curr;
            curr *= list.get(i);
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(res[i]).append(i == n - 1 ? "" : " ");
        }
        System.out.println(sb.toString());
    }
}`,
        referenceSolution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Long> list = new ArrayList<>();
        while (sc.hasNextLong()) list.add(sc.nextLong());
        if (list.isEmpty()) return;

        int n = list.size();
        long[] res = new long[n];
        long curr = 1;

        for (int i = 0; i < n; i++) {
            res[i] = curr;
            curr *= list.get(i);
        }

        curr = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= curr;
            curr *= list.get(i);
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(res[i]).append(i == n - 1 ? "" : " ");
        }
        System.out.println(sb.toString());
    }
}`,
      },
      PYTHON: {
        buggyCode: `import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
    n = len(nums)
    res = [1] * n

    curr = 1
    for i in range(n):
        # BUG: updates curr first
        curr *= nums[i]
        res[i] = curr

    curr = 1
    for i in range(n - 1, -1, -1):
        res[i] *= curr
        curr *= nums[i]

    print(" ".join(map(str, res)))

if __name__ == '__main__':
    solve()`,
        referenceSolution: `import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
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

    print(" ".join(map(str, res)))

if __name__ == '__main__':
    solve()`,
      },
    },
  },

  // =========================================================================
  // SET 5: Search in Rotated Sorted Array
  // =========================================================================
  {
    setNumber: 5,
    title: 'Search in Rotated Sorted Array',
    statement: `Given an integer array nums sorted in ascending order with distinct values, rotated at some unknown pivot index, and a target value, return the 0-based index of target if it is in nums, or -1 if not.
Algorithm must achieve O(log n) time complexity.

Input Format:
- First line: Integer target
- Second line: Space-separated integers representing rotated array nums

Output Format:
- Single integer: index of target, or -1.

Example 1:
Input:
0
4 5 6 7 0 1 2
Output:
4

Example 2:
Input:
3
4 5 6 7 0 1 2
Output:
-1`,
    rootCause: 'The binary search condition checks if (nums[low] < nums[mid]) instead of (nums[low] <= nums[mid]), causing the algorithm to misclassify the sorted half when low == mid.',
    fixDescription: 'Use if (nums[low] <= nums[mid]) to correctly include single-element sub-ranges.',
    points: 20,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '0\n4 5 6 7 0 1 2', expectedStdout: '4', isHidden: false, weight: 1 },
      { stdin: '3\n4 5 6 7 0 1 2', expectedStdout: '-1', isHidden: false, weight: 1 },
      { stdin: '1\n1', expectedStdout: '0', isHidden: false, weight: 1 },
      { stdin: '3\n3 1', expectedStdout: '0', isHidden: true, weight: 2 },
      { stdin: '1\n3 1', expectedStdout: '1', isHidden: true, weight: 2 },
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int low = 0, high = (int)nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        // BUG: strictly less ignores low == mid case
        if (nums[low] < nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
}

int main() {
    int target;
    if (!(cin >> target)) return 0;
    vector<int> nums;
    int x;
    while (cin >> x) nums.push_back(x);
    cout << search(nums, target) << endl;
    return 0;
}`,
        referenceSolution: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int low = 0, high = (int)nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
}

int main() {
    int target;
    if (!(cin >> target)) return 0;
    vector<int> nums;
    int x;
    while (cin >> x) nums.push_back(x);
    cout << search(nums, target) << endl;
    return 0;
}`,
      },
      JAVA: {
        buggyCode: `import java.util.*;

public class Main {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;

            // BUG: strictly less ignores low == mid
            if (nums[low] < nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int target = sc.nextInt();
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        int[] nums = new int[list.size()];
        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);
        System.out.println(search(nums, target));
    }
}`,
        referenceSolution: `import java.util.*;

public class Main {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;

            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int target = sc.nextInt();
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        int[] nums = new int[list.size()];
        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);
        System.out.println(search(nums, target));
    }
}`,
      },
      PYTHON: {
        buggyCode: `import sys

def search(nums, target):
    low = 0
    high = len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid

        # BUG: strictly less check
        if nums[low] < nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1

def solve():
    data = sys.stdin.read().split()
    if not data: return
    target = int(data[0])
    nums = [int(x) for x in data[1:]]
    print(search(nums, target))

if __name__ == '__main__':
    solve()`,
        referenceSolution: `import sys

def search(nums, target):
    low = 0
    high = len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid

        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1

def solve():
    data = sys.stdin.read().split()
    if not data: return
    target = int(data[0])
    nums = [int(x) for x in data[1:]]
    print(search(nums, target))

if __name__ == '__main__':
    solve()`,
      },
    },
  },

  // =========================================================================
  // SET 6: 3Sum Triplets Summing to Zero
  // =========================================================================
  {
    setNumber: 6,
    title: '3Sum Triplets with Zero Sum',
    statement: `Given an integer array nums, return the count of unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Input Format:
- Space-separated integers representing array nums (3 <= n <= 3000, -10^5 <= nums[i] <= 10^5)

Output Format:
- Single integer: the count of unique triplets that sum to 0.

Example 1:
Input:
-1 0 1 2 -1 -4
Output:
2
Explanation: Triplets are [-1, -1, 2] and [-1, 0, 1].

Example 2:
Input:
0 1 1
Output:
0`,
    rootCause: 'When a valid triplet is found, the inner while loops to skip duplicate values check arr[left] == arr[left + 1] without initially stepping pointers, leading to infinite loops or skipping unique elements.',
    fixDescription: 'Advance pointers first: left++; right--; while (left < right && nums[left] == nums[left - 1]) left++; while (left < right && nums[right] == nums[right + 1]) right--;',
    points: 20,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '-1 0 1 2 -1 -4', expectedStdout: '2', isHidden: false, weight: 1 },
      { stdin: '0 1 1', expectedStdout: '0', isHidden: false, weight: 1 },
      { stdin: '0 0 0 0', expectedStdout: '1', isHidden: false, weight: 1 },
      { stdin: '-2 0 1 1 2', expectedStdout: '2', isHidden: true, weight: 2 },
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<long long> nums;
    long long x;
    while (cin >> x) nums.push_back(x);
    if (nums.size() < 3) {
        cout << 0 << endl;
        return 0;
    }

    sort(nums.begin(), nums.end());
    int n = nums.size();
    int count = 0;

    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = n - 1;

        while (left < right) {
            long long sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                count++;
                // BUG: Infinite loop or wrong skip condition
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    cout << count << endl;
    return 0;
}`,
        referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<long long> nums;
    long long x;
    while (cin >> x) nums.push_back(x);
    if (nums.size() < 3) {
        cout << 0 << endl;
        return 0;
    }

    sort(nums.begin(), nums.end());
    int n = nums.size();
    int count = 0;

    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = n - 1;

        while (left < right) {
            long long sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                count++;
                left++;
                right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    cout << count << endl;
    return 0;
}`,
      },
      JAVA: {
        buggyCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Long> list = new ArrayList<>();
        while (sc.hasNextLong()) list.add(sc.nextLong());
        if (list.size() < 3) {
            System.out.println(0);
            return;
        }

        Collections.sort(list);
        int n = list.size();
        int count = 0;

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && Objects.equals(list.get(i), list.get(i - 1))) continue;
            int left = i + 1, right = n - 1;

            while (left < right) {
                long sum = list.get(i) + list.get(left) + list.get(right);
                if (sum == 0) {
                    count++;
                    // BUG: duplicate skip logic flaw
                    while (left < right && Objects.equals(list.get(left), list.get(left + 1))) left++;
                    while (left < right && Objects.equals(list.get(right), list.get(right - 1))) right--;
                    left++;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        System.out.println(count);
    }
}`,
        referenceSolution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Long> list = new ArrayList<>();
        while (sc.hasNextLong()) list.add(sc.nextLong());
        if (list.size() < 3) {
            System.out.println(0);
            return;
        }

        Collections.sort(list);
        int n = list.size();
        int count = 0;

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && Objects.equals(list.get(i), list.get(i - 1))) continue;
            int left = i + 1, right = n - 1;

            while (left < right) {
                long sum = list.get(i) + list.get(left) + list.get(right);
                if (sum == 0) {
                    count++;
                    left++;
                    right--;
                    while (left < right && Objects.equals(list.get(left), list.get(left - 1))) left++;
                    while (left < right && Objects.equals(list.get(right), list.get(right + 1))) right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        System.out.println(count);
    }
}`,
      },
      PYTHON: {
        buggyCode: `import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if len(nums) < 3:
        print(0)
        return

    nums.sort()
    n = len(nums)
    count = 0

    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left = i + 1
        right = n - 1

        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                count += 1
                # BUG: wrong duplicate step
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
            elif s < 0:
                left += 1
            else:
                right -= 1

    print(count)

if __name__ == '__main__':
    solve()`,
        referenceSolution: `import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if len(nums) < 3:
        print(0)
        return

    nums.sort()
    n = len(nums)
    count = 0

    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left = i + 1
        right = n - 1

        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                count += 1
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1

    print(count)

if __name__ == '__main__':
    solve()`,
      },
    },
  },

  // =========================================================================
  // SET 7: Minimum Size Subarray Sum
  // =========================================================================
  {
    setNumber: 7,
    title: 'Minimum Size Subarray Sum Exceeding Target',
    statement: `Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [nums[l], ..., nums[r]] of which the sum is greater than or equal to target. If there is no such subarray, return 0.

Input Format:
- First line: Integer target (1 <= target <= 10^9)
- Second line: Space-separated positive integers nums (1 <= n <= 10^5)

Output Format:
- Single integer: minimal length of subarray with sum >= target, or 0.

Example 1:
Input:
7
2 3 1 2 4 3
Output:
2
Explanation: The subarray [4, 3] has the minimal length 2 under the problem constraint.

Example 2:
Input:
4
1 4 4
Output:
1

Example 3:
Input:
11
1 1 1 1 1 1 1 1
Output:
0`,
    rootCause: 'The sliding window shrinking condition uses (windowSum > target) instead of (windowSum >= target), failing to record minimal windows where the sum is exactly equal to target.',
    fixDescription: 'Change while condition to while (windowSum >= target).',
    points: 20,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '7\n2 3 1 2 4 3', expectedStdout: '2', isHidden: false, weight: 1 },
      { stdin: '4\n1 4 4', expectedStdout: '1', isHidden: false, weight: 1 },
      { stdin: '11\n1 1 1 1 1 1 1 1', expectedStdout: '0', isHidden: false, weight: 1 },
      { stdin: '15\n1 2 3 4 5', expectedStdout: '5', isHidden: true, weight: 2 },
      { stdin: '6\n10 2 3', expectedStdout: '1', isHidden: true, weight: 2 },
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    long long target;
    if (!(cin >> target)) return 0;
    vector<long long> nums;
    long long val;
    while (cin >> val) nums.push_back(val);

    int n = nums.size();
    long long windowSum = 0;
    int left = 0;
    int minLen = n + 1;

    for (int right = 0; right < n; right++) {
        windowSum += nums[right];
        // BUG: strictly greater than target ignores sum == target
        while (windowSum > target) {
            minLen = min(minLen, right - left + 1);
            windowSum -= nums[left++];
        }
    }

    cout << (minLen > n ? 0 : minLen) << endl;
    return 0;
}`,
        referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    long long target;
    if (!(cin >> target)) return 0;
    vector<long long> nums;
    long long val;
    while (cin >> val) nums.push_back(val);

    int n = nums.size();
    long long windowSum = 0;
    int left = 0;
    int minLen = n + 1;

    for (int right = 0; right < n; right++) {
        windowSum += nums[right];
        while (windowSum >= target) {
            minLen = min(minLen, right - left + 1);
            windowSum -= nums[left++];
        }
    }

    cout << (minLen > n ? 0 : minLen) << endl;
    return 0;
}`,
      },
      JAVA: {
        buggyCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long target = sc.nextLong();
        List<Long> list = new ArrayList<>();
        while (sc.hasNextLong()) list.add(sc.nextLong());

        int n = list.size();
        long windowSum = 0;
        int left = 0;
        int minLen = n + 1;

        for (int right = 0; right < n; right++) {
            windowSum += list.get(right);
            // BUG: strictly greater
            while (windowSum > target) {
                minLen = Math.min(minLen, right - left + 1);
                windowSum -= list.get(left++);
            }
        }

        System.out.println(minLen > n ? 0 : minLen);
    }
}`,
        referenceSolution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long target = sc.nextLong();
        List<Long> list = new ArrayList<>();
        while (sc.hasNextLong()) list.add(sc.nextLong());

        int n = list.size();
        long windowSum = 0;
        int left = 0;
        int minLen = n + 1;

        for (int right = 0; right < n; right++) {
            windowSum += list.get(right);
            while (windowSum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                windowSum -= list.get(left++);
            }
        }

        System.out.println(minLen > n ? 0 : minLen);
    }
}`,
      },
      PYTHON: {
        buggyCode: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data: return
    target = int(data[0])
    nums = [int(x) for x in data[1:]]

    n = len(nums)
    window_sum = 0
    left = 0
    min_len = n + 1

    for right in range(n):
        window_sum += nums[right]
        # BUG: strictly greater
        while window_sum > target:
            min_len = min(min_len, right - left + 1)
            window_sum -= nums[left]
            left += 1

    print(0 if min_len > n else min_len)

if __name__ == '__main__':
    solve()`,
        referenceSolution: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data: return
    target = int(data[0])
    nums = [int(x) for x in data[1:]]

    n = len(nums)
    window_sum = 0
    left = 0
    min_len = n + 1

    for right in range(n):
        window_sum += nums[right]
        while window_sum >= target:
            min_len = min(min_len, right - left + 1)
            window_sum -= nums[left]
            left += 1

    print(0 if min_len > n else min_len)

if __name__ == '__main__':
    solve()`,
      },
    },
  },
];
