---
path: "/2018-02-13-whats-new-in-es6-javascript"
date: "2018-02-13T05:52:00.000Z"
title: "What's new in JavaScript ES6?"
tags: ['javascript','es6']
excerpt: "Going over new features that definitely aren't compatible with Internet Explorer 11"
---

Recently I had to go through my company's code to figure out why certain
browsers (_Cough_ Internet Explorer _Cough_) weren't working - here's a kind of
post-mortem:

We used webpack and babel to build our sites - but normally we only specify node
and react as targets. The thing is, ES6 never got implemented on Internet
Explorer 11, so I had to dig through and figure out what isn't supported.

Here's a partial list of all the awesome things you can't do for your users
(without a polyfill) on IE11:

* Arrow functions

Just your average function, except they share the same 'this' as the code
surrounding it

* Classes

Classes in ES6 are basically just functions that allow you to use classic
inheritance, instance methods, and constructors. They can also have instances.

* Object Literals

Basically just let you have adhoc functions in your objects, and perform 'super'
calls on the object's parents. Brings more of an Object Oriented approach to
Javascript.

* Template Strings

Just lets you construct strings in a syntactically nice way. Things like
multilining, inserting variables via interpolation, etc.

* Destructuring

Lets you pull in a variable name out of an object, for direct use (doesn't
remove the variable from the object, just gives you access to its name directly)
i.e

```
let x = { this: 123, that:345}
const { this } = x
console.log(this)
// 123
```

* Default Parameters

Lets you optionally pass/skip arguments. i.e:

```
function blah(x, y=5)
{ return x \* y }
console.log(blah(5)) //25
```

* Rest Parameters

Allows you to pass in infinite arguments to a function via an array i.e

```
function sum(...args){
  return args.reduce((previous, current) => {
      return previous + current
  });
}
```

* Spread Syntax

allows an array, object, or string to be deconstructed out or expanded into
places where zero or more are expected. Use case: spread a smaller object into a
bigger one, without nesting the object: i.e.

```
let myObject = {a: b, c: d}
let Item = {
  x: y,
  ...myObject }
console.log(Item)
//{a:b,c:d,x:y}
```

* Let + Const

Let is the new var, except its scope is limited to its block Const is a variable
you can only define once

```
if(x){
  let y = 5
}
y = 5 //syntax error, y is undefined
```

* Map object

Lets you store key:value pairs

Maps can store anything against anything, while object keys have to be strings

Map has a size property

Maps are iterable Objects

Maps have a prototype, so technically you could collide with those defaultkeys

Maps may perform better than objects when frequently adding or removing
key/value pairs

* Object.assign()

Usage: Object.assign({}, object)

Method to copy values from a source object to a target object Returns the target
object

* Promises

a promise is a representation of a value that may be available in the future -
particularly useful for asynchronous programming

* Set object

Lets you store a list of unique values of any type

```
const set2 = new Set([1,2,3,])
//trade-off is that ensuring uniqueness costs you speed
```

It also doesn't allow index-based access, as you would have in an Array
