// Round 3 — 7 Distinct Hard Debugging Problems (1 per Set)
// Each problem is implemented in CPP, JAVA, and PYTHON with buggyCode, referenceSolution, statement, and testCases.

module.exports = [
  // =========================================================================
  // SET 1: Shortest Path with Mandatory Checkpoints (Bitmask Dijkstra)
  // =========================================================================
  {
    setNumber: 1,
    title: 'Shortest Path with Mandatory Checkpoints',
    statement: `You are given a weighted undirected graph with n vertices (0 to n-1) and m edges. You are also given a start vertex S, a destination vertex D, and a set of k mandatory checkpoint vertices.
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
-1`,
    rootCause: 'In the priority queue state expansion, when transitioning to an adjacent node v, the bitmask is updated to new_mask, but the distance table check/update incorrectly uses the old mask dist[v][mask] instead of dist[v][new_mask], allowing outdated or suboptimal states to overwrite shorter distances.',
    fixDescription: 'Update and check dist[v][new_mask] instead of dist[v][mask].',
    points: 30,
    timeLimitMs: 3000,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '4 4 2 0 3\n1 2\n0 1 2\n1 2 3\n2 3 4\n0 3 15', expectedStdout: '9', isHidden: false, weight: 1 },
      { stdin: '3 1 1 0 2\n1\n0 1 5', expectedStdout: '-1', isHidden: false, weight: 1 },
      { stdin: '5 6 3 0 4\n1 2 3\n0 1 2\n1 2 2\n2 3 2\n3 4 2\n0 4 1\n1 4 10', expectedStdout: '8', isHidden: true, weight: 2 },
      { stdin: '3 3 0 0 2\n\n0 1 1\n1 2 2\n0 2 5', expectedStdout: '3', isHidden: true, weight: 2 }
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
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
}`,
        referenceSolution: `#include <iostream>
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

            if (dist[u][mask] + edge.w < dist[v][new_mask]) {
                dist[v][new_mask] = dist[u][mask] + edge.w;
                pq.push({dist[v][new_mask], v, new_mask});
            }
        }
    }

    int fullMask = (1 << k) - 1;
    long long ans = dist[D][fullMask];
    if (ans >= INF) cout << -1 << endl;
    else cout << ans << endl;

    return 0;
}`
      },
      JAVA: {
        buggyCode: `import java.util.*;

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
}`,
        referenceSolution: `import java.util.*;

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

                if (dist[cur.u][cur.mask] + e.w < dist[e.to][newMask]) {
                    dist[e.to][newMask] = dist[cur.u][cur.mask] + e.w;
                    pq.add(new State(dist[e.to][newMask], e.to, newMask));
                }
            }
        }

        long ans = dist[D][(1 << k) - 1];
        System.out.println(ans >= INF ? -1 : ans);
    }
}`
      },
      PYTHON: {
        buggyCode: `import sys
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
    main()`,
        referenceSolution: `import sys
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

            if dist[u][mask] + w < dist[v][new_mask]:
                dist[v][new_mask] = dist[u][mask] + w
                heapq.heappush(pq, (dist[v][new_mask], v, new_mask))

    full_mask = (1 << k) - 1
    ans = dist[D][full_mask]
    print(-1 if ans == INF else ans)

if __name__ == '__main__':
    main()`,
      }
    }
  },

  // =========================================================================
  // SET 2: Word Ladder II (BFS Level-Tracking & Path Count)
  // =========================================================================
  {
    setNumber: 2,
    title: 'Word Ladder II - Shortest Transformation Sequences Count',
    statement: `Given two words, beginWord and endWord, and a dictionary of words wordList, return the number of distinct shortest transformation sequences from beginWord to endWord modulo 10^9 + 7.
A transformation sequence is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
- Every adjacent pair of words differs by exactly one letter.
- Every si for 1 <= i <= k is in wordList.
- sk == endWord.
If no such sequence exists, return 0.

Input Format:
- First line: beginWord endWord
- Second line: integer n (number of words in wordList)
- Third line: n space-separated words in wordList

Output Format:
- A single integer: number of shortest paths modulo 1000000007.

Example 1:
Input:
hit cog
6
hot dot dog lot log cog
Output:
2
Explanation: Two shortest transformation sequences of length 5:
"hit" -> "hot" -> "dot" -> "dog" -> "cog"
"hit" -> "hot" -> "lot" -> "log" -> "cog"

