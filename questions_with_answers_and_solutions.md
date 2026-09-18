# DEBUGGING COMPETITION — COMPLETE QUESTION BANK

## Event Overview

A **2-hour college-level programming debugging competition** with 3 rounds.

| Round            | Format                       |       Time |
| ---------------- | ---------------------------- | ---------: |
| **Settling In**  | Registration & Setup         | **30 min** |
| **Round 1**      | MCQs – C++, Java, Python     | **20 min** |
| **Round 2**      | Code Debugging               | **35 min** |
| **Round 3**      | Advanced Debugging Challenge | **35 min** |
| **Total**        |                              |  **2 hrs** |

---


# ROUND 1 — MCQ QUALIFICATION

---

## SET 1

### C++ (Set 1)

#### Q1. What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 7, b = 2;
    cout << a / b << endl;
    return 0;
}
```

A. 3.5  
B. 3  
C. 4  
D. 3.0  

**Correct Answer:** B  

**Explanation:** In C++, dividing two integers performs integer division, which truncates the fractional part towards zero. Thus, `7 / 2` equals `3`.

---

#### Q2. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int y = x++;
    cout << x << " " << y << endl;
    return 0;
}
```

A. 5 5  
B. 6 6  
C. 6 5  
D. 5 6  

**Correct Answer:** C  

**Explanation:** The post-increment operator (`x++`) assigns the current value of `x` (5) to `y`, and then increments `x` to 6.

---

#### Q3. What is the output?

```cpp
#include <iostream>
using namespace std;

void addTen(int x) {
    x += 10;
}

int main() {
    int num = 20;
    addTen(num);
    cout << num << endl;
    return 0;
}
```

A. 30  
B. 20  
C. 10  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** `x` is passed by value into `addTen()`. The function modifies a local copy of the variable, so `num` in `main()` remains 20.

---

#### Q4. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    cout << arr[3] << endl;
    return 0;
}
```

A. 30  
B. 40  
C. 50  
D. 20  

**Correct Answer:** B  

**Explanation:** Arrays in C++ are 0-indexed. `arr[0]` is 10, `arr[1]` is 20, `arr[2]` is 30, and `arr[3]` is 40.

---

#### Q5. What is the output?

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    cout << s.length() << " " << s[1] << endl;
    return 0;
}
```

A. 5 e  
B. 5 H  
C. 4 e  
D. 5 l  

**Correct Answer:** A  

**Explanation:** The length of `"Hello"` is 5 characters. `s[1]` accesses the character at 0-based index 1, which is `'e'`.

---

### Java (Set 1)

#### Q6. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Sum: " + 10 + 20);
    }
}
```

A. Sum: 30  
B. Sum: 1020  
C. Sum: 10 20  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** Operators evaluate from left to right. `"Sum: " + 10` evaluates to `"Sum: 10"` (string concatenation), and `"Sum: 10" + 20` yields `"Sum: 1020"`.

---

#### Q7. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = new String("hello");
        System.out.println(s1.equals(s2) + " " + (s1 == s2));
    }
}
```

A. true true  
B. false false  
C. true false  
D. false true  

**Correct Answer:** C  

**Explanation:** `.equals()` compares the actual text content (both are `"hello"`, so `true`). `==` compares reference memory addresses (`s2` was created using `new`, so `false`).

---

#### Q8. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        System.out.println(nums.length);
    }
}
```

A. 4  
B. 5  
C. Compilation error  
D. 6  

**Correct Answer:** B  

**Explanation:** In Java, arrays have a built-in `length` property that returns the total count of elements, which is 5.

---

#### Q9. What is the output?

```java
public class Main {
    static void modify(int a) {
        a = 100;
    }

    public static void main(String[] args) {
        int x = 25;
        modify(x);
        System.out.println(x);
    }
}
```

A. 100  
B. 25  
C. 0  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** Java is strictly pass-by-value. Passing primitive `x` copies its value into parameter `a`, leaving `x` unmodified.

---

#### Q10. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int count = 1;
        while (count < 4) {
            count++;
        }
        System.out.println(count);
    }
}
```

A. 3  
B. 4  
C. 5  
D. 1  

**Correct Answer:** B  

**Explanation:** `count` increments on each iteration: 1 -> 2 -> 3 -> 4. When `count` reaches 4, `4 < 4` is false and the loop terminates, printing 4.

---

### Python (Set 1)

#### Q11. What is the output?

```python
print(9 // 2, 9 / 2)
```

A. 4 4.5  
B. 4.5 4  
C. 4 4  
D. 4.5 4.5  

**Correct Answer:** A  

**Explanation:** `//` is integer floor division returning `4`, while `/` is float division returning `4.5`.

---

#### Q12. What is the output?

```python
text = "Go!"
print(text * 3)
```

A. Go! Go! Go!  
B. Go!3  
C. Go!Go!Go!  
D. TypeError  

**Correct Answer:** C  

**Explanation:** In Python, multiplying a string by an integer repeats the string that many times without added spaces.

---

#### Q13. What is the output?

```python
nums = [10, 20, 30, 40, 50]
print(nums[1:4])
```

A. [20, 30, 40, 50]  
B. [20, 30, 40]  
C. [10, 20, 30]  
D. [20, 30]  

**Correct Answer:** B  

**Explanation:** Slicing `[1:4]` starts at index 1 (20) and stops before index 4 (50), yielding `[20, 30, 40]`.

---

#### Q14. What is the output?

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[-1])
```

A. apple  
B. banana  
C. cherry  
D. IndexError  

**Correct Answer:** C  

**Explanation:** Negative index `-1` retrieves the last element of the list, `"cherry"`.

---

#### Q15. What is the output?

```python
scores = {"Alice": 90, "Bob": 85}
print(scores.get("Charlie", 0))
```

A. None  
B. 0  
C. KeyError  
D. 85  

**Correct Answer:** B  

**Explanation:** `dict.get(key, default)` returns the default value `0` if the key `"Charlie"` is not found, avoiding a `KeyError`.

---

### C++ (Set 1 - Continued)

#### Q16. What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int &ref = x;
    ref = 25;
    cout << x << " " << ref << endl;
    return 0;
}
```

A. 10 25  
B. 25 25  
C. 10 10  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** In C++, `ref` is a reference (alias) to `x`. Modifying `ref` directly changes the value of `x`, so both output `25`.

---

#### Q17. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 5;
    cout << (a > 3 ? (a < 10 ? 1 : 2) : 3) << endl;
    return 0;
}
```

A. 1  
B. 2  
C. 3  
D. 0  

**Correct Answer:** A  

**Explanation:** The outer condition `a > 3` is true (`5 > 3`), so the inner expression `(a < 10 ? 1 : 2)` is evaluated. Since `5 < 10` is true, it outputs `1`.

---

#### Q18. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int val = 2;
    switch (val) {
        case 1: cout << "One ";
        case 2: cout << "Two ";
        case 3: cout << "Three ";
            break;
        default: cout << "Default";
    }
    return 0;
}
```

A. Two  
B. Two Three  
C. Two Three Default  
D. One Two Three  

**Correct Answer:** B  

**Explanation:** Because there is no `break` statement after `case 2`, execution falls through to `case 3`, printing `"Two Three "` before encountering the `break`.

---

### Java (Set 1 - Continued)

#### Q19. What is the output of the following Java code?

```java
public class Main {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(++x + x++);
    }
}
```

A. 11  
B. 12  
C. 13  
D. 10  

**Correct Answer:** B  

**Explanation:** `++x` pre-increments `x` from 5 to 6 and returns 6. Then `x++` post-increments: it uses the current value (6) in addition, and then increments `x` to 7. Thus `6 + 6 = 12`.

---

#### Q20. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        String str = "Debugging";
        System.out.println(str.substring(3, 7));
    }
}
```

A. bugg  
B. uggi  
C. buggi  
D. eggi  

**Correct Answer:** B  

**Explanation:** `substring(beginIndex, endIndex)` extracts characters from index 3 up to index 6 inclusive (7 is exclusive). Indices 3 to 6 are `'u'`, `'g'`, `'g'`, `'i'`.

---

#### Q21. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        boolean flag = true;
        if (flag = false) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }
    }
}
```

A. Yes  
B. No  
C. Compilation error  
D. Runtime error  

**Correct Answer:** B  

**Explanation:** In `if (flag = false)`, the assignment operator `=` assigns `false` to `flag` and evaluates to `false`, executing the `else` block to print `"No"`.

---

### Python (Set 1 - Continued)

#### Q22. What is the output of the following Python code?

```python
nums = [1, 2, 3, 4, 5]
print(nums[1:4])
```

A. [1, 2, 3]  
B. [2, 3, 4]  
C. [2, 3, 4, 5]  
D. [1, 2, 3, 4]  

**Correct Answer:** B  

**Explanation:** Python slicing `[1:4]` starts at index 1 and stops before index 4, producing elements at indices 1, 2, and 3: `[2, 3, 4]`.

---

#### Q23. What is the output?

```python
def greet(name, msg="Hello"):
    return f"{msg}, {name}!"

print(greet("Bob"))
```

A. Hello, Bob!  
B. Bob, Hello!  
C. Error  
D. None  

**Correct Answer:** A  

**Explanation:** The default parameter `msg="Hello"` is used since only the positional argument `"Bob"` was passed for `name`.

