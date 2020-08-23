---
title: Jing-logic
subtitle: Tic-tac-toe Game in miniKanren.
---

Tic-tac-toe is a game where you play in 3x3 squares, with 2 players in
turn, and whoever first connects 3 squares in a line wins. Writing a
tic-tac-toe game in a logic programming language like miniKanren has
some interesting effects. For example, it becomes really easy to know
about "if this is the current board, what would be all the next possible
moves?" and "if this is the current board, what would be the boards that
can produce this board?".

So what's good about this? Well, people has studied the tic-tac-toe game
and figured out multiple strategies that can make you never lose (for
example, you should always mark the center if it is available), and
those strategies, together with the ability to easily query around
boards, make it really easy to create an AI to play the game with you.
If you look at the code, the AI is actually implemented in less than 20
lines -- that's less than one A4 paper if printed.

Interested? Fork the [source code](https://git.beyond.codes/jing-logic/).
