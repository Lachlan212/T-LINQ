# LINQ-style TS Library – Implementation Tracker

This document tracks the **minimum viable LINQ feature set** for the TypeScript/JavaScript implementation.
The goal is to capture **LINQ-to-Objects semantics**, not just functional helpers.

---

## 1. Core Sequence Abstraction

> Everything builds on this.

- [x] `from(source)` entry point
- [x] Accepts any `Iterable<T>`
- [x] Returns a reusable sequence wrapper (not a one-shot iterator)
- [x] Lazy execution via generators
- [x] Multiple enumeration behaves consistently
- [x] Clear distinction between:
    - [x] Intermediate operators (lazy)
    - [x] Terminal operators (eager)

---

## 2. Filtering & Projection

> The backbone of all queries.

- [x] `Where(predicate)`
- [x] `Where(predicate, index)`
- [x] `Select(selector)`
- [x] `Select(selector, index)`
- [x] `SelectMany(selector)`
- [x] `SelectMany(selector, resultSelector?)`

---

## 3. Ordering (Multi-Key & Stable)

> One of the most “LINQ-defining” features.

- [x] `OrderBy(keySelector)`
- [x] `OrderByDescending(keySelector)`
- [ ] `ThenBy(keySelector)`
- [ ] `ThenByDescending(keySelector)`
- [x] Stable ordering guaranteed
- [x] Deferred execution until enumeration
- [ ] Buffering behavior documented

---

## 4. Grouping

> Enables most analytical queries.

- [x] `GroupBy(keySelector)`
- [x] `GroupBy(keySelector, elementSelector)`
- [x] `Grouping<TKey, TElement>` abstraction
    - [x] `.key`
    - [x] iterable values
- [x] Preserve insertion order of groups
- [x] `ToLookup(keySelector)` (indexable grouping)
- [x] `lookup.get(key)` returns empty sequence when missing

---

## 5. Set & Equality-Based Operations

> Requires a clear equality/key story in JS.

- [ ] `Distinct()`
- [ ] `DistinctBy(keySelector)`
- [ ] `Union(other)`
- [ ] `Intersect(other)`
- [ ] `Except(other)`
- [ ] Custom equality or key-based comparison strategy documented

---

## 6. Joining Sequences

> Critical for relational-style querying.

- [ ] `Join(inner, outerKeySelector, innerKeySelector, resultSelector)`
- [ ] `GroupJoin(inner, outerKeySelector, innerKeySelector, resultSelector)`
- [ ] Efficient lookup-based implementation
- [ ] Key selector–based equality

---

## 7. Partitioning & Flow Control

> Enables safe streaming and infinite sequences.

- [ ] `Take(count)`
- [ ] `Skip(count)`
- [ ] `TakeWhile(predicate)`
- [ ] `SkipWhile(predicate)`
- [ ] `Concat(other)`
- [ ] `Append(element)`
- [ ] `Prepend(element)`

---

## 8. Quantifiers & Aggregation (Terminal)

> Short-circuiting correctness matters.

- [x] `Any(predicate?)`
- [x] `All(predicate)`
- [x] `Count(predicate?)`
- [x] `Sum(selector?)`
- [x] `Average(selector?)`
- [x] `Min(selector?)`
- [ ] `Max(selector?)`
- [ ] `Aggregate(seed?, accumulator, resultSelector?)`

---

## 9. Element Operators (Correct Semantics)

> Error behavior must be consistent and predictable.

- [x] `First(predicate?)`
- [x] `FirstOrDefault(predicate?)`
- [x] `Single(predicate?)`
- [x] `SingleOrDefault(predicate?)`
- [ ] `Last(predicate?)`
- [ ] `LastOrDefault(predicate?)`
- [ ] `ElementAt(index)`
- [ ] `ElementAtOrDefault(index)`
- [ ] Throw vs `undefined` behavior explicitly documented

---

## 10. Materialization & Conversion

> Explicit boundaries between lazy and eager.

- [x] `ToArray()`
- [x] `ToSet()`
- [ ] `ToMap(keySelector, valueSelector)`
- [ ] `ToObject(keySelector, valueSelector)`
- [ ] `DefaultIfEmpty(defaultValue?)`
- [ ] `AsEnumerable()` / identity wrapper

---

## 11. Generation Helpers

> Enables pure LINQ pipelines without arrays.

- [ ] `Range(start, count)`
- [ ] `Repeat(value, count)`
- [ ] `Empty<T>()`
- [ ] `Singleton(value)`

---

## 12. Execution & Performance Guarantees

> Trust comes from predictability.

- [ ] Streaming vs buffering behavior documented per operator
- [ ] Short-circuiting operators stop enumeration early
- [ ] No hidden eager execution in intermediate operators
- [ ] Safe behavior with infinite sequences

---

## 13. Developer Ergonomics

> Makes the library pleasant to use.

- [ ] Full TypeScript type inference
- [ ] Indexed overloads where applicable
- [ ] Chainable fluent API
- [ ] Interop with native `Iterable<T>`
- [ ] Clear naming parity with .NET LINQ

---

## Out of Scope (For Now)

Explicitly **not implemented yet**, but planned:

- Async LINQ (`AsyncIterable<T>`)
- Memoization / caching operators
- Query providers / expression translation
- Rx-style observables
- Parallel execution
