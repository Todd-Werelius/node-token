'use strict';

var _       = require('underscore');
var myUtils = require('./utils');
//
// Server sends sends 404 with req.res        set to WWW-Authenticate set to Basic realm=somevalue
// Client sends req.headers.authorization     set to Basic base64(user:password)
// based on http://tools.ietf.org/html/rfc2617
//
function codec()
{
    return {

        // Take a credentialsObject and base64 encode into a basic auth string
        encode : function( credentialsObject, cb) {

            var encoded;
            var usr;               // Trimmed userid
            var pwd;               // Trimmed password
            var credentialsString; // The formatted credential string

            // Eliminate leading and trailing whitespace
            if (!_.isUndefined(credentialsObject.user)) {
                usr = credentialsObject.user.trim();
            }
            if (!_.isUndefined(credentialsObject.password)) {
                pwd = credentialsObject.password.trim();
            }

            // If we only have one value we always put it in the first segment
            if (!usr) {
                usr = pwd;
                pwd = '';
            }

            // RFC says user = *<TEXT excluding ":">
            if (-1 !== usr.indexOf(':')) {
                //noinspection ExceptionCaughtLocallyJS
                throw new Error('userid cannot contain the : character');
            }

            // Turn into acceptable authorization header credentialString
            credentialsString = usr + ':' + pwd;

            // Either userid or password, or both, must have content
            if (1 == credentialsString.length) {
                //noinspection ExceptionCaughtLocallyJS
                throw new Error('encode was passed {user:,password:} with no properties set');
            }

            encoded = 'basic ' + myUtils.toBase64(credentialsString);

            if (cb){
                return cb(encoded);
            }

            return encoded;

        },

        // Take a base64 encoded credentials string and decode it into an credentialsObject
        decode : function ( encoded, cb ) {

            var decoded;
            var segments;
            var index;

            if (!_.isString(encoded)) {
                //noinspection ExceptionCaughtLocallyJS
                throw new Error('decode expects a string but received a ' + typeof encoded);
            }

            decoded = myUtils.fromBase64(encoded);

            if (-1 === (index = decoded.indexOf(':'))) {
                segments = [decoded.trim(),''];
            } else {
                segments = [decoded.slice(0, index).trim(), decoded.slice(index + 1).trim()];
            }

            if (!segments[0] && !segments[1]) {
                //noinspection ExceptionCaughtLocallyJS
                throw new Error('user and password sgements were were both empty')
            }

            decoded = {
                scheme: 'basic',
                'basic': {
                    user: segments[0].trim(),
                    password: segments[1].trim()
                }
            };

            if (cb) {
                return cb(decoded);
            }

            return decoded;
        }
    };
}

module.exports = codec;

