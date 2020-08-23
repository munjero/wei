---
title: Loops in Netwire
subtitle: A Thing You Should Know About Functional Reactive Programming.
---

*November 5, 2015*

Consider writing a [Netwire](http://hub.darcs.net/ertes/netwire) program
to simulate physics. An object's position is modified by its velocity,
which is again modified by gravity. At the end of the day, the gravity
it feels is defined by its position. So we have a loop here.

A naive implementation of this model would be to define them in the
normal recursive way:

~~~ haskell
position :: (HasTime t s, Monad m) => Wire s e m a Float
position = integral 1 . velocity

velocity :: (HasTime t s, Monad m) => Wire s e m a Float
velocity = integral 0 . gravity

gravity :: (HasTime t s, Monad m) => Wire s e m a Float
gravity = integral 0 . (liftA (-) position)
~~~

However, if you try to run this program, you wouldn't see any result.
These three functions are recursively called and create an infinite loop
that will never be resolved. The correct way is to create a seperate
arrow that uses Netwire's **ArrowLoop** feature.

~~~ haskell
position :: (HasTime t s, Monad m) => Wire s e m Float Float
position = integral 1

velocity :: (HasTime t s, Monad m) => Wire s e m Float Float
velocity = integral 0

gravity :: (HasTime t s, Monad m) => Wire s e m Float Float
gravity = proc x -> do
  returnA -< -x

world :: (HasTime t s, MonadFix m) => Wire s e m a Float
world = proc x -> do
  rec g <- gravity -< p
      v <- velocity -< g
      p <- position -< v
  returnA -< p
~~~

And it magically works!