---

#### Q24. What is the output?

```python
x = [1, 2, 3]
y = x
y.append(4)
print(len(x))
```

A. 3  
B. 4  
C. 1  
D. AttributeError  

**Correct Answer:** B  

**Explanation:** `y = x` copies the reference to the list. Mutating `y` modifies the underlying list in-place, so `len(x)` is also 4.

---

#### Q25. What is the output?

```python
vals = [x * 2 for x in range(4) if x % 2 == 0]
print(vals)
```

A. [0, 4]  
B. [0, 2, 4]  
C. [0, 4, 8]  
D. [2, 4]  

**Correct Answer:** A  

**Explanation:** `range(4)` generates 0, 1, 2, 3. The condition `x % 2 == 0` keeps 0 and 2. Multiplying by 2 produces `[0, 4]`.

---

### ANSWER KEY — SET 1

| Question | Language | Answer |
| -------- | -------- | ------ |
| 1        | C++      | B      |
| 2        | C++      | C      |
| 3        | C++      | B      |
| 4        | C++      | B      |
| 5        | C++      | A      |
| 6        | Java     | B      |
| 7        | Java     | C      |
| 8        | Java     | B      |
| 9        | Java     | B      |
| 10       | Java     | B      |
| 11       | Python   | A      |
| 12       | Python   | C      |
| 13       | Python   | B      |
| 14       | Python   | C      |
| 15       | Python   | B      |
| 16       | C++      | B      |
| 17       | C++      | A      |
| 18       | C++      | B      |
| 19       | Java     | B      |
| 20       | Java     | B      |
| 21       | Java     | B      |
| 22       | Python   | B      |
| 23       | Python   | A      |
| 24       | Python   | B      |
| 25       | Python   | A      |

---

## SET 2

### C++ (Set 2)

#### Q1. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 14, b = 4;
    cout << a % b << endl;
    return 0;
}
```

A. 3  
B. 2  
C. 0  
D. 3.5  

**Correct Answer:** B  

**Explanation:** The `%` modulo operator returns the remainder of integer division: 14 divided by 4 is 3 with remainder 2.

---

#### Q2. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 1; i <= 4; i++) {
        sum += i;
    }
    cout << sum << endl;
    return 0;
}
```

A. 10  
B. 6  
C. 15  
D. 4  

**Correct Answer:** A  

**Explanation:** The loop iterates for i = 1, 2, 3, 4. Total sum = 1 + 2 + 3 + 4 = 10.

---

#### Q3. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 15, b = 25;
    int maxVal = (a > b) ? a : b;
    cout << maxVal << endl;
    return 0;
}
```

A. 15  
B. 25  
C. 1  
D. 0  

**Correct Answer:** B  

**Explanation:** The condition `15 > 25` is false, so the ternary operator selects the second expression `b` (25).

---

#### Q4. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    bool p = true;
    bool q = false;
    cout << (p && q) << " " << (p || q) << endl;
    return 0;
}
```

A. 1 0  
B. 0 1  
C. 1 1  
D. 0 0  

**Correct Answer:** B  

**Explanation:** `true && false` is `false` (prints `0`), while `true || false` is `true` (prints `1`).

---

#### Q5. What is the output?

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    v.push_back(100);
    v.push_back(200);
    cout << v.size() << " " << v[0] << endl;
    return 0;
}
```

A. 2 100  
B. 2 200  
C. 1 100  
D. 0 100  

**Correct Answer:** A  

**Explanation:** `push_back()` adds 2 items, making `v.size()` 2. `v[0]` accesses the first inserted element, 100.

---

### Java (Set 2)

#### Q6. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int result = 15 / 4;
        System.out.println(result);
    }
}
```

A. 3.75  
B. 3  
C. 4  
D. 3.0  

**Correct Answer:** B  

**Explanation:** Since both 15 and 4 are integers, Java performs integer division and truncates the decimal to 3.

---

#### Q7. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        String s = "hello";
        s.toUpperCase();
        System.out.println(s);
    }
}
```

A. HELLO  
B. hello  
C. Hello  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** Strings in Java are immutable. `s.toUpperCase()` returns a new string but does not modify `s`. Since the return value is ignored, `s` remains `"hello"`.

---

#### Q8. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            if (i == 3) break;
            sum += i;
        }
        System.out.println(sum);
    }
}
```

A. 15  
B. 3  
C. 6  
D. 1  

**Correct Answer:** B  

**Explanation:** When i = 1, sum = 1. When i = 2, sum = 3. When i = 3, `break` immediately exits the loop, leaving sum as 3.

---

#### Q9. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Math.max(42, 17));
    }
}
```

A. 17  
B. 42  
C. 59  
D. 25  

**Correct Answer:** B  

**Explanation:** `Math.max(a, b)` returns the greater of the two numbers, 42.

---

#### Q10. What is the output?

```java
public class Main {
    static boolean flag;

    public static void main(String[] args) {
        System.out.println(flag);
    }
}
```

A. true  
B. false  
C. null  
D. 0  

**Correct Answer:** B  

**Explanation:** Class-level `boolean` member fields in Java default to `false`.

---

### Python (Set 2)

#### Q11. What is the output?

```python
animals = ["dog", "cat", "bird", "fish"]
print(len(animals))
```

A. 3  
B. 4  
C. 5  
D. 16  

**Correct Answer:** B  

**Explanation:** `len()` returns the number of elements in the list, which is 4.

---

#### Q12. What is the output?

```python
word = "PYTHON"
print(word.lower())
```

A. python  
B. PYTHON  
C. Python  
D. TypeError  

**Correct Answer:** A  

**Explanation:** `.lower()` converts all uppercase characters in the string to lowercase.

---

#### Q13. What is the output?

```python
nums = [1, 2, 3]
nums.append(4)
print(nums)
```

A. [4, 1, 2, 3]  
B. [1, 2, 3, 4]  
C. [1, 2, 3]  
D. 4  

**Correct Answer:** B  

**Explanation:** `append()` adds the item `4` to the end of the existing list in-place.

---

#### Q14. What is the output?

```python
print(list(range(1, 5)))
```

A. [1, 2, 3, 4, 5]  
B. [1, 2, 3, 4]  
C. [0, 1, 2, 3, 4]  
D. [1, 5]  

**Correct Answer:** B  

**Explanation:** `range(1, 5)` starts at 1 and stops before 5: `[1, 2, 3, 4]`.

---

#### Q15. What is the output?

```python
x = 10
y = 20
x, y = y, x
print(x, y)
```

A. 10 20  
B. 20 10  
C. 20 20  
D. 10 10  

**Correct Answer:** B  

**Explanation:** Python's tuple packing and unpacking swaps `x` and `y` simultaneously, setting `x = 20` and `y = 10`.

---

### C++ (Set 2 - Continued)

#### Q16. What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 42;
    int *ptr = &a;
    *ptr = *ptr + 8;
    cout << a << endl;
    return 0;
}
```

A. 42  
B. 50  
C. Garbage value  
D. Memory address  

**Correct Answer:** B  

**Explanation:** `ptr` holds the memory address of `a`. Dereferencing `*ptr` and adding 8 directly modifies `a` to `50`.

---

#### Q17. What is the output?

```cpp
#include <iostream>
using namespace std;

void counter() {
    static int c = 0;
    c++;
    cout << c << " ";
}

int main() {
    counter();
    counter();
    counter();
    return 0;
}
```

A. 1 1 1  
B. 1 2 3  
C. 0 1 2  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** A `static` local variable persists across function calls and retains its value. It increments to 1, then 2, then 3.

---

#### Q18. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 0, y = 5;
    if (x != 0 && ++y > 5) {
        cout << "Inside ";
    }
    cout << y << endl;
    return 0;
}
```

A. Inside 6  
B. 5  
C. 6  
D. Inside 5  

**Correct Answer:** B  

**Explanation:** In the logical AND (`&&`) expression, the first operand `x != 0` evaluates to `false`. Execution short-circuits, so `++y` is never evaluated and `y` remains `5`.

---

#### Q19. What is the output?

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20};
    v.push_back(30);
    v.pop_back();
    cout << v.size() << " " << v.back() << endl;
    return 0;
}
```

A. 2 20  
B. 3 30  
C. 2 30  
D. 3 20  

**Correct Answer:** A  

**Explanation:** `push_back(30)` inserts 30, but `pop_back()` immediately deletes it. The vector size is 2, and `v.back()` returns the last remaining element `20`.

---

### Java (Set 2 - Continued)

#### Q20. What is the output of the following Java code?

```java
public class Main {
    public static void main(String[] args) {
        String s = "Algorithm";
        System.out.println(s.charAt(0) + "" + s.charAt(s.length() - 1));
    }
}
```

A. Am  
B. Ah  
C. Algorithm  
D. Compilation error  

**Correct Answer:** A  

**Explanation:** `s.charAt(0)` is `'A'` and `s.charAt(s.length() - 1)` is `'m'`. Concatenating them with `""` produces `"Am"`.

---

#### Q21. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int[] arr = {2, 4, 6};
        int total = 0;
        for (int n : arr) {
            total += n;
        }
        System.out.println(total);
    }
}
```

A. 12  
B. 6  
C. 0  
D. Compilation error  

**Correct Answer:** A  

**Explanation:** The enhanced for loop iterates over all items in `arr`: 2 + 4 + 6 = 12.

---

#### Q22. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int a = 15, b = 25, c = 10;
        int result = Math.max(a, Math.min(b, c));
        System.out.println(result);
    }
}
```

