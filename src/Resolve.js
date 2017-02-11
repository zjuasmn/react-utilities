import React, {Component} from "react";
import PropTypes from 'react/lib/ReactPropTypes'
import {observer} from "mobx-react";
import {observable, action} from 'mobx'

const debug = require('debug')('react-mobx-utils:Resolve');

export const IDLE = 'idle';
export const PENDING = "pending";
export const FULFILLED = "fulfilled";
export const REJECTED = "rejected";

const nullFn = () => null;
const PropTypeFuncOrElememt = React.PropTypes.oneOfType([PropTypes.func, PropTypes.element]);

@observer
export default class Resolve extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.object,
    idle: PropTypeFuncOrElememt,
    pending: PropTypeFuncOrElememt,
    rejected: PropTypeFuncOrElememt,
    children: PropTypes.element.isRequired,
  };
  
  static defaultProps = {
    idle: nullFn,
    pending: nullFn,
    rejected: nullFn,
  };
  
  @observable value = null;
  @observable _state = IDLE;
  promise = null;
  
  constructor(props) {
    super(props);
    this.setPromise(props.value);
  }
  
  setPromise = action((promise) => {
    debug('setPromise', promise);
    if (promise != this.promise) {
      this.promise = promise;
      this._state = promise ? PENDING : IDLE;
      this.value = null;
      promise && promise.then(
        (data) => this.done(promise, data, FULFILLED),
        (error) => this.done(promise, error, REJECTED)
      )
    }
  });
  
  done = action((promise, value, state) => {
    debug('done', promise, value, state);
    if (promise == this.promise) {
      this.value = value;
      this._state = state;
    }
  });
  
  componentWillReceiveProps(nextProps) {
    this.setPromise(nextProps.value);
  }
  
  render() {
    let {name, idle, pending, rejected, children, ...props} = this.props;
    
    switch (this._state) {
      case IDLE:
        return typeof idle == 'function' ? idle() : React.cloneElement(idle, {...props});
      case PENDING:
        return typeof pending == 'function' ? pending() : React.cloneElement(pending, {...props});
      case REJECTED:
        return typeof rejected == 'function' ? rejected(this.value) : React.cloneElement(rejected, {error: this.value, ...props});
      case FULFILLED:
        return React.cloneElement(React.Children.only(children), {[name]: this.value, ...props});
    }
  }
}