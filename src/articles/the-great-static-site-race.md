---
title: I used 11ty and... It's awesome
tagline: A tale of many sites
tags: ['post', 'static sites', 'tooling']
excerpt: More static site generators, or JAMStack projects, are cropping up by the day. Here's a quick look at how I built this site.
image: '11ty-thumbnail.jpg'
date: 2020-10-15
layout: post.11ty.js
cssPath: layouts/post.11ty.css
---

Over the past few years, static sites, and by that I mean sites without a traditional server, have been re-gaining popularity. The benefits of a stack like this are many, not least for performance and reduced architecture costs. I recently re-built this site using 11ty, and here's what I found.

## Ecstatic for static.. site generators

I've been following the growing maturity of tools like Gatsby, Hugo and Next.js over the last few years with increasing interest. No typical back-end you say? No servers in the traditional sense I hear?

The removal of these things, and more, can potentially reduce overall complexity and allows a company to ditch vast swathes of servers and architecture in favour of a simple S3 bucket and a CDN. No security vulnerabilities. No server costs. No lag in TTFB. The benefits are great, and that's why they're becoming so popular.

## Shipped code overload

Each of these build tools provides a super quick CLI to get up and running, going from nothing to a working project in no time at all. There are many, but the two front runners in the React space at the time of writing are Gatsby and Next.js.

Both of these projects are heavily focused on performance, and they do a _great_ job at it. For anything that isn't a simple site, the architecture they use will serve you well. But there is a catch.

Ultimately, both of these projects are SPA's, with a pre-built HTML file that your application sits ontop of. This fixes two of the most common complaints for sites built in this way; Initial paint times, and SEO indexing. By providing a complete HTML document, perceived render is instantaneous and search engines are happy.

But what if you have very little interactivity on your page, if any at all? Well in this scenario, you have to ship _all_ of the necessary javascript required to render the page, even though it's _already_ rendered. This is commonly referred to as the "double payload" problem. There are ways to fix this in both Gatsby and Next.js, but for the purpose of building this site, they just seem like overkill.

## Here, and by that I mean, this

After sometime, I came across eleventy. This project claims to be framework agnostic, simple and easy to setup and get going. Being framework agnostic was appealing; In some different future I could swap out Preact with whatever else is flavour of the month without completely changing the structure of the site.

I'm a total convert to TypeScript, but from what I could tell 11ty didn't have first class support, and whatever examples I could find didn't quite fit my needs. So after a quick round of boilerplate to get this site building using 11ty, I decided to have a crack at creating my own setup that provided all of the great DX of Gatsby, but with the simplicity of 11ty.

What I came up with was this: <a href="https://github.com/jhukdev/11ty-setup" target="_blank" rel="noopener">11ty-setup</a> 🙄. This repo aimed to give me a simple starting point to bootstrap whatever project I needed, without the hassle of tooling setup and wasted hours debugging the basics. It has first class TypeScript support, it has SASS and CSS module support and it provides the relevant setup needed for partial hydration. If you're unfamiliar with the term, have a read of my [article on it here](/articles/partial-hydration).

## Some considerations

Going fully static isn't a total panacea. There are some well understood limitations and architectural decisions that need to be made. Firstly, without a dependable "server", authentication and other semi transient state _must_ be handled client side. Other things like invalidating a cache, becomes a full rebuild of your site or the affected pages. Connecting the dots between client side forms, and a database housed somewhere becomes micro-servicey.

None of these things are insurmountable, but they definitely need to be well understood before taking the plunge and going down this route. If you have a mature, stable API, and have a site that ultimately revolves around content, going "static" could be a wise choice.
