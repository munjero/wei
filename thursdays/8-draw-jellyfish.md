---
title: Draw a Jellyfish
subtitle: How to Draw a Jellyfish in Javascript.
additional: <canvas id="canvas"></canvas>
---

<style>
#canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.5;
    pointer-events: none;
}
</style>

*November 19, 2015*

Nardove had an amazing Jellyfish animation on his website. And this is a
note describing how it works.

The shape of a jellyfish can be described using two half ellipses. Above
the y axis, draw a half ellipse with vertices on x axis to be 0.7, and
on y axis to be 1. Below the y axis, draw a half ellipse with vertices
on x axis to be 0.7, and on y axis to be 0.4. Now you have already got a
jellyfish without the tentacles. We let `x` and `y` be the points of a
jellyfish, then the equations can be expressed as:

    x = cos(theta) * r * 0.7

    y = sin(theta) * r * 0.4 if theta > 0 and theta < pi
    y = sin(theta) * r * 1 otherwise

We would also want the shape to expand and contract. So we use the time
`t` to calculate a seed. The seed is then feed to a `sin` function. We
let `nx` and `ny` be the normals of a point, that is:

    nx^2 + ny^2 = 1
    nx * a = x
    ny * a = y

Here we can define `ecx` and `ecy` together with the
expansion-contraction effect:

    ecx = x + nx * sin(-0.2t-0.0375y)
    ecy = y + ny * sin(-0.2t-0.0375y)

The tentacles are just stick around the body of a jellyfish. The
algorithm works like this. We represent the tentacles using separate
dots. There are usually around 7 dots for one tentacle. The first dot is
always stick on the jellyfish body. For each update, we update the
second dot with y value plus one to simulate the gravity.

    y1' = y1 + 1

For all other dots (`x2`, `y2`), we update it using the past two dots
(`x1`, `y1`) and (`x0`, `y0`). We first calculate the distance `len`
between (`x2`, `y2`) and (`x0`, `y0`). The update algorithm can be
written as follows:

    x2 = x1 + (x2 - x0) * (segmentLength / len)
    y2 = y1 + (y2 - y0) * (segmentLEngth / len)

<script src="jquery-3.1.0.min.js"></script>
<script src="paper.js"></script>
<script src="jelly.js"></script>
<script src="tentacle.js"></script>
<script src="nardove.js"></script>
