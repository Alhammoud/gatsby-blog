---
path: '/2019/01/13/tales-of-refactoring-mono-repo'
date: '2019-01-13T05:52:00.000Z'
title: 'Tales of refactoring a frontend mono repo'
author: Max Rozen
tags: ['startups', 'business', 'refactoring', 'mono-repo']
excerpt: "An article in which I describe the experience of fixing 'best-practices'"
---

Best practices are great. Don't get me wrong, the idea of having a gold standard approach to doing things for an industry sounds like it'd be perfect for productivity. Here's how we at Expert360 untangled a deeply coupled build pipeline for a frontend mono repo.

## What I mean by mono repo

Typically a Frontend mono repo will contain all of the code, configuration and utilities needed to run your frontend application. Things like wrappers around your Authentication supplier's code could all live in separate repos, but in a mono repo we choose to keep these as folders sitting next to your core frontend application.

There are two ways to accomplish this that I've seen, either:

- Integrate all of your code with a single `NODE_PATH`:
  ```
   ├── App
   │   ├── index.css
   │   └── index.js
   ├── Tracking
   │   └── index.js
   ├── Utils
   │   └── index.js
   ├── package.json
   └── webpack.config.js
  ```
- Modularise your code into sub-packages that manage their own dependencies:
  ```
   ├── App
   │   ├── index.css
   │   ├── index.js
   │   └── package.json
   ├── Tracking
   │   ├── index.js
   │   └── package.json
   ├── Utils
   │   ├── index.js
   │   └── package.json
   ├── package.json
   └── webpack.config.js
  ```

Mono Repos, whether integrated or modular tend to be a fine idea - they allow you to make a single Pull Request to change lots of loosely related code, and they reduce context switching and hopefully therefore increase productivity.

## How it goes wrong

I work as a software engineer at Expert360, where I mainly focus on frontend. Before my time, early development efforts focused on micro-services, with "separate concerns" having their own repo, their own build pipeline, and their own language (everything from Go, to Python, to PHP). The main app's tech stack was eventually migrated from PHP + Angular, to Elixir + React.

The culture of micro-services never really went away, with sub-apps being built within the React frontend's Modular mono repo. This is fine in its own right, however the build process for the whole main application was tightly coupled, so in order to build the frontend, we needed:

- the backend to be built (to generate a GraphQL schema for Relay to work)
- the utils app to be built (many parts of the frontend rely on util functions), wasn't set up as an npm package
- the tracking app to be built (we wrap our analytics library to make it easier to use with React), wasn't set up as an npm package

To orchestrate this build process, a total of 26 individual helper scripts were written, and then used in a pipeline via Gulp that also invoked Webpack and Rollup.

## How we fixed it

At the end of 2018, once our company reached our major deadline for the year, our tech leads started a program of "Brilliant Basics", where we go through our code and remove tech debt, and generally fix things that were causing our developers pain daily.

As part of the final week of Brilliant Basics, I paired with our Frontend lead and our SRE to simplify the build process to be a single call via the Webpack CLI, greatly reducing the complexity of our build, and speeding it up considerably. To pull this off, we:

- deleted previously deprecated code so that our frontend was a single folder
- migrated code that was relied upon in several places into its own repo, with its own automated build and release system
- moved "modular" code that was only being used in one place back within the frontend app, so that the frontend's build could handle the build process
- removed lerna, yarn workspaces, and Rollup from our main frontend's build process
- updated React, Babel, Jest, Enzyme, and Relay to their latest versions (for performance + bug fixes)

In practice, this meant our codebase went from looking like this:

```
├── App
│   ├── index.css
│   ├── index.js
│   └── package.json
├── Tracking
│   ├── index.js
│   └── package.json
├── Utils
│   ├── index.js
│   └── package.json
├── package.json
└── webpack.config.js
```

To this:

```
├── App
│   ├── Utils
│   │   └── index.js
│   ├── index.css
│   └── index.js
├── package.json
└── webpack.config.js
```

Easier said than done though, what takes 2-3 minutes to read through, took me personally about a week to complete.

As a result of our extensive test suite, I was able to move all of these files with confidence, however we still manually tested that pages rendered correctly after each change (just to be completely sure).

## Why bother?

Our frontend build process used to be too complicated to be worth explaining - whereas now it closely resembles the folder structure [Create-React-App](https://github.com/facebook/create-react-app) uses, so onboarding new developers to our team's frontend just became a whole lot simpler.

Our team has a goal of eventually being able to build our frontend separately from our backend. A goal that would allow us to deploy changes to our site in a mere 3 minutes, rather than 15-20. The simpler our frontend build becomes, the easier the separation becomes.
