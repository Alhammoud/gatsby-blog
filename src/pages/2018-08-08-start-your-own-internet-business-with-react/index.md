---
path: "/2018/08/08/start-your-own-internet-business-with-react"
date: "2018-08-08T05:52:00.000Z"
title: "Start your own internet business with React, GraphQL and Serverless architecture"
tags: ['graphql','serverless','react']
excerpt: "Start your own internet business with React, GraphQL and Serverless architecture"
---

This may seem corny, but in this blog post I'll walk you through what you need to do (tech-wise) to have a React app where your customers can login, pay for things and use your internet business.

Pre-work - Read:

1.  https://maxrozen.com/2018/02/07/getting-started-with-terraform/
1.  https://maxrozen.com/2018/01/04/what-is-graphql

Pre-work - Know:

1.  Basics of JavaScript ES6
1.  AWS (we'll be spinning up resources using terraform)
1.  How to debug when things don't go your way.

I'll be describing modifications to make to existing code, rather than providing a fully complete repository, to ensure that this guide is easier to update.

The architecture consists of four main parts:

1.  A GraphQL server (An Express server running in AWS Lambda - Node v8 environment)
1.  A database of some sort (either Key:Value store such as DynamoDB/RethinkDB or traditional, like Postgres)
1.  A 'Server-side rendering' server (The React app running in AWS Lambda - Node v8 environment)
1.  The Static resources - sitting in an S3 bucket, send to your users via a CloudFront CDN (which also conveniently provides you with free SSL certificates!)

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

Next, we'll edit the `src/index.js` file to allow us to run in AWS Lambda when we're in production, and run normally when we're developing locally.
Run `npm install aws-serverless-express` in the project root, then add the following to the top of `src/index.js`:

```
if(process.env.NODE_ENV === 'if (process.env.NODE_ENV === 'production') {
  import awsServerlessExpress from 'aws-serverless-express'
  import app from './server'
  const binaryMimeTypes = [
    'application/octet-stream',
    'font/eot',
    'font/opentype',
    'font/otf',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
  ]
  const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)

  export const handler = (event, context, callback) => {
    awsServerlessExpress.proxy(server, event, context)
  }
} else {
```

You'll notice there that we left that last curly bracket un-terminated. Add the `}` on the very last line of the file.

At this point, we can step back, write some terraform scripts to build our infrastructure,
