import React, {Component, PropTypes} from 'react'
import {observable} from 'mobx'
import Resolve from '../../src/Resolve'

const userList = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'},
  {id: 3, name: 'Charlie'},
];
const userDetails = {
  1: {
    id: 1,
    name: 'Alice',
    age: 12
  },
  2: {
    id: 1,
    name: 'Bob',
    age: 12
  }
};

function getUserList() {
  return new Promise((resolve) => {
    resolve(userList)
  })
}
function getUserDetail(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id in userDetails) {
        resolve(userDetails[id])
      } else {
        reject(new Error(`Cannot get detail for user ${id}`));
      }
    }, 1000);
  })
}

const UserList = ({userList, onSelect}) => <ul>
  {userList.map(({id, name}) => <li key={id}><a href='javascript:' onClick={() => onSelect(id)}>{name}</a></li>)}
</ul>;

const UserDetail = ({user:{id, name, age}}) => <div>
  <dl>
    <dt>id</dt>
    <dd>{id}</dd>
    <dt>name</dt>
    <dd>{name}</dd>
    <dt>age</dt>
    <dd>{age}</dd>
  </dl>
</div>;

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
    return (
      <div>
        <Resolve name='userList' value={userList$}>
          <UserList onSelect={this.selectUser}/>
        </Resolve>
        
        <Resolve name='user' value={userDetail$}
                 idle={<div>Select a user.</div>}
                 pending={<div>Waiting...</div>}
                 rejected={(error) => <div>{error.message}</div>}>
          <UserDetail />
        </Resolve>
      </div>);
  }
}