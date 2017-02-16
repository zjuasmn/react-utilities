# Why anthor `react` library


```jsx
const getUser$ = ({userId})=>({promise:fetchUser(userId),component:Resolve, name:'user'};

<Route path='/user/:userId'>
  <Delegate watch='userId' _={getUser$} >   
    <User />   
  </Delegate />
</Route>
```

`React` is design as a synchronous function `f` where `UI = f(state)`. As a result, when aync changing is outside the `React` Realm, one needs something to notify certatin compnents to react on new state to prevent global update.

The most common case of async state changing is `data fetching` from server, and you might also met `debounce` and `throttle` in form data handling.

Althought there are a list of other project from the community for per-component async data fetching, but their overhead is quite fat or have some opinion on what you library are using. So here we provide unopinionated react component to solve thes problems. (`mobx` and `mobx-react` is used but you are not required to use them in your project)

 

-  |react-mobx-util/Resolve | react-resover |  async-props
---|---|---
overhead| middleware | decorator | middleware + static method |
how | pass promise | config function | defing static method |

For example, we are going to implement a page satisfies following logic:
> User navigate to Route `/user/alice`
> Fetch `user` info from server `/api/user/:name` using `getUser(name)`
> Server returns `user` data as `{id:'123',name:'alice'}`
> Render <User user={user} />

* [react-mobx-util/Resolve](.)

```jsx
import Resolve from 'react-mobx-util/Resolve'
import Route from 'react-mobx-router/Route'

const UserPage = () =>
  <Route path='user/:name' mapping={({name})=>{promise:getUser(name)}}>
    <Resolve name='user'>
       <User />
    <Resolve>     
  </Route>
```

* [react-resolver](https://github.com/ericclemmons/react-resolver) (decorator)


```jsx
import { resolve } from "react-resolver";

@resolve("user", function({name}) {
  return getUser(name)
})
class UserWrapper extends React.Component {
 render(){
   return <User user={user} />
 }
}

const UserPage = () =>
  <Route path='/user/:name' component={UserWrapper} />
```


* [async-props](https://github.com/ryanflorence/async-props) (middleware + static method + callback)

```jsx
import { Router, Route } from 'react-router'
import AsyncProps from 'async-props'
import React from 'react'

class UserPage extends React.Component {

  // 1. define a `loadProps` static method
  static loadProps(params, cb) {
    getUser(params.name).then(user=>cb(null, {user}))
  }

  render() {
    // 2. access data as props :D
    const user = this.props.user
    return <User user={user} />      
  }
}

// 3. Render `Router` with AsyncProps middleware
render((
  <Router render={(props) => <AsyncProps {...props}/>}>
    <Route path="/" component={UserPage}/>
  </Router>
), el)
```

* [react-refetch](https://github.com/heroku/react-refetch)

```jsx
import React, { Component } from 'react'
import { connect, PromiseState } from 'react-refetch'

class Profile extends Component {
  render() {
    const { userFetch } = this.props
    if (userFetch.pending) {
      return <LoadingAnimation/>
    } else if (userFetch.rejected) {
      return <Error error={userFetch.reason}/>
    } else if (userFetch.fulfilled) {
      return <User user={userFetch.value}/>
    }
  }
}

export default connect(props => ({
  userFetch: `/users/${props.userId}`,  
}))(Profile)
```