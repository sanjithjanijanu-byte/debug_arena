# Round 3 — Hard Debugging (Set 6)

## Problem: Lexicographically Smallest Course Schedule Topological Sort

**Points:** 30 Points | **Time Limit:** 3.0s | **Memory Limit:** 256MB

### Problem Statement

There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b before taking course a.

Return the ordering of courses you should take to finish all courses. If there are multiple valid answers, return the lexicographically smallest ordering. If it is impossible to finish all courses (a cycle exists), return "CYCLE DETECTED".

Input Format:
- First line: Two integers numCourses and m (number of prerequisite edges)
- Next m lines: Two integers a and b (directed edge b -> a, prerequisite b before a)

Output Format:
- Print the course order separated by single spaces, or "CYCLE DETECTED" if impossible.

Example 1:
Input:
2 1
1 0
Output:
0 1
Explanation: Course 0 must be taken before course 1.

Example 2:
Input:
4 4
1 0
2 0
3 1
3 2
Output:
0 1 2 3

Example 3:
Input:
2 2
1 0
0 1
Output:
CYCLE DETECTED

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;

    vector<vector<int>> adj(n);
    vector<int> inDegree(n, 0);

    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[b].push_back(a);
        inDegree[a]++;
    }

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 0; i < n; i++) {
        // BUG: should be inDegree[i] == 0
        if (inDegree[i] == 1) {
            pq.push(i);
        }
    }

    vector<int> order;
    while (!pq.empty()) {
        int u = pq.top();
        pq.pop();
        order.push_back(u);

        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) {
                pq.push(v);
            }
        }
    }

    if ((int)order.size() != n) {
        cout << "CYCLE DETECTED" << endl;
    } else {
        for (int i = 0; i < n; i++) {
            cout << order[i] << (i == n - 1 ? "" : " ");
        }
        cout << endl;
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
        int n = sc.nextInt();
        int m = sc.nextInt();

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[n];

        for (int i = 0; i < m; i++) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            adj.get(b).add(a);
            inDegree[a]++;
        }

        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int i = 0; i < n; i++) {
            // BUG: inDegree[i] == 1
            if (inDegree[i] == 1) pq.add(i);
        }

        List<Integer> order = new ArrayList<>();
        while (!pq.isEmpty()) {
            int u = pq.poll();
            order.add(u);

            for (int v : adj.get(u)) {
                inDegree[v]--;
                if (inDegree[v] == 0) pq.add(v);
            }
        }

        if (order.size() != n) {
            System.out.println("CYCLE DETECTED");
        } else {
            for (int i = 0; i < n; i++) {
                System.out.print(order.get(i) + (i == n - 1 ? "" : " "));
            }
            System.out.println();
        }
    }
}
```

#### Python Implementation

```python
import sys
import heapq

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    m = int(tokens[1])

    adj = [[] for _ in range(n)]
    in_degree = [0] * n

    idx = 2
    for _ in range(m):
        a = int(tokens[idx])
        b = int(tokens[idx+1])
        adj[b].append(a)
        in_degree[a] += 1
        idx += 2

    pq = []
    for i in range(n):
        # BUG: in_degree[i] == 1
        if in_degree[i] == 1:
            heapq.heappush(pq, i)

    order = []
    while pq:
        u = heapq.heappop(pq)
        order.append(u)

        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                heapq.heappush(pq, v)

    if len(order) != n:
        print("CYCLE DETECTED")
    else:
        print(*(order))

if __name__ == '__main__':
    main()
```

