'use strict';

var _ = require('underscore');

function basic()
{
    function formatEntry(entry,name) {

        // Undefined becomes string
        if (! entry ) {
            entry = '';
        }

        // Strings need to trimmed
        if (_.isString(entry)) {
            entry = entry.trim();

        } //  Passed something other than a string!
        else {
            return Error('Basic ' + name + ' must be a string but is a '+ typeof entry);
        }
    }

    return {

        // Get the credentials into a string representation for insertion into a req.authorization header
        format : function ( credentials, cb ) {

            var error = null;

            // If it's not an object we can't do anything
            if ( !_.isObject(credentials)) {
                return cb(new Error('format(credentials) expects {user:string,password:string} as a credential but it is a '+ typeof credentials),null);
            }

            // user must be string ( empty is ok )
            if (!_.isString(credentials.user = formatEntry(credentials.user,'user') instanceof Error )) {
                cb(credentials.user,null);
            }

            // password must be string ( empty is ok )
            if (!_.isString(credentials.password = formatEntry(credentials.password,'password') instanceof Error )) {
                cb(credentials.password,null);
            }

            // One or the other can be empty, but not both
            if (0 === credentials.user.length && 0 === credentials.password.length ) {
                cb(Error('Basic credentials user and password are both empty'),null);
            }

            // Turn into acceptable auth string
            credentials = credentials.user + ':' + credentials.password;

            cb(error,credentials);

        },
        encode : function(credentials,args,cb) {
            cb(null,null);
        },
        validate : function (encoded, cb) {
            cb(null,null);
        },
        decode : function (encoded, cb) {

            var error   = null;
            var decoded = null;

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

    }
}

module.exports = basic;