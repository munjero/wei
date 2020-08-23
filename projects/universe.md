---
title: Universe
subtitle: Large Amounts of Dots.
---

Imagine you want to calculate the movement of 30,000 dusts moving around
a central star using Newton's gravity theory. How long will it take for
each step? It's not that fast, if what you require is to display it on a
screen, because you need to calculate things 60 times per second.

However, there's one thing that is extremely good at this kind of
calculation, the Graphics Processing Unit (GPU). When you play a game,
the GPU needs to put more than 30,000 dots on the screen for more than
60 times per second. So can we use GPU to calculate gravity?

The answer is yes, and you just need to relax GPU for "general purpose",
which has another fancy term, called General-purpose Computing on
Graphics Processing Units (GPGPU). And this project explores ways to do
that within a browser.

Interested? Fork the [source code](https://git.beyond.codes/universe/).