A. 25  
B. 15  
C. 10  
D. 20  

**Correct Answer:** B  

**Explanation:** `Math.min(25, 10)` evaluates to `10`. Then `Math.max(15, 10)` returns `15`.

---

### Python (Set 2 - Continued)

#### Q23. What is the output of the following Python code?

```python
words = ["cat", "elephant", "dog"]
short = [w.upper() for w in words if len(w) <= 3]
print(short)
```

A. ['CAT', 'ELEPHANT', 'DOG']  
B. ['CAT', 'DOG']  
C. ['cat', 'dog']  
D. ['ELEPHANT']  

**Correct Answer:** B  

**Explanation:** The list comprehension filters for elements whose length is <= 3 (`"cat"` and `"dog"`) and converts them to uppercase: `['CAT', 'DOG']`.

---

#### Q24. What is the output?

```python
data = {"a": 1, "b": 2}
print("a" in data, 1 in data)
```

A. True True  
B. True False  
C. False True  
D. False False  

**Correct Answer:** B  

**Explanation:** The `in` operator on dictionaries checks membership among keys, not values. `"a"` is a key (True), but `1` is a value, not a key (False).

---

#### Q25. What is the output?

```python
text = "apple-banana-orange"
parts = text.split("-")
print("/".join(parts[:2]))
```

A. apple/banana/orange  
B. apple/banana  
C. apple-banana  
D. banana/orange  

**Correct Answer:** B  

**Explanation:** `split("-")` produces `['apple', 'banana', 'orange']`. Slice `[:2]` takes the first two items `['apple', 'banana']`, which joined by `"/"` outputs `"apple/banana"`.

---

### ANSWER KEY — SET 2

| Question | Language | Answer |
| -------- | -------- | ------ |
| 1        | C++      | B      |
| 2        | C++      | A      |
| 3        | C++      | B      |
| 4        | C++      | B      |
| 5        | C++      | A      |
| 6        | Java     | B      |
| 7        | Java     | B      |
| 8        | Java     | B      |
| 9        | Java     | B      |
| 10       | Java     | B      |
| 11       | Python   | B      |
| 12       | Python   | A      |
| 13       | Python   | B      |
| 14       | Python   | B      |
| 15       | Python   | B      |
| 16       | C++      | B      |
| 17       | C++      | B      |
| 18       | C++      | B      |
| 19       | C++      | A      |
| 20       | Java     | A      |
| 21       | Java     | A      |
| 22       | Java     | B      |
| 23       | Python   | B      |
| 24       | Python   | B      |
| 25       | Python   | B      |

---

## SET 3

### C++ (Set 3)

#### Q1. What is the output?

```cpp
#include <iostream>
using namespace std;

void doubleVal(int &x) {
    x *= 2;
}

int main() {
    int num = 7;
    doubleVal(num);
    cout << num << endl;
    return 0;
}
```

A. 7  
B. 14  
C. 2  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** `int &x` is passed by reference. Changes made to `x` directly modify `num` in `main()`, doubling it to 14.

---

#### Q2. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    char c = 'A';
    c = c + 1;
    cout << c << endl;
    return 0;
}
```

A. A1  
B. B  
C. 66  
D. Error  

**Correct Answer:** B  

**Explanation:** In ASCII, `'A'` is 65. Adding 1 gives 66, which is the character code for `'B'`.

---

#### Q3. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 3;
    while (n > 0) {
        cout << n << " ";
        n--;
    }
    return 0;
}
```

A. 3 2 1   
B. 3 2 1 0   
C. 2 1 0   
D. 3 2   

**Correct Answer:** A  

**Explanation:** The loop prints 3, 2, and 1. When `n` reaches 0, `n > 0` becomes false and the loop terminates.

---

#### Q4. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 10, 15};
    int count = sizeof(arr) / sizeof(arr[0]);
    cout << count << endl;
    return 0;
}
```

A. 3  
B. 12  
C. 4  
D. 1  

**Correct Answer:** A  

**Explanation:** `sizeof(arr)` is the total bytes allocated for the array, and `sizeof(arr[0])` is the byte size of one element. Dividing gives 3 elements.

---

#### Q5. What is the output?

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string greeting = "Hi";
    greeting += "!";
    cout << greeting << endl;
    return 0;
}
```

A. Hi!  
B. Hi  
C. !  
D. Error  

**Correct Answer:** A  

**Explanation:** The `+=` operator appends `"!"` to the string `"Hi"`, producing `"Hi!"`.

---

### Java (Set 3)

#### Q6. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int x = 22 % 5;
        System.out.println(x);
    }
}
```

A. 4  
B. 2  
C. 0  
D. 4.4  

**Correct Answer:** B  

**Explanation:** 22 divided by 5 equals 4 with a remainder of 2.

---

#### Q7. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int[] arr = new int[3];
        arr[0] = 10;
        arr[1] = 20;
        arr[2] = 30;
        System.out.println(arr[1]);
    }
}
```

A. 10  
B. 20  
C. 30  
D. ArrayIndexOutOfBoundsException  

**Correct Answer:** B  

**Explanation:** Index 1 holds the second element, which is 20.

---

#### Q8. What is the output?

```java
public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(add(8, 12));
    }
}
```

A. 20  
B. 812  
C. 96  
D. Error  

**Correct Answer:** A  

**Explanation:** The static method `add(8, 12)` computes `8 + 12 = 20` and returns it.

---

#### Q9. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        char ch = 'C';
        System.out.println((int) ch == 67);
    }
}
```

A. true  
B. false  
C. Compilation error  
D. 67  

**Correct Answer:** A  

**Explanation:** In Unicode/ASCII, `'A'=65`, `'B'=66`, `'C'=67`. Casting `'C'` to `int` yields 67, so `67 == 67` is `true`.

---

#### Q10. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int x = 0;
        for (int i = 0; i < 3; i++) {
            x++;
        }
        System.out.println(x);
    }
}
```

A. 0  
B. 2  
C. 3  
D. 4  

**Correct Answer:** C  

**Explanation:** The loop executes 3 times (i = 0, 1, 2), incrementing `x` by 1 each time from 0 to 3.

---

### Python (Set 3)

#### Q11. What is the output?

```python
name = "Antigravity"
print(len(name))
```

A. 10  
B. 11  
C. 12  
D. 9  

**Correct Answer:** B  

**Explanation:** `"Antigravity"` contains exactly 11 characters.

---

#### Q12. What is the output?

```python
fruits = ["apple", "banana", "cherry"]
print("banana" in fruits, "mango" in fruits)
```

A. True False  
B. True True  
C. False True  
D. False False  

**Correct Answer:** A  

**Explanation:** `"banana"` exists in `fruits` (`True`), whereas `"mango"` does not (`False`).

---

#### Q13. What is the output?

```python
nums = [10, 20, 30]
val = nums.pop()
print(val, nums)
```

A. 10 [20, 30]  
B. 30 [10, 20]  
C. 30 [10, 20, 30]  
D. 20 [10, 30]  

**Correct Answer:** B  

**Explanation:** `pop()` removes and returns the last element (30), leaving `[10, 20]`.

---

#### Q14. What is the output?

```python
val = int(8.75)
print(val)
```

A. 8  
B. 9  
C. 8.0  
D. ValueError  

**Correct Answer:** A  

**Explanation:** `int()` on a float truncates the decimal portion towards zero, yielding integer `8`.

---

#### Q15. What is the output?

```python
print(bool([]), bool([0]))
```

A. False False  
B. False True  
C. True False  
D. True True  

**Correct Answer:** B  

**Explanation:** An empty list `[]` evaluates to `False`, while any non-empty list like `[0]` evaluates to `True`.

---

### C++ (Set 3 - Continued)

#### Q16. What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {4, 8, 12, 16, 20, 24};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << n << endl;
    return 0;
}
```

A. 24  
B. 6  
C. 4  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** `sizeof(arr)` calculates the total byte size of the array, and `sizeof(arr[0])` is the byte size of a single integer. Dividing them yields the number of elements: 6.

---

#### Q17. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    do {
        x += 5;
    } while (x < 10);
    cout << x << endl;
    return 0;
}
```

A. 10  
B. 15  
C. 20  
D. Infinite loop  

**Correct Answer:** B  

**Explanation:** A `do-while` loop executes the body once before evaluating the condition. `x` becomes 15, then `15 < 10` is false, terminating the loop.

---

#### Q18. What is the output?

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str = "competitor";
    if (str.find("pet") != string::npos) {
        cout << "Found at " << str.find("pet") << endl;
    } else {
        cout << "Not found" << endl;
    }
    return 0;
}
```

A. Found at 3  
B. Found at 4  
C. Not found  
D. Found at 2  

**Correct Answer:** A  

**Explanation:** `"competitor"` contains substring `"pet"` starting at 0-based index 3 (`'c'`=0, `'o'`=1, `'m'`=2, `'p'`=3).

---

### Java (Set 3 - Continued)

#### Q19. What is the output of the following Java code?

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);
        list.remove(1);
        System.out.println(list);
    }
}
```

