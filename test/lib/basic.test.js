var basic  = require('../../lib/basic')();
var should = require('should');
var types  = require('../../support/testutils').types;

describe('basic auth parser',function(){

    describe('encode', function () {

        it('should throw Error if credentialObject{ user: is not a string', function() {
            var noTest = ['null','string','undefined'];
            Object.keys(types).forEach(function(key){
                if (-1 === key.indexOf('string') && -1 === noTest.indexOf(key) ) {
                    (function() { basic.encode({user: types[key], password: 'mypassord'}, function (encoded) {});}).should.throw();
                }
            });
        });

        it('should return Error if credentialObject{ password: is not a string', function() {
            var noTest = ['null','string','undefined'];
            Object.keys(types).forEach(function(key){
                if (-1 === key.indexOf('string') && -1 === noTest.indexOf(key) ) {
                    (function() { basic.encode({password: types[key], user: 'myuser'}, function (encoded) {});}).should.throw();
                }
            });
        });

        it('should return Error if credentialObject {user: has a ":"  character}', function() {
            (function() { basic.encode({user:':',password:'mypassword'}, function (encoded) {});}).should.throw();
        });

        it('should return Error if credentialObject has no property content { user:, password: }', function() {
            (function() { basic.encode({user:'',password:''}, function (encoded) {});}).should.throw();
        });

        it('should return Error if credentialObject has no properties {}', function() {
            (function() { basic.encode({}, function (encoded) {});}).should.throw();
        });

        it('should return "basic bXl1c2VyOm15cGFzc3dvcmQ=" if credentialObject is "{ user:myuser, password:mypassword"', function() {
            basic.encode({user:'myuser',password:'mypassword'},function(encoded){
                encoded.should.equal('basic bXl1c2VyOm15cGFzc3dvcmQ=');
            });
        });

        it('SYNCRHONUS (NO CALLBACK) should return "basic bXl1c2VyOm15cGFzc3dvcmQ=" if credentialObject is "{ user:myuser, password:mypassword"', function() {
            var encoded = basic.encode({user:'myuser',password:'mypassword'});
            encoded.should.equal('basic bXl1c2VyOm15cGFzc3dvcmQ=');
        });

        it('should return "basic bXlwYXNzd29yZDo=" if credentialObject is "{ user:, password:mypassword"', function() {
            basic.encode({user:'   ',password:'mypassword'},function(encoded){
                encoded.should.equal('basic bXlwYXNzd29yZDo=');
            });
        });

        it('should return "basic bXl1c2VyOg==" if credentialObject is "{ usermyuser:, password:"', function() {
            basic.encode({user:'myuser',password:'   '},function(encoded){
                encoded.should.equal('basic bXl1c2VyOg==');
            });
        });
    });

    describe('decode', function () {
        it('should return Error if decoding is empty string', function() {
            (function(){basic.decode('',function(decoded){});}).should.throw();
        });

        it('should return Error if decoding is not a string', function() {
            Object.keys(types).forEach(function (key) {
                if (-1 === key.indexOf('string')) {
                    //(function(){basic.decode(types[key]);}).should.throw();
                    (function(){basic.decode(types[key],function(decoded){});}).should.throw();
                }
            });
        });

        it('should return credentialsObject {user:myuser,password:mypassword} if encoded credentials = myuser:mypassword:', function() {

            basic.decode('bXl1c2VyOm15cGFzc3dvcmQ=',function(credentialsObject){
                should(credentialsObject.scheme).equal('basic');
                should(credentialsObject[credentialsObject.scheme].password).equal('mypassword');
                should(credentialsObject[credentialsObject.scheme].user).equal('myuser');
            });
        });

        it('SYNCRHONUS (NO CALLBACK) should return credentialsObject {user:myuser,password:mypassword} if encoded credentials = myuser:mypassword:', function() {

            var credentialsObject = basic.decode('bXl1c2VyOm15cGFzc3dvcmQ=');

            should(credentialsObject.scheme).equal('basic');
            should(credentialsObject[credentialsObject.scheme].password).equal('mypassword');
            should(credentialsObject[credentialsObject.scheme].user).equal('myuser');
        });

        it('should return credentialsObject {user:myuser,password:} if encoded credentials = myuser:', function() {

            basic.decode('bXl1c2VyOg==',function(credentialsObject){
                should(credentialsObject.scheme).equal('basic');
                should(credentialsObject[credentialsObject.scheme].password).equal('');
                should(credentialsObject[credentialsObject.scheme].user).equal('myuser');
            });
        });

        // If only one property is set it will be moved to the user property
        it('should return credentialsObject {user:mypassword,password:} if encoded credentials = :mypassword', function() {

            basic.decode('bXlwYXNzd29yZDo=',function(credentialsObject){
                should(credentialsObject.scheme).equal('basic');
                should(credentialsObject[credentialsObject.scheme].password).equal('');
                should(credentialsObject[credentialsObject.scheme].user).equal('mypassword');
            });
        });
    });
});

