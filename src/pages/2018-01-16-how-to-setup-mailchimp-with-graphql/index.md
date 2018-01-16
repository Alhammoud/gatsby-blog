---
path: "/2018-01-04-what-is-graphql"
date: "2018-01-04T05:52:00.000Z"
title: "How to setup MailChimp with GraphQL"
tags: ['graphql','mailchimp']
excerpt: "How to add MailChimp to your GraphQL resolver backend - surprisingly easy to do!"
---

This tutorial will walk through adding emails through the MailChimp REST API v3,
using GraphQL resolvers.

To see it in action, check out the filter on one of my side-projects:
[JobsOk](https://www.JobsOk.io)

(Optionally) run the following, to be able to use the Node request library with
promises

```
npm install request-promise-native --save
```

then in your resolvers.js we'll require the request library:

```
const request = require('request-promise-native')
```

then in your schema.js we'll define the createEmail mutation, which will call
our resolver:

```
type Mutation {
  createEmail(name: String!, email: String!, frequency: String!, tag:String, location:String, domain: String!, filter: String, created_at: String!): Email
}
```

Finally, in your resolvers.js we'll create a Promise which restructures the args
coming in, into a format that MailChimp likes (Note - your custom fields can
ONLY go into the merge_fields object), and then POST that data to their
endpoint:

```
createEmail: (root, args, context) => {
      return new Promise((resolve, reject) => {
        const Item = {
          ...args
        }
        const data = {
          email_address: args.email,
          merge_fields: {
            NAME: args.name,
            LOCATION: args.location,
            TAG: args.tag,
            FREQUENCY: args.frequency,
            DOMAIN: args.domain
          },
          status: 'pending'
        }

        const options = {
          json: data,
          headers: {
            Authorization:
              'Basic ' +
              new Buffer('anything' + ':' + MAILCHIMP_API_KEY).toString(
                'base64'
              )
          },

          method: 'POST',
          uri:
            'https://' +
            MAILCHIMP_INSTANCE +
            '.api.mailchimp.com/3.0/lists/' +
            MAILCHIMP_LIST_ID +
            '/members/'
        }

        request(options)
          .then(data => {
            return resolve(Item)
          })
          .catch(err => {
            return reject(err)
          })
      })
    }
```

Note that because my mutation uses a predefined `Email` type, I have to return
the Item object. Your code would be different.

On the frontend, all you have to do is have a GraphQL HOC define your mutation,
then it's just a matter of calling the mutation, like so:

```
createEmailMutation({
  variables: {
    name: name,
    email: email,
    frequency: frequency,
    domain: domain,
    created_at: now,
    tag: tagFilter,
    location: locationFilter
  }
})
```
