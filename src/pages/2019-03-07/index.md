---
path: '/2019/03/07/how-to-implement-tabs-with-vanilla-html-javascript'
date: '2019-03-07T05:52:00.000Z'
title: 'How to implement tabs with vanilla HTML and JavaScript'
author: Max Rozen
tags: ['javascript', 'html']
excerpt: "If you've ever used React & React-Router to implement tabs in navigation, you might want to know how to do it in pure HTML and JavaScript."
---

I recently came to the rude realisation that perhaps with the amount of abstraction in the common developer environment, it may be difficult to implement things from scratch, should a popular framework like React fall by the wayside.

So dear reader, here's a simple task we're going to complete. While normally you'd use something like React and React-router to determine which tab should be open, we're going to be using nothing other than pure JavaScript and HTML.

Here's what we need to do:

1. Add some means of determining which tab should be open
1. When whatever you built in step 1 is clicked, all other tabs should be hidden
1. Clicking on a tab, and sending your friend the link should keep that tab open

Be aware that because it's programming, there are _lots_ of different ways to solve problems. This is just one way you could do it.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Pure HTML and JS</title>
  </head>
  <body>
    <div id="first-tab">This contains some stuff</div>
    <div id="second-tab">This contains other stuff</div>
    <div id="third-tab">This contains the remainder of our stuff</div>

    <script>
      /* write anything you want here */
    </script>
  </body>
</html>
```

### Step 1 - Determining what's open

We have lots of options here - whether it's using a `button` with an `onclick` handler, or a `div` with an `onclick` handler, using CSS and onhover to only display the div your mouse is currently hovering over the top of, or plain anchor tags, you just need something to know what should be open.

My gut reaction was to use a `button`, but you might forget that you also need to set `type="button"` to override the default of `type="submit"`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Pure HTML and JS</title>
  </head>
  <body>
    <a href="#first-tab">Open first tab</a> |
    <a href="#second-tab">Open second tab</a> |
    <a href="#third-tab">Open third tab</a>
    <hr />
    <div id="first-tab">This contains some stuff</div>
    <div id="second-tab">This contains other stuff</div>
    <div id="third-tab">This contains the remainder of our stuff</div>

    <style>
      /* write anything you want here */
    </style>

    <script>
      /* write anything you want here */
    </script>
  </body>
</html>
```

Cool, so at this point you have a thing you can click to update the browser's address bar to point you to the current tab, now you just need to figure out a way to hide the irrelevant tabs.

### Step 2 - Let's write some JavaScript, old school

First thing you should take note of in the below example is that I've added `onload` and `onhashchange` handlers to the body tag. This lets us run our JavaScript both when the page loads, and when our anchor tags get clicked. If you're coming here from React, you might be confused why you wouldn't just use something simple like `onclick` - the answer is that browsers update the address bar just slightly too slow for your JavaScript code to catch it.

The other change I've made is to default set all tabs as `display: none;`. This lets us iterate over the tabs when the page loads, and set the default.

Read over the code in the script tags below, and I'll explain what's happening on the other side.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Pure HTML and JS</title>
  </head>
  <body onload="main()" onhashchange="main()">
    <a href="#first-tab">Open first tab</a> |
    <a href="#second-tab">Open second tab</a> |
    <a href="#third-tab">Open third tab</a>

    <hr />
    <div id="first-tab" style="display:none;">This contains some stuff</div>
    <div id="second-tab" style="display:none;">This contains other stuff</div>
    <div id="third-tab" style="display:none;">
      This contains the remainder of our stuff
    </div>

    <style>
      /* write anything you want here */
    </style>

    <script>
      const allTabs = ['first-tab', 'second-tab', 'third-tab']
      main = () => {
        if (!window.location.hash) {
          document
            .getElementById('first-tab')
            .setAttribute('style', 'display:block')
        } else {
          const currentTab = window.location.hash.split('#')[1]
          allTabs.forEach(tab => {
            if (tab === currentTab) {
              document
                .getElementById(tab)
                .setAttribute('style', 'display:block')
            } else {
              document.getElementById(tab).setAttribute('style', 'display:none')
            }
          })
        }
      }
    </script>
  </body>
</html>
```

So what makes this work is this code block:

```js
const allTabs = ['first-tab', 'second-tab', 'third-tab']
main = () => {
  if (!window.location.hash) {
    document.getElementById('first-tab').setAttribute('style', 'display:block')
  } else {
    const currentTab = window.location.hash.split('#')[1]
    allTabs.forEach(tab => {
      if (tab === currentTab) {
        document.getElementById(tab).setAttribute('style', 'display:block')
      } else {
        document.getElementById(tab).setAttribute('style', 'display:none')
      }
    })
  }
}
```

We first define all possible tabs that our page cares about.

We then check whether or not the browser's address bar contains a `hash` (a hash is what gets added to a URL when you click an anchor tag with a `href` of `#first-tab`). If it doesn't contain a hash, we just load the default state, which is to have the first tab open.

If the browser's address bar _does_ contain a `hash`, we parse it, iterate over all possible tabs and set all tabs that aren't in our address bar to `display: none`.

There you have it - an implementation of tabs in pure HTML and JS.
