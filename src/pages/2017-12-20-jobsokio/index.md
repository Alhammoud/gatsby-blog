---
path: "/2017-12-20-my-side-project-jobsok-io"
date: "2017-12-20T08:52:00.000Z"
title: "My Side-project: https://JobsOk.io"
tags: ['react','graphql','side-project']
excerpt: "A rundown of my latest side-project: A job board dedicated to Digital jobs"
---

My latest side-project is https://JobsOk.io - a job board for Digital Jobs in
Sydney.

It sort of grew out of frustration with other job boards such as indeed, which
has a low signal:noise ratio, and requires serious amounts of scrolling before
you find anything that's actually a job at a real company.

Before you ask 'Seriously, yet another job board?' - I'll just interject and say
I did this mostly to gather what I've learned in my new role at Arup in one
place.

#### Tech Stack:

Features:

* Infinitely scalable
* ... that's about it

The solution is a graphql endpoint (AWS Lambda function) returning 7 rows of
data at a time from AWS DynamoDB.

On the front-end, I'm using React without Redux (I only really have two main
components to pass data around to) and Apollo as my graphql client. I've also
chosen to integrate Stripe as my payment provider due to the ease of
understanding their documentation.

This is then bundled up in webpack, deployed to Amazon S3 and distributed
globally in Cloudfront CDN. I'm pretty happy with the scaling so far, as it
tends to load 99% faster than most websites regardless of where you are
worldwide (an astute reader will note that I mentioned earlier that it's a job
board for Sydney, so why global distribution? Answer: I'm not finished yet, and
once I build a crawler and serverless search functionality I'll be taking
JobsOk.io globally)
