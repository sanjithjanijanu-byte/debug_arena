# DEBUG ARENA — Official Judge & Solutions Manual

> **CONFIDENTIAL**: For Judges, Faculty, and Event Coordinators Only.
> Contains complete answer keys, root cause diagnostics, and reference solutions for all competition rounds and sets.

---

## Table of Contents
1. [Round 1: MCQ Answer Keys & Explanations (Sets 1 - 5)](#round-1-mcq-solutions)
2. [Round 2: Medium Debugging Solutions (Sets 1 - 7)](#round-2-medium-solutions)
3. [Round 3: Hard Debugging Solutions (Sets 1 - 7)](#round-3-hard-solutions)

---

<a name="round-1-mcq-solutions"></a>
# Round 1: MCQ Solutions (Sets 1 - 5)

## Round 1 — Set 1

### Quick Answer Key (Set 1)

| Q# | C++ Key | Java Key | Python Key |
|:---:|:---:|:---:|:---:||
| Q1 | **B** | **B** | **A** |
| Q2 | **C** | **C** | **C** |
| Q3 | **B** | **B** | **B** |
| Q4 | **B** | **B** | **C** |
| Q5 | **A** | **B** | **B** |
| Q6 | **B** | **B** | **B** |
| Q7 | **A** | **B** | **A** |
| Q8 | **B** | **B** | **B** |
| Q9 | **B** | **B** | **B** |
| Q10 | **A** | **B** | **B** |
| Q11 | **B** | **B** | **B** |
| Q12 | **A** | **B** | **A** |
| Q13 | **B** | **B** | **B** |
| Q14 | **B** | **A** | **A** |
| Q15 | **B** | **A** | **B** |
| Q16 | **B** | **B** | **B** |
| Q17 | **A** | **B** | **B** |
| Q18 | **B** | **B** | **B** |
| Q19 | **B** | **A** | **A** |
| Q20 | **A** | **B** | **B** |

### Set 1 — C++ Explanations

#### Q1. Integer Division in C++
- **Correct Answer:** **(B)** 3
- **Explanation:** In C++, dividing two integers truncates the decimal part towards zero: 7 / 2 = 3.

#### Q2. Post-Increment Operator
- **Correct Answer:** **(C)** 6 5
- **Explanation:** Post-increment assigns the current value of x (5) to y, then increments x to 6.

#### Q3. Pass-by-Value in C++
- **Correct Answer:** **(B)** 20
- **Explanation:** x is passed by value, so modifying x inside addTen does not affect num in main.

#### Q4. Array Indexing in C++
- **Correct Answer:** **(B)** 40
- **Explanation:** Arrays are 0-indexed: arr[0]=10, arr[1]=20, arr[2]=30, arr[3]=40.

#### Q5. String Length and Character Access
- **Correct Answer:** **(A)** 5 e
- **Explanation:** "Hello" has length 5 and s[1] is the character at index 1: 'e'.

#### Q6. Modulo Operator
- **Correct Answer:** **(B)** 2
- **Explanation:** 14 % 4 computes the remainder of 14 divided by 4, which is 2.

#### Q7. For Loop Accumulator
- **Correct Answer:** **(A)** 10
- **Explanation:** The loop adds 0 + 1 + 2 + 3 + 4 = 10.

#### Q8. Ternary Conditional Operator
- **Correct Answer:** **(B)** 200
- **Explanation:** 10 > 15 is false, so the ternary expression selects the second value: 200.

#### Q9. Boolean Logic Operators
- **Correct Answer:** **(B)** 0 1
- **Explanation:** (5 > 0 && -2 > 0) is false (0). (5 > 0 || -2 > 0) is true (1).

#### Q10. Vector push_back and size
- **Correct Answer:** **(A)** 2 100
- **Explanation:** push_back inserts 2 elements, so size is 2. v[0] is the first element, 100.

#### Q11. Reference Variables
- **Correct Answer:** **(B)** 25 25
- **Explanation:** ref is an alias for x. Mutating ref directly alters x to 25.

#### Q12. Nested Ternary Operator
- **Correct Answer:** **(A)** 1
- **Explanation:** a > 3 (5 > 3) is true, and a < 10 (5 < 10) is true, resulting in 1.

#### Q13. Switch Statement Fall-Through
- **Correct Answer:** **(B)** Two Three
- **Explanation:** Without a break after case 2, execution falls through to case 3: "Two Three ".

#### Q14. Pointer Dereferencing
- **Correct Answer:** **(B)** 50
- **Explanation:** *ptr dereferences ptr to access variable a. 42 + 8 = 50.

#### Q15. Static Local Variable
- **Correct Answer:** **(B)** 1 2 3
- **Explanation:** A static local variable persists across function calls, incrementing 1, 2, 3.

#### Q16. Short-Circuit Logical AND
- **Correct Answer:** **(B)** 5
- **Explanation:** Because x != 0 is false, && short-circuits. ++y is never evaluated and y remains 5.

#### Q17. Vector push_back and pop_back
- **Correct Answer:** **(A)** 2 20
- **Explanation:** push_back(30) adds 30, and pop_back() removes it. Size is 2, and v.back() is 20.

#### Q18. Array Size using sizeof
- **Correct Answer:** **(B)** 6
- **Explanation:** sizeof(arr) is 24 bytes and sizeof(arr[0]) is 4 bytes. 24 / 4 = 6 elements.

#### Q19. Do-While Loop Execution Guarantee
- **Correct Answer:** **(B)** 15
- **Explanation:** A do-while loop executes at least once. x becomes 15, then 15 < 10 is false, terminating.

#### Q20. String Search with string::find
- **Correct Answer:** **(A)** Found at 3
- **Explanation:** "competitor" contains "pet" starting at 0-based index 3.

### Set 1 — Java Explanations

#### Q1. String Concatenation Precedence
- **Correct Answer:** **(B)** Sum: 1020
- **Explanation:** Left-to-right evaluation converts 10 to a string ("Sum: 10"), then concatenates 20 ("Sum: 1020").

#### Q2. String equals() vs == Operator
- **Correct Answer:** **(C)** true false
- **Explanation:** .equals() compares content (true); == compares object references in memory (false).

#### Q3. Array length Property
- **Correct Answer:** **(B)** 5
- **Explanation:** In Java, an array length is accessed via the .length field, returning 5.

#### Q4. Pass-by-Value with Primitive Arguments
- **Correct Answer:** **(B)** 25
- **Explanation:** Java primitives are passed by value; changing parameter a has no effect on x.

#### Q5. While Loop Counter
- **Correct Answer:** **(B)** 4
- **Explanation:** count increments 1 -> 2 -> 3 -> 4. When count reaches 4, 4 < 4 is false and loop stops.

#### Q6. Integer Division Truncation
- **Correct Answer:** **(B)** 3
- **Explanation:** Dividing two integers in Java truncates towards zero, producing 3.

#### Q7. String Immutability
- **Correct Answer:** **(B)** Hello
- **Explanation:** Strings are immutable in Java. s.concat() returns a new string without reassigning s.

#### Q8. Loop Break Statement
- **Correct Answer:** **(B)** 3
- **Explanation:** When i reaches 3, it prints 3 and breaks out of the loop immediately.

#### Q9. Math.max() Method
- **Correct Answer:** **(B)** 40
- **Explanation:** Math.max(25, 40) returns the greater value, 40.

#### Q10. Default Boolean Field Value
- **Correct Answer:** **(B)** false
- **Explanation:** The default initial value of uninitialized boolean class fields in Java is false.

#### Q11. Unary Operators Precedence
- **Correct Answer:** **(B)** 12
- **Explanation:** ++x pre-increments to 6. x++ uses 6 and then increments to 7. 6 + 6 = 12.

#### Q12. Substring Indexing
- **Correct Answer:** **(B)** uggi
- **Explanation:** substring(3, 7) takes indices 3, 4, 5, 6, which are 'u', 'g', 'g', 'i'.

#### Q13. Boolean Assignment in Conditionals
- **Correct Answer:** **(B)** No
- **Explanation:** The assignment flag = false sets flag to false and evaluates to false, executing the else block.

#### Q14. String charAt and Length
- **Correct Answer:** **(A)** Am
- **Explanation:** s.charAt(0) is 'A' and s.charAt(8) is 'm', concatenating to "Am".

#### Q15. Enhanced For Loop Accumulator
- **Correct Answer:** **(A)** 12
- **Explanation:** The for-each loop adds all elements: 2 + 4 + 6 = 12.

#### Q16. Math.max and Math.min Nesting
- **Correct Answer:** **(B)** 15
- **Explanation:** Math.min(25, 10) gives 10. Math.max(15, 10) returns 15.

#### Q17. ArrayList Remove by Index
- **Correct Answer:** **(B)** [10, 30]
- **Explanation:** list.remove(1) removes the item at index 1 (20), leaving [10, 30].

#### Q18. Ternary Operator Evaluation
- **Correct Answer:** **(B)** 40
- **Explanation:** 10 > 20 is false, so max is 20. 20 * 2 = 40.

#### Q19. StringBuilder Append & Length
- **Correct Answer:** **(A)** 7 c
- **Explanation:** "code" + "123" has length 7, and the character at index 0 is 'c'.

#### Q20. Static Initialization Block
- **Correct Answer:** **(B)** 15
- **Explanation:** The static block executes when the class loads, modifying x from 10 to 15 before main runs.

### Set 1 — Python Explanations

#### Q1. Integer Floor Division vs Float Division
- **Correct Answer:** **(A)** 4 4.5
- **Explanation:** // performs integer floor division (4), while / returns float division (4.5).

#### Q2. String Multiplication Operator
- **Correct Answer:** **(C)** Go!Go!Go!
- **Explanation:** Multiplying a string by an integer repeats it without extra spaces: "Go!Go!Go!".

#### Q3. List Slicing Indices
- **Correct Answer:** **(B)** [20, 30]
- **Explanation:** nums[1:3] starts at index 1 and stops before index 3, returning [20, 30].

#### Q4. Negative Indexing in Lists
- **Correct Answer:** **(C)** cherry
- **Explanation:** Negative index -1 retrieves the last element: "cherry".

#### Q5. Dictionary get() Default Value
- **Correct Answer:** **(B)** 0
- **Explanation:** dict.get(key, default) returns default 0 when key "Charlie" is not found.

#### Q6. List Length with len()
- **Correct Answer:** **(B)** 5
- **Explanation:** len() returns the count of items in the list, which is 5.

#### Q7. String lower() Method
- **Correct Answer:** **(A)** hello
- **Explanation:** str.lower() converts all uppercase characters to lowercase: "hello".

#### Q8. List append() Modification
- **Correct Answer:** **(B)** [1, 2, 3, 4]
- **Explanation:** append(4) adds 4 to the end of the list in-place: [1, 2, 3, 4].

#### Q9. Range Function Sequence
- **Correct Answer:** **(B)** [1, 2, 3, 4]
- **Explanation:** range(1, 5) generates values starting from 1 up to 4: [1, 2, 3, 4].

#### Q10. Tuple Packing and Unpacking
- **Correct Answer:** **(B)** 20 10
- **Explanation:** Tuple unpacking swaps values simultaneously: x = 20 and y = 10.

#### Q11. List Slicing Range
- **Correct Answer:** **(B)** [2, 3, 4]
- **Explanation:** nums[1:4] extracts indices 1, 2, 3: [2, 3, 4].

#### Q12. Default Function Parameters
- **Correct Answer:** **(A)** Hello, Bob!
- **Explanation:** Since msg is not provided, the default parameter "Hello" is used: "Hello, Bob!".

#### Q13. List Reference Assignment
- **Correct Answer:** **(B)** 4
- **Explanation:** y refers to the same object as x. Appending to y modifies x: len(x) is 4.

#### Q14. List Comprehension with Filter
- **Correct Answer:** **(A)** [0, 4]
- **Explanation:** range(4) has even numbers 0 and 2. Multiplying by 2 yields [0, 4].

#### Q15. List Comprehension with Strings
- **Correct Answer:** **(B)** ['CAT', 'DOG']
- **Explanation:** Filters words with length <= 3 ("cat", "dog") and converts to uppercase: ['CAT', 'DOG'].

#### Q16. Dictionary Key Membership
- **Correct Answer:** **(B)** True False
- **Explanation:** "in" on dict checks keys: "a" is a key (True), but 1 is a value, not a key (False).

#### Q17. String Split and Join
- **Correct Answer:** **(B)** apple/banana
- **Explanation:** parts[:2] is ['apple', 'banana'], which joined by "/" produces "apple/banana".

#### Q18. List pop() Return Value
- **Correct Answer:** **(B)** 30 [10, 20]
- **Explanation:** pop() removes and returns the last element (30), leaving [10, 20].

#### Q19. Float Truncation with int()
- **Correct Answer:** **(A)** 8
- **Explanation:** int() truncates the fractional part towards zero, returning integer 8.

#### Q20. Truthiness of Empty List vs List with Zero
- **Correct Answer:** **(B)** False True
- **Explanation:** An empty list [] evaluates to False; a non-empty list [0] evaluates to True.

---

## Round 1 — Set 2

### Quick Answer Key (Set 2)

| Q# | C++ Key | Java Key | Python Key |
|:---:|:---:|:---:|:---:||
| Q1 | **B** | **B** | **B** |
| Q2 | **B** | **B** | **B** |
| Q3 | **A** | **B** | **B** |
| Q4 | **B** | **A** | **C** |
| Q5 | **B** | **B** | **A** |
| Q6 | **A** | **A** | **B** |
| Q7 | **B** | **C** | **B** |
| Q8 | **A** | **C** | **B** |
| Q9 | **A** | **B** | **B** |
| Q10 | **B** | **B** | **A** |
| Q11 | **C** | **B** | **B** |
| Q12 | **B** | **B** | **B** |
| Q13 | **B** | **B** | **C** |
| Q14 | **B** | **B** | **B** |
| Q15 | **B** | **B** | **B** |
| Q16 | **B** | **B** | **B** |
| Q17 | **B** | **C** | **A** |
| Q18 | **B** | **B** | **B** |
| Q19 | **A** | **A** | **B** |
| Q20 | **C** | **B** | **B** |

### Set 2 — C++ Explanations

#### Q1. Bitwise XOR Identity
- **Correct Answer:** **(B)** 25
- **Explanation:** XOR is commutative and associative, and x ^ x = 0. Therefore a ^ b ^ a = b = 25.

#### Q2. Size of Pointer vs Array
- **Correct Answer:** **(B)** 8 40
- **Explanation:** In printSize, arr decays to a pointer (int*), which is 8 bytes on 64-bit. In main, sizeof(arr) is 10 * 4 = 40 bytes.

#### Q3. Pre vs Post Decrement
- **Correct Answer:** **(A)** 3 8
- **Explanation:** --i decrements i to 4 and evaluates to 4. Then i-- evaluates to 4 and decrements i to 3. Total j = 4 + 4 = 8, and final i = 3.

#### Q4. Static Local Variable
- **Correct Answer:** **(B)** 15 20
- **Explanation:** Static local variables retain their value across function calls. First call outputs 15, second call adds 5 and outputs 20.

#### Q5. String Concatenation with Literals
- **Correct Answer:** **(B)** Compilation Error: cannot add two string literals
- **Explanation:** In C++, "Hello" and ", " are const char arrays. You cannot use the + operator directly between two string literals.

#### Q6. Short-Circuit Logical AND
- **Correct Answer:** **(A)** 10
- **Explanation:** Since x != 0 evaluates to false, the logical AND short-circuits and ++y is never evaluated. Thus y remains 10.

#### Q7. Const Reference Binding
- **Correct Answer:** **(B)** 20
- **Explanation:** A const reference cannot modify the underlying variable through ref, but modifying the variable directly changes the value seen through ref.

#### Q8. Default Vector Initialization
- **Correct Answer:** **(A)** 4 7
- **Explanation:** vector<int> v(4, 7) creates a vector of size 4 where every element is initialized to 7. v[2] is 7.

#### Q9. Ternary Operator Associativity
- **Correct Answer:** **(A)** 2
- **Explanation:** The conditional operator is right-associative: a ? b : (c ? 10 : 20). Since a = 1 (true), it evaluates to b, which is 2.

#### Q10. Reference vs Pointer Reassignment
- **Correct Answer:** **(B)** 25 15
- **Explanation:** References cannot be reseated. ref = y copies y into x (so x becomes 15). Then ref = 25 sets x = 25. y remains 15.

#### Q11. Integer Overflow in C++
- **Correct Answer:** **(C)** Undefined Behavior
- **Explanation:** Signed integer overflow is strictly Undefined Behavior (UB) in ISO C++.

#### Q12. Virtual Destructor Necessity
- **Correct Answer:** **(B)** To ensure derived class destructors are called when deleting via base pointer
- **Explanation:** Deleting a derived class object through a base class pointer without a virtual destructor causes undefined behavior and resource leaks.

#### Q13. Vector push_back vs emplace_back
- **Correct Answer:** **(B)** emplace_back constructs elements in-place avoiding redundant copies/moves
- **Explanation:** emplace_back forwards arguments to construct the object directly in the container memory, avoiding temporary object creation.

#### Q14. Lambda Capture by Reference
- **Correct Answer:** **(B)** 15
- **Explanation:** [&x] captures x by reference, so mutating x inside the lambda updates the original variable x to 15.

#### Q15. Do-While Loop Condition
- **Correct Answer:** **(B)** 1 time, prints 7
- **Explanation:** A do-while loop always executes its body at least once before testing the condition. i becomes 7, then 7 < 5 is false.

#### Q16. Structured Binding (C++17)
- **Correct Answer:** **(B)** Answer: 42
- **Explanation:** Structured bindings unpack the pair into variables num (42) and text ("Answer").

#### Q17. String find Return on Failure
- **Correct Answer:** **(B)** string::npos
- **Explanation:** std::string::find returns std::string::npos (which represents the maximum possible value for size_t).

#### Q18. Unordered Map Operator[] Insertion
- **Correct Answer:** **(B)** Prints 0 1
- **Explanation:** operator[] default-constructs the value (0 for int) and inserts the pair into the map, increasing size to 1.

#### Q19. Recursive Base Case Off-by-One
- **Correct Answer:** **(A)** 3
- **Explanation:** mystery(3) = 3 * mystery(1). mystery(1) = 1 * mystery(-1). mystery(-1) returns 1. Result = 3 * 1 * 1 = 3.

#### Q20. Unique Pointer Move Semantics
- **Correct Answer:** **(C)** Compilation error because copy constructor is deleted
- **Explanation:** std::unique_ptr has a deleted copy constructor. It can only be moved using std::move, not copied.

### Set 2 — Java Explanations

#### Q1. Integer Cache in Java
- **Correct Answer:** **(B)** true false
- **Explanation:** Java caches Integer objects in the range [-128, 127]. For 127, both refer to the cached instance (true). For 128, distinct objects are created on the heap, so == compares references (false).

#### Q2. Finally Block Execution with Return
- **Correct Answer:** **(B)** 20
- **Explanation:** The finally block always executes and its return statement overrides any return statement executed inside the try block.

#### Q3. String Immutability and concat
- **Correct Answer:** **(B)** Java
- **Explanation:** Strings in Java are immutable. s.concat() returns a new string, but since the return value is not assigned back to s, s remains "Java".

#### Q4. Static Method Overriding (Hiding)
- **Correct Answer:** **(A)** Super 
- **Explanation:** Static methods in Java cannot be overridden; they are hidden. Method resolution for static methods is determined at compile time based on the reference type (Super).

#### Q5. ConcurrentModificationException in For-Each
- **Correct Answer:** **(B)** ConcurrentModificationException
- **Explanation:** Modifying an ArrayList directly while iterating over it via an enhanced for-loop (iterator) invalidates the iterators modCount, triggering ConcurrentModificationException.

#### Q6. Bitwise Unsigned Right Shift
- **Correct Answer:** **(A)** true
- **Explanation:** The >>> operator zero-fills the high-order bits regardless of sign. For negative numbers, this results in a large positive integer (> 0).

#### Q7. Array Polymorphism and ArrayStoreException
- **Correct Answer:** **(C)** ArrayStoreException at runtime
- **Explanation:** Java arrays are covariant and retain runtime type information. Storing an Integer (42) into a String[] array causes ArrayStoreException at runtime.

#### Q8. StringBuilder Capacity Growth
- **Correct Answer:** **(C)** 16
- **Explanation:** The default no-arg constructor of StringBuilder allocates a buffer with an initial capacity of 16 characters.

#### Q9. Ternary Operator Auto-Unboxing NullPointerException
- **Correct Answer:** **(B)** Prints false without error
- **Explanation:** Because b != null is false, the expression safely returns false without attempting to unbox null. Result is false.

#### Q10. Final Variable Reassignment
- **Correct Answer:** **(B)** Compilation error in reset(): cannot assign a value to final variable x
- **Explanation:** A blank final instance variable must be assigned exactly once in an initializer or constructor; reassigning in a method is a compile-time error.

#### Q11. Switch Expression Exhaustiveness
- **Correct Answer:** **(B)** Must cover all possible input values (exhaustive), often requiring default
- **Explanation:** Switch expressions that produce a value must be exhaustive; all enum constants or a default branch must be present.

#### Q12. HashMap get with Key hashCode Mutation
- **Correct Answer:** **(B)** map.get(key) will likely return null because the bucket lookup looks in the new hash index
- **Explanation:** If an object hashCode changes after being placed in a HashMap, searching for it computes the new hash code and looks in the wrong bucket, returning null.

#### Q13. Interface Default Method Resolution
- **Correct Answer:** **(B)** Must explicitly override the method to resolve the ambiguity or compile error occurs
- **Explanation:** The compiler requires the implementing class to explicitly override the conflicting method and decide how to resolve it (e.g., A.super.m()).

#### Q14. Garbage Collection System.gc Guarantee
- **Correct Answer:** **(B)** It is merely a hint/request to the JVM; there is no guarantee GC will run immediately
- **Explanation:** System.gc() merely suggests that the Java Virtual Machine expend effort toward recycling unused objects; the JVM is free to ignore it.

#### Q15. Covariant Return Types
- **Correct Answer:** **(B)** Yes, Java supports covariant return types since Java 5
- **Explanation:** Java allows an overriding method to declare a return type that is a subtype (subclass) of the return type declared in the overridden method.

#### Q16. Volatile Keyword Guarantee
- **Correct Answer:** **(B)** Memory visibility across threads (reads/writes directly to main memory) and instruction reordering prevention
- **Explanation:** volatile guarantees that any read of a volatile variable sees the most recent write by any thread, but it does NOT provide mutual exclusion or atomic compound operations.

#### Q17. Cloneable Interface Marker
- **Correct Answer:** **(C)** No methods; it is a marker interface
- **Explanation:** Cloneable is a marker (tagging) interface with zero method declarations. clone() is defined as protected in java.lang.Object.

#### Q18. Try-With-Resources AutoCloseable
- **Correct Answer:** **(B)** In reverse order of declaration (r2 first, then r1)
- **Explanation:** Resources in a try-with-resources statement are closed in reverse order of their creation/declaration.

#### Q19. String intern() Pool
- **Correct Answer:** **(A)** true
- **Explanation:** intern() returns the canonical representation from the string intern pool. Since s2 is a string literal from the pool, s1 == s2 evaluates to true.

#### Q20. Generics Type Erasure
- **Correct Answer:** **(B)** Type parameters are erased and replaced by their bounds (or Object) with necessary casts
- **Explanation:** Java uses type erasure: generic type parameters are replaced by their upper bound (or Object) at compile time to maintain backwards compatibility.

### Set 2 — Python Explanations

#### Q1. Default Mutable Argument Trap
- **Correct Answer:** **(B)** [1] then [1, 2]
- **Explanation:** Default argument expressions in Python are evaluated once when the function is defined, not each time it is called. The shared list accumulates elements across calls: [1], then [1, 2].

#### Q2. Integer Caching (-5 to 256)
- **Correct Answer:** **(B)** True False
- **Explanation:** CPython pre-allocates an array of integer objects for small integers in the range [-5, 256]. 256 shares the same object id (True), whereas 257 creates distinct objects (False).

#### Q3. Tuple with Mutable Element Mutation
- **Correct Answer:** **(B)** ([1, 2, 99], 3)
- **Explanation:** The tuple itself is immutable (its references cannot change), but the list inside the tuple is mutable, so appending 99 to t[0] succeeds: ([1, 2, 99], 3).

#### Q4. List Comprehension Variable Leak (Python 3)
- **Correct Answer:** **(C)** 100
- **Explanation:** In Python 3, list comprehensions have their own local scope, preventing the loop variable from leaking into the enclosing scope. x remains 100.

#### Q5. String Multiplication and Join
- **Correct Answer:** **(A)** a-b-a-b
- **Explanation:** ["a", "b"] * 2 produces ["a", "b", "a", "b"]. Joining them with "-" produces "a-b-a-b".

#### Q6. Isinstance with Bool and Int
- **Correct Answer:** **(B)** True
- **Explanation:** In Python, the bool class is a direct subclass of int (True has int value 1, False has 0). Therefore isinstance(True, int) is True.

#### Q7. Dictionary get Default Value
- **Correct Answer:** **(B)** 42
- **Explanation:** dict.get(key, default) returns the specified default value (42) if the key is not present in the dictionary without raising a KeyError.

#### Q8. Generator Yield State
- **Correct Answer:** **(B)** 1 2
- **Explanation:** Generators yield one value at a time and suspend state. The first next() yields 1, and the second yields 2.

#### Q9. Nonlocal Keyword Purpose
- **Correct Answer:** **(B)** Binds x to the nearest enclosing non-global scope variable
- **Explanation:** nonlocal causes the identifier to refer to previously bound variables in the nearest enclosing scope excluding globals.

#### Q10. Set Discard vs Remove
- **Correct Answer:** **(A)** remove raises KeyError; discard does nothing
- **Explanation:** s.remove(x) raises a KeyError if x is not present in the set. s.discard(x) silently does nothing if x is absent.

#### Q11. Try Except Else Block
- **Correct Answer:** **(B)** Only when NO exception was raised in the try block
- **Explanation:** The else block executes only if the try block completed successfully without raising any exceptions.

#### Q12. List Pop with Index
- **Correct Answer:** **(B)** 20
- **Explanation:** pop(index) removes and returns the element at the specified index. Index 1 contains 20.

#### Q13. Unhashable Type in Dictionary Key
- **Correct Answer:** **(C)** list: [1, 2]
- **Explanation:** Dictionary keys must be hashable and immutable. Lists are mutable and unhashable, raising TypeError: unhashable type: list.

#### Q14. All Function on Empty Iterable
- **Correct Answer:** **(B)** True
- **Explanation:** all() returns True if all elements of the iterable are true, or if the iterable is empty (vacuous truth).

#### Q15. Lambda Sorting by Key
- **Correct Answer:** **(B)** [(4, 1), (2, 2), (1, 3)]
- **Explanation:** The key extracts the second element of each tuple: 1, 2, 3. The sorted order is [(4, 1), (2, 2), (1, 3)].

#### Q16. Enumerate Start Index
- **Correct Answer:** **(B)** (1, "apple")
- **Explanation:** enumerate(iterable, start=1) starts the counter at 1, yielding (1, "apple") first.

#### Q17. String Splitting with Maxsplit
- **Correct Answer:** **(A)** ["a", "b", "c,d"]
- **Explanation:** split(",", 2) splits at most 2 times, producing 3 chunks: ["a", "b", "c,d"].

#### Q18. Dict Keys Union (Python 3.9+)
- **Correct Answer:** **(B)** d1 | d2
- **Explanation:** Python 3.9 introduced the dictionary union operator |: d1 | d2 creates a merged dictionary.

#### Q19. Zip with Unequal Lengths
- **Correct Answer:** **(B)** 2
- **Explanation:** zip() stops when the shortest input iterable is exhausted. ["a", "b"] has length 2, so the result has length 2.

#### Q20. Global Variable Modification Without Declaration
- **Correct Answer:** **(B)** UnboundLocalError: local variable referenced before assignment
- **Explanation:** Assigning to x makes it local to f(). Attempting to read x before assignment (in +=) raises UnboundLocalError.

---

## Round 1 — Set 3

### Quick Answer Key (Set 3)

| Q# | C++ Key | Java Key | Python Key |
|:---:|:---:|:---:|:---:||
| Q1 | **B** | **B** | **B** |
| Q2 | **C** | **A** | **B** |
| Q3 | **B** | **B** | **B** |
| Q4 | **B** | **A** | **B** |
| Q5 | **C** | **B** | **B** |
| Q6 | **A** | **C** | **B** |
| Q7 | **A** | **B** | **B** |
| Q8 | **B** | **C** | **A** |
| Q9 | **C** | **B** | **B** |
| Q10 | **C** | **B** | **B** |
| Q11 | **B** | **B** | **B** |
| Q12 | **C** | **A** | **B** |
| Q13 | **B** | **B** | **B** |
| Q14 | **B** | **B** | **B** |
| Q15 | **B** | **B** | **B** |
| Q16 | **B** | **B** | **A** |
| Q17 | **B** | **C** | **B** |
| Q18 | **B** | **B** | **A** |
| Q19 | **B** | **B** | **B** |
| Q20 | **B** | **B** | **B** |

### Set 3 — C++ Explanations

#### Q1. Array Pointer Arithmetic
- **Correct Answer:** **(B)** 20
- **Explanation:** arr + 3 points to arr[3] (40). (ptr - 2) points to arr[1], so *(ptr - 2) is 20.

#### Q2. Const Pointer vs Pointer to Const
- **Correct Answer:** **(C)** int* const p = &x;
- **Explanation:** int* const p declares a const pointer to an int; the pointer address cannot be reassigned.

#### Q3. Enum Class Type Safety
- **Correct Answer:** **(B)** enum class is strongly typed and does not implicitly convert to int
- **Explanation:** Scoped enums (enum class) are strongly typed and do not implicitly convert to integers without static_cast.

#### Q4. Bitwise Shift Operator
- **Correct Answer:** **(B)** 24
- **Explanation:** Left-shifting by 3 multiplies by 2^3 = 8: 3 * 8 = 24.

#### Q5. Switch Case Fallthrough
- **Correct Answer:** **(C)** 23D
- **Explanation:** Because there are no break statements, execution falls through from case 2 all the way through default, printing 23D.

#### Q6. Typeid and Polymorphism
- **Correct Answer:** **(A)** Base class must have at least one virtual function
- **Explanation:** Runtime Type Information (RTTI) via typeid on dereferenced pointers only queries runtime type if the class has a virtual table (at least one virtual method).

#### Q7. String substr Parameters
- **Correct Answer:** **(A)** CDE
- **Explanation:** substr(pos, count) takes the start index (2) and character count (3). Indices 2, 3, 4 are 'C', 'D', 'E'.

#### Q8. Vector Capacity vs Size
- **Correct Answer:** **(B)** The total allocated storage capacity without needing reallocation
- **Explanation:** capacity() returns the number of elements the vector can hold before a new memory reallocation is required.

#### Q9. Auto Type Deduction with References
- **Correct Answer:** **(C)** int
- **Explanation:** auto drops top-level const and reference qualifiers by default. To preserve them, auto& or const auto& must be used.

#### Q10. Comma Operator Evaluation
- **Correct Answer:** **(C)** 45
- **Explanation:** The comma operator evaluates expressions from left to right and returns the value of the last expression: a = 5, b = 9, 5 * 9 = 45.

#### Q11. Smart Pointer Cycle Memory Leak
- **Correct Answer:** **(B)** Circular reference causing reference counts never to reach zero (memory leak)
- **Explanation:** Cyclic dependencies between shared_ptrs prevent reference counts from ever reaching 0, resulting in memory leaks. std::weak_ptr solves this.

#### Q12. Set Insertion Duplicate Behavior
- **Correct Answer:** **(C)** Does nothing and returns pair<iterator, bool> where bool is false
- **Explanation:** std::set contains unique elements. Inserting a duplicate fails silently; the returned pair.second is false.

#### Q13. Friend Function Access
- **Correct Answer:** **(B)** It has access to private and protected members of Box
- **Explanation:** A friend function is a non-member function granted access to the private and protected members of the class declaring it.

#### Q14. Constexpr Function Evaluation
- **Correct Answer:** **(B)** Can be evaluated at compile time
- **Explanation:** constexpr indicates that the function can be evaluated at compile time if all arguments are known compile-time constants.

#### Q15. Char Array Null Terminator Off-by-One
- **Correct Answer:** **(B)** Compile error or lacks null terminator because "HELLO" needs 6 bytes
- **Explanation:** "HELLO" consists of 5 letters plus 1 null terminator ('\0'). Storing it in char str[5] causes an initializer string too long error in C++.

#### Q16. Vector pop_back on Empty Vector
- **Correct Answer:** **(B)** Undefined Behavior
- **Explanation:** Calling pop_back() or back() on an empty container in C++ results in Undefined Behavior.

#### Q17. Destructor Call Order in Inheritance
- **Correct Answer:** **(B)** Derived first, then Base
- **Explanation:** Destructors are executed in reverse order of constructors: the Derived destructor runs first, followed by the Base destructor.

#### Q18. std::move State After Move
- **Correct Answer:** **(B)** s1 is in a valid but unspecified state
- **Explanation:** The C++ standard guarantees that a moved-from standard library object is in a valid but unspecified state.

#### Q19. Float to Int Conversion Truncation
- **Correct Answer:** **(B)** -3
- **Explanation:** Floating-point to integer conversion in C++ truncates towards zero. Truncating -3.75 towards zero gives -3.

#### Q20. Priority Queue Default Ordering
- **Correct Answer:** **(B)** Max-heap (largest element on top)
- **Explanation:** std::priority_queue uses std::less<T> by default, creating a max-heap where the largest element is at the top.

### Set 3 — Java Explanations

#### Q1. Pass-by-Value Object Reference Reassignment
- **Correct Answer:** **(B)** Hello World
- **Explanation:** Java is strictly pass-by-value. The method receives a copy of the reference. Modifying the referenced object mutates it, but reassigning the local reference does not affect main.

#### Q2. Static Initializer Block Order
- **Correct Answer:** **(A)** S I C
- **Explanation:** When the class is loaded, static initializers run once (S). Then for each new instance, instance initializers run (I), followed by the constructor (C).

#### Q3. Array Equality Check
- **Correct Answer:** **(B)** false
- **Explanation:** Arrays do not override Object.equals(); therefore a1.equals(a2) performs reference equality (a1 == a2), which is false. Use Arrays.equals(a1, a2) for content equality.

#### Q4. Polymorphism with Instance Variables
- **Correct Answer:** **(A)** 10
- **Explanation:** In Java, variables are not polymorphic; they are resolved at compile time based on the declared reference type (Parent), so p.x is 10.

#### Q5. Super Constructor Call Constraint
- **Correct Answer:** **(B)** Must be the very first statement
- **Explanation:** In Java, if super(...) or this(...) is explicitly invoked, it must unconditionally be the first statement in the constructor.

#### Q6. TreeMap Natural Ordering Key Requirement
- **Correct Answer:** **(C)** Comparable
- **Explanation:** Default TreeMap relies on natural ordering, requiring key objects to implement java.lang.Comparable (or provide an explicit Comparator in constructor).

#### Q7. Character Arithmetic Output
- **Correct Answer:** **(B)** 66
- **Explanation:** Binary operator + promotes char to int. 'A' has ASCII value 65, so 65 + 1 = 66.

#### Q8. Checked vs Unchecked Exceptions
- **Correct Answer:** **(C)** NullPointerException
- **Explanation:** NullPointerException extends RuntimeException and is an unchecked exception; the compiler does not force callers to declare or catch it.

#### Q9. Short-Circuit Bitwise vs Logical Operator
- **Correct Answer:** **(B)** 6
- **Explanation:** Single & is a non-short-circuiting logical operator; it always evaluates both operands. Thus ++x executes and x becomes 6.

#### Q10. Abstract Class Instantiation
- **Correct Answer:** **(B)** Yes, called during subclass instantiation via super()
- **Explanation:** Abstract classes can have constructors. They cannot be instantiated directly with new, but their constructors are called by subclass constructors.

#### Q11. Collections.sort Algorithm Complexity
- **Correct Answer:** **(B)** TimSort (adaptive, stable, O(N log N) worst case)
- **Explanation:** Java uses TimSort for object collections and arrays, which is a hybrid of MergeSort and InsertionSort with guaranteed O(N log N) worst-case time.

#### Q12. Method Reference Syntax
- **Correct Answer:** **(A)** System.out::println
- **Explanation:** System.out::println is an instance method reference on an existing object (System.out) matching Consumer<String>.

#### Q13. Thread start vs run
- **Correct Answer:** **(B)** Executes run() synchronously on the current calling thread without starting a new thread
- **Explanation:** Calling run() directly is just a regular synchronous method call within the current thread. start() is required to spawn a new native thread.

#### Q14. Finalize Method Deprecation
- **Correct Answer:** **(B)** Unpredictable execution timing, performance overhead, thread safety issues, and better alternatives like AutoCloseable/Cleaner exist
- **Explanation:** Finalizers are notoriously unpredictable, slow, and dangerous; they provide no guarantee of timely execution.

#### Q15. Optional get on Empty
- **Correct Answer:** **(B)** NoSuchElementException
- **Explanation:** Calling get() on an empty Optional throws java.util.NoSuchElementException: No value present.

#### Q16. List.of Immutability
- **Correct Answer:** **(B)** Throws UnsupportedOperationException
- **Explanation:** List.of() returns an unmodifiable (immutable) list. Any mutating operation like add() or remove() throws UnsupportedOperationException.

#### Q17. Package-Private Default Access
- **Correct Answer:** **(C)** Accessible only by classes in the same package (package-private)
- **Explanation:** Default access in Java is package-private: accessible only by code within the exact same package.

#### Q18. Record Classes in Java 16+
- **Correct Answer:** **(B)** Private final fields, canonical constructor, accessors x() and y(), equals(), hashCode(), and toString()
- **Explanation:** Records are transparent carriers for immutable data; the compiler generates private final fields, constructor, x()/y() accessors, equals, hashCode, and toString.

#### Q19. Narrowing Primitive Conversion Overflow
- **Correct Answer:** **(B)** -126
- **Explanation:** byte range is -128 to 127. 130 exceeds 127: 130 - 256 = -126 in 8-bit signed two complement representation.

#### Q20. Stream Intermediate vs Terminal Operations
- **Correct Answer:** **(B)** Lazily, only when a terminal operation (like collect or forEach) is invoked
- **Explanation:** Java streams are lazy; intermediate operations are not evaluated until a terminal operation is initiated on the pipeline.

### Set 3 — Python Explanations

#### Q1. Shallow Copy List Multiplication
- **Correct Answer:** **(B)** [[7, 0], [7, 0]]
- **Explanation:** Multiplying a list containing a mutable list [[0]*2] * 2 creates references to the exact same inner list. Modifying matrix[0][0] modifies all rows: [[7, 0], [7, 0]].

#### Q2. String Reverse Slice
- **Correct Answer:** **(B)** Reverses the string s
- **Explanation:** A step of -1 traverses the sequence backwards, reversing it.

#### Q3. Floor Division with Negatives
- **Correct Answer:** **(B)** -4
- **Explanation:** Python floor division // rounds down towards negative infinity (floor): floor(-3.5) is -4.

#### Q4. Dunder Repr vs Str
- **Correct Answer:** **(B)** __repr__
- **Explanation:** repr(obj) invokes obj.__repr__(). If __str__ is missing, str() also falls back to __repr__().

#### Q5. Walrus Operator (Python 3.8+)
- **Correct Answer:** **(B)** Assigns a value to a variable as part of an expression
- **Explanation:** The := assignment expression (walrus) operator allows assignment of variables within an expression.

#### Q6. Filter Function Output Type
- **Correct Answer:** **(B)** filter object (iterator)
- **Explanation:** In Python 3, filter() returns an iterator of type filter, not a list. To get a list, list(f) must be called.

#### Q7. Class Variable vs Instance Variable Shadowing
- **Correct Answer:** **(B)** hound canine canine
- **Explanation:** d1.kind = 'hound' binds an instance variable to d1, shadowing the class variable. d2 and Dog still refer to the class variable 'canine'.

#### Q8. Args and Kwargs Unpacking
- **Correct Answer:** **(A)** args collects positional arguments as a tuple; kwargs collects keyword arguments as a dict
- **Explanation:** *args bundles extra positional arguments into a tuple, while **kwargs bundles extra keyword arguments into a dictionary.

#### Q9. Any Function on Falsy Values
- **Correct Answer:** **(B)** False
- **Explanation:** any() returns True if at least one element is truthy. Since all elements in the list are falsy (0, False, "", None), it returns False.

#### Q10. Multiple Inheritance and MRO
- **Correct Answer:** **(B)** C.mro() or C.__mro__
- **Explanation:** C.mro() returns the C3 superclass linearization list representing the Method Resolution Order.

#### Q11. Set Difference Operator
- **Correct Answer:** **(B)** {1, 3}
- **Explanation:** The difference operator - returns elements in the first set that are not in the second set: {1, 3}.

#### Q12. Modulo of Negative Integer in Python
- **Correct Answer:** **(B)** 1
- **Explanation:** In Python, the modulo operator always shares the sign of the divisor (3 > 0). -5 = (-2 * 3) + 1, so the remainder is 1.

#### Q13. Pass Statement Purpose
- **Correct Answer:** **(B)** A null statement used as a placeholder where syntactically code is required
- **Explanation:** pass is a null operation; nothing happens when it executes. It serves as a syntactic placeholder.

#### Q14. Dictionary Keys View Dynamic Reflection
- **Correct Answer:** **(B)** True
- **Explanation:** d.keys() returns a dynamic dictionary view. When the dictionary changes, the view automatically reflects those changes (True).

#### Q15. Decorators Wrapping Function
- **Correct Answer:** **(B)** Equivalent to hello = my_dec(hello)
- **Explanation:** The @decorator syntax is syntactic sugar for passing the defined function into the decorator and rebinding the name: hello = my_dec(hello).

#### Q16. Chained Comparison Evaluation
- **Correct Answer:** **(A)** True
- **Explanation:** Python supports chained comparisons: (1 < 2) and (2 < 3) and (3 == 3). All evaluate to True, so result is True.

#### Q17. String Isdigit vs Isnumeric
- **Correct Answer:** **(B)** True True
- **Explanation:** Unicode superscript digits like "²" are recognized as digits by both isdigit() and isnumeric().

#### Q18. Iter Function with Sentinel
- **Correct Answer:** **(A)** Calls callable repeatedly until it returns sentinel
- **Explanation:** The two-argument form iter(callable, sentinel) creates an iterator that invokes callable on each next() call until it returns sentinel.

#### Q19. F-Strings Formatting Specifier
- **Correct Answer:** **(B)** 123.46
- **Explanation:** The .2f format specifier rounds to 2 decimal places with standard half-to-even rounding: 123.46.

#### Q20. Recursion Limit Error
- **Correct Answer:** **(B)** RecursionError
- **Explanation:** Python raises RecursionError (a subclass of RuntimeError) when the maximum recursion depth (default 1000) is exceeded.

---

## Round 1 — Set 4

### Quick Answer Key (Set 4)

| Q# | C++ Key | Java Key | Python Key |
|:---:|:---:|:---:|:---:||
| Q1 | **B** | **A** | **B** |
| Q2 | **A** | **B** | **B** |
| Q3 | **A** | **B** | **B** |
| Q4 | **A** | **B** | **B** |
| Q5 | **B** | **B** | **A** |
| Q6 | **B** | **B** | **B** |
| Q7 | **A** | **B** | **B** |
| Q8 | **A** | **B** | **B** |
| Q9 | **B** | **B** | **B** |
| Q10 | **B** | **B** | **B** |
| Q11 | **B** | **B** | **B** |
| Q12 | **B** | **A** | **B** |
| Q13 | **B** | **B** | **B** |
| Q14 | **B** | **B** | **B** |
| Q15 | **B** | **A** | **B** |
| Q16 | **A** | **B** | **B** |
| Q17 | **A** | **A** | **B** |
| Q18 | **B** | **B** | **B** |
| Q19 | **B** | **B** | **A** |
| Q20 | **B** | **B** | **B** |

### Set 4 — C++ Explanations

#### Q1. C-Style String Length vs Sizeof
- **Correct Answer:** **(B)** 4 5
- **Explanation:** strlen counts characters before '\0' (4). sizeof includes the null terminator byte (5).

#### Q2. Default Member Access in Struct vs Class
- **Correct Answer:** **(A)** struct: public; class: private
- **Explanation:** In C++, struct members default to public, while class members default to private.

#### Q3. Multiple Catch Blocks Ordering
- **Correct Answer:** **(A)** Compilation warning or runtime_error block is unreachable
- **Explanation:** Catch blocks are tested in order. Since runtime_error inherits from exception, the first block catches it, making the second block dead code.

#### Q4. Pointer Difference
- **Correct Answer:** **(A)** 3
- **Explanation:** Pointer subtraction yields the number of elements between them: 4 - 1 = 3 (not bytes).

#### Q5. Unsigned Underflow Wrap
- **Correct Answer:** **(B)** 4294967295 (UINT_MAX)
- **Explanation:** Unsigned arithmetic wraps modulo 2^N. 0u - 1u results in UINT_MAX (4294967295 on 32-bit uint).

#### Q6. Dynamic Cast Downcasting Failure
- **Correct Answer:** **(B)** Returns nullptr
- **Explanation:** When dynamic_cast fails on a pointer type, it returns nullptr. (If cast on reference types, it throws std::bad_cast).

#### Q7. Logical OR Short-Circuit
- **Correct Answer:** **(A)** 11 2
- **Explanation:** Since a == 1 is true, logical OR short-circuits and ++b is not evaluated. a becomes 11 and b remains 2.

#### Q8. Copy Elision / RVO
- **Correct Answer:** **(A)** A compiler optimization that avoids copying or moving temporary return objects
- **Explanation:** RVO allows the compiler to construct the returned object directly in the storage allocated for the callers receiving variable.

#### Q9. Pure Virtual Function Syntax
- **Correct Answer:** **(B)** virtual void draw() = 0;
- **Explanation:** In C++, appending = 0 to a virtual function declaration marks it as pure virtual, making the class abstract.

#### Q10. Map Key Ordering
- **Correct Answer:** **(B)** Sorted ascending by key
- **Explanation:** std::map is implemented as a Red-Black Tree and stores keys in sorted ascending order (via std::less by default).

#### Q11. Static Member Initialization
- **Correct Answer:** **(B)** Outside the class definition at namespace scope
- **Explanation:** Non-inline, non-const static data members must be defined outside the class body at namespace scope (e.g. int Widget::count = 0;).

#### Q12. Function Overloading by Return Type
- **Correct Answer:** **(B)** No, causes compilation error
- **Explanation:** Function overloading requires different parameter lists. Return type alone is insufficient to distinguish overloads.

#### Q13. Vector clear vs shrink_to_fit
- **Correct Answer:** **(B)** Reduces size to 0 but keeps capacity unchanged
- **Explanation:** clear() destroys the elements and sets size to 0, but does not deallocate storage. capacity remains unchanged.

#### Q14. Bitwise NOT of Zero
- **Correct Answer:** **(B)** -1
- **Explanation:** In two complement, all 1s bits represent -1. Bitwise NOT of 0 (all 0s) is all 1s, which is -1.

#### Q15. Initialization Order of Members
- **Correct Answer:** **(B)** In the order they are declared in the class definition
- **Explanation:** Class members are always initialized in the order of their declaration in the class definition (here b before a), regardless of initializer list order.

#### Q16. Mutable Keyword Purpose
- **Correct Answer:** **(A)** Allows modification inside const member functions
- **Explanation:** mutable allows a member variable of a class to be modified even within const member functions.

#### Q17. String find First Occurrence
- **Correct Answer:** **(A)** 1 5
- **Explanation:** s.find('a') finds the first occurrence at index 1. s.rfind('a') finds the last occurrence at index 5.

#### Q18. Dangling Reference to Local
- **Correct Answer:** **(B)** Dangling reference and undefined behavior when accessed
- **Explanation:** The local variable x is destroyed when getVal() returns. Returning a reference to it results in a dangling reference and undefined behavior.

#### Q19. Std All_of Algorithm
- **Correct Answer:** **(B)** true
- **Explanation:** Vacuous truth: std::all_of returns true if the range is empty, regardless of the predicate.

#### Q20. Explicit Constructor Purpose
- **Correct Answer:** **(B)** Prevents implicit type conversion and copy-initialization from int
- **Explanation:** explicit prevents the compiler from using the constructor for implicit conversions (e.g. MyInt m = 5; becomes invalid).

### Set 4 — Java Explanations

#### Q1. String Substring Indices
- **Correct Answer:** **(A)** IGRA
- **Explanation:** substring(beginIndex, endIndex) is half-open [beginIndex, endIndex). Characters from index 4 to 7 are 'I', 'G', 'R', 'A'.

#### Q2. Static Variable Shared Across Instances
- **Correct Answer:** **(B)** 2 2
- **Explanation:** static variables are shared across all instances of the class. Two instances increment count twice, so count is 2.

#### Q3. Catching Exception Order
- **Correct Answer:** **(B)** IOException has already been caught (unreachable catch block)
- **Explanation:** Subclasses of Exception cannot follow Exception in catch clauses because they are completely shadowed and unreachable, triggering a compile error.

#### Q4. Floating Point Precision Representation
- **Correct Answer:** **(B)** false
- **Explanation:** Due to IEEE 754 binary floating-point representation limits, 0.1 + 0.2 equals 0.30000000000000004, which is not equal to 0.3 (false).

#### Q5. Synchronized Method Lock Target
- **Correct Answer:** **(B)** The current instance object (this)
- **Explanation:** A non-static synchronized method synchronizes on the instance object on which it was called (this). Static synchronized methods lock on the Class object.

#### Q6. Anonymous Inner Class Variable Capture
- **Correct Answer:** **(B)** Must be explicitly or effectively final
- **Explanation:** Variables captured from an enclosing scope must be final or effectively final (never modified after initialization).

#### Q7. Queue peek vs poll
- **Correct Answer:** **(B)** peek() inspects and returns null; poll() retrieves and removes the head (or returns null)
- **Explanation:** peek() returns the head element without removing it; poll() removes and returns the head element. Both return null on an empty queue.

#### Q8. Transient Keyword Purpose
- **Correct Answer:** **(B)** The variable will not be serialized when the object is serialized
- **Explanation:** transient marks a member field not to be included in the serialized binary representation when the object is written to an ObjectOutputStream.

#### Q9. Enum values() Return Type
- **Correct Answer:** **(B)** Color[] array containing all enum constants in order of declaration
- **Explanation:** The compiler automatically creates a static values() method on every enum that returns an array containing all enum constants in declaration order.

#### Q10. StringBuilder vs StringBuffer Thread Safety
- **Correct Answer:** **(B)** StringBuffer is synchronized and thread-safe; StringBuilder is unsynchronized and faster for single-threaded use
- **Explanation:** StringBuffer methods are synchronized for thread-safety. StringBuilder is non-synchronized, providing higher performance in single-threaded code.

#### Q11. Arrays asList Fixed Size
- **Correct Answer:** **(B)** Throws UnsupportedOperationException
- **Explanation:** Arrays.asList() returns a fixed-size list backed by the array. Structural modifications like add() or remove() throw UnsupportedOperationException.

#### Q12. Polymorphic Method Resolution with super Reference
- **Correct Answer:** **(A)** BC
- **Explanation:** In C, super.print() calls B.print(), which prints "B". Then C prints "C", yielding "BC".

#### Q13. Functional Interface Annotation
- **Correct Answer:** **(B)** It has exactly one abstract method (SAM)
- **Explanation:** A functional interface has exactly one abstract method (Single Abstract Method). It may contain any number of default or static methods.

#### Q14. HashSet Internal Implementation
- **Correct Answer:** **(B)** A HashMap instance (elements stored as keys with a dummy Object as value)
- **Explanation:** HashSet is backed internally by a HashMap. When you call set.add(e), it executes map.put(e, PRESENT).

#### Q15. Strictfp Keyword Meaning
- **Correct Answer:** **(A)** Forces IEEE 754 strict floating-point calculation rules across all hardware architectures
- **Explanation:** strictfp ensures that floating-point calculations adhere strictly to IEEE 754 standards across all platforms, ensuring reproducibility.

#### Q16. Comparable compareTo Contract
- **Correct Answer:** **(B)** A positive integer (> 0)
- **Explanation:** The compareTo method returns a negative integer, zero, or a positive integer as this object is less than, equal to, or greater than the specified object.

#### Q17. String repeat Method in Java 11+
- **Correct Answer:** **(A)** ababab
- **Explanation:** String.repeat(int count) concatenates the string count times: "ab" * 3 = "ababab".

#### Q18. Deadlock Condition in Multithreading
- **Correct Answer:** **(B)** Circular wait condition between two threads holding mutually requested locks
- **Explanation:** Circular wait occurs when Thread 1 holds lock A waiting for lock B, while Thread 2 holds lock B waiting for lock A.

#### Q19. Generics Wildcard Lower Bound
- **Correct Answer:** **(B)** List<Integer>, List<Number>, or List<Object>
- **Explanation:** ? super Integer specifies a lower bound: it accepts Integer and any of its superclasses (Number, Object).

#### Q20. System.exit in Try-Finally
- **Correct Answer:** **(B)** No, System.exit immediately halts JVM execution and finally does NOT run
- **Explanation:** System.exit(0) terminates the running Java Virtual Machine immediately; pending finally blocks will not execute.

### Set 4 — Python Explanations

#### Q1. Copy vs Deepcopy
- **Correct Answer:** **(B)** Recursively copies all nested objects, creating completely independent data structures
- **Explanation:** deepcopy recursively copies all compound objects and everything they contain, completely detaching the new object from the original.

#### Q2. List Insert at Negative Index
- **Correct Answer:** **(B)** [1, 2, 99, 3]
- **Explanation:** insert(i, x) inserts BEFORE the specified index. Index -1 refers to the last element (3), so 99 is inserted before 3: [1, 2, 99, 3].

#### Q3. Dict Comprehension Inversion
- **Correct Answer:** **(B)** {1: "a", 2: "b"}
- **Explanation:** This dictionary comprehension inverts keys and values, producing {1: "a", 2: "b"}.

#### Q4. Staticmethod vs Classmethod Decorators
- **Correct Answer:** **(B)** The class object itself (cls)
- **Explanation:** A method decorated with @classmethod receives the class itself as its first argument (usually named cls), whereas regular methods receive self.

#### Q5. String Strip Characters Parameter
- **Correct Answer:** **(A)** Hello World
- **Explanation:** strip(chars) strips all characters present in the chars argument from both ends until a non-matching character is met: "Hello World".

#### Q6. Zip Longest from itertools
- **Correct Answer:** **(B)** itertools
- **Explanation:** zip_longest is part of the standard itertools module.

#### Q7. Identity Comparison of Empty Collections
- **Correct Answer:** **(B)** False
- **Explanation:** Each empty list literal creates a brand new list object in heap memory. Because they have different memory addresses, [] is [] is False.

#### Q8. Context Manager Dunder Methods
- **Correct Answer:** **(B)** __enter__ and __exit__
- **Explanation:** The Python context management protocol requires __enter__(self) and __exit__(self, exc_type, exc_val, exc_tb).

#### Q9. Defaultdict from collections
- **Correct Answer:** **(B)** Returns 0 and inserts ("hits", 0) into the dict
- **Explanation:** defaultdict calls the factory function (int() -> 0), inserts the key with this default value, and returns 0.

#### Q10. Truthy Value of Empty Custom Class
- **Correct Answer:** **(B)** True
- **Explanation:** By default, instances of user-defined classes are considered truthy unless the class defines __bool__() or __len__() returning False/0.

#### Q11. Lambda Closure Binding Late Evaluation
- **Correct Answer:** **(B)** [2, 2, 2]
- **Explanation:** Python closures bind by reference (late binding). When the lambdas are called, i has its final loop value 2. To fix this, use default argument: lambda i=i: i.

#### Q12. Set Symmetric Difference
- **Correct Answer:** **(B)** s1 ^ s2
- **Explanation:** The bitwise XOR operator ^ computes the symmetric difference between two sets: {1, 2} ^ {2, 3} = {1, 3}.

#### Q13. Round Function Half to Even
- **Correct Answer:** **(B)** 2 4
- **Explanation:** Python 3 uses banker rounding (round half to even): round(2.5) rounds to nearest even integer 2; round(3.5) rounds to nearest even integer 4.

#### Q14. String Join Non-String TypeError
- **Correct Answer:** **(B)** TypeError: sequence item 0: expected str instance, int found
- **Explanation:** str.join() requires all elements of the iterable to be strings. Passing integers raises a TypeError.

#### Q15. Functools Lru Cache
- **Correct Answer:** **(B)** Memoizes function calls by caching previous return values based on input arguments
- **Explanation:** lru_cache wraps a function with a memoizing callable that saves up to maxsize recent results, turning exponential recursion into linear time.

#### Q16. Tuple Unpacking with Star Target
- **Correct Answer:** **(B)** [2, 3, 4]
- **Explanation:** Extended iterable unpacking collects intermediate values into a list: a = 1, rest = [2, 3, 4], b = 5.

#### Q17. Assert Statement Disabled with Flag
- **Correct Answer:** **(B)** -O (optimize flag)
- **Explanation:** Running Python with -O or -OO enables basic optimizations and strips all assert statements and __debug__ code.

#### Q18. Dunder Eq and Dunder Hash Relationship
- **Correct Answer:** **(B)** __hash__
- **Explanation:** If a class overrides __eq__, Python sets its __hash__ to None, making instances unhashable unless __hash__ is explicitly defined.

#### Q19. Re Match vs Re Search
- **Correct Answer:** **(A)** re.match checks only at the beginning of the string; re.search searches throughout the entire string
- **Explanation:** re.match() matches only at the beginning of the string, while re.search() scans the entire string looking for the first location where the pattern matches.

#### Q20. Sort List In-Place vs Sorted Builtin
- **Correct Answer:** **(B)** None
- **Explanation:** In-place mutating methods in Python (like list.sort() or list.reverse()) return None to emphasize that the list was mutated in-place.

---

## Round 1 — Set 5

### Quick Answer Key (Set 5)

| Q# | C++ Key | Java Key | Python Key |
|:---:|:---:|:---:|:---:||
| Q1 | **B** | **B** | **B** |
| Q2 | **C** | **B** | **A** |
| Q3 | **A** | **B** | **B** |
| Q4 | **B** | **B** | **B** |
| Q5 | **B** | **B** | **B** |
| Q6 | **B** | **B** | **B** |
| Q7 | **B** | **B** | **A** |
| Q8 | **B** | **B** | **B** |
| Q9 | **B** | **A** | **B** |
| Q10 | **B** | **C** | **B** |
| Q11 | **B** | **B** | **B** |
| Q12 | **B** | **B** | **B** |
| Q13 | **C** | **A** | **A** |
| Q14 | **B** | **A** | **B** |
| Q15 | **B** | **B** | **B** |
| Q16 | **A** | **B** | **B** |
| Q17 | **B** | **A** | **B** |
| Q18 | **B** | **B** | **B** |
| Q19 | **A** | **B** | **B** |
| Q20 | **C** | **B** | **A** |

### Set 5 — C++ Explanations

#### Q1. Bitwise AND Power of Two Check
- **Correct Answer:** **(B)** Whether n is a power of 2
- **Explanation:** Subtracting 1 flips the least significant set bit. If n is a power of 2 (exactly one 1-bit), n & (n - 1) is 0.

#### Q2. Array Bound Indexing Undefined Behavior
- **Correct Answer:** **(C)** Undefined Behavior (out-of-bounds access)
- **Explanation:** C++ does not perform runtime array bounds checking on native arrays or operator[]; out-of-bounds access is Undefined Behavior.

#### Q3. Precedence of Dereference vs Increment
- **Correct Answer:** **(A)** 10 20
- **Explanation:** Postfix ++ has higher precedence than *. *ptr++ yields *ptr (10), then increments the pointer ptr to point to arr[1] (20).

#### Q4. Static Cast vs C-Style Cast
- **Correct Answer:** **(B)** static_cast performs compile-time type checks and avoids accidental dangerous conversions
- **Explanation:** Named casts like static_cast are explicit, searchable, and prevent accidental casts between unrelated pointer types.

#### Q5. String View Advantage
- **Correct Answer:** **(B)** It provides a non-owning reference avoiding dynamic heap allocation for substrings and char arrays
- **Explanation:** std::string_view is a lightweight non-owning view (pointer + length) that avoids heap allocations when passing substrings or char* literals.

#### Q6. Volatile Keyword in C++
- **Correct Answer:** **(B)** The variable may be modified externally (e.g. hardware) so do not optimize away reads/writes
- **Explanation:** volatile prevents compiler optimizations that cache reads/writes in registers, typically used for memory-mapped hardware I/O or signal handlers.

#### Q7. Override Keyword Benefit
- **Correct Answer:** **(B)** Compilation error
- **Explanation:** override instructs the compiler to verify that the method overrides an exact matching virtual method in a base class; otherwise it triggers a compile error.

#### Q8. Vector Iterators Invalidation
- **Correct Answer:** **(B)** When a reallocation occurs due to capacity exceeded, or elements before the iterator are erased/inserted
- **Explanation:** Reallocation invalidates all iterators. Even without reallocation, insertions and erasures invalidate iterators at and after the insertion/erasure point.

#### Q9. Auto Deduction with Initializer List
- **Correct Answer:** **(B)** std::initializer_list<int>
- **Explanation:** Direct list initialization with auto deduces std::initializer_list<T>.

#### Q10. Const Member Function Guarantee
- **Correct Answer:** **(B)** Modify any non-mutable member variables of the object
- **Explanation:** A const member function treats *this as const ClassName*, prohibiting modifications to member variables unless marked mutable.

#### Q11. Nullptr vs NULL
- **Correct Answer:** **(B)** nullptr is a strongly typed std::nullptr_t that avoids overload ambiguity with integer 0
- **Explanation:** NULL is typically defined as 0 or 0L, which can mistakenly bind to integer overloads. nullptr has type nullptr_t and only binds to pointer types.

#### Q12. Default Copy Constructor Behavior
- **Correct Answer:** **(B)** Shallow (member-wise) bitwise copy of member variables
- **Explanation:** The compiler-generated copy constructor performs a shallow copy, simply copying pointer addresses, which can lead to double-free bugs without custom handling.

#### Q13. De Bruijn / Bit Count Builtin
- **Correct Answer:** **(C)** 3
- **Explanation:** 14 in binary is 1110_2, which has three 1-bits. popcount counts the number of set bits (3).

#### Q14. Structured Exception Handling vs C++ Exceptions
- **Correct Answer:** **(B)** No, division by zero is undefined behavior and not a C++ throw
- **Explanation:** Division by zero is undefined behavior in ISO C++; standard C++ try/catch only catches values thrown with throw expressions.

#### Q15. Recursive Factorial Overflow
- **Correct Answer:** **(B)** 13
- **Explanation:** 12! = 479,001,600 fits in 32-bit signed int, but 13! = 6,227,020,800 overflows 2^31 - 1.

#### Q16. Vector Resize vs Reserve
- **Correct Answer:** **(A)** reserve changes capacity without adding elements; resize changes size and default-constructs elements
- **Explanation:** reserve(n) pre-allocates memory so capacity >= n (size remains 0). resize(n) creates n elements and sets size = n.

#### Q17. String find_first_of
- **Correct Answer:** **(B)** The first occurrence of ANY vowel character present in "aeiou"
- **Explanation:** find_first_of searches for the first character in the string that equals ANY character in the provided set.

#### Q18. Inline Function Keyword Meaning in Modern C++
- **Correct Answer:** **(B)** Allows a function definition to appear in multiple translation units without ODR violation
- **Explanation:** While historically a hint for inlining, modern C++ uses inline primarily to permit multiple identical definitions across header files under One Definition Rule (ODR).

#### Q19. Lambda State with Mutable
- **Correct Answer:** **(A)** 6 7 5
- **Explanation:** a is captured by value. mutable allows the lambda to modify its internal copy of a across invocations (6, 7). The original a in main remains 5.

#### Q20. Unordered Map Hash Collisions Complexity
- **Correct Answer:** **(C)** O(N)
- **Explanation:** When all keys collide into the same bucket, std::unordered_map degrades to a linear search across the collision chain, resulting in O(N) worst-case.

### Set 5 — Java Explanations

#### Q1. ThreadLocal Storage Isolation
- **Correct Answer:** **(B)** Provides thread-local variables where each accessing thread has its own independently initialized copy
- **Explanation:** ThreadLocal provides thread-confined state: each thread that accesses get() or set() accesses its own independent copy.

#### Q2. Sealed Classes (Java 17)
- **Correct Answer:** **(B)** sealed
- **Explanation:** sealed classes restrict subtyping by explicitly declaring permitted subtypes using the permits clause.

#### Q3. Happens-Before Relationship
- **Correct Answer:** **(B)** A write to a volatile variable happens-before every subsequent read of that same volatile variable
- **Explanation:** Writing to a volatile variable establishes a memory barrier ensuring all preceding writes are visible to subsequent reads of that volatile variable.

#### Q4. Equals and HashCode Contract Violation
- **Correct Answer:** **(B)** HashSet may treat them as distinct elements and add both, violating set uniqueness
- **Explanation:** If equals() is true, hashCode() MUST return the same integer; otherwise hash containers place equal objects into different buckets.

#### Q5. Stream Reduce Identity Element
- **Correct Answer:** **(B)** 20
- **Explanation:** The identity element 10 is the initial value of the accumulation: 10 + 1 + 2 + 3 + 4 = 20.

#### Q6. Pattern Matching for Instanceof (Java 16+)
- **Correct Answer:** **(B)** Automatically casts and binds obj to pattern variable s if the type matches
- **Explanation:** Pattern matching for instanceof combines the type check and variable binding into a single concise expression without explicit casting.

#### Q7. AtomicInteger Compare-And-Set (CAS)
- **Correct Answer:** **(B)** Atomically sets the value to update if and only if the current value equals expected, returning true
- **Explanation:** CAS is a lock-free hardware-level atomic instruction that updates the value only if it currently equals the expected value.

#### Q8. CompletableFuture supplyAsync
- **Correct Answer:** **(B)** ForkJoinPool.commonPool()
- **Explanation:** supplyAsync() defaults to using ForkJoinPool.commonPool() for asynchronous task execution unless an explicit Executor is passed.

#### Q9. Reflection setAccessible Meaning
- **Correct Answer:** **(A)** Allows reading and modifying private or protected fields bypassing Java language access control checks
- **Explanation:** setAccessible(true) suppresses Java language access checks, permitting access to private members (subject to SecurityManager / module permissions).

#### Q10. Classloader Hierarchy Delegation
- **Correct Answer:** **(C)** Bootstrap ClassLoader
- **Explanation:** The Bootstrap ClassLoader is the parent of all class loaders and loads the core Java runtime classes (like java.lang.*).

#### Q11. ArrayDeque vs LinkedList for Queue
- **Correct Answer:** **(B)** ArrayDeque uses contiguous array memory offering better cache locality and avoiding per-node object allocation overhead
- **Explanation:** ArrayDeque stores elements in a contiguous circular array, eliminating node allocation overhead and providing superior CPU cache locality.

#### Q12. Enum Singleton Safety
- **Correct Answer:** **(B)** It provides unconditional guarantees against multiple instantiations, even through serialization or reflection attacks
- **Explanation:** Enum singletons are inherently serializable, thread-safe, and immune to reflection attacks, as JVM prevents reflective instantiation of enums.

#### Q13. Static Nested vs Inner Class
- **Correct Answer:** **(A)** A static nested class does not have an implicit reference to an enclosing instance of Outer
- **Explanation:** Non-static inner classes retain an implicit reference to Outer.this, preventing garbage collection of the outer object if the inner instance lives longer.

#### Q14. Cleaner vs Finalizer
- **Correct Answer:** **(A)** Cleaning actions are managed in separate threads without holding strong references to the object being reclaimed
- **Explanation:** Cleaner decouples the phantom-reachable cleanup action from the target object, avoiding finalizer resurrection bugs and memory leaks.

#### Q15. SoftReference vs WeakReference
- **Correct Answer:** **(B)** WeakReferences are cleared during the next GC cycle; SoftReferences are retained until memory pressure requires reclamation
- **Explanation:** SoftReference objects are cleared at the discretion of the garbage collector in response to memory demand, making them ideal for memory-sensitive caches.

#### Q16. String.join Delimiter Behavior
- **Correct Answer:** **(B)** A-B-C
- **Explanation:** String.join(delimiter, elements) places the delimiter between elements without leading or trailing delimiters: "A-B-C".

#### Q17. Text Blocks in Java 15+
- **Correct Answer:** **(A)** Enclosed with triple double-quotes """ with opening delimiter followed by a line break
- **Explanation:** Java Text Blocks use triple double-quotes (""") and require a newline immediately following the opening delimiter.

#### Q18. Var Local Variable Type Inference (Java 10+)
- **Correct Answer:** **(B)** For method parameters, return types, and class fields
- **Explanation:** var is strictly for local variable declarations with initializers; it cannot be used for class fields, method parameter types, or return types.

#### Q19. HashMap Load Factor and Rehash
- **Correct Answer:** **(B)** 0.75 (resizes when size exceeds 75% of current capacity)
- **Explanation:** The default load factor is 0.75, which offers a good tradeoff between time and space costs. Resizing doubles capacity when size > capacity * 0.75.

#### Q20. Record Component Immutability Caveat
- **Correct Answer:** **(B)** No, while the reference members is final, the list contents remain mutable unless explicitly wrapped in Collections.unmodifiableList
- **Explanation:** Shallow immutability: record fields are final references, but mutable objects (like ArrayList) pointed to by those fields can still be modified directly.

### Set 5 — Python Explanations

#### Q1. Chainmap from Collections
- **Correct Answer:** **(B)** Groups multiple dictionaries together into a single updateable view with precedence given to the first map
- **Explanation:** ChainMap groups multiple dicts into a single view without copying data. Lookups search through each mapping in sequence.

#### Q2. Counter Most Common
- **Correct Answer:** **(A)** [("a", 5), ("b", 2)]
- **Explanation:** 'a' appears 5 times, 'b' appears 2 times, 'r' appears 2 times. most_common(2) returns a list of the 2 highest frequency tuples: [('a', 5), ('b', 2)].

#### Q3. String Formatted Raw String
- **Correct Answer:** **(B)** Treats backslashes as literal characters without escape interpretation
- **Explanation:** Prefixing a string literal with r marks it as a raw string where backslashes are treated as literal characters and not escape sequences.

#### Q4. Bitwise NOT of Integer
- **Correct Answer:** **(B)** -6
- **Explanation:** In Python, bitwise NOT of x is defined as -(x + 1). So ~5 = -(5 + 1) = -6.

#### Q5. List Clear vs New List Assignment
- **Correct Answer:** **(B)** lst.clear() empties the list in-place affecting b; lst = [] rebinds lst, leaving b unchanged
- **Explanation:** lst.clear() mutates the underlying list object in-place so all references see an empty list. lst = [] simply reassigns the local variable name to a new empty list.

#### Q6. Type of Type in Python
- **Correct Answer:** **(B)** <class "type">
- **Explanation:** type is the metaclass for classes in Python, and type is an instance of itself: type(type) is <class 'type'>.

#### Q7. Slots Optimization Benefit
- **Correct Answer:** **(A)** Restricts instance attributes, eliminating per-instance __dict__ and drastically reducing memory usage
- **Explanation:** __slots__ prevents the automatic creation of an internal __dict__ for each instance, saving significant memory when creating millions of objects.

#### Q8. Yield From Syntax (Python 3.3+)
- **Correct Answer:** **(B)** Delegates yielding elements and two-way communication directly to the sub-generator/iterable
- **Explanation:** yield from transparently delegates generator operations and yields every item from an iterable or sub-generator.

#### Q9. Frozenset Immutability
- **Correct Answer:** **(B)** Yes, because frozenset is immutable and hashable
- **Explanation:** frozenset is an immutable, hashable variant of set, allowing it to be used as a set element or dictionary key.

#### Q10. Operator Itemgetter Performance
- **Correct Answer:** **(B)** 20
- **Explanation:** operator.itemgetter(1) constructs a fast C-level callable that fetches item index 1 from its operand: 20.

#### Q11. Property Decorator Getter and Setter
- **Correct Answer:** **(B)** A managed attribute that can be read with dot notation without parentheses circle.radius
- **Explanation:** @property allows a method to be accessed as if it were a simple attribute (e.g. c.radius instead of c.radius()).

#### Q12. Keyword-Only Arguments Syntax
- **Correct Answer:** **(B)** By placing them after a bare asterisk * in the parameter list
- **Explanation:** Parameters placed after a bare * can only be passed as keyword arguments (e.g., process(data, timeout=5)), never positionally.

#### Q13. Itertools Combinations vs Permutations
- **Correct Answer:** **(A)** 3 and 6
- **Explanation:** combinations has 3 pairs (order does not matter: 3C2 = 3). permutations has 6 pairs (order matters: 3P2 = 6).

#### Q14. Dunder Call Callable Instances
- **Correct Answer:** **(B)** Defining the __call__ special method
- **Explanation:** Implementing __call__(self, *args, **kwargs) allows class instances to behave like functions when invoked with ().

#### Q15. Zip Strict Parameter (Python 3.10+)
- **Correct Answer:** **(B)** Raises ValueError: zip() argument 2 is longer than argument 1
- **Explanation:** Python 3.10 added strict=True to zip(), raising a ValueError if the iterables are not of equal length.

#### Q16. Math Isclose Floating Tolerance
- **Correct Answer:** **(B)** It compares equality within a small relative/absolute numerical tolerance (epsilon) avoiding IEEE 754 precision issues
- **Explanation:** Floating point arithmetic incurs rounding errors; math.isclose() tests whether values are close within a defined tolerance.

#### Q17. String Translation Table
- **Correct Answer:** **(B)** str.maketrans and str.translate
- **Explanation:** str.maketrans() creates a 1-to-1 character translation dictionary, which is consumed by str.translate().

#### Q18. Collections Deque O(1) Appends
- **Correct Answer:** **(B)** deque provides O(1) time complexity for appends and pops from both ends, whereas list.pop(0) is O(N)
- **Explanation:** list.pop(0) requires shifting all N elements in memory (O(N)), whereas deque is a doubly-linked list/block buffer with O(1) popleft().

#### Q19. Weakref Non-Owning References
- **Correct Answer:** **(B)** Creates references to objects without increasing their reference count, avoiding circular reference leaks
- **Explanation:** weakref creates non-owning references that allow objects to be garbage collected when only weak references remain.

#### Q20. Hash Invariance Requirement
- **Correct Answer:** **(A)** If two objects are equal (a == b), their hash values MUST be equal
- **Explanation:** The hash contract requires that if a == b is True, hash(a) MUST equal hash(b); otherwise, hash table lookups in dict and set break.

---

<a name="round-2-medium-solutions"></a>
# Round 2: Medium Debugging Solutions (Sets 1 - 7)

## Set 1: Maximum Subarray Sum with At Most K Distinct Elements

**Points:** 20 | **Category:** Medium Debugging

### Problem Statement Summary
Given an array of n integers and an integer k, find the maximum sum of a contiguous subarray such that the subarray contains at most k distinct elements.

### Root Cause Analysis (Bug Diagnostic)
In the sliding window loop, left is incremented before arr[left] is subtracted from windowSum, which subtracts the element at the new left position instead of the element being removed.

### Fix Description
Subtract arr[left] from windowSum BEFORE advancing the left pointer.

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <climits>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    unordered_map<int, int> freq;
    int left = 0;
    long long windowSum = 0;
    long long maxSum = LLONG_MIN;

    for (int right = 0; right < n; right++) {
        freq[arr[right]]++;
        windowSum += arr[right];

        while (freq.size() > (size_t)k) {
            freq[arr[left]]--;
            if (freq[arr[left]] == 0) freq.erase(arr[left]);
            windowSum -= arr[left];
            left++;
        }

        if (windowSum > maxSum) maxSum = windowSum;
    }

    cout << maxSum << endl;
    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0;
        long windowSum = 0;
        long maxSum = Long.MIN_VALUE;

        for (int right = 0; right < n; right++) {
            freq.merge(arr[right], 1, Integer::sum);
            windowSum += arr[right];

            while (freq.size() > k) {
                freq.merge(arr[left], -1, Integer::sum);
                if (freq.get(arr[left]) == 0) freq.remove(arr[left]);
                windowSum -= arr[left];
                left++;
            }

            if (windowSum > maxSum) maxSum = windowSum;
        }

        System.out.println(maxSum);
    }
}
```

#### Python Reference Solution

```python
import sys
from collections import defaultdict

