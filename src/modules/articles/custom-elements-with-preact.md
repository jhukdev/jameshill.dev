---
title: Custom elements and Preact
tagline: Let the DOM do the work
tags: ['code', 'preact', 'jsx', 'javascript', 'custom elements', 'web components']
excerpt: Integrating Preact into other frameworks can be tricky. Let the DOM handle it via custom elements and their lifecycle methods.
image: web-components-thumbnail.jpg
publish: false
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
