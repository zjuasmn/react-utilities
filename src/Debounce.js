import React, {Component} from "react";
import {isSwallowEqual} from './utils'
import {render} from './utils'
const debug = require('debug')('react-utilities:Debounce');
const PropTypes = React.PropTypes;


export default class Debounce extends Component {
  static propTypes = {
    timeout: PropTypes.number,
    leading: PropTypes.bool,
  };
  
  static defaultProps = {
    timeout: 0,
    leading: true
  };
  
  timer = null;
  prevProps = {};
  renderProps = {};
  lastChangeTime = 0;
  
  componentWillMount() {
    if (this.props.leading) {
      this.setRenderProps();
    }
  }
  
  componentWillUnmount() {
    this.clearTimer();
    this.prevProps = {};
    this.renderProps = {};
    this.lastChangeTime = 0;
  }
  
  setRenderProps = ()=>{
    let {timeout, leading, children, component, ...props} = this.props;
    this.renderProps = props;
  };
  
  clearTimer = () => {
    clearTimeout(this.timer);
    this.timer = null;
  };
  
  deferUpdate = (timeout) => {
    this.clearTimer();
    if (timeout > 0) {
      this.timer = setTimeout(() => {
        this.clearTimer();
        this.forceUpdate();
      }, timeout);
    } else {
      this.setRenderProps();
    }
  };
  
  render() {
    let {timeout, leading, component, ...props} = this.props;
    if (timeout == Infinity) {
      timeout = Number.MAX_VALUE;
    }
    let now = new Date().getTime();
    
    if (!isSwallowEqual(props, this.prevProps)) {
      this.prevProps = props;
      this.lastChangeTime = now;
      this.deferUpdate(timeout);
    } else {
      this.deferUpdate(this.lastChangeTime + timeout - now);
    }
    
    return render(component, this.renderProps);
  }
}