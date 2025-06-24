# Two Pointers and Sliding Window

## Resources
- [USACO Guide: Two Pointers](https://usaco.guide/silver/two-pointers?lang=cpp)
- [Codeforces EDU: Two Pointers/Sliding Window](https://codeforces.com/edu/course/2/lesson/9)
- [USACO Guide: Sliding Window](https://usaco.guide/gold/sliding-window?lang=cpp)

---

The two pointers and sliding window techniques are powerful tools for solving problems involving subarrays or substrings, especially when you need to efficiently process all contiguous segments that satisfy certain conditions.

- **Two pointers**: Maintain two indices (pointers) that represent the current segment. Move them according to the problem's constraints.
- **Sliding window**: A special case of two pointers where the window expands and contracts to maintain a property (e.g., sum, count, etc.).

Both techniques often yield $O(N)$ solutions for problems that would otherwise require $O(N^2)$ brute force.

---

## Example Problem 1 (Two Pointers): [Books (Codeforces 279B)](https://codeforces.com/contest/279/problem/B)

**Problem:**
Find the longest contiguous segment of books that can be read within $t$ minutes.

**Approach:**
- Use two pointers, `left` and `right`, to represent the current segment.
- For each `left`, move `right` as far as possible while the total time does not exceed $t$.
- Track the maximum segment size found.
- After incrementing `left`, decrease the current sum accordingly. The `right` pointer never moves leftwards, so both pointers move at most $N$ times, yielding $O(N)$ time complexity.

---

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, t, ans = 0;
    cin >> n >> t;
    vector<int> books(n);
    for (int i = 0; i < n; i++) cin >> books[i];

    int left = 0, right = 0, cur = 0;
    while (left < n && right < n) {
        // Expand right as far as possible
        while (right < n) {
            cur += books[right++];
            if (cur > t) {
                cur -= books[--right];
                break;
            }
        }
        ans = max(ans, right - left);
        cur -= books[left++];
    }
    cout << ans;
}
```

---

This method is widely applicable for problems involving subarrays or substrings with sum, count, or other constraints.

## Sliding Window

The sliding window technique is a specialized form of the two pointers method. While both use two indices to represent a segment of the array, sliding window problems typically involve maintaining a window that satisfies a certain property (such as a sum, count, or frequency) as you move through the array.

- **Sliding window**: The window expands (right pointer moves right) to include new elements, and contracts (left pointer moves right) to remove elements, always maintaining a valid segment according to the problem's constraints.
- **Two pointers**: More general; both pointers can move independently and are not always adjacent. Used for a wider variety of segment problems, not just those with a "window" property.

**Comparison:**
- Sliding window is usually used when you need to process all subarrays/substrings of a certain type (e.g., all subarrays with sum ≤ $k$).
- Two pointers is more general and can be used for problems where the segment may not always be contiguous or where both pointers need to move in more complex ways.

Sliding window is often easier to implement and reason about when the segment must always be valid as you move through the array.

## Example Problem 2: [CSES - Playlist](https://cses.fi/problemset/task/1141)

**Problem:**
Find the length of the longest subarray with all distinct values (i.e., the longest segment of unique songs in a playlist).

**Solution:**
- Use a sliding window with two pointers and a set to keep track of the current unique elements.
- Expand the right pointer as long as the next element is not in the set.
- Update the answer with the current window size.
- Remove the leftmost element from the set as you move the left pointer forward.
- Each element is inserted and removed from the set at most once, so the solution is $O(N)$.

```cpp
#include <iostream>
#include <set>
using namespace std;

int n, ans = 0;
set<int> s;
int a[200000];

int main() {
    int r = -1;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) {
        while (r < n - 1 && !s.count(a[r + 1])) s.insert(a[++r]);
        ans = max(ans, r - i + 1);
        s.erase(a[i]);
    }
    cout << ans;
}
```