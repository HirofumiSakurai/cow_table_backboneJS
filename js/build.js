({
    appDir: "./",
    baseUrl: "./",
    dir: "../release",
    paths: {
      'backbone':         'libs/backbone',
      'underscore':       'libs/underscore',
      'jquery':           'libs/jquery',
      'jqueryNumeric':    'libs/jquery.numeric',
      'text':             'libs/text',
      'dualstorage':      'libs/backbone.dualstorage'
    },
    optimize: "none",

    onModuleBundleComplete: function (data) {
    	var fs = module.require('fs'),
    	    amdclean = module.require('amdclean'),
    	    outputFile = '../release/main.js.cleaned', // data.path,
    	    cleanedCode = amdclean.clean({
    		'filePath': '../release/main.js'
    	    });

    	fs.writeFileSync(outputFile, cleanedCode);
    },

    modules: [
        {
            name: "main",
            exclude: [
                // If you prefer not to include certain libs exclude them here
            ]
        }
    ]
})
