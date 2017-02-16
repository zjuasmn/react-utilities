# Delegate

`Delegate` is a component to delegate its render other component with its own props.

```jsx
<Delegate component={User} user={user} />
// would render
<User user={user} />
```

It can also change props in delegation:
```jsx
<Delegate component={User} activeUser={user} style={{color:red}} _={{user:'activeUser',color:'style.color'}}>
// would render
<User user={user} color='red' />
```

`component` can also define in mapping function _:
```jsx
<Delegate User={user} style={{color:red}} _={{component: ()=> User, user:'activeUser',color:'style.color'}}>
// would render
<User user={user} color='red' />
```

## Props

- **component**
  - type: `srting` | `function` | `component` | `element` 

The component to render. It can be changed in mapping function. It won't pass to children component.

- **\_**
  - type: `object` | `function`
  - default: `(props)=>props`

_ is the mapping function to desice which props in parent pass to children component. It won't pass to children component.

If _ is an `object`, each `key/value` pair would be treated as a mapping from its props to children props.

  > if `value` is `string`, `children.props[key] = props[value]`, if value is dot seperated string like 'a.b', props.a.b would be used.
  >else if `value` is `function`, `children.props[key] = value(props)`
  >else if `value` is `undefine`, `key` prop in `children` would not  set.
  >else `children.props[key]=value`
  
Else if _ is a `function`, then `props` would be pass as parameter and the `object` returned would be used to set children's props.

- **watch**
  - type: `bool` | `string` | `array` | `object` | `function`
  - default: `false`

Deside whether update when props change, 
if watch is `bool`:
> `false`: it will do nothing
> `true`: it will perform `shallowEqual`, like `PureComponent`

If watch is `string`, it will update only when the prop value updated.

If watch is `array`, it will watch each props in `array`, 
updates when at least one of these props updates.

If watch is `object`, it will try to convert it to array first based on the truth value of each props in it. so
`{a:true,b:{},c:false,d:''}` would be same as `[a,b]`

If watch is `function`, it will delegate the `shouldComponentUpdate` function to it. takes the same argument.

```jsx
<Delegate component={User} userId={userId} _={...} />
```

it will only update when `userId` Change.

```jsx
<Delegate component={User} watch/>
```


will make it a pure component.

- **...props**

Rest props would pass to 

