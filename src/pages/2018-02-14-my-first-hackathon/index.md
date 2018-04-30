---
path: "/2018/02/14/my-first-hackathon"
date: "2018-02-14T05:52:00.000Z"
title: "My First hackathon"
tags: ['architecture','hackathon']
excerpt: "An overview of my approach to my first ever hackathon"
---

This weekend my partner and I are competing in our first ever hackathon -
<a href="https://www.eventbrite.com/e/sydney-women-startup-weekend-tickets-42224772431">Sydney
Women Startup Weekend</a>

While I would typically focus on the technical side of things, I've also given
input on steering the product - a 'marketplace' or platform for meeting people
who want to teach each other how to cook.

On the technical side of things, I've been thinking of the sort of stack I would
build, and have narrowed it down to the following:

### Route 53

* Just a standard DNS service, nothing much to see here. Will be pointing our
  startup's URL to the cloudfront distribution

### Cloudfront CDN

* Sitting in front of:

  #### S3-hosted frontend

  Depending on my build tool - this would just be a run of `npm run build` and
  the output copied to S3

  #### API-Gateway hosted Lambda or AppSync backend

  This will be the `/graphql` endpoint that my client interacts with to get
  data - really useful feature of cloudfront to be able to split endpoints into
  different locations

### ReactJS frontend

* Parts:

  #### AWS Cognito for Authentication

  * I've been thinking a _lot_ about Authentication and Authorization recently - it's sort of why I've opted to build AppointmentScheduler.org without a login until I figure it out. Essentially I see logins as a necessary evil to protect user privacy, but they also create substantial friction for users who just want to try your service out, and don't want to commit to anything.
  * In this case, I'm hoping that AWS Cognito will provide me a solution for User Authentication (User login, logout, forgotten password and user profile) that I can just plug into AWS AppSync or join to a DynamoDB table

  #### AWS AppSync/Apollo for a GraphQL client

  * Essentially just a standard GraphQL client to talk to my GraphQL resolvers - with some extra AppSync magic (like holding data in a message queue until the user is back online again)

  #### Reactstrap or Material UI for the Look & Feel

  * [Reactstrap](https://reactstrap.github.io/) is basically just a set of
    Bootstrap v4 React components which can be easily dropped in to build a
    site's layout
  * [Material-UI](https://material-ui-next.com/) is Google's Material Design
    framework - and similar to Reactstrap, is a set of React components that can
    be put together like lego to build your layout

  #### Webpack and Babel as our build tool

  * I basically just intend to use this
    [blog post](http://ccoenraets.github.io/es6-tutorial-data/babel-webpack/) to form the basis of the build system

### AWS-based Backend

* Parts:

  #### AWS AppSync (GraphQL Resolvers) using DynamoDB

  * I've previously blogged about this [here](https://maxrozen.com/2018-01-04-what-is-graphql) and [here](https://maxrozen.com/2018-02-11-setting-up-graphql-backend-resolver/) - but essentially GraphQL resolvers are a sort of middleware layer you drop in front of your data source, and your client can seamlessly request only the fields it requires.

  - Something new for me - I just wanted to try out AppSync's real-time database. One of the parts of the system I see myself building this weekend is a real-time messaging database, and I will be researching the likes of Discord and Slack to see how they handle messaging.
