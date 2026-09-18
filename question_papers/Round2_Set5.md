# Round 2 — Hard Debugging (Set 5)

## Problem: Minimum Window Substring with Exact Multiplicities

**Points:** 30 Points | **Difficulty:** Hard | **Time Limit:** 3.0s | **Memory Limit:** 256MB

### Problem Statement

Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return an empty string (or print -1).

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
-1

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
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
}
```

#### Java Implementation

```java
import java.util.*;

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
}
```

#### Python Implementation

```python
import sys
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
    main()
```