A. [20, 30]  
B. [10, 30]  
C. [10, 20]  
D. [10]  

**Correct Answer:** B  

**Explanation:** `remove(1)` removes the item at index 1, which is `20`. The remaining list is `[10, 30]`.

---

#### Q20. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int a = 10, b = 20;
        int max = (a > b) ? a : b;
        System.out.println(max * 2);
    }
}
```

A. 20  
B. 40  
C. 10  
D. 30  

**Correct Answer:** B  

**Explanation:** The condition `(10 > 20)` evaluates to false, so `max` takes the value of `b` (20). `20 * 2 = 40`.

---

#### Q21. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("code");
        sb.append("123");
        System.out.println(sb.length() + " " + sb.charAt(0));
    }
}
```

A. 7 c  
B. 4 c  
C. 7 1  
D. 6 c  

**Correct Answer:** A  

**Explanation:** Appending `"123"` to `"code"` produces `"code123"` with length 7. The character at index 0 is `'c'`.

---

#### Q22. What is the output?

```java
public class Main {
    static int x = 10;
    static {
        x += 5;
    }
    public static void main(String[] args) {
        System.out.println(x);
    }
}
```

A. 10  
B. 15  
C. 5  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** The static initialization block executes when the class is initialized, modifying `x` to 15 prior to `main()` running.

---

### Python (Set 3 - Continued)

#### Q23. What is the output of the following Python code?

```python
names = ["A", "B", "C"]
scores = [100, 90, 80]
pairs = list(zip(names, scores))
print(pairs[1])
```

A. ('A', 100)  
B. ('B', 90)  
C. ('C', 80)  
D. ['B', 90]  

**Correct Answer:** B  

**Explanation:** `zip(names, scores)` pairs corresponding elements into tuples. Index 1 accesses the second pair `('B', 90)`.

---

#### Q24. What is the output?

```python
s1 = {1, 2, 3, 4}
s2 = {3, 4, 5, 6}
print(s1 - s2)
```

A. {1, 2}  
B. {5, 6}  
C. {3, 4}  
D. {1, 2, 5, 6}  

**Correct Answer:** A  

**Explanation:** The set difference `s1 - s2` yields elements present in `s1` but absent from `s2`, which is `{1, 2}`.

---

#### Q25. What is the output?

```python
text = "banana"
print(text.count("an"))
```

A. 1  
B. 2  
C. 3  
D. 0  

**Correct Answer:** B  

**Explanation:** `"banana"` contains the substring `"an"` non-overlapping at index 1 and index 3, returning `2`.

---

### ANSWER KEY — SET 3

| Question | Language | Answer |
| -------- | -------- | ------ |
| 1        | C++      | B      |
| 2        | C++      | B      |
| 3        | C++      | A      |
| 4        | C++      | A      |
| 5        | C++      | A      |
| 6        | Java     | B      |
| 7        | Java     | B      |
| 8        | Java     | A      |
| 9        | Java     | A      |
| 10       | Java     | C      |
| 11       | Python   | B      |
| 12       | Python   | A      |
| 13       | Python   | B      |
| 14       | Python   | A      |
| 15       | Python   | B      |
| 16       | C++      | B      |
| 17       | C++      | B      |
| 18       | C++      | A      |
| 19       | Java     | B      |
| 20       | Java     | B      |
| 21       | Java     | A      |
| 22       | Java     | B      |
| 23       | Python   | B      |
| 24       | Python   | A      |
| 25       | Python   | B      |

---

## SET 4

### C++ (Set 4)

#### Q1. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int choice = 2;
    switch (choice) {
        case 1: cout << "One"; break;
        case 2: cout << "Two"; break;
        case 3: cout << "Three"; break;
        default: cout << "Other";
    }
    return 0;
}
```

A. One  
B. Two  
C. Three  
D. Other  

**Correct Answer:** B  

**Explanation:** `choice` is 2, which matches `case 2:`. It prints `"Two"` and encounters `break`, exiting the switch statement.

---

#### Q2. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 5;
    int b = ++a;
    cout << a << " " << b << endl;
    return 0;
}
```

A. 6 6  
B. 6 5  
C. 5 5  
D. 5 6  

**Correct Answer:** A  

**Explanation:** Pre-increment (`++a`) increments `a` to 6 first, then evaluates to 6, which is assigned to `b`. Both are 6.

---

#### Q3. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int count = 0;
    for (int i = 0; i < 10; i += 2) {
        count++;
    }
    cout << count << endl;
    return 0;
}
```

A. 10  
B. 5  
C. 4  
D. 6  

**Correct Answer:** B  

**Explanation:** `i` takes the values 0, 2, 4, 6, 8 (5 iterations). When `i = 10`, `10 < 10` is false.

---

#### Q4. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {2, 4, 6};
    int total = 0;
    for (int x : arr) {
        total += x;
    }
    cout << total << endl;
    return 0;
}
```

A. 12  
B. 6  
C. 8  
D. 10  

**Correct Answer:** A  

**Explanation:** The range-based for loop sums each element: 2 + 4 + 6 = 12.

---

#### Q5. What is the output?

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "";
    cout << s.empty() << endl;
    return 0;
}
```

A. 1  
B. 0  
C. true  
D. Error  

**Correct Answer:** A  

**Explanation:** `s.empty()` returns `true` because string `s` has length 0. In C++, boolean `true` outputs as `1`.

---

### Java (Set 4)

#### Q6. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        boolean active = false;
        System.out.println(!active);
    }
}
```

A. false  
B. true  
C. 1  
D. null  

**Correct Answer:** B  

**Explanation:** The logical NOT operator `!` inverts `false` to `true`.

---

#### Q7. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        String lang = "Java";
        System.out.println(lang.charAt(2));
    }
}
```

A. J  
B. a  
C. v  
D. IndexOutOfBoundsException  

**Correct Answer:** C  

**Explanation:** Zero-based index 2 of `"Java"` is `'v'` (0: 'J', 1: 'a', 2: 'v', 3: 'a').

---

#### Q8. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int[] vals = {3, 5, 7};
        int sum = 0;
        for (int v : vals) {
            sum += v;
        }
        System.out.println(sum);
    }
}
```

A. 15  
B. 8  
C. 12  
D. 7  

**Correct Answer:** A  

**Explanation:** The enhanced for-each loop sums 3 + 5 + 7 = 15.

---

#### Q9. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int score = 75;
        String status = score >= 60 ? "Pass" : "Fail";
        System.out.println(status);
    }
}
```

A. Pass  
B. Fail  
C. true  
D. 75  

**Correct Answer:** A  

**Explanation:** `75 >= 60` is true, so the ternary operator evaluates to `"Pass"`.

---

#### Q10. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int num = Integer.parseInt("123");
        System.out.println(num + 1);
    }
}
```

A. 1231  
B. 124  
C. "124"  
D. Error  

**Correct Answer:** B  

**Explanation:** `Integer.parseInt("123")` parses the string into integer 123; `123 + 1` produces integer 124.

---

### Python (Set 4)

#### Q11. What is the output?

```python
sentence = "learn code build"
words = sentence.split()
print(len(words))
```

A. 16  
B. 3  
C. 2  
D. 1  

**Correct Answer:** B  

**Explanation:** `split()` divides the string by whitespace into a list of 3 strings: `['learn', 'code', 'build']`.

---

#### Q12. What is the output?

```python
nums = [1, 2, 2, 3, 3, 3]
unique = set(nums)
print(len(unique))
```

A. 6  
B. 3  
C. 1  
D. 2  

**Correct Answer:** B  

**Explanation:** A `set` stores only unique items `{1, 2, 3}`, so its length is 3.

---

#### Q13. What is the output?

```python
items = ["a", "b", "a", "c", "a"]
print(items.count("a"))
```

A. 1  
B. 2  
C. 3  
D. 5  

**Correct Answer:** C  

**Explanation:** `.count("a")` counts the occurrences of element `"a"`, which appears 3 times.

---

#### Q14. What is the output?

```python
print(2 ** 4)
```

A. 8  
B. 16  
C. 6  
D. 24  

**Correct Answer:** B  

**Explanation:** `**` is the power/exponentiation operator: $2^4 = 16$.

---

#### Q15. What is the output?

```python
info = {"name": "Alex", "age": 20}
info["age"] = 21
print(info["age"])
```

A. 20  
B. 21  
C. 41  
D. KeyError  

**Correct Answer:** B  

**Explanation:** Setting `info["age"] = 21` mutates the existing key's value to 21.

---

### C++ (Set 4 - Continued)

#### Q16. What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

struct Point {
    int x;
    int y;
};

int main() {
    Point p = {10, 20};
    p.x += 5;
    cout << p.x << " " << p.y << endl;
    return 0;
}
```

A. 10 20  
B. 15 20  
C. 15 25  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** `p` is initialized with `x = 10` and `y = 20`. Adding 5 to `p.x` makes it 15, while `p.y` remains 20.

---

#### Q17. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 3;
    int y = x << 2;
    cout << y << endl;
    return 0;
}
```

A. 6  
B. 12  
C. 9  
D. 5  

**Correct Answer:** B  

**Explanation:** Left-shifting by 2 bits (`x << 2`) is equivalent to multiplying by $2^2 = 4$. Thus, $3 \times 4 = 12$.

