import React from 'react'
import ReactDOM from 'react-dom'
import Resolve from '../../src/Resolve'
import Delegate from '../../src/Delegate'

const DatePresenter = ({moment}) => <p>{moment().format('LLLL')}</p>;

const LazyComponent = ({component})=><Resolve name="component" promise={component}>
  <Delegate _={{component: 'component.default'}}/>
</Resolve>;

ReactDOM.render(
  <div>
    <Resolve name="moment" promise={import('moment')}>
      <DatePresenter />
    </Resolve>
    <Resolve name="component" promise={import('./Comp')}>
      <Delegate _={{component: 'component.default'}}/>
    </Resolve>
    <LazyComponent component={import('./Comp')} />
  </div>
  , document.getElementById('root'));