---
path: '/2018/11/04/what-is-graphql-and-why-should-my-team-use-it'
date: '2018-11-04'
title: 'What is GraphQL, and why should my team use it?'
author: Max Rozen
excerpt: 'GraphQL is a query language for your API, giving clients the ability to ask for exactly the data they need and nothing more. This article discusses why your team should consider adopting it.'
image: 'question.png'
imageAuthor: 'Undraw.co'
---

## What is GraphQL?

Despite the 'QL' in the name, GraphQL is very different from SQL.

It is both a client-side query language for requesting data from APIs, as well as a specification describing how to build a runtime for the servers that respond to these queries.

A common misconception is that client-side GraphQL interacts with a GraphQL database, and magically brings back data. While as a frontend developer, it may feel like that sometimes - it's actually quite different.

GraphQL is not tied to a specific database or a backend API. You can think of the GraphQL layer as a wide middleware that acts like a look-up list. Each individual piece of data/field on a model can have a function defining what the GraphQL server should do when that data is requested.

This allows you to expose parts of your main database, to be accessible via GraphQL, but also any external API calls your frontend makes can be moved into the GraphQL layer. What this means is that your frontend no longer needs updating when the means of data retrieval change.

- Upgrading from MongoDB to Postgres? Just update the resolver. Zero code needs changing on the frontend.

## Why should we consider adopting it?

##### Ask the server what you need, and get exactly that from the database

This means your queries can look like this:

```graphql
{
  user {
    id
    name
  }
}
```

and the response from the GraphQL server will be:

```json
{
  "user": {
    "id": 1,
    "name": "Max"
  }
}
```

##### Many resources, one request

While a typical application relying on a RESTful backend would require multiple trips to different URLs to fetch all the data your frontend needs to display, GraphQL sends you the data in one trip.

While most examples you'll see of GraphQL typically involve fetching one or two fields on a single model, such as a User's name, this feature is incredibly useful in real-world cases such as this:

```graphql
{
  user {
    id
    name
    transactions {
      id
      description
      transactedWithUser {
        id
        name
      }
    }
    paymentDetails {
      id
      name
    }
    subscription {
      status
      validUntil
    }
  }
}
```

If that query were to be fulfilled by a RESTful API, it would require:

- Fetching the User ID, sending it back to the Client

- Fetching the list of Transactions for that User ID, sending it back to the Client

  - For each transaction, fetching the Transaction's transactedWithUser ID and name, and sending it back to the client

- Fetching the payment details for that User ID, sending it back to the Client

- Fetching the subscription details for that User ID, sending it back to the client

You can see how quickly that series of requests can add up to serious waiting time for your end user - especially for slow mobile network connections.

If that query were to be fulfilled by GraphQL, on the other hand, it would require a single request, which would return two objects: a list of errors, and the results object (Typically you would see an empty list of errors, and a full results object, however should your GraphQL server fail to resolve a field, it would still send back any data it managed to resolve).

##### Typed data

Rather than splitting up your RESTful API by endpoint, GraphQL is organised by Types and Fields. This allows it to provide clear and useful error messages when Clients ask for things that aren't possible. On top of this, Apps can rely on types to avoid having to write code to manually parse inputs (i.e: is this input an object or a string?)
