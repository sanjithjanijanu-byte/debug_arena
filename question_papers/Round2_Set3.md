# Round 2 — Medium Debugging (Set 3)

## Problem: Longest Substring Without Repeating Characters

**Points:** 20 Points | **Time Limit:** 2.5s | **Memory Limit:** 256MB

### Problem Statement

Given a string s on stdin, find the length of the longest substring without duplicate characters.

Input Format:
- Single line containing string s (0 <= length(s) <= 10^5)

Output Format:
- Single integer representing the length of the longest substring without repeating characters.

Example 1:
Input:
abcabcbb
Output:
3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input:
bbbbb
Output:
1
Explanation: The answer is "b", with length 1.

Example 3:
Input:
pwwkew
Output:
3
Explanation: The answer is "wke", with length 3.

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    string s;
    if (!getline(cin, s)) {
        cout << 0 << endl;
        return 0;
    }

    unordered_map<char, int> lastSeen;
    int left = 0;
    int maxLen = 0;

    for (int right = 0; right < (int)s.length(); right++) {
        char c = s[right];
        if (lastSeen.find(c) != lastSeen.end()) {
            left = lastSeen[c] + 1;
        }
        lastSeen[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }

    cout << maxLen << endl;
    return 0;
}
```

#### Java Implementation

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";

        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c)) {
                left = lastSeen.get(c) + 1;
            }
            lastSeen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }

        System.out.println(maxLen);
    }
}
```

#### Python Implementation

```python
import sys

def solve():
    s = sys.stdin.read().strip()
    last_seen = {}
    left = 0
    max_len = 0

    for right, c in enumerate(s):
        if c in last_seen:
            left = last_seen[c] + 1
        last_seen[c] = right
        max_len = max(max_len, right - left + 1)

    print(max_len)

if __name__ == '__main__':
    solve()
```

