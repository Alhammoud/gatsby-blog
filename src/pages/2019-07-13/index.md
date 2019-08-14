---
path: '/2019/07/13/how-to-write-semantic-html'
date: '2019-07-13T05:52:00.000Z'
title: 'How to write semantic HTML'
author: Max Rozen
tags: ['html', 'accessibility', 'software-engineering']
excerpt: "Writing semantic HTML markup is one of the first steps to writing accessible websites. Let's learn how to get started!"
---

## What does "semantic" mean?

To write semantic HTML is to give it meaning, rather than just describing how it should look in the browser.

Take this code snippet for example:

```html
<div class="heading">My Heading</div>
<div class="paragraph">Here's a sentence I wrote just for you.</div>
```

While it is possible to write CSS to make your `heading` and `paragraph` classes appear as you like, software tooling that reads your markup has no idea what it means. It'll just see text within a div, and not know how the text in the first div relates to the second div.

Here's the semantic way of writing the previous example:

```html
<h1>My Heading</h1>
<p>Here's a sentence I wrote just for you.</p>
```

The advantages of writing your HTML semantically are:

- You get a set of default styles for free (which you can override with CSS if you wish)
- Communication: Developers who read your code in the future instantly know what was intended - there is no ambiguity to semantic markup
- SEO: Search engines like Google look for `<h1>` tags to determine which keywords to associate your content with
- Screen readers can now read your content as you intended

## More examples of Semantic vs Non-semantic markup

### Buttons

Good:

```html
<button>Click me</button>
```

Bad:

```html
<div>Click me</div>
```

**Why is this bad?**

Divs are not focusable by keyboards. We could make them focusable by adding `tabindex="0"`, but this can still be hacky in the case of inputs.

### Inputs

Good:

```html
<input type="checkbox" />
```

Bad:

```html
<div role="checkbox"></div>
```

**Why is this bad?**

As mentioned before, divs are not focusable by default. Adding `tabindex="0"` here will make your div focusable, but then you would also need to write additional JavaScript to submit the value of your "checkbox" when the rest of the form submits.
