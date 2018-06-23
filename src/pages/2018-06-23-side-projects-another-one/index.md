---
path: "/2018/06/23/side-projects-another-one"
date: "2018-06-23T05:52:00.000Z"
title: "Side Projects: Another one"
tags: ['side-projects']
excerpt: "Side Projects: Another one"
---

So a bit of backstory about me:
I'm a weight lifter. Three times a week for the past 8 years, I hit the gym and follow a variant of the Greyskull LP lifting program.

I've been a long-time user of a weight tracking app called Libra. Over the years, every time I got a new phone I'd have to go through this awkward dance of exporting the database, uploading to Google Drive, and finally importing the database on the new phone (which wouldn't work consistently).

Long story short, I'm building my own weight tracking software at https://RecordMyWeight.com.

It'll have a simple username:password login system, with a page to track your weight, and an account profile page to handle subscription to "Pro" features. I'll likely use d3.js for graphs, as I plan a few features such as smoothing, and burndown charts for tracking progress toward a weight loss goal.

It'll be written as a Progressive Web Application in React, with a Node GraphQL backend, so that I can use it offline at the gym, and still get notifications to remind me to use the app.
