# Round 1 — MCQ Qualification Round (Set 5)

**Instructions:**
- Time: 30 Minutes
- Total Questions: 20 Questions
- Marking: +10 Points for each correct answer. No negative marking.
- Answer all questions for your chosen programming language.

---

## Section: C++

### Q1. Bitwise AND Power of Two Check

What does (n > 0) && ((n & (n - 1)) == 0) check?

```cpp
bool check(int n) { return (n > 0) && ((n & (n - 1)) == 0); }
```

**Options:**
- **(A)** Whether n is an odd number
- **(B)** Whether n is a power of 2
- **(C)** Whether n is divisible by 4
- **(D)** Whether n is prime

---

### Q2. Array Bound Indexing Undefined Behavior

What happens in C++ when accessing arr[5] in int arr[5]?

```cpp
int arr[5] = {1, 2, 3, 4, 5}; cout << arr[5];
```

**Options:**
- **(A)** Throws ArrayIndexOutOfBoundsException
- **(B)** Prints 0
- **(C)** Undefined Behavior (out-of-bounds access)
- **(D)** Compile-time error

---

### Q3. Precedence of Dereference vs Increment

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

**Options:**
- **(A)** 10 20
- **(B)** 11 20
- **(C)** 20 20
- **(D)** 10 10

---

### Q4. Static Cast vs C-Style Cast

Why is static_cast preferred over C-style cast (int)x in modern C++?

```cpp
double d = 3.14; int i = static_cast<int>(d);
```

**Options:**
- **(A)** static_cast is faster at runtime
- **(B)** static_cast performs compile-time type checks and avoids accidental dangerous conversions
- **(C)** C-style cast is deprecated in C++20
- **(D)** static_cast automatically handles null pointers

---

### Q5. String View Advantage

What is the main benefit of std::string_view (C++17) over const std::string&?

```cpp
void log(std::string_view sv);
```

**Options:**
- **(A)** It modifies the underlying string safely
- **(B)** It provides a non-owning reference avoiding dynamic heap allocation for substrings and char arrays
- **(C)** It supports thread-safe concurrent writes
- **(D)** It automatically encrypts strings

---

### Q6. Volatile Keyword in C++

What does the volatile keyword tell the compiler?

```cpp
volatile int flag = 0;
```

**Options:**
- **(A)** The variable is thread-safe and atomic
- **(B)** The variable may be modified externally (e.g. hardware) so do not optimize away reads/writes
- **(C)** The variable is stored in flash memory
- **(D)** The variable is destroyed when leaving scope

---

### Q7. Override Keyword Benefit

What happens if a method marked override does not match any base class virtual method signature?

```cpp
struct Base { virtual void run(); }; struct Derived : Base { void run(int x) override; };
```

**Options:**
- **(A)** Silently creates a new overload
- **(B)** Compilation error
- **(C)** Warning at runtime
- **(D)** Calls Base::run()

---

### Q8. Vector Iterators Invalidation

When can iterators to a std::vector become invalidated?

```cpp
vector<int> v; ... v.push_back(10);
```

**Options:**
- **(A)** Only when v.clear() is called
- **(B)** When a reallocation occurs due to capacity exceeded, or elements before the iterator are erased/inserted
- **(C)** Iterators in C++ are never invalidated
- **(D)** Only when the vector goes out of scope

---

### Q9. Auto Deduction with Initializer List

What type is deduced for auto x = {1, 2, 3};?

```cpp
auto x = {1, 2, 3};
```

**Options:**
- **(A)** std::vector<int>
- **(B)** std::initializer_list<int>
- **(C)** int[3]
- **(D)** std::array<int, 3>

---

### Q10. Const Member Function Guarantee

What can a const member function NOT do (unless mutable is used)?

```cpp
void display() const;
```

**Options:**
- **(A)** Read member variables
- **(B)** Modify any non-mutable member variables of the object
- **(C)** Call other const member functions
- **(D)** Return a value

---

### Q11. Nullptr vs NULL

Why was nullptr introduced in C++11 to replace NULL?

```cpp
void f(int); void f(void*); f(nullptr);
```

**Options:**
- **(A)** NULL is a pointer, nullptr is an integer
- **(B)** nullptr is a strongly typed std::nullptr_t that avoids overload ambiguity with integer 0
- **(C)** NULL uses 8 bytes while nullptr uses 4 bytes
- **(D)** NULL is deprecated in C++

---

### Q12. Default Copy Constructor Behavior

What kind of copy does the default copy constructor perform in C++?

```cpp
class Box { int* data; }; Box b2 = b1;
```

