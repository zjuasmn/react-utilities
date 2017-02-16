
```jsx

let App = ()=>
  <Route path='/user/:userId'>
    <Delegate _={({userId})=>{promise:getUser(userId)} watch='userId'>
      <Resolve name='user'>
        <UserProfile />
      </Resolve>
    </Delegate>
  </Route>
```
