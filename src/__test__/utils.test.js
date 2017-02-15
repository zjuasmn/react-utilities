import React from 'react';
import {render as myRender} from '../Utils'
import {mount} from 'enzyme';
import {expect} from 'chai';

let renderHTML = function () {
  return mount(myRender.apply(null, arguments)).html();
};
let Comp = ({children, ...props}) => <div {...props}>{children}</div>
describe('render', () => {
  it('works', () => {
    expect(myRender()).to.be.eql(null);
    expect(renderHTML('div')).to.be.eql('<div></div>');
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


