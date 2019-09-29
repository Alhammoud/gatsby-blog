---
path: '/2018/10/06/thoughts-on-measuring-developer-efficiency'
date: '2018-10-06'
title: 'Thoughts on Measuring Developer Efficiency'
author: Max Rozen
tags: ['sre', 'site-reliability-engineering']
excerpt: 'In this article, we explore a few ideas on how to effectively measure developer efficiency. By following some of these ideas, you can benchmark your developer happiness and work towards improving it.'
image: 'development.png'
imageAuthor: 'Undraw.co'
---

## How _do_ you measure developer efficiency?

This question came up during a discussion with a Software Reliability Engineer at work, and I've always had a few opinions on the matter.

Having worked in Big-4 Consulting, most hunts for efficiency that I've witnessed end up like this:

<div style="text-align:center;margin-left:auto;margin-right:auto;display:block;">

<img src="//imgs.xkcd.com/comics/efficiency.png" title="I need an extension for my research project because I spent all month trying to figure out whether learning Dvorak would help me type it faster." alt="Efficiency" srcset="//imgs.xkcd.com/comics/efficiency_2x.png 2x">

[Source: [XKCD](https://xkcd.com/1445/)]</div>

It's not particularly easy to answer the question "How do you measure developer efficiency?", mainly because _it's bloody hard_. At least measuring well/accurately. This may upset you if you're in management, but let me break it down for you.

## Do you measure lines of code written?

It's not a particularly good idea to measure lines of code written unless you want to create a fracture in your developer team between front-end and back-end developers.

For example, a several hundred line front-end form could only require roughly 20 lines in the back-end. As a result, your front-end developers could look more "effective", but perhaps the back-end change required more sitting down and reasoning about the problem.

## Do you count sprint points/estimates?

Counting sprint points/comparing estimates could work - you get the team to estimate the effort by consensus (i.e. your team comes to an agreement over a guess of how long a task should take), then track how many sprint points were completed every two weeks. The problem with this approach is that it ignores bugs and hot-fixes, which depending on your organisation, could be a large portion of developer time, or not much. On top of that, your engineers may also not be the best at estimating (it's pretty damn hard to get right), and estimate tasks to take much more/less effort than actual effort spent.

The real trick to getting sprint points and estimates to work as a measure of developer efficiency is to use your sprint retrospective meetings to grow the team's ability at estimating tasks. Having the same meeting every two weeks to agree that the estimates were off without factoring that into future estimates is pointless.

## Do you measure hours worked?

I would highly recommend against measuring hours worked for developers. You would have to track individual developer's time on each feature (which most developers are not a fan of, as it sends the message that you don't trust them).

You would then need to determine which of your developers get things done faster at a lower quality versus slower at higher quality, for the data to be at all useful (remember, you're trying to measure overall developer efficiency, not create a race for developers to get things done faster).

## Do you measure time wasted?

Measuring the amount of time your developers waste probably makes the most sense to me.

First of all, it works because you can convince your developers you're not a creepy managerial type that wants to micromanage every minute they work (see "measuring hours worked" above).

Developers only need to track minutes wasted waiting for CI/CD processes, code reviews, and general blockers.

It's sort of intuitive that the more developers you hire, the more time will get wasted. It's one of the challenges with scaling an engineering team.

With a pretty standard GitHub + CircleCI setup, when two developers wish to merge into the master branch at the same time, one wins, and the other is stuck waiting for the build to complete before rebasing and merging in their fix. That may be fine when your build is just a small React app with a GraphQL backend, but the more you grow, the more code gets written, the slower the builds become.

Here's a hypothetical example.

You start on a team of 5 people. Your CI/merge process wastes roughly 10 minutes of time per day per developer. That's fine though, because it's very rare that another developer wishes to merge into master at the same time, so only that one developer is affected.

You manage to raise some money/become successful at selling your product. You grow the team to 10 people. As you designate applications as "legacy" and start writing modern code, your build becomes much more involved. It now takes 20 minutes, and now you're making twice as many builds of the product, quadrupling the chance that another developer will be waiting to merge and build their code while the initial developer merges and builds theirs.

## In the end it doesn't really matter what you're measuring.

When you think about it, all you're trying to measure is a trend - developer efficiency. The challenge is keeping a reliable set of data. As long as your accuracy of measurement does not change over time, you should still capture upward and downward trends well enough to know if the changes you've implemented had any effect.

In a later article I'll discuss actual initiatives you could take on to decrease wasted developer time and increase developer happiness.
