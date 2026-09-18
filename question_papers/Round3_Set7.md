# Round 3 — Hard Debugging (Set 7)

## Problem: Subarray Sums Divisible by K

**Points:** 30 Points | **Time Limit:** 3.0s | **Memory Limit:** 256MB

### Problem Statement

Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.
A subarray is a contiguous part of an array.

Input Format:
- First line: Two integers n and k (1 <= n <= 10^5, 2 <= k <= 10^4)
- Second line: n space-separated integers nums[0] ... nums[n-1] (-10^4 <= nums[i] <= 10^4)

Output Format:
- A single integer: the count of subarrays whose sum is divisible by k.

Example 1:
Input:
6 5
4 5 0 -2 -3 1
Output:
7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

Example 2:
Input:
1 5
5
Output:
1

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    unordered_map<int, int> remainderCount;
    remainderCount[0] = 1;

    long long prefixSum = 0;
    long long result = 0;

    for (int i = 0; i < n; i++) {
        prefixSum += nums[i];
        int rem = prefixSum % k;

        if (remainderCount.count(rem)) {
            result += remainderCount[rem];
        }
        remainderCount[rem]++;
    }

    cout << result << endl;
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

        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        Map<Integer, Integer> remainderCount = new HashMap<>();
        remainderCount.put(0, 1);

        long prefixSum = 0;
        long result = 0;

        for (int i = 0; i < n; i++) {
            prefixSum += nums[i];
            int rem = (int)(prefixSum % k);

            if (remainderCount.containsKey(rem)) {
                result += remainderCount.get(rem);
            }
            remainderCount.put(rem, remainderCount.getOrDefault(rem, 0) + 1);
        }

        System.out.println(result);
    }
}
```

#### Python Implementation

```python
import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    k = int(tokens[1])
    nums = [int(x) for x in tokens[2:2+n]]

    remainder_count = {0: 1}
    prefix_sum = 0
    result = 0

    for x in nums:
        prefix_sum += x
        rem = int(prefix_sum - int(prefix_sum / k) * k)

        if rem in remainder_count:
            result += remainder_count[rem]
        remainder_count[rem] = remainder_count.get(rem, 0) + 1

    print(result)

if __name__ == '__main__':
    main()
```

