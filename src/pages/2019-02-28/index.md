---
path: '/2019/02/28/how-to-integration-test-graphql'
date: '2019-02-28'
title: 'How to: Integration test GraphQL'
author: Max Rozen
excerpt: "You've got your resolvers in place, server deployed and ready to go, how do you know if your endpoint will send you data?"
image: 'going_up.png'
imageAuthor: 'Undraw.co'
---

### What does Integration Testing even mean for GraphQL?

Integration testing in the context of GraphQL means testing your server's ability to call the resolvers to fetch the data.

Typically you'd already have individual unit tests for the logic within your resolvers, and you just want to test whether or not your server actually sends the data the way you expect it to.

### How do you do it?

First off, you're going to need a GraphQL server.

You'll then need to write a helper function that runs GraphQL queries against your server's address.

#### First run

For each test, the function will need to:

- Run the GraphQL query against the server
- Save the result as a snapshot, preferably to JSON, as well as any desired metrics such as latency

#### Subsequent runs

For each test on subsequent runs, the function will need to:

- Run the GraphQL query against the server
- Record the result of the query, as well as some metrics
- Compare the result of the query to the saved snapshot, noting down any differing or missing values
