---
path: "/2017-12-20-my-side-project-jobsok-io"
date: "2017-12-20T08:52:00.000Z"
title: "My Side-project: https://JobsOk.io"
tags: ['react','graphql','side-project']
excerpt: "A rundown of my latest side-project: A job board dedicated to Digital jobs"
---

My latest side-project is https://JobsOk.io - a job board for Tech Jobs
worldwide.

It sort of grew out of frustration with other job boards such as indeed, which
has a low signal:noise ratio, and requires serious amounts of scrolling before
you find anything that's actually a job at a real company.

This project's purpose was mostly to gather what I've learned in my new role at
Arup in one place.

#### Background & Approach:

After running my portfolio website on a classic Linux/nginx server setup for a
year, I grew tired of having to pay for it ($12 per month for 50ish hits per
month) - so I was already keen to keep my side-projects as cheap as possible

I gave myself a few constraints to make the project a little more challenging:

* No servers
* As cheap as possible
* Must be effortlessly scalable

Essentially it's just a S3-hosted frontend with a DynamoDB-powered backend.

The real challenge came from figuring out the backend. Since I had worked for a
year with Django and Django REST Framework, it seemed like a natural fit to have
Django models connected to DynamoDB, and just have JavaScript Fetch calls
grabbing the data.

Though fetching the data only after the page had loaded wasn't the most
performant - the pages would load only after 2 seconds or so. Moving page
fetches out of my components and into Redux actions appeared to speed up load
times considerably.

The issue with my approach was that Django doesn't natively support DynamoDB,
and just setting it up with MongoDB is a complete pain. So to get DynamoDB
working I would have to write my own ORM, and I hate Yak-shaving.

Enter [API Star](https://github.com/encode/apistar) - an API Framework designed
to out-perform Node. It was simple enough to setup the python library PynamoDB
to interact with DynamoDB, but the performance wasn't the best (Scan operations
were taking 1 second per record retrieved)

This then lead me to re-write the entire backend using Node and Graphql. I had
worked with a couple of implementations of graphql backends at work already, and
knew the performance was much better than Flask/Django. Net result: I now have a
backend in 36 lines of code to accept graphql requests, and handle errors.

#### End Result:

The solution is a graphql endpoint (AWS Lambda function) returning 7 rows of
data at a time from AWS DynamoDB.

On the front-end, I'm using React with Redux and Apollo as my graphql client.
I've also chosen to integrate Stripe as my payment provider due to the ease of
understanding their documentation.

This is then bundled up in webpack, deployed to Amazon S3 and distributed
globally in Cloudfront CDN. I'm pretty happy with the scaling so far, as it
tends to load 99% faster than most websites regardless of where you are
worldwide.
