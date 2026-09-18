# PLATFORM QUESTION BANK — QUESTIONS ALONE (36 QUESTIONS)

## Round 1 — PYTHON — Fix the Palindrome Checker (10 pts)

**Problem Statement:**
Given a string on stdin, print "true" if it is a palindrome ignoring casing and non-alphanumeric characters, else "false". The current program fails on punctuation and casing.

**Sample Test Cases:**

- **Sample 1:** Input: `racecar` → Expected Output: `true`
- **Sample 2:** Input: `hello` → Expected Output: `false`

**Starter Code (python):**

```python
import sys

def is_palindrome(s):
    return s == s[::-1]

if __name__ == '__main__':
    line = sys.stdin.read().strip()
    if is_palindrome(line):
        print("true")
    else:
        print("false")
```

---

## Round 1 — PYTHON — Off-By-One Fibonacci Number (10 pts)

**Problem Statement:**
Read integer N (0-indexed). Print the N-th Fibonacci number where F(0)=0, F(1)=1, F(2)=1, F(3)=2, etc. The buggy program has an off-by-one loop limit.

**Sample Test Cases:**

- **Sample 1:** Input: `0` → Expected Output: `0`
- **Sample 2:** Input: `1` → Expected Output: `1`

**Starter Code (python):**

```python
import sys

def fib(n):
    if n <= 0: return 0
    if n == 1: return 1
    a, b = 0, 1
    for _ in range(n + 1):
        a, b = b, a + b
    return a

if __name__ == '__main__':
    n = int(sys.stdin.read().strip())
    print(fib(n))
```

---

## Round 1 — PYTHON — Reverse Words in a Sentence (10 pts)

**Problem Statement:**
Read a line of text. Reverse the order of the words while keeping characters inside each word in original order. Eliminate multiple spaces.

**Sample Test Cases:**

- **Sample 1:** Input: `the sky is blue` → Expected Output: `blue is sky the`
- **Sample 2:** Input: `  hello world  ` → Expected Output: `world hello`

**Starter Code (python):**

```python
import sys

line = sys.stdin.read().strip()
print(line[::-1])
```

---

## Round 1 — PYTHON — Find the Missing Number in Range (10 pts)

**Problem Statement:**
Given N, followed by N distinct integers in range [0, N], find the one missing number. The buggy program has an accumulator arithmetic flaw.

**Sample Test Cases:**

- **Sample 1:** Input: `3 3 0 1` → Expected Output: `2`
- **Sample 2:** Input: `2 0 1` → Expected Output: `2`

**Starter Code (python):**

```python
import sys

tokens = list(map(int, sys.stdin.read().split()))
if not tokens:
    print(0)
    sys.exit(0)

n = tokens[0]
nums = tokens[1:]
expected_sum = (n * (n - 1)) // 2
actual_sum = sum(nums)
print(expected_sum - actual_sum)
```

---

## Round 2 — PYTHON — Valid Parentheses & Bracket Matching (20 pts)

**Problem Statement:**
Given a string containing only brackets "()[]{}", determine if the input string is valid. Open brackets must be closed in the correct order.

**Sample Test Cases:**

- **Sample 1:** Input: `()[]{}` → Expected Output: `true`
- **Sample 2:** Input: `(]` → Expected Output: `false`

**Starter Code (python):**

```python
import sys

def is_valid(s):
    stack = []
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
```

---

## Round 2 — PYTHON — Two Sum Target Index Pair (20 pts)

**Problem Statement:**
Given a target sum T and an array of integers, print the 0-based indices of the two numbers that add up to T. Print smaller index first.

**Sample Test Cases:**

- **Sample 1:** Input: `9 2 7 11 15` → Expected Output: `0 1`
- **Sample 2:** Input: `6 3 2 4` → Expected Output: `1 2`

**Starter Code (python):**

```python
import sys

tokens = list(map(int, sys.stdin.read().split()))
target = tokens[0]
nums = tokens[1:]
seen = {val: i for i, val in enumerate(nums)}
for i, num in enumerate(nums):
    diff = target - num
    if diff in seen:
        print(f"{i} {seen[diff]}")
        break
```

---

## Round 2 — PYTHON — Longest Substring Without Repeating Characters (20 pts)

**Problem Statement:**
Find the length of the longest substring without duplicate characters.

**Sample Test Cases:**

- **Sample 1:** Input: `abcabcbb` → Expected Output: `3`
- **Sample 2:** Input: `bbbbb` → Expected Output: `1`

**Starter Code (python):**

