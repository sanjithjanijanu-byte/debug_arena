# Round 1 — MCQ Qualification Round (Set 4)

**Instructions:**
- Time: 30 Minutes
- Total Questions: 20 Questions
- Marking: +10 Points for each correct answer. No negative marking.
- Answer all questions for your chosen programming language.

---

## Section: C++

### Q1. C-Style String Length vs Sizeof

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

**Options:**
- **(A)** 4 4
- **(B)** 4 5
- **(C)** 5 5
- **(D)** 5 4

---

### Q2. Default Member Access in Struct vs Class

What is the default access specifier for members of a struct vs class in C++?

```cpp
struct A { int x; }; class B { int y; };
```

**Options:**
- **(A)** struct: public; class: private
- **(B)** struct: private; class: public
- **(C)** struct: protected; class: private
- **(D)** Both are private by default

---

### Q3. Multiple Catch Blocks Ordering

What is the consequence of placing catch (const exception& e) before catch (const runtime_error& e)?

```cpp
try { throw runtime_error("fail"); } catch (const exception& e) {} catch (const runtime_error& e) {}
```

**Options:**
- **(A)** Compilation warning or runtime_error block is unreachable
- **(B)** runtime_error will still catch it
- **(C)** The program terminates immediately
- **(D)** Compile error: duplicate handler

---

### Q4. Pointer Difference

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

**Options:**
- **(A)** 3
- **(B)** 12
- **(C)** 4
- **(D)** Undetermined

---

### Q5. Unsigned Underflow Wrap

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

**Options:**
- **(A)** -1
- **(B)** 4294967295 (UINT_MAX)
- **(C)** 0
- **(D)** Runtime error

---

### Q6. Dynamic Cast Downcasting Failure

What does dynamic_cast<Derived*>(basePtr) return when basePtr does not point to a Derived object?

```cpp
Base* b = new Base(); Derived* d = dynamic_cast<Derived*>(b);
```

**Options:**
- **(A)** Throws bad_cast exception
- **(B)** Returns nullptr
- **(C)** Returns invalid memory address
- **(D)** Aborts the program

---

### Q7. Logical OR Short-Circuit

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

**Options:**
- **(A)** 11 2
- **(B)** 11 3
- **(C)** 1 2
- **(D)** 1 3

---

### Q8. Copy Elision / RVO

What is Return Value Optimization (RVO) in C++?

```cpp
MyClass create() { return MyClass(); }
```

**Options:**
- **(A)** A compiler optimization that avoids copying or moving temporary return objects
- **(B)** A mechanism that automatically places return objects on the heap
- **(C)** A syntax for returning references to local variables
- **(D)** A tool for measuring function execution time

---

### Q9. Pure Virtual Function Syntax

How is a pure virtual function declared in C++?

```cpp
class Shape { ... };
```

**Options:**
- **(A)** virtual void draw() = null;
- **(B)** virtual void draw() = 0;
- **(C)** pure virtual void draw();
- **(D)** abstract void draw();

---

### Q10. Map Key Ordering

In what order does std::map iterate over its elements?

```cpp
#include <map>
using namespace std;
map<int, string> m;
```

**Options:**
- **(A)** Insertion order
- **(B)** Sorted ascending by key
- **(C)** Sorted descending by value
- **(D)** Arbitrary hash order

---

### Q11. Static Member Initialization

Where must non-const static data members of a class typically be defined?

```cpp
class Widget { static int count; };
```

**Options:**
- **(A)** Inside the constructor
- **(B)** Outside the class definition at namespace scope
- **(C)** Inside main()
- **(D)** In the destructor

---

### Q12. Function Overloading by Return Type

Can two functions in C++ differ solely by their return type?

```cpp
int calculate(int x); double calculate(int x);
```

**Options:**
- **(A)** Yes, always
- **(B)** No, causes compilation error
- **(C)** Yes, if one is static
- **(D)** Yes, in C++20 only

---

### Q13. Vector clear vs shrink_to_fit

What does v.clear() do to a vector capacity?

```cpp
vector<int> v(1000); v.clear();
```

