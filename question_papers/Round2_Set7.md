# Round 2 — Medium Debugging (Set 7)

## Problem: Minimum Size Subarray Sum Exceeding Target

**Points:** 20 Points | **Time Limit:** 2.5s | **Memory Limit:** 256MB

### Problem Statement

Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [nums[l], ..., nums[r]] of which the sum is greater than or equal to target. If there is no such subarray, return 0.

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
0

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
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
}
```

#### Java Implementation

```java
import java.util.*;

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
}
```

#### Python Implementation

```python
import sys

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
    solve()
```

