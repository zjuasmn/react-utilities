import React, {Component} from "react";
import isPlainObject from "is-plain-object";
import invariant from 'invariant'
import {render, isPropsSwallowEqual} from "./utils";
const debug = require('debug')('react-utilities:Delegate');
import PropTypes from 'prop-types'

const IdentityFn = (props) => props;

export default class Delegate extends Component {
  static propTypes = {
    _: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    // component: RenderablePropType,
  };
  static defaultProps = {
    _: IdentityFn,
    watch: false,
  };
  
  shouldComponentUpdate(nextProps) {
    let {watch} = nextProps;
    if (!watch) {
      return true;
    }
    switch (typeof watch) {
      case 'string':
        return this.props[watch] !== nextProps[watch];
      case 'boolean': // `watch` should be `true` now.
        return !isPropsSwallowEqual(this.props, nextProps);
      case 'function':
        return watch(this.props, nextProps);
      default:
        if (watch instanceof Array) {
          for (let key of watch) {
            if (this.props[key] !== nextProps[key]) {
              return true;
            }
          }
          return false;
        } else if (isPlainObject(watch)) {
          for (let key in watch) {
            if (watch[key] && this.props[key] !== nextProps[key]) {
              return true;
            }
          }
          return false;
        } else {
          invariant(false, 'Delegate: Unknow watch type.');
        }
    }
  }
  
  render() {
    let {_} = this.props;
    
    let props = {};
    if (typeof _ === 'function') {
      props = _(this.props) || {};
    } else if (isPlainObject(_)) {
      for (let key in _) {
        let value = _[key];
        if (typeof value === 'string') {
          let tokens = value.split('.');
          let v = this.props;
          for (let token of tokens) {
            if (v != undefined) {
              v = v[token];
            }
          }
          props[key] = v;
        } else if (typeof value === 'function') {
          props[key] = value(this.props);
        } else {
          props[key] = value;
        }
      }
    } else {
      invariant(false, 'Delegate: _ should be function or plain object');
    }
    if (props !== this.props) {
      // Add rest props;
      for (let key in this.props) {
        if (!(key in props)) {
          props[key] = this.props[key]
        }
      }
      // Remove prop with value `undefined`
      for (let key in props) {
        if (props[key] === undefined) {
          delete props[key];
        }
      }
    }
    let {_:_1, watch:_2, component, ...oProps} = props;
    return render(component, oProps);
  }
}