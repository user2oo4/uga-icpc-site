# DP on Trees & Graphs

Sometimes, there are problems that require us to perform certain tasks on a tree or a graph. For example, if we have to count the size of the subtree of all nodes in a tree, we need to know the size of the subtrees of all its children.

This is a classic DP scenario: we solve smaller subproblems (children) and use their results to solve the parent problem. For array DP, the order is clear (e.g., index $2$ comes after index $1$). For DP on trees, the order is determined by the traversal—usually DFS—so bottom-up (post-order) DP is natural.

We can picture it like this: when we call DFS, we go down to the children and calculate their DP values first. After finishing all recursive calls, we update the DP value for the current vertex using the results from its children.

## Resources

- [USACO Guide - DP on Trees](https://usaco.guide/gold/dp-trees)
- [CF blog: DP on Trees tutorial](https://codeforces.com/blog/entry/20935)

**Example: Subtree Size Calculation**

```cpp
void dfs(int v, int p) {
    subtree_size[v] = 1;
    for (int u : AdjList[v]) {
        if (u == p) continue;
        dfs(u, v);
        subtree_size[v] += subtree_size[u];
    }
}
```

---

## Example 1: [CSES Tree Matching](https://cses.fi/problemset/task/1130)

### Solution - Tree Matching

In this problem, we're asked to find the maximum matching of a tree: the largest set of edges such that no two edges share an endpoint. We'll use DP on trees to solve this.

Root the tree at node $1$ to define subtrees. Let $dp_2[v]$ be the maximum matching in the subtree of $v$ where we don't take any edges from $v$ to its children. Let $dp_1[v]$ be the maximum matching where we take one edge from $v$ to a child. We can't take more than one such edge, or two edges would share an endpoint.

#### Taking No Edges

If we take no edges from $v$ to its children, each child can independently choose to take or not take an edge to its own children:

$$
dp_2[v] = \sum_{u \in child(v)} \max(dp_1[u], dp_2[u])
$$

#### Taking One Edge

If we take one edge $v \to u$, then $u$ can't take any edges to its children, so we add $dp_2[u] + 1$. For the other children, we add $\max(dp_1[w], dp_2[w])$ for $w \neq u$. Since $dp_2[v]$ is the sum over all children, we can write:

$$
dp_1[v] = \max_{u \in child(v)} (dp_2[u] + 1 + dp_2[v] - \max(dp_2[u], dp_1[u]))
$$

Loop through the children of $v$ twice: once to compute $dp_2[v]$, then to compute $dp_1[v]$.

**C++ Code:**

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 2e5+5;
vector<int> AdjList[maxn];
int dp1[maxn], dp2[maxn];

void dfs(int v, int p) {
    dp2[v] = 0;
    for (int u : AdjList[v]) {
        if (u == p) continue;
        dfs(u, v);
        dp2[v] += max(dp1[u], dp2[u]);
    }
    dp1[v] = 0;
    for (int u : AdjList[v]) {
        if (u == p) continue;
        int val = dp2[u] + 1 + dp2[v] - max(dp2[u], dp1[u]);
        dp1[v] = max(dp1[v], val);
    }
}

int main() {
    int n; cin >> n;
    for (int i = 1; i < n; ++i) {
        int a, b; cin >> a >> b;
        AdjList[a].push_back(b);
        AdjList[b].push_back(a);
    }
    dfs(1, 0);
    cout << max(dp1[1], dp2[1]) << '\n';
}
```

---

### Solution 2 - Greedy

Sometimes, there may be a simple greedy solution. If we always try to find DP states and transitions, we might miss it. Try small examples and make observations first.

For this problem, a greedy approach is to match a node with its parent if both are unused.

**C++ Code:**

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 2e5+5;
vector<int> AdjList[maxn];
bool used[maxn];

void dfs(int v, int p, int &ans) {
    for (int u : AdjList[v]) {
        if (u == p) continue;
        dfs(u, v, ans);
        if (!used[v] && !used[u]) {
            used[v] = used[u] = true;
            ++ans;
        }
    }
}

int main() {
    int n; cin >> n;
    for (int i = 1; i < n; ++i) {
        int a, b; cin >> a >> b;
        AdjList[a].push_back(b);
        AdjList[b].push_back(a);
    }
    int ans = 0;
    dfs(1, 0, ans);
    cout << ans << '\n';
}
```

---

## Example 2: [Atcoder - Longest Path](https://atcoder.jp/contests/dp/tasks/dp_g)

This is a classic example of DP on a graph. It's less common than DP on trees because, unlike trees, graphs don't have a natural order. Most DP problems on graphs involve Directed Acyclic Graphs (DAGs), where we can use **topological order**. (See: [Topological Sort - USACO Guide](https://usaco.guide/gold/toposort))

The problem: find the longest path in a DAG. Memoization is useful here. If we are processing a vertex $u$ and want the longest path from a neighbor $v$, we can call our recursive function; if $dp[v]$ is already calculated, it returns immediately.

**C++ Code:**

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 1e5+5;
int dp[maxn];
vector<int> AdjList[maxn];
int n, m;

int get(int s) {
    if (dp[s] != -1) return dp[s];
    dp[s] = 0;
    for (int u : AdjList[s]) {
        dp[s] = max(get(u) + 1, dp[s]);
    }
    return dp[s];
}

int main() {
    cin >> n >> m;
    for (int i = 1; i <= m; ++i) {
        int u, v; cin >> u >> v;
        AdjList[u].push_back(v);
    }
    memset(dp, -1, sizeof(dp));
    int ans = 0;
    for (int i = 1; i <= n; ++i) {
        ans = max(ans, get(i));
    }
    cout << ans << '\n';
}
```

---