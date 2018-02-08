---
path: "/2018-02-07-getting-started-with-terraform"
date: "2018-02-07T05:52:00.000Z"
title: "Getting started with Terraform"
tags: ['serverless','terraform']
excerpt: "Getting started with Terraform - step 0 of my Welcome to GraphQL resolvers series"
---

### What is Terraform?

Terraform essentially is a binary that talks to cloud providers for you. You
define the architecture you want your project to have, and Terraform will go off
to Azure/AWS/Google Cloud etc, figure out what infrastructure is already there,
and add the architecture you define in a \*.tf file (it'll also ask you to
confirm before you blow away mission-critical architecture - nifty!)

### Why do I need it?

Essentially it's a form of communication with your other developers, that goes
beyond a simple architecture diagram.

Terraform lets you quickly replicate your existing architecture too. Say you're
already running a production and development environment for your site, and your
client asks for a staging site. If you've used variables to define your
architecture, spinning up a whole new set of databases, servers, and CDNs is
just a matter of running a pair of commands.

# How do I set it up for Mac?

* Open Terminal, type:

```
cd ~
mkdir terraform
```

* Download Terraform for Mac, currently at this URL:
  https://www.terraform.io/downloads.html

* Unzip, and extract to the ~/terraform folder you just made.

* Set your path to include ~/terraform:

```
nano ~/.bash_profile
```

* Inside nano:

```
PATH=$PATH:~/terraform
```

* control + x to save, then run:

```
source ~/.bash_profile
```

* Confirm you've installed it correctly by running `terraform -v`:

Output:

```
Terraform v0.11.3
```
