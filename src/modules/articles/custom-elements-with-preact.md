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

Preact is a fantastic fit for bringing the power of a virtual DOM, and JSX, to existing projects. For one, it's small and light, enough not to exacerbate any pre-existing issues from other frameworks that might be in use. It's also API compatible with React, so you get access to the powerful ecosystem of third party components that exist today.

However, for non trivial uses, manually triggering the render of your components within an existing code base can become messy.

For example, say you want to Preact-ify some component that's rendered after a user interaction. Say the code base is largely built in jQuery, for the sake of argument. Now, we could call Preact's `render` function with our component directly in the event handler that displays this piece of content, or setup some kind of event system.

That works, but we're getting into a pretty muddy world that will only grow in complexity as time goes on. What we really need, is some way to make use of Preact in an isolated, well organised way. Here enters _Web Components_, or more accurately, <a href="https://developers.google.com/web/fundamentals/web-components/customelements" target="_blank" rel="noopener">HTML Custom Elements</a>

## Anatomy of the DOM

HTML Custom Elements, or "Web Components", allow us to tap into the underlying processes beneath our beloved elements. There are many great examples of how to make use of these, however, for the benefit of this article, we're going to focus on two of them; `connectedCallback` and `disconnectedCallback`.

These two methods allow us to hook into whenever the DOM recognises an element exists, or has been removed. This is significant, as it allows us to trigger code based on the existance of our custom elements.

For example, take this custom element: `<social-share>`

```typescript
class SocialShare extends HTMLElement {
  public connectedCallback() {
    // fires when element exists
  }

  public disconnectedCallback() {
    // fires when element is removed
  }
}

/*[...]*/

customElements.define('social-share', SocialShare);
```
