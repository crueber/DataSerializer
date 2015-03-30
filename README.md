DataSerializer
==============
[![Build Status][travis-image]][travis-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Join the chat at https://gitter.im/crueber/DataSerializer](https://badges.gitter.im/Join%20Chat.svg)][gitter-url]

[![NPM](https://nodei.co/npm/data-serializer.png?downloads=true)](https://nodei.co/npm/data-serializer/)


## Data Serializer

This is a simple data serializer that will allow you to transform one JSON object in to another one, in a different format, via rules. This is a complete rewrite of the library of the similiar name (dataserializer) by kulakowka, with full backwards compatibility to that library, despite no code remaining from that library (even the tests are completely altered, though it would still pass the original tests). A deeply nested object model is now supported.

I would highly recommend that you just take a look at the test.js file to get a feel for how it works. Here is a quick sample of what is possible:

```javascript
var Serializer = require('data-serializer');

var model = { username: 'crueber', firstname: 'Christopher', lastname: 'Rueber', password: 'qwerty', profile: { email: 'someone@somewhere.com' } }
var collection = [model, model];

var rules = {
  'username': true,
  'firstname': false,
  'email': 'profile.email',
  'myinfo': { email: 'profile.email' },
  'fullname': function() { return this.firstname + ' ' + this.lastname; },
  'password': function() { return false; }
}

var model = Serializer(rules, model);
console.log('Serialized model', model); 

var collection = Serializer(rules, collection);
console.log('Serialized collection', collection); 

/*
Serialized model 
{ 
  username: 'crueber', 
  email: 'someone@somewhere.com',
  myinfo: { email: 'someone@somewhere.com' },
  fullname: 'Christopher Rueber' 
}

Serialized collection 
[ 
  { 
    username: 'crueber', 
    email: 'someone@somewhere.com',
    myinfo: { email: 'someone@somewhere.com' },
    fullname: 'Christopher Rueber' 
  },
  { 
    username: 'crueber', 
    email: 'someone@somewhere.com',
    myinfo: { email: 'someone@somewhere.com' },
    fullname: 'Christopher Rueber' 
  } 
]
*/

```


# License

The MIT License

Copyright (c) 2015 Christopher Rueber <crueber@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-image]: https://img.shields.io/npm/v/data-serializer.svg?style=flat
[travis-image]: https://img.shields.io/travis/crueber/DataSerializer.svg?style=flat
[travis-url]: https://travis-ci.org/crueber/DataSerializer
[gitter-url]: https://gitter.im/crueber/DataSerializer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[node-version-image]: https://img.shields.io/badge/node.js-%3E%3D_10.0-brightgreen.svg?style=flat
[node-version-url]: http://nodejs.org/download/
