DataSerializer
==============
[![Build Status][travis-image]][travis-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Join the chat at https://gitter.im/crueber/DataSerializer](https://badges.gitter.im/Join%20Chat.svg)][gitter-url]

[![NPM](https://nodei.co/npm/data-serializer.png?downloads=true)](https://nodei.co/npm/data-serializer/)

Complete rewrite (and port to CoffeeScript) of the JavaScript library written by [kulakowka/DataSerializer](https://github.com/kulakowka/DataSerializer). Fully backwards compatible. 

## Data Serializer

This is a simple data serializer (or really: reserializer/mapper) that will allow you to transform one JSON object structure into a different one, via rules. A deeply structured model and ruleset is supported. 

The rule object consists of properties which contain strings, functions, and objects. The properties are the names of the property for the target object, and the values are where to pull that data from on the source model. 

* **Strings** will look for the data in the object graph of the model supplied, and may be nested ('profile.email' will look in the profile object for the email property). 
* **Functions** will apply whatever value is returned to the the property named. Inside the function, 'this' is the model object passed to the serializer.
* **Objects** will create a nested objected in the target model, and apply the rules and model to that object as well.

All falsy rule values will result in the omission of that attribute. When passing the model in, it can be an array or an object. *Arrays will have each of their contents run through the rules.*

A simple example:

```javascript
var Serializer = require('data-serializer');

var model = { 
  username: 'crueber', 
  profile: { 
    email: 'crueber@gmail.com' 
  } 
}
var rules = { 
  user: 'username', 
  email: 'profile.email' 
}
return Serializer(rules, model)
// { 
//   user: 'crueber', 
//   email: 'crueber@gmail.com' 
// }
```

That is just a taste of what could be done. Here is a slightly more thorough example, that also shows a collection being passed in to a rule set, along with a model:

```javascript
var model = { 
  username: 'crueber', 
  firstname: 'Christopher', 
  lastname: 'Rueber', 
  password: 'qwerty', 
  profile: { 
    email: 'someone@somewhere.com' 
  } 
}

var rules = {
  username: true,
  firstname: false,
  email: 'profile.email',
  myinfo: { email: 'profile.email' },
  fullname: function() { return this.firstname + ' ' + this.lastname; },
  password: function() { return false; }
}

return Serializer(rules, model);
// { 
//   username: 'crueber', 
//   email: 'someone@somewhere.com',
//   myinfo: { email: 'someone@somewhere.com' },
//   fullname: 'Christopher Rueber' 
// }

var collection = [model, model];
return Serializer(rules, collection);
// [ 
//   { 
//     username: 'crueber', 
//     email: 'someone@somewhere.com',
//     myinfo: { email: 'someone@somewhere.com' },
//     fullname: 'Christopher Rueber' 
//   },
//   { 
//     username: 'crueber', 
//     email: 'someone@somewhere.com',
//     myinfo: { email: 'someone@somewhere.com' },
//     fullname: 'Christopher Rueber' 
//   } 
// ]
```

For further details, I would recommend glancing at the tests!


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
