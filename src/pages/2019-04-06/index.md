---
path: '/2019/04/06/how-to-get-started-with-side-projects'
date: '2019-04-06T05:52:00.000Z'
title: 'How to get started with side projects'
author: Max Rozen
tags: ['software-engineering', 'meta', 'learning']
excerpt: 'Side Projects. Employers say they love them, your peers seem to all have them: how do you get started?'
---

It's hard.

I'm not going to sugar-coat this, getting started with your first side project is hard. You'll probably not finish it - but that's okay.

## How the hell do you find the time?

You just do.

Either wake up an hour earlier if you're a morning person (in my case, I tend to work on my side projects from about 6am to 8am), or an hour or two after you get home from work.

I get it, you get home feeling exhausted after a day of being in the office, last thing you want to do is more work. After an hour or two of relaxing, just start making baby steps towards building the side project you want.

Whether it's drawing out components you want to build, or planning what the project actually is - do something, for like half an hour. It'll feel great.

## Motivation

To get started, you're first going to want to figure out what your motivation for building the project is. Are you:

- A: Just building something to show that you can?
- B: Just trying to get an idea out into the world to see how people react to it?
- C: Pushing the boundaries of your learning by trying something you've never done before?
- D: Trying to explore the advantages/disadvantages of a new technology?

### Just building ideas to show that you can

From what I've seen in my six-ish years of randomly building projects, this is the motivation most folks have for starting out a side project. The trick here is to <b>build with something you already know</b>.

In my case, I already knew Django, Python and Postgres, but back in 2013 I was convinced NoSQL was the future (as many of us were), so I kept trying to build projects with MongoDB and Node.js as a back-end. All I learned from this experience was that I hated writing backend services for REST, and didn't even get a chance to start building a frontend.

I eventually completed an app similar to Splitwise using Django, only to find my frontend sucked (I build it in pure Bootstrap, without thinking of being mobile-responsive). _Side-note: test with people early, if you want people to actually use the thing you're building_.

This ended up motivating me to get better with my frontend skills, and lead me to React.

### Trying to get an idea out into the world

Similar to the previous motivation, when you're building a side project to just get an idea out into the world, you'll want to build with something you know.

When I build my own side-projects, I already have a cookie-cutter template of a serverless GraphQL backend and an S3+Cloudfront hosted React frontend ready to go, all I need is an idea to build.

The <b>really important</b> detail most people miss here is that they build too much. You just want to figure out if someone would use your product/idea/service, so why are you building a login form? or payment gateway integration? or user management features?

I've personally screwed this up several times - but unless someone has their credit card in hand begging you to let them pay you, don't build your payment integration.

### Pushing the boundaries of your learning

In this case, we take the polar opposite approach to releasing an idea. Pick a simple idea that you know is feasible, and build it with something wild.

In my case, I built a job board in React and GraphQL and hosted the app serverlessly when these technologies were completely new to me. Took about three months, was totally worth it. I still revisit that job board whenever I want to try something new - at the moment I'm rewriting it using a new Design System/Component library (rather than the Material UI I originally wrote it in).

### Exploring the advantages/disadvantages of a technology

Honestly, I've never set out to experiment with a technology just to figure out the advantages/disadvantages of its use.

Rather, I tend to build with a set of technologies to learn how they work together, and through that experience I come to conclusions about how a technology works for a given use-case.

For example, in the job board I decided to use DynamoDB (a NoSQL document database by AWS), despite having highly relational data - such as job listings, technologies used, companies, locations.

What I learned through about a month of hell trying to wrangle data in a GraphQL backend is that perhaps DynamoDB isn't well suited to highly relational data 😅 (I could have denormalised the data, and kept everything in one table, but I wanted to be able to have tables I could as data-sources for Dropdown components).
