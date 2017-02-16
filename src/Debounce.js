import React, {Component} from "react";
import {observer} from "mobx-react";
import {observable, action} from 'mobx'
import isEqualShallow from 'is-equal-shallow'
const debug = require('debug')('react-utilities:Debounce');
const PropTypes = React.PropTypes;

@observer
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
  }
  
  setRenderProps = ()=>{
    let {timeout, leading, children, ...props} = this.props;
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
    let {timeout, leading, children, ...props} = this.props;
    if (timeout == Infinity) {
      timeout = Number.MAX_VALUE;
    }
    let now = new Date().getTime();
    
    if (!isEqualShallow(props, this.prevProps)) {
      this.prevProps = props;
      this.lastChangeTime = now;
      this.deferUpdate(timeout);
    } else {
      this.deferUpdate(this.lastChangeTime + timeout - now);
    }
    
    return React.cloneElement(React.Children.only(children), this.renderProps);
  }
}