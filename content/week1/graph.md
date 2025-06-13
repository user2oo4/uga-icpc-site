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

---

> **Extra Practice:**
> - [CSES - Labyrinth (commented out)](https://cses.fi/problemset/task/1193)

---