**Options:**
- **(A)** Reduces size to 0 and deallocates all memory
- **(B)** Reduces size to 0 but keeps capacity unchanged
- **(C)** Sets all elements to 0 without changing size
- **(D)** Deletes the vector object

---

### Q14. Bitwise NOT of Zero

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

**Options:**
- **(A)** 0
- **(B)** -1
- **(C)** 1
- **(D)** 2147483647

---

### Q15. Initialization Order of Members

In C++, in what order are class member variables initialized?

```cpp
class Test { int b; int a; public: Test(int x) : a(x), b(a) {} };
```

**Options:**
- **(A)** In the order they appear in the constructor initializer list
- **(B)** In the order they are declared in the class definition
- **(C)** Alphabetical order
- **(D)** Unspecified

---

### Q16. Mutable Keyword Purpose

What is the purpose of the mutable keyword on a class member variable?

```cpp
class Cache { mutable int hitCount; };
```

**Options:**
- **(A)** Allows modification inside const member functions
- **(B)** Makes the variable thread-safe
- **(C)** Forces allocation in CPU registers
- **(D)** Allows the variable to change type at runtime

---

### Q17. String find First Occurrence

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

**Options:**
- **(A)** 1 5
- **(B)** 1 3
- **(C)** 0 5
- **(D)** 2 4

---

### Q18. Dangling Reference to Local

What is the danger of returning a reference to a local variable?

```cpp
int& getVal() { int x = 10; return x; }
```

**Options:**
- **(A)** Memory leak
- **(B)** Dangling reference and undefined behavior when accessed
- **(C)** Infinite loop
- **(D)** Compiler converts it to a pointer

---

### Q19. Std All_of Algorithm

What does std::all_of return on an empty range?

```cpp
#include <algorithm>
#include <vector>
using namespace std;
vector<int> v; bool res = all_of(v.begin(), v.end(), [](int x){ return x > 0; });
```

**Options:**
- **(A)** false
- **(B)** true
- **(C)** Undefined behavior
- **(D)** Throws out_of_range

---

### Q20. Explicit Constructor Purpose

What does marking a single-argument constructor explicit prevent?

```cpp
class MyInt { public: explicit MyInt(int x) {} };
```

**Options:**
- **(A)** Prevents dynamic allocation with new
- **(B)** Prevents implicit type conversion and copy-initialization from int
- **(C)** Prevents inheritance from MyInt
- **(D)** Prevents destruction

---

## Section: Java

### Q1. String Substring Indices

What is the output of "ANTIGRAVITY".substring(4, 8)?

```java
System.out.println("ANTIGRAVITY".substring(4, 8));
```

**Options:**
- **(A)** IGRA
- **(B)** GRAV
- **(C)** GRA
- **(D)** IGRAV

---

### Q2. Static Variable Shared Across Instances

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

**Options:**
- **(A)** 1 2
- **(B)** 2 2
- **(C)** 1 1
- **(D)** 0 2

---

### Q3. Catching Exception Order

Why does placing catch(Exception e) before catch(IOException e) cause a compile error in Java?

```java
try { ... } catch (Exception e) {} catch (IOException e) {}
```

**Options:**
- **(A)** Exception does not inherit from Throwable
- **(B)** IOException has already been caught (unreachable catch block)
- **(C)** IOException cannot be caught
- **(D)** Duplicate variable name e

---

### Q4. Floating Point Precision Representation

What does System.out.println(0.1 + 0.2 == 0.3) print in Java?

```java
System.out.println(0.1 + 0.2 == 0.3);
```

**Options:**
- **(A)** true
- **(B)** false
- **(C)** Compilation error
- **(D)** Throws ArithmeticException

---

### Q5. Synchronized Method Lock Target

What lock/monitor does a non-static synchronized method acquire in Java?

```java
public synchronized void update() {}
```

**Options:**
- **(A)** The Class object (MyClass.class)
- **(B)** The current instance object (this)
- **(C)** The JVM process lock
- **(D)** A new ReentrantLock object

---

