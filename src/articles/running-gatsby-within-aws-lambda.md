---
title: Running Gatsby within an AWS Lambda
tagline: The Great Gatsby
tags: ['tooling', 'gatsby', 'serverless', 'aws', 'lambda']
excerpt: If you're unable or unwilling to use some of the great services out there, it's fairly trivial to setup your own deployment pipeline.
image: gatsby-thumbnail.jpg
date: 2020-11-02
publish: false
article: true
layout: article.11ty.js
---

I you haven't tried it already, <a href="https://www.gatsbyjs.com/" target="_blank" rel="noopener">Gatsby</a> is a fantastic tool for building a statically generated app or site. So much of the time consuming setup required for tooling, performance, and data layers is already done for you, right out of the box.

But once you've built your shiny new app, where to put it? How to build it? We'll look at going it alone, and running Gatsby within a triggered <a href="https://aws.amazon.com/lambda/" target="_blank" rel="noopener">Lambda</a>.

## The Status Quo

Deploying and hosting statically generated pages has largely been solved for us; Mature and inexpensive (free) services have been setup in recent years to tackle the problem of building and deploying sites built in this way.

One of the frontrunners in this space is <a href="https://netlify.com/" target="_blank" rel="noopener">Netlify</a>, they support a whole host of frameworks from Gatsby, to Hugo, and their portal allows for simple deployment straight from source control.

But what if you don't want to use a third party? Or perhaps you can't? In this scenario, it's AWS to the rescue.

## Gatsby, Lambda-ified

Before we start, let's assume a few things; We've got a Gatsby site, an AWS account, and we're pulling data from _somewhere_, maybe an API or an S3 bucket.

So, we've got our AWS account, now we need to write a Lambda that'll run Gatsby. This Lambda will need to do a few things:

- Be triggered by changes in data
- Run Gatsby against our project
- Publish the output to an S3 bucket

The first point is already handled for us by AWS; If you have an API that handles your data, you can create a <a href="https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html" target="_blank" rel="noopener">public endpoint</a> to call from there. Or, if your publishing data to a bucket, setup an <a href="https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html" target="_blank" rel="noopener">S3 event</a> that's called when data changes.

Now all we need is our Lambda. Let's take the below as a starting point:

```javascript
const aws = require('aws-sdk');

exports.handler = (event, context) => {
  // RUN
};
```

Let's assume Gatsby is handling the data requests via `gatsby-node.js` and using the `createPage()` API. All we need to do here is trigger Gatsby, and publish the result to our bucket.

The first option to achieve this is the most obvious, we create a <a href="https://nodejs.org/api/child_process.html" target="_blank" rel="noopener">child_process</a> and handle the callback. However, ideally we'd like to do this programmatically. There's a <a href="https://gist.github.com/digitalkaoz/94933c246ba67032a1507083e2605a30" target="_blank" rel="noopener">great Gist</a> that shows a POC for doing just that:

```javascript
const aws = require('aws-sdk');

exports.handler = (event, context) => {
  const gatsby = require('gatsby/dist/commands/build');

  // RUN
};
```

This gives us access to the underlying function that Gatsby's CLI uses, which returns a Promise. Bonus. Now we can instantiate Gatsby by doing the following:

```javascript
const aws = require('aws-sdk');

exports.handler = (event, context) => {
  const gatsby = require('gatsby/dist/commands/build');

  gatsby({
    directory: __dirname, // <- Working directory
  })
    .then(context.succeed)
    .catch(context.fail);
};
```

If you try to package this up and deploy to AWS, you'll quickly realise this isn't going to work. Lambda's have a series of hard size limits, the max being 250mb. Gatsby is a bit of a beast, coming in at aroung 500mb. Oh noes.

So what can we do? Well <a href="https://aws.amazon.com/efs/" target="_blank" rel="noopener">EFS</a> to the rescue. Amazon have realised people want to do crazy things with Lambda's, so they've created a way for you to mount an EFS instance to a Lambda. There's a <a href="https://aws.amazon.com/de/blogs/aws/new-a-shared-file-system-for-your-lambda-functions/" target="_blank">great introduction</a> to this here on the AWS blog.
