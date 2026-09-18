# Round 1 — MCQ Qualification Round (Set 3)

**Instructions:**
- Time: 30 Minutes
- Total Questions: 20 Questions
- Marking: +10 Points for each correct answer. No negative marking.
- Answer all questions for your chosen programming language.

---

## Section: C++

### Q1. Array Pointer Arithmetic

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

**Options:**
- **(A)** 10
- **(B)** 20
- **(C)** 30
- **(D)** 40

---

### Q2. Const Pointer vs Pointer to Const

Which declaration creates a pointer whose address cannot be changed after initialization?

```cpp
int x = 5, y = 10;
```

**Options:**
- **(A)** const int* p = &x;
- **(B)** int const* p = &x;
- **(C)** int* const p = &x;
- **(D)** const int* const* p = &x;

---

### Q3. Enum Class Type Safety

Why does the following code fail to compile in modern C++?

```cpp
enum class Color { Red, Green, Blue };
int x = Color::Red;
```

**Options:**
- **(A)** enum class values must be capitalized
- **(B)** enum class is strongly typed and does not implicitly convert to int
- **(C)** Red must be assigned an explicit integer value
- **(D)** Color must be instantiated with new

---

### Q4. Bitwise Shift Operator

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

**Options:**
- **(A)** 9
- **(B)** 24
- **(C)** 6
- **(D)** 18

---

### Q5. Switch Case Fallthrough

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

**Options:**
- **(A)** 2
- **(B)** 23
- **(C)** 23D
- **(D)** D

---

### Q6. Typeid and Polymorphism

What is required for typeid(*ptr).name() to return the runtime derived class type?

```cpp
Base* ptr = new Derived();
```

**Options:**
- **(A)** Base class must have at least one virtual function
- **(B)** Derived class must inherit virtually
- **(C)** The pointer must be dynamic_cast first
- **(D)** RTTI cannot inspect derived types

---

### Q7. String substr Parameters

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

**Options:**
- **(A)** CDE
- **(B)** CD
- **(C)** BC
- **(D)** DEF

---

### Q8. Vector Capacity vs Size

What does v.capacity() represent?

```cpp
vector<int> v = {1, 2, 3};
```

**Options:**
- **(A)** The current number of elements in the vector
- **(B)** The total allocated storage capacity without needing reallocation
- **(C)** The maximum allowed elements in vector (max_size)
- **(D)** The memory size of a single element

---

### Q9. Auto Type Deduction with References

What is the type of y deduced as?

```cpp
int x = 10;
const int& ref = x;
auto y = ref;
```

**Options:**
- **(A)** const int&
- **(B)** int&
- **(C)** int
- **(D)** const int

---

### Q10. Comma Operator Evaluation

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

**Options:**
- **(A)** 5
- **(B)** 9
- **(C)** 45
- **(D)** 20

---

### Q11. Smart Pointer Cycle Memory Leak

What problem occurs when two std::shared_ptr instances reference each other?

```cpp
struct Node { shared_ptr<Node> next; };
```

**Options:**
- **(A)** Compilation error
- **(B)** Circular reference causing reference counts never to reach zero (memory leak)
- **(C)** Double free error on termination
- **(D)** Stack overflow exception

---

### Q12. Set Insertion Duplicate Behavior

What does s.insert(10) do when 10 already exists in std::set<int>?

```cpp
#include <set>
using namespace std;
set<int> s = {10, 20}; auto res = s.insert(10);
```

**Options:**
- **(A)** Throws duplicate_key exception
- **(B)** Overwrites existing 10
- **(C)** Does nothing and returns pair<iterator, bool> where bool is false
- **(D)** Adds 10 at the end

---

### Q13. Friend Function Access

What privilege does a friend function have in C++?

```cpp
class Box { friend void inspect(Box b); };
```

**Options:**
- **(A)** It inherits from Box
- **(B)** It has access to private and protected members of Box
- **(C)** It becomes a member function of Box
- **(D)** It can only access public members of Box

---

### Q14. Constexpr Function Evaluation

What does constexpr specifier guarantee when invoked with constant expressions?

```cpp
constexpr int square(int x) { return x * x; }
```

**Options:**
- **(A)** Always evaluates at runtime
- **(B)** Can be evaluated at compile time
- **(C)** Can never accept runtime arguments
- **(D)** Inlines the function unconditionally

---

### Q15. Char Array Null Terminator Off-by-One

What happens if a char array of size 5 is initialized with "HELLO"?

```cpp
char str[5] = "HELLO";
```

**Options:**
- **(A)** str is validly null-terminated
- **(B)** Compile error or lacks null terminator because "HELLO" needs 6 bytes
- **(C)** Silent truncation to "HELL"
- **(D)** Buffer overflow at compile time

---

### Q16. Vector pop_back on Empty Vector

