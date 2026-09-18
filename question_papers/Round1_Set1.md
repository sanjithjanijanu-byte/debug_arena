# Round 1 — MCQ Qualification Round (Set 1)

**Instructions:**
- Time: 30 Minutes
- Total Questions: 20 Questions
- Marking: +10 Points for each correct answer. No negative marking.
- Answer all questions for your chosen programming language.

---

## Section: C++

### Q1. Integer Division in C++

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 7, b = 2;
    cout << a / b << endl;
    return 0;
}
```

**Options:**
- **(A)** 3.5
- **(B)** 3
- **(C)** 4
- **(D)** 3.0

---

### Q2. Post-Increment Operator

What is the output of the following C++ code?

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

**Options:**
- **(A)** 5 5
- **(B)** 6 6
- **(C)** 6 5
- **(D)** 5 6

---

### Q3. Pass-by-Value in C++

What is the output of the following C++ code?

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

**Options:**
- **(A)** 30
- **(B)** 20
- **(C)** 10
- **(D)** Compilation error

---

### Q4. Array Indexing in C++

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    cout << arr[3] << endl;
    return 0;
}
```

**Options:**
- **(A)** 30
- **(B)** 40
- **(C)** 50
- **(D)** 20

---

### Q5. String Length and Character Access

What is the output of the following C++ code?

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

**Options:**
- **(A)** 5 e
- **(B)** 5 H
- **(C)** 4 e
- **(D)** 5 l

---

### Q6. Modulo Operator

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 14, b = 4;
    cout << a % b << endl;
    return 0;
}
```

**Options:**
- **(A)** 3
- **(B)** 2
- **(C)** 0
- **(D)** 3.5

---

### Q7. For Loop Accumulator

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += i;
    }
    cout << sum << endl;
    return 0;
}
```

**Options:**
- **(A)** 10
- **(B)** 15
- **(C)** 5
- **(D)** 0

---

### Q8. Ternary Conditional Operator

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int result = (x > 15) ? 100 : 200;
    cout << result << endl;
    return 0;
}
```

**Options:**
- **(A)** 100
- **(B)** 200
- **(C)** 0
- **(D)** 15

---

### Q9. Boolean Logic Operators

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 5, b = -2;
    cout << (a > 0 && b > 0) << " " << (a > 0 || b > 0) << endl;
    return 0;
}
```

**Options:**
- **(A)** 1 1
- **(B)** 0 1
- **(C)** 1 0
- **(D)** 0 0

---

### Q10. Vector push_back and size

What is the output of the following C++ code?

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

**Options:**
- **(A)** 2 100
- **(B)** 2 200
- **(C)** 1 100
- **(D)** 0 100

---

### Q11. Reference Variables

What is the output of the following C++ code?

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

**Options:**
- **(A)** 10 25
- **(B)** 25 25
- **(C)** 10 10
- **(D)** Compilation error

---