**Options:**
- **(A)** Deep copy of all pointers and allocated buffers
- **(B)** Shallow (member-wise) bitwise copy of member variables
- **(C)** Sets pointers to null
- **(D)** Calls clone() method

---

### Q13. De Bruijn / Bit Count Builtin

What does __builtin_popcount(14) return in GCC/Clang?

```cpp
cout << __builtin_popcount(14) << endl;
```

**Options:**
- **(A)** 1
- **(B)** 2
- **(C)** 3
- **(D)** 4

---

### Q14. Structured Exception Handling vs C++ Exceptions

Can C++ catch (...) catch hardware exceptions like division by zero in standard C++?

```cpp
int x = 5 / 0;
```

**Options:**
- **(A)** Yes, catch(...) catches all signals and hardware faults
- **(B)** No, division by zero is undefined behavior and not a C++ throw
- **(C)** Yes, throws std::overflow_error
- **(D)** Yes, throws std::runtime_error

---

### Q15. Recursive Factorial Overflow

At what value of n does factorial n! exceed standard 32-bit signed int capacity (2 * 10^9)?

```cpp
int fact(int n);
```

**Options:**
- **(A)** 10
- **(B)** 13
- **(C)** 16
- **(D)** 20

---

### Q16. Vector Resize vs Reserve

What is the key difference between v.reserve(10) and v.resize(10)?

```cpp
vector<int> v;
```

**Options:**
- **(A)** reserve changes capacity without adding elements; resize changes size and default-constructs elements
- **(B)** reserve adds elements; resize only allocates memory
- **(C)** Both perform the exact same operation
- **(D)** resize only works with pointers

---

### Q17. String find_first_of

What does s.find_first_of("aeiou") search for?

```cpp
string s = "cryptic"; size_t pos = s.find_first_of("aeiou");
```

**Options:**
- **(A)** The exact substring "aeiou"
- **(B)** The first occurrence of ANY vowel character present in "aeiou"
- **(C)** The last vowel in s
- **(D)** Returns true or false

---

### Q18. Inline Function Keyword Meaning in Modern C++

What is the primary role of the inline keyword in modern C++?

```cpp
inline int helper() { return 42; }
```

**Options:**
- **(A)** Guarantees the compiler will never create a function call instruction
- **(B)** Allows a function definition to appear in multiple translation units without ODR violation
- **(C)** Makes the function execute in a separate thread
- **(D)** Places the function in CPU cache

---

### Q19. Lambda State with Mutable

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

**Options:**
- **(A)** 6 7 5
- **(B)** 6 7 7
- **(C)** 6 6 5
- **(D)** 5 6 5

---

### Q20. Unordered Map Hash Collisions Complexity

What is the worst-case time complexity of lookup in std::unordered_map when all keys collide?

```cpp
unordered_map<int, int> mp;
```

**Options:**
- **(A)** O(1)
- **(B)** O(log N)
- **(C)** O(N)
- **(D)** O(N log N)

---

## Section: Java

### Q1. ThreadLocal Storage Isolation

What is the purpose of ThreadLocal<T> in Java?

```java
ThreadLocal<Integer> threadId = ThreadLocal.withInitial(() -> 1);
```

**Options:**
- **(A)** Shares variables globally across all threads
- **(B)** Provides thread-local variables where each accessing thread has its own independently initialized copy
- **(C)** Prevents thread creation
- **(D)** Performs lock-free CAS on primitives

---

### Q2. Sealed Classes (Java 17)

What modifier restricts which other classes or interfaces may extend or implement a class in Java 17+?

```java
public sealed class Shape permits Circle, Square {}
```

**Options:**
- **(A)** final
- **(B)** sealed
- **(C)** restricted
- **(D)** locked

---

### Q3. Happens-Before Relationship

In the Java Memory Model, which action establishes a happens-before relationship?

```java
volatile int flag;
```

**Options:**
- **(A)** A plain read of a non-volatile variable
- **(B)** A write to a volatile variable happens-before every subsequent read of that same volatile variable
- **(C)** Calling Thread.yield()
- **(D)** Creating an array

---

### Q4. Equals and HashCode Contract Violation

What occurs if two objects are equal according to equals() but return different hashCodes when used in a HashSet?

```java
obj1.equals(obj2) == true but obj1.hashCode() != obj2.hashCode()
```

**Options:**
- **(A)** HashSet throws HashCollisionException
- **(B)** HashSet may treat them as distinct elements and add both, violating set uniqueness
- **(C)** The JVM automatically averages their hash codes
- **(D)** HashSet replaces obj1 with obj2

---

### Q5. Stream Reduce Identity Element

