import React, {Component} from "react";
import isPlainObject from "is-plain-object";
import {render, RenderablePropType} from "./utils";
import PropTypes from 'prop-types'
const debug = require('debug')('react-utilities:Resolve');

export const IDLE = 'idle';
export const PENDING = "pending";
export const FULFILLED = "fulfilled";
export const REJECTED = "rejected";

export default class Resolve extends Component {
  static propTypes = {
    name: PropTypes.string,
    promise: PropTypes.object,
    idle: RenderablePropType,
    pending: RenderablePropType,
    rejected: RenderablePropType,
    fulfilled: RenderablePropType,
  };
  state = {
    value: null,
    _state: IDLE
  };
  isPromiseSwitching;
  promise = null;
  isUnmount = false;
  
  setPromise = ((promise = null) => {
    if (promise !== this.promise) {
      debug('setPromise', promise);
      this.promise = promise;
      
      promise && promise.then(
        (data) => this.done(promise, data, FULFILLED),
        (error) => this.done(promise, error, REJECTED)
      );
      // Prevent the flash when changing promise.
      this.isPromiseSwitching = true;
      setTimeout((() => {
        if (this.isPromiseSwitching) {
          this.isPromiseSwitching = false;
          this.isUnmount || this.setState({
            value: null,
            _state: this.promise ? PENDING : IDLE
          })
        }
      }));
    }
  });
  
  done = ((promise, value, state) => {
    debug('done', promise, value, state);
    if (promise === this.promise) {
      this.isPromiseSwitching = false;
      this.setState({
        _state: state,
        value
      })
    }
  });
  
  componentWillReceiveProps(nextProps) {
    this.setPromise(nextProps.promise);
  }
  
  componentWillMount() {
    this.setPromise(this.props.promise);
    this.isUnmount = false;
  }
  
  componentWillUnmount() {
    this.setPromise();
    this.isUnmount = true;
  }
  
  render() {
    const {name, promise, idle, pending, rejected, fulfilled, children, ...props} = this.props;
    let {_state, value} = this.state;
    switch (_state) {
      case IDLE:
        return render(idle, props);
      case PENDING:
        return render(pending, props);
      case REJECTED:
        return render(rejected, {error: value, ...props});
      case FULFILLED:
        const resolvedProps = name ? {[name]: value} : isPlainObject(value) ? value : {};
        return render(fulfilled, {children, ...props, ...resolvedProps});
    }
  }
}