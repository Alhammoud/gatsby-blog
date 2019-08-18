---
path: '/2019/08/18/how-to-setup-wordpress-gatsby-netlify'
date: '2019-08-18T05:52:00.000Z'
title: 'How to setup a blog using WordPress, Gatsby, and Netlify'
author: Max Rozen
tags: ['blog','cms','wordpress','gatsby']
excerpt: 'Steps for getting started using WordPress as a headless CMS, and using GatsbyJS on Netlify.'
---

So the stack I've been test-driving involves deploying WordPress using AWS Lightsail, GatsbyJS on Netlify, and using Route53 to handle DNS. I've mainly been using Netlify out of convenience, and would recommend using Cloudfront with S3 for anything serious.

To get started:

First watch this YouTube video [Deploying a WordPress Instance on Amazon Lightsail](https://www.youtube.com/watch?v=upZOhKhefAs), to get your WordPress instance online within seconds.

Then clone this GitHub repo: [gatsby-wordpress-netlify-starter](https://github.com/justinwhall/gatsby-wordpress-netlify-starter). It may not be visually impressive, but if you/your developers know React, it'll be quick to add your own styles. The repository's README also details how to get started with Netlify if you haven't already.

Finally, install this WordPress plugin: [LittleBot Netlify](https://github.com/justinwhall/littlebot-netlify) on your WordPress instance. This plugin watches your pages and posts for changes, and asks Netlify to redeploy (and fetch your new posts) once you hit "Publish".

Once set-up, new posts and pages on your WordPress instance are deployed within seconds, not a bad setup if you *have to* use WordPress.