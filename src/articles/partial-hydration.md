---
title: Partial hydration in Preact
tagline: How to reduce wasted bytes
tags: ['post', 'performance', 'preact']
excerpt: Reducing the volume of javascript shipped to your users is an ongoing concern, here's one way of approaching this.
image: 'simplify-tooling-thumbnail.jpg'
date: 2020-10-13
layout: post.11ty.js
---

## Lorem ipsum

```typescript
function withHydration(uniqueName: string, component: ComponentFactory) {
  const preRender = typeof window === 'undefined';

  if (preRender) {
    return h(component, {};)
  }
}
```
