---
path: "/2018/08/08/start-your-own-internet-business-with-react"
date: "2018-08-08T05:52:00.000Z"
title: "Start your own internet business with React, GraphQL and Serverless architecture"
tags: ['graphql','serverless','react']
excerpt: "Start your own internet business with React, GraphQL and Serverless architecture"
---

This may seem corny, but in this blog post I'll walk you through what you need to do (tech-wise) to have a React app where your customers can login, pay for things and use your internet business.

The architecture consists of four main parts:
1. A GraphQL server (An Express server running in AWS Lambda - Node v8 environment)
1. A database of some sort (either Key:Value store such as DynamoDB/RethinkDB or traditional, like Postgres)
1. A 'Server-side rendering' server (The React app running in AWS Lambda - Node v8 environment)
1. The Static resources - sitting in an S3 bucket, send to your users via a CloudFront CDN (which also conveniently provides you with free SSL certificates!)

On the payment side of things, we'll add a GraphQL resolver that talks to Stripe, but more on that later.

To begin, we're going to use Razzle. It's like Create-react-app, but for server-side rendering.

```
npm install -g create-razzle-app

create-razzle-app my-app
cd my-app
npm start
```

Now, because we're going to be deploying this onto a server-less environment, we need to change how Razzle builds code. To do that, we're going to create a file in the project root directory called `razzle.config.js`, with the following content:
```
module.exports = {
  modify: (config, { target, dev }, webpack) => {

    const appConfig = config

    if (target === 'node' && !dev) {
      appConfig.externals = []
    }

    return appConfig
  },
}
```
