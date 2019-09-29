---
path: '/2018/08/04/apollo-vs-relay-picking-a-graphql-client'
date: '2018-08-04T05:52:00.000Z'
title: 'Apollo Vs Relay: Picking a GraphQL Client'
tags: ['graphql']
excerpt: 'Apollo Vs Relay: Picking a GraphQL Client'
---



I'm assuming the reader is familiar with GraphQL, and already has a GraphQL server running. If not, you may wish to review some of my previous posts: [what is graphql?](https://maxrozen.com/2018/01/04/what-is-graphql) and [how to set up your own GraphQL resolvers](https://maxrozen.com/2018/02/11/setting-up-graphql-backend-resolver).

This post discusses the pros and cons of picking a GraphQL client for frontend web development in 2018. The ecosystem can and will change, so do your own research.

### Arguments for Relay

- It promotes ridiculous efficiency. You pair your fragments with your components, and you only ask for the fields you need.
- The data structure it requires to work is by default compliant with pagination
- Due to the pre-generation of GraphQL queries by the relay-compiler, your frontend bundle is smaller. You don't have to bundle the graphql parser with your frontend.

### Arguments against Relay

- It requires a bit of refactoring to add it to an existing project.
- IDs need to be unique _ACROSS ALL OF YOUR TYPES_. This means you can't have nice ID values like `1, 2, 3` etc. You have to make them like `typename_1`
- Actually implementing pagination is quite complex
- QueryRenderer is quite buggy - it doesn't send errors as errors, and requires that you create an `error` type to be able to render errors on the frontend
- QueryRenderer is cumbersome/illogical to use if you've ever used Apollo - You don't have to import graphql or even relay to create graphql queries in sub-components, creating a point of confusion for new users (what happens is that Relay walks the DOM down from the QueryRenderer and generates graphql statements for the query fragments you write in the components).
- You have to run `relay-compiler --src client/src --schema ./schema.graphql` every single time you modify _ANY_ GraphQL query or part of the schema
- The documentation could be better - lots of confusing parts that aren't explained clearly

### Arguments for Apollo

- Setup is easier than Relay
- Newer versions enable the replacement of Redux, as Apollo Client can be used for State Management
- Developer experience is wonderful
- Documentation is impeccable
- Rapid development of the project itself - Most changes are focused on making adoption easier

### Arguments against Apollo

- Bundle bloat - The Apollo Client requires a parser to be bundled in with the frontend, increasing the bundle size more than Relay would
- Adding pagination requires jumping through a few hoops, although still doable
- Rapid development of the project itself - over the past 6 months the API has wildly changed
- Some quirks in the Apollo store (where GraphQL query results are cached) do/did exist, querying a type without an `id` can cause strange results (in v1)

### Adding Apollo to your project

- You run `npm install apollo-boost react-apollo graphql --save`
- Create a client in your root component:

  ```js
  import ApolloClient from 'apollo-boost'

  const client = new ApolloClient({
    uri: 'localhost:8080/graphql',
  })
  ```

- Wrap your app in an Apollo Provider:

  ```jsx
  import React from 'react'
  import { render } from 'react-dom'

  import { ApolloProvider } from 'react-apollo'

  const App = () => (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
      </div>
    </ApolloProvider>
  )

  render(<App />, document.getElementById('root'))
  ```

- An actual GraphQL wrapped component now looks like this:

  ```jsx
  import gql from 'graphql-tag'
  import { Query } from 'react-apollo'

  const GET_DOGS = gql`
    {
      dogs {
        id
        breed
      }
    }
  `

  const Dogs = ({ onDogSelected }) => (
    <Query query={GET_DOGS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        return (
          <select name="dog" onChange={onDogSelected}>
            {data.dogs.map(dog => (
              <option key={dog.id} value={dog.breed}>
                {dog.breed}
              </option>
            ))}
          </select>
        )
      }}
    </Query>
  )
  ```

### Adding Relay to your project

- Run `yarn add react react-dom react-relay`
- Run `yarn add --dev babel-plugin-relay graphql`
- Add `relay` to your `.babelrc`:

  ```js
    {
      "plugins": [
        "relay"
      ]
    }
  ```

- Please note that the "relay" plugin should run before other plugins or presets to ensure the graphql template literals are correctly transformed.
- Run `yarn add --dev relay-compiler graphql`
- Add this to your npm scripts: `"relay": "relay-compiler --src ./src --schema ./schema.graphql"`
- After every edit of graphql files, run this `yarn run relay`
- Create a "Relay Environment":

  ```jsx
  import { Environment, Network, RecordSource, Store } from 'relay-runtime'

  function fetchQuery(operation, variables) {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => {
      return response.json()
    })
  }

  const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  })

  export default environment
  ```

- Finally, create a QueryRenderer for your app:

  ```jsx
  // App.js
  import React from 'react';
  import {graphql, QueryRenderer} from 'react-relay';

  const environment = /* defined or imported above... */;

  export default class App extends React.Component {
    render() {
      return (
        <QueryRenderer
          environment={environment}
          query={graphql`
            query UserQuery {
              viewer {
                id
              }
            }
          `}
          variables={{}}
          render={({error, props}) => {
            if (error) {
              return <div>Error!</div>;
            }
            if (!props) {
              return <div>Loading...</div>;
            }
            return <div>User ID: {props.viewer.id}</div>;
          }}
        />
      );
    }
  }
  ```
