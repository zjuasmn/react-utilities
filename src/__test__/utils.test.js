import React from 'react';
import {render as myRender, isElementSwallowEqual, isSwallowEqual,isPropsSwallowEqual,isChildrenSwallowEqual} from '../utils'
import {mount} from 'enzyme';
import {expect} from 'chai';

let renderHTML = function () {
  return mount(myRender.apply(null, arguments)).html();
};
let Comp = ({children, ...props}) => <div {...props}>{children}</div>;
describe('render', () => {
  it('works', () => {
    expect(myRender()).to.be.eql(null);
    expect(renderHTML('div')).to.be.eql('<div></div>');
    expect(renderHTML('div', '2')).to.be.eql('<div>2</div>');
    expect(renderHTML('div', {className: 'a'})).to.be.eql('<div class="a"></div>');
    expect(renderHTML('div', {className: 'a', children: <p>3</p>})).to.be.eql('<div class="a"><p>3</p></div>');
    
    expect(renderHTML(Comp, {className: 'a', children: <p>3</p>})).to.be.eql('<div class="a"><p>3</p></div>');
    
    expect(renderHTML(<Comp/>, {className: 'a', children: <p>3</p>})).to.be.eql('<div class="a"></div>');
    expect(renderHTML(<Comp/>,)).to.be.eql('<div></div>');
    expect(renderHTML(<Comp className='b'/>, {className: 'a', children: <p>3</p>})).to.be.eql('<div class="a"></div>');
    
    expect(renderHTML(null, {className: 'a', children: <p>3</p>})).to.be.eql('<p class="a">3</p>');
    // Children props overwrites parents.
    expect(renderHTML(null, {className: 'a', children: <p className="b">3</p>})).to.be.eql('<p class="a">3</p>');
  });
});

describe('isSwallowEqual', () => {
  it('should works', () => {
    expect(isSwallowEqual(null, undefined)).to.be.eql(true);
    expect(isSwallowEqual({}, undefined)).to.be.eql(false);
    expect(isSwallowEqual(null, {})).to.be.eql(false);
    let a = {};
    expect(isSwallowEqual(a, a)).to.be.eql(true);
    
  })
});
describe('isElementSwallowEqual', () => {
  it('should works', () => {
    expect(isElementSwallowEqual(null, null)).to.be.eql(true);
    expect(isElementSwallowEqual(null, <div>1</div>)).to.be.eql(false);
    expect(isElementSwallowEqual(<div>1</div>, null)).to.be.eql(false);
    expect(isElementSwallowEqual(<div/>, <div/>)).to.be.eql(true);
    expect(isElementSwallowEqual(<div>1</div>, <div>1</div>)).to.be.eql(true);
    expect(isElementSwallowEqual(<div onClick={() => null}>1</div>, <div onClick={() => null}>
      1</div>)).to.be.eql(false);
    let clickHandler = () => null;
    expect(isElementSwallowEqual(<div onClick={clickHandler}>1</div>, <div onClick={clickHandler}>
      1</div>)).to.be.eql(true);
    
  });
  it('should works on nested case', () => {
    let a = <div><p>1</p><p>2</p><p>3</p></div>;
    let b = <div><p>1</p><p>2</p><p>3</p></div>;
    let c = <div><p>1</p><p>2</p></div>;
    let d = <div></div>;
    let e = <div><p>1</p><p>2</p><p>4</p></div>;
    expect(isElementSwallowEqual(a, b)).to.be.eql(true);
    expect(isElementSwallowEqual(a, c)).to.be.eql(false);
    expect(isElementSwallowEqual(a, d)).to.be.eql(false);
    expect(isElementSwallowEqual(a, e)).to.be.eql(false);
    
    expect(isElementSwallowEqual(<div id="1">{null}</div>, <div id="1"></div>)).to.be.eql(true);
    expect(isElementSwallowEqual(<div id="1">{d}</div>, <div id="1">{d}</div>)).to.be.eql(true);
    expect(isElementSwallowEqual(<div id="1"/>, <div/>)).to.be.eql(false);
  })
  
});

describe('isPropsSwallowEqual',()=>{
  it('should work',()=>{
    expect(isPropsSwallowEqual(null,null)).to.be.eql(true);
    expect(isPropsSwallowEqual(null,{})).to.be.eql(false);
    expect(isPropsSwallowEqual({},null)).to.be.eql(false);
  })
});
