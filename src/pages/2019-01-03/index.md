---
path: '/2019/01/03/graphql-mutation-vs-query-comparison'
date: '2019-01-03'
title: 'What is a GraphQL Mutation, and how is it different to a GraphQL Query?'
author: Max Rozen
excerpt: "When getting started with GraphQL, the difference between mutations and queries can be confusing. Let's compare the two."
image: 'learning.png'
imageAuthor: 'Undraw.co'
---

Before I start, I want to preface that a fair bit of what I've learned working with GraphQL comes directly from both tinkering with code, and reading the actual [GraphQL specification](https://facebook.github.io/graphql/). It may seem dense, but if you just use it to look up the feature you're curious about, it can be helpful!

#### What is a GraphQL Query?

The GraphQL specification defines a query as a "read-only fetch" - essentially a request for data from your server, and getting it back. This is analagous to a GET request against a RESTful service.

A typical query looks like this:

```graphql
{
    query queryName($tag: String!){
        posts($tag) {
            id
            title
            tag
        }
    }
}
```

As a side note - if your query contains no variables or directives, you can use query shorthand:

```graphql
{
  posts {
    id
    title
  }
}
```

#### What is a GraphQL Mutation?

A mutation, on the other hand, is a "write, followed by a fetch" - in this case, the GraphQL client sends data to the GraphQL server, expecting some sort of result back.

As an example, this snippet of GraphQL might "like" a post, and return the updated number of likes as a result.

```graphql
mutation {
  likePost(postID: 1002) {
    post {
      likeCount
    }
  }
}
```

#### Summary

In summary, the difference is that a Query only fetches data, while a Mutation first sends data, then fetches data.
