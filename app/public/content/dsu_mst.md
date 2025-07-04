# Disjoint Set Union (DSU) and Minimum Spanning Tree (MST)

---

## Disjoint Set Union (DSU)

Disjoint Set Union (DSU), also known as Union-Find, is a fundamental data structure used to efficiently keep track of a set of elements partitioned into disjoint (non-overlapping) subsets. It supports two main operations:

- **Find:** Determine which subset a particular element belongs to.
- **Union:** Merge two subsets into a single subset.

DSU is especially useful in problems involving connectivity, such as determining whether two elements are in the same connected component of a graph. It is a key tool in algorithms like Kruskal's for finding Minimum Spanning Trees (MST), where we need to efficiently check and merge connected components as we process edges.

### Standard DSU Implementation

```cpp
vector<int> pset;
vector<int> sz;

void init(int n) {
    pset.assign(n + 1, 0);
    sz.assign(n + 1, 1);
    for (int i = 1 ; i <= n ; i++) {
        pset[i] = i;
    }
}

int find_set(int s) {
    if (s == pset[s]) return s;
    return pset[s] = find_set(pset[s]); // path compression
}

void union_set(int u, int v) {
    u = find_set(u);
    v = find_set(v);
    if (u == v) return;
    if (sz[u] > sz[v]) swap(u, v);
    // merge u to v
    pset[u] = v;
    sz[v] += sz[u];
}
```

- **Time Complexity:** With both union by size/rank and path compression, each operation is nearly $O(1)$ (amortized, specifically $O(\alpha(n))$ where $\alpha$ is the inverse Ackermann function).

---

## Minimum Spanning Tree (MST) and Kruskal's Algorithm

DSU is crucial for Kruskal's algorithm, which finds a minimum spanning tree in a weighted undirected graph. The idea is to sort all edges by weight and add them one by one, using DSU to check if adding an edge would create a cycle (i.e., if the endpoints are already connected).

MST can also be implemented with different algorithms such as Prim's or Boruvka's. However, Kruskal's is the most popular in competitive programming and is easy to adapt for related problems.

### Kruskal's Algorithm Example (C++)

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Edge {
    int u, v, w;
    bool operator<(const Edge& other) const { return w < other.w; }
};

vector<int> pset;

int find_set(int v) {
    if (v == pset[v]) return v;
    return pset[v] = find_set(pset[v]);
}

void union_set(int a, int b) {
    a = find_set(a);
    b = find_set(b);
    if (a != b) pset[a] = b;
}

