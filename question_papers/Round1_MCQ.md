# DEBUGGING COMPETITION — QUESTION PAPER

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

## Instructions to Candidates

1. **Duration:** 2 Hours (120 minutes) total.
2. **Structure:**
   - **Round 1 (20 min):** Multiple-choice questions testing code comprehension, language semantics, operator precedence, scope, and pointer/reference behavior in C++, Java, and Python.
   - **Round 2 (35 min):** Medium-level debugging challenge. Locate and fix the logic flaw in the algorithm so all sample and hidden test cases pass.
   - **Round 3 (35 min):** Hard-level debugging challenge. Debug an advanced algorithmic program involving state tracking and shortest paths.
3. **Languages Supported:** C++, Java, Python. Choose your preferred language for the debugging rounds.
4. **General Guidelines:**
   - For Multiple Choice Questions, mark only ONE option (A, B, C, or D).
   - For Debugging questions, retain the core algorithmic approach and modify only the flawed logic. Do not rewrite from scratch unless necessary.
   - Pay close attention to constraints, edge cases, and 0/1-indexing.

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

---

#### Q14. What is the output?

```python
print(list(range(1, 5)))
```

A. [1, 2, 3, 4, 5]  
B. [1, 2, 3, 4]  
C. [0, 1, 2, 3, 4]  
D. [1, 5]  

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

---

#### Q15. What is the output?

```python
print(bool([]), bool([0]))
```

A. False False  
B. False True  
C. True False  
D. True True  

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

---

#### Q14. What is the output?

```python
print(2 ** 4)
```

A. 8  
B. 16  
C. 6  
D. 24  

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

---
