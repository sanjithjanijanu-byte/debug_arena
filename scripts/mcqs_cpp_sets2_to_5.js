// C++ MCQs for Sets 2, 3, 4, 5 (20 questions each, total 80 questions)

function makeMCQ(setNum, qNum, title, prompt, snippet, options, answer, explanation) {
  return {
    roundNumber: 1,
    setNumber: setNum,
    questionNumber: qNum,
    language: 'CPP',
    title: `Set ${setNum} - Q${qNum}: ${title}`,
    statement: JSON.stringify({
      type: 'MCQ',
      prompt,
      options,
      explanation
    }),
    buggyCode: snippet,
    referenceSolution: answer,
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 128,
    isTiebreaker: false,
    testCases: [{ stdin: answer, expectedStdout: answer, isHidden: false, weight: 1 }]
  };
}

const cppQuestions = [
  // ==========================================
  // SET 2 (20 questions)
  // ==========================================
  makeMCQ(2, 1, 'Bitwise XOR Identity', 'What is the output of the following C++ code?',
`#include <iostream>
using namespace std;
int main() {
    int a = 12, b = 25;
    cout << (a ^ b ^ a) << endl;
    return 0;
}`, { A: '12', B: '25', C: '0', D: '37' }, 'B', 'XOR is commutative and associative, and x ^ x = 0. Therefore a ^ b ^ a = b = 25.'),

  makeMCQ(2, 2, 'Size of Pointer vs Array', 'What does the following C++ code print on a 64-bit architecture?',
`#include <iostream>
using namespace std;
void printSize(int arr[]) {
    cout << sizeof(arr) << " ";
}
int main() {
    int arr[10];
    printSize(arr);
    cout << sizeof(arr) << endl;
    return 0;
}`, { A: '40 40', B: '8 40', C: '4 40', D: '8 8' }, 'B', 'In printSize, arr decays to a pointer (int*), which is 8 bytes on 64-bit. In main, sizeof(arr) is 10 * 4 = 40 bytes.'),

  makeMCQ(2, 3, 'Pre vs Post Decrement', 'What is the output of the following C++ code?',
`#include <iostream>
using namespace std;
int main() {
    int i = 5;
    int j = --i + i--;
    cout << i << " " << j << endl;
    return 0;
}`, { A: '3 8', B: '3 7', C: '4 8', D: '4 7' }, 'A', '--i decrements i to 4 and evaluates to 4. Then i-- evaluates to 4 and decrements i to 3. Total j = 4 + 4 = 8, and final i = 3.'),

  makeMCQ(2, 4, 'Static Local Variable', 'What does this code print?',
`#include <iostream>
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
}`, { A: '15 15', B: '15 20', C: '10 15', D: '20 25' }, 'B', 'Static local variables retain their value across function calls. First call outputs 15, second call adds 5 and outputs 20.'),

  makeMCQ(2, 5, 'String Concatenation with Literals', 'What happens when compiling and running this C++ code?',
`#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "Hello" + ", " + "World!";
    cout << s << endl;
    return 0;
}`, { A: 'Prints Hello, World!', B: 'Compilation Error: cannot add two string literals', C: 'Prints Hello', D: 'Undefined behavior' }, 'B', 'In C++, "Hello" and ", " are const char arrays. You cannot use the + operator directly between two string literals.'),

  makeMCQ(2, 6, 'Short-Circuit Logical AND', 'What is the value of y after execution?',
`#include <iostream>
using namespace std;
int main() {
    int x = 0, y = 10;
    if (x != 0 && ++y > 10) {
        y += 2;
    }
    cout << y << endl;
    return 0;
}`, { A: '10', B: '11', C: '12', D: '13' }, 'A', 'Since x != 0 evaluates to false, the logical AND short-circuits and ++y is never evaluated. Thus y remains 10.'),

  makeMCQ(2, 7, 'Const Reference Binding', 'What is the output of the following C++ code?',
`#include <iostream>
using namespace std;
int main() {
    int a = 10;
    const int& ref = a;
    a = 20;
    cout << ref << endl;
    return 0;
}`, { A: '10', B: '20', C: 'Compilation error', D: 'Undefined behavior' }, 'B', 'A const reference cannot modify the underlying variable through ref, but modifying the variable directly changes the value seen through ref.'),

  makeMCQ(2, 8, 'Default Vector Initialization', 'What is the size and contents of vector v?',
`#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v(4, 7);
    cout << v.size() << " " << v[2] << endl;
    return 0;
}`, { A: '4 7', B: '7 4', C: '4 0', D: '2 7' }, 'A', 'vector<int> v(4, 7) creates a vector of size 4 where every element is initialized to 7. v[2] is 7.'),

  makeMCQ(2, 9, 'Ternary Operator Associativity', 'What is the output of this C++ program?',
`#include <iostream>
using namespace std;
int main() {
    int a = 1, b = 2, c = 3;
    int res = a ? b : c ? 10 : 20;
    cout << res << endl;
    return 0;
}`, { A: '2', B: '3', C: '10', D: '20' }, 'A', 'The conditional operator is right-associative: a ? b : (c ? 10 : 20). Since a = 1 (true), it evaluates to b, which is 2.'),

  makeMCQ(2, 10, 'Reference vs Pointer Reassignment', 'What does this C++ snippet print?',
`#include <iostream>
using namespace std;
int main() {
    int x = 5, y = 15;
    int& ref = x;
    ref = y;
    ref = 25;
    cout << x << " " << y << endl;
    return 0;
}`, { A: '5 25', B: '25 15', C: '25 25', D: '15 25' }, 'B', 'References cannot be reseated. ref = y copies y into x (so x becomes 15). Then ref = 25 sets x = 25. y remains 15.'),

  makeMCQ(2, 11, 'Integer Overflow in C++', 'What is the behavior of signed integer overflow according to C++ standard?',
`int a = 2147483647; a = a + 1;`,
{ A: 'Wraps to -2147483648 reliably', B: 'Throws an OverflowException', C: 'Undefined Behavior', D: 'Compile-time error' }, 'C', 'Signed integer overflow is strictly Undefined Behavior (UB) in ISO C++.'),

  makeMCQ(2, 12, 'Virtual Destructor Necessity', 'Why should a base class have a virtual destructor in C++?',
`class Base { public: virtual ~Base() {} };`,
{ A: 'To allow pure virtual methods', B: 'To ensure derived class destructors are called when deleting via base pointer', C: 'To prevent instantiation of the base class', D: 'To automatically delete pointers in derived classes' }, 'B', 'Deleting a derived class object through a base class pointer without a virtual destructor causes undefined behavior and resource leaks.'),

  makeMCQ(2, 13, 'Vector push_back vs emplace_back', 'What is the primary advantage of emplace_back over push_back?',
`vector<pair<int, int>> v; v.emplace_back(1, 2);`,
{ A: 'emplace_back always allocates half the memory', B: 'emplace_back constructs elements in-place avoiding redundant copies/moves', C: 'push_back does not work with custom objects', D: 'emplace_back is thread-safe while push_back is not' }, 'B', 'emplace_back forwards arguments to construct the object directly in the container memory, avoiding temporary object creation.'),

  makeMCQ(2, 14, 'Lambda Capture by Reference', 'What is the output of the following lambda snippet?',
`#include <iostream>
using namespace std;
int main() {
    int x = 10;
    auto f = [&x]() { x += 5; };
    f();
    cout << x << endl;
    return 0;
}`, { A: '10', B: '15', C: '5', D: 'Compilation error' }, 'B', '[&x] captures x by reference, so mutating x inside the lambda updates the original variable x to 15.'),

  makeMCQ(2, 15, 'Do-While Loop Condition', 'How many times does this loop execute?',
`#include <iostream>
using namespace std;
int main() {
    int i = 5;
    do {
        i += 2;
    } while (i < 5);
    cout << i << endl;
    return 0;
}`, { A: '0 times, prints 5', B: '1 time, prints 7', C: 'Infinite loop', D: '2 times, prints 9' }, 'B', 'A do-while loop always executes its body at least once before testing the condition. i becomes 7, then 7 < 5 is false.'),

  makeMCQ(2, 16, 'Structured Binding (C++17)', 'What does this C++17 code print?',
`#include <iostream>
#include <tuple>
using namespace std;
int main() {
    pair<int, string> p = {42, "Answer"};
    auto [num, text] = p;
    cout << text << ": " << num << endl;
    return 0;
}`, { A: '42: Answer', B: 'Answer: 42', C: 'Compilation error', D: 'p: 42 Answer' }, 'B', 'Structured bindings unpack the pair into variables num (42) and text ("Answer").'),

  makeMCQ(2, 17, 'String find Return on Failure', 'What does std::string::find return when the substring is not found?',
`#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "coding";
    if (s.find("xyz") == string::npos) cout << "Not found" << endl;
    return 0;
}`, { A: '-1', B: 'string::npos', C: '0', D: 'NULL' }, 'B', 'std::string::find returns std::string::npos (which represents the maximum possible value for size_t).'),

  makeMCQ(2, 18, 'Unordered Map Operator[] Insertion', 'What happens when accessing a non-existent key using operator[] on std::unordered_map?',
`#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    unordered_map<string, int> m;
    cout << m["count"] << " " << m.size() << endl;
    return 0;
}`, { A: 'Throws out_of_range exception', B: 'Prints 0 1', C: 'Prints 0 0', D: 'Compilation error' }, 'B', 'operator[] default-constructs the value (0 for int) and inserts the pair into the map, increasing size to 1.'),

  makeMCQ(2, 19, 'Recursive Base Case Off-by-One', 'What is the return value of mystery(3)?',
`int mystery(int n) {
    if (n <= 0) return 1;
    return n * mystery(n - 2);
}`, { A: '3', B: '6', C: '1', D: '0' }, 'A', 'mystery(3) = 3 * mystery(1). mystery(1) = 1 * mystery(-1). mystery(-1) returns 1. Result = 3 * 1 * 1 = 3.'),

  makeMCQ(2, 20, 'Unique Pointer Move Semantics', 'What happens when attempting to copy a std::unique_ptr?',
`#include <memory>
using namespace std;
int main() {
    unique_ptr<int> p1 = make_unique<int>(10);
    unique_ptr<int> p2 = p1;
    return 0;
}`, { A: 'Both point to 10 with shared ownership', B: 'p1 is set to nullptr', C: 'Compilation error because copy constructor is deleted', D: 'Runtime segmentation fault' }, 'C', 'std::unique_ptr has a deleted copy constructor. It can only be moved using std::move, not copied.'),

  // ==========================================
  // SET 3 (20 questions)
  // ==========================================
  makeMCQ(3, 1, 'Array Pointer Arithmetic', 'What is printed by this pointer arithmetic code?',
`#include <iostream>
using namespace std;
int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* ptr = arr + 3;
    cout << *(ptr - 2) << endl;
    return 0;
}`, { A: '10', B: '20', C: '30', D: '40' }, 'B', 'arr + 3 points to arr[3] (40). (ptr - 2) points to arr[1], so *(ptr - 2) is 20.'),

  makeMCQ(3, 2, 'Const Pointer vs Pointer to Const', 'Which declaration creates a pointer whose address cannot be changed after initialization?',
`int x = 5, y = 10;`,
{ A: 'const int* p = &x;', B: 'int const* p = &x;', C: 'int* const p = &x;', D: 'const int* const* p = &x;' }, 'C', 'int* const p declares a const pointer to an int; the pointer address cannot be reassigned.'),

  makeMCQ(3, 3, 'Enum Class Type Safety', 'Why does the following code fail to compile in modern C++?',
`enum class Color { Red, Green, Blue };
int x = Color::Red;`,
{ A: 'enum class values must be capitalized', B: 'enum class is strongly typed and does not implicitly convert to int', C: 'Red must be assigned an explicit integer value', D: 'Color must be instantiated with new' }, 'B', 'Scoped enums (enum class) are strongly typed and do not implicitly convert to integers without static_cast.'),

  makeMCQ(3, 4, 'Bitwise Shift Operator', 'What is the output of the following C++ code?',
`#include <iostream>
using namespace std;
int main() {
    int x = 3;
    cout << (x << 3) << endl;
    return 0;
}`, { A: '9', B: '24', C: '6', D: '18' }, 'B', 'Left-shifting by 3 multiplies by 2^3 = 8: 3 * 8 = 24.'),

  makeMCQ(3, 5, 'Switch Case Fallthrough', 'What is the output of the following switch snippet?',
`#include <iostream>
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
}`, { A: '2', B: '23', C: '23D', D: 'D' }, 'C', 'Because there are no break statements, execution falls through from case 2 all the way through default, printing 23D.'),

  makeMCQ(3, 6, 'Typeid and Polymorphism', 'What is required for typeid(*ptr).name() to return the runtime derived class type?',
`Base* ptr = new Derived();`,
{ A: 'Base class must have at least one virtual function', B: 'Derived class must inherit virtually', C: 'The pointer must be dynamic_cast first', D: 'RTTI cannot inspect derived types' }, 'A', 'Runtime Type Information (RTTI) via typeid on dereferenced pointers only queries runtime type if the class has a virtual table (at least one virtual method).'),

  makeMCQ(3, 7, 'String substr Parameters', 'What is the output of s.substr(2, 3)?',
`#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "ABCDEFG";
    cout << s.substr(2, 3) << endl;
    return 0;
}`, { A: 'CDE', B: 'CD', C: 'BC', D: 'DEF' }, 'A', 'substr(pos, count) takes the start index (2) and character count (3). Indices 2, 3, 4 are \'C\', \'D\', \'E\'.'),

  makeMCQ(3, 8, 'Vector Capacity vs Size', 'What does v.capacity() represent?',
`vector<int> v = {1, 2, 3};`,
{ A: 'The current number of elements in the vector', B: 'The total allocated storage capacity without needing reallocation', C: 'The maximum allowed elements in vector (max_size)', D: 'The memory size of a single element' }, 'B', 'capacity() returns the number of elements the vector can hold before a new memory reallocation is required.'),

  makeMCQ(3, 9, 'Auto Type Deduction with References', 'What is the type of y deduced as?',
`int x = 10;
const int& ref = x;
auto y = ref;`,
{ A: 'const int&', B: 'int&', C: 'int', D: 'const int' }, 'C', 'auto drops top-level const and reference qualifiers by default. To preserve them, auto& or const auto& must be used.'),

  makeMCQ(3, 10, 'Comma Operator Evaluation', 'What is the value of result?',
`#include <iostream>
using namespace std;
int main() {
    int a = 2, b = 4;
    int result = (a += 3, b += 5, a * b);
    cout << result << endl;
    return 0;
}`, { A: '5', B: '9', C: '45', D: '20' }, 'C', 'The comma operator evaluates expressions from left to right and returns the value of the last expression: a = 5, b = 9, 5 * 9 = 45.'),

  makeMCQ(3, 11, 'Smart Pointer Cycle Memory Leak', 'What problem occurs when two std::shared_ptr instances reference each other?',
`struct Node { shared_ptr<Node> next; };`,
{ A: 'Compilation error', B: 'Circular reference causing reference counts never to reach zero (memory leak)', C: 'Double free error on termination', D: 'Stack overflow exception' }, 'B', 'Cyclic dependencies between shared_ptrs prevent reference counts from ever reaching 0, resulting in memory leaks. std::weak_ptr solves this.'),

  makeMCQ(3, 12, 'Set Insertion Duplicate Behavior', 'What does s.insert(10) do when 10 already exists in std::set<int>?',
`#include <set>
using namespace std;
set<int> s = {10, 20}; auto res = s.insert(10);`,
{ A: 'Throws duplicate_key exception', B: 'Overwrites existing 10', C: 'Does nothing and returns pair<iterator, bool> where bool is false', D: 'Adds 10 at the end' }, 'C', 'std::set contains unique elements. Inserting a duplicate fails silently; the returned pair.second is false.'),

  makeMCQ(3, 13, 'Friend Function Access', 'What privilege does a friend function have in C++?',
`class Box { friend void inspect(Box b); };`,
{ A: 'It inherits from Box', B: 'It has access to private and protected members of Box', C: 'It becomes a member function of Box', D: 'It can only access public members of Box' }, 'B', 'A friend function is a non-member function granted access to the private and protected members of the class declaring it.'),

  makeMCQ(3, 14, 'Constexpr Function Evaluation', 'What does constexpr specifier guarantee when invoked with constant expressions?',
`constexpr int square(int x) { return x * x; }`,
{ A: 'Always evaluates at runtime', B: 'Can be evaluated at compile time', C: 'Can never accept runtime arguments', D: 'Inlines the function unconditionally' }, 'B', 'constexpr indicates that the function can be evaluated at compile time if all arguments are known compile-time constants.'),

  makeMCQ(3, 15, 'Char Array Null Terminator Off-by-One', 'What happens if a char array of size 5 is initialized with "HELLO"?',
`char str[5] = "HELLO";`,
{ A: 'str is validly null-terminated', B: 'Compile error or lacks null terminator because "HELLO" needs 6 bytes', C: 'Silent truncation to "HELL"', D: 'Buffer overflow at compile time' }, 'B', '"HELLO" consists of 5 letters plus 1 null terminator (\'\\0\'). Storing it in char str[5] causes an initializer string too long error in C++.'),

  makeMCQ(3, 16, 'Vector pop_back on Empty Vector', 'What happens if v.pop_back() is called on an empty std::vector?',
`vector<int> v; v.pop_back();`,
{ A: 'Throws std::underflow_error', B: 'Undefined Behavior', C: 'Returns false', D: 'Does nothing safely' }, 'B', 'Calling pop_back() or back() on an empty container in C++ results in Undefined Behavior.'),

  makeMCQ(3, 17, 'Destructor Call Order in Inheritance', 'In what order are destructors called for a derived object?',
`class Derived : public Base {};`,
{ A: 'Base first, then Derived', B: 'Derived first, then Base', C: 'Simultaneously in parallel', D: 'Arbitrary order decided by compiler' }, 'B', 'Destructors are executed in reverse order of constructors: the Derived destructor runs first, followed by the Base destructor.'),

  makeMCQ(3, 18, 'std::move State After Move', 'What is guaranteed about an object after being moved with std::move?',
`string s1 = "Hello"; string s2 = std::move(s1);`,
{ A: 's1 is guaranteed to be empty string ""', B: 's1 is in a valid but unspecified state', C: 's1 becomes a dangling pointer', D: 's1 retains its original value "Hello"' }, 'B', 'The C++ standard guarantees that a moved-from standard library object is in a valid but unspecified state.'),

  makeMCQ(3, 19, 'Float to Int Conversion Truncation', 'What is the output of this conversion?',
`#include <iostream>
using namespace std;
int main() {
    float f = -3.75f;
    int i = (int)f;
    cout << i << endl;
    return 0;
}`, { A: '-4', B: '-3', C: '-3.75', D: '3' }, 'B', 'Floating-point to integer conversion in C++ truncates towards zero. Truncating -3.75 towards zero gives -3.'),

  makeMCQ(3, 20, 'Priority Queue Default Ordering', 'By default, what type of heap does std::priority_queue implement?',
`#include <queue>
using namespace std;
priority_queue<int> pq;`,
{ A: 'Min-heap (smallest element on top)', B: 'Max-heap (largest element on top)', C: 'FIFO queue', D: 'LIFO stack' }, 'B', 'std::priority_queue uses std::less<T> by default, creating a max-heap where the largest element is at the top.'),

  // ==========================================
  // SET 4 (20 questions)
  // ==========================================
  makeMCQ(4, 1, 'C-Style String Length vs Sizeof', 'What is printed by strlen vs sizeof for this string?',
`#include <iostream>
#include <cstring>
using namespace std;
int main() {
    char s[] = "Code";
    cout << strlen(s) << " " << sizeof(s) << endl;
    return 0;
}`, { A: '4 4', B: '4 5', C: '5 5', D: '5 4' }, 'B', 'strlen counts characters before \'\\0\' (4). sizeof includes the null terminator byte (5).'),

  makeMCQ(4, 2, 'Default Member Access in Struct vs Class', 'What is the default access specifier for members of a struct vs class in C++?',
`struct A { int x; }; class B { int y; };`,
{ A: 'struct: public; class: private', B: 'struct: private; class: public', C: 'struct: protected; class: private', D: 'Both are private by default' }, 'A', 'In C++, struct members default to public, while class members default to private.'),

  makeMCQ(4, 3, 'Multiple Catch Blocks Ordering', 'What is the consequence of placing catch (const exception& e) before catch (const runtime_error& e)?',
`try { throw runtime_error("fail"); } catch (const exception& e) {} catch (const runtime_error& e) {}`,
{ A: 'Compilation warning or runtime_error block is unreachable', B: 'runtime_error will still catch it', C: 'The program terminates immediately', D: 'Compile error: duplicate handler' }, 'A', 'Catch blocks are tested in order. Since runtime_error inherits from exception, the first block catches it, making the second block dead code.'),

  makeMCQ(4, 4, 'Pointer Difference', 'What is the result of ptr2 - ptr1 in the following code?',
`#include <iostream>
using namespace std;
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int* ptr1 = &arr[1];
    int* ptr2 = &arr[4];
    cout << (ptr2 - ptr1) << endl;
    return 0;
}`, { A: '3', B: '12', C: '4', D: 'Undetermined' }, 'A', 'Pointer subtraction yields the number of elements between them: 4 - 1 = 3 (not bytes).'),

  makeMCQ(4, 5, 'Unsigned Underflow Wrap', 'What is printed by this unsigned loop?',
`#include <iostream>
using namespace std;
int main() {
    unsigned int x = 0;
    cout << x - 1 << endl;
    return 0;
}`, { A: '-1', B: '4294967295 (UINT_MAX)', C: '0', D: 'Runtime error' }, 'B', 'Unsigned arithmetic wraps modulo 2^N. 0u - 1u results in UINT_MAX (4294967295 on 32-bit uint).'),

  makeMCQ(4, 6, 'Dynamic Cast Downcasting Failure', 'What does dynamic_cast<Derived*>(basePtr) return when basePtr does not point to a Derived object?',
`Base* b = new Base(); Derived* d = dynamic_cast<Derived*>(b);`,
{ A: 'Throws bad_cast exception', B: 'Returns nullptr', C: 'Returns invalid memory address', D: 'Aborts the program' }, 'B', 'When dynamic_cast fails on a pointer type, it returns nullptr. (If cast on reference types, it throws std::bad_cast).'),

  makeMCQ(4, 7, 'Logical OR Short-Circuit', 'What is the value of a and b after execution?',
`#include <iostream>
using namespace std;
int main() {
    int a = 1, b = 2;
    if (a == 1 || ++b > 2) {
        a += 10;
    }
    cout << a << " " << b << endl;
    return 0;
}`, { A: '11 2', B: '11 3', C: '1 2', D: '1 3' }, 'A', 'Since a == 1 is true, logical OR short-circuits and ++b is not evaluated. a becomes 11 and b remains 2.'),

  makeMCQ(4, 8, 'Copy Elision / RVO', 'What is Return Value Optimization (RVO) in C++?',
`MyClass create() { return MyClass(); }`,
{ A: 'A compiler optimization that avoids copying or moving temporary return objects', B: 'A mechanism that automatically places return objects on the heap', C: 'A syntax for returning references to local variables', D: 'A tool for measuring function execution time' }, 'A', 'RVO allows the compiler to construct the returned object directly in the storage allocated for the callers receiving variable.'),

  makeMCQ(4, 9, 'Pure Virtual Function Syntax', 'How is a pure virtual function declared in C++?',
`class Shape { ... };`,
{ A: 'virtual void draw() = null;', B: 'virtual void draw() = 0;', C: 'pure virtual void draw();', D: 'abstract void draw();' }, 'B', 'In C++, appending = 0 to a virtual function declaration marks it as pure virtual, making the class abstract.'),

  makeMCQ(4, 10, 'Map Key Ordering', 'In what order does std::map iterate over its elements?',
`#include <map>
using namespace std;
map<int, string> m;`,
{ A: 'Insertion order', B: 'Sorted ascending by key', C: 'Sorted descending by value', D: 'Arbitrary hash order' }, 'B', 'std::map is implemented as a Red-Black Tree and stores keys in sorted ascending order (via std::less by default).'),

  makeMCQ(4, 11, 'Static Member Initialization', 'Where must non-const static data members of a class typically be defined?',
`class Widget { static int count; };`,
{ A: 'Inside the constructor', B: 'Outside the class definition at namespace scope', C: 'Inside main()', D: 'In the destructor' }, 'B', 'Non-inline, non-const static data members must be defined outside the class body at namespace scope (e.g. int Widget::count = 0;).'),

  makeMCQ(4, 12, 'Function Overloading by Return Type', 'Can two functions in C++ differ solely by their return type?',
`int calculate(int x); double calculate(int x);`,
{ A: 'Yes, always', B: 'No, causes compilation error', C: 'Yes, if one is static', D: 'Yes, in C++20 only' }, 'B', 'Function overloading requires different parameter lists. Return type alone is insufficient to distinguish overloads.'),

  makeMCQ(4, 13, 'Vector clear vs shrink_to_fit', 'What does v.clear() do to a vector capacity?',
`vector<int> v(1000); v.clear();`,
{ A: 'Reduces size to 0 and deallocates all memory', B: 'Reduces size to 0 but keeps capacity unchanged', C: 'Sets all elements to 0 without changing size', D: 'Deletes the vector object' }, 'B', 'clear() destroys the elements and sets size to 0, but does not deallocate storage. capacity remains unchanged.'),

  makeMCQ(4, 14, 'Bitwise NOT of Zero', 'What is the output of ~0 in a signed integer representation using two complement?',
`#include <iostream>
using namespace std;
int main() {
    int x = ~0;
    cout << x << endl;
    return 0;
}`, { A: '0', B: '-1', C: '1', D: '2147483647' }, 'B', 'In two complement, all 1s bits represent -1. Bitwise NOT of 0 (all 0s) is all 1s, which is -1.'),

  makeMCQ(4, 15, 'Initialization Order of Members', 'In C++, in what order are class member variables initialized?',
`class Test { int b; int a; public: Test(int x) : a(x), b(a) {} };`,
{ A: 'In the order they appear in the constructor initializer list', B: 'In the order they are declared in the class definition', C: 'Alphabetical order', D: 'Unspecified' }, 'B', 'Class members are always initialized in the order of their declaration in the class definition (here b before a), regardless of initializer list order.'),

  makeMCQ(4, 4+12, 'Mutable Keyword Purpose', 'What is the purpose of the mutable keyword on a class member variable?',
`class Cache { mutable int hitCount; };`,
{ A: 'Allows modification inside const member functions', B: 'Makes the variable thread-safe', C: 'Forces allocation in CPU registers', D: 'Allows the variable to change type at runtime' }, 'A', 'mutable allows a member variable of a class to be modified even within const member functions.'),

  makeMCQ(4, 17, 'String find First Occurrence', 'What is printed by this string search?',
`#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "banana";
    cout << s.find('a') << " " << s.rfind('a') << endl;
    return 0;
}`, { A: '1 5', B: '1 3', C: '0 5', D: '2 4' }, 'A', 's.find(\'a\') finds the first occurrence at index 1. s.rfind(\'a\') finds the last occurrence at index 5.'),

  makeMCQ(4, 18, 'Dangling Reference to Local', 'What is the danger of returning a reference to a local variable?',
`int& getVal() { int x = 10; return x; }`,
{ A: 'Memory leak', B: 'Dangling reference and undefined behavior when accessed', C: 'Infinite loop', D: 'Compiler converts it to a pointer' }, 'B', 'The local variable x is destroyed when getVal() returns. Returning a reference to it results in a dangling reference and undefined behavior.'),

  makeMCQ(4, 19, 'Std All_of Algorithm', 'What does std::all_of return on an empty range?',
`#include <algorithm>
#include <vector>
using namespace std;
vector<int> v; bool res = all_of(v.begin(), v.end(), [](int x){ return x > 0; });`,
{ A: 'false', B: 'true', C: 'Undefined behavior', D: 'Throws out_of_range' }, 'B', 'Vacuous truth: std::all_of returns true if the range is empty, regardless of the predicate.'),

  makeMCQ(4, 20, 'Explicit Constructor Purpose', 'What does marking a single-argument constructor explicit prevent?',
`class MyInt { public: explicit MyInt(int x) {} };`,
{ A: 'Prevents dynamic allocation with new', B: 'Prevents implicit type conversion and copy-initialization from int', C: 'Prevents inheritance from MyInt', D: 'Prevents destruction' }, 'B', 'explicit prevents the compiler from using the constructor for implicit conversions (e.g. MyInt m = 5; becomes invalid).'),

  // ==========================================
  // SET 5 (20 questions)
  // ==========================================
  makeMCQ(5, 1, 'Bitwise AND Power of Two Check', 'What does (n > 0) && ((n & (n - 1)) == 0) check?',
`bool check(int n) { return (n > 0) && ((n & (n - 1)) == 0); }`,
{ A: 'Whether n is an odd number', B: 'Whether n is a power of 2', C: 'Whether n is divisible by 4', D: 'Whether n is prime' }, 'B', 'Subtracting 1 flips the least significant set bit. If n is a power of 2 (exactly one 1-bit), n & (n - 1) is 0.'),

  makeMCQ(5, 2, 'Array Bound Indexing Undefined Behavior', 'What happens in C++ when accessing arr[5] in int arr[5]?',
`int arr[5] = {1, 2, 3, 4, 5}; cout << arr[5];`,
{ A: 'Throws ArrayIndexOutOfBoundsException', B: 'Prints 0', C: 'Undefined Behavior (out-of-bounds access)', D: 'Compile-time error' }, 'C', 'C++ does not perform runtime array bounds checking on native arrays or operator[]; out-of-bounds access is Undefined Behavior.'),

  makeMCQ(5, 3, 'Precedence of Dereference vs Increment', 'What does *ptr++ do in C++?',
`#include <iostream>
using namespace std;
int main() {
    int arr[] = {10, 20, 30};
    int* ptr = arr;
    int val = *ptr++;
    cout << val << " " << *ptr << endl;
    return 0;
}`, { A: '10 20', B: '11 20', C: '20 20', D: '10 10' }, 'A', 'Postfix ++ has higher precedence than *. *ptr++ yields *ptr (10), then increments the pointer ptr to point to arr[1] (20).'),

  makeMCQ(5, 4, 'Static Cast vs C-Style Cast', 'Why is static_cast preferred over C-style cast (int)x in modern C++?',
`double d = 3.14; int i = static_cast<int>(d);`,
{ A: 'static_cast is faster at runtime', B: 'static_cast performs compile-time type checks and avoids accidental dangerous conversions', C: 'C-style cast is deprecated in C++20', D: 'static_cast automatically handles null pointers' }, 'B', 'Named casts like static_cast are explicit, searchable, and prevent accidental casts between unrelated pointer types.'),

  makeMCQ(5, 5, 'String View Advantage', 'What is the main benefit of std::string_view (C++17) over const std::string&?',
`void log(std::string_view sv);`,
{ A: 'It modifies the underlying string safely', B: 'It provides a non-owning reference avoiding dynamic heap allocation for substrings and char arrays', C: 'It supports thread-safe concurrent writes', D: 'It automatically encrypts strings' }, 'B', 'std::string_view is a lightweight non-owning view (pointer + length) that avoids heap allocations when passing substrings or char* literals.'),

  makeMCQ(5, 6, 'Volatile Keyword in C++', 'What does the volatile keyword tell the compiler?',
`volatile int flag = 0;`,
{ A: 'The variable is thread-safe and atomic', B: 'The variable may be modified externally (e.g. hardware) so do not optimize away reads/writes', C: 'The variable is stored in flash memory', D: 'The variable is destroyed when leaving scope' }, 'B', 'volatile prevents compiler optimizations that cache reads/writes in registers, typically used for memory-mapped hardware I/O or signal handlers.'),

  makeMCQ(5, 7, 'Override Keyword Benefit', 'What happens if a method marked override does not match any base class virtual method signature?',
`struct Base { virtual void run(); }; struct Derived : Base { void run(int x) override; };`,
{ A: 'Silently creates a new overload', B: 'Compilation error', C: 'Warning at runtime', D: 'Calls Base::run()' }, 'B', 'override instructs the compiler to verify that the method overrides an exact matching virtual method in a base class; otherwise it triggers a compile error.'),

  makeMCQ(5, 8, 'Vector Iterators Invalidation', 'When can iterators to a std::vector become invalidated?',
`vector<int> v; ... v.push_back(10);`,
{ A: 'Only when v.clear() is called', B: 'When a reallocation occurs due to capacity exceeded, or elements before the iterator are erased/inserted', C: 'Iterators in C++ are never invalidated', D: 'Only when the vector goes out of scope' }, 'B', 'Reallocation invalidates all iterators. Even without reallocation, insertions and erasures invalidate iterators at and after the insertion/erasure point.'),

  makeMCQ(5, 9, 'Auto Deduction with Initializer List', 'What type is deduced for auto x = {1, 2, 3};?',
`auto x = {1, 2, 3};`,
{ A: 'std::vector<int>', B: 'std::initializer_list<int>', C: 'int[3]', D: 'std::array<int, 3>' }, 'B', 'Direct list initialization with auto deduces std::initializer_list<T>.'),

  makeMCQ(5, 10, 'Const Member Function Guarantee', 'What can a const member function NOT do (unless mutable is used)?',
`void display() const;`,
{ A: 'Read member variables', B: 'Modify any non-mutable member variables of the object', C: 'Call other const member functions', D: 'Return a value' }, 'B', 'A const member function treats *this as const ClassName*, prohibiting modifications to member variables unless marked mutable.'),

  makeMCQ(5, 11, 'Nullptr vs NULL', 'Why was nullptr introduced in C++11 to replace NULL?',
`void f(int); void f(void*); f(nullptr);`,
{ A: 'NULL is a pointer, nullptr is an integer', B: 'nullptr is a strongly typed std::nullptr_t that avoids overload ambiguity with integer 0', C: 'NULL uses 8 bytes while nullptr uses 4 bytes', D: 'NULL is deprecated in C++' }, 'B', 'NULL is typically defined as 0 or 0L, which can mistakenly bind to integer overloads. nullptr has type nullptr_t and only binds to pointer types.'),

  makeMCQ(5, 12, 'Default Copy Constructor Behavior', 'What kind of copy does the default copy constructor perform in C++?',
`class Box { int* data; }; Box b2 = b1;`,
{ A: 'Deep copy of all pointers and allocated buffers', B: 'Shallow (member-wise) bitwise copy of member variables', C: 'Sets pointers to null', D: 'Calls clone() method' }, 'B', 'The compiler-generated copy constructor performs a shallow copy, simply copying pointer addresses, which can lead to double-free bugs without custom handling.'),

  makeMCQ(5, 13, 'De Bruijn / Bit Count Builtin', 'What does __builtin_popcount(14) return in GCC/Clang?',
`cout << __builtin_popcount(14) << endl;`,
{ A: '1', B: '2', C: '3', D: '4' }, 'C', '14 in binary is 1110_2, which has three 1-bits. popcount counts the number of set bits (3).'),

  makeMCQ(5, 14, 'Structured Exception Handling vs C++ Exceptions', 'Can C++ catch (...) catch hardware exceptions like division by zero in standard C++?',
`int x = 5 / 0;`,
{ A: 'Yes, catch(...) catches all signals and hardware faults', B: 'No, division by zero is undefined behavior and not a C++ throw', C: 'Yes, throws std::overflow_error', D: 'Yes, throws std::runtime_error' }, 'B', 'Division by zero is undefined behavior in ISO C++; standard C++ try/catch only catches values thrown with throw expressions.'),

  makeMCQ(5, 15, 'Recursive Factorial Overflow', 'At what value of n does factorial n! exceed standard 32-bit signed int capacity (2 * 10^9)?',
`int fact(int n);`,
{ A: '10', B: '13', C: '16', D: '20' }, 'B', '12! = 479,001,600 fits in 32-bit signed int, but 13! = 6,227,020,800 overflows 2^31 - 1.'),

  makeMCQ(5, 16, 'Vector Resize vs Reserve', 'What is the key difference between v.reserve(10) and v.resize(10)?',
`vector<int> v;`,
{ A: 'reserve changes capacity without adding elements; resize changes size and default-constructs elements', B: 'reserve adds elements; resize only allocates memory', C: 'Both perform the exact same operation', D: 'resize only works with pointers' }, 'A', 'reserve(n) pre-allocates memory so capacity >= n (size remains 0). resize(n) creates n elements and sets size = n.'),

  makeMCQ(5, 17, 'String find_first_of', 'What does s.find_first_of("aeiou") search for?',
`string s = "cryptic"; size_t pos = s.find_first_of("aeiou");`,
{ A: 'The exact substring "aeiou"', B: 'The first occurrence of ANY vowel character present in "aeiou"', C: 'The last vowel in s', D: 'Returns true or false' }, 'B', 'find_first_of searches for the first character in the string that equals ANY character in the provided set.'),

  makeMCQ(5, 18, 'Inline Function Keyword Meaning in Modern C++', 'What is the primary role of the inline keyword in modern C++?',
`inline int helper() { return 42; }`,
{ A: 'Guarantees the compiler will never create a function call instruction', B: 'Allows a function definition to appear in multiple translation units without ODR violation', C: 'Makes the function execute in a separate thread', D: 'Places the function in CPU cache' }, 'B', 'While historically a hint for inlining, modern C++ uses inline primarily to permit multiple identical definitions across header files under One Definition Rule (ODR).'),

  makeMCQ(5, 19, 'Lambda State with Mutable', 'What is the output of the following lambda code?',
`#include <iostream>
using namespace std;
int main() {
    int a = 5;
    auto f = [a]() mutable { return ++a; };
    cout << f() << " ";
    cout << f() << " ";
    cout << a << endl;
    return 0;
}`, { A: '6 7 5', B: '6 7 7', C: '6 6 5', D: '5 6 5' }, 'A', 'a is captured by value. mutable allows the lambda to modify its internal copy of a across invocations (6, 7). The original a in main remains 5.'),

  makeMCQ(5, 20, 'Unordered Map Hash Collisions Complexity', 'What is the worst-case time complexity of lookup in std::unordered_map when all keys collide?',
`unordered_map<int, int> mp;`,
{ A: 'O(1)', B: 'O(log N)', C: 'O(N)', D: 'O(N log N)' }, 'C', 'When all keys collide into the same bucket, std::unordered_map degrades to a linear search across the collision chain, resulting in O(N) worst-case.')
];

module.exports = cppQuestions;
