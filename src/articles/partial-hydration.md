---
title: Partial hydration in Preact
tagline: How to reduce wasted bytes
tags: ['performance', 'preact', 'jsx', 'javascript', 'code']
excerpt: Reducing the volume of javascript shipped to your users is an ongoing concern, here's one way of approaching this.
image: preact-thumbnail.jpg
publish: true
date: 2020-10-13
article: true
layout: article.11ty.js
---

Today, there's an increasing emphasis on performance, and quite right too. Ensuring you only ship code that is absolutely essential for the initial render should be at the forefront of every front-end developers mind.

The days of shoving everything into a `vendor.js` file and calling it a day are long gone. DevRels and others across the internet are promoting an open and accessible web, where regardless of how powerful your device may be, an app performs as best it can.

This article focuses on Preact, but is in no way exclusive to this library. In particular, we'll look at pre-rendered applications, be it server side or statically generated.

## What to hydrate, where

To start with, what do we mean by "hydration"? In the world of virtual DOM libraries, "hydration" refers to the re-binding of pre-built markup to a specific component. Both Preact and React provide a specific function that takes care of this, `hydrate()`.

This function provides a kind of "soft" render, where the library does a quick comparison with whatever it might be expecting, and if all is well, simply attaches event listeners and runs the component's lifecycle methods, including <a href="https://preactjs.com/guide/v10/hooks/" target="_blank" rel="noopener">hooks</a>.

This way, we bypass the work needed to render this component on the client, but still make use of the interactive methods that the component might provide.

Not all components will _need_ to be hydrated however, some are simply static and are purely presentational. Meaning, it would be wasted work to hydrate many of our applications components that will not provide any benefit from being run client side. This is where "partial hydration" comes in.

## Common patterns

In your typical SPA, you'll either have a single entry file, or one per page that's responsible for rendering the application. This can look something like the following:

```tsx
import { hydrate } from 'preact';
import { App } from './components/app';

/*[...]*/

hydrate(<App />, document.getElementById('root'));
```

This is all fine and well, and if your application is relatively small, this approach will probably be adequate. However, you'll find that much of your application is run for little to no reason when pre-rendered on the server.

Typically, event handling and life cycle methods happen in isolated areas, and in order for Preact to bind and trigger those events, it must run through the entire component tree. Less than ideal.

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

Here we have one `<Button />` component that must be hydrated in order to bind event listeners, and another _enormous_ tree under `<MegaHuge />` that is purely presentational.

Following the single entry pattern shown above, we must run both of these components in order for Preact to recognise we have event handlers, and bind accordingly. This means some of the work done ahead of time to pre-render has been wasted, not to mention a bloated js file sent across the network.

## How do we fix this?

Well, first we need to some how isolate the components we know need hydration. One way to approach this is by applying a high order component (HOC) to the section in question. This gives you a point of control to hydrate your component, access any properties that the server has provided, and finally, render within a root element. The HOC could look something like this:

```typescript
import { h, hydrate } from 'preact';

/*[...]*/

function withHydration(uniqueName: string, component: any) {
  const preRender = typeof window === 'undefined';

  const formatName = uniqueName.replace(/([a-z])([A-Z])/g, '$1-$2');
  const elementName = `component-${formatName.toLowerCase()}`;

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

First, we check whether the function is being run on the server, or the client. We can achieve this with an assumption that `window` will only be defined in a browser.

Next, we construct an element handle using the `uniqueName` argument. If we used `LoginForm` as the `uniqueName` value, the result of this will look something like `component-login-form`.

If the function is running in the browser, we query the DOM for our element name, e.g `<component-login-form>`, extract some JSON data held within, and run Preact's `hydrate` function with our component reference and data.

If the function is running on the server, we simply return a function that accepts some props, and generates the container along with the rendered component. The result of this will look something like the following:

```html
<component-login-form>
  <script type="application/json">
    { "className": "login", "formTitle": "Login Form" }
  </script>
  <form class="login">
    <h3>Login Form</h3>
    <!-- rest of component -->
  </form>
</component-login-form>
```

## Using the higher order function

Finally, to use the `withHydration()` function, you'll do something like the this:

```tsx
import { LoginForm as Component } from './login-form';
import { withHydration } from './withHydration';

/*[...]*/

const LoginForm = withHydration('LoginForm', Component);
```

Now that you've isolated the component, and provided a way to hydrate it with data, all you'll need to do is run it on the client. This can be achieved by importing the file into your entry point:

```ts
import './components/login-form';
```

And there it is. One approach to solving the double payload problem. There's a lot of work happening to make this process less manual, but if you want total control over how and what code gets sent to a client, this pattern is a fairly good solution.
