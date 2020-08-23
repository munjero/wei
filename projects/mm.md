---
title: Mm
subtitle: microKanren in miniKanren.
---

A logic reasoner is someone that deals with logic.

When you write something in a logic reasoner (or *when you use a logic
programming language*), you can ask the logic reasoner to sort
something, for example, from '\[2 1 3\]' to '\[1 2 3\]'. You can also
ask the logic reasoner backward, for example, what sorts to '\[1 2 3\]',
and the logic reasoner will give you six answers pretty quick -- '\[1 2
3\]', '\[1 3 2\]', '\[2 1 3\]', '\[2 3 1\]', '\[3 1 2\]', and '\[3 2
1\]'. If you sort any of those six answers, you would get '\[1 2 3\]' --
exactly what we want.

And those logic reasoners are not coming from nothing -- certainly
someone wrote it using something else. That something else can be a
command executor (or *a imparative programming language*), a math-like
solver (or *a functional programming language*), or another logic
reasoner. And thus **Logic Reasoner in Logic Reasoner**. There's two
logic reasoners now. You write a logic reasoner (let's call it "child
logic reasoner") using another logic reasoner (let's call it "parent
logic reasoner").

In this way, I can tell the parent logic reasoner "execute 'sort \[2 1
3\]' and tell me what you get", and the parent logic reasoner will use
the child logic reasoner to get '\[1 2 3\]' -- the answer that we need.
Well, as we have discussed before, you can also ask the parent logic
reasoner backward, and say "what executes to '\[1 2 3\]'", and you will
get answers including 'sort \[2 1 3\]' and many others.

Well, and don't forget that the child logic reasoner can also be asked
about questions backward, so now we can ask, "I know Amy is Tom's
mother, and Mary is Bob's mother, tell me what the concept of 'mother'
mean?" and the child logic reasoner can figure it out by working
together with the parent logic reasoner (or *you get Inductive Logic
Programming for free*). And that's what "mm" is all about.

Interested? Checkout a
[previous article](/thursdays/3-mm-inductive-programming/) about Mm.
