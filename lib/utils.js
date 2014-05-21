'use strict';

function toBase64(value) {
    var encoded;

    if (! ( encoded = new Buffer(value).toString('base64'))) {
        throw new Error('tried to base64 encode '+value+' but failed');
    }
    return encoded;
}
function fromBase64(value) {
    if (!(value = (new Buffer(value, 'base64')).toString('utf8'))) {
        throw new Error('Basic authorization failed to decode properly');
    }
    return value;
}

exports.toBase64   = toBase64;
exports.fromBase64 = fromBase64;