### Q12. Nested Ternary Operator

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 5;
    cout << (a > 3 ? (a < 10 ? 1 : 2) : 3) << endl;
    return 0;
}
```

**Options:**
- **(A)** 1
- **(B)** 2
- **(C)** 3
- **(D)** 0

---

### Q13. Switch Statement Fall-Through

What is the output of the following C++ code?

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

**Options:**
- **(A)** Two
- **(B)** Two Three
- **(C)** Two Three Default
- **(D)** One Two Three

---

### Q14. Pointer Dereferencing

What is the output of the following C++ code?

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

**Options:**
- **(A)** 42
- **(B)** 50
- **(C)** Garbage value
- **(D)** Memory address

---

### Q15. Static Local Variable

What is the output of the following C++ code?

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

**Options:**
- **(A)** 1 1 1
- **(B)** 1 2 3
- **(C)** 0 1 2
- **(D)** Compilation error

---

### Q16. Short-Circuit Logical AND

What is the output of the following C++ code?

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

**Options:**
- **(A)** Inside 6
- **(B)** 5
- **(C)** 6
- **(D)** Inside 5

---

### Q17. Vector push_back and pop_back

What is the output of the following C++ code?

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

**Options:**
- **(A)** 2 20
- **(B)** 3 30
- **(C)** 2 30
- **(D)** 3 20

---

### Q18. Array Size using sizeof

What is the output of the following C++ code?

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

**Options:**
- **(A)** 24
- **(B)** 6
- **(C)** 4
- **(D)** Compilation error

---

### Q19. Do-While Loop Execution Guarantee

What is the output of the following C++ code?

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

**Options:**
- **(A)** 10
- **(B)** 15
- **(C)** 20
- **(D)** Infinite loop

---

### Q20. String Search with string::find

What is the output of the following C++ code?

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

**Options:**
- **(A)** Found at 3
- **(B)** Found at 4
- **(C)** Not found
- **(D)** Found at 2

---

## Section: Java

### Q1. String Concatenation Precedence

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Sum: " + 10 + 20);
    }
}
```

**Options:**
- **(A)** Sum: 30
- **(B)** Sum: 1020
- **(C)** Sum: 10 20
- **(D)** Compilation error

---

### Q2. String equals() vs == Operator

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = new String("hello");
        System.out.println(s1.equals(s2) + " " + (s1 == s2));
    }
}
```

**Options:**
- **(A)** true true
- **(B)** false false
- **(C)** true false
- **(D)** false true

---

### Q3. Array length Property

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        System.out.println(nums.length);
    }
}
```

**Options:**
- **(A)** 4
- **(B)** 5
- **(C)** Compilation error
- **(D)** 6

---

### Q4. Pass-by-Value with Primitive Arguments

What is the output of the following Java program?

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

**Options:**
- **(A)** 100
- **(B)** 25
- **(C)** 0
- **(D)** Compilation error

---

### Q5. While Loop Counter

What is the output of the following Java program?

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

**Options:**
- **(A)** 3
- **(B)** 4
- **(C)** 5
- **(D)** 1

---

### Q6. Integer Division Truncation

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        int result = 15 / 4;
        System.out.println(result);
    }
}
```

**Options:**
- **(A)** 3.75
- **(B)** 3
- **(C)** 4
- **(D)** 3.0

---

### Q7. String Immutability

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        String s = "Hello";
        s.concat(" World");
        System.out.println(s);
    }
}
```

**Options:**
- **(A)** Hello World
- **(B)** Hello
- **(C)** World
- **(D)** Compilation error

---

### Q8. Loop Break Statement

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                System.out.println(i);
                break;
            }
        }
    }
}
```

**Options:**
- **(A)** 1
- **(B)** 3
- **(C)** 5
- **(D)** 1 2 3

---

### Q9. Math.max() Method

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        int a = 25, b = 40;
        System.out.println(Math.max(a, b));
    }
}
```

**Options:**
- **(A)** 25
- **(B)** 40
- **(C)** 65
- **(D)** 15

---

### Q10. Default Boolean Field Value

What is the output of the following Java program?

```java
public class Main {
    static boolean flag;

    public static void main(String[] args) {
        System.out.println(flag);
    }
}
```

**Options:**
- **(A)** true
- **(B)** false
- **(C)** null
- **(D)** 0

---

### Q11. Unary Operators Precedence

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(++x + x++);
    }
}
```

**Options:**
- **(A)** 11
- **(B)** 12
- **(C)** 13
- **(D)** 10

---

### Q12. Substring Indexing

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        String str = "Debugging";
        System.out.println(str.substring(3, 7));
    }
}
```

**Options:**
- **(A)** bugg
- **(B)** uggi
- **(C)** buggi
- **(D)** eggi

---

### Q13. Boolean Assignment in Conditionals

What is the output of the following Java program?

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

