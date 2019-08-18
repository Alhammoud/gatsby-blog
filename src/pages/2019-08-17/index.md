---
path: '/2019/08/17/why-wordpress-is-suddenly-my-CMS-of-choice'
date: '2019-08-17T05:52:00.000Z'
title: 'Why WordPress is suddenly my CMS of choice'
author: Max Rozen
tags: ['blog','cms','wordpress','gatsby']
excerpt: "Having to use WordPress used to be one of the most annoying parts of agency work, but it doesn't have to be a total drag."
---

WordPress gets a lot of hate, and some of it is warranted. After all, the chances are a WordPress instance left alone long enough on the internet _will_ be compromised.

However, due to its ridiculously rich library of plugins, and excellent user experience for editors, I'm not so keen to write it off as others may be. Especially with the advent of Static Site Generators (SSGs) such as [Gatsby](https://www.gatsbyjs.org/) and [React Static](https://github.com/react-static/react-static).

## What's changed?

SSGs such as Gatsby allow you to effectively "switch off", or at the very least, password protect your WordPress server from people trying to hack it.

They work by only using WordPress as an API (known as the headless CMS approach), and generating all of the necessary pages for your website to run during a compilation, or build step. While this means changes to your WordPress posts aren't instantly available on your site, the build step is fast (roughly one minute in total), and can be automated via Webhooks.

## Competitors

As Gatsby gains in popularity, so too are the latest generation of headless CMS solutions, such as Contentful. I would consider looking into other headless CMS solutions if I were to start a completely new project - but only if it was possible to host it myself (as one does with WordPress).

The other side to consider with headless CMS providers is that they handle security updates/database maintenance for you, and is reflected in their monthly fee. Of course the downside is if the provider gets hacked, there's nothing you could have done to mitigate it (except maybe keep manual backups/exports of your content).
