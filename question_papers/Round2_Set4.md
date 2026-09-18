# Round 2 — Medium Debugging (Set 4)

## Problem: Product of Array Except Self Without Division

**Points:** 20 Points | **Time Limit:** 2.5s | **Memory Limit:** 256MB

### Problem Statement

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
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
0 0 9 0 0

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
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
}
```

#### Java Implementation

```java
import java.util.*;

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
}
```

#### Python Implementation

```python
import sys

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
    solve()
```