What is the result of Stream.of(1, 2, 3, 4).reduce(10, (a, b) -> a + b)?

```java
int sum = Stream.of(1, 2, 3, 4).reduce(10, (a, b) -> a + b);
System.out.println(sum);
```

**Options:**
- **(A)** 10
- **(B)** 20
- **(C)** 24
- **(D)** 14

---

### Q6. Pattern Matching for Instanceof (Java 16+)

What is the syntax for pattern matching with instanceof in modern Java?

```java
if (obj instanceof String s) { System.out.println(s.length()); }
```

**Options:**
- **(A)** Requires explicit casting (String) obj inside the block
- **(B)** Automatically casts and binds obj to pattern variable s if the type matches
- **(C)** Only works with primitives
- **(D)** Deprecated in Java 17

---

### Q7. AtomicInteger Compare-And-Set (CAS)

What does atomicInt.compareAndSet(expected, update) do?

```java
AtomicInteger ai = new AtomicInteger(5);
boolean success = ai.compareAndSet(5, 10);
```

**Options:**
- **(A)** Always sets the value to 10
- **(B)** Atomically sets the value to update if and only if the current value equals expected, returning true
- **(C)** Throws an exception if expected does not match
- **(D)** Locks the object indefinitely

---

### Q8. CompletableFuture supplyAsync

By default, what thread pool does CompletableFuture.supplyAsync() use if no executor is specified?

```java
CompletableFuture.supplyAsync(() -> "data");
```

**Options:**
- **(A)** Executors.newSingleThreadExecutor()
- **(B)** ForkJoinPool.commonPool()
- **(C)** Executors.newCachedThreadPool()
- **(D)** The main calling thread

---

### Q9. Reflection setAccessible Meaning

What does field.setAccessible(true) allow through Java reflection?

```java
Field field = clazz.getDeclaredField("secret"); field.setAccessible(true);
```

**Options:**
- **(A)** Allows reading and modifying private or protected fields bypassing Java language access control checks
- **(B)** Makes the field public permanently
- **(C)** Saves the field to disk
- **(D)** Compiles the field into C++

---

### Q10. Classloader Hierarchy Delegation

What is the top-most root class loader in the standard JVM classloader hierarchy?

```java
ClassLoader cl;
```

**Options:**
- **(A)** Application ClassLoader (System)
- **(B)** Platform / Extension ClassLoader
- **(C)** Bootstrap ClassLoader
- **(D)** Custom ClassLoader

---

### Q11. ArrayDeque vs LinkedList for Queue

Why is ArrayDeque generally faster than LinkedList when used as a Queue or Stack in Java?

```java
Queue<Integer> q = new ArrayDeque<>();
```

**Options:**
- **(A)** ArrayDeque is synchronized
- **(B)** ArrayDeque uses contiguous array memory offering better cache locality and avoiding per-node object allocation overhead
- **(C)** LinkedList has O(N) insertion at ends
- **(D)** ArrayDeque allows null elements

---

### Q12. Enum Singleton Safety

Why did Joshua Bloch recommend an enum as the best way to implement a singleton in Java?

```java
public enum Singleton { INSTANCE; }
```

**Options:**
- **(A)** It runs on multiple JVMs
- **(B)** It provides unconditional guarantees against multiple instantiations, even through serialization or reflection attacks
- **(C)** It uses 0 bytes of heap
- **(D)** It does not require JVM

---

### Q13. Static Nested vs Inner Class

What distinguishes a static nested class from a non-static inner class in Java?

```java
class Outer { static class S {} class I {} }
```

**Options:**
- **(A)** A static nested class does not have an implicit reference to an enclosing instance of Outer
- **(B)** An inner class cannot access private members of Outer
- **(C)** Static nested classes cannot have constructors
- **(D)** There is no difference

---

### Q14. Cleaner vs Finalizer

Why does java.lang.ref.Cleaner provide better cleanup safety than Object.finalize() in modern Java?

```java
Cleaner cleaner = Cleaner.create();
```

**Options:**
- **(A)** Cleaning actions are managed in separate threads without holding strong references to the object being reclaimed
- **(B)** Cleaner immediately deletes files on disk
- **(C)** Cleaner disables garbage collection
- **(D)** Cleaner runs synchronously before main exits

---

### Q15. SoftReference vs WeakReference

Under what condition does the JVM Garbage Collector clear SoftReferences compared to WeakReferences?

```java
SoftReference<byte[]> softRef = new SoftReference<>(new byte[1024]);
```

**Options:**
- **(A)** WeakReferences are cleared only when OutOfMemoryError is thrown
- **(B)** WeakReferences are cleared during the next GC cycle; SoftReferences are retained until memory pressure requires reclamation
- **(C)** SoftReferences are never garbage collected
- **(D)** Both are identical

