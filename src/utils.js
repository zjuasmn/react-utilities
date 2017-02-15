import React from 'react'
const PropTypes = React.PropTypes;

function isEmptyObject(obj) {
  return !Object.keys(obj).length
}

export const RenderablePropType = React.PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]);

export function render(Comp, props) {
  if (!Comp) {
    let {children, ...oProps} = props || {};
    if (!children) {
      return null;
    }
    return render(React.Children.only(children), oProps);
  } else if (React.isValidElement(Comp)) {
    let {children, ...oProps} = props || {};
    return (isEmptyObject(oProps))
      ? Comp
      : React.cloneElement(Comp, oProps)
  } else {
    return React.createElement(Comp, props);
  }
}