---

#### Q18. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    const int *ptr = &a;
    ptr = &b;
    cout << *ptr << endl;
    return 0;
}
```

A. 10  
B. 20  
C. Compilation error  
D. Undefined behavior  

**Correct Answer:** B  

**Explanation:** `const int *ptr` is a pointer to a constant integer. The integer value cannot be altered via `ptr`, but the pointer itself can be reassigned to point to `b`. Dereferencing prints 20.

---

### Java (Set 4 - Continued)

#### Q19. What is the output of the following Java code?

```java
public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3};
        int[] b = a.clone();
        b[0] = 99;
        System.out.println(a[0] + " " + b[0]);
    }
}
```

A. 99 99  
B. 1 99  
C. 1 1  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** Calling `.clone()` on a primitive array creates an independent copy. Mutating `b[0]` does not affect `a[0]`.

---

#### Q20. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        char ch = '7';
        int num = Character.getNumericValue(ch);
        System.out.println(num + 3);
    }
}
```

A. 55  
B. 10  
C. 73  
D. 7  

**Correct Answer:** B  

**Explanation:** `Character.getNumericValue('7')` returns the numeric digit value `7`. Then `7 + 3 = 10`.

---

#### Q21. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        double val = Math.pow(2, 3);
        System.out.println(val);
    }
}
```

A. 8  
B. 8.0  
C. 6.0  
D. 9.0  

**Correct Answer:** B  

**Explanation:** `Math.pow()` computes $2^3$ and returns a `double`, resulting in `8.0`.

---

### Python (Set 4 - Continued)

#### Q22. What is the output of the following Python code?

```python
text = "hello world"
print(text.title())
```

A. Hello world  
B. Hello World  
C. HELLO WORLD  
D. hello World  

**Correct Answer:** B  

**Explanation:** The `.title()` method capitalizes the first letter of each word in the string, producing `"Hello World"`.

---

#### Q23. What is the output?

```python
words = ["python", "c", "javascript", "go"]
print(min(words, key=len))
```

A. c  
B. go  
C. python  
D. javascript  

**Correct Answer:** A  

**Explanation:** `min(..., key=len)` finds the element with the minimum length. `"c"` has length 1.

---

#### Q24. What is the output?

```python
items = ["apple", "banana"]
for i, item in enumerate(items, start=1):
    print(f"{i}:{item}", end=" ")
```

A. 0:apple 1:banana   
B. 1:apple 2:banana   
C. 1:apple 1:banana   
D. apple:1 banana:2   

**Correct Answer:** B  

**Explanation:** `enumerate(items, start=1)` numbers items starting from 1, outputting `"1:apple 2:banana "`.

---

#### Q25. What is the output?

```python
nums = [1, 3, 4]
nums.insert(1, 2)
print(nums)
```

A. [2, 1, 3, 4]  
B. [1, 2, 3, 4]  
C. [1, 3, 2, 4]  
D. [1, 2, 4]  

**Correct Answer:** B  

**Explanation:** `insert(1, 2)` places value `2` at index `1`, yielding `[1, 2, 3, 4]`.

---

### ANSWER KEY — SET 4

| Question | Language | Answer |
| -------- | -------- | ------ |
| 1        | C++      | B      |
| 2        | C++      | A      |
| 3        | C++      | B      |
| 4        | C++      | A      |
| 5        | C++      | A      |
| 6        | Java     | B      |
| 7        | Java     | C      |
| 8        | Java     | A      |
| 9        | Java     | A      |
| 10       | Java     | B      |
| 11       | Python   | B      |
| 12       | Python   | B      |
| 13       | Python   | C      |
| 14       | Python   | B      |
| 15       | Python   | B      |
| 16       | C++      | B      |
| 17       | C++      | B      |
| 18       | C++      | B      |
| 19       | Java     | B      |
| 20       | Java     | B      |
| 21       | Java     | B      |
| 22       | Python   | B      |
| 23       | Python   | A      |
| 24       | Python   | B      |
| 25       | Python   | B      |

---

## SET 5

### C++ (Set 5)

#### Q1. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    if (x > 5) {
        cout << "Greater";
    } else {
        cout << "Smaller";
    }
    return 0;
}
```

A. Greater  
B. Smaller  
C. 10  
D. Nothing  

**Correct Answer:** A  

**Explanation:** The condition `10 > 5` evaluates to true, so the `if` block executes, printing `"Greater"`.

---

#### Q2. What is the output?

```cpp
#include <iostream>
using namespace std;

int multiply(int a, int b = 2) {
    return a * b;
}

int main() {
    cout << multiply(5) << endl;
    return 0;
}
```

A. 5  
B. 10  
C. 7  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** Since only argument 5 is provided for parameter `a`, the default value `b = 2` is used: `5 * 2 = 10`.

---

#### Q3. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    char ch = 'm';
    bool isUpper = (ch >= 'A' && ch <= 'Z');
    cout << isUpper << endl;
    return 0;
}
```

A. 1  
B. 0  
C. true  
D. Error  

**Correct Answer:** B  

**Explanation:** `'m'` is a lowercase letter, so the uppercase check condition is `false`, which prints as `0`.

---

#### Q4. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 10;
    do {
        cout << i;
        i++;
    } while (i < 5);
    return 0;
}
```

A. 10  
B. Nothing  
C. Infinite loop  
D. 101112...  

**Correct Answer:** A  

**Explanation:** A `do-while` loop always executes its body at least once before testing the condition. It prints 10, increments `i` to 11, and since `11 < 5` is false, it exits.

---

#### Q5. What is the output?

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {100, 200, 300};
    cout << arr[0] + arr[2] << endl;
    return 0;
}
```

A. 300  
B. 400  
C. 500  
D. 600  

**Correct Answer:** B  

**Explanation:** `arr[0]` is 100, and `arr[2]` is 300. `100 + 300 = 400`.

---

### Java (Set 5)

#### Q6. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int temp = 32;
        if (temp > 30) {
            System.out.println("Hot");
        } else {
            System.out.println("Cold");
        }
    }
}
```

A. Hot  
B. Cold  
C. 32  
D. Compilation error  

**Correct Answer:** A  

**Explanation:** `32 > 30` is true, so the program prints `"Hot"`.

---

#### Q7. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Math.abs(-15));
    }
}
```

A. -15  
B. 15  
C. 0  
D. Error  

**Correct Answer:** B  

**Explanation:** `Math.abs()` returns the non-negative absolute value of the argument, which is 15.

---

#### Q8. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        String title = "Competitive Programming";
        System.out.println(title.startsWith("Comp"));
    }
}
```

A. true  
B. false  
C. Comp  
D. Compilation error  

**Correct Answer:** A  

**Explanation:** `"Competitive Programming"` begins with `"Comp"`, so `.startsWith("Comp")` returns `true`.

---

#### Q9. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int n = 0;
        while (n < 4) {
            n += 2;
        }
        System.out.println(n);
    }
}
```

A. 2  
B. 4  
C. 6  
D. 0  

**Correct Answer:** B  

**Explanation:** `n` starts at 0, increases to 2, then increases to 4. Since `4 < 4` is false, the loop ends and prints 4.

---

#### Q10. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        String[] colors = {"red", "green", "blue"};
        System.out.println(colors[colors.length - 1]);
    }
}
```

A. red  
B. green  
C. blue  
D. ArrayIndexOutOfBoundsException  

**Correct Answer:** C  

**Explanation:** `colors.length` is 3, so `colors.length - 1` is 2. `colors[2]` retrieves the last element, `"blue"`.

---

### Python (Set 5)

#### Q11. What is the output?

```python
text = "hello world"
print(text.title())
```

A. hello world  
B. Hello World  
C. HELLO WORLD  
D. Hello world  

**Correct Answer:** B  

**Explanation:** `.title()` capitalizes the first character of each word in the string.

---

#### Q12. What is the output?

```python
nums = [1, 2, 3]
print(nums[::-1])
```

A. [1, 2, 3]  
B. [3, 2, 1]  
C. [3, 1, 2]  
D. [-1, -2, -3]  

**Correct Answer:** B  

**Explanation:** Slice step `-1` reverses the elements of the list.

---

#### Q13. What is the output?

```python
scores = [45, 88, 72, 95, 60]
print(max(scores))
```

A. 45  
B. 88  
C. 95  
D. 72  

**Correct Answer:** C  

**Explanation:** `max()` finds and returns the largest value in the list, which is 95.

---

#### Q14. What is the output?

```python
nums = [5, 10, 15]
print(sum(nums))
```

A. 30  
B. 15  
C. 25  
D. 50  

**Correct Answer:** A  

**Explanation:** `sum()` adds all elements in the list: 5 + 10 + 15 = 30.

---

#### Q15. What is the output?

```python
user = "Sam"
score = 98
print(f"{user}: {score}")
```

A. {user}: {score}  
B. Sam: 98  
C. Sam 98  
D. Error  

**Correct Answer:** B  

**Explanation:** An f-string evaluates expressions inside `{}` and formats them directly into the string.

---

### C++ (Set 5 - Continued)

#### Q16. What is the output of the following C++ code?

```cpp
#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<string, int> p = make_pair("Score", 95);
    cout << p.first << ": " << p.second << endl;
    return 0;
}
```