What happens if v.pop_back() is called on an empty std::vector?

```cpp
vector<int> v; v.pop_back();
```

**Options:**
- **(A)** Throws std::underflow_error
- **(B)** Undefined Behavior
- **(C)** Returns false
- **(D)** Does nothing safely

---

### Q17. Destructor Call Order in Inheritance

In what order are destructors called for a derived object?

```cpp
class Derived : public Base {};
```

**Options:**
- **(A)** Base first, then Derived
- **(B)** Derived first, then Base
- **(C)** Simultaneously in parallel
- **(D)** Arbitrary order decided by compiler

---

### Q18. std::move State After Move

What is guaranteed about an object after being moved with std::move?

```cpp
string s1 = "Hello"; string s2 = std::move(s1);
```

**Options:**
- **(A)** s1 is guaranteed to be empty string ""
- **(B)** s1 is in a valid but unspecified state
- **(C)** s1 becomes a dangling pointer
- **(D)** s1 retains its original value "Hello"

---

### Q19. Float to Int Conversion Truncation

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

**Options:**
- **(A)** -4
- **(B)** -3
- **(C)** -3.75
- **(D)** 3

---

### Q20. Priority Queue Default Ordering

By default, what type of heap does std::priority_queue implement?

```cpp
#include <queue>
using namespace std;
priority_queue<int> pq;
```

**Options:**
- **(A)** Min-heap (smallest element on top)
- **(B)** Max-heap (largest element on top)
- **(C)** FIFO queue
- **(D)** LIFO stack

---

## Section: Java

### Q1. Pass-by-Value Object Reference Reassignment

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

**Options:**
- **(A)** Goodbye
- **(B)** Hello World
- **(C)** Hello 
- **(D)** Hello Goodbye

---

### Q2. Static Initializer Block Order

In what sequence do static blocks, instance initializers, and constructors execute?

```java
class Demo {
    static { System.out.print("S "); }
    { System.out.print("I "); }
    Demo() { System.out.print("C "); }
}
```

**Options:**
- **(A)** S I C
- **(B)** I S C
- **(C)** C I S
- **(D)** I C S

---

### Q3. Array Equality Check

What does arr1.equals(arr2) evaluate to for two distinct arrays with identical contents?

```java
int[] a1 = {1, 2, 3}; int[] a2 = {1, 2, 3}; System.out.println(a1.equals(a2));
```

**Options:**
- **(A)** true
- **(B)** false
- **(C)** Compilation error
- **(D)** 1

---

### Q4. Polymorphism with Instance Variables

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

**Options:**
- **(A)** 10
- **(B)** 20
- **(C)** Compilation error
- **(D)** 0

---

### Q5. Super Constructor Call Constraint

Where must a super() constructor call be located inside a subclass constructor?

```java
public SubClass() { ... }
```

**Options:**
- **(A)** Anywhere inside the constructor body
- **(B)** Must be the very first statement
- **(C)** Must be the last statement
- **(D)** Inside a finally block

---

### Q6. TreeMap Natural Ordering Key Requirement

What interface must keys implement to be used in a default TreeMap?

```java
Map<MyKey, String> map = new TreeMap<>();
```

**Options:**
- **(A)** Serializable
- **(B)** Cloneable
- **(C)** Comparable
- **(D)** Iterable

---

### Q7. Character Arithmetic Output

What is printed by this code?

```java
public class Main {
    public static void main(String[] args) {
        char c = 'A';
        System.out.println(c + 1);
    }
}
```

**Options:**
- **(A)** B
- **(B)** 66
- **(C)** A1
- **(D)** Compilation error

---

### Q8. Checked vs Unchecked Exceptions

Which of the following inherits from RuntimeException and is therefore unchecked?

```java
Exception hierarchy
```

**Options:**
- **(A)** IOException
- **(B)** SQLException
- **(C)** NullPointerException
- **(D)** ClassNotFoundException

---

### Q9. Short-Circuit Bitwise vs Logical Operator

What is the value of x after: boolean b = false & (++x > 0)?

```java
int x = 5; boolean b = false & (++x > 0); System.out.println(x);
```

**Options:**
- **(A)** 5
- **(B)** 6
- **(C)** 0
- **(D)** Compilation error

---

### Q10. Abstract Class Instantiation

Can an abstract class have constructors in Java?

```java
abstract class Base { public Base() { System.out.println("Base"); } }
```

**Options:**
- **(A)** No, abstract classes cannot have constructors
- **(B)** Yes, called during subclass instantiation via super()
- **(C)** Only private constructors are allowed
- **(D)** Only if all methods are implemented

---

### Q11. Collections.sort Algorithm Complexity

What sorting algorithm does java.util.Arrays.sort(Object[]) / Collections.sort use?

```java
Collections.sort(list);
```

