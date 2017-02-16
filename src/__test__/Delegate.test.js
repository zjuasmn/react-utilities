import React from 'react';
import Delegate from '../Delegate'
import {mount} from 'enzyme';
import {expect} from 'chai';


describe('Delegate', () => {
  it('works', () => {
    expect(mount(<Delegate />).html()).to.be.eql(null);
    expect(mount(<Delegate component='div' />).html()).to.be.eql('<div></div>');
    expect(mount(<Delegate component='div'>1</Delegate>).html()).to.be.eql('<div>1</div>');
    expect(mount(<Delegate _={()=>({component:'div'})}>1</Delegate>).html()).to.be.eql('<div>1</div>');
    expect(mount(<Delegate _={{component:'x'}} x="div">1</Delegate>).html()).to.be.eql('<div x="div">1</div>');
    expect(mount(<Delegate _={{component:'x',x:undefined}} x="div">1</Delegate>).html()).to.be.eql('<div>1</div>');
  
    let obj={
      a: undefined,
      data: 'style.color',
      'data-x': 'style.color.a.b',
      id: (props)=>props.a,
      component: 'a'
    };
    expect(mount(<Delegate _={obj} a={'div'} id={123} style={{color:'white'}}>Hello</Delegate>).html()).to.be.eql('<div data="white" id="div" style="color: white;">Hello</div>');
    
    let func=(props)=>({
      a: undefined,
      data: null,
      id: props.a,
      component: 'a'
    });
    expect(mount(<Delegate _={func} a={'div'} id={123}>Hello</Delegate>).html()).to.be.eql('<a id="div">Hello</a>');
    let x = console.error;
    console.error = ()=>{};
    expect(()=>mount(<Delegate _={123} component="p">1</Delegate>).html()).to.throw(Error);
    console.error = x;
  });
});