```python
import sys

s = sys.stdin.read().strip()
max_len = 0
left = 0
seen = set()

for right in range(len(s)):
    if s[right] in seen:
        left = right
        seen.clear()
    seen.add(s[right])
    max_len = max(max_len, right - left + 1)

print(max_len)
```

---

## Round 2 — PYTHON — Merge Overlapping Intervals (20 pts)

**Problem Statement:**
Given N intervals [start, end], merge all overlapping intervals and print each merged interval.

**Sample Test Cases:**

- **Sample 1:** Input: `4 1 3 2 6 8 10 15 18` → Expected Output: `1 6\n8 10\n15 18`
- **Sample 2:** Input: `2 1 4 4 5` → Expected Output: `1 5`

**Starter Code (python):**

```python
import sys

tokens = list(map(int, sys.stdin.read().split()))
if not tokens: sys.exit(0)
n = tokens[0]
raw = tokens[1:]
intervals = []
for i in range(0, 2*n, 2):
    intervals.append([raw[i], raw[i+1]])
merged = [intervals[0]]
for current in intervals[1:]:
    prev = merged[-1]
    if current[0] <= prev[1]:
        prev[1] = max(prev[1], current[1])
    else:
        merged.append(current)

for interval in merged:
    print(f"{interval[0]} {interval[1]}")
```

---

## Round 3 — PYTHON — Trapping Rain Water Calculation (32 pts)

**Problem Statement:**
Given N elevation map heights, compute how much water it can trap after raining.

**Sample Test Cases:**

- **Sample 1:** Input: `0 1 0 2 1 0 1 3 2 1 2 1` → Expected Output: `6`
- **Sample 2:** Input: `4 2 0 3 2 5` → Expected Output: `9`

**Starter Code (python):**

```python
import sys

tokens = list(map(int, sys.stdin.read().split()))
if len(tokens) <= 2:
    print(0)
    sys.exit(0)
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
```

---

## Round 3 — PYTHON — LRU Cache Access Simulator (32 pts)

**Problem Statement:**
Implement an LRU cache with capacity C. Commands: PUT k v, GET k. Output values for GET or -1 if absent.

**Sample Test Cases:**

- **Sample 1:** Input: `2\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3` → Expected Output: `1\n-1\n3`

**Starter Code (python):**

```python
import sys
from collections import OrderedDict

lines = sys.stdin.read().strip().splitlines()
if not lines: sys.exit(0)

capacity = int(lines[0])
cache = OrderedDict()

for line in lines[1:]:
    parts = line.split()
    if parts[0] == 'PUT':
        k, v = int(parts[1]), int(parts[2])
        if len(cache) >= capacity and k not in cache:
            cache.popitem(last=True) # Popping wrong end!
        cache[k] = v
    elif parts[0] == 'GET':
        k = int(parts[1])
        if k in cache:
            print(cache[k])
        else:
            print(-1)
```

---

## Round 3 — PYTHON — Minimum Path Sum in a Grid (32 pts)

**Problem Statement:**
Given an M x N grid with non-negative integers, find a path from top-left to bottom-right minimizing the sum of values along its path.

**Sample Test Cases:**

- **Sample 1:** Input: `3 3\n1 3 1\n1 5 1\n4 2 1` → Expected Output: `7`

**Starter Code (python):**

```python
import sys

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
    dp[i][0] = grid[i][0]
for j in range(1, n):
    dp[0][j] = grid[0][j]

for i in range(1, m):
    for j in range(1, n):
        dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])

print(dp[m-1][n-1])
```

---

## Round 3 — PYTHON — Sliding Window Maximum Deque (32 pts)

**Problem Statement:**
Given an array of integers and a sliding window of size K, output the maximum value in each window from left to right.

**Sample Test Cases:**

- **Sample 1:** Input: `3 1 3 -1 -3 5 3 6 7` → Expected Output: `3 3 5 5 6 7`

**Starter Code (python):**

```python
import sys
from collections import deque

tokens = list(map(int, sys.stdin.read().split()))
if not tokens: sys.exit(0)
k = tokens[0]
nums = tokens[1:]

dq = deque()
res = []

for i, x in enumerate(nums):
    while dq and dq[-1] < x:
        dq.pop()
    dq.append(x)
    if i >= k - 1:
        res.append(dq[0])

print(" ".join(map(str, res)))
```

---

## Round 1 — JAVA — String Tokenizer Word Count (10 pts)

**Problem Statement:**
Given a sentence on stdin, print the total number of words separated by spaces.

**Sample Test Cases:**

