import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import expect from 'expect';
import Accordion from './accordion';

describe('Accordion', function() {
    it('renders without problems', function() {
        const root = ReactTestUtils.renderIntoDocument(<div><Accordion /></div>);
        expect(root).toExist();
    });
});
