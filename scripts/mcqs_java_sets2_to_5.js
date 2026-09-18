// Java MCQs for Sets 2, 3, 4, 5 (20 questions each, total 80 questions)

function makeMCQ(setNum, qNum, title, prompt, snippet, options, answer, explanation) {
  return {
    roundNumber: 1,
    setNumber: setNum,
    questionNumber: qNum,
    language: 'JAVA',
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

const javaQuestions = [
  // ==========================================
  // SET 2 (20 questions)
  // ==========================================
  makeMCQ(2, 1, 'Integer Cache in Java', 'What is the output of the following Java code?',
`public class Main {
    public static void main(String[] args) {
        Integer a = 127;
        Integer b = 127;
        Integer c = 128;
        Integer d = 128;
        System.out.println((a == b) + " " + (c == d));
    }
}`, { A: 'true true', B: 'true false', C: 'false false', D: 'false true' }, 'B', 'Java caches Integer objects in the range [-128, 127]. For 127, both refer to the cached instance (true). For 128, distinct objects are created on the heap, so == compares references (false).'),

  makeMCQ(2, 2, 'Finally Block Execution with Return', 'What does this method return?',
`public class Main {
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
}`, { A: '10', B: '20', C: 'Compilation error', D: '30' }, 'B', 'The finally block always executes and its return statement overrides any return statement executed inside the try block.'),

  makeMCQ(2, 3, 'String Immutability and concat', 'What is printed by the following Java code?',
`public class Main {
    public static void main(String[] args) {
        String s = "Java";
        s.concat(" 17");
        System.out.println(s);
    }
}`, { A: 'Java 17', B: 'Java', C: 'null', D: 'Compilation error' }, 'B', 'Strings in Java are immutable. s.concat() returns a new string, but since the return value is not assigned back to s, s remains "Java".'),

  makeMCQ(2, 4, 'Static Method Overriding (Hiding)', 'What does this program print?',
`class Super {
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
}`, { A: 'Super ', B: 'Sub ', C: 'Super Sub ', D: 'Compilation error' }, 'A', 'Static methods in Java cannot be overridden; they are hidden. Method resolution for static methods is determined at compile time based on the reference type (Super).'),

  makeMCQ(2, 5, 'ConcurrentModificationException in For-Each', 'What occurs during the execution of this code?',
`import java.util.*;
public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
        for (String s : list) {
            if ("B".equals(s)) list.remove(s);
        }
    }
}`, { A: 'Removes B successfully', B: 'ConcurrentModificationException', C: 'Infinite loop', D: 'IndexOutOfBoundsException' }, 'B', 'Modifying an ArrayList directly while iterating over it via an enhanced for-loop (iterator) invalidates the iterators modCount, triggering ConcurrentModificationException.'),

  makeMCQ(2, 6, 'Bitwise Unsigned Right Shift', 'What is the output of -8 >>> 1 in Java?',
`public class Main {
    public static void main(String[] args) {
        System.out.println(-8 >>> 1 > 0);
    }
}`, { A: 'true', B: 'false', C: '-4', D: 'Compilation error' }, 'A', 'The >>> operator zero-fills the high-order bits regardless of sign. For negative numbers, this results in a large positive integer (> 0).'),

  makeMCQ(2, 7, 'Array Polymorphism and ArrayStoreException', 'What happens at runtime in this code?',
`public class Main {
    public static void main(String[] args) {
        Object[] arr = new String[3];
        arr[0] = 42;
    }
}`, { A: 'Compiles and runs normally', B: 'ClassCastException at compile time', C: 'ArrayStoreException at runtime', D: 'NullPointerException' }, 'C', 'Java arrays are covariant and retain runtime type information. Storing an Integer (42) into a String[] array causes ArrayStoreException at runtime.'),

  makeMCQ(2, 8, 'StringBuilder Capacity Growth', 'What is the default initial capacity of new StringBuilder() in Java?',
`StringBuilder sb = new StringBuilder();`,
{ A: '0', B: '8', C: '16', D: '32' }, 'C', 'The default no-arg constructor of StringBuilder allocates a buffer with an initial capacity of 16 characters.'),

  makeMCQ(2, 9, 'Ternary Operator Auto-Unboxing NullPointerException', 'What exception is thrown by this code?',
`public class Main {
    public static void main(String[] args) {
        Boolean b = null;
        boolean result = (b != null) ? b : false;
        System.out.println(result);
    }
}`, { A: 'NullPointerException', B: 'Prints false without error', C: 'Compilation error', D: 'Prints true' }, 'B', 'Because b != null is false, the expression safely returns false without attempting to unbox null. Result is false.'),

  makeMCQ(2, 10, 'Final Variable Reassignment', 'What error does this code produce?',
`public class Main {
    final int x;
    public Main() {
        x = 10;
    }
    public void reset() {
        x = 0;
    }
}`, { A: 'No error', B: 'Compilation error in reset(): cannot assign a value to final variable x', C: 'Runtime FinalAssignmentException', D: 'Warning only' }, 'B', 'A blank final instance variable must be assigned exactly once in an initializer or constructor; reassigning in a method is a compile-time error.'),

  makeMCQ(2, 11, 'Switch Expression Exhaustiveness', 'Since Java 14, what is required for switch expressions returning a value?',
`int res = switch(val) { case 1 -> 10; default -> 0; };`,
{ A: 'Must use break', B: 'Must cover all possible input values (exhaustive), often requiring default', C: 'Must only switch on Strings', D: 'Cannot return primitive types' }, 'B', 'Switch expressions that produce a value must be exhaustive; all enum constants or a default branch must be present.'),

  makeMCQ(2, 12, 'HashMap get with Key hashCode Mutation', 'What happens if a key object in a HashMap is mutated after insertion altering its hashCode?',
`Map<Person, String> map = new HashMap<>();`,
{ A: 'The key is automatically rehashed', B: 'map.get(key) will likely return null because the bucket lookup looks in the new hash index', C: 'Throws KeyMutatedException', D: 'HashMap prevents object mutation' }, 'B', 'If an object hashCode changes after being placed in a HashMap, searching for it computes the new hash code and looks in the wrong bucket, returning null.'),

  makeMCQ(2, 13, 'Interface Default Method Resolution', 'If a class implements two interfaces having the exact same default method signature, what must the class do?',
`interface A { default void m() {} } interface B { default void m() {} }`,
{ A: 'Automatically calls interface A method', B: 'Must explicitly override the method to resolve the ambiguity or compile error occurs', C: 'Both default methods execute in sequence', D: 'Interfaces cannot have default methods' }, 'B', 'The compiler requires the implementing class to explicitly override the conflicting method and decide how to resolve it (e.g., A.super.m()).'),

  makeMCQ(2, 14, 'Garbage Collection System.gc Guarantee', 'What does calling System.gc() guarantee in Java?',
`System.gc();`,
{ A: 'Immediately reclaims all unreferenced heap memory', B: 'It is merely a hint/request to the JVM; there is no guarantee GC will run immediately', C: 'Forces Stop-The-World full GC synchronously', D: 'Throws UnsupportedOperationException in modern JVMs' }, 'B', 'System.gc() merely suggests that the Java Virtual Machine expend effort toward recycling unused objects; the JVM is free to ignore it.'),

  makeMCQ(2, 15, 'Covariant Return Types', 'Can an overriding method in a subclass return a subtype of the return type declared in the superclass?',
`class Animal {} class Dog extends Animal {}
class Shelter { Animal get() { return new Animal(); } }
class DogShelter extends Shelter { Dog get() { return new Dog(); } }`,
{ A: 'No, return types must match exactly in Java', B: 'Yes, Java supports covariant return types since Java 5', C: 'Only if methods are static', D: 'Only with generics' }, 'B', 'Java allows an overriding method to declare a return type that is a subtype (subclass) of the return type declared in the overridden method.'),

  makeMCQ(2, 16, 'Volatile Keyword Guarantee', 'What does the volatile keyword guarantee for a variable in Java?',
`private volatile boolean running = true;`,
{ A: 'Mutual exclusion and atomic compound operations (like ++)', B: 'Memory visibility across threads (reads/writes directly to main memory) and instruction reordering prevention', C: 'Immutable state', D: 'Prevents garbage collection' }, 'B', 'volatile guarantees that any read of a volatile variable sees the most recent write by any thread, but it does NOT provide mutual exclusion or atomic compound operations.'),

  makeMCQ(2, 17, 'Cloneable Interface Marker', 'What method is declared inside the java.lang.Cloneable interface?',
`public interface Cloneable {}`,
{ A: 'public Object clone();', B: 'public Object copy();', C: 'No methods; it is a marker interface', D: 'public void cloneObject();' }, 'C', 'Cloneable is a marker (tagging) interface with zero method declarations. clone() is defined as protected in java.lang.Object.'),

  makeMCQ(2, 18, 'Try-With-Resources AutoCloseable', 'In try-with-resources, in what order are multiple declared resources closed?',
`try (Resource r1 = new Resource(); Resource r2 = new Resource()) { ... }`,
{ A: 'In the exact order of declaration (r1 first, then r2)', B: 'In reverse order of declaration (r2 first, then r1)', C: 'Simultaneously in background threads', D: 'Arbitrary JVM order' }, 'B', 'Resources in a try-with-resources statement are closed in reverse order of their creation/declaration.'),

  makeMCQ(2, 19, 'String intern() Pool', 'What is the output of this code?',
`public class Main {
    public static void main(String[] args) {
        String s1 = new String("hello").intern();
        String s2 = "hello";
        System.out.println(s1 == s2);
    }
}`, { A: 'true', B: 'false', C: 'Compilation error', D: 'Throws NullPointerException' }, 'A', 'intern() returns the canonical representation from the string intern pool. Since s2 is a string literal from the pool, s1 == s2 evaluates to true.'),

  makeMCQ(2, 20, 'Generics Type Erasure', 'What happens to generic type parameters like List<String> after Java compilation?',
`List<String> list = new ArrayList<>();`,
{ A: 'Type information is retained in runtime bytecode for reflection', B: 'Type parameters are erased and replaced by their bounds (or Object) with necessary casts', C: 'A new compiled class List_String is created', D: 'Generics are interpreted at runtime by the JIT' }, 'B', 'Java uses type erasure: generic type parameters are replaced by their upper bound (or Object) at compile time to maintain backwards compatibility.'),

  // ==========================================
  // SET 3 (20 questions)
  // ==========================================
  makeMCQ(3, 1, 'Pass-by-Value Object Reference Reassignment', 'What is the output of this code?',
`public class Main {
    static void change(StringBuilder sb) {
        sb.append("World");
        sb = new StringBuilder("Goodbye");
    }
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello ");
        change(sb);
        System.out.println(sb);
    }
}`, { A: 'Goodbye', B: 'Hello World', C: 'Hello ', D: 'Hello Goodbye' }, 'B', 'Java is strictly pass-by-value. The method receives a copy of the reference. Modifying the referenced object mutates it, but reassigning the local reference does not affect main.'),

  makeMCQ(3, 2, 'Static Initializer Block Order', 'In what sequence do static blocks, instance initializers, and constructors execute?',
`class Demo {
    static { System.out.print("S "); }
    { System.out.print("I "); }
    Demo() { System.out.print("C "); }
}`,
{ A: 'S I C', B: 'I S C', C: 'C I S', D: 'I C S' }, 'A', 'When the class is loaded, static initializers run once (S). Then for each new instance, instance initializers run (I), followed by the constructor (C).'),

  makeMCQ(3, 3, 'Array Equality Check', 'What does arr1.equals(arr2) evaluate to for two distinct arrays with identical contents?',
`int[] a1 = {1, 2, 3}; int[] a2 = {1, 2, 3}; System.out.println(a1.equals(a2));`,
{ A: 'true', B: 'false', C: 'Compilation error', D: '1' }, 'B', 'Arrays do not override Object.equals(); therefore a1.equals(a2) performs reference equality (a1 == a2), which is false. Use Arrays.equals(a1, a2) for content equality.'),

  makeMCQ(3, 4, 'Polymorphism with Instance Variables', 'What does this code print?',
`class Parent { int x = 10; }
class Child extends Parent { int x = 20; }
public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.x);
    }
}`, { A: '10', B: '20', C: 'Compilation error', D: '0' }, 'A', 'In Java, variables are not polymorphic; they are resolved at compile time based on the declared reference type (Parent), so p.x is 10.'),

  makeMCQ(3, 5, 'Super Constructor Call Constraint', 'Where must a super() constructor call be located inside a subclass constructor?',
`public SubClass() { ... }`,
{ A: 'Anywhere inside the constructor body', B: 'Must be the very first statement', C: 'Must be the last statement', D: 'Inside a finally block' }, 'B', 'In Java, if super(...) or this(...) is explicitly invoked, it must unconditionally be the first statement in the constructor.'),

  makeMCQ(3, 6, 'TreeMap Natural Ordering Key Requirement', 'What interface must keys implement to be used in a default TreeMap?',
`Map<MyKey, String> map = new TreeMap<>();`,
{ A: 'Serializable', B: 'Cloneable', C: 'Comparable', D: 'Iterable' }, 'C', 'Default TreeMap relies on natural ordering, requiring key objects to implement java.lang.Comparable (or provide an explicit Comparator in constructor).'),

  makeMCQ(3, 7, 'Character Arithmetic Output', 'What is printed by this code?',
`public class Main {
    public static void main(String[] args) {
        char c = 'A';
        System.out.println(c + 1);
    }
}`, { A: 'B', B: '66', C: 'A1', D: 'Compilation error' }, 'B', 'Binary operator + promotes char to int. \'A\' has ASCII value 65, so 65 + 1 = 66.'),

  makeMCQ(3, 8, 'Checked vs Unchecked Exceptions', 'Which of the following inherits from RuntimeException and is therefore unchecked?',
`Exception hierarchy`,
{ A: 'IOException', B: 'SQLException', C: 'NullPointerException', D: 'ClassNotFoundException' }, 'C', 'NullPointerException extends RuntimeException and is an unchecked exception; the compiler does not force callers to declare or catch it.'),

  makeMCQ(3, 9, 'Short-Circuit Bitwise vs Logical Operator', 'What is the value of x after: boolean b = false & (++x > 0)?',
`int x = 5; boolean b = false & (++x > 0); System.out.println(x);`,
{ A: '5', B: '6', C: '0', D: 'Compilation error' }, 'B', 'Single & is a non-short-circuiting logical operator; it always evaluates both operands. Thus ++x executes and x becomes 6.'),

  makeMCQ(3, 10, 'Abstract Class Instantiation', 'Can an abstract class have constructors in Java?',
`abstract class Base { public Base() { System.out.println("Base"); } }`,
{ A: 'No, abstract classes cannot have constructors', B: 'Yes, called during subclass instantiation via super()', C: 'Only private constructors are allowed', D: 'Only if all methods are implemented' }, 'B', 'Abstract classes can have constructors. They cannot be instantiated directly with new, but their constructors are called by subclass constructors.'),

  makeMCQ(3, 11, 'Collections.sort Algorithm Complexity', 'What sorting algorithm does java.util.Arrays.sort(Object[]) / Collections.sort use?',
`Collections.sort(list);`,
{ A: 'QuickSort (O(N^2) worst case)', B: 'TimSort (adaptive, stable, O(N log N) worst case)', C: 'HeapSort', D: 'BubbleSort' }, 'B', 'Java uses TimSort for object collections and arrays, which is a hybrid of MergeSort and InsertionSort with guaranteed O(N log N) worst-case time.'),

  makeMCQ(3, 12, 'Method Reference Syntax', 'Which method reference is equivalent to the lambda (String s) -> System.out.println(s)?',
`Consumer<String> c;`,
{ A: 'System.out::println', B: 'System.out->println', C: 'String::println', D: 'PrintStream::println' }, 'A', 'System.out::println is an instance method reference on an existing object (System.out) matching Consumer<String>.'),

  makeMCQ(3, 13, 'Thread start vs run', 'What happens if you directly invoke t.run() instead of t.start() on a Thread?',
`Thread t = new Thread(task); t.run();`,
{ A: 'Starts a new concurrent thread as expected', B: 'Executes run() synchronously on the current calling thread without starting a new thread', C: 'Throws IllegalThreadStateException', D: 'Terminates the program' }, 'B', 'Calling run() directly is just a regular synchronous method call within the current thread. start() is required to spawn a new native thread.'),

  makeMCQ(3, 14, 'Finalize Method Deprecation', 'Why was Object.finalize() deprecated in modern Java (Java 9+)?',
`protected void finalize() throws Throwable {}`,
{ A: 'It was too fast', B: 'Unpredictable execution timing, performance overhead, thread safety issues, and better alternatives like AutoCloseable/Cleaner exist', C: 'It caused compile errors', D: 'Replaced by delete operator' }, 'B', 'Finalizers are notoriously unpredictable, slow, and dangerous; they provide no guarantee of timely execution.'),

  makeMCQ(3, 15, 'Optional get on Empty', 'What exception is thrown when calling Optional.empty().get()?',
`Optional<String> opt = Optional.empty(); opt.get();`,
{ A: 'NullPointerException', B: 'NoSuchElementException', C: 'IllegalArgumentException', D: 'IndexOutOfBoundsException' }, 'B', 'Calling get() on an empty Optional throws java.util.NoSuchElementException: No value present.'),

  makeMCQ(3, 16, 'List.of Immutability', 'What happens when calling add() on a list created via List.of("A", "B")?',
`List<String> list = List.of("A", "B"); list.add("C");`,
{ A: 'Adds "C" successfully', B: 'Throws UnsupportedOperationException', C: 'Returns false', D: 'Silently ignores insertion' }, 'B', 'List.of() returns an unmodifiable (immutable) list. Any mutating operation like add() or remove() throws UnsupportedOperationException.'),

  makeMCQ(3, 17, 'Package-Private Default Access', 'What is the visibility of a class member declared without any access modifier (no public, private, or protected)?',
`int count;`,
{ A: 'Public to all packages', B: 'Private to the class only', C: 'Accessible only by classes in the same package (package-private)', D: 'Protected across all subclasses' }, 'C', 'Default access in Java is package-private: accessible only by code within the exact same package.'),

  makeMCQ(3, 18, 'Record Classes in Java 16+', 'What does the Java record keyword automatically generate for its components?',
`record Point(int x, int y) {}`,
{ A: 'Getters named getX(), getY(), setters, and no-arg constructor', B: 'Private final fields, canonical constructor, accessors x() and y(), equals(), hashCode(), and toString()', C: 'Mutable public fields', D: 'Only a constructor' }, 'B', 'Records are transparent carriers for immutable data; the compiler generates private final fields, constructor, x()/y() accessors, equals, hashCode, and toString.'),

  makeMCQ(3, 19, 'Narrowing Primitive Conversion Overflow', 'What is the output of byte b = (byte) 130 in Java?',
`public class Main {
    public static void main(String[] args) {
        byte b = (byte) 130;
        System.out.println(b);
    }
}`, { A: '130', B: '-126', C: '127', D: '-128' }, 'B', 'byte range is -128 to 127. 130 exceeds 127: 130 - 256 = -126 in 8-bit signed two complement representation.'),

  makeMCQ(3, 20, 'Stream Intermediate vs Terminal Operations', 'When does an intermediate operation like .filter() or .map() execute in a Java Stream pipeline?',
`Stream<String> s = list.stream().filter(x -> { System.out.println(x); return true; });`,
{ A: 'Immediately when filter() is called', B: 'Lazily, only when a terminal operation (like collect or forEach) is invoked', C: 'In a background daemon thread', D: 'Never' }, 'B', 'Java streams are lazy; intermediate operations are not evaluated until a terminal operation is initiated on the pipeline.'),

  // ==========================================
  // SET 4 (20 questions)
  // ==========================================
  makeMCQ(4, 1, 'String Substring Indices', 'What is the output of "ANTIGRAVITY".substring(4, 8)?',
`System.out.println("ANTIGRAVITY".substring(4, 8));`,
{ A: 'IGRA', B: 'GRAV', C: 'GRA', D: 'IGRAV' }, 'A', 'substring(beginIndex, endIndex) is half-open [beginIndex, endIndex). Characters from index 4 to 7 are \'I\', \'G\', \'R\', \'A\'.'),

  makeMCQ(4, 2, 'Static Variable Shared Across Instances', 'What does this code output?',
`class Counter {
    static int count = 0;
    Counter() { count++; }
}
public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        System.out.println(c1.count + " " + Counter.count);
    }
}`, { A: '1 2', B: '2 2', C: '1 1', D: '0 2' }, 'B', 'static variables are shared across all instances of the class. Two instances increment count twice, so count is 2.'),

  makeMCQ(4, 3, 'Catching Exception Order', 'Why does placing catch(Exception e) before catch(IOException e) cause a compile error in Java?',
`try { ... } catch (Exception e) {} catch (IOException e) {}`,
{ A: 'Exception does not inherit from Throwable', B: 'IOException has already been caught (unreachable catch block)', C: 'IOException cannot be caught', D: 'Duplicate variable name e' }, 'B', 'Subclasses of Exception cannot follow Exception in catch clauses because they are completely shadowed and unreachable, triggering a compile error.'),

  makeMCQ(4, 4, 'Floating Point Precision Representation', 'What does System.out.println(0.1 + 0.2 == 0.3) print in Java?',
`System.out.println(0.1 + 0.2 == 0.3);`,
{ A: 'true', B: 'false', C: 'Compilation error', D: 'Throws ArithmeticException' }, 'B', 'Due to IEEE 754 binary floating-point representation limits, 0.1 + 0.2 equals 0.30000000000000004, which is not equal to 0.3 (false).'),

  makeMCQ(4, 5, 'Synchronized Method Lock Target', 'What lock/monitor does a non-static synchronized method acquire in Java?',
`public synchronized void update() {}`,
{ A: 'The Class object (MyClass.class)', B: 'The current instance object (this)', C: 'The JVM process lock', D: 'A new ReentrantLock object' }, 'B', 'A non-static synchronized method synchronizes on the instance object on which it was called (this). Static synchronized methods lock on the Class object.'),

  makeMCQ(4, 6, 'Anonymous Inner Class Variable Capture', 'What constraint is placed on local variables referenced inside an anonymous inner class / lambda in Java?',
`int x = 10; Runnable r = () -> System.out.println(x);`,
{ A: 'Must be static', B: 'Must be explicitly or effectively final', C: 'Must be volatile', D: 'Must be declared public' }, 'B', 'Variables captured from an enclosing scope must be final or effectively final (never modified after initialization).'),

  makeMCQ(4, 7, 'Queue peek vs poll', 'What is the difference between Queue.peek() and Queue.poll() when the queue is empty?',
`Queue<Integer> q = new LinkedList<>();`,
{ A: 'Both return null without removing any element', B: 'peek() inspects and returns null; poll() retrieves and removes the head (or returns null)', C: 'peek() throws NoSuchElementException; poll() returns null', D: 'Both throw NullPointerException' }, 'B', 'peek() returns the head element without removing it; poll() removes and returns the head element. Both return null on an empty queue.'),

  makeMCQ(4, 8, 'Transient Keyword Purpose', 'What is the effect of the transient keyword on an instance variable?',
`private transient String password;`,
{ A: 'The variable is stored in volatile CPU cache', B: 'The variable will not be serialized when the object is serialized', C: 'The variable is reset to null every minute', D: 'The variable cannot be read by other classes' }, 'B', 'transient marks a member field not to be included in the serialized binary representation when the object is written to an ObjectOutputStream.'),

  makeMCQ(4, 9, 'Enum values() Return Type', 'What does Color.values() return for an enum Color { RED, GREEN, BLUE }?',
`Color[] colors = Color.values();`,
{ A: 'List<Color>', B: 'Color[] array containing all enum constants in order of declaration', C: 'Set<Color>', D: 'Iterator<Color>' }, 'B', 'The compiler automatically creates a static values() method on every enum that returns an array containing all enum constants in declaration order.'),

  makeMCQ(4, 10, 'StringBuilder vs StringBuffer Thread Safety', 'What is the key difference between StringBuilder and StringBuffer?',
`StringBuilder vs StringBuffer`,
{ A: 'StringBuilder is synchronized and thread-safe; StringBuffer is not', B: 'StringBuffer is synchronized and thread-safe; StringBuilder is unsynchronized and faster for single-threaded use', C: 'StringBuilder is immutable; StringBuffer is mutable', D: 'There is no difference' }, 'B', 'StringBuffer methods are synchronized for thread-safety. StringBuilder is non-synchronized, providing higher performance in single-threaded code.'),

  makeMCQ(4, 11, 'Arrays asList Fixed Size', 'What happens if you call add() on a list created by Arrays.asList("a", "b")?',
`List<String> list = Arrays.asList("a", "b"); list.add("c");`,
{ A: 'Appends "c" successfully', B: 'Throws UnsupportedOperationException', C: 'Increases capacity automatically', D: 'Overwrites "b"' }, 'B', 'Arrays.asList() returns a fixed-size list backed by the array. Structural modifications like add() or remove() throw UnsupportedOperationException.'),

  makeMCQ(4, 12, 'Polymorphic Method Resolution with super Reference', 'What does this snippet print?',
`class A { void print() { System.out.print("A"); } }
class B extends A { void print() { System.out.print("B"); } }
class C extends B { void print() { super.print(); System.out.print("C"); } }
public class Main {
    public static void main(String[] args) {
        new C().print();
    }
}`, { A: 'BC', B: 'AC', C: 'ABC', D: 'C' }, 'A', 'In C, super.print() calls B.print(), which prints "B". Then C prints "C", yielding "BC".'),

  makeMCQ(4, 13, 'Functional Interface Annotation', 'What is the defining characteristic of an interface marked with @FunctionalInterface?',
`@FunctionalInterface interface Task { void execute(); }`,
{ A: 'It must contain zero methods', B: 'It has exactly one abstract method (SAM)', C: 'It cannot contain default or static methods', D: 'It must extend Runnable' }, 'B', 'A functional interface has exactly one abstract method (Single Abstract Method). It may contain any number of default or static methods.'),

  makeMCQ(4, 14, 'HashSet Internal Implementation', 'What standard data structure is used internally by java.util.HashSet to store elements?',
`Set<String> set = new HashSet<>();`,
{ A: 'An array of linked lists', B: 'A HashMap instance (elements stored as keys with a dummy Object as value)', C: 'A Red-Black Tree', D: 'A circular buffer' }, 'B', 'HashSet is backed internally by a HashMap. When you call set.add(e), it executes map.put(e, PRESENT).'),

  makeMCQ(4, 15, 'Strictfp Keyword Meaning', 'What does the strictfp keyword ensure in Java?',
`public strictfp class MathUtils {}`,
{ A: 'Forces IEEE 754 strict floating-point calculation rules across all hardware architectures', B: 'Disables garbage collection during floating point math', C: 'Prevents division by zero exceptions', D: 'Increases float precision to 128 bits' }, 'A', 'strictfp ensures that floating-point calculations adhere strictly to IEEE 754 standards across all platforms, ensuring reproducibility.'),

  makeMCQ(4, 16, 'Comparable compareTo Contract', 'What should a.compareTo(b) return when a is considered greater than b?',
`int res = a.compareTo(b);`,
{ A: '0', B: 'A positive integer (> 0)', C: 'A negative integer (< 0)', D: 'true' }, 'B', 'The compareTo method returns a negative integer, zero, or a positive integer as this object is less than, equal to, or greater than the specified object.'),

  makeMCQ(4, 17, 'String repeat Method in Java 11+', 'What does "ab".repeat(3) output in Java 11+?',
`System.out.println("ab".repeat(3));`,
{ A: 'ababab', B: 'ab 3', C: 'a3b3', D: 'Compilation error' }, 'A', 'String.repeat(int count) concatenates the string count times: "ab" * 3 = "ababab".'),

  makeMCQ(4, 18, 'Deadlock Condition in Multithreading', 'Which situation is a classic cause of deadlock in Java?',
`Thread 1 locks Resource A, waits for B; Thread 2 locks Resource B, waits for A`,
{ A: 'Race condition', B: 'Circular wait condition between two threads holding mutually requested locks', C: 'Starvation', D: 'Thread death' }, 'B', 'Circular wait occurs when Thread 1 holds lock A waiting for lock B, while Thread 2 holds lock B waiting for lock A.'),

  makeMCQ(4, 19, 'Generics Wildcard Lower Bound', 'What does List<? super Integer> accept as valid assignments?',
`List<? super Integer> list;`,
{ A: 'List<Double>', B: 'List<Integer>, List<Number>, or List<Object>', C: 'List<String>', D: 'Only List<Integer>' }, 'B', '? super Integer specifies a lower bound: it accepts Integer and any of its superclasses (Number, Object).'),

  makeMCQ(4, 20, 'System.exit in Try-Finally', 'Does the finally block execute if System.exit(0) is called inside the try block?',
`try { System.exit(0); } finally { System.out.println("Clean up"); }`,
{ A: 'Yes, finally always runs unconditionally', B: 'No, System.exit immediately halts JVM execution and finally does NOT run', C: 'Only in debug mode', D: 'Throws SecurityException' }, 'B', 'System.exit(0) terminates the running Java Virtual Machine immediately; pending finally blocks will not execute.'),

  // ==========================================
  // SET 5 (20 questions)
  // ==========================================
  makeMCQ(5, 1, 'ThreadLocal Storage Isolation', 'What is the purpose of ThreadLocal<T> in Java?',
`ThreadLocal<Integer> threadId = ThreadLocal.withInitial(() -> 1);`,
{ A: 'Shares variables globally across all threads', B: 'Provides thread-local variables where each accessing thread has its own independently initialized copy', C: 'Prevents thread creation', D: 'Performs lock-free CAS on primitives' }, 'B', 'ThreadLocal provides thread-confined state: each thread that accesses get() or set() accesses its own independent copy.'),

  makeMCQ(5, 2, 'Sealed Classes (Java 17)', 'What modifier restricts which other classes or interfaces may extend or implement a class in Java 17+?',
`public sealed class Shape permits Circle, Square {}`,
{ A: 'final', B: 'sealed', C: 'restricted', D: 'locked' }, 'B', 'sealed classes restrict subtyping by explicitly declaring permitted subtypes using the permits clause.'),

  makeMCQ(5, 3, 'Happens-Before Relationship', 'In the Java Memory Model, which action establishes a happens-before relationship?',
`volatile int flag;`,
{ A: 'A plain read of a non-volatile variable', B: 'A write to a volatile variable happens-before every subsequent read of that same volatile variable', C: 'Calling Thread.yield()', D: 'Creating an array' }, 'B', 'Writing to a volatile variable establishes a memory barrier ensuring all preceding writes are visible to subsequent reads of that volatile variable.'),

  makeMCQ(5, 4, 'Equals and HashCode Contract Violation', 'What occurs if two objects are equal according to equals() but return different hashCodes when used in a HashSet?',
`obj1.equals(obj2) == true but obj1.hashCode() != obj2.hashCode()`,
{ A: 'HashSet throws HashCollisionException', B: 'HashSet may treat them as distinct elements and add both, violating set uniqueness', C: 'The JVM automatically averages their hash codes', D: 'HashSet replaces obj1 with obj2' }, 'B', 'If equals() is true, hashCode() MUST return the same integer; otherwise hash containers place equal objects into different buckets.'),

  makeMCQ(5, 5, 'Stream Reduce Identity Element', 'What is the result of Stream.of(1, 2, 3, 4).reduce(10, (a, b) -> a + b)?',
`int sum = Stream.of(1, 2, 3, 4).reduce(10, (a, b) -> a + b);
System.out.println(sum);`,
{ A: '10', B: '20', C: '24', D: '14' }, 'B', 'The identity element 10 is the initial value of the accumulation: 10 + 1 + 2 + 3 + 4 = 20.'),

  makeMCQ(5, 6, 'Pattern Matching for Instanceof (Java 16+)', 'What is the syntax for pattern matching with instanceof in modern Java?',
`if (obj instanceof String s) { System.out.println(s.length()); }`,
{ A: 'Requires explicit casting (String) obj inside the block', B: 'Automatically casts and binds obj to pattern variable s if the type matches', C: 'Only works with primitives', D: 'Deprecated in Java 17' }, 'B', 'Pattern matching for instanceof combines the type check and variable binding into a single concise expression without explicit casting.'),

  makeMCQ(5, 7, 'AtomicInteger Compare-And-Set (CAS)', 'What does atomicInt.compareAndSet(expected, update) do?',
`AtomicInteger ai = new AtomicInteger(5);
boolean success = ai.compareAndSet(5, 10);`,
{ A: 'Always sets the value to 10', B: 'Atomically sets the value to update if and only if the current value equals expected, returning true', C: 'Throws an exception if expected does not match', D: 'Locks the object indefinitely' }, 'B', 'CAS is a lock-free hardware-level atomic instruction that updates the value only if it currently equals the expected value.'),

  makeMCQ(5, 8, 'CompletableFuture supplyAsync', 'By default, what thread pool does CompletableFuture.supplyAsync() use if no executor is specified?',
`CompletableFuture.supplyAsync(() -> "data");`,
{ A: 'Executors.newSingleThreadExecutor()', B: 'ForkJoinPool.commonPool()', C: 'Executors.newCachedThreadPool()', D: 'The main calling thread' }, 'B', 'supplyAsync() defaults to using ForkJoinPool.commonPool() for asynchronous task execution unless an explicit Executor is passed.'),

  makeMCQ(5, 9, 'Reflection setAccessible Meaning', 'What does field.setAccessible(true) allow through Java reflection?',
`Field field = clazz.getDeclaredField("secret"); field.setAccessible(true);`,
{ A: 'Allows reading and modifying private or protected fields bypassing Java language access control checks', B: 'Makes the field public permanently', C: 'Saves the field to disk', D: 'Compiles the field into C++' }, 'A', 'setAccessible(true) suppresses Java language access checks, permitting access to private members (subject to SecurityManager / module permissions).'),

  makeMCQ(5, 10, 'Classloader Hierarchy Delegation', 'What is the top-most root class loader in the standard JVM classloader hierarchy?',
`ClassLoader cl;`,
{ A: 'Application ClassLoader (System)', B: 'Platform / Extension ClassLoader', C: 'Bootstrap ClassLoader', D: 'Custom ClassLoader' }, 'C', 'The Bootstrap ClassLoader is the parent of all class loaders and loads the core Java runtime classes (like java.lang.*).'),

  makeMCQ(5, 11, 'ArrayDeque vs LinkedList for Queue', 'Why is ArrayDeque generally faster than LinkedList when used as a Queue or Stack in Java?',
`Queue<Integer> q = new ArrayDeque<>();`,
{ A: 'ArrayDeque is synchronized', B: 'ArrayDeque uses contiguous array memory offering better cache locality and avoiding per-node object allocation overhead', C: 'LinkedList has O(N) insertion at ends', D: 'ArrayDeque allows null elements' }, 'B', 'ArrayDeque stores elements in a contiguous circular array, eliminating node allocation overhead and providing superior CPU cache locality.'),

  makeMCQ(5, 12, 'Enum Singleton Safety', 'Why did Joshua Bloch recommend an enum as the best way to implement a singleton in Java?',
`public enum Singleton { INSTANCE; }`,
{ A: 'It runs on multiple JVMs', B: 'It provides unconditional guarantees against multiple instantiations, even through serialization or reflection attacks', C: 'It uses 0 bytes of heap', D: 'It does not require JVM' }, 'B', 'Enum singletons are inherently serializable, thread-safe, and immune to reflection attacks, as JVM prevents reflective instantiation of enums.'),

  makeMCQ(5, 13, 'Static Nested vs Inner Class', 'What distinguishes a static nested class from a non-static inner class in Java?',
`class Outer { static class S {} class I {} }`,
{ A: 'A static nested class does not have an implicit reference to an enclosing instance of Outer', B: 'An inner class cannot access private members of Outer', C: 'Static nested classes cannot have constructors', D: 'There is no difference' }, 'A', 'Non-static inner classes retain an implicit reference to Outer.this, preventing garbage collection of the outer object if the inner instance lives longer.'),

  makeMCQ(5, 14, 'Cleaner vs Finalizer', 'Why does java.lang.ref.Cleaner provide better cleanup safety than Object.finalize() in modern Java?',
`Cleaner cleaner = Cleaner.create();`,
{ A: 'Cleaning actions are managed in separate threads without holding strong references to the object being reclaimed', B: 'Cleaner immediately deletes files on disk', C: 'Cleaner disables garbage collection', D: 'Cleaner runs synchronously before main exits' }, 'A', 'Cleaner decouples the phantom-reachable cleanup action from the target object, avoiding finalizer resurrection bugs and memory leaks.'),

  makeMCQ(5, 15, 'SoftReference vs WeakReference', 'Under what condition does the JVM Garbage Collector clear SoftReferences compared to WeakReferences?',
`SoftReference<byte[]> softRef = new SoftReference<>(new byte[1024]);`,
{ A: 'WeakReferences are cleared only when OutOfMemoryError is thrown', B: 'WeakReferences are cleared during the next GC cycle; SoftReferences are retained until memory pressure requires reclamation', C: 'SoftReferences are never garbage collected', D: 'Both are identical' }, 'B', 'SoftReference objects are cleared at the discretion of the garbage collector in response to memory demand, making them ideal for memory-sensitive caches.'),

  makeMCQ(5, 16, 'String.join Delimiter Behavior', 'What is the output of String.join("-", "A", "B", "C") in Java?',
`System.out.println(String.join("-", "A", "B", "C"));`,
{ A: '-A-B-C-', B: 'A-B-C', C: 'ABC-', D: 'Compilation error' }, 'B', 'String.join(delimiter, elements) places the delimiter between elements without leading or trailing delimiters: "A-B-C".'),

  makeMCQ(5, 17, 'Text Blocks in Java 15+', 'What is the syntax for multi-line Text Blocks introduced in Java 15?',
`String html = """
              <html>
              </html>""";`,
{ A: 'Enclosed with triple double-quotes """ with opening delimiter followed by a line break', B: 'Enclosed with single quotes \'\'\'', C: 'Enclosed with backticks ```', D: 'Enclosed with <<<' }, 'A', 'Java Text Blocks use triple double-quotes (""") and require a newline immediately following the opening delimiter.'),

  makeMCQ(5, 18, 'Var Local Variable Type Inference (Java 10+)', 'Where can the var keyword NOT be used in Java?',
`var x = 10;`,
{ A: 'For local variables inside methods', B: 'For method parameters, return types, and class fields', C: 'Inside for loops', D: 'With try-with-resources' }, 'B', 'var is strictly for local variable declarations with initializers; it cannot be used for class fields, method parameter types, or return types.'),

  makeMCQ(5, 19, 'HashMap Load Factor and Rehash', 'What is the default load factor of java.util.HashMap and when does resizing occur?',
`Map<Integer, Integer> map = new HashMap<>();`,
{ A: '0.50 (resizes when half full)', B: '0.75 (resizes when size exceeds 75% of current capacity)', C: '1.0 (resizes when 100% full)', D: '0.90' }, 'B', 'The default load factor is 0.75, which offers a good tradeoff between time and space costs. Resizing doubles capacity when size > capacity * 0.75.'),

  makeMCQ(5, 20, 'Record Component Immutability Caveat', 'If a Java record contains a List field record Team(List<String> members), is the list immutable?',
`record Team(List<String> members) {}`,
{ A: 'Yes, records automatically make all collections deeply immutable', B: 'No, while the reference members is final, the list contents remain mutable unless explicitly wrapped in Collections.unmodifiableList', C: 'Records cannot contain collections', D: 'Throws RecordFieldException' }, 'B', 'Shallow immutability: record fields are final references, but mutable objects (like ArrayList) pointed to by those fields can still be modified directly.')
];

module.exports = javaQuestions;
