---
path: '/2019/10/23/improve-seo-delay-marketing-scripts'
date: '2019-10-23T05:52:00.000Z'
title: 'Improve your SEO by delaying your marketing scripts'
author: Max Rozen
tags: ['blog', 'seo', 'performance', 'lighthouse']
excerpt: 'Page load speed is one of the most important metrics for SEO. This article shares a simple JavaScript trick to defer loading marketing scripts until you actually need them.'
---

# Background

The short of it is: adding snippets to your site from common marketing tools like Intercom, Segment, and FullStory slows down your customers' ability to use your site.

Slow sites get less consideration from Google, as customers are generally more likely to bounce from slow sites.

We can measure the impact of deferring the loading of these scripts using a metric called [Time to Interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) (TTI). TTI is one of the core metrics in Google's [Lighthouse](https://developers.google.com/web/tools/lighthouse) tool.

# The fix

```js
window.addEventListener(
  'scroll',
  () =>
    setTimeout(() => {
      //insert marketing snippets here
    }, 1000),
  { once: true }
);
```

# How it works

By moving your snippets into the setTimeout callback, you delay loading your marketing scripts until after your entire website has loaded. This means your customers see your content faster, and Google gives your site more SEO consideration.

When your customer starts scrolling down your page, after a second your marketing scripts will start loading.
