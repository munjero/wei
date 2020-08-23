---
title: Notes from nowhere
subtitle: I don't know, either.
---

These are notes that do not fit the above chapters, but they may also
have some interesting aspect to be shared. So I put them there.

How are you doing?
------------------

*By Richard Linklater, Before Sunset (2004)*

> Céline: But, still, you know...I really enjoyed being there. There's a
> lot of things I miss about the U.S.
> 
> Jesse: Yeah, like what?
> 
> Céline: Um...well...The overall good mood people have there, like, you
> know, even if it can be bullshit sometimes. Like (cocking her head from
> side to side.) "How‘re you doin'?" "Great!" "How’re you doin'?" "Great!"
> "Have a great day!" (They both laugh.)

Converting Pi to Binary: Don't Do It
------------------------------------

*By Keith F. Lynch*

> **WARNING:** Do NOT calculate Pi in binary. It is conjectured that this
> number is normal, meaning that it contains ALL finite bit strings.
> 
> If you compute it, you will be guilty of:
> 
> -  Copyright infringement (of all books, all short stories, all
>    newspapers, all magazines, all web sites, all music, all movies, and
>    all software, including the complete Windows source code).
> -  Trademark infringement.
> -  Possession of child pornography.
> -  Espionage (unauthorized possession of top secret information).
> -  Possession of DVD-cracking software.
> -  Possession of threats to the President.
> -  Possession of everyone's SSN, everyone's credit card numbers,
>    everyone's PIN numbers, everyone's unlisted phone numbers, and
>    everyone's passwords.
> -  Defaming Islam. Not technically illegal, but you'll have to go into
>    hiding along with Salman Rushdie.
> -  Defaming Scientology. Which IS illegal -- just ask Keith Henson.
> 
> Also, your computer will contain all of the nastiest known computer
> viruses. In fact, all of the nastiest POSSIBLE computer viruses.
>
> Some of the files on my PC are intensely personal, and I for one don't
> want you snooping through a copy of them.
> 
> You might get away with computing just a few digits, but why risk it?
> There's no telling how far into Pi you can go without finding the secret
> documents about the JFK assassination, a photograph of your neighbor's
> six year old daughter doing the nasty with the family dog, or a complete
> copy of the not-yet-released Pearl Harbor movie. So just don't do it.
>
> The same warning applies to e, the square root of 2, Euler's constant,
> Phi, the cosine of any non-zero algebraic number, and the vast majority
> of all other real numbers.
>
> There's a reason why these numbers are always computed and shown in
> decimal, after all.

Avoid Success at All Costs
--------------------------

> Richard: Tell me about Haskell’s unofficial slogan: avoid success at all
> costs. What’s the origin of it?
>
> Simon: I mentioned this at a talk I gave about Haskell a few years back
> and it’s become quite widely quoted. When a language becomes too well
> known, or too widely used and too successful - certainly being adopted
> by Microsoft means such a thing - suddenly you can’t change anything
> anymore. You get caught and spend ages talking about things that have
> nothing to do with the research side of things. Success is great, but it
> comes at a price.

