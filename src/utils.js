import React from 'react'
import PropTypes from 'prop-types'
import isPlainObject from 'is-plain-object'
const debug = require('debug')('react-utilities:utils');

function isEmptyObject(obj) {
  return !Object.keys(obj).length
}

export const RenderablePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]);

export function render(Comp, props) {
  if (!isPlainObject(props)) {
    props = {children: props}
  }
  if (!Comp) {
    let {children, ...oProps} = props;
    if (!children) {
      return null;
    } else {
      return render(React.Children.only(children), oProps);
    }
  } else if (React.isValidElement(Comp)) {
    let {children, ...oProps} = props;
    return (isEmptyObject(oProps))
      ? Comp
      : React.cloneElement(Comp, oProps)
  } else {
    return React.createElement(Comp, props);
  }
}


export function isSwallowEqual(a, b) {
  if (a === b || !a && !b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  
  let numKeysA = 0, numKeysB = 0;
  for (let key in b) {
    numKeysB++;
    if (/*!isPrimitive(b[key]) ||*/ !a.hasOwnProperty(key) || (a[key] !== b[key])) {
      debug('not equal:', key, a, b);
      return false;
    }
  }
  for (let key in a) {
    numKeysA++;
  }
  return numKeysA === numKeysB;
}

export function isPropsSwallowEqual(props1, props2) {
  debug('isPropsSwallowEqual', props1, props2);
  if (props1 === props2 || !props1 && !props2) {
    return true;
  }
  if (!props1 || !props2) {
    return false;
  }
  let {children:children1, ...other1} = props1;
  let {children:children2, ...other2} = props2;
  return isSwallowEqual(other1, other2) && isChildrenSwallowEqual(children1, children2);
}

export function isElementSwallowEqual(element1, element2) {
  debug('isElementSwallowEqual', element1, element2);
  if (element1 === element2 || !element1 && !element2) {
    return true;
  }
  if (!element1 || !element2) {
    return false;
  }
  if (!isPlainObject(element1) || !('$$typeof' in element1)) { // non react component
    return element1 === element2
  }
  let {props:props1, key1, ref1} = element1;
  let {props:props2, key2, ref2} = element2;
  
  return (key1 === key2) && (ref1 === ref2) && isPropsSwallowEqual(props1, props2);
}
export function isChildrenSwallowEqual(children1, children2) {
  debug('isChildrenSwallowEqual', children1, children2);
  if (children1 === children2 || !children1 && !children2) {
    return true;
  }
  if (!children1 || !children2) {
    return false;
  }
  let n = React.Children.count(children1);
  if (n !== React.Children.count(children2)) {
    return false;
  }
  for (let i = 0; i < n; ++i) {
    if (!isElementSwallowEqual(children1[i], children2[i])) {
      return false;
    }
  }
  return true;
}