### Q6. Anonymous Inner Class Variable Capture

What constraint is placed on local variables referenced inside an anonymous inner class / lambda in Java?

```java
int x = 10; Runnable r = () -> System.out.println(x);
```

**Options:**
- **(A)** Must be static
- **(B)** Must be explicitly or effectively final
- **(C)** Must be volatile
- **(D)** Must be declared public

---

### Q7. Queue peek vs poll

What is the difference between Queue.peek() and Queue.poll() when the queue is empty?

```java
Queue<Integer> q = new LinkedList<>();
```

**Options:**
- **(A)** Both return null without removing any element
- **(B)** peek() inspects and returns null; poll() retrieves and removes the head (or returns null)
- **(C)** peek() throws NoSuchElementException; poll() returns null
- **(D)** Both throw NullPointerException

---

### Q8. Transient Keyword Purpose

What is the effect of the transient keyword on an instance variable?

```java
private transient String password;
```

**Options:**
- **(A)** The variable is stored in volatile CPU cache
- **(B)** The variable will not be serialized when the object is serialized
- **(C)** The variable is reset to null every minute
- **(D)** The variable cannot be read by other classes

---

### Q9. Enum values() Return Type

What does Color.values() return for an enum Color { RED, GREEN, BLUE }?

```java
Color[] colors = Color.values();
```

**Options:**
- **(A)** List<Color>
- **(B)** Color[] array containing all enum constants in order of declaration
- **(C)** Set<Color>
- **(D)** Iterator<Color>

---

### Q10. StringBuilder vs StringBuffer Thread Safety

What is the key difference between StringBuilder and StringBuffer?

```java
StringBuilder vs StringBuffer
```

**Options:**
- **(A)** StringBuilder is synchronized and thread-safe; StringBuffer is not
- **(B)** StringBuffer is synchronized and thread-safe; StringBuilder is unsynchronized and faster for single-threaded use
- **(C)** StringBuilder is immutable; StringBuffer is mutable
- **(D)** There is no difference

---

### Q11. Arrays asList Fixed Size

What happens if you call add() on a list created by Arrays.asList("a", "b")?

```java
List<String> list = Arrays.asList("a", "b"); list.add("c");
```

**Options:**
- **(A)** Appends "c" successfully
- **(B)** Throws UnsupportedOperationException
- **(C)** Increases capacity automatically
- **(D)** Overwrites "b"

---

### Q12. Polymorphic Method Resolution with super Reference

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

**Options:**
- **(A)** BC
- **(B)** AC
- **(C)** ABC
- **(D)** C

---

### Q13. Functional Interface Annotation

What is the defining characteristic of an interface marked with @FunctionalInterface?

```java
@FunctionalInterface interface Task { void execute(); }
```

**Options:**
- **(A)** It must contain zero methods
- **(B)** It has exactly one abstract method (SAM)
- **(C)** It cannot contain default or static methods
- **(D)** It must extend Runnable

---

### Q14. HashSet Internal Implementation

What standard data structure is used internally by java.util.HashSet to store elements?

```java
Set<String> set = new HashSet<>();
```

**Options:**
- **(A)** An array of linked lists
- **(B)** A HashMap instance (elements stored as keys with a dummy Object as value)
- **(C)** A Red-Black Tree
- **(D)** A circular buffer

---

### Q15. Strictfp Keyword Meaning

What does the strictfp keyword ensure in Java?

```java
public strictfp class MathUtils {}
```

**Options:**
- **(A)** Forces IEEE 754 strict floating-point calculation rules across all hardware architectures
- **(B)** Disables garbage collection during floating point math
- **(C)** Prevents division by zero exceptions
- **(D)** Increases float precision to 128 bits

---

### Q16. Comparable compareTo Contract

What should a.compareTo(b) return when a is considered greater than b?

```java
int res = a.compareTo(b);
```

**Options:**
- **(A)** 0
- **(B)** A positive integer (> 0)
- **(C)** A negative integer (< 0)
- **(D)** true

---

### Q17. String repeat Method in Java 11+

