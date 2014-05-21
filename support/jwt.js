'use strict';
var _     = require('underscore');
var util  = require('util');
var jws   = require('jws');

// REF http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-20
//
// base64Header.base64Payload.[base64Signature]
//
//

var _jwt_header = {
    typ : "JWT", // can be none
    alg : "HS256"
};

var _jwt_basic_claimset = {
    exp  : 0,    // Not valid after this time/date
    iat  : 0     // Time/Date generated
};

var _jwt_extended_claimset = {

    nbf  : 0,    // Not valid before this time/date
    iss  : "",   // String or URI who issued this claim
    aud  : "",   // String or URI of intended audience
    sub  : "",   // String representing the subject
    jti  : ""    // Identifier that uniquely identifies this claim
};

var _jwt_reserved_claimset = _.extend(_jwt_basic_claimset,_jwt_extended_claimset);
var timeUnits              = {'year':365*24*3600,'month':30*24*3600,'day':24*3600,'hour':3600,'minute':60,'seconds':1};

function iat() {
    return Math.round(Date.now() / 1000);
}

function isExpired( jwt ) {

    var result = true;

    // Drop dead date has been reached
    if ( jwt.exp < Math.round(Date.now() / 1000)) {
        result = false;
    }
    return result;
}

function canReissue(jwt) {
    var result = false;

    if ( jwt.ris ) {
        result = true;
    }
    return result;
}

function isValid( jwt ) {
    var result = false;

    if (!isExpired(jwt)) {
        if (hasReissue(jwt)){

        }
    }

    return result;

}

function shouldReissue( jwt ) {

    var result = true;

    if ( !jwt.ris ) {
        result = false;
    }
    if ( jwt.ris > Math.round(Date.now() / 1000)) {
        result = false;
    }
    return result;
}

function isReissueExpired(jwt) {

}



function removeReservedClaimValues( jsonPayload ) {

    Object.keys(_jwt_reserved_claimset).forEach(function(property){
        if (jsonPayload.hasOwnProperty(property)) {
            jsonPayload[property].delete;
        }
    });
}

function jwt() {

    return {

        create : function(jsonPayload,secondsToLive,cb,options) {

            var settings = {
                header : {
                    typ:'JWT',
                    alg:'HS256'
                }
            };

            var jwt   = null;
            var error = null;

            options = options || {};

            try {
                if (options.algorithm) {
                    if (-1 === jws.ALGORITHMS.indexOf(options.algorithm)) {
                        //noinspection ExceptionCaughtLocallyJS
                        throw new Error(util.format('node-jws does not support the %s hashing algorithm', options.algorithm));
                    }
                    settings.header.alg = options.algorithm;
                }

                jwt = {
                    iat:iat(),
                    exp:iat + secondsToLive
                }

            } catch (err) {
                error = err;
                jwt   = null;
            }

            if (cb) {
                cb(error,jwt);
            } else
                return error || jwt;
         },

        setPublic : function(property,string) {

        },

        // Returns URL Safe String -- 'b64Header.b64Payload.[b64Signature]'
        encode : function(header,jsonPayload,cb) {

        },
        // Returns jsonPayload
        decode : function(jwtToken) {

        },

        verify : function() {

        },

        toSeconds : function(timeUnit,count) {
            return timeUnits[timeUnit] * count;
        },

        transform : function(rawCredentials,req,callback) {

        }
    };
}

module.exports = jwt;
