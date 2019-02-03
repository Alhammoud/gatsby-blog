---
path: '/2019/02/03/on-demonstrating-value-as-a-software-engineer'
date: '2019-02-03T05:52:00.000Z'
title: 'On demonstrating your value as a Software Engineer'
author: Max Rozen
tags: ['startups', 'business', 'career', 'software-engineering']
excerpt: "The company you work for likely has several departments that can't fathom the cost of hiring you. Here's how you can fix that."
---

![Money](wallet.png)

I recently read an article describing what coders/software engineers actually do in an organisation, and it struck a chord with me ([The Coder's Role](https://medium.com/@coderdan/the-coders-role-92fbc6cd5f2a)). The gist of the article was that software engineers think their role in an organisation is to write code, when actually it is to solve problems for users. I'd take it one step further, and argue that a coder's role is to create value.

I've worked in a wide-range of organisations since starting out my career as a software engineer. From tiny startups that felt the need to micro-manage their engineers to ensure they were getting as much value out of them as possible, to multi-billion dollar consulting firms that couldn't figure out why pushing their data scientists into engineering jobs was causing them to quit en-masse.

The one thing that I noticed across the organisations I've worked for is that management typically has <b>no idea what a Software Engineer does</b>, why they cost ~40-80% more than their "typical" staff, and why they eventually leave the organisation dissatisfied. While developer happiness is a whole topic of its own, I want to elaborate on what we do, and how to justify the cost of hiring us.

### Types of Organisations

From startups to mega-corps, there are effectively two types of places you'll work for:

- Organisations where the Engineering department <b>generates the majority of business revenue</b>. Management typically calls these departments "Profit Centers".
- Organisations where the Engineering department <b>saves the business money</b>. Management calls these departments "Cost Centers".

Don't think of these two names as binary options, they're more of a scale - for example it's possible to be an organisation where sales generates the majority of the revenue, and engineering just makes the user experience tolerable for the clients (see: most businesses that used to run out of an Excel spreadsheet).

From what I've seen though, typically you want to find yourself a job at Profit Centers, over Cost Centers. Management typically finds it harder to lay-off staff that generate scalable income, compared to staff that creates efficiency within the organisation (even if in the end, you're generating the exact same value).

![Make it rain](makeitrain.png)

### Oh crap, I work for a Cost Center! What do I do?

Don't worry, there are things you can do to prove your value to the organisation - to put you into a better negotiating position, whether lay-offs are looming, or it's annual review season.

Note that this advice applies for Profit Centers too - being able to quantify your value is extremely powerful in business.

Essentially, <b>measure everything</b>.

- Just wrote a Python script that saves you from having to navigate through your network drives to find a file to update?

  - <b>Measure it!</b> Time how long it would take you to find that file normally, multiply by how many times per year you perform the task (for added impact, distribute the file to coworkers, and multiply the time saved by the number of people who use your script)
  - Tiny example: `60 seconds * 104 (two times a week for a year) * 5 people = 520 minutes per year`. If those people generate $100/hr for the business usually, you saved the business $866 a year. If you turn that script into a tool that a hundred people in your organisation use, you saved the business \$17666 a year.

- Personal example: As a frontend developer I worked on an initiative to split a frontend codebase's build process away from the backend's codebase. Before the initiative, builds took up to 20 minutes. They now take up to 5 minutes (to deploy the frontend). As a side effect, by running a frontend web server independently from the backend, page loads sped up by 5 seconds.
  - Impact: `5 seconds * 1 million pageviews/mo (hypothetical) = 16666.6 hours per year` + `10 developers * 15 minutes * 261 working days = 677 hours per year`
  - So on average, the initiative saves humanity 16666.6 hours per year, waiting for the page to load, and saves the engineering team 677 hours waiting for builds to finish.

### Dealing with other departments

So now when you're trying to explain to a non-technical colleague what you do, even if they don't understand exactly what you do, being able to tell them "...and I worked on that initiative that saved our engineers 677 hours per year" leaves a much better impression than "I'm a frontend developer that builds sweet user experiences using JavaScript, particularly with React and GraphQL".
