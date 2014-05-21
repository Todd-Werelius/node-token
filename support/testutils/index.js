'use strict';

/* istanbul ignore next */
exports.types = { string:'A',
    stringEmpty:'',
    stringNumber:'1',
    stringFalse:'false',
    stringTrue:'true',
    stringUndefined:'undefined',
    stringNull:'null',
    stringNaN:'NaN',
    stringFunction:'function',
    stringArray:'array',

    objectEmpty:{},
    object:{a:'b'},

    array:[1,2,3,4],
    arrayEmpty:[],
    numberTruthy:1,
    numberFalsey:0,
    numberNegative:-1,
    numberDecimal:0.1,
    null:null,
    undefined:undefined,
    booleanFalse:false,
    booleanTrue:true,
    /* istanbul ignore next */
    function_empty:function(){},
    NaN:NaN,
    regex:/s/
};