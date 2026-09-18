import { PrismaClient, Language } from '@prisma/client';

const prisma = new PrismaClient();

interface McqDef {
  number: number;
  title: string;
  code: string;
  prompt: string;
  options: { A: string; B: string; C: string; D: string };
  answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

const cppQuestions: McqDef[] = [
  {
    number: 1,
    title: 'Integer Division in C++',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 7, b = 2;
    cout << a / b << endl;
    return 0;
}`,
    options: { A: '3.5', B: '3', C: '4', D: '3.0' },
    answer: 'B',
    explanation: 'In C++, dividing two integers truncates the decimal part towards zero: 7 / 2 = 3.',
  },
  {
    number: 2,
    title: 'Post-Increment Operator',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int y = x++;
    cout << x << " " << y << endl;
    return 0;
}`,
    options: { A: '5 5', B: '6 6', C: '6 5', D: '5 6' },
    answer: 'C',
    explanation: 'Post-increment assigns the current value of x (5) to y, then increments x to 6.',
  },
  {
    number: 3,
    title: 'Pass-by-Value in C++',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

void addTen(int x) {
    x += 10;
}

int main() {
    int num = 20;
    addTen(num);
    cout << num << endl;
    return 0;
}`,
    options: { A: '30', B: '20', C: '10', D: 'Compilation error' },
    answer: 'B',
    explanation: 'x is passed by value, so modifying x inside addTen does not affect num in main.',
  },
  {
    number: 4,
    title: 'Array Indexing in C++',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    cout << arr[3] << endl;
    return 0;
}`,
    options: { A: '30', B: '40', C: '50', D: '20' },
    answer: 'B',
    explanation: 'Arrays are 0-indexed: arr[0]=10, arr[1]=20, arr[2]=30, arr[3]=40.',
  },
  {
    number: 5,
    title: 'String Length and Character Access',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    cout << s.length() << " " << s[1] << endl;
    return 0;
}`,
    options: { A: '5 e', B: '5 H', C: '4 e', D: '5 l' },
    answer: 'A',
    explanation: '"Hello" has length 5 and s[1] is the character at index 1: \'e\'.',
  },
  {
    number: 6,
    title: 'Modulo Operator',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 14, b = 4;
    cout << a % b << endl;
    return 0;
}`,
    options: { A: '3', B: '2', C: '0', D: '3.5' },
    answer: 'B',
    explanation: '14 % 4 computes the remainder of 14 divided by 4, which is 2.',
  },
  {
    number: 7,
    title: 'For Loop Accumulator',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += i;
    }
    cout << sum << endl;
    return 0;
}`,
    options: { A: '10', B: '15', C: '5', D: '0' },
    answer: 'A',
    explanation: 'The loop adds 0 + 1 + 2 + 3 + 4 = 10.',
  },
  {
    number: 8,
    title: 'Ternary Conditional Operator',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int result = (x > 15) ? 100 : 200;
    cout << result << endl;
    return 0;
}`,
    options: { A: '100', B: '200', C: '0', D: '15' },
    answer: 'B',
    explanation: '10 > 15 is false, so the ternary expression selects the second value: 200.',
  },
  {
    number: 9,
    title: 'Boolean Logic Operators',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 5, b = -2;
    cout << (a > 0 && b > 0) << " " << (a > 0 || b > 0) << endl;
    return 0;
}`,
    options: { A: '1 1', B: '0 1', C: '1 0', D: '0 0' },
    answer: 'B',
    explanation: '(5 > 0 && -2 > 0) is false (0). (5 > 0 || -2 > 0) is true (1).',
  },
  {
    number: 10,
    title: 'Vector push_back and size',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    v.push_back(100);
    v.push_back(200);
    cout << v.size() << " " << v[0] << endl;
    return 0;
}`,
    options: { A: '2 100', B: '2 200', C: '1 100', D: '0 100' },
    answer: 'A',
    explanation: 'push_back inserts 2 elements, so size is 2. v[0] is the first element, 100.',
  },
  {
    number: 11,
    title: 'Reference Variables',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int &ref = x;
    ref = 25;
    cout << x << " " << ref << endl;
    return 0;
}`,
    options: { A: '10 25', B: '25 25', C: '10 10', D: 'Compilation error' },
    answer: 'B',
    explanation: 'ref is an alias for x. Mutating ref directly alters x to 25.',
  },
  {
    number: 12,
    title: 'Nested Ternary Operator',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 5;
    cout << (a > 3 ? (a < 10 ? 1 : 2) : 3) << endl;
    return 0;
}`,
    options: { A: '1', B: '2', C: '3', D: '0' },
    answer: 'A',
    explanation: 'a > 3 (5 > 3) is true, and a < 10 (5 < 10) is true, resulting in 1.',
  },
  {
    number: 13,
    title: 'Switch Statement Fall-Through',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
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
}`,
    options: { A: 'Two', B: 'Two Three', C: 'Two Three Default', D: 'One Two Three' },
    answer: 'B',
    explanation: 'Without a break after case 2, execution falls through to case 3: "Two Three ".',
  },
  {
    number: 14,
    title: 'Pointer Dereferencing',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 42;
    int *ptr = &a;
    *ptr = *ptr + 8;
    cout << a << endl;
    return 0;
}`,
    options: { A: '42', B: '50', C: 'Garbage value', D: 'Memory address' },
    answer: 'B',
    explanation: '*ptr dereferences ptr to access variable a. 42 + 8 = 50.',
  },
  {
    number: 15,
    title: 'Static Local Variable',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
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
}`,
    options: { A: '1 1 1', B: '1 2 3', C: '0 1 2', D: 'Compilation error' },
    answer: 'B',
    explanation: 'A static local variable persists across function calls, incrementing 1, 2, 3.',
  },
  {
    number: 16,
    title: 'Short-Circuit Logical AND',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 0, y = 5;
    if (x != 0 && ++y > 5) {
        cout << "Inside ";
    }
    cout << y << endl;
    return 0;
}`,
    options: { A: 'Inside 6', B: '5', C: '6', D: 'Inside 5' },
    answer: 'B',
    explanation: 'Because x != 0 is false, && short-circuits. ++y is never evaluated and y remains 5.',
  },
  {
    number: 17,
    title: 'Vector push_back and pop_back',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20};
    v.push_back(30);
    v.pop_back();
    cout << v.size() << " " << v.back() << endl;
    return 0;
}`,
    options: { A: '2 20', B: '3 30', C: '2 30', D: '3 20' },
    answer: 'A',
    explanation: 'push_back(30) adds 30, and pop_back() removes it. Size is 2, and v.back() is 20.',
  },
  {
    number: 18,
    title: 'Array Size using sizeof',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {4, 8, 12, 16, 20, 24};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << n << endl;
    return 0;
}`,
    options: { A: '24', B: '6', C: '4', D: 'Compilation error' },
    answer: 'B',
    explanation: 'sizeof(arr) is 24 bytes and sizeof(arr[0]) is 4 bytes. 24 / 4 = 6 elements.',
  },
  {
    number: 19,
    title: 'Do-While Loop Execution Guarantee',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    do {
        x += 5;
    } while (x < 10);
    cout << x << endl;
    return 0;
}`,
    options: { A: '10', B: '15', C: '20', D: 'Infinite loop' },
    answer: 'B',
    explanation: 'A do-while loop executes at least once. x becomes 15, then 15 < 10 is false, terminating.',
  },
  {
    number: 20,
    title: 'String Search with string::find',
    prompt: 'What is the output of the following C++ code?',
    code: `#include <iostream>
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
}`,
    options: { A: 'Found at 3', B: 'Found at 4', C: 'Not found', D: 'Found at 2' },
    answer: 'A',
    explanation: '"competitor" contains "pet" starting at 0-based index 3.',
  },
];

const javaQuestions: McqDef[] = [
  {
    number: 1,
    title: 'String Concatenation Precedence',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Sum: " + 10 + 20);
    }
}`,
    options: { A: 'Sum: 30', B: 'Sum: 1020', C: 'Sum: 10 20', D: 'Compilation error' },
    answer: 'B',
    explanation: 'Left-to-right evaluation converts 10 to a string ("Sum: 10"), then concatenates 20 ("Sum: 1020").',
  },
  {
    number: 2,
    title: 'String equals() vs == Operator',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = new String("hello");
        System.out.println(s1.equals(s2) + " " + (s1 == s2));
    }
}`,
    options: { A: 'true true', B: 'false false', C: 'true false', D: 'false true' },
    answer: 'C',
    explanation: '.equals() compares content (true); == compares object references in memory (false).',
  },
  {
    number: 3,
    title: 'Array length Property',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        System.out.println(nums.length);
    }
}`,
    options: { A: '4', B: '5', C: 'Compilation error', D: '6' },
    answer: 'B',
    explanation: 'In Java, an array length is accessed via the .length field, returning 5.',
  },
  {
    number: 4,
    title: 'Pass-by-Value with Primitive Arguments',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    static void modify(int a) {
        a = 100;
    }

    public static void main(String[] args) {
        int x = 25;
        modify(x);
        System.out.println(x);
    }
}`,
    options: { A: '100', B: '25', C: '0', D: 'Compilation error' },
    answer: 'B',
    explanation: 'Java primitives are passed by value; changing parameter a has no effect on x.',
  },
  {
    number: 5,
    title: 'While Loop Counter',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        int count = 1;
        while (count < 4) {
            count++;
        }
        System.out.println(count);
    }
}`,
    options: { A: '3', B: '4', C: '5', D: '1' },
    answer: 'B',
    explanation: 'count increments 1 -> 2 -> 3 -> 4. When count reaches 4, 4 < 4 is false and loop stops.',
  },
  {
    number: 6,
    title: 'Integer Division Truncation',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        int result = 15 / 4;
        System.out.println(result);
    }
}`,
    options: { A: '3.75', B: '3', C: '4', D: '3.0' },
    answer: 'B',
    explanation: 'Dividing two integers in Java truncates towards zero, producing 3.',
  },
  {
    number: 7,
    title: 'String Immutability',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        String s = "Hello";
        s.concat(" World");
        System.out.println(s);
    }
}`,
    options: { A: 'Hello World', B: 'Hello', C: 'World', D: 'Compilation error' },
    answer: 'B',
    explanation: 'Strings are immutable in Java. s.concat() returns a new string without reassigning s.',
  },
  {
    number: 8,
    title: 'Loop Break Statement',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                System.out.println(i);
                break;
            }
        }
    }
}`,
    options: { A: '1', B: '3', C: '5', D: '1 2 3' },
    answer: 'B',
    explanation: 'When i reaches 3, it prints 3 and breaks out of the loop immediately.',
  },
  {
    number: 9,
    title: 'Math.max() Method',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        int a = 25, b = 40;
        System.out.println(Math.max(a, b));
    }
}`,
    options: { A: '25', B: '40', C: '65', D: '15' },
    answer: 'B',
    explanation: 'Math.max(25, 40) returns the greater value, 40.',
  },
  {
    number: 10,
    title: 'Default Boolean Field Value',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    static boolean flag;

    public static void main(String[] args) {
        System.out.println(flag);
    }
}`,
    options: { A: 'true', B: 'false', C: 'null', D: '0' },
    answer: 'B',
    explanation: 'The default initial value of uninitialized boolean class fields in Java is false.',
  },
  {
    number: 11,
    title: 'Unary Operators Precedence',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(++x + x++);
    }
}`,
    options: { A: '11', B: '12', C: '13', D: '10' },
    answer: 'B',
    explanation: '++x pre-increments to 6. x++ uses 6 and then increments to 7. 6 + 6 = 12.',
  },
  {
    number: 12,
    title: 'Substring Indexing',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        String str = "Debugging";
        System.out.println(str.substring(3, 7));
    }
}`,
    options: { A: 'bugg', B: 'uggi', C: 'buggi', D: 'eggi' },
    answer: 'B',
    explanation: 'substring(3, 7) takes indices 3, 4, 5, 6, which are \'u\', \'g\', \'g\', \'i\'.',
  },
  {
    number: 13,
    title: 'Boolean Assignment in Conditionals',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        boolean flag = true;
        if (flag = false) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }
    }
}`,
    options: { A: 'Yes', B: 'No', C: 'Compilation error', D: 'Runtime error' },
    answer: 'B',
    explanation: 'The assignment flag = false sets flag to false and evaluates to false, executing the else block.',
  },
  {
    number: 14,
    title: 'String charAt and Length',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        String s = "Algorithm";
        System.out.println(s.charAt(0) + "" + s.charAt(s.length() - 1));
    }
}`,
    options: { A: 'Am', B: 'Ah', C: 'Algorithm', D: 'Compilation error' },
    answer: 'A',
    explanation: 's.charAt(0) is \'A\' and s.charAt(8) is \'m\', concatenating to "Am".',
  },
  {
    number: 15,
    title: 'Enhanced For Loop Accumulator',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {2, 4, 6};
        int total = 0;
        for (int n : arr) {
            total += n;
        }
        System.out.println(total);
    }
}`,
    options: { A: '12', B: '6', C: '0', D: 'Compilation error' },
    answer: 'A',
    explanation: 'The for-each loop adds all elements: 2 + 4 + 6 = 12.',
  },
  {
    number: 16,
    title: 'Math.max and Math.min Nesting',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        int a = 15, b = 25, c = 10;
        int result = Math.max(a, Math.min(b, c));
        System.out.println(result);
    }
}`,
    options: { A: '25', B: '15', C: '10', D: '20' },
    answer: 'B',
    explanation: 'Math.min(25, 10) gives 10. Math.max(15, 10) returns 15.',
  },
  {
    number: 17,
    title: 'ArrayList Remove by Index',
    prompt: 'What is the output of the following Java program?',
    code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);
        list.remove(1);
        System.out.println(list);
    }
}`,
    options: { A: '[20, 30]', B: '[10, 30]', C: '[10, 20]', D: '[10]' },
    answer: 'B',
    explanation: 'list.remove(1) removes the item at index 1 (20), leaving [10, 30].',
  },
  {
    number: 18,
    title: 'Ternary Operator Evaluation',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        int a = 10, b = 20;
        int max = (a > b) ? a : b;
        System.out.println(max * 2);
    }
}`,
    options: { A: '20', B: '40', C: '10', D: '30' },
    answer: 'B',
    explanation: '10 > 20 is false, so max is 20. 20 * 2 = 40.',
  },
  {
    number: 19,
    title: 'StringBuilder Append & Length',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("code");
        sb.append("123");
        System.out.println(sb.length() + " " + sb.charAt(0));
    }
}`,
    options: { A: '7 c', B: '4 c', C: '7 1', D: '6 c' },
    answer: 'A',
    explanation: '"code" + "123" has length 7, and the character at index 0 is \'c\'.',
  },
  {
    number: 20,
    title: 'Static Initialization Block',
    prompt: 'What is the output of the following Java program?',
    code: `public class Main {
    static int x = 10;
    static {
        x += 5;
    }
    public static void main(String[] args) {
        System.out.println(x);
    }
}`,
    options: { A: '10', B: '15', C: '5', D: 'Compilation error' },
    answer: 'B',
    explanation: 'The static block executes when the class loads, modifying x from 10 to 15 before main runs.',
  },
];

