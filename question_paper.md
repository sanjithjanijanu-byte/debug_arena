# DEBUG ARENA — Official Student Question Paper

Welcome to **Debug Arena**. This paper contains all competition problem sets across all 3 rounds:
- **Round 1 (MCQ Qualification):** 5 Sets (20 Questions each for C++, Java, Python)
- **Round 2 (Medium Debugging):** 7 Sets (1 Problem each with C++, Java, Python templates)
- **Round 3 (Hard Debugging):** 7 Sets (1 Problem each with C++, Java, Python templates)

> *Refer to your assigned Set Number given by the coordinator or system.*

---

## Round 1 — Set 1

*(See individual set file: `question_papers/Round1_Set1.md` for standalone printing)*

### Set 1 — C++

**Q1. Integer Division in C++**

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

- **(A)** 3.5
- **(B)** 3
- **(C)** 4
- **(D)** 3.0

**Q2. Post-Increment Operator**

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

- **(A)** 5 5
- **(B)** 6 6
- **(C)** 6 5
- **(D)** 5 6

**Q3. Pass-by-Value in C++**

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

- **(A)** 30
- **(B)** 20
- **(C)** 10
- **(D)** Compilation error

**Q4. Array Indexing in C++**

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

- **(A)** 30
- **(B)** 40
- **(C)** 50
- **(D)** 20

**Q5. String Length and Character Access**

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

- **(A)** 5 e
- **(B)** 5 H
- **(C)** 4 e
- **(D)** 5 l

**Q6. Modulo Operator**

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

- **(A)** 3
- **(B)** 2
- **(C)** 0
- **(D)** 3.5

**Q7. For Loop Accumulator**

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

- **(A)** 10
- **(B)** 15
- **(C)** 5
- **(D)** 0

**Q8. Ternary Conditional Operator**

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

- **(A)** 100
- **(B)** 200
- **(C)** 0
- **(D)** 15

**Q9. Boolean Logic Operators**

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

- **(A)** 1 1
- **(B)** 0 1
- **(C)** 1 0
- **(D)** 0 0

**Q10. Vector push_back and size**

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

- **(A)** 2 100
- **(B)** 2 200
- **(C)** 1 100
- **(D)** 0 100

**Q11. Reference Variables**

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

- **(A)** 10 25
- **(B)** 25 25
- **(C)** 10 10
- **(D)** Compilation error

**Q12. Nested Ternary Operator**

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

- **(A)** 1
- **(B)** 2
- **(C)** 3
- **(D)** 0

**Q13. Switch Statement Fall-Through**

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

- **(A)** Two
- **(B)** Two Three
- **(C)** Two Three Default
- **(D)** One Two Three

**Q14. Pointer Dereferencing**

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

- **(A)** 42
- **(B)** 50
- **(C)** Garbage value
- **(D)** Memory address

**Q15. Static Local Variable**

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

- **(A)** 1 1 1
- **(B)** 1 2 3
- **(C)** 0 1 2
- **(D)** Compilation error

**Q16. Short-Circuit Logical AND**

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

- **(A)** Inside 6
- **(B)** 5
- **(C)** 6
- **(D)** Inside 5

**Q17. Vector push_back and pop_back**

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

- **(A)** 2 20
- **(B)** 3 30
- **(C)** 2 30
- **(D)** 3 20

**Q18. Array Size using sizeof**

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

- **(A)** 24
- **(B)** 6
- **(C)** 4
- **(D)** Compilation error

**Q19. Do-While Loop Execution Guarantee**

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

- **(A)** 10
- **(B)** 15
- **(C)** 20
- **(D)** Infinite loop

**Q20. String Search with string::find**

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

- **(A)** Found at 3
- **(B)** Found at 4
- **(C)** Not found
- **(D)** Found at 2

### Set 1 — Java

**Q1. String Concatenation Precedence**

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Sum: " + 10 + 20);
    }
}
```

- **(A)** Sum: 30
- **(B)** Sum: 1020
- **(C)** Sum: 10 20
- **(D)** Compilation error

**Q2. String equals() vs == Operator**

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

- **(A)** true true
- **(B)** false false
- **(C)** true false
- **(D)** false true

**Q3. Array length Property**

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        System.out.println(nums.length);
    }
}
```

- **(A)** 4
- **(B)** 5
- **(C)** Compilation error
- **(D)** 6

**Q4. Pass-by-Value with Primitive Arguments**

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

- **(A)** 100
- **(B)** 25
- **(C)** 0
- **(D)** Compilation error

**Q5. While Loop Counter**

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

- **(A)** 3
- **(B)** 4
- **(C)** 5
- **(D)** 1

**Q6. Integer Division Truncation**

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        int result = 15 / 4;
        System.out.println(result);
    }
}
```

- **(A)** 3.75
- **(B)** 3
- **(C)** 4
- **(D)** 3.0

**Q7. String Immutability**

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

- **(A)** Hello World
- **(B)** Hello
- **(C)** World
- **(D)** Compilation error

**Q8. Loop Break Statement**

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

- **(A)** 1
- **(B)** 3
- **(C)** 5
- **(D)** 1 2 3

**Q9. Math.max() Method**

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        int a = 25, b = 40;
        System.out.println(Math.max(a, b));
    }
}
```

- **(A)** 25
- **(B)** 40
- **(C)** 65
- **(D)** 15

**Q10. Default Boolean Field Value**

What is the output of the following Java program?

```java
public class Main {
    static boolean flag;

    public static void main(String[] args) {
        System.out.println(flag);
    }
}
```

- **(A)** true
- **(B)** false
- **(C)** null
- **(D)** 0

**Q11. Unary Operators Precedence**

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(++x + x++);
    }
}
```

- **(A)** 11
- **(B)** 12
- **(C)** 13
- **(D)** 10

**Q12. Substring Indexing**

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        String str = "Debugging";
        System.out.println(str.substring(3, 7));
    }
}
```

- **(A)** bugg
- **(B)** uggi
- **(C)** buggi
- **(D)** eggi

**Q13. Boolean Assignment in Conditionals**

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

- **(A)** Yes
- **(B)** No
- **(C)** Compilation error
- **(D)** Runtime error

**Q14. String charAt and Length**

What is the output of the following Java program?

```java
public class Main {
    public static void main(String[] args) {
        String s = "Algorithm";
        System.out.println(s.charAt(0) + "" + s.charAt(s.length() - 1));
    }
}
```

- **(A)** Am
- **(B)** Ah
- **(C)** Algorithm
- **(D)** Compilation error

**Q15. Enhanced For Loop Accumulator**

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

- **(A)** 12
- **(B)** 6
- **(C)** 0
- **(D)** Compilation error

**Q16. Math.max and Math.min Nesting**

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

- **(A)** 25
- **(B)** 15
- **(C)** 10
- **(D)** 20

**Q17. ArrayList Remove by Index**

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

- **(A)** [20, 30]
- **(B)** [10, 30]
- **(C)** [10, 20]
- **(D)** [10]

**Q18. Ternary Operator Evaluation**

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

- **(A)** 20
- **(B)** 40
- **(C)** 10
- **(D)** 30

**Q19. StringBuilder Append & Length**

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

- **(A)** 7 c
- **(B)** 4 c
- **(C)** 7 1
- **(D)** 6 c

**Q20. Static Initialization Block**

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

- **(A)** 10
- **(B)** 15
- **(C)** 5
- **(D)** Compilation error

### Set 1 — Python

**Q1. Integer Floor Division vs Float Division**

What is the output of the following Python code?

```python
print(9 // 2, 9 / 2)
```

- **(A)** 4 4.5
- **(B)** 4.5 4
- **(C)** 4 4
- **(D)** 4.5 4.5

**Q2. String Multiplication Operator**

What is the output of the following Python code?

```python
text = "Go!"
print(text * 3)
```

- **(A)** Go! Go! Go!
- **(B)** Go!3
- **(C)** Go!Go!Go!
- **(D)** Error

**Q3. List Slicing Indices**

What is the output of the following Python code?

```python
nums = [10, 20, 30, 40]
print(nums[1:3])
```

- **(A)** [10, 20]
- **(B)** [20, 30]
- **(C)** [20, 30, 40]
- **(D)** [10, 20, 30]

**Q4. Negative Indexing in Lists**

What is the output of the following Python code?

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[-1])
```

- **(A)** apple
- **(B)** banana
- **(C)** cherry
- **(D)** IndexError

**Q5. Dictionary get() Default Value**

What is the output of the following Python code?

```python
scores = {"Alice": 90, "Bob": 85}
print(scores.get("Charlie", 0))
```

- **(A)** None
- **(B)** 0
- **(C)** KeyError
- **(D)** 85

**Q6. List Length with len()**

What is the output of the following Python code?

```python
items = [1, 2, 3, 4, 5]
print(len(items))
```

- **(A)** 4
- **(B)** 5
- **(C)** 6
- **(D)** 0

**Q7. String lower() Method**

What is the output of the following Python code?

```python
msg = "HELLO"
print(msg.lower())
```

- **(A)** hello
- **(B)** HELLO
- **(C)** Hello
- **(D)** Error

**Q8. List append() Modification**

What is the output of the following Python code?

```python
nums = [1, 2, 3]
nums.append(4)
print(nums)
```

- **(A)** [4, 1, 2, 3]
- **(B)** [1, 2, 3, 4]
- **(C)** [1, 2, 3]
- **(D)** None

**Q9. Range Function Sequence**

What is the output of the following Python code?

```python
print(list(range(1, 5)))
```

- **(A)** [1, 2, 3, 4, 5]
- **(B)** [1, 2, 3, 4]
- **(C)** [0, 1, 2, 3, 4]
- **(D)** [1, 5]

**Q10. Tuple Packing and Unpacking**

What is the output of the following Python code?

```python
x = 10
y = 20
x, y = y, x
print(x, y)
```

- **(A)** 10 20
- **(B)** 20 10
- **(C)** 20 20
- **(D)** 10 10

**Q11. List Slicing Range**

What is the output of the following Python code?

```python
nums = [1, 2, 3, 4, 5]
print(nums[1:4])
```

- **(A)** [1, 2, 3]
- **(B)** [2, 3, 4]
- **(C)** [2, 3, 4, 5]
- **(D)** [1, 2, 3, 4]

**Q12. Default Function Parameters**

What is the output of the following Python code?

```python
def greet(name, msg="Hello"):
    return f"{msg}, {name}!"

print(greet("Bob"))
```

- **(A)** Hello, Bob!
- **(B)** Bob, Hello!
- **(C)** Error
- **(D)** None

**Q13. List Reference Assignment**

What is the output of the following Python code?

```python
x = [1, 2, 3]
y = x
y.append(4)
print(len(x))
```

- **(A)** 3
- **(B)** 4
- **(C)** 1
- **(D)** AttributeError

**Q14. List Comprehension with Filter**

What is the output of the following Python code?

```python
vals = [x * 2 for x in range(4) if x % 2 == 0]
print(vals)
```

- **(A)** [0, 4]
- **(B)** [0, 2, 4]
- **(C)** [0, 4, 8]
- **(D)** [2, 4]

**Q15. List Comprehension with Strings**

What is the output of the following Python code?

```python
words = ["cat", "elephant", "dog"]
short = [w.upper() for w in words if len(w) <= 3]
print(short)
```

- **(A)** ['CAT', 'ELEPHANT', 'DOG']
- **(B)** ['CAT', 'DOG']
- **(C)** ['cat', 'dog']
- **(D)** ['ELEPHANT']

**Q16. Dictionary Key Membership**

What is the output of the following Python code?

```python
data = {"a": 1, "b": 2}
print("a" in data, 1 in data)
```

- **(A)** True True
- **(B)** True False
- **(C)** False True
- **(D)** False False

**Q17. String Split and Join**

What is the output of the following Python code?

```python
text = "apple-banana-orange"
parts = text.split("-")
print("/".join(parts[:2]))
```

- **(A)** apple/banana/orange
- **(B)** apple/banana
- **(C)** apple-banana
- **(D)** banana/orange

**Q18. List pop() Return Value**

What is the output of the following Python code?

```python
nums = [10, 20, 30]
val = nums.pop()
print(val, nums)
```

- **(A)** 10 [20, 30]
- **(B)** 30 [10, 20]
- **(C)** 30 [10, 20, 30]
- **(D)** 20 [10, 30]

**Q19. Float Truncation with int()**

What is the output of the following Python code?

```python
val = int(8.75)
print(val)
```

- **(A)** 8
- **(B)** 9
- **(C)** 8.0
- **(D)** ValueError

**Q20. Truthiness of Empty List vs List with Zero**

What is the output of the following Python code?

```python
print(bool([]), bool([0]))
```

- **(A)** False False
- **(B)** False True
- **(C)** True False
- **(D)** True True

---

## Round 1 — Set 2

*(See individual set file: `question_papers/Round1_Set2.md` for standalone printing)*

### Set 2 — C++

**Q1. Bitwise XOR Identity**

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;
int main() {
    int a = 12, b = 25;
    cout << (a ^ b ^ a) << endl;
    return 0;
}
```

