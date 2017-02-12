import React from "react";
import Resolve from "../../src/Resolve";
import {getUserDetail, getUserList} from "./mock";

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