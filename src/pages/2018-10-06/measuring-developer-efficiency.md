---
path: "/2018/10/06/thoughts-on-measuring-developer-efficiency"
date: "2018-10-06"
title: "Thoughts on Measuring Developer Efficiency"
author: Max Rozen
tags: ['sre','site reliability engineering']
excerpt: "Thoughts on Measuring Developer Efficiency"
canonical: https://onlineornot.com/blog/thoughts-on-measuring-developer-efficiency
---

_Originally published at <a href="https://onlineornot.com/blog/thoughts-on-measuring-developer-efficiency">OnlineOrNot</a> on October 6, 2018 by Me (Max Rozen)_

### How _do_ you measure developer efficiency?

This question came up during a discussion with a Software Reliability Engineer at work, and I've always had a few opinions on the matter.

Having worked in Big-4 Consulting, most hunts for efficiency that I've witnessed end up like this:

<div style="text-align:center;margin-left:auto;margin-right:auto;display:block;">

<img src="//imgs.xkcd.com/comics/efficiency.png" title="I need an extension for my research project because I spent all month trying to figure out whether learning Dvorak would help me type it faster." alt="Efficiency" srcset="//imgs.xkcd.com/comics/efficiency_2x.png 2x">

[Source: [XKCD](https://xkcd.com/1445/)]</div>

It's not particularly easy to answer the question "How do you measure developer efficiency?", mainly because _you can't_. At least not well/accurately. This may upset you if you're in management, but let me break it down for you:

### Do you measure lines of code written?

Not unless you want to create a fracture in your developer team between frontend and backend devs (a several hundred line frontend form could only require roughly 20 lines in the backend), so by default your frontend devs will look more "effective", but perhaps the backend change required more sitting down and reasoning about the problem.

### Do you count sprint points/estimates?

This one could work - you get the team to estimate the effort by consensus (i.e. use peer pressure to guess how long a task should take), then track how many sprint points were completed every two weeks. The problem with this approach is that it ignores bugs and hotfixes, which depending on your organisation, could be a large portion of developer time, or not much. Your engineers may also not be the best at estimating (no one really is), and estimate tasks to take much more/less effort than actual effort spent.

### Do you measure hours worked?

This one's a bit impractical/difficult. You would have to track individual developer's time on each feature (which I highly recommend against if you want your developers to continue to work with you).

Then you would need to figure out which of your developers get things done faster at a lower quality versus slower at higher quality.

### Do you measure time wasted?

This one might actually be closer to hitting the nail on the head, but requires a bit of thinking to implement.

First of all, it works because you can convince your developers you're not a creepy managerial type that wants to micromanage every minute they work (see "measuring hours worked" above).

So you just ask developers to track the number of minutes they spend waiting for CI, code reviews, blockers etc and track that number.

I've typically observed that the more developers you hire, the more time gets wasted - and that's sort of the issue with scaling engineering teams.

When two developers wish to merge at the same time, one wins, and the other is stuck waiting for the build to complete before rebasing and merging in _their_ fix. That may be fine when your build is just a small React app with a GraphQL backend, but the more you grow, the more code gets written, the slower the builds become.

Here's a hypothetical example.

You start on a team of 5 people. Your CI/merge process wastes roughly 10 minutes of time per day per developer. That's fine though, because it's very rare that another developer wishes to merge at the same time, so only that one developer is affected.

You manage to raise some money/become successful at selling your product. You grow the team to 10 people. As you designate applications as "legacy" and start writing modern code, your build becomes much more involved. It now takes 20 minutes, and now you're making twice as many builds of the product, quadrupling the chance that another developer will be waiting to merge and build their code while the initial developer merges and builds theirs.

### In the end it doesn't really matter.

When you think about it, all you're trying to figure out is a trend - developer efficiency. As long as your methodology for measurement does not change over time, you should capture upward and downward trends accurately enough to know if your changes had any effect.

In a later article I'll discuss actual initiatives you could take on to decrease wasted developer time and increase developer happiness.
