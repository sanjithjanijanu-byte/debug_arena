# Round 1 — MCQ Qualification Round (Set 2)

**Instructions:**
- Time: 30 Minutes
- Total Questions: 20 Questions
- Marking: +10 Points for each correct answer. No negative marking.
- Answer all questions for your chosen programming language.

---

## Section: C++

### Q1. Bitwise XOR Identity

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

**Options:**
- **(A)** 12
- **(B)** 25
- **(C)** 0
- **(D)** 37

---

### Q2. Size of Pointer vs Array

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

**Options:**
- **(A)** 40 40
- **(B)** 8 40
- **(C)** 4 40
- **(D)** 8 8

---

### Q3. Pre vs Post Decrement

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

**Options:**
- **(A)** 3 8
- **(B)** 3 7
- **(C)** 4 8
- **(D)** 4 7

---

### Q4. Static Local Variable

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

**Options:**
- **(A)** 15 15
- **(B)** 15 20
- **(C)** 10 15
- **(D)** 20 25

---

### Q5. String Concatenation with Literals

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

**Options:**
- **(A)** Prints Hello, World!
- **(B)** Compilation Error: cannot add two string literals
- **(C)** Prints Hello
- **(D)** Undefined behavior

---

### Q6. Short-Circuit Logical AND

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

**Options:**
- **(A)** 10
- **(B)** 11
- **(C)** 12
- **(D)** 13

---

### Q7. Const Reference Binding

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

**Options:**
- **(A)** 10
- **(B)** 20
- **(C)** Compilation error
- **(D)** Undefined behavior

---

### Q8. Default Vector Initialization

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

**Options:**
- **(A)** 4 7
- **(B)** 7 4
- **(C)** 4 0
- **(D)** 2 7

---

### Q9. Ternary Operator Associativity

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

**Options:**
- **(A)** 2
- **(B)** 3
- **(C)** 10
- **(D)** 20

---

### Q10. Reference vs Pointer Reassignment

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

**Options:**
- **(A)** 5 25
- **(B)** 25 15
- **(C)** 25 25
- **(D)** 15 25

---

### Q11. Integer Overflow in C++

What is the behavior of signed integer overflow according to C++ standard?

```cpp
int a = 2147483647; a = a + 1;
```

**Options:**
- **(A)** Wraps to -2147483648 reliably
- **(B)** Throws an OverflowException
- **(C)** Undefined Behavior
- **(D)** Compile-time error

---

### Q12. Virtual Destructor Necessity

Why should a base class have a virtual destructor in C++?

```cpp
class Base { public: virtual ~Base() {} };
```

**Options:**
- **(A)** To allow pure virtual methods
- **(B)** To ensure derived class destructors are called when deleting via base pointer
- **(C)** To prevent instantiation of the base class
- **(D)** To automatically delete pointers in derived classes

---

### Q13. Vector push_back vs emplace_back

What is the primary advantage of emplace_back over push_back?

```cpp
vector<pair<int, int>> v; v.emplace_back(1, 2);
```

**Options:**
- **(A)** emplace_back always allocates half the memory
- **(B)** emplace_back constructs elements in-place avoiding redundant copies/moves
- **(C)** push_back does not work with custom objects
- **(D)** emplace_back is thread-safe while push_back is not

---

### Q14. Lambda Capture by Reference

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

**Options:**
- **(A)** 10
- **(B)** 15
- **(C)** 5
- **(D)** Compilation error

---

### Q15. Do-While Loop Condition

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

**Options:**
- **(A)** 0 times, prints 5
- **(B)** 1 time, prints 7
- **(C)** Infinite loop
- **(D)** 2 times, prints 9

---

### Q16. Structured Binding (C++17)

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

**Options:**
- **(A)** 42: Answer
- **(B)** Answer: 42
- **(C)** Compilation error
- **(D)** p: 42 Answer

---

### Q17. String find Return on Failure

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

**Options:**
- **(A)** -1
- **(B)** string::npos
- **(C)** 0
- **(D)** NULL

---

### Q18. Unordered Map Operator[] Insertion

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

**Options:**
- **(A)** Throws out_of_range exception
- **(B)** Prints 0 1
- **(C)** Prints 0 0
- **(D)** Compilation error

---

### Q19. Recursive Base Case Off-by-One

What is the return value of mystery(3)?

```cpp
int mystery(int n) {
    if (n <= 0) return 1;
    return n * mystery(n - 2);
}
```

