'use strict';

var _ = require('underscore');

function basic()
{
    function formatEntry(entry,name) {

        // Undefined becomes string
        if (_.isUndefined(entry) || _.isNull(entry)) {
            entry = '';
        }

        // Strings need to trimmed
        if (_.isString(entry)) {
            entry = entry.trim();

        } //  Passed something other than a string!
        else {
            return new Error('Basic ' + name + ' must be a string but is a '+ typeof entry);
        }

        return entry;
    }

    return {

        // Get the credentials into a string representation for insertion into a req.authorization header
        format : function ( credentials, cb ) {

            var error = null;

            // If it's not an object we can't do anything
            if ( !_.isObject(credentials) || _.isArray(credentials)) {
                return cb(new Error('format(credentials) expects {user:string,password:string} as a credential but was a '+ typeof credentials),null);
            }

            // user must be string ( empty is ok )
            if ((credentials.user = formatEntry(credentials.user,'user')) instanceof Error ) {
                return cb(credentials.user,null);
            }

            // password must be string ( empty is ok )
            if ((credentials.password = formatEntry(credentials.password,'password')) instanceof Error ) {
                return cb(credentials.password,null);
            }

            // One or the other can be empty, but NOT both
            if (0 === credentials.user.length && 0 === credentials.password.length ) {
                return cb(new Error('Basic credentials user and password are both empty'),null);
            }

            // Turn into acceptable auth string
            credentials = credentials.user + ':' + credentials.password;

            cb(error,credentials);

        },

        encode : function(formatted,cb) {
            var encoded;

            if (!_.isString(formatted)) {
                return cb(new Error('encode(credentials) expects credentials to be a string but instead it was a '+typeof formatted),null);
            }

            if (! ( encoded = new Buffer(formatted).toString('base64'))) {
                return cb(new Error('encode(credentials) failed'),null);
            }

            cb(null,encoded);

        },

        validate : function (encoded, cb) {
            cb(null,null);
        },

        decode : function (encoded, cb) {

            var error = null;
            var decoded;

            if (! (decoded = (new Buffer(encoded, 'base64')).toString('utf8')) ) {
                error = new Error('Basic authorization failed to decode properly');
            }

            cb(error,decoded);
        },

        parse : function (decoded, cb) {
            cb(new Error('Unimplemented',null));
        },

        authorized : function(req, parsed, cb ) {
            cb(new Error('Unimplemented',null));
        }

    };
}

module.exports = basic();