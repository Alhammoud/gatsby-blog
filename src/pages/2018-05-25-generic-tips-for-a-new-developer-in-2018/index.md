---
path: "/2018/05/25/generic-tips-for-a-new-developer-in-2018"
date: "2018-05-25T05:52:00.000Z"
title: "Generic tips for a new developer starting in 2018"
tags: ['recap']
excerpt: "Generic tips for a new developer starting in 2018"
---

I personally loved blog posts like this when I first got started. I found them quite useful - so here I am paying it forward.

1.  Never make your own boilerplate (if you're not willing to keep it updated)

    I speak from first-hand experience. When I first started with React and had no idea what I was doing, I made a boilerplate to make it faster to start up projects. It was great at the time, but a year down the track trying to pick the cobwebs off my boilerplate was a nightmare. It was faster to use Create-React-App and then eject the project.

    Front-end Boilerplates to use instead:

    * Razzle - https://github.com/jaredpalmer/razzle
    * Create React App - https://github.com/facebook/create-react-app
    * Gatsby.JS - http://gatsbyjs.org/

2.  Use Terraform (or another Infrastructure-as-code tool)

    I know it's a nightmare to learn yet another tool/DSL, and I hated getting started on this myself, but bare with me on this one.

    Using a CLI like Firebase Functions, Zappa, or Serverless is an _amazing_ developer experience, and I couldn't fault these frameworks. However, when you have to change your infrastructure in any way - you _will_ incur downtime, and your users will be pissed.

    When I first started using Terraform I actually argued relentlessly with both my Senior Developer and Team Lead about how much easier it would be to just use Zappa - but I have since come to realise how much more of a headache you save by actually _knowing_ what your tools are doing in the background.

    Use Terraform, or Ansible, or Docker - some kind of Infrastructure as code solution, and write out your infrastructure as code.

    My standard infrastructure for a React project is AWS S3 -> Cloudfront CDN + Route 53 for DNS + AWS Lambda, and after you set that up once, you just need to change the variable names for the next project. Super resilient, serverless infrastructure with HTTPS and CDN within minutes of starting your next project.

    Example: I recently migrated my side-project job board (https://jobsok.io) from client-side rendered to server-side rendered. It involved moving my assets from one AWS S3 Bucket to another, adding an AWS Lambda function to serve my HTML, and caching them both with AWS Cloudfront CDN. My site experienced zero downtime as I completely changed where my site was being loaded from.