What does "ab".repeat(3) output in Java 11+?

```java
System.out.println("ab".repeat(3));
```

**Options:**
- **(A)** ababab
- **(B)** ab 3
- **(C)** a3b3
- **(D)** Compilation error

---

### Q18. Deadlock Condition in Multithreading

Which situation is a classic cause of deadlock in Java?

```java
Thread 1 locks Resource A, waits for B; Thread 2 locks Resource B, waits for A
```

**Options:**
- **(A)** Race condition
- **(B)** Circular wait condition between two threads holding mutually requested locks
- **(C)** Starvation
- **(D)** Thread death

---

### Q19. Generics Wildcard Lower Bound

What does List<? super Integer> accept as valid assignments?

```java
List<? super Integer> list;
```

**Options:**
- **(A)** List<Double>
- **(B)** List<Integer>, List<Number>, or List<Object>
- **(C)** List<String>
- **(D)** Only List<Integer>

---

### Q20. System.exit in Try-Finally

Does the finally block execute if System.exit(0) is called inside the try block?

```java
try { System.exit(0); } finally { System.out.println("Clean up"); }
```

**Options:**
- **(A)** Yes, finally always runs unconditionally
- **(B)** No, System.exit immediately halts JVM execution and finally does NOT run
- **(C)** Only in debug mode
- **(D)** Throws SecurityException

---

## Section: Python

### Q1. Copy vs Deepcopy

What does copy.deepcopy() do compared to copy.copy()?

```python
import copy
new_obj = copy.deepcopy(old_obj)
```

**Options:**
- **(A)** Only copies the outermost container
- **(B)** Recursively copies all nested objects, creating completely independent data structures
- **(C)** Converts all elements to immutable tuples
- **(D)** Copies objects into shared memory

---

### Q2. List Insert at Negative Index

What is the output of lst.insert(-1, 99) on [1, 2, 3]?

```python
lst = [1, 2, 3]
lst.insert(-1, 99)
print(lst)
```

**Options:**
- **(A)** [1, 2, 3, 99]
- **(B)** [1, 2, 99, 3]
- **(C)** [99, 1, 2, 3]
- **(D)** IndexError

---

### Q3. Dict Comprehension Inversion

What does {v: k for k, v in {"a": 1, "b": 2}.items()} do?

```python
d = {"a": 1, "b": 2}
inv = {v: k for k, v in d.items()}
print(inv)
```

**Options:**
- **(A)** {"a": 1, "b": 2}
- **(B)** {1: "a", 2: "b"}
- **(C)** {"b": 1, "a": 2}
- **(D)** TypeError

---

### Q4. Staticmethod vs Classmethod Decorators

What argument does a @classmethod receive as its first parameter?

```python
@classmethod def create(cls): ...
```

**Options:**
- **(A)** The instance object (self)
- **(B)** The class object itself (cls)
- **(C)** No arguments
- **(D)** The module object

---

### Q5. String Strip Characters Parameter

What does "xyxHello Worldyxx".strip("xy") return?

```python
print("xyxHello Worldyxx".strip("xy"))
```

**Options:**
- **(A)** Hello World
- **(B)** xHello Worldy
- **(C)** Hello Worldyxx
- **(D)** xyxHello World

---

### Q6. Zip Longest from itertools

What module contains zip_longest for padding exhausted iterables with fillvalue?

```python
from ??? import zip_longest
```

**Options:**
- **(A)** collections
- **(B)** itertools
- **(C)** functools
- **(D)** builtins

---

### Q7. Identity Comparison of Empty Collections

What does [] is [] evaluate to in Python?

```python
print([] is [])
```

**Options:**
- **(A)** True
- **(B)** False
- **(C)** TypeError
- **(D)** SyntaxError

---

### Q8. Context Manager Dunder Methods

Which two special methods must an object implement to be used in a with statement?

```python
with MyContext() as ctx: ...
```

**Options:**
- **(A)** __open__ and __close__
- **(B)** __enter__ and __exit__
- **(C)** __start__ and __stop__
- **(D)** __init__ and __del__

---