Example 2:
Input:
hit cog
5
hot dot dog lot log
Output:
0`,
    rootCause: 'In the BFS loop, visited words are removed from the unvisited word set immediately when expanded from a parent node. This prevents other valid shortest paths from reaching the same intermediate word within the same BFS level, causing undercounting of shortest paths.',
    fixDescription: 'Defer removing words from the unvisited set until the entire current BFS level has been processed (level-by-level deletion).',
    points: 30,
    timeLimitMs: 3000,
    memoryLimitMb: 256,
    testCases: [
      { stdin: 'hit cog\n6\nhot dot dog lot log cog', expectedStdout: '2', isHidden: false, weight: 1 },
      { stdin: 'hit cog\n5\nhot dot dog lot log', expectedStdout: '0', isHidden: false, weight: 1 },
      { stdin: 'a c\n3\na b c', expectedStdout: '1', isHidden: true, weight: 2 },
      { stdin: 'red tax\n5\nted tex red tax tad', expectedStdout: '2', isHidden: true, weight: 2 }
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>
#include <unordered_map>
#include <queue>
using namespace std;

const int MOD = 1000000007;

int main() {
    string beginWord, endWord;
    if (!(cin >> beginWord >> endWord)) return 0;
    int n;
    if (!(cin >> n)) return 0;

    unordered_set<string> dict;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        dict.insert(w);
    }

    if (dict.find(endWord) == dict.end()) {
        cout << 0 << endl;
        return 0;
    }

    unordered_map<string, long long> paths;
    paths[beginWord] = 1;

    queue<string> q;
    q.push(beginWord);
    bool found = false;

    while (!q.empty() && !found) {
        int sz = q.size();
        for (int i = 0; i < sz; i++) {
            string curr = q.front();
            q.pop();

            string nextWord = curr;
            for (int pos = 0; pos < (int)nextWord.size(); pos++) {
                char orig = nextWord[pos];
                for (char c = 'a'; c <= 'z'; c++) {
                    if (c == orig) continue;
                    nextWord[pos] = c;
                    if (dict.find(nextWord) != dict.end()) {
                        if (paths.find(nextWord) == paths.end()) {
                            q.push(nextWord);
                        }
                        paths[nextWord] = (paths[nextWord] + paths[curr]) % MOD;
                        if (nextWord == endWord) found = true;
                        dict.erase(nextWord);
                    }
                }
                nextWord[pos] = orig;
            }
        }
    }

    cout << (found ? paths[endWord] : 0) << endl;
    return 0;
}`,
        referenceSolution: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>
#include <unordered_map>
#include <queue>
using namespace std;

const int MOD = 1000000007;

int main() {
    string beginWord, endWord;
    if (!(cin >> beginWord >> endWord)) return 0;
    int n;
    if (!(cin >> n)) return 0;

    unordered_set<string> dict;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        dict.insert(w);
    }

    if (dict.find(endWord) == dict.end()) {
        cout << 0 << endl;
        return 0;
    }

    unordered_map<string, long long> paths;
    paths[beginWord] = 1;

    queue<string> q;
    q.push(beginWord);
    dict.erase(beginWord);
    bool found = false;

    while (!q.empty() && !found) {
        int sz = q.size();
        unordered_set<string> visitedThisLevel;
        unordered_map<string, long long> newPaths;

        for (int i = 0; i < sz; i++) {
            string curr = q.front();
            q.pop();

            string nextWord = curr;
            for (int pos = 0; pos < (int)nextWord.size(); pos++) {
                char orig = nextWord[pos];
                for (char c = 'a'; c <= 'z'; c++) {
                    if (c == orig) continue;
                    nextWord[pos] = c;
                    if (dict.find(nextWord) != dict.end()) {
                        visitedThisLevel.insert(nextWord);
                        newPaths[nextWord] = (newPaths[nextWord] + paths[curr]) % MOD;
                        if (nextWord == endWord) found = true;
                    }
                }
                nextWord[pos] = orig;
            }
        }

        for (const auto& w : visitedThisLevel) {
            dict.erase(w);
            q.push(w);
            paths[w] = (paths[w] + newPaths[w]) % MOD;
        }
    }

    cout << (found ? paths[endWord] : 0) << endl;
    return 0;
}`
      },
      JAVA: {
        buggyCode: `import java.util.*;

