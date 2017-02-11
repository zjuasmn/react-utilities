import React, {Component, PropTypes} from 'react'
import {observable} from 'mobx'
import Debounce from '../../src/Debounce'

const View = ({value, style}) => <div style={style}>
  {value}
</div>;

export default class DebounceDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      background:'red'
    };
  }
  
  onChange = (e) => {
    this.setState({value: e.target.value});
  };
  onSelect = (e) => {
    this.setState({background: e.target.value});
  };
  
  render() {
    
    let {value,background} = this.state;
    return (
      <div>
        <input value={value} onChange={this.onChange} />
        <select value={background} onChange={this.onSelect}>
          <option value='red'>red</option>
          <option value='blue'>blue</option>
          <option value='green'>green</option>
        </select>
        
        <Debounce timeout={2000}  value={value}>
          <View style={{background,height:200}}/>
        </Debounce>
      </div>);
  }
}