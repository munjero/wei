---
title: Tic Tac Toe in miniKanren
subtitle: Simple Good Old-Fashioned AI.
---

*January 28, 2016*

Nearly one year ago, I made a program called
[jing-logic](https://gist.github.com/sorpaas/ce833413a94077f045c4). A
tic-tac-toe game written in miniKanren. I remembered when a friend looked at the
source codes, listening to me talking about the AI in it that you can play
against with, "So you've already got an AI in this?" She asked, disbelieving
that the AI part was so short that it was nearly nothing, even though the game
was also simple.

I always regard that as a fun experiment, and in this post, I will introduce the
game, the AI, as well as the source code.

## The Language

The game was written in miniKanren, a logic programming language that is simple
and fun to play with.

A logic program has two parts, some **logic expressions**, and a **logic
solver**. Those logic expressions set up constraints about some **logic
variables**. The logic solver is usually provided, and resolves those logic
expressions to find possible assignments to those logic variables that satisfy
those constraints.

In a "pure" miniKanren program, only several primitive constraints are provided.
Using those primitive constraints, together with Lisp's `define`-lambda
expression, you can create many complex constraints that represents anything
that is computable (which means miniKanren is Turing-complete[^1]). A special
command `run` is provided to trigger the logic solver to compute the results. We
tell, in `run`'s parameters, about what logic variables we want to query.

The most fundamental operator is `==`, or `unify`:

~~~scheme
(run* (q)
  (== q 1))
~~~

The program prints out `((1))` representing that it can figure out one value that
makes the program succeeds, that is `q` equals to `1`.

Not all logic variables are for querying, so we have `fresh`, that creates an
unexposed logic variable.

~~~scheme
(run* (q)
  (fresh (p)
    (== p q)
    (== p 1)))
~~~

The final constraint is `conde` that represents logical disjunction (OR).

~~~scheme
(run* (q)
  (conde
    ((== q 1))
    ((== q 2))))
~~~

The above program would return `((1) (2))`. The logic solver can find two
results that satisfy the constraints, that is `q` equaling `1` and `q` equaling
`2`.

As you may see, there's `==`, `fresh`, `conde`, and `run`. That's nearly
everything about miniKanren.

## The Game

A tic-tac-toe game contains 9 positions in a 3x3 board. Two players (let's call
them `x` and `o`) put piece on the board in turn. The first player that connects
three pieces in a line no matter horizontally, vertically, or diagonally, wins.

So first let's define those two players:

~~~scheme
(define (playero p)
  (conde ((== p 'o))
         ((== p 'x))))
~~~

A value in a board is either occupied by a player, or is nothing:

~~~scheme
(define (valueo x)
  (conde ((playero x))
         ((nullo x))))
~~~

As for a board, there are 3 columns and 3 rows, so we use `1`, `2`, and `3` to
represent those indexes.

~~~scheme
(define (indexo x)
  (conde ((== x 1)) ((== x 2)) ((== x 3))))
~~~

Therefore we can define different positions in a board:

~~~scheme
(define (positiono row column value board)
  (fresh (p11 p12 p13
          p21 p22 p23
          p31 p32 p33)
    (boardo p11 p12 p13
            p21 p22 p23
            p31 p32 p33 board)
    (conde
      ((== row 1) (== column 1) (== value p11))
      ((== row 1) (== column 2) (== value p12))
      ((== row 1) (== column 3) (== value p13))
      ((== row 2) (== column 1) (== value p21))
      ((== row 2) (== column 2) (== value p22))
      ((== row 2) (== column 3) (== value p23))
      ((== row 3) (== column 1) (== value p31))
      ((== row 3) (== column 2) (== value p32))
      ((== row 3) (== column 3) (== value p33)))))
~~~

By definition, horizontal positions are at the same row:

~~~scheme
(define (horizontalo x y z board)
  (fresh (row)
    (indexo row)
    (positiono row 1 x board)
    (positiono row 2 y board)
    (positiono row 3 z board)))
~~~

And vertical positions are at the same column:

~~~scheme
(define (verticalo x y z board)
  (fresh (column)
    (indexo column)
    (positiono 1 column x board)
    (positiono 2 column y board)
    (positiono 3 column z board)))
~~~

For diagonal positions, they are either, in order, '`1` `2` `3`' or '`3`, `2`,
`1`'.

~~~scheme
(define (diagonalo x y z board)
  (fresh (column-x column-y column-z)
    (conde
      ((== 1 column-x) (== 2 column-y) (== 3 column-z))
      ((== 3 column-x) (== 2 column-y) (== 1 column-z))
    (positiono 1 column-x x board)
    (positiono 2 column-y y board)
    (positiono 3 column-z z board)))
~~~

Now as we have all the necessary definition here, we can know the meaning of
`winner` -- a player that occupies three pieces either horizontally, vertically,
or diagonally.

~~~scheme
(define (winnero player board)
  (playero player)
  (conde
    ((horizontalo player player player board))
    ((verticalo player player player board))
    ((diagonalo player player player board))))
~~~

Now if you execute `(run* (board) (winnero 'o board))`, the solver will output
all possible board configurations that `o` is a winner.

## The AI

The game is simple, as a result, there's a perfect strategy that a player can
follow to *never lose the game*.

1. **Win**: If the player has two in a row, they can place a third to get three
   in a row.
2. **Block**: If the opponent has two in a row, the player must play the third
   themselves to block the opponent.
3. **Fork**: Create an opportunity where the player has two threats to win (two
   non-blocked lines of 2).
4. **Blocking an opponent's fork (Option 1)**: The player should create two in a
   row to force the opponent into defending, as long as it doesn't result in
   them creating a fork. For example, if "X" has a corner, "O" has the center,
   and "X" has the opposite corner as well, "O" must not play a corner in order
   to win. (Playing a corner in this scenario creates a fork for "X" to win.)
5. **Blocking an opponent's fork (Option 2)**: If there is a configuration where
   the opponent can fork, the player should block that fork.
5. **Center**: A player marks the center. (If it is the first move of the game,
   playing on a corner gives "O" more opportunities to make a mistake and may
   therefore be the better choice; however, it makes no difference between
   perfect players.)
6. **Opposite corner**: If the opponent is in the corner, the player plays the
   opposite corner.
7. **Empty corner**: The player plays in a corner square.
8. **Empty side**: The player plays in a middle square on any of the 4 sides.

So we can implement that:

~~~scheme
(define (strategy-wino player board move)
  (fresh (row column new-board)
    (moveo row column player move)
    (surpose-boardo board move new-board)
    (winnero player new-board)))

(define (strategy-blocko player board move)
  (fresh (opponent row column imaginary-opponent-move)
    (opponento player opponent)
    (strategy-wino opponent board imaginary-opponent-move)
    (moveo row column opponent imaginary-opponent-move)
    (moveo row column player move)))

(define (strategy-randomo player board move)
  (fresh (row column next-board)
    (moveo row column player move)
    (surpose-boardo board move next-board)))
~~~

And create an AI player:

~~~scheme
(define (ai-playo player current-board next-board)
  (conda
    ((full-boardo current-board) (== current-board next-board))
    ((fresh (move)
       (surpose-boardo current-board move next-board)
       (conda
         ((strategy-wino player current-board move))
         ((strategy-blocko player current-board move))
         ((strategy-randomo player current-board move)))))))
~~~

[^1]: We don't consider optimization here. Using those primitive constraints,
    everything is computable, but probably not fast.
