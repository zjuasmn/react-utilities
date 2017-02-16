import React from 'react';
import Throttle from '../Throttle'
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon'

describe('Throttle', () => {
  let clock;
  beforeEach(()=>{
    clock = sinon.useFakeTimers();
  });
  afterEach(()=>{
    clock.restore();
  });
  it('works', () => {
    expect(mount(<Throttle />).html()).to.be.eql(null);
    const wrapper = mount(<Throttle component="div"/>);
    expect(wrapper.html()).to.be.eql(`<div></div>`);
    wrapper.setProps({id:1});
    expect(wrapper.html()).to.be.eql(`<div id="1"></div>`);
    wrapper.setProps({timeout:200});
    wrapper.setProps({id:2});
    expect(wrapper.html()).to.be.eql(`<div id="1"></div>`);
    
    clock.tick(199);
    expect(wrapper.html()).to.be.eql(`<div id="1"></div>`);
    clock.tick(1);
    expect(wrapper.html()).to.be.eql(`<div id="2"></div>`);
    
    wrapper.setProps({id:3});
    expect(wrapper.html()).to.be.eql(`<div id="2"></div>`);
    clock.tick(199);
    wrapper.setProps({id:4});
    expect(wrapper.html()).to.be.eql(`<div id="2"></div>`);
    clock.tick(199);
    wrapper.setProps({id:5});
    expect(wrapper.html()).to.be.eql(`<div id="4"></div>`);
    clock.tick(200);
    expect(wrapper.html()).to.be.eql(`<div id="5"></div>`);
    
    wrapper.setProps({timeout:Infinity,id:6});
    clock.tick(99999999);
    expect(wrapper.html()).to.be.eql(`<div id="5"></div>`);
    
    wrapper.unmount();
  });
  it('leading should works', () => {
    
    const wrapper = mount(<Throttle component="div" id="1" timeout={1} leading={false}/>);
    expect(wrapper.html()).to.be.eql(`<div></div>`);
    
    clock.tick(1);
    expect(wrapper.html()).to.be.eql(`<div id="1"></div>`);
    
    wrapper.unmount();
  });
});

