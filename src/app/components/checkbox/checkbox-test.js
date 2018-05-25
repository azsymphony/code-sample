import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import expect from 'expect';
import Checkbox from './checkbox';

describe('Checkbox', function() {
    it('renders without problems', function() {
        const root = ReactTestUtils.renderIntoDocument(<Checkbox />);
        expect(root).toExist();
    });
});
