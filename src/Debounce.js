import React, {Component} from "react";
import PropTypes from 'react/lib/ReactPropTypes'
import {observer} from "mobx-react";
import {observable, action} from 'mobx'
const debug = require('debug')('react-mobx-utils:Debounce');

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  
  if (typeof objA !== 'object' || objA === null ||
    typeof objB !== 'object' || objB === null) {
    return false;
  }
  
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  
  if (keysA.length !== keysB.length) {
    return false;
  }
  
  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }
  
  return true;
}

@observer
export default class Debounce extends Component {
  static propTypes = {
    timeout: PropTypes.number,
  };
  
  static defaultProps = {
    timeout: 0,
  };
  
  timer = null;
  prevProps;
  isShallowEqual;
  
  constructor(props) {
    super(props);
  }
  
  clearTimer = () => {
    clearTimeout(this.timer);
    this.timer = null;
  };
  
  componentWillReceiveProps(nextProps) {
    let {timeout, children, ...props} = this.props;
    let {timeout:_1, children:_2, ..._Props} = nextProps;
    this.isShallowEqual = shallowEqual(props, _Props);
  }
  
  render() {
    let {timeout, children, ...props} = this.props;
    // let isShallowEqual = shallowEqual(props,this.prevProps);
    console.log(this.isShallowEqual);
    if (this.timer == null) {
      this.timer = setTimeout(this.clearTimer, timeout);
      this.prevProps = props;
    } else if (!this.isShallowEqual) {
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.clearTimer();
        this.forceUpdate();
      }, timeout);
    }
    return React.cloneElement(React.Children.only(children), this.prevProps);
    // return <Timeout timeout={timeout}>
    //
    // </Timeout>
  }
}