A. Score: 95  
B. 95: Score  
C. ("Score", 95)  
D. Compilation error  

**Correct Answer:** A  

**Explanation:** `std::pair` members are accessed via `.first` (the string `"Score"`) and `.second` (the integer `95`).

---

#### Q17. What is the output?

```cpp
#include <iostream>
using namespace std;

int multiply(int a, int b = 2, int c = 3) {
    return a * b * c;
}

int main() {
    cout << multiply(4, 5) << endl;
    return 0;
}
```

A. 24  
B. 60  
C. 40  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** The call supplies `a = 4` and `b = 5`. The default argument `c = 3` is used. $4 \times 5 \times 3 = 60$.

---

#### Q18. What is the output?

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};
    for (int &x : v) {
        x *= 2;
    }
    cout << v[0] << " " << v[1] << " " << v[2] << endl;
    return 0;
}
```

A. 1 2 3  
B. 2 4 6  
C. 2 2 3  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** In `for (int &x : v)`, `x` is a reference to each element. Modifying `x` doubles each element in `v` directly: 2, 4, 6.

---

#### Q19. What is the output?

```cpp
#include <iostream>
using namespace std;

int x = 50;

int main() {
    int x = 10;
    cout << ::x + x << endl;
    return 0;
}
```

A. 20  
B. 60  
C. 100  
D. Compilation error  

**Correct Answer:** B  

**Explanation:** `::x` refers to the global variable (50), while `x` refers to the local variable in `main()` (10). $50 + 10 = 60$.

---

### Java (Set 5 - Continued)

#### Q20. What is the output of the following Java code?

```java
public class Main {
    public static void main(String[] args) {
        String word = "Java";
        char[] chars = word.toCharArray();
        System.out.println(chars.length + " " + chars[2]);
    }
}
```

A. 4 v  
B. 4 a  
C. 3 v  
D. Compilation error  

**Correct Answer:** A  

**Explanation:** `toCharArray()` creates an array of 4 characters `['J', 'a', 'v', 'a']`. Index 2 accesses `'v'`.

---

#### Q21. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        int decimal = Integer.parseInt("1010", 2);
        System.out.println(decimal);
    }
}
```

A. 1010  
B. 10  
C. 12  
D. NumberFormatException  

**Correct Answer:** B  

**Explanation:** `Integer.parseInt("1010", 2)` interprets the string in base 2 (binary): $1\times 8 + 0\times 4 + 1\times 2 + 0\times 1 = 10$.

---

#### Q22. What is the output?

```java
public class Main {
    public static void main(String[] args) {
        String role = "ADMIN";
        switch (role) {
            case "USER": System.out.print("U"); break;
            case "ADMIN": System.out.print("A");
            case "GUEST": System.out.print("G"); break;
            default: System.out.print("D");
        }
    }
}
```

A. A  
B. AG  
C. AD  
D. AGD  

**Correct Answer:** B  

**Explanation:** `role` matches `"ADMIN"`. Because there is no `break` under that case, execution falls through to `case "GUEST"`, printing `"AG"` before hitting the `break`.

---

### Python (Set 5 - Continued)

#### Q23. What is the output of the following Python code?

```python
info = {"x": 10, "y": 20}
total = 0
for k, v in info.items():
    total += v
print(total)
```

A. 30  
B. 10  
C. 20  
D. TypeError  

**Correct Answer:** A  

**Explanation:** `.items()` yields key-value pairs. Summing `v`: 10 + 20 = 30.

---

#### Q24. What is the output?

```python
items = [10, 20, 30, 40]
removed = items.pop(1)
print(removed, items)
```

A. 20 [10, 30, 40]  
B. 10 [20, 30, 40]  
C. 20 [10, 20, 30, 40]  
D. 40 [10, 20, 30]  

**Correct Answer:** A  

**Explanation:** `items.pop(1)` removes the item at index 1 (`20`) and returns it, leaving `[10, 30, 40]`.

---

#### Q25. What is the output?

```python
flags = [True, True, False]
print(any(flags), all(flags))
```

A. True True  
B. True False  
C. False True  
D. False False  

**Correct Answer:** B  

**Explanation:** `any(flags)` is `True` because at least one item is True. `all(flags)` is `False` because not all items are True.

---

### ANSWER KEY — SET 5

| Question | Language | Answer |
| -------- | -------- | ------ |
| 1        | C++      | A      |
| 2        | C++      | B      |
| 3        | C++      | B      |
| 4        | C++      | A      |
| 5        | C++      | B      |
| 6        | Java     | A      |
| 7        | Java     | B      |
| 8        | Java     | A      |
| 9        | Java     | B      |
| 10       | Java     | C      |
| 11       | Python   | B      |
| 12       | Python   | B      |
| 13       | Python   | C      |
| 14       | Python   | A      |
| 15       | Python   | B      |
| 16       | C++      | A      |
| 17       | C++      | B      |
| 18       | C++      | B      |
| 19       | C++      | B      |
| 20       | Java     | A      |
| 21       | Java     | B      |
| 22       | Java     | B      |
| 23       | Python   | A      |
| 24       | Python   | A      |
| 25       | Python   | B      |

---


# ROUND 2 — MEDIUM DEBUGGING

## Problem Title: Maximum Subarray Sum with At Most K Distinct Elements

### Difficulty

Medium

### Problem Statement

Given an array of `n` integers and an integer `k`, find the maximum sum of a contiguous subarray such that the subarray contains **at most `k` distinct elements**.

**Input Format:**

- First line: Two integers `n` and `k` (`1 ≤ n ≤ 10^5`, `1 ≤ k ≤ n`)
- Second line: `n` space-separated integers `arr[0], arr[1], ..., arr[n-1]` (`-10^4 ≤ arr[i] ≤ 10^4`)

**Output Format:**

- A single integer: the maximum sum of a contiguous subarray with at most `k` distinct elements.

**Example 1:**

```
Input:
7 2
1 2 1 2 3 4 5

Output:
6
```

*Explanation:* The subarray `[1, 2, 1, 2]` has sum 6 and contains 2 distinct elements.

**Example 2:**

```
Input:
5 1
3 3 3 3 3

Output:
15
```

*Explanation:* The entire array has only 1 distinct element. Sum = 15.

**Example 3:**

```
Input:
5 3
-1 -2 -3 -4 -5

Output:
-1
```

*Explanation:* The best subarray is `[-1]` with sum -1 (all elements are negative).

### Expected Algorithm

Use a **sliding window** approach with a frequency map to maintain at most `k` distinct elements. Expand the right pointer and track the window sum. When distinct elements exceed `k`, shrink from the left. Track the maximum sum seen.

---

### C++ Buggy Code

```cpp
#include <iostream>
#include <unordered_map>
#include <climits>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    
    int arr[n];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    unordered_map<int, int> freq;
    int left = 0;
    long long windowSum = 0;
    long long maxSum = LLONG_MIN;
    
    for (int right = 0; right < n; right++) {
        freq[arr[right]]++;
        windowSum += arr[right];
        
        while (freq.size() > (size_t)k) {
            freq[arr[left]]--;
            if (freq[arr[left]] == 0) {
                freq.erase(arr[left]);
            }
            left++;
            windowSum -= arr[left];
        }
        
        if (windowSum > maxSum) {
            maxSum = windowSum;
        }
    }
    
    cout << maxSum << endl;
    return 0;
}
```

### Java Buggy Code

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0;
        long windowSum = 0;
        long maxSum = Long.MIN_VALUE;
        
        for (int right = 0; right < n; right++) {
            freq.merge(arr[right], 1, Integer::sum);
            windowSum += arr[right];
            
            while (freq.size() > k) {
                freq.merge(arr[left], -1, Integer::sum);
                if (freq.get(arr[left]) == 0) {
                    freq.remove(arr[left]);
                }
                left++;
                windowSum -= arr[left];
            }
            
            if (windowSum > maxSum) {
                maxSum = windowSum;
            }
        }
        
        System.out.println(maxSum);
    }
}
```

### Python Buggy Code

```python
import sys
from collections import defaultdict

def solve():
    data = sys.stdin.read().split()
    idx = 0
    n = int(data[idx]); idx += 1
    k = int(data[idx]); idx += 1
    
    arr = []
    for i in range(n):
        arr.append(int(data[idx])); idx += 1
    
    freq = defaultdict(int)
    left = 0
    window_sum = 0
    max_sum = float('-inf')
    
    for right in range(n):
        freq[arr[right]] += 1
        window_sum += arr[right]
        
        while len(freq) > k:
            freq[arr[left]] -= 1
            if freq[arr[left]] == 0:
                del freq[arr[left]]
            left += 1
            window_sum -= arr[left]
        
        if window_sum > max_sum:
            max_sum = window_sum
    
    print(max_sum)

