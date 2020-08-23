---
title: Rect
subtitle: When Functional Reactive Programming Meets Multiplayer
---

Suppose somebody asks you to build a calculator -- well, you can't build
the calculator directly, but instead you give commands to a worker who
does all the building for you. So once you get all the components, you
might ask the worker:

~~~
Put the display on the top of the board.
And then put button '7' in the left-most place just under the display.
And then put button '8' in the right of button '7'.
...
~~~

And so forth, and so on. Everything works well. Now consider that you
cannot find the necessary chip that processes the adding and
multiplying. Instead, you need to ask the worker to do that for you. So
you might ask the worker to first form a inner representation of the
calculator. For example:

    Now we have number A, and number B, which the user will input.
    And we calculate number C by A plus B.

And then you need to ask the worker to connect this inner representation
to what actually happens:

    When somebody press button '7', assign 7 as number A.
    And then when somebody press button '8', assign 8 as number B.
    And then calculate number C by A plus B.
    And don't forget to display C on the display.

This is how you would actually do it when you write the interface in a
*imperative programming* way. But don't you feel it is redundant? Why
can't I just say:

    The first pressed number is number A.
    The second pressed number is number B.
    The result, which should be displayed, is number C.

This is called *reactive programming*. It consists of a flow, directing
the data, to make sure it doesn't get lost. And *functional reactive
programming* uses the *functional programming* tool-chain to make the
whole things easier. For example, in order to create a [gravitational
simulation](https://git.null.tl/aleph/), all you would need to say is:

    There's position, which is the result of integration of velocity.
    And there's velocity, which is the result of the integration of gravity.
    And finally, there's gravity, which is defined by the Newton's law.
    In the Newton's law, we use the position we get once before.

(Well, you actually need to use a trick called *ArrowLoop*, but the
fundamental idea is the same.)

Programming is very easy once you understand how functional reactive
programming actually works.

However, there's one thing left unsolved. We have good tools if the
program only runs on one computer -- in the words of the calculator's
example, there's only one worker. How are we going to deal with it if we
want the program to run over the Internet. In other words, we want
multiple workers with multiple calculators sharing the same inner
representation. This is the problem "rect" attempts to solve.

Interested? Check out a
[previous talk](https://git.beyond.codes/talks/20150618-rect/plain/presentation.pdf)
about Rect.
