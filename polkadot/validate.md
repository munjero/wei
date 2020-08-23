---
title: Wei's Polkadot validators
subtitle: Intent to validate on Polkadot
---

## Validator setup

Wei's Polkadot validators are several independent validators running
on the Polkadot network. They are set up to be secure and reliable,
and all follow the current Polkadot validation best practices. There
are three validators in total. Two of them are with the goals of high
availability and performance. The third one is with the goals of
supporting decentralization and eco-friendliness.

All validators are proudly deployed with [NixOS](https://nixos.org/)!

For questions or issues about Wei's validators, contact Wei by his
email ([wei@that.world](mailto:wei@that.world)).

## Validators with high reliability

Two validators "Wei" and "Wei/2" are set up to provide high
reliability. They run on several high performance bare metal servers
in a datacenter.

Those two validators have been running non-stop since the beginning of
Polkadot launch, and have never missed building a single block so far.

The validator addresses are:

* *14ShUZUYUR35RBZW6uVVt1zXDxmSQddkeDdXf1JkMA6P721N* (Wei)
* *13eKBARPFWBdXJAKg4fBTNUfcz4YAYfDTetRRApuz1kTDVDg* (Wei/2)

## Validators for decentralization and eco-friendliness

Validator "Wei/3" directly runs from Wei's home.

The validator is mainly to promote *decentralization*. You often hear
the critiques by some, that for a PoS blockchain, nearly all
validators run on AWS or Google Cloud. This is not only about risk of
centralization, but also, those cloud providers can have
[downtime](https://status.cloud.google.com/summary), and any downtime
brought by them can cause a large number of validators to be
offline. Polkadot's consensus algorithm tolerate if a single validator
is down for a while, but penalize if a large number of validators are
offline at the same time. By not running the validator in Google Cloud
or AWS, the validator is actually less likely to be slashed due to
downtime.

In addition:

* The validator runs on green energy (hydropower and solar power).
* The validator has its own public IP address.
* As commerical offices exist in the same block, the Internet provider
  has reasonable downtime guarantee (2 hours), and even with that
  they're unlikely to cause major problems to Polkadot validations.
* In the situation where downtime is expected at Wei's home, the
  validator will be temporarily moved to a datacenter to continue its
  operation until the issue is resolved.

The validator addresses are:

* *133RrftUsSWPy2X7drXcBQ7y9VFGFVzLwC4hcaJb3HcmLEPN* (Wei/3)

## Disclaimer

Wei is a core developer working at Parity Technologies. However, this
validator service is independent and is not endorsed by my employer.
