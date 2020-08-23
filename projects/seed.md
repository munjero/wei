---
title: Seed
subtitle: Programming over Network.
---

How hard is it to transfer everything in a program through network?
Well, usually, in general, really hard.

For example, program A wants to tell program B that "Amy is Bob's
mother". So program A just transmits that through the network, "Amy is
Bob's mother". This can make program B really confused -- "Who is Amy?",
it may ask. If program A tells program B that "Amy is a person". This
again may confuse program B, because "What is a person?". If program A
again says "A person is someone that has a head, two arms and two legs",
program B may be more confused, because "What is a head? And what are
arms and legs?" So forth, and so on.

And while it is a hard problem, there's no general solution around the
Internet. You will find solutions that solve a specific problem, for
example, in the situation when you have all the communication protocol
clearly defined. That's the problem that 'seed' tries to attack -- to
find a general solution of that hard problem.

At the same time, 'seed' is also a Lisp interpreter, if you know what I
mean.

Interested? Go to the [README](https://git.beyond.codes/seed/about/).
