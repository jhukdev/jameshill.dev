---
title: I used 11ty and... It's awesome
tagline: A tale of many sites
tags: ['11ty', 'static sites', 'tooling', 'jamstack', 'opinion']
excerpt: More static site generators, or JAMStack projects, are cropping up by the day. Here's a quick look at how I built this site.
image: jamstack-thumbnail.jpg
publish: true
date: 2020-10-29
article: true
layout: article.11ty.js
---

Static sites, and by that I mean sites without a traditional server, have been re-gaining popularity recently. The benefits of a site like this are many, not least for performance and reduced costs. I recently wanted to go down this route for my site, here's what I found.

## Ecstatic for static.. site generators

I've been following tools like Gatsby, Hugo and Next.js over the last few years with increasing interest. No typical back-end you say? Negligable hosting costs I hear?

The removal of these things, and more, _can_ reduce overall complexity and allows a company to ditch swathes of servers in favour of a simple S3 bucket (other brands are available) and a CDN. No security vulnerabilities. No server costs. No lag in TTFB. The benefits are great, and that's why they're becoming so popular.

## Shipped code overload

Each of these build tools provides a super quick CLI to get up and running, going from nothing to a working project in no time at all. There are many, but the two front runners in the React space at the time of writing are <a href="https://www.gatsbyjs.com/" target="_blank" rel="noopener">Gatsby</a> and <a href="https://nextjs.org/" target="_blank" rel="noopener">Next.js</a>.

Both of these projects are heavily focused on performance, and they do a _great_ job at it. For anything that isn't a simple site, the architecture they use will serve you well. But there is a catch.

Ultimately, both of these projects are SPA's, with a pre-built HTML file that your app sits ontop of. This fixes two of the most common complaints for sites built in this way; Initial paint times, and SEO indexing. By providing a complete HTML document, perceived render is instantaneous and search engines are happy.

But what if you have very little interactivity on your page, if any at all? Well in this scenario, you still have to ship _all_ of the necessary javascript required to render the page, even though it's _already_ rendered. This is commonly referred to as the "double payload" problem. There are ways to fix this in both Gatsby and Next.js, but for the purpose of building **this** site, they just seemed like overkill.

## Here, and by that I mean, this

After sometime, I came across <a href="https://www.11ty.dev/" target="_blank" rel="noopener">eleventy</a>. This project claims to be framework agnostic, and incredibly fast at rendering out your pages. Being framework agnostic was appealing; In some different future I could swap out Preact with whatever else is flavour of the month without completely changing the structure of the site. Nice.

I'm a total convert to TypeScript, and from what I could tell 11ty didn't have first class support. Whatever examples I could find didn't quite fit my needs. So after a quick round of boilerplate to get this site building, I decided to have a crack at creating my own setup with all of the great DX of Gatsby, but with the simplicity of 11ty.

What I came up with was this: <a href="https://github.com/jhukdev/11tyboo" target="_blank" rel="noopener">11tyboo</a> (tickety-boo, right?). This aims to give me a simple starting point to bootstrap whatever project I needed, without the hassle of setup and wasted hours debugging the basics. It has first class TypeScript support, it has SASS and CSS module support and it provides the relevant setup needed for [partial hydration](/articles/partial-hydration).

The end result of all of this is fantastic. My site builds in under 9s, in contrast to Gatsby @ ~20s. I get to use all of the great stuff I know and love, Preact, CSS Modules, and I have **full** control over my sites structure to tune for performance. As the title of the article says, I was and am very impressed with what 11ty has to offer.

It's not going to provide you out of the box support for GraphQL, highly tuned turn key performance, or a fully fleshed out page building API, but for the purpose of a simple static site like this, it's _perfecto_. All of the these things can be implemented, but it's up to you, and that's just how I like it.

## Some considerations

Going fully static isn't a total panacea. There are some well understood limitations and architectural decisions that need to be made. Firstly, without a dependable "server", authentication and other semi transient state _must_ be handled client side. Other things like invalidating a cache, becomes a full rebuild of your site or the affected pages. Connecting the dots between client side forms, and a database housed somewhere becomes micro-servicey.

None of these things are insurmountable, but they definitely need to be well understood before taking the plunge and going down this route. If you have a mature, stable API, and/or have a site that ultimately revolves around content, going "static" could be a wise choice.
