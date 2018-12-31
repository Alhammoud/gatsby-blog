---
path: "/2018/12/31/2018-review-starting-an-internet-business"
date: "2018-12-31T05:52:00.000Z"
title: "2018: Reflections on trying to start an internet business"
author: Max Rozen
tags: ['startups','business','hackathon']
excerpt: "A review post on what I've done this year in terms of trying to start an Internet business"
---

## 2018, what a year

### On the personal side

I Interviewed at Facebook, first for front-end, then for full-stack. Considering the year Facebook has had, I'm okay with not getting the job.

Roughly around the time I was interviewing at Facebook, I took up the #vanlife with my partner and toured through California in a [purple van](https://www.instagram.com/p/Bi2qt2lhDal/). When I came back home, I finally took the driving test and got a [wagon](https://www.instagram.com/p/BnFONoYF5HQ/) to continue the #vanlife here in Australia.

I then quit my job at Arup (building engineering consultancy) to go work at a Fintech startup aiming to revolutionise the retail investing space for Mum & Dad investors. After 3 weeks I quit the startup job, once we realised the job they advertised for and the job they wanted me to do weren't exactly aligned with my skillset (I see myself as probably 75% front-end, while 100% of the work they had for me was back-end for the foreseeable future).

In between jobs I picked up freelancing as a way to make some extra money, migrating [EthicalEquities](https://ethicalequities.com.au) from WordPress to Django, and added a forum to build more of a community around ethical investing.

After about 6 days of freelancing full-time, I joined [Expert360](https://expert360.com) as an employee, where I (mostly) work on the front-end in React. I've been helping to build a Design System as well as some product work.

### On the business side, chronologically

#### JobsOk.io

I finished building an MVP for [JobsOk.io](https://jobsok.io) (A tech job board where posting an ad would only cost $199 US) in a thinly veiled attempt at emulating Pieter Levels' success with [RemoteOk](https://remoteok.io).

What I learned here is that your implementation is meaningless to the user if you're not delivering the value they came for. In this case, I wanted to take a technologically inferior product, make it extremely efficient, scalable and "blazing fast", and pocket pure profit from running a serverless job board (effectively free to run for the first million visits a month)

I was failing to deliver value to users solely because I didn't have the traffic to compete with other job boards. The reason StackOverflow can charge as much as it does is the millions of page views per month it receives, creating value to its job posters.

In total, JobsOk logged 761 sessions for 661 users in 2018. While a total commercial failure, I did learn _a lot_ about running GraphQL in production, and using off the shelf Design Systems (Material-UI).

I eventually revisited JobsOk, and migrated it from being a client-side app to server-side rendered app in AWS Lambda (Check out [Razzle](https://github.com/jaredpalmer/razzle/)).

#### AppointmentScheduler.org

I finished building an MVP for [AppointmentScheduler.org](https://appointmentscheduler.org) - another hero-inspired product (in this case, [patio11](https://www.kalzumeus.com/)), AppointmentScheduler was going to have a freemium product model to take appointments for any industry that needed appointment scheduling software. I intended to use content marketing to acquire users.

I honestly thought I had learned "if you build it, they will not come" before building AppointmentScheduler. Turns out I did not. It took about a month of weekends, and time after work to build. I also spent part of that month writing pretty vague, average blog posts to try attract users, to no avail. I had planned to build beyond the free feature set if I had seen enough users using the site, however most people came for the blog posts, and didn't stick around to see the app.

The site was unique in that it was a 100% pure [Gatsby.js](https://www.gatsbyjs.org/) site, where I added a client-only section under the `/app` path.

In total, AppointmentScheduler logged 561 sessions for 496 users in 2018.

#### RoomBooking.co

I started work on an MVP of a spin-off product from AppointmentScheduler - Roombooking.co, only to find the Google API restrictions meant I would have to implement most of it myself. RoomBooking would let you select slots in a Room's Google Calendar and see when it would be available for use.

I was starting to finally understand the lean start-up methodology at this point, so I had spoken to a few people working in businesses too small to afford using Microsoft Outlook for meeting room bookings, but large enough to need a system to book meeting rooms. There seemed to be a clear need for a means of booking rooms in a business. I only spent a week of time after work on this, as I wasn't particularly interested in the problem space.

I wanted to be able to create a public calendar in Google Calendar, while also allowing anyone to create events on that public calendar, while restricting the viewing of events to the Owner of the calendar. Turns out Google won't let you do it. Unwilling to implement it myself, I canned the project, and wrote a [blog post](https://maxrozen.com/2018/02/26/so-i-had-an-idea) about the experience.

#### Using a template to build side-projects

Half-way through the year, I realised I had been building all of these side projects from scratch each time, and had been pretty burned out by the experience. I basically didn't write any fresh side-project code for four months, though I did try to keep coming up with ideas (I actually bought the domain for two of the ideas, RecordMyWeight.com and IndiePhotogs.com - though I never used them).

In August, I collected all of the code I had written all year and built myself a React + GraphQL server template in Terraform that deploys a complete site with HTTPS, CDN caching via CloudFront, GraphQL server & SSR server running in AWS Lambda.

To avoid having to go back and update version numbers in the template, I actually wrote it in the form of a three-part blog:

* [Server-side Rendering, Serverlessly!](https://maxrozen.com/2018/08/08/start-your-own-app-with-react-part-1/)
* [Deploying to a real domain name](https://maxrozen.com/2018/08/15/start-your-own-app-with-react-part-2/)
* [Let's build a GraphQL backend!](https://maxrozen.com/2018/08/16/start-your-own-app-with-react-part-3/)

#### OnlineOrNot - finally a problem worth solving

Since starting my career as a software engineer I've found APIs to be a pain to work with.

My first experience working with a "back-end" developer as a front-end developer to build a dashboard for financial data essentially involved having a financial quant dump a spreadsheet into the Python pandas library, and outputting the result to JSON. At one point in the project, the API's result would break the front-end every 3 hours, despite there being contracts in place to prevent this from happening. If we had a tool capable of snapshotting the API result and alerting our boss whenever it changed, the project would have gone much more smoothly.

Most developers I spoke to while validating this project's commercial viability had a similar story, or could relate to the problem. Being able to ensure your API is operating correctly is particularly tricky with GraphQL, as GraphQL servers do not respond with 5xx error codes when they fail.

My approach to deciding whether or not to build OnlineOrNot was slightly more rigorous than my previous side-projects, as I really wanted to make sure people would actually pay for this. I spoke to former coworkers, and current coworkers to try understand how developers ensure GraphQL is running - and in short, it's really hard!

So after a month of testing whether people liked the idea, I set off to build [OnlineOrNot](https://onlineornot.com) using my side-project template I had developed back in August. I had quite ambitiously wanted to launch my beta by December 1, however when you're working on a product after work and on weekends, occasionally life gets in the way. I have still not yet officially "launched" the product, I'm still actively recruiting my first ten customers to help beta test the tool.

It being December 31 today, I'd say OnlineOrNot is very close to a public launch - it's embarrassingly under-featured, but still executes on its core-value proposition of automating GraphQL testing & uptime monitoring.

Since October 1 the marketing site has received 557 sessions from 491 users (roughly 4x each of my previous side-projects in a comparable period of time).

## 2019 Plans

### Launch OnlineOrNot, make an actual "Company"

I plan on launching OnlineOrNot on ProductHunt, IndieHackers and Hacker News to get more users for the public beta. I'm not really expecting much, if I can get around 10 users trialling the product and leaving feedback I would be over the moon.

If I manage to get a few customers I'll also start a company to own the IP. As much as I love being a sole-trader, something about being exposed to unlimited liability when dealing with B2B transactions sounds a touch unpleasant.

My longer-term play for user acquisition will still be classic content marketing, but also launching on LinkedIn, and using StackOverflow questions to help potential users learn about the service.

### Go camping more

My partner and I bought a Subaru Outback 2005 to go car camping around Australia, and when (if?) the weather cools down a bit we'll try car camping around the East Coast of NSW.

### Sell some camera gear

Since I started photography as a hobby about 5 years ago, I've accumulated around 26 cameras and various lenses. While I've been slowly selling off bits and pieces to friends and family, I'd love to be able to spend that money on investing, instead of cameras.

Anyway, here's me signing off for 2018, Happy New Year folks!
