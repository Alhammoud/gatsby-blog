---
path: '/2018/10/20/how-to-test-graphql'
date: '2018-10-20'
title: 'How to test GraphQL resolvers'
author: Max Rozen
excerpt: 'There are a few ways you can test your GraphQL server - this article gives you some pointers to help you get started.'
image: 'programmer.png'
imageAuthor: 'Undraw.co'
---

There are a few ways you can test the validity of your GraphQL service:

1. Test the resolver: meaning ensuring that you're injecting all necessary dependencies into your resolvers, then fire them off independently and verify that they do in fact, resolve, with expected data matching the actual data returned, using something like Jest.
2. Write your own test suite that uses something like fetch or Axios to fire off HTTP requests to your GraphQL service, and validate the response (using either a pre-existing staging database, pre-populated with data)
3. Use an end-to-end testing solution for GraphQL that fires off HTTP requests to your live GraphQL endpoint, validating the response (validating against real, live data)

## Testing the resolver

To test your resolvers, you could have a setup like this:

```js
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { graphql } from 'graphql'

// You basically build your schema the normal way, using GraphQL schema language.
// graphql-tools will handle faking the data response back, in the correct type for any query.

// Paste your GraphQL schema here
const typeDefs = `
  type Query {
    hello: String!
  }

  schema {
    query: Query
  }
`

export const schema = makeExecutableSchema({ typeDefs })

// mocks are optional, graphql-tools are perfectly capable
// of sending back faked data
const mocks = {
  // Think of mocks like your resolvers -
  // instead of hitting a database, you could return JSON here
}

// This function call adds the mocks to your schema!
addMockFunctionsToSchema({ schema, mocks })

const query = `
query queryThatYouWantToTest {
  hello
}
`

graphql(schema, query).then(result => console.log('My result: ', result))
```

This file - when run, will mainly test that your resolver returns a certain output for a given input. Nothing more. It will not tell you that your server is operational, how performant your resolver code is, or that your server has lost connection to your live database and can't resolve half of your fields.

With some tweaking, you can point the above file to your real resolvers (mainly via editing the mock object), define some expected data, and then you'll be sure that your resolvers are firing correctly.

For more practical testing, it's worth looking at best practices being used in the open source community.

## Best-practices

For an example of testing GraphQL in production, I tend to look at [Spectrum](https://github.com/withspectrum/spectrum/) for inspiration. Here's how their team describes their [GraphQL test setup](https://github.com/withspectrum/spectrum/tree/alpha/api/test):

> Before running the tests this will set up a RethinkDB database locally called "testing". It will run the migrations over it and then insert some dummy data. This is important because we test our GraphQL API against the real database, we don't mock anything, to make sure everything is working 100%.

I tend to agree with the approach of testing against a real database and not mocking anything, however I advocate for testing with production data. When the queries your service is running are critical for the operation of your business, you want to ensure that the query returns exactly the same result as your user's browser would receive.

OnlineOrNot offers you the ability to black-box test your GraphQL service. You just need to input your query, variables and any headers your application needs, and our worker threads will start polling your site's GraphQL service at regular intervals to ensure the output is still correct.
