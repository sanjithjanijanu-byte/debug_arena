// Python MCQs for Sets 2, 3, 4, 5 (20 questions each, total 80 questions)

function makeMCQ(setNum, qNum, title, prompt, snippet, options, answer, explanation) {
  return {
    roundNumber: 1,
    setNumber: setNum,
    questionNumber: qNum,
    language: 'PYTHON',
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

const pythonQuestions = [
  // ==========================================
  // SET 2 (20 questions)
  // ==========================================
  makeMCQ(2, 1, 'Default Mutable Argument Trap', 'What is the output of the following Python code?',
`def append_to(element, target=[]):
    target.append(element)
    return target

print(append_to(1))
print(append_to(2))`,
{ A: '[1] then [2]', B: '[1] then [1, 2]', C: '[1, 2] then [1, 2]', D: 'TypeError' }, 'B', 'Default argument expressions in Python are evaluated once when the function is defined, not each time it is called. The shared list accumulates elements across calls: [1], then [1, 2].'),

  makeMCQ(2, 2, 'Integer Caching (-5 to 256)', 'What is the output of this Python identity check?',
`a = 256
b = 256
c = 257
d = 257
print(a is b, c is d)`,
{ A: 'True True', B: 'True False', C: 'False False', D: 'False True' }, 'B', 'CPython pre-allocates an array of integer objects for small integers in the range [-5, 256]. 256 shares the same object id (True), whereas 257 creates distinct objects (False).'),

  makeMCQ(2, 3, 'Tuple with Mutable Element Mutation', 'What happens when executing this Python code?',
`t = ([1, 2], 3)
t[0].append(99)
print(t)`,
{ A: 'TypeError: tuple is immutable', B: '([1, 2, 99], 3)', C: '([1, 2], 3, 99)', D: 'AttributeError' }, 'B', 'The tuple itself is immutable (its references cannot change), but the list inside the tuple is mutable, so appending 99 to t[0] succeeds: ([1, 2, 99], 3).'),

  makeMCQ(2, 4, 'List Comprehension Variable Leak (Python 3)', 'What is the output of this code in Python 3?',
`x = 100
squares = [x * x for x in range(3)]
print(x)`,
{ A: '2', B: '4', C: '100', D: 'NameError' }, 'C', 'In Python 3, list comprehensions have their own local scope, preventing the loop variable from leaking into the enclosing scope. x remains 100.'),

  makeMCQ(2, 5, 'String Multiplication and Join', 'What is the result of "-".join(["a", "b"] * 2)?',
`print("-".join(["a", "b"] * 2))`,
{ A: 'a-b-a-b', B: 'a-b*2', C: 'aa-bb', D: '["a", "b", "a", "b"]' }, 'A', '["a", "b"] * 2 produces ["a", "b", "a", "b"]. Joining them with "-" produces "a-b-a-b".'),

  makeMCQ(2, 6, 'Isinstance with Bool and Int', 'What does isinstance(True, int) evaluate to in Python?',
`print(isinstance(True, int))`,
{ A: 'False', B: 'True', C: 'TypeError', D: 'SyntaxError' }, 'B', 'In Python, the bool class is a direct subclass of int (True has int value 1, False has 0). Therefore isinstance(True, int) is True.'),

  makeMCQ(2, 7, 'Dictionary get Default Value', 'What does d.get("missing", 42) return when "missing" is not in d?',
`d = {"a": 1}
print(d.get("missing", 42))`,
{ A: 'KeyError: missing', B: '42', C: 'None', D: '0' }, 'B', 'dict.get(key, default) returns the specified default value (42) if the key is not present in the dictionary without raising a KeyError.'),

  makeMCQ(2, 8, 'Generator Yield State', 'What is printed by this generator function call?',
`def count():
    yield 1
    yield 2
    yield 3

gen = count()
print(next(gen), next(gen))`,
{ A: '1 1', B: '1 2', C: '2 3', D: '[1, 2]' }, 'B', 'Generators yield one value at a time and suspend state. The first next() yields 1, and the second yields 2.'),

  makeMCQ(2, 9, 'Nonlocal Keyword Purpose', 'What is the purpose of the nonlocal keyword in Python?',
`def outer():
    x = 10
    def inner():
        nonlocal x
        x += 1`,
{ A: 'Declares x in the global module scope', B: 'Binds x to the nearest enclosing non-global scope variable', C: 'Prevents x from being modified', D: 'Exports x to other files' }, 'B', 'nonlocal causes the identifier to refer to previously bound variables in the nearest enclosing scope excluding globals.'),

  makeMCQ(2, 10, 'Set Discard vs Remove', 'What is the difference between s.remove(x) and s.discard(x) when x is not in the set?',
`s = {1, 2, 3}`,
{ A: 'remove raises KeyError; discard does nothing', B: 'discard raises KeyError; remove does nothing', C: 'Both raise KeyError', D: 'Both remove all elements' }, 'A', 's.remove(x) raises a KeyError if x is not present in the set. s.discard(x) silently does nothing if x is absent.'),

  makeMCQ(2, 11, 'Try Except Else Block', 'When does the else block execute in a Python try-except-else-finally statement?',
`try:
    process()
except ValueError:
    pass
else:
    print("Success")`,
{ A: 'Only when an exception occurs', B: 'Only when NO exception was raised in the try block', C: 'Always, right before finally', D: 'Never' }, 'B', 'The else block executes only if the try block completed successfully without raising any exceptions.'),

  makeMCQ(2, 12, 'List Pop with Index', 'What is the return value of [10, 20, 30].pop(1)?',
`lst = [10, 20, 30]
val = lst.pop(1)`,
{ A: '10', B: '20', C: '30', D: '[10, 30]' }, 'B', 'pop(index) removes and returns the element at the specified index. Index 1 contains 20.'),

  makeMCQ(2, 13, 'Unhashable Type in Dictionary Key', 'Which of the following types CANNOT be used as a dictionary key in Python?',
`d = {}`,
{ A: 'tuple: (1, 2)', B: 'frozenset: frozenset([1, 2])', C: 'list: [1, 2]', D: 'str: "key"' }, 'C', 'Dictionary keys must be hashable and immutable. Lists are mutable and unhashable, raising TypeError: unhashable type: list.'),

  makeMCQ(2, 14, 'All Function on Empty Iterable', 'What does all([]) evaluate to in Python?',
`print(all([]))`,
{ A: 'False', B: 'True', C: 'None', D: 'TypeError' }, 'B', 'all() returns True if all elements of the iterable are true, or if the iterable is empty (vacuous truth).'),

  makeMCQ(2, 15, 'Lambda Sorting by Key', 'What does sorted([(1, 3), (4, 1), (2, 2)], key=lambda x: x[1]) produce?',
`data = [(1, 3), (4, 1), (2, 2)]
print(sorted(data, key=lambda x: x[1]))`,
{ A: '[(1, 3), (2, 2), (4, 1)]', B: '[(4, 1), (2, 2), (1, 3)]', C: '[(1, 3), (4, 1), (2, 2)]', D: '[(4, 1), (1, 3), (2, 2)]' }, 'B', 'The key extracts the second element of each tuple: 1, 2, 3. The sorted order is [(4, 1), (2, 2), (1, 3)].'),

  makeMCQ(2, 16, 'Enumerate Start Index', 'What is the first tuple yielded by enumerate(["apple", "banana"], start=1)?',
`for item in enumerate(["apple", "banana"], start=1):
    print(item); break`,
{ A: '(0, "apple")', B: '(1, "apple")', C: '("apple", 1)', D: '(1, "banana")' }, 'B', 'enumerate(iterable, start=1) starts the counter at 1, yielding (1, "apple") first.'),

  makeMCQ(2, 17, 'String Splitting with Maxsplit', 'What is the output of "a,b,c,d".split(",", 2)?',
`print("a,b,c,d".split(",", 2))`,
{ A: '["a", "b", "c,d"]', B: '["a", "b", "c", "d"]', C: '["a", "b"]', D: '["a,b", "c,d"]' }, 'A', 'split(",", 2) splits at most 2 times, producing 3 chunks: ["a", "b", "c,d"].'),

  makeMCQ(2, 18, 'Dict Keys Union (Python 3.9+)', 'What operator merges two dictionaries in Python 3.9+?',
`d1 = {"a": 1}; d2 = {"b": 2}`,
{ A: 'd1 + d2', B: 'd1 | d2', C: 'd1 & d2', D: 'd1.merge(d2)' }, 'B', 'Python 3.9 introduced the dictionary union operator |: d1 | d2 creates a merged dictionary.'),

  makeMCQ(2, 19, 'Zip with Unequal Lengths', 'What is the length of list(zip([1, 2, 3, 4], ["a", "b"]))?',
`print(len(list(zip([1, 2, 3, 4], ["a", "b"]))))`,
{ A: '4', B: '2', C: '6', D: 'ValueError' }, 'B', 'zip() stops when the shortest input iterable is exhausted. ["a", "b"] has length 2, so the result has length 2.'),

  makeMCQ(2, 20, 'Global Variable Modification Without Declaration', 'What happens when modifying a global variable without the global keyword?',
`x = 10
def f():
    x += 1
f()`,
{ A: 'x becomes 11 globally', B: 'UnboundLocalError: local variable referenced before assignment', C: 'Creates a local variable with value 11', D: 'Warning only' }, 'B', 'Assigning to x makes it local to f(). Attempting to read x before assignment (in +=) raises UnboundLocalError.'),

  // ==========================================
  // SET 3 (20 questions)
  // ==========================================
  makeMCQ(3, 1, 'Shallow Copy List Multiplication', 'What is printed after modifying this 2D list created with multiplication?',
`matrix = [[0] * 2] * 2
matrix[0][0] = 7
print(matrix)`,
{ A: '[[7, 0], [0, 0]]', B: '[[7, 0], [7, 0]]', C: '[[7, 7], [0, 0]]', D: '[[0, 0], [0, 0]]' }, 'B', 'Multiplying a list containing a mutable list [[0]*2] * 2 creates references to the exact same inner list. Modifying matrix[0][0] modifies all rows: [[7, 0], [7, 0]].'),

  makeMCQ(3, 2, 'String Reverse Slice', 'What does the slice s[::-1] do to a string s?',
`s = "antigravity"
print(s[::-1])`,
{ A: 'Prints "antigravity"', B: 'Reverses the string s', C: 'Deletes the last character', D: 'Raises IndexError' }, 'B', 'A step of -1 traverses the sequence backwards, reversing it.'),

  makeMCQ(3, 3, 'Floor Division with Negatives', 'What is the result of -7 // 2 in Python?',
`print(-7 // 2)`,
{ A: '-3', B: '-4', C: '-3.5', D: '3' }, 'B', 'Python floor division // rounds down towards negative infinity (floor): floor(-3.5) is -4.'),

  makeMCQ(3, 4, 'Dunder Repr vs Str', 'Which special method is invoked by the built-in repr() function?',
`class Item: ...`,
{ A: '__str__', B: '__repr__', C: '__format__', D: '__display__' }, 'B', 'repr(obj) invokes obj.__repr__(). If __str__ is missing, str() also falls back to __repr__().'),

  makeMCQ(3, 5, 'Walrus Operator (Python 3.8+)', 'What does the walrus operator := do?',
`if (n := len(data)) > 5: print(n)`,
{ A: 'Compares values strictly', B: 'Assigns a value to a variable as part of an expression', C: 'Performs integer division', D: 'Defines a generator' }, 'B', 'The := assignment expression (walrus) operator allows assignment of variables within an expression.'),

  makeMCQ(3, 6, 'Filter Function Output Type', 'What type does the built-in filter() function return in Python 3?',
`f = filter(lambda x: x > 0, [1, -2, 3])`,
{ A: 'list', B: 'filter object (iterator)', C: 'tuple', D: 'generator' }, 'B', 'In Python 3, filter() returns an iterator of type filter, not a list. To get a list, list(f) must be called.'),

  makeMCQ(3, 7, 'Class Variable vs Instance Variable Shadowing', 'What is the output of this code?',
`class Dog:
    kind = 'canine'
    def __init__(self, name):
        self.name = name

d1 = Dog('Fido')
d2 = Dog('Buddy')
d1.kind = 'hound'
print(d1.kind, d2.kind, Dog.kind)`,
{ A: 'hound hound canine', B: 'hound canine canine', C: 'hound hound hound', D: 'canine canine canine' }, 'B', 'd1.kind = \'hound\' binds an instance variable to d1, shadowing the class variable. d2 and Dog still refer to the class variable \'canine\'.'),

  makeMCQ(3, 8, 'Args and Kwargs Unpacking', 'What does *args and **kwargs collect in function definitions?',
`def func(*args, **kwargs): ...`,
{ A: 'args collects positional arguments as a tuple; kwargs collects keyword arguments as a dict', B: 'args collects dict; kwargs collects tuple', C: 'Both collect lists', D: 'args collects strings; kwargs collects integers' }, 'A', '*args bundles extra positional arguments into a tuple, while **kwargs bundles extra keyword arguments into a dictionary.'),

  makeMCQ(3, 9, 'Any Function on Falsy Values', 'What does any([0, False, "", None]) evaluate to?',
`print(any([0, False, "", None]))`,
{ A: 'True', B: 'False', C: 'None', D: '0' }, 'B', 'any() returns True if at least one element is truthy. Since all elements in the list are falsy (0, False, "", None), it returns False.'),

  makeMCQ(3, 10, 'Multiple Inheritance and MRO', 'How can you inspect the Method Resolution Order of a class in Python?',
`class C(A, B): pass`,
{ A: 'C.__order__', B: 'C.mro() or C.__mro__', C: 'C.__hierarchy__', D: 'C.resolution()' }, 'B', 'C.mro() returns the C3 superclass linearization list representing the Method Resolution Order.'),

  makeMCQ(3, 11, 'Set Difference Operator', 'What is {1, 2, 3, 4} - {2, 4, 6}?',
`print({1, 2, 3, 4} - {2, 4, 6})`,
{ A: '{1, 3, 6}', B: '{1, 3}', C: '{6}', D: '{2, 4}' }, 'B', 'The difference operator - returns elements in the first set that are not in the second set: {1, 3}.'),

  makeMCQ(3, 12, 'Modulo of Negative Integer in Python', 'What is -5 % 3 in Python?',
`print(-5 % 3)`,
{ A: '-2', B: '1', C: '2', D: '-1' }, 'B', 'In Python, the modulo operator always shares the sign of the divisor (3 > 0). -5 = (-2 * 3) + 1, so the remainder is 1.'),

  makeMCQ(3, 13, 'Pass Statement Purpose', 'What is the purpose of the pass statement in Python?',
`def stub():
    pass`,
{ A: 'Skips the current loop iteration', B: 'A null statement used as a placeholder where syntactically code is required', C: 'Terminates the function immediately returning None', D: 'Raises an exception' }, 'B', 'pass is a null operation; nothing happens when it executes. It serves as a syntactic placeholder.'),

  makeMCQ(3, 14, 'Dictionary Keys View Dynamic Reflection', 'What happens to a dict_keys view when a new key is added to the dictionary?',
`d = {"a": 1}
keys = d.keys()
d["b"] = 2
print("b" in keys)`,
{ A: 'False', B: 'True', C: 'Raises RuntimeError', D: 'None' }, 'B', 'd.keys() returns a dynamic dictionary view. When the dictionary changes, the view automatically reflects those changes (True).'),

  makeMCQ(3, 15, 'Decorators Wrapping Function', 'What does the @decorator syntax do above a function definition?',
`@my_dec
def hello(): pass`,
{ A: 'Compiles hello in C', B: 'Equivalent to hello = my_dec(hello)', C: 'Runs hello in a background thread', D: 'Declares hello as private' }, 'B', 'The @decorator syntax is syntactic sugar for passing the defined function into the decorator and rebinding the name: hello = my_dec(hello).'),

  makeMCQ(3, 16, 'Chained Comparison Evaluation', 'What does 1 < 2 < 3 == 3 evaluate to in Python?',
`print(1 < 2 < 3 == 3)`,
{ A: 'True', B: 'False', C: 'SyntaxError', D: 'TypeError' }, 'A', 'Python supports chained comparisons: (1 < 2) and (2 < 3) and (3 == 3). All evaluate to True, so result is True.'),

  makeMCQ(3, 17, 'String Isdigit vs Isnumeric', 'What does "²" (superscript 2) return for isdigit() vs isnumeric() in Python 3?',
`s = "²"
print(s.isdigit(), s.isnumeric())`,
{ A: 'False False', B: 'True True', C: 'False True', D: 'True False' }, 'B', 'Unicode superscript digits like "²" are recognized as digits by both isdigit() and isnumeric().'),

  makeMCQ(3, 18, 'Iter Function with Sentinel', 'What does iter(callable, sentinel) do?',
`reader = iter(f.readline, "")`,
{ A: 'Calls callable repeatedly until it returns sentinel', B: 'Raises an error if sentinel is reached', C: 'Appends sentinel to callable', D: 'Filters out sentinel values' }, 'A', 'The two-argument form iter(callable, sentinel) creates an iterator that invokes callable on each next() call until it returns sentinel.'),

  makeMCQ(3, 19, 'F-Strings Formatting Specifier', 'What does f"{123.456:.2f}" output in Python 3.6+?',
`print(f"{123.456:.2f}")`,
{ A: '123.45', B: '123.46', C: '123.5', D: '123.456' }, 'B', 'The .2f format specifier rounds to 2 decimal places with standard half-to-even rounding: 123.46.'),

  makeMCQ(3, 20, 'Recursion Limit Error', 'What exception is raised when Python exceeds its maximum call stack depth?',
`def rec(): rec()
rec()`,
{ A: 'StackOverflowError', B: 'RecursionError', C: 'MemoryError', D: 'RuntimeInterrupt' }, 'B', 'Python raises RecursionError (a subclass of RuntimeError) when the maximum recursion depth (default 1000) is exceeded.'),

  // ==========================================
  // SET 4 (20 questions)
  // ==========================================
  makeMCQ(4, 1, 'Copy vs Deepcopy', 'What does copy.deepcopy() do compared to copy.copy()?',
`import copy
new_obj = copy.deepcopy(old_obj)`,
{ A: 'Only copies the outermost container', B: 'Recursively copies all nested objects, creating completely independent data structures', C: 'Converts all elements to immutable tuples', D: 'Copies objects into shared memory' }, 'B', 'deepcopy recursively copies all compound objects and everything they contain, completely detaching the new object from the original.'),

  makeMCQ(4, 2, 'List Insert at Negative Index', 'What is the output of lst.insert(-1, 99) on [1, 2, 3]?',
`lst = [1, 2, 3]
lst.insert(-1, 99)
print(lst)`,
{ A: '[1, 2, 3, 99]', B: '[1, 2, 99, 3]', C: '[99, 1, 2, 3]', D: 'IndexError' }, 'B', 'insert(i, x) inserts BEFORE the specified index. Index -1 refers to the last element (3), so 99 is inserted before 3: [1, 2, 99, 3].'),

  makeMCQ(4, 3, 'Dict Comprehension Inversion', 'What does {v: k for k, v in {"a": 1, "b": 2}.items()} do?',
`d = {"a": 1, "b": 2}
inv = {v: k for k, v in d.items()}
print(inv)`,
{ A: '{"a": 1, "b": 2}', B: '{1: "a", 2: "b"}', C: '{"b": 1, "a": 2}', D: 'TypeError' }, 'B', 'This dictionary comprehension inverts keys and values, producing {1: "a", 2: "b"}.'),

  makeMCQ(4, 4, 'Staticmethod vs Classmethod Decorators', 'What argument does a @classmethod receive as its first parameter?',
`@classmethod def create(cls): ...`,
{ A: 'The instance object (self)', B: 'The class object itself (cls)', C: 'No arguments', D: 'The module object' }, 'B', 'A method decorated with @classmethod receives the class itself as its first argument (usually named cls), whereas regular methods receive self.'),

  makeMCQ(4, 5, 'String Strip Characters Parameter', 'What does "xyxHello Worldyxx".strip("xy") return?',
`print("xyxHello Worldyxx".strip("xy"))`,
{ A: 'Hello World', B: 'xHello Worldy', C: 'Hello Worldyxx', D: 'xyxHello World' }, 'A', 'strip(chars) strips all characters present in the chars argument from both ends until a non-matching character is met: "Hello World".'),

  makeMCQ(4, 6, 'Zip Longest from itertools', 'What module contains zip_longest for padding exhausted iterables with fillvalue?',
`from ??? import zip_longest`,
{ A: 'collections', B: 'itertools', C: 'functools', D: 'builtins' }, 'B', 'zip_longest is part of the standard itertools module.'),

  makeMCQ(4, 7, 'Identity Comparison of Empty Collections', 'What does [] is [] evaluate to in Python?',
`print([] is [])`,
{ A: 'True', B: 'False', C: 'TypeError', D: 'SyntaxError' }, 'B', 'Each empty list literal creates a brand new list object in heap memory. Because they have different memory addresses, [] is [] is False.'),

  makeMCQ(4, 8, 'Context Manager Dunder Methods', 'Which two special methods must an object implement to be used in a with statement?',
`with MyContext() as ctx: ...`,
{ A: '__open__ and __close__', B: '__enter__ and __exit__', C: '__start__ and __stop__', D: '__init__ and __del__' }, 'B', 'The Python context management protocol requires __enter__(self) and __exit__(self, exc_type, exc_val, exc_tb).'),

  makeMCQ(4, 9, 'Defaultdict from collections', 'What happens when accessing a non-existent key in collections.defaultdict(int)?',
`from collections import defaultdict
d = defaultdict(int)
print(d["hits"])`,
{ A: 'Raises KeyError', B: 'Returns 0 and inserts ("hits", 0) into the dict', C: 'Returns None without inserting', D: 'Throws TypeError' }, 'B', 'defaultdict calls the factory function (int() -> 0), inserts the key with this default value, and returns 0.'),

  makeMCQ(4, 10, 'Truthy Value of Empty Custom Class', 'What does bool(MyObj()) evaluate to if the class implements neither __bool__ nor __len__?',
`class MyObj: pass
print(bool(MyObj()))`,
{ A: 'False', B: 'True', C: 'None', D: 'TypeError' }, 'B', 'By default, instances of user-defined classes are considered truthy unless the class defines __bool__() or __len__() returning False/0.'),

  makeMCQ(4, 11, 'Lambda Closure Binding Late Evaluation', 'What does [f() for f in [lambda: i for i in range(3)]] print?',
`funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])`,
{ A: '[0, 1, 2]', B: '[2, 2, 2]', C: '[0, 0, 0]', D: '[3, 3, 3]' }, 'B', 'Python closures bind by reference (late binding). When the lambdas are called, i has its final loop value 2. To fix this, use default argument: lambda i=i: i.'),

  makeMCQ(4, 12, 'Set Symmetric Difference', 'What operator computes the symmetric difference of two sets (elements in either, but not both)?',
`s1 = {1, 2}; s2 = {2, 3}`,
{ A: 's1 & s2', B: 's1 ^ s2', C: 's1 | s2', D: 's1 - s2' }, 'B', 'The bitwise XOR operator ^ computes the symmetric difference between two sets: {1, 2} ^ {2, 3} = {1, 3}.'),

  makeMCQ(4, 13, 'Round Function Half to Even', 'What does round(2.5) and round(3.5) evaluate to in Python 3?',
`print(round(2.5), round(3.5))`,
{ A: '3 4', B: '2 4', C: '2 3', D: '3 3' }, 'B', 'Python 3 uses banker rounding (round half to even): round(2.5) rounds to nearest even integer 2; round(3.5) rounds to nearest even integer 4.'),

  makeMCQ(4, 14, 'String Join Non-String TypeError', 'What happens when calling "".join([1, 2, 3]) in Python?',
`"".join([1, 2, 3])`,
{ A: 'Returns "123"', B: 'TypeError: sequence item 0: expected str instance, int found', C: 'Returns "[1, 2, 3]"', D: 'Returns ""' }, 'B', 'str.join() requires all elements of the iterable to be strings. Passing integers raises a TypeError.'),

  makeMCQ(4, 15, 'Functools Lru Cache', 'What is the purpose of the @functools.lru_cache decorator?',
`@lru_cache(maxsize=128) def fib(n): ...`,
{ A: 'Compiles the function with Cython', B: 'Memoizes function calls by caching previous return values based on input arguments', C: 'Limits recursive depth to 128', D: 'Runs the function on a GPU' }, 'B', 'lru_cache wraps a function with a memoizing callable that saves up to maxsize recent results, turning exponential recursion into linear time.'),

  makeMCQ(4, 16, 'Tuple Unpacking with Star Target', 'What is the value of rest in a, *rest, b = [1, 2, 3, 4, 5]?',
`a, *rest, b = [1, 2, 3, 4, 5]
print(rest)`,
{ A: '(2, 3, 4)', B: '[2, 3, 4]', C: '[2, 3]', D: 'TypeError' }, 'B', 'Extended iterable unpacking collects intermediate values into a list: a = 1, rest = [2, 3, 4], b = 5.'),

  makeMCQ(4, 17, 'Assert Statement Disabled with Flag', 'What command line flag disables assert statements in Python?',
`python -? script.py`,
{ A: '-d', B: '-O (optimize flag)', C: '-f', D: '--no-assert' }, 'B', 'Running Python with -O or -OO enables basic optimizations and strips all assert statements and __debug__ code.'),

  makeMCQ(4, 18, 'Dunder Eq and Dunder Hash Relationship', 'If a class overrides __eq__, what must also be overridden to use instances as dictionary keys?',
`class Person: def __eq__(self, o): return ...`,
{ A: '__cmp__', B: '__hash__', C: '__str__', D: '__len__' }, 'B', 'If a class overrides __eq__, Python sets its __hash__ to None, making instances unhashable unless __hash__ is explicitly defined.'),

  makeMCQ(4, 19, 'Re Match vs Re Search', 'What is the difference between re.match() and re.search() in the re module?',
`import re`,
{ A: 're.match checks only at the beginning of the string; re.search searches throughout the entire string', B: 're.search checks only at the beginning; re.match searches everywhere', C: 're.match returns a list; re.search returns an iterator', D: 'No difference' }, 'A', 're.match() matches only at the beginning of the string, while re.search() scans the entire string looking for the first location where the pattern matches.'),

  makeMCQ(4, 20, 'Sort List In-Place vs Sorted Builtin', 'What is the return value of lst.sort()?',
`lst = [3, 1, 2]
res = lst.sort()
print(res)`,
{ A: '[1, 2, 3]', B: 'None', C: 'True', D: '3' }, 'B', 'In-place mutating methods in Python (like list.sort() or list.reverse()) return None to emphasize that the list was mutated in-place.'),

  // ==========================================
  // SET 5 (20 questions)
  // ==========================================
  makeMCQ(5, 1, 'Chainmap from Collections', 'What does collections.ChainMap do?',
`from collections import ChainMap
cm = ChainMap(d1, d2)`,
{ A: 'Merges two dictionaries permanently', B: 'Groups multiple dictionaries together into a single updateable view with precedence given to the first map', C: 'Creates a bidirectional hash map', D: 'Locks dictionaries from writes' }, 'B', 'ChainMap groups multiple dicts into a single view without copying data. Lookups search through each mapping in sequence.'),

  makeMCQ(5, 2, 'Counter Most Common', 'What does Counter("abracadabra").most_common(2) return?',
`from collections import Counter
print(Counter("abracadabra").most_common(2))`,
{ A: '[("a", 5), ("b", 2)]', B: '[("a", 5), ("r", 2)]', C: '["a", "b"]', D: '{"a": 5, "b": 2}' }, 'A', '\'a\' appears 5 times, \'b\' appears 2 times, \'r\' appears 2 times. most_common(2) returns a list of the 2 highest frequency tuples: [(\'a\', 5), (\'b\', 2)].'),

  makeMCQ(5, 3, 'String Formatted Raw String', 'What does r"C:\\new\\test" do?',
`path = r"C:\\new\\test"
print(path)`,
{ A: 'Interprets \\n as a newline character', B: 'Treats backslashes as literal characters without escape interpretation', C: 'Reverses the string', D: 'Raises SyntaxError' }, 'B', 'Prefixing a string literal with r marks it as a raw string where backslashes are treated as literal characters and not escape sequences.'),

  makeMCQ(5, 4, 'Bitwise NOT of Integer', 'What is the value of ~5 in Python?',
`print(~5)`,
{ A: '-5', B: '-6', C: '6', D: '-4' }, 'B', 'In Python, bitwise NOT of x is defined as -(x + 1). So ~5 = -(5 + 1) = -6.'),

  makeMCQ(5, 5, 'List Clear vs New List Assignment', 'What is the difference between lst.clear() and lst = [] when other variables reference lst?',
`a = [1, 2]; b = a`,
{ A: 'Both modify b', B: 'lst.clear() empties the list in-place affecting b; lst = [] rebinds lst, leaving b unchanged', C: 'lst.clear() causes MemoryError', D: 'No difference' }, 'B', 'lst.clear() mutates the underlying list object in-place so all references see an empty list. lst = [] simply reassigns the local variable name to a new empty list.'),

  makeMCQ(5, 6, 'Type of Type in Python', 'What does type(type) return in Python?',
`print(type(type))`,
{ A: '<class "object">', B: '<class "type">', C: '<class "class">', D: '<class "meta">' }, 'B', 'type is the metaclass for classes in Python, and type is an instance of itself: type(type) is <class \'type\'>.'),

  makeMCQ(5, 7, 'Slots Optimization Benefit', 'What is the primary benefit of declaring __slots__ in a Python class?',
`class Point: __slots__ = ("x", "y")`,
{ A: 'Restricts instance attributes, eliminating per-instance __dict__ and drastically reducing memory usage', B: 'Makes attributes immutable like a tuple', C: 'Enables multithreading', D: 'Automatically implements getters and setters' }, 'A', '__slots__ prevents the automatic creation of an internal __dict__ for each instance, saving significant memory when creating millions of objects.'),

  makeMCQ(5, 8, 'Yield From Syntax (Python 3.3+)', 'What does yield from sub_generator() do?',
`def gen(): yield from [1, 2, 3]`,
{ A: 'Creates a sub-thread', B: 'Delegates yielding elements and two-way communication directly to the sub-generator/iterable', C: 'Caches results in memory', D: 'Terminates the generator' }, 'B', 'yield from transparently delegates generator operations and yields every item from an iterable or sub-generator.'),

  makeMCQ(5, 9, 'Frozenset Immutability', 'Can a frozenset be added to another set in Python?',
`s = set()
fs = frozenset([1, 2])
s.add(fs)`,
{ A: 'No, TypeError: unhashable type', B: 'Yes, because frozenset is immutable and hashable', C: 'Only if empty', D: 'Raises ValueError' }, 'B', 'frozenset is an immutable, hashable variant of set, allowing it to be used as a set element or dictionary key.'),

  makeMCQ(5, 10, 'Operator Itemgetter Performance', 'What does operator.itemgetter(1) do?',
`from operator import itemgetter
f = itemgetter(1)
print(f([10, 20, 30]))`,
{ A: '10', B: '20', C: '30', D: '[10, 20]' }, 'B', 'operator.itemgetter(1) constructs a fast C-level callable that fetches item index 1 from its operand: 20.'),

  makeMCQ(5, 11, 'Property Decorator Getter and Setter', 'What does the @property decorator create on a class method?',
`class Circle:
    @property
    def radius(self): return self._r`,
{ A: 'A static class attribute', B: 'A managed attribute that can be read with dot notation without parentheses circle.radius', C: 'A private variable', D: 'A classmethod' }, 'B', '@property allows a method to be accessed as if it were a simple attribute (e.g. c.radius instead of c.radius()).'),

  makeMCQ(5, 12, 'Keyword-Only Arguments Syntax', 'How are keyword-only arguments defined in a Python function header?',
`def process(data, *, timeout=10): ...`,
{ A: 'By prefixing arguments with **', B: 'By placing them after a bare asterisk * in the parameter list', C: 'By naming them with uppercase letters', D: 'By using the @keyword decorator' }, 'B', 'Parameters placed after a bare * can only be passed as keyword arguments (e.g., process(data, timeout=5)), never positionally.'),

  makeMCQ(5, 13, 'Itertools Combinations vs Permutations', 'What is the length of list(itertools.combinations([1, 2, 3], 2)) vs permutations([1, 2, 3], 2)?',
`import itertools`,
{ A: '3 and 6', B: '6 and 3', C: '3 and 3', D: '6 and 6' }, 'A', 'combinations has 3 pairs (order does not matter: 3C2 = 3). permutations has 6 pairs (order matters: 3P2 = 6).'),

  makeMCQ(5, 14, 'Dunder Call Callable Instances', 'What allows an instance of a Python class to be called like a function obj()?',
`class Adder:
    def __call__(self, x): return x + 10`,
{ A: 'Defining __init__', B: 'Defining the __call__ special method', C: 'Inheriting from FunctionType', D: 'Using the @callable decorator' }, 'B', 'Implementing __call__(self, *args, **kwargs) allows class instances to behave like functions when invoked with ().'),

  makeMCQ(5, 15, 'Zip Strict Parameter (Python 3.10+)', 'What happens if zip(a, b, strict=True) receives iterables of different lengths in Python 3.10+?',
`zip([1, 2], [1, 2, 3], strict=True)`,
{ A: 'Truncates silently', B: 'Raises ValueError: zip() argument 2 is longer than argument 1', C: 'Pads with None', D: 'Warning only' }, 'B', 'Python 3.10 added strict=True to zip(), raising a ValueError if the iterables are not of equal length.'),

  makeMCQ(5, 16, 'Math Isclose Floating Tolerance', 'Why is math.isclose(a, b) preferred over a == b for floats in Python?',
`import math
print(math.isclose(0.1 + 0.2, 0.3))`,
{ A: 'It runs faster', B: 'It compares equality within a small relative/absolute numerical tolerance (epsilon) avoiding IEEE 754 precision issues', C: 'It converts floats to strings', D: 'It returns an integer' }, 'B', 'Floating point arithmetic incurs rounding errors; math.isclose() tests whether values are close within a defined tolerance.'),

  makeMCQ(5, 17, 'String Translation Table', 'What pair of functions in the str class creates and applies character mappings?',
`trans = str.maketrans("aeiou", "12345")
print("apple".translate(trans))`,
{ A: 'str.map and str.apply', B: 'str.maketrans and str.translate', C: 'str.replace_all', D: 'str.sub' }, 'B', 'str.maketrans() creates a 1-to-1 character translation dictionary, which is consumed by str.translate().'),

  makeMCQ(5, 18, 'Collections Deque O(1) Appends', 'Why is collections.deque preferred over list for FIFO queues?',
`from collections import deque
q = deque()`,
{ A: 'deque uses less memory', B: 'deque provides O(1) time complexity for appends and pops from both ends, whereas list.pop(0) is O(N)', C: 'deque elements are automatically sorted', D: 'deque allows duplicate keys' }, 'B', 'list.pop(0) requires shifting all N elements in memory (O(N)), whereas deque is a doubly-linked list/block buffer with O(1) popleft().'),

  makeMCQ(5, 19, 'Weakref Non-Owning References', 'What is the purpose of the weakref module in Python?',
`import weakref`,
{ A: 'Creates variables that are automatically encrypted', B: 'Creates references to objects without increasing their reference count, avoiding circular reference leaks', C: 'Makes garbage collection slower', D: 'Forces immediate object deletion' }, 'B', 'weakref creates non-owning references that allow objects to be garbage collected when only weak references remain.'),

  makeMCQ(5, 20, 'Hash Invariance Requirement', 'What is the fundamental rule regarding __hash__ and __eq__ in Python?',
`a == b implies hash(a) == hash(b)`,
{ A: 'If two objects are equal (a == b), their hash values MUST be equal', B: 'If two objects have equal hashes, they must be equal', C: 'Hash must return a negative number', D: 'Hash can change at any time' }, 'A', 'The hash contract requires that if a == b is True, hash(a) MUST equal hash(b); otherwise, hash table lookups in dict and set break.')
];

module.exports = pythonQuestions;
