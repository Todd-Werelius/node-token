'use strict';

//var __parsers = {basic:require('./basic')(),bearer:require('./jwt')()};
var __parsers = {basic:require('./basic')()};
var _         = require('underscore');

function authorization(parsers) {

    var _parsers = _.clone(__parsers);

    // All our schemes that we support + any overrides or new schemes the user wants to add
    if ( parsers ) {
       _parsers =  _.extend(_parsers,parsers);
    }

    function authorizationMiddleware(req,next) {

        var segments;
        var scheme;

        req.authorization = undefined;

        try {
            if (!req.headers.authorization) {
                return next();
            }

            // Splits into 2 parts even if more than one ' ' in string ( let the parser figure out if that's ok )
            segments = req.headers.authorization.trim().split(' ', 2);

            if (!segments || segments.length !== 2) {
                //noinspection ExceptionCaughtLocallyJS
                throw new Error('Invalid Authorization Header');
            }

            scheme = segments[0].toLowerCase();

            // Make sure we can handle the scheme
            if (!_parsers.hasOwnProperty(scheme)) {
                return next();
            }

            _parsers[scheme].decode(segments[1],function(credentialsWrapper){
                req.authorization = credentialsWrapper;
            });

        } catch (err) {
            return next(err);
        }

        return next();
    }

    // We need to make sure that our object was constructed correctly so we need access to some internal
    // state for the unit tests ( spy's don't work so well ! )
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {

        authorizationMiddleware.__private = {
            _parsers  : _parsers,
            __parsers : __parsers
        };
    }

    return authorizationMiddleware;
}

module.exports    = authorization;

