---
title: Pivot Table in miniKanren
subtitle: Pivoting Backwards.
---

*February 11, 2016*

Pivot table is a way to get summarized data in a spreadsheet or other data
processing programs. Here's a short introduction of pivot table on
[Wikipedia](https://en.wikipedia.org/wiki/Pivot_table):

> For typical data entry and storage, data usually appear in flat tables,
> meaning that they consist of only columns and rows, as in the following
> example showing data on shirt types:
>
> ![Flat table](Pivottable-Flatdata.png)
> 
> While tables such as these can contain many data items, it can be difficult to
> get summarized information from them. A pivot table can help quickly summarize
> the data and highlight the desired information. The usage of a pivot table is
> extremely broad and depends on the situation. The first question to ask is,
> "What am I seeking?" In the example here, let us ask, "How many Units did we
> sell in each Region for every Ship Date?"
>
> ![Pivot table](Pivottable-Pivoted.png)
>
> A pivot table usually consists of row, column and data (or fact) fields. In
> this case, the column is Ship Date, the row is Region and the datum we would
> like to see is (sum of) Units. These fields allow several kinds of
> aggregations, including: sum, average, standard deviation, count, etc. In this
> case, the total number of units shipped is displayed here using a sum
> aggregation.

Recently, I tried to build a substitute version of `pivot` in a logic
programming language called miniKanren. The resulting program is capable of
running backwards -- given a summarized data, the function could try to guess
the original raw data.

## Functional Logic Programming

miniKanren, in its *pure* form, only provides a few functions
(read about it in
[a previous Thursdays post](/thursdays/13-tic-tac-toe-minikanren/)). It tries to
be *mini*, while preserving all important features of a logic programming
language. This is great, but with one particular drawback, that *in miniKanren,
predicates, the things that form all logical expressions, are not first-class
citizens*. I wrote [a Thursdays post](/thursdays/2-first-class-predicate/) about
solving the problem directly by *implement a microKanren programming language
inside a miniKanren programming language*. That solution works beautifully,
however, with some overhead. Because the programming language itself is now
capable of running backwards, sometimes when a predicate is complicated, the
solver would take a long time to find any solution.

There's an easier solution. miniKanren's predicates are implemented as
functions on Lisp. Functions are first-class citizens in Lisp, so we can just
add functions back to miniKanren.

A common usage of being first-class is to map over a list of things. For
example, with the following function, I can apply a predicate over a list by
adding functions back to miniKanren predicates:

~~~scheme
(define (mapo* p in out)
  (conde
    ((== in '())
     (== out '()))
    ((fresh (inf inr outf outr)
       (== `(,inf . ,inr) in)
       (== `(,outf . ,outr) out)
       (p inf outf)
       (mapo* p inr outr)))))
~~~

Notice that `p` in the above predicate is another predicate. If `in` is not
empty, the above predicate would apply `p` to the first element of `in`, and
then recursively call `mapo*`.

## Data Structures

The predicate, let's call it `pivoto`, applies to a list of *associative list*
of key value pairs with key `from`, `to`, and `val`, and returns another list of
*associative list* of key value pairs with key `from`, and all `to` values in
the input as keys.

Here's an example input:

~~~scheme
'(((from . a) (to . b) (val . 1))
  ((from . a) (to . c) (val . 2))
  ((from . b) (to . c) (val . 3)))
~~~

And it's output:

~~~scheme
'(((from . b) (c . 3))
  ((from . a) (b . 1) (c . 3)))
~~~

## Implementation

The `pivoto` predicate first finds all the distinct values in the `from` column,
and then apply on those distint values:

~~~scheme
(define (pivoto in out)
  (fresh (distincts)
    (distinct-valo 'from in distincts)
    (pivot-distincto distincts in out)))
~~~

For those distinct values, we first select it from the original table, and then
function on all the `to` values.

~~~scheme
(define (pivot-distincto distincts in out)
  (conde
    ((== distincts '())
     (== out '()))
    ((fresh (df dr df-selected toof outf outr)
       (== `(,df . ,dr) distincts)
       (== `(,outf . ,outr) out)
       (selecto 'from df in df-selected)
       (pivot-too df-selected toof)
       (== `((from . ,df) . ,toof) outf)
       (pivot-distincto dr in outr)))))
~~~

In that `pivot-too`, we figure out each `to`, and `val`, and then adds then back
to the result table.

~~~scheme
(define (pivot-too in out)
  (conde
    ((== in '())
     (== out '()))
    ((fresh (inf inr outf outr to val)
       (== `(,inf . ,inr) in)
       (== `(,outf . ,outr) out)
       (item-pairo 'to to inf)
       (item-pairo 'val val inf)
       (== `(,to . ,val) outf)
       (pivot-too inr outr)))))
~~~
