---
title: Custom elements and Preact
tagline: Let the DOM do the work
tags: ['code', 'preact', 'jsx', 'javascript', 'custom elements', 'web components']
excerpt: Integrating Preact into other frameworks can be tricky. Let the DOM handle it via custom elements and their lifecycle methods.
image: web-components-thumbnail.jpg
publish: true
date: 2021-02-12
article: true
layout: article.11ty.js
---

> TL/DR: The package <a href="https://github.com/jhukdev/preactement" target="_blank" rel="noopener">preactement</a> allows you to easily wrap any Preact component in a custom element. It provides both synchronous, and asynchronous rendering.

Preact is a fantastic fit for bringing the power of a virtual DOM, and JSX, to existing projects. For one, it's small and light, enough not to exacerbate any pre-existing issues from other frameworks that might be in use. It's also API compatible with React, so you get access to the powerful ecosystem of third party components that exist today.

However, for non trivial uses, manually triggering the render of your components within an existing code base can become messy.

For example, say you want to Preact-ify some component that's rendered after a user interaction. Say the code base is largely built in jQuery, for the sake of argument. Now, we could call Preact's `render` function with our component directly in the event handler that displays this piece of content, or setup some kind of event system.

That works, but we're getting into a pretty muddy world that will only grow in complexity as time goes on. What we really need, is some way to make use of Preact in an isolated, well organised way. Here enters _Web Components_, or more accurately, <a href="https://developers.google.com/web/fundamentals/web-components/customelements" target="_blank" rel="noopener">HTML Custom Elements</a>

## Anatomy of the DOM

HTML Custom Elements, or "Web Components", allow us to tap into the underlying processes beneath our beloved elements. There are many great examples of how to make use of these, however, for the benefit of this article, we're going to focus on two of them; `connectedCallback` and `disconnectedCallback`.

These two methods allow us to hook into whenever the DOM recognises an element exists, or has been removed. This is significant, as it allows us to trigger code based on the existance of our custom elements.

For example, take this custom element: `<social-share>`

```typescript
import { h, render } from 'preact';
import { SocialShare } from './socialShare.component';

/*[...]*/

class SocialElement extends HTMLElement {
  /*[...]*/

  public connectedCallback() {
    render(h(SocialShare, {}), this); // magic!
  }

  public disconnectedCallback() {
    // triggers componentWillUnmount
    render(null, this);
  }
}

/*[...]*/

customElements.define('social-share', SocialElement);
```

Now that we've defined our custom element, whenever `<social-share>` exists in the DOM, `connectedCallback` will be fired. If the element were to be removed, `disconnectedCallback` would likewise be called.

We can make use of these DOM lifecyle methods to trigger our Preact component's render, completely isolated from the rest of our code base. If we go back to our hypothetical jQuery project, all we'd need to do is define our component as seen above, and then use jQuery to add the respective element, `<social-share>` when needed.

## Split all the things

The above example is a great start, but what if we're super performance savvy, and wanted to only load the component when actually needed? In the above example, we're statically importing `SocialShare`, which means our bundler of choice will just add this into our entry file. What we need is a dynamic import:

```typescript
/*[...]*/

public async connectedCallback() {
  const component = await import('./socialShare').then(({ SocialShare }) => SocialShare);

  render(h(SocialShare, {}), this); // chunked!
}
```

This is better, but we're still introducing lots of boilerplate. For every component we create, a custom element must be defined with the above pattern. A handful of these don't pose to much of an issue, but if your goal is a grandual refactor towards Preact (or React, etc) components, this will grow over time.

What we _now_ need, is some kind of re-usability for the above.

## NPM all the things

Luckily for us, there's a great library created by the guys behind Preact: <a href="https://github.com/preactjs/preact-custom-element" target="_blank" rel="noopener">preact-custom-element</a>. This provides the fundamental benefits of above, but without the repetition and ever growing boilerplate.

> I honestly cannot express enough what an incredible job the team behind Preact are doing, they all deserve huge appreciation from everyone.

This package is fantastic if you're happy to statically import your components, but it doesn't provide (at time of writing) the ability to defer loading of your code until needed via dynamic imports. I needed just this usecase, so, standing on the shoulders and all of that, I _borrowed_ a good chunk of this library to solve my needs.

The result of this was <a href="https://github.com/jhukdev/preactement" target="_blank" rel="noopener">preactement</a>. Having _borrowed_ the general workings of `preact-custom-element`, I went to work extending this slightly to allow for asynchronous loading of Preact components within `connectedCallback()`.

Now, whenever you want to Preact-ify some part of your existing code base, all you need to do is the following:

```typescript
import { define } from 'preactement';

/*[...]*/

define('social-share', () => import('./socialShare'));
```

That's it, your shiny new component will now be chunked via your bundler, and only loaded when the `<social-share>` element exists on your page, wherever that might be.
