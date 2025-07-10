bool binarySearch(int target) {

# Binary Search

Binary search is a method to efficiently find a value that satisfies a condition by repeatedly testing the middle of the search range, and narrowing the range by half each iteration. At each step, checking the middle tells us valuable information about which side the answer lies. Because we divide the search space by 2 every step, the runtime of binary search is only $O(\log N)$.

---

## How fast is $\log N$?

- Say our search space was 1 to **1 billion** ($10^9$). Binary search would give us a result in $\leq 30$ operations (since $\log_2(10^9) \approx 30$).
- Say our search space was 1 to **1 quintillion (1 billion billion, $10^{18}$)**. Binary search would give us a result in $\leq 60$ operations (since $\log_2(10^{18}) \approx 60$).

> Imagine if we had to do complete search $O(N)$ over that space!

---

## The Classic Example

Assume we had a sorted array with $N$ numbers anywhere from 1 to 1 billion. How can we efficiently check if a number exists in the array?

While going through every element would take $O(N)$ time, we can accomplish this in $O(\log N)$ time with binary search.

```cpp
int arr[N];

bool binarySearch(int target) {
    int left = 0, right = N - 1;
    while (left <= right) {
        int mid = (right + left) / 2;
        if (arr[mid] == target) {
            return true;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
}
```

---

## Why does this work?

We are trying to find if $\text{target}$ is in our array. Our search space starts from index $0$ to $N - 1$.

Now, we check the middle index:

- If $\text{arr[mid]} < \text{target}$, we know that $\text{target}$ must be somewhere **after** $\text{mid}$. So we set $\text{left} = \text{mid} + 1$.
- If $\text{arr[mid]} > \text{target}$, we know that $\text{target}$ must be **before** $\text{mid}$. So we set $\text{right} = \text{mid} - 1$.

By doing this, we are cutting our search space in half at each iteration.

Eventually, either:

* We find $\text{arr[mid]} == \text{target}$, and return `true`.
* Or, the search space becomes empty (i.e., $\text{left} > \text{right}$), and we return `false`.

> **Think:** Would this work if the array is not sorted?

---

We can apply this general binary search idea to many different problems — even when we aren’t explicitly given an array to search on. Let’s try some problems.

---

# Problem: [Factory Machines - CSES](https://cses.fi/problemset/task/1620/)

Read the problem before taking a look at the solution.

---

### Hints

* Given a certain time limit $x$, can you determine if we can make $t$ products?
* Can we brute force / complete search to find the solution? Yes — but this will be too slow, since $t$ can be very large (more than 1 billion).
* We can use binary search on an arbitrarily large search range (using `long long` as integer type).

> **Think:** What does each `mid` check / guess tell us about the search space?
> If there was a time limit where we could make $t$ products, what does that mean for the current search range?
> What if we couldn’t?

---

### Solution

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n, t;
const int N = 2e5 + 5;
int machines[N] = {};

bool check(int time) {
    int products = 0;

    for (int i = 0; i < n; i++) {
        products += (time / machines[i]);
        if (products >= t) return true;
    }

    return false;
}

signed main() {
    cin >> n >> t;

    for (int i = 0; i < n; i++) {
        cin >> machines[i];
    }

    int l = 1, r = 1e18;
    while (l < r) {
        int mid = (l + r) / 2;
        if (check(mid)) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }

    cout << r << endl;
}
```

---

## Why binary search here?

The complete search would take $10^{18} \times N$ time, but binary search reduces that to $N \times \log(10^{18})$.

Assuming we can make $10^9$ (1 billion) operations per second on an average computer:

* $10^{18}$ operations would take **32 years**.
* Binary search reduces this down to just **60 operations** (since $\log_2(10^{18}) \approx 60$).

---

## Key Observations

* It's trivial to check if we can make $t$ items under $x$ seconds.
* Each check gives us information about the search space:

  * If we **cannot** make $t$ items under $x$ seconds, then $x$ is too small. So we move the lower bound up: $l = \text{mid} + 1$.
  * If we **can** make $t$ items under $x$ seconds, then $x$ may be the answer, but there might be a smaller valid $x$. So we move the upper bound down: $r = \text{mid}$.

The graph of the check function over the search space looks something like this:

![alt text](image-1.png)

> **Think:**
> Why do we do $r = \tex$$t{mid}$ when we can make $t$ items, but $l = \text{mid} + 1$ when we can't?