- **(A)** 12
- **(B)** 25
- **(C)** 0
- **(D)** 37

**Q2. Size of Pointer vs Array**

What does the following C++ code print on a 64-bit architecture?

```cpp
#include <iostream>
using namespace std;
void printSize(int arr[]) {
    cout << sizeof(arr) << " ";
}
int main() {
    int arr[10];
    printSize(arr);
    cout << sizeof(arr) << endl;
    return 0;
}
```

- **(A)** 40 40
- **(B)** 8 40
- **(C)** 4 40
- **(D)** 8 8

**Q3. Pre vs Post Decrement**

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;
int main() {
    int i = 5;
    int j = --i + i--;
    cout << i << " " << j << endl;
    return 0;
}
```

- **(A)** 3 8
- **(B)** 3 7
- **(C)** 4 8
- **(D)** 4 7

**Q4. Static Local Variable**

What does this code print?

```cpp
#include <iostream>
using namespace std;
void counter() {
    static int count = 10;
    count += 5;
    cout << count << " ";
}
int main() {
    counter();
    counter();
    return 0;
}
```

- **(A)** 15 15
- **(B)** 15 20
- **(C)** 10 15
- **(D)** 20 25

**Q5. String Concatenation with Literals**

What happens when compiling and running this C++ code?

```cpp
#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "Hello" + ", " + "World!";
    cout << s << endl;
    return 0;
}
```

- **(A)** Prints Hello, World!
- **(B)** Compilation Error: cannot add two string literals
- **(C)** Prints Hello
- **(D)** Undefined behavior

**Q6. Short-Circuit Logical AND**

What is the value of y after execution?

```cpp
#include <iostream>
using namespace std;
int main() {
    int x = 0, y = 10;
    if (x != 0 && ++y > 10) {
        y += 2;
    }
    cout << y << endl;
    return 0;
}
```

- **(A)** 10
- **(B)** 11
- **(C)** 12
- **(D)** 13

**Q7. Const Reference Binding**

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;
int main() {
    int a = 10;
    const int& ref = a;
    a = 20;
    cout << ref << endl;
    return 0;
}
```

- **(A)** 10
- **(B)** 20
- **(C)** Compilation error
- **(D)** Undefined behavior

**Q8. Default Vector Initialization**

What is the size and contents of vector v?

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v(4, 7);
    cout << v.size() << " " << v[2] << endl;
    return 0;
}
```

- **(A)** 4 7
- **(B)** 7 4
- **(C)** 4 0
- **(D)** 2 7

**Q9. Ternary Operator Associativity**

What is the output of this C++ program?

```cpp
#include <iostream>
using namespace std;
int main() {
    int a = 1, b = 2, c = 3;
    int res = a ? b : c ? 10 : 20;
    cout << res << endl;
    return 0;
}
```

- **(A)** 2
- **(B)** 3
- **(C)** 10
- **(D)** 20

**Q10. Reference vs Pointer Reassignment**

What does this C++ snippet print?

```cpp
#include <iostream>
using namespace std;
int main() {
    int x = 5, y = 15;
    int& ref = x;
    ref = y;
    ref = 25;
    cout << x << " " << y << endl;
    return 0;
}
```

- **(A)** 5 25
- **(B)** 25 15
- **(C)** 25 25
- **(D)** 15 25

**Q11. Integer Overflow in C++**

What is the behavior of signed integer overflow according to C++ standard?

```cpp
int a = 2147483647; a = a + 1;
```

- **(A)** Wraps to -2147483648 reliably
- **(B)** Throws an OverflowException
- **(C)** Undefined Behavior
- **(D)** Compile-time error

**Q12. Virtual Destructor Necessity**

Why should a base class have a virtual destructor in C++?

```cpp
class Base { public: virtual ~Base() {} };
```

- **(A)** To allow pure virtual methods
- **(B)** To ensure derived class destructors are called when deleting via base pointer
- **(C)** To prevent instantiation of the base class
- **(D)** To automatically delete pointers in derived classes

**Q13. Vector push_back vs emplace_back**

What is the primary advantage of emplace_back over push_back?

```cpp
vector<pair<int, int>> v; v.emplace_back(1, 2);
```

- **(A)** emplace_back always allocates half the memory
- **(B)** emplace_back constructs elements in-place avoiding redundant copies/moves
- **(C)** push_back does not work with custom objects
- **(D)** emplace_back is thread-safe while push_back is not

**Q14. Lambda Capture by Reference**

What is the output of the following lambda snippet?

```cpp
#include <iostream>
using namespace std;
int main() {
    int x = 10;
    auto f = [&x]() { x += 5; };
    f();
    cout << x << endl;
    return 0;
}
```

- **(A)** 10
- **(B)** 15
- **(C)** 5
- **(D)** Compilation error

**Q15. Do-While Loop Condition**

How many times does this loop execute?

```cpp
#include <iostream>
using namespace std;
int main() {
    int i = 5;
    do {
        i += 2;
    } while (i < 5);
    cout << i << endl;
    return 0;
}
```

- **(A)** 0 times, prints 5
- **(B)** 1 time, prints 7
- **(C)** Infinite loop
- **(D)** 2 times, prints 9

**Q16. Structured Binding (C++17)**

What does this C++17 code print?

```cpp
#include <iostream>
#include <tuple>
using namespace std;
int main() {
    pair<int, string> p = {42, "Answer"};
    auto [num, text] = p;
    cout << text << ": " << num << endl;
    return 0;
}
```

- **(A)** 42: Answer
- **(B)** Answer: 42
- **(C)** Compilation error
- **(D)** p: 42 Answer

**Q17. String find Return on Failure**

What does std::string::find return when the substring is not found?

```cpp
#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "coding";
    if (s.find("xyz") == string::npos) cout << "Not found" << endl;
    return 0;
}
```

- **(A)** -1
- **(B)** string::npos
- **(C)** 0
- **(D)** NULL

**Q18. Unordered Map Operator[] Insertion**

What happens when accessing a non-existent key using operator[] on std::unordered_map?

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    unordered_map<string, int> m;
    cout << m["count"] << " " << m.size() << endl;
    return 0;
}
```

- **(A)** Throws out_of_range exception
- **(B)** Prints 0 1
- **(C)** Prints 0 0
- **(D)** Compilation error

**Q19. Recursive Base Case Off-by-One**

What is the return value of mystery(3)?

```cpp
int mystery(int n) {
    if (n <= 0) return 1;
    return n * mystery(n - 2);
}
```

- **(A)** 3
- **(B)** 6
- **(C)** 1
- **(D)** 0

**Q20. Unique Pointer Move Semantics**

What happens when attempting to copy a std::unique_ptr?

```cpp
#include <memory>
using namespace std;
int main() {
    unique_ptr<int> p1 = make_unique<int>(10);
    unique_ptr<int> p2 = p1;
    return 0;
}
```

- **(A)** Both point to 10 with shared ownership
- **(B)** p1 is set to nullptr
- **(C)** Compilation error because copy constructor is deleted
- **(D)** Runtime segmentation fault

### Set 2 — Java

**Q1. Integer Cache in Java**

What is the output of the following Java code?

```java
public class Main {
    public static void main(String[] args) {
        Integer a = 127;
        Integer b = 127;
        Integer c = 128;
        Integer d = 128;
        System.out.println((a == b) + " " + (c == d));
    }
}
```

- **(A)** true true
- **(B)** true false
- **(C)** false false
- **(D)** false true

**Q2. Finally Block Execution with Return**

What does this method return?

```java
public class Main {
    public static int test() {
        try {
            return 10;
        } finally {
            return 20;
        }
    }
    public static void main(String[] args) {
        System.out.println(test());
    }
}
```

- **(A)** 10
- **(B)** 20
- **(C)** Compilation error
- **(D)** 30

**Q3. String Immutability and concat**

What is printed by the following Java code?

```java
public class Main {
    public static void main(String[] args) {
        String s = "Java";
        s.concat(" 17");
        System.out.println(s);
    }
}
```

- **(A)** Java 17
- **(B)** Java
- **(C)** null
- **(D)** Compilation error

**Q4. Static Method Overriding (Hiding)**

What does this program print?

```java
class Super {
    public static void show() { System.out.print("Super "); }
}
class Sub extends Super {
    public static void show() { System.out.print("Sub "); }
}
public class Main {
    public static void main(String[] args) {
        Super obj = new Sub();
        obj.show();
    }
}
```

- **(A)** Super 
- **(B)** Sub 
- **(C)** Super Sub 
- **(D)** Compilation error

**Q5. ConcurrentModificationException in For-Each**

What occurs during the execution of this code?

```java
import java.util.*;
public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
        for (String s : list) {
            if ("B".equals(s)) list.remove(s);
        }
    }
}
```

- **(A)** Removes B successfully
- **(B)** ConcurrentModificationException
- **(C)** Infinite loop
- **(D)** IndexOutOfBoundsException

**Q6. Bitwise Unsigned Right Shift**

What is the output of -8 >>> 1 in Java?

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(-8 >>> 1 > 0);
    }
}
```

- **(A)** true
- **(B)** false
- **(C)** -4
- **(D)** Compilation error

**Q7. Array Polymorphism and ArrayStoreException**

What happens at runtime in this code?

```java
public class Main {
    public static void main(String[] args) {
        Object[] arr = new String[3];
        arr[0] = 42;
    }
}
```

- **(A)** Compiles and runs normally
- **(B)** ClassCastException at compile time
- **(C)** ArrayStoreException at runtime
- **(D)** NullPointerException

**Q8. StringBuilder Capacity Growth**

What is the default initial capacity of new StringBuilder() in Java?

```java
StringBuilder sb = new StringBuilder();
```

- **(A)** 0
- **(B)** 8
- **(C)** 16
- **(D)** 32

**Q9. Ternary Operator Auto-Unboxing NullPointerException**

What exception is thrown by this code?

```java
public class Main {
    public static void main(String[] args) {
        Boolean b = null;
        boolean result = (b != null) ? b : false;
        System.out.println(result);
    }
}
```

- **(A)** NullPointerException
- **(B)** Prints false without error
- **(C)** Compilation error
- **(D)** Prints true

**Q10. Final Variable Reassignment**

What error does this code produce?

```java
public class Main {
    final int x;
    public Main() {
        x = 10;
    }
    public void reset() {
        x = 0;
    }
}
```

- **(A)** No error
- **(B)** Compilation error in reset(): cannot assign a value to final variable x
- **(C)** Runtime FinalAssignmentException
- **(D)** Warning only

**Q11. Switch Expression Exhaustiveness**

Since Java 14, what is required for switch expressions returning a value?

```java
int res = switch(val) { case 1 -> 10; default -> 0; };
```

- **(A)** Must use break
- **(B)** Must cover all possible input values (exhaustive), often requiring default
- **(C)** Must only switch on Strings
- **(D)** Cannot return primitive types

**Q12. HashMap get with Key hashCode Mutation**

What happens if a key object in a HashMap is mutated after insertion altering its hashCode?

```java
Map<Person, String> map = new HashMap<>();
```

- **(A)** The key is automatically rehashed
- **(B)** map.get(key) will likely return null because the bucket lookup looks in the new hash index
- **(C)** Throws KeyMutatedException
- **(D)** HashMap prevents object mutation

**Q13. Interface Default Method Resolution**

If a class implements two interfaces having the exact same default method signature, what must the class do?

```java
interface A { default void m() {} } interface B { default void m() {} }
```

- **(A)** Automatically calls interface A method
- **(B)** Must explicitly override the method to resolve the ambiguity or compile error occurs
- **(C)** Both default methods execute in sequence
- **(D)** Interfaces cannot have default methods

**Q14. Garbage Collection System.gc Guarantee**

What does calling System.gc() guarantee in Java?

```java
System.gc();
```

- **(A)** Immediately reclaims all unreferenced heap memory
- **(B)** It is merely a hint/request to the JVM; there is no guarantee GC will run immediately
- **(C)** Forces Stop-The-World full GC synchronously
- **(D)** Throws UnsupportedOperationException in modern JVMs

**Q15. Covariant Return Types**

Can an overriding method in a subclass return a subtype of the return type declared in the superclass?

```java
class Animal {} class Dog extends Animal {}
class Shelter { Animal get() { return new Animal(); } }
class DogShelter extends Shelter { Dog get() { return new Dog(); } }
```

- **(A)** No, return types must match exactly in Java
- **(B)** Yes, Java supports covariant return types since Java 5
- **(C)** Only if methods are static
- **(D)** Only with generics

**Q16. Volatile Keyword Guarantee**

What does the volatile keyword guarantee for a variable in Java?

```java
private volatile boolean running = true;
```

- **(A)** Mutual exclusion and atomic compound operations (like ++)
- **(B)** Memory visibility across threads (reads/writes directly to main memory) and instruction reordering prevention
- **(C)** Immutable state
- **(D)** Prevents garbage collection

**Q17. Cloneable Interface Marker**

What method is declared inside the java.lang.Cloneable interface?

```java
public interface Cloneable {}
```

- **(A)** public Object clone();
- **(B)** public Object copy();
- **(C)** No methods; it is a marker interface
- **(D)** public void cloneObject();

**Q18. Try-With-Resources AutoCloseable**

In try-with-resources, in what order are multiple declared resources closed?

```java
try (Resource r1 = new Resource(); Resource r2 = new Resource()) { ... }
```

- **(A)** In the exact order of declaration (r1 first, then r2)
- **(B)** In reverse order of declaration (r2 first, then r1)
- **(C)** Simultaneously in background threads
- **(D)** Arbitrary JVM order

**Q19. String intern() Pool**

What is the output of this code?

```java
public class Main {
    public static void main(String[] args) {
        String s1 = new String("hello").intern();
        String s2 = "hello";
        System.out.println(s1 == s2);
    }
}
```

- **(A)** true
- **(B)** false
- **(C)** Compilation error
- **(D)** Throws NullPointerException

**Q20. Generics Type Erasure**

What happens to generic type parameters like List<String> after Java compilation?

```java
List<String> list = new ArrayList<>();
```

- **(A)** Type information is retained in runtime bytecode for reflection
- **(B)** Type parameters are erased and replaced by their bounds (or Object) with necessary casts
- **(C)** A new compiled class List_String is created
- **(D)** Generics are interpreted at runtime by the JIT

### Set 2 — Python

**Q1. Default Mutable Argument Trap**

What is the output of the following Python code?

```python
def append_to(element, target=[]):
    target.append(element)
    return target

