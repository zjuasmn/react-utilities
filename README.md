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

## Overview

### Resolve
  `Resolve` is a react component to resolve `promise` and pass the resolved value to children component when promise return. So you can build pure, stateless component.

#### demo
  ![https://github.com/zjuasmn/react-mobx-utils/blob/master/resolve-demo.gif?raw=true](https://github.com/zjuasmn/react-mobx-utils/blob/master/resolve-demo.gif?raw=true)

#### code
```js
import React from "react";
import Resolve from "react-mobx-utils/Resolve";
import {getUserDetail, getUserList} from "./mock";

export default class ResolveDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList$: getUserList()
    };
  }

  selectUser = (id) => {
    this.setState({userDetail$: getUserDetail(id)});
  };

  render() {
    let {userList$, userDetail$} = this.state;
    return <div>#
        <Resolve name='userList' promise={userList$} pending={<div>Fetch user list...</div>}>
          <UserList onSelect={this.selectUser}/>
        </Resolve>
        <Resolve name='user' promise={userDetail$}
                 idle={<div>Select a user.</div>}
                 pending={<div>Waiting...</div>}
                 rejected={({error}) => <div>{error.message}</div>}>
          <UserDetail />
        </Resolve>
      </div>;
  }
}
// UserList and UserDetail are PURE!
const UserList = ({userList, onSelect}) => <ul>
  {userList.map(({id, name}) => <li key={id}><a href='javascript:' onClick={() => onSelect(id)}>{name}</a></li>)}
</ul>;

const UserDetail = ({user:{id, name, age}}) =>
    <div>
      <dl>
        <dt>id</dt><dd>{id}</dd>
        <dt>name</dt><dd>{name}</dd>
        <dt>age</dt><dd>{age}</dd>
      </dl>
    </div>;
```


## Usage

### Resolve

#### Properties
name | type | default | description
-----|------|---------|-----------
name | String? | null | property name for resolved value in children, see below.
promise | Promise? | null | promise to resolve, resolved value would set to children according to `name` property, see below.
idle | React Component | null | component rendered when `promise` is null or undefined
pending | React Component | null | component rendered when state of `promise` is `PENDING`
rejected | React Component | null | component rendered when state of `promise` is `REJECTED`
children | React Component | null | component rendered when state of `promise` is `FULFILLED` , with `error` property as reject reason.
...props | any | - | rest properties will be pass to children

Resolved value would pass to children following below rules:

- If `name` is string, the resolved value will be set to `[name]` property in children.
- else if `name` is null and resolved value is plain object, each property in resolved value will be pass to children.

For example, if the resolved value of promise `user$` is `{id:1,name:'Alice'}`.

```js
<Resolve name='user' promise={user$}>
  <UserDetail />
</Resolve>
// results to <UserDetail user={{id:1,name:'Alice'}} />

<Resolve promise={user$}>
  <UserDetail />
</Resolve>
// results to <UserDetail id={1} name='Alice' />
```




### Debounce
  `Debounce` is a react component to [`debounce`](https://lodash.com/docs#debounce) certain properties to children component. So children component will render less  frequently(if you make it pure).
#### demo
  Coming soon...
#### code
  Coming soon...

### Throttle
  `Throttle` is a react component to [`throttle`](https://lodash.com/docs#throttle) certain properties to children component. So children component will render less  frequently(if you make it pure).
#### demo
  Coming soon...
#### code
  Coming soon...

