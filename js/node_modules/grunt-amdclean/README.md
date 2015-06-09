# grunt-amdclean
Grunt task for [AMDClean](https://github.com/gfranko/amdclean)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-amdclean --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-amdclean');
```

## The "amdclean" task

### Overview
In your project's Gruntfile, add a section named `amdclean` to the data object passed into `grunt.initConfig()`.

```
grunt.initConfig({
  amdclean: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Parameters
#### src
Type: `String`
**Required**

Source file path to run through AMDClean.

#### dest
Type: `String`
Optional

Destination file path to output code run through AMDClean. If not provided, `src` value will be used.

### Options
In addition to the default [AMDClean options](https://github.com/gfranko/amdclean#options), the following options are available:

#### autoModuleTransform
Type: `Boolean`
Default value: `false`

If `true`, rename all modules that AMDClean cleans. All modules will be prefixed with the options defined in `options.autoModulePrefix` following by an incrementing integer.

This is useful for mangling an shortening module names.

#### autoModulePrefix
Type: `String`
Default value: `m`

Value to prefix all modules names with if `options.autoModuleTransform` is set to `true`.

#### wrap
Type: `Object|Boolean`
Default value: `Object`

While this option is a part of AMDclean's default options, the grunt plugin add support for a boolean value. Setting the value to `true` will add the default wrap.

### Usage Examples

#### Default Options

```
grunt.initConfig({
  amdclean: {
    options: {
        wrap: true,
        autoModuleTransform: false,
        autoModulePrefix: 'm'
    },
    main: {
        src: 'main.js',
        dest: 'main.clean.js'
    }
  }
});
```

#### Custom Options

```
grunt.initConfig({
  amdclean: {
    options: {
        autoModuleTransform: true,
        autoModulePrefix: '_'
    },
    main: 'src/main.js', // sorthand for { src: 'src/main.js' }
    lib: {
        options: {
            autoModuleTransform: false
        },
        src: 'lib/main.js',
        dest: 'lib/main.clean.js'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

## Release History
0.1.0 Initial Release