'use strict';

/* istanbul ignore next */
exports.types = { string:'A',
    string_empty:'',
    string_number:'1',
    string_false:'false',
    string_true:'true',
    string_undefined:'undefined',
    string_null:'null',
    string_NaN:'NaN',
    string_function:'function',
    string_array:'array',

    object_empty:{},
    object:{a:'b'},

    array:[1,2,3,4],
    array_empty:[],
    number_truthy:1,
    number_falsey:0,
    number_negative:-1,
    number_decimal:0.1,
    null:null,
    undefined:undefined,
    boolean_false:false,
    boolean_true:true,
    /* istanbul ignore next */
    function_empty:function(){},
    NaN:NaN,
    regex:/s/
};