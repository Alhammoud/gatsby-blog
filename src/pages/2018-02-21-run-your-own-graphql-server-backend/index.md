---
path: "/2018/02/21/run-your-own-graphql-server"
date: "2018-02-21T05:52:00.000Z"
title: "Run your own GraphQL server"
tags: ['serverless','graphql']
excerpt: "Setting up your own GraphQL backend - step 1 PART 2 of my Welcome to GraphQL resolvers series"
---

##### If you're interested in GraphQL testing, you may want to check out my side project, [OnlineOrNot](https://OnlineOrNot.com).

So I
[recently](https://maxrozen.com/2018/02/11/setting-up-graphql-backend-resolver)
wrote about how easy it was to set up your own GraphQL Resolver backend. Here's
what one of these GraphQL Resolver backends looks like:
https://github.com/rozenmd/graphql-resolvers

Originally my plan was to create a step-by-step guide to teach everyone how to
set their own server up - but after a few beers one night I sort of wrote the
whole thing without thinking twice about committing each step at a time.

# SETUP

1.  Clone this repo: https://github.com/rozenmd/graphql-resolvers
2.  Setup Terraform:
    https://maxrozen.com/2018/02/07/getting-started-with-terraform
3.  Setup your Amazon account according to the instructions in the repo
4.  Edit infrastructure/vars.tf, set up all of your variables
5.  Edit infrastructure/backend.tf, copy your Domain name to bucket and key, and
    copy your aws_region to region (variables don't work in this one file)
6.  Run npm install or yarn in /api, then npm run build
7.  Change directory to /infrastructure, then run terraform init and terraform
    plan to see the new infrastructure to be created. If you're happy with the
    changes, run terraform apply
8.  _OPTIONAL_: To tear down the infrastructure terraform has created, run
    terraform destroy
