---
title: Simplify tooling with CLI-fun
tagline: Finding simplicity in chaos
tags: ['post', 'analytics', 'ga']
excerpt: When it comes to managing multiple projects, keeping your tooling consistent and bug free can become a painful prospect.
layout: post.11ty.js
cssPath: layouts/post.11ty.css
---

> For a long time now, we've tackled new projects with a pretty common formula; We bootstrap the approved framework, tools and build processes for each new project, and do so in isolation. This works great, and initially speeds up development and prototyping. _However_, once a project matures, and tooling moves on, it becomes tricky to uniformally update and maintain these build tools across all projects. This article is a short story about how we tackled this problem.

## In the beggining, there was Gulp

We have a fairly well established setup for FE tooling, a series of simple task files orchestrated by Gulp. We'd use these common tasks across each and every project that the business required. All was well. One day, we'd need to tweak how a particular asset was processed, or output, so this would inevitably be done locally within that specific project. This was fine, kind of. If another project required that same change, there were two potential outcomes:

1. The developer would copy the changes from one project into another, potentially tweaking how it worked, but ultimately drawing on previous work.
2. Given there was no documentation, the developer would _re-implement_ these changes in complete isolation, duplicating work.

In either case, the implementations would not be consistent. If a bug arose in one of those changed tasks, the same fix would almost never be carried over to another in the same manner. This produced slight variations in how each task worked, causing maintainance overhead, and bad times.

This was a burden, but ultimately these things changed so rarely, that there was never a decent business case to address these issues. Time went on, new tasks were added, others changed or removed.

#### Temporary title

Fast forward to 2019, and Node 12 LTS lands. We dilegently go to setup a spike to upgrade our CI and tooling to make use of the new features and performance improvements.. But there's a problem. The version of Gulp we use (3.9.1) has become stale, and v4 is still in beta. This version has a max ceiling of Node 10 LTS, so we had two options. Upgrade to Gulp v4, and maintain the status quo. Or.. look at addressing the maintainance issue, and transition away from Gulp to a more holistic approach.

After some _umming_, _ahhing_ and spikes, we decided on the later. We wanted a unified toolset that could be updated and maintained in one place, with these improvements being "automatically" carried into each project when required. We also wanted to tackle performance. The build times for our development, and production tasks had grown over time, causing frustration and delays for deployment. We wanted this new toolset to be "consumed" by a project, not defined within.

## Then there was.. something?

We've been using Webpack for several years now to effectively bundle our code in an intelligent way. We load many chunks of code on demand, only when needed, while also making use of the improved DX that Webpack provides via plugins. Up until now, we had a setup where Webpack would sit within a Gulp stream, causing competing issues about file output and asset hashing. This was a pain. We wanted to better use our third party tools as the creators had intended, without fighting against configuration or output.

A few options were available. We looked at running Webpack via the CLI and "installing" a pre-defined configuration file within each project. This was a big improvement, but we still had many other tasks where Webpack alone wasn't sufficient, or necessarily the best tool. In this scenario we would to some degree still require locally defined tasks. Not _ideal_.
