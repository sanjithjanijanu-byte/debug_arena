# ROUND 3 — HARD DEBUGGING

## Problem Title: Shortest Path in Weighted Graph with Mandatory Checkpoints

### Difficulty

Hard

### Problem Statement

You are given a weighted **undirected** graph with `n` nodes (numbered 1 to n) and `m` edges. You are also given a source node `s`, a destination node `d`, and a list of `p` **mandatory checkpoint nodes** that must be visited on the path from `s` to `d`.

Find the **minimum total weight** of a path from `s` to `d` that visits **all checkpoint nodes** (in any order). If no such path exists, output `-1`.

**Input Format:**

- Line 1: Four integers `n`, `m`, `s`, `d` (`2 ≤ n ≤ 1000`, `1 ≤ m ≤ 5000`, `1 ≤ s, d ≤ n`)
- Next `m` lines: Three integers `u`, `v`, `w` (undirected edge between u and v with weight w, `1 ≤ w ≤ 10^6`)
- Next line: Integer `p` (`0 ≤ p ≤ 10`)
- Next line: `p` space-separated integers — the checkpoint nodes

**Output Format:**

- A single integer: the minimum path weight, or `-1` if impossible.

**Constraints:**

- The graph may have multiple edges between the same pair of nodes.
- The path may revisit nodes.
- `p ≤ 10` (allows bitmask DP approach).

**Example 1:**

```
Input:
4 4 1 4
1 2 2
2 3 3
3 4 1
1 4 100

1
3

Output:
6
```

*Explanation:* Must visit checkpoint 3. Path: 1 → 2 → 3 → 4. Cost: 2 + 3 + 1 = 6. The direct edge 1→4 costs 100 but skips checkpoint 3.

**Example 2:**

```
Input:
3 2 1 3
1 2 5
2 3 3

0

Output:
8
```

*Explanation:* No mandatory checkpoints. Shortest path: 1 → 2 → 3. Cost: 5 + 3 = 8.

### Expected Algorithm

1. Build a list of "key nodes" = [checkpoints] + [source] + [destination].
2. Run **Dijkstra's algorithm** from each key node to compute shortest distances to all other nodes.
3. Use **bitmask DP** on the checkpoints: `dp[mask][i]` = minimum cost to have visited the subset of checkpoints indicated by `mask`, currently at key node `i`.
4. Enumerate all orderings via DP transitions and find the minimum cost path that visits all checkpoints and reaches the destination.

---

## C++17 Buggy Code

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

typedef pair<long long, int> pli;

const long long INF = 1e18;

