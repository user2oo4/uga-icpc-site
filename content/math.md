# Math

## Modular Arithmetic

Modular arithmetic is a system of arithmetic for integers, where numbers "wrap around" after reaching a certain value—the modulus. It is fundamental in competitive programming, especially for problems involving large numbers, combinatorics, or cryptography.

### Binary Exponentiation

Binary exponentiation (also called fast exponentiation) efficiently computes $a^b \bmod m$ in $O(\log b)$ time.

```cpp
// Computes a^b mod m
typedef long long ll;
ll binpow(ll a, ll b, ll m) {
    a %= m;
    ll res = 1;
    while (b > 0) {
        if (b & 1) res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}
```

### Modular Inverse (Fermat's Little Theorem)

The modular inverse of $a$ modulo $m$ is a number $x$ such that $a \cdot x \equiv 1 \pmod{m}$. If $m$ is prime, the inverse is $a^{m-2} \bmod m$ (by Fermat's Little Theorem):

```cpp
// Computes modular inverse of a mod m (m must be prime)
ll modinv(ll a, ll m) {
    return binpow(a, m - 2, m);
}

ll moddiv(ll a, ll b, ll m) {
    return a * modinv(b, m) % m; // (a / b) mod m
}
```

- For non-prime $m$, use the extended Euclidean algorithm.

---

## Combinatorics

### nCr (Binomial Coefficient)

The binomial coefficient $\binom{n}{r}$ counts the number of ways to choose $r$ objects from $n$ objects. It is computed as:

$$
\binom{n}{r} = \frac{n!}{r!(n-r)!}
$$

In modular arithmetic, precompute factorials and inverses:

```cpp
const int N = 1e5+5, MOD = 1e9+7;
ll fact[N], inv[N];

ll binpow(ll a, ll b, ll m) {
    ll res = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}

void precompute() {
    fact[0] = 1;
    for (int i = 1; i < N; i++) fact[i] = fact[i-1] * i % MOD;
    inv[N-1] = binpow(fact[N-1], MOD-2, MOD);
    for (int i = N-2; i >= 0; i--) inv[i] = inv[i+1] * (i+1) % MOD;
}

ll nCr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] * inv[r] % MOD * inv[n-r] % MOD;
}
```

### Why?
- Count number of ways to choose teams, subsets, arrangements, etc.
- Used in probability, DP, and many counting problems.

---

## Primes & Divisibility

### Sieve of Eratosthenes

The Sieve of Eratosthenes efficiently finds all primes up to $n$ in $O(n \log \log n)$ time.

```cpp
const int N = 1e6+5;
bool is_prime[N];

void sieve() {
    fill(is_prime, is_prime+N, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i < N; i++) {
        if (is_prime[i]) {
            for (int j = 2*i; j < N; j += i) is_prime[j] = false;
        }
    }
}
```

### GCD/LCM

Greatest Common Divisor (GCD) and Least Common Multiple (LCM) are fundamental for divisibility and number theory problems.

```cpp
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int lcm(int a, int b) {
    return a / gcd(a, b) * b;
}
```

### Why? (What kind of problems do we need these in?)
- Modular arithmetic: to avoid overflow, reduce fractions, or solve congruences.
- Combinatorics: counting, arrangements, and probability.
- Primes: factorization, cryptography, and divisibility.
- GCD/LCM: problems involving cycles, periods, or synchronization.

## Further Reading
- [CP-Algorithms: Modular Arithmetic](https://cp-algorithms.com/algebra/module-inverse.html)
- [USACO Guide: Modular Arithmetic](https://usaco.guide/plat/modular?lang=cpp)
- [CP-Algorithms: Sieve of Eratosthenes](https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html)
- [USACO Guide: Combinatorics](https://usaco.guide/plat/combinatorics?lang=cpp)
- [CP-Algorithms: GCD, LCM](https://cp-algorithms.com/math/gcd.html)
