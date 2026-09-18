# Round 2 — Medium Debugging (Set 5)

## Problem: Search in Rotated Sorted Array

**Points:** 20 Points | **Time Limit:** 2.5s | **Memory Limit:** 256MB

### Problem Statement

Given an integer array nums sorted in ascending order with distinct values, rotated at some unknown pivot index, and a target value, return the 0-based index of target if it is in nums, or -1 if not.
Algorithm must achieve O(log n) time complexity.

Input Format:
- First line: Integer target
- Second line: Space-separated integers representing rotated array nums

Output Format:
- Single integer: index of target, or -1.

Example 1:
Input:
0
4 5 6 7 0 1 2
Output:
4

Example 2:
Input:
3
4 5 6 7 0 1 2
Output:
-1

---

### Buggy Code Templates

#### C++ Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int low = 0, high = (int)nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        if (nums[low] < nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
}

int main() {
    int target;
    if (!(cin >> target)) return 0;
    vector<int> nums;
    int x;
    while (cin >> x) nums.push_back(x);
    cout << search(nums, target) << endl;
    return 0;
}
```

#### Java Implementation

```java
import java.util.*;

public class Main {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;

            if (nums[low] < nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int target = sc.nextInt();
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        int[] nums = new int[list.size()];
        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);
        System.out.println(search(nums, target));
    }
}
```

#### Python Implementation

```python
import sys

def search(nums, target):
    low = 0
    high = len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid

        if nums[low] < nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1

def solve():
    data = sys.stdin.read().split()
    if not data: return
    target = int(data[0])
    nums = [int(x) for x in data[1:]]
    print(search(nums, target))

if __name__ == '__main__':
    solve()
```