def solve():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    k = int(data[1])
    arr = [int(x) for x in data[2:2+n]]

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

if __name__ == '__main__':
    solve()
```

---

## Set 2: Container With Most Water

**Points:** 20 | **Category:** Medium Debugging

### Problem Statement Summary
Given n non-negative integers representing heights of vertical lines on the x-axis, find two lines that together with the x-axis form a container that stores the maximum water volume.

### Root Cause Analysis (Bug Diagnostic)
The two-pointer approach compares heights but advances the pointer with the LARGER height instead of the shorter height.

### Fix Description
Advance the pointer with the smaller height (left++ if height[left] < height[right], else right--).

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];

    long long left = 0, right = n - 1;
    long long maxWater = 0;

    while (left < right) {
        long long width = right - left;
        long long height = min(h[left], h[right]);
        maxWater = max(maxWater, width * height);

        if (h[left] < h[right]) {
            left++;
        } else {
            right--;
        }
    }

    cout << maxWater << endl;
    return 0;
}
```

#### Java Reference Solution

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        long[] h = new long[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextLong();

        int left = 0, right = n - 1;
        long maxWater = 0;

        while (left < right) {
            long width = right - left;
            long height = Math.min(h[left], h[right]);
            maxWater = Math.max(maxWater, width * height);

            if (h[left] < h[right]) {
                left++;
            } else {
                right--;
            }
        }

        System.out.println(maxWater);
    }
}
```

#### Python Reference Solution

```python
import sys

