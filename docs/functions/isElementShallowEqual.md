# isElementShallowEqual

`isElementShallowEqual(element1, element2)`

Check if `element1` and `element2` is shallow equal. Two elements are consider shallowly equal if all the props in the `jsx` representations are shallowly equal. Useful when building middleware component.

```jsx
let a = () => alert(1);
let a = <div id='1' onClick={a}></div>
let b = <div id='1' onClick={a}></div>
let c = <div id='1' onClick={()=>alert(1)}></div>

isElementShallowEqual(a,b) // true
isElementShallowEqual(a,c) // false

```

For example, even if we makr a pure component (HOC) `Wrapper` taking `prop1` `prop2` `children` as props, it would still updates when `App` updates although `prop1` and `prop2` are constant values, since App would pass a new `<User />` each time it updates.

```jsx
const App = () => 
  <div>
    <Wrapper prop1='1' prop2='2'>
      <User />
    </Wrapper>
  </div>
```

One of the solution is to set `<User />` to a variable, like `UserElement`, but it adds some overhead and prevents further composition.

```jsx

let UserElement = <User />

const App = () => 
  <div>
    <Wrapper prop1='1' prop2='2'>
      {UserElement}
    </Wrapper>
  </div>

```

