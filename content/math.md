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
    return a * modinv(b, m) % mod; // (a / b) mod m
}
```

- For non-prime $m$, use the extended Euclidean algorithm.

---

## Further Reading
- [CP-Algorithms: Modular Arithmetic](https://cp-algorithms.com/algebra/module-inverse.html)
- [USACO Guide: Modular Arithmetic](https://usaco.guide/plat/modular?lang=cpp)