public class Main {
    static final int MOD = 1000000007;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String beginWord = sc.next();
        String endWord = sc.next();
        int n = sc.nextInt();

        Set<String> dict = new HashSet<>();
        for (int i = 0; i < n; i++) dict.add(sc.next());

        if (!dict.contains(endWord)) {
            System.out.println(0);
            return;
        }

        Map<String, Long> paths = new HashMap<>();
        paths.put(beginWord, 1L);

        Queue<String> q = new LinkedList<>();
        q.add(beginWord);
        boolean found = false;

        while (!q.isEmpty() && !found) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                String curr = q.poll();
                char[] chars = curr.toCharArray();

                for (int pos = 0; pos < chars.length; pos++) {
                    char orig = chars[pos];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == orig) continue;
                        chars[pos] = c;
                        String nextWord = new String(chars);

                        if (dict.contains(nextWord)) {
                            if (!paths.containsKey(nextWord)) {
                                q.add(nextWord);
                            }
                            paths.put(nextWord, (paths.getOrDefault(nextWord, 0L) + paths.get(curr)) % MOD);
                            if (nextWord.equals(endWord)) found = true;
                            dict.remove(nextWord);
                        }
                    }
                    chars[pos] = orig;
                }
            }
        }

        System.out.println(found ? paths.get(endWord) : 0);
    }
}`,
        referenceSolution: `import java.util.*;

public class Main {
    static final int MOD = 1000000007;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String beginWord = sc.next();
        String endWord = sc.next();
        int n = sc.nextInt();

        Set<String> dict = new HashSet<>();
        for (int i = 0; i < n; i++) dict.add(sc.next());

        if (!dict.contains(endWord)) {
            System.out.println(0);
            return;
        }

        Map<String, Long> paths = new HashMap<>();
        paths.put(beginWord, 1L);

        Queue<String> q = new LinkedList<>();
        q.add(beginWord);
        dict.remove(beginWord);
        boolean found = false;

        while (!q.isEmpty() && !found) {
            int sz = q.size();
            Set<String> visitedThisLevel = new HashSet<>();
            Map<String, Long> newPaths = new HashMap<>();

            for (int i = 0; i < sz; i++) {
                String curr = q.poll();
                char[] chars = curr.toCharArray();

                for (int pos = 0; pos < chars.length; pos++) {
                    char orig = chars[pos];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == orig) continue;
                        chars[pos] = c;
                        String nextWord = new String(chars);

                        if (dict.contains(nextWord)) {
                            visitedThisLevel.add(nextWord);
                            newPaths.put(nextWord, (newPaths.getOrDefault(nextWord, 0L) + paths.get(curr)) % MOD);
                            if (nextWord.equals(endWord)) found = true;
                        }
                    }
                    chars[pos] = orig;
                }
            }

            for (String w : visitedThisLevel) {
                dict.remove(w);
                q.add(w);
                paths.put(w, (paths.getOrDefault(w, 0L) + newPaths.get(w)) % MOD);
            }
        }

        System.out.println(found ? paths.get(endWord) : 0);
    }
}`
      },
      PYTHON: {
        buggyCode: `import sys
from collections import deque, defaultdict

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    begin_word = tokens[0]
    end_word = tokens[1]
    n = int(tokens[2])
    word_list = set(tokens[3:3+n])

    if end_word not in word_list:
        print(0)
        return

    MOD = 1000000007
    paths = defaultdict(int)
    paths[begin_word] = 1

    q = deque([begin_word])
    found = False

    while q and not found:
        sz = len(q)
        for _ in range(sz):
            curr = q.popleft()
            chars = list(curr)
            for pos in range(len(chars)):
                orig = chars[pos]
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    if c == orig:
                        continue
                    chars[pos] = c
                    next_word = ''.join(chars)
                    if next_word in word_list:
                        if next_word not in paths:
                            q.append(next_word)
                        paths[next_word] = (paths[next_word] + paths[curr]) % MOD
                        if next_word == end_word:
                            found = True
                        word_list.remove(next_word)
                chars[pos] = orig

    print(paths[end_word] if found else 0)

