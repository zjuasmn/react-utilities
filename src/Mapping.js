// import React, {Component} from "react";
// import {observer} from "mobx-react";
// import isPlainObject from "is-plain-object";
// import {render, RenderablePropType} from "./utils";
// const debug = require('debug')('react-mobx-utils:Mapping');
// const PropTypes = React.PropTypes;
//
// @observer
// export default class Mapping extends Component {
//   static propTypes = {
//     mapping: PropTypes.func,
//     component: RenderablePropType,
//   };
//
//   render() {
//     const {mapping} = this.props;
//
//     let props = {};
//     if (isPlainObject(mapping)) {
//       for (let key of Object.keys(this.props)) {
//         if (key in mapping) {
//           let mappingKey = mapping[key];
//
//           if (typeof mappingKey == 'string') {
//             props[key] = this.props[mappingKey];
//           } else if (typeof mappingKey == 'function'){
//             props[key] = mappingKey(this.props);
//           } else if (mappingKey != undefined){
//             props[key] = mappingKey;
//           }
//         } else {
//           props[key] = this.props[key];
//         }
//       }
//     }
//     console.log(props);
//     const {component, ...oProps} = props;
//     return render(component, oProps);
//   }
// }