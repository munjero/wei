---
title: Of Hiring Salaries in Startups
subtitle: What Should It Be Like?
---

*September 13, 2015*

At the very beginning, all the founders take huge risks about both the
products and the team. If they are willing to take the risks, they must
utimately trust each other to some extent, and thus they must have
already been close friends. (But there are also other restrictions about
close friends. See [this Quora
question](http://www.quora.com/What-are-the-potential-pitfalls-of-having-close-friends-as-co-founders-in-a-startup).)

~~~
(requires building-startups trust high)
(property:trust co-founders high)
(property:trust close-friends high)
(contain close-friends co-founders)
~~~

When the startup starts hiring, it usually hires someone that is not a
close friend of all the founders (otherwise we would invite him or her
to be another founder). It is usually hard for a developer (or
designer/other positions) to utimately trust a group of people who the
developer haven't known before, thus from the developer's point of view,
it is irrational to invest big commitment to a startup that either a)
doesn't have a promising future or b) does not pay a reasonable salary.
Thus we either need to pay high salary or persuade the developer about
the promising future in order to make the developer accept the offer of
the startup. At the same time, if a startup shows promising future, it
is usually able to pay high salaries.

~~~
(hire x a) (employee x) (startup a)
(founders a ys)
(property:trust b ys high) (co-founder b a)
(not (property:trust a ys high))
(not (close-friend x ys))
~~~

It ultimately comes to the problem of trust -- from a employee's point
of view, even if I think the products of the startup is amazing, why
don't he or she create his or her version of it but join that particular
startup? And it is the startup's duty to help build up the trust and
help them reduce the risk.

And if the above thinking process is valid, we see that "salary" really
plays an important part here: a) it reduces the risk of the employee
because it is not so easy for a person to trust a startup, and b) it
shows the startup has a promising future.
