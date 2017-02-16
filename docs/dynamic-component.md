# Dynamic Component

with `Resolve` and `Delegate` you can even load a remote component to your app.


```jsx
let load(moduleX) = new Promise()


<Resolve name='component' promise={loadModule(name)}>
  <Delegate>
    123
  </Delegate>
</Resolve>

```