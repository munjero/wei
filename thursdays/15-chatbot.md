---
title: Natural Language Processing for Chatbots
subtitle: Extract Intents and Slots from Sentences.
---

*February 25, 2016*

Recently I came across a tool called Amy on the Internet. It is a chatbot that
works through emails, which can help people to schedule meetings and manage
calendars. The conversation with Amy starts like this, you receive some emails
from your friends for coffee or meetings, and you forward the email to Amy:

> Amy, can you find 30 minutes for coffee at my office?

The bot will then handle the rest conversations to schedule the time, and
finally insert an item in your calendar.

This is convenient, so recently I tried to build a chatbot like this for my own.
[Fork the source code](https://source.id.hn/diffusion/NLPI/).

## The Problem

When a user sends a message to the chatbot, two kinds of important information
needs to be extracted. The first one is the user's intention, or **intent**,
about what type of information the user is trying to say. The second one is
necessary arguments in relation to the intent, or **slots**.