**Options:**
- **(A)** QuickSort (O(N^2) worst case)
- **(B)** TimSort (adaptive, stable, O(N log N) worst case)
- **(C)** HeapSort
- **(D)** BubbleSort

---

### Q12. Method Reference Syntax

Which method reference is equivalent to the lambda (String s) -> System.out.println(s)?

```java
Consumer<String> c;
```

**Options:**
- **(A)** System.out::println
- **(B)** System.out->println
- **(C)** String::println
- **(D)** PrintStream::println

---

### Q13. Thread start vs run

What happens if you directly invoke t.run() instead of t.start() on a Thread?

```java
Thread t = new Thread(task); t.run();
```

**Options:**
- **(A)** Starts a new concurrent thread as expected
- **(B)** Executes run() synchronously on the current calling thread without starting a new thread
- **(C)** Throws IllegalThreadStateException
- **(D)** Terminates the program

---

### Q14. Finalize Method Deprecation

Why was Object.finalize() deprecated in modern Java (Java 9+)?

```java
protected void finalize() throws Throwable {}
```

**Options:**
- **(A)** It was too fast
- **(B)** Unpredictable execution timing, performance overhead, thread safety issues, and better alternatives like AutoCloseable/Cleaner exist
- **(C)** It caused compile errors
- **(D)** Replaced by delete operator

---

### Q15. Optional get on Empty

What exception is thrown when calling Optional.empty().get()?

```java
Optional<String> opt = Optional.empty(); opt.get();
```

**Options:**
- **(A)** NullPointerException
- **(B)** NoSuchElementException
- **(C)** IllegalArgumentException
- **(D)** IndexOutOfBoundsException

---

### Q16. List.of Immutability

What happens when calling add() on a list created via List.of("A", "B")?

```java
List<String> list = List.of("A", "B"); list.add("C");
```

**Options:**
- **(A)** Adds "C" successfully
- **(B)** Throws UnsupportedOperationException
- **(C)** Returns false
- **(D)** Silently ignores insertion

---

### Q17. Package-Private Default Access

What is the visibility of a class member declared without any access modifier (no public, private, or protected)?

```java
int count;
```

**Options:**
- **(A)** Public to all packages
- **(B)** Private to the class only
- **(C)** Accessible only by classes in the same package (package-private)
- **(D)** Protected across all subclasses

---

### Q18. Record Classes in Java 16+

What does the Java record keyword automatically generate for its components?

```java
record Point(int x, int y) {}
```

**Options:**
- **(A)** Getters named getX(), getY(), setters, and no-arg constructor
- **(B)** Private final fields, canonical constructor, accessors x() and y(), equals(), hashCode(), and toString()
- **(C)** Mutable public fields
- **(D)** Only a constructor

---

### Q19. Narrowing Primitive Conversion Overflow

What is the output of byte b = (byte) 130 in Java?

```java
public class Main {
    public static void main(String[] args) {
        byte b = (byte) 130;
        System.out.println(b);
    }
}
```

**Options:**
- **(A)** 130
- **(B)** -126
- **(C)** 127
- **(D)** -128

---

### Q20. Stream Intermediate vs Terminal Operations

When does an intermediate operation like .filter() or .map() execute in a Java Stream pipeline?

```java
Stream<String> s = list.stream().filter(x -> { System.out.println(x); return true; });
```

**Options:**
- **(A)** Immediately when filter() is called
- **(B)** Lazily, only when a terminal operation (like collect or forEach) is invoked
- **(C)** In a background daemon thread
- **(D)** Never

---

## Section: Python

### Q1. Shallow Copy List Multiplication

What is printed after modifying this 2D list created with multiplication?

```python
matrix = [[0] * 2] * 2
matrix[0][0] = 7
print(matrix)
```

**Options:**
- **(A)** [[7, 0], [0, 0]]
- **(B)** [[7, 0], [7, 0]]
- **(C)** [[7, 7], [0, 0]]
- **(D)** [[0, 0], [0, 0]]

---

### Q2. String Reverse Slice

What does the slice s[::-1] do to a string s?

```python
s = "antigravity"
print(s[::-1])
```

**Options:**
- **(A)** Prints "antigravity"
- **(B)** Reverses the string s
- **(C)** Deletes the last character
- **(D)** Raises IndexError

---

### Q3. Floor Division with Negatives

What is the result of -7 // 2 in Python?

```python
print(-7 // 2)
```

**Options:**
- **(A)** -3
- **(B)** -4
- **(C)** -3.5
- **(D)** 3

---

### Q4. Dunder Repr vs Str

Which special method is invoked by the built-in repr() function?

```python
class Item: ...
```

**Options:**
- **(A)** __str__
- **(B)** __repr__
- **(C)** __format__
- **(D)** __display__

---

### Q5. Walrus Operator (Python 3.8+)

What does the walrus operator := do?

