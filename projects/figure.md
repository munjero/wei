---
title: Figure
subtitle: Fig Powered miniHeroku.
---

Deploying a program to a server is not always an easy thing. There are
usually more than one components -- you need to set up the database
first, and then setup the cache, and finally setup the web server. Oh
wait, It doesn't work. Probably I need to install this library. Oh I
can't install this library, probably I need to install that library
first.

And just imagine how complicated it would be if you want to deploy
multiple programs into one server.

Docker is one of the rescue. You set up pre-defined scripts to setup
everything, and Docker helps to run it in a somewhat virtual environment
(which we call it a container). If you run multiple containers, still,
you only need to consider one program on one server. But you actually
only need one server, and it is faster and lighter than virtual
machines.

However, although we solved the problem of deploying a program to a
server using Docker, deploying a program to a server is still not always
an easy task, because someone may want to integrate multiple containers
together. And here's Fig (now called Docker Compose), that uses another
script-like thing to solve this problem. However, it only runs locally.
So 'figure' comes to rescue to make Fig works remotely -- so that you
can deploy things to a server, not just locally.

And miniHeroku is some deployment tools that only requires one command.
That's how easy 'figure' is.

Interested? Go to the [README](https://git.beyond.codes/figure/about/).