**Options:**
- **(A)** Yes
- **(B)** No
- **(C)** Compilation error
- **(D)** Runtime error

---

### Q14. String charAt and Length

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        String s = "Algorithm";
        System.out.println(s.charAt(0) + "" + s.charAt(s.length() - 1));
    }
}
```

**Options:**
- **(A)** Am
- **(B)** Ah
- **(C)** Algorithm
- **(D)** Compilation error

---

### Q15. Enhanced For Loop Accumulator

What is the output of the following Java program?

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

**Options:**
- **(A)** 12
- **(B)** 6
- **(C)** 0
- **(D)** Compilation error

---

### Q16. Math.max and Math.min Nesting

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        int a = 15, b = 25, c = 10;
        int result = Math.max(a, Math.min(b, c));
        System.out.println(result);
    }
}
```

**Options:**
- **(A)** 25
- **(B)** 15
- **(C)** 10
- **(D)** 20

---

### Q17. ArrayList Remove by Index

What is the output of the following Java program?

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

**Options:**
- **(A)** [20, 30]
- **(B)** [10, 30]
- **(C)** [10, 20]
- **(D)** [10]

---

### Q18. Ternary Operator Evaluation

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        int a = 10, b = 20;
        int max = (a > b) ? a : b;
        System.out.println(max * 2);
    }
}
```

**Options:**
- **(A)** 20
- **(B)** 40
- **(C)** 10
- **(D)** 30

---

### Q19. StringBuilder Append & Length

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("code");
        sb.append("123");
        System.out.println(sb.length() + " " + sb.charAt(0));
    }
}
```

**Options:**
- **(A)** 7 c
- **(B)** 4 c
- **(C)** 7 1
- **(D)** 6 c

---

### Q20. Static Initialization Block

What is the output of the following Java program?

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

**Options:**
- **(A)** 10
- **(B)** 15
- **(C)** 5
- **(D)** Compilation error

---

## Section: Python

### Q1. Integer Floor Division vs Float Division

What is the output of the following Python code?

```python
print(9 // 2, 9 / 2)
```

**Options:**
- **(A)** 4 4.5
- **(B)** 4.5 4
- **(C)** 4 4
- **(D)** 4.5 4.5

---

### Q2. String Multiplication Operator

What is the output of the following Python code?

```python
text = "Go!"
print(text * 3)
```

**Options:**
- **(A)** Go! Go! Go!
- **(B)** Go!3
- **(C)** Go!Go!Go!
- **(D)** Error

---

### Q3. List Slicing Indices

What is the output of the following Python code?

```python
nums = [10, 20, 30, 40]
print(nums[1:3])
```

**Options:**
- **(A)** [10, 20]
- **(B)** [20, 30]
- **(C)** [20, 30, 40]
- **(D)** [10, 20, 30]

---

### Q4. Negative Indexing in Lists

