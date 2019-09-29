---
path: '/2019/02/12/what-problem-does-graphql-solve'
date: '2019-02-12'
title: 'What problem does GraphQL solve?'
author: Max Rozen
excerpt: "Simply put, here's the problem that GraphQL solves."
image: 'developer.png'
imageAuthor: 'Undraw.co'
---

## What's the big deal about GraphQL?

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">GraphQL brings all of your company&#39;s data and services together in one place so you can build products faster.</p>&mdash; Peggy Rayzis 👩🏼‍💻 (@peggyrayzis) <a href="https://twitter.com/peggyrayzis/status/1093252286363643904?ref_src=twsrc%5Etfw">February 6, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Basically, instead of having a web app that can only talk to its own database, you can build a web app that has access to all of your company's databases (that you want it to have access to), and group the data in logical data types.

Meaning you could hypothetically build a schema for your user data type containing both the regular app fields like `first_name`, `last_name`, `email` etc but also CRM data, such as likelihood to purchase, what type of lead they are, and serve them a different view of the app catered to the unique needs of that particular part of the sales funnel.

Before GraphQL, implementing something like that would require special manipulation of data, spinning up a new backend API, and a _lot_ of testing. Now with GraphQL you just add the methods to fetch the data in GraphQL, and the frontend already knows how to fetch the fields it needs.
