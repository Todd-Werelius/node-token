'use strict';

var myutils = require('../../lib/utils');
require('should');

describe('utils',function() {
    describe('toBase64', function () {
        it('should throw Error if passed a empty string', function() {
            (function() { myutils.toBase64('');}).should.throw();
        });

        it('should return bW9waG9sbw== passed mopholo', function() {
            var encoded = myutils.toBase64('mopholo');
            encoded.should.equal('bW9waG9sbw==');
        });
    });

    describe('fromBase64', function () {
        it('should throw Error if passed a empty string', function() {
            (function() { myutils.fromBase64('');}).should.throw();
        });

        it('should return mopholo if passed bW9waG9sbw==', function() {
            var encoded = myutils.fromBase64('bW9waG9sbw==');
            encoded.should.equal('mopholo');
        });
    });
});