def solve():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    h = [int(x) for x in data[1:1+n]]

    left = 0
    right = n - 1
    max_water = 0

    while left < right:
        width = right - left
        height = min(h[left], h[right])
        max_water = max(max_water, width * height)

        if h[left] < h[right]:
            left += 1
        else:
            right -= 1

    print(max_water)

if __name__ == '__main__':
    solve()
```

---

## Set 3: Longest Substring Without Repeating Characters

**Points:** 20 | **Category:** Medium Debugging

### Problem Statement Summary
Given a string s on stdin, find the length of the longest substring without duplicate characters.

### Root Cause Analysis (Bug Diagnostic)
When a repeated character is encountered, the left pointer is updated directly to lastSeen[c] + 1 without taking max(left, lastSeen[c] + 1), which causes the window to mistakenly move backwards.

### Fix Description
Use left = max(left, lastSeen[c] + 1) to ensure left pointer never moves backward.

#### C++ Reference Solution

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    string s;
    if (!getline(cin, s)) {
        cout << 0 << endl;
        return 0;
    }

    unordered_map<char, int> lastSeen;
    int left = 0;
    int maxLen = 0;

    for (int right = 0; right < (int)s.length(); right++) {
        char c = s[right];
        if (lastSeen.find(c) != lastSeen.end()) {
            left = max(left, lastSeen[c] + 1);
        }
        lastSeen[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }

    cout << maxLen << endl;
    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";

        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c)) {
                left = Math.max(left, lastSeen.get(c) + 1);
            }
            lastSeen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }

        System.out.println(maxLen);
    }
}
```

