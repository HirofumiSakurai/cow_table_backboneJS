({
    appDir: "./",
    baseUrl: "./",
    dir: "../release",
    paths: {
        'jquery':           'libs/jquery',
	'jqueryNumeric':    'libs/jquery.numeric',
        'underscore':       'libs/underscore',
        'backbone':         'libs/backbone',
	'text':             'libs/text',
    },
    optimize: "none",

    onModuleBundleComplete: function (data) {
    	var fs = module.require('fs'),
    	    amdclean = module.require('amdclean'),
    	    outputFile = data.path,
    	    cleanedCode = amdclean.clean({
    		'filePath': outputFile
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
