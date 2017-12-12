---
path: "/2017-12-12-inline-import-graphql-issues"
date: "2017-12-12T18:52:00.000Z"
title: "How to resolve 'X defined in resolvers, but not in schema' with babel-plugin-inline-import"
tags: ['react','babel','graphql','inline-import']
excerpt: "Showing how to resolve the dreaded 'Query.X defined in resolvers, but not in schema' issue when your X is **definitely** defined in both"
---

The inspiration for this post comes from this closed issue in
babel-plugin-inline-import
(https://github.com/Quadric/babel-plugin-inline-import/issues/1) a plugin that
my company uses in almost all of our projects.

Essentially, the issue is that you'll run your `npm run dev` script, decide to
modify your resolvers, or your schema, re-run the script to get your resolvers,
and boom:

`'Query.X defined in resolvers, but not in schema'`

The root cause here is that the babel-plugin-inline-import plugin caches your
schema.

The resolution is essentially to have `BABEL_DISABLE_CACHE=1` in your `.env`,
and to have two separate webpack files, one for your graphql API, and another
for your client.

In my graphql webpack config I have the following:

```
module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '..'),
        exclude: path.resolve(__dirname, '..', 'node_modules'),
        loader: 'babel-loader'
      },
      {
        test: /\.graphql$/,
        include: path.resolve(__dirname, '..'),
        exclude: path.resolve(__dirname, '..', 'node_modules'),
        loader: 'graphql-tag/loader'
      }
    ]
  }
```

Which will include my graphql schema inline (which I keep in my project root)
