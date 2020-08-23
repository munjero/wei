---
title: Programming Language Matters
subtitle: A Draft about Programming Languages.
---

*January 14, 2016*

> Language shapes the way we think, and determines what we can think
> about.
>
> -- Benjamin Lee Whorf

I was fortunate to be able to try a very old Apple II machine when I was
in [Recurse Center](https://recurse.com/). The machine looks like this:

![image](/images/resources/hacker-school-apple-ii.jpg)

There was a BASIC interpreter in the machine. In that screen of blacks
and whites, you can type in some basic commands, and the interpreter
will execute it. For example, here's how you set A to equal to \`1\`:

    LET A=1

In that interpreter, you cannot even define functions. You assign all
values into global variables, use GOSUB to jump to a different location,
and use another keyword RETURN to jump back. In this way, you simulate
function definitions. I found that version of BASIC was harder to use
than a modern assembly language -- you get much richer features and much
sweater sugar syntaxes. I tried to play with it, and felt extreme pain
when using it to write a simple calculator program -- it just felt like
everything was messed up.

I learned to program in Visual BASIC, an a-little-bit-advanced version
of BASIC, when I was 11 years old. I built the exact same program -- a
calculator and felt extremely inspired. I used Visual BASIC to build
Tic-tac-toe games, family financial databases and other fun things I
could or couldn't remember. At that time, I seriously thought that
Visual BASIC would be the only programming language I would ever learn.
It was simple, easy to understand, and fun, and after all, I could build
*everything* I want in that language, so why bother learn another?

So I was really surprised when I learned that most of the program were
not written in Visual BASIC.

I also tried to pick up a book called "The C Programming Language" when
I was in junior high. I soon dropped it because it didn't seem to be
useful at all. It didn't allow me to create better games and databases
compared with Visual BASIC, so it just felt useless.

Of course I was wrong. I learned many other programming languages later
in my life. Ruby, Python, Clojure, Haskell, Ocaml, Scheme. And I never
used Visual BASIC later in my life.

However, I am still confused when someone new to computer asks me "what
language do you think I should learn first?" or when a computer
scientist recommends me to adopt a new programming language for the
current project. Does language matter?

There was moments in my life that I thought it doesn't matter. Many
programming languages are Turning-complete, and thus Turning-equivalent.
You can build a web framework in Ruby, as well as in Java, Python,
Haskell, Clojure and Ocaml. Many languages share similar syntaxes, and
most of the time you can translate one to another. After all, if you get
bored, you can try functional and logical programming in Java, or
implement a Scheme interpreter in C.

But programming languages are not just for computers, they should also
be readable to humans. One day I learned the word "Mamihlapinatapai"
from the Yaghan lanuage of Tierra del Fuego, which refers to "a look
shared by two people, each wishing that the other would initiate
something that they both desire but whithc neither wants to begin".

Speed

Framework
