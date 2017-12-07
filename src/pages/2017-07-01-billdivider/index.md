---
path: "/billdivider"
date: "2017-07-01T18:52:00.000Z"
title: "Billdivider.com"
tags: ['billdivider']
excerpt: "Divides your bills!"
---

Billdivider.com is probably the largest side project I've started, and as yet
remains unfinished (and offline). It had a simple aim to begin with: replace my
housemate's ever-growing spreadsheet model, with a simple to use web app. I also
wanted it to be better than Splitwise - which on the UX perspective, wasn't that
hard.

On the technical side, it's a Python/Django web app, using the Mezzanine CMS to
handle frontend content, and Fabric for deployment into my AWS instance.

I learned, a lot:

# Build a "PAY ME NOW" button

This is probably the best advice I can give to anyone thinking of making a side
project. It will motivate you to keep going, and on the off chance you make it
big, you've already got a way for your traffic to give back. I used Gumroad.com
for its ease of use (Seriously, less than 60 seconds to setup payments to my
bank account), but I'm you can figure out how to integrate Stripe/Paypal

# Deploy, deploy now!

Deploying straight after writing my first feature (Basic
Create/Read/Update/Delete on groups) allowed me to get immediate feedback from
my friends/family (reliable alpha testers) without which, would have been a pain
to have to refactor after everything was built out. Plus, with deploying to
production out of the way, you can avoid procrastinating and never showing the
world that beautiful app you just built.

# Never underestimate drunk engineers

Drunk engineers are probably the best real feedback you will ever get. Within 40
seconds of handing my app over to my mates, they found no less than 5 usability
bugs that I had unintentionally programmed around in my development environment,
and hadn't in production.

# So, what happened?

Essentially I built what I considered a Minimum Viable Product, and after
playing around with React, and Node/Express, I realised I was too limited with
what Django alone could offer me. As awesome as the Django admin panel is, I had
experienced freedom from repetitive coding and templating in JavaScript, so I
decided to end development in Django.

Going forward, I'll probably write either a Node or Apistars backend for
Billdivider.com, and write a mobile-first web application in the coming months.
