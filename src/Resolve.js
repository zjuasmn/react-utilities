import React, {Component} from "react";
import PropTypes from "react/lib/ReactPropTypes";
import {observer} from "mobx-react";
import {observable, action} from "mobx";
import isPlainObject from "is-plain-object";

const debug = require('debug')('react-mobx-utils:Resolve');

export const IDLE = 'idle';
export const PENDING = "pending";
export const FULFILLED = "fulfilled";
export const REJECTED = "rejected";

const PropTypeFuncOrElememt = React.PropTypes.oneOfType([PropTypes.func, PropTypes.element]);
const buildElement = (Comp, props, children) => !!Comp && (React.isValidElement(Comp) ? React.cloneElement(Comp, props) :
  <Comp {...props}>{children}</Comp>);

@observer
export default class Resolve extends Component {
  static propTypes = {
    name: PropTypes.string,
    promise: PropTypes.object,
    idle: PropTypeFuncOrElememt,
    pending: PropTypeFuncOrElememt,
    rejected: PropTypeFuncOrElememt,
    fulfilled: PropTypeFuncOrElememt,
  };
  
  @observable value = null;
  @observable _state = IDLE;
  isPromiseSwitching;
  promise = null;
  
  constructor(props) {
    super(props);
    this.setPromise(props.promise);
  }
  
  setPromise = action((promise = null) => {
    if (promise != this.promise) {
      debug('setPromise', promise);
      this.promise = promise;
      
      promise && promise.then(
        (data) => this.done(promise, data, FULFILLED),
        (error) => this.done(promise, error, REJECTED)
      );
      
      // Prevent the flash when changing promise.
      this.isPromiseSwitching = true;
      setTimeout(action(() => {
        if (this.isPromiseSwitching) {
          this.isPromiseSwitching = false;
          this._state = this.promise ? PENDING : IDLE;
          this.value = null;
        }
      }));
    }
  });
  
  done = action((promise, value, state) => {
    debug('done', promise, value, state);
    if (promise == this.promise) {
      this.isPromiseSwitching = false;
      this._state = state;
      this.value = value;
    }
  });
  
  componentWillReceiveProps(nextProps) {
    this.setPromise(nextProps.promise);
  }
  
  componentWillUnmount() {
    this.setPromise();
  }
  
  render() {
    const {name, promise, idle, pending, rejected, fulfilled, children, ...props} = this.props;
    switch (this._state) {
      case IDLE:
        return buildElement(idle, props);
      case PENDING:
        return buildElement(pending, props);
      case REJECTED:
        return buildElement(rejected, {error: this.value, ...props});
      case FULFILLED:
        const resolvedProps = name ? {[name]: this.value} : isPlainObject(this.value) ? this.value : {};
        const oProps = {...props, ...resolvedProps};
        if (fulfilled) {
          return buildElement(fulfilled, oProps, children);
        } else if (children) {
          return buildElement(React.Children.only(children), oProps);
        } else {
          return null;
        }
    }
  }
}