**Options:**
- **(A)** 3
- **(B)** 6
- **(C)** 1
- **(D)** 0

---

### Q20. Unique Pointer Move Semantics

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

**Options:**
- **(A)** Both point to 10 with shared ownership
- **(B)** p1 is set to nullptr
- **(C)** Compilation error because copy constructor is deleted
- **(D)** Runtime segmentation fault

---

## Section: Java

### Q1. Integer Cache in Java

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

**Options:**
- **(A)** true true
- **(B)** true false
- **(C)** false false
- **(D)** false true

---

### Q2. Finally Block Execution with Return

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

**Options:**
- **(A)** 10
- **(B)** 20
- **(C)** Compilation error
- **(D)** 30

---

### Q3. String Immutability and concat

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

**Options:**
- **(A)** Java 17
- **(B)** Java
- **(C)** null
- **(D)** Compilation error

---

### Q4. Static Method Overriding (Hiding)

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

**Options:**
- **(A)** Super 
- **(B)** Sub 
- **(C)** Super Sub 
- **(D)** Compilation error

---

### Q5. ConcurrentModificationException in For-Each

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

**Options:**
- **(A)** Removes B successfully
- **(B)** ConcurrentModificationException
- **(C)** Infinite loop
- **(D)** IndexOutOfBoundsException

---

### Q6. Bitwise Unsigned Right Shift

What is the output of -8 >>> 1 in Java?

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(-8 >>> 1 > 0);
    }
}
```

**Options:**
- **(A)** true
- **(B)** false
- **(C)** -4
- **(D)** Compilation error

---

### Q7. Array Polymorphism and ArrayStoreException

What happens at runtime in this code?

```java
public class Main {
    public static void main(String[] args) {
        Object[] arr = new String[3];
        arr[0] = 42;
    }
}
```

**Options:**
- **(A)** Compiles and runs normally
- **(B)** ClassCastException at compile time
- **(C)** ArrayStoreException at runtime
- **(D)** NullPointerException

---

### Q8. StringBuilder Capacity Growth

What is the default initial capacity of new StringBuilder() in Java?

```java
StringBuilder sb = new StringBuilder();
```

**Options:**
- **(A)** 0
- **(B)** 8
- **(C)** 16
- **(D)** 32

---

### Q9. Ternary Operator Auto-Unboxing NullPointerException

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

**Options:**
- **(A)** NullPointerException
- **(B)** Prints false without error
- **(C)** Compilation error
- **(D)** Prints true

---

### Q10. Final Variable Reassignment

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

**Options:**
- **(A)** No error
- **(B)** Compilation error in reset(): cannot assign a value to final variable x
- **(C)** Runtime FinalAssignmentException
- **(D)** Warning only

---

### Q11. Switch Expression Exhaustiveness

Since Java 14, what is required for switch expressions returning a value?

```java
int res = switch(val) { case 1 -> 10; default -> 0; };
```

**Options:**
- **(A)** Must use break
- **(B)** Must cover all possible input values (exhaustive), often requiring default
- **(C)** Must only switch on Strings
- **(D)** Cannot return primitive types

---

### Q12. HashMap get with Key hashCode Mutation

What happens if a key object in a HashMap is mutated after insertion altering its hashCode?

```java
Map<Person, String> map = new HashMap<>();
```

**Options:**
- **(A)** The key is automatically rehashed
- **(B)** map.get(key) will likely return null because the bucket lookup looks in the new hash index
- **(C)** Throws KeyMutatedException
- **(D)** HashMap prevents object mutation

---

### Q13. Interface Default Method Resolution

If a class implements two interfaces having the exact same default method signature, what must the class do?

```java
interface A { default void m() {} } interface B { default void m() {} }
```

**Options:**
- **(A)** Automatically calls interface A method
- **(B)** Must explicitly override the method to resolve the ambiguity or compile error occurs
- **(C)** Both default methods execute in sequence
- **(D)** Interfaces cannot have default methods

---

### Q14. Garbage Collection System.gc Guarantee

What does calling System.gc() guarantee in Java?

```java
System.gc();
```

**Options:**
- **(A)** Immediately reclaims all unreferenced heap memory
- **(B)** It is merely a hint/request to the JVM; there is no guarantee GC will run immediately
- **(C)** Forces Stop-The-World full GC synchronously
- **(D)** Throws UnsupportedOperationException in modern JVMs

---

### Q15. Covariant Return Types

Can an overriding method in a subclass return a subtype of the return type declared in the superclass?

```java
class Animal {} class Dog extends Animal {}
class Shelter { Animal get() { return new Animal(); } }
class DogShelter extends Shelter { Dog get() { return new Dog(); } }
```

**Options:**
- **(A)** No, return types must match exactly in Java
- **(B)** Yes, Java supports covariant return types since Java 5
- **(C)** Only if methods are static
- **(D)** Only with generics

---

### Q16. Volatile Keyword Guarantee

What does the volatile keyword guarantee for a variable in Java?

```java
private volatile boolean running = true;
```

**Options:**
- **(A)** Mutual exclusion and atomic compound operations (like ++)
- **(B)** Memory visibility across threads (reads/writes directly to main memory) and instruction reordering prevention
- **(C)** Immutable state
- **(D)** Prevents garbage collection

---

### Q17. Cloneable Interface Marker

What method is declared inside the java.lang.Cloneable interface?

```java
public interface Cloneable {}
```

**Options:**
- **(A)** public Object clone();
- **(B)** public Object copy();
- **(C)** No methods; it is a marker interface
- **(D)** public void cloneObject();

---

### Q18. Try-With-Resources AutoCloseable

In try-with-resources, in what order are multiple declared resources closed?

```java
try (Resource r1 = new Resource(); Resource r2 = new Resource()) { ... }
```

**Options:**
- **(A)** In the exact order of declaration (r1 first, then r2)
- **(B)** In reverse order of declaration (r2 first, then r1)
- **(C)** Simultaneously in background threads
- **(D)** Arbitrary JVM order

---

### Q19. String intern() Pool

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

**Options:**
- **(A)** true
- **(B)** false
- **(C)** Compilation error
- **(D)** Throws NullPointerException

---

### Q20. Generics Type Erasure

What happens to generic type parameters like List<String> after Java compilation?

```java
List<String> list = new ArrayList<>();
```

**Options:**
- **(A)** Type information is retained in runtime bytecode for reflection
- **(B)** Type parameters are erased and replaced by their bounds (or Object) with necessary casts
- **(C)** A new compiled class List_String is created
- **(D)** Generics are interpreted at runtime by the JIT

---

## Section: Python

### Q1. Default Mutable Argument Trap

What is the output of the following Python code?

```python
def append_to(element, target=[]):
    target.append(element)
    return target

