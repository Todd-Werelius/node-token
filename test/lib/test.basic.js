var basic  = require('../../lib/basic');
var should = require('should');

describe('basic',function(){

    // Test basic parsers the format function
    describe('format',function() {
        it('should return Error if credentials are undefined', function (done) {

            basic.format(undefined, function (err, credentials) {
                err.should.be.an.instanceof(Error);
                should(credentials).equal(null);
                done();
            });
        });

        it('should return Error if credentials are not an object', function (done) {
            basic.format([], function (err, credentials) {
                err.should.be.an.instanceof(Error);
                should(credentials).equal(null);
                done();
            });
        });

        it('should return Error if credentials.user is not empty, or a string', function (done) {
            basic.format({user:{},password:'something'}, function (err, credentials) {
                err.should.be.an.instanceof(Error);
                should(credentials).equal(null);
                done();
            });
        });

        it('should return Error if credentials.password is not empty, or a string', function (done) {
            basic.format({user:'something',password:{}}, function (err, credentials) {
                err.should.be.an.instanceof(Error);
                should(credentials).equal(null);
                done();
            });
        });

        it('should return Error if user and password are both empty after being trimmed', function (done) {
            basic.format({user:'  ',password:' '}, function (err, credentials) {
                err.should.be.an.instanceof(Error);
                should(credentials).equal(null);
                done();
            });
        });

        it('should return "me@email.com:password" if user and password are both set after being trimmed', function (done) {
            basic.format({user:'me@email.com',password:'password'}, function (err, credentials) {
                should(err).equal(null);
                should(credentials).equal("me@email.com:password");
                done();
            });
        });
    });

});

