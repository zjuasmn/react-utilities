# react-utilities [![npm package][npm-badge]][npm] [![GitHub issues](https://img.shields.io/github/issues/zjuasmn/react-utilities.svg)](https://github.com/zjuasmn/react-utilities/issues) [![Build Status](https://travis-ci.org/zjuasmn/react-utilities.svg?branch=master)](https://travis-ci.org/zjuasmn/react-utilities) [![Coverage Status](https://coveralls.io/repos/github/zjuasmn/react-utilities/badge.svg?branch=master)](https://coveralls.io/github/zjuasmn/react-utilities?branch=master)

[npm-badge]: https://img.shields.io/npm/v/react-utilities.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-utilities

The missing react utility components. 

[Why anthor utility libary?](docs/why.md)

Whole document is in [Gitbook](https://zjuasmn.gitbooks.io/react-utilities/content/) now.

## Installation

Using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/):

```
$ npm install --save react-utilities
or
$ yarn add react-utilities
```

Use CDN

- Assuming `React` has already imported.
- Then include [https://unpkg.com/react-utilities/umd/react-utilities.js](https://unpkg.com/react-utilities/umd/react-utilities.js) (namespace `reactUtilities`)


Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else.

```js
// using ES6 modules
import {Delegate, Resolve, Debounce, Throttle} from 'react-utilities'

// or
import Resolve from 'react-utilities/Resolve'

// using CommonJS modules
var Delegate = require('react-utilities').Delegate

// CDN
var Delegate = reactUtilities.Delegate
```

## Overview

### Resolve
  `Resolve` is a react component which resolve `promise` and pass the resolved value to children component when promise return. With `Resolve` you can wrap your pure, stateless component to connect them to remote data.
  
```jsx
<Resolve name='user' promise={fetchUser(id)}>
  <User />
</Resolve>
// after fetch data `{id:1,name:'alice'}` it would render
<User user={{id:1,name:'alice'}} /> 
```

with  `Resolve`, one can 

- Load remote data from server while rendering certain component.
- Make your `Component` lazy load and use Code splitting in webpack.  [demo](demo/webpack-codesplitting-lazyload)

### Demo
![https://github.com/zjuasmn/react-utilities/blob/master/resolve-demo.gif?raw=true](https://github.com/zjuasmn/react-utilities/blob/master/resolve-demo.gif?raw=true)

### Delegate
  `Delegate` is a component delegate rendering to other component.


### Debounce
  `Debounce` is a react component to [`debounce`](https://lodash.com/docs#debounce) certain properties to children component. So children component will render less  frequently(if you make it pure).


### Throttle
  `Throttle` is a react component to [`throttle`](https://lodash.com/docs#throttle) certain properties to children component. So children component will render less  frequently(if you make it pure).