What is the output of the following Python code?

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[-1])
```

**Options:**
- **(A)** apple
- **(B)** banana
- **(C)** cherry
- **(D)** IndexError

---

### Q5. Dictionary get() Default Value

What is the output of the following Python code?

```python
scores = {"Alice": 90, "Bob": 85}
print(scores.get("Charlie", 0))
```

**Options:**
- **(A)** None
- **(B)** 0
- **(C)** KeyError
- **(D)** 85

---

### Q6. List Length with len()

What is the output of the following Python code?

```python
items = [1, 2, 3, 4, 5]
print(len(items))
```

**Options:**
- **(A)** 4
- **(B)** 5
- **(C)** 6
- **(D)** 0

---

### Q7. String lower() Method

What is the output of the following Python code?

```python
msg = "HELLO"
print(msg.lower())
```

**Options:**
- **(A)** hello
- **(B)** HELLO
- **(C)** Hello
- **(D)** Error

---

### Q8. List append() Modification

What is the output of the following Python code?

```python
nums = [1, 2, 3]
nums.append(4)
print(nums)
```

**Options:**
- **(A)** [4, 1, 2, 3]
- **(B)** [1, 2, 3, 4]
- **(C)** [1, 2, 3]
- **(D)** None

---

### Q9. Range Function Sequence

What is the output of the following Python code?

```python
print(list(range(1, 5)))
```

**Options:**
- **(A)** [1, 2, 3, 4, 5]
- **(B)** [1, 2, 3, 4]
- **(C)** [0, 1, 2, 3, 4]
- **(D)** [1, 5]

---

### Q10. Tuple Packing and Unpacking

What is the output of the following Python code?

```python
x = 10
y = 20
x, y = y, x
print(x, y)
```

**Options:**
- **(A)** 10 20
- **(B)** 20 10
- **(C)** 20 20
- **(D)** 10 10

---

### Q11. List Slicing Range

What is the output of the following Python code?

```python
nums = [1, 2, 3, 4, 5]
print(nums[1:4])
```

**Options:**
- **(A)** [1, 2, 3]
- **(B)** [2, 3, 4]
- **(C)** [2, 3, 4, 5]
- **(D)** [1, 2, 3, 4]

---

### Q12. Default Function Parameters

What is the output of the following Python code?

```python
def greet(name, msg="Hello"):
    return f"{msg}, {name}!"

print(greet("Bob"))
```

**Options:**
- **(A)** Hello, Bob!
- **(B)** Bob, Hello!
- **(C)** Error
- **(D)** None

---

### Q13. List Reference Assignment

What is the output of the following Python code?

```python
x = [1, 2, 3]
y = x
y.append(4)
print(len(x))
```

**Options:**
- **(A)** 3
- **(B)** 4
- **(C)** 1
- **(D)** AttributeError

---

### Q14. List Comprehension with Filter

What is the output of the following Python code?

```python
vals = [x * 2 for x in range(4) if x % 2 == 0]
print(vals)
```

**Options:**
- **(A)** [0, 4]
- **(B)** [0, 2, 4]
- **(C)** [0, 4, 8]
- **(D)** [2, 4]

---

### Q15. List Comprehension with Strings

What is the output of the following Python code?

```python
words = ["cat", "elephant", "dog"]
short = [w.upper() for w in words if len(w) <= 3]
print(short)
```

**Options:**
- **(A)** ['CAT', 'ELEPHANT', 'DOG']
- **(B)** ['CAT', 'DOG']
- **(C)** ['cat', 'dog']
- **(D)** ['ELEPHANT']

---

### Q16. Dictionary Key Membership

What is the output of the following Python code?

```python
data = {"a": 1, "b": 2}
print("a" in data, 1 in data)
```

**Options:**
- **(A)** True True
- **(B)** True False
- **(C)** False True
- **(D)** False False

---

### Q17. String Split and Join

What is the output of the following Python code?

```python
text = "apple-banana-orange"
parts = text.split("-")
print("/".join(parts[:2]))
```

**Options:**
- **(A)** apple/banana/orange
- **(B)** apple/banana
- **(C)** apple-banana
- **(D)** banana/orange

---

### Q18. List pop() Return Value

What is the output of the following Python code?

```python
nums = [10, 20, 30]
val = nums.pop()
print(val, nums)
```

**Options:**
- **(A)** 10 [20, 30]
- **(B)** 30 [10, 20]
- **(C)** 30 [10, 20, 30]
- **(D)** 20 [10, 30]

---

### Q19. Float Truncation with int()

What is the output of the following Python code?

```python
val = int(8.75)
print(val)
```

**Options:**
- **(A)** 8
- **(B)** 9
- **(C)** 8.0
- **(D)** ValueError

---

### Q20. Truthiness of Empty List vs List with Zero

What is the output of the following Python code?

```python
print(bool([]), bool([0]))
```

**Options:**
- **(A)** False False
- **(B)** False True
- **(C)** True False
- **(D)** True True

---

