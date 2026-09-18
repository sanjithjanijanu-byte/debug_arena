# Round 2 — Medium Debugging (Set 6)

## Problem: 3Sum Triplets with Zero Sum

**Points:** 20 Points | **Time Limit:** 2.5s | **Memory Limit:** 256MB

### Problem Statement

Given an integer array nums, return the count of unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

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
}
```

#### Python Implementation

```python
import sys

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
    solve()
```