#### Python Reference Solution

```python
import sys

def solve():
    s = sys.stdin.read().strip()
    last_seen = {}
    left = 0
    max_len = 0

    for right, c in enumerate(s):
        if c in last_seen:
            left = max(left, last_seen[c] + 1)
        last_seen[c] = right
        max_len = max(max_len, right - left + 1)

    print(max_len)

if __name__ == '__main__':
    solve()
```

---

## Set 4: Product of Array Except Self Without Division

**Points:** 20 | **Category:** Medium Debugging

### Problem Statement Summary
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
The algorithm must run in O(n) time without using the division operator.

### Root Cause Analysis (Bug Diagnostic)
The running prefix product array updates curr *= nums[i] before setting res[i], multiplying by the current element instead of holding the product of all elements to its left.

### Fix Description
Store res[i] = curr FIRST, then update curr *= nums[i].

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<long long> nums;
    long long val;
    while (cin >> val) nums.push_back(val);
    if (nums.empty()) return 0;

    int n = nums.size();
    vector<long long> res(n, 1);

    long long curr = 1;
    for (int i = 0; i < n; i++) {
        res[i] = curr;
        curr *= nums[i];
    }

    curr = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= curr;
        curr *= nums[i];
    }

    for (int i = 0; i < n; i++) {
        cout << res[i] << (i == n - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Long> list = new ArrayList<>();
        while (sc.hasNextLong()) list.add(sc.nextLong());
        if (list.isEmpty()) return;

        int n = list.size();
        long[] res = new long[n];
        long curr = 1;

        for (int i = 0; i < n; i++) {
            res[i] = curr;
            curr *= list.get(i);
        }

        curr = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= curr;
            curr *= list.get(i);
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(res[i]).append(i == n - 1 ? "" : " ");
        }
        System.out.println(sb.toString());
    }
}
```

#### Python Reference Solution

```python
import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
    n = len(nums)
    res = [1] * n

    curr = 1
    for i in range(n):
        res[i] = curr
        curr *= nums[i]

    curr = 1
    for i in range(n - 1, -1, -1):
        res[i] *= curr
        curr *= nums[i]

    print(" ".join(map(str, res)))

