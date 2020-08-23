---
title: Failing the Jane Street Interview
subtitle: Random Interviews. Fun Experiences.
---

This records my two times failing the interviews at Jane Street, a
trading company located in London, New York and Hong Kong. I think the
reason I failed are my programming skills, "cultural fit", and the
inability to present myself. Don't get me wrong -- Jane Street is really
a good company if you love functional programming.

My First Interview at Jane Street
---------------------------------

*September 25, 2014*

I have applied for a software engineer intern in Jane Street. The
interviewer is really nice and helped me through the process, although I
knew I might have already failed the interview.

I hardly find anything related to the interview, so I am posting
something here to share my experience and hope it may help others.

### How I Prepared

Before I got the interview opportunity, I had no experience with OCaml.
And the only thing I did is to work on the [99
Problems](http://ocaml.org/learn/tutorials/99problems.html) on the OCaml
website. It helped me with my math, algorithm and things related with
functional programming theories.

### The First Round

The interview is really straight-forward and we go directly into the
technical questions. I was able to use any language I like but I chose
OCaml rather than Ruby, which I am really good at.

I was asked to write a memoization, which can remember the return value
of a function. I first came up something like this:

~~~ ocaml
let memo (f : ('a -> 'b)) =
    let ref dict := [] in
    fun x ->
        try List.assoc (f, x) dict with
            Not_found -> let try val = f x with err -> Error err in
                         dict := ((f x), val) :: dict;
                         val;;
~~~

I told the interviewer that I had no experience with Hashtbl so that he
wrote an interface of Hashtbl for me and then I rewrote my code using
that:

~~~ ocaml
let memo (f : ('a -> 'b)) =
    let ref dict := Hashtbl.create () in
    fun x ->
        try Hashtbl.find (f, x) dict with
            Not_found -> let try val = f x with err -> Error err in
                         Hashtbl.add (x, val) dict;
                         val;;
~~~

I was then asked what is "wrong" with the above code. I didn't quite
catch with it so we spent a long time to come up with the idea of
constant memory and constant lookup time.

I tried to answer using priority queue for it, but in vain since I can't
keep constant lookup time. At the same time, if I use hash table, I
can't keep constant memory.

So there's long time of silence when I was thinking of a solution. In
the end, the interviewer gave me some hints of combining them together
and it ended up like this:

~~~ ocaml
let memo (f : ('a -> 'b)) =
    let ref dict := Hashtbl.create () in
    let ref q    := Queue.create () in
    fun x ->
        try Hashtbl.find (f, x) dict with
            Not_found -> let try val = f x with err -> Error err in
                         Hashtbl.add (x, val) dict;
                         Queue.add x q;
                         val;;
~~~

So I didn't get it right without the interviewer's hint, and I've
failed.

But it is really a nice experience, since you can learn a lot about
functional programming and all things before and during the interview.
If you haven't tried to apply for Jane Street, I highly recommend to
give it a try.

### Reflection

It requires lots of courage to make things happen. One must prepare well
before applying any jobs or internships. I think the most important
thing I learnt from this is that there are still many things I don't
know, and there are truly amazing people out there in the world. There's
still a long way to go, and it's never late to find this out.

Another thing I found out is that the real thing that matters is
yourself, your skills and your knowledge, rather than a fancy university
name or company name. For most big companies that you want to work with,
it's a fair game.

My Second Interview at Jane Street
----------------------------------

*December 14, 2015*

I applied to Jane Street for the second time during my stay at Recurse
Center. This time it went further -- I got both a phone interview, and a
full-morning on-site interview. The interview was carried out in both
the Hong Kong office and the New York office.

### The First Round

I was in New York when I got the phone call from Hong Kong, so it was at
night. I was greeted by a friendly sound -- even familiar. On the other
side, the person who interviewed me, was another functional programmer.

There was general questions about projects I wrote on the resume, more
specifically, the Seed programming language. One feature of the Seed
programming language is that you can transfer any data structure in the
language, including functions, over the network. I was asked how that
worked. I explained the transformation of codes to AST trees, and the
pretending-to-eval algorithm (or static analysis) that gathers all
related data structures needed to be transferred.

After that, I was asked a question related to parsers. The scene was set
for game consoles, where you may want to have customized key-strokes. My
task was to design an algorithm that match a key sequence with a
key-stroke definition.

My first attempt was simply getting a sequence of key-strokes, and match
it in one function using a loop. I was told that I misunderstood the
question, because I should design a function that only accepts one
key-strokes at a time. This time, one concept immediately came to my
mind -- monads!

I told the interviewer that I probably need to design a monad, but I was
programming in Clojure, where monads were as common as in languages like
Haskell. I struggled for a while, and the interviewer tried to direct me
away from thinking of monads.

I finally wrote a function that when ran, return an array of matched
definition, as well as the current state of the system, which should be
passed back next time the function is called. The interviewer thought
that would be fine. So we moved on.

We discussed the performance issue of the function -- what to do if
there's a million definitions out there, and what to do if multiple
key-strokes were matched. I answered the question by a cache and some
changes of the function.

Two days after the interview, I was invited to the second round
interview at the New York office.

### The Second Round

Jane Street's New York office was located in the center of New York,
from where the Statue of Liberty could be clearly seen. I was called
into a meeting room, in where two technical meetings and a meeting with
HR was conducted.

#### The First Meeting

In this interview, I was asked to write a Tetris game. The goal was to
test my clarity of my code, and my language of choice was Clojure.

I spent some time to design the function that would accept a game state
and return a new game state. Until the end of the meeting, I still
didn't finish writing the game.

#### The Second Meeting

The second interview was about binary trees. I was asked to implement
binary trees in Clojure. I quickly wrote the data structure and the
equality comparison function. And then I was asked about whether there's
some problems with the equality comparison function that could make it
inefficient -- somebody could construct a binary tree that would take a
long time for the equality comparison function to finish.

I spent some time to realize that if you pass a recursive binary tree,
the equality comparison function would never return. They soon pointed
out that you didn't need a true recursive binary tree. A binary tree
that reused its nodes would have the same effects.

I tried to solve this problem in different ways, and later realized that
I probably need to use cache, which I spent the rest of the interview to
implement.

#### The Meeting with HR

This is not a formal meeting, rather a discussion about my plan and a
time for me to ask questions about Jane Street. HR also kindly showed me
around the office.

### Reflection

I didn't get the offer. I guess the main problem was still my
programming skills. In the first on-site meeting, I didn't write clear
code nor finish the game.
