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

Over the past few years, static sites, and by that I mean HTML pages with zero "backend", have been re-gaining popularity. The benefits of a stack like this are many, but these come with several caveats that are important to factor against before taking the plunge.

## Everyone's ex-static for static.. site generators

Personal sites or projects grow and mutate many times over their time on the web. Each time I decide to change something, I'm tempted, _again_, to try whatever technology or framework is flavour of the month. This is fun, but time consuming.

I've been following the growing maturity of tools like Gatsby, Hugo and Next.js over the last few years with growing interest. No typical back-end you say? No servers in the traditional sense I hear? The removal of these things, and more, reduces complexity and allows someone like myself to throw some files into an S3 bucket behind Cloudfront, and call it a day. No security vulnerabilities. No server costs. No lag in TTFB. The benefits are great, and that's why they're becoming so popular.

I've been spending some time looking into converting one of our flagship projects into a statically generated site, for many reasons, one of which being performance. This project relies _heavily_ on SEO and it's position in everyone's favourite search engine, and given "that search engine" is lending more creadence to performance, this could be a big win.

## Here, and by that I mean, this

So in my spare time I decided to put this very site together in a handful of the most popular static generators. I looked at Gatsby, which is wonderful, but wanted something much simpler for a simple a site. After sometime, I came across eleventy. This project claims to be framework agnostic (tick), simple (tick) and easy to setup and get going (tick).
