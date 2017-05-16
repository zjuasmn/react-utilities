import React from 'react';
import Resolve from '../Resolve'
import {mount} from 'enzyme';
import {expect} from 'chai';

async function nextTick() {
  return new Promise(setTimeout);
}
let User = ({id, name}) => <p>{`id:${id} name:${name}`}</p>;
describe('Resolve', () => {
  let resolve, reject, promise;
  
  beforeEach(() => {
    promise = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
  });
  
  it('works', () => {
    const wrapper = mount(<Resolve />);
    expect(wrapper.html()).to.be.eql(null);
  });
  
  it('should work in simple case', async () => {
    const wrapper = mount(<Resolve name="id" promise={promise} fulfilled="div" idle="p" pending='h1'/>);
    expect(wrapper.html()).to.be.eql(`<p></p>`);
    await nextTick();
    expect(wrapper.html()).to.be.eql(`<h1></h1>`);
    resolve(3);
    await nextTick();
    expect(wrapper.html()).to.be.eql(`<div id="3"></div>`);
  });
  
  it('should work in idle case', async () => {
    const wrapper = mount(<Resolve name="id" promise={promise} fulfilled="div" idle="p" pending='h1'/>);
    expect(wrapper.html()).to.be.eql(`<p></p>`);
    wrapper.setProps({promise: null});
    resolve();
    await nextTick();
    expect(wrapper.html()).to.be.eql(`<p></p>`);
  });
  
  it('should work in pending case', async () => {
    const wrapper = mount(<Resolve name="id" promise={promise}>
      <div/>
    </Resolve>);
    expect(wrapper.html()).to.be.eql(null);
    resolve();
    await nextTick();
    expect(wrapper.html()).to.be.eql(`<div></div>`);
  });
  
  it('should work when rejected', async () => {
    let Error = ({error}) => <p>{error}</p>;
    const wrapper = mount(<Resolve promise={promise} rejected={Error}/>);
    reject('error info');
    await nextTick();
    expect(wrapper.html()).to.be.eql(`<p>error info</p>`);
  });
  
  it('should map resolved values when name is not set', async () => {
    let User = ({id, name}) => <p>{`id:${id} name:${name}`}</p>;
    const wrapper = mount(<Resolve promise={promise}><User/></Resolve>);
    resolve({id: 1, name: 'alice'});
    await nextTick();
    expect(wrapper.html()).to.be.eql(`<p>id:1 name:alice</p>`);
  });
  
  it('change promise should work', async () => {
    let localResolve;
    let localPromise = new Promise((_resolve) => {
      localResolve = _resolve;
    });
    const wrapper = mount(<Resolve promise={promise}><User/></Resolve>);
    resolve({id: 1, name: 'alice'});
    wrapper.setProps({promise: localPromise});
    localResolve({id: 2, name: 'Bob'});
    await nextTick();
    expect(wrapper.html()).to.be.eql(`<p>id:2 name:Bob</p>`);
    wrapper.unmount();
  });
  it('promise resolve empty value should work', async () => {
    const wrapper = mount(<Resolve promise={promise}>
      <div/>
    </Resolve>);
    resolve();
    await nextTick();
    expect(wrapper.html()).to.be.eql(`<div></div>`);
  });
  it('resolved value over writes same name property', async () => {
    const wrapper = mount(<Resolve name='id' promise={promise}>
      <div id="1"/>
    </Resolve>);
    resolve(2);
    await nextTick();
    expect(wrapper.html()).to.be.eql(`<div id="2"></div>`);
  });
});

