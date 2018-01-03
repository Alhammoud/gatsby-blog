---
path: "/2018-01-04-what-is-graphql"
date: "2018-01-04T05:52:00.000Z"
title: "What is GraphQL?"
tags: ['GraphQL']
excerpt: "What exactly *is* GraphQL? Using NodeJS and AWS Lambda to illustrate an example"
---

GraphQL is both a client-side query language, and a server-side runtime for
fetching data from various sources.

A common misconception (at least one that I had) is that client-side GraphQL
interacts with a GraphQL database, and magically brings back data. Similar to
how you would use SQL to query a Postgres database.

This is not the case. GraphQL is not tied to any particular database or backend
API. In fact, you can have several databases and external services working
together to pull in a unified view of something (See example below).

Instead, what happens is that on the client-side, you query your GraphQL backend
service using queries such as:

```
{
  user {
    id
    name
  }
}
```

and your GraphQL backend backend service would respond with JSON of the format:

```
{
  "user": {
    "id": 1,
    "name": "Max"
  }
}
```

Your GraphQL backend service (we're using Node, running on Lambda in this
example) would typically consist of a few files:

```
- graphql/
- - index.js // NodeJS/Lambda specific call to graphql()
- - resolvers.js // This file contains the logic of how you fetch your data
- - schema.graphql // This file tells GraphQL what format/types to expect the data in
- - schema.js // This file imports the GraphQL schema and the resolvers, combining them into an executableSchema
```

The index.js file only really parses the lambda event, and sends the query off
to GraphQL (Note, this example does NOT handle authentication):

```
import schema from './schema'
exports.handler = function(event, context, callback) {
  const query = event.Requests[0].body.query
  const root = {}
  const context = {}
  const variables = {}
  graphql(schema, query, root, context, variables)
    .then(d => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(d),
      })
    })
    .catch(e => {
      callback({
        statusCode: 500,
        body: 'WTF?',
      })
    })
}
```

Since all requests for data from the client-side are now just going to this one
function, we only really need one endpoint - `/graphql/` or `/data/`

This also saves you from having to document your hundreds of internal endpoints
for particularly large projects, since everything is described in the schema
file (assuming you name things clearly!)

### How do I actually get the data?

Say you have a schema, like this:

```
scalar JSON
type User {
  name: String!
  count: Int!
  somethingElse: Float!
}

type Query {
  user(id: Int!): [User],
}

schema {
  query: Query
}
```

Your resolvers file could look similar to the file below:

```
import pg
import aws-sdk/clients/DynamoDB as docClient
resolvers: {
    Query: {
      user(root, args, context) {
        const { id } = args
        docClient.query(
          {
            TableName: 'users',
            Key: {
              ID: id,
            },
          },
          function(err, data) {
            return data.Items
          }
        )
      },
    },
    User: {
      name(root, args, context) {
        pg.query('Select * from Users where id = ?', [123]).then(d => {//doStuff})
        //OR
        fetch(context.upstream_url + '/thing/' + args.id).then(d => {//doStuff})

        return root.name + '_thing'
      },
      somethingElse(root) {
        return root.count + 0.002
      },
    },
```

In this example, we pull in the bulk of our User fields from the AWS DynamoDB
docClient.query call. We can then add extra fields like `name` from external
sources (Postgres or an `upstream_url` in this example). You can even hard code
values, as in the case of `somethingElse`.