- **Sample 1:** Input: `The quick brown fox` → Expected Output: `4`
- **Sample 2:** Input: `  multiple   spaces  between  words  ` → Expected Output: `4`

**Starter Code (java):**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) {
            System.out.println(0);
            return;
        }
        String line = sc.nextLine();
        String[] words = line.split(" ");
        System.out.println(words.length);
    }
}
```

---

## Round 1 — JAVA — Array Prefix Sums Accumulator (10 pts)

**Problem Statement:**
Read integer N, then N integers. Output the running prefix sum array.

**Sample Test Cases:**

- **Sample 1:** Input: `4 1 2 3 4` → Expected Output: `1 3 6 10`
- **Sample 2:** Input: `5 1 1 1 1 1` → Expected Output: `1 2 3 4 5`

**Starter Code (java):**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        for (int i = 0; i < n; i++) {
            arr[i] = arr[i] + arr[i - 1];
        }

        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + (i == n - 1 ? "" : " "));
        }
        System.out.println();
    }
}
```

---

## Round 1 — JAVA — Anagram String Verifier (10 pts)

**Problem Statement:**
Read two strings S1 and S2 on separate lines. Print "true" if S1 and S2 are anagrams (same characters with same frequency), else "false".

**Sample Test Cases:**

- **Sample 1:** Input: `anagram nagaram` → Expected Output: `true`
- **Sample 2:** Input: `rat car` → Expected Output: `false`

**Starter Code (java):**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s1 = sc.hasNext() ? sc.next() : "";
        String s2 = sc.hasNext() ? sc.next() : "";
        if (s1.length() == s2.length()) {
            System.out.println("true");
        } else {
            System.out.println("false");
        }
    }
}
```

---

## Round 1 — JAVA — Prime Number Verifier (10 pts)

**Problem Statement:**
Given an integer N, print "true" if N is prime, else "false". Numbers <= 1 are not prime.

**Sample Test Cases:**

- **Sample 1:** Input: `1` → Expected Output: `false`
- **Sample 2:** Input: `2` → Expected Output: `true`

**Starter Code (java):**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
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
```

---

## Round 2 — JAVA — Rotate Array by K Steps (20 pts)

**Problem Statement:**
Given N and K, followed by N integers, rotate the array to the right by K steps.

**Sample Test Cases:**

- **Sample 1:** Input: `7 3\n1 2 3 4 5 6 7` → Expected Output: `5 6 7 1 2 3 4`
- **Sample 2:** Input: `4 2\n-1 -100 3 99` → Expected Output: `3 99 -1 -100`