---

### Q16. String.join Delimiter Behavior

What is the output of String.join("-", "A", "B", "C") in Java?

```java
System.out.println(String.join("-", "A", "B", "C"));
```

**Options:**
- **(A)** -A-B-C-
- **(B)** A-B-C
- **(C)** ABC-
- **(D)** Compilation error

---

### Q17. Text Blocks in Java 15+

What is the syntax for multi-line Text Blocks introduced in Java 15?

```java
String html = """
              <html>
              </html>""";
```

**Options:**
- **(A)** Enclosed with triple double-quotes """ with opening delimiter followed by a line break
- **(B)** Enclosed with single quotes '''
- **(C)** Enclosed with backticks ```
- **(D)** Enclosed with <<<

---

### Q18. Var Local Variable Type Inference (Java 10+)

Where can the var keyword NOT be used in Java?

```java
var x = 10;
```

**Options:**
- **(A)** For local variables inside methods
- **(B)** For method parameters, return types, and class fields
- **(C)** Inside for loops
- **(D)** With try-with-resources

---

### Q19. HashMap Load Factor and Rehash

What is the default load factor of java.util.HashMap and when does resizing occur?

```java
Map<Integer, Integer> map = new HashMap<>();
```

**Options:**
- **(A)** 0.50 (resizes when half full)
- **(B)** 0.75 (resizes when size exceeds 75% of current capacity)
- **(C)** 1.0 (resizes when 100% full)
- **(D)** 0.90

---

### Q20. Record Component Immutability Caveat

If a Java record contains a List field record Team(List<String> members), is the list immutable?

```java
record Team(List<String> members) {}
```

**Options:**
- **(A)** Yes, records automatically make all collections deeply immutable
- **(B)** No, while the reference members is final, the list contents remain mutable unless explicitly wrapped in Collections.unmodifiableList
- **(C)** Records cannot contain collections
- **(D)** Throws RecordFieldException

---

## Section: Python

### Q1. Chainmap from Collections

What does collections.ChainMap do?

```python
from collections import ChainMap
cm = ChainMap(d1, d2)
```

**Options:**
- **(A)** Merges two dictionaries permanently
- **(B)** Groups multiple dictionaries together into a single updateable view with precedence given to the first map
- **(C)** Creates a bidirectional hash map
- **(D)** Locks dictionaries from writes

---

### Q2. Counter Most Common

What does Counter("abracadabra").most_common(2) return?

```python
from collections import Counter
print(Counter("abracadabra").most_common(2))
```

**Options:**
- **(A)** [("a", 5), ("b", 2)]
- **(B)** [("a", 5), ("r", 2)]
- **(C)** ["a", "b"]
- **(D)** {"a": 5, "b": 2}

---

### Q3. String Formatted Raw String

What does r"C:\new\test" do?

```python
path = r"C:\new\test"
print(path)
```

**Options:**
- **(A)** Interprets \n as a newline character
- **(B)** Treats backslashes as literal characters without escape interpretation
- **(C)** Reverses the string
- **(D)** Raises SyntaxError

---

### Q4. Bitwise NOT of Integer

What is the value of ~5 in Python?

```python
print(~5)
```

**Options:**
- **(A)** -5
- **(B)** -6
- **(C)** 6
- **(D)** -4

---

### Q5. List Clear vs New List Assignment

What is the difference between lst.clear() and lst = [] when other variables reference lst?

```python
a = [1, 2]; b = a
```

**Options:**
- **(A)** Both modify b
- **(B)** lst.clear() empties the list in-place affecting b; lst = [] rebinds lst, leaving b unchanged
- **(C)** lst.clear() causes MemoryError
- **(D)** No difference

---

### Q6. Type of Type in Python

What does type(type) return in Python?

```python
print(type(type))
```

**Options:**
- **(A)** <class "object">
- **(B)** <class "type">
- **(C)** <class "class">
- **(D)** <class "meta">

---

### Q7. Slots Optimization Benefit

What is the primary benefit of declaring __slots__ in a Python class?

```python
class Point: __slots__ = ("x", "y")
```

**Options:**
- **(A)** Restricts instance attributes, eliminating per-instance __dict__ and drastically reducing memory usage
- **(B)** Makes attributes immutable like a tuple
- **(C)** Enables multithreading
- **(D)** Automatically implements getters and setters

---

### Q8. Yield From Syntax (Python 3.3+)

What does yield from sub_generator() do?

```python
def gen(): yield from [1, 2, 3]
```

**Options:**
- **(A)** Creates a sub-thread
- **(B)** Delegates yielding elements and two-way communication directly to the sub-generator/iterable
- **(C)** Caches results in memory
- **(D)** Terminates the generator

---

### Q9. Frozenset Immutability

Can a frozenset be added to another set in Python?

```python
s = set()
fs = frozenset([1, 2])
s.add(fs)
```

**Options:**
- **(A)** No, TypeError: unhashable type
- **(B)** Yes, because frozenset is immutable and hashable
- **(C)** Only if empty
- **(D)** Raises ValueError

---

### Q10. Operator Itemgetter Performance

What does operator.itemgetter(1) do?

```python
from operator import itemgetter
f = itemgetter(1)
print(f([10, 20, 30]))
```

**Options:**
- **(A)** 10
- **(B)** 20
- **(C)** 30
- **(D)** [10, 20]

---

### Q11. Property Decorator Getter and Setter

What does the @property decorator create on a class method?

```python
class Circle:
    @property
    def radius(self): return self._r
```

**Options:**
- **(A)** A static class attribute
- **(B)** A managed attribute that can be read with dot notation without parentheses circle.radius
- **(C)** A private variable
- **(D)** A classmethod

---

### Q12. Keyword-Only Arguments Syntax

How are keyword-only arguments defined in a Python function header?

```python
def process(data, *, timeout=10): ...
```

**Options:**
- **(A)** By prefixing arguments with **
- **(B)** By placing them after a bare asterisk * in the parameter list
- **(C)** By naming them with uppercase letters
- **(D)** By using the @keyword decorator

---

### Q13. Itertools Combinations vs Permutations

What is the length of list(itertools.combinations([1, 2, 3], 2)) vs permutations([1, 2, 3], 2)?

```python
import itertools
```

**Options:**
- **(A)** 3 and 6
- **(B)** 6 and 3
- **(C)** 3 and 3
- **(D)** 6 and 6

---

### Q14. Dunder Call Callable Instances

What allows an instance of a Python class to be called like a function obj()?

```python
class Adder:
    def __call__(self, x): return x + 10
```

**Options:**
- **(A)** Defining __init__
- **(B)** Defining the __call__ special method
- **(C)** Inheriting from FunctionType
- **(D)** Using the @callable decorator

---

### Q15. Zip Strict Parameter (Python 3.10+)

What happens if zip(a, b, strict=True) receives iterables of different lengths in Python 3.10+?

```python
zip([1, 2], [1, 2, 3], strict=True)
```

**Options:**
- **(A)** Truncates silently
- **(B)** Raises ValueError: zip() argument 2 is longer than argument 1
- **(C)** Pads with None
- **(D)** Warning only

---

### Q16. Math Isclose Floating Tolerance

Why is math.isclose(a, b) preferred over a == b for floats in Python?

```python
import math
print(math.isclose(0.1 + 0.2, 0.3))
```

**Options:**
- **(A)** It runs faster
- **(B)** It compares equality within a small relative/absolute numerical tolerance (epsilon) avoiding IEEE 754 precision issues
- **(C)** It converts floats to strings
- **(D)** It returns an integer

---

### Q17. String Translation Table

What pair of functions in the str class creates and applies character mappings?

```python
trans = str.maketrans("aeiou", "12345")
print("apple".translate(trans))
```

**Options:**
- **(A)** str.map and str.apply
- **(B)** str.maketrans and str.translate
- **(C)** str.replace_all
- **(D)** str.sub

---

### Q18. Collections Deque O(1) Appends

Why is collections.deque preferred over list for FIFO queues?

```python
from collections import deque
q = deque()
```

**Options:**
- **(A)** deque uses less memory
- **(B)** deque provides O(1) time complexity for appends and pops from both ends, whereas list.pop(0) is O(N)
- **(C)** deque elements are automatically sorted
- **(D)** deque allows duplicate keys

---

### Q19. Weakref Non-Owning References

What is the purpose of the weakref module in Python?

```python
import weakref
```

**Options:**
- **(A)** Creates variables that are automatically encrypted
- **(B)** Creates references to objects without increasing their reference count, avoiding circular reference leaks
- **(C)** Makes garbage collection slower
- **(D)** Forces immediate object deletion

---

### Q20. Hash Invariance Requirement

What is the fundamental rule regarding __hash__ and __eq__ in Python?

```python
a == b implies hash(a) == hash(b)
```

**Options:**
- **(A)** If two objects are equal (a == b), their hash values MUST be equal
- **(B)** If two objects have equal hashes, they must be equal
- **(C)** Hash must return a negative number
- **(D)** Hash can change at any time

---

