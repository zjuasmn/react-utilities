# react-mobx-utils

Utility react components with mobx power

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-mobx-utils

Using [yarn](https://yarnpkg.com/):

    $ yarn add react-mobx-utils

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

`Resolve` handle date requirement promise and pass it to children, same functionality as `React-Resolver`, but with less overhead!

Say you have a react component `UserDetail` for rendering user detail from `user` object like `<UserDetail user={user} />`. Since `user` is from remote server by requesting `/api/users/${.userId}` and 

```js
import Resolve from 'react-mobx-utils/Resolve'

class UserDetailPage extends React.Component{
    user$; // promise to get user detail data;
    construcor(props){
      super(props);
      this.user$ = http.get(`/api/users/${props.params.userId}`);
    }
    render(){
        return (<Resolve name='user' value={this.user$}>
              <UserDetail />
            </Resolve>);
    }
}
```
or just simply 
```js

<Route path='/users/:userId'>
  <Resolve name='user' value={this.user$}>
     <UserDetail />
  </Resolve>
</Route>
```



This is the equivalent to asynchronously loading user and providing it to the component as if it were provided directly:
```js
<UserProfile user={data} />
```