**Starter Code (java):**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int[] rotated = new int[n];
        for (int i = 0; i < n; i++) {
            rotated[(i + k)] = arr[i];
        }

        for (int i = 0; i < n; i++) System.out.print(rotated[i] + (i == n - 1 ? "" : " "));
        System.out.println();
    }
}
```

---

## Round 2 — JAVA — Subarray Sum Equals K Counter (20 pts)

**Problem Statement:**
Given N integers and an integer K, return the total number of continuous subarrays whose sum equals K.

**Sample Test Cases:**

- **Sample 1:** Input: `3 2\n1 1 1` → Expected Output: `2`
- **Sample 2:** Input: `3 3\n1 2 3` → Expected Output: `2`

**Starter Code (java):**

```java
import java.util.Scanner;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
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
```

---

## Round 2 — JAVA — Binary Search in Rotated Sorted Array (20 pts)

**Problem Statement:**
Given N integers sorted in ascending order and rotated at an unknown pivot, find the index of target value. Return -1 if absent.

**Sample Test Cases:**

- **Sample 1:** Input: `7 0\n4 5 6 7 0 1 2` → Expected Output: `4`
- **Sample 2:** Input: `7 3\n4 5 6 7 0 1 2` → Expected Output: `-1`

**Starter Code (java):**

```java
import java.util.Scanner;

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
```

---

## Round 2 — JAVA — Group Anagrams Array (20 pts)

**Problem Statement:**
Read N strings. Group the anagrams together and output the number of distinct anagram groups.

**Sample Test Cases:**

- **Sample 1:** Input: `6 eat tea tan ate nat bat` → Expected Output: `3`
- **Sample 2:** Input: `1 a` → Expected Output: `1`

**Starter Code (java):**

```java
import java.util.Scanner;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<Integer> lengths = new HashSet<>();
        for (int i = 0; i < n; i++) {
            String s = sc.next();
            lengths.add(s.length());
        }
        System.out.println(lengths.size());
    }
}
```

---

## Round 3 — JAVA — Coin Change Minimum Coins (32 pts)

**Problem Statement:**
Given coin denominations and an amount, find the fewest coins needed to make up that amount. Return -1 if not possible.

**Sample Test Cases:**

- **Sample 1:** Input: `3 11\n1 2 5` → Expected Output: `3`
- **Sample 2:** Input: `1 3\n2` → Expected Output: `-1`

**Starter Code (java):**

```java
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int amount = sc.nextInt();
        int[] coins = new int[n];
        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();

        int[] dp = new int[amount + 1];
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
```

---

## Round 3 — JAVA — Word Break Segmentation Check (32 pts)

**Problem Statement:**
Given a target string S and a dictionary of N words, print "true" if S can be segmented into a space-separated sequence of dictionary words.

**Sample Test Cases:**

- **Sample 1:** Input: `leetcode 2\nleet code` → Expected Output: `true`
- **Sample 2:** Input: `applepenapple 2\napple pen` → Expected Output: `true`

**Starter Code (java):**

```java
import java.util.Scanner;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        int n = sc.nextInt();
        HashSet<String> dict = new HashSet<>();
        for (int i = 0; i < n; i++) dict.add(sc.next());

        boolean[] dp = new boolean[s.length() + 1];
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
```

---

## Round 3 — JAVA — Course Schedule Cycle Detection (32 pts)

**Problem Statement:**
There are N courses labeled 0 to N-1 with prerequisites [a, b]. Print "true" if you can finish all courses without cyclic dependencies, else "false".

**Sample Test Cases:**

- **Sample 1:** Input: `2 1\n1 0` → Expected Output: `true`
- **Sample 2:** Input: `2 2\n1 0\n0 1` → Expected Output: `false`

**Starter Code (java):**

```java
import java.util.Scanner;
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
```

---

## Round 3 — JAVA — Median of Two Sorted Arrays (32 pts)

**Problem Statement:**
Given two sorted arrays of size M and N, return the median formatted with one decimal place.

**Sample Test Cases:**

- **Sample 1:** Input: `2 1\n1 3\n2` → Expected Output: `2.0`
- **Sample 2:** Input: `2 2\n1 2\n3 4` → Expected Output: `2.5`

**Starter Code (java):**

```java
import java.util.Scanner;

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
        if (total % 2 == 1) {
            System.out.printf("%.1f\\n", (double)merged[total / 2]);
        } else {
            System.out.printf("%.1f\\n", (double)((merged[total / 2 - 1] + merged[total / 2]) / 2));
        }
    }
}
```

---

## Round 1 — CPP — Off-By-One Array Sum (10 pts)

**Problem Statement:**
Read an integer N, followed by N integers. Print their sum.

**Sample Test Cases:**

- **Sample 1:** Input: `5\n1 2 3 4 5` → Expected Output: `15`
- **Sample 2:** Input: `3\n10 20 30` → Expected Output: `60`

**Starter Code (cpp):**

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
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
```

---

## Round 1 — CPP — Two Pointer String Reversal (10 pts)

**Problem Statement:**
Read a string and print it reversed.

**Sample Test Cases:**

- **Sample 1:** Input: `hello` → Expected Output: `olleh`
- **Sample 2:** Input: `code` → Expected Output: `edoc`

**Starter Code (cpp):**

```cpp
#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    int l = 0, r = s.length() - 1;
    while (l < r) {
        swap(s[l], s[r]);
        l++;
    }
    cout << s << endl;
    return 0;
}
```

---

## Round 1 — CPP — Maximum Element in Array (10 pts)

**Problem Statement:**
Given N integers, find and output the maximum element.

**Sample Test Cases:**

- **Sample 1:** Input: `4\n-10 -5 -20 -1` → Expected Output: `-1`
- **Sample 2:** Input: `3\n10 50 30` → Expected Output: `50`

