---
path: '/2019/08/15/how-to-write-semantic-html'
date: '2019-08-15T05:52:00.000Z'
title: 'Why is webpack not importing all of my CSS? (mini-css-extract-plugin)'
author: Max Rozen
tags:
  ['css', 'webpack', 'optimisation', 'optimization', 'mini-css-extract-plugin']
excerpt: 'Learning how to optimise your webpack config can be interesting. In this article I dive into an issue I found with publishing my own package and consuming it in a frontend.'
---

Shortcut: [Why is webpack not importing all of my CSS?](#why-is-webpack-not-importing-all-of-my-css)

Throughout my career I've somehow ended up diving deep into tools like webpack to figure out why they're not doing what they're supposed to do. The tl;dr on webpack is that it bundles your code into a neat set of files that should make it efficient to serve your content on the world-wide web.

With CSS, you essentially have two options:

- have webpack read through your code and dump everything into CSS files, which your users then need to download before they can see your site

  or

- webpack can write the CSS into your JavaScript bundle (increasing the size of your bundle).

Depending on the size of your bundle, how you split it, and your caching strategy, either option could be better, only testing the performance of your site will tell you the correct configuration to use.

In my case, I opted to extract (some) of the CSS in the frontend app at Expert360 using `mini-css-extract-plugin`. One of the libraries in our bundle is our Design System, which I recently migrated from needing to be built by consuming applications, to having its own standalone build.

Which lead me to this question, when I finished setting up the standalone build of my library:

### Why is webpack not importing all of my CSS?

Our library had `sideEffects: false` in its package.json.

This flags all modules as side effect free. However, this is incorrect as css files do have a side effect (adding styles to the DOM). As you are not using any export of the imported css, webpack decides the css file is unneeded and doesn't include it in the output css bundle.

Instead the library's package.json should have `sideEffects: [ "*.css" ]`.

If this happens in a library you do not have publish rights to, you can add the following to your webpack configuration:

```js
module.rules:
    {
        test: /\.css\$/,
        include: path.resolve(__dirname, "node_modules/<NAME_OF_PACKAGE>",
        sideEffects: true
    }
```
