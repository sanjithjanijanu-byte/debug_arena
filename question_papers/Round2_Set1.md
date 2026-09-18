# Round 2 — Medium Debugging (Set 1)

## Problem: Maximum Subarray Sum with At Most K Distinct Elements

**Points:** 20 Points | **Time Limit:** 2.5s | **Memory Limit:** 256MB

### Problem Statement

Given an array of n integers and an integer k, find the maximum sum of a contiguous subarray such that the subarray contains at most k distinct elements.

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
9
Explanation: Subarray [4, 5] has sum 9 and contains 2 distinct elements (<= 2).

Example 2:
Input:
5 3
-1 -2 -3 -4 -5
Output:
-1

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
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
            left++;
            windowSum -= arr[left];
        }

        if (windowSum > maxSum) maxSum = windowSum;
    }

    cout << maxSum << endl;
    return 0;
}
```

#### Java Implementation

```java
import java.util.*;

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
                left++;
                windowSum -= arr[left];
            }

            if (windowSum > maxSum) maxSum = windowSum;
        }

        System.out.println(maxSum);
    }
}
```

#### Python Implementation

```python
import sys
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
            window_sum -= arr[left]

        if window_sum > max_sum:
            max_sum = window_sum

    print(max_sum)

if __name__ == '__main__':
    solve()
```

