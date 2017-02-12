import React, {Component, PropTypes} from 'react'
import {observable} from 'mobx'
import Debounce from '../../src/Debounce'
import Throttle from '../../src/Throttle'

import {observer} from 'mobx-react'

const View = observer(function View({value, color, realValue}) {
  console.log('render');
  return <div style={{color, background: `${realValue == value ? 'blue' : 'red'}`}}>
    {value}
  </div>
});

export default class DebounceDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
      color: 'red'
    };
  }

  onChange = (e) => {
    this.setState({value: e.target.value});
  };
  onSelect = (e) => {
    this.setState({color: e.target.value});
  };
  
  render() {
    
    let {value, color} = this.state;
    return (
      <div>
        <input value={value} onChange={this.onChange}/>
        <select value={color} onChange={this.onSelect}>
          <option value='red'>red</option>
          <option value='blue'>blue</option>
          <option value='green'>green</option>
        </select>
        
        <Debounce timeout={2000} value={value}>
          <View color={color} realValue={value}/>
        </Debounce>
        <Throttle timeout={2000} value={value}>
          <View color={color} realValue={value}/>
        </Throttle>
      </div>);
  }
}