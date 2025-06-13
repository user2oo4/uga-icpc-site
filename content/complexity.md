# Time Complexity in Competitive Programming

Understanding time complexity is crucial in competitive programming because it helps you determine whether your solution will run efficiently within the given constraints. Efficient algorithms can be the difference between passing all test cases and getting a time limit exceeded (TLE) error.

A conservative estimate for the number of operations the grading server can handle per second is $10^8$. This number can be larger if you handle your operations carefully and keep the constant factors low.

## Resources
- [USACO Guide: Time Complexity](https://usaco.guide/bronze/time-comp)
- [Wikipedia: Big O notation](https://en.wikipedia.org/wiki/Big_O_notation)
- [Youtube: Introduction to Big O](https://www.youtube.com/watch?v=zUUkiEllHG0)

## Some examples

### $O(1)$
```cpp
// Accessing an element in an array
int x = arr[5];

// Swapping two variables
std::swap(a, b);
```

### $O(n)$
```cpp
// Finding the maximum element in an array
int mx = arr[0];
for (int i = 1; i < n; ++i) {
    mx = std::max(mx, arr[i]);
}

// Calculating the sum of all elements in a list
long long sum = 0;
for (int i = 0; i < n; ++i) {
    sum += arr[i];
}
```

### $O(n^2)$
```cpp
// Bubble sort
for (int i = 0; i < n; ++i) {
    for (int j = 0; j + 1 < n - i; ++j) {
        if (arr[j] > arr[j+1]) {
            std::swap(arr[j], arr[j+1]);
        }
    }
}

// Checking all pairs in a list
for (int i = 0; i < n; ++i) {
    for (int j = 0; j < n; ++j) {
        // do something
    }
}
```

### $O(n+m)$
```cpp
// BFS traversal on a graph (adjacency list)
std::queue<int> q;
std::vector<bool> vis(n, false);
q.push(0); vis[0] = true;
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
        if (!vis[v]) {
            vis[v] = true;
            q.push(v);
        }
    }
}

// Counting degrees in an adjacency list graph
std::vector<int> deg(n, 0);
for (int u = 0; u < n; ++u) {
    for (int v : adj[u]) {
        deg[u]++;
    }
}
```

### $O(n^3)$
```cpp
// Floyd-Warshall algorithm
for (int k = 0; k < n; ++k) {
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            dist[i][j] = std::min(dist[i][j], dist[i][k] + dist[k][j]);
        }
    }
}
```

### $O(n^2+m)$
```cpp
// Build adjacency matrix (O(n^2)), then iterate over m edges
std::vector<std::vector<int>> mat(n, std::vector<int>(n, 0));
for (auto [u, v] : edges) {
    mat[u][v] = 1;
}
```

### Quizzes

#### Example 1
```cpp
int x = arr[0] + arr[n-1];
```
<details>
<summary>Complexity</summary>
$O(1)$
</details>

#### Example 2
```cpp
for (int i = 0; i < n; ++i) {
    std::cout << arr[i] << " ";
}
```
<details>
<summary>Complexity</summary>
$O(n)$
</details>

#### Example 3
```cpp
for (int i = 0; i < n; ++i) {
    for (int j = 0; j < n; ++j) {
        std::cout << i << "," << j << " ";
    }
}
```
<details>
<summary>Complexity</summary>
$O(n^2)$
</details>

#### Example 4
```cpp
for (int i = 0; i < n; ++i) {
    for (int j = 0; j < m; ++j) {
        std::cout << i << "," << j << " ";
    }
}
```
<details>
<summary>Complexity</summary>
$O(nm)$
</details>

#### Example 5
```cpp
for (int i = 0; i < n; ++i) {
    if (arr[i] % 2 == 0) {
        std::cout << arr[i] << " ";
    }
}
```
<details>
<summary>Complexity</summary>
$O(n)$
</details>

## Common complexities


## Common Complexities and Constraints

Complexity factors that come from some common algorithms and data structures are as follows:


- Mathematical formulas that just calculate an answer: $\mathcal{O}(1)$
- Binary search: $\mathcal{O}(\log n)$
- Sorted set/map or priority queue: $\mathcal{O}(\log n)$ per operation
- Prime factorization of an integer, or checking primality or compositeness of
  an integer naively: $\mathcal{O}(\sqrt{n})$
- Reading in $n$ items of input: $\mathcal{O}(n)$
- Iterating through an array or a list of $n$ elements: $\mathcal{O}(n)$
- Sorting: usually $\mathcal{O}(n \log n)$ for default sorting algorithms
  (mergesort, `Collections.sort`, `Arrays.sort`)
- Java Quicksort `Arrays.sort` function on primitives: $\mathcal{O}(n^2)$
  - See [Introduction to Data Structures](/bronze/intro-ds) for details.
- Iterating through all subsets of size $k$ of the input elements:
  $\mathcal{O}(n^k)$. For example, iterating through all triplets is
  $\mathcal{O}(n^3)$.
- Iterating through all subsets: $\mathcal{O}(2^n)$
- Iterating through all permutations: $\mathcal{O}(n!)$

Here are conservative upper bounds on the value of $n$ for each time complexity.
You might get away with more than this, but this should allow you to quickly
check whether an algorithm is viable.

<center>

| $n$                  | Possible complexities                                            |
| -------------------- | ---------------------------------------------------------------- |
| $n \le 10$           | $\mathcal{O}(n!)$, $\mathcal{O}(n^7)$, $\mathcal{O}(n^6)$        |
| $n \le 20$           | $\mathcal{O}(2^n \cdot n)$, $\mathcal{O}(n^5)$                   |
| $n \le 80$           | $\mathcal{O}(n^4)$                                               |
| $n \le 400$          | $\mathcal{O}(n^3)$                                               |
| $n \le 7500$         | $\mathcal{O}(n^2)$                                               |
| $n \le 7 \cdot 10^4$ | $\mathcal{O}(n \sqrt n)$                                         |
| $n \le 5 \cdot 10^5$ | $\mathcal{O}(n \log n)$                                          |
| $n \le 5 \cdot 10^6$ | $\mathcal{O}(n)$                                                 |
| $n \le 10^{18}$      | $\mathcal{O}(\log^2 n)$, $\mathcal{O}(\log n)$, $\mathcal{O}(1)$ |

</center>

## Constant Factor

<!-- The **constant factor** of an algorithm refers to the coefficient of the complexity of an algorithm. If an algorithm runs in $\mathcal{O}(kn)$ time, where $k$ is a constant and $n$ is the input size, then the "constant factor" would be $k$. -->

**Constant factor** refers to the idea that different operations with the same
complexity take slightly different amounts of time to run. For example, three
addition operations take a bit longer than a single addition operation. Another
example is that although binary search on an array and insertion into an ordered
set are both $\mathcal{O}(\log n)$, binary search is noticeably faster.

**Constant factor** is entirely ignored in Big O notation. This is fine most of
the time, but if the time limit is particularly tight, you may receive time
limit exceeded (TLE) with the intended complexity. When this happens, it is
important to keep the constant factor in mind. For example, a piece of code that
iterates through all _ordered_ triplets runs in $\mathcal{O}(n^3)$ time might be
sped up by a factor of $6$ if we only need to iterate through all _unordered_
triplets.

<!-- For example, if our code currently runs in $\mathcal{O}(n^2)$ time, perhaps we can modify our code to make it run in $\mathcal{O}(n^2/32)$ by using a bitset. (Of course, with Big O notation, $\mathcal{O}(n^2) = O(n^2/32)$.) -->
<!-- Bitsets are significantly faster (and so are bitwise operations vs iterating through bits). I don't want to make it sound insignificant -->

For now, don't worry about optimizing constant factors -- just be aware of them.