if __name__ == '__main__':
    solve()
```

---

## Set 5: Search in Rotated Sorted Array

**Points:** 20 | **Category:** Medium Debugging

### Problem Statement Summary
Given an integer array nums sorted in ascending order with distinct values, rotated at some unknown pivot index, and a target value, return the 0-based index of target if it is in nums, or -1 if not.
Algorithm must achieve O(log n) time complexity.

### Root Cause Analysis (Bug Diagnostic)
The binary search condition checks if (nums[low] < nums[mid]) instead of (nums[low] <= nums[mid]), causing the algorithm to misclassify the sorted half when low == mid.

### Fix Description
Use if (nums[low] <= nums[mid]) to correctly include single-element sub-ranges.

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int low = 0, high = (int)nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        if (nums[low] <= nums[mid]) {
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

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;

            if (nums[low] <= nums[mid]) {
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

#### Python Reference Solution

```python
import sys

def search(nums, target):
    low = 0
    high = len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid

        if nums[low] <= nums[mid]:
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

---

## Set 6: 3Sum Triplets with Zero Sum

**Points:** 20 | **Category:** Medium Debugging

### Problem Statement Summary
Given an integer array nums, return the count of unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

### Root Cause Analysis (Bug Diagnostic)
When a valid triplet is found, the inner while loops to skip duplicate values check arr[left] == arr[left + 1] without initially stepping pointers, leading to infinite loops or skipping unique elements.

