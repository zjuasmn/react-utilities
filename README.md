# react-mobx-utils

Utility react components with mobx power

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-mobx-utils

Using [yarn](https://yarnpkg.com/):
react-mobx-utilsmobx-history

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else.

```js
// using ES6 modules
import {Resolve, Debounce, Throttle} from 'react-mobx-utils'

// or
import Resolve from 'react-mobx-utils/Resolve'

// using CommonJS modules
var Resolve = require('react-mobx-utils').Resolve
var Debounce = require('react-mobx-utils').Debounce
var Throttle = require('react-mobx-utils').Throttle
```
## Usage

### Resolve

```js
import Resolve from 'react-mobx-utils/Resolve'

const ResolvedUserProfile = (user) =>
      <Resolve name='user' value={server.findById(user.id)}>
         <UserProfile />
      </Resolve>
```

This is the equivalent to asynchronously loading user and providing it to the component as if it were provided directly:
```js
<UserProfile user={data} />
```

