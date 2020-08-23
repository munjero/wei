---
title: First-class Predicate
subtitle: An Introduction to Mm.
---

*August 27, 2015*

Last week I talked about
[implementing a logic programming language inside another logic programming language](https://git.beyond.codes/talks/20150813-meta-logic-programming/plain/presentation.pdf)
and introduced [mm](https://git.beyond.codes/mm/). Thanks to the
able-to-run-backward feature of logic programming languages, you can query not
only variables, but also properties. In this way, you can query things like
"what predicate has the property that X equals to 1". However, in that language
(called 'mm'), predicates are still not first-class. You can query properties
**outside** the language, but inside the language, still what you can do is only
to query variables. However, there's a simple trick to improve 'mm' with
first-class predicate.

Recall that in order to make a logic programming language, you only need
four kinds of predicates. The first is called `eq`, which is the
essential of a logic programming language. `eq` accepts two arguments,
they can either be a ground value or a variable (represented as
`(variable x)`). For every `eq` predicate, the compiler will try to
unify it, resulting in a new substitution with the unified things in
mind, and "succeeds". If the two arguments cannot be unified, for
example, `(eq 1 2)`, it "fails".

The second and third predicate are `conj` and `disj`. They also accept
two arguments, but this time, all of them should be another predicate.
`conj` succeeds when both of its arguments succeed, and `disj` succeeds
when either of its arguments succeeds. The fourth predicate is `fresh`,
which creates a new "fresh" variable.

In order to make predicate first-class, we first need to find a data
representation of it. Here in `mm` we represent predicate as list, whose
first item should be the name of the predicate, followed by the
arguments of the predicate.

~~~ clojure
(eq (variable x) 1)
(conj (eq (variable x) 1) (eq 2 2))
(disj (conj (eq (variable x) 1) (eq 2 2)) (eq 3 3))
~~~

There are several places that fits naturally for the data, namely the
arguments of `conj` and `disj`. Thus we only need to make `conj` and
`disj` accept not only predicate, but also variable. In this way, if I
want to get a predicate first as data and then "declare" it, I just need
to do:

~~~ clojure
(conj
  (eq (variable x) (eq 1 1))
  (conj (variable x) (variable x)))
~~~

Variable `x` is set to `(eq 1 1)` first, which is merely a list, and
then in the third line `(conj (variable x) (variable x))` "declare"
`(eq 1 1)` by setting it as both of the arguments of `conj`. `conj`
succeeds when both of its arguments succeed, so `(conj p p)` is simply
`p`.

## Recursion

I showed about how to implement recursion in `mm` last time by using
"patterns". However, now, with first-class predicate, we can now avoid
it and do recursion **without cheating**! Here's the definition of
never:

~~~ clojure
(conj
  (== (variable i) (conj (variable i) (variable i)))
  (conj (variable i) (variable i)))
~~~

The second line tells the compiler that there's a variable `i` which
should be equal to `(conj (variable i) (variable i))`. The compiler will
then execute the inner `(variable i)` to figure out the outer value, and
so forth, and so on. However, with only the second line the compiler
will still return since the language is **lazy**. So we have the third
line to treat variable `i` as a predicate to trigger the recursion. As
expected, this `never` will **never** return.

## Implementation

First-class predicate is implemented on top of `mm`. We take the
implementation of `disj` as an example. The original implementation is
rather straightforward:

~~~ clojure
(conde
  [(runo* s1 pattern-assoc parent substitution)]
  [(runo* s2 pattern-assoc parent substitution)])
~~~

We use `conde` to dispatch two possibilities. If either of the
possibilities succeed, we return a substitution.

With first-class predicate, we need to check whether any of the
arguments are variables. Thus we wrap the original code with another
`conde`:

~~~ clojure
(conde
  [(varo s1) (varo s2) ...]
  [(varo s1) (not-varo s2) ...]
  [(not-varo s1) (varo s2) ...]
  [(not-varo s1) (not-varo s2)
   (conde
     [(runo* s1 pattern-assoc parent substitution)]
     [(runo* s2 pattern-assoc parent substitution)])])
~~~

If any of the argument is a variable, we unify it with an "imaginary"
predicate, and execute that predicate instead, for example:

~~~ clojure
(conde
  [(varo s1) (varo s2)
   (fresh [p1 p2 intermediate]
    (conde
     [(unifyo p1 s1 parent intermediate)
      (runo* p1 pattern-assoc intermediate substitution)]
     [(unifyo p2 s2 parent intermediate)
      (runo* p2 pattern-assoc intermediate substitution)]))]])
~~~

We also need to make patterns support variables:

~~~ clojure
(conde
  [(varo s1)
   (== s1 o1)]
  [(not-varo s1)
   (applyo s1 pattern-assoc params o1)]
~~~