print(append_to(1))
print(append_to(2))
```

**Options:**
- **(A)** [1] then [2]
- **(B)** [1] then [1, 2]
- **(C)** [1, 2] then [1, 2]
- **(D)** TypeError

---

### Q2. Integer Caching (-5 to 256)

What is the output of this Python identity check?

```python
a = 256
b = 256
c = 257
d = 257
print(a is b, c is d)
```

**Options:**
- **(A)** True True
- **(B)** True False
- **(C)** False False
- **(D)** False True

---

### Q3. Tuple with Mutable Element Mutation

What happens when executing this Python code?

```python
t = ([1, 2], 3)
t[0].append(99)
print(t)
```

**Options:**
- **(A)** TypeError: tuple is immutable
- **(B)** ([1, 2, 99], 3)
- **(C)** ([1, 2], 3, 99)
- **(D)** AttributeError

---

### Q4. List Comprehension Variable Leak (Python 3)

What is the output of this code in Python 3?

```python
x = 100
squares = [x * x for x in range(3)]
print(x)
```

**Options:**
- **(A)** 2
- **(B)** 4
- **(C)** 100
- **(D)** NameError

---

### Q5. String Multiplication and Join

What is the result of "-".join(["a", "b"] * 2)?

```python
print("-".join(["a", "b"] * 2))
```

**Options:**
- **(A)** a-b-a-b
- **(B)** a-b*2
- **(C)** aa-bb
- **(D)** ["a", "b", "a", "b"]

---

### Q6. Isinstance with Bool and Int

What does isinstance(True, int) evaluate to in Python?

```python
print(isinstance(True, int))
```

**Options:**
- **(A)** False
- **(B)** True
- **(C)** TypeError
- **(D)** SyntaxError

---

### Q7. Dictionary get Default Value

What does d.get("missing", 42) return when "missing" is not in d?

```python
d = {"a": 1}
print(d.get("missing", 42))
```

**Options:**
- **(A)** KeyError: missing
- **(B)** 42
- **(C)** None
- **(D)** 0

---

### Q8. Generator Yield State

What is printed by this generator function call?

```python
def count():
    yield 1
    yield 2
    yield 3

