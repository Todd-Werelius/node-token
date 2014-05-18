'use strict';
var basic = require('./lib/basic');

module.exports = {

    parsers : {
        basic  : basic,
        bearer : null
    },

    middleware : {
        tokenAuthorization : null,
        basicAuthorization : null
    }
};

/*var jws           = require('jws');
var _             = require('underscore');

var _basic = {
    parser : parseBasic,
    args   : null
};

var _signature =  {
    parser : parseSignature,
    args   : null
};

var _bearer = {
    parser : parseJWT,
    args   : {
        validator : function(token,callback) {

        },
        decode    : false,
        reissue   : true,
        cert      : null
    }
};

// Basic parsers we support out of the box ...
var _parsers = {

    basic     : _basic,
    signature : _signature,
    bearer    : _bearer
};

// Sets req.authorization property with an authorization object that describes
// the
function reqAuthorization(parsers,handleUnsupported) {

    var myParsers =  parsers || {};
        myParsers = _.extend(myParsers,_parsers);

    handleUnsupported = handleUnsupported || true;

    return parseAuthorization;

    // Embedded so we can use closure to store var's instead of 'new'ing up reqAuthorization
    function parseAuthorization( req, callback ) {

        var parts;
        var credentials;
        var scheme;

        // Default is anonymous access no authorization credentials
        req.authorization = undefined;

        // No authorization attempted so just return
        if ( ! req.headers || ! req.headers.authorization ) {
            callback(null);
        }

        // Client sent a bad header, up to route handler to figure out how
        // to handle, or add another pieced of middle
        parts = req.headers.authorization.split(' ');
        if ( parts.length != 2 || !_.isString(parts[0]) ) {
            callback(new Error('Authorization header improperly formatted'));
        }

        // We now have the scheme and credentials to pass on
        scheme      = parts[0];
        credentials = parts[1];

        // If we can't handle the scheme we either pass back an error or
        // pass on the raw scheme and credentials
        if (!myParsers.hasOwnProperty(scheme)) {

            if ( ! handleUnsupported ) {
                callback(new Error('Authorization scheme ' + parts[0] + ' not supported'));
            } else {
                req.authorization = {
                    scheme      : scheme,
                    credentials : credentials
                };
                callback(null);
            }
        // We have a parser so let it create the validated credentials set for us( or generate an error )
        } else {

            myParsers[scheme].parser(credentials,myParsers[scheme].args,function(err,validated){

                // Go ahead and set the req.authroization property with the validated
                // credentials object
                if ( ! err ) {
                    req.authorization = {
+                        scheme      : scheme,
                        credentials : validated
                    }
                }
                callback(err);
            });
        }
    }
}

function parseJWT(credentials,args,callback) {

    jws.isValid(credentials);

    callback(null);
}

function parseBasic(credentials,args,callback) {

    var delimiterAt;
    var credentials;

    // If we cant base64 decode the credentials
    if (! (credentials = (new Buffer(credentials, 'base64')).toString('utf8')) ) {
        return callback(new Error('Basic authorization failed to decode properly'),undefined);
    }

    // Basic auth typically has a user and an authorization field (password)
    delimiterAt = credentials.indexOf(':');
    if (-1 !== delimiterAt) {
        credentials = [credentials.slice(0, delimiterAt), credentials.slice(delimiterAt + 1)];
    } else {
        credentials = [credentials,null];
    }

    // User must be a string if it's defined
    if ( credentials[0] && ! _.isString(credentials[0]) ) {
        return callback(new Error('Basic authorization credentials improperly formatted'), undefined);
    }

    // User can be absent ( not a great idea ) but apparently some people
    // only use the authorization field
    if (! credentials[0] ) {
        credentials[0] = null;
    // Guard against a credential filled with just whitespace
    } else {
        credentials[0] = credentials[0].trim();
    }

    // Authorization field ( password ) can also be empty and just username used
    if (!credentials[1]) {
        credentials[1] = null;
    // Guard against a credential filled with just whitespace
    } else if (_.isString(credentials[1])) {
        credentials[1] = credentials[1].trim();
    }

    // After parsing and trimming make sure we have something in at least one do the fields!
    if (!credentials[0] && !credentials[1]) {
        return callback(new Error('Basic authorization credentials are both empty'), undefined);
    }

    // Send the parsed credentials back the caller
    callback(null,{
        user     : credentials[0],
        password : credentials[1]
    });
}*/