---
title: Why Do We Need Details When Writing?
subtitle: In A Probabilistic Way.
---

*September 27, 2015*

The professor of my writing course always tells me the importance of
details. It is important that you give enough "significant" details in
your writing, since that are the things readers usually love to read.
But why?

Life would probably be boring if you repeat again and again, and to
avoid it, you probably need new and interesting things. As a reader
would read an article to relax, those things are probably what they
expect while reading.

~~~
(property X new) -> (not (property X boring))
~~~

Now consider the probability theory. If you conjunct two events
together, the probability it happens would be equal or less than any of
the probability of a single event happens.

~~~
(<= (probability (and A B)) (probability A))
~~~

By definitions, if you have more details, you would conjunct more
events, and thus the probability that it happen would be equal or less
than the probability of another event with less details.

~~~
(<= (probability (detail A)) (probability (detail B)))
(> A B)
~~~

Finally, if a event of little probability happens, there's a high chance
that it is a new event for the encounter, and thus the reader would be
more likely to be willing to read.

Significant Details
-------------------

However, as people has figured out, sometimes just adding details may
not work. The problem remains in the above equations:

~~~
(or (< (probability (detail A)) (probability (detail B)))
    (= (probability (detail A)) (probability (detail B))))
(> A B)
~~~

Adding more details may reduce the probability, but it may also make the
probability remain the same. Attracting readers can only be done by
adding "significant" details -- that is, details that can significantly
reduce the probability.

Other Ways
----------

Based on the above equations, we find that significant details are not
the only way to write good articles. Besides that, we can also talk
about events that it itself has a low probability to have happened. For
example, the below short novel doesn't contain any "significant"
details, but most of the readers would find it appealing:

> The last person on the earth sitting in the room, and someone knocked the
> door.

Zero Probability
----------------

We should also note that the above method doesn't mean lower possibility
events are always better. If an event is of zero possibility, then a
reader wouldn't think it is new (and appealing), but impossible. For
example, the below story also has a really low possibility to happen,
but many readers wouldn't think it is an interesting story:

> The dog ate the earth.
