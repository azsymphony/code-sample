import React from 'react';
import expect from 'expect';
import { formatCoordinates } from './info-helper';

describe('infoHelper', function() {
    it('creates coordinates string north-east', function() {
        const testValue = formatCoordinates(10.324, 22.356);
        expect(testValue).toEqual('22.36 N / 10.32 E');
    });
    it('creates coordinates string south-west', function() {
        const testValue = formatCoordinates(-10.324, -22.356);
        expect(testValue).toEqual('22.36 S / 10.32 W');
    });
});
