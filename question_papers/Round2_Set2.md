# Round 2 — Medium Debugging (Set 2)

## Problem: Container With Most Water

**Points:** 20 Points | **Time Limit:** 2.5s | **Memory Limit:** 256MB

### Problem Statement

Given n non-negative integers representing heights of vertical lines on the x-axis, find two lines that together with the x-axis form a container that stores the maximum water volume.

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
1

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
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
}
```

#### Java Implementation

```java
import java.util.Scanner;

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
}
```

#### Python Implementation

```python
import sys

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
    solve()
```

