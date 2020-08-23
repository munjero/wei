---
title: Inductive Logic Programming in microkanren-in-minikanren
subtitle: Implementing inductive logic programming by implementing a logic programming language in a logic programming language.
---

*September 10, 2015*

It is possible to do **Inductive Logic Programming** in
[mm](https://git.that.world/mm.git/) (a logic programming language implemented
in miniKanren) without any help from external libraries.

**Inductive Logic Programming** is a sub-field of **Machine Learning**.
Given some positive and negative examples, together with the necessary
background knowledge, it tries to form a valid hypothesis about what the
examples mean. For instance, given the example that 'Tom is a person' (a
positive example), 'Alice is a person' (another positive example), and
'Bailey is not a person' (a negative example), a valid hypothesis would
be 'a person is anything that is either Tom or Alice', and the above
sentence would be a possible **meaning** for the world 'person' in this
context.

Unlike Prolog, there is no distinction between **facts** and
**relations** in miniKanren. **Predicates** (or in standard miniKanren
language, **relations**) are the only type of things that exist. In
**mm**, we represent and store meanings in predicates themselves. In
order to indicate that the interpreter knows the meaning, we say that
the interpreter possesses the corresponding **pattern**. For example, in
order to make `(person Tom)` a valid predicate in mm, we have the
pattern as follows:

~~~ scheme
(pattern ((param x))
  (disj (== (param x) Tom)
        (== (param x) Alice)))
~~~

We execute the above program with the code as follows (with a miniKanren
implementation):

~~~ scheme
(run 1 (q)
  (runo '()
        '(person Tom)
        '((person (pattern ((param x))
                    (disj (== (param x) Tom)
                          (== (param x) Alice)))))
        q))
~~~

The first argument of `runo` contains all the variables we want to
query. Since we are not querying anything, here we write the empty list
`()`. The second argument is the actual predicate `(person Tom)`. The
third argument is a association list containing the pattern `person`.
And the fourth argument is the result. Here the predicate should execute
successfully and since we are not querying anything, it should return
with result `()`.

Because the interpreter itself runs backwards, we can induct the pattern
(or call it **meaning** as above) given several examples:

~~~ scheme
(run 1 (q)
  (runo '() '(person Tom) q '())
  (runo '() '(person Alice) q '())
  (runo '() '(person Bailey) q #f))
~~~

In the second and third line we say that `(person Tom)` and
`(person Alice)` should be valid predicates, and in the forth line we
say that `(person Bailey)` should not.

The above code may take very long time to compute because \`mm\` is not
specifically designed for logic inductive programming. However, we can
give the program some hints to make it return:

~~~ scheme
(run 1 (q)
  (fresh (eq2 eq3 eq4)
    (== q `((person (pattern ((param x))
                      (disj (== (param x) ,eq2)
                            (== ,eq3 ,eq4))))))
    (runo '() '(person Tom) q '())
    (runo '() '(person Alice) q '())
    (runo '() '(person Bailey) q #f)))
~~~

We tell the interpreter that the pattern `person` should be a
disjunction with two '=='s, in which the first argument of the first
'==' should be `(param x)`. With the above hint, we get the first result
with exactly what we mean by `person` in this context:

~~~ scheme
((person (pattern (param x)
           (disj (== (param x) Alice)
                 (== (param x) Tom)))))
~~~

Note that the above inductive programming example relies only on the
'mm' miniKanren interpreter with out any external library.
