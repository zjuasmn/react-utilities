import React, {Component} from "react";
import {render} from './utils'
const debug = require('debug')('react-utilities:Throttle');
import PropTypes from 'prop-types'

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
    let {timeout, leading, children, component, ...props} = this.props;
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
    let {timeout, leading, component, ...props} = this.props;
    if (timeout === Infinity) {
      timeout = Number.MAX_VALUE;
    }
    this.deferUpdate(this.lastRenderTime + timeout - new Date().getTime());
    
    return render(component, this.renderProps);
  }
}