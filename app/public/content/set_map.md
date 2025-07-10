
# Basic Data Structures (Set, Map, Queue, Stack, Priority Queue)

## Resources

- [USACO Guide: Introduction to Sets & Maps](https://usaco.guide/bronze/intro-sets)

---

## Sets in C++

### Sorted Sets

Sorted sets store elements in sorted order. All primary operations (adding, removing, and checking for existence) run in $\mathcal{O}(\log N)$ worst-case time, where $N$ is the number of elements in the set. In C++, sorted sets are implemented using `std::set` from the `<set>` header. The underlying data structure is typically a red-black tree.

Some basic operations on an `std::set<int> s`:
- `s.insert(x)`: Adds `x` to the set if not already present.
- `s.erase(x)`: Removes `x` from the set if present.
- `s.count(x)`: Returns 1 if `x` is in the set, 0 otherwise.

You can also iterate through a set in sorted order using a for-each loop.

```cpp
#include <iostream>
#include <set>
using namespace std;

void demo() {
    set<int> s;
    s.insert(1);                 // [1]
    s.insert(4);                 // [1, 4]
    s.insert(2);                 // [1, 2, 4]
    s.insert(1);                 // does nothing (1 already present)
    cout << s.count(1) << endl;  // 1
    s.erase(1);                  // [2, 4]
    cout << s.count(5) << endl;  // 0
    s.erase(0);                  // does nothing (0 not present)
    s.insert(6);                 // [2, 4, 6]

    // Outputs 2, 4, 6 in sorted order
    for (int element : s) cout << element << " ";

    // Iterating over all elements in a set
    for (int x : s) cout << x << " ";
    // or using an iterator:
    for (auto it = s.begin(); it != s.end(); ++it) cout << *it << " ";
}
```

### Hashsets

Hashsets store elements using hashing. Roughly, a hashset consists of some number of buckets $B$, and each element is mapped to a bucket via a hash function. If $B \approx N$ and the hash function distributes elements well, all primary operations run in $\mathcal{O}(1)$ expected time.

In C++, hashsets are implemented using `std::unordered_set` from the `<unordered_set>` header.

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

void demo() {
    unordered_set<int> s;
    s.insert(1);                 // {1}
    s.insert(4);                 // {1, 4}
    s.insert(2);                 // {1, 2, 4}
    s.insert(1);                 // does nothing (1 already present)
    cout << s.count(1) << endl;  // 1
    s.erase(1);                  // {2, 4}
    cout << s.count(5) << endl;  // 0
    s.erase(0);                  // does nothing (0 not present)
    s.insert(6);                 // {2, 4, 6}

    // Outputs 6, 2, 4 (order not guaranteed)
    for (int element : s) cout << element << " ";

    // Iterating over all elements in an unordered_set
    for (int x : s) cout << x << " ";
    for (auto it = s.begin(); it != s.end(); ++it) cout << *it << " ";
}
```

### Multisets

A multiset is like a set, but allows duplicate elements. In C++, `std::multiset` (from `<set>`) stores elements in sorted order and allows multiple copies of the same value. All operations are $\mathcal{O}(\log N)$.

Some basic operations on an `std::multiset<int> ms`:
- `ms.insert(x)`: Adds a copy of `x` to the multiset.
- `ms.erase(x)`: Removes all copies of `x` from the multiset.
- `ms.count(x)`: Returns the number of copies of `x` in the multiset.
- `ms.erase(ms.find(x))`: Removes a single copy of `x` (if present).

Example:

```cpp
#include <iostream>
#include <set>
using namespace std;

void demo() {
    multiset<int> ms;
    ms.insert(5); // {5}
    ms.insert(1); // {1, 5}
    ms.insert(5); // {1, 5, 5}
    ms.insert(3); // {1, 3, 5, 5}
    cout << ms.count(5) << endl; // 2
    ms.erase(5); // removes all 5's: {1, 3}
    ms.insert(5); ms.insert(5); // {1, 3, 5, 5}
    ms.erase(ms.find(5)); // removes one 5: {1, 3, 5}
    for (int x : ms) cout << x << " "; // 1 3 5

    // Iterating over all elements in a multiset
    for (int x : ms) cout << x << " ";
    for (auto it = ms.begin(); it != ms.end(); ++it) cout << *it << " ";
```

---

## Maps in C++

### Sorted Maps

A map (or dictionary) stores key-value pairs. In C++, `std::map` (from `<map>`) stores keys in sorted order and allows fast lookup, insertion, and removal in $\mathcal{O}(\log N)$ time.

```cpp
#include <iostream>
#include <map>
using namespace std;

void demo() {
    map<string, int> m;
    m["apple"] = 5;
    m["banana"] = 2;
    m["apple"] += 3; // apple: 8
    cout << m["apple"] << endl; // 8
    cout << m.count("banana") << endl; // 1
    m.erase("banana");
    cout << m.count("banana") << endl; // 0

    // Iterating over all key-value pairs in a map
    for (auto [key, value] : m) cout << key << ": " << value << "\n";
    // or using an iterator:
    for (auto it = m.begin(); it != m.end(); ++it) cout << it->first << ": " << it->second << "\n";
}
```

### Hashmaps

Hashmaps are implemented in C++ using `std::unordered_map` from `<unordered_map>`. They provide $\mathcal{O}(1)$ expected time for all operations, but keys are not stored in any particular order.

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

void demo() {
    unordered_map<string, int> m;
    m["cat"] = 7;
    m["dog"] = 4;
    m["cat"]++;
    cout << m["cat"] << endl; // 8
    m.erase("dog");
    cout << m.count("dog") << endl; // 0

    // Iterating over all key-value pairs in an unordered_map
    for (auto [key, value] : m) cout << key << ": " << value << "\n";
    for (auto it = m.begin(); it != m.end(); ++it) cout << it->first << ": " << it->second << "\n";
}
```

---

## Stack and Queue

There will be no practice problems or examples on this. We will have to use Queue to implement BFS. There is a class of problem that can uses stacks and queues, but that's a separate article. This part is only for introducing the data structure.

### Stack

A stack is a last-in, first-out (LIFO) data structure. In C++, use `std::stack` from `<stack>`.

```cpp
#include <iostream>
#include <stack>
using namespace std;

void demo() {
    stack<int> st;
    st.push(1); st.push(2); st.push(3); // top is 3
    cout << st.top() << endl; // 3
    st.pop(); // removes 3
    cout << st.top() << endl; // 2
}
```

### Queue

A queue is a first-in, first-out (FIFO) data structure. In C++, use `std::queue` from `<queue>`.

```cpp
#include <iostream>
#include <queue>
using namespace std;

void demo() {
    queue<int> q;
    q.push(10); q.push(20); q.push(30); // front is 10
    cout << q.front() << endl; // 10
    q.pop(); // removes 10
    cout << q.front() << endl; // 20
}
```

## Example Problem: [USACO Bronze - Don't Be Last](https://usaco.org/index.php?page=viewproblem2&cpid=687)

Given a list of cows and the amount of milk each produced on several days, the goal is to determine which cow has the second lowest total milk production. If there is a tie for the second lowest, or if all cows have the same amount, print "Tie".

Since there are only 7 possible cow names, we initialize all of them in our map. We then process the input, sum the milk for each cow, and use a set to find the unique milk amounts. After sorting, we identify the second lowest amount and print the corresponding cow if there is a unique answer, or "Tie" otherwise.

```cpp
#include <bits/stdc++.h>
using namespace std;

const vector<string> cows = {
    "Bessie", "Elsie", "Daisy", "Gertie", "Annabelle", "Maggie", "Henrietta"
};

int n;
map<string, int> M;

int main() {
    freopen("notlast.in", "r", stdin);
    freopen("notlast.out", "w", stdout);

    // Initialize all cows to 0
    for (const auto& name : cows) M[name] = 0;

    cin >> n;
    for (int i = 0; i < n; i++) {
        string s; int x;
        cin >> s >> x;
        M[s] += x;
    }

    // Collect unique milk amounts
    set<int> milk_amounts;
    for (const auto& [name, amt] : M) milk_amounts.insert(amt);

    vector<int> sorted_amounts(milk_amounts.begin(), milk_amounts.end());
    if (sorted_amounts.size() == 1) {
        cout << "Tie" << endl;
        return 0;
    }

    int second_min = sorted_amounts[1];
    vector<string> candidates;
    for (const auto& [name, amt] : M)
        if (amt == second_min) candidates.push_back(name);

    if (candidates.size() == 1)
        cout << candidates[0] << endl;
    else
        cout << "Tie" << endl;
    return 0;
}
```