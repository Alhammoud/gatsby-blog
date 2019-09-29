---
path: '/2018/12/15/apollo-vs-relay-which-graphql-client-to-use-2019'
date: '2018-12-15'
title: 'Apollo vs Relay Modern: Which GraphQL Client to consider using in 2019'
author: Max Rozen
excerpt: "If you're building an app using GraphQL, oftentimes the most difficult decision is picking a client to use. This article discusses the pros and cons of each technology."
image: 'conversation.png'
imageAuthor: 'Undraw.co'
---

## Do we even need a client?

I first wrote a version of this article just over 16 months ago, and it's pretty impressive how much the GraphQL community has achieved in that time.

First of all, the question is no longer _really_ Apollo or Relay, but rather Apollo or does one even need a fancy client at all. If you're just testing the waters with GraphQL and don't want to change your existing app too much, you can just use `fetch` in your component like so:

```js
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({ query: '{ hello }' }),
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data))
```

The main benefit to adopting a GraphQL client is the cache implementation. Using fetch is fine to begin with, but you don't want to be using it in an app where users quickly jump between views.

In [OnlineOrNot](https://onlineornot.com) we use Apollo to cache query results - which gives us quite a noticable boost in performance. How it works in practice:

- User opens a list of their GraphQL applications -> this list gets cached
- User opens a list of tests -> client has already fetched data about the applications, so it adds the tests to each application
- User now visits their list of applications again -> no new GraphQL request is made, all results are already in memory

Essentially, the more the user clicks around your application, the faster your user experience becomes.

## On Bundle size

One of the biggest complaints I hear about adopting Apollo is the bundle size (Apollo Boost, the "easiest way to get started with Apollo Client" weighs in at 30.7 kB min+gzipped), so luckily there are also alternative lightweight clients to consider:

- Formidable Labs' [urql](https://github.com/FormidableLabs/urql) - 12kB min+gzipped (with perhaps the best README I've ever seen)
- Prisma's [graphql-request](https://github.com/prisma/graphql-request) - 4 kB min+gzipped
- Adam Rackis' [micro-graphql-react](https://github.com/arackaf/micro-graphql-react) - 3.1kB min+gzipped

No article on GraphQL clients would be complete without mentioning [AWS Amplify](https://github.com/aws-amplify/amplify-js). Though Amplify does take an 'everything but the kitchen sink' approach to features, and you get _everything_ included with it:

- Authentication
- Analytics
- API
- GraphQL Client
- Storage
- Push Notifications
- Interactions
- PubSub
- Internationalization
- Cache

Thus Amplify may not suit your needs unless you're building a whole product experience that relies on GraphQL and don't want to customise your approach.

## Why I like Apollo Client

The setup is considerably easier than Relay - it involves installing one package, and adding the `ApolloProvider` to the root of your React tree.

The API is nice - they have an equivalent to Relay's QueryRenderer called `Query` that does what it says:

```jsx
<Query
  query={gql`
    {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `}
>
  {({ loading, error, data }) => {
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return data.rates.map(({ currency, rate }) => (
      <div key={currency}>
        <p>{`${currency}: ${rate}`}</p>
      </div>
    ))
  }}
</Query>
```

It can be used to manage state in your React app - that is, you can directly write to Apollo's Redux-like store and consume that data in another part of the React tree. Though with React's new Context API, and React's best practices of [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html) you probably won't need it.

```jsx
import React from 'react'
import { ApolloConsumer } from 'react-apollo'

import Link from './Link'

const FilterLink = ({ filter, children }) => (
  <ApolloConsumer>
    {client => (
      <Link
        onClick={() => client.writeData({ data: { visibilityFilter: filter } })}
      >
        {children}
      </Link>
    )}
  </ApolloConsumer>
)
```

#### Downsides to Apollo

- It's huge. It weighs in at 10x more than the smallest GraphQL client I'd consider using, and 3x more than urql

#### Quirks

Apollo is not without quirks however:

- Since Apollo uses `id` to build its cache, forgetting to include `id` in your query can cause some interesting bugs and error messages

## Why I dislike Relay

#### Setup

The main benefit to using Relay is that `relay-compiler` doesn't get included in your frontend bundle, saving your user from downloading the whole GraphQL parser - it "pre-compiles" the GraphQL queries at build time.

What annoys me about Relay is that it requires a fair bit of work to even add to a project. Just to get it running on the client side, you need to:

- add a relay plugin to your `.babelrc` config
- set up relay-compiler as a yarn script
- setup a "relay environment" (essentially your own `fetch` utility to pass data to the relay-runtime), and
- add `QueryRenderer` components to the React Components you wish to pass your data to

On the server side, you need to:

- Ensure the IDs your app returns are unique across all of your types (meaning you can't return nice ID values like `1, 2, 3`, they need to be like `typename_1, typename_2`)

#### Developer Experience

The developer experience itself is pretty unpleasant too - `relay-compiler` needs to run each time you modify any GraphQL query, or modify the schema. In large frontend teams this means teaching everyone to run `relay-compiler` every time you change branches in Git, since almost all of our work involves fetching data from GraphQL in some way.

#### Quirks

Being one of Facebook's Open Source projects doesn't necessarily mean issues get fixed quickly. Occasionally, things break in unexpected ways:

- Using an old version of `graphql` breaks `relay`: https://github.com/facebook/relay/issues/2428
- Errors don't get sent via the error object in GraphQL when using QueryRenderer, instead one needs to create an `error` type, and send the errors through the data object: https://github.com/facebook/relay/issues/1913