solve()
```

---

## Round 2 — Root Cause & Fix

### Root Cause

In the window-shrinking loop, `left` is incremented **before** subtracting `arr[left]` from `windowSum`. This means the wrong element is subtracted — the element at the new `left` position instead of the element being removed.

**Incorrect order (buggy):**

```
freq[arr[left]]--        // correctly decrements the element being removed
left++                   // advances left pointer too early
windowSum -= arr[left]   // subtracts the WRONG element (new left, not old left)
```

**Correct order:**

```
freq[arr[left]]--
windowSum -= arr[left]   // subtract the element being removed FIRST
left++                   // THEN advance the pointer
```

### C++ Exact Fix

**BEFORE:**

```cpp
left++;
windowSum -= arr[left];
```

**AFTER:**

```cpp
windowSum -= arr[left];
left++;
```

### Java Exact Fix

**BEFORE:**

```java
left++;
windowSum -= arr[left];
```

**AFTER:**

```java
windowSum -= arr[left];
left++;
```

### Python Exact Fix

**BEFORE:**

```python
left += 1
window_sum -= arr[left]
```

**AFTER:**

```python
window_sum -= arr[left]
left += 1
```

---

### Corrected C++ Code

```cpp
#include <iostream>
#include <unordered_map>
#include <climits>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    
    int arr[n];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    unordered_map<int, int> freq;
    int left = 0;
    long long windowSum = 0;
    long long maxSum = LLONG_MIN;
    
    for (int right = 0; right < n; right++) {
        freq[arr[right]]++;
        windowSum += arr[right];
        
        while (freq.size() > (size_t)k) {
            freq[arr[left]]--;
            if (freq[arr[left]] == 0) {
                freq.erase(arr[left]);
            }
            windowSum -= arr[left];
            left++;
        }
        
        if (windowSum > maxSum) {
            maxSum = windowSum;
        }
    }
    
    cout << maxSum << endl;
    return 0;
}
```

### Corrected Java Code

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0;
        long windowSum = 0;
        long maxSum = Long.MIN_VALUE;
        
        for (int right = 0; right < n; right++) {
            freq.merge(arr[right], 1, Integer::sum);
            windowSum += arr[right];
            
            while (freq.size() > k) {
                freq.merge(arr[left], -1, Integer::sum);
                if (freq.get(arr[left]) == 0) {
                    freq.remove(arr[left]);
                }
                windowSum -= arr[left];
                left++;
            }
            
            if (windowSum > maxSum) {
                maxSum = windowSum;
            }
        }
        
        System.out.println(maxSum);
    }
}
```

### Corrected Python Code

```python
import sys
from collections import defaultdict

def solve():
    data = sys.stdin.read().split()
    idx = 0
    n = int(data[idx]); idx += 1
    k = int(data[idx]); idx += 1
    
    arr = []
    for i in range(n):
        arr.append(int(data[idx])); idx += 1
    
    freq = defaultdict(int)
    left = 0
    window_sum = 0
    max_sum = float('-inf')
    
    for right in range(n):
        freq[arr[right]] += 1
        window_sum += arr[right]
        
        while len(freq) > k:
            freq[arr[left]] -= 1
            if freq[arr[left]] == 0:
                del freq[arr[left]]
            window_sum -= arr[left]
            left += 1
        
        if window_sum > max_sum:
            max_sum = window_sum
    
    print(max_sum)

solve()
```

---

## Round 2 — Hidden Test Cases

### Hidden Test 1 — Boundary Case

**Input:**

```text
5 2
1 2 3 2 1
```

**Expected Output:**

```text
8
```

**Why it catches the bug:** The window must shrink when encountering the 3rd distinct element (3). The buggy code increments `left` before subtracting, so it subtracts the wrong element. The correct subarray is `[2, 3, 2, 1]` with sum 8.

---

### Hidden Test 2 — Edge Case (k = 1)

**Input:**

```text
6 1
1 1 2 2 1 1
```

**Expected Output:**

```text
2
```

**Why it catches the bug:** With k=1, the window must frequently shrink. Each time the window shrinks, the buggy code subtracts the wrong element (the new left instead of the old left), accumulating errors in the window sum.

---

### Hidden Test 3 — Stress/Adversarial Case

**Input:**

```text
10 2
5 1 5 1 3 3 3 1 5 1
```

**Expected Output:**

```text
12
```

**Why it catches the bug:** Multiple shrink operations occur as the distinct element count fluctuates. The correct subarray with at most 2 distinct elements is `[5, 1, 5, 1]` with sum 12. The accumulation of incorrect subtractions produces a wrong answer.

---

### Complexity

**Before fix:**

- Time: O(n) — produces wrong answers
- Space: O(k)

**After fix:**

- Time: O(n)
- Space: O(k)

---

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
        // BUG: missing adj[v].push_back({u, w}); for undirected graph
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
            // BUG: missing adj.get(v).add(new int[]{u, w}); for undirected graph
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
        # BUG: missing adj[v].append((u, w)) for undirected graph
    
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

## Round 3 — Root Cause & Fix

### Root Cause

The graph is described as **undirected**, but the code only adds each edge in **one direction** in the adjacency list. When reading edge `(u, v, w)`, the code adds `u → v` but NOT `v → u`.

This means Dijkstra from a given node can only traverse edges in the direction they were read from input. Paths that require traversing an edge in the reverse direction are invisible to the algorithm, causing:

- Incorrect shortest distances (longer paths or infinity)
- Reachable nodes appearing unreachable
- Wrong DP results and incorrect final answers

### Why It Happens

```
Input edge: 1 2 5   (undirected: 1↔2)
Buggy code only stores: 1 → 2
Missing: 2 → 1

When Dijkstra runs from node 2, it cannot traverse to node 1.
```

### C++ Fix

**BEFORE:**

```cpp
adj[u].push_back({v, w});
```

**AFTER:**

```cpp
adj[u].push_back({v, w});
adj[v].push_back({u, w});
```

### Java Fix

**BEFORE:**

```java
adj.get(u).add(new int[]{v, w});
```

**AFTER:**

```java
adj.get(u).add(new int[]{v, w});
adj.get(v).add(new int[]{u, w});
```

### Python Fix

**BEFORE:**

```python
adj[u].append((v, w))
```

**AFTER:**

```python
adj[u].append((v, w))
adj[v].append((u, w))
```

---

### Corrected C++ Code

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
        auto [d, u] = pq.top(); pq.pop();
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
        int u, v, w; cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});  // FIXED
    }
    int p; cin >> p;
    vector<int> checkpoints(p);
    for (int i = 0; i < p; i++) cin >> checkpoints[i];

    int totalKeys = p + 2;
    vector<int> keyNodes(totalKeys);
    for (int i = 0; i < p; i++) keyNodes[i] = checkpoints[i];
    keyNodes[p] = s; keyNodes[p+1] = d;

    vector<vector<long long>> dist(totalKeys);
    for (int i = 0; i < totalKeys; i++) dist[i] = dijkstra(keyNodes[i], adj, n);

    int fullMask = (1 << p) - 1;
    vector<vector<long long>> dp(fullMask+1, vector<long long>(totalKeys, INF));
    int srcIdx = p;
    for (int i = 0; i < p; i++)
        if (dist[srcIdx][keyNodes[i]] < INF) dp[1<<i][i] = dist[srcIdx][keyNodes[i]];

    for (int mask = 1; mask <= fullMask; mask++)
        for (int i = 0; i < p; i++) {
            if (!(mask & (1<<i)) || dp[mask][i] >= INF) continue;
            for (int j = 0; j < p; j++) {
                if (mask & (1<<j)) continue;
                int nm = mask | (1<<j);
                if (dist[i][keyNodes[j]] < INF) {
                    long long c = dp[mask][i] + dist[i][keyNodes[j]];
                    if (c < dp[nm][j]) dp[nm][j] = c;
                }
            }
        }

    long long ans = INF;
    int destIdx = p + 1;
    if (p == 0) ans = dist[srcIdx][keyNodes[destIdx]];
    else for (int i = 0; i < p; i++)
        if (dp[fullMask][i] < INF && dist[i][keyNodes[destIdx]] < INF)
            ans = min(ans, dp[fullMask][i] + dist[i][keyNodes[destIdx]]);

    cout << (ans >= INF ? -1 : ans) << endl;
}
```

### Corrected Java Code

```java
import java.util.*;

public class Main {
    static final long INF = (long)1e18;
    static long[] dijkstra(int src, List<List<int[]>> adj, int n) {
        long[] dist = new long[n+1]; Arrays.fill(dist, INF); dist[src] = 0;
        PriorityQueue<long[]> pq = new PriorityQueue<>((a,b)->Long.compare(a[0],b[0]));
        pq.offer(new long[]{0, src});
        while (!pq.isEmpty()) {
            long[] top = pq.poll(); long d = top[0]; int u = (int)top[1];
            if (d > dist[u]) continue;
            for (int[] e : adj.get(u)) { int v=e[0], w=e[1];
                if (dist[u]+w < dist[v]) { dist[v]=dist[u]+w; pq.offer(new long[]{dist[v],v}); }
            }
        }
        return dist;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n=sc.nextInt(), m=sc.nextInt(), s=sc.nextInt(), d=sc.nextInt();
        List<List<int[]>> adj = new ArrayList<>();
        for (int i=0;i<=n;i++) adj.add(new ArrayList<>());
        for (int i=0;i<m;i++) { int u=sc.nextInt(),v=sc.nextInt(),w=sc.nextInt();
            adj.get(u).add(new int[]{v,w}); adj.get(v).add(new int[]{u,w}); // FIXED
        }
        int p = sc.nextInt(); int[] cp = new int[p];
        for (int i=0;i<p;i++) cp[i]=sc.nextInt();
        int tk=p+2; int[] kn=new int[tk];
        for (int i=0;i<p;i++) kn[i]=cp[i]; kn[p]=s; kn[p+1]=d;
        long[][] dist=new long[tk][];
        for (int i=0;i<tk;i++) dist[i]=dijkstra(kn[i],adj,n);
        int fm=(1<<p)-1; long[][] dp=new long[fm+1][tk];
        for (long[] r:dp) Arrays.fill(r,INF);
        for (int i=0;i<p;i++) if(dist[p][kn[i]]<INF) dp[1<<i][i]=dist[p][kn[i]];
        for (int mask=1;mask<=fm;mask++)
            for (int i=0;i<p;i++) { if((mask&(1<<i))==0||dp[mask][i]>=INF) continue;
                for (int j=0;j<p;j++) { if((mask&(1<<j))!=0) continue;
                    int nm=mask|(1<<j);
                    if(dist[i][kn[j]]<INF){long c=dp[mask][i]+dist[i][kn[j]]; if(c<dp[nm][j]) dp[nm][j]=c;}
                }
            }
        long ans=INF; int di=p+1;
        if(p==0) ans=dist[p][kn[di]];
        else for(int i=0;i<p;i++) if(dp[fm][i]<INF&&dist[i][kn[di]]<INF) ans=Math.min(ans,dp[fm][i]+dist[i][kn[di]]);
        System.out.println(ans>=INF?-1:ans);
    }
}
```

### Corrected Python Code

```python
import sys, heapq

