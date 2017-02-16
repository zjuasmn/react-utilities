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
  it('watch should works',()=>{
    let wrapper = mount(<Delegate component='div' watch="component" />);
    expect(wrapper.html()).to.be.eql('<div></div>');
    wrapper.setProps({children:1});
    expect(wrapper.html()).to.be.eql('<div></div>');
    wrapper.setProps({component:'p'});
    expect(wrapper.html()).to.be.eql('<p>1</p>');
    
    // watch as bool
    wrapper.setProps({watch:false,id:1});
    expect(wrapper.html()).to.be.eql('<p id="1">1</p>');
    wrapper.setProps({watch:true,id:1});
    expect(wrapper.html()).to.be.eql('<p id="1">1</p>');
    
    // watch as array
    wrapper.setProps({watch:['component'],id:2});
    expect(wrapper.html()).to.be.eql('<p id="1">1</p>');
    wrapper.setProps({component:'b'});
    expect(wrapper.html()).to.be.eql('<b id="2">1</b>');
    
    // watch as object
    wrapper.setProps({watch:{id:true,component:true},id:2});
    expect(wrapper.html()).to.be.eql('<b id="2">1</b>');
    wrapper.setProps({id:1});
    expect(wrapper.html()).to.be.eql('<b id="1">1</b>');
    
    // watch is function
    wrapper.setProps({watch:(_,{id})=>id==4,id:3});
    expect(wrapper.html()).to.be.eql('<b id="1">1</b>');
    wrapper.setProps({id:4});
    expect(wrapper.html()).to.be.eql('<b id="4">1</b>');
    
    // watch is other
    let x = console.error;
    console.error = ()=>null;
    expect(()=> wrapper.setProps({watch:11})).to.throw();
    console.error = x;
  })
});

