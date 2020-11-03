---
title: Running Gatsby in an AWS Lambda
tagline: The Great Gatsby
tags: ['tooling', 'gatsby', 'serverless', 'aws', 'lambda']
excerpt: If you're unable or unwilling to use some of the great services out there, it's fairly trivial to setup your own deployment pipeline.
image: gatsby-thumbnail.jpg
date: 2020-11-02
publish: true
article: true
layout: article.11ty.js
---

If you haven't tried it already, <a href="https://www.gatsbyjs.com/" target="_blank" rel="noopener">Gatsby</a> is fantastic for building a statically generated app or site. So much of the time consuming setup required for config, performance, and data layer is already done for you, right out of the box.

But once you've built your shiny new app, where to put it? How to build it? We'll look at going it alone, and running Gatsby within a triggered <a href="https://aws.amazon.com/lambda/" target="_blank" rel="noopener">Lambda</a>.

## The Status Quo

Deploying and hosting statically generated pages has largely been solved for us; Mature and inexpensive (free) services have been setup in recent years to tackle the problem of generating and deploying sites built in this way.

One of the front runners in this space is <a href="https://netlify.com/" target="_blank" rel="noopener">Netlify</a>, they support a whole host of frameworks from Gatsby, to Hugo, and their portal allows for simple deployment straight from source control.

But what if you don't want to use a third party? Or perhaps you can't? In this scenario, it's AWS to the rescue.

## Gatsby, Lambda-ified

Before we start, let's assume a few things; We've got a Gatsby site, an AWS account, and we're pulling data from _somewhere_, maybe an API or an S3 bucket.

So, we've got our AWS account, now we need to write a Lambda that'll run Gatsby. This Lambda will need to do a few things:

- Be triggered by changes in data
- Run Gatsby against our project
- Publish the output to an S3 bucket

The first point is already handled for us by AWS; If you have an API that handles your data, you can create a <a href="https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html" target="_blank" rel="noopener">public endpoint</a> to call from there. Or, if you're publishing data to a bucket, setup an <a href="https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html" target="_blank" rel="noopener">S3 event</a> that's called when data changes.

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

This gives us access to the underlying Promise based function that Gatsby's CLI uses. Bonus. Now we can instantiate Gatsby by doing the following:

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

## Super size the Lambda

So what can we do? Well <a href="https://aws.amazon.com/efs/" target="_blank" rel="noopener">EFS</a> to the rescue. Amazon have realised people want to do crazy things with Lambda's, so they've created a way for you to mount an EFS instance to a Lambda. There's a <a href="https://aws.amazon.com/blogs/compute/using-amazon-efs-for-aws-lambda-in-your-serverless-applications/" target="_blank">great walkthrough</a> of this here on the AWS blog.

Bottom line is, once we have Gatsby installed in an EFS instance, we'll need to tell NPM to look there for some of our packages. As the post above mentions, we can achieve this by using the <a href="https://www.npmjs.com/package/app-module-path" target="_blank" rel="noopener">app-module-path</a> package.

From the docs, we use this by declaring the package at the very top of our Lambda, with the path to our mounted EFS instance:

```javascript
require('app-module-path').addPath('/mnt/efs/node/node_modules/');

/*[...]*/

exports.handler = (event, context) => {
  const gatsby = require('gatsby/dist/commands/build');

  /*[...]*/
};
```

## Running the thing

Ok, so we've now got our Lambda deployed, but when we go to test, there's an error:

```bash
error TypeError: Cannot read property 'name' of undefined
```

After some digging, it looks like we're missing some of the properties that Gatsby would define outside of the build function. In this case, Gatsby's looking for the _name_ property of our `package.json`. Simple fix:

```javascript
const aws = require('aws-sdk');

exports.handler = (event, context) => {
  const gatsby = require('gatsby/dist/commands/build');

  gatsby({
    directory: __dirname, // <- Working directory
    sitePackageJson: require('./package.json'),
  })
    .then(context.succeed)
    .catch(context.fail);
};
```

There are other properties that we can define, things like `verbose: boolean`, or `browserslist: ['>0.25%', 'not dead']`. But for now, the above seems like the bare minimum we'll need.

It's also worth pointing out that we'll need to ensure the value of `process.env.NODE_ENV` is set to production; Many plugins you might use rely on this, and as we're not using the CLI, this won't _necessarily_ already be defined correctly.

If we now try to run this, there's another problem. Lambda's only allow us to write to the `./tmp` directory, but by default, Gatsby outputs our site to `./public`. Again, we've got some guidance here from the <a href="https://gist.github.com/digitalkaoz/94933c246ba67032a1507083e2605a30#file-index-js-L37" target="_blank" rel="noopener">Gist</a>.

We need to mock the filesystem, and provide an alias for the output directory:

```javascript
const aws = require('aws-sdk');
const { link } = require('linkfs'); // <-- We need this package
const mock = require('mock-require'); // <-- And this package
const fs = require('fs');
const tmpDir = require('os').tmpdir();

exports.handler = (event, context) => {
  const linkedFs = link(fs, [
    [`${__dirname}/.cache`, tmpDir + '/.cache'],
    [`${__dirname}/public`, tmpDir + '/public'],
  ]);

  linkedFs.ReadStream = fs.ReadStream;
  linkedFs.WriteStream = fs.WriteStream;

  mock('fs', linkedFs);

  const gatsby = require('gatsby/dist/commands/build');

  /*[...]*/
};
```

## Deploy the things

Now that we can successfully run our Lambda, and Gatsby's writing our files to the correct location, all we need to do is deploy these to our S3 bucket.

```javascript
exports.handler = (event, context) => {
  /*[...]*/

  gatsby({
    directory: __dirname,
    sitePackageJson: require('./package.json'),
  })
    .then(deployFiles) // <-- This function does the deploy
    .then(context.succeed)
    .catch(context.fail);
};
```

There's a million and one guides detailing how to do this, but all we're looking to do is read our `./public` directory (recursively):

```javascript
const aws = require('aws-sdk');
const path = require('path');
const fs = require('fs');

/*[...]*/

async function getFilePaths(value) {
  const directory = await fs.promises.readdir(value, { withFileTypes: true });

  const files = await Promise.all(
    directory.map((file) => {
      const result = path.resolve(value, file.name);

      return file.isDirectory() ? getFiles(result) : result;
    })
  );

  return [].concat(...files);
}
```

Once we have our list, we'll read the contents and upload to S3:

```javascript
const aws = require('aws-sdk');
const path = require('path');
const fs = require('fs');

/*[...]*/

async function deployFiles() {
  const filePaths = getFilePaths('./public');

  await Promise.all(
    filePaths.map((filePath) => {
      const file = filePath.split('public');
      const data = fs.readFileSync(file);

      return s3
        .putObject({
          Bucket: 'YOUR_BUCKET',
          Key: file,
          Body: data,
        })
        .promise();
    })
  );
}
```

## Wrapping it all up

All that's left for us to do is zip our Lambda up with it's relevant dependencies, those of our actual site, and of course all of the Gatsby config files needed for it to run.

If you'd like to see a more complete version, check out the <a href="https://github.com/jhukdev/gatsby-lambda" target="_blank" rel="noopener">repo here</a>. I've opted for TypeScript there, cos why not, but the general structure is the same.

Happy building.
