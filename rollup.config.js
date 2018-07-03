/* eslint-env node */
module.exports = {
    input  : "./src/index.js",
    output : {
        file      : "./dist/bundle.js",
        format    : "iife",
        sourcemap : true,
    },

    plugins : [
        require("rollup-plugin-node-resolve")({
            browser : true,
        }),
        
        require("rollup-plugin-commonjs")(),

        require("rollup-plugin-svelte")({
            // Enable extra runtime debugging properties
            dev : true,
        }),

        require("rollup-plugin-livereload")({
            watch : "./dist",
        }),
        
        require("rollup-plugin-serve")({
            contentBase : [ "./" ],
        }),
    ],
};
