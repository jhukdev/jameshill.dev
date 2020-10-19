---
title: Partial hydration in Preact
tagline: How to reduce wasted bytes
tags: ['post', 'performance', 'preact']
excerpt: Reducing the volume of javascript shipped to your users is an ongoing concern, here's one way of approaching this.
image: 'simplify-tooling-thumbnail.jpg'
date: 2020-10-13
layout: post.11ty.js
---

In the time of our modern web, there's an increasing emphasis on performance, and quite right to. Ensuring you only ship code that is absolutely essential for the initial render should be at the forefront of every front-end developers mind.

The days of shoving everything into a `vendor.js` file and calling it a day are long gone. DevRels and others across the internet are promoting an open and accessible web, where regardless of how powerful your device may be, an app performs as best it can.

This article focuses on Preact, but is in no way exclusive to this library. In particular we'll look at pre-rendered applications, be it server side or statically generated.

## Common patterns

In a typical SPA, you'll have a single entry file that is responsible for rendering the application. Ideally there will be one per view that will be responsible for running the code specifically for that page, but commonly a single file will be shared across each.

This normally looks something like this:

```typescript
import { h, hydrate } from 'preact';
import { App } from './components/app';

/*[...]*/

hydrate(document.getElementById('root'), <App />);
```

This is all fine and well, and if your application is relatively small, this approach will probably be adequate. However, you'll find that much of your application logic is run for little to no reason when pre-rendered on the server. Typically, event handling happens in isolated areas, and in order for Preact to bind those events, it must run through the entire component tree. Less than ideal.

Take this component for example:

```tsx
import { h } from 'preact';
import { MegaHugeContent } from './banner';
import { Button } from './button';

/*[...]*/

function App() {
  return (
    <div>
      <MegaHugeContents />
      <Button>Buy Stuff</Button>
    </div>
  );
}
```

Here we have one `<Button />` component that must be hydrated to bind event listeners, and another _enormous_ tree under `<MegaHugeContents />`. Following the single entry pattern shown above, we must run both of these components in order for Preact to recognise we have event handlers, and bind accordingly. This means some of the work done ahead of time to pre-render these has been wasted, and is duplicated on the client.

## How do we fix this

```typescript
function withHydration(uniqueName: string, component: ComponentFactory) {
  const preRender = typeof window === 'undefined';

  if (preRender) {
    return h(component, {};)
  }
}
```