if __name__ == '__main__':
    main()`,
        referenceSolution: `import sys
from collections import deque, defaultdict

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    begin_word = tokens[0]
    end_word = tokens[1]
    n = int(tokens[2])
    word_list = set(tokens[3:3+n])

    if end_word not in word_list:
        print(0)
        return

    MOD = 1000000007
    paths = defaultdict(int)
    paths[begin_word] = 1

    q = deque([begin_word])
    word_list.discard(begin_word)
    found = False

    while q and not found:
        sz = len(q)
        visited_this_level = set()
        new_paths = defaultdict(int)

        for _ in range(sz):
            curr = q.popleft()
            chars = list(curr)
            for pos in range(len(chars)):
                orig = chars[pos]
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    if c == orig:
                        continue
                    chars[pos] = c
                    next_word = ''.join(chars)
                    if next_word in word_list:
                        visited_this_level.add(next_word)
                        new_paths[next_word] = (new_paths[next_word] + paths[curr]) % MOD
                        if next_word == end_word:
                            found = True
                chars[pos] = orig

        for w in visited_this_level:
            word_list.discard(w)
            q.append(w)
            paths[w] = (paths[w] + new_paths[w]) % MOD

    print(paths[end_word] if found else 0)

if __name__ == '__main__':
    main()`,
      }
    }
  },

  // =========================================================================
  // SET 3: Median of Two Sorted Arrays (O(log(min(m, n))))
  // =========================================================================
  {
    setNumber: 3,
    title: 'Median of Two Sorted Arrays',
    statement: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

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
Explanation: Merged array = [1, 2, 3, 4] and median is (2 + 3) / 2 = 2.5.`,
    rootCause: 'Binary search boundary adjustment logic is inverted: when maxLeftA > minRightB, high should be adjusted to i - 1 (too far right in array A), but the code increments low = i + 1 instead, causing an infinite loop or wrong partition.',
    fixDescription: 'Adjust high = i - 1 when maxLeftA > minRightB, and low = i + 1 when maxLeftB > minRightA.',
    points: 30,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '2 1\n1 3\n2', expectedStdout: '2.0', isHidden: false, weight: 1 },
      { stdin: '2 2\n1 2\n3 4', expectedStdout: '2.5', isHidden: false, weight: 1 },
      { stdin: '0 2\n\n1 2', expectedStdout: '1.5', isHidden: true, weight: 2 },
      { stdin: '4 6\n1 5 7 9\n2 3 4 6 8 10', expectedStdout: '5.5', isHidden: true, weight: 2 }
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
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
}`,
        referenceSolution: `#include <iostream>
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
            high = i - 1;
        } else {
            low = i + 1;
        }
    }
    return 0;
}`
      },
      JAVA: {
        buggyCode: `import java.util.*;

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
                System.out.printf(Locale.US, "%.1f\\n", median);
                return;
            } else if (maxLeftA > minRightB) {
                low = i + 1;
            } else {
                high = i - 1;
            }
        }
    }
}`,
        referenceSolution: `import java.util.*;

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
                System.out.printf(Locale.US, "%.1f\\n", median);
                return;
            } else if (maxLeftA > minRightB) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }
    }
}`
      },
      PYTHON: {
        buggyCode: `import sys

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
    main()`,
        referenceSolution: `import sys

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
            high = i - 1
        else:
            low = i + 1

