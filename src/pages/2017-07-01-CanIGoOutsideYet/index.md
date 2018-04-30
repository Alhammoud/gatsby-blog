---
path: "/2017/07/01/can-i-go-outside-yet"
date: "2017-07-01T18:52:00.000Z"
title: "Can I Go Outside Yet?"
tags: ['canigooutsideyet','angular','side-project']
excerpt: "A simple way to check if it's worth going outside today"
---

Originally, my idea was that it would send a notification via email each time an
API responded with a southerly wind at the Bureau of Meteorology's Sydney
Airport weather station on a given day.

I quickly realised IP based geolocation in HTML5 was now accurate enough to get
you somewhat accurate weather forecasting using www.wunderground.com, so I
quickly figured out how to use their API for a fun little weather app.

On the technical implementation side, I wrote a simple router in Angular to
switch between tabs in the app, and used leaflet and markercluster libraries to
display weather stations over a map of Australia.
