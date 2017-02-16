# Resolve

`Resolve` is a react component which resolve `promise` and pass the resolved value to children component when promise return. With `Resolve` you can wrap your pure, stateless component to connect them to remote data.


## Demo
 ![https://github.com/zjuasmn/react-mobx-utils/blob/master/resolve-demo.gif?raw=true](https://github.com/zjuasmn/react-mobx-utils/blob/master/resolve-demo.gif?raw=true)


```js
import React from "react";
import Resolve from "react-mobx-utils/Resolve";
import {getUserDetail, getUserList} from "./mock";

const UserList = ({userList, onSelect}) => <ul>
userList.map(({id, name}) => <li key={id}><a href='javascript:' onClick={() => onSelect(id)}>{name}</a></li>)}
</ul>;

const UserDetail = ({user:{id, name, age}}) =>
<div>
<dl>
<dt>id</dt><dd>{id}</dd>
<dt>name</dt><dd>{name}</dd>
<dt>age</dt><dd>{age}</dd>
</dl>
</div>;

export default class ResolveDemo extends React.Component {
constructor(props) {
super(props);
this.state = {
userList$: getUserList(),
};
}

promiseBuffer = {};
selectUser = (id) => {
if (!(id in this.promiseBuffer)) {
this.promiseBuffer[id] = getUserDetail(id);
}
this.setState({userDetail$: this.promiseBuffer[id]});
};

render() {
let {userList$, userDetail$} = this.state;
return <div>
<Resolve name='userList' promise={userList$} pending={<div>Fetching user list...</div>}>
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
```


## Props

- **name**
  - type: `string`
  - default: null

property name for resolved value pass to children component.

- **promise**
  - type: `promise`
  - default: null
  
promise to resolved.

- **idle**
  - type: `component` | `node`
  - default: null
  
component rendered when `promise` is null or undefined

- **pending**
  - type: `component` | `node`
  - default: null

component rendered when state of `promise` is `PENDING`

- **rejected**
  - type: `component` | `node`
  - default: null

component rendered when state of `promise` is `REJECTED`, with `error` property as reject reason.

- **fulfilled**
  - type: `component` | `node`
  - default: null

component rendered when state of `promise` is `FULFILLED`

- **children**
  - type: `node` (if `fulfilled` is not set)| `any` (else)
  
component rendered when state of `promise` is `RESOLVED`, if both `fulfilled` and `children` are not null and `fulfilled` is a `component`, `children` would pass to it.

- **...props**  
  - type: `any`


If `name` is `string`, the resolved value will be set to `[name]` property in children.
 
Otherwise if `name` is `null` and resolved value is plain object, each property in resolved value will be pass to children.

For example, if the resolved value of promise `user$` is `{id:1,name:'Alice'}`.

```jsx
<Resolve name='user' promise={user$}>
  <UserDetail />
</Resolve>
// results to <UserDetail user={{id:1,name:'Alice'}} />

<Resolve promise={user$}>
<  UserDetail />
</Resolve>
// results to <UserDetail id={1} name='Alice' />
```