if __name__ == '__main__':
    main()`,
      }
    }
  },

  // =========================================================================
  // SET 4: Trapping Rain Water with Obstacles
  // =========================================================================
  {
    setNumber: 4,
    title: 'Trapping Rain Water with Monotonic Stack',
    statement: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

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
9`,
    rootCause: 'In the monotonic stack pop logic, bounded_height is calculated as min(height[current], height[st.top()]) - height[top], but the stack top index is retrieved before popping, and the code incorrectly computes width using the current element instead of distance between current and the new stack top: width = current - st.top() - 1, but uses current - top instead.',
    fixDescription: 'After popping the bottom element, check if stack is empty (break if empty); width should be current - st.top() - 1.',
    points: 30,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '12\n0 1 0 2 1 0 1 3 2 1 2 1', expectedStdout: '6', isHidden: false, weight: 1 },
      { stdin: '6\n4 2 0 3 2 5', expectedStdout: '9', isHidden: false, weight: 1 },
      { stdin: '5\n5 4 3 2 1', expectedStdout: '0', isHidden: true, weight: 2 },
      { stdin: '7\n3 0 2 0 4 0 2', expectedStdout: '9', isHidden: true, weight: 2 }
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
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
}`,
        referenceSolution: `#include <iostream>
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

            long long distance = current - st.top() - 1;
            long long bounded_height = min(height[current], height[st.top()]) - height[top];
            totalWater += distance * bounded_height;
        }
        st.push(current);
    }

    cout << totalWater << endl;
    return 0;
}`
      },
      JAVA: {
        buggyCode: `import java.util.*;

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
}`,
        referenceSolution: `import java.util.*;

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

                long distance = current - st.peek() - 1;
                long boundedHeight = Math.min(height[current], height[st.peek()]) - height[top];
                totalWater += distance * boundedHeight;
            }
            st.push(current);
        }

        System.out.println(totalWater);
    }
}`
      },
      PYTHON: {
        buggyCode: `import sys

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
    main()`,
        referenceSolution: `import sys

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
            distance = current - st[-1] - 1
            bounded_height = min(height[current], height[st[-1]]) - height[top]
            total_water += distance * bounded_height
        st.append(current)

    print(total_water)

if __name__ == '__main__':
    main()`,
      }
    }
  },

  // =========================================================================
  // SET 5: Minimum Window Substring with Exact Multiplicities
  // =========================================================================
  {
    setNumber: 5,
    title: 'Minimum Window Substring with Exact Multiplicities',
    statement: `Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return an empty string (or print -1).

If there are multiple answers, return the substring that appears earliest.

Input Format:
- First line: String s
- Second line: String t

Output Format:
- A single string: the minimum window substring, or -1 if none exists.

Example 1:
Input:
ADOBECODEBANC
ABC
Output:
BANC
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2:
Input:
a
a
Output:
a

