---
path: "/2018/10/16/ideas-for-testing-and-monitoring-graphql-servers"
date: "2018-10-16T05:52:00.000Z"
title: "Ideas for testing and monitoring GraphQL servers"
author: Max Rozen
tags: ['sre','site-reliability-engineering','graphql','graphql-server-monitoring', 'graphql-performance-monitoring','graphql-monitoring']
excerpt: "Ideas for testing and monitoring GraphQL servers"
---



I've been having thoughts on how you would go about testing a GraphQL server for performance and reliability recently, as part of what I'm building for <a href="https://onlineornot.com">OnlineOrNot</a>.

## Uptime Monitoring

At the very least, you want to know your GraphQL server is online, and available for your clients to reach (in this case, these are users of your frontend application).

<a href="https://onlineornot.com">OnlineOrNot</a> would let you know if there's an issue with accessibility in a much more succinct manner than Rollbar/Sentry (Think, 'Your GraphQL server is unreachable!' vs 'GraphQL client could not make a connection to ...'), and notify you via Slack, Text message, or PagerDuty notification.

## Performance Monitoring

You've figured out that your GraphQL server is online. Great! Now let's figure out whether it's performing at its best.

<a href="https://onlineornot.com">OnlineOrNot</a> would give you the option to continually test against a list of your most common, business critical queries. You could then see your best and worst performing queries, and optimise them. You could also optionally trigger alerts if a query starts performing intolerably slow.

## Validation and testing correctness

So you've confirmed your GraphQL server is accessible, your queries are performing 90% faster than your baseline, but are they actually correct?

<a href="https://onlineornot.com">OnlineOrNot</a> will let you save the expected JSON result of your queries and compare the results at certain intervals. You then get a notification if your queries are suddenly incorrect - and the beauty of GraphQL is that adding new fields to a model won't break your tests if you're not requesting that data!

# Monitoring Solutions In General

When it comes to monitoring GraphQL performance, you essentially have two options:

1.  Use an external service (outside of your tech stack) to run GraphQL query requests against your GraphQL server every 1 to 5 minutes, logging the response times
2.  Use a snippet of code in your GraphQL server runtime to send a log of the query made, as well as response times and result to the external service

### External, pre-determined requests

The upside to monitoring GraphQL server performance from an external server is that it's 'set and forget'. You get notified if things catch fire, otherwise you get a graph tracking your query's performance. On top of this, it tends to be much cheaper than logging every single request (and there's less chance of data leakage, etc).

The biggest win here in my opinion is that an external request to your GraphQL API closesly matches what your frontend clients would experience - the external testing service would have to go through the same DNS, SSL, CDN and caching as your real users, so you'll have fewer false-positives.

### Logging all requests from the GraphQL server

On the other hand, there's logging requests from within the GraphQL server itself via a code snippet. My initial reaction to this kind of logging is "Great. Yet another snippet of code to include on my server 🙄".

If my GraphQL server goes down (what i'm trying to detect here), the logger goes down with it. There's also the risk of other developers deleting the code snippet unintentionally.

You'd also probably have to manage API keys to send your logs to the external service, and make sure your GraphQL server is able to make outbound trips to the internet (not always guaranteed!)

So given these downsides, I'm inclined to build <a href="https://onlineornot.com">OnlineOrNot</a> as an external monitoring tool that doesn't require logging all of your requests.

## Reliability gains

On the reliability side of things, employing a GraphQL monitoring service allows you to begin to gain an understanding of how often your service goes down, and at what time (so you can go into your CI and find the build that caused it).

This sets up a sweet build-measure-learn loop for your SRE/DevOps team (which lets face it, is probably a regular web developer that got conned into maintaining the stack - so any time savings are a huge win).