print(append_to(1))
print(append_to(2))
```

- **(A)** [1] then [2]
- **(B)** [1] then [1, 2]
- **(C)** [1, 2] then [1, 2]
- **(D)** TypeError

**Q2. Integer Caching (-5 to 256)**

What is the output of this Python identity check?

```python
a = 256
b = 256
c = 257
d = 257
print(a is b, c is d)
```

- **(A)** True True
- **(B)** True False
- **(C)** False False
- **(D)** False True

**Q3. Tuple with Mutable Element Mutation**

What happens when executing this Python code?

```python
t = ([1, 2], 3)
t[0].append(99)
print(t)
```

- **(A)** TypeError: tuple is immutable
- **(B)** ([1, 2, 99], 3)
- **(C)** ([1, 2], 3, 99)
- **(D)** AttributeError

**Q4. List Comprehension Variable Leak (Python 3)**

What is the output of this code in Python 3?

```python
x = 100
squares = [x * x for x in range(3)]
print(x)
```

- **(A)** 2
- **(B)** 4
- **(C)** 100
- **(D)** NameError

**Q5. String Multiplication and Join**

What is the result of "-".join(["a", "b"] * 2)?

```python
print("-".join(["a", "b"] * 2))
```

- **(A)** a-b-a-b
- **(B)** a-b*2
- **(C)** aa-bb
- **(D)** ["a", "b", "a", "b"]

**Q6. Isinstance with Bool and Int**

What does isinstance(True, int) evaluate to in Python?

```python
print(isinstance(True, int))
```

- **(A)** False
- **(B)** True
- **(C)** TypeError
- **(D)** SyntaxError

**Q7. Dictionary get Default Value**

What does d.get("missing", 42) return when "missing" is not in d?

```python
d = {"a": 1}
print(d.get("missing", 42))
```

- **(A)** KeyError: missing
- **(B)** 42
- **(C)** None
- **(D)** 0

**Q8. Generator Yield State**

What is printed by this generator function call?

```python
def count():
    yield 1
    yield 2
    yield 3

gen = count()
print(next(gen), next(gen))
```

- **(A)** 1 1
- **(B)** 1 2
- **(C)** 2 3
- **(D)** [1, 2]

**Q9. Nonlocal Keyword Purpose**

What is the purpose of the nonlocal keyword in Python?

```python
def outer():
    x = 10
    def inner():
        nonlocal x
        x += 1
```

- **(A)** Declares x in the global module scope
- **(B)** Binds x to the nearest enclosing non-global scope variable
- **(C)** Prevents x from being modified
- **(D)** Exports x to other files

**Q10. Set Discard vs Remove**

What is the difference between s.remove(x) and s.discard(x) when x is not in the set?

```python
s = {1, 2, 3}
```

- **(A)** remove raises KeyError; discard does nothing
- **(B)** discard raises KeyError; remove does nothing
- **(C)** Both raise KeyError
- **(D)** Both remove all elements

**Q11. Try Except Else Block**

When does the else block execute in a Python try-except-else-finally statement?

```python
try:
    process()
except ValueError:
    pass
else:
    print("Success")
```

- **(A)** Only when an exception occurs
- **(B)** Only when NO exception was raised in the try block
- **(C)** Always, right before finally
- **(D)** Never

**Q12. List Pop with Index**

What is the return value of [10, 20, 30].pop(1)?

```python
lst = [10, 20, 30]
val = lst.pop(1)
```

- **(A)** 10
- **(B)** 20
- **(C)** 30
- **(D)** [10, 30]

**Q13. Unhashable Type in Dictionary Key**

Which of the following types CANNOT be used as a dictionary key in Python?

```python
d = {}
```

- **(A)** tuple: (1, 2)
- **(B)** frozenset: frozenset([1, 2])
- **(C)** list: [1, 2]
- **(D)** str: "key"

**Q14. All Function on Empty Iterable**

What does all([]) evaluate to in Python?

```python
print(all([]))
```

- **(A)** False
- **(B)** True
- **(C)** None
- **(D)** TypeError

**Q15. Lambda Sorting by Key**

What does sorted([(1, 3), (4, 1), (2, 2)], key=lambda x: x[1]) produce?

```python
data = [(1, 3), (4, 1), (2, 2)]
print(sorted(data, key=lambda x: x[1]))
```

- **(A)** [(1, 3), (2, 2), (4, 1)]
- **(B)** [(4, 1), (2, 2), (1, 3)]
- **(C)** [(1, 3), (4, 1), (2, 2)]
- **(D)** [(4, 1), (1, 3), (2, 2)]

**Q16. Enumerate Start Index**

What is the first tuple yielded by enumerate(["apple", "banana"], start=1)?

```python
for item in enumerate(["apple", "banana"], start=1):
    print(item); break
```

- **(A)** (0, "apple")
- **(B)** (1, "apple")
- **(C)** ("apple", 1)
- **(D)** (1, "banana")

**Q17. String Splitting with Maxsplit**

What is the output of "a,b,c,d".split(",", 2)?

```python
print("a,b,c,d".split(",", 2))
```

- **(A)** ["a", "b", "c,d"]
- **(B)** ["a", "b", "c", "d"]
- **(C)** ["a", "b"]
- **(D)** ["a,b", "c,d"]

**Q18. Dict Keys Union (Python 3.9+)**

What operator merges two dictionaries in Python 3.9+?

```python
d1 = {"a": 1}; d2 = {"b": 2}
```

- **(A)** d1 + d2
- **(B)** d1 | d2
- **(C)** d1 & d2
- **(D)** d1.merge(d2)

**Q19. Zip with Unequal Lengths**

What is the length of list(zip([1, 2, 3, 4], ["a", "b"]))?

```python
print(len(list(zip([1, 2, 3, 4], ["a", "b"]))))
```

- **(A)** 4
- **(B)** 2
- **(C)** 6
- **(D)** ValueError

**Q20. Global Variable Modification Without Declaration**

What happens when modifying a global variable without the global keyword?

```python
x = 10
def f():
    x += 1
