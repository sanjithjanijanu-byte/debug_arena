# Round 2 — Hard Debugging (Set 2)

## Problem: Word Ladder II - Shortest Transformation Sequences Count

**Points:** 30 Points | **Difficulty:** Hard | **Time Limit:** 3.0s | **Memory Limit:** 256MB

### Problem Statement

Given two words, beginWord and endWord, and a dictionary of words wordList, return the number of distinct shortest transformation sequences from beginWord to endWord modulo 10^9 + 7.
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
0

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
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
}
```

#### Java Implementation

```java
import java.util.*;

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
}
```

#### Python Implementation

```python
import sys
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
    main()
```