### Q9. Defaultdict from collections

What happens when accessing a non-existent key in collections.defaultdict(int)?

```python
from collections import defaultdict
d = defaultdict(int)
print(d["hits"])
```

**Options:**
- **(A)** Raises KeyError
- **(B)** Returns 0 and inserts ("hits", 0) into the dict
- **(C)** Returns None without inserting
- **(D)** Throws TypeError

---

### Q10. Truthy Value of Empty Custom Class

What does bool(MyObj()) evaluate to if the class implements neither __bool__ nor __len__?

```python
class MyObj: pass
print(bool(MyObj()))
```

**Options:**
- **(A)** False
- **(B)** True
- **(C)** None
- **(D)** TypeError

---

### Q11. Lambda Closure Binding Late Evaluation

What does [f() for f in [lambda: i for i in range(3)]] print?

```python
funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])
```

**Options:**
- **(A)** [0, 1, 2]
- **(B)** [2, 2, 2]
- **(C)** [0, 0, 0]
- **(D)** [3, 3, 3]

---

### Q12. Set Symmetric Difference

What operator computes the symmetric difference of two sets (elements in either, but not both)?

```python
s1 = {1, 2}; s2 = {2, 3}
```

**Options:**
- **(A)** s1 & s2
- **(B)** s1 ^ s2
- **(C)** s1 | s2
- **(D)** s1 - s2

---

### Q13. Round Function Half to Even

What does round(2.5) and round(3.5) evaluate to in Python 3?

```python
print(round(2.5), round(3.5))
```

**Options:**
- **(A)** 3 4
- **(B)** 2 4
- **(C)** 2 3
- **(D)** 3 3

---

### Q14. String Join Non-String TypeError

What happens when calling "".join([1, 2, 3]) in Python?

```python
"".join([1, 2, 3])
```

**Options:**
- **(A)** Returns "123"
- **(B)** TypeError: sequence item 0: expected str instance, int found
- **(C)** Returns "[1, 2, 3]"
- **(D)** Returns ""

---

### Q15. Functools Lru Cache

What is the purpose of the @functools.lru_cache decorator?

```python
@lru_cache(maxsize=128) def fib(n): ...
```

**Options:**
- **(A)** Compiles the function with Cython
- **(B)** Memoizes function calls by caching previous return values based on input arguments
- **(C)** Limits recursive depth to 128
- **(D)** Runs the function on a GPU

---

### Q16. Tuple Unpacking with Star Target

What is the value of rest in a, *rest, b = [1, 2, 3, 4, 5]?

```python
a, *rest, b = [1, 2, 3, 4, 5]
print(rest)
```

**Options:**
- **(A)** (2, 3, 4)
- **(B)** [2, 3, 4]
- **(C)** [2, 3]
- **(D)** TypeError

---

### Q17. Assert Statement Disabled with Flag

What command line flag disables assert statements in Python?

```python
python -? script.py
```

**Options:**
- **(A)** -d
- **(B)** -O (optimize flag)
- **(C)** -f
- **(D)** --no-assert

---

### Q18. Dunder Eq and Dunder Hash Relationship

If a class overrides __eq__, what must also be overridden to use instances as dictionary keys?

```python
class Person: def __eq__(self, o): return ...
```

**Options:**
- **(A)** __cmp__
- **(B)** __hash__
- **(C)** __str__
- **(D)** __len__

---

### Q19. Re Match vs Re Search

What is the difference between re.match() and re.search() in the re module?

```python
import re
```

**Options:**
- **(A)** re.match checks only at the beginning of the string; re.search searches throughout the entire string
- **(B)** re.search checks only at the beginning; re.match searches everywhere
- **(C)** re.match returns a list; re.search returns an iterator
- **(D)** No difference

---

### Q20. Sort List In-Place vs Sorted Builtin

What is the return value of lst.sort()?

```python
lst = [3, 1, 2]
res = lst.sort()
print(res)
```

**Options:**
- **(A)** [1, 2, 3]
- **(B)** None
- **(C)** True
- **(D)** 3

---