f()
```

- **(A)** x becomes 11 globally
- **(B)** UnboundLocalError: local variable referenced before assignment
- **(C)** Creates a local variable with value 11
- **(D)** Warning only

---

## Round 1 — Set 3

*(See individual set file: `question_papers/Round1_Set3.md` for standalone printing)*

### Set 3 — C++

**Q1. Array Pointer Arithmetic**

What is printed by this pointer arithmetic code?

```cpp
#include <iostream>
using namespace std;
int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* ptr = arr + 3;
    cout << *(ptr - 2) << endl;
    return 0;
}
```

- **(A)** 10
- **(B)** 20
- **(C)** 30
- **(D)** 40

**Q2. Const Pointer vs Pointer to Const**

Which declaration creates a pointer whose address cannot be changed after initialization?

```cpp
int x = 5, y = 10;
```

- **(A)** const int* p = &x;
- **(B)** int const* p = &x;
- **(C)** int* const p = &x;
- **(D)** const int* const* p = &x;

**Q3. Enum Class Type Safety**

Why does the following code fail to compile in modern C++?

```cpp
enum class Color { Red, Green, Blue };
int x = Color::Red;
```

- **(A)** enum class values must be capitalized
- **(B)** enum class is strongly typed and does not implicitly convert to int
- **(C)** Red must be assigned an explicit integer value
- **(D)** Color must be instantiated with new

**Q4. Bitwise Shift Operator**

What is the output of the following C++ code?

```cpp
#include <iostream>
using namespace std;
int main() {
    int x = 3;
    cout << (x << 3) << endl;
    return 0;
}
```

- **(A)** 9
- **(B)** 24
- **(C)** 6
- **(D)** 18

**Q5. Switch Case Fallthrough**

What is the output of the following switch snippet?

```cpp
#include <iostream>
using namespace std;
int main() {
    int val = 2;
    switch(val) {
        case 1: cout << "1";
        case 2: cout << "2";
        case 3: cout << "3";
        default: cout << "D";
    }
    return 0;
}
```

- **(A)** 2
- **(B)** 23
- **(C)** 23D
- **(D)** D

**Q6. Typeid and Polymorphism**

What is required for typeid(*ptr).name() to return the runtime derived class type?

```cpp
Base* ptr = new Derived();
```

- **(A)** Base class must have at least one virtual function
- **(B)** Derived class must inherit virtually
- **(C)** The pointer must be dynamic_cast first
- **(D)** RTTI cannot inspect derived types

**Q7. String substr Parameters**

What is the output of s.substr(2, 3)?

```cpp
#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "ABCDEFG";
    cout << s.substr(2, 3) << endl;
    return 0;
}
```

- **(A)** CDE
- **(B)** CD
- **(C)** BC
- **(D)** DEF

**Q8. Vector Capacity vs Size**

What does v.capacity() represent?

```cpp
vector<int> v = {1, 2, 3};
```

- **(A)** The current number of elements in the vector
- **(B)** The total allocated storage capacity without needing reallocation
- **(C)** The maximum allowed elements in vector (max_size)
- **(D)** The memory size of a single element

**Q9. Auto Type Deduction with References**

What is the type of y deduced as?

```cpp
int x = 10;
const int& ref = x;
auto y = ref;
```

- **(A)** const int&
- **(B)** int&
- **(C)** int
- **(D)** const int

**Q10. Comma Operator Evaluation**

What is the value of result?

```cpp
#include <iostream>
using namespace std;
int main() {
    int a = 2, b = 4;
    int result = (a += 3, b += 5, a * b);
    cout << result << endl;
    return 0;
}
```

- **(A)** 5
- **(B)** 9
- **(C)** 45
- **(D)** 20

**Q11. Smart Pointer Cycle Memory Leak**

What problem occurs when two std::shared_ptr instances reference each other?

```cpp
struct Node { shared_ptr<Node> next; };
```

- **(A)** Compilation error
- **(B)** Circular reference causing reference counts never to reach zero (memory leak)
- **(C)** Double free error on termination
- **(D)** Stack overflow exception

**Q12. Set Insertion Duplicate Behavior**

What does s.insert(10) do when 10 already exists in std::set<int>?

```cpp
#include <set>
using namespace std;
set<int> s = {10, 20}; auto res = s.insert(10);
```

- **(A)** Throws duplicate_key exception
- **(B)** Overwrites existing 10
- **(C)** Does nothing and returns pair<iterator, bool> where bool is false
- **(D)** Adds 10 at the end

**Q13. Friend Function Access**

What privilege does a friend function have in C++?

```cpp
class Box { friend void inspect(Box b); };
```

- **(A)** It inherits from Box
- **(B)** It has access to private and protected members of Box
- **(C)** It becomes a member function of Box
- **(D)** It can only access public members of Box

**Q14. Constexpr Function Evaluation**

What does constexpr specifier guarantee when invoked with constant expressions?

```cpp
constexpr int square(int x) { return x * x; }
```

- **(A)** Always evaluates at runtime
- **(B)** Can be evaluated at compile time
- **(C)** Can never accept runtime arguments
- **(D)** Inlines the function unconditionally

**Q15. Char Array Null Terminator Off-by-One**

What happens if a char array of size 5 is initialized with "HELLO"?

```cpp
char str[5] = "HELLO";
```

- **(A)** str is validly null-terminated
- **(B)** Compile error or lacks null terminator because "HELLO" needs 6 bytes
- **(C)** Silent truncation to "HELL"
- **(D)** Buffer overflow at compile time

**Q16. Vector pop_back on Empty Vector**

What happens if v.pop_back() is called on an empty std::vector?

```cpp
vector<int> v; v.pop_back();
```

- **(A)** Throws std::underflow_error
- **(B)** Undefined Behavior
- **(C)** Returns false
- **(D)** Does nothing safely

**Q17. Destructor Call Order in Inheritance**

In what order are destructors called for a derived object?

```cpp
class Derived : public Base {};
```

- **(A)** Base first, then Derived
- **(B)** Derived first, then Base
- **(C)** Simultaneously in parallel
- **(D)** Arbitrary order decided by compiler

**Q18. std::move State After Move**

What is guaranteed about an object after being moved with std::move?

```cpp
string s1 = "Hello"; string s2 = std::move(s1);
```

- **(A)** s1 is guaranteed to be empty string ""
- **(B)** s1 is in a valid but unspecified state
- **(C)** s1 becomes a dangling pointer
- **(D)** s1 retains its original value "Hello"

**Q19. Float to Int Conversion Truncation**

What is the output of this conversion?

```cpp
#include <iostream>
using namespace std;
int main() {
    float f = -3.75f;
    int i = (int)f;
    cout << i << endl;
    return 0;
}
```

- **(A)** -4
- **(B)** -3
- **(C)** -3.75
- **(D)** 3

**Q20. Priority Queue Default Ordering**

By default, what type of heap does std::priority_queue implement?

```cpp
#include <queue>
using namespace std;
priority_queue<int> pq;
```

- **(A)** Min-heap (smallest element on top)
- **(B)** Max-heap (largest element on top)
- **(C)** FIFO queue
- **(D)** LIFO stack

### Set 3 — Java

**Q1. Pass-by-Value Object Reference Reassignment**

What is the output of this code?

```java
public class Main {
    static void change(StringBuilder sb) {
        sb.append("World");
        sb = new StringBuilder("Goodbye");
    }
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello ");
        change(sb);
        System.out.println(sb);
    }
}
```

- **(A)** Goodbye
- **(B)** Hello World
- **(C)** Hello 
- **(D)** Hello Goodbye

**Q2. Static Initializer Block Order**

In what sequence do static blocks, instance initializers, and constructors execute?

```java
class Demo {
    static { System.out.print("S "); }
    { System.out.print("I "); }
    Demo() { System.out.print("C "); }
}
```

- **(A)** S I C
- **(B)** I S C
- **(C)** C I S
- **(D)** I C S

**Q3. Array Equality Check**

What does arr1.equals(arr2) evaluate to for two distinct arrays with identical contents?

```java
int[] a1 = {1, 2, 3}; int[] a2 = {1, 2, 3}; System.out.println(a1.equals(a2));
```

- **(A)** true
- **(B)** false
- **(C)** Compilation error
- **(D)** 1

**Q4. Polymorphism with Instance Variables**

What does this code print?

```java
class Parent { int x = 10; }
class Child extends Parent { int x = 20; }
public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.x);
    }
}
```

- **(A)** 10
- **(B)** 20
- **(C)** Compilation error
- **(D)** 0

**Q5. Super Constructor Call Constraint**

Where must a super() constructor call be located inside a subclass constructor?

```java
public SubClass() { ... }
```

- **(A)** Anywhere inside the constructor body
- **(B)** Must be the very first statement
- **(C)** Must be the last statement
- **(D)** Inside a finally block

**Q6. TreeMap Natural Ordering Key Requirement**

What interface must keys implement to be used in a default TreeMap?

```java
Map<MyKey, String> map = new TreeMap<>();
```

- **(A)** Serializable
- **(B)** Cloneable
- **(C)** Comparable
- **(D)** Iterable

**Q7. Character Arithmetic Output**

What is printed by this code?

```java
public class Main {
    public static void main(String[] args) {
        char c = 'A';
        System.out.println(c + 1);
    }
}
```

- **(A)** B
- **(B)** 66
- **(C)** A1
- **(D)** Compilation error

**Q8. Checked vs Unchecked Exceptions**

Which of the following inherits from RuntimeException and is therefore unchecked?

```java
Exception hierarchy
```

- **(A)** IOException
- **(B)** SQLException
- **(C)** NullPointerException
- **(D)** ClassNotFoundException

**Q9. Short-Circuit Bitwise vs Logical Operator**

What is the value of x after: boolean b = false & (++x > 0)?

```java
int x = 5; boolean b = false & (++x > 0); System.out.println(x);
```

- **(A)** 5
- **(B)** 6
- **(C)** 0
- **(D)** Compilation error

**Q10. Abstract Class Instantiation**

Can an abstract class have constructors in Java?

```java
abstract class Base { public Base() { System.out.println("Base"); } }
```

- **(A)** No, abstract classes cannot have constructors
- **(B)** Yes, called during subclass instantiation via super()
- **(C)** Only private constructors are allowed
- **(D)** Only if all methods are implemented

**Q11. Collections.sort Algorithm Complexity**

What sorting algorithm does java.util.Arrays.sort(Object[]) / Collections.sort use?

```java
Collections.sort(list);
```

- **(A)** QuickSort (O(N^2) worst case)
- **(B)** TimSort (adaptive, stable, O(N log N) worst case)
- **(C)** HeapSort
- **(D)** BubbleSort

**Q12. Method Reference Syntax**

Which method reference is equivalent to the lambda (String s) -> System.out.println(s)?

```java
Consumer<String> c;
```

- **(A)** System.out::println
- **(B)** System.out->println
- **(C)** String::println
- **(D)** PrintStream::println

**Q13. Thread start vs run**

What happens if you directly invoke t.run() instead of t.start() on a Thread?

```java
Thread t = new Thread(task); t.run();
```

- **(A)** Starts a new concurrent thread as expected
- **(B)** Executes run() synchronously on the current calling thread without starting a new thread
- **(C)** Throws IllegalThreadStateException
- **(D)** Terminates the program

**Q14. Finalize Method Deprecation**

Why was Object.finalize() deprecated in modern Java (Java 9+)?

```java
protected void finalize() throws Throwable {}
```

- **(A)** It was too fast
- **(B)** Unpredictable execution timing, performance overhead, thread safety issues, and better alternatives like AutoCloseable/Cleaner exist
- **(C)** It caused compile errors
- **(D)** Replaced by delete operator

**Q15. Optional get on Empty**

What exception is thrown when calling Optional.empty().get()?

```java
Optional<String> opt = Optional.empty(); opt.get();
```

- **(A)** NullPointerException
- **(B)** NoSuchElementException
- **(C)** IllegalArgumentException
- **(D)** IndexOutOfBoundsException

**Q16. List.of Immutability**

What happens when calling add() on a list created via List.of("A", "B")?

```java
List<String> list = List.of("A", "B"); list.add("C");
```

- **(A)** Adds "C" successfully
- **(B)** Throws UnsupportedOperationException
- **(C)** Returns false
- **(D)** Silently ignores insertion

**Q17. Package-Private Default Access**

What is the visibility of a class member declared without any access modifier (no public, private, or protected)?

```java
int count;
```

- **(A)** Public to all packages
- **(B)** Private to the class only
- **(C)** Accessible only by classes in the same package (package-private)
- **(D)** Protected across all subclasses

**Q18. Record Classes in Java 16+**

What does the Java record keyword automatically generate for its components?

```java
record Point(int x, int y) {}
```

- **(A)** Getters named getX(), getY(), setters, and no-arg constructor
- **(B)** Private final fields, canonical constructor, accessors x() and y(), equals(), hashCode(), and toString()
- **(C)** Mutable public fields
- **(D)** Only a constructor

**Q19. Narrowing Primitive Conversion Overflow**

What is the output of byte b = (byte) 130 in Java?

```java
public class Main {
    public static void main(String[] args) {
        byte b = (byte) 130;
        System.out.println(b);
    }
}
```

- **(A)** 130
- **(B)** -126
- **(C)** 127
- **(D)** -128

**Q20. Stream Intermediate vs Terminal Operations**

When does an intermediate operation like .filter() or .map() execute in a Java Stream pipeline?

```java
Stream<String> s = list.stream().filter(x -> { System.out.println(x); return true; });
```

- **(A)** Immediately when filter() is called
- **(B)** Lazily, only when a terminal operation (like collect or forEach) is invoked
- **(C)** In a background daemon thread
- **(D)** Never

### Set 3 — Python

**Q1. Shallow Copy List Multiplication**

What is printed after modifying this 2D list created with multiplication?

```python
matrix = [[0] * 2] * 2
matrix[0][0] = 7
print(matrix)
```

- **(A)** [[7, 0], [0, 0]]
- **(B)** [[7, 0], [7, 0]]
- **(C)** [[7, 7], [0, 0]]
- **(D)** [[0, 0], [0, 0]]

**Q2. String Reverse Slice**

What does the slice s[::-1] do to a string s?

```python
s = "antigravity"
print(s[::-1])
```

- **(A)** Prints "antigravity"
- **(B)** Reverses the string s
- **(C)** Deletes the last character
- **(D)** Raises IndexError

**Q3. Floor Division with Negatives**

What is the result of -7 // 2 in Python?

```python
print(-7 // 2)
```

- **(A)** -3
- **(B)** -4
- **(C)** -3.5
- **(D)** 3

**Q4. Dunder Repr vs Str**

Which special method is invoked by the built-in repr() function?

```python
class Item: ...
```

- **(A)** __str__
- **(B)** __repr__
- **(C)** __format__
- **(D)** __display__

**Q5. Walrus Operator (Python 3.8+)**

What does the walrus operator := do?

```python
if (n := len(data)) > 5: print(n)
```

- **(A)** Compares values strictly
- **(B)** Assigns a value to a variable as part of an expression
- **(C)** Performs integer division
- **(D)** Defines a generator

**Q6. Filter Function Output Type**

What type does the built-in filter() function return in Python 3?

```python
f = filter(lambda x: x > 0, [1, -2, 3])
```

- **(A)** list
- **(B)** filter object (iterator)
- **(C)** tuple
- **(D)** generator

**Q7. Class Variable vs Instance Variable Shadowing**

What is the output of this code?

```python
class Dog:
    kind = 'canine'
    def __init__(self, name):
        self.name = name

d1 = Dog('Fido')
d2 = Dog('Buddy')
d1.kind = 'hound'
print(d1.kind, d2.kind, Dog.kind)
```

- **(A)** hound hound canine
- **(B)** hound canine canine
- **(C)** hound hound hound
- **(D)** canine canine canine

**Q8. Args and Kwargs Unpacking**

What does *args and **kwargs collect in function definitions?

```python
def func(*args, **kwargs): ...
```

- **(A)** args collects positional arguments as a tuple; kwargs collects keyword arguments as a dict
- **(B)** args collects dict; kwargs collects tuple
- **(C)** Both collect lists
- **(D)** args collects strings; kwargs collects integers

**Q9. Any Function on Falsy Values**

What does any([0, False, "", None]) evaluate to?

```python
print(any([0, False, "", None]))
```

- **(A)** True
- **(B)** False
- **(C)** None
- **(D)** 0

**Q10. Multiple Inheritance and MRO**

How can you inspect the Method Resolution Order of a class in Python?

```python
class C(A, B): pass
```

- **(A)** C.__order__
- **(B)** C.mro() or C.__mro__
- **(C)** C.__hierarchy__
- **(D)** C.resolution()

**Q11. Set Difference Operator**

What is {1, 2, 3, 4} - {2, 4, 6}?

```python
print({1, 2, 3, 4} - {2, 4, 6})
```

- **(A)** {1, 3, 6}
- **(B)** {1, 3}
- **(C)** {6}
- **(D)** {2, 4}

**Q12. Modulo of Negative Integer in Python**

What is -5 % 3 in Python?

```python
print(-5 % 3)
```

- **(A)** -2
- **(B)** 1
- **(C)** 2
- **(D)** -1

**Q13. Pass Statement Purpose**

What is the purpose of the pass statement in Python?

```python
def stub():
    pass
```

- **(A)** Skips the current loop iteration
- **(B)** A null statement used as a placeholder where syntactically code is required
- **(C)** Terminates the function immediately returning None
- **(D)** Raises an exception

**Q14. Dictionary Keys View Dynamic Reflection**

What happens to a dict_keys view when a new key is added to the dictionary?

```python
d = {"a": 1}
keys = d.keys()
d["b"] = 2
print("b" in keys)
```

- **(A)** False
- **(B)** True
- **(C)** Raises RuntimeError
- **(D)** None

**Q15. Decorators Wrapping Function**

What does the @decorator syntax do above a function definition?

```python
@my_dec
def hello(): pass
```

- **(A)** Compiles hello in C
- **(B)** Equivalent to hello = my_dec(hello)
- **(C)** Runs hello in a background thread
- **(D)** Declares hello as private

**Q16. Chained Comparison Evaluation**

What does 1 < 2 < 3 == 3 evaluate to in Python?

```python
print(1 < 2 < 3 == 3)
```

- **(A)** True
- **(B)** False
- **(C)** SyntaxError
- **(D)** TypeError

**Q17. String Isdigit vs Isnumeric**

What does "²" (superscript 2) return for isdigit() vs isnumeric() in Python 3?

```python
s = "²"
print(s.isdigit(), s.isnumeric())
```

- **(A)** False False
- **(B)** True True
- **(C)** False True
- **(D)** True False

**Q18. Iter Function with Sentinel**

What does iter(callable, sentinel) do?

```python
reader = iter(f.readline, "")
```

- **(A)** Calls callable repeatedly until it returns sentinel
- **(B)** Raises an error if sentinel is reached
- **(C)** Appends sentinel to callable
- **(D)** Filters out sentinel values

**Q19. F-Strings Formatting Specifier**

What does f"{123.456:.2f}" output in Python 3.6+?

```python
print(f"{123.456:.2f}")
```

- **(A)** 123.45
- **(B)** 123.46
- **(C)** 123.5
- **(D)** 123.456

**Q20. Recursion Limit Error**

What exception is raised when Python exceeds its maximum call stack depth?

```python
def rec(): rec()
rec()
```

- **(A)** StackOverflowError
- **(B)** RecursionError
- **(C)** MemoryError
- **(D)** RuntimeInterrupt

---

## Round 1 — Set 4

*(See individual set file: `question_papers/Round1_Set4.md` for standalone printing)*

### Set 4 — C++

**Q1. C-Style String Length vs Sizeof**

What is printed by strlen vs sizeof for this string?

```cpp
#include <iostream>
#include <cstring>
using namespace std;
int main() {
    char s[] = "Code";
    cout << strlen(s) << " " << sizeof(s) << endl;
    return 0;
}
```

- **(A)** 4 4
- **(B)** 4 5
- **(C)** 5 5
- **(D)** 5 4

**Q2. Default Member Access in Struct vs Class**

What is the default access specifier for members of a struct vs class in C++?

```cpp
struct A { int x; }; class B { int y; };
```

- **(A)** struct: public; class: private
- **(B)** struct: private; class: public
- **(C)** struct: protected; class: private
- **(D)** Both are private by default

**Q3. Multiple Catch Blocks Ordering**

What is the consequence of placing catch (const exception& e) before catch (const runtime_error& e)?

```cpp
try { throw runtime_error("fail"); } catch (const exception& e) {} catch (const runtime_error& e) {}
```

- **(A)** Compilation warning or runtime_error block is unreachable
- **(B)** runtime_error will still catch it
- **(C)** The program terminates immediately
- **(D)** Compile error: duplicate handler

**Q4. Pointer Difference**

What is the result of ptr2 - ptr1 in the following code?

```cpp
#include <iostream>
using namespace std;
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int* ptr1 = &arr[1];
    int* ptr2 = &arr[4];
    cout << (ptr2 - ptr1) << endl;
    return 0;
}
```

- **(A)** 3
- **(B)** 12
- **(C)** 4
- **(D)** Undetermined

**Q5. Unsigned Underflow Wrap**

What is printed by this unsigned loop?

```cpp
#include <iostream>
using namespace std;
int main() {
    unsigned int x = 0;
    cout << x - 1 << endl;
    return 0;
}
```

- **(A)** -1
- **(B)** 4294967295 (UINT_MAX)
- **(C)** 0
- **(D)** Runtime error

**Q6. Dynamic Cast Downcasting Failure**

What does dynamic_cast<Derived*>(basePtr) return when basePtr does not point to a Derived object?

```cpp
Base* b = new Base(); Derived* d = dynamic_cast<Derived*>(b);
```

- **(A)** Throws bad_cast exception
- **(B)** Returns nullptr
- **(C)** Returns invalid memory address
- **(D)** Aborts the program

**Q7. Logical OR Short-Circuit**

What is the value of a and b after execution?

```cpp
#include <iostream>
using namespace std;
int main() {
    int a = 1, b = 2;
    if (a == 1 || ++b > 2) {
        a += 10;
    }
    cout << a << " " << b << endl;
    return 0;
}
```

- **(A)** 11 2
- **(B)** 11 3
- **(C)** 1 2
- **(D)** 1 3

**Q8. Copy Elision / RVO**

What is Return Value Optimization (RVO) in C++?

```cpp
MyClass create() { return MyClass(); }
```

- **(A)** A compiler optimization that avoids copying or moving temporary return objects
- **(B)** A mechanism that automatically places return objects on the heap
- **(C)** A syntax for returning references to local variables
- **(D)** A tool for measuring function execution time

**Q9. Pure Virtual Function Syntax**

How is a pure virtual function declared in C++?

```cpp
class Shape { ... };
```

- **(A)** virtual void draw() = null;
- **(B)** virtual void draw() = 0;
- **(C)** pure virtual void draw();
- **(D)** abstract void draw();

**Q10. Map Key Ordering**

In what order does std::map iterate over its elements?

```cpp
#include <map>
using namespace std;
map<int, string> m;
```

- **(A)** Insertion order
- **(B)** Sorted ascending by key
- **(C)** Sorted descending by value
- **(D)** Arbitrary hash order

**Q11. Static Member Initialization**

Where must non-const static data members of a class typically be defined?

```cpp
class Widget { static int count; };
```

- **(A)** Inside the constructor
- **(B)** Outside the class definition at namespace scope
- **(C)** Inside main()
- **(D)** In the destructor

**Q12. Function Overloading by Return Type**

Can two functions in C++ differ solely by their return type?

```cpp
int calculate(int x); double calculate(int x);
```

- **(A)** Yes, always
- **(B)** No, causes compilation error
- **(C)** Yes, if one is static
- **(D)** Yes, in C++20 only

**Q13. Vector clear vs shrink_to_fit**

What does v.clear() do to a vector capacity?

```cpp
vector<int> v(1000); v.clear();
```

- **(A)** Reduces size to 0 and deallocates all memory
- **(B)** Reduces size to 0 but keeps capacity unchanged
- **(C)** Sets all elements to 0 without changing size
- **(D)** Deletes the vector object

**Q14. Bitwise NOT of Zero**

What is the output of ~0 in a signed integer representation using two complement?

```cpp
#include <iostream>
using namespace std;
int main() {
    int x = ~0;
    cout << x << endl;
    return 0;
}
```

- **(A)** 0
- **(B)** -1
- **(C)** 1
- **(D)** 2147483647

**Q15. Initialization Order of Members**

In C++, in what order are class member variables initialized?

```cpp
class Test { int b; int a; public: Test(int x) : a(x), b(a) {} };
```

- **(A)** In the order they appear in the constructor initializer list
- **(B)** In the order they are declared in the class definition
- **(C)** Alphabetical order
- **(D)** Unspecified

**Q16. Mutable Keyword Purpose**

What is the purpose of the mutable keyword on a class member variable?

```cpp
class Cache { mutable int hitCount; };
```

- **(A)** Allows modification inside const member functions
- **(B)** Makes the variable thread-safe
- **(C)** Forces allocation in CPU registers
- **(D)** Allows the variable to change type at runtime

**Q17. String find First Occurrence**

What is printed by this string search?

```cpp
#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "banana";
    cout << s.find('a') << " " << s.rfind('a') << endl;
    return 0;
}
```

- **(A)** 1 5
- **(B)** 1 3
- **(C)** 0 5
- **(D)** 2 4

**Q18. Dangling Reference to Local**

What is the danger of returning a reference to a local variable?

```cpp
int& getVal() { int x = 10; return x; }
```

- **(A)** Memory leak
- **(B)** Dangling reference and undefined behavior when accessed
- **(C)** Infinite loop
- **(D)** Compiler converts it to a pointer

**Q19. Std All_of Algorithm**

What does std::all_of return on an empty range?

```cpp
#include <algorithm>
#include <vector>
using namespace std;
vector<int> v; bool res = all_of(v.begin(), v.end(), [](int x){ return x > 0; });
```

- **(A)** false
- **(B)** true
- **(C)** Undefined behavior
- **(D)** Throws out_of_range

**Q20. Explicit Constructor Purpose**

What does marking a single-argument constructor explicit prevent?

```cpp
class MyInt { public: explicit MyInt(int x) {} };
```

- **(A)** Prevents dynamic allocation with new
- **(B)** Prevents implicit type conversion and copy-initialization from int
- **(C)** Prevents inheritance from MyInt
- **(D)** Prevents destruction

### Set 4 — Java

**Q1. String Substring Indices**

What is the output of "ANTIGRAVITY".substring(4, 8)?

```java
System.out.println("ANTIGRAVITY".substring(4, 8));
```

- **(A)** IGRA
- **(B)** GRAV
- **(C)** GRA
- **(D)** IGRAV

**Q2. Static Variable Shared Across Instances**

What does this code output?

```java
class Counter {
    static int count = 0;
    Counter() { count++; }
}
public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        System.out.println(c1.count + " " + Counter.count);
    }
}
```

- **(A)** 1 2
- **(B)** 2 2
- **(C)** 1 1
- **(D)** 0 2

**Q3. Catching Exception Order**

Why does placing catch(Exception e) before catch(IOException e) cause a compile error in Java?

```java
try { ... } catch (Exception e) {} catch (IOException e) {}
```

- **(A)** Exception does not inherit from Throwable
- **(B)** IOException has already been caught (unreachable catch block)
- **(C)** IOException cannot be caught
- **(D)** Duplicate variable name e

**Q4. Floating Point Precision Representation**

What does System.out.println(0.1 + 0.2 == 0.3) print in Java?

```java
System.out.println(0.1 + 0.2 == 0.3);
```

- **(A)** true
- **(B)** false
- **(C)** Compilation error
- **(D)** Throws ArithmeticException

**Q5. Synchronized Method Lock Target**

What lock/monitor does a non-static synchronized method acquire in Java?

```java
public synchronized void update() {}
```

- **(A)** The Class object (MyClass.class)
- **(B)** The current instance object (this)
- **(C)** The JVM process lock
- **(D)** A new ReentrantLock object

**Q6. Anonymous Inner Class Variable Capture**

What constraint is placed on local variables referenced inside an anonymous inner class / lambda in Java?

```java
int x = 10; Runnable r = () -> System.out.println(x);
```

- **(A)** Must be static
- **(B)** Must be explicitly or effectively final
- **(C)** Must be volatile
- **(D)** Must be declared public

**Q7. Queue peek vs poll**

What is the difference between Queue.peek() and Queue.poll() when the queue is empty?

```java
Queue<Integer> q = new LinkedList<>();
```

- **(A)** Both return null without removing any element
- **(B)** peek() inspects and returns null; poll() retrieves and removes the head (or returns null)
- **(C)** peek() throws NoSuchElementException; poll() returns null
- **(D)** Both throw NullPointerException

**Q8. Transient Keyword Purpose**

What is the effect of the transient keyword on an instance variable?

```java
private transient String password;
```

- **(A)** The variable is stored in volatile CPU cache
- **(B)** The variable will not be serialized when the object is serialized
- **(C)** The variable is reset to null every minute
- **(D)** The variable cannot be read by other classes

**Q9. Enum values() Return Type**

What does Color.values() return for an enum Color { RED, GREEN, BLUE }?

```java
Color[] colors = Color.values();
```

- **(A)** List<Color>
- **(B)** Color[] array containing all enum constants in order of declaration
- **(C)** Set<Color>
- **(D)** Iterator<Color>

**Q10. StringBuilder vs StringBuffer Thread Safety**

What is the key difference between StringBuilder and StringBuffer?

```java
StringBuilder vs StringBuffer
```

- **(A)** StringBuilder is synchronized and thread-safe; StringBuffer is not
- **(B)** StringBuffer is synchronized and thread-safe; StringBuilder is unsynchronized and faster for single-threaded use
- **(C)** StringBuilder is immutable; StringBuffer is mutable
- **(D)** There is no difference

**Q11. Arrays asList Fixed Size**

What happens if you call add() on a list created by Arrays.asList("a", "b")?

```java
List<String> list = Arrays.asList("a", "b"); list.add("c");
```

- **(A)** Appends "c" successfully
- **(B)** Throws UnsupportedOperationException
- **(C)** Increases capacity automatically
- **(D)** Overwrites "b"

**Q12. Polymorphic Method Resolution with super Reference**

What does this snippet print?

```java
class A { void print() { System.out.print("A"); } }
class B extends A { void print() { System.out.print("B"); } }
class C extends B { void print() { super.print(); System.out.print("C"); } }
public class Main {
    public static void main(String[] args) {
        new C().print();
    }
}
```

- **(A)** BC
- **(B)** AC
- **(C)** ABC
- **(D)** C

**Q13. Functional Interface Annotation**

What is the defining characteristic of an interface marked with @FunctionalInterface?

```java
@FunctionalInterface interface Task { void execute(); }
```

- **(A)** It must contain zero methods
- **(B)** It has exactly one abstract method (SAM)
- **(C)** It cannot contain default or static methods
- **(D)** It must extend Runnable

**Q14. HashSet Internal Implementation**

What standard data structure is used internally by java.util.HashSet to store elements?

```java
Set<String> set = new HashSet<>();
```

- **(A)** An array of linked lists
- **(B)** A HashMap instance (elements stored as keys with a dummy Object as value)
- **(C)** A Red-Black Tree
- **(D)** A circular buffer

**Q15. Strictfp Keyword Meaning**

What does the strictfp keyword ensure in Java?

```java
public strictfp class MathUtils {}
```

- **(A)** Forces IEEE 754 strict floating-point calculation rules across all hardware architectures
- **(B)** Disables garbage collection during floating point math
- **(C)** Prevents division by zero exceptions
- **(D)** Increases float precision to 128 bits

**Q16. Comparable compareTo Contract**

What should a.compareTo(b) return when a is considered greater than b?

```java
int res = a.compareTo(b);
```

- **(A)** 0
- **(B)** A positive integer (> 0)
- **(C)** A negative integer (< 0)
- **(D)** true

**Q17. String repeat Method in Java 11+**

What does "ab".repeat(3) output in Java 11+?

```java
System.out.println("ab".repeat(3));
```

- **(A)** ababab
- **(B)** ab 3
- **(C)** a3b3
- **(D)** Compilation error

**Q18. Deadlock Condition in Multithreading**

Which situation is a classic cause of deadlock in Java?

```java
Thread 1 locks Resource A, waits for B; Thread 2 locks Resource B, waits for A
```

- **(A)** Race condition
- **(B)** Circular wait condition between two threads holding mutually requested locks
- **(C)** Starvation
- **(D)** Thread death

**Q19. Generics Wildcard Lower Bound**

What does List<? super Integer> accept as valid assignments?

```java
List<? super Integer> list;
```

- **(A)** List<Double>
- **(B)** List<Integer>, List<Number>, or List<Object>
- **(C)** List<String>
- **(D)** Only List<Integer>

**Q20. System.exit in Try-Finally**

Does the finally block execute if System.exit(0) is called inside the try block?

```java
try { System.exit(0); } finally { System.out.println("Clean up"); }
```

- **(A)** Yes, finally always runs unconditionally
- **(B)** No, System.exit immediately halts JVM execution and finally does NOT run
- **(C)** Only in debug mode
- **(D)** Throws SecurityException

### Set 4 — Python

**Q1. Copy vs Deepcopy**

What does copy.deepcopy() do compared to copy.copy()?

```python
import copy
new_obj = copy.deepcopy(old_obj)
```

- **(A)** Only copies the outermost container
- **(B)** Recursively copies all nested objects, creating completely independent data structures
- **(C)** Converts all elements to immutable tuples
- **(D)** Copies objects into shared memory

**Q2. List Insert at Negative Index**

What is the output of lst.insert(-1, 99) on [1, 2, 3]?

```python
lst = [1, 2, 3]
lst.insert(-1, 99)
print(lst)
```

- **(A)** [1, 2, 3, 99]
- **(B)** [1, 2, 99, 3]
- **(C)** [99, 1, 2, 3]
- **(D)** IndexError

**Q3. Dict Comprehension Inversion**

What does {v: k for k, v in {"a": 1, "b": 2}.items()} do?

```python
d = {"a": 1, "b": 2}
inv = {v: k for k, v in d.items()}
print(inv)
```

- **(A)** {"a": 1, "b": 2}
- **(B)** {1: "a", 2: "b"}
- **(C)** {"b": 1, "a": 2}
- **(D)** TypeError

**Q4. Staticmethod vs Classmethod Decorators**

What argument does a @classmethod receive as its first parameter?

```python
@classmethod def create(cls): ...
```

- **(A)** The instance object (self)
- **(B)** The class object itself (cls)
- **(C)** No arguments
- **(D)** The module object

**Q5. String Strip Characters Parameter**

What does "xyxHello Worldyxx".strip("xy") return?

```python
print("xyxHello Worldyxx".strip("xy"))
```

- **(A)** Hello World
- **(B)** xHello Worldy
- **(C)** Hello Worldyxx
- **(D)** xyxHello World

**Q6. Zip Longest from itertools**

What module contains zip_longest for padding exhausted iterables with fillvalue?

```python
from ??? import zip_longest
```

- **(A)** collections
- **(B)** itertools
- **(C)** functools
- **(D)** builtins

**Q7. Identity Comparison of Empty Collections**

What does [] is [] evaluate to in Python?

```python
print([] is [])
```

- **(A)** True
- **(B)** False
- **(C)** TypeError
- **(D)** SyntaxError

**Q8. Context Manager Dunder Methods**

Which two special methods must an object implement to be used in a with statement?

```python
with MyContext() as ctx: ...
```

- **(A)** __open__ and __close__
- **(B)** __enter__ and __exit__
- **(C)** __start__ and __stop__
- **(D)** __init__ and __del__

**Q9. Defaultdict from collections**

What happens when accessing a non-existent key in collections.defaultdict(int)?

```python
from collections import defaultdict
d = defaultdict(int)
print(d["hits"])
```

- **(A)** Raises KeyError
- **(B)** Returns 0 and inserts ("hits", 0) into the dict
- **(C)** Returns None without inserting
- **(D)** Throws TypeError

**Q10. Truthy Value of Empty Custom Class**

What does bool(MyObj()) evaluate to if the class implements neither __bool__ nor __len__?

```python
class MyObj: pass
print(bool(MyObj()))
```

- **(A)** False
- **(B)** True
- **(C)** None
- **(D)** TypeError

**Q11. Lambda Closure Binding Late Evaluation**

What does [f() for f in [lambda: i for i in range(3)]] print?

```python
funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])
```

- **(A)** [0, 1, 2]
- **(B)** [2, 2, 2]
- **(C)** [0, 0, 0]
- **(D)** [3, 3, 3]

**Q12. Set Symmetric Difference**

What operator computes the symmetric difference of two sets (elements in either, but not both)?

```python
s1 = {1, 2}; s2 = {2, 3}
```

- **(A)** s1 & s2
- **(B)** s1 ^ s2
- **(C)** s1 | s2
- **(D)** s1 - s2

**Q13. Round Function Half to Even**

What does round(2.5) and round(3.5) evaluate to in Python 3?

```python
print(round(2.5), round(3.5))
```

- **(A)** 3 4
- **(B)** 2 4
- **(C)** 2 3
- **(D)** 3 3

**Q14. String Join Non-String TypeError**

What happens when calling "".join([1, 2, 3]) in Python?

```python
"".join([1, 2, 3])
```

- **(A)** Returns "123"
- **(B)** TypeError: sequence item 0: expected str instance, int found
- **(C)** Returns "[1, 2, 3]"
- **(D)** Returns ""

**Q15. Functools Lru Cache**

What is the purpose of the @functools.lru_cache decorator?

```python
@lru_cache(maxsize=128) def fib(n): ...
```

- **(A)** Compiles the function with Cython
- **(B)** Memoizes function calls by caching previous return values based on input arguments
- **(C)** Limits recursive depth to 128
- **(D)** Runs the function on a GPU

**Q16. Tuple Unpacking with Star Target**

What is the value of rest in a, *rest, b = [1, 2, 3, 4, 5]?

```python
a, *rest, b = [1, 2, 3, 4, 5]
print(rest)
```

- **(A)** (2, 3, 4)
- **(B)** [2, 3, 4]
- **(C)** [2, 3]
- **(D)** TypeError

**Q17. Assert Statement Disabled with Flag**

What command line flag disables assert statements in Python?

```python
python -? script.py
```

- **(A)** -d
- **(B)** -O (optimize flag)
- **(C)** -f
- **(D)** --no-assert

**Q18. Dunder Eq and Dunder Hash Relationship**

If a class overrides __eq__, what must also be overridden to use instances as dictionary keys?

```python
class Person: def __eq__(self, o): return ...
```

- **(A)** __cmp__
- **(B)** __hash__
- **(C)** __str__
- **(D)** __len__

**Q19. Re Match vs Re Search**

What is the difference between re.match() and re.search() in the re module?

```python
import re
```

- **(A)** re.match checks only at the beginning of the string; re.search searches throughout the entire string
- **(B)** re.search checks only at the beginning; re.match searches everywhere
- **(C)** re.match returns a list; re.search returns an iterator
- **(D)** No difference

**Q20. Sort List In-Place vs Sorted Builtin**

What is the return value of lst.sort()?

```python
lst = [3, 1, 2]
res = lst.sort()
print(res)
```

- **(A)** [1, 2, 3]
- **(B)** None
- **(C)** True
- **(D)** 3

---

## Round 1 — Set 5

*(See individual set file: `question_papers/Round1_Set5.md` for standalone printing)*

### Set 5 — C++

**Q1. Bitwise AND Power of Two Check**

What does (n > 0) && ((n & (n - 1)) == 0) check?

```cpp
bool check(int n) { return (n > 0) && ((n & (n - 1)) == 0); }
```

- **(A)** Whether n is an odd number
- **(B)** Whether n is a power of 2
- **(C)** Whether n is divisible by 4
- **(D)** Whether n is prime

**Q2. Array Bound Indexing Undefined Behavior**

What happens in C++ when accessing arr[5] in int arr[5]?

```cpp
int arr[5] = {1, 2, 3, 4, 5}; cout << arr[5];
```

- **(A)** Throws ArrayIndexOutOfBoundsException
- **(B)** Prints 0
- **(C)** Undefined Behavior (out-of-bounds access)
- **(D)** Compile-time error

**Q3. Precedence of Dereference vs Increment**

What does *ptr++ do in C++?

```cpp
#include <iostream>
using namespace std;
int main() {
    int arr[] = {10, 20, 30};
    int* ptr = arr;
    int val = *ptr++;
    cout << val << " " << *ptr << endl;
    return 0;
}
```

- **(A)** 10 20
- **(B)** 11 20
- **(C)** 20 20
- **(D)** 10 10

**Q4. Static Cast vs C-Style Cast**

Why is static_cast preferred over C-style cast (int)x in modern C++?

```cpp
double d = 3.14; int i = static_cast<int>(d);
```

- **(A)** static_cast is faster at runtime
- **(B)** static_cast performs compile-time type checks and avoids accidental dangerous conversions
- **(C)** C-style cast is deprecated in C++20
- **(D)** static_cast automatically handles null pointers

**Q5. String View Advantage**

What is the main benefit of std::string_view (C++17) over const std::string&?

```cpp
void log(std::string_view sv);
```

- **(A)** It modifies the underlying string safely
- **(B)** It provides a non-owning reference avoiding dynamic heap allocation for substrings and char arrays
- **(C)** It supports thread-safe concurrent writes
- **(D)** It automatically encrypts strings

**Q6. Volatile Keyword in C++**

What does the volatile keyword tell the compiler?

```cpp
volatile int flag = 0;
```

- **(A)** The variable is thread-safe and atomic
- **(B)** The variable may be modified externally (e.g. hardware) so do not optimize away reads/writes
- **(C)** The variable is stored in flash memory
- **(D)** The variable is destroyed when leaving scope

**Q7. Override Keyword Benefit**

What happens if a method marked override does not match any base class virtual method signature?

```cpp
struct Base { virtual void run(); }; struct Derived : Base { void run(int x) override; };
```

- **(A)** Silently creates a new overload
- **(B)** Compilation error
- **(C)** Warning at runtime
- **(D)** Calls Base::run()

**Q8. Vector Iterators Invalidation**

When can iterators to a std::vector become invalidated?

```cpp
vector<int> v; ... v.push_back(10);
```

- **(A)** Only when v.clear() is called
- **(B)** When a reallocation occurs due to capacity exceeded, or elements before the iterator are erased/inserted
- **(C)** Iterators in C++ are never invalidated
- **(D)** Only when the vector goes out of scope

**Q9. Auto Deduction with Initializer List**

What type is deduced for auto x = {1, 2, 3};?

```cpp
auto x = {1, 2, 3};
```

- **(A)** std::vector<int>
- **(B)** std::initializer_list<int>
- **(C)** int[3]
- **(D)** std::array<int, 3>

**Q10. Const Member Function Guarantee**

What can a const member function NOT do (unless mutable is used)?

```cpp
void display() const;
```

- **(A)** Read member variables
- **(B)** Modify any non-mutable member variables of the object
- **(C)** Call other const member functions
- **(D)** Return a value

**Q11. Nullptr vs NULL**

Why was nullptr introduced in C++11 to replace NULL?

```cpp
void f(int); void f(void*); f(nullptr);
```

- **(A)** NULL is a pointer, nullptr is an integer
- **(B)** nullptr is a strongly typed std::nullptr_t that avoids overload ambiguity with integer 0
- **(C)** NULL uses 8 bytes while nullptr uses 4 bytes
- **(D)** NULL is deprecated in C++

**Q12. Default Copy Constructor Behavior**

What kind of copy does the default copy constructor perform in C++?

```cpp
class Box { int* data; }; Box b2 = b1;
```

- **(A)** Deep copy of all pointers and allocated buffers
- **(B)** Shallow (member-wise) bitwise copy of member variables
- **(C)** Sets pointers to null
- **(D)** Calls clone() method

**Q13. De Bruijn / Bit Count Builtin**

What does __builtin_popcount(14) return in GCC/Clang?

```cpp
cout << __builtin_popcount(14) << endl;
```

- **(A)** 1
- **(B)** 2
- **(C)** 3
- **(D)** 4

**Q14. Structured Exception Handling vs C++ Exceptions**

Can C++ catch (...) catch hardware exceptions like division by zero in standard C++?

```cpp
int x = 5 / 0;
```

- **(A)** Yes, catch(...) catches all signals and hardware faults
- **(B)** No, division by zero is undefined behavior and not a C++ throw
- **(C)** Yes, throws std::overflow_error
- **(D)** Yes, throws std::runtime_error

**Q15. Recursive Factorial Overflow**

At what value of n does factorial n! exceed standard 32-bit signed int capacity (2 * 10^9)?

```cpp
int fact(int n);
```

- **(A)** 10
- **(B)** 13
- **(C)** 16
- **(D)** 20

**Q16. Vector Resize vs Reserve**

What is the key difference between v.reserve(10) and v.resize(10)?

```cpp
vector<int> v;
```

- **(A)** reserve changes capacity without adding elements; resize changes size and default-constructs elements
- **(B)** reserve adds elements; resize only allocates memory
- **(C)** Both perform the exact same operation
- **(D)** resize only works with pointers

**Q17. String find_first_of**

What does s.find_first_of("aeiou") search for?

```cpp
string s = "cryptic"; size_t pos = s.find_first_of("aeiou");
```

- **(A)** The exact substring "aeiou"
- **(B)** The first occurrence of ANY vowel character present in "aeiou"
- **(C)** The last vowel in s
- **(D)** Returns true or false

**Q18. Inline Function Keyword Meaning in Modern C++**

What is the primary role of the inline keyword in modern C++?

```cpp
inline int helper() { return 42; }
```

- **(A)** Guarantees the compiler will never create a function call instruction
- **(B)** Allows a function definition to appear in multiple translation units without ODR violation
- **(C)** Makes the function execute in a separate thread
- **(D)** Places the function in CPU cache

**Q19. Lambda State with Mutable**

What is the output of the following lambda code?

```cpp
#include <iostream>
using namespace std;
int main() {
    int a = 5;
    auto f = [a]() mutable { return ++a; };
    cout << f() << " ";
    cout << f() << " ";
    cout << a << endl;
    return 0;
}
```

- **(A)** 6 7 5
- **(B)** 6 7 7
- **(C)** 6 6 5
- **(D)** 5 6 5

**Q20. Unordered Map Hash Collisions Complexity**

What is the worst-case time complexity of lookup in std::unordered_map when all keys collide?

```cpp
unordered_map<int, int> mp;
```

- **(A)** O(1)
- **(B)** O(log N)
- **(C)** O(N)
- **(D)** O(N log N)

### Set 5 — Java

**Q1. ThreadLocal Storage Isolation**

What is the purpose of ThreadLocal<T> in Java?

```java
ThreadLocal<Integer> threadId = ThreadLocal.withInitial(() -> 1);
```

- **(A)** Shares variables globally across all threads
- **(B)** Provides thread-local variables where each accessing thread has its own independently initialized copy
- **(C)** Prevents thread creation
- **(D)** Performs lock-free CAS on primitives

**Q2. Sealed Classes (Java 17)**

What modifier restricts which other classes or interfaces may extend or implement a class in Java 17+?

```java
public sealed class Shape permits Circle, Square {}
```

- **(A)** final
- **(B)** sealed
- **(C)** restricted
- **(D)** locked

**Q3. Happens-Before Relationship**

In the Java Memory Model, which action establishes a happens-before relationship?

```java
volatile int flag;
```

- **(A)** A plain read of a non-volatile variable
- **(B)** A write to a volatile variable happens-before every subsequent read of that same volatile variable
- **(C)** Calling Thread.yield()
- **(D)** Creating an array

**Q4. Equals and HashCode Contract Violation**

What occurs if two objects are equal according to equals() but return different hashCodes when used in a HashSet?

```java
obj1.equals(obj2) == true but obj1.hashCode() != obj2.hashCode()
```

- **(A)** HashSet throws HashCollisionException
- **(B)** HashSet may treat them as distinct elements and add both, violating set uniqueness
- **(C)** The JVM automatically averages their hash codes
- **(D)** HashSet replaces obj1 with obj2

**Q5. Stream Reduce Identity Element**

What is the result of Stream.of(1, 2, 3, 4).reduce(10, (a, b) -> a + b)?

```java
int sum = Stream.of(1, 2, 3, 4).reduce(10, (a, b) -> a + b);
System.out.println(sum);
```

- **(A)** 10
- **(B)** 20
- **(C)** 24
- **(D)** 14

**Q6. Pattern Matching for Instanceof (Java 16+)**

What is the syntax for pattern matching with instanceof in modern Java?

```java
if (obj instanceof String s) { System.out.println(s.length()); }
```

- **(A)** Requires explicit casting (String) obj inside the block
- **(B)** Automatically casts and binds obj to pattern variable s if the type matches
- **(C)** Only works with primitives
- **(D)** Deprecated in Java 17

**Q7. AtomicInteger Compare-And-Set (CAS)**

What does atomicInt.compareAndSet(expected, update) do?

```java
AtomicInteger ai = new AtomicInteger(5);
boolean success = ai.compareAndSet(5, 10);
```

- **(A)** Always sets the value to 10
- **(B)** Atomically sets the value to update if and only if the current value equals expected, returning true
- **(C)** Throws an exception if expected does not match
- **(D)** Locks the object indefinitely

**Q8. CompletableFuture supplyAsync**

By default, what thread pool does CompletableFuture.supplyAsync() use if no executor is specified?

```java
CompletableFuture.supplyAsync(() -> "data");
```

- **(A)** Executors.newSingleThreadExecutor()
- **(B)** ForkJoinPool.commonPool()
- **(C)** Executors.newCachedThreadPool()
- **(D)** The main calling thread

**Q9. Reflection setAccessible Meaning**

What does field.setAccessible(true) allow through Java reflection?

```java
Field field = clazz.getDeclaredField("secret"); field.setAccessible(true);
```

- **(A)** Allows reading and modifying private or protected fields bypassing Java language access control checks
- **(B)** Makes the field public permanently
- **(C)** Saves the field to disk
- **(D)** Compiles the field into C++

**Q10. Classloader Hierarchy Delegation**

What is the top-most root class loader in the standard JVM classloader hierarchy?

```java
ClassLoader cl;
```

- **(A)** Application ClassLoader (System)
- **(B)** Platform / Extension ClassLoader
- **(C)** Bootstrap ClassLoader
- **(D)** Custom ClassLoader

**Q11. ArrayDeque vs LinkedList for Queue**

Why is ArrayDeque generally faster than LinkedList when used as a Queue or Stack in Java?

```java
Queue<Integer> q = new ArrayDeque<>();
```

- **(A)** ArrayDeque is synchronized
- **(B)** ArrayDeque uses contiguous array memory offering better cache locality and avoiding per-node object allocation overhead
- **(C)** LinkedList has O(N) insertion at ends
- **(D)** ArrayDeque allows null elements

**Q12. Enum Singleton Safety**

Why did Joshua Bloch recommend an enum as the best way to implement a singleton in Java?

```java
public enum Singleton { INSTANCE; }
```

- **(A)** It runs on multiple JVMs
- **(B)** It provides unconditional guarantees against multiple instantiations, even through serialization or reflection attacks
- **(C)** It uses 0 bytes of heap
- **(D)** It does not require JVM

**Q13. Static Nested vs Inner Class**

What distinguishes a static nested class from a non-static inner class in Java?

```java
class Outer { static class S {} class I {} }
```

- **(A)** A static nested class does not have an implicit reference to an enclosing instance of Outer
- **(B)** An inner class cannot access private members of Outer
- **(C)** Static nested classes cannot have constructors
- **(D)** There is no difference

**Q14. Cleaner vs Finalizer**

Why does java.lang.ref.Cleaner provide better cleanup safety than Object.finalize() in modern Java?

```java
Cleaner cleaner = Cleaner.create();
```

- **(A)** Cleaning actions are managed in separate threads without holding strong references to the object being reclaimed
- **(B)** Cleaner immediately deletes files on disk
- **(C)** Cleaner disables garbage collection
- **(D)** Cleaner runs synchronously before main exits

**Q15. SoftReference vs WeakReference**

Under what condition does the JVM Garbage Collector clear SoftReferences compared to WeakReferences?

```java
SoftReference<byte[]> softRef = new SoftReference<>(new byte[1024]);
```

- **(A)** WeakReferences are cleared only when OutOfMemoryError is thrown
- **(B)** WeakReferences are cleared during the next GC cycle; SoftReferences are retained until memory pressure requires reclamation
- **(C)** SoftReferences are never garbage collected
- **(D)** Both are identical

**Q16. String.join Delimiter Behavior**

What is the output of String.join("-", "A", "B", "C") in Java?

```java
System.out.println(String.join("-", "A", "B", "C"));
```

- **(A)** -A-B-C-
- **(B)** A-B-C
- **(C)** ABC-
- **(D)** Compilation error

**Q17. Text Blocks in Java 15+**

What is the syntax for multi-line Text Blocks introduced in Java 15?

```java
String html = """
              <html>
              </html>""";
