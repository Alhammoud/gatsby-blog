---
path: "/2018-02-26-so-i-had-an-idea"
date: "2018-02-26T05:52:00.000Z"
title: "So I had an idea..."
tags: ['startups','business','hackathon']
excerpt: "A retrospective on my entrepreneurial endeavours of the past week"
---

So, a couple of weekends ago I went to a StartupWeekend - NOT a hackathon as I was promised (more on that in a follow-up blog, soon!) and spent the weekend testing ideas, validating ideas with the general public, and helping my partner prepare to pitch her business venture: https://cookx.co. This lead me to create ideas off of ideas I had already been working on. While some might say this is a great problem to have, I wish I had researched a little bit more before I spent a week of time after work implementing a solution.

One of the ideas I've been working on for about a month now is https://AppointmentScheduler.org (yes, it's an homage to @patio11's Appointment Reminder service). The idea came to me when I met my current barber. I found him offering his services through Facebook, and I wished there was an offering to allow me to book his services whenever he was available, without having to pay for the overheads of the barber shop he worked at.

The Web App lets people with clients (barbers, plumbers, tattoo artists - you name it) specify the times they're willing to work - and share a mini-Calendar of their available times with their clients via a URL.

Anyway, I got about 80% of the way through implementing an MVP (pretty much just for my own use, or rather, to get people to use so that I could book their services) when the StartupWeekend began.

The combination of the AppointmentScheduler idea and talking to dozens of people involved in the startup community in Sydney then lead me to come up with the idea of letting people book rooms. This is a constant struggle businesses that have meeting rooms, and other bookable resources, but are too small to justify the cost of paying for a dedicated room booking system, or MS Outlook licenses for all employees.

The easiest solution I came up with was to essentially allow users to login via Google and ask for access to their Google Calendar. https://RoomBooking.co (the app) would then create Calendars for each Room the user created, and they could then share a link to a list of all rooms they created.

The problem I ran into was creating events/bookings in Google Calendar. Permission-wise, I wanted a person creating their event to only be able to edit their own event. For View Permissions I wanted all other events to come up as 'Busy'.

In Google Calendar the previous combination of permissions is impossible without user intervention - each user you want to edit your Calendar has to be manually invited into the Calendar, with permissions set-up. I also wanted to charge for this service, which meant I expected it to be completely seamless and handled within RoomBooking.co.

Which brings me to this moment now - a full week of development later.

What went well:

* I wrote like 90% of a SaaS MVP (other than the Pay-me button and a product tour)
* I learned a lot about the Google API, and async loading of the `gapi.js` script to be usable by React lifecycle methods
* I got better at styling with react-emotion (I inline CSS way too much on my own projects)
* I didn't waste time building SEO/Blogging, so that's a plus
* I pretty much built [graphql-resolvers](https://github.com/rozenmd/graphql-resolvers) through my efforts in setting up this project

What I could have improved:

* I should have sat down and planned out the API calls I wanted to make, and what the rest of the App does, before just running in and programming. After all, the best way to write secure and reliable applications is to write [No Code](https://github.com/kelseyhightower/nocode)
* Essentially it boils down to a lack of planning - I had a client willing to try out the product, and in my excitement I forgot to plan.
* Side projects to your side projects might not end well - better to at least RELEASE/SHIP the first side project, before starting on the next one.
