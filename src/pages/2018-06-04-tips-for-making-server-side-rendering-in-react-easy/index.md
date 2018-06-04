---
path: "/2018/06/04/tips-for-making-server-side-rendering-in-react-easy"
date: "2018-06-04T05:52:00.000Z"
title: "Tips for making Server-side rendering in React easy*"
tags: ['recap']
excerpt: "Tips for making Server-side rendering in React easy*"
---

`*Easy if you're not using Redux for data fetching..`

The first time I worked through deploying a Server-side rendered React app to AWS Lambda, it took me about 5 hours of messing around with my Terraform config, and actual server-side code before I figured out what was wrong (My terraform config was for a outputting JSON from my API Gateway, rather than HTML).

While the easiest way to get started with Server-side rendering in React is to start your project with it in mind, I realise for 95% of people this is not an option.

So, here is the #1 tip that will save you HOURS figuring out how to setup babel and webpack to play nicely together.

* Get Razzle (https://github.com/jaredpalmer/razzle).

  It's a webpack config factory for server-side rendered Javascript. It has an extensive list of examples (https://github.com/jaredpalmer/razzle/tree/master/examples) including: AfterJS, Elm, Firebase Functions, Inferno, JSX, Material-UI, Koa, Preact, React Native Web, Redux, Styled Components and TypeScript

Once you've seen some Razzle examples, and added Razzle to your project (or just created a fresh Razzle project and copied all of your components into it <b>_cough_</b> I did this <b>_cough_</b>), you're ready for the next steps.

Usually all you need to do is render some React components, and inject them as Strings into a HTML template. Easier said than done, but if you take baby steps (for example, start with rendering your CSS) you'll find it much more achievable than attempting to refactor your entire Application to be Server-side rendered in one go. (See "Indispensible Links" below for the resources I used)

* Step 1: Refactor all of your CSS-modules into CSS-in-JS.

  Using either [React-emotion](https://emotion.sh) or Styled-Components. You should avoid global CSS if you're using Material-UI, though Styled-Components/Emotion are more forgiving if you modify existing components via global CSS.

* Step 2: Refactor your Redux.

  In my case I only needed to call createStore on the server like this:

  ```
  import { createStore, applyMiddleware } from 'redux'
  import thunkMiddleware from 'redux-thunk'

  import reducer from './reducers'

  export default initialState =>
    createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
  ```

  Where the reducer was my client-side reducer code. See the repo in Resource [[1]](https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4) for further info.

* Step 3: Add Apollo/GraphQL

  The trick to making this work in my case was adding `ssrForceFetchDelay: 100` to my Apollo Client (This prevents Apollo from refetching GraphQL queries after the server already fetches them). Follow the tips at Resource [[2]](https://dev-blog.apollodata.com/how-server-side-rendering-works-with-react-apollo-20f31b0c7348) below.

* Step 4: Deploying a bundle without having to copy your `node_modules/` folder into your AWS Lambda function

  This one was huge, and at the time not particularly well documented:
  Create a `razzle.config.js` file with the following contents:

  ```
  module.exports = {
    modify: (config, { target, dev }, webpack) => {
      // do something to config
      const appConfig = config // stay immutable here

      if (target === 'node' && !dev) {
        appConfig.externals = []
      }

      return appConfig
    },
  }
  ```

  Razzle by default will use nodeExternals to prevent webpack from bundling your node_modules - which you need for AWS Lambda. This fixes that issue.

## Indispensible resources:

1.  Getting started:
    https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4
2.  Adding Apollo/GraphQL:
    https://dev-blog.apollodata.com/how-server-side-rendering-works-with-react-apollo-20f31b0c7348
3.  Adding Styled-Components:
    https://www.styled-components.com/docs/advanced#server-side-rendering
4.  Adding Material-UI
    https://material-ui.com/guides/server-rendering/