```

- **(A)** Enclosed with triple double-quotes """ with opening delimiter followed by a line break
- **(B)** Enclosed with single quotes '''
- **(C)** Enclosed with backticks ```
- **(D)** Enclosed with <<<

**Q18. Var Local Variable Type Inference (Java 10+)**

Where can the var keyword NOT be used in Java?

```java
var x = 10;
```

- **(A)** For local variables inside methods
- **(B)** For method parameters, return types, and class fields
- **(C)** Inside for loops
- **(D)** With try-with-resources

**Q19. HashMap Load Factor and Rehash**

What is the default load factor of java.util.HashMap and when does resizing occur?

```java
Map<Integer, Integer> map = new HashMap<>();
```

- **(A)** 0.50 (resizes when half full)
- **(B)** 0.75 (resizes when size exceeds 75% of current capacity)
- **(C)** 1.0 (resizes when 100% full)
- **(D)** 0.90

**Q20. Record Component Immutability Caveat**

If a Java record contains a List field record Team(List<String> members), is the list immutable?

```java
record Team(List<String> members) {}
```

- **(A)** Yes, records automatically make all collections deeply immutable
- **(B)** No, while the reference members is final, the list contents remain mutable unless explicitly wrapped in Collections.unmodifiableList
- **(C)** Records cannot contain collections
- **(D)** Throws RecordFieldException

