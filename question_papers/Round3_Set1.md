# Round 3 — Hard Debugging (Set 1)

## Problem: Shortest Path with Mandatory Checkpoints

**Points:** 30 Points | **Time Limit:** 3.0s | **Memory Limit:** 256MB

### Problem Statement

You are given a weighted undirected graph with n vertices (0 to n-1) and m edges. You are also given a start vertex S, a destination vertex D, and a set of k mandatory checkpoint vertices.
Find the minimum total distance to travel from S to D such that every mandatory checkpoint is visited at least once. If it is impossible, print -1.

Input Format:
- First line: n m k S D (vertices, edges, number of checkpoints, start, destination)
- Second line: k space-separated integers representing the checkpoint vertices.
- Next m lines: u v w representing an undirected edge between u and v with weight w (1 <= w <= 10^4).

Output Format:
- A single integer: the minimum distance, or -1 if unreachable.

Example 1:
Input:
4 4 2 0 3
1 2
0 1 2
1 2 3
2 3 4
0 3 15
Output:
9
Explanation: Path 0 -> 1 -> 2 -> 3 visits checkpoints 1 and 2 with cost 2 + 3 + 4 = 9.

Example 2:
Input:
3 1 1 0 2
1
0 1 5
Output:
-1

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <tuple>
using namespace std;

const long long INF = 1e18;

struct Edge {
    int to;
    long long w;
};

int main() {
    int n, m, k, S, D;
    if (!(cin >> n >> m >> k >> S >> D)) return 0;

    vector<int> chk(k);
    vector<int> chkIndex(n, -1);
    for (int i = 0; i < k; i++) {
        cin >> chk[i];
        chkIndex[chk[i]] = i;
    }

    vector<vector<Edge>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }

    int totalMasks = 1 << k;
    vector<vector<long long>> dist(n, vector<long long>(totalMasks, INF));

    int startMask = 0;
    if (chkIndex[S] != -1) startMask |= (1 << chkIndex[S]);

    dist[S][startMask] = 0;
    // tuple: dist, node, mask
    priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>, greater<tuple<long long, int, int>>> pq;
    pq.push({0, S, startMask});

    while (!pq.empty()) {
        auto [d, u, mask] = pq.top();
        pq.pop();

        if (d > dist[u][mask]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.to;
            int new_mask = mask;
            if (chkIndex[v] != -1) {
                new_mask |= (1 << chkIndex[v]);
            }

            if (dist[u][mask] + edge.w < dist[v][mask]) {
                dist[v][mask] = dist[u][mask] + edge.w;
                pq.push({dist[v][mask], v, new_mask});
            }
        }
    }

    int fullMask = (1 << k) - 1;
    long long ans = dist[D][fullMask];
    if (ans >= INF) cout << -1 << endl;
    else cout << ans << endl;

    return 0;
}
```

#### Java Implementation

```java
import java.util.*;

public class Main {
    static class State implements Comparable<State> {
        long d;
        int u;
        int mask;
        State(long d, int u, int mask) { this.d = d; this.u = u; this.mask = mask; }
        public int compareTo(State o) { return Long.compare(this.d, o.d); }
    }

    static class Edge {
        int to;
        long w;
        Edge(int to, long w) { this.to = to; this.w = w; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), m = sc.nextInt(), k = sc.nextInt(), S = sc.nextInt(), D = sc.nextInt();

        int[] chkIndex = new int[n];
        Arrays.fill(chkIndex, -1);
        for (int i = 0; i < k; i++) {
            chkIndex[sc.nextInt()] = i;
        }

        List<List<Edge>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt();
            long w = sc.nextLong();
            adj.get(u).add(new Edge(v, w));
            adj.get(v).add(new Edge(u, w));
        }

        int totalMasks = 1 << k;
        long INF = (long) 1e18;
        long[][] dist = new long[n][totalMasks];
        for (int i = 0; i < n; i++) Arrays.fill(dist[i], INF);

        int startMask = 0;
        if (chkIndex[S] != -1) startMask |= (1 << chkIndex[S]);
        dist[S][startMask] = 0;

        PriorityQueue<State> pq = new PriorityQueue<>();
        pq.add(new State(0, S, startMask));

        while (!pq.isEmpty()) {
            State cur = pq.poll();
            if (cur.d > dist[cur.u][cur.mask]) continue;

            for (Edge e : adj.get(cur.u)) {
                int newMask = cur.mask;
                if (chkIndex[e.to] != -1) newMask |= (1 << chkIndex[e.to]);

                if (dist[cur.u][cur.mask] + e.w < dist[e.to][cur.mask]) {
                    dist[e.to][cur.mask] = dist[cur.u][cur.mask] + e.w;
                    pq.add(new State(dist[e.to][cur.mask], e.to, newMask));
                }
            }
        }

        long ans = dist[D][(1 << k) - 1];
        System.out.println(ans >= INF ? -1 : ans);
    }
}
```

#### Python Implementation

```python
import sys
import heapq

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    m = int(lines[1])
    k = int(lines[2])
    S = int(lines[3])
    D = int(lines[4])

    idx = 5
    chkIndex = [-1] * n
    for i in range(k):
        chkIndex[int(lines[idx])] = i
        idx += 1

    adj = [[] for _ in range(n)]
    for _ in range(m):
        u = int(lines[idx])
        v = int(lines[idx+1])
        w = int(lines[idx+2])
        adj[u].append((v, w))
        adj[v].append((u, w))
        idx += 3

    INF = float('inf')
    total_masks = 1 << k
    dist = [[INF] * total_masks for _ in range(n)]

    start_mask = 0
    if chkIndex[S] != -1:
        start_mask |= (1 << chkIndex[S])

    dist[S][start_mask] = 0
    pq = [(0, S, start_mask)]

    while pq:
        d, u, mask = heapq.heappop(pq)
        if d > dist[u][mask]:
            continue

        for v, w in adj[u]:
            new_mask = mask
            if chkIndex[v] != -1:
                new_mask |= (1 << chkIndex[v])

            if dist[u][mask] + w < dist[v][mask]:
                dist[v][mask] = dist[u][mask] + w
                heapq.heappush(pq, (dist[v][mask], v, new_mask))

    full_mask = (1 << k) - 1
    ans = dist[D][full_mask]
    print(-1 if ans == INF else ans)

if __name__ == '__main__':
    main()
```