const pythonQuestions: McqDef[] = [
  {
    number: 1,
    title: 'Integer Floor Division vs Float Division',
    prompt: 'What is the output of the following Python code?',
    code: `print(9 // 2, 9 / 2)`,
    options: { A: '4 4.5', B: '4.5 4', C: '4 4', D: '4.5 4.5' },
    answer: 'A',
    explanation: '// performs integer floor division (4), while / returns float division (4.5).',
  },
  {
    number: 2,
    title: 'String Multiplication Operator',
    prompt: 'What is the output of the following Python code?',
    code: `text = "Go!"
print(text * 3)`,
    options: { A: 'Go! Go! Go!', B: 'Go!3', C: 'Go!Go!Go!', D: 'Error' },
    answer: 'C',
    explanation: 'Multiplying a string by an integer repeats it without extra spaces: "Go!Go!Go!".',
  },
  {
    number: 3,
    title: 'List Slicing Indices',
    prompt: 'What is the output of the following Python code?',
    code: `nums = [10, 20, 30, 40]
print(nums[1:3])`,
    options: { A: '[10, 20]', B: '[20, 30]', C: '[20, 30, 40]', D: '[10, 20, 30]' },
    answer: 'B',
    explanation: 'nums[1:3] starts at index 1 and stops before index 3, returning [20, 30].',
  },
  {
    number: 4,
    title: 'Negative Indexing in Lists',
    prompt: 'What is the output of the following Python code?',
    code: `fruits = ["apple", "banana", "cherry"]
print(fruits[-1])`,
    options: { A: 'apple', B: 'banana', C: 'cherry', D: 'IndexError' },
    answer: 'C',
    explanation: 'Negative index -1 retrieves the last element: "cherry".',
  },
  {
    number: 5,
    title: 'Dictionary get() Default Value',
    prompt: 'What is the output of the following Python code?',
    code: `scores = {"Alice": 90, "Bob": 85}
print(scores.get("Charlie", 0))`,
    options: { A: 'None', B: '0', C: 'KeyError', D: '85' },
    answer: 'B',
    explanation: 'dict.get(key, default) returns default 0 when key "Charlie" is not found.',
  },
  {
    number: 6,
    title: 'List Length with len()',
    prompt: 'What is the output of the following Python code?',
    code: `items = [1, 2, 3, 4, 5]
print(len(items))`,
    options: { A: '4', B: '5', C: '6', D: '0' },
    answer: 'B',
    explanation: 'len() returns the count of items in the list, which is 5.',
  },
  {
    number: 7,
    title: 'String lower() Method',
    prompt: 'What is the output of the following Python code?',
    code: `msg = "HELLO"
print(msg.lower())`,
    options: { A: 'hello', B: 'HELLO', C: 'Hello', D: 'Error' },
    answer: 'A',
    explanation: 'str.lower() converts all uppercase characters to lowercase: "hello".',
  },
  {
    number: 8,
    title: 'List append() Modification',
    prompt: 'What is the output of the following Python code?',
    code: `nums = [1, 2, 3]
nums.append(4)
print(nums)`,
    options: { A: '[4, 1, 2, 3]', B: '[1, 2, 3, 4]', C: '[1, 2, 3]', D: 'None' },
    answer: 'B',
    explanation: 'append(4) adds 4 to the end of the list in-place: [1, 2, 3, 4].',
  },
  {
    number: 9,
    title: 'Range Function Sequence',
    prompt: 'What is the output of the following Python code?',
    code: `print(list(range(1, 5)))`,
    options: { A: '[1, 2, 3, 4, 5]', B: '[1, 2, 3, 4]', C: '[0, 1, 2, 3, 4]', D: '[1, 5]' },
    answer: 'B',
    explanation: 'range(1, 5) generates values starting from 1 up to 4: [1, 2, 3, 4].',
  },
  {
    number: 10,
    title: 'Tuple Packing and Unpacking',
    prompt: 'What is the output of the following Python code?',
    code: `x = 10
y = 20
x, y = y, x
print(x, y)`,
    options: { A: '10 20', B: '20 10', C: '20 20', D: '10 10' },
    answer: 'B',
    explanation: 'Tuple unpacking swaps values simultaneously: x = 20 and y = 10.',
  },
  {
    number: 11,
    title: 'List Slicing Range',
    prompt: 'What is the output of the following Python code?',
    code: `nums = [1, 2, 3, 4, 5]
print(nums[1:4])`,
    options: { A: '[1, 2, 3]', B: '[2, 3, 4]', C: '[2, 3, 4, 5]', D: '[1, 2, 3, 4]' },
    answer: 'B',
    explanation: 'nums[1:4] extracts indices 1, 2, 3: [2, 3, 4].',
  },
  {
    number: 12,
    title: 'Default Function Parameters',
    prompt: 'What is the output of the following Python code?',
    code: `def greet(name, msg="Hello"):
    return f"{msg}, {name}!"

print(greet("Bob"))`,
    options: { A: 'Hello, Bob!', B: 'Bob, Hello!', C: 'Error', D: 'None' },
    answer: 'A',
    explanation: 'Since msg is not provided, the default parameter "Hello" is used: "Hello, Bob!".',
  },
  {
    number: 13,
    title: 'List Reference Assignment',
    prompt: 'What is the output of the following Python code?',
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(len(x))`,
    options: { A: '3', B: '4', C: '1', D: 'AttributeError' },
    answer: 'B',
    explanation: 'y refers to the same object as x. Appending to y modifies x: len(x) is 4.',
  },
  {
    number: 14,
    title: 'List Comprehension with Filter',
    prompt: 'What is the output of the following Python code?',
    code: `vals = [x * 2 for x in range(4) if x % 2 == 0]
print(vals)`,
    options: { A: '[0, 4]', B: '[0, 2, 4]', C: '[0, 4, 8]', D: '[2, 4]' },
    answer: 'A',
    explanation: 'range(4) has even numbers 0 and 2. Multiplying by 2 yields [0, 4].',
  },
  {
    number: 15,
    title: 'List Comprehension with Strings',
    prompt: 'What is the output of the following Python code?',
    code: `words = ["cat", "elephant", "dog"]
short = [w.upper() for w in words if len(w) <= 3]
print(short)`,
    options: { A: "['CAT', 'ELEPHANT', 'DOG']", B: "['CAT', 'DOG']", C: "['cat', 'dog']", D: "['ELEPHANT']" },
    answer: 'B',
    explanation: 'Filters words with length <= 3 ("cat", "dog") and converts to uppercase: [\'CAT\', \'DOG\'].',
  },
  {
    number: 16,
    title: 'Dictionary Key Membership',
    prompt: 'What is the output of the following Python code?',
    code: `data = {"a": 1, "b": 2}
print("a" in data, 1 in data)`,
    options: { A: 'True True', B: 'True False', C: 'False True', D: 'False False' },
    answer: 'B',
    explanation: '"in" on dict checks keys: "a" is a key (True), but 1 is a value, not a key (False).',
  },
  {
    number: 17,
    title: 'String Split and Join',
    prompt: 'What is the output of the following Python code?',
    code: `text = "apple-banana-orange"
parts = text.split("-")
print("/".join(parts[:2]))`,
    options: { A: 'apple/banana/orange', B: 'apple/banana', C: 'apple-banana', D: 'banana/orange' },
    answer: 'B',
    explanation: 'parts[:2] is [\'apple\', \'banana\'], which joined by "/" produces "apple/banana".',
  },
  {
    number: 18,
    title: 'List pop() Return Value',
    prompt: 'What is the output of the following Python code?',
    code: `nums = [10, 20, 30]
val = nums.pop()
print(val, nums)`,
    options: { A: '10 [20, 30]', B: '30 [10, 20]', C: '30 [10, 20, 30]', D: '20 [10, 30]' },
    answer: 'B',
    explanation: 'pop() removes and returns the last element (30), leaving [10, 20].',
  },
  {
    number: 19,
    title: 'Float Truncation with int()',
    prompt: 'What is the output of the following Python code?',
    code: `val = int(8.75)
print(val)`,
    options: { A: '8', B: '9', C: '8.0', D: 'ValueError' },
    answer: 'A',
    explanation: 'int() truncates the fractional part towards zero, returning integer 8.',
  },
  {
    number: 20,
    title: 'Truthiness of Empty List vs List with Zero',
    prompt: 'What is the output of the following Python code?',
    code: `print(bool([]), bool([0]))`,
    options: { A: 'False False', B: 'False True', C: 'True False', D: 'True True' },
    answer: 'B',
    explanation: 'An empty list [] evaluates to False; a non-empty list [0] evaluates to True.',
  },
];

async function seedRound1Questions() {
  console.log('🚀 Seeding exactly 20 MCQs for Round 1 per language (60 MCQs total)...');

  const round1 = await prisma.round.findUnique({ where: { number: 1 } });
  if (!round1) {
    throw new Error('Round 1 not found');
  }

  // Remove existing Round 1 questions
  const existingR1Qs = await prisma.question.findMany({
    where: { roundId: round1.id },
    select: { id: true },
  });
  const existingIds = existingR1Qs.map((q) => q.id);

  if (existingIds.length > 0) {
    await prisma.testCase.deleteMany({ where: { questionId: { in: existingIds } } });
    await prisma.draft.deleteMany({ where: { questionId: { in: existingIds } } });
    await prisma.submission.deleteMany({ where: { questionId: { in: existingIds } } });
    await prisma.assignment.deleteMany({ where: { questionId: { in: existingIds } } });
    await prisma.question.deleteMany({ where: { id: { in: existingIds } } });
    console.log(`Cleaned up ${existingIds.length} existing Round 1 questions.`);
  }

  const dataset = [
    { lang: Language.CPP, questions: cppQuestions },
    { lang: Language.JAVA, questions: javaQuestions },
    { lang: Language.PYTHON, questions: pythonQuestions },
  ];

  for (const group of dataset) {
    console.log(`Inserting 20 questions for ${group.lang}...`);
    for (const q of group.questions) {
      const statementJson = JSON.stringify({
        type: 'MCQ',
        prompt: q.prompt,
        options: q.options,
        explanation: q.explanation,
      });

      const created = await prisma.question.create({
        data: {
          roundId: round1.id,
          language: group.lang,
          title: `Q${q.number}. ${q.title}`,
          statement: statementJson,
          buggyCode: q.code,
          referenceSolution: q.answer,
          points: 10,
          timeLimitMs: 1000,
          memoryLimitMb: 128,
          isTiebreaker: false,
        },
      });

      await prisma.testCase.create({
        data: {
          questionId: created.id,
          stdin: q.answer,
          expectedStdout: q.answer,
          isHidden: false,
          weight: 1.0,
        },
      });
    }
  }

  console.log('✅ Round 1 successfully seeded with 20 questions for C++, 20 for Java, and 20 for Python!');
}

seedRound1Questions()
  .catch((e) => {
    console.error('Failed seeding Round 1:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