### Set 5 — Python

**Q1. Chainmap from Collections**

What does collections.ChainMap do?

```python
from collections import ChainMap
cm = ChainMap(d1, d2)
```

- **(A)** Merges two dictionaries permanently
- **(B)** Groups multiple dictionaries together into a single updateable view with precedence given to the first map
- **(C)** Creates a bidirectional hash map
- **(D)** Locks dictionaries from writes

**Q2. Counter Most Common**

What does Counter("abracadabra").most_common(2) return?

```python
from collections import Counter
print(Counter("abracadabra").most_common(2))
```

- **(A)** [("a", 5), ("b", 2)]
- **(B)** [("a", 5), ("r", 2)]
- **(C)** ["a", "b"]
- **(D)** {"a": 5, "b": 2}

**Q3. String Formatted Raw String**

What does r"C:\new\test" do?

```python
path = r"C:\new\test"
print(path)
```

- **(A)** Interprets \n as a newline character
- **(B)** Treats backslashes as literal characters without escape interpretation
- **(C)** Reverses the string
- **(D)** Raises SyntaxError

**Q4. Bitwise NOT of Integer**

What is the value of ~5 in Python?

```python
print(~5)
```

- **(A)** -5
- **(B)** -6
- **(C)** 6
- **(D)** -4

