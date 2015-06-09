/*
 * grunt-amdclean
 * https://github.com/aarongloege/grunt-amdclean
 *
 * Copyright (c) 2015 Aaron Gloege
 * Licensed under the MIT license.
 */

'use strict';

var amdclean = require('amdclean');

/**
 * Default task options
 *
 * @type Object
 * @static
 */
var DEFAULT_OPTIONS = {

    // Automatically transform module names into simple, mangled names
    autoModuleTransform: false,

    // If `autoModuleTransform` is `true`, prefix all modules with
    // this string, followed by an incrementing number
    autoModulePrefix: 'm'
};

/**
 * If `wrap` options is set to `true`, set value to this
 *
 * @type Object
 * @static
 */
var DEFAULT_WRAP = {
    // This string is prepended to the file
    start: ';(function() {\n',
    // This string is appended to the file
    end: '\n}());'
};

/**
 * Create a transform function that transforms module names
 * into simple, short ones.
 *
 * @type Function
 * @param {Object} options
 * @param {String} options.autoModulePrefix
 * @returns {Function}
 * @private
 */
var _createPrefixTransform = function(options) {
    var map = {};
    var i = 0;

    return function(module) {
        if (!map.hasOwnProperty(module)) {
            map[module] = options.autoModulePrefix + (i++);
        }

        return map[module];
    };
};

module.exports = function(grunt) {

    // Register plugin
    grunt.registerMultiTask('amdclean', function() {
        var done = this.async();
        var options = this.options(DEFAULT_OPTIONS);
        var autoTransform = options.autoModuleTransform === true;

        var src = typeof this.data === 'string' ? this.data : this.data.src;
        var dest = this.data.dest;

        if (!src || !grunt.file.exists(src)) {
            grunt.log.error('Invalid or missing source file: `' + src + '`.');
            return;
        }

        // if dest is not defined, write the AMDClean output to the src file
        if (!dest) {
            dest = src;
        }

        // If code is set, files will not be read
        delete options.code;

        // warn about `autoModuleTransform` and `prefixTransform` options
        if (autoTransform && options.prefixTransform) {
            grunt.log.warn(
                'autoModuleTransform'.cyan + ' and ' + 'prefixTransform'.cyan +
                ' are mutually exclusive options. Ignoring ' + 'prefixTransform'.cyan
            );
        }

        // Allow `wrap: true` (Not allowed in default amdclean options)
        if (options.wrap === true) {
            options.wrap = DEFAULT_WRAP;
        }

        // Set file path
        options.filePath = src;

        // Transform each module name into something simple (m1, m2, m3).
        // UglifyJS will not mangle these names, so it is ideal to keep them small.
        if (autoTransform) {
            options.prefixTransform = _createPrefixTransform(options);
        }

        grunt.file.write(dest, amdclean.clean(options));

        grunt.log.ok('AMDClean ' + src.cyan + ' > ' + dest.cyan + ': ' + ' OK'.green);

        done();
    });
};
