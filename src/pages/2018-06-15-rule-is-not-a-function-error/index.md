---
path: "/2018/06/04/rule-is-not-a-function-error"
date: "2018-06-15T05:52:00.000Z"
title: "How to fix 'rule is not a function' error"
tags: ['graphql']
excerpt: "How to fix 'rule is not a function' error"
---

We recently had this _really_ descriptive error at work: `rule is not a function`

The error boils down to Facebook engineers breaking compatibility with graphql 0.12.x in certain versions of Relay.

## The fix

Bump your GraphQL and Relay versions - in package.json we set our versions to:

- graphql to 0.13.2
- relay to 1.6

Source:
https://github.com/facebook/relay/issues/2428