**Q5. List Clear vs New List Assignment**

What is the difference between lst.clear() and lst = [] when other variables reference lst?

```python
a = [1, 2]; b = a
```

- **(A)** Both modify b
- **(B)** lst.clear() empties the list in-place affecting b; lst = [] rebinds lst, leaving b unchanged
- **(C)** lst.clear() causes MemoryError
- **(D)** No difference

**Q6. Type of Type in Python**

What does type(type) return in Python?

```python
print(type(type))
```

- **(A)** <class "object">
- **(B)** <class "type">
- **(C)** <class "class">
- **(D)** <class "meta">

**Q7. Slots Optimization Benefit**

What is the primary benefit of declaring __slots__ in a Python class?

```python
class Point: __slots__ = ("x", "y")
```

- **(A)** Restricts instance attributes, eliminating per-instance __dict__ and drastically reducing memory usage
- **(B)** Makes attributes immutable like a tuple
- **(C)** Enables multithreading
- **(D)** Automatically implements getters and setters

**Q8. Yield From Syntax (Python 3.3+)**

What does yield from sub_generator() do?

```python
def gen(): yield from [1, 2, 3]
```

- **(A)** Creates a sub-thread
- **(B)** Delegates yielding elements and two-way communication directly to the sub-generator/iterable
- **(C)** Caches results in memory
- **(D)** Terminates the generator

