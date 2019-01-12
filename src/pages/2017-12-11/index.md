---
path: "/2017/12/11/react-select"
date: "2017-12-11T18:52:00.000Z"
title: "How to style react-select with styled-components or emotion"
tags: ['react','react-select','styled-components','emotion']
excerpt: "A quick how-to code dump of how to use the popular CSS-in-JS libraries with react-select"
---

(Sorry not sorry, this article contains a lot of link-bombing)

In case you haven't heard of these two libraries,
<a href="https://github.com/JedWatson/react-select" target="_blank">react-select</a>
is one of the most popular select dropdown pickers in Github, and
<a href="https://www.styled-components.com/" target="_blank">styled-components</a>
is one of the most popular CSS-in-JS libraries out there. Another one of these
is <a href="https://emotion.sh/" target="_blank">emotion</a>, which uses the
same API as styled-components, which makes it a breeze to swap between the two.

Personally, I prefer emotion as it allows composition between CSS elements, and
doing things like having a base component which gets dynamically styled
depending on a single text prop provided to it. (but I digress...)

How to use react-select and styled-components together:

```javascript
import React from "react";
import ReactSelect from "react-select";
import styled from 'styled-components';

const MultiSelect = styled(ReactSelect)`
	&.Select--multi  {

		.Select-value {
			display: inline-flex;
			align-items: center;
		}
	}

	& .Select-placeholder {
		font-size: smaller;
	}
`

export (props) => <MultiSelect multi {...props} />
```

How to use react-select and emotion together:

```javascript
import React from "react";
import ReactSelect from "react-select";
import styled from 'emotion';

const MultiSelect = styled(ReactSelect)`
	&.Select--multi  {

		.Select-value {
			display: inline-flex;
			align-items: center;
		}
	}

	& .Select-placeholder {
		font-size: smaller;
	}
`

export (props) => <MultiSelect multi {...props} />
```

It's really that easy to go between the two libraries.

You can also do the exact same thing with
<a href="https://github.com/airbnb/react-dates">react-dates</a>, saving you from
having those pesky global.css files several thousand lines long.