Example 3:
Input:
a
aa
Output:
-1`,
    rootCause: 'When shrinking the window from the left pointer, the code decrements formed (the count of satisfied characters) if windowFreq[c] <= targetFreq[c] BEFORE updating windowFreq[c] -= 1, which triggers prematurely even when the window still had surplus characters.',
    fixDescription: 'Check if windowFreq[c] == targetFreq[c] before decrementing windowFreq[c], and only then decrement formed.',
    points: 30,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: 'ADOBECODEBANC\nABC', expectedStdout: 'BANC', isHidden: false, weight: 1 },
      { stdin: 'a\na', expectedStdout: 'a', isHidden: false, weight: 1 },
      { stdin: 'a\naa', expectedStdout: '-1', isHidden: false, weight: 1 },
      { stdin: 'abccba\nbc', expectedStdout: 'bc', isHidden: true, weight: 2 }
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
#include <string>
#include <unordered_map>
#include <climits>
using namespace std;

int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;

    unordered_map<char, int> targetFreq;
    for (char c : t) targetFreq[c]++;

    int required = targetFreq.size();
    unordered_map<char, int> windowFreq;
    int formed = 0;

    int minLen = INT_MAX;
    int startIdx = -1;

    int left = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        char c = s[right];
        windowFreq[c]++;

        if (targetFreq.count(c) && windowFreq[c] == targetFreq[c]) {
            formed++;
        }

        while (left <= right && formed == required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                startIdx = left;
            }

            char leftChar = s[left];
            if (targetFreq.count(leftChar) && windowFreq[leftChar] <= targetFreq[leftChar]) {
                formed--;
            }
            windowFreq[leftChar]--;
            left++;
        }
    }

    if (startIdx == -1) cout << -1 << endl;
    else cout << s.substr(startIdx, minLen) << endl;

    return 0;
}`,
        referenceSolution: `#include <iostream>
#include <string>
#include <unordered_map>
#include <climits>
using namespace std;

int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;

    unordered_map<char, int> targetFreq;
    for (char c : t) targetFreq[c]++;

    int required = targetFreq.size();
    unordered_map<char, int> windowFreq;
    int formed = 0;

    int minLen = INT_MAX;
    int startIdx = -1;

    int left = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        char c = s[right];
        windowFreq[c]++;

        if (targetFreq.count(c) && windowFreq[c] == targetFreq[c]) {
            formed++;
        }

        while (left <= right && formed == required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                startIdx = left;
            }

            char leftChar = s[left];
            if (targetFreq.count(leftChar) && windowFreq[leftChar] == targetFreq[leftChar]) {
                formed--;
            }
            windowFreq[leftChar]--;
            left++;
        }
    }

    if (startIdx == -1) cout << -1 << endl;
    else cout << s.substr(startIdx, minLen) << endl;

    return 0;
}`
      },
      JAVA: {
        buggyCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        String t = sc.next();

        Map<Character, Integer> targetFreq = new HashMap<>();
        for (char c : t.toCharArray()) targetFreq.put(c, targetFreq.getOrDefault(c, 0) + 1);

        int required = targetFreq.size();
        Map<Character, Integer> windowFreq = new HashMap<>();
        int formed = 0;

        int minLen = Integer.MAX_VALUE;
        int startIdx = -1;

        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            windowFreq.put(c, windowFreq.getOrDefault(c, 0) + 1);

            if (targetFreq.containsKey(c) && windowFreq.get(c).intValue() == targetFreq.get(c).intValue()) {
                formed++;
            }

            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    startIdx = left;
                }

                char leftChar = s.charAt(left);
                if (targetFreq.containsKey(leftChar) && windowFreq.get(leftChar) <= targetFreq.get(leftChar)) {
                    formed--;
                }
                windowFreq.put(leftChar, windowFreq.get(leftChar) - 1);
                left++;
            }
        }

        System.out.println(startIdx == -1 ? "-1" : s.substring(startIdx, startIdx + minLen));
    }
}`,
        referenceSolution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        String t = sc.next();

        Map<Character, Integer> targetFreq = new HashMap<>();
        for (char c : t.toCharArray()) targetFreq.put(c, targetFreq.getOrDefault(c, 0) + 1);

        int required = targetFreq.size();
        Map<Character, Integer> windowFreq = new HashMap<>();
        int formed = 0;

        int minLen = Integer.MAX_VALUE;
        int startIdx = -1;

        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            windowFreq.put(c, windowFreq.getOrDefault(c, 0) + 1);

            if (targetFreq.containsKey(c) && windowFreq.get(c).intValue() == targetFreq.get(c).intValue()) {
                formed++;
            }

            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    startIdx = left;
                }

                char leftChar = s.charAt(left);
                if (targetFreq.containsKey(leftChar) && windowFreq.get(leftChar).intValue() == targetFreq.get(leftChar).intValue()) {
                    formed--;
                }
                windowFreq.put(leftChar, windowFreq.get(leftChar) - 1);
                left++;
            }
        }

        System.out.println(startIdx == -1 ? "-1" : s.substring(startIdx, startIdx + minLen));
    }
}`
      },
      PYTHON: {
        buggyCode: `import sys
from collections import Counter, defaultdict

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    s = tokens[0]
    t = tokens[1]

    target_freq = Counter(t)
    required = len(target_freq)
    window_freq = defaultdict(int)
    formed = 0

    min_len = float('inf')
    start_idx = -1

    left = 0
    for right in range(len(s)):
        c = s[right]
        window_freq[c] += 1

        if c in target_freq and window_freq[c] == target_freq[c]:
            formed += 1

        while left <= right and formed == required:
            if right - left + 1 < min_len:
                min_len = right - left + 1
                start_idx = left

            left_char = s[left]
            if left_char in target_freq and window_freq[left_char] <= target_freq[left_char]:
                formed -= 1
            window_freq[left_char] -= 1
            left += 1

    print("-1" if start_idx == -1 else s[start_idx:start_idx + min_len])

if __name__ == '__main__':
    main()`,
        referenceSolution: `import sys
from collections import Counter, defaultdict

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    s = tokens[0]
    t = tokens[1]

    target_freq = Counter(t)
    required = len(target_freq)
    window_freq = defaultdict(int)
    formed = 0

    min_len = float('inf')
    start_idx = -1

    left = 0
    for right in range(len(s)):
        c = s[right]
        window_freq[c] += 1

        if c in target_freq and window_freq[c] == target_freq[c]:
            formed += 1

        while left <= right and formed == required:
            if right - left + 1 < min_len:
                min_len = right - left + 1
                start_idx = left

            left_char = s[left]
            if left_char in target_freq and window_freq[left_char] == target_freq[left_char]:
                formed -= 1
            window_freq[left_char] -= 1
            left += 1

    print("-1" if start_idx == -1 else s[start_idx:start_idx + min_len])

if __name__ == '__main__':
    main()`,
      }
    }
  },

  // =========================================================================
  // SET 6: Course Schedule & Topological Sort with Cycle Detection
  // =========================================================================
  {
    setNumber: 6,
    title: 'Lexicographically Smallest Course Schedule Topological Sort',
    statement: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b before taking course a.

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
CYCLE DETECTED`,
    rootCause: 'In Kahn algorithm with min-heap priority queue, when pushing initial courses with 0 prerequisites into the priority queue, the condition was written as inDegree[i] == 1 instead of inDegree[i] == 0.',
    fixDescription: 'Initialize priority queue with courses having inDegree[i] == 0.',
    points: 30,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '2 1\n1 0', expectedStdout: '0 1', isHidden: false, weight: 1 },
      { stdin: '4 4\n1 0\n2 0\n3 1\n3 2', expectedStdout: '0 1 2 3', isHidden: false, weight: 1 },
      { stdin: '2 2\n1 0\n0 1', expectedStdout: 'CYCLE DETECTED', isHidden: false, weight: 1 },
      { stdin: '3 2\n1 0\n2 1', expectedStdout: '0 1 2', isHidden: true, weight: 2 }
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
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
}`,
        referenceSolution: `#include <iostream>
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
        if (inDegree[i] == 0) {
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
}`
      },
      JAVA: {
        buggyCode: `import java.util.*;

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
}`,
        referenceSolution: `import java.util.*;

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
            if (inDegree[i] == 0) pq.add(i);
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
}`
      },
      PYTHON: {
        buggyCode: `import sys
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
    main()`,
        referenceSolution: `import sys
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
        if in_degree[i] == 0:
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
    main()`,
      }
    }
  },

  // =========================================================================
  // SET 7: Subarray Sums Divisible by K with Negative Remainder Normalization
  // =========================================================================
  {
    setNumber: 7,
    title: 'Subarray Sums Divisible by K',
    statement: `Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.
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
1`,
    rootCause: 'In languages like C++ and Java, the remainder operator % returns negative values for negative integers (e.g., -2 % 5 = -2). The code fails to normalize the remainder to the range [0, k-1] with (rem % k + k) % k, leading to invalid remainder map keys and missed subarrays.',
    fixDescription: 'Normalize remainder using (rem % k + k) % k before indexing into the frequency map or array.',
    points: 30,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
    testCases: [
      { stdin: '6 5\n4 5 0 -2 -3 1', expectedStdout: '7', isHidden: false, weight: 1 },
      { stdin: '1 5\n5', expectedStdout: '1', isHidden: false, weight: 1 },
      { stdin: '4 3\n-1 2 9 -3', expectedStdout: '3', isHidden: true, weight: 2 },
      { stdin: '5 7\n-7 -7 -7 -7 -7', expectedStdout: '15', isHidden: true, weight: 2 }
    ],
    implementations: {
      CPP: {
        buggyCode: `#include <iostream>
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
}`,
        referenceSolution: `#include <iostream>
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
        int rem = (prefixSum % k + k) % k;

        if (remainderCount.count(rem)) {
            result += remainderCount[rem];
        }
        remainderCount[rem]++;
    }

    cout << result << endl;
    return 0;
}`
      },
      JAVA: {
        buggyCode: `import java.util.*;

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
}`,
        referenceSolution: `import java.util.*;

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
            int rem = (int)(((prefixSum % k) + k) % k);

            if (remainderCount.containsKey(rem)) {
                result += remainderCount.get(rem);
            }
            remainderCount.put(rem, remainderCount.getOrDefault(rem, 0) + 1);
        }

        System.out.println(result);
    }
}`
      },
      PYTHON: {
        buggyCode: `import sys

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
    main()`,
        referenceSolution: `import sys

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
        rem = ((prefix_sum % k) + k) % k

        if rem in remainder_count:
            result += remainder_count[rem]
        remainder_count[rem] = remainder_count.get(rem, 0) + 1

    print(result)

if __name__ == '__main__':
    main()`,
      }
    }
  }
];
