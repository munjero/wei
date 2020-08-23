---
title: The First Month of Writing a Microkernel
subtitle: Monolithic and Capabilities.
---

*February 6, 2016*

It has been nearly a month since I started to write a Rust microkernel. If
there's anything I want to say about this, that is, writing a microkernel is
truly addictive. Exploring all the kernel concepts, minimize and simplify the
design, as well as implementing it in a way that doesn't crash, has all made the
journey fun and enjoyable. I'm not saying that `x86_64` is not a frustrating
architecture -- it indeed is, but you can build on top of it something simple
and clean.

## The Functionality of a Kernel

Basically, when designing a kernel, two important things should be caught
immediately into mind -- time and space. Usually, a kernel supports multiple
tasks running at the same time, so a way of sharing CPU time is needed. At the
same time, as those tasks would need memory, a way to isolate and allocate
memory is needed.

Now as we have just isolated time and space, a way to communicate across the
border is required to break the isolation. That is usually called inter-process
communication, or IPC.

Last but not least, the kernel needs to talk with the outside world, to
cooperate with different hardware. So hardware primitives are also required
inside the kernel.

In conclusion, a kernel would at least need to implement those things:

- A way to share CPU time.
- A way to share memory resources.
- Inter-process communication.
- Hardware primitives.

## Monolithic and Micro

A monolithic kernel runs many components in the kernel mode, the privileged mode
in comparison to the user mode. For example, in Linux, we load hardware drivers
to the kernel and run them in kernel mode. The same is done for the file system
and virtual memory. A microkernel does not run any of that, which is instead
running in the user mode.

There are many advantages of running as many things as possible in the user
mode. First of all, because the kernel is now small enough, it is easier to
build a machine-checked proof of correctness. This is usually hard to done for
monolithic kernels because the large code base. The formal verification of seL4
would be one of the example for this. At the same time, microkernels also enable
rapid development, because components, such as file systems can be reloaded
while the kernel is running. This also makes the whole system more robust,
because a failure of those components can be repaired by simply rebooting them.

There's also something microkernels are not good at, of course. IPC performance
is one of the issue. Because microkernels require more kernel mode / user mode
switching (which costs a lot in CPU), its inter-process communication is slower.
Many users also argue that the existing microkernel designs doesn't really solve
any problem they have.

## Capability

Capability would be the simplest way to delegate resource management to user
space.

A capability has ownership. It is either owned by kernel, or by a specific
process. A process cannot inspect or modify its owned capabilities, but it can
be passed into a specific kernel call. In this way, the process basically says,
"I have the right to do something", and the kernel would reject the kernel call
if a wrong capability was passed. By this method, privileged processes are no
longer needed, and we have a clean abstraction of resources.

When the kernel is bootstrapped, a **untyped capability** will be created. That
untyped capability represents all unused memory. It doesn't have many uses by
itself, but can be **retyped** to other capabilities by allocating its memory.

Using this untyped capability, the kernel will create several **kernel reserved
memory capability** for the loaded kernel address space and also a **guarded page
capability** just above the kernel stack to detect stack overflow. The kernel
will also create a **capability pool**, together with its **capability pool
capability** so that it can keep those created capabilities.

After this, the kernel is ready to initialize its first new process. To do this,
it will first create another capability pool, with the capability pool
capability then owned by the process. With this, the kernel will create the
**process control block capability** representing the process. It will then start
the process, and pass all **untyped capability** to it. In this way, the first
process can then manage all the unallocated memory in the user mode.

Of course, in `x86_64`, all of these are managed by pages. So we also need a
**page table capability** to read virtual addresses and to map frames.

## Rux

In this month, Rux was implemented with capabilities of basic memory management.
Fork the [source code](https://phabricator.beyond.codes/diffusion/RUX/).