(Source: [Simple Talk](https://www.simple-talk.com/opinion/geek-of-the-week/simon-peyton-jones-geek-of-the-week/))

Quantum Sort
------------

~~~ python
def qsort(xs):
    # choose a permutation of the input
    r = quantum.choice(itertools.permutations(xs))
    # assert that it's sorted
    quantum.assert_(all(r[i - 1] <= r[i] for i in range(1, len(r))))
    # return it
    return r

print(qsort([3, 0, 5, 1, 2]))  # prints [0, 1, 2, 3, 5]
~~~

(Source: [karldray/quantum](https://github.com/karldray/quantum))

Three Questions
---------------

It once occurred to a certain king, that if he always knew the right
time to begin everything; if he knew who were the right people to
listen to, and whom to avoid; and, above all, if he always knew what
was the most important thing to do, he would never fail in anything
he might undertake.

And this thought having occurred to him, he had it proclaimed
throughout his kingdom that he would give a great reward to any one
who would teach him what was the right time for every action, and
who were the most necessary people, and how he might know what was
the most important thing to do.

And learned men came to the King, but they all answered his
questions differently.

In reply to the first question, some said that to know the right
time for every action, one must draw up in advance, a table of days,
months and years, and must live strictly according to it. Only
thus, said they, could everything be done at its proper time.
Others declared that it was impossible to decide beforehand the
right time for every action; but that, not letting oneself be
absorbed in idle pastimes, one should always attend to all that was
going on, and then do what was most needful. Others, again, said
that however attentive the King might be to what was going on, it
was impossible for one man to decide correctly the right time for
every action, but that he should have a Council of wise men, who
would help him to fix the proper time for everything.

But then again others said there were some things which could not
wait to be laid before a Council, but about which one had at once to
decide whether to undertake them or not. But in order to decide
that, one must know beforehand what was going to happen. It is only
magicians who know that; and, therefore, in order to know the right
time for every action, one must consult magicians.

Equally various were the answers to the second question. Some said,
the people the King most needed were his councillors; others, the
priests; others, the doctors; while some said the warriors were the
most necessary.

To the third question, as to what was the most important occupation:
some replied that the most important thing in the world was science.
Others said it was skill in warfare; and others, again, that it was
religious worship.

All the answers being different, the King agreed with none of them,
and gave the reward to none. But still wishing to find the right
answers to his questions, he decided to consult a hermit, widely
renowned for his wisdom.

The hermit lived in a wood which he never quitted, and he received
none but common folk. So the King put on simple clothes, and before
reaching the hermit's cell dismounted from his horse, and, leaving
his body-guard behind, went on alone.

When the King approached, the hermit was digging the ground in front
of his hut. Seeing the King, he greeted him and went on digging.
The hermit was frail and weak, and each time he stuck his spade into
the ground and turned a little earth, he breathed heavily.

The King went up to him and said: "I have come to you, wise hermit,
to ask you to answer three questions: How can I learn to do the
right thing at the right time? Who are the people I most need, and
to whom should I, therefore, pay more attention than to the rest?
And, what affairs are the most important, and need my first attention?"

The hermit listened to the King, but answered nothing. He just spat
on his hand and recommenced digging.

"You are tired," said the King, "let me take the spade and work
awhile for you."

"Thanks!" said the hermit, and, giving the spade to the King, he
sat down on the ground.

When he had dug two beds, the King stopped and repeated his
questions. The hermit again gave no answer, but rose, stretched out
his hand for the spade, and said:

"Now rest awhile-and let me work a bit."

But the King did not give him the spade, and continued to dig. One
hour passed, and another. The sun began to sink behind the trees,
and the King at last stuck the spade into the ground, and said:

"I came to you, wise man, for an answer to my questions. If you can
give me none, tell me so, and I will return home."

"Here comes some one running," said the hermit, "let us see who it is."

The King turned round, and saw a bearded man come running out of the
wood. The man held his hands pressed against his stomach, and blood
was flowing from under them. When he reached the King, he fell
fainting on the ground moaning feebly. The King and the hermit
unfastened the man's clothing. There was a large wound in his
stomach. The King washed it as best he could, and bandaged it with
his handkerchief and with a towel the hermit had. But the blood
would not stop flowing, and the King again and again removed the
bandage soaked with warm blood, and washed and rebandaged the wound.
When at last the blood ceased flowing, the man revived and asked for
something to drink. The King brought fresh water and gave it to
him. Meanwhile the sun had set, and it had become cool. So the
King, with the hermit's help, carried the wounded man into the hut
and laid him on the bed. Lying on the bed the man closed his eyes
and was quiet; but the King was so tired with his walk and with the
work he had done, that he crouched down on the threshold, and also
fell asleep--so soundly that he slept all through the short summer
night. When he awoke in the morning, it was long before he could
remember where he was, or who was the strange bearded man lying on
the bed and gazing intently at him with shining eyes.

"Forgive me!" said the bearded man in a weak voice, when he saw
that the King was awake and was looking at him.

"I do not know you, and have nothing to forgive you for," said the King.

"You do not know me, but I know you. I am that enemy of yours who
swore to revenge himself on you, because you executed his brother
and seized his property. I knew you had gone alone to see the
hermit, and I resolved to kill you on your way back. But the day
passed and you did not return. So I came out from my ambush to find
you, and I came upon your bodyguard, and they recognized me, and
wounded me. I escaped from them, but should have bled to death had
you not dressed my wound. I wished to kill you, and you have saved
my life. Now, if I live, and if you wish it, I will serve you as your
most faithful slave, and will bid my sons do the same. Forgive me!"

The King was very glad to have made peace with his enemy so easily,
and to have gained him for a friend, and he not only forgave him,
but said he would send his servants and his own physician to attend
him, and promised to restore his property.

Having taken leave of the wounded man, the King went out into the
porch and looked around for the hermit. Before going away he wished
once more to beg an answer to the questions he had put. The hermit
was outside, on his knees, sowing seeds in the beds that had been
dug the day before.

The King approached him, and said:

"For the last time, I pray you to answer my questions, wise man."

"You have already been answered!" said the hermit, still crouching
on his thin legs, and looking up at the King, who stood before him.

"How answered? What do you mean?" asked the King.

"Do you not see," replied the hermit. "If you had not pitied my
weakness yesterday, and had not dug those beds for me, but had gone
your way, that man would have attacked you, and you would have
repented of not having stayed with me. So the most important time
was when you were digging the beds; and I was the most important
man; and to do me good was your most important business. Afterwards
when that man ran to us, the most important time was when you were
attending to him, for if you had not bound up his wounds he would
have died without having made peace with you. So he was the most
important man, and what you did for him was your most important
business. Remember then: there is only one time that is important--
Now! It is the most important time because it is the only time when
we have any power. The most necessary man is he with whom you are,
for no man knows whether he will ever have dealings with any one
else: and the most important affair is, to do him good, because for
that purpose alone was man sent into this life!"

(By *Leo Tolstoy*)
