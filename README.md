DataSerializer
==============
[![Build Status][travis-image]][travis-url]
[![Node.js Version][node-version-image]][node-version-url]

[![NPM](https://nodei.co/npm/data-serializer.png?downloads=true)](https://nodei.co/npm/data-serializer/)


## Data Serializer

This is a simple data serializer that will allow you to transform one JSON object in to another one, in a different format, via rules. This is a complete rewrite of the library of the similiar name (dataserializer) by kulakowka, with full backwards compatibility to that library. Primarily, it now supports deeply nested objects in the model.

Here is an example that shows most of what is possible with these updates:

```javascript
var Serializer = require('data-serializer');

var model = { username: 'crueber', firstname: 'Christopher', lastname: 'Rueber', password: 'qwerty', profile: { email: 'someone@somewhere.com' } }
var collection = [model, model];

var rules = {
  'username': true,
  'firstname': false,
  'email': 'profile.email',
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
  fullname: 'Christopher Rueber' 
}

Serialized collection 
[ 
  { 
    username: 'crueber', 
    email: 'someone@somewhere.com',
    fullname: 'Christopher Rueber' 
  },
  { 
    username: 'crueber', 
    email: 'someone@somewhere.com',
    fullname: 'Christopher Rueber' 
  } 
]
*/

```

[npm-image]: https://img.shields.io/npm/v/data-serializer.svg?style=flat
[travis-image]: https://img.shields.io/travis/crueber/DataSerializer.svg?style=flat
[travis-url]: https://travis-ci.org/crueber/DataSerializer

[node-version-image]: https://img.shields.io/badge/node.js-%3E%3D_10.0-brightgreen.svg?style=flat
[node-version-url]: http://nodejs.org/download/