### Fix Description
Advance pointers first: left++; right--; while (left < right && nums[left] == nums[left - 1]) left++; while (left < right && nums[right] == nums[right + 1]) right--;

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<long long> nums;
    long long x;
    while (cin >> x) nums.push_back(x);
    if (nums.size() < 3) {
        cout << 0 << endl;
        return 0;
    }

    sort(nums.begin(), nums.end());
    int n = nums.size();
    int count = 0;

    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = n - 1;

        while (left < right) {
            long long sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                count++;
                left++;
                right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    cout << count << endl;
    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Long> list = new ArrayList<>();
        while (sc.hasNextLong()) list.add(sc.nextLong());
        if (list.size() < 3) {
            System.out.println(0);
            return;
        }

        Collections.sort(list);
        int n = list.size();
        int count = 0;

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && Objects.equals(list.get(i), list.get(i - 1))) continue;
            int left = i + 1, right = n - 1;

            while (left < right) {
                long sum = list.get(i) + list.get(left) + list.get(right);
                if (sum == 0) {
                    count++;
                    left++;
                    right--;
                    while (left < right && Objects.equals(list.get(left), list.get(left - 1))) left++;
                    while (left < right && Objects.equals(list.get(right), list.get(right + 1))) right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        System.out.println(count);
    }
}
```

#### Python Reference Solution

```python
import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if len(nums) < 3:
        print(0)
        return

    nums.sort()
    n = len(nums)
    count = 0

    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left = i + 1
        right = n - 1

        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                count += 1
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1

    print(count)

