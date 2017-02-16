import React, {Component} from "react";
import {observer} from "mobx-react";
import isPlainObject from "is-plain-object";
import invariant from 'invariant'
import {render, RenderablePropType} from "./utils";
const debug = require('debug')('react-mobx-utils:Delegate');
const PropTypes = React.PropTypes;


const IdentityFn = (props) => props;
@observer
export default class Delegate extends Component {
  static propTypes = {
    _: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    component: RenderablePropType,
  };
  static defaultProps = {
    _: IdentityFn
  };
  
  render() {
    let {_} = this.props;
    
    let props = {};
    if (typeof _ == 'function') {
      props = _(this.props);
    } else if (isPlainObject(_)) {
      for (let key in _) {
        let value = _[key];
        if (typeof value == 'string') {
          let tokens = value.split('.');
          let v = this.props;
          for (let token of tokens) {
            if (v != undefined) {
              v = v[token];
            }
          }
          props[key] = v;
        } else if (typeof value == 'function') {
          props[key] = value(this.props);
        } else {
          props[key] = value;
        }
      }
    } else {
      invariant(false, 'Delegate: _ should be function or plain object');
    }
    if (props != this.props) {
      // Add rest props;
      for (let key in this.props) {
        if (!(key in props)) {
          props[key] = this.props[key]
        }
      }
      // Remove prop with value `undefined`
      for (let key in props) {
        if (props[key] == undefined) {
          delete props[key];
        }
      }
    }
    let {_:_1, component, ...oProps} = props;
    return render(component, oProps);
  }
}