# Round 2 — Hard Debugging (Set 4)

## Problem: Trapping Rain Water with Monotonic Stack

**Points:** 30 Points | **Difficulty:** Hard | **Time Limit:** 3.0s | **Memory Limit:** 256MB

### Problem Statement

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Input Format:
- First line: Single integer n (1 <= n <= 10^5)
- Second line: n space-separated non-negative integers height[0] ... height[n-1]

Output Format:
- A single integer: total units of trapped rain water.

Example 1:
Input:
12
0 1 0 2 1 0 1 3 2 1 2 1
Output:
6
Explanation: The elevation map traps 6 units of rain water.

Example 2:
Input:
6
4 2 0 3 2 5
Output:
9

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];

    long long totalWater = 0;
    stack<int> st;

    for (int current = 0; current < n; current++) {
        while (!st.empty() && height[current] > height[st.top()]) {
            int top = st.top();
            st.pop();
            if (st.empty()) break;

            long long distance = current - top;
            long long bounded_height = min(height[current], height[st.top()]) - height[top];
            totalWater += distance * bounded_height;
        }
        st.push(current);
    }

    cout << totalWater << endl;
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
        int[] height = new int[n];
        for (int i = 0; i < n; i++) height[i] = sc.nextInt();

        long totalWater = 0;
        Deque<Integer> st = new ArrayDeque<>();

        for (int current = 0; current < n; current++) {
            while (!st.isEmpty() && height[current] > height[st.peek()]) {
                int top = st.pop();
                if (st.isEmpty()) break;

                long distance = current - top;
                long boundedHeight = Math.min(height[current], height[st.peek()]) - height[top];
                totalWater += distance * boundedHeight;
            }
            st.push(current);
        }

        System.out.println(totalWater);
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
    height = [int(x) for x in tokens[1:1+n]]

    total_water = 0
    st = []

    for current in range(n):
        while st and height[current] > height[st[-1]]:
            top = st.pop()
            if not st:
                break
            distance = current - top
            bounded_height = min(height[current], height[st[-1]]) - height[top]
            total_water += distance * bounded_height
        st.append(current)

    print(total_water)

if __name__ == '__main__':
    main()
```