if __name__ == '__main__':
    solve()
```

---

## Set 7: Minimum Size Subarray Sum Exceeding Target

**Points:** 20 | **Category:** Medium Debugging

### Problem Statement Summary
Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [nums[l], ..., nums[r]] of which the sum is greater than or equal to target. If there is no such subarray, return 0.

### Root Cause Analysis (Bug Diagnostic)
The sliding window shrinking condition uses (windowSum > target) instead of (windowSum >= target), failing to record minimal windows where the sum is exactly equal to target.

### Fix Description
Change while condition to while (windowSum >= target).

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    long long target;
    if (!(cin >> target)) return 0;
    vector<long long> nums;
    long long val;
    while (cin >> val) nums.push_back(val);

    int n = nums.size();
    long long windowSum = 0;
    int left = 0;
    int minLen = n + 1;

    for (int right = 0; right < n; right++) {
        windowSum += nums[right];
        while (windowSum >= target) {
            minLen = min(minLen, right - left + 1);
            windowSum -= nums[left++];
        }
    }

    cout << (minLen > n ? 0 : minLen) << endl;
    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long target = sc.nextLong();
        List<Long> list = new ArrayList<>();
        while (sc.hasNextLong()) list.add(sc.nextLong());

        int n = list.size();
        long windowSum = 0;
        int left = 0;
        int minLen = n + 1;

        for (int right = 0; right < n; right++) {
            windowSum += list.get(right);
            while (windowSum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                windowSum -= list.get(left++);
            }
        }

        System.out.println(minLen > n ? 0 : minLen);
    }
}
```

#### Python Reference Solution

```python
import sys

def solve():
    data = sys.stdin.read().split()
    if not data: return
    target = int(data[0])
    nums = [int(x) for x in data[1:]]

    n = len(nums)
    window_sum = 0
    left = 0
    min_len = n + 1

    for right in range(n):
        window_sum += nums[right]
        while window_sum >= target:
            min_len = min(min_len, right - left + 1)
            window_sum -= nums[left]
            left += 1

    print(0 if min_len > n else min_len)

if __name__ == '__main__':
    solve()
```

---

<a name="round-3-hard-solutions"></a>
# Round 3: Hard Debugging Solutions (Sets 1 - 7)

## Set 1: Shortest Path with Mandatory Checkpoints

**Points:** 30 | **Category:** Hard Debugging

### Problem Statement Summary
You are given a weighted undirected graph with n vertices (0 to n-1) and m edges. You are also given a start vertex S, a destination vertex D, and a set of k mandatory checkpoint vertices.
Find the minimum total distance to travel from S to D such that every mandatory checkpoint is visited at least once. If it is impossible, print -1.

### Root Cause Analysis (Bug Diagnostic)
In the priority queue state expansion, when transitioning to an adjacent node v, the bitmask is updated to new_mask, but the distance table check/update incorrectly uses the old mask dist[v][mask] instead of dist[v][new_mask], allowing outdated or suboptimal states to overwrite shorter distances.

### Fix Description
Update and check dist[v][new_mask] instead of dist[v][mask].

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <tuple>
using namespace std;

const long long INF = 1e18;

struct Edge {
    int to;
    long long w;
};

int main() {
    int n, m, k, S, D;
    if (!(cin >> n >> m >> k >> S >> D)) return 0;

    vector<int> chk(k);
    vector<int> chkIndex(n, -1);
    for (int i = 0; i < k; i++) {
        cin >> chk[i];
        chkIndex[chk[i]] = i;
    }

    vector<vector<Edge>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }

    int totalMasks = 1 << k;
    vector<vector<long long>> dist(n, vector<long long>(totalMasks, INF));

    int startMask = 0;
    if (chkIndex[S] != -1) startMask |= (1 << chkIndex[S]);

    dist[S][startMask] = 0;
    priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>, greater<tuple<long long, int, int>>> pq;
    pq.push({0, S, startMask});

    while (!pq.empty()) {
        auto [d, u, mask] = pq.top();
        pq.pop();

        if (d > dist[u][mask]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.to;
            int new_mask = mask;
            if (chkIndex[v] != -1) {
                new_mask |= (1 << chkIndex[v]);
            }

            if (dist[u][mask] + edge.w < dist[v][new_mask]) {
                dist[v][new_mask] = dist[u][mask] + edge.w;
                pq.push({dist[v][new_mask], v, new_mask});
            }
        }
    }

    int fullMask = (1 << k) - 1;
    long long ans = dist[D][fullMask];
    if (ans >= INF) cout << -1 << endl;
    else cout << ans << endl;

    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    static class State implements Comparable<State> {
        long d;
        int u;
        int mask;
        State(long d, int u, int mask) { this.d = d; this.u = u; this.mask = mask; }
        public int compareTo(State o) { return Long.compare(this.d, o.d); }
    }

    static class Edge {
        int to;
        long w;
        Edge(int to, long w) { this.to = to; this.w = w; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), m = sc.nextInt(), k = sc.nextInt(), S = sc.nextInt(), D = sc.nextInt();

        int[] chkIndex = new int[n];
        Arrays.fill(chkIndex, -1);
        for (int i = 0; i < k; i++) {
            chkIndex[sc.nextInt()] = i;
        }

        List<List<Edge>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt();
            long w = sc.nextLong();
            adj.get(u).add(new Edge(v, w));
            adj.get(v).add(new Edge(u, w));
        }

        int totalMasks = 1 << k;
        long INF = (long) 1e18;
        long[][] dist = new long[n][totalMasks];
        for (int i = 0; i < n; i++) Arrays.fill(dist[i], INF);

        int startMask = 0;
        if (chkIndex[S] != -1) startMask |= (1 << chkIndex[S]);
        dist[S][startMask] = 0;

        PriorityQueue<State> pq = new PriorityQueue<>();
        pq.add(new State(0, S, startMask));

        while (!pq.isEmpty()) {
            State cur = pq.poll();
            if (cur.d > dist[cur.u][cur.mask]) continue;

            for (Edge e : adj.get(cur.u)) {
                int newMask = cur.mask;
                if (chkIndex[e.to] != -1) newMask |= (1 << chkIndex[e.to]);

                if (dist[cur.u][cur.mask] + e.w < dist[e.to][newMask]) {
                    dist[e.to][newMask] = dist[cur.u][cur.mask] + e.w;
                    pq.add(new State(dist[e.to][newMask], e.to, newMask));
                }
            }
        }

        long ans = dist[D][(1 << k) - 1];
        System.out.println(ans >= INF ? -1 : ans);
    }
}
```

#### Python Reference Solution

```python
import sys
import heapq

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    m = int(lines[1])
    k = int(lines[2])
    S = int(lines[3])
    D = int(lines[4])

    idx = 5
    chkIndex = [-1] * n
    for i in range(k):
        chkIndex[int(lines[idx])] = i
        idx += 1

    adj = [[] for _ in range(n)]
    for _ in range(m):
        u = int(lines[idx])
        v = int(lines[idx+1])
        w = int(lines[idx+2])
        adj[u].append((v, w))
        adj[v].append((u, w))
        idx += 3

    INF = float('inf')
    total_masks = 1 << k
    dist = [[INF] * total_masks for _ in range(n)]

    start_mask = 0
    if chkIndex[S] != -1:
        start_mask |= (1 << chkIndex[S])

    dist[S][start_mask] = 0
    pq = [(0, S, start_mask)]

    while pq:
        d, u, mask = heapq.heappop(pq)
        if d > dist[u][mask]:
            continue

        for v, w in adj[u]:
            new_mask = mask
            if chkIndex[v] != -1:
                new_mask |= (1 << chkIndex[v])

            if dist[u][mask] + w < dist[v][new_mask]:
                dist[v][new_mask] = dist[u][mask] + w
                heapq.heappush(pq, (dist[v][new_mask], v, new_mask))

    full_mask = (1 << k) - 1
    ans = dist[D][full_mask]
    print(-1 if ans == INF else ans)

if __name__ == '__main__':
    main()
```

---

## Set 2: Word Ladder II - Shortest Transformation Sequences Count

**Points:** 30 | **Category:** Hard Debugging

### Problem Statement Summary
Given two words, beginWord and endWord, and a dictionary of words wordList, return the number of distinct shortest transformation sequences from beginWord to endWord modulo 10^9 + 7.
A transformation sequence is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
- Every adjacent pair of words differs by exactly one letter.
- Every si for 1 <= i <= k is in wordList.
- sk == endWord.
If no such sequence exists, return 0.

### Root Cause Analysis (Bug Diagnostic)
In the BFS loop, visited words are removed from the unvisited word set immediately when expanded from a parent node. This prevents other valid shortest paths from reaching the same intermediate word within the same BFS level, causing undercounting of shortest paths.

### Fix Description
Defer removing words from the unvisited set until the entire current BFS level has been processed (level-by-level deletion).

#### C++ Reference Solution

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>
#include <unordered_map>
#include <queue>
using namespace std;

const int MOD = 1000000007;

int main() {
    string beginWord, endWord;
    if (!(cin >> beginWord >> endWord)) return 0;
    int n;
    if (!(cin >> n)) return 0;

    unordered_set<string> dict;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        dict.insert(w);
    }

    if (dict.find(endWord) == dict.end()) {
        cout << 0 << endl;
        return 0;
    }

    unordered_map<string, long long> paths;
    paths[beginWord] = 1;

    queue<string> q;
    q.push(beginWord);
    dict.erase(beginWord);
    bool found = false;

    while (!q.empty() && !found) {
        int sz = q.size();
        unordered_set<string> visitedThisLevel;
        unordered_map<string, long long> newPaths;

        for (int i = 0; i < sz; i++) {
            string curr = q.front();
            q.pop();

            string nextWord = curr;
            for (int pos = 0; pos < (int)nextWord.size(); pos++) {
                char orig = nextWord[pos];
                for (char c = 'a'; c <= 'z'; c++) {
                    if (c == orig) continue;
                    nextWord[pos] = c;
                    if (dict.find(nextWord) != dict.end()) {
                        visitedThisLevel.insert(nextWord);
                        newPaths[nextWord] = (newPaths[nextWord] + paths[curr]) % MOD;
                        if (nextWord == endWord) found = true;
                    }
                }
                nextWord[pos] = orig;
            }
        }

        for (const auto& w : visitedThisLevel) {
            dict.erase(w);
            q.push(w);
            paths[w] = (paths[w] + newPaths[w]) % MOD;
        }
    }

    cout << (found ? paths[endWord] : 0) << endl;
    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    static final int MOD = 1000000007;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String beginWord = sc.next();
        String endWord = sc.next();
        int n = sc.nextInt();

        Set<String> dict = new HashSet<>();
        for (int i = 0; i < n; i++) dict.add(sc.next());

        if (!dict.contains(endWord)) {
            System.out.println(0);
            return;
        }

        Map<String, Long> paths = new HashMap<>();
        paths.put(beginWord, 1L);

        Queue<String> q = new LinkedList<>();
        q.add(beginWord);
        dict.remove(beginWord);
        boolean found = false;

        while (!q.isEmpty() && !found) {
            int sz = q.size();
            Set<String> visitedThisLevel = new HashSet<>();
            Map<String, Long> newPaths = new HashMap<>();

            for (int i = 0; i < sz; i++) {
                String curr = q.poll();
                char[] chars = curr.toCharArray();

                for (int pos = 0; pos < chars.length; pos++) {
                    char orig = chars[pos];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == orig) continue;
                        chars[pos] = c;
                        String nextWord = new String(chars);

                        if (dict.contains(nextWord)) {
                            visitedThisLevel.add(nextWord);
                            newPaths.put(nextWord, (newPaths.getOrDefault(nextWord, 0L) + paths.get(curr)) % MOD);
                            if (nextWord.equals(endWord)) found = true;
                        }
                    }
                    chars[pos] = orig;
                }
            }

            for (String w : visitedThisLevel) {
                dict.remove(w);
                q.add(w);
                paths.put(w, (paths.getOrDefault(w, 0L) + newPaths.get(w)) % MOD);
            }
        }

        System.out.println(found ? paths.get(endWord) : 0);
    }
}
```