gen = count()
print(next(gen), next(gen))
```

**Options:**
- **(A)** 1 1
- **(B)** 1 2
- **(C)** 2 3
- **(D)** [1, 2]

---

### Q9. Nonlocal Keyword Purpose

What is the purpose of the nonlocal keyword in Python?

```python
def outer():
    x = 10
    def inner():
        nonlocal x
        x += 1
```

**Options:**
- **(A)** Declares x in the global module scope
- **(B)** Binds x to the nearest enclosing non-global scope variable
- **(C)** Prevents x from being modified
- **(D)** Exports x to other files

---

### Q10. Set Discard vs Remove

What is the difference between s.remove(x) and s.discard(x) when x is not in the set?

```python
s = {1, 2, 3}
```

**Options:**
- **(A)** remove raises KeyError; discard does nothing
- **(B)** discard raises KeyError; remove does nothing
- **(C)** Both raise KeyError
- **(D)** Both remove all elements

---

### Q11. Try Except Else Block

When does the else block execute in a Python try-except-else-finally statement?

```python
try:
    process()
except ValueError:
    pass
else:
    print("Success")
```

**Options:**
- **(A)** Only when an exception occurs
- **(B)** Only when NO exception was raised in the try block
- **(C)** Always, right before finally
- **(D)** Never

---

### Q12. List Pop with Index

What is the return value of [10, 20, 30].pop(1)?

```python
lst = [10, 20, 30]
val = lst.pop(1)
```

**Options:**
- **(A)** 10
- **(B)** 20
- **(C)** 30
- **(D)** [10, 30]

---

### Q13. Unhashable Type in Dictionary Key

Which of the following types CANNOT be used as a dictionary key in Python?

```python
d = {}
```

**Options:**
- **(A)** tuple: (1, 2)
- **(B)** frozenset: frozenset([1, 2])
- **(C)** list: [1, 2]
- **(D)** str: "key"

---

### Q14. All Function on Empty Iterable

What does all([]) evaluate to in Python?

```python
print(all([]))
```

**Options:**
- **(A)** False
- **(B)** True
- **(C)** None
- **(D)** TypeError

---

### Q15. Lambda Sorting by Key

What does sorted([(1, 3), (4, 1), (2, 2)], key=lambda x: x[1]) produce?

```python
data = [(1, 3), (4, 1), (2, 2)]
print(sorted(data, key=lambda x: x[1]))
```

**Options:**
- **(A)** [(1, 3), (2, 2), (4, 1)]
- **(B)** [(4, 1), (2, 2), (1, 3)]
- **(C)** [(1, 3), (4, 1), (2, 2)]
- **(D)** [(4, 1), (1, 3), (2, 2)]

---

### Q16. Enumerate Start Index

What is the first tuple yielded by enumerate(["apple", "banana"], start=1)?

```python
for item in enumerate(["apple", "banana"], start=1):
    print(item); break
```

**Options:**
- **(A)** (0, "apple")
- **(B)** (1, "apple")
- **(C)** ("apple", 1)
- **(D)** (1, "banana")

---

### Q17. String Splitting with Maxsplit

What is the output of "a,b,c,d".split(",", 2)?

```python
print("a,b,c,d".split(",", 2))
```

**Options:**
- **(A)** ["a", "b", "c,d"]
- **(B)** ["a", "b", "c", "d"]
- **(C)** ["a", "b"]
- **(D)** ["a,b", "c,d"]

---

### Q18. Dict Keys Union (Python 3.9+)

What operator merges two dictionaries in Python 3.9+?

```python
d1 = {"a": 1}; d2 = {"b": 2}
```

**Options:**
- **(A)** d1 + d2
- **(B)** d1 | d2
- **(C)** d1 & d2
- **(D)** d1.merge(d2)

---

### Q19. Zip with Unequal Lengths

What is the length of list(zip([1, 2, 3, 4], ["a", "b"]))?

```python
print(len(list(zip([1, 2, 3, 4], ["a", "b"]))))
```

**Options:**
- **(A)** 4
- **(B)** 2
- **(C)** 6
- **(D)** ValueError

---

### Q20. Global Variable Modification Without Declaration

What happens when modifying a global variable without the global keyword?

```python
x = 10
def f():
    x += 1
f()
```

**Options:**
- **(A)** x becomes 11 globally
- **(B)** UnboundLocalError: local variable referenced before assignment
- **(C)** Creates a local variable with value 11
- **(D)** Warning only

---