int main() {
    int n, m; cin >> n >> m;
    vector<Edge> edges(m);
    for (int i = 0; i < m; ++i) {
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    }
    sort(edges.begin(), edges.end());
    pset.resize(n + 1);
    for (int i = 1; i <= n; ++i) pset[i] = i;
    int mst_weight = 0, edges_used = 0;
    for (auto& e : edges) {
        if (find_set(e.u) != find_set(e.v)) {
            union_set(e.u, e.v);
            mst_weight += e.w;
            ++edges_used;
        }
    }
    if (edges_used == n - 1)
        cout << "MST weight: " << mst_weight << '\n';
    else
        cout << "No spanning tree exists" << '\n';
}
```

---

## Example Problem (DSU): [CSES - New Road Queries](https://cses.fi/problemset/task/2101/)

This is a more advanced DSU problem. Since we need to find the earliest time two nodes are connected, we must maintain the full merge tree (not just use path compression). For each node, we can trace its ancestors and find the earliest time two nodes share a common ancestor.

**Key Idea:**
- Store for each node its parent and the time it was merged.
- To answer queries, walk up the ancestor chain for both nodes and find the first common ancestor, taking the maximum of the merge times along the way.

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef pair<int, int> ii;

const int MAXN = 2e5 + 5;
int n, m, q;
pair<int, int> parent[MAXN]; // (parent, time)
int sz[MAXN];

void init(int n) {
    for (int i = 1; i <= n; ++i) {
        parent[i] = {i, 0};
        sz[i] = 1;
    }
}

int find_set(int s) {
    if (s == parent[s].first) return s;
    return find_set(parent[s].first);
}

void union_set(int u, int v, int t) {
    int pu = find_set(u);
    int pv = find_set(v);
    if (pu == pv) return;
    if (sz[pu] > sz[pv]) {
        swap(u, v);
        swap(pu, pv);
    }
    parent[pu] = {pv, t};
    sz[pv] += sz[pu];
}

int earliest_time(int u, int v) {
    // Find the earliest time u and v are connected
    vector<pair<int, int>> pu, pv;
    pu.push_back({u, 0});
    pv.push_back({v, 0});
    int cu = u, cv = v;
    while (cu != parent[cu].first) {
        pu.push_back({parent[cu].first, parent[cu].second});
        cu = parent[cu].first;
    }
    while (cv != parent[cv].first) {
        pv.push_back({parent[cv].first, parent[cv].second});
        cv = parent[cv].first;
    }
    int ans = -1;
    for (ii tu: pu) {
        for (ii tv: pv) {
            if (tu.first == tv.first) {
                if (ans == -1) ans = max(tu.second, tv.second);
                else ans = min(ans, max(tu.second, tv.second));
            }
        }
    }
    return ans;
}

int main() {
    ios::sync_with_stdio(0); cin.tie(0);
    cin >> n >> m >> q;
    init(n);
    vector<tuple<int, int, int>> edges(m);
    for (int i = 0; i < m; ++i) {
        int u, v; cin >> u >> v;
        edges[i] = {i + 1, u, v}; // time, u, v
    }
    // Add edges in order
    for (auto [t, u, v] : edges) {
        union_set(u, v, t);
    }
    while (q--) {
        int u, v; cin >> u >> v;
        cout << earliest_time(u, v) << '\n';
    }
    return 0;
}
```

---

## Example Problem (MST): [CSES - Road Reparation](https://cses.fi/problemset/task/1675)

This is a classic MST problem. Given a weighted undirected graph, find the minimum cost to connect all nodes (or report IMPOSSIBLE if not possible).

**Key Points:**
- Use Kruskal's algorithm with DSU.
- If the number of edges used is not $n-1$, the graph is not connected.

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;
const int maxn = 1e5 + 5;
typedef pair<int, int> ii;
typedef pair<int, ii> iii;
vector<iii> edges;
int pset[maxn];
int sz[maxn];
int n, m;
int cnt = 0;
int cost = 0;

int find_set(int s) {
    if (s == pset[s]) return s;
    else return pset[s] = find_set(pset[s]);
}

void union_set(int u, int v) {
    u = find_set(u);
    v = find_set(v);
    if (u == v) return;
    if (sz[u] > sz[v]) swap(u, v);
    sz[v] += sz[u];
    pset[u] = v;
    sz[u] = 0;
}

void mst() {
    for (iii tmp : edges) {
        int w = tmp.first;
        int u = tmp.second.first;
        int v = tmp.second.second;
        if (find_set(u) == find_set(v)) continue;
        cnt++;
        cost += w;
        union_set(u, v);
    }
}

signed main() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        sz[i] = 1;
        pset[i] = i;
    }
    for (int i = 1; i <= m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        edges.push_back(iii(w, ii(u, v)));
    }
    sort(edges.begin(), edges.end());
    mst();
    if (cnt == n - 1) {
        cout << cost;
        return 0;
    }
    cout << "IMPOSSIBLE";
}
```

---

## Resources

- [USACO Guide: DSU](https://usaco.guide/plat/dsu?lang=cpp)
- [CP-Algorithms: Disjoint Set Union](https://cp-algorithms.com/data_structures/disjoint_set_union.html)
- [USACO Guide: MST](https://usaco.guide/plat/graph-mst?lang=cpp)
- [CP-Algorithms: MST](https://cp-algorithms.com/graph/mst_kruskal.html)

---

**Summary:**
- DSU is a powerful tool for connectivity and component tracking.
- Kruskal's algorithm uses DSU to efficiently build MSTs.
- Advanced DSU problems may require maintaining merge history instead of path compression.

Feel free to ask for more advanced examples or explanations!