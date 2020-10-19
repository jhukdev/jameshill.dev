---
title: Simplify tooling with CLI-fun
tagline: Finding simplicity in chaos
tags: ['post', 'analytics', 'ga']
excerpt: When it comes to managing multiple projects, keeping your tooling consistent and bug free can become a painful prospect.
image: simplify-tooling-thumbnail.jpg
date: 2020-10-09
layout: post.11ty.js
cssPath: layouts/post.11ty.css
---

For some time now, we've tackled new projects with a pretty common formula; We bootstrap the approved framework, tools and build processes for each new project, and do so in isolation. This works great, and initially speeds up development and prototyping. _However_, once a project matures, and tooling moves on, it becomes tricky to uniformally update and maintain these build tools across all projects. This article is a short story about how we tackled this problem.

## In the beggining, there was Gulp

We have a fairly well established setup for FE tooling, a series of simple task files orchestrated by Gulp. We'd use these common tasks across each and every project that the business required. All was well. One day, we'd need to tweak how a particular asset was processed, or output, so this would inevitably be done locally within that specific project. This was fine, kind of. If another project required that same change, there were two potential outcomes:

1. The developer would copy the changes from one project into another, potentially tweaking how it worked, but ultimately drawing on previous work.
2. Not having prior knowledge of previous changes, the developer would _re-implement_ these changes in complete isolation, duplicating work.

In either case, the implementations would not be consistent. If a bug arose in one of those changed tasks, the same fix would almost never be carried over to another in the same manner. This produced slight variations in how each task worked, causing maintainance overhead, and bad times.

This was a burden, but ultimately these things changed so rarely, that there was never a decent business case to address these issues. Time went on, new tasks were added, others changed or removed.

Fast forward to 2019, and Node 12 LTS lands. We dilegently go to setup a spike to upgrade our CI and tooling to make use of the new features and performance improvements.. But there's a problem. The version of Gulp we use (3.9.1) has become stale, and v4 is still in beta. This version has a max ceiling of Node 10 LTS, so we had two options. Upgrade to Gulp v4, and maintain the status quo. Or.. look at addressing the maintainance issue, and transition away from Gulp to a more holistic approach.

After some _umming_, _ahhing_ and spikes, we decided on the later. We wanted a unified toolset that could be updated and maintained in one place, with these improvements being "automatically" carried into each project when required. We also wanted to tackle performance. The build times for our development, and production tasks had grown over time, causing frustration and delays for deployment. We wanted this new toolset to be "consumed" by a project, not defined within.

## Then there was.. something?

We've been using Webpack for several years now to effectively bundle our code in an intelligent way. We load many chunks of code on demand, only when needed, while also making use of the improved DX that Webpack provides via plugins. Up until now, we had a setup where Webpack would sit within a Gulp stream, causing competing issues about file output and asset hashing. This was a pain. We wanted to better use our third party tools as the creators had intended, without fighting against configuration or output.

A few options were available. We looked at running Webpack via the CLI and "installing" a pre-defined configuration file within each project. This was a big improvement, but we still had many other tasks where Webpack alone wasn't sufficient, or necessarily the best tool. In this scenario we would to some degree still require locally defined tasks. Not _ideal_.

We then turned our attention to NPM scripts, small js files that could be run via `npm run ..` or in our case, just `yarn ..`. This made use of the Node API's that many of our third party tools expose, and gave us the added flexibility that drew us to Gulp in the first place. These could again be defined and maintained in one place, and installed via a package manager to each and every project that required them. But how to run these in a concerted manner? How could each task uniformly output the result to another, that could write the hashed file names to a manifest for example? For this we would need some kind of orchestrator, the same purpose that Gulp had served us in the past.

## Last but not least

After looking at our options, and our findings during this period, it became evident that to meet all of our requirements we would need to develop something that served the same purpose as Gulp. We wanted it to provide a thin wrapper around our existing third party toolset, that exposed a very simple API that wouldn't cause issues in the future if we wanted to swap out one tool for another. Here enters our CLI.

Once installed into a project via Yarn, we wanted to define a series of NPM scripts in the `package.json` that would look something like the following:

```json
{
  /* [...] */
  "scripts": {
    "build:js": "our-cli js",
    "build:css": "our-cli css"
  }
}
```

Each script could then be configured via arguments, or a config file local to that project. This config file would house base config values for each task, say "js" as seen above.

```javascript
module.exports = {
  js: {
    sourcePath: './src/**/*.entry.ts'
    watch: false
  }
}
```

Eac of these values could then be overridden if needed by their command line counterparts, e.g:

```bash
$ our-cli js --watch
```

It turns out, creating a CLI with Node is incredibly simple. Once you have your package setup, all that's needed is a simple property in your `package.json` file and an entry script for Node to run. There's a great introduction to this over on `npmjs.org`'s blog: <a href="https://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm" target="_blank" rel="noopener">Building a simple command line tool with npm</a>

With our new repo setup, the package configured to expose a CLI, and our intial requirements met, we were ready to strip out Gulp, and move on to good times.

As I write this we've nearly finished migrating all of our projects over to this new setup. Build times are faster, setup is simpler, and although there has been many a bump in the road, the team is happy with the outcome. Now, if there's an issue, we release a bug fix for our CLI, and bump each projects version via the package manager, maintaining consistency across all of our projects.

Now, this approach is by no means appropriate for everyone or every project. But for us, it's provided better standardisation, ease of maintainance, and consistency across our code bases.
