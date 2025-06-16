# Introduction to Graphs & Graph Traversal

## Resources

- [CS Academy: Introduction to Graphs](https://csacademy.com/lesson/introduction_to_graphs) *(interactive)*
- [CS Academy: Graph Representation](https://csacademy.com/lesson/graph_representation) *(interactive)*
- [CS Academy: Depth First Search](https://csacademy.com/lesson/depth_first_search) *(interactive)*
- [CS Academy: Breadth First Search](https://csacademy.com/lesson/breadth_first_search) *(interactive)*

---

## Depth First Search (DFS) and Breadth First Search (BFS)

The interactive slides linked above are excellent for building intuition about DFS and BFS. The key difference is that DFS explores as far as possible along each branch before backtracking, while BFS explores all neighbors at the current depth before moving deeper. As a result, BFS visits vertices in order of their distance from the source.

For implementation, DFS is most naturally written recursively: you keep visiting unvisited nodes as you go deeper, forming a DFS tree that records the order of traversal. This is especially useful for problems on trees (connected graphs with $n$ vertices and $n-1$ edges). Here is a typical DFS implementation:

```cpp
void dfs(int v) {
    visited[v] = 1; // mark v as visited
    for (int u: AdjList[v]) {
        if (!visited[u]) {
            dfs(u);
        }
    }
}
```

BFS, on the other hand, uses a queue to ensure nodes are visited in order of increasing distance from the source. This makes BFS ideal for finding shortest paths in unweighted graphs, since the first time you reach a node, you have found the shortest path to it. Here is a standard BFS implementation:

```cpp
void bfs(int s) {
    visited[s] = 1;
    dist[s] = 0; // distance to source
    queue<int> q;
    q.push(s);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v: AdjList[u]) {
            if (!visited[v]) {
                visited[v] = 1;
                dist[v] = dist[u] + 1; // update distance
                q.push(v);
            }
        }
    }
}
```

## Example Problem 1: [CSES - Building Roads](https://cses.fi/problemset/task/1666)

Find the minimum number of roads needed to connect all cities. This is a classic connected components problem.

<details>
<summary>DFS Solution (C++)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxN = 1e5 + 5;

vector<int> AdjList[maxN];
bool vis[maxN]; // visited boolean
int n, m;

void dfs(int s) {
    vis[s] = true;
    for (int u: AdjList[s]) {
        if (vis[u]) continue;
        dfs(u);
    }
}

signed main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    cin >> n >> m;
    for (int i = 0 ; i < m ; i++) {
        int u, v;
        cin >> u >> v;
        AdjList[u].push_back(v);
        AdjList[v].push_back(u);
    }
    vector<int> components;
    for (int i = 1 ; i <= n ; i++) {
        if (!vis[i]) {
            dfs(i);
            components.push_back(i);
        }
    }
    int sz = (int)components.size();
    cout << sz - 1 << endl;
    for (int i = 0 ; i < sz - 1 ; i++) {
        cout << components[i] << ' ' << components[i + 1] << endl;
    }
}
```
</details>

<details>
<summary>BFS Solution (C++)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxN = 1e5 + 5;

vector<int> AdjList[maxN];
bool vis[maxN]; // visited boolean
int n, m;

void bfs(int s) {
    queue<int> q;
    vis[s] = true;
    q.push(s);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v: AdjList[u]) {
            if (vis[v]) continue;
            vis[v] = true;
            q.push(v);
        }
    }
}

signed main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    cin >> n >> m;
    for (int i = 0 ; i < m ; i++) {
        int u, v;
        cin >> u >> v;
        AdjList[u].push_back(v);
        AdjList[v].push_back(u);
    }
    vector<int> components;
    for (int i = 1 ; i <= n ; i++) {
        if (!vis[i]) {
            bfs(i);
            components.push_back(i);
        }
    }
    int sz = (int)components.size();
    cout << sz - 1 << endl;
    for (int i = 0 ; i < sz - 1 ; i++) {
        cout << components[i] << ' ' << components[i + 1] << endl;
    }
}
```
</details>

---

## Example Problem 2: [CSES - Counting Rooms](https://cses.fi/problemset/task/1192)

This problem uses a technique called floodfill (BFS or DFS on a 2D grid). Many grid problems require calculating the number of connected components or shortest distances. Here, we only need to count the number of rooms (connected components), so either DFS or BFS works.

<details>
<summary>Floodfill Solution (C++)</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;

const int maxN = 2500;
const int R_CHANGE[4] = {0, 1, 0, -1};
const int C_CHANGE[4] = {1, 0, -1, 0};

int row_num;
int col_num;
string building[maxN];
bool visited[maxN][maxN];

void floodfill(int r, int c) {
	queue<pair<int, int>> q;
	q.push({r, c});
	while (!q.empty()) {
		r = q.front().first;
		c = q.front().second;
		q.pop();

		if (r < 0 || r >= row_num || c < 0 || c >= col_num || building[r][c] == '#' || visited[r][c]) continue;

		visited[r][c] = true;
		for (int i = 0; i < 4; i++) {
			q.push({r + R_CHANGE[i], c + C_CHANGE[i]});
		}
	}
}

int main() {
	cin >> row_num >> col_num;
	for (int i = 0; i < row_num; i++) { cin >> building[i]; }

	int room_num = 0;
	for (int i = 0; i < row_num; i++) {
		for (int j = 0; j < col_num; j++) {
			if (building[i][j] == '.' && !visited[i][j]) {
				floodfill(i, j);
				room_num++;
			}
		}
	}
	cout << room_num << endl;
}
```
</details>

## Shortest Path Problems

### Unweighted Graphs

- Use **BFS** for shortest paths in unweighted graphs.
- BFS maintains the order of distances using a queue: all nodes at distance $d$ are processed before any at $d+1$.
- If edges have weights 0 or 1, use a **deque**: push nodes to the front if traversing a 0-weight edge, to the back for a 1-weight edge (see 0-1 BFS below).
- For multiple sources, initialize the queue with all sources; BFS still works since the order of distances is preserved.
- Complexity: $O(n + m)$

#### 0-1 BFS Example (C++)

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxN = 1e5 + 5;
vector<pair<int, int>> AdjList[maxN]; // (neighbor, edge weight 0 or 1)
int dist[maxN];

void zero_one_bfs(int s, int n) {
    deque<int> dq;
    fill(dist, dist + n + 1, INT_MAX);
    dist[s] = 0;
    dq.push_front(s);
    while (!dq.empty()) {
        int u = dq.front(); dq.pop_front();
        for (auto [v, w] : AdjList[u]) {
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                if (w == 0) dq.push_front(v);
                else dq.push_back(v);
            }
        }
    }
}
```

---

### Weighted Graphs (Positive Weights)

- Use **Dijkstra's Algorithm** for shortest paths when all edge weights are positive.
- Dijkstra uses a priority queue to always expand the node with the smallest current distance.
- Always check if the current distance is better before updating.
- Complexity: $O((n + m) \log n)$

#### Dijkstra Example (C++)

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxN = 1e5 + 5;
vector<pair<int, int>> AdjList[maxN]; // (neighbor, weight)
int dist[maxN];

void dijkstra(int s, int n) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    fill(dist, dist + n + 1, INT_MAX);
    dist[s] = 0;
    pq.push({0, s});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : AdjList[u]) {
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}
```

---

### Negative Weights & All-Pairs

- If there are **negative edge weights** (but no negative cycles), use **Bellman-Ford** ($O(nm)$):
    - Repeatedly relax all edges up to $n-1$ times.
    - Can detect negative cycles if a distance improves on the $n$-th iteration.
- For **all-pairs shortest paths**, use **Floyd-Warshall** ($O(n^3)$):
    - Handles negative weights (no negative cycles).
    - See: [Floyd-Warshall Algorithm (Wikipedia)](https://en.wikipedia.org/wiki/Floyd–Warshall_algorithm)

#### Bellman-Ford Example (C++)

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxN = 1e5 + 5;
vector<tuple<int, int, int>> edges; // (u, v, weight)
int dist[maxN];

void bellman_ford(int s, int n) {
    fill(dist, dist + n + 1, INT_MAX);
    dist[s] = 0;
    for (int i = 1; i <= n - 1; ++i) {
        for (auto [u, v, w] : edges) {
            if (dist[u] != INT_MAX && dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
            }
        }
    }
    // Optional: check for negative cycles
    for (auto [u, v, w] : edges) {
        if (dist[u] != INT_MAX && dist[v] > dist[u] + w) {
            cout << "Negative cycle detected!\n";
        }
    }
}
```

---

**Summary Table:**

| Graph Type                | Algorithm         | Complexity      |
|--------------------------|-------------------|-----------------|
| Unweighted                | BFS               | $O(n + m)$      |
| 0/1 Weights               | 0-1 BFS (deque)   | $O(n + m)$      |
| Positive Weights          | Dijkstra          | $O((n+m)\log n)$|
| Negative Weights          | Bellman-Ford      | $O(nm)$         |
| All-Pairs (no neg. cycle) | Floyd-Warshall    | $O(n^3)$        |

For more, see [CP-Algorithms: Shortest Paths](https://cp-algorithms.com/graph/shortest_path.html).