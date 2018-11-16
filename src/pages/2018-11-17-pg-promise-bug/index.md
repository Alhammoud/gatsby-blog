---
path: "/2018/10/16/how-to-fix-pg-promise-cant-resolve-pg-native"
date: "2018-11-17T05:52:00.000Z"
title: "How to fix: pg-promise can't resolve pg-native"
author: Max Rozen
tags: ['graphql']
excerpt: "A Fix for the error message 'pg-promise cant resolve pg-native'"
---

I ran into this issue while building the GraphQL resolvers for [OnlineOrNot](https://OnlineOrNot.com): `pg-promise can't resolve pg-native`.

Basically when you build for production, Webpack can't find the pg-native library (which is an optional include!).

The fix is to add `new webpack.IgnorePlugin(/^pg-native$/)` to your Webpack config's plugins array:

```js
const webpackConfig = {
  ...
  resolve: { ... },
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/)
  ]
  output: { ... }
  ...
}
```
