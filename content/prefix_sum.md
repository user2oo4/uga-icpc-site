# Prefix Sums

## Resources
- [USACO Guide: Prefix Sums](https://usaco.guide/silver/prefix-sums?lang=cpp)

---

Prefix sums are a simple but powerful technique for efficiently answering range sum queries and related problems. The idea is to preprocess an array so that the sum of any subarray can be computed in constant time.

Given an array $a$ of length $n$, the prefix sum array $p$ is defined as:

$$
p_0 = 0 \\
p_i = a_1 + a_2 + \dots + a_i \text{ for } 1 \leq i \leq n
$$

This allows you to compute the sum of $a[l]$ through $a[r]$ as $p_r - p_{l-1}$ (using 1-based indexing).

---

## Prefix Sum Code (C++)

```cpp
// Compute prefix sums and answer range sum queries
const int maxN = 2e5 + 5;
int a[maxN];
int pf[maxN];
int n;

void build() {
    for (int i = 1 ; i <= n ; i++) {
        pf[i] = pf[i - 1] + a[i]; // pf[0] = 0
    }
}

int get_sum(int l, int r) {
    return pf[r] - pf[l - 1]; // a[l] + a[l + 1] + ... + a[r]
}
```
---

## Example Problem 1: [CSES - Maximum Subarray Sum](https://cses.fi/problemset/task/1643)

**Solution**

Consider the prefix sum array $p[0], p[1], \dots, p[n]$ where $p[i]=\sum_{j=1}^ix_j$. Then the sum of the subarray $x_{l+1\dots r}$ ($0\le l < r\le n$) is equal to $p[r]-p[l]$.

For a fixed right bound $r$, the maximum subarray sum over all valid $l$ is

$$p[r]-\min_{l < r}{p[l]}.$$ 

Thus, we can keep a running minimum to store $\min\limits_{l < r}{p[l]}$ as we iterate through $r$ in increasing order. This yields the maximum subarray sum for each possible right bound, and the maximum over all these values is our answer.

```cpp
// O(n) solution using prefix sums
const int maxN = 2e5 + 5;
int n, a[maxN];
long long pf[maxN];

int main() {
    cin >> n;
    for (int i = 1; i <= n; ++i) {
        cin >> a[i];
        pf[i] = pf[i - 1] + a[i];
    }
    long long ans = LLONG_MIN, min_pref = 0;
    for (int r = 1; r <= n; ++r) {
        ans = max(ans, pf[r] - min_pref);
        min_pref = min(min_pref, pf[r]);
    }
    cout << ans << '\n';
}
```
## Prefix Sum 2D

2D prefix sums extend the idea of prefix sums to matrices. For a grid $A$ of size $n \times m$, the 2D prefix sum array $P$ is defined as:

$$
P_{i,j} = \sum_{x=1}^i \sum_{y=1}^j A_{x,y}
$$

This allows you to compute the sum of any subrectangle $(x_1, y_1)$ to $(x_2, y_2)$ in constant time:

$$
\text{sum} = P_{x_2, y_2} - P_{x_1-1, y_2} - P_{x_2, y_1-1} + P_{x_1-1, y_1-1}
$$

---

### Example: 2D Prefix Sum Code (C++)

```cpp
const int maxN = 1005;
int n, m;
int a[maxN][maxN];
int pf[maxN][maxN]; // 1-based indexing

void build() {
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            pf[i][j] += pf[i - 1][j] + pf[i][j - 1] - pf[i - 1][j - 1] + a[i][j];
        }
    }
}

int get_sum(int x1, int y1, int x2, int y2) {
    return pf[x2][y2] - pf[x1 - 1][y2] - pf[x2][y1 - 1] + pf[x1 - 1][y1 - 1];
}
```

## Example Problem 2: [CSES - Forest Queries](https://cses.fi/problemset/task/1652)

This problem asks you to efficiently answer queries about the number of trees ('*') in a rectangular subgrid of an $N \times N$ forest. By building a 2D prefix sum array, you can answer each query in constant time.

**Approach:**
- Build a 2D prefix sum array where each cell stores the number of trees in the rectangle from $(1,1)$ to $(i,j)$.
- For each query, use the inclusion-exclusion formula to compute the number of trees in the given rectangle.

---

```cpp
#include <iostream>
using namespace std;

constexpr int MAX_SIDE = 1000;
int tree_pref[MAX_SIDE + 1][MAX_SIDE + 1];
int forest[MAX_SIDE + 1][MAX_SIDE + 1];

// Build the 2D prefix sum array
void build_prefix_sum(int N) {
    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            tree_pref[i][j] = forest[i][j] + tree_pref[i - 1][j] + tree_pref[i][j - 1] - tree_pref[i - 1][j - 1];
        }
    }
}

// Query the sum in rectangle (x1, y1) to (x2, y2)
int query(int x1, int y1, int x2, int y2) {
    return tree_pref[x2][y2] - tree_pref[x1 - 1][y2] - tree_pref[x2][y1 - 1] + tree_pref[x1 - 1][y1 - 1];
}

int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    int N, Q;
    cin >> N >> Q;
    // Read in the initial trees
    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            char a;
            cin >> a;
            forest[i][j] = (a == '*');
        }
    }
    build_prefix_sum(N);
    while (Q--) {
        int x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        cout << query(x1, y1, x2, y2) << '\n';
    }
}
```

---

By using 2D prefix sums, each query is answered in $O(1)$ time after $O(N^2)$ preprocessing.


## Example Problem 3: [Rocky Mountain Regional 2024 L - Sauna](https://qoj.ac/contest/2151/problem/12193)

This problem is a good example of the **difference array** technique, which is closely related to prefix sums but is used for efficiently handling range updates.

**Problem Summary:**
- You are given several ranges, and you need to determine which numbers are present in all ranges (i.e., covered by every range).

**Difference Array Technique:**
- Instead of updating every element in a range $[l, r]$, you increment $a[l]$ by 1 and decrement $a[r+1]$ by 1.
- After all updates, taking the prefix sum of the array gives the number of times each position is covered.
- To find numbers present in all ranges, look for positions where the prefix sum equals the number of ranges.

---

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxN = 2e5 + 5;
int a[maxN];
int n;

int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    cin >> n;
    for (int i = 1 ; i <= n ; i++) {
        int l, r;
        cin >> l >> r;
        a[l]++;
        a[r + 1]--;
    }
    int cnt = 0;
    int first = -1;
    for (int i = 0 ; i < maxN ; i++) {
        if (i) a[i] += a[i - 1];
        if (a[i] == n) {
            cnt++;
            if (first == -1) first = i;
        }
    }
    if (!cnt) {
        cout << "bad news";
    } else cout << cnt << " " << first;
}
```

---

**Explanation:**
- For each range $[l, r]$, increment $a[l]$ and decrement $a[r+1]$.
- After processing all ranges, $a[i]$ (after prefix sum) tells you how many ranges cover $i$.
- If $a[i] == n$, then $i$ is present in all ranges.
- The code outputs the count and the first such number, or "bad news" if there is none.