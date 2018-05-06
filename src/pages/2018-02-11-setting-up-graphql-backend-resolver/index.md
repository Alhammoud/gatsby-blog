---
path: "/2018/02/11/setting-up-graphql-backend-resolver"
date: "2018-02-11T05:52:00.000Z"
title: "Setting up your own GraphQL Backend Resolvers"
tags: ['serverless','graphql']
excerpt: "Setting up your own GraphQL backend - step 1 of my Welcome to GraphQL resolvers series"
---

If you're anything like me and spent years working with REST Frameworks, you'll
probably be confused by this crazy GraphQL thing everyone seems to be talking
about. Why would you even want to work with a graph database? (That was a joke,
GraphQL is NOT a graph database, for clarity see
[here](https://maxrozen.com/2018/01/04/what-is-graphql))

I'm going to show you how you can use Terraform (see my previous blog to get
started with
[Terraform on a Mac](https://maxrozen.com/2018/02/07/getting-started-with-terraform/))
to setup your own GraphQL server.

Pre-requisites:

* Your own AWS account with beefy access rights (you're going to be adding API
  Gateway, Lambda, Cloudfront, Route53 entries, so you'll want a pretty decent
  IAM role for this)
* A Domain (in the end, you'll have example.com/graphql serving your API)

A GraphQL backend can consist of just a few files:

* schema.js
* schema.graphql
* index.js
* resolvers.js
* package.json (optional, in production I would have my dependencies in the
  client/root project package.json)
* webpack.config.babel.js

The most complicated part of GraphQL in my opinion is setting up your
infrastructure to run.

GraphQL has the potential to be infinitely scalable (bound by whichever data
source you put behind it), so we'll be setting up a Cloudfront CDN in front of
an API Gateway, which will point to our Lambda containing our GraphQL function.

TODO: Add Github link to each step/commit with:

* Setup Cloudfront
* Setup API Gateway
* Setup Lambda
* Setup S3 to temporarily keep our zip file