**Starter Code (cpp):**

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    int maxVal = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x > maxVal) maxVal = x;
    }
    cout << maxVal << endl;
    return 0;
}
```

---

## Round 1 — CPP — Count Vowels in String (10 pts)

**Problem Statement:**
Read a word. Output the total number of vowels (a, e, i, o, u, case-insensitive).

**Sample Test Cases:**

- **Sample 1:** Input: `apple` → Expected Output: `2`
- **Sample 2:** Input: `rhythm` → Expected Output: `0`

**Starter Code (cpp):**

```cpp
#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    int count = 0;
    for (char c : s) {
        char ch = tolower(c);
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
```

---

## Round 2 — CPP — Kadane Maximum Subarray (20 pts)

**Problem Statement:**
Given an array of N integers, find the contiguous subarray with the largest sum and print its sum.

**Sample Test Cases:**

- **Sample 1:** Input: `9\n-2 1 -3 4 -1 2 1 -5 4` → Expected Output: `6`
- **Sample 2:** Input: `5\n-1 -2 -3 -4 -5` → Expected Output: `-1`

**Starter Code (cpp):**

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int max_so_far = 0;
    int curr_max = 0;
    for (int x : a) {
        curr_max = max(x, curr_max + x);
        max_so_far = max(max_so_far, curr_max);
    }
    cout << max_so_far << endl;
    return 0;
}
```

---

## Round 2 — CPP — Binary Search Lower Bound Index (20 pts)

**Problem Statement:**
Given a sorted array of N elements and a target X, print the 0-based index of the first element >= X. Print N if no such element.

**Sample Test Cases:**

- **Sample 1:** Input: `5 3\n1 2 3 4 5` → Expected Output: `2`
- **Sample 2:** Input: `4 6\n1 2 3 4` → Expected Output: `4`

**Starter Code (cpp):**

```cpp
#include <iostream>
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
```

---

## Round 2 — CPP — Remove Duplicates from Sorted Array (20 pts)

**Problem Statement:**
Given sorted N integers, remove duplicates in-place and print the new length followed by the unique elements.

**Sample Test Cases:**

- **Sample 1:** Input: `5\n1 1 2 2 3` → Expected Output: `3\n1 2 3`
- **Sample 2:** Input: `1\n10` → Expected Output: `1\n10`

**Starter Code (cpp):**

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
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
```

---

## Round 2 — CPP — 3Sum Zero Triplets Count (20 pts)

**Problem Statement:**
Given N integers, return the count of unique triplets [a, b, c] such that a + b + c = 0.

**Sample Test Cases:**

- **Sample 1:** Input: `6\n-1 0 1 2 -1 -4` → Expected Output: `2`
- **Sample 2:** Input: `3\n0 1 1` → Expected Output: `0`

**Starter Code (cpp):**

```cpp
#include <iostream>
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
```

---

## Round 3 — CPP — Dijkstra Shortest Path Single Source (32 pts)

**Problem Statement:**
Given V vertices and E weighted edges, output shortest distance from node 0 to node V-1.

**Sample Test Cases:**

- **Sample 1:** Input: `4 4\n0 1 1\n1 2 2\n2 3 3\n0 3 10` → Expected Output: `6`
- **Sample 2:** Input: `3 1\n0 1 5` → Expected Output: `-1`

**Starter Code (cpp):**

```cpp
#include <iostream>
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
```

---

## Round 3 — CPP — Longest Increasing Subsequence Length (32 pts)

**Problem Statement:**
Given N integers, find the length of the longest strictly increasing subsequence in O(N log N) time.

**Sample Test Cases:**

- **Sample 1:** Input: `8\n10 9 2 5 3 7 101 18` → Expected Output: `4`
- **Sample 2:** Input: `6\n0 1 0 3 2 3` → Expected Output: `4`

**Starter Code (cpp):**

```cpp
#include <iostream>
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
        auto it = upper_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << endl;
    return 0;
}
```

---

## Round 3 — CPP — Maximum Product Subarray (32 pts)

**Problem Statement:**
Given N integers, find a contiguous non-empty subarray with the largest product, and print its product.

**Sample Test Cases:**

- **Sample 1:** Input: `4\n2 3 -2 4` → Expected Output: `6`
- **Sample 2:** Input: `3\n-2 0 -1` → Expected Output: `0`

**Starter Code (cpp):**

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    long long max_prod = a[0], ans = a[0];
    for (size_t i = 1; i < a.size(); i++) {
        max_prod = max(a[i], max_prod * a[i]);
        ans = max(ans, max_prod);
    }
    cout << ans << endl;
    return 0;
}
```

---

## Round 3 — CPP — Minimum Window Substring Length (32 pts)

**Problem Statement:**
Given string S and string T, find the length of the minimum window substring of S containing all characters in T. Print 0 if impossible.

**Sample Test Cases:**

- **Sample 1:** Input: `ADOBECODEBANC ABC` → Expected Output: `4`
- **Sample 2:** Input: `a a` → Expected Output: `1`

**Starter Code (cpp):**

```cpp
#include <iostream>
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
        if (match == (int)need.size()) {
            minLen = min(minLen, r - l + 1);
        }
    }
    cout << (minLen > 1e8 ? 0 : minLen) << endl;
    return 0;
}
```

---

