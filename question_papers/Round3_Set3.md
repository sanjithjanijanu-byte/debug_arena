# Round 3 — Hard Debugging (Set 3)

## Problem: Median of Two Sorted Arrays

**Points:** 30 Points | **Time Limit:** 3.0s | **Memory Limit:** 256MB

### Problem Statement

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

Input Format:
- First line: Two integers m and n
- Second line: m space-separated integers nums1[0] ... nums1[m-1]
- Third line: n space-separated integers nums2[0] ... nums2[n-1]

Output Format:
- Print the median formatted to 1 decimal place (e.g. 2.0 or 2.5).

Example 1:
Input:
2 1
1 3
2
Output:
2.0
Explanation: Merged array = [1, 2, 3] and median is 2.0.

Example 2:
Input:
2 2
1 2
3 4
Output:
2.5
Explanation: Merged array = [1, 2, 3, 4] and median is (2 + 3) / 2 = 2.5.

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
#include <climits>
#include <algorithm>
using namespace std;

int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<int> A(m), B(n);
    for (int i = 0; i < m; i++) cin >> A[i];
    for (int i = 0; i < n; i++) cin >> B[i];

    if (m > n) {
        swap(A, B);
        swap(m, n);
    }

    int low = 0, high = m;
    while (low <= high) {
        int i = low + (high - low) / 2;
        int j = (m + n + 1) / 2 - i;

        int maxLeftA = (i == 0) ? INT_MIN : A[i - 1];
        int minRightA = (i == m) ? INT_MAX : A[i];

        int maxLeftB = (j == 0) ? INT_MIN : B[j - 1];
        int minRightB = (j == n) ? INT_MAX : B[j];

        if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
            double median;
            if ((m + n) % 2 == 1) {
                median = max(maxLeftA, maxLeftB);
            } else {
                median = (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2.0;
            }
            cout << fixed << setprecision(1) << median << endl;
            return 0;
        } else if (maxLeftA > minRightB) {
            low = i + 1;
        } else {
            high = i - 1;
        }
    }
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
        int m = sc.nextInt(), n = sc.nextInt();
        int[] A = new int[m];
        for (int i = 0; i < m; i++) A[i] = sc.nextInt();
        int[] B = new int[n];
        for (int i = 0; i < n; i++) B[i] = sc.nextInt();

        if (m > n) {
            int[] temp = A; A = B; B = temp;
            int t = m; m = n; n = t;
        }

        int low = 0, high = m;
        while (low <= high) {
            int i = low + (high - low) / 2;
            int j = (m + n + 1) / 2 - i;

            int maxLeftA = (i == 0) ? Integer.MIN_VALUE : A[i - 1];
            int minRightA = (i == m) ? Integer.MAX_VALUE : A[i];

            int maxLeftB = (j == 0) ? Integer.MIN_VALUE : B[j - 1];
            int minRightB = (j == n) ? Integer.MAX_VALUE : B[j];

            if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
                double median;
                if ((m + n) % 2 == 1) {
                    median = Math.max(maxLeftA, maxLeftB);
                } else {
                    median = (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2.0;
                }
                System.out.printf(Locale.US, "%.1f\n", median);
                return;
            } else if (maxLeftA > minRightB) {
                low = i + 1;
            } else {
                high = i - 1;
            }
        }
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
    m = int(tokens[0])
    n = int(tokens[1])
    A = [int(x) for x in tokens[2:2+m]]
    B = [int(x) for x in tokens[2+m:2+m+n]]

    if m > n:
        A, B = B, A
        m, n = n, m

    low, high = 0, m
    INF = float('inf')

    while low <= high:
        i = (low + high) // 2
        j = (m + n + 1) // 2 - i

        maxLeftA = -INF if i == 0 else A[i - 1]
        minRightA = INF if i == m else A[i]

        maxLeftB = -INF if j == 0 else B[j - 1]
        minRightB = INF if j == n else B[j]

        if maxLeftA <= minRightB and maxLeftB <= minRightA:
            if (m + n) % 2 == 1:
                median = float(max(maxLeftA, maxLeftB))
            else:
                median = (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2.0
            print(f"{median:.1f}")
            return
        elif maxLeftA > minRightB:
            low = i + 1
        else:
            high = i - 1

if __name__ == '__main__':
    main()
```

