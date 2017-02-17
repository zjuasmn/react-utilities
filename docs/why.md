e# Why anthor React library

Yes, React is great and we all love it! `React` is design as a synchronous function `f` where `UI = f(state)` and all changes in state will sycn to `UI` with `render` function apply from top to bottom. In the realm of  `React`, nearly every thing is synchronous.

## Resolve
  But a lot of things in `javascript` are async, like `callback`, `promise` in data fetching. A bunch of repeat work needs to do in the `render` method like handling pending state or error state of promise. So there comes a lot of project to make things easier, like [React Resolve](http://ericclemmons.com/react-resolver/), [AsyncProps](https://github.com/ryanflorence/async-props) ...

But the common pattern of these library is to let you add data definitions to your component using `decorator` or other things. 

React Resolver example from its README:
```jsx
import { resolve } from "react-resolver";

@resolve("user", function(props) {
  return http.get(`/api/users/${props.params.userId}`);
})
class UserProfile extends React.Component {
  render() {
    const { user } = this.props;
    ...
  }
}
```

What if we want to reuse the pure component `UserProfile` to render `user` from other source like `/api/me` or from the memory cache? Should we change the decorator again or create multiple decorated class? Why can't we just defined the data dependency just before usage:


```jsx
import Resolve from 'react-utilities'
// getMe() returns a promise
// getFriends() returns an array of promises
let friendPage = ()=><div>
  // render me.
  <Resolve name='user' promise={getMe()}>
    <UserProfile />
  </Resolve>
  // render my friends
  { 
    getFriends().map(friend$=>
      <Resolve name='user' promise={friend$}>
        <UserProfile />
      </Resolve>)
  }
</div>
```
So we can focus to building pure component Like `UserProfile` without worring where to get the data.

Full document of Resolve is [HERE](Resolve.md).

## Delegate

Times to time you will find yourself writing a bunch of wrapper component just to rearrange some props from parent to children. For example, when you use a `router` libaray, it might add a `match` object to your object indicating how the route path matches URL. The `match` object may looks like this.

```jsx
{
 params:{
   userId:'123'
 },
 url:"/user/123"
}
```

But your `UserPage` component is defined to take `userId` as a property. So you whether goto `UserPage.js` add a line like:

`let userId = this.props.match.params.userId`

or create a new component 

```jsx
let UserPageWrapper = 
  ({match:{params:{userId}}}) =>
    <UserPage userId={userId} />
```


By using `Delegate` you can call it like this:

```jsx
<Route path='/user/:userId'>
  <Delegate _={{userId:'match.params.userId'}}>
    <UserPage />    
  </Delegate>
</Route>
```

Let `Delegate` to do these work for you.

Full document of Delegate is [HERE](Delegate.md).

## Debounce and Throttle

Chaning the `DOM` is slow, so we may not update it too often. In the `javascript` world, you can prevent calling a method too often by using `_.debounce` or `_.throttle` from [`lodash`](https://lodash.com/docs/#debounce). For example, when handling form validation, you might use `_.debounce` to `onChange` method in `input` element. But if you want to prevent rendering too often, you cannot call `_.debounce` to `render` since `render` is sync.

For example, the `UserSearch` component take `username` as input to list users that match search keyword. when user change the keyword, search result would display after 2000ms.

```jsx
<div>
  <input value={keyword} onChange={changeKeyWord} />
  <p>search result of {keyword}:</p>
  <Debounce timeout={2000} username={keyword}>
    <UserSearch />
  </Debounce>
</div>
```
Full document of `Debounce` is [HERE](Debounce.md).
Full document of `Throttle` is [HERE](Throttle.md).

# Diff
When dealling with library with imperative api. Lots of time wrapping it is to handle properties diff to avoid repeatly setting options.

```jsx
class Map extends React.Component{
  mount = (div)=>{
    this.map = AMap(div,{
      city:this.prop.city
    })
  }
  render(){
    if (this.map){
      this.setCity(this.props.city)
    
    return <div ref={div=>this.mount} />
  }
}

class Page extends React.component {
  state={'city':'hangzhou'}
  onChange = (e)=>{
    this.setState({city:e.target.value})
  }
  render(){
    return (
      <div>
        <input value={this.state.city} onChange={this.onChange} />
        <Diff city={city}>
          <Map />
        </Diff>
      </div>);
  }
}
```
Full document of `Diff` is [HERE](Diff.md).