#### Python Reference Solution

```python
import sys
from collections import deque, defaultdict

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    begin_word = tokens[0]
    end_word = tokens[1]
    n = int(tokens[2])
    word_list = set(tokens[3:3+n])

    if end_word not in word_list:
        print(0)
        return

    MOD = 1000000007
    paths = defaultdict(int)
    paths[begin_word] = 1

    q = deque([begin_word])
    word_list.discard(begin_word)
    found = False

    while q and not found:
        sz = len(q)
        visited_this_level = set()
        new_paths = defaultdict(int)

        for _ in range(sz):
            curr = q.popleft()
            chars = list(curr)
            for pos in range(len(chars)):
                orig = chars[pos]
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    if c == orig:
                        continue
                    chars[pos] = c
                    next_word = ''.join(chars)
                    if next_word in word_list:
                        visited_this_level.add(next_word)
                        new_paths[next_word] = (new_paths[next_word] + paths[curr]) % MOD
                        if next_word == end_word:
                            found = True
                chars[pos] = orig

        for w in visited_this_level:
            word_list.discard(w)
            q.append(w)
            paths[w] = (paths[w] + new_paths[w]) % MOD

    print(paths[end_word] if found else 0)

if __name__ == '__main__':
    main()
```

---

## Set 3: Median of Two Sorted Arrays

**Points:** 30 | **Category:** Hard Debugging

### Problem Statement Summary
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

### Root Cause Analysis (Bug Diagnostic)
Binary search boundary adjustment logic is inverted: when maxLeftA > minRightB, high should be adjusted to i - 1 (too far right in array A), but the code increments low = i + 1 instead, causing an infinite loop or wrong partition.

### Fix Description
Adjust high = i - 1 when maxLeftA > minRightB, and low = i + 1 when maxLeftB > minRightA.

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
#include <climits>
#include <algorithm>
using namespace std;

int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<int> A(m), B(n);
    for (int i = 0; i < m; i++) cin >> A[i];
    for (int i = 0; i < n; i++) cin >> B[i];

    if (m > n) {
        swap(A, B);
        swap(m, n);
    }

    int low = 0, high = m;
    while (low <= high) {
        int i = low + (high - low) / 2;
        int j = (m + n + 1) / 2 - i;

        int maxLeftA = (i == 0) ? INT_MIN : A[i - 1];
        int minRightA = (i == m) ? INT_MAX : A[i];

        int maxLeftB = (j == 0) ? INT_MIN : B[j - 1];
        int minRightB = (j == n) ? INT_MAX : B[j];

        if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
            double median;
            if ((m + n) % 2 == 1) {
                median = max(maxLeftA, maxLeftB);
            } else {
                median = (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2.0;
            }
            cout << fixed << setprecision(1) << median << endl;
            return 0;
        } else if (maxLeftA > minRightB) {
            high = i - 1;
        } else {
            low = i + 1;
        }
    }
    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt(), n = sc.nextInt();
        int[] A = new int[m];
        for (int i = 0; i < m; i++) A[i] = sc.nextInt();
        int[] B = new int[n];
        for (int i = 0; i < n; i++) B[i] = sc.nextInt();

        if (m > n) {
            int[] temp = A; A = B; B = temp;
            int t = m; m = n; n = t;
        }

        int low = 0, high = m;
        while (low <= high) {
            int i = low + (high - low) / 2;
            int j = (m + n + 1) / 2 - i;

            int maxLeftA = (i == 0) ? Integer.MIN_VALUE : A[i - 1];
            int minRightA = (i == m) ? Integer.MAX_VALUE : A[i];

            int maxLeftB = (j == 0) ? Integer.MIN_VALUE : B[j - 1];
            int minRightB = (j == n) ? Integer.MAX_VALUE : B[j];

            if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
                double median;
                if ((m + n) % 2 == 1) {
                    median = Math.max(maxLeftA, maxLeftB);
                } else {
                    median = (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2.0;
                }
                System.out.printf(Locale.US, "%.1f\n", median);
                return;
            } else if (maxLeftA > minRightB) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }
    }
}
```

#### Python Reference Solution

```python
import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    m = int(tokens[0])
    n = int(tokens[1])
    A = [int(x) for x in tokens[2:2+m]]
    B = [int(x) for x in tokens[2+m:2+m+n]]

    if m > n:
        A, B = B, A
        m, n = n, m

    low, high = 0, m
    INF = float('inf')

    while low <= high:
        i = (low + high) // 2
        j = (m + n + 1) // 2 - i

        maxLeftA = -INF if i == 0 else A[i - 1]
        minRightA = INF if i == m else A[i]

        maxLeftB = -INF if j == 0 else B[j - 1]
        minRightB = INF if j == n else B[j]

        if maxLeftA <= minRightB and maxLeftB <= minRightA:
            if (m + n) % 2 == 1:
                median = float(max(maxLeftA, maxLeftB))
            else:
                median = (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2.0
            print(f"{median:.1f}")
            return
        elif maxLeftA > minRightB:
            high = i - 1
        else:
            low = i + 1

if __name__ == '__main__':
    main()
```

---

## Set 4: Trapping Rain Water with Monotonic Stack

**Points:** 30 | **Category:** Hard Debugging

### Problem Statement Summary
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

### Root Cause Analysis (Bug Diagnostic)
In the monotonic stack pop logic, bounded_height is calculated as min(height[current], height[st.top()]) - height[top], but the stack top index is retrieved before popping, and the code incorrectly computes width using the current element instead of distance between current and the new stack top: width = current - st.top() - 1, but uses current - top instead.

### Fix Description
After popping the bottom element, check if stack is empty (break if empty); width should be current - st.top() - 1.

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];

    long long totalWater = 0;
    stack<int> st;

    for (int current = 0; current < n; current++) {
        while (!st.empty() && height[current] > height[st.top()]) {
            int top = st.top();
            st.pop();
            if (st.empty()) break;

            long long distance = current - st.top() - 1;
            long long bounded_height = min(height[current], height[st.top()]) - height[top];
            totalWater += distance * bounded_height;
        }
        st.push(current);
    }

    cout << totalWater << endl;
    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] height = new int[n];
        for (int i = 0; i < n; i++) height[i] = sc.nextInt();

        long totalWater = 0;
        Deque<Integer> st = new ArrayDeque<>();

        for (int current = 0; current < n; current++) {
            while (!st.isEmpty() && height[current] > height[st.peek()]) {
                int top = st.pop();
                if (st.isEmpty()) break;

                long distance = current - st.peek() - 1;
                long boundedHeight = Math.min(height[current], height[st.peek()]) - height[top];
                totalWater += distance * boundedHeight;
            }
            st.push(current);
        }

        System.out.println(totalWater);
    }
}
```

#### Python Reference Solution

```python
import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    height = [int(x) for x in tokens[1:1+n]]

    total_water = 0
    st = []

    for current in range(n):
        while st and height[current] > height[st[-1]]:
            top = st.pop()
            if not st:
                break
            distance = current - st[-1] - 1
            bounded_height = min(height[current], height[st[-1]]) - height[top]
            total_water += distance * bounded_height
        st.append(current)

    print(total_water)

if __name__ == '__main__':
    main()
```

---

## Set 5: Minimum Window Substring with Exact Multiplicities

**Points:** 30 | **Category:** Hard Debugging

### Problem Statement Summary
Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return an empty string (or print -1).

If there are multiple answers, return the substring that appears earliest.

### Root Cause Analysis (Bug Diagnostic)
When shrinking the window from the left pointer, the code decrements formed (the count of satisfied characters) if windowFreq[c] <= targetFreq[c] BEFORE updating windowFreq[c] -= 1, which triggers prematurely even when the window still had surplus characters.

### Fix Description
Check if windowFreq[c] == targetFreq[c] before decrementing windowFreq[c], and only then decrement formed.

#### C++ Reference Solution

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
            if (targetFreq.count(leftChar) && windowFreq[leftChar] == targetFreq[leftChar]) {
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

#### Java Reference Solution

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
                if (targetFreq.containsKey(leftChar) && windowFreq.get(leftChar).intValue() == targetFreq.get(leftChar).intValue()) {
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

#### Python Reference Solution

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
            if left_char in target_freq and window_freq[left_char] == target_freq[left_char]:
                formed -= 1
            window_freq[left_char] -= 1
            left += 1

    print("-1" if start_idx == -1 else s[start_idx:start_idx + min_len])

if __name__ == '__main__':
    main()
```

---

## Set 6: Lexicographically Smallest Course Schedule Topological Sort

**Points:** 30 | **Category:** Hard Debugging

### Problem Statement Summary
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b before taking course a.

Return the ordering of courses you should take to finish all courses. If there are multiple valid answers, return the lexicographically smallest ordering. If it is impossible to finish all courses (a cycle exists), return "CYCLE DETECTED".

### Root Cause Analysis (Bug Diagnostic)
In Kahn algorithm with min-heap priority queue, when pushing initial courses with 0 prerequisites into the priority queue, the condition was written as inDegree[i] == 1 instead of inDegree[i] == 0.

### Fix Description
Initialize priority queue with courses having inDegree[i] == 0.

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;

    vector<vector<int>> adj(n);
    vector<int> inDegree(n, 0);

    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[b].push_back(a);
        inDegree[a]++;
    }

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) {
            pq.push(i);
        }
    }

    vector<int> order;
    while (!pq.empty()) {
        int u = pq.top();
        pq.pop();
        order.push_back(u);

        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) {
                pq.push(v);
            }
        }
    }

    if ((int)order.size() != n) {
        cout << "CYCLE DETECTED" << endl;
    } else {
        for (int i = 0; i < n; i++) {
            cout << order[i] << (i == n - 1 ? "" : " ");
        }
        cout << endl;
    }

    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[n];

        for (int i = 0; i < m; i++) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            adj.get(b).add(a);
            inDegree[a]++;
        }

        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int i = 0; i < n; i++) {
            if (inDegree[i] == 0) pq.add(i);
        }

        List<Integer> order = new ArrayList<>();
        while (!pq.isEmpty()) {
            int u = pq.poll();
            order.add(u);

            for (int v : adj.get(u)) {
                inDegree[v]--;
                if (inDegree[v] == 0) pq.add(v);
            }
        }

        if (order.size() != n) {
            System.out.println("CYCLE DETECTED");
        } else {
            for (int i = 0; i < n; i++) {
                System.out.print(order.get(i) + (i == n - 1 ? "" : " "));
            }
            System.out.println();
        }
    }
}
```

#### Python Reference Solution

```python
import sys
import heapq

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    m = int(tokens[1])

    adj = [[] for _ in range(n)]
    in_degree = [0] * n

    idx = 2
    for _ in range(m):
        a = int(tokens[idx])
        b = int(tokens[idx+1])
        adj[b].append(a)
        in_degree[a] += 1
        idx += 2

    pq = []
    for i in range(n):
        if in_degree[i] == 0:
            heapq.heappush(pq, i)

    order = []
    while pq:
        u = heapq.heappop(pq)
        order.append(u)

        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                heapq.heappush(pq, v)

    if len(order) != n:
        print("CYCLE DETECTED")
    else:
        print(*(order))

if __name__ == '__main__':
    main()
```

---

## Set 7: Subarray Sums Divisible by K

**Points:** 30 | **Category:** Hard Debugging

### Problem Statement Summary
Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.
A subarray is a contiguous part of an array.

### Root Cause Analysis (Bug Diagnostic)
In languages like C++ and Java, the remainder operator % returns negative values for negative integers (e.g., -2 % 5 = -2). The code fails to normalize the remainder to the range [0, k-1] with (rem % k + k) % k, leading to invalid remainder map keys and missed subarrays.

### Fix Description
Normalize remainder using (rem % k + k) % k before indexing into the frequency map or array.

#### C++ Reference Solution

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    unordered_map<int, int> remainderCount;
    remainderCount[0] = 1;

    long long prefixSum = 0;
    long long result = 0;

    for (int i = 0; i < n; i++) {
        prefixSum += nums[i];
        int rem = (prefixSum % k + k) % k;

        if (remainderCount.count(rem)) {
            result += remainderCount[rem];
        }
        remainderCount[rem]++;
    }

    cout << result << endl;
    return 0;
}
```

#### Java Reference Solution

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();

        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        Map<Integer, Integer> remainderCount = new HashMap<>();
        remainderCount.put(0, 1);

        long prefixSum = 0;
        long result = 0;

        for (int i = 0; i < n; i++) {
            prefixSum += nums[i];
            int rem = (int)(((prefixSum % k) + k) % k);

            if (remainderCount.containsKey(rem)) {
                result += remainderCount.get(rem);
            }
            remainderCount.put(rem, remainderCount.getOrDefault(rem, 0) + 1);
        }

        System.out.println(result);
    }
}
```

#### Python Reference Solution

```python
import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    k = int(tokens[1])
    nums = [int(x) for x in tokens[2:2+n]]

    remainder_count = {0: 1}
    prefix_sum = 0
    result = 0

    for x in nums:
        prefix_sum += x
        rem = ((prefix_sum % k) + k) % k

        if rem in remainder_count:
            result += remainder_count[rem]
        remainder_count[rem] = remainder_count.get(rem, 0) + 1

    print(result)

if __name__ == '__main__':
    main()
```

---

