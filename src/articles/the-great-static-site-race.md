---
title: I used 11ty and... It's awesome
tagline: A tale of many sites
tags: ['post', 'static sites', 'tooling']
excerpt: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
image: 'simplify-tooling-thumbnail.jpg'
date: 2020-10-10
layout: post.11ty.js
cssPath: layouts/post.11ty.css
---

Over the past few years, static sites, and by that I mean sites without a traditional server, have been re-gaining popularity. The benefits of a stack like this are many, not least for performance and reduced architecture costs.

## Everyone's ex-static for static.. site generators

Personal sites or projects grow and mutate many times over their time on the web. Each time I decide to change something, I'm tempted, _again_, to try whatever technology or framework is flavour of the month. This is fun, but time consuming.

I've been following the growing maturity of tools like Gatsby, Hugo and Next.js over the last few years with increasing interest. No typical back-end you say? No servers in the traditional sense I hear?

The removal of these things, and more, reduces overall complexity and allows someone like myself to throw files into an S3 bucket behind Cloudfront, and call it a day. No security vulnerabilities. No server costs. No lag in TTFB. The benefits are great, and that's why they're becoming so popular.

## Limitations of the status quo

So in my spare time I decided to put this very site together in a handful of the most popular static generators. I looked at Gatsby, which is wonderful, I looked a Next.js, which is great, and I looked at Hugo, which is speedy.

Each of these provide a super quick CLI to get up and running with, going from nothing to a working project in no time at all. I weighed each of the three projects, and decided I didn't feel like switching to Go right now, so Hugo was out. That left Gatsby and Next.js.

Now, it's worth pointing out that both of these projects are heavily focused on performance, and they do a _great_ job at it. For anything that isn't a simple site, the architecture they use will serve you well. But there is a catch.

Ultimately, both of these projects are SPA's, but with a pre-built HTML file that your application sits ontop of. This fixes two of the most common complaints for sites built in this way; Initial paint times, and SEO indexing. By providing a complete HTML document, perceived render is instantaneous and serch engines are happy.

But what if you have very little interactivity on your page, if any at all? Well in this scenario, you have to ship _all_ of the necessary javascript required to render the page, even though it's _already_ rendered, with no to little hydration actually needed. This, to me, seems wasteful and I wanted to find a way to avoid it.

## Here, and by that I mean, this

After sometime, I came across eleventy. This project claims to be framework agnostic (tick), simple (tick) and easy to setup and get going (tick).

Now, I'm a total convert to TypeScript, let's get that out into the open. But from what I could tell, 11ty didn't have first class support, and whatever examples I could find didn't quite fit my needs. So after a quick round of boilerplate to get this site building using 11ty, I decided to have a crack at creating my own setup that provided all of the great DX of Gatsby, but with the simplicity of 11ty.

What I came up with was this: <a href="https://github.com/jhukdev/11ty-setup" target="_blank" rel="noopener">11ty-setup</a>. An awesome name, I know. This project aimed to give me a simple starting point to bootstrap whatever project I needed, without the hassle of tooling setup and wasted hours debugging the basics. It has first class TypeScript support, it has SASS and CSS module support and it provides the relevant setup needed for partial hydration. If you're unfamiliar with the term "Partial Hydration", have a read of my [article on it here](/articles/partial-hydration).