**Q9. Frozenset Immutability**

Can a frozenset be added to another set in Python?

```python
s = set()
fs = frozenset([1, 2])
s.add(fs)
```

- **(A)** No, TypeError: unhashable type
- **(B)** Yes, because frozenset is immutable and hashable
- **(C)** Only if empty
- **(D)** Raises ValueError

**Q10. Operator Itemgetter Performance**

What does operator.itemgetter(1) do?

```python
from operator import itemgetter
f = itemgetter(1)
print(f([10, 20, 30]))
```

- **(A)** 10
- **(B)** 20
- **(C)** 30
- **(D)** [10, 20]

**Q11. Property Decorator Getter and Setter**

What does the @property decorator create on a class method?

```python
class Circle:
    @property
    def radius(self): return self._r
```

- **(A)** A static class attribute
- **(B)** A managed attribute that can be read with dot notation without parentheses circle.radius
- **(C)** A private variable
- **(D)** A classmethod

**Q12. Keyword-Only Arguments Syntax**

How are keyword-only arguments defined in a Python function header?

```python
def process(data, *, timeout=10): ...
```

- **(A)** By prefixing arguments with **
- **(B)** By placing them after a bare asterisk * in the parameter list
- **(C)** By naming them with uppercase letters
- **(D)** By using the @keyword decorator

**Q13. Itertools Combinations vs Permutations**

What is the length of list(itertools.combinations([1, 2, 3], 2)) vs permutations([1, 2, 3], 2)?

```python
import itertools
```

- **(A)** 3 and 6
- **(B)** 6 and 3
- **(C)** 3 and 3
- **(D)** 6 and 6

**Q14. Dunder Call Callable Instances**

What allows an instance of a Python class to be called like a function obj()?

```python
class Adder:
    def __call__(self, x): return x + 10
```

- **(A)** Defining __init__
- **(B)** Defining the __call__ special method
- **(C)** Inheriting from FunctionType
- **(D)** Using the @callable decorator

**Q15. Zip Strict Parameter (Python 3.10+)**

What happens if zip(a, b, strict=True) receives iterables of different lengths in Python 3.10+?

```python
zip([1, 2], [1, 2, 3], strict=True)
```

- **(A)** Truncates silently
- **(B)** Raises ValueError: zip() argument 2 is longer than argument 1
- **(C)** Pads with None
- **(D)** Warning only

**Q16. Math Isclose Floating Tolerance**

Why is math.isclose(a, b) preferred over a == b for floats in Python?

```python
import math
print(math.isclose(0.1 + 0.2, 0.3))
```

- **(A)** It runs faster
- **(B)** It compares equality within a small relative/absolute numerical tolerance (epsilon) avoiding IEEE 754 precision issues
- **(C)** It converts floats to strings
- **(D)** It returns an integer

**Q17. String Translation Table**

What pair of functions in the str class creates and applies character mappings?

```python
trans = str.maketrans("aeiou", "12345")
print("apple".translate(trans))
```

- **(A)** str.map and str.apply
- **(B)** str.maketrans and str.translate
- **(C)** str.replace_all
- **(D)** str.sub

**Q18. Collections Deque O(1) Appends**

Why is collections.deque preferred over list for FIFO queues?

```python
from collections import deque
q = deque()
```

- **(A)** deque uses less memory
- **(B)** deque provides O(1) time complexity for appends and pops from both ends, whereas list.pop(0) is O(N)
- **(C)** deque elements are automatically sorted
- **(D)** deque allows duplicate keys

**Q19. Weakref Non-Owning References**

What is the purpose of the weakref module in Python?

```python
import weakref
```

- **(A)** Creates variables that are automatically encrypted
- **(B)** Creates references to objects without increasing their reference count, avoiding circular reference leaks
- **(C)** Makes garbage collection slower
- **(D)** Forces immediate object deletion

**Q20. Hash Invariance Requirement**

What is the fundamental rule regarding __hash__ and __eq__ in Python?

```python
a == b implies hash(a) == hash(b)
```

- **(A)** If two objects are equal (a == b), their hash values MUST be equal
- **(B)** If two objects have equal hashes, they must be equal
- **(C)** Hash must return a negative number
- **(D)** Hash can change at any time

---

## Round 2 — Set 1: Maximum Subarray Sum with At Most K Distinct Elements

Given an array of n integers and an integer k, find the maximum sum of a contiguous subarray such that the subarray contains at most k distinct elements.

Input Format:
- First line: Two integers n and k (1 <= n <= 10^5, 1 <= k <= n)
- Second line: n space-separated integers arr[0] ... arr[n-1] (-10^4 <= arr[i] <= 10^4)

Output Format:
- A single integer: maximum sum of a contiguous subarray with at most k distinct elements.

Example 1:
Input:
7 2
1 2 1 2 3 4 5
Output:
9
Explanation: Subarray [4, 5] has sum 9 and contains 2 distinct elements (<= 2).

Example 2:
Input:
5 3
-1 -2 -3 -4 -5
Output:
-1

*(See `question_papers/Round2_Set1.md` for language templates)*

---

## Round 2 — Set 2: Container With Most Water

Given n non-negative integers representing heights of vertical lines on the x-axis, find two lines that together with the x-axis form a container that stores the maximum water volume.

Input Format:
- First line: Single integer n (2 <= n <= 10^5)
- Second line: n space-separated non-negative integers representing heights.

Output Format:
- Single integer representing maximum water container volume.

Example 1:
Input:
9
1 8 6 2 5 4 8 3 7
Output:
49
Explanation: The lines at index 1 (height 8) and index 8 (height 7) have width 7. Water = min(8, 7) * 7 = 49.

Example 2:
Input:
2
1 1
Output:
1

*(See `question_papers/Round2_Set2.md` for language templates)*

---

## Round 2 — Set 3: Longest Substring Without Repeating Characters

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

*(See `question_papers/Round2_Set3.md` for language templates)*

---

## Round 2 — Set 4: Product of Array Except Self Without Division

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
The algorithm must run in O(n) time without using the division operator.

Input Format:
- Space-separated integers representing the array nums (2 <= n <= 10^5, -30 <= nums[i] <= 30)

Output Format:
- Space-separated integers representing answer array.

Example 1:
Input:
1 2 3 4
Output:
24 12 8 6

Example 2:
Input:
-1 1 0 -3 3
Output:
0 0 9 0 0

*(See `question_papers/Round2_Set4.md` for language templates)*

---

## Round 2 — Set 5: Search in Rotated Sorted Array

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

*(See `question_papers/Round2_Set5.md` for language templates)*

---

## Round 2 — Set 6: 3Sum Triplets with Zero Sum

Given an integer array nums, return the count of unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Input Format:
- Space-separated integers representing array nums (3 <= n <= 3000, -10^5 <= nums[i] <= 10^5)

Output Format:
- Single integer: the count of unique triplets that sum to 0.

Example 1:
Input:
-1 0 1 2 -1 -4
Output:
2
Explanation: Triplets are [-1, -1, 2] and [-1, 0, 1].

Example 2:
Input:
0 1 1
Output:
0

*(See `question_papers/Round2_Set6.md` for language templates)*

---

## Round 2 — Set 7: Minimum Size Subarray Sum Exceeding Target

Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [nums[l], ..., nums[r]] of which the sum is greater than or equal to target. If there is no such subarray, return 0.

Input Format:
- First line: Integer target (1 <= target <= 10^9)
- Second line: Space-separated positive integers nums (1 <= n <= 10^5)

Output Format:
- Single integer: minimal length of subarray with sum >= target, or 0.

Example 1:
Input:
7
2 3 1 2 4 3
Output:
2
Explanation: The subarray [4, 3] has the minimal length 2 under the problem constraint.

Example 2:
Input:
4
1 4 4
Output:
1

Example 3:
Input:
11
1 1 1 1 1 1 1 1
Output:
0

*(See `question_papers/Round2_Set7.md` for language templates)*

---

## Round 3 — Set 1: Shortest Path with Mandatory Checkpoints

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

*(See `question_papers/Round3_Set1.md` for language templates)*

---

## Round 3 — Set 2: Word Ladder II - Shortest Transformation Sequences Count

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

*(See `question_papers/Round3_Set2.md` for language templates)*

---

## Round 3 — Set 3: Median of Two Sorted Arrays

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

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
Explanation: Merged array = [1, 2, 3, 4] and median is (2 + 3) / 2 = 2.5.

*(See `question_papers/Round3_Set3.md` for language templates)*

---

## Round 3 — Set 4: Trapping Rain Water with Monotonic Stack

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

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
9

*(See `question_papers/Round3_Set4.md` for language templates)*

---

## Round 3 — Set 5: Minimum Window Substring with Exact Multiplicities

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

*(See `question_papers/Round3_Set5.md` for language templates)*

---

## Round 3 — Set 6: Lexicographically Smallest Course Schedule Topological Sort

There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b before taking course a.

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
CYCLE DETECTED

*(See `question_papers/Round3_Set6.md` for language templates)*

---

## Round 3 — Set 7: Subarray Sums Divisible by K

Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.
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
1

*(See `question_papers/Round3_Set7.md` for language templates)*

---

