# Introduction to Dynamic Programming

## Resources

- [Atcoder DP Contest](https://atcoder.jp/contests/dp) *(Highly recommended)*
- [USACO Guide: Intro to DP](https://usaco.guide/gold/intro-dp?lang=cpp#resource-%2FCPH.pdf%23page%3D75) *(textbook, with some YouTube links)*
- CSCI 4470

---

## Example 1: [Atcoder Frog 1](https://atcoder.jp/contests/dp/tasks/dp_a)

It's hard to explain DP in general, so let's start with a classic example.

**Problem:**

Given $N$ stones in a row (numbered $1$ to $N$, with $N \leq 10^5$), a frog starts at stone $1$ and wants to reach stone $N$. The frog can jump to the next stone or skip one (i.e., from $i$ to $i+1$ or $i+2$). Each stone $i$ has a height $h_i$. The cost to jump from stone $i$ to stone $j$ is $|h_i - h_j|$. What is the minimum total cost to reach stone $N$?

---

**Restate:**
- You can jump from $i$ to $i+1$ or $i+2$.
- The cost is the absolute difference in heights.
- Find the minimum cost path from $1$ to $N$.

---

**Naive Recursive Approach:**

We can also solve this problem using a simple recursive function. For each stone $i$, we try both possible jumps (from $i-1$ and $i-2$) and take the minimum cost. However, this approach recalculates the same subproblems many times, leading to exponential time complexity $O(2^n)$.

```cpp
// Naive recursive solution (do not use for large n)
int solve(int i, const vector<int>& h) {
    if (i == 1) return 0;
    if (i == 2) return abs(h[2] - h[1]);
    return min(solve(i-1, h) + abs(h[i] - h[i-1]),
               solve(i-2, h) + abs(h[i] - h[i-2]));
}
```

Now, the thing is let's say we are considering jumping from some stone $i$. We call the solve function at $i$, and then it will go back and try a lot of ways, calling solve($i-1$) and solve($i-2$) many times. Similarly, when we move to $i+1$, we will call solve($i$) multiple times as well. The thing is, we don't have to recalculate solve(1), solve(2), ... each time since it will return the same value. We can instead use **memoization** to speed this up, which leads to $O(n)$ complexity.

**Memoized Recursive Solution:**

```cpp
// Memoized recursive solution (top-down DP)
int solve(int i, const vector<int>& h, vector<int>& memo) {
    if (i == 1) return 0;
    if (i == 2) return abs(h[2] - h[1]);
    if (memo[i] != -1) return memo[i];
    return memo[i] = min(solve(i-1, h, memo) + abs(h[i] - h[i-1]),
                        solve(i-2, h, memo) + abs(h[i] - h[i-2]));
}

// Usage:
// vector<int> memo(n+1, -1);
// int answer = solve(n, h, memo);
```

Now, DP is the same process, but instead of calling it recursively (top-down), we go from the base case and go up (bottom-up). Below is the DP explanation and code for the same logic.
---

**DP Approach:**
- Let $dp[i]$ be the minimum cost to reach stone $i$.
- Base case: $dp[1] = 0$ (start at stone 1).
- For $i \geq 2$:
    - $dp[i] = \min(dp[i-1] + |h_i - h_{i-1}|,\ dp[i-2] + |h_i - h_{i-2}|)$ (if $i > 2$)

**C++ Solution:**

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> h(n+1);
    for (int i = 1; i <= n; ++i) cin >> h[i];
    vector<int> dp(n+1, INT_MAX);
    dp[1] = 0;
    for (int i = 2; i <= n; ++i) {
        dp[i] = min(dp[i], dp[i-1] + abs(h[i] - h[i-1]));
        if (i > 2) dp[i] = min(dp[i], dp[i-2] + abs(h[i] - h[i-2]));
    }
    cout << dp[n] << '\n';
}
```

Now, DP itself can be viewed in different ways, and as long as your logic is correct, any approach is valid. The code above is called **pull DP**: when we compute $dp[i]$, we "pull" values from $dp[i-1]$ and $dp[i-2]$ (which are already computed) to determine the value at $i$.

Alternatively, you can use a **push DP** perspective: if you know $dp[i]$, you "push" updates forward to $dp[i+1]$ and $dp[i+2]$ by trying to improve their values using $dp[i]$. For example:

```cpp
for (int i = 1; i <= n; ++i) {
    if (i + 1 <= n)
        dp[i + 1] = min(dp[i + 1], dp[i] + abs(h[i + 1] - h[i]));
    if (i + 2 <= n)
        dp[i + 2] = min(dp[i + 2], dp[i] + abs(h[i + 2] - h[i]));
}
```

Both pull and push DP are valid and often interchangeable; which one you use is a matter of preference and what feels more natural for the problem. With practice, you'll develop an intuition for which approach to use. You can always use recursion + memoization (top-down) as well—sometimes it's easier to see the solution that way, especially for more complex problems.

---

## Example 2: [Knapsack](https://atcoder.jp/contests/dp/tasks/dp_d) and [Knapsack 2](https://atcoder.jp/contests/dp/tasks/dp_e)

This is another classic DP problem. We are given $N \leq 100$ objects, each with a weight $w_i$ and a value $v_i \leq 10^9$. We can carry a total weight of at most $W \leq 10^5$. What is the maximum value we can get?

Now, we have more to care about, since it's not just the point and where we are at like last problem. We also have to care about the total values and the total weight we have in the bag to make sure we don't go over the limit.

In DP problems, there are two important things that we need to figure out. The first one is the **state** that we are in. What numbers do we have to care about? It's like when we solve a problem recursively, what do we have to include in the function call. The second one is the **transition**. How are we going from one state to another?

For the knapsack problem, we can go in order of the objects and either pick or not pick the object. We also have to keep track of the weight, so we have our dp state $dp[i][cur_w]$ with $i$ being the index of the current object, and $cur_w$ being the current weight. The value of $dp[i][cur_w]$ will be the maximum value that we can get.

After having the state, we now figure out the transition, since at each step, we can either pick or not pick the object, we have $dp[i][cur_w] = max(dp[i - 1][cur_w], dp[i][cur_w - w[i]] + val[i])$ (with the two cases being we picked or did not pick the $i$-th object).

The complexity of a DP algorithm is the total number of transitions we made. For most basic DP problems, the number of transitions are similar in different states. For example, in this problem, the transition is at most $2$. So, we can say the transition for each state is $O(1)$. Since the number of states is $n*W$, the overall complexity is $O(nW)$. 

If the number of transitions is similar between different states, the overall time complexity of the DP algorithm is simply the number of states times the number of transitions per state.

**C++ Solution for Classic Knapsack ($O(nW)$):**

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, W; cin >> n >> W;
    vector<int> w(n+1), v(n+1);
    for (int i = 1; i <= n; ++i) cin >> w[i] >> v[i];
    vector<vector<long long>> dp(n+1, vector<long long>(W+1, 0));
    for (int i = 1; i <= n; ++i) {
        for (int cur_w = 0; cur_w <= W; ++cur_w) {
            dp[i][cur_w] = dp[i-1][cur_w]; // don't take item i
            if (cur_w >= w[i])
                dp[i][cur_w] = max(dp[i][cur_w], dp[i-1][cur_w-w[i]] + v[i]); // take item i
        }
    }
    cout << dp[n][W] << '\n';
}
```

Now for the second version of the Knapsack, the problem is the same but the constraints change: $W \leq 10^9$, so the same DP algorithm wouldn't pass. However, the value of each object is no larger than $1000$, so the total value will stay under $10^5$.

We switch the state of the problem to $dp[i][cur\_val]$ being the smallest weight possible to achieve a total value of $cur\_val$ when considering the first $i$ objects.

This is a good example of how we can play around with the DP states based on the constraints. When we have a certain limit, we can either include that limit in the DP state, or make that limit the value of DP and find the optimal state for the answer.

**C++ Solution for Value-Based Knapsack ($O(nV)$):**

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1e18;

int main() {
    int n, W; cin >> n >> W;
    vector<int> w(n+1), v(n+1);
    int sum_v = 0;
    for (int i = 1; i <= n; ++i) {
        cin >> w[i] >> v[i];
        sum_v += v[i];
    }
    vector<vector<long long>> dp(n+1, vector<long long>(sum_v+1, INF));
    dp[0][0] = 0;
    for (int i = 1; i <= n; ++i) {
        for (int cur_val = 0; cur_val <= sum_v; ++cur_val) {
            // Don't take item i
            dp[i][cur_val] = dp[i-1][cur_val];
            // Take item i
            if (cur_val >= v[i])
                dp[i][cur_val] = min(dp[i][cur_val], dp[i-1][cur_val-v[i]] + w[i]);
        }
    }
    int ans = 0;
    for (int val = sum_v; val >= 0; --val) {
        if (dp[n][val] <= W) {
            ans = val;
            break;
        }
    }
    cout << ans << '\n';
}
```

## Example 3: [Atcoder Grid 1](https://atcoder.jp/contests/dp/tasks/dp_h)

We are given a grid of size $H * W$ where $W, H \leq 1000$. Each square on the grid is either $.$ or $#$ (we can only go on $.$). How many ways to go from the top left (1, 1) to the bottom right (H, W) if we only go right and down?

This problem maybe a bit different because it involves a 2D grid. In the last problem, when we form the state, the current object only represents one number in the state. In this one, we can use two numbers to represent the current position.

Let $dp[row][col]$ be the number of ways to travel from $(1, 1)$ to $(row, col)$. The transition is:

$$
dp[row][col] = dp[row-1][col] + dp[row][col-1]
$$

(either coming from above or from the left, if those cells are valid and not blocked).

**C++ Solution:**

```cpp
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;

int main() {
    int H, W; cin >> H >> W;
    vector<string> grid(H+1);
    for (int i = 1; i <= H; ++i) {
        string s; cin >> s;
        grid[i] = "#" + s; // 1-based indexing
    }
    vector<vector<int>> dp(H+1, vector<int>(W+1, 0));
    dp[1][1] = (grid[1][1] == '.');
    for (int i = 1; i <= H; ++i) {
        for (int j = 1; j <= W; ++j) {
            if (grid[i][j] == '#') continue;
            if (i > 1) dp[i][j] = (dp[i][j] + dp[i - 1][j]) % MOD;
            if (j > 1) dp[i][j] = (dp[i][j] + dp[i][j - 1]) % MOD;
        }
    }
    cout << dp[H][W] << '\n';
}
```

---

## Extra Practice

- [CSES Problemset (DP section)](https://cses.fi/problemset/list/)
- [DP Blog + Problems (CF)](https://codeforces.com/blog/entry/67679)