def dijkstra(src, adj, n):
    INF = float('inf')
    dist = [INF]*(n+1); dist[src] = 0; pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in adj[u]:
            if dist[u]+w < dist[v]: dist[v] = dist[u]+w; heapq.heappush(pq, (dist[v], v))
    return dist

def solve():
    data = sys.stdin.read().split(); idx = 0
    n=int(data[idx]);idx+=1; m=int(data[idx]);idx+=1; s=int(data[idx]);idx+=1; d=int(data[idx]);idx+=1
    adj=[[] for _ in range(n+1)]
    for _ in range(m):
        u=int(data[idx]);idx+=1; v=int(data[idx]);idx+=1; w=int(data[idx]);idx+=1
        adj[u].append((v,w)); adj[v].append((u,w))  # FIXED
    p=int(data[idx]);idx+=1; cp=[]
    for _ in range(p): cp.append(int(data[idx]));idx+=1
    kn = cp+[s,d]; tk=p+2; INF=float('inf')
    dist=[dijkstra(kn[i],adj,n) for i in range(tk)]
    fm=(1<<p)-1; dp=[[INF]*tk for _ in range(fm+1)]
    for i in range(p):
        if dist[p][kn[i]]<INF: dp[1<<i][i]=dist[p][kn[i]]
    for mask in range(1,fm+1):
        for i in range(p):
            if not(mask&(1<<i)) or dp[mask][i]>=INF: continue
            for j in range(p):
                if mask&(1<<j): continue
                nm=mask|(1<<j)
                if dist[i][kn[j]]<INF:
                    c=dp[mask][i]+dist[i][kn[j]]
                    if c<dp[nm][j]: dp[nm][j]=c
    di=p+1; ans=INF
    if p==0: ans=dist[p][kn[di]]
    else:
        for i in range(p):
            if dp[fm][i]<INF and dist[i][kn[di]]<INF: ans=min(ans,dp[fm][i]+dist[i][kn[di]])
    print(-1 if ans>=INF else int(ans))

solve()
```

---

## Round 3 — Hidden Test Cases

### Hidden Test 1 — Normal Case

**Input:**

```text
4 4 1 4
1 2 2
2 3 3
3 4 1
1 4 100

1
3
```

**Expected Output:**

```text
6
```

**Bug exposed:** Path 1→2→3→4 costs 6. With one-directional edges, Dijkstra from checkpoint 3 cannot reach nodes via reverse edges, producing wrong distances.

---

### Hidden Test 2 — Edge Case (reverse-only traversal needed)

**Input:**

```text
5 4 1 5
2 1 3
3 2 4
4 3 2
5 4 1

1
3
```

**Expected Output:**

```text
10
```

**Bug exposed:** All edges listed with higher node first. Buggy code only adds `2→1`, `3→2`, etc. Node 1 has no outgoing edges — Dijkstra from node 1 reaches nothing. Outputs -1 instead of 10.

---

### Hidden Test 3 — Multiple checkpoints

**Input:**

```text
6 7 1 6
1 3 10
3 2 1
2 4 2
4 5 3
5 6 1
1 2 100
3 6 50

2
2 5
```

**Expected Output:**

```text
17
```

**Bug exposed:** Optimal path 1→3→2→4→5→6 costs 17 visiting checkpoints 2 and 5. With one-directional edges, inter-checkpoint distances are wrong.

---

### Complexity

**Before fix:** O((p+2)(m+n)log n + 2^p·p²) — produces wrong answers

**After fix:** O((p+2)(m+n)log n + 2^p·p²) — produces correct answers

Space: O(n·(p+2) + 2^p·p)

---

# ORGANIZER JUDGE SHEET

## Round 1 — MCQ Scoring

| Set | Language | Questions | Marks per Q | Total |
| --- | -------- | --------: | ----------: | ----: |
| 1   | C++      |         5 |           1 |     5 |
| 1   | Java     |         5 |           1 |     5 |
| 1   | Python   |         5 |           1 |     5 |
| 2   | C++      |         5 |           1 |     5 |
| 2   | Java     |         5 |           1 |     5 |
| 2   | Python   |         5 |           1 |     5 |
| 3   | C++      |         5 |           1 |     5 |
| 3   | Java     |         5 |           1 |     5 |
| 3   | Python   |         5 |           1 |     5 |
| 4   | C++      |         5 |           1 |     5 |
| 4   | Java     |         5 |           1 |     5 |
| 4   | Python   |         5 |           1 |     5 |
| 5   | C++      |         5 |           1 |     5 |
| 5   | Java     |         5 |           1 |     5 |
| 5   | Python   |         5 |           1 |     5 |

**Each set: 15 marks. Each participant attempts ONE set. No negative marking.**

---

## Round 2 & 3 — Debugging Scoring

| Criteria                        | Round 2 (Medium) | Round 3 (Hard) |
| ------------------------------- | ---------------: | -------------: |
| Bug identification (written)    |           10 pts |         15 pts |
| Correct fix applied             |           10 pts |         15 pts |
| Code compiles/runs successfully |            5 pts |          5 pts |
| Hidden test case 1 passed       |            5 pts |         10 pts |
| Hidden test case 2 passed       |            5 pts |         10 pts |
| Hidden test case 3 passed       |            5 pts |         10 pts |
| Explanation quality             |            5 pts |         10 pts |
| Code cleanliness                |            5 pts |          5 pts |
| **Total**                       |       **50 pts** |     **80 pts** |

---

## Tie-breaker

1. **Faster completion time** — the participant who submitted all rounds earlier wins.
2. If still tied: **Higher Round 3 score** takes priority.
3. If still tied: **Higher Round 2 score**.
4. If still tied: **Fewer wrong MCQ attempts** (if tracked).

---

## Overall Scoring Summary

| Round     | Max Score   | Duration |
| --------- | ----------: | -------: |
| Round 1   |      15 pts |   20 min |
| Round 2   |      50 pts |   35 min |
| Round 3   |      80 pts |   35 min |
| **Total** | **145 pts** | **90 min** |

---

## 2-Hour Schedule

| Time          | Activity                                        |
| ------------- | ----------------------------------------------- |
| 0:00 – 0:30  | Registration, seating, system check, rules brief |
| 0:30 – 0:50  | **Round 1** — MCQ (20 min)                       |
| 0:50 – 0:55  | Transition & Round 2 distribution                |
| 0:55 – 1:30  | **Round 2** — Medium Debugging (35 min)          |
| 1:30 – 1:35  | Transition & Round 3 distribution                |
| 1:35 – 2:10  | **Round 3** — Hard Debugging (35 min)            |
| 2:10 – 2:15  | Buffer / submission collection                   |

---

## Final Answer Keys


### Round 1 — All Sets Combined

| Set | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 |
| --- | -- | -- | -- | -- | -- | -- | -- | -- | -- | --- | --- | --- | --- | --- | --- |
| 1   | B  | C  | B  | B  | A  | B  | C  | B  | B  | B   | A   | C   | B   | C   | B   |
| 2   | B  | A  | B  | B  | A  | B  | B  | B  | B  | B   | B   | A   | B   | B   | B   |
| 3   | B  | B  | A  | A  | A  | B  | B  | A  | A  | C   | B   | A   | B   | A   | B   |
| 4   | B  | A  | B  | A  | A  | B  | C  | A  | A  | B   | B   | B   | C   | B   | B   |
| 5   | A  | B  | B  | A  | B  | A  | B  | A  | B  | C   | B   | B   | C   | A   | B   |

### Round 2 — Bug Summary

**Bug:** `left++` happens before `windowSum -= arr[left]` in the sliding window shrink loop.
**Fix:** Swap the two lines — subtract first, then increment.

### Round 3 — Bug Summary

**Bug:** Undirected graph edges only added in one direction in the adjacency list.
**Fix:** Add `adj[v].push_back({u, w})` (or language equivalent) after `adj[u].push_back({v, w})`.
