---
path: '/2019/03/20/appreciation-for-stubbornness'
date: '2019-03-20T05:52:00.000Z'
title: 'An appreciation for stubbornness'
author: Max Rozen
tags: ['software-engineering', 'meta', 'learning']
excerpt: 'There are few moments in a career that can significantly alter your course - let me describe one I experienced a couple of years ago.'
---

Stubbornness.

When people describe key qualities and attributes of personality that are necessary for success, they don't really mention stubbornness. Grit, patience, low ego are often-cited, but not stubbornness.

I had the joy of having a truly stubborn manager roughly two years ago, and I still feel like I'm benefiting from the experience today. Back then, I didn't know [Terraform](https://www.terraform.io/), or any kind of infrastructure-as-code.

I always considered myself a "keen learner" and a "fast learner", but I really didn't see the point, when tools like [Zappa](https://github.com/Miserlou/Zappa) and the [Serverless](https://serverless.com/) framework existed (I was a Python dev back then).

> "Why do things the hard way, when a simple JSON config does the job?" I'd say.

> "Do you know what it's doing under the hood?" He'd respond.

> "Nope."

Now my manager at the time wouldn't block my pull requests, or anything like that. He'd just give me plenty of time to do things the right way (i.e. learning exactly what resources to spin up, and how many to spin up, and how to describe that in terraform). Hell, he'd even encourage me to merge my pull request that used Zappa for configuring our serverless python functions, and that sort of passive aggression was exactly what I needed to motivate me to learn.

His method was simple. He'd tell me what was wrong with what I was doing, I'd argue in favour of modern tooling, and he'd simply not shift his opinion. Stubbornly.

At the time I thought he was a tyrant. Now I understand.

While abstractions are great for getting junior developers up and running, in the long term it's worth understanding what's happening under the hood.
