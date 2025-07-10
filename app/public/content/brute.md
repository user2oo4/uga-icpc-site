
# Simulation and Complete Search

These problems are a great starting point for practicing careful attention to problem constraints. If a direct simulation or brute force approach is efficient enough for the given limits, it's often the best and simplest solution.

---

## Resources

- [USACO Guide: Simulation](https://usaco.guide/bronze/simulation)
- [USACO Guide: Introduction to Complete Search](https://usaco.guide/bronze/intro-complete)
- [USACO Guide: Complete Search with Recursion](https://usaco.guide/bronze/complete-rec)

---

## Simulation

Simulation problems usually require you to mimic a process step by step. The goal is to translate the problem statement directly into code, using built-in data structures and language features. When a problem statement says to find the end result of a process, or to find when something occurs, a naive simulation is often sufficient.

### Problem: [Shell Game - USACO Bronze](https://usaco.org/index.php?page=viewproblem2&cpid=891)

**Solution:**

We can simulate the process. Store an array that keeps track of which shell is at which location, and Bessie's swapping can be simulated by swapping elements in the array. Then, we can count how many times Elsie guesses each shell, and the maximum points she can earn is the maximum amount of times a shell is guessed.

<details>
<summary>C++ Code</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;

// stores the shell located at position i
// shell i starts at position i
int shell[4];
// stores number of times shell i was picked
int cnt[4];
int n;

int main() {
    freopen("shell.in", "r", stdin);
    freopen("shell.out", "w", stdout);

    cin >> n;
    for (int i = 1 ; i <= 3 ; i++) {
        shell[i] = i;
        cnt[i] = 0;
    }
    for (int i = 0 ; i < n ; i++) {
        int a, b, g;
        cin >> a >> b >> g;
        swap(shell[a], shell[b]);
        cnt[shell[g]]++;
    }
    // answer is the maximum possible correct guess
    int ans = max(cnt[1], max(cnt[2], cnt[3]));
    cout << ans;
}
```
</details>

---

## Complete Search

In many problems, it suffices to check all possible cases in the solution space, whether it be all elements, all pairs of elements, all subsets, or all permutations. Unsurprisingly, this is called complete search (or brute force), because it completely searches the entire solution space.

### Problem: [Maximum Distance - Codeforces](https://codeforces.com/gym/102951/problem/A)

We can just try all the different pairs and keep the maximum squared distance between any two points. In this problem, $n \leq 5000$, which means trying all pairs should be fast enough since it's $O(n^2)$.

<details>
<summary>C++ Code</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxN = 5005;
int x[maxN];
int y[maxN];
int n;

int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    cin >> n;
    for (int i = 0 ; i < n ; i++) {
        cin >> x[i];
    }
    for (int i = 0 ; i < n ; i++) {
        cin >> y[i];
    }
    int max_squared = 0;                   // stores the current maximum
    for (int i = 0 ; i < n ; i++) {        // for each first point
        for (int j = i + 1 ; j < n ; j++) {  // and each second point
            int dx = x[i] - x[j];
            int dy = y[i] - y[j];
            int square_dist = dx * dx + dy * dy;
            max_squared = max(max_squared, square_dist);
        }
    }
    cout << max_squared;
}
```
</details>

---

## Complete Search with Recursion

Some problems' solution space require searching recursively instead of using a for loop. For example, if we are required to search through all subsets of a set, or a permutation, there is not a fixed number of loops that we know (like 2 loops for all pairs).

Since there are $n!$ different permutations and $2^n$ different subsets, the telling signs of these problems is small limit of the input given.

### Problem: [Apple Division - CSES](https://cses.fi/problemset/task/1623)

Solution: We can try all possible different partitions of apples into two groups recursively.

<details>
<summary>C++ Code (Recursion)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int n;
ll weights[25];

ll recurse_apples(int index, ll sum1, ll sum2) {
    // We've added all apples- return the absolute difference
    if (index == n) { return abs(sum1 - sum2); }
    // Try adding the current apple to either the first or second set
    return min(recurse_apples(index + 1, sum1 + weights[index], sum2),
               recurse_apples(index + 1, sum1, sum2 + weights[index]));
}

int main() {
    cin >> n;
    for (int i = 0 ; i < n ; i++) { 
        cin >> weights[i]; 
    }
    // Solve the problem starting at apple 0 with both sets being empty
    cout << recurse_apples(0, 0, 0) << endl;
}
```
</details>

We can also iterate through all possible subsets of apples by using a bitmask:

<details>
<summary>C++ Code (Bitmask)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int n;
ll weights[25];

int main() {
    cin >> n;

    ll ans = 0;
    for (int i = 0 ; i < n ; i++) { 
        cin >> weights[i];
        ans += weights[i]; 
    }

    for (int mask = 0 ; mask < (1 << n) ; mask++) {
        ll sum1 = 0;
        ll sum2 = 0;
        for (int i = 0 ; i < n ; i++) {
            if (mask & (1 << i)) sum1 += weights[i];
            else sum2 += weights[i];
        }
        ans = min(ans, abs(sum1 - sum2));
    }
    cout << ans;
}
```
</details>

### Bitmask Example (n = 3)

| mask (binary) | subset $s_1$      |
|:-------------:|:------------------|
| 000           | $\{\}$            |
| 001           | $\{0\}$           |
| 010           | $\{1\}$           |
| 011           | $\{0,1\}$         |
| 100           | $\{2\}$           |
| 101           | $\{0,2\}$         |
| 110           | $\{1,2\}$         |
| 111           | $\{0,1,2\}$       |

---

### Problem: [Chessboard & Queens](https://cses.fi/problemset/task/1624)

**Solution:**

We can try placing a queen on each row (since each row must have exactly one queen). For each placement, we check if the new queen is on the same column or diagonal as any previously placed queen. If we successfully place all queens, we increment the answer.

<details>
<summary>C++ Code</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;

int n = 8, k = 0; // k stores the answer
int a[10];
char c[10][10];
bool ok[10][10];

bool check(int i, int j) {
    // Check same column
    for (int x = 1; x <= j - 1; x++) {
        if (a[x] == i) return true;
    }
    // Check diagonal '/'
    for (int x = 1; x <= j - 1; x++) {
        if (a[x] - x == i - j) return true;
    }
    // Check diagonal '\'
    for (int x = 1; x <= j - 1; x++) {
        if (a[x] + x == i + j) return true;
    }
    return false;
}

void show() {
    for (int i = 1; i <= n; i++) {
        if (!ok[i][a[i]]) return;
    }
    k++;
}

void back(int pos) {
    if (pos == n) {
        show();
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (!check(i, pos + 1)) {
            a[pos + 1] = i;
            back(pos + 1);
        }
    }
}

int main() {
    n = 8;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> c[i][j];
            ok[i][j] = (c[i][j] == '.');
        }
    }
    back(0);
    cout << k << endl;
}
```
</details>

---

## Additional Practice

- [VJudge Practice Contest](https://vjudge.net/contest/722587#overview)

