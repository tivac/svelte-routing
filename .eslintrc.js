/* eslint-env node */
module.exports = {
    extends : [
        "@tivac"
    ],

    env : {
        es6     : true,
        browser : true,
    },

    parserOptions : {
        ecmaVersion  : 8,
        sourceType   : "module",
    },
    
    rules : {
        // Destructuring in assignments looks wonky, don't warn about it
        "prefer-destructuring" : [ "warn", {
            "VariableDeclarator" : {
                "array" : true,
                "object" : true
            },
            "AssignmentExpression" : {
                "array" : false,
                "object" : false
            }
        }],
    },
};