```python
if (n := len(data)) > 5: print(n)
```

**Options:**
- **(A)** Compares values strictly
- **(B)** Assigns a value to a variable as part of an expression
- **(C)** Performs integer division
- **(D)** Defines a generator

---

### Q6. Filter Function Output Type

What type does the built-in filter() function return in Python 3?

```python
f = filter(lambda x: x > 0, [1, -2, 3])
```

**Options:**
- **(A)** list
- **(B)** filter object (iterator)
- **(C)** tuple
- **(D)** generator

---

### Q7. Class Variable vs Instance Variable Shadowing

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

**Options:**
- **(A)** hound hound canine
- **(B)** hound canine canine
- **(C)** hound hound hound
- **(D)** canine canine canine

---

### Q8. Args and Kwargs Unpacking

What does *args and **kwargs collect in function definitions?

```python
def func(*args, **kwargs): ...
```

**Options:**
- **(A)** args collects positional arguments as a tuple; kwargs collects keyword arguments as a dict
- **(B)** args collects dict; kwargs collects tuple
- **(C)** Both collect lists
- **(D)** args collects strings; kwargs collects integers

---

### Q9. Any Function on Falsy Values

What does any([0, False, "", None]) evaluate to?

```python
print(any([0, False, "", None]))
```

**Options:**
- **(A)** True
- **(B)** False
- **(C)** None
- **(D)** 0

---

### Q10. Multiple Inheritance and MRO

How can you inspect the Method Resolution Order of a class in Python?

```python
class C(A, B): pass
```

**Options:**
- **(A)** C.__order__
- **(B)** C.mro() or C.__mro__
- **(C)** C.__hierarchy__
- **(D)** C.resolution()

---

### Q11. Set Difference Operator

What is {1, 2, 3, 4} - {2, 4, 6}?

```python
print({1, 2, 3, 4} - {2, 4, 6})
```

**Options:**
- **(A)** {1, 3, 6}
- **(B)** {1, 3}
- **(C)** {6}
- **(D)** {2, 4}

---

### Q12. Modulo of Negative Integer in Python

What is -5 % 3 in Python?

```python
print(-5 % 3)
```

**Options:**
- **(A)** -2
- **(B)** 1
- **(C)** 2
- **(D)** -1

---

### Q13. Pass Statement Purpose

What is the purpose of the pass statement in Python?

```python
def stub():
    pass
```

**Options:**
- **(A)** Skips the current loop iteration
- **(B)** A null statement used as a placeholder where syntactically code is required
- **(C)** Terminates the function immediately returning None
- **(D)** Raises an exception

---

### Q14. Dictionary Keys View Dynamic Reflection

What happens to a dict_keys view when a new key is added to the dictionary?

```python
d = {"a": 1}
keys = d.keys()
d["b"] = 2
print("b" in keys)
```

**Options:**
- **(A)** False
- **(B)** True
- **(C)** Raises RuntimeError
- **(D)** None

---

### Q15. Decorators Wrapping Function

What does the @decorator syntax do above a function definition?

```python
@my_dec
def hello(): pass
```

**Options:**
- **(A)** Compiles hello in C
- **(B)** Equivalent to hello = my_dec(hello)
- **(C)** Runs hello in a background thread
- **(D)** Declares hello as private

---

### Q16. Chained Comparison Evaluation

What does 1 < 2 < 3 == 3 evaluate to in Python?

```python
print(1 < 2 < 3 == 3)
```

**Options:**
- **(A)** True
- **(B)** False
- **(C)** SyntaxError
- **(D)** TypeError

---

### Q17. String Isdigit vs Isnumeric

What does "²" (superscript 2) return for isdigit() vs isnumeric() in Python 3?

```python
s = "²"
print(s.isdigit(), s.isnumeric())
```

**Options:**
- **(A)** False False
- **(B)** True True
- **(C)** False True
- **(D)** True False

---

### Q18. Iter Function with Sentinel

What does iter(callable, sentinel) do?

```python
reader = iter(f.readline, "")
```

**Options:**
- **(A)** Calls callable repeatedly until it returns sentinel
- **(B)** Raises an error if sentinel is reached
- **(C)** Appends sentinel to callable
- **(D)** Filters out sentinel values

---

### Q19. F-Strings Formatting Specifier

What does f"{123.456:.2f}" output in Python 3.6+?

```python
print(f"{123.456:.2f}")
```

**Options:**
- **(A)** 123.45
- **(B)** 123.46
- **(C)** 123.5
- **(D)** 123.456

---

### Q20. Recursion Limit Error

What exception is raised when Python exceeds its maximum call stack depth?

```python
def rec(): rec()
rec()
```

**Options:**
- **(A)** StackOverflowError
- **(B)** RecursionError
- **(C)** MemoryError
- **(D)** RuntimeInterrupt

---

