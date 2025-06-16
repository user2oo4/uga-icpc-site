# Greedy Algorithms

<img src="https://p19-common-sign-sg.tiktokcdn-us.com/tos-alisg-p-0037/oUBCA5mDuiAADCHAE0iBwVfWIAGrwKMYAKYo8I~tplv-tiktokx-origin.image?dr=9636&x-expires=1750078800&x-signature=sjBC9Tzq7guWcXu41p3nEPiUDM0%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=55bbe6a9&idc=useast8" alt="Greedy meme" width="180" style="float:right; margin-left:1em; margin-bottom:1em;" />

Greedy algorithms build a solution step by step, always choosing the option that seems best at the moment—according to some value or priority function. The challenge is to find the right value function and to prove that making locally optimal choices leads to a globally optimal solution. This is often done by logical reasoning or by providing a counterexample if the greedy approach fails.

Let's explore some classic greedy problems and see how to reason about their correctness.

---

## Example 1: [CSES - Movie Festival](https://cses.fi/problemset/task/1629)

**Problem:** Given a list of events (start and end times), attend as many as possible without overlap.

A common mistake is to always pick the next event with the earliest start time. This can lead to missing out on shorter events that allow you to attend more overall. Instead, the optimal greedy strategy is to always pick the event with the earliest finish time that doesn't overlap with your current schedule.

**Why does this work?**
- By picking the event that ends earliest, you leave as much room as possible for future events.
- If you ever pick an event that ends later, you can always swap it for the earlier-ending one without losing any options for subsequent events.

**C++ Solution:**

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; cin >> n;
    vector<pair<int, int>> events(n);
    for (auto& [start, end] : events) cin >> start >> end;
    sort(events.begin(), events.end(), [](auto& a, auto& b) { return a.second < b.second; });
    int count = 0, last_end = 0;
    for (auto& [start, end] : events) {
        if (start >= last_end) {
            ++count;
            last_end = end;
        }
    }
    cout << count << '\n';
}
```

---

## Example 2: [CSES - Tasks and Deadlines](https://cses.fi/problemset/task/1630)

**Problem:** Given $n$ tasks, each with a duration and a deadline, schedule all tasks (in any order) to maximize the total reward, where the reward for a task is $(\text{deadline} - \text{finish time})$ (can be negative).

**Solution:**
- The total reward is maximized by finishing shorter tasks first. This is because each task's duration is subtracted from the reward of all subsequent tasks.
- Sort tasks by duration (ascending) and process them in that order.

**Reward Formula:**

If you process the tasks in order $t_1, t_2, \ldots, t_n$ with durations $d_1, d_2, \ldots, d_n$ and deadlines $D_1, D_2, \ldots, D_n$, then the total reward is:

$$
(D_1 - t_1) + (D_2 - t_1 - t_2) + (D_3 - t_1 - t_2 - t_3) + \ldots + (D_n - t_1 - t_2 - \ldots - t_n)
$$

This simplifies to:

$$
\text{Total reward} = (D_1 + D_2 + \ldots + D_n) - (n \cdot t_1 + (n-1) \cdot t_2 + \ldots + t_n)
$$

So, to maximize the reward, you want to do shorter tasks first (minimize the weighted sum of durations).

**C++ Solution:**

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; cin >> n;
    vector<pair<long long, long long>> tasks(n); // {duration, deadline}
    for (auto& [d, t] : tasks) cin >> d >> t;
    sort(tasks.begin(), tasks.end());
    long long time = 0, reward = 0;
    for (auto& [d, t] : tasks) {
        time += d;
        reward += t - time;
    }
    cout << reward << '\n';
}
```

---

## When Greedy Fails

Not every problem can be solved greedily. For example:
- **Coin Change:** Greedy works for standard coin systems (like US currency), but fails for arbitrary denominations. For coins [1, 3, 7, 8], to make 10, greedy gives 8+1+1, but 7+3 is better.
- **Knapsack:** The classic 0/1 knapsack problem is not greedy; it requires dynamic programming.

**How to tell?**
- Try to prove your greedy choice is always safe (exchange argument, induction, etc.).
- If you can find a counterexample, greedy fails.
- Greedy is often correct when the problem has large input limits and can be solved by sorting or picking the best option at each step.

If in doubt, try dynamic programming first. Sometimes, while working on a DP solution, you may discover a greedy strategy that always produces the optimal result.