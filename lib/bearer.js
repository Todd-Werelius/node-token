'use strict';



function bearer() {

    return {
        encode: function(credentials,cb) {
            cb(null,null);
        },
        decode: function (credentials, cb) {
            cb(null,null);
        },
        validate: function (credentials, cb) {
            cb(null,null);
        },
        parse: function (credentials, cb) {
            cb(null,null);
        }

    };
}

module.exports = bearer;
