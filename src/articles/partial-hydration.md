---
title: Partial hydration in Preact
tagline: How to reduce wasted bytes
tags: ['performance', 'preact']
excerpt: Reducing the volume of javascript shipped to your users is an ongoing concern, here's one way of approaching this.
image: preact-thumbnail.jpg
date: 2020-10-13
article: true
layout: post.11ty.js
---

In the time of the "modern" web (at time of writing), there's an increasing emphasis on performance, and quite right to. Ensuring you only ship code that is absolutely essential for the initial render should be at the forefront of every front-end developers mind.

The days of shoving everything into a `vendor.js` file and calling it a day are long gone. DevRels and others across the internet are promoting an open and accessible web, where regardless of how powerful your device may be, an app performs as best it can.

This article focuses on Preact, but is in no way exclusive to this library. In particular we'll look at pre-rendered applications, be it server side or statically generated.

## Common patterns

In a typical SPA, you'll have a single entry file that is responsible for rendering the application. Ideally there will be one per view that will be responsible for running the code specifically for that page, but commonly a single file will be shared across each.

This normally looks something like this:

```tsx
import { hydrate } from 'preact';
import { App } from './components/app';

/*[...]*/

hydrate(document.getElementById('root'), <App />);
```

This is all fine and well, and if your application is relatively small, this approach will probably be adequate. However, you'll find that much of your application logic is run for little to no reason when pre-rendered on the server. Typically, event handling happens in isolated areas, and in order for Preact to bind those events, it must run through the entire component tree. Less than ideal.

Take this component for example:

```tsx
import { h } from 'preact';
import { MegaHuge } from './megaHuge';
import { Button } from './button';

/*[...]*/

function App() {
  return (
    <main>
      <Button>Buy Stuff</Button>
      <MegaHuge />
    </main>
  );
}
```

Here we have one `<Button />` component that must be hydrated in order to bind event listeners, and another _enormous_ tree under `<MegaHuge />`. Following the single entry pattern shown above, we must run both of these components in order for Preact to recognise we have event handlers, and bind accordingly. This means some of the work done ahead of time to pre-render has been wasted.

## How do we fix this?

Well, first we need to some how isolate the components we know need hydration. One way to approach this is by applying a high order component (HOC) to the section in question. This gives you a point of control to hydrate your component, access any properties that the server has provided, and finally render within a root element. This HOC could look something like this:

```typescript
import { h, hydrate } from 'preact';

/*[...]*/

function withHydration(uniqueName: string, component: any) {
  const preRender = typeof window === 'undefined';
  const elementName = getElementName(uniqueName);

  if (!preRender) {
    const root = document?.querySelectorAll(elementName);
    const data = root?.querySelector('[type="application/json"]');

    return hydrate(h(component, JSON.parse(data?.innerHTML)), root);
  }

  return (props: any) =>
    h(elementName, {}, [
      h('script', {
        type: 'application/json',
        dangerouslySetInnerHTML: { __html: JSON.stringify(props) },
      }),
      h(component, props),
    ]);
}
```

There's quite a lot going on here so let's step through..

First, we check whether the function is being run on the server, or the client. We can achieve this with an assumption that `window` will only be defined in a browser. E.g: `typeof window === 'undefined'`

Next, we construct an element handle using the `uniqueName` argument. If we used `LoginForm` as the `uniqueName` value, the result of `getElementName()` will look something like `login-form-component`.

If the function is running in the browser, we query the DOM for our element name, e.g `<login-form-component>`, extract some JSON data held within, and run Preact's `hydrate` function with our component reference and data.

If the function is running server side, we simply return a function that accepts some props, and generates the container used above. The result of this will look something like the following:

```html
<login-form-component>
  <script type="application/json">
    { "className": "login", "formTitle": "Login Form" }
  </script>
  <form class="login">
    <h3>Login Form</h3>
    <!-- rest of component -->
  </form>
</login-form-component>
```

## Using the higher order function

Finally, to use the `withHydration()` function you'll do something like the following. Where you place this is up to you, but I tend to have an `index.ts` file within a component's folder that handles anything related to implementation detail:

```tsx
import { LoginForm as Component } from './login-form';
import { withHydration } from './withHydration';

/*[...]*/

const LoginForm = withHydration('LoginForm', Component);
```

Now that you've isolated the component, and provided a way to hydrate it with data, all you'll need to do is run it on the client. I normally do something like this in an entry file that's built via a bundler:

```ts
import './components/login-form';
```

And there it is. One approach to solving the double payload problem. There's a lot of work happening to make this process less manual, but if you want total control over how and what code gets sent to a client, this pattern is a fairly good solution.
