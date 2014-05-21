'use strict';

var authorization = require('../../lib/authorization');
var should = require('should');
var _      = require('underscore');

var customCodec_mock = {

};

var basicCodec_mock = {
    encode : function(value) {
        return value;
    },
    decode : function(value) {
        return value;
    }
};

describe('authorization middleware',function() {

    describe('constructor',function() {

        it('should return middleware with default parsers set when none provided', function () {

            var middleware = authorization();
            should(_.isEqual(middleware.__private._parsers, middleware.__private.__parsers)).true;

        });

        it('should return middleware with default extended parsers when custom parser', function () {

            var middleware = authorization({myauth: customCodec_mock});
            should(_.isEqual(middleware.__private._parsers, middleware.__private.__parsers)).false;

        });

        it('should return middleware with overridden basic parser when new version provided', function () {

            var middleware = authorization({basic: basicCodec_mock});
            should(_.isEqual(middleware.__private._parsers, middleware.__private.__parsers)).false;

        });
    });

    describe('middleware.use(authorizationMiddleware)',function() {

        describe('not requested or unknown scheme',function(){

            it('should next() if req.header[authorization] is not set, req.authorization should be undefined', function() {

                var middleware = authorization();
                var req_mock   = {
                    headers : {
                        authorization : ""
                    },
                    authorization : {
                        scheme : 'should be removed'
                    }
                };

                middleware(req_mock,function(error){
                    should(error).equal(undefined);
                    should(req_mock.authorization).equal(undefined);
                });
            });

            it('should next() if req.header[authorization] is set unknown scheme, req.authorization should be undefined', function() {

                var middleware = authorization();
                var req_mock   = {
                    headers : {
                        authorization : " scheme credential "
                    },
                    authorization : {
                        scheme : 'should be removed'
                    }
                };

                middleware(req_mock,function(error){
                    should(error).equal(undefined);
                    should(req_mock.authorization).equal(undefined);
                });
            });
        });

        describe('req.headers.authorization basic ... ',function(){

            it('should set valid credentialsObject in req.authorization for a valid header', function () {
                var middleware = authorization();
                var header     = middleware.__private.__parsers['basic'].encode({user:'myuser',password:'mypassword'});
                var req_mock   = {
                    headers : {
                        authorization : header
                    },
                    authorization : {
                        scheme : 'should be changed'
                    }
                };

                middleware(req_mock,function(error){
                    should(error).equal(undefined);
                    should(req_mock.authorization).have.enumerable('scheme','basic');
                    should(req_mock.authorization).have.enumerable('basic');
                    should(req_mock.authorization.basic).have.enumerable('user','myuser');
                    should(req_mock.authorization.basic).have.enumerable('password','mypassword');
                });

            });

            it('should return an error for a empty request "basic   ", req.authorization should be undefined', function() {

                var middleware = authorization();
                var req_mock   = {
                    headers : {
                        authorization : "basic"
                    },
                    authorization : {
                        scheme : 'should be removed'
                    }
                };

                // Missing credential
                middleware(req_mock,function(error){
                    should(error).instanceof(Error);
                    should(req_mock.authorization).equal(undefined);
                });


            });
        });

        describe('req.headers.authorization bASiC (not lower case) ',function(){
            it('should find parse and return valid credentialsObject if scheme not all lower case', function () {
                var middleware = authorization();
                var header     = 'bASiC bXl1c2VyOm15cGFzc3dvcmQ=';
                var req_mock   = {
                    headers : {
                        authorization : header
                    },
                    authorization : {
                        scheme : 'should be changed'
                    }
                };

                middleware(req_mock,function(error){
                    should(error).equal(undefined);
                    should(req_mock.authorization).have.enumerable('scheme','basic');
                    should(req_mock.authorization).have.enumerable('basic');
                    should(req_mock.authorization.basic).have.enumerable('user','myuser');
                    should(req_mock.authorization.basic).have.enumerable('password','mypassword');
                });

            });
        });
    });

});



