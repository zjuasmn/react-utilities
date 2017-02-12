import React, {Component} from "react";
import PropTypes from 'react/lib/ReactPropTypes'
import {observer} from "mobx-react";
import {observable, action} from 'mobx'
const debug = require('debug')('react-mobx-utils:Throttle');

@observer
export default class Throttle extends Component {
  static propTypes = {
    timeout: PropTypes.number,
    leading: PropTypes.bool,
  };
  
  static defaultProps = {
    timeout: 0,
    leading: true
  };
  
  timer = null;
  renderProps = {};
  lastRenderTime = 0;
  
  componentWillMount() {
    if (this.props.leading) {
      this.setRenderProps();
    }
  }
  
  componentWillUnmount() {
    this.clearTimer();
  }
  
  setRenderProps = () => {
    let {timeout, leading, children, ...props} = this.props;
    this.lastRenderTime = new Date().getTime();
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
    this.deferUpdate(this.lastRenderTime + timeout - new Date().getTime());
    
    return React.cloneElement(React.Children.only(children), this.renderProps);
  }
}