vector<long long> dijkstra(int src, const vector<vector<pair<int, int>>>& adj, int n) {
    vector<long long> dist(n + 1, INF);
    priority_queue<pli, vector<pli>, greater<pli>> pq;
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto& [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    int n, m, s, d;
    cin >> n >> m >> s >> d;
    
    vector<vector<pair<int, int>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    
    int p;
    cin >> p;
    vector<int> checkpoints(p);
    for (int i = 0; i < p; i++) {
        cin >> checkpoints[i];
    }
    
    int totalKeys = p + 2;
    vector<int> keyNodes(totalKeys);
    for (int i = 0; i < p; i++) keyNodes[i] = checkpoints[i];
    keyNodes[p] = s;
    keyNodes[p + 1] = d;
    
    vector<vector<long long>> dist(totalKeys);
    for (int i = 0; i < totalKeys; i++) {
        dist[i] = dijkstra(keyNodes[i], adj, n);
    }
    
    int fullMask = (1 << p) - 1;
    vector<vector<long long>> dp(fullMask + 1, vector<long long>(totalKeys, INF));
    
    int srcIdx = p;
    for (int i = 0; i < p; i++) {
        if (dist[srcIdx][keyNodes[i]] < INF) {
            dp[1 << i][i] = dist[srcIdx][keyNodes[i]];
        }
    }
    
    for (int mask = 1; mask <= fullMask; mask++) {
        for (int i = 0; i < p; i++) {
            if (!(mask & (1 << i))) continue;
            if (dp[mask][i] >= INF) continue;
            
            for (int j = 0; j < p; j++) {
                if (mask & (1 << j)) continue;
                int newMask = mask | (1 << j);
                if (dist[i][keyNodes[j]] < INF) {
                    long long cost = dp[mask][i] + dist[i][keyNodes[j]];
                    if (cost < dp[newMask][j]) {
                        dp[newMask][j] = cost;
                    }
                }
            }
        }
    }
    
    long long ans = INF;
    int destIdx = p + 1;
    if (p == 0) {
        ans = dist[srcIdx][keyNodes[destIdx]];
    } else {
        for (int i = 0; i < p; i++) {
            if (dp[fullMask][i] < INF && dist[i][keyNodes[destIdx]] < INF) {
                ans = min(ans, dp[fullMask][i] + dist[i][keyNodes[destIdx]]);
            }
        }
    }
    
    cout << (ans >= INF ? -1 : ans) << endl;
    return 0;
}
```

## Java 17 Buggy Code

```java
import java.util.*;

public class Main {
    static final long INF = (long) 1e18;
    
    static long[] dijkstra(int src, List<List<int[]>> adj, int n) {
        long[] dist = new long[n + 1];
        Arrays.fill(dist, INF);
        dist[src] = 0;
        PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        pq.offer(new long[]{0, src});
        
        while (!pq.isEmpty()) {
            long[] top = pq.poll();
            long d = top[0];
            int u = (int) top[1];
            
            if (d > dist[u]) continue;
            
            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.offer(new long[]{dist[v], v});
                }
            }
        }
        return dist;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), m = sc.nextInt(), s = sc.nextInt(), d = sc.nextInt();
        
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        
        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt(), w = sc.nextInt();
            adj.get(u).add(new int[]{v, w});
        }
        
        int p = sc.nextInt();
        int[] checkpoints = new int[p];
        for (int i = 0; i < p; i++) checkpoints[i] = sc.nextInt();
        
        int totalKeys = p + 2;
        int[] keyNodes = new int[totalKeys];
        for (int i = 0; i < p; i++) keyNodes[i] = checkpoints[i];
        keyNodes[p] = s;
        keyNodes[p + 1] = d;
        
        long[][] dist = new long[totalKeys][];
        for (int i = 0; i < totalKeys; i++) {
            dist[i] = dijkstra(keyNodes[i], adj, n);
        }
        
        int fullMask = (1 << p) - 1;
        long[][] dp = new long[fullMask + 1][totalKeys];
        for (long[] row : dp) Arrays.fill(row, INF);
        
        int srcIdx = p;
        for (int i = 0; i < p; i++) {
            if (dist[srcIdx][keyNodes[i]] < INF) {
                dp[1 << i][i] = dist[srcIdx][keyNodes[i]];
            }
        }
        
        for (int mask = 1; mask <= fullMask; mask++) {
            for (int i = 0; i < p; i++) {
                if ((mask & (1 << i)) == 0) continue;
                if (dp[mask][i] >= INF) continue;
                
                for (int j = 0; j < p; j++) {
                    if ((mask & (1 << j)) != 0) continue;
                    int newMask = mask | (1 << j);
                    if (dist[i][keyNodes[j]] < INF) {
                        long cost = dp[mask][i] + dist[i][keyNodes[j]];
                        if (cost < dp[newMask][j]) {
                            dp[newMask][j] = cost;
                        }
                    }
                }
            }
        }
        
        long ans = INF;
        int destIdx = p + 1;
        if (p == 0) {
            ans = dist[srcIdx][keyNodes[destIdx]];
        } else {
            for (int i = 0; i < p; i++) {
                if (dp[fullMask][i] < INF && dist[i][keyNodes[destIdx]] < INF) {
                    ans = Math.min(ans, dp[fullMask][i] + dist[i][keyNodes[destIdx]]);
                }
            }
        }
        
        System.out.println(ans >= INF ? -1 : ans);
    }
}
```

## Python 3.11+ Buggy Code

```python
import sys
import heapq

def dijkstra(src, adj, n):
    INF = float('inf')
    dist = [INF] * (n + 1)
    dist[src] = 0
    pq = [(0, src)]
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    
    return dist

def solve():
    input_data = sys.stdin.read().split()
    idx = 0
    n = int(input_data[idx]); idx += 1
    m = int(input_data[idx]); idx += 1
    s = int(input_data[idx]); idx += 1
    d = int(input_data[idx]); idx += 1
    
    adj = [[] for _ in range(n + 1)]
    for _ in range(m):
        u = int(input_data[idx]); idx += 1
        v = int(input_data[idx]); idx += 1
        w = int(input_data[idx]); idx += 1
        adj[u].append((v, w))
    
    p = int(input_data[idx]); idx += 1
    checkpoints = []
    for _ in range(p):
        checkpoints.append(int(input_data[idx])); idx += 1
    
    total_keys = p + 2
    key_nodes = checkpoints + [s, d]
    
    INF = float('inf')
    
    dist = []
    for i in range(total_keys):
        dist.append(dijkstra(key_nodes[i], adj, n))
    
    full_mask = (1 << p) - 1
    dp = [[INF] * total_keys for _ in range(full_mask + 1)]
    
    src_idx = p
    for i in range(p):
        if dist[src_idx][key_nodes[i]] < INF:
            dp[1 << i][i] = dist[src_idx][key_nodes[i]]
    
    for mask in range(1, full_mask + 1):
        for i in range(p):
            if not (mask & (1 << i)):
                continue
            if dp[mask][i] >= INF:
                continue
            
            for j in range(p):
                if mask & (1 << j):
                    continue
                new_mask = mask | (1 << j)
                if dist[i][key_nodes[j]] < INF:
                    cost = dp[mask][i] + dist[i][key_nodes[j]]
                    if cost < dp[new_mask][j]:
                        dp[new_mask][j] = cost
    
    dest_idx = p + 1
    ans = INF
    if p == 0:
        ans = dist[src_idx][key_nodes[dest_idx]]
    else:
        for i in range(p):
            if dp[full_mask][i] < INF and dist[i][key_nodes[dest_idx]] < INF:
                ans = min(ans, dp[full_mask][i] + dist[i][key_nodes[dest_idx]])
    
    print(-1 if ans >= INF else int(ans))

solve()
```

---
