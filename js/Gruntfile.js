module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ['*.js', '*/*.js'],
      tasks: ['jasmine']
    },
    jasmine: {
        kineSpec: {
          options: {
            specs: 'spec/kineSpec.js',
            helpers: 'spec/*Helper.js',
            keepRunner: true,
            template: require('grunt-template-jasmine-requirejs'),
            templateOptions: {
                    requireConfigFile: 'spec/config.js',
                  }
          }
        }
    },
    requirejs: {
      compile : {
        options: {
          baseUrl: './',
          name: 'main.simple',
          out: 'main.one.js',
          paths: {
            'backbone':         'libs/backbone',
            'underscore':       'libs/underscore',
            'jquery':           'libs/jquery',
            'jqueryNumeric':    'libs/jquery.numeric',
            'dualstorage':      'libs/backbone.dualstorage',
            'text':             'libs/text',
          },
          optimize: "none",
        }
      }
    },
    amdclean:{
      main:{
          src: 'main.one.js',
          dest: 'main.clean.js'
      }
    },
    closurecompiler:{
      minify:{
        files: {'main.js': 'main.clean.js'}
      },
      options:{
        'compilation_level': 'SIMPLE_OPTIMIZATIONS',
        'externs': 'libs/jquery.js',
        'externs': 'libs/underscore.js',
        'externs': 'libs/backbone.js',
        'externs': 'libs/require.js',
        'externs': 'libs/backbone.dualstorage.js',
        'jscomp_off': 'externsValidation',
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-amdclean');
  grunt.loadNpmTasks('grunt-closurecompiler');
  grunt.registerTask('minify', ['closurecompiler:minify']);
  grunt.registerTask('default', ['requirejs', 'amdclean', 'closurecompiler']);
};
